import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";
const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");

test("the new map is standalone; Home Screen app and evidence remain untouched",async()=>{
  const [entry,manifest,html,original]=await Promise.all([
    read("index.html"),read("manifest.webmanifest"),
    read("atlas-2d-journey-preview.html"),read("atlas-v3.9.63.html")
  ]);
  assert.match(entry,/atlas-v3\.9\.63\.html/);
  assert.match(JSON.parse(manifest).start_url,/atlas-v3\.9\.63\.html/);
  assert.ok(!entry.includes("atlas-2d-journey-preview.html"));
  assert.ok(!original.includes("atlas-2d-map.js"));
  for(const name of ["atlas-2d-pedigree-snapshot.js","atlas-2d-layout.js","atlas-2d-family.js","atlas-2d-map.js","atlas-2d-map.css"]){
    assert.ok(html.includes(name),"missing asset: "+name);
    assert.ok((await read(name)).length>100);
  }
  assert.ok(!html.includes("iframe id=\"bio-frame\" src="),"old Atlas is loaded only on request");
});

test("snapshot mirrors precisely the existing Atlas person and relationship records",async()=>{
  const html=await read("atlas-v3.9.63.html");
  const start=html.indexOf("const DATA = ");
  const end=html.indexOf(";\n",start);
  assert.ok(start>=0 && end>start,"original DATA must be findable");
  const original=JSON.parse(html.slice(start+"const DATA = ".length,end));
  const code=await read("atlas-2d-pedigree-snapshot.js");
  const sandbox={window:{}};vm.runInNewContext(code,sandbox);
  const copy=sandbox.window.ATLAS_2D_PEDIGREE;
  assert.equal(copy.nodes.length,original.nodes.length);
  assert.equal(copy.edges.length,original.edges.length);
  for(let i=0;i<copy.nodes.length;i++){
    const n=copy.nodes[i],o=original.nodes[i];
    for(const key of ["id","name","years","place","branch","confidence","collateral"]){
      assert.equal(n[key],key==="collateral"?!!o[key]:o[key]|| (key==="confidence"?"strong":""),"node "+i+" "+key);
    }
  }
  for(let i=0;i<copy.edges.length;i++){
    const e=copy.edges[i],o=original.edges[i];
    assert.equal(e.a,o.a);assert.equal(e.b,o.b);
    assert.equal(e.confidence,o.confidence||"strong");
  }
});

test("layout shows a true 2-D parent-child structure with no invented connections",async()=>{
  const sandbox={window:{}};
  vm.runInNewContext(await read("atlas-2d-pedigree-snapshot.js"),sandbox);
  vm.runInNewContext(await read("atlas-2d-layout.js"),sandbox);
  const data=sandbox.window.ATLAS_2D_PEDIGREE;
  const layout=sandbox.window.Atlas2DLayout.create(data,"you");
  assert.ok(layout.nodes.length>60,"the real mapped direct ancestry must be present");
  assert.ok(layout.links.length>60,"all direct mapped edges should render");
  assert.ok(layout.maxGeneration>=12,"deep historical branches must be available");
  assert.deepEqual(Array.from(layout.pathTo("you")),["you"]);
  assert.equal(layout.pathTo("marion_brenay").at(-1),"marion_brenay");
  assert.ok(layout.pathTo("charles_albert").includes("marion_brenay"));
  const positions=new Set(layout.nodes.map(n=>n.id));
  assert.equal(positions.size,layout.nodes.length);
  for(const link of layout.links){
    const a=layout.positions.get(link.from),b=layout.positions.get(link.to);
    assert.ok(a && b,"link must reference mapped persons");
    assert.ok(b.x>a.x,"earlier generation must be farther to the right");
  }
  for(const [generation,people] of layout.levels){
    const coords=people.map(p=>layout.positions.get(p.id).y).sort((a,b)=>a-b);
    for(let i=1;i<coords.length;i++) assert.ok(coords[i]-coords[i-1]>=140,"labels must not overlap within a generation");
  }
});

test("map code parses and supports real touch gestures, LOD, paths and optional biographies",async()=>{
  const js=await read("atlas-2d-map.js");
  assert.doesNotThrow(()=>new vm.Script(js));
  const required=[
    'canvas.addEventListener("pointerdown"', 'canvas.addEventListener("pointermove"',
    'canvas.addEventListener("pointerup"', "function zoomAt(", "function fitAll(",
    "function hit(", "function focus(", "function drawEdges(", "function drawNodes(",
    "function drawMini(", "function lineage(", "function openBiography(",
    'bioFrame.src="./atlas-v3.9.63.html'
  ];
  for(const s of required)assert.ok(js.includes(s),"missing map feature: "+s);
  assert.ok(!js.includes("data.nodes.push")&&!js.includes("data.edges.push"));
});


