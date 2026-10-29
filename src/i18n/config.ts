export const locales = ["hu", "ro", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "hu";

/** A value provided in every supported language. */
export type Localized<T = string> = Record<Locale, T>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeLabels: Record<Locale, { short: string; name: string }> = {
  hu: { short: "HU", name: "Magyar" },
  ro: { short: "RO", name: "Română" },
  en: { short: "EN", name: "English" },
};

export const openGraphLocale: Record<Locale, string> = {
  hu: "hu_HU",
  ro: "ro_RO",
  en: "en_GB",
};

/** BCP 47 tags used for date formatting. */
export const dateLocale: Record<Locale, string> = {
  hu: "hu-HU",
  ro: "ro-RO",
  en: "en-GB",
};

export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(dateLocale[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Europe/Bucharest",
  }).format(new Date(`${iso}T12:00:00Z`));
}
