import type { Locale, Localized } from "@/i18n/config";

/**
 * Central business and integration configuration.
 * Values marked "verify" in docs/CONTENT-REVIEW.md should be confirmed by PhysioArt before launch.
 */

const portalBase = (process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://dev.physioart.ro").replace(/\/$/, "");

export const site = {
  name: "PhysioArt",
  legalName: "PHYSIOART SRL",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://physioart.ro").replace(/\/$/, ""),

  phone: {
    display: "0754 282 934",
    href: "tel:+40754282934",
    e164: "+40754282934",
  },
  secondaryPhone: {
    display: "0742 864 694",
    href: "tel:+40742864694",
  },
  email: "contact@physioart.ro",

  address: {
    street: "Str. József Attila nr. 28",
    postalCode: "520063",
    city: { hu: "Sepsiszentgyörgy", ro: "Sfântu Gheorghe", en: "Sfântu Gheorghe" } satisfies Localized,
    county: { hu: "Kovászna megye", ro: "județul Covasna", en: "Covasna County" } satisfies Localized,
    country: { hu: "Románia", ro: "România", en: "Romania" } satisfies Localized,
    /** Street line written the way each language community expects it. */
    streetLine: {
      hu: "József Attila utca 28.",
      ro: "Str. József Attila nr. 28",
      en: "28 József Attila Street",
    } satisfies Localized,
    geo: { latitude: 45.854306, longitude: 25.774617 },
  },

  maps: {
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=45.854306%2C25.774617",
    place: "https://www.google.com/maps/search/?api=1&query=PhysioArt%2C%20Str.%20J%C3%B3zsef%20Attila%2028%2C%20Sf%C3%A2ntu%20Gheorghe",
    embed: "https://www.google.com/maps?q=45.854306,25.774617&z=16&output=embed",
  },

  social: {
    facebook: "https://www.facebook.com/physioartsepsi",
    instagram: "https://www.instagram.com/physioart.ro/",
  },

  apps: {
    ios: "https://apps.apple.com/ro/app/physioart/id6764026641",
    android: "https://play.google.com/store/apps/details?id=ro.physioart.app",
  },

  /** Existing PhysioArt client portal (Laravel app). Configure NEXT_PUBLIC_PORTAL_URL for production. */
  portal: {
    base: portalBase,
    clientLogin: `${portalBase}/client/login`,
    staffLogin: `${portalBase}/login`,
    legal: {
      privacy: {
        hu: `${portalBase}/adatvedelmi-tajekoztato`,
        ro: `${portalBase}/politica-de-confidentialitate`,
        en: `${portalBase}/privacy`,
      } satisfies Localized,
      terms: {
        hu: `${portalBase}/altalanos-szerzodesi-feltetelek`,
        ro: `${portalBase}/termeni-si-conditii`,
        en: `${portalBase}/terms`,
      } satisfies Localized,
    },
  },

  anpc: "https://anpc.ro/",
} as const;

export function formatAddress(locale: Locale) {
  const a = site.address;
  return {
    line1: a.streetLine[locale],
    line2: `${a.postalCode} ${a.city[locale]}, ${a.county[locale]}`,
  };
}
