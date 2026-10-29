"use client";

import { useEffect, useRef, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { setTheme, useTheme, type Theme } from "@/lib/theme";

export interface ThemeLabels {
  theme: string;
  themeLight: string;
  themeDark: string;
  themeSystem: string;
}

const order: Theme[] = ["light", "dark", "system"];
const icons = { light: Sun, dark: Moon, system: Monitor } as const;

function labelFor(theme: Theme, labels: ThemeLabels) {
  return theme === "light" ? labels.themeLight : theme === "dark" ? labels.themeDark : labels.themeSystem;
}

/** Compact icon button with a small menu offering light, dark and system appearance. */
export function ThemeMenu({ labels }: { labels: ThemeLabels }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const Icon = icons[theme];
  const label = `${labels.theme}: ${labelFor(theme, labels)}`;

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface-muted hover:text-ink"
        aria-label={label}
        aria-expanded={open}
        title={label}
      >
        <Icon className="size-[1.15rem]" aria-hidden="true" />
      </button>
      {open && (
        <div
          role="radiogroup"
          aria-label={labels.theme}
          className="card absolute top-12 right-0 z-10 grid w-44 gap-1 rounded-2xl bg-surface-strong p-1.5"
        >
          {order.map((option) => {
            const OptionIcon = icons[option];
            const selected = option === theme;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => {
                  setTheme(option);
                  setOpen(false);
                }}
                className={`flex min-h-10 items-center gap-2.5 rounded-xl px-3 text-sm font-medium transition-colors ${
                  selected ? "bg-accent-soft text-accent-ink" : "text-ink-soft hover:bg-surface-muted hover:text-ink"
                }`}
              >
                <OptionIcon className="size-4" aria-hidden="true" />
                {labelFor(option, labels)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Segmented control with all three options, used in the mobile menu. */
export function ThemeSegmented({ labels }: { labels: ThemeLabels }) {
  const theme = useTheme();
  return (
    <div role="radiogroup" aria-label={labels.theme} className="inline-flex rounded-full border border-line bg-surface-muted p-1">
      {order.map((option) => {
        const Icon = icons[option];
        const selected = option === theme;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setTheme(option)}
            className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors ${
              selected ? "bg-surface-strong text-accent-ink shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            <Icon className="size-4" aria-hidden="true" />
            {labelFor(option, labels)}
          </button>
        );
      })}
    </div>
  );
}
