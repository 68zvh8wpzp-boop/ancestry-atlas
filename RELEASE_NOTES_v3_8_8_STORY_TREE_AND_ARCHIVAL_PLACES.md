# Ancestry Atlas v3.8.8 — Story / Tree modes and archival Places

## Outcome

This corrective release adopts the approved Option 1 interaction model. Story
and Tree are now distinct modes with controls named for the task at hand.

## Changed

- Extended the deep-space branch approach from 6.4 to 12.8 seconds, reduced its
  initial brightness, and made the final tree camera the animation's sole camera
  so the distant light cannot jump to a separately positioned tree.
- Replaced symbol-only Story transport with named Previous, Play/Pause,
  Narration On/Off, Next and Exit Story controls.
- Removed map and flag overlays from family photographs. `Place` now opens a
  dedicated, dismissible historical location surface.
- Replaced the fabricated beige Arizona outline with the American Automobile
  Association's 1919 Arizona–New Mexico road map held by the Library of Congress.
  The Arizona state flag is correctly labeled as adopted in 1917.
- Reworked phone Tree controls as Story, Center Person, Branch Names, Wider Tree,
  Home and More. Previous Person remains available in More.
- Split media into Family Photos, Documents and Places. Contextual landscapes
  and archival scenes no longer appear as documents.
- Added the real 1901 Canadian census image for Charles A. Brunne, with a focused
  thumbnail and Library and Archives Canada provenance.

## Preserved

- Canonical genealogy, confidence states and the Webb proof frontier.
- Approved Fable narration, transcripts, scene order and family photographs.
- Biography-centered phone return, concise descendant routes, reversible branch
  labels and wider-tree navigation.

## Validation

- JavaScript syntax checks.
- Package asset verification.
- Governance and experience-contract regression suites.
- Browser interaction and responsive visual checks before publication.

## Rollback

The accepted v3.8.7 deployment remains available at Git commit
`1be6076977f141332e4c1a02caca85a7a0e92e53`.
