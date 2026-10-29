import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { formatAddress, site } from "@/config/site";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { allRoutes } from "@/lib/seo";
import { themeInitScript } from "@/lib/theme-script";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import "../globals.css";

const sans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0f1e" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.siteTitle, template: "%s · PhysioArt" },
    description: dict.meta.siteDescription,
    applicationName: site.name,
    formatDetection: { telephone: false },
    // Review deployments (e.g. GitHub Pages) must not compete with the live site in search results.
    ...(process.env.SITE_NOINDEX === "1" ? { robots: { index: false, follow: false } } : {}),
    other: {
      "apple-itunes-app": "app-id=6764026641",
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const address = formatAddress(locale);

  return (
    <html lang={locale} className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-accent px-4 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.nav.skipToContent}
        </a>
        <div className="aura" aria-hidden="true" />
        <SiteHeader
          locale={locale}
          labels={dict.nav}
          routes={allRoutes()}
          loginUrl={site.portal.clientLogin}
          phone={site.phone}
          address={`${address.line1}, ${site.address.city[locale]}`}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
        <OrganizationJsonLd locale={locale} />
      </body>
    </html>
  );
}
