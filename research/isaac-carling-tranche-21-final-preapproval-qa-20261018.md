# Isaac Van Wagoner Carling — Tranche 21: final preapproval audit (v3.9.62)

**Date:** 18 October 2026.  
**Person:** Isaac Van Wagoner Carling (1831–1911), FamilySearch KWJ8-5XJ, Atlas `isaac_carling`.  
**Disposition:** Museum biography/source/media review **passed all programmatic release gates**; **no claim of on-device visual/iPhone acceptance**, no newly acquired source, user approval still required. Earlier researched source exceptions frozen in governance. Do not restart the 1852 diary, 1911 Kane index, 1855 deed, census or FamilySearch composite image queues in order to publish a finished page.

## 1. Actual code and released app

Inspected live-app source at `atlas-v3.9.61.html` and `index.html`, plus all five sequential Isaac modules:
- `isaac-carling-mobile-biography-20261018.js` (museum biography and separate historical notes)
- `isaac-carling-1854-marriage-original-media-20261018.js`
- `isaac-carling-orderville-1900-context-photo-20261018.js`
- `isaac-carling-daughter-1924-death-certificate-media-20261018.js`
- `isaac-carling-1852-diary-digitized-volume-source-20261018.js`

Verified `openNode()` renders the guide profile's `life` into the actual BIOGRAPHY section, `n.historicalNotes` into distinct historical notes, and `n.evidence` through `renderEvidence()` into DOCUMENTS, PHOTOS, HISTORICAL PLACES, and source-only sections. The renderer distinguishes **image filenames backed by repository binary assets** from citation links alone.

**Actual presentation defects found and corrected, not hand-waved:**
1. Isaac's biography included working-document editorial text about an uninspected board minute and job title. Museum prose now speaks naturally about descendants' recollections without asserting titles as proved originals.
2. One historical note directly told editors “Keep as a special note” and “Do not reopen” an approved other ancestor. Replaced with a visitor-facing explanation of the two companies, **without claiming the families met**.
3. The title change on that special note revealed a real repeat-initialization bug: the legacy biography overlay could append the same note on a second load. Final presentation overlay **deduplicates historical-note titles**. The GitHub regression test initially **FAILED** (3 notes vs expected 2); test re-run after fixing loader behavior **PASSED**, proving the problem was genuinely resolved.
4. The legacy generic evidence summary function can substitute a **wrong Webb/Inez marriage description** when a document summary triggers its text filter. Isaac's 1854 full-page caption was rewritten so it passes filtering and retains correct names/context; regression ensures visible image-card captions do not hit the known fallback patterns.
5. Source descriptions for the diary printed book and daughter certificate now use clear historic-document language and explicitly distinguish a printed-volume copy and a daughter’s 1924 certificate from Isaac's 1852 autograph and 1911 certificate. Internal coded presentation-status string removed.
6. Removed duplicate `originalAsset` links when exactly equal to the `full` web JPEG for the daughter’s family-site scan and Orderville institutional JPEG, so clicking does not misleadingly advertise an independently captured *state archival master* or *original photographic negative*. **Both actual saved image files remain the full gallery images; sourcePage and provenance retained.** The real unchanged original **1854 newspaper PDF remains directly linked from both of its separate viewing tiles**.

Changes are contained in `isaac-carling-final-preapproval-presentation-20261018.js`, loaded last in **`atlas-v3.9.62.html`**. Both root `index.html` and installed iPhone `manifest.webmanifest` route to **v3.9.62** with the same cache token `20261018-isaac-qa-b6`. All older versions preserved for rollback. User-visible prose does not contain prompts to editors. No genealogy facts invented, no FamilySearch edits and no email accessed.

## 2. Real saved media and identities

| Gallery section | Actual content | Proof and limitations |
|---|---|---|
| DOCUMENTS: 1854 notice | Magnified notice crop and separate whole-page viewing image | TWO derivative views from ONE **unaltered original** *Deseret News* 23 Nov 1854 vol4 no37 p3 PDF, `assets/isaac-carling/1854-deseret-news-p3-marriage-original.pdf`. Record married 17 Nov 1854 in Ogden, officiated Ezra T. Benson. |
| DOCUMENTS: daughter's certificate | 1924 Asenath Emeline Carling Spencer death-certificate image | ONE **different** civil-record source, contemporaneous document but web-sized **576×518 family-hosted JPEG reproduction**; names Isaac as her father and Asenath E. Browning as mother. Not Isaac’s own death certificate, not state archives master. |
| HISTORICAL PLACES | Genuine circa-1900 Orderville townscape | ONE 1500×1000 JPEG published by Utah State University RRA, Plate548X, Church Archives P-1093-12. Isaac is **not individually identified**, no portrait field attached. Exact original photographic print not held by Atlas. |
| PHOTOS of Isaac | **0** | No portrait with valid person identity/provenance. Picture-pedigree composites and another Isaac Carling born 1825 are unsafe. |
| Source-only links | **6** | Diary published transcript, Sarah parentage secondary, 1911 institutional profile, Miriam chronology, Orderville retrospective account and linked 1966 digitized Mortenson diary volume; none have fake media assets. |

