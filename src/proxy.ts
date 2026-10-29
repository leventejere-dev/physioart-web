import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { allRoutes } from "@/lib/seo";

/** Every public page path in every language. */
const knownPaths = new Set(allRoutes().flatMap((route) => Object.values(route)));

/** Picks the best supported language from the Accept-Language header. */
function negotiate(header: string | null): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((entry) => isLocale(entry.lang));
  return match ? (match.lang as Locale) : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (isLocale(first)) {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    if (knownPaths.has(path)) return;
    // Unknown page: render the global 404 with a real 404 status (no route matches this path).
    return NextResponse.rewrite(new URL("/not-found/-/-/-", request.url));
  }

  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  const locale = saved && isLocale(saved) ? saved : negotiate(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals, the API, metadata files and files with an extension.
  matcher: ["/((?!_next|api|sitemap.xml|robots.txt|.*\\..*).*)"],
};
