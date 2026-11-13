import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=readFileSync(new URL('../atlas-sheldon-presentation-2026-09-30.js',import.meta.url),'utf8');
test('A070 Sheldon actual wedding and religious sealing dates remain distinct',()=>{
 assert.match(src,/married in Lakeside, Arizona, on 21 January 1965/);
 assert.match(src,/separate religious sealing in Mesa on 12 June/);
 assert.doesNotMatch(src,/married in the mid-1960s/);
});
test('A070 sons are ordered by original memoir birth chronology',()=>{
 assert.match(src,/Their sons were born in order: Shared in 1967, Sterling in 1973, and Jeremy in 1977/);
 assert.doesNotMatch(src,/sons, Shared, Jeremy, and Sterling/);
});
test('A070 author biography kept separate from narration and app graph',()=>{
 assert.doesNotMatch(src,/TOUR_MEDIA\s*=|\.edges\.push/);
 assert.match(src,/const cleanBiography/);
});
