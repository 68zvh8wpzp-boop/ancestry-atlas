import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";
const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");
import {installCanonical} from "./atlas-test-graph.mjs";
test("2D still retains direct ancestors, optional query person and full biography",async()=>{
 const [map,html,snapshot,layoutSource]=await Promise.all([
   read("atlas-2d-map.js"),read("atlas-2d-journey-preview.html"),
   read("atlas-canonical-family-data.js"),read("atlas-2d-layout.js")
 ]);
 const context={window:{}};
 vm.runInNewContext(snapshot,context);
 vm.runInNewContext(layoutSource,context);
 const data=context.window.AtlasCanonicalGraph.read();
 const layout=context.window.Atlas2DLayout.create(data,"you");
 assert.ok(layout.positions.has("dorthea_jensen"));
 assert.ok(data.nodes.some(n=>n.id==="brenay_david"));
 assert.ok(!layout.positions.has("brenay_david"));
 assert.match(map,/var requestedFromFamily=new URLSearchParams\(location\.search\)\.get\("person"\)/);
 assert.match(map,/if\(unlinkedFromFamily\)openFamily\(unlinkedFromFamily\)/);
 assert.match(map,/contextPerson:familyPersonId\|\|selected/);
 assert.match(html,/atlas-museum-route-20261123\.js/);
 assert.match(html,/iframe id="bio-frame"/);
 assert.ok(!/data\.nodes\.(push|splice)|data\.edges\.(push|splice)/.test(map));
});
test("People and Globe biographies return to the originating destination",async()=>{
 const shell=await read("atlas-four-doors-20261123.js");
 assert.match(shell,/profileOrigin=origin==="globe"\?"globe":"people"/);
 assert.match(shell,/history\.pushState/);
 assert.match(shell,/addEventListener\("popstate"/);
 assert.match(shell,/iframe\.contentWindow/);
 assert.match(shell,/selectPersonSearchResult/);
 assert.match(shell,/if\(window\.self!==window\.top\)return/);
});
