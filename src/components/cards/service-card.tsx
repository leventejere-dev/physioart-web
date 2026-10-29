import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import type { Service, ServiceFormat } from "@/content/services";

export function formatLabel(format: ServiceFormat, dict: Dictionary) {
  const minutes = format.minutes ? `${format.minutes} ${dict.common.minutes}` : undefined;
  const label = format.label ? dict.formats[format.label] : undefined;
  return [label, minutes].filter(Boolean).join(" · ");
}

export function ServiceCard({ service, locale, dict }: { service: Service; locale: Locale; dict: Dictionary }) {
  const durations = service.formats.filter((f) => f.minutes && !f.label);
  const variants = service.formats.filter((f) => f.label);

  return (
    <article className="card card-interactive group relative flex h-full flex-col p-6 sm:p-7">
      <p className="card-category text-xs font-semibold tracking-[0.12em] text-accent-ink uppercase">
        {dict.categories[service.category]}
      </p>
      <h3 className="mt-3 text-xl font-semibold leading-snug text-ink">
        <Link href={href(locale, "services", service.slug[locale])} className="after:absolute after:inset-0 after:rounded-[inherit]">
          {service.name[locale]}
        </Link>
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{service.short[locale]}</p>

      {service.formats.length > 0 && (
        <div className="mt-5">
          <p className="sr-only">{dict.services.card.durations}</p>
          <ul className="flex flex-wrap gap-1.5">
            {durations.length > 0 && (
              <li className="chip">
                {durations.map((d) => d.minutes).join(" / ")} {dict.common.minutes}
              </li>
            )}
            {variants.map((format) => (
              <li key={formatLabel(format, dict)} className="chip">
                {formatLabel(format, dict)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <span className="link-arrow mt-6 text-sm" aria-hidden="true">
        {dict.common.details}
        <ArrowRight className="size-4" />
      </span>
    </article>
  );
}
