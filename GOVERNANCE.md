# Ancestry Atlas governance

This file is the durable entry point for all research, biography, asset, and
runtime work. It converts the project's approved norms into release gates.

## Source of truth — canonical data model (23 November 2026)

- `atlas-canonical-family-data.js` is the **only active public person-and-relationship data authority**. Its `window.AtlasCanonicalGraph.read()` API returns a separate copy of the same evidence-rich graph to each view. Do not author alternate person records, parentage, confidence grades, or names in Tree, People, Globe, Stories, portrait modules, or family carousels.
- `atlas-v3.9.63.html` is the comprehensive person/biography presentation, **not** the genealogy source. `index.html` redirects to that presentation. `atlas-2d-journey-preview.html` uses the SAME canonical source; `atlas-2d-pedigree-snapshot.js` and `ATLAS_GRAPH_SYNC_CONTRACT.json` are archived drift-era diagnostic fixtures, not live data feeds.
- Stable person IDs are the only identity key, even for near-identical names and spelling variants. The historical 2D-only `brenay_esther` and `brenay_joan` nodes/links are preserved in the canonical graph with provenance marking their legacy projection origin; no stronger proof has been inferred.
- Family edges mean **child `a` → recorded parent `b`**. A spouse or co-parent is not a biological parent. Distinct unions and hypothetical `researchLinks` may not be used to infer parentage, citizenship, or established descent.
- `data/atlas-approved-graph-baseline.json` is the reviewed comparison of all person names/year spans/branches/confidence and parent/union identities. A source-qualified genealogy change MUST explicitly update the canonical graph **and** its reviewed baseline; a UI change MUST NOT alter either. CI fails on any unnoticed discrepancy.
- Approved biography/audio and original-document modules attach by person ID, without overwriting canonical identities or proof states. `PACKAGE_ASSET_MANIFEST.json` continues to track artifacts and releases. Approved narration text remains immutable after audio approval.

## Cross-view drift and release protection

**Mechanical barriers**

1. `atlas-graph-integrity-gate.mjs` validates the single canonical graph: unique and stable IDs, valid person status, self-links, dangling edges, cycles, duplicate/over-two-parent assignments, known negative parentage boundaries, vetted portrait IDs/crop bounds and every active view actually using the same dataset. It compares the person and relationship graph against the reviewed baseline. This is a **publication blocker**.
2. `atlas-integrity-gate.mjs` retains the previously established checks for original photographic file existence, family-identification provenance, exact Git blob SHA-1 checksums, and grandfathered remote-image dependencies. It now checks the same canonical graph rather than an active parallel mirror. Historical mirror-bridge negative tests remain available as **diagnostic fixtures only**.
3. The person reader and family carousel use `card.dataset.atlasPersonId`, never name-only identity guesses. If a UI or research process changes a parent link or canonical confidence outside the data authority, the integrity gate must reject that change.
4. `.github/workflows/atlas-integrity.yml` tests pull requests and main-branch pushes. `.github/workflows/pages.yml` runs the source and integrity checks **before uploading** the public Pages artifact. A failing check should leave the preceding public release intact. Separately configured platform Pages deployments must be audited in repository Settings; do not claim mandatory PR checks or direct-write protection unless those repository settings are verified.
5. A source-only person audit may add original evidence or qualified biography details, but may not silently merge identities, upgrade parentage, or overwrite other research work. Parallel agents must refresh the latest main graph, compare their changes, and reconcile concurrent person-audit commits before merging.

**Manual release acceptance** still tests iPhone Home, Globe positioning/from-to routes, Tree family continuity, People search, full person biography, sourced-photo carousels, placeholder treatment, return navigation, and opening original-document images. CI verifies structural consistency, **not historical truth or pixel-perfect iPhone behavior**; record defects rather than declaring full visual acceptance from tests.

**Architecture extension still open:** historical original-document galleries, story scenes and other media overlays are sometimes held in their own modules. Continue converting these to per-person artifact IDs/metadata rather than letting views independently author attributes. No external paid database or subscription is required for the current static, version-controlled architecture.

## Final source-layer tidy pass (24 November 2026)

