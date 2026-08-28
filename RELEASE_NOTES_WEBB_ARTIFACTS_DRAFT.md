# Webb branch artifact and narration checkpoint — review generation pending

## Purpose

Build the first complete, reviewable artifact layer for the supported Webb trunk
without changing the live v3.8.12 experience or promoting the unresolved parent
couple above James Webb Jr.

## Added

- Normalized Webb source register with source-class and limitation notes.
- Production manifest for five biographies: James Wilford “Jay” Webb, Jonathan
  Henry Webb, Edward Milo Webb Jr., Edward Milo Webb Sr. and James Webb Jr.
- User-approved, immutable narration scripts for all five people, each below
  the 3,000-character project limit.
- Scene manifests with explicit asset briefs and approval states.
- Rights/approval register separating approved family-photo reuse from
  uncleared authentic portraits and unpresented visual candidates.
- Automated Webb artifact validation.
- User-approved observational charcoal opening for Jay in Pinedale, Arizona,
  recorded with checksum and non-likeness provenance.
- Complete approved visual sequences for Jay, Jonathan Henry Webb, Edward Milo
  Webb Jr. and Edward Milo Webb Sr.; James Webb Jr. visuals remain pending.
- A validated review-only Fable generation workflow for the five Webb scripts.
- Optional Research Frontier contracts for the proposed Webb-to-England chain
  and the Gooley/Goulet-to-France question after the supported tour endpoints.

## Evidence treatment

- The supported trunk remains unchanged.
- Edward Milo Webb Jr.'s 1921/1924 death-date conflict remains visible.
- James Webb Jr. is deliberately produced as a proof-frontier biography.
- James Webb Sr. and Elizabeth Douglas are not given ordinary biographies.
- Gideon Webb, Edith Bates and the proposed English line remain research-only,
  but may appear in the explicit opt-in Research Frontier using canonical
  provisional/frontier treatment.

## Locked decisions preserved

- Religious material from the Marion/Jay family life story is excluded from
  Jay's narration.
- Authentic family photograph first, rights-cleared archival image second,
  observational charcoal third.
- New visual candidates are presented one at a time.
- No Fable audio is generated before narration approval; all five scripts now
  pass that gate, but review MP3 generation still requires the configured API
  credential and listening approval.
- No draft module is registered in the live `TOUR_MEDIA` runtime.

## Validation

- `node tests/webb-artifacts.mjs`
- `node tests/governance-regression.mjs`
- `node verify-package.mjs`
- `git diff --check`

## Rollback

The untouched production baseline is GitHub `main` v3.8.12 at `09044c8`.
