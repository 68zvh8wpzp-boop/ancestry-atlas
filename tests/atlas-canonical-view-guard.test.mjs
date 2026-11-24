import assert from "node:assert/strict";
import {test} from "node:test";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const canonical=read("atlas-canonical-family-data.js");
const legacyV9=read("atlas-evidence-sync-2026-10-03-fulltext-v9.js");
const guard=read("atlas-canonical-view-guard-20261124.js");
const artifacts=read("atlas-artifact-index-20261124.js");
function setup(){
  const context={
    window:{},document:{readyState:"loading",addEventListener(){}},
    parentMap:new Map(),childMap:new Map(),GUIDE_PROFILES:{},HISTORICAL_CONTEXT:{}
  };
  vm.createContext(context);
  vm.runInContext(canonical,context,{timeout:8000});
  vm.runInContext("var DATA=window.AtlasCanonicalGraph.read();window.__ATLAS_DATA=DATA;window.__ATLAS_NODE_BY_ID=new Map(DATA.nodes.map(n=>[n.id,n]));",context);
  return context;
}
test("Brenay source overlay attaches pictures to canonical people, not a second person or parent graph",()=>{
  const c=setup(),edges=Array.from(c.DATA.edges,e=>e.a+"|"+e.b);
  vm.runInContext(legacyV9,c,{timeout:8000});
  assert.equal(c.DATA.nodes.length,c.window.AtlasCanonicalGraph.stats.persons);
  assert.equal(c.DATA.edges.length,c.window.AtlasCanonicalGraph.stats.parents);
  assert.deepEqual(Array.from(c.DATA.edges,e=>e.a+"|"+e.b),edges);
  for(const [id,minEvidence] of [["brenay_esther",4],["brenay_joan",1],["brenay_martha",4],["brenay_ammon",5]]){
    const live=c.DATA.nodes.find(n=>n.id===id);
    assert.strictEqual(c.window.__ATLAS_NODE_BY_ID.get(id),live,"stable person reference for "+id);
    assert.ok(live.evidence?.length>=minEvidence,"retained archival memories for "+id);
    assert.ok(live.legacyPresentationNote);
  }
  assert.doesNotMatch(legacyV9,/DATA\.(?:nodes|edges)\.(?:push|splice)\s*\(/);
});
test("one runtime boundary retains approved biography evidence but restores canonical identity and proof grades",()=>{
  const c=setup();vm.runInContext(legacyV9,c,{timeout:8000});
  vm.runInContext(guard,c,{timeout:8000});
  vm.runInContext(artifacts,c,{timeout:8000});
  const service=c.window.AtlasIdentityGuard,original=c.window.AtlasCanonicalGraph.read();
  assert.deepEqual(Array.from(service.audit()),[]);
  assert.equal(service.summary().people,original.nodes.length);
  assert.equal(service.summary().parentLinks,original.edges.length);
  const marie=c.DATA.nodes.find(p=>p.id==="marie_elisabeth_tellier_mother_unresolved");
  assert.equal(marie.confidence,original.nodes.find(p=>p.id===marie.id).confidence);
  assert.ok(service.diagnostics().some(x=>x.personId===marie.id&&x.field==="confidence"));
  assert.ok(marie.evidence?.length);
  const old=marie.name;marie.name="Invented alias";marie.id="wrong-person";marie.confidence="confirmed";
  assert.equal(marie.name,old);
  assert.equal(marie.id,"marie_elisabeth_tellier_mother_unresolved");
  assert.equal(marie.confidence,original.nodes.find(p=>p.id===marie.id).confidence);
  assert.strictEqual(c.window.__ATLAS_NODE_BY_ID.get(marie.id),marie);
  assert.deepEqual(Array.from(service.audit()),[]);
  assert.ok(Object.isFrozen(c.DATA.nodes)&&Object.isFrozen(c.DATA.edges));
  const cards=c.window.AtlasArtifactIndex.forPerson("brenay_esther");
  assert.ok(cards.length>=4);
  assert.ok(cards.every(p=>p.personId==="brenay_esther"&&p.artifactId.startsWith("brenay_esther::")));
});
test("unexpected presentation-created persons or parents fail closed",()=>{
  const a=setup();a.DATA.nodes.push({id:"invented",name:"Invented",confidence:"strong"});
  assert.throws(()=>vm.runInContext(guard,a),/Presentation added or removed a canonical person/);
  const b=setup();b.DATA.edges.push({a:"you",b:"brenay_joan",confidence:"strong"});
  assert.throws(()=>vm.runInContext(guard,b),/Presentation changed canonical parentage/);
});
test("guard loads after older source modules and before every active People/Globe view",()=>{
  const html=read("atlas-v3.9.63.html"),i=html.indexOf("atlas-canonical-view-guard-20261124.js");
  assert.ok(i>html.indexOf("atlas-evidence-sync-2026-10-03-fulltext-v9.js"));
  assert.ok(i<html.indexOf("atlas-person-search.js"));
  assert.ok(i<html.indexOf("atlas-artifact-index-20261124.js"));
  assert.match(html,/atlas-canonical-view-guard-20261124\.js\?v=20261124-identity-guard-v2/);
  assert.match(guard,/protectedFields=\["id","name","years","place","branch","confidence","collateral"\]/);
});
