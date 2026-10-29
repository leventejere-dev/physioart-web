"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface VideoEmbedProps {
  youtubeId: string;
  title: string;
  labels: { load: string; notice: string };
}

/** Click-to-load YouTube player: no third-party requests until the visitor asks for the video. */
export function VideoEmbed({ youtubeId, title, labels }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="photo-frame aspect-video">
      {loaded ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#e9e8ff,#f3efff_55%,#fdf2e9)] p-6 text-center dark:bg-[linear-gradient(135deg,#25265a,#2a2350_55%,#3a2430)]">
          <div className="grid justify-items-center gap-4">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="btn btn-primary min-h-13 px-6"
            >
              <Play className="size-5" aria-hidden="true" />
              {labels.load}
            </button>
            <p className="max-w-sm text-sm text-muted">{labels.notice}</p>
          </div>
        </div>
      )}
    </div>
  );
}
