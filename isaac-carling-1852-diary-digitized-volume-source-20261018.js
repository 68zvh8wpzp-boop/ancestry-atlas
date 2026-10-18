/* Isaac Carling Media Batch04 — additional DIGITIZED PRINT BOOK source for 1852 diary.
  NOT Isaac's handwritten autograph; NO original period manuscript image captured.
  FamilySearch book 194973_01, Mortenson v1, pages 48-55; copyright warning.
*/
(()=>{'use strict';
 if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
 const person=DATA.nodes.find(n=>n.id==='isaac_carling');if(!person)return;
 const source={
   id:'isaac-1852-diary-mortenson-1966-digitized-book-v1',
   kind:'document',
   sourceLevel:'digitized-retrospective-published-volume-no-original-manuscript',
   title:'Isaac’s 1852 trail diary — digitized 1966 family-history volume (printed pages 48–55)',
   date:'1852 diary account; compiled family history published circa 1966',
   place:'1852 overland route; printed edition Provo, Utah',
   sourcePage:'https://www.familysearch.org/library/books/records/item/101134-isaac-v-carling-family-history',
   provenance:'Elda P. (Porter) Mortenson, compiler, Isaac V. Carling Family History, vol. 1, Provo, Utah: J. Grant Stevenson, circa 1966, pp. 48–55. FamilySearch Digital Library item 101134, digital identifier 194973_01; holding institution David O. McKay Library, Brigham Young University–Idaho, 636 digital pages. The Church History Biographical Database publishes the cited diary as a separate transcription. Do NOT infer the library owns Isaac’s autograph manuscript.',
   summary:'A digitized later PRINTED family-history volume contains the 1852 diary text on pages 48–55. It is NOT a scan of Isaac’s handwritten journal; the 1852 manuscript’s custodian and survival are unverified. Open the FamilySearch book to examine its reproduced printed pages; Atlas does not copy the copyrighted book scans.',
   confidence:'FamilySearch bibliographic edition/custody verified; autograph original unlocated, no manuscript image obtained.',
   previewStatus:'source-link-only-digitized-book-not-captured-original-handwriting'
 };
 person.evidence=person.evidence||[];
 const idx=person.evidence.findIndex(e=>e.id===source.id);
 if(idx>=0)person.evidence[idx]=Object.assign({},person.evidence[idx],source);
 else person.evidence.push(source);
 person.originalMediaAudit=Object.assign({},person.originalMediaAudit||{},{
   isaac1852DiaryAutograph:'not-located-no-manuscript-image',
   isaac1852DiaryPrintedVolume:'FamilySearch-194973_01-v1-pp48-55-linked-not-downloaded',
   verifiedIsaacPortraits:0
 });
})();
