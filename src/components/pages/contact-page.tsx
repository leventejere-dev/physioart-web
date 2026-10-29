import Link from "next/link";
import { ArrowRight, CalendarCheck, CalendarClock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { formatAddress, site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { PageHero } from "@/components/ui/section";
import { FacebookIcon, InstagramIcon } from "@/components/ui/brand-icons";
import { ContactForm } from "@/components/contact/contact-form";
import { MapEmbed } from "@/components/contact/map-embed";

export function ContactPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.contact;
  const address = formatAddress(locale);

  const row = "flex gap-4 py-5 first:pt-0 last:pb-0";
  const icon = "grid size-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-ink";
  const label = "text-xs font-semibold tracking-[0.12em] text-muted uppercase";

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-10">
        <div className="grid content-start gap-6">
          <section className="card rounded-[1.5rem] p-6 sm:p-8" aria-labelledby="details-title">
            <h2 id="details-title" className="text-xl font-semibold text-ink">
              {t.details.title}
            </h2>
            <ul className="mt-6 divide-y divide-line">
              <li className={row}>
                <span className={icon}>
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className={label}>{t.details.address}</p>
                  <address className="mt-1 text-[1.0625rem] leading-relaxed text-ink not-italic">
                    {site.legalName}
                    <br />
                    {address.line1}
                    <br />
                    {address.line2}
                  </address>
                  <a href={site.maps.directions} className="link-arrow mt-2 text-sm" rel="noopener">
                    <Navigation className="size-4" aria-hidden="true" />
                    {dict.common.directions}
                  </a>
                </div>
              </li>
              <li className={row}>
                <span className={icon}>
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className={label}>{t.details.phone}</p>
                  <a href={site.phone.href} className="mt-1 block text-[1.0625rem] font-semibold text-ink hover:text-accent-ink">
                    {site.phone.display}
                  </a>
                  <p className="mt-1 text-sm text-muted">
                    {t.details.phoneSecondary}:{" "}
                    <a href={site.secondaryPhone.href} className="font-medium text-ink-soft hover:text-accent-ink">
                      {site.secondaryPhone.display}
                    </a>
                  </p>
                </div>
              </li>
              <li className={row}>
                <span className={icon}>
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className={label}>{t.details.email}</p>
                  <a href={`mailto:${site.email}`} className="mt-1 block text-[1.0625rem] font-semibold break-all text-ink hover:text-accent-ink">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className={row}>
                <span className={icon}>
                  <CalendarClock className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className={label}>{t.details.visits}</p>
                  <p className="mt-1 text-[1.0625rem] text-ink">{t.details.visitsText}</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3 border-t border-line pt-6">
              <p className="text-sm font-medium text-muted">{t.details.social}</p>
              <a
                href={site.social.facebook}
                aria-label="Facebook"
                rel="noopener"
                className="grid size-11 place-items-center rounded-full border border-line bg-surface-strong text-ink-soft transition hover:border-accent hover:text-accent-ink"
              >
                <FacebookIcon className="size-5" />
              </a>
              <a
                href={site.social.instagram}
                aria-label="Instagram"
                rel="noopener"
                className="grid size-11 place-items-center rounded-full border border-line bg-surface-strong text-ink-soft transition hover:border-accent hover:text-accent-ink"
              >
                <InstagramIcon className="size-5" />
              </a>
            </div>
          </section>

          <section
            className="relative overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#4338ca,#6d5cf0)] p-6 text-white shadow-[var(--shadow-lift)] sm:p-8"
            aria-labelledby="contact-booking-title"
          >
            <CalendarCheck className="size-8 text-white/90" aria-hidden="true" />
            <h2 id="contact-booking-title" className="mt-4 text-xl font-semibold">
              {t.booking.title}
            </h2>
            <p className="mt-2 leading-relaxed text-white/85">{t.booking.text}</p>
            <Link href={href(locale, "booking")} className="btn mt-6 bg-white text-[#3730a3] hover:-translate-y-0.5">
              {t.booking.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </section>
        </div>

        <section className="card rounded-[1.5rem] p-6 sm:p-8 lg:p-10" aria-labelledby="form-title">
          <h2 id="form-title" className="text-2xl font-semibold text-ink">
            {t.form.title}
          </h2>
          <p className="mt-2 mb-8 leading-relaxed text-muted">{t.form.lead}</p>
          <ContactForm locale={locale} labels={t.form} privacyUrl={site.portal.legal.privacy[locale]} email={site.email} />
        </section>
      </div>

      <section className="container-page mt-16" aria-label={t.map.title}>
        <MapEmbed
          embedUrl={site.maps.embed}
          placeUrl={site.maps.place}
          labels={t.map}
          address={`${address.line1}, ${site.address.city[locale]}`}
        />
      </section>
    </>
  );
}
