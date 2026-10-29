import type { Locale, Localized } from "@/i18n/config";
import type { Article, NewsCategory } from "./news-types";
import { archivedArticles } from "./news-archive";

import lectureCover from "@/assets/photos/event-posture-lecture.jpg";
import pnrrPressRelease from "@/assets/photos/pnrr-press-release.jpg";

export type { Article, NewsCategory };

export const newsCategories: NewsCategory[] = ["center", "events", "press", "health"];

export const newsCategoryLabels: Record<NewsCategory, Localized> = {
  center: { hu: "A központ életéből", ro: "Din viața centrului", en: "Centre news" },
  events: { hu: "Események", ro: "Evenimente", en: "Events" },
  press: { hu: "Sajtóban", ro: "În presă", en: "In the press" },
  health: { hu: "Egészség", ro: "Sănătate", en: "Health" },
};

const pnrrProject: Article = {
  id: "pnrr-project-completed",
  date: "2026-05-05",
  category: "center",
  coverLabel: { hu: "PNRR · NextGenerationEU", ro: "PNRR · NextGenerationEU", en: "PNRR · NextGenerationEU" },
  slug: {
    hu: "lezarult-pnrr-projektunk",
    ro: "proiect-pnrr-finalizat",
    en: "pnrr-project-completed",
  },
  title: {
    hu: "Lezárult PNRR-projektünk: megújult a recepció és az időpontfoglalás",
    ro: "Proiect PNRR finalizat: recepția și sistemul de programare au fost modernizate",
    en: "PNRR project completed: a modernised reception and booking system",
  },
  excerpt: {
    hu: "Az Országos Helyreállítási és Rezilienciaépítési Terv támogatásával sikeresen lezárult recepciónk és programálási rendszerünk modernizálása.",
    ro: "Cu sprijinul Planului Național de Redresare și Reziliență, modernizarea recepției și a sistemului nostru de programare a fost finalizată cu succes.",
    en: "With support from Romania's National Recovery and Resilience Plan, the modernisation of our reception and booking system has been successfully completed.",
  },
  body: {
    hu: "<p>Az Európai Unió NextGenerationEU programja által finanszírozott Országos Helyreállítási és Rezilienciaépítési Terv (PNRR) támogatásával sikeresen lezárult recepciónk és programálási rendszerünk modernizálása.</p><h2>A projektről</h2><ul><li><strong>A projekt címe:</strong> A munkafolyamatok fejlesztése, az ügyféladatbázis bővítése és az ügyfelek és a PHYSIOART SRL által működtetett rehabilitációs központ közötti kapcsolat optimalizálása</li><li><strong>Kedvezményezett:</strong> PHYSIOART SRL</li><li><strong>Célok:</strong> a belső folyamatok és az online jelenlét optimalizálása, a szakszemélyzet képzése, egy integrált rehabilitációs központ fejlesztése, valamint az oktatás, a megelőzés és a prehabilitáció népszerűsítése</li><li><strong>A projekt teljes értéke:</strong> 122 612,09 RON</li><li><strong>Időtartam:</strong> 2025. február 25. – 2026. június 30.</li><li><strong>Projektkód:</strong> 314.1./i3/c9</li></ul><p>További információ a PNRR-ről: <a href=\"https://mfe.gov.ro/pnrr/\">mfe.gov.ro/pnrr</a>.</p>",
    ro: "<p>Cu sprijinul Planului Național de Redresare și Reziliență (PNRR), finanțat de Uniunea Europeană prin NextGenerationEU, modernizarea recepției și a sistemului nostru de programare a fost finalizată cu succes.</p><h2>Despre proiect</h2><ul><li><strong>Titlul proiectului:</strong> Îmbunătățirea fluxurilor de lucru, dezvoltarea bazei de date a clienților și optimizarea interacțiunilor clienților cu centrul de recuperare operat de PHYSIOART SRL</li><li><strong>Numele beneficiarului:</strong> PHYSIOART SRL</li><li><strong>Obiectivele proiectului:</strong> optimizarea proceselor interne și a prezenței online, formarea personalului specializat, dezvoltarea unui centru de recuperare integrat, precum și promovarea educației, prevenției și pre-reabilitării</li><li><strong>Valoarea totală a proiectului:</strong> 122.612,09 RON</li><li><strong>Data începerii și finalizării proiectului:</strong> 25.02.2025 – 30.06.2026</li><li><strong>Codul proiectului:</strong> 314.1./i3/c9</li></ul><p>Mai multe informații despre PNRR: <a href=\"https://mfe.gov.ro/pnrr/\">mfe.gov.ro/pnrr</a>.</p>",
    en: "<p>With the support of Romania's National Recovery and Resilience Plan (PNRR), funded by the European Union through NextGenerationEU, the modernisation of our reception and booking system has been successfully completed.</p><h2>About the project</h2><ul><li><strong>Project title:</strong> Improving workflows, developing the client database and optimising client interactions with the rehabilitation centre operated by PHYSIOART SRL</li><li><strong>Beneficiary:</strong> PHYSIOART SRL</li><li><strong>Objectives:</strong> optimising internal processes and online presence, training specialised staff, developing an integrated rehabilitation centre, and promoting education, prevention and pre-rehabilitation</li><li><strong>Total project value:</strong> RON 122,612.09</li><li><strong>Project period:</strong> 25 February 2025 – 30 June 2026</li><li><strong>Project code:</strong> 314.1./i3/c9</li></ul><p>More information about the PNRR: <a href=\"https://mfe.gov.ro/pnrr/\">mfe.gov.ro/pnrr</a>.</p>",
  },
  figure: {
    src: pnrrPressRelease,
    alt: {
      hu: "Sajtóközlemény a PHYSIOART SRL PNRR-projektjének lezárásáról, az EU, a román kormány és a PNRR logóival",
      ro: "Comunicat de presă privind finalizarea implementării proiectului PNRR al PHYSIOART SRL, cu siglele UE, Guvernului României și PNRR",
      en: "Press release on the completion of PHYSIOART SRL's PNRR project, with the EU, Romanian Government and PNRR logos",
    },
    caption: {
      hu: "Sajtóközlemény (román nyelven)",
      ro: "Comunicat de presă",
      en: "Press release (in Romanian)",
    },
  },
};

