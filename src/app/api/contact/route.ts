import { NextResponse, type NextRequest } from "next/server";
import { contactLimits, validateContact, type ContactPayload } from "@/lib/contact-validation";

/**
 * Contact form endpoint.
 *
 * Messages are only delivered when CONTACT_WEBHOOK_URL is configured (see README).
 * Without it the endpoint answers 503 and the form tells the visitor to call or email,
 * so no message is ever reported as sent when it was not.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const attempts = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const clip = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }

  let body: Partial<ContactPayload>;
  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots learn nothing.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  const message = {
    source: "physioart-web",
    submittedAt: new Date().toISOString(),
    locale: clip(body.locale, 5),
    name: clip(body.name, contactLimits.name),
    email: clip(body.email, contactLimits.email),
    phone: clip(body.phone, contactLimits.phone),
    subject: clip(body.subject, contactLimits.subject),
    message: clip(body.message, contactLimits.message),
    consent: true,
  };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify(message),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      return NextResponse.json({ ok: false, reason: "delivery_failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, reason: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