- The live person-page evidence renderer obtains documentary/media items from AtlasArtifactIndex.forPerson(personId), not by making a separate copy of source records. atlas-artifact-index-20261124.js reads the currently reconciled evidence on demand, keyed by stable canonical person IDs. Evidence card identities are for navigation only; document/title/source statuses are never promoted or generated by that index.
- Shared originals referenced by multiple ancestors stay one historical file with distinct person-to-artifact references. The index returns copies of metadata and never changes approved transcripts or byte-for-byte originals. Source-only index leads cannot become a fake local scan by calling the read model.
- Three legacy layers still contain guarded node/edge insertions for older retired Atlas versions. They are quarantined in data/atlas-legacy-overlay-writers.json by exact approved Git blob SHA. atlas-legacy-overlay-gate.mjs inventories active direct/nested scripts and refuses new genealogy writers or altered quarantined source bytes until explicitly reviewed. This contains historical compatibility debt; it does **not** authorize creating relationships in UI code.
- The old ATLAS_GRAPH_SYNC_CONTRACT.json and atlas-2d-pedigree-snapshot.js are annotated diagnostic fixtures only; do not reapply their outdated confidence differences to the active graph. Use ATLAS_DRIFT_REVIEW_QUEUE.md for outstanding **research proof**, remote portrait preservation and administrator-level release settings.
- atlas-integrity.yml (pull requests) and pages.yml (release build) must run the artifact and legacy overlay tests in addition to canonical graph and original-image checksum tests. Failure of the custom Pages build must prevent publishing. The independent Pages path and mandatory branch restrictions require administrator verification.

## Evidence norm set

Only these public evidence states are allowed:

| State | Meaning | Presentation |
| --- | --- | --- |
| `confirmed` | Direct primary evidence, or an equivalently resolved proof chain, establishes the claim. | Crisp and bright; solid relationship. |
| `strong` | Multiple consistent sources support the claim, but a decisive record or conflict resolution is still missing. | Slightly softened; solid relationship. |
| `provisional` | A credible working hypothesis needing material proof. | Dim/dusk; dashed relationship. |
| `frontier` | A research lead or unresolved identity boundary, not established ancestry. | Shadow; dashed relationship. |

No code, narration, caption, or visual may promote a state. Promotion requires a
written evidence decision in the branch research register, with sources and
conflict analysis.

### Optional research frontiers

- A supported guided tour ends at its last supported person. It may then offer
  an explicit, optional `Explore Research Frontier` continuation.
- The continuation is not another ordinary ancestor tour. Candidate people use
  their canonical provisional or frontier states, dashed relationships, and
  plain language such as “candidate,” “reported,” or “unresolved.”
- A frontier may explain a complete theory—including a proposed overseas
  extension—provided it also shows the broken proof link, material conflicts,
  evidence for and against, and the records needed next.
- No candidate receives an ordinary ancestor biography or is counted as an
  established generation until the evidence register formally promotes it.
- Exiting a frontier returns to the supported endpoint and never silently moves
  the user's tour into a hypothetical lineage.


## Mandatory research de-duplication gate (12 October 2026)

This is a **pre-investigation stop gate**, not a retrospective reminder. It applies to ordinary ChatGPT chats, active ChatGPT Work sessions, person-page audits and archive searches. **No recommendation to retrieve an original as a new lead is permitted before the following comparison is completed.**

