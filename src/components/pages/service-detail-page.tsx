import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarCheck, Check, Clock, Info, Phone, TriangleAlert } from "lucide-react";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { relatedServices, type Service } from "@/content/services";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FinalCta } from "@/components/ui/final-cta";
import { ServiceCard, formatLabel } from "@/components/cards/service-card";

export function ServiceDetailPage({ service, locale, dict }: { service: Service; locale: Locale; dict: Dictionary }) {
  const t = dict.services.detail;
  const safety = service.safety?.[locale] ?? (service.device ? t.safetyDevices : undefined);
  const related = relatedServices(service);
  const photos = service.photos ?? [];

  return (
    <>
      <article className="container-page pt-8 sm:pt-12">
        <Breadcrumbs
          label={dict.common.breadcrumb}
          items={[
            { label: dict.nav.home, href: href(locale) },
            { label: dict.nav.services, href: href(locale, "services") },
            { label: service.name[locale], href: href(locale, "services", service.slug[locale]) },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_24rem]">
          <header className="hero-enter lg:col-start-1">
            <p className="eyebrow">{dict.categories[service.category]}</p>
            <h1 className="mt-5 text-4xl leading-[1.06] font-semibold text-ink sm:text-5xl lg:text-[3.4rem]">
              {service.name[locale]}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{service.intro[locale]}</p>
          </header>

          <aside className="lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            <div className="card rounded-[1.5rem] p-6 sm:p-7">
              <h2 className="text-lg font-semibold text-ink">{t.bookTitle}</h2>
              {service.formats.length > 0 && (
                <>
                  <p className="mt-5 text-xs font-semibold tracking-[0.12em] text-muted uppercase">{t.formats}</p>
                  <ul className="mt-3 grid gap-2">
                    {service.formats.map((format) => (
                      <li
                        key={formatLabel(format, dict)}
                        className="flex items-center gap-3 rounded-xl border border-line bg-surface-strong px-3.5 py-2.5 text-[0.9375rem] text-ink-soft"
                      >
                        <Clock className="size-4 shrink-0 text-accent" aria-hidden="true" />
                        {formatLabel(format, dict)}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p className="mt-5 text-sm leading-relaxed text-muted">{t.bookText}</p>
              <div className="mt-5 grid gap-2.5">
                <Link href={href(locale, "booking")} className="btn btn-primary min-h-12">
                  <CalendarCheck className="size-4" aria-hidden="true" />
                  {dict.nav.book}
                </Link>
                <a href={site.phone.href} className="btn btn-secondary min-h-12">
                  <Phone className="size-4" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-start-1">
            {photos.length > 0 && (
              <div className={`grid gap-4 ${photos.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {photos.map((photo, index) => (
                  <div
                    key={photo.alt.en}
                    className={`photo-frame ${photos.length > 1 ? "aspect-[4/3]" : photo.src.height > photo.src.width ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[16/10]"}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt[locale]}
                      fill
                      placeholder="blur"
                      preload={index === 0}
                      sizes={photos.length > 1 ? "(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 46rem, 100vw"}
                      className={`object-cover ${photo.src.height > photo.src.width ? "object-[50%_55%]" : ""}`}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className={`grid gap-12 ${photos.length > 0 ? "mt-12" : ""}`}>
              <section aria-labelledby="involves">
                <h2 id="involves" className="text-2xl font-semibold text-ink">
                  {t.involves}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">{service.involves[locale]}</p>
              </section>

              <section aria-labelledby="suitable">
                <h2 id="suitable" className="text-2xl font-semibold text-ink">
                  {t.suitable}
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {service.suitable[locale].map((item) => (
                    <li key={item} className="flex gap-3 rounded-2xl border border-line bg-surface p-4 leading-relaxed text-ink-soft">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-lime-soft text-lime">
                        <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="session">
                <h2 id="session" className="text-2xl font-semibold text-ink">
                  {t.session}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">{service.session[locale]}</p>
              </section>

              <section aria-labelledby="expect">
                <h2 id="expect" className="text-2xl font-semibold text-ink">
                  {t.expect}
                </h2>
                <ol className="mt-5 grid gap-4">
                  {t.expectItems.map((item, index) => (
                    <li key={item} className="flex gap-4 leading-relaxed text-ink-soft">
                      <span className="step-number size-8 text-sm">{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </section>

              {safety && (
                <section
                  aria-labelledby="safety"
                  className="rounded-[1.25rem] border border-amber-300/60 bg-amber-50/80 p-5 sm:p-6 dark:border-amber-400/25 dark:bg-amber-400/10"
                >
                  <h2 id="safety" className="flex items-center gap-2.5 font-semibold text-ink">
                    <TriangleAlert className="size-5 text-amber-600 dark:text-amber-300" aria-hidden="true" />
                    {t.safety}
                  </h2>
                  <p className="mt-2.5 leading-relaxed text-ink-soft">{safety}</p>
                </section>
              )}

              <p className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {t.disclaimer}
              </p>

              <Link href={href(locale, "services")} className="link-arrow">
                <ArrowLeft className="size-4" aria-hidden="true" />
                {t.allServices}
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-page mt-24" aria-labelledby="related-title">
          <h2 id="related-title" className="text-2xl font-semibold text-ink sm:text-3xl">
            {t.related}
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <li key={s.id}>
                <ServiceCard service={s} locale={locale} dict={dict} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
