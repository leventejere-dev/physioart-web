import { locales } from "@/i18n/config";
import { absoluteUrl, allRoutes } from "@/lib/seo";

/** XML sitemap with hreflang alternates (server build only). */
export function GET() {
  const urls = allRoutes().flatMap((route) =>
    locales.map((locale) => {
      const alternates = locales
        .map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${absoluteUrl(route[l])}"/>`)
        .join("");
      return `<url><loc>${absoluteUrl(route[locale])}</loc>${alternates}</url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
