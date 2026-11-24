import assert from "node:assert/strict";
import {test} from "node:test";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {parseMainBase,parse2DMirror,parsePortraits,validateIntegrity,validateRepository} from "../atlas-integrity-gate.mjs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
function fixture(){
  // Historical drift fixtures are derived from the *archived* mirror and its
  // reviewed exception ledger. Neither copy is loaded by the live Atlas.
  const mirror=parse2DMirror(read("atlas-2d-pedigree-snapshot.js"));
  const contract=JSON.parse(read("ATLAS_GRAPH_SYNC_CONTRACT.json"));
  const excluded=new Set(contract.snapshotOnlyPeople.map(n=>n.id));
  const excludedEdges=new Set(contract.snapshotOnlyEdges.map(e=>e.a+"|"+e.b));
  const base={
    nodes:mirror.nodes.filter(n=>!excluded.has(n.id)).map(n=>({...n})),
    edges:mirror.edges.filter(e=>!excludedEdges.has(e.a+"|"+e.b)).map(e=>({...e}))
  };
  base.edges.push(...contract.baseEdgesExplicitlySuppressed.map(e=>({a:e.a,b:e.b,confidence:e.confidence})));
  for(const exception of contract.commonEdgeConfidenceExceptions){
    const edge=base.edges.find(e=>e.a===exception.a&&e.b===exception.b);
    if(edge)edge.confidence=exception.base;
  }
  return {
    base,mirror,contract,
    portraits:parsePortraits(read("atlas-2d-portrait-index-20261123.js")),
    assetExists:()=>true
  };
}
function errors(modify){
  const f=fixture();modify(f);return validateIntegrity(f).errors.join("\n");
}
test("one active canonical graph and original portraits pass fail-closed gate",()=>{
  const r=validateRepository();
  assert.deepEqual(r.errors,[],r.errors.join("\n"));
  assert.ok(r.counts.basePeople>100);
  assert.ok(r.counts.familyPeople>=r.counts.basePeople);
  assert.ok(r.counts.identifiedPortraits>=20);
  assert.equal(r.counts.basePeople,121);
  assert.equal(r.counts.familyPeople,121);
  assert.ok(!r.warnings.some(x=>x.includes("PENDING CROSS-VIEW PERSON RECONCILIATION")));
});
test("a person silently removed, renamed or given a new status in a different view fails",()=>{
  assert.match(errors(f=>{f.mirror.nodes[0].name+=" UNKNOWN";}),/Person field drift/);
  assert.match(errors(f=>{f.mirror.nodes=f.mirror.nodes.filter(n=>n.id!=="marion_brenay");}),/Base person not present/);
  assert.match(errors(f=>{f.mirror.nodes.find(n=>n.id==="john_peter").confidence="confirmed";}),/Person field drift/);
});
test("new unreviewed parentage, orphan records and cycles fail",()=>{
  assert.match(errors(f=>{f.mirror.edges.push({a:"you",b:"davia_dunbar",confidence:"strong"});}),/Unregistered 2D-only parentage/);
  assert.match(errors(f=>{f.mirror.edges.push({a:"not_in_atlas",b:"marion_brenay",confidence:"strong"});}),/edge with missing person/);
  assert.match(errors(f=>{f.mirror.edges.push({a:"you",b:"you",confidence:"strong"});}),/self-parent link/);
});
test("a formerly rejected spouse-as-parent link is never silently reintroduced",()=>{
  assert.match(errors(f=>{f.mirror.edges.push({a:"chauncey_webb",b:"ann_eliza_webb",confidence:"strong"});}),/Previously rejected parentage reintroduced/);
});
test("previously documented exceptional differences cannot silently be promoted or disappear",()=>{
  assert.match(errors(f=>{f.mirror.edges.find(e=>e.a==="mette_jorg"&&e.b==="anne_seje").confidence="strong";}),/Unregistered evidence-confidence drift/);
  assert.match(errors(f=>{f.mirror.edges.find(e=>e.a==="jessie_irene_aurin"&&e.b==="john_auene_1879").confidence="strong";}),/2D-only edge confidence drift/);
  assert.match(errors(f=>{f.contract.snapshotOnlyPeople=f.contract.snapshotOnlyPeople.filter(e=>e.id!=="brenay_esther");}),/Unregistered 2D-only person/);
});
test("new unexplained portrait or broken source path never ships",()=>{
  assert.match(errors(f=>{f.portraits.james_sheldon.crop=[.94,.8,.20,.24];}),/Invalid portrait crop bounds/);
  assert.match(errors(f=>{f.portraits.james_sheldon.url="assets/not-there.jpg";f.assetExists=()=>false;}),/Missing local original portrait/);
  assert.match(errors(f=>{f.portraits.james_sheldon.identityEvidence="";}),/Unidentified crop subject/);
  assert.match(errors(f=>{f.portraits.unknown_person={url:"https://example.org/photo.jpg",title:"Unrelated",provenance:"Unknown"};}),/Portrait registry references unknown Atlas person/);
});
test("stable identity is person ID, never a potentially repeated display name",()=>{
  const main=read("atlas-v3.9.63.html"),family=read("atlas-family-portrait-ui-20261123.js");
  assert.match(main,/card\.dataset\.atlasPersonId=id/);
  assert.match(family,/var activeId=card\.dataset\.atlasPersonId/);
  assert.match(family,/n\.id===activeId/);
  assert.ok(!family.includes("n.name===name"));
});
test("2D snapshot metadata no longer carries stale hand-entered person and link counts",()=>{
 const snap=parse2DMirror(read("atlas-2d-pedigree-snapshot.js"));
 assert.match(snap.snapshot_status,/computed by atlas-integrity-gate/);
 assert.ok(!/\d+ runtime relatives/.test(snap.snapshot_status));
});
