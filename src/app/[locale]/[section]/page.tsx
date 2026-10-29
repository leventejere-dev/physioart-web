import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { sectionFromSlug, sectionKeys, sectionSlugs, type SectionKey } from "@/i18n/routes";
import { pageMetadata } from "@/lib/seo";
import { AboutPage } from "@/components/pages/about-page";
import { ServicesPage } from "@/components/pages/services-page";
import { NewsPage } from "@/components/pages/news-page";
import { ContactPage } from "@/components/pages/contact-page";
import { BookingPage } from "@/components/pages/booking-page";

type Params = PageProps<"/[locale]/[section]">["params"];

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  const slugs = sectionSlugs[params.locale];
  return sectionKeys.map((key) => ({ section: slugs[key] }));
}

async function resolve(params: Params) {
  const { locale, section } = await params;
  if (!isLocale(locale)) return null;
  const key = sectionFromSlug(locale, section);
  return key ? { locale, key } : null;
}

const meta: Record<SectionKey, (d: Dictionary) => { title: string; description: string }> = {
  about: (d) => ({ title: d.about.metaTitle, description: d.about.metaDescription }),
  services: (d) => ({ title: d.services.metaTitle, description: d.services.metaDescription }),
  news: (d) => ({ title: d.news.metaTitle, description: d.news.metaDescription }),
  contact: (d) => ({ title: d.contact.metaTitle, description: d.contact.metaDescription }),
  booking: (d) => ({ title: d.booking.metaTitle, description: d.booking.metaDescription }),
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const route = await resolve(params);
  if (!route) return {};
  const { title, description } = meta[route.key](getDictionary(route.locale));
  return pageMetadata({ locale: route.locale, ref: { section: route.key }, title, description });
}

const pages: Record<SectionKey, (props: { locale: Locale; dict: Dictionary }) => React.ReactNode> = {
  about: AboutPage,
  services: ServicesPage,
  news: NewsPage,
  contact: ContactPage,
  booking: BookingPage,
};

export default async function SectionPage({ params }: { params: Params }) {
  const route = await resolve(params);
  if (!route) notFound();
  const Page = pages[route.key];
  return <Page locale={route.locale} dict={getDictionary(route.locale)} />;
}
