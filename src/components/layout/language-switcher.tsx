"use client";

import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale, type Localized } from "@/i18n/config";

interface LanguageSwitcherProps {
  locale: Locale;
  routes: Localized[];
  label: string;
  size?: "sm" | "md";
}

function rememberLocale(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;samesite=lax`;
}

export function LanguageSwitcher({ locale, routes, label, size = "sm" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const current = routes.find((route) => route[locale] === pathname);

  return (
    <nav aria-label={label}>
      <ul className="flex rounded-full border border-line bg-surface-muted p-1">
        {locales.map((target) => {
          const active = target === locale;
          const targetHref = current?.[target] ?? `/${target}`;
          return (
            <li key={target}>
              <a
                href={targetHref}
                hrefLang={target}
                lang={target}
                aria-current={active ? "true" : undefined}
                title={localeLabels[target].name}
                onClick={() => rememberLocale(target)}
                className={`grid place-items-center rounded-full font-semibold tracking-wide transition-colors ${
                  size === "md" ? "h-10 min-w-12 px-3 text-sm" : "h-8 min-w-9 px-2 text-xs"
                } ${active ? "bg-surface-strong text-accent-ink shadow-sm" : "text-muted hover:text-ink"}`}
              >
                <span aria-hidden="true">{localeLabels[target].short}</span>
                <span className="sr-only">{localeLabels[target].name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
