import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sectionFromSlug, sectionSlugs } from "@/i18n/routes";
import { getService, services } from "@/content/services";
import { articles, getArticle } from "@/content/news";
import { pageMetadata } from "@/lib/seo";
import { ServiceDetailPage } from "@/components/pages/service-detail-page";
import { ArticlePage } from "@/components/pages/article-page";

type Params = PageProps<"/[locale]/[section]/[slug]">["params"];

/** Called once per locale (from the root layout), so it returns both the section and the item slug. */
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  const locale = params.locale;
  const slugs = sectionSlugs[locale];
  return [
    ...services.map((s) => ({ section: slugs.services, slug: s.slug[locale] })),
    ...articles.map((a) => ({ section: slugs.news, slug: a.slug[locale] })),
  ];
}

async function resolve(params: Params) {
  const { locale, section, slug } = await params;
  if (!isLocale(locale)) return null;
  const key = sectionFromSlug(locale, section);
  if (key === "services") {
    const service = getService(locale, slug);
    return service ? { type: "service" as const, locale, service } : null;
  }
  if (key === "news") {
    const article = getArticle(locale, slug);
    return article ? { type: "article" as const, locale, article } : null;
  }
  return null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const route = await resolve(params);
  if (!route) return {};
  const { locale } = route;
  if (route.type === "service") {
    const s = route.service;
    const image = s.photos?.[0];
    return pageMetadata({
      locale,
      ref: { section: "services", item: s.slug },
      title: s.name[locale],
      description: s.short[locale],
      image: image
        ? { url: image.src.src, width: image.src.width, height: image.src.height, alt: image.alt[locale] }
        : undefined,
    });
  }
  const a = route.article;
  return pageMetadata({
    locale,
    ref: { section: "news", item: a.slug },
    title: a.title[locale],
    description: a.excerpt[locale],
    type: "article",
    publishedTime: a.date,
    image: a.cover
      ? { url: a.cover.src.src, width: a.cover.src.width, height: a.cover.src.height, alt: a.cover.alt[locale] }
      : undefined,
  });
}

export default async function DetailPage({ params }: { params: Params }) {
  const route = await resolve(params);
  if (!route) notFound();
  const dict = getDictionary(route.locale);
  return route.type === "service" ? (
    <ServiceDetailPage service={route.service} locale={route.locale} dict={dict} />
  ) : (
    <ArticlePage article={route.article} locale={route.locale} dict={dict} />
  );
}
