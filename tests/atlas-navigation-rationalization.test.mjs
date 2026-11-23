import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";

const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");

test("main and 2D map use the same three-section navigation",async()=>{
 const [main,map,nav,style,index,manifest]=await Promise.all([
  read("atlas-v3.9.63.html"),read("atlas-2d-journey-preview.html"),
  read("atlas-navigation-20261122.js"),read("atlas-navigation-20261122.css"),
  read("index.html"),read("manifest.webmanifest")
 ]);
 assert.doesNotThrow(()=>new vm.Script(nav));
 for(const page of [main,map]){
  assert.match(page,/atlas-navigation-20261122\.js/);
  assert.match(page,/atlas-navigation-20261122\.css/);
 }
 for(const section of ["family","places","stories"])assert.ok(nav.includes('data-aa-section="'+section+'"'));
 assert.match(nav,/if\(window\.self!==window\.top\)return/);
 assert.match(nav,/section=.+encodeURIComponent\(section\)/);
 assert.match(nav,/AncestryAtlasPedigreePreview\?\.open/);
 assert.match(nav,/selectPerson\?\.\(id,false\)/);
 assert.match(nav,/2d/);
 assert.match(nav,/3d/);
 assert.match(nav,/fan/);
 assert.match(nav,/openAlbum/);
 assert.match(nav,/aaStoriesPanel/);
 assert.match(nav,/function updateStoriesAfterTour\(/);
 assert.match(nav,/new MutationObserver\(updateStoriesAfterTour\)/);
 assert.match(style,/#aaPrimaryNav/);
 assert.match(style,/#aaPlacesPanel/);
 assert.match(index,/20261122-atlas-nav-v6-globe/);
 assert.match(JSON.parse(manifest).start_url,/20261122-atlas-nav-v6-globe/);
});

test("Family remains default and Places records do not invent coordinates",async()=>{
 const [nav,main,explorer]=await Promise.all([
  read("atlas-navigation-20261122.js"),
  read("atlas-v3.9.63.html"),
  read("iphone-ancestry-explorer-preview.js")
 ]);
 assert.match(nav,/var entry=query\.get\("section"\)\|\|"family"/);
 assert.match(nav,/else showFamily\(incomingPerson\)/);
 assert.match(nav,/Location mentions are not proof of birth or residence/);
 assert.match(nav,/Globe pins use approximate place centers/);
 assert.match(explorer,/selectPerson:function\(id,show\)/);
 assert.match(explorer,/function expandTo\(id\)/);
 assert.ok(!/data\.nodes\.(push|splice)|data\.edges\.(push|splice)|data\.nodes\s*=|data\.edges\s*=/.test(nav));
 const begin=main.indexOf("const DATA = ");
 const end=main.indexOf(";\n",begin);
 assert.ok(begin>=0&&end>begin);
 const data=JSON.parse(main.slice(begin+"const DATA = ".length,end));
 assert.ok(data.nodes.length>80);
 assert.ok(data.nodes.some(n=>n.id==="you"));
 assert.ok(data.nodes.filter(n=>n.place).length>30);
});

test("2D map biography remains isolated from navigation",async()=>{
 const [map,nav,css]=await Promise.all([
  read("atlas-2d-journey-preview.html"),
  read("atlas-navigation-20261122.js"),
  read("atlas-navigation-20261122.css")
 ]);
 assert.match(map,/iframe id="bio-frame"/);
 assert.match(nav,/if\(window\.self!==window\.top\)return/);
 assert.match(css,/body:has\(#tree\) #card/);
 assert.match(css,/#pedigreePrototype/);
});
