/* A051 — James Wilford "Jay" Webb: re-use a pre-captured original 1950 census
 * already linked to son James Sheldon Webb. Distinct from 1951 school photo
 * and from other already-preserved Jay family portraits.
 * Existing approved narration and Story, graph, source files unchanged.
 */
(() => {
  'use strict';
  if (typeof DATA === 'undefined' || !Array.isArray(DATA.nodes)) return;
  const jay = DATA.nodes.find(n=>n.id==='james_wilford');
  const sheldon = DATA.nodes.find(n=>n.id==='james_sheldon');
  if(!jay || !sheldon) return;
  jay.evidence = Array.isArray(jay.evidence) ? jay.evidence : [];
  const source = (sheldon.evidence||[]).find(e=>
    (e.full||'')==='assets/sheldon/james-sheldon-1950-census-viewer.jpg' &&
    /1950 United States census/.test(e.title||''));
  let added=false;
  if(source && source.sourcePage && source.full &&
      !jay.evidence.some(e=>(e.full||'')===source.full ||
        (e.sourcePage===source.sourcePage && e.kind==='document'))) {
    jay.evidence.push(Object.assign({},source,{
      kind:'document',
      title:'1950 federal census — Jay Webb’s Arizona household',
      summary:'The preserved census viewer capture places James W. Webb, wife Marion B. Webb, seven-year-old son James S. Webb and Diane Webb in Apache County, Arizona, on 12 April 1950. Jay is recorded as a truck driver working in the mill/logging sector. The census does not prove specific military service or the precise location of the household’s sawmill.',
      sourceLevel:'original',
      previewStatus:'archived viewer capture of an original federal census page; not a fresh complete NARA master',
      provenance:(source.provenance||'') + ' A051 reuses the identical already-packaged image from Sheldon Webb’s person page, with no new bytes or census interpretation beyond the original indexed entry.',
      a051Reused:true
    }));
    added=true;
  }
  jay.historicalNotes=Array.isArray(jay.historicalNotes)?jay.historicalNotes:[];
  if(!jay.historicalNotes.some(note=>note.title==='1950: THE WEBB HOUSEHOLD IN THE CENSUS')) {
    jay.historicalNotes.push({
      title:'1950: THE WEBB HOUSEHOLD IN THE CENSUS',
      paragraphs:[
        'A federal census enumerated the Webb household in Apache County, Arizona, on 12 April 1950. It names James W. Webb and Marion B. Webb together with children James S. and Diane. The census supplies a contemporary household anchor between Jay’s Army service and the later family photographs. It also records Jay working as a truck driver connected with the local mill industry, giving his timber-working biography a period documentary point of comparison.',
        'The image already belongs to the Atlas archive on Sheldon Webb’s page. It is a capture from a viewer of the original census, rather than an untouched preservation master newly obtained in this audit. This record does not identify Jay’s wartime unit, prove whether he participated on D-Day, or resolve competing accounts of Sheldon’s Arizona birthplace.'
      ],
      links:[{label:'1950 U.S. census — archived FamilySearch viewer',url:source?.sourcePage||
        'https://www.familysearch.org/ark:/61903/3:1:3QHN-LQH7-TGLJ'}]
    });
  }
  jay.sourceAudit=Object.assign({},jay.sourceAudit||{},{
    a051:'Original 1950 federal census household source crosslinked from Sheldon without new media acquisition',
    familyAlbumPriorAudit:'September 27 evidence-sync already attached original FamilySearch portrait and 12 captioned photo/PDF entries; DO NOT duplicate approved Story restored scene photos as original masters',
    originalCensus1950:'1950 U.S. census, Apache County Arizona ED1-6, 12 April, page8 line13, original viewer capture in existing archive',
    newGalleryDocsAdded:Number(added),
    newOriginalBytesCaptured:0,
    familyStoryNarrationUnchanged:true,
    graphAndPortraitUnchanged:true,
    derivativePhotoRule:'Restored family autobiography photos are presentation copies, not original photographic negatives',
    unresolvedMilitary:['Army separation record / unit orders','Bronze Star original order (if claim)','D-Day family claim','1946 Rognac photograph original and caption provenance'],
    fullyCertified:false,
    iphoneValidated:false
  });
})();