# Isaac Van Wagoner Carling — Tranche 21: final preapproval gallery and source-integrity audit

**Date:** 18 October 2026. **Person:** Isaac Van Wagoner Carling (1831–1911), FamilySearch `KWJ8-5XJ`, Atlas node `isaac_carling`. **Result:** v3.9.62 built and successfully deployed; document checksum, gallery categories, biography and metadata contract have **passed the real GitHub Actions CI runner**; **user iPhone validation still pending, no user approval claimed**.

## Concrete release corrections

- `isaac-carling-final-preapproval-presentation-20261018.js`: final, idempotent Atlas overlay; makes museum biography less filled with internal primary-source caveats, without inventing titles, people or new claims. Preserves third-person narrative and the uncertain 1875/1876 Orderville move as “mid-1870s”.
- Fixes the 1852 Curtis-company historical note to retain only the grounded paths-crossed possibility, **not** a hypothetical family meeting, and removes “Do not reopen approved Edward Jr.” internal instruction visible to visitors. Keeps the United Order note separate from biography.
- Fixes the 1854 full-page marriage-document summary. Previously the generic global `familyFacingEvidenceSummary` in live `atlas-v3.9.61.html` could suppress wording such as “captured” and substitute a generic **Sheldon Webb marriage description**. The corrected Isaac-specific summary is display-safe and clarifies that two visual tiles point to **one** period original newspaper PDF.
- Fixes daughter Asenath Emeline Carling Spencer's document caption to identify her **1924** death certificate **not Isaac's 1911 certificate**, and distinguish a web-sized reproduction from the Utah archival master. Fixes 1900 Orderville caption to explicitly say the people in the photograph are not identified as Isaac.
- Removes redundant `originalAsset` links from daughter's family-hosted web JPG and USU historical-place web JPG because the viewer's `full` is the same saved image; avoids implying that a separate original paper/negative is held. Retains verified unchanged downloaded JPEGs as viewable gallery assets with original archive links and custody documentation.
- The last code correction on the page load sequence fixes a double-application behavior that could duplicate Isaac's historical notes in a repeated execution, by deduplicating source-note identity in `isaac-carling-mobile-biography-20261018.js` (commit `bd8e15f3c2ab055416a00f40ed751cf1d45d47ff`). Regression suite now passes with all **six Isaac modules run twice**.

## Actual artifacts, SHA checks and renderer contracts

**Published:** `atlas-v3.9.62.html`, with six Isaac-specific overlays in deterministic order; `index.html` main redirect and `manifest.webmanifest` iPhone start URL target **v3.9.62**, cache token `20261018-isaac-qa-b6`.

**QA script**: `tests/isaac-preapproval-release.mjs`, executed by `.github/workflows/isaac-preapproval-qa.yml`. Successful *real CI* run: https://github.com/68zvh8wpzp-boop/ancestry-atlas/actions/runs/39165001697 (head commit `49667df3f6121250d5d7a87720d7770d3ae2ab5a`). The exact GitHub Actions run `node tests/isaac-preapproval-release.mjs` checks:
- Complete original asset bytes, file headers, filenames and SHA-256 independently loaded from checked-out repository, combined **853,934 bytes**:
  - 23 Nov 1854 *Deseret News* p3 **original single-page PDF**: **308,420** bytes, SHA `e8eb7ae86f6e8a7f5a247b6ad0fc3159675df3e948290cff8514a77b4e27d4be`.
  - USU Rural Rangeland Archive **c.1900 Orderville contextual town photograph**, exact institution-published JPEG: **348,849** bytes, SHA `4f258b39f84019be837736bb4050f1247a6dfcad19c5e63f2bd9ab7e72808f6f`.
  - Daughter Asenath Emeline's **1924 Utah civil death-certificate web JPEG copy**, **196,665** bytes, SHA `88a70e481e7b3bf94205815d2a2b3bf053589efee615514d5fd479d640499fc0`.
