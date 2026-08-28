# Webb branch production checkpoint — approved runtime integration

## Purpose

Build the first complete, reviewable artifact layer for the supported Webb trunk
while preserving the v3.8.12 experience architecture and refusing to promote
the unresolved parent couple above James Webb Jr.

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
  Webb Jr., Edward Milo Webb Sr. and James Webb Jr.
- Approved Fable recordings for all five Webb scripts, restored byte-for-byte
  from the reviewed workflow artifact and protected by checksum gates.
- A modular Webb runtime registration generated from the approved artifacts.
- James Webb Jr.'s redundant descendant scene is struck; the research-record
  montage remains held until actual obtained record images exist.
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
- No Fable audio is generated before narration approval; all five reviewed
  recordings are approved and registered in the runtime.
- Only approved assets are registered in `TOUR_MEDIA`; held or struck scenes
  remain absent.

## Validation

- `node tests/webb-artifacts.mjs`
- `node tests/governance-regression.mjs`
- `node verify-package.mjs`
- `git diff --check`

## Rollback

The untouched production baseline is GitHub `main` v3.8.12 at `09044c8`.
