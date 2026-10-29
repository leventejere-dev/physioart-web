import type { NextConfig } from "next";

/**
 * Two build targets:
 * - Server (default): `next build && next start`, e.g. Vercel or any Node.js host.
 *   Includes the language-redirect proxy and the contact API (files ending in `.node.ts`).
 * - GitHub Pages (`GITHUB_PAGES=1`): fully static export into `out/`, served under BASE_PATH.
 *   Server-only files are excluded through `pageExtensions`.
 */
const isPages = process.env.GITHUB_PAGES === "1";
const basePath = isPages ? (process.env.BASE_PATH ?? "").replace(/\/$/, "") : "";
const noIndex = process.env.SITE_NOINDEX === "1";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Review/staging deployments: keep them out of search results.
  ...(noIndex ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  pageExtensions: isPages ? ["tsx", "ts"] : ["tsx", "ts", "node.ts"],
  env: {
    BUILD_YEAR: String(new Date().getFullYear()),
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_EXPORT: isPages ? "1" : "",
  },
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  ...(isPages
    ? {
        output: "export",
        basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        cacheComponents: true,
        partialPrefetching: true,
        images: {
          formats: ["image/avif", "image/webp"],
          qualities: [75, 85],
        },
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
