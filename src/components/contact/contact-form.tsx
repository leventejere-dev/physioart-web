"use client";

import { useRef, useState, type FormEvent } from "react";
import { CircleAlert, CircleCheck, Loader, Send } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { contactLimits, validateContact, type ContactError, type ContactField } from "@/lib/contact-validation";

type Status = "idle" | "sending" | "success" | "error" | "notConfigured" | "rateLimited";

interface ContactFormProps {
  locale: string;
  labels: Dictionary["contact"]["form"];
  privacyUrl: string;
  email: string;
}

const fieldOrder: ContactField[] = ["name", "email", "phone", "subject", "message", "consent"];

export function ContactForm({ locale, labels, privacyUrl, email }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<ContactField, ContactError>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const message = (error?: ContactError) => (error ? labels.validation[error] : undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
      locale,
    };

    const found = validateContact(payload);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      const first = fieldOrder.find((f) => found[f]);
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (response.status === 503) return setStatus("notConfigured");
      if (response.status === 429) return setStatus("rateLimited");
      if (response.status === 400) {
        const body = (await response.json().catch(() => null)) as { errors?: typeof found } | null;
        if (body?.errors) setErrors(body.errors);
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const hasErrors = Object.keys(errors).length > 0;
  const [consentBefore, consentAfter] = labels.consent.split("{privacy}");

  const field = (name: ContactField) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const error = (name: ContactField) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
        <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
        {message(errors[name])}
      </p>
    ) : null;

  const labelClass = "mb-2 block text-sm font-semibold text-ink";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-5">
      <div aria-live="polite" role="status">
        {status === "success" && (
          <p className="flex gap-3 rounded-2xl border border-emerald-300/60 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200">
            <CircleCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            {labels.success}
          </p>
        )}
        {(status === "error" || status === "notConfigured" || status === "rateLimited") && (
          <p className="flex gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 p-4 text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
            <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <span>
              {status === "notConfigured"
                ? labels.notConfigured.replace("{email}", email)
                : status === "rateLimited"
                  ? labels.rateLimited
                  : labels.error}
            </span>
          </p>
        )}
        {hasErrors && status === "idle" && <p className="sr-only">{labels.validation.summary}</p>}
      </div>

      {/* Honeypot for bots: hidden from people and assistive technology. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            {labels.name}
          </label>
          <input {...field("name")} type="text" autoComplete="name" maxLength={contactLimits.name} required className="field" />
          {error("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            {labels.email}
          </label>
          <input
            {...field("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={contactLimits.email}
            required
            className="field"
          />
          {error("email")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            {labels.phone} <span className="font-normal text-muted">({labels.optional})</span>
          </label>
          <input
            {...field("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={contactLimits.phone}
            className="field"
          />
          {error("phone")}
        </div>
        <div>
          <label htmlFor="contact-subject" className={labelClass}>
            {labels.subject}
          </label>
          <input {...field("subject")} type="text" maxLength={contactLimits.subject} required className="field" />
          {error("subject")}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {labels.message}
        </label>
        <textarea
          {...field("message")}
          rows={6}
          maxLength={contactLimits.message}
          required
          className="field min-h-40 resize-y"
          aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
        />
        {errors.message ? (
          error("message")
        ) : (
          <p id="contact-message-hint" className="mt-1.5 text-sm text-muted">
            {labels.healthNote}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-consent" className="flex cursor-pointer gap-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          <input
            {...field("consent")}
            type="checkbox"
            required
            className="mt-1 size-5 shrink-0 cursor-pointer rounded accent-[var(--accent)]"
          />
          <span>
            {consentBefore}
            <a href={privacyUrl} className="font-medium text-accent-ink underline underline-offset-2" rel="noopener">
              {labels.privacyLink}
            </a>
            {consentAfter}
          </span>
        </label>
        {error("consent")}
      </div>

      <div>
        <button type="submit" className="btn btn-primary min-h-12 w-full px-7 sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? (
            <Loader className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {status === "sending" ? labels.sending : labels.submit}
        </button>
      </div>
    </form>
  );
}
