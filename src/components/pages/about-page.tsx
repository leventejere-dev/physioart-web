import Image from "next/image";
import { GraduationCap, Quote } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { team } from "@/content/team";
import { getServiceById } from "@/content/services";
import { PageHero, SectionHeading } from "@/components/ui/section";
import { FinalCta } from "@/components/ui/final-cta";
import { AppStoreButtons } from "@/components/ui/app-store-buttons";

import groupPhoto from "@/assets/photos/group-exercise-session.jpg";
import diplomasPhoto from "@/assets/photos/training-3d-schroth-diplomas.jpg";

export function AboutPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.about;
  const analysisPhoto = getServiceById("postural-analysis").photos![0];

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      {/* Intro + philosophy */}
      <section className="container-page" aria-labelledby="intro-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="reveal">
            <h2 id="intro-title" className="text-3xl font-semibold text-ink sm:text-4xl">
              {t.intro.title}
            </h2>
            {t.intro.paragraphs.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
          <figure className="reveal card relative rounded-[var(--radius-panel)] p-8 sm:p-10">
            <Quote className="size-9 text-accent" aria-hidden="true" />
            <blockquote className="mt-5 text-2xl leading-snug font-medium tracking-tight text-ink sm:text-[1.75rem]">
              {t.philosophy.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-line pt-6">
              <p className="font-semibold text-ink">{t.philosophy.title}</p>
              <p className="mt-2 leading-relaxed text-muted">{t.philosophy.text}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Approach */}
      <section className="container-page mt-24 sm:mt-28" aria-labelledby="approach-title">
        <SectionHeading id="approach-title" eyebrow={t.approach.eyebrow} title={t.approach.title} />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.approach.steps.map((step, index) => (
            <li key={step.title} className="reveal card relative overflow-hidden p-6 sm:p-7">
              <span className="step-number">{index + 1}</span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
              {index < t.approach.steps.length - 1 && (
                <span
                  className="absolute top-12 right-6 hidden h-px w-10 bg-gradient-to-r from-accent/40 to-transparent lg:block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Team */}
      <section id="team" className="container-page mt-24 scroll-mt-28 sm:mt-28" aria-labelledby="team-title">
        <SectionHeading id="team-title" eyebrow={t.team.eyebrow} title={t.team.title} lead={t.team.lead} />
        <div className="mt-12 grid gap-8">
          {team.map((member, index) => (
            <article
              key={member.id}
              id={member.id}
              className={`reveal card scroll-mt-28 grid overflow-hidden rounded-[var(--radius-panel)] ${
                index % 2 ? "lg:grid-cols-[1.4fr_0.85fr]" : "lg:grid-cols-[0.85fr_1.4fr]"
              }`}
              aria-labelledby={`member-${member.id}`}
            >
              <div
                className={`relative aspect-[4/5] bg-surface-muted sm:aspect-[4/3] lg:aspect-auto lg:min-h-[34rem] ${index % 2 ? "lg:order-last" : ""}`}
              >
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  className="object-cover object-[50%_12%]"
                />
              </div>
              <div className="p-7 sm:p-10">
                <h3 id={`member-${member.id}`} className="text-3xl font-semibold text-ink">
                  {member.name}
                </h3>
                <p className="mt-2 font-medium text-accent-ink">{member.role[locale]}</p>
                {member.bio[locale].map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-muted">
                    {p}
                  </p>
                ))}

                <h4 className="mt-7 text-sm font-semibold text-ink">{t.team.specializations}</h4>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {member.focus[locale].map((f) => (
                    <li key={f} className="chip">
                      {f}
                    </li>
                  ))}
                </ul>

                <details className="group mt-7 rounded-2xl border border-line bg-surface-strong/60 open:bg-surface-strong">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    <span className="inline-flex items-center gap-2">
                      <GraduationCap className="size-4 text-accent" aria-hidden="true" />
                      {t.team.qualifications}
                    </span>
                    <span className="text-lg leading-none text-muted transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <ol className="grid gap-3 px-5 pt-1 pb-5">
                    {member.qualifications.map((q) => (
                      <li key={`${q.year}-${q.title.en}`} className="grid grid-cols-[3.25rem_1fr] gap-3 text-[0.9375rem]">
                        <span className="font-semibold text-accent-ink tabular-nums">{q.year}</span>
                        <span className="leading-relaxed text-ink-soft">{q.title[locale]}</span>
                      </li>
                    ))}
                  </ol>
                </details>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Environment */}
      <section className="container-page mt-24 sm:mt-28" aria-labelledby="env-title">
        <SectionHeading id="env-title" eyebrow={t.environment.eyebrow} title={t.environment.title} lead={t.environment.lead} />
        <div className="mt-12 grid gap-5 md:grid-cols-[1.6fr_1fr]">
          <figure className="reveal">
            <div className="photo-frame aspect-[3/2]">
              <Image
                src={groupPhoto}
                alt={t.environment.captions.group}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 46rem, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-muted">{t.environment.captions.group}</figcaption>
          </figure>
          <figure className="reveal">
            <div className="photo-frame aspect-[3/2] md:aspect-[4/5]">
              <Image
                src={analysisPhoto.src}
                alt={analysisPhoto.alt[locale]}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 28rem, 100vw"
                className="object-cover object-[50%_60%]"
              />
            </div>
            <figcaption className="mt-3 text-sm text-muted">{t.environment.captions.analysis}</figcaption>
          </figure>
        </div>
      </section>

      {/* Continuous learning */}
      <section className="container-page mt-24 sm:mt-28" aria-labelledby="learning-title">
        <div className="card grid items-center gap-10 overflow-hidden rounded-[var(--radius-panel)] p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:p-14">
          <div className="reveal">
            <p className="eyebrow">{t.learning.eyebrow}</p>
            <h2 id="learning-title" className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
              {t.learning.title}
            </h2>
            <p className="mt-4 text-lg text-muted">{t.learning.lead}</p>
            <ul className="mt-7 grid gap-4">
              {t.learning.items.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                  <GraduationCap className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal photo-frame mx-auto aspect-[4/5] w-full max-w-sm">
            <Image
              src={diplomasPhoto}
              alt={t.learning.imageAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 24rem, 80vw"
              className="object-cover object-[50%_35%]"
            />
          </div>
        </div>
      </section>

      {/* App */}
      <section className="container-page mt-16" aria-labelledby="app-title">
        <div className="flex flex-col gap-6 rounded-[var(--radius-card)] border border-line px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="max-w-xl">
            <h2 id="app-title" className="text-lg font-semibold text-ink">
              {t.app.title}
            </h2>
            <p className="mt-1.5 text-muted">{t.app.text}</p>
          </div>
          <AppStoreButtons appStoreLabel={dict.footer.appStore} googlePlayLabel={dict.footer.googlePlay} />
        </div>
      </section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
