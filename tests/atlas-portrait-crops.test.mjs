import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";

const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");
function loadPortraits(base,crops){
  const context={window:{}};
  vm.runInNewContext(base,context);
  vm.runInNewContext(crops,context);
  return context.window;
}
async function load(){
  const [base,crops,main,map,html,snapshot,layout]=await Promise.all([
    read("atlas-2d-portrait-index-20261123.js"),
    read("atlas-2d-portrait-crops-20261123.js"),
    read("atlas-v3.9.63.html"),
    read("atlas-2d-map.js"),
    read("atlas-2d-journey-preview.html"),
    read("atlas-2d-pedigree-snapshot.js"),
    read("atlas-2d-layout.js")
  ]);
  return {photos:loadPortraits(base,crops),main,map,html,snapshot,layout};
}
test("exactly 25 distinct ancestors have source-attributed portraits, without altering genealogy",async()=>{
  const {photos,main,snapshot,layout}=await load();
  const dataIndex=main.indexOf("const DATA = "),dataEnd=main.indexOf(";\n",dataIndex);
  const data=JSON.parse(main.slice(dataIndex+"const DATA = ".length,dataEnd));
  const before=JSON.stringify(data);
  assert.equal(data.nodes.length,106);
  assert.equal(data.edges.length,115);
  const entries=Object.values(photos.ATLAS_2D_PORTRAITS);
  assert.equal(entries.length,25);
  assert.equal(photos.ATLAS_2D_PORTRAIT_CROP_REGISTRY.entries.length,19);
  assert.equal(photos.ATLAS_2D_PORTRAIT_CROP_REGISTRY.groupCropCount,9);
  assert.ok(data.nodes.some(n=>n.id==="jonathan_henry"));
  assert.ok(entries.every(p=>p.url&&p.title||p.url&&p.subject));
  const context={window:{}};
  vm.runInNewContext(snapshot,context);vm.runInNewContext(layout,context);
  const mapped=context.window.Atlas2DLayout.create(context.window.ATLAS_2D_PEDIGREE,"you");
  assert.ok(Object.keys(photos.ATLAS_2D_PORTRAITS).every(id=>mapped.positions.has(id)));
  assert.equal(JSON.stringify(data),before);
});
test("crop bounds are valid, reproducible and tied to unchanged source files",async()=>{
 const {photos}=await load();
 const registry=photos.ATLAS_2D_PORTRAIT_CROP_REGISTRY.entries;
 for(const p of registry){
   const {x,y,w,h}=p.crop;
   assert.equal(p.attribution,"source-identified");
   assert.ok(p.basis&&p.provenance&&p.sourceBlobSha);
   assert.match(p.sourceBlobSha,/^[0-9a-f]{40}$/);
   assert.ok([x,y,w,h].every(n=>Number.isFinite(n)&&n>=0&&n<=1));
   assert.ok(w>0&&h>0&&x+w<=1.000001&&y+h<=1.000001);
 }
 assert.ok(registry.some(p=>p.id==="sarah_carling"&&p.portraitType==="group-crop"));
 assert.ok(registry.some(p=>p.id==="jonathan_henry"&&p.portraitType==="group-crop"&&/left-to-right/.test(p.basis)));
 assert.ok(registry.some(p=>p.id==="inez_karen"&&p.portraitType==="group-crop"));
 assert.ok(registry.some(p=>p.id==="della_ray"&&p.fullSourceUrl));
 assert.ok(!registry.some(p=>p.id==="russell_hill"||p.id==="isaac_carling"),
   "No invented likeness for persons with no source-identified portrait");
});
test("2D canvas actually draws source face crops, not squeezed whole group photographs",async()=>{
 const {map,html}=await load();
 assert.ok(html.indexOf("atlas-2d-portrait-index-20261123.js")<
   html.indexOf("atlas-2d-portrait-crops-20261123.js"));
 assert.ok(html.indexOf("atlas-2d-portrait-crops-20261123.js")<
   html.indexOf("atlas-2d-map.js"));
 assert.match(html,/atlas-2d-map\.js\?v=20261123-source-crops-v2/);
 assert.match(html,/selected-photo-source/);
 assert.match(map,/var sw=Math\.min\(ix-sx/);
 assert.match(map,/ctx\.drawImage\(img,sx\+/);
 assert.match(map,/portrait\.fullSourceUrl\|\|portrait\.url/);
 assert.match(map,/portrait\.crop/);
 assert.match(map,/fallbackUrl/);
 assert.match(map,/Generic bust outline/);
 assert.doesNotThrow(()=>new vm.Script(map));
});
test("new release refreshes installed iPhone entry and Tree route",async()=>{
 const [main,index,manifest,home,html]=await Promise.all([
 read("atlas-v3.9.63.html"),read("index.html"),read("manifest.webmanifest"),
 read("atlas-four-doors-20261123.js"),read("atlas-2d-journey-preview.html")
 ]);
 for(const text of [index,main,JSON.parse(manifest).start_url,home,html]){
   assert.match(text,/20261123-portrait-crops-v2/);
 }
 assert.match(home,/atlas-2d-journey-preview\.html\?v=/);
});