test("family portrait uses existing relationships, including mapped collateral children",async()=>{
  const sandbox={window:{}};
  vm.runInNewContext(await read("atlas-2d-pedigree-snapshot.js"),sandbox);
  vm.runInNewContext(await read("atlas-2d-family.js"),sandbox);
  const snap=sandbox.window.ATLAS_2D_PEDIGREE;
  const family=sandbox.window.Atlas2DFamily.create(snap);
  const charles=family.family("charles_albert");
  assert.deepEqual(Array.from(charles.parents.map(p=>p.id)),["charles_godfrey","ida_mae"]);
  assert.ok(charles.coParents.some(p=>p.id==="marian_skinner"));
  assert.ok(charles.children.some(p=>p.id==="marion_brenay"));
  assert.ok(charles.children.some(p=>p.id==="brenay_david"),"Siblings absent from the direct map still appear in nuclear family");
  assert.ok(charles.children.length>=10);
  const you=family.family("you");
  assert.equal(you.parents.length,2);
  assert.equal(you.children.length,0,"No children are presently mapped, not a claim the person has none");
  const elizabeth=family.family("elizabeth_webb");
  assert.equal(elizabeth.person.name,"Elizabeth Dunbar Webb");
  assert.equal(elizabeth.children.length,0);
  const ann=family.family("ann_eliza_webb");
  assert.ok(!ann.parents.some(p=>p.id==="brigham_young"),"Spousal evidence must never be labeled parentage");
  assert.ok(ann.needsReview);
});

test("searchable Atlas records include unlinked relatives and research candidates",async()=>{
  const sandbox={window:{}};
  vm.runInNewContext(await read("atlas-2d-pedigree-snapshot.js"),sandbox);
  vm.runInNewContext(await read("atlas-2d-layout.js"),sandbox);
  const snap=sandbox.window.ATLAS_2D_PEDIGREE;
  const mapped=sandbox.window.Atlas2DLayout.create(snap,"you");
  assert.equal(snap.nodes.length,106);
  assert.equal(mapped.nodes.length,83);
  const notOnMain=snap.nodes.filter(n=>!mapped.positions.has(n.id));
  assert.equal(notOnMain.length,23);
  assert.ok(notOnMain.some(n=>n.id==="elizabeth_webb"));
  assert.ok(notOnMain.some(n=>n.id==="brenay_david"));
  assert.ok(notOnMain.some(n=>n.id==="pierre_goulet_1846_candidate"));
  const js=await read("atlas-2d-map.js");
  assert.ok(js.includes("data.nodes.filter(function(n)"),"Optional search must include all Atlas people");
  assert.ok(js.includes("else openFamily(n.id)"),"Out-of-tree results must still open a family portrait");
  assert.ok(js.includes("if(n.id===selected && cam.s>=.4)openFamily(n.id)"),"Second tap opens static family portrait");
});


test("mapped siblings appear once, without inventing unknown half-sibling relationships",async()=>{
  const sandbox={window:{}};
  vm.runInNewContext(await read("atlas-2d-pedigree-snapshot.js"),sandbox);
  vm.runInNewContext(await read("atlas-2d-family.js"),sandbox);
  const fam=sandbox.window.Atlas2DFamily.create(sandbox.window.ATLAS_2D_PEDIGREE);
  const marion=fam.family("marion_brenay");
  assert.equal(marion.siblingCount,10,"Marion has ten currently mapped siblings");
  assert.equal(marion.siblings.length,10);
  assert.equal(new Set(marion.siblings.map(s=>s.person.id)).size,10,"shared mothers and fathers must not duplicate siblings");
  for(const s of marion.siblings){
    assert.equal(s.label,"Both mapped parents");
    assert.deepEqual(Array.from(s.sharedParents.map(p=>p.id)),["charles_albert","marian_skinner"]);
  }
  assert.equal(fam.family("charles_albert").siblingCount,0,"unknown siblings must not be inferred");
  assert.equal(fam.family("you").siblingCount,0,"unknown siblings must not be inferred");
  const fixture={
    nodes:["me","mom","dad","full","one","other","unknown"].map(id=>({id,name:id})),
    edges:[
      {a:"me",b:"mom"},{a:"me",b:"dad"},
      {a:"full",b:"mom"},{a:"full",b:"dad"},
      {a:"one",b:"mom"},{a:"one",b:"other"},
      {a:"unknown",b:"dad"}
    ]
  };
  const index=sandbox.window.Atlas2DFamily.create(fixture);
  const relatives=index.family("me").siblings;
  assert.equal(relatives.length,3);
  assert.equal(relatives.find(s=>s.person.id==="full").label,"Both mapped parents");
  assert.equal(relatives.find(s=>s.person.id==="one").label,"Shared parent: mom");
  assert.equal(relatives.find(s=>s.person.id==="unknown").label,"Shared parent: dad");
  assert.ok(relatives.every(s=>!s.label.includes("half")),"never assert half sibling from an incomplete record");
});

