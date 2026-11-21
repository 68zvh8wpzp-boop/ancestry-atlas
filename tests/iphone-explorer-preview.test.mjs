import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";

const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");

test("iPhone launch opens the current Atlas with a choice to enter Ancestor Explorer",async()=>{
  const [current,preview,index,manifest,js]=await Promise.all([
    read("atlas-v3.9.63.html"),read("atlas-iphone-explorer-preview.html"),
    read("index.html"),read("manifest.webmanifest"),read("iphone-ancestry-explorer-preview.js")
  ]);
  assert.match(index,/atlas-v3\.9\.63\.html/);
  assert.match(JSON.parse(manifest).start_url,/atlas-v3\.9\.63\.html/);
  assert.match(current,/id="startAncestorExplorer"/);
  assert.match(current,/iphone-ancestry-explorer-preview\.js/);
  assert.match(js,/launch\?\.addEventListener\("click",showExplorer\)/);
  assert.match(preview,/target\.searchParams\.set\("view", "ancestors"\)/);
  assert.match(preview,/location\.replace\(target\)/);
});

test("explorer supports in-place branches, fan overview, and persistent route",async()=>{
  const [js,css]=await Promise.all([
    read("iphone-ancestry-explorer-preview.js"),read("iphone-ancestry-explorer-preview.css")
  ]);
  assert.doesNotThrow(()=>new vm.Script(js));
  for(const feature of [
    "function collectRows(", "function treeHtml(", "function levelsFor(",
    "function fanSvg(", "function overviewHtml(", "function expandTo(",
    "function pathFromYou(", "function renderRecentPath(",
    'var wedge=event.target.closest("[data-pp-fan]")', 'data-pp-action="back"',
    "localStorage.setItem(key", 'data-pp-action="open-profile"'
  ]){
    assert.ok(js.includes(feature),"missing feature "+feature);
  }
  assert.ok(js.includes('originalLanding?.classList.add("hidden")'),"Preview must bypass old landing");
  assert.ok(css.includes("-webkit-overflow-scrolling:touch"),"Scroll must work on iPhone");
  assert.ok(css.includes("#pedigreePrototype[hidden]"),"Overlay must close cleanly");
  assert.ok(!/data\.nodes\s*=|data\.edges\s*=|parentMap\.set\("you"/.test(js),"Navigator must not rewrite genealogy");
});

test("all inline scripts in preview remain syntactically valid",async()=>{
  const html=await read("atlas-iphone-explorer-preview.html");
  const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length,1);
  scripts.forEach((m,i)=>{if(m[1].trim())assert.doesNotThrow(()=>new vm.Script(m[1]),"script "+i+" failed");});
});
