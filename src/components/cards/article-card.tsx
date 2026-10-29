import Image from "next/image";
import Link from "next/link";
import { CalendarDays, HeartPulse, Newspaper, Play, Sparkles } from "lucide-react";
import { formatDate, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { newsCategoryLabels, type Article, type NewsCategory } from "@/content/news";
import { Swoosh } from "@/components/ui/section";

const coverStyles: Record<NewsCategory, string> = {
  center:
    "bg-[linear-gradient(135deg,#e9e8ff_0%,#f3efff_55%,#fdf2e9_100%)] dark:bg-[linear-gradient(135deg,#25265a_0%,#2a2350_55%,#3a2430_100%)]",
  events:
    "bg-[linear-gradient(135deg,#fff1e6_0%,#fde7ef_55%,#efeaff_100%)] dark:bg-[linear-gradient(135deg,#3b2621_0%,#3a2133_55%,#28244f_100%)]",
  press:
    "bg-[linear-gradient(135deg,#eef1f7_0%,#e8ebf5_55%,#f1f4e4_100%)] dark:bg-[linear-gradient(135deg,#1e2337_0%,#22283f_55%,#262e22_100%)]",
  health:
    "bg-[linear-gradient(135deg,#f0f7dd_0%,#e7f3ee_55%,#ecebff_100%)] dark:bg-[linear-gradient(135deg,#27311b_0%,#1d302b_55%,#25254a_100%)]",
};

function CoverIcon({ article }: { article: Article }) {
  const className = "size-6 text-accent-ink";
  if (article.video) return <Play className={className} aria-hidden="true" />;
  switch (article.category) {
    case "events":
      return <CalendarDays className={className} aria-hidden="true" />;
    case "press":
      return <Newspaper className={className} aria-hidden="true" />;
    case "health":
      return <HeartPulse className={className} aria-hidden="true" />;
    default:
      return <Sparkles className={className} aria-hidden="true" />;
  }
}

/** Designed typographic cover for articles without a suitable photograph. */
export function ArticleCover({ article, locale, large = false }: { article: Article; locale: Locale; large?: boolean }) {
  const text = article.coverLabel?.[locale] ?? article.source?.name ?? newsCategoryLabels[article.category][locale];
  return (
    <div className={`relative isolate h-full w-full overflow-hidden ${coverStyles[article.category]}`} aria-hidden="true">
      <Swoosh className="absolute -right-28 -bottom-16 w-[34rem] max-w-none" />
      <div className={`absolute inset-0 flex flex-col justify-between ${large ? "p-8 sm:p-10" : "p-5 sm:p-6"}`}>
        <span className="grid size-11 place-items-center rounded-full bg-white/70 shadow-sm backdrop-blur dark:bg-white/10">
          <CoverIcon article={article} />
        </span>
        <p
          className={`max-w-[18ch] leading-[1.05] font-semibold tracking-tight text-ink/75 ${large ? "text-3xl sm:text-[2.6rem]" : "text-2xl sm:text-[1.65rem]"}`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export function ArticleCard({
  article,
  locale,
  featured = false,
}: {
  article: Article;
  locale: Locale;
  featured?: boolean;
}) {
  const link = href(locale, "news", article.slug[locale]);
  return (
    <article
      className={`card card-interactive group relative flex h-full overflow-hidden ${
        featured ? "flex-col lg:grid lg:grid-cols-[1.15fr_1fr]" : "flex-col"
      }`}
    >
      <div className={`photo-zoom relative overflow-hidden ${featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]" : "aspect-[16/10]"}`}>
        {article.cover ? (
          <Image
            src={article.cover.src}
            alt={article.cover.alt[locale]}
            fill
            sizes={featured ? "(min-width: 1024px) 40rem, 100vw" : "(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"}
            className="object-cover"
            placeholder="blur"
          />
        ) : (
          <ArticleCover article={article} locale={locale} large={featured} />
        )}
      </div>
      <div className={`flex flex-1 flex-col ${featured ? "p-7 sm:p-10" : "p-6"}`}>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-[0.1em] text-accent-ink uppercase">
          <span>{newsCategoryLabels[article.category][locale]}</span>
          <span aria-hidden="true" className="text-muted">
            ·
          </span>
          <time dateTime={article.date} className="text-muted">
            {formatDate(article.date, locale)}
          </time>
        </p>
        <h3 className={`mt-3 font-semibold leading-snug text-ink ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>
          <Link href={link} className="after:absolute after:inset-0">
            {article.title[locale]}
          </Link>
        </h3>
        <p className={`mt-3 leading-relaxed text-muted ${featured ? "text-lg" : "line-clamp-3"}`}>
          {article.excerpt[locale]}
        </p>
      </div>
    </article>
  );
}
