import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");
test("home is the only entry screen; no tabs, bottom bar, or nested Views menu",async()=>{
 const [main,map,shell,css]=await Promise.all([
  read("atlas-v3.9.63.html"),read("atlas-2d-journey-preview.html"),
  read("atlas-four-doors-20261123.js"),read("atlas-four-doors-20261123.css")
 ]);
 assert.ok(main.includes("atlas-four-doors-20261123.js"));
 assert.ok(!main.includes('<script src="atlas-navigation-20261122.js'));
 assert.ok(!map.includes('<script src="./atlas-navigation-20261122.js'));
 assert.match(shell,/section\("home"\)/);
 assert.match(shell,/data-aa-go/);
 assert.match(shell,/profileOrigin/);
 assert.match(shell,/aaSimpleBackHome/);
 assert.match(css,/body\.aa-four-door-shell #mobileTreeDock/);
 assert.match(shell,/history\.pushState/);
});
test("PWA and 2D share the refreshed entry point",async()=>{
 const [main,map,index,manifest]=await Promise.all([
  read("atlas-v3.9.63.html"),read("atlas-2d-journey-preview.html"),
  read("index.html"),read("manifest.webmanifest")
 ]);
 for(const html of [main,map])assert.match(html,/20261123-portrait-crops-v3/);
 assert.match(index,/20261124-artifact-index-v1/);
 assert.match(JSON.parse(manifest).start_url,/20261124-artifact-index-v1/);
 assert.match(map,/atlas-museum-route-20261123\.js/);
});