const postureLecture: Article = {
  id: "children-posture-lecture-2025",
  date: "2025-06-14",
  category: "events",
  slug: {
    hu: "latni-ami-rejtve-marad-eloadas-a-gyermekkori-tartashibakrol",
    ro: "prelegere-despre-problemele-de-postura-ale-copiilor",
    en: "lecture-on-childrens-posture-problems",
  },
  title: {
    hu: "Látni, ami rejtve marad: előadás a gyermekkori tartáshibákról",
    ro: "Să vedem ce rămâne ascuns: prelegere despre problemele de postură ale copiilor",
    en: "Seeing what stays hidden: a lecture on children's posture problems",
  },
  excerpt: {
    hu: "2025. június 14-én ingyenes előadásnak adott otthont központunk szülőknek és pedagógusoknak a gyermekkori tartáshibák felismeréséről, megelőzéséről és kezeléséről.",
    ro: "Pe 14 iunie 2025, centrul nostru a găzduit o prelegere gratuită pentru părinți și cadre didactice despre recunoașterea, prevenirea și tratarea problemelor de postură la copii.",
    en: "On 14 June 2025 our centre hosted a free lecture for parents and teachers on recognising, preventing and treating posture problems in children.",
  },
  body: {
    hu: "<p>2025. június 14-én, szombaton a József Attila utcai központunk adott otthont annak az ingyenes, átfogó előadásnak, amely korunk egyik meghatározó népbetegségéről, a gyermekkori tartáshibákról szólt. A szülőknek és pedagógusoknak szóló eseményt az OrtoProfil és a Kineto Art Egyesület szervezte.</p><h2>A program</h2><ul><li><strong>Bevezetés a tartásproblémák világába:</strong> a testtartási rendellenességek háttere, kialakulása és következményei. Előadó: Magyarosi Orsolya</li><li><strong>A gerincferdülés típusai:</strong> funkcionális és strukturális gerincferdülés, scoliosisformák és egyéb gyakori tartási problémák. Előadó: Török Beáta</li><li><strong>A korzett szerepe:</strong> a korzett funkciója és alkalmazása, köztük a Chêneau típusú korzett mint a gerincferdülés konzervatív kezelésének egyik eszköze. Előadó: Szőcs Melinda</li><li><strong>Mit láthat a szülő?</strong> Szabad szemmel is észrevehető figyelmeztető jelek otthon, és az, hogyan segíthet egy tudatos szülő a megelőzésben. Előadó: György Ágota</li><li><strong>Esettanulmány:</strong> egy tinédzser lány útja a terápiában. Előadó: Szabó Kinga</li><li><strong>A Moti Physio bemutatása:</strong> digitális tartáselemző eszközünk működés közben, és az, hogyan segíti a modern technika a pontos felmérést és dokumentálást. Előadó: Balla Viktor</li></ul><p>Köszönjük mindenkinek, aki eljött, és a dara artisan pékségnek a büféért.</p>",
    ro: "<p>Sâmbătă, 14 iunie 2025, centrul nostru de pe strada József Attila a găzduit o prelegere gratuită și cuprinzătoare despre una dintre cele mai răspândite probleme de sănătate ale prezentului: problemele de postură la copii. Evenimentul, dedicat părinților și cadrelor didactice, a fost organizat de OrtoProfil și Asociația Kineto Art.</p><h2>Programul</h2><ul><li><strong>Introducere în problemele de postură:</strong> cauzele, apariția și consecințele deficiențelor de postură. Prezintă: Magyarosi Orsolya</li><li><strong>Tipurile de scolioză:</strong> scolioza funcțională și structurală, formele de scolioză și alte probleme frecvente de postură. Prezintă: Török Beáta</li><li><strong>Rolul corsetului:</strong> funcția și utilizarea corsetului, inclusiv corsetul de tip Chêneau ca mijloc de tratament conservator al scoliozei. Prezintă: Szőcs Melinda</li><li><strong>Ce poate observa părintele?</strong> Semne de avertizare vizibile cu ochiul liber acasă și cum poate contribui un părinte informat la prevenție. Prezintă: György Ágota</li><li><strong>Studiu de caz:</strong> drumul unei adolescente prin terapie. Prezintă: Szabó Kinga</li><li><strong>Prezentarea Moti Physio:</strong> aparatul nostru digital de analiză posturală în funcțiune și modul în care tehnologia modernă sprijină evaluarea și documentarea precisă. Prezintă: Balla Viktor</li></ul><p>Mulțumim tuturor celor care au venit și brutăriei artizanale dara pentru gustări.</p>",
    en: "<p>On Saturday, 14 June 2025, our centre on József Attila Street hosted a free, in-depth lecture on one of the most widespread health problems of our time: posture problems in children. The event for parents and teachers was organised by OrtoProfil and the Kineto Art Association.</p><h2>The programme</h2><ul><li><strong>An introduction to posture problems:</strong> the background, development and consequences of postural abnormalities. Speaker: Magyarosi Orsolya</li><li><strong>Types of scoliosis:</strong> functional and structural scoliosis, forms of scoliosis and other common posture problems. Speaker: Török Beáta</li><li><strong>The role of the brace:</strong> how a brace works and when it is used, including the Chêneau brace as a conservative treatment option for scoliosis. Speaker: Szőcs Melinda</li><li><strong>What can parents notice?</strong> Warning signs at home that can be seen with the naked eye, and how an informed parent can help with prevention. Speaker: György Ágota</li><li><strong>Case study:</strong> a teenage girl's journey through therapy. Speaker: Szabó Kinga</li><li><strong>Moti Physio demonstration:</strong> our digital posture analysis device in action, and how modern technology supports accurate assessment and documentation. Speaker: Balla Viktor</li></ul><p>Thank you to everyone who came, and to the dara artisan bakery for the refreshments.</p>",
  },
  cover: {
    src: lectureCover,
    alt: {
      hu: "Gyógytornász gyakorlatot mutat be a szőnyegen szülőknek a PhysioArt tornatermében",
      ro: "Un kinetoterapeut demonstrează un exercițiu pe saltea pentru părinți, în sala PhysioArt",
      en: "A physiotherapist demonstrates an exercise on a mat to parents in the PhysioArt exercise room",
    },
    caption: {
      hu: "Bemutató az előadáson",
      ro: "Demonstrație în timpul prelegerii",
      en: "A demonstration during the lecture",
    },
  },
};

const archiveCoverLabels: Record<string, Localized> = {
  "tax-benefit-for-employees": { hu: "Munkáltatóknak", ro: "Pentru angajatori", en: "For employers" },
  "your-body-your-home": { hu: "Your Body, Your Home", ro: "Your Body, Your Home", en: "Your Body, Your Home" },
  "why-warm-up-before-running": {
    hu: "Bemelegítés futás előtt",
    ro: "Încălzirea înainte de alergare",
    en: "Warming up before a run",
  },
};

const archive: Article[] = archivedArticles.map((a) =>
  archiveCoverLabels[a.id] ? { ...a, coverLabel: archiveCoverLabels[a.id] } : a,
);

export const articles: Article[] = [pnrrProject, postureLecture, ...archive].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getArticle(locale: Locale, slug: string) {
  return articles.find((a) => a.slug[locale] === slug);
}
