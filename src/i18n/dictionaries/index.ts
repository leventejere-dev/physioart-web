import type { Locale } from "../config";
import en, { type Dictionary } from "./en";
import hu from "./hu";
import ro from "./ro";

const dictionaries: Record<Locale, Dictionary> = { hu, ro, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Replaces `{name}` placeholders in a dictionary string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

export type { Dictionary };
