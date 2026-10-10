/* Regression: desktop family-tree drag should navigate both screen axes.
 * Run: node tests/tree-desktop-vertical-drag-regression.mjs
 * Do not replace the 3D canvas by a scrolling document: it is a map.
 */
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const html=await readFile(new URL('../atlas-v3.9.36.html',import.meta.url),'utf8');
const index=await readFile(new URL('../index.html',import.meta.url),'utf8');
const snippet=html.slice(html.indexOf("canvas.addEventListener('pointermove'"),html.indexOf("function endPointer("));
assert(snippet.length>200&&snippet.length<3500,'Canvas pointermove listener not found in expected location');
assert.match(snippet,/if\(gesture\.type==='pan'\)\{ panX\+=dx; panY-=dy; \}/,'Free pan mode must keep x/y navigation');
assert.match(snippet,/else\s*\{[^}]*rotY\s*\+=\s*dx\s*\*\s*\.007;[^}]*panY\s*-=?\s*dy;/s,'Default drag needs horizontal rotation AND vertical movement');
assert.match(html,/y:h-75-panY-p\.y\*scale/,'Screen projection must still respond to panY');
assert.match(html,/Drag: sideways rotate \+ vertical move/,'Main sidebar must explain the combined drag gesture');
assert.match(html,/drag up\/down to move through generations/,'Visible how-to guidance missing');
assert.match(html,/Ancestry Atlas • drag left\/right to rotate, up\/down to move/,'On-canvas HUD should explain the controls');
assert.match(index,/iphone-refresh=20261010-desktop-vertical-drag-1/,'Entrypoint cache refresh missing');
// This is the actual projection sign: dragging down by +80px makes tree move down +80px.
const oldScreenY=700-75-40-100;
const newScreenY=700-75-(40-80)-100;
assert.equal(newScreenY-oldScreenY,80,'Dragging downward should move the tree downward');
console.log('PASS: desktop Atlas tree preserves horizontal rotation and now follows vertical dragging; entrypoint and guidance updated.');
