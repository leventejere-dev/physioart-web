import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { getServiceById, needs, serviceCategories, services } from "@/content/services";
import { PageHero } from "@/components/ui/section";
import { FinalCta } from "@/components/ui/final-cta";
import { ServiceCard } from "@/components/cards/service-card";
import { ServiceExplorer } from "@/components/services/service-explorer";

export function ServicesPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.services;
  const consultation = getServiceById("consultation");

  const cards = Object.fromEntries(
    services.map((service) => [service.id, <ServiceCard key={service.id} service={service} locale={locale} dict={dict} />]),
  );

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      <section className="container-page" aria-label={t.hero.title}>
        <ServiceExplorer
          items={services.map((s) => ({ id: s.id, category: s.category, needs: s.needs }))}
          cards={cards}
          categories={serviceCategories.map((key) => ({
            key,
            label: dict.categories[key],
            description: dict.categoryDescriptions[key],
          }))}
          needs={needs.map((key) => ({ key, label: dict.needs[key].title }))}
          labels={t.filters}
        />
      </section>

      <section className="container-page mt-20" aria-labelledby="help-title">
        <div className="card flex flex-col gap-6 rounded-[var(--radius-panel)] p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 id="help-title" className="text-2xl font-semibold text-ink">
              {t.help.title}
            </h2>
            <p className="mt-2 leading-relaxed text-muted">{t.help.text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={href(locale, "services", consultation.slug[locale])} className="btn btn-primary">
              {consultation.name[locale]}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a href={site.phone.href} className="btn btn-secondary">
              <Phone className="size-4" aria-hidden="true" />
              {site.phone.display}
            </a>
          </div>
        </div>
      </section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
