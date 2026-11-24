/* Atlas release-integrity gate.
 * Verifies the current base graph against the independent 2D projection.
 * Existing differences are frozen, not promoted as historical proof.
 * No network calls, no database writes, no changes to any person or image.
 */
import {existsSync,readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {dirname,resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {runInNewContext} from "node:vm";
import {checkCanonicalGraph} from "./atlas-graph-integrity-gate.mjs";

const ROOT=dirname(fileURLToPath(import.meta.url));
const allowedConfidence=new Set(["confirmed","strong","provisional","frontier"]);
function key(e){return e.a+"|"+e.b;}
function read(p){return readFileSync(resolve(ROOT,p),"utf8");}
export function parseMainBase(source){
  const start=source.indexOf("const DATA = ");
  const finish=source.indexOf(";\n",start);
  if(start<0||finish<0)throw Error("Canonical DATA base not found in main Atlas");
  return JSON.parse(source.slice(start+"const DATA = ".length,finish));
}
export function parse2DMirror(source){
  const match=source.match(/window\.ATLAS_2D_PEDIGREE\s*=\s*(\{[\s\S]*\});/);
  if(!match)throw Error("2D family snapshot missing");
  return JSON.parse(match[1]);
}
export function parsePortraits(source){
  const match=source.match(/window\.ATLAS_2D_PORTRAITS\s*=\s*(\{[\s\S]*?\});/);
  if(!match)throw Error("Portrait registry missing");
  return JSON.parse(match[1]);
}
export function validateIntegrity({base,mirror,contract,portraits,mainMarkup="",treeMarkup="",indexMarkup="",manifest=null,assetExists=()=>true,assetGitBlobSha=null}){
  const errors=[],warnings=[],counts={basePeople:base?.nodes?.length||0,baseLinks:base?.edges?.length||0,
    familyPeople:mirror?.nodes?.length||0,familyLinks:mirror?.edges?.length||0,
    identifiedPortraits:Object.keys(portraits||{}).length};
  const report=(m)=>errors.push(m);
  if(contract?.schema!==1)report("Graph-sync contract schema must be 1");
  if(!Array.isArray(base?.nodes)||!Array.isArray(base?.edges)||!Array.isArray(mirror?.nodes)||!Array.isArray(mirror?.edges))
    return {errors:["Main or 2D graph missing nodes/edges"],warnings,counts};
  if(!contract||!Array.isArray(contract.snapshotOnlyPeople)||!Array.isArray(contract.snapshotOnlyEdges)||
      !Array.isArray(contract.baseEdgesExplicitlySuppressed)||!Array.isArray(contract.commonEdgeConfidenceExceptions)||
      !Array.isArray(contract.forbiddenKnownBadEdges)||!Array.isArray(contract.mirrorOnlyNotInCurrentPersonRuntime)||
      !Array.isArray(contract.legacyRemotePortraits))
    return {errors:["Graph bridge contract incomplete"],warnings,counts};
  const gmaps={};
  function validateGraph(name,graph){
    const id=new Map(),seenEdges=new Set(),parentIndex=new Map();
    for(const n of graph.nodes){
      if(!n?.id||typeof n.id!=="string")report(name+" person missing stable ID");
      else if(id.has(n.id))report(name+" duplicate person ID "+n.id);
      else id.set(n.id,n);
      if(!n?.name?.trim())report(name+" person without name "+n?.id);
      if(!allowedConfidence.has(n?.confidence))report(name+" unsupported person confidence "+n?.id+": "+n?.confidence);
    }
    for(const e of graph.edges){
      if(!e?.a||!e?.b){report(name+" incomplete parent edge");continue;}
      if(e.a===e.b)report(name+" self-parent link "+key(e));
      if(!id.has(e.a)||!id.has(e.b))report(name+" edge with missing person "+key(e));
      if(seenEdges.has(key(e)))report(name+" duplicate parent edge "+key(e));
      seenEdges.add(key(e));
      if(!allowedConfidence.has(e.confidence))report(name+" unsupported edge confidence "+key(e));
      if(["provisional","frontier"].includes(id.get(e.b)?.confidence)&&["confirmed","strong"].includes(e.confidence))
        report(name+" strong ancestry edge leading into unproven parent "+key(e));
      parentIndex.set(e.a,[...(parentIndex.get(e.a)||[]),e.b]);
    }
    for(const [person,parents] of parentIndex)if(parents.length>2)
      report(name+" more than two mapped biological parents; investigate relation type "+person);
    const active=new Set(),done=new Set(),cycles=new Set();
    function walk(n){
      if(active.has(n)){cycles.add(n);return;}
      if(done.has(n))return;
      active.add(n);for(const p of parentIndex.get(n)||[])walk(p);
      active.delete(n);done.add(n);
    }
    for(const idv of id.keys())walk(idv);
    if(cycles.size)report(name+" parentage cycle involving "+[...cycles].join(", "));
    gmaps[name]={ids:id,edges:new Map(graph.edges.map(e=>[key(e),e]))};
  }
  validateGraph("base",base);validateGraph("family",mirror);
  const b=gmaps.base,f=gmaps.family;
  for(const [id,n] of b.ids){
    const counterpart=f.ids.get(id);
    if(!counterpart){report("Base person not present in 2D family mirror: "+id);continue;}
    for(const field of ["name","years","place","branch","confidence"]){
      if((n[field]??"")!==(counterpart[field]??""))
        report("Person field drift "+id+"."+field+": base="+JSON.stringify(n[field])+", family="+JSON.stringify(counterpart[field]));
    }
    if(Boolean(n.collateral)!==Boolean(counterpart.collateral))
      report("Collateral classification drift "+id);
  }
  const allowedPeople=new Map(),allowedEdges=new Map(),allowedSuppressed=new Map(),confidenceDiffs=new Map();
  for(const row of contract.snapshotOnlyPeople){
    if(!row.id||!row.reason||row.reason.length<25||allowedPeople.has(row.id))report("Invalid or duplicate 2D-only person exception "+row.id);
    else allowedPeople.set(row.id,row);
  }
  for(const row of contract.snapshotOnlyEdges){
    if(!row.a||!row.b||!row.reason||row.reason.length<25||allowedEdges.has(key(row)))report("Invalid or duplicate 2D-only edge exception "+key(row));
    else allowedEdges.set(key(row),row);
  }
  for(const row of contract.baseEdgesExplicitlySuppressed){
    if(!row.a||!row.b||!row.reason||row.reason.length<25||allowedSuppressed.has(key(row)))report("Invalid or duplicate suppressed edge "+key(row));
    else allowedSuppressed.set(key(row),row);
  }
  for(const row of contract.commonEdgeConfidenceExceptions){
    if(!row.a||!row.b||!allowedConfidence.has(row.base)||!allowedConfidence.has(row.mirror)||!row.review||
      row.review.length<25||confidenceDiffs.has(key(row)))report("Invalid confidence-drift exception "+key(row));
    else confidenceDiffs.set(key(row),row);
  }
  for(const id of f.ids.keys())if(!b.ids.has(id)&&!allowedPeople.has(id))
    report("Unregistered 2D-only person "+id);
  for(const id of allowedPeople.keys())if(b.ids.has(id)||!f.ids.has(id))
    report("Stale 2D-only person exception "+id);
  for(const [edge,e] of f.edges){
    if(!b.edges.has(edge)){
      const ex=allowedEdges.get(edge);
      if(!ex)report("Unregistered 2D-only parentage "+edge);
      else if(e.confidence!==ex.confidence)report("2D-only edge confidence drift "+edge+" from "+ex.confidence+" to "+e.confidence);
    }
  }
  for(const edge of allowedEdges.keys())if(b.edges.has(edge)||!f.edges.has(edge))
    report("Stale 2D-only edge exception "+edge);
  for(const [edge,e] of b.edges){
    if(!f.edges.has(edge)){
      if(!allowedSuppressed.has(edge))report("Base parentage missing in 2D without recorded correction "+edge);
    }else{
      const other=f.edges.get(edge);
      if(e.confidence!==other.confidence){
        const ex=confidenceDiffs.get(edge);
        if(!ex||ex.base!==e.confidence||ex.mirror!==other.confidence)
          report("Unregistered evidence-confidence drift "+edge+" base="+e.confidence+" 2D="+other.confidence);
      }
    }
  }
  for(const edge of allowedSuppressed.keys())if(!b.edges.has(edge)||f.edges.has(edge))
    report("Stale suppressed edge exception "+edge+"; reconcile canonical base");
  for(const edge of confidenceDiffs.keys())if(!b.edges.has(edge)||!f.edges.has(edge)||
      b.edges.get(edge).confidence===f.edges.get(edge).confidence)
    report("Stale edge-confidence exception "+edge);
  for(const row of contract.forbiddenKnownBadEdges){
    if(!row.reason||row.reason.length<10)report("Known bad edge lacks rationale "+key(row));
    if(b.edges.has(key(row))||f.edges.has(key(row)))
      report("Previously rejected parentage reintroduced: "+key(row));
  }
  // Runtime people are still patched into the HTML after the static DATA block.
  // Existing names absent from that markup are explicitly quarantined until
  // their original-evidence audit chooses a correct cross-view representation.
  if(mainMarkup){
    const start=mainMarkup.indexOf("const DATA = "),cut=mainMarkup.indexOf(";\n",start);
    const tail=cut>=0?mainMarkup.slice(cut+2):"";
    const missing=[];
    for(const id of allowedPeople.keys())if(!tail.includes(id))missing.push(id);
    const acknowledged=new Set(contract.mirrorOnlyNotInCurrentPersonRuntime.map(x=>x.id));
    for(const id of missing){
      if(!acknowledged.has(id))report("2D-only person not found in main runtime patches and not quarantined: "+id);
      else warnings.push("PENDING CROSS-VIEW PERSON RECONCILIATION: "+id);
    }
    for(const id of acknowledged)if(!missing.includes(id))
      report("Stale runtime-absence quarantine for "+id+"; review person visibility");
  }
  if(portraits&&typeof portraits==="object"){
    const encounteredRemote=new Set();
    const historicalRemote=new Map(contract.legacyRemotePortraits.map(x=>[x.id+"|"+x.url,x]));
    for(const [id,entry] of Object.entries(portraits)){
      if(!f.ids.has(id))report("Portrait registry references unknown Atlas person: "+id);
      for(const photo of [entry,...(entry.alternatePortraits||[])]){
        if(typeof photo.url!=="string"||!photo.url.trim()){report("Missing portrait URL for "+id);continue;}
        if(typeof photo.title!=="string"||!photo.title.trim()||
          typeof photo.provenance!=="string"||!photo.provenance.trim())
          report("Unattributed portrait without title/provenance for "+id);
        if(photo.crop!==undefined){
          const c=photo.crop;
          if(!Array.isArray(c)||c.length!==4||c.some(n=>typeof n!=="number"||!Number.isFinite(n)||n<0||n>1)||
            c[0]+c[2]>1.0001||c[1]+c[3]>1.0001||c[2]===0||c[3]===0)
            report("Invalid portrait crop bounds "+id);
          if(!photo.identityEvidence?.trim())report("Unidentified crop subject "+id);
        }
        if(/^http:\/\//i.test(photo.url))report("Unsecured remote portrait URL "+id);
        else if(/^https:\/\//i.test(photo.url)){
          const remoteKey=id+"|"+photo.url;
          encounteredRemote.add(remoteKey);
          const grandfathered=historicalRemote.get(remoteKey);
          if(!grandfathered?.review||grandfathered.review.length<25)
            report("New remote-only portrait without locally preserved original: "+id+" "+photo.url);
          else warnings.push("LEGACY REMOTE IMAGE TO ARCHIVE: "+id);
        }else{
          if(photo.url.startsWith("/")||photo.url.includes(".."))report("Unsafe portrait path "+id+": "+photo.url);
          else if(!assetExists(photo.url))report("Missing local original portrait "+id+": "+photo.url);
          if(!/^[0-9a-f]{40}$/.test(photo.sourceBlobSha||""))
            report("Local portrait missing immutable source Git blob SHA: "+id+" "+photo.url);
          else if(assetGitBlobSha&&assetExists(photo.url)&&assetGitBlobSha(photo.url)!==photo.sourceBlobSha)
            report("Original portrait bytes changed unexpectedly: "+id+" "+photo.url);
        }
      }
    }
    for(const label of historicalRemote.keys())if(!encounteredRemote.has(label))
      report("Stale remote-portrait dependency exception: "+label);
  }
  if(mainMarkup&&treeMarkup&&indexMarkup&&manifest){
    for(const file of ["jay_marion_mesa_1941.png","sheldon_inez_wedding_1965.jpeg",
      "james_sheldon_with_siblings_c1951.png","marion_webb_1945.png",
      "James_Sheldon_Webb_TV_Presentation_poster.jpg","assets/atlas-anonymous-cameo-20261123.svg"])
      if(!assetExists(file))report("Missing four-door home illustration or cameo "+file);
    for(const file of ["atlas-four-doors-20261123.js","atlas-family-portrait-ui-20261123.js","atlas-geographic-globe-20261122.js"]){
      if(!mainMarkup.includes(file))report("Main app missing required view script "+file);
    }
    for(const file of ["atlas-2d-pedigree-snapshot.js","atlas-2d-family.js","atlas-family-portrait-ui-20261123.js"])
      if(!treeMarkup.includes(file))report("2D view missing graph/portrait integration "+file);
    if(!indexMarkup.includes("atlas-v3.9.63.html"))report("Homepage redirects away from canonical Atlas");
    if(!manifest.start_url?.includes("atlas-v3.9.63.html"))report("Installed app starts on a different Atlas");
    if(!mainMarkup.includes('id="card"')||!mainMarkup.includes('id="personHeader"'))
      report("Full biography reader lost its person-page surface");
    if(!mainMarkup.includes("card.dataset.atlasPersonId=id")||
       !mainMarkup.includes("function openNode(id"))
      report("Person selection does not preserve stable canonical ID");
    if(!mainMarkup.includes("No verified portrait"))
      report("No-photo state missing explicit provenance disclosure");
  }
  return {errors,warnings,counts};
}

export function validateRepository(){
  // The original legacy bridge validator above remains available for bounded
  // negative regression fixtures; it is NOT a live family-data authority.
  const source=read("atlas-canonical-family-data.js"),sandbox={window:{}};
  try{runInNewContext(source,sandbox,{timeout:8000});}
  catch(error){return {errors:["Canonical graph cannot load: "+error.message],warnings:[],counts:{}};}
  const canonical=sandbox.window.AtlasCanonicalGraph.read();
  const portraits=parsePortraits(read("atlas-2d-portrait-index-20261123.js"));
  const legacy=JSON.parse(read("ATLAS_GRAPH_SYNC_CONTRACT.json"));
  const contract={
    schema:1,snapshotOnlyPeople:[],snapshotOnlyEdges:[],
    baseEdgesExplicitlySuppressed:[],commonEdgeConfidenceExceptions:[],
    forbiddenKnownBadEdges:legacy.forbiddenKnownBadEdges,
    mirrorOnlyNotInCurrentPersonRuntime:[],
    legacyRemotePortraits:legacy.legacyRemotePortraits
  };
  const result=validateIntegrity({
    base:canonical,mirror:JSON.parse(JSON.stringify(canonical)),
    contract,portraits,
    assetExists:(relative)=>existsSync(resolve(ROOT,relative)),
    assetGitBlobSha:(relative)=>{
      const original=readFileSync(resolve(ROOT,relative));
      return createHash("sha1").update("blob "+original.length+"\\0").update(original).digest("hex");
    }
  });
  result.errors.push(...checkCanonicalGraph());
  const main=read("atlas-v3.9.63.html");
  if(!main.includes("card.dataset.atlasPersonId=id")||
     !read("atlas-family-portrait-ui-20261123.js").includes("var activeId=card.dataset.atlasPersonId"))
    result.errors.push("Stable person-ID binding missing in biography or family carousel");
  return result;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const result=validateRepository();
  console.log(JSON.stringify(result,null,2));
  if(result.errors.length)process.exitCode=1;
}
