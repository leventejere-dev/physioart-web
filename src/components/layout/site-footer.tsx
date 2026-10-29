import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { formatAddress, site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { Logo } from "@/components/ui/logo";
import { AppStoreButtons } from "@/components/ui/app-store-buttons";
import { FacebookIcon, InstagramIcon } from "@/components/ui/brand-icons";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.footer;
  const address = formatAddress(locale);
  const year = await currentYear();

  const pages = [
    { href: href(locale, "about"), label: dict.nav.about },
    { href: href(locale, "services"), label: dict.nav.services },
    { href: href(locale, "news"), label: dict.nav.news },
    { href: href(locale, "contact"), label: dict.nav.contact },
    { href: href(locale, "booking"), label: dict.nav.book },
  ];

  const legal = [
    { href: site.portal.legal.privacy[locale], label: t.privacy },
    { href: site.portal.legal.terms[locale], label: t.terms },
    { href: site.anpc, label: t.anpc },
  ];

  return (
    <footer className="mt-24 border-t border-line bg-surface/60 backdrop-blur">
      <div className="container-page grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr_0.9fr]">
        <div className="max-w-sm">
          <Logo className="h-11 w-auto" />
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{t.tagline}</p>
          <p className="mt-6 text-sm font-semibold text-ink">{t.appTitle}</p>
          <AppStoreButtons appStoreLabel={t.appStore} googlePlayLabel={t.googlePlay} className="mt-3" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">{t.contactTitle}</h2>
          <ul className="mt-4 grid gap-3 text-[0.9375rem] text-ink-soft">
            <li>
              <a href={site.maps.directions} rel="noopener" className="flex gap-2.5 hover:text-accent-ink">
                <MapPin className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                <address className="not-italic">
                  {address.line1}
                  <br />
                  {address.line2}
                </address>
              </a>
            </li>
            <li>
              <a href={site.phone.href} className="inline-flex items-center gap-2.5 hover:text-accent-ink">
                <Phone className="size-4 text-accent" aria-hidden="true" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 break-all hover:text-accent-ink">
                <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
                {site.email}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-sm font-semibold text-ink">{t.follow}</p>
          <div className="mt-3 flex gap-2">
            <a
              href={site.social.facebook}
              className="grid size-11 place-items-center rounded-full border border-line bg-surface-strong text-ink-soft transition hover:border-accent hover:text-accent-ink"
              aria-label="Facebook"
              rel="noopener"
            >
              <FacebookIcon className="size-5" />
            </a>
            <a
              href={site.social.instagram}
              className="grid size-11 place-items-center rounded-full border border-line bg-surface-strong text-ink-soft transition hover:border-accent hover:text-accent-ink"
              aria-label="Instagram"
              rel="noopener"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label={t.pagesTitle}>
          <h2 className="text-sm font-semibold text-ink">{t.pagesTitle}</h2>
          <ul className="mt-4 grid gap-2.5 text-[0.9375rem]">
            {pages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-ink-soft transition-colors hover:text-accent-ink">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.legalTitle}>
          <h2 className="text-sm font-semibold text-ink">{t.legalTitle}</h2>
          <ul className="mt-4 grid gap-2.5 text-[0.9375rem]">
            {legal.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-ink-soft transition-colors hover:text-accent-ink" rel="noopener">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.portal.clientLogin} className="text-ink-soft transition-colors hover:text-accent-ink">
                {dict.nav.login}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {t.rights}
          </p>
          <p>{t.operator}</p>
        </div>
      </div>
    </footer>
  );
}
