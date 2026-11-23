import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";
const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");
async function load(){
 const [original,modelJS,landJS,renderer,main,nav]=await Promise.all([
 read("atlas-v3.9.63.html"),read("atlas-geo-places-20261122.js"),
 read("atlas-world-land-110m.js"),read("atlas-geographic-globe-20261122.js"),
 read("atlas-v3.9.63.html"),read("atlas-four-doors-20261123.js")
 ]);
 const i=original.indexOf("const DATA = "),j=original.indexOf(";\n",i);
 assert.ok(i>=0&&j>i);
 const data=JSON.parse(original.slice(i+"const DATA = ".length,j));
 const sandbox={window:{}};
 vm.runInNewContext(modelJS,sandbox);
 vm.runInNewContext(landJS,sandbox);
 return {data,geo:sandbox.window.AtlasGeoPlaces,land:sandbox.window.ATLAS_WORLD_LAND,
    renderer,main,nav};
}
test("offline globe loads real Natural Earth public-domain land polygons",async()=>{
 const {land,renderer,main,nav}=await load();
 assert.ok(land.length>100);
 assert.ok(land.flat().length>4000);
 for(const ring of land)for(const [lon,lat] of ring){
   assert.ok(Number.isFinite(lon)&&Number.isFinite(lat)&&lon>=-180&&lon<=180&&lat>=-90&&lat<=90);
 }
 assert.doesNotThrow(()=>new vm.Script(renderer));
 for(const filename of ["atlas-world-land-110m.js","atlas-geo-places-20261122.js","atlas-geographic-globe-20261122.js"]){
   assert.ok(main.includes(filename),filename+" must be loaded from local Atlas files");
 }
 assert.ok(main.indexOf("atlas-geographic-globe-20261122.js")<main.indexOf("atlas-four-doors-20261123.js"));
 assert.match(nav,/geo\.create\(globePanel/);
 assert.match(nav,/globeInstance\.resize\(\)/);
 for(const forbidden of ["mapbox.com","maps.googleapis.com","openstreetmap.org/api","api.maptiler.com"]){
   assert.ok(!renderer.includes(forbidden),"Globe must run without remote mapping services");
 }
});
test("location pins are drawn ONLY from current Atlas place summaries, never invented events",async()=>{
 const {data,geo}=await load();
 assert.equal(data.nodes.length,106);
 assert.ok(data.edges.length>85,"Preserve current documented relationships without freezing the audit ledger at an obsolete count");
 const before=JSON.stringify(data);
 const result=geo.build(data.nodes,{});
 assert.ok(result.pins.length>25);
 assert.ok(result.pins.length<geo.catalog.length+1);
 assert.ok(result.routes.every(x=>x.claim.includes("migration unverified")));
 assert.ok(result.pins.some(x=>x.id==="arnstein"&&x.people.some(p=>p.id==="charles_albert")));
 assert.ok(result.pins.some(x=>x.id==="haarbolle"&&x.people.some(p=>p.id==="morten_peder")));
 assert.ok(result.pins.some(x=>x.id==="colonia_pacheco"&&x.people.some(p=>p.id==="della_ray")));
 assert.ok(!result.pins.some(x=>x.id==="france"),"unproven French origin hidden by default");
 assert.ok(geo.build(data.nodes,{includeFrontier:true}).pins.some(x=>x.id==="france"));
 assert.equal(JSON.stringify(data),before,"No node, link, note or evidence changes allowed");
});
test("birth, census, death and parent-origin pins explicitly state their evidence grade",async()=>{
 const {data,geo}=await load();
 const all=geo.build(data.nodes,{});
 const events=all.pins.flatMap(p=>p.events.map(e=>({...e,placeId:p.id})));
 assert.ok(events.some(e=>e.personId==="charles_albert"&&e.kind==="birth"&&e.grade==="original"&&e.placeId==="arnstein"));
 assert.ok(events.some(e=>e.personId==="morten_peder"&&e.kind==="birth"&&e.grade==="original"));
 assert.ok(events.some(e=>e.personId==="jessie_irene_aurin"&&e.kind==="census"&&e.grade==="original"));
 assert.ok(events.some(e=>e.personId==="della_ray"&&e.kind==="death"&&e.grade==="biography"));
 assert.ok(events.some(e=>e.personId==="james_sheldon"&&e.grade==="provisional"));
 assert.ok(events.some(e=>e.placeId==="sweden"&&e.kind==="parent-origin"&&e.contextOnly));
 assert.ok(!events.some(e=>e.kind==="migration"),"Do not invent verified migration events");
 assert.ok(events.every(e=>e.basis&&["original","biography","provisional"].includes(e.grade)));
});
test("default view omits collateral people and preserves research status",async()=>{
 const {data,geo}=await load();
 const normal=geo.build(data.nodes,{}),full=geo.build(data.nodes,{includeFrontier:true,includeCollateral:true});
 assert.ok(full.pins.length>normal.pins.length);
 assert.ok(!normal.pins.flatMap(p=>p.people).some(p=>p.collateral));
 assert.ok(full.pins.flatMap(p=>p.people).some(p=>p.collateral));
 const person=geo.build(data.nodes,{personId:"dorthea_jensen"});
 assert.ok(person.pins.some(p=>p.id==="lolland"));
 assert.ok(person.pins.every(p=>p.people.every(n=>n.id==="dorthea_jensen")));
 const original=geo.resolveSummary("Arnstein, Ontario → Arizona");
 assert.deepEqual(Array.from(original,x=>x.placeId),["arnstein","arizona"]);
});
test("PWA has refreshed cache and no nonpublic file access",async()=>{
 const [index,manifest,main,nav,renderer]=await Promise.all([
 read("index.html"),read("manifest.webmanifest"),
 read("atlas-v3.9.63.html"),read("atlas-four-doors-20261123.js"),
 read("atlas-geographic-globe-20261122.js")
 ]);
 const release="20261123-archival-cameo-v1";
 assert.match(index,new RegExp(release));
 assert.match(JSON.parse(manifest).start_url,new RegExp(release));
 assert.match(main,new RegExp(release));
 assert.match(nav,new RegExp(release));
 assert.ok(!/fetch\(|XMLHttpRequest|sendBeacon|localStorage\.setItem/.test(renderer),"Map does not send person data to third parties or persist it");
});
