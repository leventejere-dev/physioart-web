import { absoluteUrl } from "@/lib/seo";

/** robots.txt (server build only). Review deployments set SITE_NOINDEX=1 to block all crawlers. */
export function GET() {
  const body =
    process.env.SITE_NOINDEX === "1"
      ? "User-agent: *\nDisallow: /\n"
      : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
