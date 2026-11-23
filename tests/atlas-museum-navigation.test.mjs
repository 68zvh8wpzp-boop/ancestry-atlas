import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";
const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");
test("four museum destinations keep the original views and an uncluttered landing",async()=>{
 const [html,entry,css,index,manifest]=await Promise.all([
  read("atlas-v3.9.63.html"),read("atlas-four-doors-20261123.js"),
  read("atlas-museum-entry-20261123.css"),read("index.html"),read("manifest.webmanifest")
 ]);
 assert.doesNotThrow(()=>new vm.Script(entry));
 assert.match(entry,/THE FAMILY HISTORY COLLECTION/);
 assert.match(entry,/Ancestry <em>Atlas<\/em>/);
 for(const name of ['tree','people','globe','stories'])assert.match(entry,new RegExp('"'+name+'"'));
 for(const svgClass of ['aa-person-silhouette','aa-globe-land','aa-reel-hole','aa-ink-stroke'])
  assert.ok(entry.includes(svgClass));
 assert.match(css,/#aaSimpleHome .aa-simple-doors/);
 assert.match(css,/Georgia/);
 assert.match(html,/atlas-museum-entry-20261123\.css\?v=20261123-museum-navigation-v1/);
 assert.match(html,/atlas-four-doors-20261123\.js\?v=20261123-museum-navigation-v1/);
 assert.match(index,/20261123-museum-navigation-v1/);
 assert.match(JSON.parse(manifest).start_url,/20261123-museum-navigation-v1/);
});
test("every internal screen keeps top Home Back Forward controls, not the landing",async()=>{
 const [entry,route,routeCss,tree,globe]=await Promise.all([
  read("atlas-four-doors-20261123.js"),read("atlas-museum-route-20261123.js"),
  read("atlas-museum-route-20261123.css"),read("atlas-2d-journey-preview.html"),
  read("atlas-globe.html")
 ]);
 assert.doesNotThrow(()=>new vm.Script(route));
 assert.match(entry,/id="aaSimpleBackHome"/);
 assert.match(entry,/id="aaSimpleBack"/);
 assert.match(entry,/id="aaSimpleForward"/);
 assert.match(entry,/header.hidden=next==="home";/);
 assert.match(entry,/history\.pushState/);
 assert.match(entry,/addEventListener\("popstate"/);
 assert.match(entry,/history\.forward\(\)/);
 assert.match(entry,/closeStorySurface/);
 assert.match(route,/id="aaRouteHome"/);
 assert.match(route,/id="aaRouteBack"/);
 assert.match(route,/id="aaRouteForward"/);
 for(const page of [tree,globe]){
  assert.match(page,/atlas-museum-route-20261123\.js/);
  assert.match(page,/atlas-museum-route-20261123\.css/);
 }
 assert.ok(!tree.includes('id="aaTreeReturnHome"'),"One unified Home, not competing Home bars");
 for(const panel of ["#search-panel","#family-panel","#biography-pane"])
  assert.ok(routeCss.includes(panel),"Top navigation remains above "+panel);
});
test("view changes do not modify genealogy, photo assets or proof classifications",async()=>{
 const [entry,route]=await Promise.all([
  read("atlas-four-doors-20261123.js"),read("atlas-museum-route-20261123.js")
 ]);
 assert.ok(!/\.nodes\.(?:push|splice)|\.edges\.(?:push|splice)/.test(entry));
 assert.ok(!/fetch\(|XMLHttpRequest|sendBeacon/.test(route));
 assert.match(entry,/AtlasPersonSearch\.search/);
 assert.match(entry,/geo\.create/);
 assert.match(entry,/openProfile/);
 assert.match(entry,/startStory/);
});
