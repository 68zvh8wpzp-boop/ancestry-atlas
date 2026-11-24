import assert from "node:assert/strict";
import {test} from "node:test";
import {readFileSync} from "node:fs";
import vm from "node:vm";

const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const source=read("atlas-canonical-family-data.js");
const legacy=read("atlas-evidence-sync-2026-10-03-fulltext-v9.js");
const records=read("atlas-runtime-records-20261124.js");

function setup(){
 const context={
   window:{console:{warn(){}}},
   document:{readyState:"loading",addEventListener(){}},
   GUIDE_PROFILES:{},HISTORICAL_CONTEXT:{},
   parentMap:new Map(),childMap:new Map()
 };
 vm.createContext(context);
 vm.runInContext(source,context,{timeout:8000});
 vm.runInContext("var DATA=window.AtlasCanonicalGraph.read();window.__ATLAS_DATA=DATA;window.__ATLAS_NODE_BY_ID=new Map(DATA.nodes.map(n=>[n.id,n]));",context);
 return context;
}
function runLegacy(ctx){vm.runInContext(legacy,ctx,{timeout:8000});}
function runRecords(ctx){vm.runInContext(records,ctx,{timeout:8000});return ctx.window.AtlasRecordStore;}

test("Brenay family memories attach to canonical persons, never shadow ID records or insert parents",()=>{
 const c=setup(),before=c.DATA.edges.map(e=>e.a+"|"+e.b);
 runLegacy(c);
 assert.equal(c.DATA.nodes.length,119);
 assert.equal(c.DATA.edges.length,123);
 assert.deepEqual(Array.from(c.DATA.edges,e=>e.a+"|"+e.b),before);
 for(const [id,minimum] of [
   ["brenay_esther",4],["brenay_joan",1],["brenay_martha",4],["brenay_ammon",5]
 ]){
   const actual=c.DATA.nodes.find(n=>n.id===id);
   assert.strictEqual(c.window.__ATLAS_NODE_BY_ID.get(id),actual,"one person object for "+id);
   assert.ok((actual.evidence||[]).length>=minimum,"preserve sourced photo/letter evidence for "+id);
   assert.ok(actual.legacyPresentationNote,"retain legacy authored story without rewriting canonical identity");
 }
 const esther=c.DATA.nodes.find(n=>n.id==="brenay_esther");
 assert.equal(esther.projectionOrigin,"2026-11-23 legacy 2D family snapshot; evidence audit pending");
});

test("late biography scripts cannot silently rewrite canonical names, dates, confidence or IDs",()=>{
 const c=setup();runLegacy(c);
 const collection=runRecords(c);
 assert.equal(collection.schema,1);
 assert.equal(collection.stats().people,119);
 assert.equal(collection.stats().parentLinks,123);
 const marie=c.DATA.nodes.find(n=>n.id==="marie_elisabeth_tellier_mother_unresolved");
 assert.equal(marie.name,"Marie-Élisabeth [surname unresolved]");
 assert.equal(marie.confidence,"provisional","a presentation module cannot promote a research candidate");
 assert.ok(collection.diagnostics().some(d=>d.id===marie.id&&d.field==="confidence"));
 const davia=c.DATA.nodes.find(n=>n.id==="davia_dunbar");
 const start=davia.name;
 davia.name="INVENTED";davia.id="same-name-new-identity";
 assert.equal(davia.name,start);
 assert.equal(davia.id,"davia_dunbar");
 assert.ok(collection.diagnostics().some(d=>d.kind==="blocked-late-identity-override"&&d.id==="davia_dunbar"));
 assert.strictEqual(c.window.__ATLAS_NODE_BY_ID.get(davia.id),davia);
 assert.ok(Object.isFrozen(c.DATA.nodes)&&Object.isFrozen(c.DATA.edges));
});

test("artifact index returns source-aware copies, not another mutable genealogy",()=>{
 const c=setup();runLegacy(c);const recordsAPI=runRecords(c);
 const items=recordsAPI.evidenceFor("brenay_esther");
 assert.ok(items.length>=4);
 assert.ok(items.every(e=>e.personId==="brenay_esther"&&e.id.startsWith("artifact:")&&e.sourceId.startsWith("source:")));
 const first=items[0];
 assert.ok(recordsAPI.bySource(first.sourceId).some(e=>e.id===first.id));
 assert.equal(recordsAPI.evidenceFor("brenay_esther")[0].id,first.id,"stable per-person evidence ID");
 const canonicalOriginal=c.window.AtlasCanonicalGraph.person("brenay_esther");
 const sourceTitle=first.record.title;
 first.record.title="Tampered in viewer";
 assert.equal(recordsAPI.evidenceFor("brenay_esther")[0].record.title,sourceTitle,"viewer cannot rewrite source");
 assert.equal(c.window.AtlasCanonicalGraph.person("brenay_esther").name,canonicalOriginal.name);
 assert.deepEqual(Array.from(recordsAPI.evidenceFor("missing-person")),[]);
});

test("unexpected presentation-created people or parent links fail instead of silently altering the Tree",()=>{
 const extra=setup();
 extra.DATA.nodes.push({id:"unreviewed_person",name:"Unreviewed",confidence:"strong"});
 assert.throws(()=>runRecords(extra),/Unexpected person additions/);
 const bad=setup();
 bad.DATA.edges.push({a:"you",b:"brenay_ammon",confidence:"strong"});
 assert.throws(()=>runRecords(bad),/Unexpected genealogy change/);
});

test("native Atlas loads record boundary after legacy galleries, before People/Globe/Story navigation",()=>{
 const html=read("atlas-v3.9.63.html");
 assert.ok(html.indexOf("atlas-evidence-sync-2026-10-03-fulltext-v9.js")<
   html.indexOf("atlas-runtime-records-20261124.js"));
 assert.ok(html.indexOf("atlas-runtime-records-20261124.js")<
   html.indexOf("atlas-person-search.js"));
 assert.ok(html.indexOf("atlas-runtime-records-20261124.js")<
   html.indexOf("atlas-four-doors-20261123.js"));
 assert.match(html,/window\.AtlasRecordStore\.evidenceFor\(n\.id\)/);
 assert.ok(!/DATA\.(?:nodes|edges)\.push\(/.test(legacy),"v9 cannot create a competing genealogical graph");
 assert.match(legacy,/atlasAttachLegacyBrenayEvidence/);
});
