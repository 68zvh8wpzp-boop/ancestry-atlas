import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../atlas-v3.9.62.html',import.meta.url),'utf8');
const overlay=readFileSync(new URL('../john-peter-mobile-biography.js',import.meta.url),'utf8');
const findNode=(id)=>{
  const at=html.indexOf('"id":"'+id+'"');
  assert.ok(at>=0,'core node present: '+id);
  const end=html.indexOf('}',at);
  assert.ok(end>at,'node delimiter');
  return JSON.parse('{'+html.slice(at,end+1));
};
test('A083 public core and illustrated biography both qualify John Peter birthplace',()=>{
  const p=findNode('john_peter');
  assert.equal(p.years,'c. 1840s–1910');
  assert.match(p.place,/Birthplace disputed/);
  assert.match(p.note,/1901 Canadian census lists a birth date of 2 May 1842/);
  assert.match(p.note,/1870 and 1880 records give Quebec/);
  assert.match(p.note,/1879 and 1886 birth returns Vermont/);
  assert.match(p.note,/1910 records Canada/);
  assert.match(p.note,/Louise remain unproven/);
  assert.doesNotMatch(p.note,/Born 2 May 1842 in Quebec/);
  assert.match(overlay,/His exact birth date and birthplace remain uncertain/);
});
test('A083 relationship confidence and source modules unchanged',()=>{
  const p=findNode('john_peter');
  assert.equal(p.confidence,'strong');
  assert.equal(p.branch,'Gooley / Canada');
  assert.equal(p.id,'john_peter');
  assert.match(overlay,/Daisy’s birth — John’s birthplace recorded as Vermont/);
  assert.match(overlay,/Peter’s death certificate — 6 June 1910/);
});
