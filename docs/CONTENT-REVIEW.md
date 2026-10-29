# Content review before launch

Everything on the site comes from three sources: the PhysioArt development portal (`dev.physioart.ro`), the previous website (`physioart.ro`) and the supplied folder of photos from PhysioArt's Facebook page. Nothing was invented. Where sources disagreed or a fact could not be confirmed, it is listed here.

Status as of 29 October 2026.

## 1. Business details to confirm

| # | Item | What the site shows | Why it needs checking |
| --- | --- | --- | --- |
| 1 | Main email | `contact@physioart.ro` | The dev portal uses this address. The business card shows `office@physioart.ro`; the old site lists `magyarosi.orsolya@physioart.ro` and `szbkinga@yahoo.com`. Pick one public address. |
| 2 | Phone numbers | 0754 282 934 (main), 0742 864 694 (secondary, Contact page only) | The old site lists the second number as Szabó Kinga's. Confirm it may be shown. |
| 3 | Opening hours | Not shown. Contact page says "Treatments are by appointment." | No current opening hours were published anywhere. Provide them to add them to the page and to the structured data. |
| 4 | Address and map pin | Str. József Attila nr. 28, 520063 Sfântu Gheorghe; coordinates 45.854306, 25.774617 | Taken from the dev portal's configuration. |
| 5 | Portal URL | `https://dev.physioart.ro` | Client login, portal booking, privacy policy and terms point to the development portal, the only live one. Set `NEXT_PUBLIC_PORTAL_URL` to the production portal. |
| 6 | Privacy policy | Links to the portal's privacy page | Confirm it also covers website contact-form messages, or provide a website privacy notice. |
| 7 | Contact form destination | Not connected (form says messages are not available yet) | Decide where messages go; see README "Contact form integration". |
| 8 | Prices | Not shown | No current price list was found. Add one if PhysioArt wants prices online. |

## 2. Team

| Item | Source | Action |
| --- | --- | --- |
| Magyarosi Orsolya: profile, specialisations, training 2014–2020 | physioart.ro "Rólunk / Despre noi" (published 2020) | Confirm still accurate; add training since 2020. |
| Orsolya: Semmelweis University manual therapy final exam, 8 January 2025 | Diploma photo on Facebook (photo 092) | Verified from the certificate. |
| Orsolya and Kinga: McKenzie Part A (2018 / 2019) | Certificates on Facebook (photos 171, 166) | Verified from the certificates. |
| Szabó Kinga: profile and training 2015–2020 | physioart.ro | Confirm she is still part of the team and the details are current. |
| Portraits of both therapists | physioart.ro (`kep-orsi-1.jpg`, `kep-kinga.jpg`, 2020), cropped to upper-body portraits | The only photos where the name and face are linked by PhysioArt itself. Confirm they are still representative and that both consent. |
| Other team members (György Ágota, Balla Viktor, and colleagues named Johanna and Betti on a Facebook graphic) | Facebook | **Not profiled**, because roles, surnames and identified photos could not be verified. Send names, roles, qualifications and approved portraits to add them. |
| 3D Schroth (SpineArt) course, 2024 | Photos 103/104 | Used on the About page without naming the two people. Confirm who they are if names should be shown. |

## 3. Services

- The dev portal lists 38 bookable items. They are grouped into **18 services**: variants that differ only by length (TECAR 15/25/50, massage, ultrasound, shockwave, lymphatic drainage, cryotherapy) or group size (physiotherapy, Schroth) are shown once with their options. TECAR beauty and CryoComp stay clearly labelled.
- Service descriptions were rewritten from the dev portal and the old site's "Complementary therapies" page. They avoid outcome guarantees and include a contraindication note for device treatments (taken from the old site). **Please have a physiotherapist review the medical wording.**
- Not listed because they are not in the current booking catalogue: pregnancy exercise (terhestorna), senior gymnastics, online consultations, running technique. Confirm whether any should be added.
- Movement+ has no durations in the portal. Confirm its session format.
- The Moti Physio 3D posture analysis device is confirmed by the June 2025 event poster.

## 4. News

| Article | Note |
| --- | --- |
| PNRR project completed (5 May 2026) | New. Text from the official press release (photo 003, also on physioart.ro "Projects"). Confirm wording and any PNRR publicity requirements. |
| Lecture on children's posture problems (14 June 2025) | New. Programme from the event posters (photos 056/057); cover photo 050 is assumed to be from this event, based on the matching Facebook upload sequence. Confirm. |
| Tax benefit for employees (Sept 2025) | From the dev portal. Confirm the DSP authorisation and Fiscal Code references are still valid. |
| Your Body, Your Home (Jan 2025) | Past event with price and registration contact. Consider removing it. |
| Seven articles dated 10 May 2020 | That is the date they were posted on physioart.ro; the original press articles are mostly from 2019. |
| Tompa Krisztián (Covasna Media) | The original article no longer exists; the source link points to the Wayback Machine copy. |
| Staying fit while shut in (Covasna Media) | The original article no longer exists and has no archive copy; the source is named without a link. |

