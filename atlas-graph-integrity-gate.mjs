/* Fail-closed integrity gate for the Atlas canonical person/relationship graph.
 * All displayed family links derive from atlas-canonical-family-data.js.
 * The reviewed baseline makes fact/status edits visible in their own diff.
 * Running this does not claim that every research frontier is proved.
 */
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {runInNewContext} from "node:vm";
const root=new URL("./",import.meta.url);
const read=path=>readFileSync(new URL(path,root),"utf8");
export function checkCanonicalGraph(){
  const issues=[];
  const fail=(message)=>issues.push(message);
  const source=read("atlas-canonical-family-data.js"),ctx={window:{}};
  try{runInNewContext(source,ctx,{timeout:8000,filename:"atlas-canonical-family-data.js"});}
  catch(error){fail("Canonical graph does not execute: "+error.message);return issues;}
  const api=ctx.window.AtlasCanonicalGraph;
  if(!api||api.schema!==1||typeof api.read!=="function"){fail("Missing AtlasCanonicalGraph.read() API");return issues;}
  const graph=api.read(),other=api.read(),baseline=JSON.parse(read("data/atlas-approved-graph-baseline.json"));
  const people=graph.nodes||[],edges=graph.edges||[],confidence=new Set(["confirmed","strong","provisional","frontier"]);
  if(graph.nodes===other.nodes||graph.nodes[0]===other.nodes[0])
    fail("Views must receive isolated copies of the same canonical source");
  const ids=new Set(),parents=new Map(),edgeKeys=new Set();
  for(const p of people){
    if(!p?.id||ids.has(p.id)||!p.name||!confidence.has(p.confidence))fail("Invalid person: "+p?.id);
    ids.add(p.id);
  }
  for(const e of edges){
    if(!ids.has(e.a)||!ids.has(e.b)||e.a===e.b||!confidence.has(e.confidence))
      fail("Invalid child-parent relationship "+e.a+" → "+e.b);
    const key=e.a+"|"+e.b;
    if(edgeKeys.has(key))fail("Duplicate parent link "+key);
    edgeKeys.add(key);const arr=parents.get(e.a)||[];arr.push(e.b);parents.set(e.a,arr);
    if(arr.length>2)fail("More than two mapped parents without explicit relationship model: "+e.a);
  }
  let visited=new Set(),visiting=new Set();
  function visit(id){
    if(visiting.has(id)){fail("Ancestry cycle at "+id);return;}
    if(visited.has(id))return;
    visiting.add(id);for(const parent of parents.get(id)||[])visit(parent);
    visiting.delete(id);visited.add(id);
  }
  for(const id of ids)visit(id);
  const nodesBaseline=people.map(n=>({id:n.id,name:n.name,years:n.years||"",branch:n.branch,confidence:n.confidence,collateral:!!n.collateral})).sort((a,b)=>a.id.localeCompare(b.id));
  const edgesBaseline=edges.map(e=>({a:e.a,b:e.b,confidence:e.confidence})).sort((a,b)=>(a.a+"|"+a.b).localeCompare(b.a+"|"+b.b));
  const unionsBaseline=(graph.unions||[]).map(e=>({a:e.a,b:e.b,label:e.label||"",confidence:e.confidence||""})).sort((a,b)=>(a.a+"|"+a.b).localeCompare(b.a+"|"+b.b));
  for(const [label,actual,expected] of [
    ["people",nodesBaseline,baseline.nodes],["parentage",edgesBaseline,baseline.edges],["unions",unionsBaseline,baseline.unions]
  ])if(JSON.stringify(actual)!==JSON.stringify(expected))fail(label+" changed without updating reviewed canonical graph baseline; explicitly reconcile the change");
  for(const kind of ["unions","researchLinks"])
    for(const e of graph[kind]||[])if(!ids.has(e.a)||!ids.has(e.b))fail("Dangling "+kind+" relation "+e.a+" → "+e.b);
  // High-value regression links and negative links. A change must be reviewed
  // as genealogy and cannot be slipped in as a design or biography tweak.
  for(const [child,parent] of [
    ["james_sheldon","james_wilford"],["james_sheldon","marion_brenay"],
    ["marion_brenay","charles_albert"],["charles_albert","charles_godfrey"],
    ["grace_hill","nannie_reed"],["richard_francis_skinner","marian_lewis_skinner_c1838"],
    ["peder_mortensen_1806","morten_pedersen_1771"]
  ])if(!edgeKeys.has(child+"|"+parent))fail("Protected relationship missing "+child+" → "+parent);
  for(const key of ["peder_mortensen_1806|mette_jorg","ann_eliza_webb|brigham_young"])
    if(edgeKeys.has(key))fail("Rejected parentage resurfaced: "+key);
  // The canonical graph must be the ONLY data authority for every live view.
  const main=read("atlas-v3.9.63.html"),tree=read("atlas-2d-journey-preview.html"),treeJS=read("atlas-2d-map.js"),doors=read("atlas-four-doors-20261123.js");
  if(!main.includes('<script src="atlas-canonical-family-data.js?')||
     !main.includes("const DATA = window.AtlasCanonicalGraph.read();"))
    fail("Main person pages no longer consume the canonical graph");
  if(main.indexOf('atlas-canonical-family-data.js')>main.indexOf('const DATA = window.AtlasCanonicalGraph.read();'))
    fail("Main reader loads canonical graph too late");
  if(!tree.includes('<script src="./atlas-canonical-family-data.js?')||
     !treeJS.includes('var data=window.AtlasCanonicalGraph?.read()'))
    fail("Tree/family view no longer consumes the same canonical graph");
  if(!main.includes('window.__ATLAS_DATA = DATA;')||!doors.includes('var atlas=window.__ATLAS_DATA'))
    fail("People/Globe/Stories access not connected to shared person data");
  if(!main.includes("card.dataset.atlasPersonId=id")||
     !read("atlas-family-portrait-ui-20261123.js").includes("var activeId=card.dataset.atlasPersonId"))
    fail("Person identity is being inferred from a label rather than stable canonical ID");
  const legacyV9=read("atlas-evidence-sync-2026-10-03-fulltext-v9.js");
  const recordBoundary=read("atlas-runtime-records-20261124.js");
  if(/DATA\.(?:nodes|edges)\.(?:push|splice|pop|shift|unshift)\(/.test(legacyV9)||
     /\bmap\.set\((?:esther|joan|martha|ammon)\.id/.test(legacyV9))
    fail("Legacy Brenay biography module has recreated a shadow genealogy graph");
  if(!legacyV9.includes("atlasAttachLegacyBrenayEvidence"))
    fail("Brenay photo/letter overlays are no longer attached to canonical person objects");
  if(!main.includes('atlas-runtime-records-20261124.js?')||
     !main.includes("window.AtlasRecordStore.evidenceFor(n.id)"))
    fail("Native person page is bypassing the normalized source/record boundary");
  if(!recordBoundary.includes('protectedKeys=["id","name","years","place","branch","confidence","collateral"]')||
     !recordBoundary.includes("Object.freeze(live.edges)"))
    fail("Canonical runtime guard for core person and parentage fields is missing");
  if(main.indexOf("atlas-runtime-records-20261124.js")<main.indexOf("atlas-evidence-sync-2026-10-03-fulltext-v9.js")||
     main.indexOf("atlas-runtime-records-20261124.js")>main.indexOf("atlas-four-doors-20261123.js"))
    fail("Records boundary must reconcile legacy modules before the live navigation views mount");
  // A new person or biological link is a research/data change, never an
  // append inside a historical biography module. Check every live external
  // script rather than only the four previously affected Brenay siblings.
  const loadedScripts=[...main.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/g)]
    .map(match=>match[1].split("?")[0])
    .filter(name=>!name.startsWith("https:")&&!name.startsWith("http:"));
  for(const file of loadedScripts){
    if(file==="atlas-canonical-family-data.js")continue;
    let source;
    try{source=read(file.replace(/^\.\//,""));}
    catch(error){fail("Referenced Atlas module missing: "+file);continue;}
    if(/\b(?:DATA|data)\.(?:nodes|edges)\.(?:push|splice|pop|shift|unshift)\s*\(/.test(source))
      fail("Active presentation module edits the family graph instead of the canonical source: "+file);
  }
  if(/const DATA = \{"nodes"/.test(main)||/atlas-2d-pedigree-snapshot\.js/.test(tree))
    fail("A second embedded graph or obsolete snapshot has re-entered a live view");
  for(const [path,text] of [["person UI",main],["2D Tree UI",treeJS],["navigation UI",doors]]){
    if(/\b(?:DATA|data|atlas)\.(?:nodes|edges)\.(?:push|splice|pop|shift|unshift)\s*\(|\b(?:DATA|data|atlas)\.edges\s*=/.test(text))
      fail(path+" is changing canonical people/parentage rather than editing the canonical source");
  }
  const portraitSource=read("atlas-2d-portrait-index-20261123.js"),portraitContext={window:{}};
  try{runInNewContext(portraitSource,portraitContext,{timeout:3000});}
  catch(error){fail("Portrait registry could not load: "+error.message);}
  const photos=portraitContext.window.ATLAS_2D_PORTRAITS||{};
  for(const [id,p] of Object.entries(photos)){
    if(!ids.has(id))fail("Portrait no longer matches a canonical person: "+id);
    if(!p.url||!p.provenance)fail("Portrait source attribution missing for "+id);
    if(p.crop&&(!Array.isArray(p.crop)||p.crop.length!==4||p.crop.some(n=>typeof n!=="number"||n<0||n>1)||
      p.crop[0]+p.crop[2]>1.000001||p.crop[1]+p.crop[3]>1.000001))
      fail("Portrait crop escaped the preserved source image for "+id);
  }
  return issues;
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
  const issues=checkCanonicalGraph();
  const source=read("atlas-canonical-family-data.js"),context={window:{}};runInNewContext(source,context,{timeout:8000});
  console.log(JSON.stringify({canonical:"atlas-canonical-family-data.js",stats:context.window.AtlasCanonicalGraph.stats,issues},null,2));
  if(issues.length)process.exitCode=1;
}
