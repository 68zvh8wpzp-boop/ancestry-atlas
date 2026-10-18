/* Isaac Carling Tranche 21: final preapproval museum presentation corrections.
   Applied AFTER prior five person modules. No new original/source claimed.
   Remove internal instructions and prevent a family-site web JPG from masquerading
   as an independently captured archive paper original. Idempotent.
*/
(()=>{'use strict';
if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
const p=DATA.nodes.find(n=>n.id==='isaac_carling');if(!p)return;
const bioOld="Later accounts credit his woodworking and painting skills with an important place in the settlement's workshops, and describe him as a cooperative officer and church counselor. The corresponding nineteenth-century board and departmental records have been located, but no page naming Isaac in those offices has yet been read; the exact titles remain family-history claims. The remembered work itself ranged from chairs and cabinets to building trim.";
const bioNew="Family accounts remember him working with wood and paint in the settlement's workshops, making chairs, cabinets and building trim, and also attribute cooperative and local church responsibilities to him.";
if(typeof p.BIOGRAPHY==='string'){
  p.BIOGRAPHY=p.BIOGRAPHY.replace(bioOld,bioNew);
  p.biography=p.BIOGRAPHY;
  if(typeof GUIDE_PROFILES!=='undefined'&&GUIDE_PROFILES.isaac_carling)
    GUIDE_PROFILES.isaac_carling.life=p.BIOGRAPHY;
}
if(Array.isArray(p.historicalNotes)){
  const trail=p.historicalNotes.find(n=>n.title==='Two family journeys crossed paths in 1852');
  if(trail){
    trail.title='Two wagon companies on the 1852 trail';
    trail.paragraphs=["On 1 August 1852, Isaac's published diary reports that his wagon company passed “Curtis' Company.” The five-year-old Edward Milo Webb Jr. traveled with Uriah Curtis's company, and Edward's father had died the previous day. The two groups' paths converged, but no evidence establishes that the families met. Years later, their family lines joined through Isaac's daughter Sarah Elizabeth and Edward Milo Webb Jr."];
  }
  const order=p.historicalNotes.find(n=>n.title==='Orderville and the United Order');
  if(order&&Array.isArray(order.paragraphs)&&order.paragraphs.length>1)
    order.paragraphs[1]="The cooperative economic system was distinct from plural marriage and from an individual's church calling. Family recollections place Isaac's carpentry and painting in the setting of Orderville's workshops, although his precise administrative titles are less certain.";
}
// Prior biography module merges by its legacy title on each load. Once the
// museum title is updated, a subsequent load could append a second copy.
// Normalize and deduplicate stable titles so iPhone refresh remains safe.
if(Array.isArray(p.historicalNotes)){
 const seen=new Set();
 p.historicalNotes=p.historicalNotes.filter(note=>{
   const key=String(note.title||'');
   if(seen.has(key))return false;
   seen.add(key);return true;
 });
}
const ev=p.evidence||[];
function amend(id,changes){
  const e=ev.find(x=>x.id===id);
  if(e)Object.assign(e,changes);
  return e;
}
amend('isaac-1854-marriage-full-newspaper-page',{
  summary:"Full-page viewing image of the Deseret News issue containing Isaac and Asenath's 1854 marriage announcement. This tile and the enlarged-notice tile both lead to the SAME preserved archival PDF.",
});
amend('isaac-1852-diary-published',{
  summary:"Isaac's 1852 trail journal survives in a published transcription from the later Carling family history. It describes daily travel, repairs and encounters on the westward route. The handwritten manuscript itself has not been located.",
});
amend('isaac-1852-diary-mortenson-1966-digitized-book-v1',{
  summary:"The 1966 Carling family history prints the 1852 diary on pages 48–55. Its digitized book is available through the FamilySearch Digital Library; these are pages from a later published volume, not an image of Isaac's handwritten journal.",
  previewStatus:"Digitized 1966 printed volume linked; no autograph image",
});
amend('isaac-1924-daughter-asenath-carling-spencer-death-certificate',{
 summary:"This Utah death certificate is for Asenath Emeline Carling Spencer, who died in 1924, not for Isaac. It names Isaac Vanwagoner Carling of New York as her father and Asenath E. Browning as her mother. The readable image is a web-sized copy held by descendants, not the Utah archives' master scan.",
});
amend('isaac-context-orderville-townscape-circa-1900-usu-p1093-12',{
 summary:"A photograph of Orderville around 1900, showing the community where Isaac spent his later years. No individual in this view has been independently identified as Isaac. Source: Utah State University Extension, Rural Rangeland Archive, Plate 548X.",
});
const daughter=ev.find(x=>x.id==='isaac-1924-daughter-asenath-carling-spencer-death-certificate');
const place=ev.find(x=>x.id==='isaac-context-orderville-townscape-circa-1900-usu-p1093-12');
// Each image stays accessible as the full saved gallery asset, with an external
// source link; do not duplicate its file link under an "original paper" label.
for(const e of [daughter,place])if(e&&e.originalAsset===e.full)delete e.originalAsset;
p.preapprovalAudit={
  date:'2026-10-18',tranche:21,status:'museum-presentation-reviewed-awaiting-iphone',
  distinctOriginalSourceRecordsSaved:2,original1854NewspaperPdf:true,
  daughter1924FamilyCopy:true,historicPlaces:1,verifiedIsaacPortraits:0,
  autograph1852Located:false,deathCert1911Located:false,deed1855OriginalLocated:false,
  binaryGalleryEntries:4,sourceOnlyReferences:6
};
})();
