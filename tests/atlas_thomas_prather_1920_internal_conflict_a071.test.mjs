import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../thomas-prather-1885-clay-household-candidate-a056.js',import.meta.url),'utf8');
test('A071 recognizes 1920 same-book contradiction rather than independent corroboration',()=>{
 assert.match(source,/An internal discrepancy in this very same 1920 volume/);
 assert.match(source,/native to Clay County, Missouri/);
 assert.match(source,/both natives of Kentucky/);
 assert.match(source,/one 1920 volume, not two independent sources/);
 assert.match(source,/birthplace_status:'CONFLICTED — do not promote'/);
});
test('A071 neither asserts Thomas parentage nor alters graph or audio',()=>{
 assert.match(source,/ThomasEstilParentage:'UNPROVEN/);
 assert.match(source,/imagesObtained:0/);
 assert.doesNotMatch(source,/DATA\.edges\.push|TOUR_MEDIA\./);
});
