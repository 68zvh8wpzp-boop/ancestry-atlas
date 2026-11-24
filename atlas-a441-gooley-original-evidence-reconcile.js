/* A441 source-only reconciliation for direct Gooley ancestors.
 * Preserve older approved biography modules' full transcriptions and portraits.
 * Attach qualified original-document metadata introduced in A437-A441 only once.
 * No relationship, globe, navigation, or biography text is changed.
 */
(()=>{'use strict';
 if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
 const ids=['ida_mae','john_peter','mary_ann'];
 const preview1901='assets/charles_albert_brunne_1901_census_full.jpg';
 const master1901='assets/john-peter/peter-census-1901.jpg';
 const originals=new Map(ids.map(id=>{
   const node=DATA.nodes.find(n=>n.id===id);
   return [id,(node&&Array.isArray(node.evidence)?node.evidence:[])
       .filter(e=>e&&e.kind==='document'&&e.full)
       .map(e=>({...e}))];
 }));
 function sameSource(existing,incoming){
   if(!existing||existing.kind!=='document'||!existing.full)return false;
   if(existing.full===incoming.full)return true;
   if(incoming.full===master1901&&existing.full===preview1901)return true;
   // One and only one source row per original archival page.
   return !!(existing.sourcePage&&incoming.sourcePage&&
     existing.sourcePage===incoming.sourcePage);
 }
 function apply(){
   for(const id of ids){
     const person=DATA.nodes.find(n=>n.id===id);
     if(!person)return;
     const gallery=Array.isArray(person.evidence)?person.evidence:[];
     for(const item of originals.get(id)||[]){
       const match=gallery.find(e=>sameSource(e,item));
       if(!match){gallery.push({...item});continue;}
       const legacy={...match};
       Object.assign(match,item);
       // Earlier approved modules have longer, documentary full-text readings;
       // never replace those with selected-field annotations.
       if(typeof legacy.transcription==='string'&&
           legacy.transcription.length>(item.transcription||'').length){
         match.transcription=legacy.transcription;
       }
       if(legacy.original_text&&!item.original_text)match.original_text=legacy.original_text;
       if(legacy.originalText&&!item.originalText)match.originalText=legacy.originalText;
       if(legacy.provenance&&!item.provenance)match.provenance=legacy.provenance;
       if(legacy.title)match.title=legacy.title;
       // For 1901 retain the lightweight preview while opening the exact master.
       if(item.full===master1901){match.full=master1901;match.originalAsset=master1901;}
     }
     person.evidence=gallery;
   }
 }
 if(typeof window!=='undefined')window.AtlasA441ApplySourceReconciliation=apply;
})();
