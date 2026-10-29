import Link from "next/link";
import { locale as localeParam } from "next/root-params";
import { ArrowLeft } from "lucide-react";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";

export default async function NotFound() {
  const value = await localeParam();
  const locale = isLocale(value) ? value : defaultLocale;
  const t = getDictionary(locale).notFound;

  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-20">
      <div className="max-w-lg text-center">
        <p className="text-7xl font-semibold tracking-tight text-accent">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">{t.title}</h1>
        <p className="mt-4 text-lg text-muted">{t.text}</p>
        <Link href={href(locale)} className="btn btn-primary mt-8">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t.home}
        </Link>
      </div>
    </section>
  );
}
