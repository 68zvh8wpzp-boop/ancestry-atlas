// A036 parentage regression: execute from repository root with node --test tests/atlas_parentage_a036.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const raw=readFileSync(new URL('../atlas-v3.9.62.html',import.meta.url),'utf8');
const marker='const DATA = ';
const i=raw.indexOf(marker)+marker.length;
assert.ok(i>marker.length,'Atlas dataset missing');
const d=JSON.parse(raw.slice(i,raw.indexOf(';\n',i)));
const ids=new Set(d.nodes.map(n=>n.id));
const p=new Set(d.edges.map(e=>e.a+'>'+e.b));
const u=new Set(d.unions.map(e=>[e.a,e.b].sort().join('|')));
test('all parent endpoints exist, unique, acyclic',()=>{
assert.equal(ids.size,d.nodes.length);
assert.equal(p.size,d.edges.length);
for(const e of d.edges){assert.ok(ids.has(e.a)&&ids.has(e.b));assert.notEqual(e.a,e.b);}
const parents=new Map();
for(const e of d.edges){if(!parents.has(e.a))parents.set(e.a,[]);parents.get(e.a).push(e.b);}
const done=new Set();
function visit(id,trail=new Set()){assert.ok(!trail.has(id),'cyclic parentage '+id);if(done.has(id))return;trail.add(id);for(const q of parents.get(id)||[])visit(q,trail);trail.delete(id);done.add(id);}
for(const id of ids)visit(id);
});
test('Ann Eliza has parents, no accidental parent-spouse edges',()=>{
assert.ok(p.has('ann_eliza_webb>chauncey_webb'));
assert.ok(p.has('ann_eliza_webb>eliza_jane_churchill'));
for(const edge of ['chauncey_webb>ann_eliza_webb','chauncey_webb>eliza_jane_churchill','ann_eliza_webb>brigham_young'])assert.ok(!p.has(edge),edge);
assert.ok(u.has(['ann_eliza_webb','brigham_young'].sort().join('|')));
assert.ok(u.has(['chauncey_webb','eliza_jane_churchill'].sort().join('|')));
});
test('Peder 1806 has parents from 1804 couple, not his grandmother',()=>{
assert.ok(!p.has('peder_mortensen_1806>mette_jorg'));
for(const edge of ['peder_mortensen_1806>morten_pedersen_1771','peder_mortensen_1806>karen_hansdatter_1766','morten_pedersen_1771>mette_jorg','morten_pedersen_1771>peder_mortensen_1784'])assert.ok(p.has(edge),edge);
assert.equal(d.nodes.find(n=>n.id==='peder_mortensen_1784').years,'?–1784');
assert.ok(u.has(['peder_mortensen_1784','mette_jorg'].sort().join('|')));
});

test('mobile and focused family views include historical unions without creating parentage',()=>{
  function extract(name){
    const token='function '+name+'(';
    const start=raw.indexOf(token);
    assert.ok(start>=0,'missing function '+name);
    const open=raw.indexOf('{',start);
    let depth=0, end=-1;
    for(let j=open;j<raw.length;j++){
      if(raw[j]==='{')depth++;
      else if(raw[j]==='}' && --depth===0){end=j+1;break;}
    }
    assert.ok(end>open,'unclosed '+name);
    return raw.slice(start,end);
  }
  const parentMap=new Map(),childMap=new Map();
  for(const e of d.edges){
    if(!parentMap.has(e.a))parentMap.set(e.a,[]);
    parentMap.get(e.a).push(e.b);
    if(!childMap.has(e.b))childMap.set(e.b,[]);
    childMap.get(e.b).push(e.a);
  }
  const ctx={DATA:d,parentMap,childMap,nodeById:new Map(d.nodes.map(n=>[n.id,n])),unique:a=>[...new Set(a)]};
  for(const name of ['coParentIds','unionPartnerIds','buildMobileTreeNeighborhood','buildLineageBranch','buildNavigationNeighborhood'])
    runInNewContext(extract(name),ctx);
  for(const [person,partner] of [
    ['ann_eliza_webb','brigham_young'],
    ['brigham_young','ann_eliza_webb'],
    ['chauncey_webb','eliza_jane_churchill'],
    ['peder_mortensen_1784','mette_jorg'],
    ['mette_jorg','peder_mortensen_1784']
  ]){
    assert.ok(ctx.buildMobileTreeNeighborhood(person).has(partner),'mobile lost spouse '+person+' → '+partner);
    assert.ok(ctx.buildLineageBranch(person).has(partner),'branch lost spouse '+person+' → '+partner);
    assert.ok(ctx.buildNavigationNeighborhood(person,'family').has(partner),'focus lost spouse '+person+' → '+partner);
  }
  // Synthetic high-sibling-count fixture, never written into genealogical data:
  // a capped iPhone family must retain an existing historical spouse.
  const originalChildren=ctx.childMap.get('chauncey_webb');
  try{
    ctx.childMap.set('chauncey_webb',[
      'ann_eliza_webb','james_wilford','jamar_webb','elsie_mortensen','della_ray'
    ]);
    assert.ok(ctx.buildMobileTreeNeighborhood('chauncey_webb',5).has('eliza_jane_churchill'),
      'spouse omitted under five-node iPhone family cap');
  } finally {
    ctx.childMap.set('chauncey_webb',originalChildren||[]);
  }
  assert.ok(!p.has('ann_eliza_webb>brigham_young'),'union must not become parent');
  assert.ok(!p.has('chauncey_webb>eliza_jane_churchill'),'union must not become parent');
});
