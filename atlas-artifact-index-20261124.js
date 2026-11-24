/* Ancestry Atlas person-artifact read model.
 * Source authority: canonical person IDs + evidence cards after approved
 * biography/source overlays. This is a live read-only projection, not another
 * copy of genealogy or a replacement for preserved archival image bytes.
 * If an overlay adds an original at DOMContentLoaded, later reads see it.
 */
(function(root){
"use strict";
function source(){return root.__ATLAS_DATA||null;}
function person(id){
  var data=source();
  if(typeof id!=="string"||!data||!Array.isArray(data.nodes))return null;
  return data.nodes.find(function(n){return n.id===id;})||null;
}
function clean(value){return typeof value==="string"?value.trim():"";}
function hash(value){
  // Stable non-cryptographic identifier for UI routing only, never proof.
  var h=2166136261;
  for(var i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,16777619);}
  return (h>>>0).toString(36);
}
function identity(record){
  var direct=clean(record.evidenceId)||clean(record.id)||clean(record.sourceId);
  if(direct)return "id:"+direct;
  // Different originals on one source page must remain separate records.
  return "ref:"+hash([
    clean(record.kind),clean(record.full),clean(record.thumb),clean(record.originalAsset),
    clean(record.sourcePage),clean(record.title),clean(record.date)
  ].join("\u001f"));
}
function localMedia(path){
  var p=clean(path);
  if(!p||/^(?:https?:|data:|blob:|\/\/)/i.test(p)||p.startsWith("/")||p.includes(".."))return false;
  return /^(?:assets\/|[A-Za-z0-9_-]+\/)[^?#]+/i.test(p);
}
function forPerson(id){
  var p=person(id);
  if(!p||!Array.isArray(p.evidence))return [];
  var count=new Map();
  return p.evidence.filter(function(e){return e&&typeof e==="object";}).map(function(e){
    var key=identity(e),seen=count.get(key)||0;count.set(key,seen+1);
    var card=Object.assign({},e);
    card.personId=p.id;
    card.artifactId=p.id+"::"+key+(seen?"~"+(seen+1):"");
    // This flag describes what is packaged, not whether the item is proven.
    card.mediaState=localMedia(e.full||e.thumb)?"local-preview":
      (clean(e.sourcePage)||clean(e.documentUrl)?"source-reference":"no-media");
    return card;
  });
}
function get(id,artifactId){
  return forPerson(id).find(function(c){return c.artifactId===artifactId;})||null;
}
function portrait(id){
  var p=person(id);
  if(!p)return null;
  var entry=root.ATLAS_2D_PORTRAITS?.[id]||p.portrait;
  if(!entry||!entry.url)return null;
  return Object.assign({personId:id},entry);
}
function findByOriginal(path){
  var key=clean(path);if(!key)return [];
  var data=source();if(!data)return [];
  var matched=[];
  data.nodes.forEach(function(p){
    forPerson(p.id).forEach(function(c){
      if([c.full,c.originalAsset,c.thumb].some(function(x){return clean(x)===key;}))
        matched.push({personId:p.id,artifactId:c.artifactId,title:c.title||""});
    });
  });
  return matched;
}
function inspect(){
  var data=source(),issues=[],stats={people:0,evidenceCards:0,localPreviewCards:0,sourceOnlyCards:0,portraits:0};
  if(!data)return {issues:["Canonical person data not available"],stats:stats};
  var known=new Set(data.nodes.map(function(p){return p.id;}));
  stats.people=known.size;
  data.nodes.forEach(function(p){
    var cards=forPerson(p.id);stats.evidenceCards+=cards.length;
    cards.forEach(function(c){
      if(c.mediaState==="local-preview")stats.localPreviewCards++;
      if(c.mediaState==="source-reference")stats.sourceOnlyCards++;
      if(!c.title&&!(c.id||c.evidenceId))issues.push("Unidentified evidence caption for "+p.id);
    });
  });
  Object.keys(root.ATLAS_2D_PORTRAITS||{}).forEach(function(id){
    if(!known.has(id))issues.push("Orphan portrait person ID: "+id);else stats.portraits++;
  });
  return {issues:issues,stats:stats};
}
root.AtlasArtifactIndex=Object.freeze({
  schema:1,person:person,forPerson:forPerson,get:get,portrait:portrait,
  findByOriginal:findByOriginal,inspect:inspect
});
})(window);
