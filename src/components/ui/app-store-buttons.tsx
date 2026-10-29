import { Apple } from "lucide-react";
import { site } from "@/config/site";
import { GooglePlayIcon } from "./brand-icons";

interface AppStoreButtonsProps {
  appStoreLabel: string;
  googlePlayLabel: string;
  className?: string;
}

export function AppStoreButtons({ appStoreLabel, googlePlayLabel, className = "" }: AppStoreButtonsProps) {
  const base =
    "group inline-flex min-h-12 items-center gap-3 rounded-2xl border border-line-strong bg-surface-strong px-4 py-2 text-left shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-accent";
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={site.apps.ios} className={base} rel="noopener">
        <Apple className="size-6 shrink-0" aria-hidden="true" />
        <span className="grid leading-tight">
          <span className="text-[0.6875rem] text-muted">{appStoreLabel}</span>
          <span className="text-[0.9375rem] font-semibold">App Store</span>
        </span>
      </a>
      <a href={site.apps.android} className={base} rel="noopener">
        <GooglePlayIcon className="size-5 shrink-0" />
        <span className="grid leading-tight">
          <span className="text-[0.6875rem] text-muted">{googlePlayLabel}</span>
          <span className="text-[0.9375rem] font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
