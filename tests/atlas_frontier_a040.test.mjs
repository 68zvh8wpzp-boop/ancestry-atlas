import {readFileSync} from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const html=readFileSync(new URL('../atlas-v3.9.62.html',import.meta.url),'utf8');
const marker='const DATA = ';
const start=html.indexOf(marker);
assert.ok(start>=0,'Atlas source lacks DATA');
const i=start+marker.length;
const DATA=JSON.parse(html.slice(i,html.indexOf(';\n',i)));
const nodes=new Map(DATA.nodes.map(n=>[n.id,n]));
const edges=new Map(DATA.edges.map(e=>[e.a+'>'+e.b,e]));
const research=new Map(DATA.researchLinks.map(e=>[e.a+'>'+e.b,e]));

test('James Webb Jr identity is preserved but disputed parents are provisional',()=>{
  assert.equal(nodes.get('james_webb_jr').confidence,'strong');
  assert.equal(nodes.get('james_webb_sr').confidence,'provisional');
  for(const parent of ['james_webb_sr','elizabeth_douglas']){
    assert.equal(edges.get('james_webb_jr>'+parent)?.confidence,'provisional');
  }
  assert.match(nodes.get('james_webb_sr').note,/NOT demonstrated/i);
  assert.match(nodes.get('elizabeth_douglas').note,/1773/);
});
test('Research horizon concepts are links, not biological parents',()=>{
  const invalid=[
    ['peter_gooley','gooley_frontier'],
    ['rev_thomas','dunbar_frontier'],
    ['niels_seye','seye_frontier'],
    ['richard_webb_1580','webb_england_frontier'],
    ['gooley_frontier','goulet_hypothesis'],
    ['goulet_hypothesis','goulet_france_frontier'],
  ];
  for(const [a,b] of invalid){
    assert.ok(!edges.has(a+'>'+b),a+' concept wrongly parented to '+b);
    assert.equal(research.get(a+'>'+b)?.confidence,'frontier',a+' missing nonparent research link');
  }
});
test('Corrected Webb sibling, Ann Eliza and Danish parent edges are retained',()=>{
  for(const id of ['chauncey_webb','edward_milo_sr']){
    assert.ok(edges.has(id+'>james_webb_jr'));
    assert.ok(edges.has(id+'>hannah_griswold'));
  }
  for(const id of ['chauncey_webb','eliza_jane_churchill'])
    assert.ok(edges.has('ann_eliza_webb>'+id));
  assert.ok(!edges.has('ann_eliza_webb>brigham_young'));
  assert.ok(DATA.unions.some(u=>u.a==='ann_eliza_webb'&&u.b==='brigham_young'));
  assert.ok(edges.has('peder_mortensen_1806>morten_pedersen_1771'));
  assert.ok(edges.has('peder_mortensen_1806>karen_hansdatter_1766'));
});
test('Graph references are valid and directed parents do not form a loop',()=>{
  assert.equal(nodes.size,DATA.nodes.length);
  assert.equal(edges.size,DATA.edges.length);
  for(const e of [...DATA.edges,...DATA.researchLinks,...DATA.unions]){
    assert.ok(nodes.has(e.a),e.a);
    assert.ok(nodes.has(e.b),e.b);
    assert.notEqual(e.a,e.b);
  }
  const state=new Map();
  const neighbors=id=>DATA.edges.filter(e=>e.a===id).map(e=>e.b);
  const visit=id=>{
    const prior=state.get(id);
    assert.notEqual(prior,'visiting',id+' parent cycle');
    if(prior==='done')return;
    state.set(id,'visiting');
    for(const to of neighbors(id))visit(to);
    state.set(id,'done');
  };
  for(const id of nodes.keys())visit(id);
});
