/* Richard Francis Skinner: attach unchanged archival originals only after true local previews load.
   The source-link-only state remains valid until the separately verified archive arrives. */
(()=>{'use strict';
if(typeof DATA==='undefined')return;
const person=DATA.nodes.find(n=>n.id==='richard_francis_skinner');
if(!person)return;
const root='assets/richard-skinner/';
const birthName="Birth return for Richard and Ellen's son Marcie Leo";
const parentsName='1894 Marcie Skinner birth return — parents panel';
if(!person.evidence.some(e=>e.title===parentsName)){
 const at=person.evidence.findIndex(e=>e.title===birthName);
 if(at>=0)person.evidence.splice(at+1,0,{
   kind:'document',title:parentsName,date:'1894; recorded 10 June 1895',
   place:'Torch Lake, Antrim County, Michigan',sourceLevel:'original',
   sourcePage:'https://www.familysearch.org/ark:/61903/3:1:S3HT-64JS-J9Y?view=index&action=view&cc=1459684&lang=en',
   summary:'The adjoining 1894 birth return page identifies Richard F. Skinner and Ellen Skinner as the parents of the child entered as Marcia Skinner. Richard was a laborer and the family resided at Torch Lake.',
   provenance:'Original two-page Michigan birth return, Antrim County, 1894, p.119, entry185, DGS 004207150. This is the parents side; an unchanged high-resolution scan has been retained separately.',
   transcription:'FULLTEXT_ORIGINAL: Parents: Richard F. Skinner and Ellen Skinner; residence Torch Lake; both born Michigan; father’s occupation Laborer; date of record June 10, 1895.\nFULLTEXT_TRANSLATION: [not applicable: English-language original]',
   personId:person.id,branch:'Skinner'
 });
}
const entries=[
 {title:'Richard Skinner and Ellen Hay — marriage register',preview:'richard-ellen-marriage-1882-original-preview.jpg',full:'richard-ellen-marriage-1882-original.jpg'},
 {title:birthName,preview:'marcie-skinner-birth-1894-child-original-preview.jpg',full:'marcie-skinner-birth-1894-child-original.jpg'},
 {title:parentsName,preview:'marcie-skinner-birth-1894-parents-original-preview.jpg',full:'marcie-skinner-birth-1894-parents-original.jpg'},
 {title:'Richard and Jessie Skinner household — 1900 census',preview:'richard-skinner-census-1900-original-preview.jpg',full:'richard-skinner-census-1900-original.jpg'},
 {title:'Marcie and Richard Skinner — snowy woodland work photograph',preview:'richard-marcie-logging-memory-218727497-preview.jpg',full:'richard-marcie-logging-memory-218727497.jpg',photo:true},
 {title:'Two men in a studio portrait — Richard Skinner and William Philip Carlton attributed',preview:'richard-william-carlton-memory-31066388-preview.jpg',full:'richard-william-carlton-memory-31066388-display.jpg',original:'richard-william-carlton-memory-31066388.jpg',photo:true}
];
function refresh(){
 try{if(typeof selected!=='undefined'&&selected===person.id&&typeof renderEvidence==='function')renderEvidence(person);}catch(_e){}
}
if(typeof Image==='undefined')return;
for(const entry of entries){
 const item=person.evidence.find(e=>e.title===entry.title);
 if(!item)continue;
 const test=new Image();
 test.onload=()=>{
  item.thumb=root+entry.preview;
  item.full=root+entry.full;
  if(entry.original)item.archivalOriginal=root+entry.original;
  if(entry.photo){
   item.sourceLevel='archived-photo';
   item.previewStatus='Full-resolution photograph installed; original source link retained';
   if(item.provenance)item.provenance=item.provenance.replace(/Source-photo link only until media is packaged in Atlas\./,'The original source image is included in the Atlas archive.').replace(/Original orientation retained\./,'Original orientation retained in separate archival copy.');
  }else{
   item.previewIsDerived=true;
   item.previewStatus='Original full-resolution scan installed with a readable source-row thumbnail';
  }
  refresh();
 };
 test.onerror=()=>{}; // Link-only mode is safe until verified images are packaged.
 test.src=root+entry.preview;
}
})();
