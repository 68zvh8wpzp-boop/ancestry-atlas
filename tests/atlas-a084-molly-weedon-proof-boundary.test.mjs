import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('../atlas-v3.9.62.html',import.meta.url),'utf8');
const rev=readFileSync(new URL('../rev-thomas-dunbar-mobile-biography.js',import.meta.url),'utf8');
const william=readFileSync(new URL('../william-dunbar-mobile-biography.js',import.meta.url),'utf8');

const node=(id)=>{
 const start=html.indexOf('"id":"'+id+'"');
 assert.ok(start>=0,'expected core node: '+id);
 const end=html.indexOf('}',start);
 assert.ok(end>start,'closing node bracket');
 return JSON.parse('{'+html.slice(start,end+1));
};

test('A084 Mary Molly Weedon remains working family lineage, without unproven direct-marriage assertion',()=>{
 const p=node('molly_weedon');
 assert.equal(p.id,'molly_weedon');
 assert.equal(p.name,'Mary “Molly” Weedon');
 assert.equal(p.confidence,'strong');
 assert.match(p.note,/Family genealogies identify/);
 assert.match(p.note,/original marriage or parent-identifying record has not been verified/);
 assert.match(p.note,/pension S30998 names his sister Elizabeth Webb but does not identify his wife/);
 assert.match(p.note,/sibling Nathaniel Weedon and proposed parents remain unproven/);
 assert.match(p.note,/1833 death also differ among later compilations/);
 assert.doesNotMatch(p.note,/^Wife of Revolutionary War Thomas Dunbar/);
});

test('A084 existing Thomas and William detailed biographies remain intact and cautious',()=>{
 const a=node('rev_thomas'),b=node('william_weedon');
 assert.equal(a.id,'rev_thomas');
 assert.equal(b.id,'william_weedon');
 assert.match(rev,/family chronology places his marriage to Mary Mable Weedon/);
 assert.match(william,/although a birth record naming both parents has not been found/);
 assert.doesNotMatch(html,/DATA\.edges\.push\(['"]molly_weedon/);
});
