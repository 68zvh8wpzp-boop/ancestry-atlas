# Ancestry Atlas v3.8.12 — First-frame handoff correction

- Marks a preloaded scene ready as soon as the browser's image load completes; decode remains a non-blocking optimization.
- Uses the exact desired scene URL to reject stale image completions instead of a render counter that could leave the frame permanently busy.
- Retains the high-priority approach-time preload, cancellation guard, atomic scene swap, and explicit slow-connection treatment introduced in v3.8.11.
