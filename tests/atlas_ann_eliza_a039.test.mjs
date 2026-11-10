import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('../atlas-v3.9.62.html',import.meta.url),'utf8');
const mark='const DATA = ';
const start=html.indexOf(mark);
assert.ok(start>=0,'DATA block missing');
const a=start+mark.length;
const d=JSON.parse(html.slice(a,html.indexOf(';\n',a)));
const people=new Map(d.nodes.map(n=>[n.id,n]));
const edges=new Set(d.edges.map(e=>e.a+'>'+e.b));
const ann=people.get('ann_eliza_webb');

test('Chauncey and direct-line Edward Milo Sr are placed in the same parent generation',()=>{
  assert.equal(people.size,d.nodes.length);
  for(const id of ['chauncey_webb','edward_milo_sr']){
    assert.ok(edges.has(id+'>james_webb_jr'),id+' missing documented father');
    assert.ok(edges.has(id+'>hannah_griswold'),id+' missing documented mother');
  }
  assert.ok(!edges.has('chauncey_webb>james_webb_sr'),'old generation conflation');
  assert.ok(edges.has('james_webb_jr>james_webb_sr'),'deeper James Webb proof frontier preserved');
  assert.equal(d.edges.find(e=>e.a==='chauncey_webb'&&e.b==='james_webb_jr').confidence,'strong');
});
test('Ann Eliza has her birth parents, and the historical marriage is never parentage',()=>{
  for(const id of ['chauncey_webb','eliza_jane_churchill'])
    assert.ok(edges.has('ann_eliza_webb>'+id),'birth parent '+id);
  assert.ok(!edges.has('ann_eliza_webb>brigham_young'));
  assert.ok(d.unions.some(u=>u.a==='ann_eliza_webb'&&u.b==='brigham_young'));
  assert.ok(!edges.has('chauncey_webb>ann_eliza_webb'));
});
test('1875 memoir and 1876 engraved print are differentiated from photos',()=>{
  assert.ok(ann.evidence.some(e=>/original 1875 book/.test(e.title)&&e.sourcePage.includes('books.google.com')));
  const engraving=ann.evidence.find(e=>/frontispiece/.test(e.title));
  assert.ok(engraving);
  assert.equal(engraving.kind,'document');
  assert.match(engraving.summary,/not a photograph/i);
  assert.equal(ann.historicalNotes.length,4);
  assert.ok(ann.historicalNotes.some(n=>/kinship source check/i.test(n.title)));
});
test('court history is accurately qualified in runtime biography, not flattened into 1875 final divorce',()=>{
  assert.match(people.get('brigham_young').note,/1877/);
  assert.doesNotMatch(people.get('brigham_young').note,/divorce was finalized in 1875/);
  assert.match(html,/an April 1877 ruling rejected the union/);
});
