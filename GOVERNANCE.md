# Ancestry Atlas governance

This file is the durable entry point for all research, biography, asset, and
runtime work. It converts the project's approved norms into release gates.

## Source of truth

- `atlas-v3.9.63.html` currently contains the canonical **base DATA graph**, supplemented by source-qualified in-page runtime additions/corrections. The assembled live graph is authoritative until a separately reviewed data extraction.
- `index.html` is only an app redirect, **not** a genealogy graph. Do not use it as a family-data source.
- `atlas-2d-pedigree-snapshot.js` is an independently maintained read-only 2D projection, **not** another authority. Its pre-existing exceptions are frozen in `ATLAS_GRAPH_SYNC_CONTRACT.json`, and `atlas-integrity-gate.mjs` fails on any additional unreviewed differences. Historical confidence disagreements in that contract remain research work, not approved assertions.
- Biography modules may reference canonical person IDs; they must not duplicate
  or override genealogy, parentage, dates, places, confidence, or research notes.
- `PACKAGE_ASSET_MANIFEST.json` is the package inventory and release state.
- Approved narration text is immutable after its matching audio is approved.
- The newest production contract supersedes stale release-state language only;
  it never silently changes genealogy or prior approvals.

## Cross-view integrity and release containment (23 November 2026)

**Never repair a relationship discrepancy with presentation-only code or by adjusting test counts.** Each person must have one stable ID. Genealogical edges mean **child (a) → parent (b)**; spouse/co-parent is a distinct concept and cannot be inferred from a shared child. Parent links, confidence, and evidence must be reviewed from original sources before either data representation changes.

**Current mechanical barriers**
1. `atlas-integrity-gate.mjs` parses the canonical base and 2D mirror, checks unique IDs, no missing endpoints, self-links, cycles, duplicate/over-two-parent assignments, valid evidence states and inconsistent parent confidence. Base people must match the 2D view's name, dates, place, branch, confidence and collateral role.
2. Only preexisting, explicitly recorded 2D-only people and links, one suppressed old link, and one confidence disagreement are tolerated. Exceptions have reasons and are **not proof endorsements**. New differences fail closed; stale exceptions also fail. Known incorrect spouse-as-parent links must remain absent.
3. Person pages and their family carousels use `card.dataset.atlasPersonId` rather than matching display names or guessed years. Any two people with similar names stay separate.
4. The 2D and People portrait registry must name an existing person, identify the depicted subject, provide attribution and valid crop coordinates. Local image files must exist and retain the exact approved Git blob SHA-1 (raw bytes remain unchanged). New remote-only portraits fail; the six existing remote image dependencies are explicitly quarantined until originals can be archived.
5. The gate verifies the four-door app, the full biography reader, installed-app entry, and the 2D family wiring. Automated tests inject deliberate bad parent links, person/status drift, wrong or missing portraits, and unregistered data to confirm that these defects actually fail.
6. `.github/workflows/atlas-integrity.yml` checks every PR and main-branch push; `.github/workflows/pages.yml` runs the gate before the custom Pages publish. A content-only person audit must update the source-qualified graph, mirror and exception contract together when a real relationship changes. UI-only work may not change evidence or photo originals.

**Important limits:** This is a deterministic source/consistency gate, **not** an independent historical proof determination or a visual iPhone/browser test. It does not establish that a family link is true just because two views agree. The unresolved cases are catalogued in `ATLAS_DRIFT_REVIEW_QUEUE.md`, and cannot be silently 'fixed' by lowering quality standards. Continuous deployment from a separate branch-based GitHub Pages workflow can bypass the custom release job; set the main branch to require the integrity check and prefer one audited Pages publication path in GitHub repository settings. Do not claim this is blocked at the platform level until that settings change is verified.

**Manual iPhone acceptance after any UI deployment:** Inspect Home (all four images and captions), Globe (sphere fully visible, branch/From/To and routes functioning), Tree (parents and sibling links), People search (same person ID and source), a biography with and without an attributed photograph, carousels (children and siblings swipe; recognized faces are properly framed), Home/Back/Forward return, and all original evidence links. Record a screenshot or defect for each failed case; never call source tests a visual acceptance result.

**Long-term architectural target:** extract the assembled canonical graph into one reviewed data module, then generate both 2D and People/Globe projections from it rather than hand-maintaining snapshots and runtime pushes. That migration is not authorized to overwrite active audit content by being a visual correction, and must pass source-by-source reconciliation first.

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