No testimonials or reviews are shown, and none are in the structured data. Add only verified, consented quotes.

## 5. Photo audit

The supplied folder contained **195 files**. Each was reviewed for quality, resolution, relevance, consent risk and brand fit. **11 were used**, plus the two verified portraits from physioart.ro.

### Used

| Website file | Source | Where | Notes |
| --- | --- | --- | --- |
| `hero-guided-exercise.jpg` | Physioart_157 | Homepage hero | Professional shoot. Cropped 5:4, green wall toned down slightly. |
| `guided-suspension-exercise.jpg` | Physioart_187 | Homepage "About" | Client's face not visible. |
| `treatment-neck-massage.jpg` | Physioart_178 | Treatments category, Manual therapy | |
| `exercise-bird-dog.jpg` | Physioart_189 | Physiotherapy category and page | |
| `children-posture-training.jpg` | Physioart_190 | Movement+ category and page | **Shows children. Confirm parental consent.** |
| `functional-training-plank.jpg` | Physioart_158 | Movement+ page | Near-duplicate 152 not used. |
| `group-exercise-session.jpg` | Physioart_184 | About, "The centre" | |
| `postural-analysis-moti-physio.jpg` | Physioart_053 | Assessment category, Postural analysis, About | Staff member on the Moti Physio mat. |
| `event-posture-lecture.jpg` | Physioart_050 | News: posture lecture | Parents in the background. |
| `training-3d-schroth-diplomas.jpg` | Physioart_103 | About, "Continuous learning" | White frame removed. |
| `pnrr-press-release.jpg` | Physioart_003 | News: PNRR article | Official document. |
| `team-magyarosi-orsolya-portrait.jpg` | physioart.ro | Homepage team, About | |
| `team-szabo-kinga-portrait.jpg` | physioart.ro | Homepage team, About | |

Photos 152–193 come from an earlier professional shoot (staff in green PhysioArt shirts). They are the best-quality images available and are used as treatment imagery, not presented as a current photo tour. **Confirm the people shown agreed to website use and that the rooms still look like this.** A new photoshoot of the current team and rooms would be the single biggest improvement to the site.

### Not used, by reason

- **Not relevant:** clothing and shoes (005–024), jewellery (098), a lost-property graphic (100), children's drawing-contest entries (106–116, consent and relevance).
- **Graphics with text overlays:** promotions, holiday hours, vouchers, service posters, job ads and seasonal posts (001, 002, 004, 017, 030, 031, 035–040, 042, 043, 047, 048, 056, 057, 067, 071, 091, 094, 095, 118–122, 124–126, 129–131, 139–147, 150, 151, 155, 159–162, 172, 174, 194, 195). Facts from them were used as text where helpful.
- **Before/after injury photos:** 044, 045 (no authorisation or clinical context).
- **Certificates:** 092, 104, 156, 165–168, 171. Used only to verify qualifications.
- **People not identifiable by name, or personal posts:** 041, 096, 099, 132, 133, 148, 164, 169, 175–177.
- **Too low-resolution for any placement:** 097 and 123 (team photo, 826 px wide), 179, 149/163 (icon; used only for the favicon).
- **Events, partners and off-site:** 029, 032–034, 049, 051, 052, 054, 055, 068–070, 075, 083–090, 093, 117, 127, 128, 134–138, 153, 154.
- **Close-ups or phone shots of lower quality:** 025–028, 058–066, 072–074, 076, 081, 082.
- **Software screenshots and devices:** 077–080.
- **Exact or near duplicates:** 113, 114, 116, 134, 162, 163, 168, 152.
- **Other exercise photos from the professional shoot** (180–186, 188, 191–193): good quality but similar to the selected ones; held back to avoid repetition.

## 6. Technical checks performed

- Production build: 131 prerendered routes, no errors; ESLint and TypeScript clean.
- Link crawl: all 108 pages (36 per language) return 200, each with one H1, the correct `lang`, a canonical URL and `hreflang` alternates for hu, ro, en and x-default.
- Unknown URLs return a real 404 status.
- External booking and legal links (App Store, Google Play, client login, privacy, terms, ANPC, Facebook, Instagram) checked on 29 Oct 2026: all 200.
- Responsive: no horizontal overflow at 390 px or 1440 px; mobile menu, language switch (keeps the equivalent page), theme switching, service filters and form validation tested in a real browser.
- Contact API: `503` when not configured, `400` with field errors for invalid input.
