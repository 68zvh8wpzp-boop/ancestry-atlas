# Atlas discrepancy register — frozen, not silently harmonized
Date: 2026-11-23. Ownership: source-qualified person audit for facts; Atlas navigation work for view consistency.

This list records observed differences. An entry is **not** a new genealogical assertion, proof approval, or authorization to change a relationship. Resolve each case from existing original images and the latest research checkpoint, without repeating completed archival searches.

| ID | Observed gap | Control now in place | Exit condition |
| --- | --- | --- | --- |
| D-01 | 2D family mirror includes `brenay_esther` and `brenay_joan`; neither stable ID appears in the current main HTML graph or embedded runtime additions. | Both are explicit frozen exceptions; introducing more without a recorded exception blocks release. | Audit verified person/parentage identifiers and visibility in People, Tree and biography without conflating collateral relatives. |
| D-02 | `john_auene_1879` is strong in main runtime additions but provisional in 2D, with a strong versus provisional Jessie-to-John relationship rendering. John/Jonas equivalence is not resolved by these labels. | Stable ID binding; documented confidence boundary; new status drift otherwise fails. | Source-specific review deciding precisely what identity and parentage the 1879 original establishes; update both views in the same reviewed content change. |
| D-03 | `mette_jorg → anne_seje` edge is confirmed in the base graph and provisional in 2D. | Exact edge-confidence discrepancy quarantined; any new unrecorded confidence mismatch blocks release. | Danish records audit determines justified confidence; update graph, mirror, and exception record together. |
| D-04 | `peder_mortensen_1806 → mette_jorg` persists in static base DATA but is deliberately filtered out by the live runtime and 2D mirror. | Exact suppressed link frozen; reintroduction to family view blocks release. | Source-qualified canonical graph refactor removes stale base edge, without reintroducing the unsupported maternity claim. |
| D-05 | Six named legacy portrait registry entries depend directly on external HTTP(S) hosts rather than a packaged original. | Existing six frozen as explicit exceptions. New remote-only portrait, missing local image, wrong crop geometry, or changed local image Git blob fails. | Where rights permit, preserve original bytes locally with attribution and SHA, then remove each external exception. |
| D-06 | Native GitHub Pages build/deployment and the custom Pages workflow both publish from main; a redundant artifact lookup has failed intermittently. | Added repository pull-request integrity workflow and predeployment checks in the custom Pages job. | Configure one release path and required green status check for main in GitHub Settings; verify platform configuration, not just a README statement. |

## Procedure for every person-page audit or UI patch

1. Read the current `main` HEAD and latest research handoff; use a branch, not an outdated ZIP or stale file copy.
2. Label the change **research/data**, **media/source**, **biography**, or **navigation-only**. A navigation-only patch must not revise people, parentage, evidence classification, or source images.
3. When data changes, update canonical runtime, the 2D family projection and `ATLAS_GRAPH_SYNC_CONTRACT.json` deliberately; never silence a failing assertion by copying a less-qualified claim.
4. Run `node atlas-integrity-gate.mjs` and `node --test tests/atlas-integrity-gate.test.mjs`, plus existing source-gate, portrait, navigation, family, and evidence tests.
5. Merge only after the check passes and the change description states exact data/evidence differences. Require a live iPhone screenshot check for visual work and record *not inspected* if unavailable.
6. Preserve original full scans and provenance. In-gallery crops are view-only, not replacement original images.

The long-term fix is to generate all views from the same canonical graph. The current gate is a containment and detection mechanism until that reviewed migration is safe.
