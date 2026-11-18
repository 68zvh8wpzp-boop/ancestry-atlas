import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";

const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");

test("iPhone explorer is a standalone preview and does not change current entry",async()=>{
  const [current,preview,index,manifest]=await Promise.all([
    read("atlas-v3.9.63.html"),read("atlas-iphone-explorer-preview.html"),read("index.html"),read("manifest.webmanifest")
  ]);
  assert.match(index,/atlas-v3\.9\.63\.html/);
  assert.match(JSON.parse(manifest).start_url,/atlas-v3\.9\.63\.html/);
  assert.ok(!index.includes("atlas-iphone-explorer-preview.html"),"Prototype must remain opt-in");
  assert.ok(!current.includes("iphone-ancestry-explorer-preview.js"),"Original app must not load prototype");
  const expected=current.replace(
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">',
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
  ).replace(
    "<title>Ancestry Atlas v3.9.63 — iPhone hybrid navigation</title>",
    "<title>Ancestry Atlas — iPhone ancestral explorer preview</title>"
  ).replace("</head>",
    '<link rel="stylesheet" href="iphone-ancestry-explorer-preview.css?v=20261117-1">\n</head>'
  ).replace("</body>",
    '<!-- Standalone iPhone journey prototype. Original Atlas remains unchanged. -->\n<script src="iphone-ancestry-explorer-preview.js?v=20261117-1"></script>\n</body>'
  );
  assert.equal(preview,expected,"Prototype must reuse all existing ancestor data and scripts verbatim");
});

test("explorer supports in-place branches, fan overview, and persistent route",async()=>{
  const [js,css]=await Promise.all([
    read("iphone-ancestry-explorer-preview.js"),read("iphone-ancestry-explorer-preview.css")
  ]);
  assert.doesNotThrow(()=>new vm.Script(js));
  for(const feature of [
    "function collectRows(", "function treeHtml(", "function levelsFor(",
    "function fanSvg(", "function overviewHtml(", "function expandTo(",
    "function pathFromYou(", "function renderRecentPath(", 'data-pp-action="back"',
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
  assert.ok(scripts.length>=12);
  scripts.forEach((m,i)=>{if(m[1].trim())assert.doesNotThrow(()=>new vm.Script(m[1]),"script "+i+" failed");});
});
