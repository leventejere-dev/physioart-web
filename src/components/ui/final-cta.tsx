import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { Swoosh } from "./section";

interface FinalCtaProps {
  locale: Locale;
  dict: Dictionary;
  title?: string;
  lead?: string;
}

export function FinalCta({ locale, dict, title, lead }: FinalCtaProps) {
  return (
    <section className="container-page mt-24 sm:mt-32" aria-labelledby="final-cta-title">
      <div className="reveal relative overflow-hidden rounded-[var(--radius-panel)] bg-[linear-gradient(135deg,#3f37c9_0%,#5b4fe6_48%,#7c5cf0_100%)] px-6 py-14 text-white shadow-[var(--shadow-lift)] sm:px-12 sm:py-16 lg:px-16">
        <Swoosh className="pointer-events-none absolute -right-40 -bottom-24 w-[52rem] opacity-60 mix-blend-screen" />
        <div
          className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative max-w-2xl">
          <h2 id="final-cta-title" className="text-3xl font-semibold leading-tight sm:text-4xl">
            {title ?? dict.home.cta.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/85">{lead ?? dict.home.cta.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={href(locale, "booking")}
              className="btn min-h-12 bg-white px-6 text-[#3730a3] shadow-lg hover:-translate-y-0.5 hover:bg-white"
            >
              {dict.home.cta.primary}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={site.phone.href}
              className="btn min-h-12 border border-white/35 px-6 text-white hover:bg-white/10"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
