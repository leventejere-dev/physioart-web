# PhysioArt website

Multilingual (Hungarian, Romanian, English) public website for **PhysioArt**, a rehabilitation and physiotherapy centre in Sfântu Gheorghe / Sepsiszentgyörgy.

The design continues the visual identity of the current PhysioArt portal (`dev.physioart.ro`): Instrument Sans, a cool grey canvas with soft gradient tints, indigo/violet accents, the lime of the logo, rounded cards and light/dark themes.

> **Before launch:** read [`docs/CONTENT-REVIEW.md`](docs/CONTENT-REVIEW.md). It lists every fact, photo and integration that PhysioArt must confirm.

## Tech stack

| | |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Cache Components, Turbopack) |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Icons | lucide-react (brand icons are inline SVG) |
| Fonts | Instrument Sans via `next/font` (self-hosted at build time) |
| Images | `next/image` with AVIF/WebP, responsive sizes and blur placeholders |

No database, CMS or analytics. Content lives in typed TypeScript files.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then adjust the values
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build
npm start                    # serves the production build on port 3000
```

Quality checks: `npm run lint` and `npx tsc --noEmit`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this site. Used for canonical URLs, `hreflang`, sitemap and Open Graph. Default `https://physioart.ro`. |
| `NEXT_PUBLIC_PORTAL_URL` | Base URL of the existing PhysioArt client portal. All "client login" and portal booking links, plus the privacy and terms links, point here. Default `https://dev.physioart.ro` (the only live portal today). **Set the production portal URL before launch.** |
| `CONTACT_WEBHOOK_URL` | Where contact-form messages are delivered (server-side). Leave empty until a destination is agreed. |
| `CONTACT_WEBHOOK_SECRET` | Optional bearer token sent with each webhook request. |

## Project structure

```
src/
  app/
    [locale]/                 Root layout (html lang, header, footer) for hu / ro / en
      page.tsx                Homepage
      [section]/page.tsx      About, Services, News, Contact, Booking (localised slugs)
      [section]/[slug]/       Service detail and news article pages
      not-found.tsx           Localised 404
    api/contact/route.ts      Contact form endpoint
    global-not-found.tsx      404 for paths outside any route
    sitemap.ts, robots.ts     SEO files (with hreflang alternates)
    globals.css               Design tokens, light/dark palette, components, motion
  proxy.ts                    Language redirect for "/" and real 404 status for unknown paths
  config/site.ts              Phone, email, address, maps, app store, portal and legal URLs
  i18n/
    config.ts                 Locales and date formatting
    routes.ts                 Localised URL slugs per section
    dictionaries/{en,hu,ro}.ts  All interface text (en.ts defines the type, so hu/ro cannot miss a key)
  content/
    services.ts               18 services, grouped with their session lengths, in 3 languages
    team.ts                   Therapist profiles and qualifications
    news.ts, news-archive.ts  Articles (archive generated from the dev portal, then hand-edited)
  components/                 layout/, pages/, cards/, services/, contact/, news/, seo/, ui/
  assets/photos/              Selected, colour-corrected photographs (see docs/CONTENT-REVIEW.md)
  assets/brand/               Official logo, plus a lightened variant for dark mode
```

## URLs and languages

Every page exists in all three languages with localised slugs, for example:

| hu | ro | en |
| --- | --- | --- |
| `/hu/rolunk` | `/ro/despre-noi` | `/en/about` |
| `/hu/szolgaltatasok/manualterapia` | `/ro/servicii/terapie-manuala` | `/en/services/manual-therapy` |
| `/hu/idopontfoglalas` | `/ro/programare` | `/en/booking` |

- `/` redirects to the visitor's language (saved choice first, then `Accept-Language`, then Hungarian).
- The language switcher keeps the visitor on the equivalent page and remembers the choice in a cookie.
- Each page outputs a canonical URL and `hreflang` alternates for all three languages.

### Editing content

- **Interface text:** `src/i18n/dictionaries/*.ts`. Add a key to `en.ts` first; TypeScript then requires it in `hu.ts` and `ro.ts`.
- **Services:** `src/content/services.ts`. Each service has one entry with all its session lengths (`formats`), so variants such as "TECAR 15/25/50 min" appear once.
- **Team:** `src/content/team.ts`.
- **News:** add an object to `src/content/news.ts` (title, excerpt and HTML body in all three languages). Articles without a suitable photo get a designed typographic cover automatically.
- **Photos:** put the file in `src/assets/photos/` and import it. `next/image` creates responsive AVIF/WebP versions.

## Booking integration

This website does **not** book appointments and never shows a booking confirmation. All booking actions go to the existing, official channels:

1. The PhysioArt app ([App Store](https://apps.apple.com/ro/app/physioart/id6764026641), [Google Play](https://play.google.com/store/apps/details?id=ro.physioart.app)).
2. The client portal sign-in (`${NEXT_PUBLIC_PORTAL_URL}/client/login`).
3. Phone: 0754 282 934.

No public booking API or per-service deep link exists today, so no private endpoints were used. If the portal later offers a public booking URL (for example `/book?service=<id>`), add it in `src/config/site.ts` and link it from the "Book this service" box in `src/components/pages/service-detail-page.tsx`.

## Contact form integration

The form validates in the browser and again on the server (`src/lib/contact-validation.ts`), uses a honeypot field and a simple per-IP rate limit.

- With `CONTACT_WEBHOOK_URL` **unset**, the API answers `503` and the visitor sees: "Online messages are not available yet, so your message was not sent. Please call us or write to contact@physioart.ro." Nothing is ever reported as sent when it was not.
- With it **set**, the API sends this JSON with `POST`:

```json
{
  "source": "physioart-web",
  "submittedAt": "2026-10-29T10:00:00.000Z",
  "locale": "hu",
  "name": "…",
  "email": "…",
  "phone": "…",
  "subject": "…",
  "message": "…",
  "consent": true
}
```

Any endpoint that accepts JSON works: the portal backend, Formspree, Make, n8n or Zapier (forwarding to email). Agree the destination and its privacy notice with PhysioArt first.

## Deployment

The site uses a proxy (language redirect, 404 handling) and an API route, so it needs a Node.js host rather than a static export.

**Vercel (recommended):** import the GitHub repository, set the environment variables above, deploy. Test on the generated `*.vercel.app` URL.

**Any Node.js server:**

```bash
npm ci
npm run build
NODE_ENV=production PORT=3000 npm start
```

Put it behind a reverse proxy (nginx, Caddy) with HTTPS.

**Do not point the live `physioart.ro` domain at a deployment until PhysioArt has approved the content review.** The current WordPress site is at `physioart.ro`; when switching, add redirects from its old URLs (`/ro/acasa/...`, `/home/...`) to the new pages.

## Privacy and third parties

- Google Maps and YouTube are loaded only after the visitor clicks (click-to-load facades), so no third-party requests happen on page load.
- Fonts are self-hosted by `next/font`.
- The theme choice is stored in `localStorage`; the language choice in a `NEXT_LOCALE` cookie. Neither is used for tracking.
