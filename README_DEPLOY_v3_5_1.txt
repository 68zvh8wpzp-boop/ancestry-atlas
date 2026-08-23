ANCESTRY ATLAS v3.5.1 - COMPLETE FLAT PRODUCTION PACKAGE

Input / rollback package:
  Ancestry_Atlas_v3_5_0_FLAT_GitHub_Package.zip

Deployment:
  Replace the repository contents with this ZIP's contents at the same GitHub Pages root.
  Keep filenames and capitalization unchanged.
  Replace index.html so the v3.5.1 cache-busting references are served.

Changes:
  Ordinary iPhone Story and TV Story now share measured viewport geometry.
  Phone century markers are hidden.
  TV startup remains free of the large proof and legend overlays.

Approved narration:
  James_sheldon_webb.mp3
  Voice: Azure Alfie

Before deployment run:
  node verify-package.mjs
  node tests/tv-static-regression.mjs
