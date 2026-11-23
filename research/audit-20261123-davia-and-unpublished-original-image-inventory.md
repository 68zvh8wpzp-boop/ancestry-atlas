# Ancestry Atlas — Davia death-source gate and unpublished original-image crosswalk
23 November 2026 · content and evidence audit only · $0 · no email

## Davia Ann Dunbar Hill Duffy — source-status correction

The live person-page biography in `davia-mobile-memoir.js` formerly asserted her death at Richmond on 3 March 1923 and a Sunny Slope Cemetery burial without qualifying the underlying sources. This checkpoint changed **only one sentence** to distinguish secondary reports from the **still-uninspected 1923 Missouri original death certificate**.

- State archive: Missouri Death Certificates 1910–1975, which links digital certificate scans to search results: https://s1.sos.mo.gov/records/Archives/ArchivesMvc/DeathCertificates/
- PeopleLegacy burial index, "Mrs Davia Ann 'david' Dunbar Hill Duffy" (1856–1923), identifies **Sunny Slope Cemetery, Richmond, Ray County**: https://peoplelegacy.net/burial-records/mrs/duffy/
- Ray County Missouri GenWeb's Sunny Slope Cemetery **"D" transcription, last updated 30 January 2003**, lists several Duffetts and Duffys, but **does not include Davia**: https://ray.mogenweb.org/cemeteries/richmond_twp/sunny/sunny_d.htm
- WikiTree family profile identifies 3 March 1923 as her death, but that is later genealogical data, not the state certificate: https://www.wikitree.com/wiki/Hill-66166
- The 1900 household indexed as Lawrence Duffy and Annie Duffy is already cited in the Atlas and prior audit; **no new parentage or marriage is inferred from this name variation**.

**Evidence classification:** compiled burial listing plus separate transcription omission, **not** proof of a false burial; no cemetery image viewed, no death certificate number known, no original death-certificate image downloaded. Date, place and surname require the original. No new certified person page or original image.

## Library-to-GitHub original-source reconciliation — do not duplicate assets

The first comparison used source byte sizes and subject-compatible paths; a **second integrity pass** re-materialized all 11 Library files below, computed each file's true Git blob SHA-1 from its full original binary bytes, and matched that SHA against the published main-branch Git tree. **All 11 of 11 checked originals were exact-byte matches** (plus the second identical 1893 marriage Git blob). The 11-source SHA-1/SHA-256 attestation is preserved in Research Library `/Ancestry Atlas/Research/ATLAS_2026-11-23_11_ORIGINAL_HASH_CROSSWALK.md`. This proves original binary custody for those 11 only; it does not prove the image is displayed in every applicable person gallery or that source/caption/lineage interpretation is certified.

### Already present on GitHub (no duplicate uploading)
- 1893 Charles Brenay–Ida Gooley Alpena original marriage return, Library 3,654,320 bytes → `assets/charles-godfrey/charles-ida-marriage-1893.jpg` and `assets/wilhelm-brunne/charles-ida-marriage-1893.jpg` (same-sized copies). The 1893 image is linked on Ida's person page. It names **Peter Gooley** and **Mary A. Gooley** as Ida's parents, *not* "Mary Dennis" directly.
- 1898 James Gooley marriage original, Library 458,082 bytes → `assets/john-peter/james-marriage-1898.jpg`, already cited in John Peter / Mary Ann galleries. The mother is named **Mary Dennis** for the groom; kinship/equivalence must be evaluated with the wider household, not by name alone.
- 1901 Brunne/Gooley Canadian census original, 1,662,636 bytes → `assets/john-peter/peter-census-1901.jpg`.
- 1910 Peter Gooley Michigan death original, 605,848 bytes → `assets/john-peter/peter-death-1910.jpg`.
- Seven **cryptographically matched** master images (of seventeen inventoried) under Library `/Ancestry Atlas/Original Records/Skinner-Lewis` have same-sized, compatible-path original copies already published in `assets/richard-skinner/`: Richard 1870 and 1880 censuses; 1882 Richard/Ellen marriage; 1894 Marcie Skinner birth, **both original views**; 1899 Richard/Jessie marriage; 1933 Richard death. Check galleries separately from binary presence before declaring full person-page coverage.

### In persistent Library, without same-sized published main-branch counterpart
- Three **1861 Barnston census original pages 23, 25, 26**, 3,979,616 / 4,310,331 / 4,270,449 bytes, are in `/Ancestry Atlas/Original Records/Gooley-Canadian-Proof`. They concern Peter / Loiza / John / Peter Jr. candidate households; **not proven to be the direct John Peter**. Retain as research evidence, *do not connect candidate parents or present as this ancestor's original*.
- Ten of the 17 Skinner-Lewis Library originals have no same-sized GitHub counterpart:
  1. 1910 Beaver household; 2–3. 1873 Marietta Skinner child and parents views; 4. 1895 John Skinner–Clara Hartwell marriage; 5. 1930 Marian Skinner census; 6–7. 1897 Priscilla Campbell child and parents death views; 8. 1871 John A Skinner birth; 9. 1860 John and Mary Skinner census; 10. 1853 John Skinner–Mary Lewis marriage.
  These must undergo source/identity review and be **physically published as original full-page image bytes** before being claimed as person-page complete; original preservation in Library alone does not equal publication. Some are collateral and should be assigned correctly.
- The 1850 Estill County Kentucky John M Prather census source-page image and a user-supplied PDF wrapper are in Library `/Ancestry Atlas/Original Records/Prather`; neither exact original filename appears in the published git tree. The PDF wrapper is **not** a new historical original.
- The 1919 Mary Ann Gooley death **screen rendition** is explicitly marked `NOT_master`; do not promote it as newly captured untouched original.

## Next action / protected boundaries
1. Recheck the **A428** Library audit register and queue (`ancestry-atlas-person-page-register_A428_2026-11-23.json`, `ANCESTRY_ATLAS_A428_UNIQUE_IMAGE_ORIGINAL_DOCUMENT_QUEUE_2026-11-23.json`) before another tranche. A428 records **130 tracked person entries and 194 unique evidence targets (119 P1, 66 P2, 9 P3)**; do not revert to older A416 counts. This report does not alter that queue or imply new targets.
2. Preserve full-resolution existing Library master bytes and add published gallery references only after the **actual binaries** reach GitHub; do not replace the originals with links, cropped mockups, or a smaller rendition.
3. A user's installed iPhone acceptance remains unverified; CI success alone is not on-device evidence.
4. Structural Atlas UX, portrait crop implementation, tree code, genealogy graph, and other concurrent research streams were not modified by this tranche.

**Measured:** one live person-page provenance correction; a reviewed crosswalk of existing/missing originals; **0 newly acquired original historical records**, **0 new kinship edges**, **0 certified pages**. No spending, no email.

## Current strict-audit denominator — November 23 follow-up
The newer **A428** Research Library register (not older A416) has **130 tracked rows, 122 person targets, and 8 nonperson/concept rows**, together with **194 distinct original-image/document targets** (119 P1, 66 P2, 9 P3). The A428 register retains **six historic October 'complete' person-page closeouts**, with recorded user approvals on their then-current revisions; **none was newly revalidated against the November 23 current installed iPhone in this tranche**. Do not treat 122 person targets as 122 proven direct ancestors. The A352 direct-path scope separately contains **82 working profiles**, not a competing certification count. No additional person page was certified in this pass.
