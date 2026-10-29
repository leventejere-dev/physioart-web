import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { themeInitScript } from "@/lib/theme-script";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-instrument-sans" });

export const metadata: Metadata = {
  title: "404 · PhysioArt",
  robots: { index: false },
};

const messages = [
  { lang: "hu", title: "Az oldal nem található", link: "Vissza a főoldalra", href: "/hu" },
  { lang: "ro", title: "Pagina nu a fost găsită", link: "Înapoi la pagina principală", href: "/ro" },
  { lang: "en", title: "Page not found", link: "Back to the homepage", href: "/en" },
];

export default function GlobalNotFound() {
  return (
    <html lang="hu" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="grid min-h-dvh place-items-center px-4">
        <div className="aura" aria-hidden="true" />
        <main className="card w-full max-w-lg p-8 text-center sm:p-10">
          <p className="text-6xl font-semibold tracking-tight text-accent">404</p>
          <ul className="mt-6 grid gap-6">
            {messages.map((m) => (
              <li key={m.lang} lang={m.lang}>
                <h1 className="text-xl font-semibold text-ink">{m.title}</h1>
                <a href={m.href} className="link-arrow mt-2 text-sm">
                  {m.link}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
