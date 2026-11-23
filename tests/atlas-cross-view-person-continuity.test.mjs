import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";

const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");
test("2D view preserves an existing direct ancestor by URL, not old camera state",async()=>{
  const [nav,map,html]=await Promise.all([
    read("atlas-navigation-20261122.js"),read("atlas-2d-map.js"),
    read("atlas-2d-journey-preview.html")
  ]);
  assert.doesNotThrow(()=>new vm.Script(nav));
  assert.doesNotThrow(()=>new vm.Script(map));
  assert.match(nav,/var id=currentPerson\(\);/);
  assert.match(nav,/&person="\+encodeURIComponent\(id\)/);
  assert.match(map,/var requestedFromFamily=new URLSearchParams\(location\.search\)\.get\("person"\)/);
  assert.match(map,/selected=requestedFromFamily;ready=false/);
  assert.match(map,/measureCanvas\(\);\nstore\(\)/);
  assert.match(html,/atlas-2d-map\.js\?v=20261122-context-v1/);
});
test("collateral persons open in existing 2D family portrait without invented pedigree links",async()=>{
  const [nav,map,snapshotSource,layoutSource]=await Promise.all([
    read("atlas-navigation-20261122.js"),read("atlas-2d-map.js"),
    read("atlas-2d-pedigree-snapshot.js"),read("atlas-2d-layout.js")
  ]);
  const context={window:{}};
  vm.runInNewContext(snapshotSource,context);
  vm.runInNewContext(layoutSource,context);
  const data=context.window.ATLAS_2D_PEDIGREE;
  const layout=context.window.Atlas2DLayout.create(data,"you");
  assert.ok(layout.positions.has("dorthea_jensen"),"Known direct ancestor remains mapped");
  assert.ok(data.nodes.some(n=>n.id==="brenay_david"));
  assert.ok(!layout.positions.has("brenay_david"),"Collateral record must stay off direct 2D map");
  assert.match(map,/unlinkedFromFamily=requestedFromFamily/);
  assert.match(map,/if\(unlinkedFromFamily\)openFamily\(unlinkedFromFamily\)/);
  assert.match(map,/familyPersonId=personId/);
  assert.match(map,/contextPerson:familyPersonId\|\|selected/);
  assert.match(nav,/if\(live\?\.contextPerson\)return live\.contextPerson/);
  assert.ok(!/data\.nodes\.(push|splice)|data\.edges\.(push|splice)/.test(map));
});
test("PWA and inline HTML use refreshed person-context navigation",async()=>{
  const [index,manifest,atlas,nav]=await Promise.all([
    read("index.html"),read("manifest.webmanifest"),
    read("atlas-v3.9.63.html"),read("atlas-navigation-20261122.js")
  ]);
  for(const s of [index,JSON.parse(manifest).start_url,atlas])assert.match(s,/20261122-atlas-nav-v6-globe/);
  assert.match(nav,/20261122-atlas-nav-v6-globe/);
  assert.match(nav,/function mainUrl\(section\)/);
  assert.match(nav,/currentPerson\(\)/);
});
