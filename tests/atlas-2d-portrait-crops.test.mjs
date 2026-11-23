import assert from "node:assert/strict";
import {readFile,stat} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";
const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");
async function model(){
 const [base,crops,pedigree,layoutSource]=await Promise.all([
  read("atlas-2d-portrait-index-20261123.js"),
  read("atlas-2d-portrait-crops-20261123.js"),
  read("atlas-2d-pedigree-snapshot.js"),
  read("atlas-2d-layout.js")
 ]);
 const sandbox={window:{}};
 for(const js of [base,crops,pedigree,layoutSource])vm.runInNewContext(js,sandbox);
 return {portraits:sandbox.window.ATLAS_2D_PORTRAITS,
    registry:sandbox.window.ATLAS_2D_PORTRAIT_CROP_REGISTRY,
    pedigree:sandbox.window.ATLAS_2D_PEDIGREE,
    layout:sandbox.window.Atlas2DLayout};
}
test("25 named portraits replace seven-only silhouettes on the existing 2D pedigree",async()=>{
 const {portraits,registry,pedigree,layout}=await model();
 assert.equal(Object.keys(portraits).length,25);
 assert.equal(registry.entries.length,19);
 assert.equal(registry.groupCropCount,9);
 const mapped=layout.create(pedigree,"you");
 for(const id of Object.keys(portraits)){
  assert.ok(pedigree.nodes.some(n=>n.id===id),id+" must be an existing Atlas record");
  assert.ok(mapped.positions.has(id),id+" must appear on the direct ancestor map");
 }
 assert.ok(portraits.jonathan_henry.url.includes("sarah_children_1891"));
 assert.ok(portraits.sarah_carling.url.includes("sarah_children_1891"));
 assert.ok(portraits.james_sheldon.url.includes("sheldon_inez_wedding"));
 assert.ok(portraits.inez_karen.url.includes("sheldon_inez_wedding"));
 assert.ok(portraits.della_ray.url.includes("della-webb-and-daughters-1947"));
 assert.ok(portraits.marion_brenay.fallbackUrl,"previous obituary portrait is retained as fallback");
 assert.equal(portraits.grace_hill.portraitType,"standalone");
});
test("crop rectangles and identities have explicit named-source context",async()=>{
 const {portraits,registry}=await model();
 const ids=registry.entries.map(e=>e.id);
 assert.equal(new Set(ids).size,ids.length,"no duplicate crop records");
 for(const e of registry.entries){
  assert.ok(e.id&&e.url&&e.subject&&e.basis&&e.provenance);
  assert.equal(e.attribution,"source-identified");
  assert.ok(["group-crop","existing-family-crop","standalone"].includes(e.portraitType));
  const r=e.crop;
  for(const v of [r.x,r.y,r.w,r.h])assert.ok(Number.isFinite(v)&&v>=0&&v<=1);
  assert.ok(r.w>0&&r.h>0&&r.x+r.w<=1.000001&&r.y+r.h<=1.000001);
  assert.equal(portraits[e.id].url,e.url);
  assert.deepEqual(JSON.parse(JSON.stringify(portraits[e.id].crop)),JSON.parse(JSON.stringify(e.crop)));
 }
 const henry=registry.entries.find(e=>e.id==="jonathan_henry");
 assert.ok(henry.basis.includes("left-to-right"));
 assert.ok(henry.sourcePage.startsWith("https://rsc.byu.edu/"));
 const charles=registry.entries.find(e=>e.id==="charles_albert");
 const marian=registry.entries.find(e=>e.id==="marian_skinner");
 assert.equal(charles.url,marian.url);
 assert.notDeepEqual(JSON.parse(JSON.stringify(charles.crop)),JSON.parse(JSON.stringify(marian.crop)));
});
test("all local portrait image files are packaged and originals are left intact",async()=>{
 const {registry}=await model();
 const names=[...new Set(registry.entries.map(e=>e.url).filter(x=>!/^https?:/.test(x)))];
 assert.ok(names.length>=15);
 for(const name of names){
  assert.ok(!name.includes(".."),"path must not traverse out of Atlas");
  const info=await stat(new URL("../"+name,import.meta.url));
  assert.ok(info.isFile()&&info.size>1000,name+" must be a stored original or approved family image");
 }
});
test("2D map loads crop registry before drawing and uses silhouette on broken photos",async()=>{
 const [page,script,home,index,manifest]=await Promise.all([
  read("atlas-2d-journey-preview.html"),read("atlas-2d-map.js"),
  read("atlas-four-doors-20261123.js"),read("index.html"),
  read("manifest.webmanifest")
 ]);
 assert.doesNotThrow(()=>new vm.Script(script));
 assert.ok(page.includes("atlas-2d-portrait-crops-20261123.js"));
 assert.ok(page.indexOf("atlas-2d-portrait-index-20261123.js")<
   page.indexOf("atlas-2d-portrait-crops-20261123.js"));
 assert.ok(page.indexOf("atlas-2d-portrait-crops-20261123.js")<
   page.indexOf("atlas-2d-map.js"));
 assert.match(script,/var rect=photo\.usingFallback\?null:entry\.crop/);
 assert.match(script,/ctx\.drawImage\(img,sx\+\(sw-vw\)\/2,sy\+\(sh-vh\)\/2,vw,vh,x,y,width,height\)/);
 assert.match(script,/if\(!rendered\)/);
 assert.match(script,/if\(!state\.usingFallback&&entry\.fallbackUrl\)/);
 assert.ok(!/DATA\.nodes\s*=|DATA\.edges\s*=|data\.nodes\.push\(/.test(script));
 assert.match(home,/20261123-portrait-crops-v2/);
 assert.match(index,/20261123-portrait-crops-v2/);
 assert.match(JSON.parse(manifest).start_url,/20261123-portrait-crops-v2/);
});
