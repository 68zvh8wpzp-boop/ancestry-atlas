# Atlas architecture and release runbook
Updated 24 November 2026

## Current architecture

```
atlas-canonical-family-data.js        ← only genealogical authority
  ├─ people: immutable stable IDs, source-qualified names, years, branch, place, grade
  ├─ edges: child → recorded parent (not marriage)
  ├─ unions: separately sourced relationships
  └─ researchLinks: hypotheses/context only
              ↓ individual read() copies
atlas-v3.9.63.html ──────────────── atlas-2d-journey-preview.html
  ├─ approved biography modules          └─ Tree + family portrait carousels
  ├─ photo/source overlays                        ↓
  └─ atlas-runtime-records-20261124.js     canonical parents/siblings/children
         ├─ restores canonical identity fields after old modules
         ├─ rejects unexpected nodes, parents, confidence changes
         ├─ repairs stale ID-map references
         └─ builds source-aware evidenceFor(personId), bySource(sourceId)
              ↓
         People search / Globe / Stories / person galleries
```

The site remains static on GitHub Pages. It needs **no paid database**, and no contact with external services to retrieve basic lineage. The record store is currently a **read-only projection** over the canonical person graph and approved older source modules; it is not yet a fully migrated standalone evidence repository.

## Rules for research commits

- Work from the latest `main` and the current Ancestry Atlas person-audit checkpoint. Never overwrite concurrent research or repeat a completed archival tranche.
- **Person, relationship or status:** edit `atlas-canonical-family-data.js` and the reviewed `data/atlas-approved-graph-baseline.json` in the same source-qualified change. A changed preferred name or date is a genealogical change, not an icon or page layout change.
- **Documents/photos:** keep actual preserved original master bytes plus provenance and transcription. Attach by person ID. Add a thumbnail/crop only as an alternate view, and don't mistake an external index link or a resized preview for the original.
- **Narrative/story:** update biography/story content by ID without altering canonical parent links. A co-parent is not automatically a spouse. Unknown relatives remain unknown, not asserted absent.
- **Promotion:** confirmed/strong/provisional/frontier is an evidence assessment; don't change it to make a picture or journey look cleaner.
- **Never restore** the old `atlas-2d-pedigree-snapshot.js` to a live page. It and `ATLAS_GRAPH_SYNC_CONTRACT.json` are historical drift fixtures, not another live dataset.

## Automated release gates

On pull requests and `main`:
- `node atlas-graph-integrity-gate.mjs`: canonical identities, parentage, protected negative links, approved graph baseline, all active scripts avoiding new genealogical nodes/edges.
- `node atlas-integrity-gate.mjs`: identified-source portrait provenance, original local image bytes and Git blob hashes, authorized remote-image exceptions.
- `node --test tests/atlas-runtime-records.test.mjs`: real legacy Brenay overlays cannot create shadow people; late display writes cannot change canonical fields; evidence entries have stable person/source keys.
- Full Tree, People, Globe, portrait, source and governance regression tests in the workflows.
- The custom `.github/workflows/pages.yml` must pass these before uploading/publishing the site. Do not remove tests to force deployment.

If a gate fails, determine whether the conflict is a new **record correction** requiring original-source review or merely an old test asserting a retired URL. Never rewrite genealogical data to satisfy an outdated test.

## Repository-owner settings still necessary

The GitHub integration cannot currently read `main` branch protection (403); no repository rulesets were reported. Therefore direct-push blocking or required status checks **have not been verified as enforced by GitHub**.

A repository administrator should configure:

1. **Settings → Rules → Rulesets** (or Branch protection rules): target `main`, require a pull request before merging, and require passing checks. Select the check named `verify-atlas-identity-and-evidence` from **Atlas cross-view integrity**. Require the branch to be current before merge when available.
2. Disable bypasses for routine changes and restrict force pushes/deletions. Preserve an emergency documented rollback path.
3. **Settings → Pages → Build and deployment:** choose **GitHub Actions** as the source to avoid a second Pages-branch publisher. Keep one reviewed workflow for `main`. Confirm the `Deploy Atlas to GitHub Pages` workflow publishes and its preupload checks succeed.
4. Check the Pages URL after deployment on an iPhone: Home photos, 2D Tree, People search, Globe size and journeys, a person with photos and one without, sibling/child carousels, source-original opening and Home/Back/Forward controls.
5. Record actual settings and a successful manual iPhone screenshot in the release log. This file is instructions, **not evidence** those settings were changed.

## Remaining deliberate research work

See `ATLAS_DRIFT_REVIEW_QUEUE.md` for the unresolved John/Jonas Aurin identity, disputed Mette parentage, legacy display variants, six remote-only portraits, and evidence-gallery normalization. These are not authorization to change confidence or fill unknown relationships.

No genealogy fields, proof grades, biographies, original-source files or crop geometry should change as a by-product of an architecture-only release.
