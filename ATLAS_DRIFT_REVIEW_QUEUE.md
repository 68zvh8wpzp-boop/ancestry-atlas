# Atlas drift and proof review register

Updated 24 November 2026. **The structural 2D/main migration is complete.** This register distinguishes repaired software discrepancies from **unresolved genealogical facts** and maintenance debt. It is not a source of new historical conclusions.

| ID | Current disposition | Research / engineering boundary |
| --- | --- | --- |
| D-01 · Brenay Esther and Joan | **Cross-view identity gap closed.** Both have stable IDs in the canonical graph, read by Tree and person pages. | Person-level originals and documentary proof remain subject to the person audit; the old 2D snapshot was not evidence of proof. |
| D-02 · John/Jonas Aurin identity | **No separate 2D grade any more.** The current canonical record retains its existing strong record grade and explicit *unproven-alias* caveat. | Whether John recorded in the 1879 material is the later Jonas/John Aurin remains unresolved. Strong record grade does not resolve that identity bridge. |
| D-03 · Mette / Anne Seje | **Software mismatch closed.** Every active view now displays the same existing canonical grade; the former 2D-only provisional variation is an archived diagnostic. | Original-record audit still controls confidence in maternity. Cross-view agreement cannot establish parentage. |
| D-04 · Skipped Danish generation | **Invalid direct parent-child link removed from the active canonical graph.** A regression test forbids its return. | The separate marriage original does not, without more, prove a proposed later child. |
| D-05 · Remote historical portraits | **Open.** Six grandfathered source links remain external-only; the local-original checksum gate prevents additional unarchived remote assets. | Capture source bytes, rights/attribution and immutable hashes only when freely available and permitted. Never substitute a cameo for an original. |
| D-06 · Deployment and repository policy | **Partially open.** The custom Pages upload blocks on genealogy, portrait and source integrity. A native Pages build can also run independently. | Branch protection and the exact Pages publication source require administrator/settings audit; integration access cannot verify mandatory checks. |
| D-07 · Legacy relationship-writing overlays | **Brenay V9 shadow records removed.** Its Esther, Joan, Martha and Ammon photos/letters attach to canonical IDs, and it no longer inserts parent links or replaces the person-ID map. Two earlier historical writers remain byte-frozen and quarantined. | All future person/parent links go only into the canonical source and approved baseline. Retire the remaining two legacy insertions under separate source-qualified review. |
| D-08 · Documentary/story modules | **Partially consolidated.** The person page reads a shared read-only artifact index, keyed by stable person ID. | Approved biography/evidence overlays still contain original-gallery and narration content. Preserve transcripts and evidence grades until source-by-source migration. |

| D-09 · Legacy display identity overrides | **Contained in the live reader.** After biography modules load, `AtlasIdentityGuard` restores source-qualified IDs, names, years, places, branch and confidence; it freezes the people/parent graph and records old presentation variants without claiming them as proved. | Person-page audits must adjudicate alternate readings (including the John/Jonas and Davia records) from originals before changing canonical data. |
 
## Current authority and safe change procedure

1. Read latest main and the research no-repeat checkpoint. Use a branch for bounded data, source/media, biography, or UI work.
2. **Canonical genealogy:** edit atlas-canonical-family-data.js; preserve source citations and unresolved statuses. Deliberately revise data/atlas-approved-graph-baseline.json for a justified change. The old 2D snapshot is not live.
3. **Originals and captions:** update approved person-linked evidence with provenance. Preserve actual source images. AtlasArtifactIndex projects source metadata on demand without modifying evidence arrays.
4. **Legacy overlays:** no new UI script may push person or parent links. Editing a frozen structural writer needs explicit source review and a new recorded source SHA, or removal of obsolete writes.
5. Run atlas-graph-integrity-gate.mjs, atlas-integrity-gate.mjs, atlas-legacy-overlay-gate.mjs, the artifact/overlay tests, original-source gate, and UI/person audit suites. Publish only through green checks.
6. Historical claims require original-source review; CI consistency cannot certify historical truth. Visually inspect iPhone changes separately.

**Archived fixtures:** atlas-2d-pedigree-snapshot.js and ATLAS_GRAPH_SYNC_CONTRACT.json preserve old negative regressions. They are not alternate genealogy sources and must not be loaded into an active view.

**Outstanding administrator action:** in GitHub Settings require passing Atlas integrity checks and pull-request review for main, prevent bypass/direct pushes, and confirm a single Pages publishing method. Current integration permission does not expose those settings, so this protection has not been verified.
