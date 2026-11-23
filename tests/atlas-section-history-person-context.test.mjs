import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";
const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");
test("Back restores the Atlas section and selected person without duplicating history",async()=>{
 const nav=await read("atlas-navigation-20261122.js");
 assert.doesNotThrow(()=>new vm.Script(nav));
 for(const marker of [
 'history.pushState({atlasSection:section}', 'window.addEventListener("popstate"',
 'params.get("section")||"family"', 'params.get("person")',
 'params.set("person",personId)', 'if(destination!==previous)recordSection(destination)',
 'if(previous!==next)recordSection(next)', 'if(window.self!==window.top)return'
 ])assert.ok(nav.includes(marker),"missing "+marker);
 assert.ok(!/data\.nodes\.(push|splice)|data\.edges\.(push|splice)/.test(nav));
});
test("Atlas PWA and 2D navigator receive the new script revision",async()=>{
 const [main,map,index,manifest]=await Promise.all([
 read("atlas-v3.9.63.html"),read("atlas-2d-journey-preview.html"),
 read("index.html"),read("manifest.webmanifest")
 ]);
 for(const html of [main,map])assert.match(html,/atlas-navigation-20261122\.js\?v=20261122-atlas-nav-v5-history-context/);
 assert.match(index,/20261122-atlas-nav-v5-history-context/);
 assert.match(JSON.parse(manifest).start_url,/20261122-atlas-nav-v5-history-context/);
});
