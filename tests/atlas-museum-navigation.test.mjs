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
 for(const photo of ['jay_marion_mesa_1941.png','marion_webb_1945.png','James_Sheldon_Webb_TV_Presentation_poster.jpg'])assert.ok(entry.includes(photo));
 assert.match(entry,/aaHomeMiniGlobe/);
 assert.ok(!entry.includes('aa-simple-explain'),"Remove the duplicate vertical destination descriptions");
 assert.match(css,/#aaSimpleHome .aa-simple-doors/);
 assert.match(css,/Georgia/);
 assert.match(html,/atlas-museum-entry-20261123\.css\?v=20261124-identity-guard-v2/);
 assert.match(html,/atlas-four-doors-20261123\.js\?v=20261124-globe-link-v1/);
 assert.match(index,/20261124-identity-guard-v2/);
 assert.match(JSON.parse(manifest).start_url,/20261124-identity-guard-v2/);
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

test("legacy globe bookmarks open the canonical globe and retain person context",async()=>{
 const [legacy,entry,globe]=await Promise.all([
  read("atlas-globe.html"),read("atlas-four-doors-20261123.js"),read("atlas-geographic-globe-20261122.js")
 ]);
 const script=legacy.match(/<script>([\s\S]*?)<\/script>/)[1];
 let redirected;
 vm.runInNewContext(script,{
  URLSearchParams,
  location:{search:"?person=marion_brenay",replace(url){redirected=url;}}
 });
 const url=new URL(redirected,"https://example.test/ancestry-atlas/atlas-globe.html");
 assert.equal(url.pathname,"/ancestry-atlas/atlas-v3.9.63.html");
 assert.equal(url.searchParams.get("view"),"globe");
 assert.equal(url.searchParams.get("person"),"marion_brenay");
 assert.match(entry,/atlas.nodes.some\(function\(p\)\{return p.id===requestedPerson;/);
 assert.match(entry,/globeInstance\?\.selectPerson\(profileId\)/);
 assert.doesNotThrow(()=>new vm.Script(globe));
});
