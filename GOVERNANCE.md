# Ancestry Atlas governance

This file is the durable entry point for all research, biography, asset, and
runtime work. It converts the project's approved norms into release gates.

## Source of truth

- `index.html` is the canonical genealogy graph until the data layer is
  extracted in a separately approved migration.
- Biography modules may reference canonical person IDs; they must not duplicate
  or override genealogy, parentage, dates, places, confidence, or research notes.
- `PACKAGE_ASSET_MANIFEST.json` is the package inventory and release state.
- Approved narration text is immutable after its matching audio is approved.
- The newest production contract supersedes stale release-state language only;
  it never silently changes genealogy or prior approvals.

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
