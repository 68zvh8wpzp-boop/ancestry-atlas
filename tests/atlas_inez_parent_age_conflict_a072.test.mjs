import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=readFileSync(new URL('../inez-mobile-memoir.js',import.meta.url),'utf8');
test('A072 parent ages are qualified rather than repeating conflicting memoir ages',()=>{
 assert.match(src,/Grace was in her thirties and Thomas in his late sixties/);
 assert.doesNotMatch(src,/Grace was thirty-six and Thomas sixty-eight/);
});
test('A072 existing first-person naming and wedding correction preserved',()=>{
 assert.match(src,/Tootie chose her given name, Inez Karen/);
 assert.match(src,/Her mother Grace gave her the nickname “Snookie”/);
 assert.match(src,/married in Lakeside on 21 January 1965/);
});
