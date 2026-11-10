# A047 — Sarah Elizabeth Carling Webb original-proof access boundary
**2026-11-10 · private research report in a draft branch; no genealogical claim promoted**

## 1870 census — DO NOT substitute adjacent sheet
- Exact original previously inspected: 1870 US federal population schedule, Fillmore, Millard County, Utah Territory, **page 7, stamped 338, 24 June 1870**, NARA M593 roll 1611; existing original image citation `https://archive.org/download/populationschedu1611unit/page/n20.jpg`; preserved full working 40-line transcription in `research/edward-jr-census-full-pages/1870-canonical-working-merged.json`.
- First six lines of that already reviewed sheet are Carling children, **but SARAH does not appear on it**. It is a continuation of a household from the previous sheet. No recapture of page 7. Exact preceding image not independently confirmed; `n19.jpg` is a **candidate URL, not inspected, verified or preserved**.
- Internet Archive's page view could not be read through the permitted static reader at either `.../page/n19.jpg` or the page viewer. A public state or FamilySearch browse remains an alternate *access route*, not a negative original-name search.
- The existing public derivative Ancestry record indexed **Elizabeth Carling, age 34** in 1870 plausibly relates to Asenath Elizabeth Browning, not daughter Sarah Elizabeth aged ~14; no link promotion from a same-name index. The 1870 census population form **did not record household relationships** (NARA 1870 census instructions); even a found Sarah co-resident line would support household association, not itself certify biological mother and father.

## 1949 Arizona death original — still not person-located
- Published `Pioneer Women of Arizona` biography says **Sarah died 16 July 1949 in Mesa, Maricopa County**. This is a compiled secondary work, NOT a retrieved civil original.
- Arizona Department of Health Services public genealogy interface `https://genealogyapp.azdhs.gov/Genealogy/home/index?page=genealogysearch` confirms search by first/last name, mother's maiden name, and death-year range. Arizona state records are available 50 years after death; 1949 is eligible. **No person-specific result, file number, certificate image or parent/informant line retrieved.**
- Static web reader has access to the form description but cannot submit the interactive search or access the per-result original. Do NOT fabricate certificate ID, call this a negative search, or request payment. If browser access becomes authorized/possible, use Sarah/Sara, Webb, 1949, mother's maiden Browning; fetch unchanged original and full transcription only if visible.

## Independent compiled household lead — source-class boundary
- `Isaac Van Wagoner Carling Biography`, a later compiled family narrative publicly indexed via Scribd, describes **4 August 1876** journey from Fillmore to Orderville, and labels Sarah Elizabeth (age 20) among the children of Isaac's first wife Asenath. It separately names John Henry, Ellen Elvira, Lydia May and Jesse Hobson as Miriam Hobson's children. This is an **additional named derivative family narrative**, NOT an 1876 passenger roll, original birth registration or certified parentage link. Existing A045 already kept the 12-vs-4 separation; no new person edge, photo or birth date should be added from this alone.

## A047 source/release safety
- GitHub Pages deployment workflow on main previously executed a few research-specific checks, *not* the A040–A046 person-page tests or `node verify-package.mjs` promised in the deployment readme.
- The A047 **draft**, not main, adds a **review-only, nondeployment GitHub Actions workflow** and stages release gates for `node --test tests/atlas_*.test.mjs` and `node verify-package.mjs`. Uses standard public-repository runners, which GitHub documents as free. No workflows were assumed to have passed merely because they were committed. The staged deploy workflow change itself has not been published.
- Actual installed iPhone media and caching still need manual visual certification before coordinated release. Main's `manifest.webmanifest` and `index.html` continue to point to v3.9.62 with dated October refresh query; no live deployment here.

## No-repeat / current status
- Existing 120 audit roster rows remain, 67 distinct tracked source/media targets remain; **no new original document/image bytes, no new certified person page**.
- No Gmail or other email access, no spending, paid/metered browser sessions, external outreach, FamilySearch account modification or public Atlas merge.


## A047 observed automated QA, 10 Nov 2026
- First PR review run `42918120758`: one **test assertion** failed because A045 checked for the contiguous phrase `17 November 1854` where its correct biography states 23 Nov 1854 newspaper and separately 17 Nov marriage. Test corrected, historical text unaltered.
- Latest check run `42918742281` after draft version reconciliation: **all staged `tests/atlas_*.test.mjs` passed**, as did all three research governance scripts. `node verify-package.mjs` failed **only the six audio byte-hash differences** below (each reported twice by two independent registries). No new original/media or genealogy claim changed.
- Staged static consistency correction: `PACKAGE_ASSET_MANIFEST.json` version 3.9.36 → 3.9.62; HTML visible build labels 3.9.56 and 3.9.37 → 3.9.62. This aligns code labels with the already-existing 3.9.62 launch path; it **does not yet update the Home Screen manifest/cache query or deploy**.
- Audio approval record `approved-audio/fable/APPROVAL.md` explicitly states the six biography-distinctness recordings were approved 31 Aug 2026; GitHub history reports commit `30dc5d05193c12a27a5dd29293a332035798abef` “Promote approved v3.8.19 Fable audio.” However current MP3 bytes do not match the accompanying locked hashes or the review-record JSON hashes; **neither restoration nor re-locking is justified without proving which bytes were approved**. The historic Actions run `33342187526` exposed **zero retrievable artifacts** in the current query. No sound file regenerated, replaced, or downloaded.
- Actual and locked SHA-256 values, measured on the free GitHub review runner, are **listed solely for forensic comparison**:
| File | Recorded approved lock | Current repository bytes |
|---|---|---|
| `Charles_albert_brenay.mp3` | `6f3e88d00e6f157b34a35b96bc9590188be4cfd24a472249870a1948485278fd` | `86feb4bc550d1db032c8693d1151e2a572532196201eefce8076a7cc072ffd3b` |
| `Charles_godfrey_brenay.mp3` | `c7ec38a3e2ec36c29c80565145f6799749de376214239f34edf76a26b47d41af` | `aca71e67fe5b0a1bbd275cd4b65bcb295a5af94d58b6e0b51ffc6d46cdecd710` |
| `Ida_mae_gooley.mp3` | `4ef0e32113c8b9b8a6bbe64539c29fc52cac5ccf9e10d067fb8a79ac3afacb01` | `5af6653132bb6547109e9b1a9a134b90443f91c7b4e14691a751b0e12caa55a5` |
| `John_peter_gooley.mp3` | `ec238922f2f666c8bffbdb355fb34b26fe6a2f6a68d10c8471a3bf19744ed618` | `89c0f57f2b898a48e799f423bbcad8cfc5aa4994628c238aeef660edfdda89b2` |
| `Mary_ann_dennis.mp3` | `a67f720da813a3d79b27e0bb38b467fef09bd4f44ed0e5bc19ab5328c685c7de` | `269c0782ef55915c8707cbff04893b279feccb9b01631759205952a3d41d5d00` |
| `James_wilford_webb.mp3` | `389e088d64cb7e775815c32a7bf7a415161e2d1c9a6811e03c8fc17e1aaf5e53` | `ed065e4ecca58a7a98b3d8fe188a0339199b459ffe6bd3d461788041314e302b` |
- **Release remains blocked**, and no request has been made to treat a new hash as an approved recording. The QA infrastructure now prevents silent publication of these discrepancies after eventual merge. Next forensic step: compare original approved audio artifacts, if recoverable, with the Aug 31 promoted commit's actual blobs; otherwise ask the owner to review original approval before choosing restoration vs relocking. No paid/metered service, email, or external outreach.
