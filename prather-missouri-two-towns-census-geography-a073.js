/* A073 — Prather place-name collision and 1880 search geography, original Inez memoir p14.
 * Two independently named Missouri places are not genealogical relationships.
 * Author recollection, retrospective scholarship, and 1877 contemporary map
 * remain separate source categories. No parent edge, birthplace, exact map pin,
 * approved biography, Story or narration is changed by this module.
 */
(() => {
  'use strict';
  if (typeof DATA === 'undefined' || !Array.isArray(DATA.nodes)) return;
  const title = 'TWO DIFFERENT MISSOURI PRATHER TOWNS — THE FAMILY LINK IS STILL UNPROVEN';
  const links = [
    {label:'State Historical Society of Missouri — Clay County place names (Prathersville)',
     url:'https://collections.shsmo.org/manuscripts/columbia/C2366/clay-county'},
    {label:'State Historical Society of Missouri — Boone County place names (Pratherville)',
     url:'https://collections.shsmo.org/manuscripts/columbia/C2366/boone-county'},
    {label:'Original 1877 Clay County atlas overview, visually checked; file not archived locally',
     url:'https://clay.mogenweb.org/maps_platmaps_1877.pdf'},
    {label:'1885 printed Clay County history, Prathersville account around p. 388',
     url:'https://ldsgenealogy.com/MO/books/History-of-Clay-and-Platte-Counties-Missouri-written-and-compiled-from-the-most-authentic-official-and-private-sources-including-a-history-of-their-townships-towns-and-villages-part-41.htm'},
    {label:'National Archives — 1880 Missouri federal census rolls 681–682',
     url:'https://www.archives.gov/research/census/microfilm-catalog/1790-1890/part-07'}
  ];
  const paragraphs = [
    'In her own illustrated life story (p. 14), Inez Karen Prather Webb remembered a small Missouri town called Pratherville and wondered whether it had been named for her grandfather or great-grandfather. She did not identify the man or county, and this is a family recollection, not a proven naming or parentage record.',
    'Missouri place-name scholarship separates at least two similarly spelled communities. In BOONE County, Nadine Pace’s 1928 place-name study calls Pratherville a settlement named for merchant William Prather. In CLAY County, Anne Atchison’s 1937 study identifies Prathersville in northern Fishing River Township as growing around a mill operated by J. A. Prather around 1870. An 1885 Clay County history describes J. A. as a Presbyterian minister and mill builder. There is no present evidence that William and J. A. were the same man or that either was Inez’s direct ancestor.',
    'A contemporary 1877 Clay County atlas overview (visually examined) plots Prathersville in Fishing River Township and the different town of Moscow in Gallatin Township. The separate 1885 John S. Prather sketch says he sold merchandise in Moscow from 1879 and moved to Excelsior Springs two years later. Accordingly the unlocated 1880 John S./Louella candidate household should be sought first in the GALLATIN Township/Moscow schedules rather than automatically in Fishing River. The federal 1880 Clay County rolls are NARA T9-681 and T9-682; a documented Gallatin ED 120 example is an area locator, NOT the Prather household or a complete enumeration district assignment.',
    'These place references add context and correct a search assumption, but do not identify the Thomas child in the 1885 sketch with Thomas Estil Prather. No parent, grandparent, relationship line, exact residential pin, or new birth claim is justified. The 1877 map is linked to an original PDF; a private unchanged file copy could not be acquired in this review.'
  ];
  for(const id of ['inez_karen','thomas_prather']) {
    const person = DATA.nodes.find(n => n.id===id);
    if (!person) continue;
    person.historicalNotes = Array.isArray(person.historicalNotes) ? person.historicalNotes : [];
    if (!person.historicalNotes.some(n => n.title===title)) {
      person.historicalNotes.push({title,paragraphs:[...paragraphs],links:links.map(n=>({...n}))});
    }
    person.sourceAudit = Object.assign({},person.sourceAudit||{}, {
      a073TwoPratherTowns:{
        memoirLocator:'Inez Karen Prather Webb original Word memoir, page 14, author uncertain about grandparent vs great-grandparent',
        clayPlace:'Prathersville, northern Fishing River township, named for mill operator J. A. Prather around 1870',
        boonePlace:'Pratherville, associated with merchant William Prather, per 1928 place-name study',
        independence:'Two separate scholarly county entries, not original vital records; 1885 local history is one additional historical source for Clay village',
        originalMap:'1877 Clay County overview visually examined; Moscow labeled within Gallatin township, Prathersville within Fishing River township',
        originalMapBytesPreserved:false,
        target1880:'Gallatin township (Moscow), Clay County, Missouri, 1880 census; NARA T9-681/T9-682, exact household ED and sheet unlocated',
        exampleED120IsPratherHousehold:false,
        WilliamOrJAProvenDirectAncestor:false,
        ThomasEstilSameAs1885ChildProven:false,
        graphEdgesAdded:0,
        mapPinsAdded:0,
        mediaAssetsAdded:0,
        fullPersonPageCertified:false,
        iphoneValidated:false,
        publicationApproved:false
      }
    });
  }
})();