import Link from "next/link";
import { ArrowRight, ArrowUpRight, Info, LogIn, Phone, Smartphone } from "lucide-react";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { getServiceById } from "@/content/services";
import { PageHero } from "@/components/ui/section";
import { AppStoreButtons } from "@/components/ui/app-store-buttons";

export function BookingPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.booking;
  const consultation = getServiceById("consultation");

  const iconWrap = "grid size-12 place-items-center rounded-2xl";

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      <section className="container-page" aria-label={t.hero.title}>
        <ul className="grid gap-5 lg:grid-cols-3">
          <li className="card relative flex flex-col rounded-[1.5rem] border-accent/30 p-7 ring-1 ring-accent/20 sm:p-8">
            <span className="absolute top-6 right-6 rounded-full bg-lime-soft px-3 py-1 text-xs font-semibold text-ink">
              {t.recommended}
            </span>
            <span className={`${iconWrap} bg-accent text-on-accent shadow-[var(--shadow-glow)]`}>
              <Smartphone className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-6 text-2xl font-semibold text-ink">{t.app.title}</h2>
            <p className="mt-3 flex-1 leading-relaxed text-muted">{t.app.text}</p>
            <AppStoreButtons appStoreLabel={dict.footer.appStore} googlePlayLabel={dict.footer.googlePlay} className="mt-7" />
          </li>

          <li className="card flex flex-col rounded-[1.5rem] p-7 sm:p-8">
            <span className={`${iconWrap} bg-accent-soft text-accent-ink`}>
              <LogIn className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-6 text-2xl font-semibold text-ink">{t.portal.title}</h2>
            <p className="mt-3 flex-1 leading-relaxed text-muted">{t.portal.text}</p>
            <a href={site.portal.clientLogin} className="btn btn-primary mt-7 min-h-12 self-start">
              {t.portal.cta}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </li>

          <li className="card flex flex-col rounded-[1.5rem] p-7 sm:p-8">
            <span className={`${iconWrap} bg-lime-soft text-lime`}>
              <Phone className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-6 text-2xl font-semibold text-ink">{t.phone.title}</h2>
            <p className="mt-3 flex-1 leading-relaxed text-muted">{t.phone.text}</p>
            <a
              href={site.phone.href}
              className="mt-7 inline-flex items-center gap-3 self-start text-2xl font-semibold tracking-tight text-ink transition-colors hover:text-accent-ink"
            >
              <Phone className="size-5 text-accent" aria-hidden="true" />
              {site.phone.display}
            </a>
          </li>
        </ul>
      </section>

      <section className="container-page mt-20" aria-labelledby="steps-title">
        <h2 id="steps-title" className="text-2xl font-semibold text-ink sm:text-3xl">
          {t.steps.title}
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {t.steps.items.map((step, index) => (
            <li key={step.title} className="reveal flex gap-5 rounded-[var(--radius-card)] border border-line p-6">
              <span className="step-number">{index + 1}</span>
              <div>
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page mt-16 grid gap-5 lg:grid-cols-2" aria-label={t.prepare.title}>
        <div className="card rounded-[1.5rem] p-7 sm:p-8">
          <h2 className="text-xl font-semibold text-ink">{t.prepare.title}</h2>
          <ul className="prose-article mt-5 text-base">
            {t.prepare.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="card flex flex-col rounded-[1.5rem] p-7 sm:p-8">
          <h2 className="text-xl font-semibold text-ink">{t.unsure.title}</h2>
          <p className="mt-3 flex-1 leading-relaxed text-muted">{t.unsure.text}</p>
          <Link href={href(locale, "services", consultation.slug[locale])} className="link-arrow mt-6">
            {t.unsure.cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="container-page mt-10">
        <p className="flex gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-5 text-sm leading-relaxed text-muted">
          <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          {t.note}
        </p>
      </section>
    </>
  );
}