- Both 1854 **derivative viewing images** (magnified PNG, full-page JPG) are real, nonempty files with valid raster headers, distinct from the unmodified original PDF.
- Full public Biography matches `GUIDE_PROFILES.isaac_carling.life`, length over 3,000 characters, has no internal editorial instructions; two deduplicated historical notes remain.
- Exact categorized cards: **three DOCUMENT image tiles** (marriage notice close-up and whole newspaper, both backed by ONE unique original PDF; daughter 1924 death certificate); **one HISTORICAL PLACES photo** (Orderville around 1900); **six SOURCE-only external records** (including 1852 diary transcript + digitized printed 1966 volume); **zero authenticated Isaac portrait**.
- No source-only citation pretends it has a local image, all `thumb/full/originalAsset` paths point at existing bytes, no missing local media, no duplicate evidence IDs when modules load twice, no unrelated ancestor changed.
- Release HTML includes the six scripts in the right order; both root iPhone launch paths point to the same version; research source governance gate passes.

**Published Pages deployment (separate from the QA run):** https://github.com/68zvh8wpzp-boop/ancestry-atlas/actions/runs/39165001758, successful at `49667df3f6121250d5d7a87720d7770d3ae2ab5a`. Published URL: https://68zvh8wpzp-boop.github.io/ancestry-atlas/ .

**Browser limitation:** external web-HTML preview was inaccessible from this chat's web-viewing tool; **the iPhone UI itself has not been visually inspected by the model or the user**. CI confirms data contract and file integrity, not touch/swipe/scroll behavior, in-device images or rendering. This is the final acceptance task, not a reason to repeat genealogy research.

## Frozen, specific original-document exceptions (not hidden and not counted as present)

1. **No period portrait known to show Isaac himself.** Do not import an unrelated Ontario politician named Isaac Carling (1825), descendents with the name, or a FamilySearch picture-pedigree composite or crowd photo without specific identification.
2. Isaac's **own 1911 Kane death certificate** has no identified image; official Utah Archives Series81448 available Kane folder for 1911 is January–February, not reported 24 May death. No claim that a certificate never existed.
3. Isaac's alleged autograph **1852 trail diary**: Church History online transcript cites Elda P. Mortenson's later printed volume 1 pp48–55; a digitized copy of that **printed book** exists, but no autograph manuscript shelfmark or image confirmed. No copyright-restricted book pages rehosted.
4. Isaac's **17 April 1855 consecration deed**: family-history transcription describes $441 assets, Brigham Young trusteeship and Millard Probate Judge Thomas R. King acknowledgment; CHL **CR 5 53** and BYU **MSS SC 1320** are plausible archive collections, not person-specific identified folios. **No scanned signature or deed image**.
5. Miriam Hobson marriage date **1857 vs 1859** not established by an examined contemporary register. Orderville move exact 1875 vs 1876 date also unresolved and the public biography does not claim one.
6. USU Orderville sketch and some cooperative officers' primary records catalogued but not imaged/person-specific verified.

**These provenance exceptions do not make his well-supported Biography or genuine saved assets inaccessible.** Future targeted archival contact can be separately authorized, but user agreement is to stop infinite research loops before final review.

## What the user should check on iPhone before approval

At the [Atlas](https://68zvh8wpzp-boop.github.io/ancestry-atlas/), open **Isaac Van Wagoner Carling**:
- Biography renders completely, scrolls, no text cutoff; two historical notes appear exactly once.
- **DOCUMENTS (3)** shows two different views of the same **1854 marriage page** and Asenath Emeline's **1924 death certificate**, with zoom, source link and readable labels; no record accidentally described as Sheldon Webb's marriage or Isaac's death.
- **HISTORICAL PLACES (1)** displays the circa-1900 **Orderville townscape** with historic-place provenance, not as Isaac's face.
- **Sources & Research (6)** shows links including Church History diary transcript and Mortenson 1966 printed volume, and no fabricated original pages.
- No Isaac portrait shown, because none authenticated.
- iPhone Back/Up branch, touch swipe through document images, scrolling and source-link opening work. Share one screenshot if a UI issue appears.

**Status:** **READY FOR USER IPHONE ACCEPTANCE**, but **NOT USER-APPROVED**, not closed. After user approval, mark Isaac complete/closed once in the research registry and move to the next person. Do not restart original source hunt as a prerequisite to approval. No user email access, no FamilySearch writes, no paid archives.
