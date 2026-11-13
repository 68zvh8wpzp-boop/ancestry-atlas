import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('../atlas-v3.9.62.html',import.meta.url),'utf8');
const rev=readFileSync(new URL('../rev-thomas-dunbar-mobile-biography.js',import.meta.url),'utf8');
function core(id) {
  const at=html.indexOf('"id":"'+id+'"');
  assert.ok(at>=0,'core node exists: '+id);
  const end=html.indexOf('}',at);
  assert.ok(end>at,'node closes');
  return JSON.parse('{'+html.slice(at,end+1));
}
test('A085 Elizabeth Webb sourced identity does not overstate birth surname or death century',()=>{
  const p=core('elizabeth_webb');
  assert.equal(p.name,'Elizabeth Webb');
  assert.equal(p.years,'Living in 1832');
  assert.equal(p.place,'Madison County, Kentucky (1832)');
  assert.equal(p.branch,'Dunbar');
  assert.match(p.note,/1 October 1832/);
  assert.match(p.note,/29 August 1832/);
  assert.match(p.note,/original affidavit images have not been inspected/i);
  assert.match(p.note,/birth surname.*unproven/);
  assert.match(p.note,/Connecticut Webb family/);
  assert.match(p.note,/M804, roll 862/);
});
test('A085 the documented sister research link and Thomas biography are preserved',()=>{
  const p=core('elizabeth_webb');
  assert.equal(p.id,'elizabeth_webb');
  assert.equal(p.confidence,'confirmed');
  assert.match(html,/"a":"rev_thomas","b":"elizabeth_webb","label":"documented sister","confidence":"confirmed"/);
  assert.match(rev,/his sister Elizabeth Webb is directly identified in his pension account/i);
});
