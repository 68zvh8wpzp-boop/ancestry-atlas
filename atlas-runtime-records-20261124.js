/* Ancestry Atlas runtime record boundary, 24 November 2026.
 *
 * One authoritative identity/relationship graph: AtlasCanonicalGraph.
 * Legacy biography scripts may enrich biographies and source galleries, but
 * never change names, dates/places, relationship grades or parentage.
 * Source attachments stay distinct from proven identities and are retrieved
 * by stable person ID and source locator.
 */
(function(root){
"use strict";
var api=root.AtlasCanonicalGraph,live=root.__ATLAS_DATA;
if(!api||typeof api.read!=="function"||!live)throw Error("Atlas canonical records unavailable");
var canonical=api.read(),byId=new Map(live.nodes.map(function(p){return [p.id,p];}));
var truth=new Map(canonical.nodes.map(function(p){return [p.id,p];}));
var diagnostics=[],protectedKeys=["id","name","years","place","branch","confidence","collateral"];
if(byId.size!==canonical.nodes.length||live.nodes.length!==canonical.nodes.length)
  throw Error("Unexpected person additions or missing canonical people; reconcile genealogy before publication");
function edgeSignature(e){return [e.a,e.b,e.confidence].join("|");}
var expectedEdges=canonical.edges.map(edgeSignature).sort().join("\n"),
    currentEdges=live.edges.map(edgeSignature).sort().join("\n");
if(live.edges.length!==canonical.edges.length||currentEdges!==expectedEdges)
  throw Error("Unexpected genealogy change from a presentation module: parentage or confidence differs");
for(var node of live.nodes){
  var original=truth.get(node.id);
  if(!original)throw Error("Noncanonical person inserted by a view: "+node.id);
  var oldFacts={};
  for(var key of protectedKeys){
    var was=Object.prototype.hasOwnProperty.call(node,key)?node[key]:undefined;
    var trueValue=Object.prototype.hasOwnProperty.call(original,key)?original[key]:undefined;
    if(JSON.stringify(was)!==JSON.stringify(trueValue)){
      oldFacts[key]=was===undefined?null:was;
      diagnostics.push({kind:"legacy-identity-override",id:node.id,field:key});
    }
    // An accessor protects the canonical value even if a late event or legacy
    // script tries another write; biography/evidence arrays remain editable.
    // Keep absent optional fields absent on serialized records.
    if(trueValue===undefined){
      if(Object.prototype.hasOwnProperty.call(node,key))delete node[key];
    }else{
      Object.defineProperty(node,key,{
        enumerable:true,configurable:false,
        get:(function(v){return function(){return v;};})(trueValue),
        set:(function(id,field,v){return function(next){
          if(JSON.stringify(next)!==JSON.stringify(v))
            diagnostics.push({kind:"blocked-late-identity-override",id:id,field:field});
        };})(node.id,key,trueValue)
      });
    }
  }
  if(Object.keys(oldFacts).length)node.legacyDisplayFacts=oldFacts;
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
// No future presentation script may insert another person or a new parent.
for(var edge of live.edges)Object.freeze(edge);
Object.freeze(live.edges);Object.freeze(live.nodes);
function copy(value){return JSON.parse(JSON.stringify(value));}
function hash(str){
  var h=2166136261;
  for(var i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}
  return (h>>>0).toString(36);
}
function sourceLocator(item){
  if(item.originalAsset)return "original:"+item.originalAsset;
  if(item.full)return "full:"+item.full;
  if(item.sourcePage)return "page:"+item.sourcePage;
  if(item.sourceReference)return "ref:"+item.sourceReference;
  if(item.thumb)return "preview:"+item.thumb;
  return "unlocated:"+[item.kind||"",item.title||"",item.date||""].join("|");
}
function evidenceFor(id){
  var node=byId.get(id);if(!node)return [];
  var seen=new Map();
  return (node.evidence||[]).filter(Boolean).map(function(e){
    var locator=sourceLocator(e);
    // The source ID identifies the same document across different ancestor
    // galleries. The artifact ID identifies one person's description of it.
    var sourceId="source:"+hash(locator);
    var key=[id,e.id||"",locator,e.kind||"",e.title||"",e.date||""].join("|");
    var base="artifact:"+hash(key);
    var occurrence=(seen.get(base)||0)+1;seen.set(base,occurrence);
    return Object.freeze({
      id:base+(occurrence>1?"-"+occurrence:""),
      personId:id,sourceId:sourceId,locator:locator,
      hasOriginal:!!e.originalAsset||!!(e.full&&e.sourceLevel==="original"),
      hasImage:!!(e.full||e.thumb),
      record:copy(e)
    });
  });
}
function bySource(sourceId){
  var matches=[];
  for(var p of live.nodes)for(var row of evidenceFor(p.id))
    if(row.sourceId===sourceId)matches.push(row);
  return matches;
}
var service=Object.freeze({
  schema:1,
  readCanonical:function(){return api.read();},
  person:function(id){var person=byId.get(id);return person?copy(person):null;},
  evidenceFor:evidenceFor,
  bySource:bySource,
  diagnostics:function(){return copy(diagnostics);},
  stats:function(){return {people:live.nodes.length,parentLinks:live.edges.length,
    attachedEvidence:live.nodes.reduce(function(n,p){return n+(p.evidence||[]).length;},0),
    overriddenLegacyFacts:diagnostics.filter(function(x){return x.kind==="legacy-identity-override";}).length};}
});
root.AtlasRecordStore=service;
if(root.console&&diagnostics.length)
  root.console.warn("Atlas protected canonical person attributes from legacy presentation overrides:",diagnostics.length);
})(window);
