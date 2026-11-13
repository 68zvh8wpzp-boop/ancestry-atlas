import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../atlas-v3.9.62.html',import.meta.url),'utf8');
const get = id => {
 const i=html.indexOf('"id":"'+id+'"');
 assert.ok(i >= 0, 'core node exists: '+id);
 const e=html.indexOf('}',i);
 return JSON.parse('{'+html.slice(i,e+1));
};
test('A086 secondary Peder Sandersen publication scoped to named farms and unverified original',()=>{
 const p=get('peder_sandersen');
 assert.equal(p.name,'Peder Sandersen');
 assert.equal(p.confidence,'strong');
 assert.match(p.note,/Egmont og Møn/);
 assert.match(p.note,/Damme matrikel 33/);
 assert.match(p.note,/Hårbølle matrikel 21/);
 assert.match(p.note,/after 1839/);
 assert.match(p.note,/9 June 1846, still requiring original death-register confirmation/);
 assert.match(p.note,/pages have not been inspected/);
});
test('A086 original baptism and proposed parent caution for Ane Kirstine',()=>{
 const p=get('ane_kirstine');
 assert.equal(p.name,'Ane Kirstine Jørgensdatter');
 assert.equal(p.confidence,'strong');
 assert.match(p.note,/formentlig/);
 assert.match(p.note,/Jørgen Larsen and Maren Andersdatter/);
 assert.match(p.note,/do not treat her parental identities as established/);
 assert.match(p.note,/original/);
 assert.equal(get('helena_sandersen').id,'helena_sandersen');
});