1. **Canonical person and event:** Identify actual person ID(s), name variants, event/date/place, and original-source ID (DGS/ARK/film/image, archive volume/page or equivalent). Distinguish near-name relatives.
2. **Read later checkpoints FIRST:** Search the latest per-person research logs, FamilySearch original-source inventories, original-image Library assets, GitHub issue comments, deployed Atlas person modules/document gallery, and release notes. Sort by verification date; a stale open checkbox or earlier “not inspected” never overrules a later full examination and release. Reading only the work queue is insufficient.
3. **Proof-of-novelty statement before proceeding:** Classify target as **DONE—original inspected and saved/published**, **PARTIAL—named missing field/page/context**, **UNEXAMINED—specific source found but no original read**, or **BLOCKED—access/cost**. Give exact prior evidence location and what *new* claim the action could prove. If DONE and no new issue, **STOP; do not fetch, recommend or queue anew**. If novelty cannot be established, **HOLD for reconciliation** rather than calling it a lead.
4. **One-action ownership across chats:** Assign an active workstream and scope. Ordinary-chat and Work-session tasks use the same issue and record ledger but **GitHub updates do not automatically synchronize live Work sessions**; at handoff the active owner must explicitly refresh latest entries and acknowledge scope before overlapping. Distinguish issue tracking from control of Work execution.
5. **Save after meaningful action, not just at the end:** Store precise original URL and locator, whole uncropped authoritative image (if permitted), adjacent context/handwriting, transcription and translation, what changed, unresolved conflicts, and whether the page was merely indexed/read/saved/packaged/published/iPhone-verified. Link artifact and date in ledger. Mark superseded requests **CLOSED—DUPLICATE** while preserving history.
6. **High-value gate:** Prioritize an unresolved direct ancestor/parentage or citizenship-proof gap. If an original has already been studied in depth or a path was exhaustively manually searched, require a specific new question, better image, or new archival series. Otherwise park it; do not spend time on circular searches.

**Known governance failure/negative test:** The 12 Oct 2026 proposal to obtain Charles Godfrey Brenay's 1921 naturalization must FAIL the pre-investigation gate. The declaration (11 Apr 1917), petition (2 Jun 1919 no.307) and oath/admission (13 Jun 1921, certificate 1382499) were opened, transcribed and packaged in the 7 Oct `research-resume-2026-10-07.md` and published Godfrey Atlas documents/story. The later open index entry did NOT constitute a new lead. The 1851 Niagara Mary Ann Dennis original census page had already been manually inspected and the broader marriage path extensively searched; repeating inaccessible viewer URLs without a new source is another stop case.

**Completion language is constrained:** “found in an index,” “opened original,” “archived scan,” “published to Atlas,” and “iPhone-validated” are separate assertions. Never say “complete person audit” or “new source” merely from checklist status. No email access without a new explicit user request; no paid records or FamilySearch tree changes without authorization.

## Automated research source gate (implemented 12 October 2026)

The committed `RESEARCH_SOURCE_REGISTRY.json` is a **partial, curated ledger**; it is not yet an exhaustive inventory of all 101 people. `research-source-gate.mjs` validates the ledger and proposed tasks; `tests/research-source-gate.mjs` supplies negative regression cases. CI runs the gate on registry/code changes and the **GitHub Pages deployment workflow now invokes it before publishing**. No original-record research task should be proposed until the record and its source keys have been entered/checked.

**Update protocol:** Search existing records by FamilySearch person ID plus archival source key and review latest original-inspection status. Add one normalized record with evidence path and the correct strongest supported status. Add a task only when the missing work is specific; assign a unique `owner` (`work`, `chat` or `hold`) and a substantial `novelty` explanation. For an already examined document, targeted re-examination requires a distinct action and a cited reason, not `inspect-original` again. Keep one active or queued task per record across both sessions. Following capture, update record status and retire the original acquisition task in the same commit or next immediate commit. Re-run `node research-source-gate.mjs && node tests/research-source-gate.mjs`.

**Required task-intake command, for both ChatGPT Work and regular chat:**
- Before starting any original-source task, identify a normalized record ID or source key from the registry and run:
  `node research-task-intake.mjs --record marian-skinner-1903-birth --owner work --action inspect-original`
- `CONTINUE_EXISTING` means continue the specifically assigned registered task, after reading the most recent handoff and originals inventory. A `BLOCK` forbids the duplicate/overlapping action; a `HOLD` requires fresh reconciliation and a new validated queue entry before starting. A source not present in the partial register is `HOLD`, **never automatically new**.
- On completion, archive source evidence, update status/paths and **remove or pause any now-obsolete acquisition tasks** before committing. Both CI and Pages run the validator, negative regressions, and intake tests.
- This guards commands and commits, but cannot technically interrupt independent ongoing ChatGPT Work or control off-repository browsing. A running Work agent must adopt these steps explicitly; any manual bypass is noncompliant.

