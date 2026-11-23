import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";
const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");

test("entry screen exposes exactly Tree, People, Globe and Stories",async()=>{
 const [main,script,css,map,index,manifest]=await Promise.all([
  read("atlas-v3.9.63.html"),read("atlas-four-doors-20261123.js"),
  read("atlas-four-doors-20261123.css"),read("atlas-2d-journey-preview.html"),
  read("index.html"),read("manifest.webmanifest")
 ]);
 assert.doesNotThrow(()=>new vm.Script(script));
 assert.match(main,/atlas-four-doors-20261123\.js/);
 assert.match(main,/atlas-four-doors-20261123\.css/);
 assert.ok(!main.includes('<script src="atlas-navigation-20261122.js'));
 assert.ok(!main.includes('<script src="iphone-ancestry-explorer-preview.js'));
 assert.ok(!main.includes('<script src="mobile-hybrid-navigation-20261117.js'));
 assert.ok(!map.includes("atlas-navigation-20261122.js"));
 for(const destination of ["tree","people","globe","stories"])assert.match(script,new RegExp('"'+destination+'"'));
 assert.match(script,/function visit\(where\)/);
 assert.match(script,/function section\(next\)/);
 assert.match(script,/section\("home"\)/);
 assert.match(script,/if\(window\.self!==window\.top\)return/);
 assert.match(css,/#aaSimpleHome/);
 assert.ok(!script.includes("aaPrimaryNav"));
 assert.match(index,/20261123-portrait-crops-v2/);
 assert.match(JSON.parse(manifest).start_url,/20261123-portrait-crops-v2/);
});

test("Tree goes directly to portrait-enabled 2D; source pages stay intact",async()=>{
 const [map,mapJS,portraits,main,script]=await Promise.all([
  read("atlas-2d-journey-preview.html"),read("atlas-2d-map.js"),
  read("atlas-2d-portrait-index-20261123.js"),read("atlas-v3.9.63.html"),
  read("atlas-four-doors-20261123.js")
 ]);
 assert.match(script,/atlas-2d-journey-preview\.html\?v=/);
 assert.match(map,/id="aaTreeReturnHome"/);
 assert.match(map,/atlas-2d-portrait-index-20261123\.js/);
 assert.ok(map.indexOf("atlas-2d-portrait-index-20261123.js")<map.indexOf("atlas-2d-map.js"));
 assert.match(mapJS,/drawPortraitOrBust/);
 assert.match(mapJS,/ctx\.drawImage/);
 assert.match(mapJS,/var portraits=window\.ATLAS_2D_PORTRAITS/);
 assert.doesNotThrow(()=>new vm.Script(mapJS));
 const context={window:{}};vm.runInNewContext(portraits,context);
 assert.equal(Object.keys(context.window.ATLAS_2D_PORTRAITS).length,7);
 assert.ok(context.window.ATLAS_2D_PORTRAITS.dorthea_jensen);
 assert.ok(!context.window.ATLAS_2D_PORTRAITS.sarah_carling,"Group photograph is not an individual portrait");
 assert.match(main,/const DATA = /);
 assert.match(map,/iframe id="bio-frame"/);
});

test("People reuses actual biography pages and Globe reuses evidence-bounded places",async()=>{
 const [script,main]=await Promise.all([read("atlas-four-doors-20261123.js"),read("atlas-v3.9.63.html")]);
 assert.match(script,/AtlasPersonSearch\.search\(atlas\.nodes,term,100\)/);
 assert.match(script,/selectPersonSearchResult/);
 assert.match(script,/iframe\.src="\.\/atlas-v3\.9\.63\.html\?from=four-door-person/);
 assert.match(script,/geo\.create\(globePanel/);
 assert.match(script,/document\.getElementById\("startStory"\)/);
 assert.match(script,/updateStoryStatus/);
 assert.ok(main.includes("atlas-geo-places-20261122.js"));
 assert.ok(main.includes("atlas-geographic-globe-20261122.js"));
 assert.ok(!/\.nodes\.(push|splice)|\.edges\.(push|splice)/.test(script));
});
