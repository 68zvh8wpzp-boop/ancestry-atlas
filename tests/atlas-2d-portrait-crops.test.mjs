import assert from "node:assert/strict";
import {readFile,stat} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";
import {createHash} from "node:crypto";
import {canonicalGraph,installCanonical} from "./atlas-test-graph.mjs";
const root=new URL("../",import.meta.url);
const read=p=>readFile(new URL(p,root),"utf8");
async function images(){
 const [registry,main,map,snapshot,layoutSource]=await Promise.all([
  read("atlas-2d-portrait-index-20261123.js"),read("atlas-v3.9.63.html"),
  read("atlas-2d-map.js"),read("atlas-canonical-family-data.js"),
  read("atlas-2d-layout.js")
 ]);
 const context={window:{}};vm.runInNewContext(registry,context);
 vm.runInNewContext(snapshot,context);vm.runInNewContext(layoutSource,context);
 return {portrait:context.window.ATLAS_2D_PORTRAITS,data:context.window.AtlasCanonicalGraph.read(),
  layout:context.window.Atlas2DLayout.create(context.window.AtlasCanonicalGraph.read(),"you"),
  map,registry,main};
}
test("25 person-linked portraits with untouched family relationships",async()=>{
 const {portrait,data,layout,registry,main}=await images();
 assert.equal(Object.keys(portrait).length,25);
 assert.equal(data.nodes.length,119);
 assert.equal(data.edges.length,123);
 for(const id of Object.keys(portrait)){
  assert.ok(data.nodes.some(x=>x.id===id),id+" must be a known Atlas person");
  assert.ok(layout.positions.has(id),id+" must be plotted in connected Tree");
  assert.ok(portrait[id].url&&portrait[id].title&&portrait[id].provenance,id+" needs source metadata");
  assert.ok(!portrait[id].url.includes("data:image"),"Original URL must remain preserved");
 }
 assert.ok(!/DATA\.nodes\.(push|splice)|DATA\.edges\.(push|splice)/.test(registry));
 assert.match(main,/const DATA = window\.AtlasCanonicalGraph\.read\(\)/);
});
test("all 19 presentation crops source real bundled images; coordinates stay inside original image",async()=>{
 const {portrait}=await images();
 const cropEntries=Object.entries(portrait).filter(([_,v])=>v.crop);
 assert.equal(cropEntries.length,19);
 for(const [id,v] of cropEntries){
  assert.ok(Array.isArray(v.crop)&&v.crop.length===4,"Missing crop rectangle: "+id);
  const [x,y,w,h]=v.crop;
  for(const n of v.crop)assert.ok(Number.isFinite(n)&&n>=0&&n<=1,id+" normalised bounds");
  assert.ok(w>0&&h>0&&x+w<=1.00000001&&y+h<=1.00000001,id+" rectangle within source");
  assert.ok(v.identityEvidence&&v.sourceStatus,id+" must record identity claim");
  assert.ok(v.type==="identified-solo-crop"||v.type==="identified-group-crop");
  assert.ok(!/^https?:/.test(v.url),"New crops must use preserved local image");
  const file=await stat(new URL(v.url,root));
  assert.ok(file.size>1000,"Actual bundled photograph: "+v.url);
 }
 assert.equal(cropEntries.filter(([_,v])=>v.type==="identified-group-crop").length,7);
 assert.equal(cropEntries.filter(([_,v])=>v.type==="identified-solo-crop").length,12);
});
test("group positions are explicitly caption-identifiable; distinct Isaiahs not conflated",async()=>{
 const {portrait}=await images();
 for(const id of ["james_sheldon","inez_karen","sarah_carling","charles_albert","jonathan_henry","della_ray","marion_brenay"]){
  assert.equal(portrait[id].type,"identified-group-crop");
  assert.equal(portrait[id].sourceStatus,"captioned");
  assert.match(portrait[id].identityEvidence,/left|right|central|caption/i);
 }
 assert.equal(portrait.james_sheldon.url,portrait.inez_karen.url);
 assert.equal(portrait.jonathan_henry.url,portrait.della_ray.url);
 assert.ok(!("isaiah_hill" in portrait),
  "The Isaiah with Lydia Ross is not the older direct ancestor; do not show his face there");
 assert.ok(!("russell_hill" in portrait),"An uncertain collateral image cannot be his portrait");
 assert.ok(!("isaac_carling" in portrait),"No invented Isaac Carling portrait");
 assert.equal(portrait.grace_hill.url,"assets/inez-life-story/image2.jpeg");
 assert.equal(portrait.grace_hill.sourceBlobSha,"60f036df64337f19afe59c8f99639e1b4f89004c");
 assert.match(portrait.grace_hill.identityEvidence,/Inez.*manuscript/);
});
test("Canvas draws proportional real crops and retains silhouettes when photo fails",async()=>{
 const {map}=await images();
 assert.doesNotThrow(()=>new vm.Script(map));
 assert.match(map,/var crop=meta\.crop/);
 assert.match(map,/sourceRatio=sw\/sh,targetRatio=width\/height/);
 assert.match(map,/ctx\.drawImage\(img,sx,sy,sw,sh,x,y,width,height\)/);
 assert.match(map,/img\.onerror=function\(\)\{/);
 assert.match(map,/state\.index\+1<state\.choices\.length/);
 assert.match(map,/photo\.activeEntry\|\|portraits\[id\]/);
 assert.match(map,/ctx\.ellipse/);
 assert.match(map,/Portrait: /);
 assert.match(map,/selected-photo-source/);
 assert.match(map,/photoLink.href=portraitMeta.fullSourceUrl\|\|portraitMeta.url/);
 assert.match(map,/Photo attribution is independent of genealogical confidence/);
});
test("installed app and 2D Tree load fresh crop revision",async()=>{
 const [main,tree,index,pwa,shell]=await Promise.all([
  read("atlas-v3.9.63.html"),read("atlas-2d-journey-preview.html"),
  read("index.html"),read("manifest.webmanifest"),read("atlas-four-doors-20261123.js")
 ]);
 for(const value of [main,tree])assert.match(value,/20261123-portrait-crops-v3/);
 for(const value of [index,JSON.parse(pwa).start_url,shell])
  assert.match(value,/20261123-canonical-graph-v1/);
 assert.match(tree,/atlas-2d-portrait-index-20261123\.js\?v=20261123-portrait-crops-v3/);
 assert.match(tree,/atlas-2d-map\.js\?v=20261123-canonical-graph-v1/);
 assert.ok(tree.indexOf("atlas-2d-portrait-index-20261123.js")<tree.indexOf("atlas-2d-map.js"));
});

test("primary and fallback portraits have immutable image hashes and are person-specific",async()=>{
 const {portrait}=await images();
 const alternatives=Object.entries(portrait).flatMap(([id,v])=>(v.alternatePortraits||[]).map(a=>({id,...a})));
 assert.equal(alternatives.length,5);
 assert.equal(portrait.marion_brenay.alternatePortraits[0].url.startsWith("https://"),true);
 assert.ok(alternatives.some(x=>x.id==="jonathan_henry"&&x.url.includes("sarah_children_1891")));
 assert.ok(alternatives.some(x=>x.id==="della_ray"&&x.url.includes("1947-original.jpg")));
 assert.ok(alternatives.some(x=>x.id==="marian_skinner"&&x.url.includes("50th-anniversary")));
 const files=[...Object.entries(portrait).map(([id,v])=>({id,...v})),...alternatives];
 for(const v of files){
   if(v.url.startsWith("http"))continue;
   assert.match(v.sourceBlobSha,/^[a-f0-9]{40}$/,v.id+" source hash");
   const bytes=await readFile(new URL(v.url,root));
   const sha=createHash("sha1").update("blob "+bytes.length+"\0").update(bytes).digest("hex");
   assert.equal(sha,v.sourceBlobSha,v.id+" original file preserved");
 }
 const [primary,alternative]=[portrait.jonathan_henry,portrait.jonathan_henry.alternatePortraits[0]];
 assert.notEqual(primary.url,alternative.url);
 assert.match(alternative.identityEvidence,/left to right/);
});
