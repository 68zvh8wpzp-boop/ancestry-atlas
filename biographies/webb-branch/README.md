# Webb branch production module

This directory begins the Webb branch as a research-first module. It contains no
new narration, approved audio, or visual assets yet.

`research-register.json` freezes the inherited evidence state and research order.
Populate `sourceRefs` with normalized source records before drafting biographies.
Add future deliverables in person-specific subdirectories only after their gate:

```text
biographies/webb-branch/
  research-register.json
  sources.json
  people/<person-id>/
    biography-manifest.json
    narration-approved.txt
    scene-manifest.json
    rights-manifest.json
    assets/
```

Person IDs must match the canonical atlas graph. Assets must not be added until
they are approved and recorded in a rights manifest.

