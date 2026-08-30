# Ancestry Atlas v3.8.16 family-source and collaborative-scale contract

This contract supplements `PRODUCTION_CONTRACT_v3_8_13.md`. It locks the
production lessons from the complete re-audit of *Jay and Marion Life Story*
and defines which parts of the workflow must become reusable in an eventual
collaborative application.

## Complete-source-first ingestion

1. Before searching for archival substitutes or generating any reconstruction,
   inventory the complete family-provided source: every page, photograph,
   printed caption, date, named person and relevant narrative passage.
2. Preserve the untouched source and an untouched crop as archival masters.
   A tour derivative is a separate file with its own hash and restoration note.
3. Authentic family photographs take priority over rights-cleared archival
   context. Archival context takes priority over reconstruction.
4. Do not conclude that a source lacks an image until the full source inventory
   is complete and searchable.

## Photograph allocation

1. Allocate each active family photograph to one primary biography and one
   narrative beat. Do not silently reuse it in another biography.
2. Detect duplicates by file hash as well as path or filename; renamed copies
   count as duplicates.
3. A photograph may be reassigned only through an explicit allocation change.
   Update the narration, scene manifest, rights manifest, runtime reference and
   automated contract in the same change.
4. The same photograph should not appear twice within one slideshow unless the
   repetition performs distinct, approved narrative work.
5. A source caption controls named identities and dates. Page placement may
   support cautious context, but it does not create an exact caption or date.

## Restoration and cropping

1. Keep every pixel inside the actual printed photograph boundaries unless the
   user explicitly approves a tighter composition.
2. Remove surrounding page margin, headings and captions from the visual asset;
   preserve their information in metadata and on-screen text.
3. Allowed deterministic corrections include descreening, dust and isolated
   speck removal, tonal correction and restrained sharpening.
4. Do not use generative reconstruction to invent facial, clothing, object or
   background detail. If a generated restoration changes identity-bearing
   detail, reject it rather than presenting it as a candidate.
5. Present one actual candidate at a time and ask `Approve or revise?`.
6. Runtime story photographs use centered `object-fit: contain` in every branch,
   slide position and phone orientation. `cover`, forced scaling or clipping that
   removes part of the approved image is prohibited.
7. Letterboxing created by the photograph's aspect ratio is acceptable. White
   page margin inside an asset must be removed during source preparation, not by
   cropping the displayed photograph in CSS.

## Narration and caption hygiene

1. Spoken narration tells the life story. It does not discuss photo scarcity,
   candidate selection, production limitations or what the Atlas decided.
2. A narration sentence that names or describes an image must correspond to the
   image displayed during that sentence.
3. On-screen captions identify the people, place, date and evidence boundary
   needed by the viewer. Restoration methods and rights details belong in the
   source/provenance field unless necessary to prevent a misleading claim.
4. Family-source statements are written as facts when supported by the source.
   Uncertain identity, date or place is stated narrowly and routed for review.
5. Viewer-facing narration and captions never include approval history, crop or
   zoom percentages, generation history, commercial-clearance instructions,
   candidate status or statements about what the project or Atlas selected.
6. Evidence boundaries remain viewer-facing when historically necessary:
   representative settings, unidentified people, approximate corridors and
   unresolved dates or places must still be stated plainly.
7. Production and rights details remain in source, approval and rights manifests
   and are enforced through release gates rather than photograph captions.

## Collaborative application workflow

The eventual application should turn the current expert-led sequence into a
shared queue with these machine-readable states:

`ingested` → `inventoried` → `allocated` → `restored` → `caption-reviewed`
→ `approved` → `runtime-integrated` → `audio-synchronized` → `released`.

Each photograph record should contain:

- immutable source file and page locator;
- derivative file, restoration recipe and hashes;
- depicted or possibly depicted people, with confidence and reviewer;
- printed caption, inferred context and exact-date status kept separate;
- primary biography and narrative beat;
- rights scope and commercial-use state;
- reviewer comments, approval decision and version history.

The family collaborator should be able to approve, revise, identify a person,
correct a date, suggest a better image or reassign an image without editing
code. The system should then regenerate affected manifests and place narration
or audio into a stale state automatically.

## Automation priorities

Build or preserve automated checks for:

1. missing source-page inventory;
2. duplicate active family-photo hashes across biographies;
3. runtime assets absent from rights or package manifests;
4. stale working-folder paths in production manifests;
5. narration/image mismatches after allocation changes;
6. audio whose transcript hash no longer matches approved narration;
7. unresolved commercial-rights holds in a commercial package.

## Periodic scale review

At each completed biography or major source ingestion, record:

- time spent on extraction, restoration, research, approval and integration;
- steps suitable for batch automation;
- decisions requiring family knowledge or editorial judgment;
- bottlenecks that would prevent commercially viable throughput.

This review is required production work. It does not interrupt one-at-a-time
visual approval, but it must inform the next workflow and product iteration.

## Mobile tree continuity

1. `Local Tree` may deliberately show a concise family neighborhood.
2. `Wider Tree` and story exit must derive visibility from the selected
   person's lineage, not from the list of narrated biographies.
3. Selecting another person while in branch mode must preserve branch mode and
   recalculate the complete lineage; it must not silently collapse to the
   local-tree node budget.
4. `Whole Tree` must clear mobile and tour visibility filters and fit all
   currently enabled nodes to the phone viewport. It must not apply a fixed
   person-centered zoom after clearing the filters.
5. Every visible node in branch and whole-tree modes receives a person-name
   label. Confidence styling may change its prominence but not remove the name.
6. Automated regression checks must cover story exit, branch expansion,
   person selection within a branch and whole-tree fitting.

## Family media and document viewer

1. Family Photos and Documents may list only assets packaged with the release.
   A remote portrait URL or missing local scan may remain in research metadata,
   but it must not produce a gallery card.
2. Every gallery card is a semantic button with the whole card as its touch
   target. A tap must open the corresponding image in the full-screen viewer.
3. On phones, the album and image viewer must not remain as two simultaneously
   interactive overlays. The album is hidden while the viewer is active and is
   restored when the viewer closes.
4. The viewer tries the full-resolution asset first and may fall back once to a
   distinct packaged thumbnail. A failed asset must show an explicit unavailable
   state rather than a browser question-mark image.
5. Release validation must verify that every gallery-visible thumbnail and
   full-resolution reference exists locally.