**Fail-closed principle:** Records not yet registered must not be called “new” solely for lacking a registry match: consult older audit logs, Library images and deployed Atlas sources before registering. The automated gate enforces only **registered** tasks and source keys; it cannot intercept free-form research suggestions in an independent chat, and running ChatGPT Work must refresh the repository manually. The registry must be progressively backfilled from proven historical originals. Treat passing tests as validation of entries, not an assertion that the entire family tree is fully audited.

## Branch production gates

Every branch passes these gates in order:

1. **Scope freeze** — identify the proven trunk, active proof frontier, candidate
   identities, exclusions, and highest-value next records.
2. **Evidence register** — record each material claim, source, source type,
   status, conflicts, and next proof action.
3. **Graph sync** — change the canonical graph once; verify unique IDs, valid
   relationships, allowed statuses, and no orphan branch nodes.
4. **Biography draft** — braid person/family, local setting, and wider context;
   explain supported movement drivers and preserve unresolved ones.
5. **Visual register** — family photo first, rights-cleared archival material
   second, approved observational charcoal third. Record provenance and rights.
6. **One-at-a-time approval** — show the actual candidate; do not revisit an
   approved asset without a stated reason.
7. **Audio lock** — Fable, locked direction, one modular MP3 per biography.
   Approved audio becomes authoritative for transcript and timing.
8. **Experience regression** — preserve the established atlas, story, phone,
   desktop, television, keyboard, reduced-motion, and return-context behavior.
9. **Package verification** — run `node verify-package.mjs` and
   `node tests/governance-regression.mjs`; release only with zero failures.

## Experience invariants

- Preserve the “Our Family Story” feel and four tracks: Canada, Webb, Dunbar,
  and Denmark.
- Exploration and television presentation remain distinct surfaces.
- Rotation is lateral, pivots around the visible screen center/current point of
  interest, and never snaps back to `Me` after panning.
- Users can surf upward through every mapped branch. Closing a card preserves
  selection; biography and TV exits restore person and camera context.
- The phone opens on a calm local family neighborhood. Whole Atlas is explicit.
- Evidence is experiential: light, line treatment, labels, notes, document holds,
  and proof-frontier language must agree.
- Stories are slideshow-first with named transport controls and unobscured
  photographs. Flag and archival locator live in the dedicated Place surface;
  exact transcript mode, recorded audio paused with sound on, and no browser TTS
  remain locked.
- Media types are semantic release gates: Family Photos contains family images,
  Documents contains record scans, and Places contains maps, flags, landscapes
  and contextual scenes. A contextual photograph is never a document.
- Story and Tree are separate phone modes. Tree must retain one-tap access to
  Story, Center Person, Branch Names, Wider Tree and Home; branch focus always
  preserves a concise descendant route as well as ancestors.
- Missing media remains readable, quiet, and human-facing; never expose filenames
  or synthesize substitutes.

## Change hygiene

- Begin from the latest accepted checkpoint and preserve an untouched rollback.
- Never edit an older ZIP and call it current.
- Make one concern per version: research/data, biography/assets, audio/timing, or
  experience corrective. Cross-cutting work must say why it is inseparable.
- Record changed facts, changed files, unchanged locked decisions, validation,
  known gaps, and rollback source in release notes.
- Rejected candidates stay outside production packages.
- Do not rename compatibility assets or runtime files casually.
- Do not introduce network dependence for packaged biography assets.
- Do not infer an ancestor's presence in a contextual image.
- Do not use “as you can see” or other wording that makes audio incomplete alone.

## Canonical repository and rollback

- Canonical repository: `68zvh8wpzp-boop/ancestry-atlas`, branch `main`.
- Governance kickoff rollback commit: `e16294496a282f5dcf4105c835b3378c29e4cef7`.
- ZIP files are exports or rollback artifacts only. They never become the source
  of truth after GitHub contains a newer accepted commit.

## Webb branch boundary at kickoff

The working trunk currently runs James Sheldon Webb → James Wilford “Jay” Webb
→ Jonathan Henry Webb → Edward Milo Webb Jr. → Edward Milo Webb Sr. → James Webb
Jr. The James Webb Jr. link to James Webb + Elizabeth Douglas is the active
strong proof frontier. Elizabeth Douglas has conflicting/conflated identities.
Gideon Webb / Edith Bates and the proposed older New England and English chain
remain provisional or frontier and must not be narrated as established descent.
