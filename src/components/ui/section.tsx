import { useId, type ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  id?: string;
  action?: ReactNode;
}

export function SectionHeading({ eyebrow, title, lead, align = "left", id, action }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-6 ${centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="mt-4 text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        {lead && <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  breadcrumb?: ReactNode;
}

/** Typographic header used on inner pages. */
export function PageHero({ eyebrow, title, lead, children, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-16">
      <Swoosh className="pointer-events-none absolute -top-10 right-[-12rem] hidden w-[46rem] opacity-70 md:block" />
      <div className="container-page relative">
        {breadcrumb}
        <div className="hero-enter max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

/** Decorative arcs echoing the swoosh under the PhysioArt logo. */
export function Swoosh({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const a = `sw-a-${id}`;
  const b = `sw-b-${id}`;
  return (
    <svg viewBox="0 0 800 400" fill="none" aria-hidden="true" className={className}>
      <path d="M40 330C210 180 470 120 770 150" stroke={`url(#${a})`} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M90 370C260 230 500 180 780 205" stroke={`url(#${b})`} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M150 395C320 285 540 245 790 262" stroke={`url(#${a})`} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <defs>
        <linearGradient id={a} x1="40" y1="330" x2="770" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="0.55" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--violet)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={b} x1="90" y1="370" x2="780" y2="205" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--lime)" stopOpacity="0" />
          <stop offset="0.6" stopColor="var(--lime)" stopOpacity="0.45" />
          <stop offset="1" stopColor="var(--lime)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
