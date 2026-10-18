/* Isaac 1854 marriage: original PDF, and clearly labeled derivative viewing images.
   1854 Deseret News vol4 no37 p3. Original SHA-256:
   e8eb7ae86f6e8a7f5a247b6ad0fc3159675df3e948290cff8514a77b4e27d4be
   Document images captured 18 Oct 2026; no period portrait claimed.
*/
(()=>{
  'use strict';
  if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
  const person=DATA.nodes.find(n=>n.id==='isaac_carling');
  if(!person)return;
  const root='assets/isaac-carling/';
  const pdf=root+'1854-deseret-news-p3-marriage-original.pdf';
  const crop=root+'1854-isaac-asenath-marriage-notice-view.png';
  const page=root+'1854-deseret-news-p3-fullpage-view.jpg';
  const sourcePage='https://newspapers.lib.utah.edu/udn_files/e7/54/e754867dc2a2b533fd0e62e58209eecd3876ed28.pdf';
  const provenance='Deseret News (Great Salt Lake City), 23 November 1854, vol. 4, no. 37, p. 3, “Married”; Utah Digital Newspapers / Deseret News issue 2581309, page position 2. Unchanged original archival PDF saved at assets/isaac-carling/1854-deseret-news-p3-marriage-original.pdf; SHA-256 e8eb7ae86f6e8a7f5a247b6ad0fc3159675df3e948290cff8514a77b4e27d4be. The display PNG/JPG are derivatives, not original photographs.';
  const announcement={
    id:'isaac-1854-marriage-notice',
    kind:'document',
    sourceLevel:'original',
    title:'Isaac and Asenath — marriage announcement (original newspaper, 1854)',
    date:'23 November 1854 (marriage 17 November)',
    place:'Ogden City, Utah Territory',
    thumb:crop,
    full:crop,
    originalAsset:pdf,
    sourcePage,
    provenance,
    summary:'Original Deseret News announcement naming Isaac Van Wagoner Carling of Fillmore City and Asenath Elizabeth Browning of Ogden City. Married 17 November 1854 by Ezra T. Benson. The magnified excerpt is a viewing crop; use “Open full original document” for the unchanged archival page.',
    transcription:'FULLTEXT_ORIGINAL:\nMARRIED. — In Ogden city, on the 17th inst., by Ezra T. Benson, Isaac VanWagoner Carling, of Fillmore city, and Asenath Elizabeth Browning, of Ogden city.\n\nFULLTEXT_TRANSLATION:\nNot applicable — English original.',
    confidence:'Original issue and page verified. Scan saved, byte-preserving archival PDF; cited OCR/spelling readings should be checked against visible image.',
    previewStatus:'captured-original-and-derivative-view'
  };
  const fullPage={
    id:'isaac-1854-marriage-full-newspaper-page',
    kind:'document',
    sourceLevel:'original',
    title:'Deseret News — full original page containing Isaac’s marriage notice',
    date:'23 November 1854',
    place:'Great Salt Lake City, Utah Territory',
    thumb:page,
    full:page,
    originalAsset:pdf,
    sourcePage,
    provenance,
    summary:'Full-page legibility rendition of the same original newspaper page. Notice is in the fourth column, about one-quarter down. This is a second view of ONE document, not a second independent source.',
    confidence:'Full-page viewing JPEG derived from the saved unchanged original PDF.',
    previewStatus:'readable-rendition-original-pdf-retained'
  };
  person.evidence=person.evidence||[];
  for(const e of [announcement,fullPage]){
    const idx=person.evidence.findIndex(item=>item.id===e.id);
    if(idx>=0)person.evidence[idx]=Object.assign({},person.evidence[idx],e);
    else person.evidence.push(e);
  }
  person.originalMediaAudit=Object.assign({},person.originalMediaAudit||{},{
    marriage1854:'original-PDF-captured-and-published',
    independentlyCapturedOriginalDocuments:1,
    visualDerivatives:2,
    verifiedIsaacPortraits:0,
    sha256:'e8eb7ae86f6e8a7f5a247b6ad0fc3159675df3e948290cff8514a77b4e27d4be',
    historicalMediaReview:'User iPhone inspection pending',
  });
})();
