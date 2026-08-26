# Ancestry Atlas v3.8.11 — Story first-frame reliability

- Starts the opening family photograph request at high priority when a branch is selected, so the 12.8-second approach also serves as useful preload time.
- Retains decoded scene images in a session cache instead of issuing a second request when the story surface opens.
- Waits for the first scene to load and decode before revealing the story shell, eliminating the cold-load black frame seen on Marion and intermittently on Sheldon.
- Keeps the current photograph visible until a later scene is decoded, and ignores stale completions after rapid navigation.
- Provides an explicit restrained loading treatment if a connection remains unusually slow.
- Adds regression coverage for preload timing, decode gating, retained requests, and stale scene protection.
