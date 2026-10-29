"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowUpRight, CalendarCheck, LogIn, MapPin, Menu, Phone, X } from "lucide-react";
import type { Locale, Localized } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href, type SectionKey } from "@/i18n/routes";
import { Logo } from "@/components/ui/logo";
import { normalizePath } from "@/lib/paths";
import { syncTheme } from "@/lib/theme";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeMenu, ThemeSegmented } from "./theme-toggle";

interface SiteHeaderProps {
  locale: Locale;
  labels: Dictionary["nav"];
  routes: Localized[];
  loginUrl: string;
  phone: { display: string; href: string };
  address: string;
}

const navSections = ["about", "services", "news", "contact"] as const satisfies readonly SectionKey[];

export function SiteHeader({ locale, labels, routes, loginUrl, phone, address }: SiteHeaderProps) {
  const pathname = normalizePath(usePathname());
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bookingHref = href(locale, "booking");

  const items = navSections.map((section) => {
    const target = href(locale, section);
    return {
      section,
      href: target,
      label: labels[section],
      active: pathname === target || pathname.startsWith(`${target}/`),
    };
  });

  const openMenu = () => dialogRef.current?.showModal();
  const closeMenu = () => dialogRef.current?.close();

  // On every route change: close the menu and re-apply the saved theme
  // (switching language swaps the root layout, which resets the <html> class).
  useEffect(() => {
    dialogRef.current?.close();
    syncTheme();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 pt-2 sm:pt-3">
      <div className="container-page">
        <div className="card flex h-16 items-center gap-2 rounded-full pr-2 pl-4 sm:pl-5">
          <Link href={href(locale)} className="shrink-0 rounded-lg" aria-label={`PhysioArt · ${labels.home}`}>
            <Logo className="h-9 w-auto sm:h-10" priority />
          </Link>

          <nav aria-label={labels.mainNavigation} className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li key={item.section}>
                  <Link
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    className={`inline-flex h-10 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors ${
                      item.active
                        ? "bg-accent-soft text-accent-ink"
                        : "text-ink-soft hover:bg-surface-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
            <div className="hidden lg:block">
              <LanguageSwitcher locale={locale} routes={routes} label={labels.language} />
            </div>
            <div className="hidden lg:block">
              <ThemeMenu labels={labels} />
            </div>
            <a
              href={loginUrl}
              className="hidden size-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface-muted hover:text-ink lg:grid xl:hidden"
              aria-label={labels.login}
              title={labels.login}
            >
              <LogIn className="size-[1.15rem]" aria-hidden="true" />
            </a>
            <a href={loginUrl} className="btn btn-ghost hidden px-3.5 text-sm xl:inline-flex">
              <LogIn className="size-4" aria-hidden="true" />
              {labels.login}
            </a>
            <Link href={bookingHref} className="btn btn-primary min-h-10 px-4 text-sm sm:px-5">
              <CalendarCheck className="hidden size-4 sm:block" aria-hidden="true" />
              <span className="sm:hidden">{labels.bookShort}</span>
              <span className="hidden sm:inline">{labels.book}</span>
            </Link>
            <button
              type="button"
              onClick={openMenu}
              className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface-muted lg:hidden"
              aria-label={labels.openMenu}
              aria-haspopup="dialog"
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="sheet m-0 ml-auto h-dvh max-h-dvh w-full max-w-md bg-canvas p-0 text-ink"
        aria-label={labels.menu}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="flex min-h-full flex-col px-5 pt-4 pb-8">
          <div className="flex h-14 items-center justify-between">
            <Logo className="h-9 w-auto" />
            <button
              type="button"
              onClick={closeMenu}
              className="grid size-11 place-items-center rounded-full border border-line bg-surface-strong"
              aria-label={labels.closeMenu}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={labels.mainNavigation} className="mt-6">
            <ul className="divide-y divide-line border-y border-line">
              {[{ section: "home", href: href(locale), label: labels.home, active: pathname === href(locale) }, ...items].map(
                (item) => (
                  <li key={item.section}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={item.active ? "page" : undefined}
                      className={`flex min-h-14 items-center justify-between text-2xl font-medium tracking-tight ${
                        item.active ? "text-accent-ink" : "text-ink"
                      }`}
                    >
                      {item.label}
                      {item.active && <span className="size-2 rounded-full bg-lime" aria-hidden="true" />}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="mt-6 grid gap-3">
            <Link href={bookingHref} onClick={closeMenu} className="btn btn-primary min-h-13 text-base">
              <CalendarCheck className="size-5" aria-hidden="true" />
              {labels.book}
            </Link>
            <a href={loginUrl} className="btn btn-secondary min-h-13 text-base">
              <LogIn className="size-5" aria-hidden="true" />
              {labels.login}
              <ArrowUpRight className="size-4 text-muted" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 grid gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-medium text-muted">{labels.language}</span>
              <LanguageSwitcher locale={locale} routes={routes} label={labels.language} size="md" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-medium text-muted">{labels.theme}</span>
              <ThemeSegmented labels={labels} />
            </div>
          </div>

          <div className="mt-auto grid gap-2 pt-10 text-sm text-ink-soft">
            <a href={phone.href} className="inline-flex min-h-11 items-center gap-2.5 font-medium">
              <Phone className="size-4 text-accent" aria-hidden="true" />
              {phone.display}
            </a>
            <p className="inline-flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-accent" aria-hidden="true" />
              {address}
            </p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
