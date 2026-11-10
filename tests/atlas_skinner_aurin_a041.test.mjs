import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const src=readFileSync(new URL('../atlas-v3.9.62.html',import.meta.url),'utf8');
const tag='const DATA = ';
const i=src.indexOf(tag);
assert.ok(i>=0);
const a=i+tag.length;
const d=JSON.parse(src.slice(a,src.indexOf(';\n',a)));
const nodes=new Map(d.nodes.map(n=>[n.id,n]));
const edges=new Map(d.edges.map(e=>[e.a+'>'+e.b,e]));

test('Original-backed Richard and Jessie fallback life dates are internally consistent',()=>{
 const r=nodes.get('richard_francis_skinner');
 const j=nodes.get('jessie_irene_aurin');
 assert.equal(r.years,'1862–1933');
 assert.match(r.note,/11 Nov 1862/);
 assert.match(r.note,/17 Nov 1933/);
 assert.equal(j.years,'1879–1956');
 assert.match(j.note,/25 Oct 1879/);
 assert.match(j.note,/5 Mar 1956/);
 assert.match(j.note,/1897/); // conflicting gravestone is not suppressed
 assert.match(j.note,/NOT established/);
 assert.doesNotMatch(j.hold.label,/Inspect 1880 census image/i);
});
test('Marian Skinner birth proof not falsely supplied by pre-birth 1900 household',()=>{
 const m=nodes.get('marian_skinner');
 assert.match(m.hold.label,/1903/);
 assert.match(m.note,/1900 Skinner census predates Marian/);
 for(const p of ['richard_francis_skinner','jessie_irene_aurin']){
   assert.equal(edges.get('marian_skinner>'+p)?.confidence,'provisional');
 }
});
test('Family evidence chain / frontier corrections from stacked review retained',()=>{
 for(const id of ['chauncey_webb','edward_milo_sr']){
  assert.ok(edges.has(id+'>james_webb_jr'));
 }
 for(const p of ['james_webb_sr','elizabeth_douglas'])
  assert.equal(edges.get('james_webb_jr>'+p)?.confidence,'provisional');
 assert.equal(d.researchLinks.length,8);
 assert.equal(d.unions.length,4);
 assert.equal(d.edges.length,111);
 const valid=new Set(d.nodes.map(x=>x.id));
 for(const e of [...d.edges,...d.researchLinks,...d.unions]){
   assert.ok(valid.has(e.a)&&valid.has(e.b),e.a+' '+e.b);
 }
});
