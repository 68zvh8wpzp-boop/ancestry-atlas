import assert from "node:assert/strict";
import {test} from "node:test";
import {readFile} from "node:fs/promises";
import vm from "node:vm";
import {scriptPaths,structuralWrites,verifyLegacyOverlays} from "../atlas-legacy-overlay-gate.mjs";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");

test("all active Atlas pages use one person-ID-keyed artifact read model",async()=>{
 const [html,source]=await Promise.all([read("atlas-v3.9.63.html"),read("atlas-artifact-index-20261124.js")]);
 assert.doesNotThrow(()=>new vm.Script(source));
 assert.match(html,/AtlasArtifactIndex\?\.forPerson\(n\.id\)/);
 assert.match(html,/atlas-artifact-index-20261124\.js\?v=/);
 assert.ok(html.indexOf("atlas-a443-brenay-original-evidence-reconcile.js")<
           html.indexOf("atlas-artifact-index-20261124.js"),"Index follows source overlays");
 assert.ok(html.indexOf("atlas-artifact-index-20261124.js")<
           html.indexOf("atlas-four-doors-20261123.js"),"Index ready before new navigation");
});

test("the artifact API never duplicates people or rewrites source records",async()=>{
 const raw={
  nodes:[
   {id:"p",name:"Person",evidence:[
     {id:"doc-1",kind:"document",title:"Original marriage",full:"assets/marriage.jpg",sourcePage:"https://example.org/original",transcription:"Full original transcript"},
     {kind:"document",title:"Source only",sourcePage:"https://example.org/index",sourceLevel:"index"}
   ]},
   {id:"q",name:"Second",evidence:[{title:"Shared document",kind:"document",full:"assets/marriage.jpg"}]}
  ],
  edges:[{a:"q",b:"p",confidence:"strong"}]
 };
 const before=JSON.stringify(raw),sandbox={window:{__ATLAS_DATA:raw}};
 vm.runInNewContext(await read("atlas-artifact-index-20261124.js"),sandbox);
 const api=sandbox.window.AtlasArtifactIndex;
 assert.equal(api.schema,1);
 const entries=api.forPerson("p");
 assert.equal(entries.length,2);
 assert.ok(entries[0].artifactId.startsWith("p::id:doc-1"));
 assert.equal(entries[0].mediaState,"local-preview");
 assert.equal(entries[1].mediaState,"source-reference");
 assert.equal(api.get("p",entries[0].artifactId).transcription,"Full original transcript");
 entries[0].transcription="Overwritten";
 assert.equal(raw.nodes[0].evidence[0].transcription,"Full original transcript");
 assert.equal(api.findByOriginal("assets/marriage.jpg").length,2,"Source reused across ancestor pages without copying the source file");
 raw.nodes[0].evidence.push({id:"later",title:"Source added by a DOMContentLoaded overlay",sourcePage:"https://example.org/new"});
 assert.equal(api.forPerson("p").length,3,"Late original-gallery reconciliations remain visible");
 assert.equal(raw.nodes.length,2);
 assert.equal(raw.edges.length,1);
 assert.equal(JSON.parse(before).nodes[0].evidence.length,2);
 assert.equal(api.forPerson("unknown").length,0);
 assert.equal(api.inspect().issues.length,0);
});

test("all live legacy genealogy writers are frozen and unknown graph mutations fail",()=>{
 const passed=verifyLegacyOverlays();
 assert.deepEqual(passed.errors,[],passed.errors.join("\n"));
 assert.deepEqual(passed.writers,[
  "atlas-evidence-sync-2026-09-13.js",
  "marion-atlas-update-2026-09-29.js"
 ]);
 assert.ok(passed.scriptsChecked>65,"Inspect both active pages and dynamically written legacy scripts");
 assert.equal(structuralWrites('const records=[]; records.push(1);').length,0);
 assert.equal(structuralWrites('const nodes=DATA.nodes; nodes.push({id:"bad"});').length,1);
 assert.equal(structuralWrites('DATA.edges.push({a:"x",b:"y"});').length,1);
 assert.equal(structuralWrites('DATA.edges=[];').length,1);
 assert.deepEqual(scriptPaths('<script src="./example.js?v=1"></script>'),["example.js"]);
 const rogue=verifyLegacyOverlays({
   pages:['<script src="unapproved.js"></script>'],
   manifest:{schema:1,writers:[]},
   load:()=>'const DATA={nodes:[],edges:[]}; DATA.edges.push({a:"x",b:"y"});',
   sha:()=>"irrelevant"
 });
 assert.match(rogue.errors.join("\n"),/Unexpected live genealogy writer: unapproved\.js/);
});
