import type { MetadataRoute } from "next";
import { allRoutes, absoluteUrl } from "@/lib/seo";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().flatMap((route) =>
    locales.map((locale) => ({
      url: absoluteUrl(route[locale]),
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(route[l])])),
      },
    })),
  );
}
