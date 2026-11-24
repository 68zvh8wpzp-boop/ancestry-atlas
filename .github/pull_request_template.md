## Atlas release scope

- [ ] Research/data change — evidence, parentage, or confidence decisions listed below
- [ ] Biography/source/media change — preserved originals and attribution verified
- [ ] UI-only change — no graph, relationships, original images, or proof states modified

### Records changed (IDs / exact links / source references)
Write “none” for UI-only changes. Do not infer spouse or co-parent from a shared child.

### Graph and source synchronization
- [ ] Latest `main` and current person-audit checkpoint reviewed
- [ ] Both People/Globe runtime and 2D mirror considered, and any intentional difference updated in `ATLAS_GRAPH_SYNC_CONTRACT.json`
- [ ] No recorded source or photograph overwritten; proof confidence and provisional frontiers preserved
- [ ] Local original portraits retain SHA; no new remote-only portrait

### Release verification
- [ ] `node atlas-integrity-gate.mjs`
- [ ] `node --test tests/atlas-integrity-gate.test.mjs` and relevant research/navigation tests
- [ ] Home, Globe, Tree, People, biography and return-context smoke checks
- [ ] iPhone visual screenshots checked (or clearly recorded as NOT VERIFIED)
- [ ] Rollback commit noted; no concurrent person-audit content overwritten

### Remaining exceptions or follow-up
Link `ATLAS_DRIFT_REVIEW_QUEUE.md` entry(s). Passing tests is not genealogical proof or a substitute for device QA.