test("family tabs keep children visible without scrolling through siblings",async()=>{
  const [html,css,js]=await Promise.all([read("atlas-2d-journey-preview.html"),read("atlas-2d-map.css"),read("atlas-2d-map.js")]);
  for(const name of ["family-siblings","family-sibling-count","family-parents","family-center","family-child-groups","family-tab-own","family-tab-origin","family-own-view","family-origin-view"]){
    assert.ok(html.includes('id="'+name+'"'),"missing family section "+name);
  }
  assert.ok(html.indexOf('id="family-view-tabs"')<html.indexOf('id="family-scroll"'),"Tabs stay above scrolling list");
  assert.ok(html.includes("atlas-2d-family.js?v=20261118-households-1"));
  assert.ok(css.includes(".family-siblings .family-highlight"));
  assert.ok(css.includes('#family-view-tabs button[aria-selected="true"]'));
  for(const fn of ["familySiblingGroup","renderChildGroups","showFamilyTab","openFamily"]){
    assert.ok(js.includes("function "+fn+"("));
  }
  assert.ok(js.includes('showFamilyTab(family.childGroups.length?"own":"origin")'),"Open on children when any are mapped");
  assert.ok(js.includes('var siblingCounts=new Map('));
  assert.ok(js.includes('var badgeText=sibNum?sibNum+" sib":""'));
  assert.ok(!js.includes("nodes.push(")&&!js.includes("data.edges.push("));
});
test("multiple co-parent groups stay distinct and never invent a marriage",async()=>{
  const sandbox={window:{}};
  vm.runInNewContext(await read("atlas-2d-pedigree-snapshot.js"),sandbox);
  vm.runInNewContext(await read("atlas-2d-family.js"),sandbox);
  const index=sandbox.window.Atlas2DFamily.create(sandbox.window.ATLAS_2D_PEDIGREE);
  const marion=index.family("marion_brenay");
  assert.equal(marion.childGroups.length,1);
  assert.deepEqual(Array.from(marion.childGroups[0].otherParents.map(p=>p.id)),["james_wilford"]);
  assert.deepEqual(Array.from(marion.childGroups[0].children.map(p=>p.id)),["jamar_webb","james_sheldon"]);
  const charles=index.family("charles_albert");
  assert.equal(charles.childGroups.length,1);
  assert.equal(charles.childGroups[0].children.length,11);
  assert.deepEqual(Array.from(charles.childGroups[0].otherParents.map(p=>p.id)),["marian_skinner"]);
  const fixture={nodes:["p","a","b","c1","c2","c3","c4","c5"].map(id=>({id,name:id})),
    edges:[{a:"c1",b:"p"},{a:"c1",b:"a"},{a:"c2",b:"p"},{a:"c2",b:"b"},
      {a:"c3",b:"p"},{a:"c3",b:"a"},{a:"c4",b:"p"},{a:"c5",b:"p"},{a:"c5",b:"b"}]};
  const sample=sandbox.window.Atlas2DFamily.create(fixture).family("p");
  assert.equal(sample.children.length,5);
  assert.equal(sample.childGroups.length,3);
  const groups=new Map(Array.from(sample.childGroups).map(g=>[g.otherParents.map(x=>x.id).join(",")||"unknown",g.children.map(x=>x.id)]));
  assert.deepEqual(Array.from(groups.get("a")),["c1","c3"]);
  assert.deepEqual(Array.from(groups.get("b")),["c2","c5"]);
  assert.deepEqual(Array.from(groups.get("unknown")),["c4"]);
  assert.equal(Array.from(sample.childGroups).flatMap(g=>Array.from(g.children)).length,5);
});
