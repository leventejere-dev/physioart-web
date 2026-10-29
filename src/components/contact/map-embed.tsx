"use client";

import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

interface MapEmbedProps {
  embedUrl: string;
  placeUrl: string;
  labels: { title: string; load: string; notice: string; open: string; label: string };
  address: string;
}

/** Google Maps is only loaded after the visitor asks for it (privacy and performance). */
export function MapEmbed({ embedUrl, placeUrl, labels, address }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="photo-frame aspect-[4/3] sm:aspect-[21/9]">
      {loaded ? (
        <iframe
          src={embedUrl}
          title={labels.label}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <div className="absolute inset-0 overflow-hidden bg-surface-muted">
          {/* Abstract map: soft streets and a marker, drawn with SVG instead of loading a third-party image. */}
          <svg className="absolute inset-0 size-full text-line-strong" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 340" aria-hidden="true">
            <g stroke="currentColor" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.55">
              <path d="M-20 250C140 220 260 240 420 190S690 120 820 140" />
              <path d="M120 -20C150 90 170 200 150 360" />
              <path d="M520 -20C500 80 470 190 520 360" />
              <path d="M-20 80C200 110 420 90 820 60" strokeWidth="6" />
              <path d="M300 360C330 270 360 200 470 150" strokeWidth="6" />
            </g>
          </svg>
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div className="grid justify-items-center gap-4">
              <span className="grid size-14 place-items-center rounded-full bg-accent text-on-accent shadow-[var(--shadow-glow)]">
                <MapPin className="size-6" aria-hidden="true" />
              </span>
              <p className="font-semibold text-ink">{address}</p>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <button type="button" onClick={() => setLoaded(true)} className="btn btn-secondary">
                  {labels.load}
                </button>
                <a href={placeUrl} className="btn btn-ghost" rel="noopener">
                  {labels.open}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
              <p className="max-w-md text-xs text-muted">{labels.notice}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