**Distinct saved document source count 2; image/document gallery tiles 4** (3 Documents, 1 Historical Places). **Not** four separate archival originals. No duplicate person genealogy graph edges.

## 3. Tested bytes and release checks

Committed one-shot test `tests/isaac-preapproval-release.mjs` loads the six Isaac modules **twice** in a simulated same-variable runtime, checking:
- Exact preserved original hashes, bytes, and format signatures:
  - 1854 *Deseret News* PDF SHA256 `e8eb7ae86f6e8a7f5a247b6ad0fc3159675df3e948290cff8514a77b4e27d4be`, **308420** bytes.
  - circa-1900 Orderville institutional JPEG SHA256 `4f258b39f84019be837736bb4050f1247a6dfcad19c5e63f2bd9ab7e72808f6f`, **348849** bytes.
  - Daughter's 1924 family-source JPEG SHA256 `88a70e481e7b3bf94205815d2a2b3bf053589efee615514d5fd479d640499fc0`, **196665** bytes.
  - Two 1854 derivative viewing images exist and have valid PNG/JPEG signatures (original undisturbed).
- All 10 evidence entries have grounded external source pages, exactly 3 document views + 1 historical place photo + 6 source-only citations. Their physical `assets/isaac-carling/` paths **exist**. All descendants/other person nodes unchanged. Biography (3472 chars) synchronized with GUIDE_PROFILES.
- The 1854 viewing tiles both open the **SAME unchanged original PDF**, no inventoried extra document mistakenly called an original.
- No invented Isaac portrait; no duplicate special note on repeat application; no leakage of editor instructions.
- Root `index.html` redirect and installed iPhone PWA `manifest.webmanifest` share v3.9.62 and exact cache-busting query.
- Standard shared `research-source-gate.mjs` and `tests/research-source-gate.mjs` pass.

**Authoritative observed PASS:** one-shot CI https://github.com/68zvh8wpzp-boop/ancestry-atlas/actions/runs/39165001697 . Reported `biographyChars: 3472, notes: 2, documentTiles: 3, distinctDocumentSources: 2, historicalPlaceImages: 1, sourceOnlyReferences: 6, authenticatedIsaacPortraits: 0, originalBytesVerified: 853934`; also 14 negative regression tests for research-source ownership passed. Correctly disclosed earlier red CI run 39164879334 detected the duplicate and prompted the fix. Latest GitHub Pages deployment after content-only registry commits must still be confirmed before inviting final iPhone validation.

**Limitation:** This is a comprehensive file-integrity/source-label/static runtime audit. It does **not** replace a human inspection of the rendered browser/iPhone image quality, tap/swipe behavior or link success. The archive's crop and the 576px daughter scan have not been manually pixel-reviewed in this chat with an image-capable browser; on-device validation is the acceptance gate.

## 4. Preserved exceptions — do NOT reopen as default

1. **Isaac's personal portrait:** 0 authenticated. Unverified composite FamilySearch Memory164147651 remains excluded; special group photo without face identity excluded.
2. **Isaac's own 1911 death certificate:** not acquired; Utah Archives series81448 Kane County folder inventory only lists Jan–Feb of 1911, while Isaac reportedly died 24 May. Does not prove certificate never existed.
3. **1852 diary autograph:** unlocated; later family-history *printed* transcript (Mortenson vol1 pp48–55, Digital Library identifier194973_01) cited, no manuscript image.
4. **1855 consecration deed reportedly signed Isaac:** original individual folio/unread; Church History Library CR5 53 and BYU MSS SC1320 are plausible holdings, not person-verified. No fee/no email; source remains a researched lead.
5. **Miriam Elizabeth Hobson's marriage/sealing:** conflicting reported 1857/1859 dates and age, no original event register. Bio deliberately does not state disputed exact age or wedding venue.
6. **USU artist-attributed sketch, Orderville cooperative board minutes and other original/photo leads:** cataloged and documented; none falsely installed as Isaac's images or as proof of specific organizational titles.
7. **1875 vs 1876 Move chronology:** contemporary document absent; public bio uses “mid-1870s.”

## 5. Final approval handoff — one action, no new tranche

After successful Github Pages v3.9.62 deploy, have user open **https://68zvh8wpzp-boop.github.io/ancestry-atlas/**, select Isaac Van Wagoner Carling, and verify: biography rendered fully, TWO context notes, 3 Document image views, ONE Historical Places image, six Source links, note that person portrait is absent, original PDF link opens, source captions and touch-navigation work. Ask user to approve or send a precise screenshot defect. Keep Isaac **pending user iPhone approval** until they explicitly approve, then close person and advance next direct ancestor under existing queue. Don't start another 1855/1911/1852 retry without user authorization or a genuinely new archival locator.

**No user approval, email access, FamilySearch writes, fees, or undocumented captures claimed.**
