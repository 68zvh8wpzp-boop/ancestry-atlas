# v3.9.24 — mobile scan previews

## Changed

- Published eight genuine first-page previews for Marion Beulah Brenay's PDF
  documents so the iPhone document cards show source content instead of blank
  or dark remote-frame placeholders.
- Preserved the original full PDFs and their FamilySearch provenance as the
  tap-through destination.
- Added the standing mobile scan-preview rules in
  `PRODUCTION_CONTRACT_v3_9_24_MOBILE_SCAN_PREVIEWS.md`.
- Bumped the cache-busting release URL to `v3.9.24`.

## Unchanged

- Marion's evidence counts remain 10 documents and 13 photos.
- No biography text, genealogy edge, source claim, or original document was
  altered by the preview generation.

## Preview/source mapping

| Preview | Source |
| --- | --- |
| `assets/marion-docs-preview/40th.jpg` | Jay and Marion's 40th Anniversary — 5-page scan |
| `assets/marion-docs-preview/50th.jpg` | Jay and Marion Webb's 50th Wedding Anniversary — 3-page scan |
| `assets/marion-docs-preview/graduation.jpg` | Marion Brenay's 8th Grade Graduation — 5-page scan |
| `assets/marion-docs-preview/home.jpg` | Home — Marion and the Webb family home, 1990 |
| `assets/marion-docs-preview/letters.jpg` | Marion Webb family letters — 4-page scan |
| `assets/marion-docs-preview/neat-as-a-pin.jpg` | “Neat as a Pin” — family memory scan |
| `assets/marion-docs-preview/ration-books.jpg` | Webb Family World War II Ration Books — household scan |
| `assets/marion-docs-preview/young-marion.jpg` | Young Marion — age 12, 1935 |

## Validation

- `node --check marion-atlas-update-2026-09-29.js`
- `git diff --check`
- Genuine first pages visually reviewed before publication.
