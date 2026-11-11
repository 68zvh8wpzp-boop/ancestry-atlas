/* A055 — Wilhelm/Carl Brunne and Johanne Weller source boundaries.
 * Runs after the existing 15 October biography modules, which are now
 * person-page-only (approved Story/narration state remains frozen).
 * Sources have already been captured; no original image is newly acquired.
 */
(() => {
 'use strict';
 if(typeof DATA==='undefined' || !Array.isArray(DATA.nodes)) return;
 const targets=[
  {
   id:'wilhelm_brunne',
   heading:'WHAT THE BRUNNE RECORDS ESTABLISH',
   text:[
    'The 1892 Ontario birth registration for daughter Elizabeth Jessie explicitly names parents Charles Brunne and Johanne Weller. The 1893 Michigan marriage of their son Charles to Ida Gooley gives his parents as Charles Brenay and Hannah Wheeler. The 1896 Ontario marriage of daughter Annie names Charles Brunne and Johanna Weiler. These are separate original records using different spellings; identifying the families requires correlation, not a literal same-name match.',
    'The contemporary 1901 and 1911 census entries and a later local history place Charles and his family in the Arnstein district. The community history and settlers’ map are retrospective compiled sources, not contemporary registers, and William Brunne’s half-brother relationship remains a family-history claim. Wilhelm Karl Charles is a family-used full name; the individual appears as Charles/Carl in contemporaneous records.',
    'The 15 October biography cites an Ontario 13 March 1913 death registration for Charles Brumme Sr., while the older tree-style v23 summary printed an August 1914 death date. The latter should not be promoted over the more particular record without independent validation. The 1913 death page is not present among the eight attached gallery slots. A separate original German baptism for Wilhelm himself has not been certified; the 1874 Großörner baptism names “Carl Brunne” as father of Gottfried.'
   ],
   pending:[
    'Review original Wilhelm birth or baptism and any evidence linking “Wilhelm Karl Charles” to the Charles/Carl in Canadian records',
    'Attach and verify the original Charles Brumme Sr. 1913 Ontario death page or local authorized copy',
    'Inspect original German marriage/parish entries relating Johanne/Carl to the Canadian household',
    'iPhone image decoding and caption-by-caption review of two portraits and six historic documents'
   ]
  },
  {
   id:'johanne_weller',
   heading:'JOHANNE’S BIRTH AND DEATH: TWO RECORD CONFLICTS',
   text:[
    'The 1892 Ontario birth registration for Elizabeth Jessie names her mother Johanne Weller; the 1893 Michigan wedding return and 1896 Ontario marriage entry preserve the variants Hannah Wheeler and Johanna Weiler. These sources provide concrete correlation but do not by themselves locate Johanne’s childhood baptism or establish the village Sylda as her birthplace.',
    'Her birth year appears as 1848 in one lifetime census, but 1850 on the original 1915 death record and burial materials. The death certificate records 30 September 1915 at Alpena, Michigan, while the later memorial stone states 29 September. The original civil death page is attached to her gallery and should be given priority for the date of death, with the difference kept visible.',
    'The existing gallery portrait reproduced by Lauralee Foreshew is contributor-identified and preserved at high resolution; a second 181×284 contributor copy is low resolution. Neither provides a contemporary image caption that independently verifies identity. The 1914 crossing to Michigan is described in her compiled biography, but original border entry/master and complete source inventory remain audit gates.'
   ],
   pending:[
    'Original German baptism/birth record for Johanne and independently verified Sylda or alternate birthplace',
    'Original 1914 Port Huron crossing to independently substantiate time, relatives and destination',
    'Resolve 1848/1850 birth-year discrepancy and 29/30 September 1915 death discrepancy if further contemporaneous material exists',
    'iPhone decode and exact caption/provenance audit of both family-attributed portraits and five document cards'
   ]
  }
 ];
 for(const spec of targets) {
  const person=DATA.nodes.find(n=>n.id===spec.id);
  if(!person) continue;
  const evidence=Array.isArray(person.evidence)?person.evidence:[];
  for(const item of evidence){
   const title=item.title||'';
   if(item.kind==='photo'){
    item.sourceLevel='family-attributed photographic reproduction; sitter and original negative not independently authenticated';
    if(/Ancestry screenshot/i.test(title))item.sourceLevel='screenshot of derivative/secondary image; not an original photographic negative';
   } else if(/local history|settlers.? map/i.test(title)) {
    item.sourceLevel='retrospective local history / community map; derivative';
   } else if(/1892|1893|1896|death certificate/i.test(title)){
    item.sourceLevel='contemporary civil register image or facsimile (target entry); preserved earlier';
   } else {
    item.sourceLevel='requires page-by-page source classification';
   }
  }
  person.historicalNotes=Array.isArray(person.historicalNotes)?person.historicalNotes:[];
  if(!person.historicalNotes.some(n=>n.title===spec.heading)){
   person.historicalNotes.push({
    title:spec.heading,
    paragraphs:spec.text,
    links:[
      {label:'Ontario 1892 Jessie birth original register (FamilySearch)',url:'https://www.familysearch.org/ark:/61903/3:1:939J-D678-5'},
      {label:'Michigan 1893 Charles and Ida marriage return (FamilySearch)',url:'https://www.familysearch.org/ark:/61903/3:1:S3HT-63T9-NRN'}
    ]
   });
  }
  person.sourceAudit=Object.assign({},person.sourceAudit||{},{
    a055:'Reintegrated previously parked 15 October source-backed person biography and original/gallery items, no binary reacquisition; narration/Story freeze retained',
    previewAudit:'All historic image links and files need iPhone user-agent decode check; historical previewStatus labels are not fresh validation',
    personPageBiographyDraft:true,
    liveAtlasDeployed:false,
    audioFilesModified:false,
    approvedNarrationAndStoryUnchanged:true,
    originalParentageProofPromoted:false,
    noNewMediaBytes:true,
    originalSourceItemsAttached:evidence.filter(e=>e.kind==='document').length,
    familyPhotographsAttached:evidence.filter(e=>e.kind==='photo').length,
    openSourceTasks:spec.pending,
    fullSourceMemorySweep:false,
    fullyCertified:false,
    iphoneValidated:false
  });
 }
})();