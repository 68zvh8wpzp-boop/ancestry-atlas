/* A076 — Inez/Thomas Prather source-quality audit.
 * Scanned-document TEXT (not visually verified image) in two different period publications.
 * Strictly no lineage promotion, gallery image, biography, Story or audio changes.
 */
(() => {
 'use strict';
 if (typeof DATA === 'undefined' || !Array.isArray(DATA.nodes)) return;
 const title='PRATHERVILLE IN THE HISTORIC RECORD — SPELLING ALONE CANNOT ESTABLISH AN ANCESTOR';
 const paragraphs=[
  'In her memoir Inez Karen Prather Webb remembered a Missouri settlement called Pratherville and wondered whether its namesake was her grandfather or great-grandfather. That uncertainty remains important. A Clay County centennial souvenir printed in 1922 uses the spelling PRATHERVILLE for a settlement between Liberty and Excelsior Springs, founded before the Civil War by a Cumberland Presbyterian minister named Prather. A later Clay County place-name study uses PRATHERSVILLE. Boone County also had a Pratherville, associated in its separate place-name study with a merchant named William Prather. The spelling in Inez’s memoir therefore cannot tell us which community she meant.',
  'A separate contemporary newspaper, the Liberty Tribune of 17 November 1882, reported in its Moscow correspondence that a Mr. J. H. Prather donated approximately four acres for a proposed church on a hill south of town. It names J. H., not the John S. Prather profiled as a Moscow merchant in the 1885 county history, and not J. A. Prather identified with the Clay County settlement in later accounts. These initials should NOT be treated as interchangeable people. Nor does a church-site donation establish that the donor belonged to Inez’s direct ancestral line.',
  'The two historical publications are accessible as full digitized documents and their published words have been located in searchable PDF text. The specific pages could not be visually inspected or saved in full original resolution in this research tranche. The 1922 centennial account is retrospective; the 1882 Tribune report is contemporary but the digital transcription requires checking against the original newspaper image. None supplies the missing 1880 John S./Louella household or directly identifies Thomas Estil Prather’s parents.'
 ];
 const links=[
  {label:'1922 Clay County Missouri Centennial Souvenir, printed p.19 (archival PDF; source text only examined)',url:'https://clay.mogenweb.org/misc_centennial_1822-1922.pdf'},
  {label:'Liberty Tribune, 17 November 1882, “From Moscow” (archival newspaper PDF; page image uninspected)',url:'https://mdh.contentdm.oclc.org/digital/api/collection/libertytrib/id/59429/download'},
  {label:'State Historical Society of Missouri — Clay County place-name study',url:'https://collections.shsmo.org/manuscripts/columbia/C2366/clay-county'},
  {label:'State Historical Society of Missouri — Boone County place-name study',url:'https://collections.shsmo.org/manuscripts/columbia/C2366/boone-county'}
 ];
 for(const id of ['inez_karen','thomas_prather']){
  const person=DATA.nodes.find(n=>n.id===id);
  if(!person)continue;
  person.historicalNotes=Array.isArray(person.historicalNotes)?person.historicalNotes:[];
  if(!person.historicalNotes.some(n=>n.title===title))person.historicalNotes.push({
   title,paragraphs:[...paragraphs],links:links.map(x=>({...x}))
  });
  person.sourceAudit=Object.assign({},person.sourceAudit||{},{
   a076:{
    source1922:{title:'Clay County Missouri Centennial Souvenir',printedPage:19,year:1922,county:'Clay',spelling:'Pratherville',sourceTextLocated:true,originalPageImageVerified:false,originalImageCaptured:false,schoolOrFamilyLink:false},
    source1882:{title:'Liberty Tribune',issue:'1882-11-17',section:'From Moscow',claimedInitials:'J. H. Prather',reportedLand:'approximately 4 acres for church site',contemporaryNewspaper:true,originalPageImageVerified:false,originalImageCaptured:false},
    priorNames:['John S. Prather — 1885 county family sketch','J. A. Prather — Clay mill settlement attributed in retrospective histories','William Prather — Boone place-name study'],
    theseNamesIdentityMatched:false,
    InezTownSelected:false,
    ThomasEstilParentsProven:false,
    originalMediaBytesAdded:0,
    graphEdgesAdded:0,
    narrationModified:false,
    storyModified:false,
    humanIphoneVerified:false,
    published:false
   }
  });
 }
})();