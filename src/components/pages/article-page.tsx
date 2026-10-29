import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Newspaper } from "lucide-react";
import { formatDate, type Locale } from "@/i18n/config";
import { fill, type Dictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { articles, newsCategoryLabels, type Article } from "@/content/news";
import { absoluteUrl, assetUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FinalCta } from "@/components/ui/final-cta";
import { ArticleCard, ArticleCover } from "@/components/cards/article-card";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { VideoEmbed } from "@/components/news/video-embed";

export function ArticlePage({ article, locale, dict }: { article: Article; locale: Locale; dict: Dictionary }) {
  const t = dict.news;
  const url = href(locale, "news", article.slug[locale]);
  const more = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <>
      <article className="container-page pt-8 sm:pt-12">
        <Breadcrumbs
          label={dict.common.breadcrumb}
          items={[
            { label: dict.nav.home, href: href(locale) },
            { label: dict.nav.news, href: href(locale, "news") },
            { label: article.title[locale], href: url },
          ]}
        />

        <header className="hero-enter mx-auto max-w-3xl">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-accent-ink">
            <span>{newsCategoryLabels[article.category][locale]}</span>
            <span aria-hidden="true" className="text-muted">
              ·
            </span>
            <time dateTime={article.date} className="font-medium text-muted">
              {formatDate(article.date, locale)}
            </time>
          </p>
          <h1 className="mt-5 text-4xl leading-[1.08] font-semibold text-ink sm:text-5xl">{article.title[locale]}</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{article.excerpt[locale]}</p>
        </header>

        <div className="mx-auto mt-10 max-w-4xl">
          {article.cover ? (
            <figure>
              <div className="photo-frame aspect-[16/10]">
                <Image
                  src={article.cover.src}
                  alt={article.cover.alt[locale]}
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1024px) 56rem, 100vw"
                  className="object-cover object-[50%_45%]"
                />
              </div>
              {article.cover.caption && (
                <figcaption className="mt-3 text-sm text-muted">{article.cover.caption[locale]}</figcaption>
              )}
            </figure>
          ) : article.video ? null : (
            <div className="photo-frame aspect-[21/9]">
              <ArticleCover article={article} locale={locale} large />
            </div>
          )}
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {article.video && (
            <div className="mb-10">
              <VideoEmbed youtubeId={article.video.youtubeId} title={article.title[locale]} labels={t.video} />
            </div>
          )}

          <div className="prose-article" dangerouslySetInnerHTML={{ __html: article.body[locale] }} />

          {article.figure && (
            <figure className="mt-12">
              <div className="overflow-hidden rounded-[1.25rem] border border-line bg-white shadow-[var(--shadow-soft)]">
                <Image
                  src={article.figure.src}
                  alt={article.figure.alt[locale]}
                  placeholder="blur"
                  sizes="(min-width: 768px) 48rem, 100vw"
                  className="h-auto w-full"
                />
              </div>
              {article.figure.caption && (
                <figcaption className="mt-3 text-sm text-muted">{article.figure.caption[locale]}</figcaption>
              )}
            </figure>
          )}

          {article.source && (
            <aside className="card mt-12 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-3 text-ink-soft">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-ink">
                  <Newspaper className="size-5" aria-hidden="true" />
                </span>
                {fill(t.originallyPublished, { source: article.source.name })}
              </p>
              {article.source.url && (
                <a href={article.source.url} className="link-arrow shrink-0 text-sm" rel="noopener">
                  {t.readOriginal}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              )}
            </aside>
          )}

          <Link href={href(locale, "news")} className="link-arrow mt-12">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t.backToNews}
          </Link>
        </div>
      </article>

      <section className="container-page mt-24" aria-labelledby="more-news">
        <h2 id="more-news" className="text-2xl font-semibold text-ink sm:text-3xl">
          {dict.home.news.title}
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {more.map((a) => (
            <li key={a.id}>
              <ArticleCard article={a} locale={locale} />
            </li>
          ))}
        </ul>
      </section>

      <FinalCta locale={locale} dict={dict} />

      <ArticleJsonLd
        url={absoluteUrl(url)}
        title={article.title[locale]}
        description={article.excerpt[locale]}
        date={article.date}
        locale={locale}
        image={article.cover ? assetUrl(article.cover.src.src) : undefined}
      />
    </>
  );
}
