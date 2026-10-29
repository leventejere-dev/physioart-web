import { locales, type Locale, type Localized } from "./config";

export type SectionKey = "about" | "services" | "news" | "contact" | "booking";

export const sectionKeys: SectionKey[] = ["about", "services", "news", "contact", "booking"];

/** Localised first path segment for each top-level page. */
export const sectionSlugs: Record<Locale, Record<SectionKey, string>> = {
  hu: {
    about: "rolunk",
    services: "szolgaltatasok",
    news: "hirek",
    contact: "kapcsolat",
    booking: "idopontfoglalas",
  },
  ro: {
    about: "despre-noi",
    services: "servicii",
    news: "stiri",
    contact: "contact",
    booking: "programare",
  },
  en: {
    about: "about",
    services: "services",
    news: "news",
    contact: "contact",
    booking: "booking",
  },
};

export function sectionFromSlug(locale: Locale, slug: string): SectionKey | undefined {
  return sectionKeys.find((key) => sectionSlugs[locale][key] === slug);
}

export function href(locale: Locale, section?: SectionKey, item?: string) {
  if (!section) return `/${locale}`;
  const base = `/${locale}/${sectionSlugs[locale][section]}`;
  return item ? `${base}/${item}` : base;
}

/** A route identified independently of language, used for hreflang and the language switcher. */
export interface RouteRef {
  section?: SectionKey;
  /** Localised item slugs (services and articles). */
  item?: Localized;
}

export function localizedPaths(ref: RouteRef): Localized {
  return Object.fromEntries(
    locales.map((l) => [l, href(l, ref.section, ref.item?.[l])]),
  ) as Localized;
}
