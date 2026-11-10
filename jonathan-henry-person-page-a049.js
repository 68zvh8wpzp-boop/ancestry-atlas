/* A049 — Jonathan Henry Webb. Separate source-calibrated person card; approved Story and narration are frozen. The compiled Mortensen genealogy is DERIVATIVE, not 1908/1914 primary proof. No new image asset or graph edge. */
(() => {
  'use strict';
  if (typeof DATA === 'undefined' || !Array.isArray(DATA.nodes)) return;
  const person = DATA.nodes.find(n=>n.id==='jonathan_henry');
  if (!person) return;
  const paragraphs=[
  "Jonathan Henry Webb was born on 21 June 1886 at Woodruff in Arizona Territory, according to the Webb family history and later genealogical compilations. He was a son of Edward Milo Webb Jr. and Sarah Elizabeth Carling, whose lives had already carried them from Utah settlements to the Little Colorado River country. Woodruff's farms depended on water drawn from an unpredictable river and on the work of households that raised food, repaired tools, cared for animals, and maintained ties with neighboring communities. Jonathan's childhood was part of a large and complex extended Webb family; his mother's children must not be confused with those of Edward's other wives.",
  "Arizona had not yet become a state. The territory was changing as railways, commerce, and government institutions expanded, but distance and the seasonal demands of agriculture continued to shape northeastern settlements. Jonathan came of age in a world with strong family connections across Arizona and Utah. The surviving genealogical outline establishes where parts of his life unfolded more securely than it establishes the details of his schooling, occupations, or personal character. Those should not be invented from the general conditions of the era.",
  "By 1908 Jonathan's life had reached the Mormon agricultural colonies of northern Mexico. A published Mortensen family genealogy records that he married Della Ray on 16 August 1908 in Colonia Morelos, Sonora. Della, born in Colonia Pacheco, Chihuahua, in 1891, was a daughter of James Wilford Ray and Elsie Margaret Mortensen. Their marriage joined two families whose travels crossed the United States–Mexico boundary. A later family memoir separately recalls the marriage and distinguishes it from a sealing ceremony on 2 April 1913 at the Salt Lake Temple. The contemporary 1908 marriage entry has not yet been inspected.",
  "The family genealogy places their first daughter Thora's birth in Colonia Morelos in September 1909 and son Henry Ray's birth there in October 1911. These entries put the young couple's early household in Mexico, but they are compiled genealogical statements rather than newly examined birth certificates. The Mexican Revolution began in 1910 and brought turmoil to colonies across northern Mexico. It is relevant historical context, not documentary proof that a particular battle, threat, or evacuation drove this family to leave on a particular date.",
  "A change in the children's recorded birthplaces offers a more useful boundary on the family's movements. The same family genealogy records Karl Albert Webb's birth on 5 January 1914 in Thatcher, Arizona, and Maurice Eugene Webb's birth in September 1916 in Pinedale. This establishes a sequence of reported birth locations: Colonia Morelos in 1911, Thatcher in 1914, and Pinedale in 1916. It does not by itself establish exactly when Jonathan and Della crossed the border, how they traveled, or whether each family member moved together. Original birth registers and border records remain necessary to answer those questions.",
  "Pinedale lay in Arizona's White Mountains, among forested uplands where timber work, small farms, livestock, and long roads linked scattered settlements. Their son James Wilford Webb, known as Jay, was born there on 5 October 1924 according to his later obituary, which independently names Della Ray Webb and Jonathan Henry Webb as his parents. This child became a direct link in the Webb descent represented by the Atlas. A historical birth-record index for Jay is also known to the research ledger, but an indexed name is not a substitute for inspection of the underlying original.",
  "The Mortensen genealogy attributes ten children to Jonathan and Della. Beyond the eldest children already named, the fuller list must be reconciled person by person with original birth records before the Atlas can claim every name and date as independently proved. The family histories suggest a broad network of descendants and relatives across places such as Pinedale, Lakeside, Snowflake, Vernon, and McNary. The presence of relatives in those places should not be represented as evidence that Jonathan himself lived in every town or took a particular route between them.",
  "Their marriage spanned the transition from territorial Arizona to statehood in 1912, the expansion of paved roads and automobiles, the Great Depression, and two world wars. Those events changed the White Mountains communities that later generations knew. The surviving sources make the family's movements and intergenerational links visible; they say less about Jonathan's private opinions, daily work, or response to national events. His biography is strongest when it recognizes the regional transformations without assigning invented anecdotes to him.",
  "Della died on 1 December 1969 at McNary according to the published family genealogy. Jonathan survived her, dying in August 1975; later family compilations give 3 August at Lakeside, Arizona. The person-specific civil death record and burial original remain outstanding. A family photograph catalogued as 'Jonathan Henry Webb and His Six Sons', dated approximately 1947 in an earlier FamilySearch inventory, is a promising source for the gallery, but its image bytes, identifications, resolution, and reuse permission have not been fully verified or preserved in this audit. The Atlas must not substitute the existing contextual illustrations from his approved Story and call them portraits.",
  "Jonathan's documented place in the family story connects his parents' Arizona settlement, his and Della's marriage in the Mexican colonies, and the White Mountains upbringing of their children. That is substantial history even where the paper trail is incomplete. His approved illustrated Story remains intact; this separate person-page account now distinguishes published family genealogy, an obituary, previously indexed records, and still-unexamined originals, leaving the precise migration timetable and unique family photograph open for further research."
];
  const biography=paragraphs.join('\n\n');
  if (typeof GUIDE_PROFILES !== 'undefined') {
    GUIDE_PROFILES.jonathan_henry=GUIDE_PROFILES.jonathan_henry||{};
    GUIDE_PROFILES.jonathan_henry.life=biography;
    GUIDE_PROFILES.jonathan_henry.birthPlace='Woodruff, Arizona Territory (family genealogy; original birth record not inspected)';
  }
  person.note='Jonathan Henry Webb (1886–1975), son of Edward Milo Webb Jr. and Sarah Elizabeth Carling, married Della Ray in Colonia Morelos in 1908 according to later family histories. Their first children were recorded in Mexico; a later genealogy places Karl in Thatcher, Arizona, in 1914 and Maurice in Pinedale in 1916. The exact border-crossing date remains unproven. Their son Jay Webb was born in Pinedale in 1924. No period civil marriage, original birth or death record has been newly inspected in A049.';
  person.sourceAudit=Object.assign({},person.sourceAudit||{}, {
    a049:'Jonathan person-card museum biography; independent of previously approved illustrated Story and narration',
    mortensenGenealogy:'https://www.familysearch.org/patron/v2/TH-301-43970-40-28/dist.pdf?ctx=ArtCtxPublic',
    mortensenPrintedPages:'185–187 and following (published descendant genealogy, not primary original)',
    memoirMarriage:'https://www.familysearch.org/ru/memories/memory/71246447/James%2BWilford%2BRay%2Bby%2BNellie%2BRay%2BToone',
    jayObituary:'https://www.owenslivingstonmortuary.com/obituaries?page=150 (2014 indexed historical obituary; page not fully retrievable in current audit)',
    marriage1908:'only derivative family history and later memoir seen; original Morelos Ward marriage not examined',
    sealing1913:'distinct from 1908 marriage, currently derivative genealogy only',
    mexicoArizonaBirthSequence:'1909/1911 Colonia Morelos; 1914 Thatcher; 1916 Pinedale, DERIVATIVE birth-location chain',
    migrationDayAndCause:'not established by contemporary original',
    childCount:'ten from published family genealogy, not all birth originals audited',
    originalsPending:['1908 Colonia Morelos marriage folio','1914 Karl birth original','1924 Jay birth original','1975 Jonathan Arizona death original'],
    familyPhoto1947:'Jonathan Henry Webb and His Six Sons, circa 1947, FamilySearch img0008.jpg inventoried historically, image/rights still unverified; not added to gallery',
    fsInventory:'57 Sources / 147 Memories historically; not itemwise reconciled in this tranche',
    contextualStoryMediaNotPortrait:true,
    existingApprovedStoryAndNarrationUnchanged:true,
    newHistoricalMasterBytes:0,
    fullyCertified:false,
    iphoneValidated:false
  });
})();
