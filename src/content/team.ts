import type { StaticImageData } from "next/image";
import type { Localized } from "@/i18n/config";

import orsolyaPhoto from "@/assets/photos/team-magyarosi-orsolya-portrait.jpg";
import kingaPhoto from "@/assets/photos/team-szabo-kinga-portrait.jpg";

export interface Qualification {
  year: string;
  title: Localized;
}

export interface TeamMember {
  id: string;
  /** Hungarian name order is used in every language, as on the official materials. */
  name: string;
  photo: StaticImageData;
  role: Localized;
  bio: Localized<string[]>;
  focus: Localized<string[]>;
  qualifications: Qualification[];
}

/**
 * Sources: physioart.ro "Rólunk / Despre noi" (profiles and portraits) and certificates
 * published on PhysioArt's Facebook page. See docs/CONTENT-REVIEW.md before launch.
 */
export const team: TeamMember[] = [
  {
    id: "magyarosi-orsolya",
    name: "Magyarosi Orsolya",
    photo: orsolyaPhoto,
    role: {
      hu: "Gyógytornász · Manuálterapeuta · Sportrehabilitációs tréner",
      ro: "Kinetoterapeut · Terapeut manual · Trainer de reabilitare sportivă",
      en: "Physiotherapist · Manual therapist · Sports rehabilitation trainer",
    },
    bio: {
      hu: [
        "Gyógytornászként a mozgásszervi és gerincbetegségek, valamint a sportsérülések kezelésére specializálódott. Speciális gerincstabilizációs programmal segít az ülő életmód okozta panaszok, a hát- és derékfájdalmak enyhítésében, és kezeli a gerincferdülést.",
        "Sportrehabilitációval sportágspecifikusan és egyénre szabottan segíti a sportolók felépülését sérülések és műtétek után. Kiemelten fontosnak tartja a megelőző mozgást, és szívügye a helyesen kivitelezett, egyénre szabott futás.",
      ],
      ro: [
        "Ca kinetoterapeut, este specializată în tratamentul afecțiunilor aparatului locomotor și ale coloanei vertebrale, precum și al accidentărilor sportive. Printr-un program special de stabilizare a coloanei ajută la ameliorarea durerilor de spate și a problemelor cauzate de sedentarism și tratează scolioza.",
        "Prin recuperare sportivă îi ajută pe sportivi să revină după accidentări și operații, personalizat și specific sportului practicat. Consideră deosebit de importantă mișcarea preventivă și pune suflet în alergarea corectă, adaptată fiecărei persoane.",
      ],
      en: [
        "As a physiotherapist, she specialises in musculoskeletal and spinal conditions and in sports injuries. With a dedicated spinal stabilisation programme she helps people with back pain and complaints caused by a sedentary lifestyle, and she treats scoliosis.",
        "Through sports rehabilitation she supports athletes in their recovery after injuries and surgery, tailored to the individual and their sport. Preventive movement matters a great deal to her, as does running with good, individually adapted technique.",
      ],
    },
    focus: {
      hu: ["Gerinc- és hátpanaszok", "Gerincferdülés (Schroth)", "Sportrehabilitáció", "Műtét utáni rehabilitáció", "Futótechnika"],
      ro: ["Probleme ale coloanei și dureri de spate", "Scolioză (Schroth)", "Recuperare sportivă", "Recuperare postoperatorie", "Tehnica alergării"],
      en: ["Spine and back pain", "Scoliosis (Schroth)", "Sports rehabilitation", "Post-operative rehabilitation", "Running technique"],
    },
    qualifications: [
      {
        year: "2025",
        title: {
          hu: "Semmelweis Egyetem, Általános Orvostudományi Kar: manuálterápia, eredményes záróvizsga",
          ro: "Universitatea Semmelweis, Facultatea de Medicină Generală: terapie manuală, examen final promovat",
          en: "Semmelweis University, Faculty of Medicine: manual therapy, final examination passed",
        },
      },
      {
        year: "2020",
        title: {
          hu: "NASM/IWI sportrehabilitációs tréner képzés",
          ro: "Formare NASM/IWI de trainer de reabilitare sportivă",
          en: "NASM/IWI sports rehabilitation trainer course",
        },
      },
      {
        year: "2019",
        title: {
          hu: "FIT College: helyes futótechnika képzés",
          ro: "FIT College: formare în tehnica corectă de alergare",
          en: "FIT College: correct running technique course",
        },
      },
      {
        year: "2018",
        title: {
          hu: "Marosvásárhelyi Orvosi és Gyógyszerészeti Egyetem: mesterképzés, funkcionális rehabilitáció",
          ro: "Universitatea de Medicină și Farmacie Târgu Mureș: master în reabilitare funcțională",
          en: "University of Medicine and Pharmacy, Târgu Mureș: master's degree in functional rehabilitation",
        },
      },
      {
        year: "2018",
        title: {
          hu: "McKenzie-terápia (McKenzie Institute International, A rész: ágyéki gerinc)",
          ro: "Terapie McKenzie (McKenzie Institute International, Partea A: coloana lombară)",
          en: "McKenzie therapy (McKenzie Institute International, Part A: the lumbar spine)",
        },
      },
      {
        year: "2017",
        title: {
          hu: "3D Schroth-terápia gerincferdülésre",
          ro: "Terapie Schroth 3D pentru scolioză",
          en: "3D Schroth therapy for scoliosis",
        },
      },
      {
        year: "2016",
        title: { hu: "Yumeiho-masszázs", ro: "Masaj Yumeiho", en: "Yumeiho massage" },
      },
      {
        year: "2015",
        title: {
          hu: "Marosvásárhelyi Orvosi és Gyógyszerészeti Egyetem: balneofiziokinetoterápia és rehabilitáció",
          ro: "Universitatea de Medicină și Farmacie Târgu Mureș: balneofiziokinetoterapie și recuperare",
          en: "University of Medicine and Pharmacy, Târgu Mureș: physiotherapy and rehabilitation",
        },
      },
      {
        year: "2014",
        title: {
          hu: "Kinesio taping, svédmasszázs",
          ro: "Kinesiology taping, masaj suedez",
          en: "Kinesiology taping, Swedish massage",
        },
      },
    ],
  },
  {
    id: "szabo-kinga",
    name: "Szabó Kinga",
    photo: kingaPhoto,
    role: {
      hu: "Gyógytornász · Manuálterapeuta",
      ro: "Kinetoterapeut · Terapeut manual",
      en: "Physiotherapist · Manual therapist",
    },
    bio: {
      hu: [
        "Szakemberként elsődleges célja, hogy megtalálja a leggyorsabb utat a felépüléshez sérülések és műtétek után. Munkájának központi része a rehabilitáció, a mindennapi életbe való visszatérés és a megfelelő megelőzés, hogy a sérülés ne ismétlődjön meg.",
        "Kisgyermekeknél kiemelten fontosnak tartja a természetes mozgások (forgás, kúszás, ülés, mászás, állás) helyes fejlődését. Felnőtteknél az izomegyensúly helyreállítására, az ülő életmód okozta panaszok kezelésére és a krónikus fájdalmak megelőzésére fókuszál. Kezelési terveit mindig állapotfelmérés alapján állítja össze.",
      ],
      ro: [
        "Ca specialist, scopul ei principal este să găsească cea mai rapidă cale spre recuperare după accidentări și intervenții chirurgicale. Partea centrală a activității sale este recuperarea, reintegrarea în viața de zi cu zi și o prevenție adecvată pentru evitarea reaccidentărilor.",
        "La copiii mici consideră deosebit de importantă dezvoltarea corectă a mișcărilor naturale (rostogolire, târâre, șezut, cățărare, ortostatism). La adulți se concentrează pe restabilirea echilibrului muscular, tratarea afecțiunilor cauzate de sedentarism și prevenirea durerilor cronice. Planurile de tratament se bazează întotdeauna pe o evaluare inițială.",
      ],
      en: [
        "Her main goal as a specialist is to find the quickest route to recovery after injuries and surgery. Rehabilitation, returning to everyday life and the right prevention to avoid re-injury are at the centre of her work.",
        "With young children she pays particular attention to the healthy development of natural movements such as rolling, crawling, sitting, climbing and standing. With adults she focuses on restoring muscle balance, treating complaints caused by a sedentary lifestyle and preventing chronic pain. Her treatment plans are always based on an initial assessment.",
      ],
    },
    focus: {
      hu: ["Rehabilitáció sérülés és műtét után", "Gyermekek mozgásfejlesztése", "Vállrehabilitáció", "Triggerpont-terápia", "Gerincferdülés (Schroth)"],
      ro: ["Recuperare după accidentări și operații", "Dezvoltarea motorie a copiilor", "Recuperarea umărului", "Terapia punctelor trigger", "Scolioză (Schroth)"],
      en: ["Rehabilitation after injury and surgery", "Children's motor development", "Shoulder rehabilitation", "Trigger point therapy", "Scoliosis (Schroth)"],
    },
    qualifications: [
      {
        year: "2020",
        title: { hu: "A váll teljes rehabilitációja", ro: "Recuperarea completă a umărului", en: "Complete shoulder rehabilitation" },
      },
      {
        year: "2020",
        title: {
          hu: "3D Schroth-terápia gerincferdülésre",
          ro: "Terapie Schroth 3D pentru scolioză",
          en: "3D Schroth therapy for scoliosis",
        },
      },
      {
        year: "2019",
        title: { hu: "Triggerpont-terápia", ro: "Terapia punctelor trigger", en: "Trigger point therapy" },
      },
      {
        year: "2019",
        title: {
          hu: "McKenzie-terápia (McKenzie Institute International, A rész: ágyéki gerinc)",
          ro: "Terapie McKenzie (McKenzie Institute International, Partea A: coloana lombară)",
          en: "McKenzie therapy (McKenzie Institute International, Part A: the lumbar spine)",
        },
      },
      {
        year: "2019",
        title: { hu: "Yumeiho-masszázs", ro: "Masaj Yumeiho", en: "Yumeiho massage" },
      },
      {
        year: "2019",
        title: { hu: "Kinesio taping", ro: "Kinesiology taping", en: "Kinesiology taping" },
      },
      {
        year: "2015",
        title: {
          hu: "Brassói Transilvania Egyetem: balneofiziokinetoterápia és rehabilitáció",
          ro: "Universitatea Transilvania din Brașov: balneofiziokinetoterapie și recuperare",
          en: "Transilvania University of Brașov: physiotherapy and rehabilitation",
        },
      },
    ],
  },
];
