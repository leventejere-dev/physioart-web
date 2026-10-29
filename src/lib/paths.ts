/** Base path when the site is served from a sub-folder (GitHub Pages project sites). Empty otherwise. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** `/hu/rolunk/` and `/hu/rolunk` refer to the same page (static export uses trailing slashes). */
export function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}
