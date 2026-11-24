import assert from "node:assert/strict";
import {test} from "node:test";
import {readFile} from "node:fs/promises";
import vm from "node:vm";
const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");
import {canonicalGraph} from "./atlas-test-graph.mjs";
test("home has four photographic choices, one caption each, and no redundant list",async()=>{
 const [home,css]=await Promise.all([read("atlas-four-doors-20261123.js"),read("atlas-museum-entry-20261123.css")]);
 assert.doesNotThrow(()=>new vm.Script(home));
 for(const slug of ["tree","people","globe","stories"])assert.ok(home.includes('["'+slug+'",')||home.includes(' '+slug+':'));
 for(const photo of ["jay_marion_mesa_1941.png","sheldon_inez_wedding_1965.jpeg","marion_webb_1945.png","James_Sheldon_Webb_TV_Presentation_poster.jpg"])
  assert.ok(home.includes(photo));
 assert.match(home,/renderMiniGlobe/);
 assert.ok(!home.includes("aa-simple-explain"));
 assert.match(css,/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)!important/);
 assert.match(css,/#aaSimpleHome \.aa-simple-explain\{display:none!important\}/);
});
test("globe stays in the viewport, provides From/To + branch dropdowns and shows dotted geodesic paths without identity inventions",async()=>{
 const [js,css,modelJS,source]=await Promise.all([
  read("atlas-geographic-globe-20261122.js"),read("atlas-museum-entry-20261123.css"),
  read("atlas-geo-places-20261122.js"),read("atlas-v3.9.63.html")
 ]);
 assert.doesNotThrow(()=>new vm.Script(js));
 const data=canonicalGraph();
 assert.match(source,/atlas-canonical-family-data\.js/);
 const original=JSON.stringify(data);
 const sandbox={window:{}};vm.runInNewContext(modelJS,sandbox);
 const model=sandbox.window.AtlasGeoPlaces.build(data.nodes,{});
 assert.ok(model.routes.length>10);
 assert.ok(model.routes.some(r=>r.personId==="charles_albert"&&r.from==="arnstein"&&r.to==="arizona"));
 assert.ok(model.routes.every(r=>r.claim.includes("migration unverified")));
 assert.equal(JSON.stringify(data),original);
 for(const id of ["aaGeoBranch","aaGeoFrom","aaGeoTo","aaGeoPaths"])assert.ok(js.includes(id));
 assert.match(js,/selectedRoutes\(\)\.forEach/);
 assert.ok(!js.includes("if(state.focus)model.routes.forEach"));
 assert.match(js,/Math\.sin\(\(1-t\)\*theta\)\/sin/);
 assert.match(css,/#aaSimpleGlobe \.aa-simple-globe-wrap/);
 assert.match(css,/overflow:hidden!important;padding:calc\(67px/);
 assert.match(js,/detail.hidden=true/);
 assert.ok(!js.includes("aa-geo-index"),"No permanently displayed alphabetical place list");
});
test("shared person pages and 2D family cards show source-linked siblings and grouped children as swipeable photo strips",async()=>{
 const [component,css,canonical,treeHtml,treeJs]=await Promise.all([
  read("atlas-family-portrait-ui-20261123.js"),read("atlas-family-portrait-ui-20261123.css"),
  read("atlas-v3.9.63.html"),read("atlas-2d-journey-preview.html"),read("atlas-2d-map.js")
 ]);
 assert.doesNotThrow(()=>new vm.Script(component));
 assert.doesNotThrow(()=>new vm.Script(treeJs));
 for(const x of ["atlas-family-portrait-ui-20261123.js","atlas-2d-portrait-index-20261123.js","atlas-2d-family.js"])
  assert.ok(canonical.includes(x));
 for(const x of ["atlas-family-portrait-ui-20261123.js","atlas-family-portrait-ui-20261123.css"])
  assert.ok(treeHtml.includes(x));
 for(const x of ["attachPortrait","enhanceScrollTrack","family.childGroups","family.siblings","No verified historical portrait; anonymous illustrated cameo","fullSourceUrl"])
  assert.ok(component.includes(x));
 assert.match(css,/scroll-snap-type:x mandatory/);
 assert.match(treeJs,/enhanceScrollTrack\(target\)/);
 assert.match(treeJs,/enhanceScrollTrack\(list\)/);
 assert.match(treeJs,/family-person-action/);
 assert.match(treeJs,/openBiography\(button\.dataset\.aaFamilyPerson\)/);
 assert.ok(!/\.nodes\.(?:push|splice)|\.edges\.(?:push|splice)/.test(component));
});
test("PWA and main globe renderer have fresh installed-app cache tokens",async()=>{
 const [index,manifest,main,tree,nav]=await Promise.all([
  read("index.html"),read("manifest.webmanifest"),read("atlas-v3.9.63.html"),
  read("atlas-2d-journey-preview.html"),read("atlas-four-doors-20261123.js")
 ]);
 for(const x of [index,JSON.parse(manifest).start_url,main,nav])assert.match(x,/20261124-identity-guard-v2/);
 assert.match(tree,/atlas-2d-map\.js\?v=20261124-identity-guard-v2/);
 assert.match(main,/atlas-geographic-globe-20261122\.js\?v=20261124-identity-guard-v2/);
});

test("origin and destination changes rotate the globe to a spherical midpoint without asserting migration",async()=>{
 const [renderer,modelJS,source]=await Promise.all([
  read("atlas-geographic-globe-20261122.js"),read("atlas-geo-places-20261122.js"),read("atlas-v3.9.63.html")
 ]);
 assert.doesNotThrow(()=>new vm.Script(renderer));
 assert.match(renderer,/function centerOnSummaryRoute\(\)/);
 assert.match(renderer,/Math\.atan2\(y,x\)\/RAD/);
 assert.match(renderer,/Math\.atan2\(v,Math\.hypot\(x,y\)\)\/RAD/);
 assert.match(renderer,/fromControl\.addEventListener\("change"[\s\S]*?centerOnSummaryRoute\(\);updateDetail\(\);render\(\)/);
 assert.match(renderer,/toControl\.addEventListener\("change"[\s\S]*?centerOnSummaryRoute\(\);updateDetail\(\);render\(\)/);
 const records=canonicalGraph();
 const sandbox={window:{}};vm.runInNewContext(modelJS,sandbox);
 const routes=sandbox.window.AtlasGeoPlaces.build(records.nodes,{}).routes;
 assert.ok(routes.some(r=>r.personId==="charles_albert"&&r.from==="arnstein"&&r.to==="arizona"));
 assert.ok(routes.every(r=>r.claim.includes("migration unverified")));
});

test("no-photo fallback is an identifiable archival cameo rather than a weak generic bust",async()=>{
 const [art,familyUI,familyCSS,treeJS,personHTML,treeHTML,mainManifest]=await Promise.all([
  read("assets/atlas-anonymous-cameo-20261123.svg"),read("atlas-family-portrait-ui-20261123.js"),
  read("atlas-family-portrait-ui-20261123.css"),read("atlas-2d-map.js"),
  read("atlas-v3.9.63.html"),read("atlas-2d-journey-preview.html"),
  read("manifest.webmanifest")
 ]);
 assert.match(art,/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 320 380"/);
 assert.match(art,/NO VERIFIED/);
 assert.match(art,/PORTRAIT/);
 assert.match(art,/not a historical photograph or depiction/);
 assert.match(art,/linearGradient/);
 assert.match(art,/ellipse/);
 assert.doesNotThrow(()=>new vm.Script(familyUI));
 assert.doesNotThrow(()=>new vm.Script(treeJS));
 assert.match(familyUI,/cameo\.src="\.\/assets\/atlas-anonymous-cameo-20261123\.svg"/);
 assert.match(familyUI,/No verified historical portrait; anonymous illustrated cameo/);
 assert.match(familyCSS,/\.aa-family-photo \.aa-archival-cameo/);
 assert.match(treeJS,/atlasAnonymousCameo\.src="\.\/assets\/atlas-anonymous-cameo-20261123\.svg"/);
 assert.match(personHTML,/function renderPortrait\(n\)/);
 assert.match(personHTML,/No verified portrait · anonymous archival illustration/);
 assert.ok(personHTML.includes("assets/atlas-anonymous-cameo-20261123.svg"));
 assert.match(treeHTML,/atlas-2d-map\.js\?v=20261124-identity-guard-v2/);
 assert.match(JSON.parse(mainManifest).start_url,/20261124-identity-guard-v2/);
});
