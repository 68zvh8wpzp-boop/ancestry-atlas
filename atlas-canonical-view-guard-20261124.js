/* Atlas canonical identity boundary — 24 November 2026.
 * Older biography/gallery modules may add historical notes and source cards,
 * but never replace an ancestor's ID, canonical name, place, year range,
 * confidence, or parent relationship. No extra genealogy copy is created.
 */
(function(root){
"use strict";
var api=root.AtlasCanonicalGraph,live=root.__ATLAS_DATA;
if(!api||typeof api.read!=="function"||!live)throw Error("Atlas canonical graph missing");
var reference=api.read();
var expected=new Map(reference.nodes.map(function(n){return [n.id,n];}));
var actual=new Map(live.nodes.map(function(n){return [n.id,n];}));
if(expected.size!==actual.size||live.nodes.length!==reference.nodes.length)
  throw Error("Presentation added or removed a canonical person: requires source-reviewed graph change");
function edgeKey(e){return [e.a,e.b,e.confidence].join("|");}
var expectedLinks=reference.edges.map(edgeKey).sort().join("\n"),
    actualLinks=live.edges.map(edgeKey).sort().join("\n");
if(reference.edges.length!==live.edges.length||expectedLinks!==actualLinks)
  throw Error("Presentation changed canonical parentage or confidence");
var protectedFields=["id","name","years","place","branch","confidence","collateral"],
    differences=[];

// Source reconciliation: late biography overlays may replace entire galleries.
// Preserve canonical audited references without replacing packaged originals or
// approved long transcriptions. Match exact record ARK or reviewed asset alias;
// never merge solely on a generic shared source page or a person's name.
var auditAssetAliases={
  "3:1:33S7-L1ZT-9PM6":"assets/charles-albert/charles-draft-registration-1918.jpg",
  "3:1:3Q9M-CS6T-WSDS-G":"assets/charles-albert/memory-40-44007_04_00002-00181.jpg",
  "3:1:3QHN-LQH7-TGLJ":"assets/sheldon/james-sheldon-1950-census-viewer.jpg"
};
function auditArk(e){
  var match=String(e.sourcePage||"").match(/ark:\/61903\/([13]:1:[A-Z0-9-]+)/i);
  return match?match[1].toUpperCase():"";
}
function reconcileAuditedSources(node,canonical){
  var sources=(canonical.evidence||[]).filter(function(e){
    return typeof e.provenance==="string"&&/FamilySearch record, reconciled against the November (?:25|26–27), 2026 source audit\./.test(e.provenance);
  });
  if(!sources.length)return;
  var gallery=Array.isArray(node.evidence)?node.evidence:[];
  for(var source of sources){
    var ark=auditArk(source),alias=auditAssetAliases[ark];
    var matching=gallery.filter(function(e){
      return e&&e.kind!=="photo"&&e.kind!=="image"&&
        ((ark&&auditArk(e)===ark)||(alias&&[e.full,e.originalAsset].includes(alias))||e.title===source.title);
    });
    // If both a citation and an existing original are present, retain the original.
    var target=matching.find(function(e){return e.full||e.originalAsset;})||matching[0];
    if(!target){gallery.push(Object.assign({},source));continue;}
    target.sourcePage=source.sourcePage;
    // Retain earlier source-specific detail, adding the audited reading once.
    if(source.summary&&!(target.summary||"").includes(source.summary))
      target.summary=[target.summary,source.summary].filter(Boolean).join(" ");
    if(!target.full&&!target.originalAsset&&source.full){
      target.full=source.full;
      if(source.thumb)target.thumb=source.thumb;
    }
    if(!target.provenance)target.provenance=source.provenance;
    else if(source.provenance&&!target.provenance.includes(source.provenance))
      target.provenance+=" "+source.provenance;
    if(!target.confidence)target.confidence=source.confidence;
    for(var duplicate of matching){
      if(duplicate!==target&&!duplicate.full&&!duplicate.originalAsset&&!duplicate.thumb&&!duplicate.transcription){
        var i=gallery.indexOf(duplicate);if(i!==-1)gallery.splice(i,1);
      }
    }
  }
  node.evidence=gallery;
}

for(var node of live.nodes){
  var canonical=expected.get(node.id);
  if(!canonical)throw Error("Unknown person in live presentation: "+node.id);
  var presentationVariant={};
  for(var field of protectedFields){
    var was=Object.prototype.hasOwnProperty.call(node,field)?node[field]:undefined;
    var authoritative=Object.prototype.hasOwnProperty.call(canonical,field)?canonical[field]:undefined;
    if(JSON.stringify(was)!==JSON.stringify(authoritative)){
      differences.push({personId:node.id,field:field,kind:"legacy-display-override"});
      presentationVariant[field]=was===undefined?null:was;
    }
    if(authoritative===undefined){
      if(Object.prototype.hasOwnProperty.call(node,field))delete node[field];
      continue;
    }
    Object.defineProperty(node,field,{
      enumerable:true,configurable:false,
      get:(function(v){return function(){return v;};})(authoritative),
      set:(function(id,k,v){return function(next){
        if(JSON.stringify(next)!==JSON.stringify(v))
          differences.push({personId:id,field:k,kind:"late-override-blocked"});
      };})(node.id,field,authoritative)
    });
  }
  if(Object.keys(presentationVariant).length)
    node.legacyDisplayFacts=presentationVariant;
  reconcileAuditedSources(node,canonical);
}
if(root.__ATLAS_NODE_BY_ID instanceof Map){
  root.__ATLAS_NODE_BY_ID.clear();
  for(var person of live.nodes)root.__ATLAS_NODE_BY_ID.set(person.id,person);
}
if(typeof parentMap!=="undefined"&&typeof childMap!=="undefined"){
  parentMap.clear();childMap.clear();
  for(var edge of live.edges){
    if(!parentMap.has(edge.a))parentMap.set(edge.a,[]);
    parentMap.get(edge.a).push(edge.b);
    if(!childMap.has(edge.b))childMap.set(edge.b,[]);
    childMap.get(edge.b).push(edge.a);
  }
}
// Future sources may add cited artifacts to a person's evidence array; never
// mutate the family graph itself after the presentation has been initialized.
for(var edge of live.edges)Object.freeze(edge);
Object.freeze(live.edges);Object.freeze(live.nodes);
function audit(){
  var problems=[],currentIDs=new Set();
  for(var p of live.nodes){
    currentIDs.add(p.id);
    var orig=expected.get(p.id);
    if(!orig){problems.push("Unknown person "+p.id);continue;}
    for(var f of protectedFields)
      if(JSON.stringify(p[f])!==JSON.stringify(orig[f]))
        problems.push("Person attribute drift: "+p.id+"."+f);
    if(root.__ATLAS_NODE_BY_ID instanceof Map &&
       root.__ATLAS_NODE_BY_ID.get(p.id)!==p)
      problems.push("Detached person ID map entry: "+p.id);
  }
  if(currentIDs.size!==expected.size)problems.push("Person count mismatch");
  if(live.edges.length!==reference.edges.length||
     live.edges.map(edgeKey).sort().join("\n")!==expectedLinks)
    problems.push("Parent links differ from canonical graph");
  return problems;
}
root.AtlasIdentityGuard=Object.freeze({
  schema:1,audit:audit,
  diagnostics:function(){return differences.map(function(v){return Object.assign({},v);});},
  summary:function(){return {people:live.nodes.length,parentLinks:live.edges.length,
    legacyDisplayDifferences:differences.filter(function(x){return x.kind==="legacy-display-override";}).length};}
});
var findings=audit();
if(findings.length)throw Error("Atlas identity invariant violation: "+findings.join("; "));
})(window);
