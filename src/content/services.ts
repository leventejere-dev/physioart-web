import type { StaticImageData } from "next/image";
import type { Locale, Localized } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

import birdDog from "@/assets/photos/exercise-bird-dog.jpg";
import neckTreatment from "@/assets/photos/treatment-neck-massage.jpg";
import postureAnalysis from "@/assets/photos/postural-analysis-moti-physio.jpg";
import functionalTraining from "@/assets/photos/functional-training-plank.jpg";
import childrenPosture from "@/assets/photos/children-posture-training.jpg";

export type ServiceCategory = "assessment" | "physio" | "treatment" | "movement";
export const serviceCategories: ServiceCategory[] = ["assessment", "physio", "treatment", "movement"];

export type Need = "back-neck" | "sports" | "post-op" | "posture" | "scoliosis" | "mobility" | "recovery";
export const needs: Need[] = ["back-neck", "sports", "post-op", "posture", "scoliosis", "mobility", "recovery"];

export interface ServiceFormat {
  minutes?: number;
  label?: keyof Dictionary["formats"];
}

export interface ServicePhoto {
  src: StaticImageData;
  alt: Localized;
}

export interface Service {
  id: string;
  slug: Localized;
  category: ServiceCategory;
  needs: Need[];
  name: Localized;
  short: Localized;
  intro: Localized;
  involves: Localized;
  suitable: Localized<string[]>;
  session: Localized;
  formats: ServiceFormat[];
  /** Device-based treatment: shows the shared safety note. */
  device?: boolean;
  /** Service-specific safety note (overrides the shared device note). */
  safety?: Localized;
  photos?: ServicePhoto[];
}

const durations = (...minutes: number[]): ServiceFormat[] => minutes.map((m) => ({ minutes: m }));

