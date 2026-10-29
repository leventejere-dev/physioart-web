"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Need, ServiceCategory } from "@/content/services";

interface ExplorerItem {
  id: string;
  category: ServiceCategory;
  needs: Need[];
}

interface ServiceExplorerProps {
  items: ExplorerItem[];
  cards: Record<string, ReactNode>;
  categories: { key: ServiceCategory; label: string; description: string }[];
  needs: { key: Need; label: string }[];
  labels: {
    category: string;
    need: string;
    all: string;
    anyNeed: string;
    results: string;
    empty: string;
    reset: string;
  };
}

type CategoryFilter = ServiceCategory | "all";
type NeedFilter = Need | "all";

export function ServiceExplorer({ items, cards, categories, needs, labels }: ServiceExplorerProps) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [need, setNeed] = useState<NeedFilter>("all");

  // Initialise from the URL (e.g. links from the homepage) after hydration.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("category");
    const n = params.get("need");
    /* eslint-disable react-hooks/set-state-in-effect -- reading the URL is only possible on the client */
    if (c && categories.some((x) => x.key === c)) setCategory(c as ServiceCategory);
    if (n && needs.some((x) => x.key === n)) setNeed(n as Need);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [categories, needs]);

  const update = (nextCategory: CategoryFilter, nextNeed: NeedFilter) => {
    setCategory(nextCategory);
    setNeed(nextNeed);
    const params = new URLSearchParams();
    if (nextCategory !== "all") params.set("category", nextCategory);
    if (nextNeed !== "all") params.set("need", nextNeed);
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  };

  const visible = items.filter(
    (item) => (category === "all" || item.category === category) && (need === "all" || item.needs.includes(need)),
  );
  const grouped = category === "all" && need === "all";

  const pill = (active: boolean) =>
    `inline-flex min-h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
      active
        ? "border-transparent bg-accent text-on-accent shadow-[var(--shadow-glow)]"
        : "border-line bg-surface-strong text-ink-soft hover:border-accent hover:text-accent-ink"
    }`;

  return (
    <div>
      <div className="card grid grid-cols-[minmax(0,1fr)] gap-5 rounded-[1.5rem] p-4 sm:p-6">
        <div className="min-w-0">
          <p id="filter-category" className="mb-3 text-xs font-semibold tracking-[0.12em] text-muted uppercase">
            {labels.category}
          </p>
          <div role="group" aria-labelledby="filter-category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap">
            <button type="button" aria-pressed={category === "all"} className={pill(category === "all")} onClick={() => update("all", need)}>
              {labels.all}
            </button>
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                aria-pressed={category === c.key}
                className={pill(category === c.key)}
                onClick={() => update(c.key, need)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className="min-w-0">
          <p id="filter-need" className="mb-3 text-xs font-semibold tracking-[0.12em] text-muted uppercase">
            {labels.need}
          </p>
          <div role="group" aria-labelledby="filter-need" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap">
            <button type="button" aria-pressed={need === "all"} className={pill(need === "all")} onClick={() => update(category, "all")}>
              {labels.anyNeed}
            </button>
            {needs.map((n) => (
              <button
                key={n.key}
                type="button"
                aria-pressed={need === n.key}
                className={pill(need === n.key)}
                onClick={() => update(category, n.key)}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {labels.results.replace("{count}", String(visible.length))}
      </p>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-[var(--radius-card)] border border-dashed border-line-strong p-10 text-center">
          <p className="text-ink-soft">{labels.empty}</p>
          <button type="button" className="btn btn-secondary mt-5" onClick={() => update("all", "all")}>
            {labels.reset}
          </button>
        </div>
      ) : grouped ? (
        <div className="mt-6 grid gap-16">
          {categories.map((c) => (
            <section key={c.key} aria-labelledby={`cat-${c.key}`}>
              <div className="max-w-2xl">
                <h2 id={`cat-${c.key}`} className="text-2xl font-semibold text-ink sm:text-3xl">
                  {c.label}
                </h2>
                <p className="mt-2 text-muted">{c.description}</p>
              </div>
              <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3 [&_.card-category]:hidden [&_.card-category+h3]:mt-0">
                {items
                  .filter((item) => item.category === c.key)
                  .map((item) => (
                    <li key={item.id}>{cards[item.id]}</li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.id}>{cards[item.id]}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
