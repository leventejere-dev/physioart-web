import type { Metadata } from "next";
import { site } from "@/config/site";
import { locales, openGraphLocale, type Locale, type Localized } from "@/i18n/config";
import { localizedPaths, sectionKeys, type RouteRef } from "@/i18n/routes";
import { services } from "@/content/services";
import { articles } from "@/content/news";

interface PageMetaInput {
  locale: Locale;
  ref: RouteRef;
  title: string;
  description: string;
  /** Use the title as-is instead of applying the site title template. */
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt?: string };
  type?: "website" | "article";
  publishedTime?: string;
}

export function pageMetadata({
  locale,
  ref,
  title,
  description,
  absoluteTitle,
  image,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  const paths = localizedPaths(ref);
  const ogImage = image ?? { url: "/og-image.jpg", width: 1200, height: 630, alt: "PhysioArt" };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: paths[locale],
      languages: { ...paths, "x-default": paths.hu },
    },
    openGraph: {
      type,
      title,
      description,
      url: paths[locale],
      siteName: site.name,
      locale: openGraphLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => openGraphLocale[l]),
      images: [ogImage],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** Every public route with its equivalent in each language. Used by the language switcher and the sitemap. */
export function allRoutes(): Localized[] {
  return [
    localizedPaths({}),
    ...sectionKeys.map((section) => localizedPaths({ section })),
    ...services.map((s) => localizedPaths({ section: "services", item: s.slug })),
    ...articles.map((a) => localizedPaths({ section: "news", item: a.slug })),
  ];
}

export function absoluteUrl(path: string) {
  return `${site.url}${path}`;
}
