ANCESTRY ATLAS v3.5.0 - COMPLETE FLAT PRODUCTION PACKAGE

Input / rollback package:
  Ancestry_Atlas_v3_4_1_FLAT_GitHub_Package.zip

Deployment:
  Replace the repository contents with this ZIP's contents at the same GitHub Pages root.
  Keep filenames and capitalization unchanged.
  The v3.5.0 cache-busting references require replacing index.html as well as the CSS and JavaScript files.

Clean iPhone/iPad television presentation:
  1. In Safari, open the deployed Atlas.
  2. Choose Share → Add to Home Screen.
  3. Launch Ancestry Atlas from the new Home Screen icon.
  4. Rotate to landscape.
  5. Start Screen Mirroring from Control Center.
  6. In the Atlas choose Guided Audio-Visual Family Tour, the family line, and Present on television.

Ordinary Safari can still run TV Mode, but Safari's own browser and tab bars are controlled by iOS and will be mirrored.

Approved narration:
  James_sheldon_webb.mp3
  Voice: Azure Alfie

Before deployment run:
  node verify-package.mjs
  node tests/tv-static-regression.mjs
