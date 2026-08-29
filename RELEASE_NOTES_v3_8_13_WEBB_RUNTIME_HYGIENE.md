# Ancestry Atlas v3.8.13 — Webb runtime hygiene

## Purpose

Formalize the already deployed Webb runtime integration, eliminate stale release
state, and convert the branch's successful patterns into reusable production
and regression gates.

## Changed

- Versioned the deployed Webb integration as v3.8.13.
- Synchronized the package, Webb branch and Fable approval manifests with the
  twelve live approved biographies.
- Added all five Webb MP3s and the Webb runtime module to the package inventory.
- Recorded public, noncommercial family Atlas display authorization separately
  from the unresolved commercial-use hold on the 1891 Sarah Webb photograph.
- Locked reusable proof-boundary, record-image, map-label, flag-verification,
  approval, narration and rights-scope patterns.
- Expanded package verification to load all production biography modules and
  reject stale post-integration states.

## Unchanged

- No genealogy, confidence grade, narration, approved audio byte, scene asset or
  user-approved visual composition changed.
- James Webb Jr. remains the supported Webb endpoint.
- James Webb Sr., Elizabeth Douglas and the proposed English line remain outside
  the ordinary supported biography sequence.
- Commercial use of the 1891 Sarah Webb photograph remains blocked pending
  clearance or replacement.

## Validation

- `node --check biographies/webb-branch/webb-story-modules.js`
- `node --check story-overlays-3.8.1.js`
- `node tests/webb-artifacts.mjs`
- `node tests/governance-regression.mjs`
- `node tests/experience-contract-regression.mjs`
- `node verify-package.mjs`
- `git diff --check`

## Rollback

The untouched deployed predecessor is GitHub `main` at `c96c837`.
