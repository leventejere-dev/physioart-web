import type { StaticImageData } from "next/image";
import type { Localized } from "@/i18n/config";

export type NewsCategory = "center" | "events" | "press" | "health";

export interface ArticleImage {
  src: StaticImageData;
  alt: Localized;
  caption?: Localized;
}

export interface ArchivedArticle {
  id: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  category: NewsCategory;
  slug: Localized;
  title: Localized;
  excerpt: Localized;
  /** Trusted, hand-maintained HTML (p, h2, ul, li, a). */
  body: Localized;
  /** Original publication. `url` is omitted when the publisher has removed the article and no archive exists. */
  source?: { name: string; url?: string };
  video?: { youtubeId: string };
  /** Short text shown on the typographic cover (defaults to the source or category). */
  coverLabel?: Localized;
}

export interface Article extends ArchivedArticle {
  cover?: ArticleImage;
  /** A document or photo shown after the article body. */
  figure?: ArticleImage;
}
