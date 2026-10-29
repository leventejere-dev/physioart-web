import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { articles } from "@/content/news";
import { PageHero } from "@/components/ui/section";
import { ArticleCard } from "@/components/cards/article-card";
import { FinalCta } from "@/components/ui/final-cta";

export function NewsPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.news;
  const [latest, ...rest] = articles;

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      <section className="container-page" aria-label={t.featured}>
        <ArticleCard article={latest} locale={locale} featured />
      </section>

      <section className="container-page mt-10" aria-label={t.hero.title}>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
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