export const services: Service[] = [
  {
    id: "consultation",
    slug: { hu: "konzultacio-es-allapotfelmeres", ro: "consultatie-si-evaluare", en: "consultation-and-assessment" },
    category: "assessment",
    needs: ["back-neck", "sports", "post-op", "posture", "mobility"],
    name: { hu: "Konzultáció és állapotfelmérés", ro: "Consultație și evaluare", en: "Consultation and assessment" },
    short: {
      hu: "Részletes első beszélgetés és vizsgálat, hogy megértsük a panaszaidat, és közösen kialakítsuk a kezelési tervet.",
      ro: "O primă discuție și examinare detaliată, pentru a înțelege simptomele tale și a stabili împreună un plan de tratament.",
      en: "A detailed first conversation and examination to understand your complaints and agree on a personal treatment plan.",
    },
    intro: {
      hu: "A legjobb kiindulópont, ha nem tudod, melyik kezelésre van szükséged. Időt szánunk a meghallgatásra, a vizsgálatra és a magyarázatra.",
      ro: "Cel mai bun punct de plecare dacă nu știi de ce tratament ai nevoie. Ne facem timp să ascultăm, să examinăm și să explicăm.",
      en: "The best starting point if you are unsure which treatment you need. We take time to listen, examine and explain.",
    },
    involves: {
      hu: "Átbeszéljük a panaszaidat, az előzményeidet és a céljaidat, átnézzük a magaddal hozott dokumentumokat, és megvizsgáljuk a tartásodat, az ízületi mozgásokat és a mozgásmintáidat. Az egyórás konzultáció személyre szabott kezelési tervvel zárul; a 30 perces utánkövetés a fejlődés áttekintésére és a terv módosítására szolgál.",
      ro: "Discutăm despre simptome, istoricul medical și obiectivele tale, analizăm documentele pe care le aduci și examinăm postura, mobilitatea și tiparele de mișcare. Consultația de o oră se încheie cu un plan de tratament personalizat; controlul de 30 de minute servește la urmărirea progresului și ajustarea planului.",
      en: "We discuss your symptoms, medical history and goals, review any documents you bring, and examine posture, mobility and movement patterns. The one-hour consultation ends with a personal treatment plan; the 30-minute follow-up is for reviewing progress and adjusting the plan.",
    },
    suitable: {
      hu: [
        "Fájdalmad vagy mozgáskorlátozottságod van, és nem tudod, hol kezdd",
        "Sérülés vagy műtét után kezded a rehabilitációt",
        "Egy régóta fennálló panaszra szeretnél új szemmel ránézni",
      ],
      ro: [
        "Ai dureri sau mobilitate limitată și nu știi de unde să începi",
        "Începi recuperarea după o accidentare sau o operație",
        "Vrei o nouă perspectivă asupra unei probleme mai vechi",
      ],
      en: [
        "You have pain or limited movement and do not know where to start",
        "You are starting rehabilitation after an injury or surgery",
        "You want a fresh look at a long-standing problem",
      ],
    },
    session: {
      hu: "Beszélgetés, fizikális vizsgálat és egyszerű mozgástesztek, majd az eredmények és a következő lépések érthető magyarázata.",
      ro: "Discuție, examinare fizică și teste simple de mișcare, apoi o explicație clară a constatărilor și a pașilor următori.",
      en: "Conversation, a hands-on examination and simple movement tests, then a clear explanation of the findings and next steps.",
    },
    formats: [
      { label: "first", minutes: 60 },
      { label: "followUp", minutes: 30 },
    ],
  },
  {
    id: "mckenzie",
    slug: { hu: "mckenzie-felmeres", ro: "evaluare-mckenzie", en: "mckenzie-assessment" },
    category: "assessment",
    needs: ["back-neck"],
    name: { hu: "McKenzie-felmérés", ro: "Evaluare McKenzie", en: "McKenzie assessment" },
    short: {
      hu: "A hát-, nyak- és ízületi fájdalom strukturált felmérése a McKenzie-módszerrel, személyre szabott gyakorlatsorral.",
      ro: "Evaluarea structurată a durerilor de spate, gât și articulații prin metoda McKenzie, cu un plan de exerciții personalizat.",
      en: "A structured assessment of back, neck and joint pain using the McKenzie method, with a personal exercise plan.",
    },
    intro: {
      hu: "A McKenzie-módszer (mechanikai diagnózis és terápia) a gerincproblémák, köztük a porckorong eredetű panaszok speciális vizsgálati és kezelési rendszere.",
      ro: "Metoda McKenzie (Diagnostic și terapie mecanică) este un sistem specializat de examinare și tratament al problemelor coloanei, inclusiv al celor legate de disc.",
      en: "The McKenzie method (Mechanical Diagnosis and Therapy) is a specialised system for examining and treating spinal problems, including disc-related complaints.",
    },
    involves: {
      hu: "A gyógytornász megfigyeli, hogyan reagálnak a tüneteid ismételt mozdulatokra és testhelyzetekre. Így kiderül, mely mozgások enyhítik a fájdalmat, és ezekre épül egy egyszerű, önállóan végezhető gyakorlatsor.",
      ro: "Kinetoterapeutul urmărește cum răspund simptomele tale la mișcări și poziții repetate. Astfel se identifică mișcările care îți ameliorează durerea, iar acestea devin baza unui program simplu de exerciții pe care îl poți face singur.",
      en: "Your physiotherapist looks at how your symptoms respond to repeated movements and positions. This helps identify the movements that ease your pain, which then form the basis of a simple exercise programme you can do yourself.",
    },
    suitable: {
      hu: [
        "Derék- vagy nyakfájdalom, végtagba sugárzó fájdalommal vagy anélkül",
        "Időről időre visszatérő hátfájás",
        "Akik szeretnék önállóan is kezelni a panaszaikat",
      ],
      ro: [
        "Dureri lombare sau cervicale, cu sau fără iradiere într-un membru",
        "Dureri de spate care revin periodic",
        "Persoane care vor să își gestioneze singure simptomele",
      ],
      en: [
        "Low back or neck pain, with or without pain spreading into a limb",
        "Back pain that keeps coming back",
        "People who want to manage their symptoms independently",
      ],
    },
    session: {
      hu: "Előzmények felvétele és mozgásvizsgálat ismételt mozdulatokkal, majd személyre szabott gyakorlatok és tartási tanácsok.",
      ro: "Anamneză și examinarea mișcării cu mișcări repetate, apoi un set de exerciții adaptat și sfaturi privind postura.",
      en: "History and a movement examination using repeated movements, then a tailored set of exercises and posture advice.",
    },
    formats: [],
  },
  {
    id: "schroth-consultation",
    slug: { hu: "schroth-konzultacio", ro: "consultatie-schroth", en: "schroth-consultation" },
    category: "assessment",
    needs: ["scoliosis", "posture"],
    name: { hu: "Schroth-konzultáció", ro: "Consultație Schroth", en: "Scoliosis consultation (Schroth)" },
    short: {
      hu: "A gerincferdülés és a tartás felmérése, a személyre szabott Schroth-terápia megtervezése.",
      ro: "Evaluarea scoliozei și a posturii și planificarea terapiei Schroth personalizate.",
      en: "Assessment of scoliosis and posture, and planning of personalised Schroth therapy.",
    },
    intro: {
      hu: "Célzott konzultáció gerincferdüléssel élő vagy gerincferdülés gyanújával érkező gyerekeknek, fiataloknak és felnőtteknek.",
      ro: "O consultație dedicată copiilor, adolescenților și adulților cu scolioză sau suspiciune de deviație a coloanei.",
      en: "A focused consultation for children, teenagers and adults with scoliosis or a suspected spinal curvature.",
    },
    involves: {
      hu: "Átnézzük a korábbi leleteket, például a röntgenfelvételeket, felmérjük a tartást, a légzést és a törzs formáját, és közérthetően elmagyarázzuk a görbület jellegét. Közösen megtervezzük a Schroth-gyakorlatsort és a gyakorlás gyakoriságát.",
      ro: "Analizăm rezultatele anterioare, de exemplu radiografiile, evaluăm postura, respirația și forma trunchiului și explicăm pe înțelesul tău tiparul curburii. Împreună planificăm programul de exerciții Schroth și cât de des să exersezi.",
      en: "We review previous findings such as X-rays, assess posture, breathing and the shape of the trunk, and explain the curve pattern in plain language. Together we plan the Schroth exercise programme and how often to practise.",
    },
    suitable: {
      hu: [
        "Diagnosztizált gerincferdülés vagy Scheuermann-betegség",
        "Szülők, akik egyenetlen hátat, vállat vagy csípőt vesznek észre gyermeküknél",
        "Felnőttek gerincferdüléssel összefüggő panaszokkal",
      ],
      ro: [
        "Scolioză diagnosticată sau maladie Scheuermann",
        "Părinți care observă la copil spatele, umerii sau șoldurile asimetrice",
        "Adulți cu disconfort legat de scolioză",
      ],
      en: [
        "Diagnosed scoliosis or Scheuermann's disease",
        "Parents who notice an uneven back, shoulders or hips in their child",
        "Adults with scoliosis-related discomfort",
      ],
    },
    session: {
      hu: "Beszélgetés, a leletek áttekintése, tartásvizsgálat és a korrekciós légzés és testhelyzetek első bemutatása.",
      ro: "Discuție, analiza investigațiilor imagistice, evaluarea posturii și o primă introducere în respirația și pozițiile corective.",
      en: "Conversation, a review of imaging, a posture assessment and a first introduction to corrective breathing and positions.",
    },
    formats: [],
  },
  {
    id: "postural-analysis",
    slug: { hu: "poszturalis-analizis", ro: "analiza-posturala", en: "postural-analysis" },
    category: "assessment",
    needs: ["posture", "scoliosis", "sports"],
    name: { hu: "Poszturális analízis", ro: "Analiză posturală", en: "Postural analysis" },
    short: {
      hu: "Részletes tartáselemzés a Moti Physio digitális elemzőrendszer segítségével az izom-egyensúlytalanságok és mozgáseltérések feltérképezésére.",
      ro: "O evaluare detaliată a posturii, cu sprijinul sistemului digital Moti Physio, pentru a identifica dezechilibrele musculare și diferențele de mișcare.",
      en: "A detailed posture assessment, supported by the Moti Physio digital analysis system, to map muscle imbalances and movement differences.",
    },
    intro: {
      hu: "Ha mérhetően látod a tartásodat, könnyebb megérteni, és követni, hogyan változik az idő során.",
      ro: "Când îți vezi postura măsurată, o înțelegi mai ușor și poți urmări cum se schimbă în timp.",
      en: "Seeing your posture measured makes it easier to understand, and to follow how it changes over time.",
    },
    involves: {
      hu: "Egy 3D kamerarendszer előtt állsz és mozogsz, miközben a rendszer rögzíti a fej, a vállak, a medence és a lábak helyzetét. A gyógytornász az eredményeket fizikális vizsgálattal egészíti ki, és elmagyarázza, mely eltérések fontosak, és mit érdemes tenni velük.",
      ro: "Stai în picioare și te miști în fața unui sistem cu cameră 3D care înregistrează alinierea capului, umerilor, bazinului și picioarelor. Kinetoterapeutul combină rezultatele cu o examinare fizică și îți explică ce diferențe contează și ce poți face.",
      en: "You stand and move in front of a 3D camera system while it records the alignment of your head, shoulders, pelvis and legs. Your physiotherapist combines the results with a hands-on examination and explains which differences matter and what to do about them.",
    },
    suitable: {
      hu: [
        "Gyerekek és fiatalok tartási problémákkal",
        "Ülőmunkát végző felnőttek visszatérő nyak- vagy hátfeszüléssel",
        "Sportolók, akik időben szeretnék észrevenni az egyensúlytalanságokat",
        "Bárki, aki objektíven szeretné követni a fejlődését",
      ],
      ro: [
        "Copii și adolescenți cu probleme de postură",
        "Adulți cu muncă de birou și tensiune recurentă la gât sau spate",
        "Sportivi care vor să depisteze din timp dezechilibrele",
        "Oricine vrea să își urmărească obiectiv progresul",
      ],
      en: [
        "Children and teenagers with posture concerns",
        "Adults with desk jobs and recurring neck or back tension",
        "Athletes who want to spot imbalances early",
        "Anyone who wants to track progress objectively",
      ],
    },
    session: {
      hu: "Rövid mérés kényelmes ruhában, majd az eredmények átbeszélése és javasolt gyakorlatok.",
      ro: "O măsurătoare scurtă, în haine comode, urmată de discutarea rezultatelor și de exerciții recomandate.",
      en: "A short measurement in comfortable clothing, followed by a walk-through of the results and recommended exercises.",
    },
    formats: [],
    photos: [
      {
        src: postureAnalysis,
        alt: {
          hu: "A PhysioArt gyógytornásza bemutatja a Moti Physio tartáselemző szőnyeget",
          ro: "Un kinetoterapeut PhysioArt prezintă covorașul de analiză posturală Moti Physio",
          en: "A PhysioArt physiotherapist demonstrates the Moti Physio posture analysis mat",
        },
      },
    ],
  },
  {
    id: "physiotherapy",
    slug: { hu: "gyogytorna", ro: "kinetoterapie", en: "physiotherapy" },
    category: "physio",
    needs: ["back-neck", "sports", "post-op", "posture", "mobility"],
    name: { hu: "Gyógytorna", ro: "Kinetoterapie", en: "Physiotherapy (exercise therapy)" },
    short: {
      hu: "Személyre szabott mozgásterápia a rehabilitáció, a mobilitás és a funkcionális erő fejlesztésére, egyénileg vagy kiscsoportban.",
      ro: "Kinetoterapie personalizată pentru recuperare, mobilitate și forță funcțională, individual sau în grupuri mici.",
      en: "Personalised exercise therapy for rehabilitation, mobility and functional strength, one-to-one or in small groups.",
    },
    intro: {
      hu: "Az irányított mozgás a rehabilitáció középpontjában áll. A gyakorlatokat a testedhez, a céljaidhoz és a felépülésed szakaszához igazítjuk.",
      ro: "Exercițiul ghidat este în centrul recuperării. Alegem exercițiile potrivite corpului tău, obiectivelor tale și etapei de recuperare.",
      en: "Guided exercise is at the heart of rehabilitation. We choose exercises for your body, your goals and the stage of your recovery.",
    },
    involves: {
      hu: "A mozgásképesség visszaállítása, izomerősítés és nyújtás, valamint a szükséges ízületi funkciók helyreállítása a hétköznapi tevékenységektől egészen a versenysport követelményeiig. A gerincstabilizáló gyakorlatok erősítik a mély törzsizmokat, miközben mobilizálják a gerincet.",
      ro: "Refacerea mobilității, tonifierea și întinderea mușchilor și restabilirea funcțiilor articulare de care ai nevoie, de la activitățile zilnice până la cerințele sportului de performanță. Exercițiile de stabilizare a coloanei întăresc musculatura profundă a trunchiului și mențin coloana mobilă.",
      en: "Restoring movement, strengthening and stretching muscles, and rebuilding the joint function you need, from everyday activities up to the demands of competitive sport. Spinal stabilisation exercises strengthen the deep trunk muscles while keeping the spine mobile.",
    },
    suitable: {
      hu: [
        "Rehabilitáció sérülés, törés vagy ortopédiai műtét után",
        "Ülő életmóddal összefüggő hátfájás",
        "Ízületi fájdalom és beszűkült mozgás",
        "Biztonságos visszatérés a sporthoz",
      ],
      ro: [
        "Recuperare după accidentări, fracturi sau operații ortopedice",
        "Dureri de spate legate de sedentarism",
        "Dureri articulare și mobilitate redusă",
        "Revenirea în siguranță la sport",
      ],
      en: [
        "Rehabilitation after injuries, fractures or orthopaedic surgery",
        "Back pain linked to a sedentary lifestyle",
        "Joint pain and reduced mobility",
        "Returning safely to sport",
      ],
    },
    session: {
      hu: "Rövid átbeszélés, a terapeuta által korrigált, irányított gyakorlatok, és néhány otthon folytatható feladat. A kiscsoportos foglalkozások ugyanerre épülnek, a gyakorlatokat mindenkihez külön igazítva.",
      ro: "O scurtă discuție, exerciții ghidate și corectate de terapeut și câteva exerciții de continuat acasă. Ședințele în grupuri mici urmează aceleași principii, cu exerciții adaptate fiecărei persoane.",
      en: "A short check-in, guided exercises with corrections from your therapist, and a few exercises to continue at home. Small-group sessions follow the same principles, with exercises adapted to each person.",
    },
    formats: [{ label: "individual" }, { label: "pair", minutes: 60 }, { label: "group", minutes: 60 }, { label: "groupShort" }],
    photos: [
      {
        src: birdDog,
        alt: {
          hu: "Egy vendég négykézláb törzsstabilizáló gyakorlatot végez a szőnyegen",
          ro: "O persoană face un exercițiu de stabilizare a trunchiului din poziția patrupedă, pe saltea",
          en: "A client practises a trunk stabilisation exercise on all fours on a mat",
        },
      },
    ],
  },
  {
    id: "schroth",
    slug: { hu: "schroth-terapia", ro: "terapie-schroth", en: "schroth-therapy" },
    category: "physio",
    needs: ["scoliosis", "posture"],
    name: { hu: "Schroth-terápia", ro: "Terapie Schroth", en: "Schroth therapy" },
    short: {
      hu: "Gerincferdülés-specifikus mozgásterápia a tartás, a gerinc helyzetének és a légzéskontrollnak a javítására, egyénileg vagy kiscsoportban.",
      ro: "Kinetoterapie specifică scoliozei, pentru îmbunătățirea posturii, a alinierii coloanei și a controlului respirației, individual sau în grupuri mici.",
      en: "Scoliosis-specific exercise therapy to improve posture, spinal alignment and breathing control, individually or in small groups.",
    },
    intro: {
      hu: "A Schroth-módszer a gerincferdülés (scoliosis), a Scheuermann-betegség, a lapos hát és egyes tartáshibák speciális kezelési módszere.",
      ro: "Metoda Schroth este o abordare specializată prin exerciții pentru scolioză, maladia Scheuermann, spatele plat și anumite deficiențe de postură.",
      en: "The Schroth method is a specialised exercise approach for scoliosis, Scheuermann's disease, flat back and certain postural faults.",
    },
    involves: {
      hu: "A háromdimenziós korrekciós gyakorlatok célzott testhelyzeteket, izomaktivációt és rotációs légzést kapcsolnak össze. Megtanulod felismerni a saját tartásodat, és lépésről lépésre korrigálni a hétköznapi helyzetekben is.",
      ro: "Exercițiile corective tridimensionale combină poziții țintite, activarea musculară și respirația rotațională. Înveți să îți recunoști propria postură și să o corectezi pas cu pas, inclusiv în pozițiile de zi cu zi.",
      en: "Three-dimensional corrective exercises combine targeted positions, muscle activation and rotational breathing. You learn to recognise your own posture and correct it step by step, including in everyday positions.",
    },
    suitable: {
      hu: [
        "Gerincferdüléssel élő gyerekek és fiatalok",
        "Gerincferdüléssel vagy Scheuermann-betegséggel élő felnőttek",
        "Fűzőkezelés mellett, ha orvosod javasolja",
      ],
      ro: [
        "Copii și adolescenți cu scolioză",
        "Adulți cu scolioză sau maladie Scheuermann",
        "Alături de tratamentul cu corset, când medicul îl recomandă",
      ],
      en: [
        "Children and teenagers with scoliosis",
        "Adults with scoliosis or Scheuermann's disease",
        "Alongside brace treatment, where your doctor recommends it",
      ],
    },
    session: {
      hu: "Légző- és aktiváló gyakorlatok, a görbületedhez igazított korrekciós helyzetek, valamint otthoni gyakorlatsor a kezelések közötti időre.",
      ro: "Exerciții de respirație și activare, poziții corective adaptate curburii tale și un program pentru acasă, între ședințe.",
      en: "Breathing and activation exercises, corrective positions tailored to your curve, and a home programme to practise between sessions.",
    },
    formats: [{ label: "individual" }, { label: "pair" }, { label: "group" }],
  },
  {
    id: "manual-therapy",
    slug: { hu: "manualterapia", ro: "terapie-manuala", en: "manual-therapy" },
    category: "treatment",
    needs: ["back-neck", "post-op", "mobility"],
    name: { hu: "Manuálterápia", ro: "Terapie manuală", en: "Manual therapy" },
    short: {
      hu: "Kézzel végzett technikák a fájdalom és az izomfeszültség csökkentésére, az ízületi blokkok oldására és a mozgékonyság javítására.",
      ro: "Tehnici aplicate cu mâinile pentru ameliorarea durerii și a tensiunii musculare, deblocarea articulațiilor și îmbunătățirea mobilității.",
      en: "Hands-on techniques to ease pain and muscle tension, release joint restrictions and improve mobility.",
    },
    intro: {
      hu: "A manuálterápia célja a támasztó- és mozgatórendszer fájdalmainak, akut és krónikus elváltozásainak kezelése, a tünetek enyhítése.",
      ro: "Terapia manuală tratează durerile și modificările acute și cronice ale aparatului locomotor și ajută la ameliorarea simptomelor.",
      en: "Manual therapy treats pain and acute or chronic changes in the musculoskeletal system, and helps relieve their symptoms.",
    },
    involves: {
      hu: "A terapeuta célzott mobilizációs és lágyrésztechnikákat alkalmaz az ízületeken, izmokon és fasciákon, általában olyan gyakorlatokkal kiegészítve, amelyek segítenek megtartani a javulást.",
      ro: "Terapeutul folosește tehnici specifice de mobilizare și de tratament al țesuturilor moi pe articulații, mușchi și fascii, de obicei combinate cu exerciții care ajută la menținerea ameliorării.",
      en: "Your therapist uses specific mobilisation and soft-tissue techniques on joints, muscles and fascia, usually combined with exercises that help maintain the improvement.",
    },
    suitable: {
      hu: ["Nyak-, hát- és vállfájdalom", "Merev ízületek és beszűkült mozgás", "Izomfeszültség és feszültség okozta fejfájás"],
      ro: ["Dureri de gât, spate și umăr", "Articulații rigide și mișcare limitată", "Tensiune musculară și dureri de cap de tensiune"],
      en: ["Neck, back and shoulder pain", "Stiff joints and restricted movement", "Muscle tension and tension-type headaches"],
    },
    session: {
      hu: "Rövid felmérés, kezelés a kezelőágyon, majd a mozgás újratesztelése a végén. A 60 perces alkalom gyakorlatokra is időt hagy.",
      ro: "O scurtă evaluare, tratament manual pe masă și retestarea mișcării la final. Ședința de 60 de minute lasă timp și pentru exerciții.",
      en: "A short assessment, hands-on treatment on the table, and re-testing of movement at the end. The 60-minute session leaves time for exercises.",
    },
    formats: durations(30, 60),
    photos: [
      {
        src: neckTreatment,
        alt: {
          hu: "Terapeuta a kezelőágyon fekvő vendég nyakát és vállát kezeli",
          ro: "Un terapeut tratează zona gâtului și a umerilor unei persoane întinse pe masa de tratament",
          en: "A therapist treats a client's neck and shoulders on a treatment table",
        },
      },
    ],
  },
  {
    id: "therapeutic-massage",
    slug: { hu: "terapias-masszazs", ro: "masaj-terapeutic", en: "therapeutic-massage" },
    category: "treatment",
    needs: ["recovery", "back-neck", "sports"],
    name: { hu: "Terápiás masszázs", ro: "Masaj terapeutic", en: "Therapeutic massage" },
    short: {
      hu: "Célzott masszázs a fájdalom csökkentésére, a feszes izmok ellazítására és a keringés támogatására, rövid kezeléstől a teljes testes masszázsig.",
      ro: "Masaj țintit pentru reducerea durerii, relaxarea mușchilor contractați și susținerea circulației, de la o ședință scurtă până la masaj complet.",
      en: "Targeted massage to reduce pain, relax tight muscles and support circulation, from a short focused session to a full-body treatment.",
    },
    intro: {
      hu: "A terápiás masszázs klasszikus svéd, mélyszöveti és triggerpont-technikákat foglal magában, a panaszaidhoz igazítva.",
      ro: "Masajul terapeutic include tehnici clasice suedeze, de țesut profund și de puncte trigger, alese în funcție de simptomele tale.",
      en: "Therapeutic massage includes classic Swedish, deep-tissue and trigger-point techniques, chosen according to your complaints.",
    },
    involves: {
      hu: "A terapeuta azokon az izmokon dolgozik, amelyeknek a leginkább szükségük van rá, menet közben igazítva a nyomást és a technikát. A rövid alkalmak egy területre fókuszálnak, az 50 perces kezelés az egész testre kiterjedhet.",
      ro: "Terapeutul lucrează pe mușchii care au cea mai mare nevoie, ajustând presiunea și tehnica pe parcurs. Ședințele scurte se concentrează pe o zonă; tratamentul de 50 de minute poate cuprinde tot corpul.",
      en: "The therapist works on the muscles that need it most, adjusting pressure and technique as you go. Short sessions focus on one area; the 50-minute treatment can cover the whole body.",
    },
    suitable: {
      hu: ["Izomfeszültség és izomcsomók", "Regeneráció edzés vagy verseny után", "Ülőmunka okozta panaszok"],
      ro: ["Tensiune musculară și noduri", "Refacere după antrenament sau competiție", "Disconfort cauzat de munca de birou"],
      en: ["Muscle tension and knots", "Recovery after training or competition", "Discomfort from desk work"],
    },
    session: {
      hu: "Rövid egyeztetés a problémás területekről, majd masszázs a kezelőágyon, nyugodt környezetben.",
      ro: "O scurtă discuție despre zonele problematice, apoi masaj pe masa de tratament, într-o cameră liniștită.",
      en: "A brief chat about problem areas, then massage on the treatment table in a calm room.",
    },
    formats: durations(15, 25, 50),
  },
  {
    id: "relaxation-massage",
    slug: { hu: "svedmasszazs-es-arcmasszazs", ro: "masaj-suedez-si-facial", en: "swedish-and-facial-massage" },
    category: "treatment",
    needs: ["recovery"],
    name: { hu: "Svédmasszázs és arcmasszázs", ro: "Masaj suedez și facial", en: "Swedish and facial massage" },
    short: {
      hu: "Relaxáló masszázs a stressz, az izomfeszültség és a fáradtság oldására.",
      ro: "Masaj relaxant pentru reducerea stresului, a tensiunii musculare și a oboselii.",
      en: "A relaxing massage to ease stress, muscle tension and fatigue.",
    },
    intro: {
      hu: "Nyugodtabb, kikapcsolódásra fókuszáló kezelés, amikor egyszerűen csak ki kell kapcsolnod.",
      ro: "Un tratament mai liniștit, axat pe relaxare, pentru momentele în care pur și simplu ai nevoie să te deconectezi.",
      en: "A calmer, relaxation-focused treatment, for when you simply need to switch off.",
    },
    involves: {
      hu: "Hosszú, áramló svédmasszázs-fogások vagy gyengéd arcmasszázs. Az 50 perces változat teljes testes relaxáló masszázst tesz lehetővé.",
      ro: "Manevre lungi și fluide de masaj suedez sau un masaj facial delicat. Varianta de 50 de minute permite un masaj de relaxare pentru tot corpul.",
      en: "Long, flowing Swedish massage strokes, or a gentle facial massage. The 50-minute option allows a full-body relaxation massage.",
    },
    suitable: {
      hu: ["Stressz és nehéz ellazulás", "Általános fáradtság és feszültség", "Ajándék valakinek, aki fontos neked"],
      ro: ["Stres și dificultăți de relaxare", "Oboseală și tensiune generală", "Un cadou pentru cineva drag"],
      en: ["Stress and difficulty relaxing", "General tiredness and tension", "A gift for someone close to you"],
    },
    session: {
      hu: "Csendes kezelőszoba, rövid egyeztetés arról, mi esik jól, majd masszázs kellemes erősséggel.",
      ro: "O cameră de tratament liniștită, o scurtă discuție despre preferințele tale, apoi masaj cu o presiune confortabilă.",
      en: "A quiet treatment room, a short conversation about your preferences, then massage at a comfortable pressure.",
    },
    formats: durations(25, 50),
  },
  {
    id: "lymphatic-drainage",
    slug: { hu: "nyirokdrenazs", ro: "drenaj-limfatic", en: "lymphatic-drainage" },
    category: "treatment",
    needs: ["post-op", "recovery"],
    name: { hu: "Nyirokdrenázs", ro: "Drenaj limfatic", en: "Lymphatic drainage" },
    short: {
      hu: "Kíméletes nyirokdrenázs a keringés támogatására és a duzzanat csökkentésére.",
      ro: "Drenaj limfatic blând, pentru susținerea circulației și reducerea edemului.",
      en: "Gentle lymphatic drainage to support circulation and help reduce swelling.",
    },
    intro: {
      hu: "A nyirokdrenázs lassú, ritmikus technikákkal segíti a nyirokfolyadék áramlását.",
      ro: "Drenajul limfatic folosește tehnici lente și ritmice pentru a stimula circulația limfei.",
      en: "Lymphatic drainage uses slow, rhythmic techniques to encourage the flow of lymph fluid.",
    },
    involves: {
      hu: "Könnyű, ismétlődő mozdulatok a bőrön, a nyirokáramlás irányát követve. Gyakran része a sérülések vagy műtétek utáni felépülésnek, illetve nehéz, duzzadt láb érzése esetén is alkalmazzák.",
      ro: "Mișcări ușoare și repetitive pe piele, în direcția fluxului limfatic. Se folosește adesea în recuperarea după accidentări sau operații ori pentru senzația de picioare grele și umflate.",
      en: "Light, repetitive movements over the skin follow the direction of lymph flow. It is often part of recovery after injuries or surgery, and is also used for heavy, swollen legs.",
    },
    suitable: {
      hu: ["Sérülés vagy műtét utáni duzzanat, orvosi egyetértéssel", "Nehéz, fáradt láb", "A felépülés támogatása"],
      ro: ["Edem după accidentare sau operație, cu acordul medicului", "Picioare grele și obosite", "Sprijin în perioada de recuperare"],
      en: ["Swelling after injury or surgery, when your doctor agrees", "Heavy, tired legs", "Support during recovery"],
    },
    session: {
      hu: "Kényelmesen fekszel, a terapeuta lassan dolgozik a kezelt területen. A hosszabb alkalmak nagyobb területet ölelnek fel.",
      ro: "Stai întins confortabil, iar terapeutul lucrează lent pe zona tratată. Ședințele mai lungi acoperă o zonă mai mare.",
      en: "You lie comfortably while the therapist works slowly over the treated area. Longer sessions cover a larger area.",
    },
    formats: durations(15, 25, 50),
    safety: {
      hu: "Akut fertőzés, kezeletlen trombózis vagy bizonyos szívbetegségek esetén a nyirokdrenázs nem javasolt. Előtte mindenképp jelezd a terapeutának az egészségi állapotodat.",
      ro: "Drenajul limfatic nu este recomandat în infecții acute, tromboză netratată sau anumite afecțiuni cardiace. Spune-i terapeutului dinainte despre orice problemă de sănătate.",
      en: "Lymphatic drainage is not recommended with acute infections, untreated thrombosis or certain heart conditions. Please tell your therapist about any health conditions beforehand.",
    },
  },
  {
    id: "tecar",
    slug: { hu: "tecar-terapia", ro: "terapie-tecar", en: "tecar-therapy" },
    category: "treatment",
    needs: ["back-neck", "sports", "recovery"],
    name: { hu: "TECAR-terápia", ro: "Terapie TECAR", en: "TECAR therapy" },
    short: {
      hu: "Rádiófrekvenciás kezelés, amely belülről melegíti a szöveteket, és segít enyhíteni a fájdalmat és az izomgörcsöt, támogatva a gyógyulást.",
      ro: "Tratament cu radiofrecvență care încălzește țesuturile din interior, ajutând la ameliorarea durerii și a contracturilor și susținând recuperarea.",
      en: "Radiofrequency treatment that warms tissues from within, helping to ease pain and muscle spasm and supporting recovery.",
    },
    intro: {
      hu: "A célzott rádiófrekvenciás terápia a korszerű fizikoterápiás eljárások egyike: magas frekvenciájú elektromágneses energiát juttat a kezelt szövetekbe.",
      ro: "Terapia țintită cu radiofrecvență este una dintre procedurile moderne de fizioterapie: transmite energie electromagnetică de înaltă frecvență în țesuturile tratate.",
      en: "Targeted radiofrequency therapy is one of the modern physical therapy treatments. It delivers high-frequency electromagnetic energy to the tissues being treated.",
    },
    involves: {
      hu: "A terapeuta egy elektródát mozgat a kezelt területen, közben kellemes melegséget érzel. A kezelés célja a helyi keringés javítása és az izomgörcsök oldása; gyakran mozgásterápiával vagy manuálterápiával kombináljuk.",
      ro: "Terapeutul mișcă un electrod pe zona tratată, iar tu simți o căldură plăcută. Tratamentul urmărește îmbunătățirea circulației locale și relaxarea contracturilor și se combină adesea cu exerciții sau terapie manuală.",
      en: "The therapist moves an electrode over the area while you feel a pleasant warmth. The treatment aims to improve local circulation and ease muscle spasm, and is often combined with exercise or manual therapy.",
    },
    suitable: {
      hu: [
        "Izomfájdalom és izomgörcs",
        "Ízületi fájdalom, például váll-, térd- vagy csípőfájdalom",
        "Gerincpanaszok, például isiászszerű fájdalom",
        "Más kezelésekre nehezen reagáló, hosszan tartó fájdalom",
      ],
      ro: [
        "Dureri și contracturi musculare",
        "Dureri articulare, de exemplu la umăr, genunchi sau șold",
        "Probleme ale coloanei, cum ar fi durerea de tip sciatic",
        "Dureri de durată care nu au răspuns la alte abordări",
      ],
      en: [
        "Muscle pain and spasm",
        "Joint pain, for example in the shoulder, knee or hip",
        "Back problems such as sciatica-type pain",
        "Long-standing pain that has not responded to other approaches",
      ],
    },
    session: {
      hu: "Fájdalommentes kezelés 15, 25 vagy 50 percben, a kezelt terület nagyságától és a tervedtől függően.",
      ro: "Un tratament nedureros de 15, 25 sau 50 de minute, în funcție de mărimea zonei și de planul tău.",
      en: "A painless treatment lasting 15, 25 or 50 minutes, depending on the size of the area and your plan.",
    },
    formats: durations(15, 25, 50),
    device: true,
  },
  {
    id: "tecar-beauty",
    slug: { hu: "tecar-beauty", ro: "tecar-beauty", en: "tecar-beauty" },
    category: "treatment",
    needs: [],
    name: { hu: "TECAR beauty", ro: "TECAR beauty", en: "TECAR beauty" },
    short: {
      hu: "Nem invazív rádiófrekvenciás kezelés a bőr tónusának és rugalmasságának javítására, narancsbőr kezelésére is.",
      ro: "Tratament neinvaziv cu radiofrecvență pentru tonusul și elasticitatea pielii, folosit și în tratarea celulitei.",
      en: "A non-invasive radiofrequency treatment for skin tone and elasticity, also used in cellulite treatment.",
    },
    intro: {
      hu: "Ugyanaz a rádiófrekvenciás technológia, mint a TECAR-terápiánál, bőrápolási céllal alkalmazva.",
      ro: "Aceeași tehnologie cu radiofrecvență ca la terapia TECAR, aplicată în scop de îngrijire a pielii.",
      en: "The same radiofrequency technology as TECAR therapy, applied for skin care.",
    },
    involves: {
      hu: "A kezelés kíméletes meleget juttat a bőrbe és az alatta lévő szövetekbe, serkentve a keringést. Általában kúraszerűen tervezzük.",
      ro: "Tratamentul transmite o căldură blândă pielii și țesuturilor de dedesubt, stimulând circulația. De obicei se planifică sub forma unei serii.",
      en: "Gentle warmth is delivered to the skin and the tissue beneath it to stimulate circulation. Treatments are usually planned as a series.",
    },
    suitable: {
      hu: ["A bőr tónusának és rugalmasságának javítása", "Narancsbőr (cellulit)"],
      ro: ["Îmbunătățirea tonusului și elasticității pielii", "Celulită"],
      en: ["Improving skin tone and elasticity", "Cellulite (orange-peel skin)"],
    },
    session: {
      hu: "Pihentető, 25 perces kezelés, lábadozási idő nélkül.",
      ro: "Un tratament relaxant de 25 de minute, fără timp de recuperare.",
      en: "A relaxing 25-minute treatment with no recovery time needed.",
    },
    formats: durations(25),
    device: true,
  },
  {
    id: "shockwave",
    slug: { hu: "lokeshullam-terapia", ro: "terapie-cu-unde-de-soc", en: "shockwave-therapy" },
    category: "treatment",
    needs: ["sports"],
    name: { hu: "Lökéshullám-terápia", ro: "Terapie cu unde de șoc", en: "Shockwave therapy" },
    short: {
      hu: "Nem invazív kezelés krónikus ín- és izomproblémákra, valamint ízületi és ínmeszesedések esetén.",
      ro: "Tratament neinvaziv pentru probleme cronice ale tendoanelor și mușchilor, folosit și în calcificările articulare și tendinoase.",
      en: "A non-invasive treatment for chronic tendon and muscle problems, also used for calcifications in joints and tendons.",
    },
    intro: {
      hu: "Az extrakorporális lökéshullám-terápiát (ESWT) széles körben alkalmazzák a fizioterápiában, az ortopédiában és a sportorvoslásban.",
      ro: "Terapia extracorporală cu unde de șoc (ESWT) este folosită pe scară largă în fizioterapie, ortopedie și medicina sportivă.",
      en: "Extracorporeal shockwave therapy (ESWT) is widely used in physiotherapy, orthopaedics and sports medicine.",
    },
    involves: {
      hu: "Egy kézi fejen keresztül akusztikus nyomáshullámokat juttatunk a fájdalmas területre. A kezelés célja a fájdalom csökkentése és a szövetek gyógyulásának serkentése; a javulás általában több hét alatt alakul ki.",
      ro: "Prin intermediul unui aplicator, unde acustice de presiune sunt transmise în zona dureroasă. Tratamentul urmărește reducerea durerii și stimularea vindecării țesuturilor; ameliorarea apare de obicei în decurs de câteva săptămâni.",
      en: "Acoustic pressure waves are delivered to the painful area through a handpiece. The treatment aims to reduce pain and stimulate tissue healing; any improvement typically develops over several weeks.",
    },
    suitable: {
      hu: [
        "Vállfájdalom és meszes ínhüvelygyulladás",
        "Teniszkönyök és golfkönyök",
        "Talpi bőnye gyulladása (sarokfájdalom)",
        "Achilles- és térdkalácsín-problémák",
        "Triggerpontok és izomcsomók",
      ],
      ro: [
        "Dureri de umăr și tendinită calcifiantă",
        "Epicondilită (cotul tenismenului și al jucătorului de golf)",
        "Fasciită plantară (durere de călcâi)",
        "Probleme ale tendonului ahilean și rotulian",
        "Puncte trigger și noduri musculare",
      ],
      en: [
        "Shoulder pain and calcific tendinitis",
        "Tennis and golfer's elbow",
        "Plantar fasciitis (heel pain)",
        "Achilles and patellar tendon problems",
        "Trigger points and muscle knots",
      ],
    },
    session: {
      hu: "A kezelendő pontot tapintással keressük meg, zselét viszünk fel, és rövid sorozatokban adjuk le a hullámokat. Pillanatokra intenzív lehet, ezért az erősséget hozzád igazítjuk.",
      ro: "Zona se localizează prin palpare, se aplică gel, iar undele se transmit în serii scurte. Poate fi intens pentru moment, de aceea intensitatea se ajustează pentru tine.",
      en: "The area is located by touch, gel is applied and the waves are delivered in short series. It can feel intense for a moment, so the intensity is adjusted to you.",
    },
    formats: durations(15, 25, 50),
    device: true,
  },
  {
    id: "ultrasound",
    slug: { hu: "ultrahangterapia", ro: "terapie-cu-ultrasunete", en: "ultrasound-therapy" },
    category: "treatment",
    needs: ["sports", "recovery"],
    name: { hu: "Ultrahangterápia", ro: "Terapie cu ultrasunete", en: "Ultrasound therapy" },
    short: {
      hu: "Terápiás ultrahang a fájdalom csökkentésére és a lágyrészek regenerációjának támogatására.",
      ro: "Ultrasunete terapeutice pentru reducerea durerii și susținerea regenerării țesuturilor moi.",
      en: "Therapeutic ultrasound to help reduce pain and support the regeneration of soft tissues.",
    },
    intro: {
      hu: "Kíméletes, széles körben alkalmazott fizikoterápiás kezelés, gyakran egy átfogóbb rehabilitációs terv része.",
      ro: "Un tratament de fizioterapie blând și larg folosit, adesea parte dintr-un plan de recuperare mai amplu.",
      en: "A gentle, widely used physical therapy treatment, often part of a broader rehabilitation plan.",
    },
    involves: {
      hu: "Egy zselével bekent kézi fejet lassan mozgatunk a kezelt területen, amely magas frekvenciájú hanghullámokat juttat a szövetekbe. A legtöbben alig vagy egyáltalán nem éreznek semmit a kezelés alatt.",
      ro: "Un aplicator cu gel este mișcat lent pe zona tratată, transmițând unde sonore de înaltă frecvență în țesuturi. Majoritatea oamenilor simt foarte puțin sau nimic în timpul tratamentului.",
      en: "A handpiece with gel is moved slowly over the treated area, delivering high-frequency sound waves into the tissues. Most people feel little or nothing during the treatment.",
    },
    suitable: {
      hu: ["Ín- és szalagpanaszok", "Izomhúzódás a felépülés során", "Ízületi fájdalom egy rehabilitációs terv részeként"],
      ro: ["Afecțiuni ale tendoanelor și ligamentelor", "Întinderi musculare în perioada de recuperare", "Dureri articulare, ca parte a unui plan de recuperare"],
      en: ["Tendon and ligament complaints", "Muscle strains during recovery", "Joint pain as part of a rehabilitation plan"],
    },
    session: {
      hu: "Rövid, kényelmes kezelés, gyakran ugyanazon alkalommal mozgásterápiával kombinálva.",
      ro: "Un tratament scurt și confortabil, adesea combinat cu kinetoterapie în aceeași vizită.",
      en: "A short, comfortable treatment, often combined with exercise therapy in the same visit.",
    },
    formats: durations(15, 25, 50),
    device: true,
  },
  {
    id: "cryotherapy",
    slug: { hu: "krioterapia", ro: "crioterapie", en: "cryotherapy" },
    category: "treatment",
    needs: ["sports", "post-op", "recovery"],
    name: { hu: "Krioterápia", ro: "Crioterapie", en: "Cryotherapy" },
    short: {
      hu: "Helyi hidegterápia a fájdalom, a gyulladás és az izomfáradtság csökkentésére, kompresszióval kombinált CryoComp formában is.",
      ro: "Terapie locală cu rece pentru reducerea durerii, inflamației și oboselii musculare, disponibilă și ca CryoComp, cu compresie.",
      en: "Local cold therapy to help reduce pain, inflammation and muscle fatigue, also available as CryoComp with compression.",
    },
    intro: {
      hu: "A helyi krioterápia során egy adott testrészt, például egy ízületet vagy izmot, rövid ideig intenzív hidegnek teszünk ki.",
      ro: "În crioterapia locală, o anumită zonă a corpului, de exemplu o articulație sau un mușchi, este expusă pentru scurt timp la frig intens.",
      en: "In local cryotherapy a specific body part, such as a joint or muscle, is exposed to intense cold for a short time.",
    },
    involves: {
      hu: "A hideget a kezelt területre juttatjuk a gyulladás és a fájdalom csillapítására. A CryoComp a hideget kompresszióval kombinálja, amelyet gyakran alkalmaznak sportsérülések után és a műtét utáni felépülés során.",
      ro: "Frigul se aplică pe zona tratată pentru a calma inflamația și durerea. CryoComp combină frigul cu compresia, o variantă folosită des după accidentări sportive și în recuperarea postoperatorie.",
      en: "Cold is applied to the treated area to calm inflammation and pain. CryoComp combines cold with compression, an option often used after sports injuries and in post-operative recovery.",
    },
    suitable: {
      hu: [
        "Mozgásszervi fájdalom és gyulladás, például ízületi gyulladás vagy izomhúzódás",
        "Felépülés sportsérülések után",
        "Műtét utáni duzzanat, orvosi egyetértéssel",
      ],
      ro: [
        "Dureri și inflamații ale aparatului locomotor, cum ar fi artrita sau întinderile musculare",
        "Recuperare după accidentări sportive",
        "Edem postoperator, cu acordul medicului",
      ],
      en: [
        "Musculoskeletal pain and inflammation, such as joint inflammation or muscle strains",
        "Recovery after sports injuries",
        "Swelling after surgery, when your doctor agrees",
      ],
    },
    session: {
      hu: "Rövid, 15 vagy 25 perces kezelés a kezelt területen. A CryoCompot a terapeutád javaslata alapján alkalmazzuk.",
      ro: "Un tratament scurt, de 15 sau 25 de minute, pe zona tratată. CryoComp se folosește la recomandarea terapeutului.",
      en: "A short treatment of 15 or 25 minutes on the affected area. CryoComp is used where your therapist recommends it.",
    },
    formats: [{ minutes: 15 }, { minutes: 25 }, { label: "cryoComp" }],
    device: true,
    safety: {
      hu: "A hidegterápia nem mindenkinek való, például hidegérzékenység, Raynaud-jelenség vagy bizonyos keringési zavarok esetén. A terapeutád ezt előtte átbeszéli veled.",
      ro: "Terapia cu rece nu este potrivită pentru oricine, de exemplu în caz de hipersensibilitate la frig, fenomen Raynaud sau anumite tulburări circulatorii. Terapeutul verifică aceste aspecte cu tine înainte.",
      en: "Cold therapy is not suitable for everyone, for example with cold hypersensitivity, Raynaud's phenomenon or certain circulatory problems. Your therapist checks this with you first.",
    },
  },
  {
    id: "electrotherapy",
    slug: { hu: "elektroterapia", ro: "electroterapie", en: "electrotherapy" },
    category: "treatment",
    needs: ["back-neck", "recovery"],
    name: { hu: "Elektroterápia", ro: "Electroterapie", en: "Electrotherapy" },
    short: {
      hu: "Elektromos ingerlés a fájdalom enyhítésére, a helyi vérkeringés javítására és az izmok regenerációjának támogatására.",
      ro: "Stimulare electrică pentru ameliorarea durerii, îmbunătățirea circulației locale și susținerea refacerii musculare.",
      en: "Electrical stimulation to help relieve pain, improve local circulation and support muscle recovery.",
    },
    intro: {
      hu: "Az elektroterápia olyan fizikoterápiás eljárás, amely során elektromos áramot alkalmazunk a kezelendő testrészen. A rehabilitációban gyakori kiegészítő kezelés.",
      ro: "Electroterapia este o procedură de fizioterapie în care se aplică curent electric pe zona tratată. Este un tratament complementar frecvent în recuperare.",
      en: "Electrotherapy is a physical therapy procedure in which electrical current is applied to the area being treated. It is a common supporting treatment in rehabilitation.",
    },
    involves: {
      hu: "Elektródákat helyezünk a bőrre, és enyhe áramot alkalmazunk, amit bizsergésként vagy finom izomösszehúzódásként érzel. A beállítástól függően fájdalomcsillapításra, izomlazításra vagy izomerősítésre használjuk.",
      ro: "Electrozii se așază pe piele și se aplică un curent blând, resimțit ca furnicături sau contracții musculare ușoare. În funcție de setări, se folosește pentru calmarea durerii, relaxare musculară sau tonifiere.",
      en: "Electrodes are placed on the skin and a gentle current is applied, felt as tingling or light muscle contractions. Depending on the settings, it is used for pain relief, muscle relaxation or muscle strengthening.",
    },
    suitable: {
      hu: ["Akut és krónikus izomfájdalom", "Idegi eredetű fájdalom", "Izomgörcsök", "Az izomerő és a mozgástartomány fenntartása"],
      ro: ["Dureri musculare acute și cronice", "Dureri de origine nervoasă", "Spasme musculare", "Menținerea forței musculare și a amplitudinii de mișcare"],
      en: ["Acute and chronic muscle pain", "Nerve-related pain", "Muscle spasms", "Maintaining muscle strength and range of movement"],
    },
    session: {
      hu: "Kényelmesen pihensz, amíg a készülék működik. Gyakran mozgásterápiával kombináljuk.",
      ro: "Te odihnești confortabil cât timp funcționează aparatul. Adesea se combină cu kinetoterapia.",
      en: "You rest comfortably while the device runs. It is often combined with exercise therapy.",
    },
    formats: [],
    device: true,
  },
  {
    id: "kinesio-taping",
    slug: { hu: "kinesio-taping", ro: "kinesiology-taping", en: "kinesiology-taping" },
    category: "treatment",
    needs: ["sports"],
    name: { hu: "Kinesio taping", ro: "Kinesiology taping", en: "Kinesiology taping" },
    short: {
      hu: "Rugalmas, öntapadós szalag az izmok és ízületek támogatására, a természetes mozgás megőrzésével.",
      ro: "Bandă elastică aplicată pentru susținerea mușchilor și articulațiilor, permițând mișcarea naturală.",
      en: "Elastic tape applied to support muscles and joints while allowing natural movement.",
    },
    intro: {
      hu: "Magas minőségű, öntapadós rugalmas szalag, amelyet széles körben alkalmaznak a mozgásszervi problémák kezelésében és a sportban.",
      ro: "O bandă elastică autoadezivă de înaltă calitate, folosită pe scară largă în tratarea problemelor aparatului locomotor și în sport.",
      en: "A high-quality, self-adhesive elastic tape used widely in the treatment of musculoskeletal problems and in sport.",
    },
    involves: {
      hu: "A terapeuta a céltól függően meghatározott irányban és feszességgel helyezi fel a szalagot: ízület támogatására, izom tehermentesítésére vagy a duzzanat csökkentésének segítésére. Általában több napig is fennmaradhat.",
      ro: "Terapeutul aplică banda într-o anumită direcție și cu o anumită tensiune, în funcție de scop: susținerea unei articulații, descărcarea unui mușchi sau reducerea edemului. De obicei poate rămâne aplicată mai multe zile.",
      en: "The therapist applies the tape in a specific direction and tension depending on the goal: supporting a joint, offloading a muscle or helping to reduce swelling. It can usually stay on for several days.",
    },
    suitable: {
      hu: ["Támogatás rándulás és húzódás után", "Edzésbe visszatérő sportolók", "Duzzanat és véraláfutás"],
      ro: ["Susținere după entorse și întinderi", "Sportivi care revin la antrenamente", "Edem și echimoze"],
      en: ["Support after sprains and strains", "Athletes returning to training", "Swelling and bruising"],
    },
    session: {
      hu: "Gyors felhelyezés, általában egy másik kezelés kiegészítéseként, tanácsokkal arról, meddig maradjon fenn a szalag.",
      ro: "O aplicare rapidă, de obicei în completarea altui tratament, cu sfaturi despre cât timp să păstrezi banda.",
      en: "A quick application, usually added to another treatment, with advice on how long to keep the tape on.",
    },
    formats: [],
  },
  {
    id: "movement-plus",
    slug: { hu: "mozgas-plusz", ro: "miscare-plus", en: "movement-plus" },
    category: "movement",
    needs: ["posture", "mobility", "sports"],
    name: { hu: "Mozgás+ funkcionális edzés", ro: "Mișcare+ antrenament funcțional", en: "Movement+ functional training" },
    short: {
      hu: "Irányított funkcionális edzés minden korosztálynak: egyensúly időseknek, tartásjavítás gyerekeknek, megelőzés és teljesítményfokozás sportolóknak.",
      ro: "Antrenament funcțional ghidat pentru orice vârstă: echilibru pentru vârstnici, postură pentru copii, prevenție și performanță pentru sportivi.",
      en: "Guided functional training for every age: balance for older people, posture for children, prevention and performance for athletes.",
    },
    intro: {
      hu: "A Mozgás+ erőt, egyensúlyt és állóképességet fejleszt, miközben a gyógytornász figyel a helyes technikára és a biztonságra.",
      ro: "Mișcare+ dezvoltă forța, echilibrul și rezistența, cu un kinetoterapeut atent la tehnică și siguranță.",
      en: "Movement+ builds strength, balance and endurance, with a physiotherapist keeping an eye on technique and safety.",
    },
    involves: {
      hu: "Az edzést a csoporthoz igazítjuk: időseknek az erő és az egyensúly megőrzése, gyerekeknek tartásjavító tréning, sportolóknak sérülésmegelőzés és teljesítményfokozás, felnőtteknek általános funkcionális edzés. Labdákkal, egyensúlypárnákkal, TRX-szel és saját testsúllyal dolgozunk.",
      ro: "Antrenamentul este adaptat grupului: menținerea forței și a echilibrului pentru vârstnici, antrenament postural pentru copii, prevenirea accidentărilor și creșterea performanței pentru sportivi și antrenament funcțional general pentru adulți. Lucrăm cu mingi, perne de echilibru, benzi de suspensie și greutatea propriului corp.",
      en: "Training is adapted to the group: maintaining strength and balance for older adults, postural training for children, injury prevention and performance work for athletes, and general functional training for adults. We use balls, balance pads, suspension trainers and body weight.",
    },
    suitable: {
      hu: [
        "Idősek: erő, egyensúly és aktív életmód",
        "Gyerekek: testtartás és testtudat",
        "Sportolók: megelőzés és teljesítményfokozás",
        "Felnőttek: általános funkcionális erőnlét",
      ],
      ro: [
        "Vârstnici: forță, echilibru și o viață activă",
        "Copii: postură și conștientizarea corpului",
        "Sportivi: prevenție și performanță",
        "Adulți: condiție fizică funcțională generală",
      ],
      en: [
        "Older adults: strength, balance and staying active",
        "Children: posture and body awareness",
        "Athletes: prevention and performance",
        "Adults: general functional fitness",
      ],
    },
    session: {
      hu: "Bemelegítés, változatos funkcionális gyakorlatok egyéni korrekcióval, majd levezetés nyújtással.",
      ro: "Încălzire, un set variat de exerciții funcționale cu corecții individuale și revenire cu stretching.",
      en: "A warm-up, a varied set of functional exercises with individual corrections, and a cool-down with stretching.",
    },
    formats: [],
    photos: [
      {
        src: functionalTraining,
        alt: {
          hu: "Egy sportoló plankgyakorlatot végez félgömbön és fitneszlabdán",
          ro: "Un sportiv execută o planșă cu mâinile pe o semisferă de echilibru și picioarele pe o minge de fitness",
          en: "An athlete holds a plank with hands on a balance dome and feet on a fitness ball",
        },
      },
      {
        src: childrenPosture,
        alt: {
          hu: "Gyógytornász tartásjavító gyakorlatot vezet gyerekeknek fitneszlabdán ülve",
          ro: "Un kinetoterapeut ghidează exerciții de postură pentru copii așezați pe mingi de fitness",
          en: "A physiotherapist leads posture exercises for children sitting on fitness balls",
        },
      },
    ],
  },
];

export function getService(locale: Locale, slug: string) {
  return services.find((s) => s.slug[locale] === slug);
}

export function getServiceById(id: string) {
  const service = services.find((s) => s.id === id);
  if (!service) throw new Error(`Unknown service: ${id}`);
  return service;
}

/** Category cover images used on overview cards. */
export const categoryPhotos: Record<ServiceCategory, ServicePhoto> = {
  assessment: getServiceById("postural-analysis").photos![0],
  physio: getServiceById("physiotherapy").photos![0],
  treatment: getServiceById("manual-therapy").photos![0],
  movement: getServiceById("movement-plus").photos![1],
};

export function relatedServices(service: Service, limit = 3) {
  const sameNeed = services.filter(
    (s) => s.id !== service.id && s.needs.some((n) => service.needs.includes(n)),
  );
  const sameCategory = services.filter((s) => s.id !== service.id && s.category === service.category);
  const ordered = [...sameCategory, ...sameNeed].filter((s, i, all) => all.indexOf(s) === i);
  return ordered.slice(0, limit);
}
