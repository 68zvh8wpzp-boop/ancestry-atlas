import assert from "node:assert/strict";
import {test} from "node:test";
import {readFile} from "node:fs/promises";
import vm from "node:vm";
const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");
test("Family, Places and Stories use browser history and restore on Back",async()=>{
 const nav=await read("atlas-navigation-20261122.js");
 assert.doesNotThrow(()=>new vm.Script(nav));
 assert.match(nav,/history\.pushState\(\{atlasSection:section\}/);
 assert.match(nav,/window\.addEventListener\("popstate"/);
 assert.match(nav,/new URLSearchParams\(location\.search\)\.get\("section"\)\|\|"family"/);
 assert.match(nav,/if\(destination!==previous\)recordSection\(destination\)/);
 assert.match(nav,/if\(previous!==next\)recordSection\(next\)/);
 assert.match(nav,/if\(window\.self!==window\.top\)return/);
 assert.ok(!/data\.nodes\.(?:push|splice)|data\.edges\.(?:push|splice)/.test(nav));
});
test("PWA entry and both Atlas views load the fresh navigation script",async()=>{
 const [main,map,index,manifest]=await Promise.all([
   read("atlas-v3.9.63.html"),read("atlas-2d-journey-preview.html"),
   read("index.html"),read("manifest.webmanifest")
 ]);
 for(const html of [main,map]){
   assert.match(html,/atlas-navigation-20261122\.js\?v=20261122-atlas-nav-v4-history/);
 }
 assert.match(index,/20261122-atlas-nav-v4-history/);
 assert.match(JSON.parse(manifest).start_url,/20261122-atlas-nav-v4-history/);
});
