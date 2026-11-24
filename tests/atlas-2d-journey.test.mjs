import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";
const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");
import {canonicalGraph,installCanonical} from "./atlas-test-graph.mjs";

test("the Home Screen app links to the separate map with a return route",async()=>{
  const [entry,manifest,html,original]=await Promise.all([
    read("index.html"),read("manifest.webmanifest"),
    read("atlas-2d-journey-preview.html"),read("atlas-v3.9.63.html")
  ]);
  assert.match(entry,/atlas-v3\.9\.63\.html/);
  assert.match(JSON.parse(manifest).start_url,/atlas-v3\.9\.63\.html/);
  assert.match(original,/href="\.\/atlas-2d-journey-preview\.html/);
  assert.match(html,/atlas-museum-route-20261123\.js/);
  assert.match(html,/atlas-museum-route-20261123\.css/);
  assert.ok(!original.includes("atlas-2d-map.js"));
  for(const name of ["atlas-canonical-family-data.js","atlas-2d-layout.js","atlas-2d-family.js","atlas-2d-map.js","atlas-2d-map.css"]){
    assert.ok(html.includes(name),"missing asset: "+name);
    assert.ok((await read(name)).length>100);
  }
  assert.ok(!html.includes("iframe id=\"bio-frame\" src="),"old Atlas is loaded only on request");
});

test("one canonical graph preserves all source-qualified people, links and unresolved research",async()=>{
  const [html,source]=await Promise.all([read("atlas-v3.9.63.html"),read("atlas-canonical-family-data.js")]);
  const graph=canonicalGraph();
  assert.match(html,/const DATA = window\.AtlasCanonicalGraph\.read\(\)/);
  assert.ok(!html.includes('const DATA = {"nodes"'),"No second graph inside person UI");
  assert.equal(graph.nodes.length,119);
  assert.equal(graph.edges.length,123);
  const ids=new Set(graph.nodes.map(n=>n.id));
  assert.equal(ids.size,graph.nodes.length);
  for(const id of [
    "nannie_reed","thomas_prather","john_s_prather","louella_roberts_prather",
    "amelia_l_cotton","john_auene_1879","morten_pedersen_1771",
    "karen_hansdatter_1766","peder_mortensen_1784","brenay_esther","brenay_joan",
    "john_a_skinner_c1833","marian_lewis_skinner_c1838"
  ])assert.ok(ids.has(id),"canonical graph missing person: "+id);
  const edgeKeys=new Set(graph.edges.map(e=>e.a+"|"+e.b));
  for(const key of [
    "grace_hill|nannie_reed","inez_karen|thomas_prather",
    "jessie_irene_aurin|amelia_l_cotton","jessie_irene_aurin|john_auene_1879",
    "peder_mortensen_1806|morten_pedersen_1771",
    "peder_mortensen_1806|karen_hansdatter_1766",
    "morten_pedersen_1771|peder_mortensen_1784",
    "morten_pedersen_1771|mette_jorg",
    "brenay_esther|charles_albert","brenay_joan|marian_skinner",
    "richard_francis_skinner|john_a_skinner_c1833",
    "richard_francis_skinner|marian_lewis_skinner_c1838"
  ])assert.ok(edgeKeys.has(key),"canonical relationship missing: "+key);
  assert.ok(!edgeKeys.has("peder_mortensen_1806|mette_jorg"),"Danish skipped-generation link must remain rejected");
  assert.ok(graph.nodes.find(n=>n.id==="john_auene_1879").note.includes("not a proven alias"));
  assert.equal(graph.nodes.find(n=>n.id==="john_auene_1879").confidence,"provisional");
  const elder=graph.nodes.find(n=>n.id==="marian_lewis_skinner_c1838");
  assert.match(elder.note,/unresolved original-source contradiction/);
  assert.match(source,/A218 Danish lineage audit/);
});
test("layout shows a true 2-D parent-child structure with no invented connections",async()=>{
  const sandbox={window:{}};
  installCanonical(sandbox);
  vm.runInNewContext(await read("atlas-2d-layout.js"),sandbox);
  const data=sandbox.window.AtlasCanonicalGraph.read();
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
  installCanonical(sandbox);
  vm.runInNewContext(await read("atlas-2d-family.js"),sandbox);
  const snap=sandbox.window.AtlasCanonicalGraph.read();
  const family=sandbox.window.Atlas2DFamily.create(snap);
  const richard=family.family("richard_francis_skinner");
  assert.deepEqual(Array.from(richard.parents.map(p=>p.id)),["john_a_skinner_c1833","marian_lewis_skinner_c1838"]);
  const charles=family.family("charles_albert");
  assert.deepEqual(Array.from(charles.parents.map(p=>p.id)),["charles_godfrey","ida_mae"]);
  assert.ok(charles.coParents.some(p=>p.id==="marian_skinner"));
  assert.ok(charles.children.some(p=>p.id==="marion_brenay"));
  assert.ok(charles.children.some(p=>p.id==="brenay_david"),"Siblings absent from the direct map still appear in nuclear family");
  assert.equal(charles.children.length,13);
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
  installCanonical(sandbox);
  vm.runInNewContext(await read("atlas-2d-layout.js"),sandbox);
  const snap=sandbox.window.AtlasCanonicalGraph.read();
  const mapped=sandbox.window.Atlas2DLayout.create(snap,"you");
  assert.equal(snap.nodes.length,119);
  // Corrected biological links disconnect unsupported candidate branches;
  // those people remain in search without appearing as established ancestors.
  assert.equal(mapped.nodes.length,85);
  const notOnMain=snap.nodes.filter(n=>!mapped.positions.has(n.id));
  assert.equal(notOnMain.length,34);
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
  installCanonical(sandbox);
  vm.runInNewContext(await read("atlas-2d-family.js"),sandbox);
  const fam=sandbox.window.Atlas2DFamily.create(sandbox.window.AtlasCanonicalGraph.read());
  const marion=fam.family("marion_brenay");
  assert.equal(marion.siblingCount,12,"Marion has twelve currently mapped siblings");
  assert.equal(marion.siblings.length,12);
  assert.equal(new Set(marion.siblings.map(s=>s.person.id)).size,12,"shared mothers and fathers must not duplicate siblings");
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
  installCanonical(sandbox);
  vm.runInNewContext(await read("atlas-2d-family.js"),sandbox);
  const index=sandbox.window.Atlas2DFamily.create(sandbox.window.AtlasCanonicalGraph.read());
  const marion=index.family("marion_brenay");
  assert.equal(marion.childGroups.length,1);
  assert.deepEqual(Array.from(marion.childGroups[0].otherParents.map(p=>p.id)),["james_wilford"]);
  assert.deepEqual(Array.from(marion.childGroups[0].children.map(p=>p.id)),["jamar_webb","james_sheldon"]);
  const charles=index.family("charles_albert");
  assert.equal(charles.childGroups.length,1);
  assert.equal(charles.childGroups[0].children.length,13);
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


test("A436 elder Skinner conflict stays evidence-qualified in shared records",async()=>{
 const data=canonicalGraph();
 const john=data.nodes.find(n=>n.id==="john_a_skinner_c1833");
 const marian=data.nodes.find(n=>n.id==="marian_lewis_skinner_c1838");
 assert.ok(john&&marian);
 assert.match(john.note,/1871/);
 assert.match(john.note,/1895/);
 assert.match(john.note,/namesake son/);
 assert.match(marian.note,/1930/);
 assert.match(marian.note,/1897/);
 assert.match(marian.note,/unresolved original-source contradiction/);
 assert.match(marian.note,/private Library/);
 assert.equal(marian.evidence.filter(e=>e.full).length,2,"unpublished originals must not appear as image files");
 assert.equal(data.edges.filter(e=>e.a==="richard_francis_skinner"&&
   ["john_a_skinner_c1833","marian_lewis_skinner_c1838"].includes(e.b)).length,2);
});
