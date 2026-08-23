ANCESTRY ATLAS v3.0.0 — CONSOLIDATED RELEASE

This release removes the legacy guided-story patch layer rather than adding another patch.

Upload all files from this ZIP to the repository root and KEEP:
  James_sheldon_webb.mp3

Included direct/context family photos:
  james_sheldon_with_siblings_c1951.png  — direct Sheldon family photo, source p.18
  webb_first_house_vernon_1945.png        — family setting, source p.17
  webb_first_car_second_home_c1942.png    — immediate pre-birth family context, source p.15

Structural changes:
- Removed obsolete v1.9.x inline tour CSS that was still forcing the giant photo overlay.
- Photo stage now lives inside the single canonical story modal.
- atlas-tour.css is the sole owner of tour/story layout.
- Cached mobile images can no longer remain stuck at opacity 0.
- Failed photos collapse instead of leaving an empty blob.
- Controls stay pinned to the top safe area.
- Transcript stays locked to Alfie and follows paragraph-by-paragraph.
- No synthetic/browser voice fallback.
- Mobile tree remains a focused ~10-person neighborhood by default.
