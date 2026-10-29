import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Business details only: no ratings, reviews or opening hours are published until verified. */
export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Physiotherapy",
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: `${site.url}${href(locale)}`,
        logo: `${site.url}/icon.png`,
        image: `${site.url}/og-image.jpg`,
        telephone: site.phone.e164,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          postalCode: site.address.postalCode,
          addressLocality: "Sfântu Gheorghe",
          addressRegion: "Covasna",
          addressCountry: "RO",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.address.geo.latitude,
          longitude: site.address.geo.longitude,
        },
        knowsLanguage: ["hu", "ro", "en"],
        sameAs: [site.social.facebook, site.social.instagram, site.apps.ios, site.apps.android],
      }}
    />
  );
}

export function ArticleJsonLd(props: {
  url: string;
  title: string;
  description: string;
  date: string;
  locale: Locale;
  image?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: props.title,
        description: props.description,
        datePublished: props.date,
        inLanguage: props.locale,
        mainEntityOfPage: props.url,
        ...(props.image ? { image: props.image } : {}),
        publisher: { "@id": `${site.url}/#organization` },
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
