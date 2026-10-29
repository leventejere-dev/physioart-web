import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bone,
  CalendarCheck,
  ClipboardList,
  Dumbbell,
  Footprints,
  Globe,
  Leaf,
  MapPin,
  PersonStanding,
  Phone,
  ScanLine,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { formatAddress, site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { categoryPhotos, getServiceById, needs, serviceCategories, services, type Need } from "@/content/services";
import { team } from "@/content/team";
import { articles } from "@/content/news";
import { SectionHeading, Swoosh } from "@/components/ui/section";
import { FinalCta } from "@/components/ui/final-cta";
import { ArticleCard } from "@/components/cards/article-card";

import heroPhoto from "@/assets/photos/hero-guided-exercise.jpg";
import aboutPhoto from "@/assets/photos/guided-suspension-exercise.jpg";

/** Service each entry of `home.methods.items` links to (same order as the dictionary). */
const methodServices = [
  "mckenzie",
  "schroth",
  "manual-therapy",
  "physiotherapy",
  "kinesio-taping",
  "postural-analysis",
  "tecar",
];

const needIcons: Record<Need, LucideIcon> = {
  "back-neck": Bone,
  sports: Dumbbell,
  "post-op": Stethoscope,
  posture: PersonStanding,
  scoliosis: ScanLine,
  mobility: Footprints,
  recovery: Leaf,
};

export function HomePage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home;
  const address = formatAddress(locale);
  const servicesHref = href(locale, "services");
  const consultation = getServiceById("consultation");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Swoosh className="pointer-events-none absolute top-24 -left-64 hidden w-[60rem] max-w-none opacity-60 lg:block" />
        <div className="container-page grid items-center gap-12 pt-8 pb-14 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-16 lg:pb-20 xl:gap-20">
          <div className="hero-enter relative">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1 className="mt-6 text-[2.7rem] leading-[1.02] font-semibold text-ink sm:text-6xl lg:text-[4.1rem] xl:text-[4.5rem]">
              {t.hero.titleStart} <span className="text-emphasis">{t.hero.titleEmphasis}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{t.hero.lead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={href(locale, "booking")} className="btn btn-primary min-h-13 px-7 text-base">
                <CalendarCheck className="size-5" aria-hidden="true" />
                {t.hero.primary}
              </Link>
              <Link href={servicesHref} className="btn btn-secondary min-h-13 px-7 text-base">
                {t.hero.secondary}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-10 grid gap-3 text-[0.9375rem] text-ink-soft sm:flex sm:flex-wrap sm:gap-x-7">
              <li>
                <a href={site.phone.href} className="inline-flex items-center gap-2 font-medium hover:text-accent-ink">
                  <Phone className="size-4 text-accent" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={site.maps.directions}
                  rel="noopener"
                  className="inline-flex items-center gap-2 hover:text-accent-ink"
                >
                  <MapPin className="size-4 text-accent" aria-hidden="true" />
                  {address.line1}, {site.address.city[locale]}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <Globe className="size-4 text-accent" aria-hidden="true" />
                {t.hero.languages}
              </li>
            </ul>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgb(124_108_240/0.28),transparent)] blur-2xl"
              aria-hidden="true"
            />
            <div className="photo-frame aspect-[4/3.3] sm:aspect-[5/4]">
              <Image
                src={heroPhoto}
                alt={t.hero.imageAlt}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1280px) 34rem, (min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[55%_50%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Methods */}
      <section aria-labelledby="methods-title" className="container-page mt-4">
        <div className="card flex flex-col gap-4 rounded-[1.5rem] px-6 py-5 md:flex-row md:items-center md:gap-8 md:px-8">
          <h2 id="methods-title" className="shrink-0 text-sm font-semibold text-muted">
            {t.methods.label}
          </h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
            {t.methods.items.map((item, index) => (
              <li key={item}>
                <Link
                  href={href(locale, "services", getServiceById(methodServices[index]).slug[locale])}
                  className="inline-flex items-center gap-2 rounded-full text-[0.9375rem] font-medium text-ink-soft transition-colors hover:text-accent-ink"
                >
                  <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About preview */}
      <section className="container-page mt-24 sm:mt-32" aria-labelledby="about-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal photo-frame aspect-[4/3] lg:order-none">
            <Image
              src={aboutPhoto}
              alt={t.about.imageAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover object-[45%_50%]"
            />
          </div>
          <div className="reveal">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 id="about-title" className="mt-4 text-3xl leading-[1.1] font-semibold text-ink sm:text-4xl lg:text-[2.75rem]">
              {t.about.title}
            </h2>
            {t.about.paragraphs.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <Link href={href(locale, "about")} className="link-arrow mt-8">
              {t.about.link}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service discovery */}
      <section className="container-page mt-24 sm:mt-32" aria-labelledby="services-title">
        <SectionHeading
          id="services-title"
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          lead={t.services.lead}
          action={
            <Link href={servicesHref} className="link-arrow">
              {t.services.link}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {serviceCategories.map((category) => {
            const photo = categoryPhotos[category];
            const items = services.filter((s) => s.category === category);
            return (
              <li key={category} className="reveal">
                <article className="card card-interactive group relative flex h-full flex-col overflow-hidden">
                  <div className="photo-zoom relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt[locale]}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1280px) 18rem, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold text-ink">
                      <Link
                        href={`${servicesHref}?category=${category}`}
                        className="after:absolute after:inset-0 after:rounded-[inherit]"
                      >
                        {dict.categories[category]}
                      </Link>
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{dict.categoryDescriptions[category]}</p>
                    <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                      {items.slice(0, 4).map((s) => (
                        <li key={s.id} className="relative z-10">
                          <Link
                            href={href(locale, "services", s.slug[locale])}
                            className="chip text-xs transition-colors hover:border-accent hover:text-accent-ink"
                          >
                            {s.name[locale]}
                          </Link>
                        </li>
                      ))}
                      {items.length > 4 && <li className="chip text-xs">+{items.length - 4}</li>}
                    </ul>
                    <span className="link-arrow mt-5 text-sm" aria-hidden="true">
                      {dict.common.viewAll}
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Common needs */}
      <section className="container-page mt-24 sm:mt-32" aria-labelledby="needs-title">
        <SectionHeading id="needs-title" eyebrow={t.needs.eyebrow} title={t.needs.title} lead={t.needs.lead} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {needs.map((need) => {
            const Icon = needIcons[need];
            return (
              <li key={need} className="reveal">
                <Link
                  href={`${servicesHref}?need=${need}`}
                  className="card card-interactive group flex h-full items-start gap-4 p-4 sm:flex-col sm:gap-0 sm:p-6"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-ink transition-colors group-hover:bg-accent group-hover:text-on-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="grid sm:mt-5">
                    <span className="text-lg font-semibold text-ink">{dict.needs[need].title}</span>
                    <span className="mt-1 text-[0.9375rem] leading-relaxed text-muted sm:mt-1.5">{dict.needs[need].text}</span>
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="reveal">
            <Link
              href={href(locale, "services", consultation.slug[locale])}
              className="group flex h-full items-start gap-4 rounded-[var(--radius-card)] border border-dashed border-line-strong p-4 transition-colors hover:border-accent hover:bg-accent-soft sm:flex-col sm:gap-0 sm:p-6"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-lime-soft text-lime">
                <ClipboardList className="size-5" aria-hidden="true" />
              </span>
              <span className="grid sm:mt-5">
                <span className="text-lg font-semibold text-ink">{dict.services.help.title}</span>
                <span className="mt-1 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-accent-ink sm:mt-1.5">
                  {consultation.name[locale]}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </section>

      {/* Team */}
      <section className="container-page mt-24 sm:mt-32" aria-labelledby="team-title">
        <SectionHeading
          id="team-title"
          eyebrow={t.team.eyebrow}
          title={t.team.title}
          lead={t.team.lead}
          action={
            <Link href={`${href(locale, "about")}#team`} className="link-arrow">
              {t.team.link}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />
        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {team.map((member) => (
            <li key={member.id} className="reveal">
              <article className="card card-interactive group relative flex h-full flex-col overflow-hidden sm:flex-row">
                <div className="relative aspect-[4/5] shrink-0 bg-surface-muted sm:aspect-auto sm:w-[42%]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 15rem, (min-width: 640px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-2xl font-semibold text-ink">
                    <Link
                      href={`${href(locale, "about")}#${member.id}`}
                      className="after:absolute after:inset-0 after:rounded-[inherit]"
                    >
                      {member.name}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-accent-ink">{member.role[locale]}</p>
                  <p className="mt-4 line-clamp-4 leading-relaxed text-muted">{member.bio[locale][0]}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {member.focus[locale].slice(0, 3).map((f) => (
                      <li key={f} className="chip text-xs">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* Why PhysioArt */}
      <section className="container-page mt-24 sm:mt-32" aria-labelledby="why-title">
        <div className="card rounded-[var(--radius-panel)] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <SectionHeading id="why-title" eyebrow={t.why.eyebrow} title={t.why.title} />
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {t.why.items.map((item, index) => (
              <li key={item.title} className="reveal">
                <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* News */}
      <section className="container-page mt-24 sm:mt-32" aria-labelledby="news-title">
        <SectionHeading
          id="news-title"
          eyebrow={t.news.eyebrow}
          title={t.news.title}
          action={
            <Link href={href(locale, "news")} className="link-arrow">
              {t.news.link}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <li key={article.id} className="reveal">
              <ArticleCard article={article} locale={locale} />
            </li>
          ))}
        </ul>
      </section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
