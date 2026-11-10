/* A045: Asenath Elizabeth Browning — direct ancestor, source-first page enhancement.
   One original 1854 newspaper preserved previously under Isaac's asset folder.
   Reuse it; do not download a second master or credit children of Miriam Hobson to Asenath.
   Sources: Church History Biographical Database / pioneer company chronology;
   Utah Digital Newspapers (23 Nov 1854) original notice; BYU Pioneer Women of Arizona
   biography of daughter Sarah (secondary mother-daughter identification).
*/
(()=>{
  'use strict';
  if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
  const person=DATA.nodes.find(n=>n.id==='asenath_browning');
  if(!person)return;
  const biography=`Asenath Elizabeth Browning belonged to a generation whose childhood in the American Midwest was followed by an arduous migration to Utah Territory. The Church History Biographical Database gives her birth as 17 November 1835, but does not establish an exact birthplace. Later family accounts place it in Adams County, Illinois, sometimes specifically Quincy; a precise birthplace remains a question for original-record verification.

Asenath was a daughter of Jonathan Browning, a skilled gunsmith whose family moved through the Mormon settlements of the Midwest. In 1852, she crossed the plains with the Henry W. Miller company. The official pioneer-company account includes Jonathan Browning and other members of the traveling household, and places the company's journey between 8 July and 10 September. These records identify Asenath within that migration, but do not replace contemporaneous proof of every member's biological relationship.

A particularly vivid contemporary record survives from her early Utah years. The Deseret News of 23 November 1854 announced that Isaac Van Wagoner Carling, of Fillmore City, and Asenath Elizabeth Browning, of Ogden City, had been married at Ogden on 17 November by Ezra T. Benson. The newspaper places her as a named adult within a recognizable Utah community, rather than merely a spouse in later family compilations. The original issue and a readable excerpt are already preserved in the Atlas from the separate Isaac Carling audit; this page reuses the identical document.

On 25 February 1856, their daughter Sarah Elizabeth was born in Ogden, according to a published biographical sketch in Pioneer Women of Arizona. That study identifies Isaac and Asenath as Sarah's parents. Sarah later married Edward Milo Webb Jr. and carried this Browning–Carling ancestry into the Webb family. The Sarah sketch is valuable family evidence but is a later published account, not a newly examined 1856 birth registration.

The Carling family lived through the rebuilding and diversification of Utah settlements, when crafts, farming and household production supported families far from established markets. Asenath's later life is associated with southern Utah and Orderville, where cooperative experiments became a distinctive part of local community history. Accounts of Isaac's plural household also name Miriam Elizabeth Hobson as another wife. The existing September FamilySearch audit grouped twelve children with Asenath and four with Miriam, while an aggregated contributed tree incorrectly placed all sixteen with Asenath. A published Hobson-family genealogy separately attributes John Henry, Ellen, Lydia May, and Jesse Hobson Carling to Miriam; those are secondary assertions pending individual period birth and household verification. A single combined list of Isaac's children therefore cannot safely be presented as Asenath's children.

The Church History Biographical Database records Asenath's death on 3 January 1899. Later genealogical and cemetery sources place her burial at Orderville, Utah; an independently inspected death or burial original remains to be obtained. Her surviving historical outline rests on a documented pioneer journey, a contemporaneous marriage announcement, and a daughter whose descendants preserve her name. The remaining work lies in finding originals that restore more of Asenath's own voice and distinguish her household from those of Isaac's other wife.`;
  if(typeof GUIDE_PROFILES!=='undefined'){
    GUIDE_PROFILES.asenath_browning=GUIDE_PROFILES.asenath_browning||{};
    GUIDE_PROFILES.asenath_browning.life=biography;
    GUIDE_PROFILES.asenath_browning.birthPlace='Illinois (reported in family sources; exact locality not certified)';
  }
  person.years='1835–1899';
  person.place='Illinois (reported) → Ogden → southern Utah';
  person.note='Asenath Elizabeth Browning (17 November 1835–3 January 1899) traveled with the Henry W. Miller pioneer company in 1852 and married Isaac Van Wagoner Carling in Ogden on 17 November 1854. An original newspaper notice confirms the marriage. Later biographical history names her mother of direct ancestor Sarah Elizabeth Carling Webb. Her exact Illinois birthplace and attribution of Isaac\'s children between plural wives require further original-record proof.';
  person.evidence=Array.isArray(person.evidence)?person.evidence:[];
  const source={
    id:'asenath-1854-marriage-original-reused',
    kind:'document',
    sourceLevel:'original',
    title:'Asenath Browning and Isaac Carling — 1854 marriage announcement (original newspaper)',
    date:'23 November 1854 (married 17 November)',
    place:'Ogden City, Utah Territory',
    thumb:'assets/isaac-carling/1854-isaac-asenath-marriage-notice-view.png',
    full:'assets/isaac-carling/1854-isaac-asenath-marriage-notice-view.png',
    originalAsset:'assets/isaac-carling/1854-deseret-news-p3-marriage-original.pdf',
    sourcePage:'https://newspapers.lib.utah.edu/udn_files/e7/54/e754867dc2a2b533fd0e62e58209eecd3876ed28.pdf',
    provenance:'Deseret News, 23 Nov 1854, vol 4 no 37, p 3. Archival original already preserved for Isaac Carling under assets/isaac-carling; SHA-256 e8eb7ae86f6e8a7f5a247b6ad0fc3159675df3e948290cff8514a77b4e27d4be. Image shown is a derived reading crop of that one original.',
    summary:'The original 1854 announcement names Asenath Elizabeth Browning of Ogden City, married 17 November to Isaac Van Wagoner Carling of Fillmore City, by Ezra T. Benson. This is the same document already held on Isaac\'s page, not a second independent original.',
    transcription:'FULLTEXT_ORIGINAL:\\nMARRIED. — In Ogden city, on the 17th inst., by Ezra T. Benson, Isaac VanWagoner Carling, of Fillmore city, and Asenath Elizabeth Browning, of Ogden city.\\n\\nFULLTEXT_TRANSLATION:\\nNot applicable — original is English.',
    confidence:'Dated contemporary original newspaper; identity and marriage event attested, not biological parentage proof.',
    previewStatus:'captured-original-and-derivative-view'
  };
  if(!person.evidence.some(e=>e.id===source.id))person.evidence.push(source);
  person.sourceAudit=Object.assign({},person.sourceAudit||{},{
    a045:'1854 original marriage reused; CHD 1852 pioneer metadata; Sarah motherhood by published BYU sketch; birthplace and full child partition unproven',
    source_1852:'https://history.churchofjesuschrist.org/chd/individual/aseneth-elizabeth-browning-1835?lang=eng',
    source_sarah:'https://rsc.byu.edu/pioneer-women-arizona/w',
    familysearch_id:'KWJ8-5XN',
    user_iphone_visual:'pending',
    gallery_sources_memories:'38 source / 99 memory historical inventory not enumerated',
    full_certification:false,
  });
})();
