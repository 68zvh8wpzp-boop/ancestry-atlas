/* A443 - Source-only reconciliation for Charles Godfrey Brenay and Charles Albert Brenay.
 * Capture canonical archival original DOCUMENT cards before older approved biographies
 * replace evidence arrays. Merge after those modules, without altering their historical
 * full transcriptions, photos, prose, portraits, family relationships or navigation.
 * One card per original image. Uses existing published source assets only.
 */
(()=>{
'use strict';
if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
const ids=['charles_albert','charles_godfrey'];
const originalCensus='assets/john-peter/peter-census-1901.jpg';
const olderCensusPreview='assets/charles_albert_brunne_1901_census_full.jpg';
const originals=new Map(ids.map(id=>{
  const node=DATA.nodes.find(n=>n.id===id);
  return [id,(node&&Array.isArray(node.evidence)?node.evidence:[])
    .filter(x=>x&&x.kind==='document'&&x.full)
    .map(x=>({...x}))];
}));
function sameSource(a,b){
  if(!a||a.kind!=='document'||!a.full)return false;
  if(a.full===b.full)return true;
  if(b.full===originalCensus&&a.full===olderCensusPreview)return true;
  return !!(a.sourcePage&&b.sourcePage&&a.sourcePage===b.sourcePage);
}
function reconcile(){
 for(const id of ids){
   const node=DATA.nodes.find(n=>n.id===id);
   if(!node)return;
   const gallery=Array.isArray(node.evidence)?node.evidence:[];
   for(const source of originals.get(id)||[]){
     const target=gallery.find(x=>sameSource(x,source));
     if(!target){gallery.push({...source});continue;}
     const legacy={...target};
     Object.assign(target,source);
     // Preserve older approved, more-complete literal source readings.
     if(typeof legacy.transcription==='string'&&
         legacy.transcription.length>(source.transcription||'').length)
       target.transcription=legacy.transcription;
     for(const k of ['original_text','originalText','translation','provenance']){
       if(legacy[k]&&!source[k])target[k]=legacy[k];
     }
     if(legacy.title)target.title=legacy.title;
     if(source.full===originalCensus){
       target.full=originalCensus;
       target.originalAsset=originalCensus;
       // The smaller rendition remains a thumbnail only.
       target.thumb=olderCensusPreview;
     }
   }
   node.evidence=gallery;
 }
}
if(typeof window!=='undefined')window.AtlasA443ReconcileBrenayOriginals=reconcile;
})();
