# Webb branch production module

This directory holds the Webb branch as a research-first production module.
The evidence register is normalized to the v3.8.12 baseline and draft artifacts
now exist for the five supported-trunk biographies. No new narration, visual or
audio is approved merely because a draft file exists.

`research-register.json` freezes the inherited evidence state and research order.
`sources.json` records the present source base and its limitations.
`branch-production-manifest.json` controls the approval and integration gates.
Person-specific directories contain narration and scene drafts:

```text
biographies/webb-branch/
  research-register.json
  sources.json
  branch-production-manifest.json
  people/<person-id>/
    biography-manifest.json
    narration-draft.txt
    scene-manifest.json
    rights-manifest.json
    assets/
```

Person IDs must match the canonical atlas graph. New assets must not be added to
the runtime until they are approved one at a time and recorded in a rights
manifest. Draft modules remain outside `TOUR_MEDIA`, and no Fable recording is
generated until its narration is approved.
