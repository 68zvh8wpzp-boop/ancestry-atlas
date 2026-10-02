/* Marie Élisabeth Béfort Philippin evidence overlay — 2026-10-02.
   Source: authenticated FamilySearch baptism image and tagged memory G34V-XBP.
   The overlay preserves the readable preview, provenance, and uncertainty. */
(() => {
  'use strict';
  const byId = id => DATA.nodes.find(n => n.id === id);
  const marie = byId('marie_elisabeth_tellier_mother_unresolved');
  if (!marie) return;
  Object.assign(marie, {
    name: 'Marie-Élisabeth Béfort Philippin',
    years: '1802–1873',
    place: 'Saint-Ours, Richelieu, Quebec → Coaticook, Quebec',
    branch: 'Gooley / Goulet candidate',
    confidence: 'strong',
    note: 'Marie-Élisabeth Béfort Philippin was baptized at Saint-Ours on 6 April 1802, daughter of François Philippin dit Béfort and Marie Angélique Thibault. She married Jean-Baptiste Tellier dit Benjamin in 1822 and later Joseph Denis Laporte St-Georges in 1836. Her daughter Louise-Anne Tellier appears in the 1846 Pierre Goulet marriage record. The separate Goulet–Gooley identity bridge remains unproved.',
    evidence: [{
      kind: 'document',
      title: '1802 Saint-Ours baptism — Marie-Élisabeth Philippin Béfort',
      date: '6 April 1802',
      place: 'Saint-Ours, Richelieu, Quebec',
      thumb: 'assets/marie-elisabeth/saint-ours-1802-baptism-preview.svg',
      full: 'assets/marie-elisabeth/saint-ours-1802-baptism-preview.svg',
      sourcePage: 'https://www.familysearch.org/ark:/61903/3:1:3QS7-899Q-7DNL?lang=fr&i=550',
      provenance: 'Authorized crop from the FamilySearch memory “Capture d’écran 2025-03-23 184409.jpg,” contributed by Jocelyn C. on 23 March 2025, cross-checked against the authenticated Saint-Ours parish-register image 551.',
      summary: 'The baptism entry identifies Marie-Élisabeth as the daughter of François Philippin dit Béfort and Marie Angélique Thibault. The red handwriting is an annotation on the captured image; the original record link remains available.',
      confidence: 'authenticated source image and tagged memory inspected; one godmother surname remains illegible',
      previewStatus: 'readable',
      transcription: 'FULLTEXT_ORIGINAL: [Annotation rouge: 6 04 1802.] le six d’avril mil huit cent deux, par moi prêtre soussigné, a été baptisée Marie Élisabeth, née aujourd’hui, fille de François Philippin dit Béfort, menuisier en cette paroisse, et de Marie Angélique Thibault, en légitime mariage. Le parrain a été Pierre Girouard et la marraine Marie [nom illisible], qui, avec le père, ont déclaré ne savoir signer. — Hebert, p[tre].|||FULLTEXT_TRANSLATION||| [Red annotation: 6 April 1802.] On the sixth of April 1802, I, the undersigned priest, baptized Marie Élisabeth, born today, daughter of François Philippin dit Béfort, a carpenter in this parish, and Marie Angélique Thibault, lawfully married. The godfather was Pierre Girouard and the godmother was Marie [surname illegible], who, together with the father, declared that they did not know how to sign. — Hebert, parish priest.'
    }]
  });
  if (typeof GUIDE_PROFILES !== 'undefined') {
    GUIDE_PROFILES.marie_elisabeth_tellier_mother_unresolved = GUIDE_PROFILES.marie_elisabeth_tellier_mother_unresolved || {};
    GUIDE_PROFILES.marie_elisabeth_tellier_mother_unresolved.birthPlace = 'Saint-Ours, Richelieu, Quebec';
    GUIDE_PROFILES.marie_elisabeth_tellier_mother_unresolved.life = 'Marie-Élisabeth Béfort Philippin was baptized on 6 April 1802 at Saint-Ours, in the Richelieu region of Quebec. Her baptism identifies her as the daughter of François Philippin dit Béfort, a carpenter in the parish, and Marie Angélique Thibault. The entry places her within a large Philippin-Béfort and Thibault family rooted in the Saint-Ours parish community.\n\nIn 1822, Marie-Élisabeth married Jean-Baptiste Tellier dit Benjamin at Saint-Ours. Their household included nine children, among them Louise-Anne Tellier, who later appears in the 1846 Saint-Michel-de-Sherbrooke marriage record with Pierre Goulet. The family record therefore connects Marie-Élisabeth to the Tellier household and to the later Quebec parish network without proving that the Goulet family was the same as the later Gooley line.\n\nMarie-Élisabeth married again in 1836 at Sorel, to Joseph Denis Laporte St-Georges. That household included three children. The two marriages place her adult life within the connected parish communities of Saint-Ours, Sorel, and the Richelieu region. Her recorded death at Coaticook on 12 May 1873 marks the end of a life that began in the early nineteenth-century Saint-Ours parish and continued through the changing Quebec communities of her children.\n\nThe surviving baptism entry preserves a small but vivid detail: the godfather was Pierre Girouard, while the godmother’s surname is not clear in the available image. That uncertainty is retained rather than guessed. Marie-Élisabeth’s documented story is consequently the story of a Saint-Ours-born daughter, wife, and mother whose family carried the Philippin-Béfort and Thibault names into the Tellier and Laporte St-Georges households. The possible connection from Louise-Anne’s Pierre Goulet family to the later Gooley line remains open.'
  }
})();

(() => {
  'use strict';
  const byId = id => DATA.nodes.find(n => n.id === id);
  const louise = byId('louise_anne_tellier_1846');
  if (!louise) return;
  Object.assign(louise, {
    name: 'Louise-Anne Tellier',
    years: '1828–deceased',
    place: 'Sorel, Richelieu, Quebec → Sherbrooke region, Quebec',
    branch: 'Gooley / Goulet candidate',
    confidence: 'strong',
    note: 'Louise-Anne Tellier is the bride in the 25 May 1846 Saint-Michel-de-Sherbrooke marriage record. The indexed entry names her husband as Pierre Goulet and identifies her father as the late Jean-Baptiste Tellier. Family Tree separately links her to John Peter Gooley Sr; the identity bridge between Pierre Goulet and John Peter Gooley remains unproved.',
    evidence: [{
      kind: 'document',
      title: '1846 Saint-Michel-de-Sherbrooke marriage — Pierre Goulet and Louise-Anne Tellier',
      date: '25 May 1846',
      place: 'Saint-Michel, Sherbrooke, Quebec',
      sourcePage: 'https://www.familysearch.org/ark:/61903/1:1:X43B-2MYH?lang=en',
      provenance: 'Attached FamilySearch indexed parish-register entry, cross-checked in the authenticated source panel. FamilySearch reports that the underlying image is available only by browsing Film 005469436; the exact image page has not yet been captured.',
      summary: 'The indexed record names Pierre Goulet as husband and Louise Anne Tellier as bride, with original place ST MICHEL, SHERBROOKE, Sherbrooke, QC, Canada. The original image remains a document hold until a readable derivative is captured.',
      previewStatus: 'unavailable',
      failureReason: 'Underlying film image requires page-level browsing; no readable preview captured yet.'
    }]
  });
  if (typeof GUIDE_PROFILES !== 'undefined') {
    GUIDE_PROFILES.louise_anne_tellier_1846 = GUIDE_PROFILES.louise_anne_tellier_1846 || {};
    GUIDE_PROFILES.louise_anne_tellier_1846.birthPlace = 'Sorel, Richelieu, Quebec';
    GUIDE_PROFILES.louise_anne_tellier_1846.life = 'Louise-Anne Tellier was born in 1828 in Sorel, in the Richelieu region of Quebec, to Jean-Baptiste Tellier dit Benjamin and Marie-Élisabeth Béfort Philippin. She grew up in a large Tellier household whose roots reached back to Saint-Ours and whose later branches moved through the Richelieu and Sherbrooke communities.\n\nOn 25 May 1846, at Saint-Michel-de-Sherbrooke, Louise-Anne married a man identified in the parish index as Pierre Goulet. The entry names her as Louise Anne Tellier and gives her father as the late Jean-Baptiste Tellier. That record is a direct bridge from the Tellier family into the Goulet household, but it does not by itself establish that Pierre Goulet was the same person later represented in Family Tree as John Peter Gooley Sr.\n\nThe later family structure attributed to Louise-Anne includes children recorded under both Goulet and Gooley forms, including Peter John Gooley and other children in the Sherbrooke-area household. Those names preserve an important research trail through Quebec parish records, censuses, and later Vermont records. They should remain a bounded identity question rather than being harmonized by assumption.\n\nLouise-Anne’s documented story is therefore that of a Sorel-born Tellier daughter who entered the Sherbrooke parish network through an 1846 marriage recorded under the Pierre Goulet name. Her parents, her Tellier upbringing, and the indexed marriage are strongly supported. The transition from Pierre Goulet to John Peter Gooley remains an open historical problem requiring the original marriage image and additional primary records.'
  }
})();


(() => {
  'use strict';
  const byId = id => DATA.nodes.find(n => n.id === id);
  const david = byId('brenay_david');
  if (!david) return;
  Object.assign(david, {
    name: 'David Alvin Brenay',
    years: '1924–1937',
    place: 'Saginaw, Michigan → Mesa, Arizona',
    branch: 'Brenay collateral',
    confidence: 'strong',
    note: 'David Alvin Brenay was a short-lived child in the Charles Albert Brenay and Marian Beulah Skinner household. His six attached FamilySearch sources support a consistent Saginaw-to-Mesa chronology, while the memories preserve a direct sibling photograph and two contextual Brenay-family images. This is collateral evidence, not citizenship proof.',
    evidence: [
      {
        kind: 'photo',
        title: 'Joe, David, and Marion Brenay',
        date: 'Childhood photograph; uploaded 13 October 2025',
        place: 'Michigan, United States',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWVG-RCT',
        provenance: 'FamilySearch memory contributed by DeEdra Breckenridge; upload filename 0061_a-Repaired-Enhanced.jpg; tags Joseph Heber Brenay, David Alvin Brenay, and Marion Beulah Brenay.',
        summary: 'The contributor identifies the children left to right as Joe Brenay, David Brenay, and their sister Marion Brenay. The caption directly names David and places the photograph in Michigan during the children’s years.',
        confidence: 'captioned family photograph with person tags; preserved as family-memory evidence rather than a civil record',
        previewStatus: 'unavailable'
      },
      {
        kind: 'photo',
        title: 'Brenay clan plus Aunt Amanda',
        date: 'Uploaded 18 August 2015',
        place: 'Not stated',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWVG-RCT',
        provenance: 'Untitled FamilySearch memory attached to David’s page; contributed by ScottDaphne1; upload filename Brenay clan plus Aunt Amanda.jpg.',
        summary: 'The memory is retained as contextual Brenay-family collateral. The visible metadata tags Joseph Heber Brenay, Esther Brenay, Virginia Lee Brenay, Marian Beulah Skinner, and Arnold Albert Brenay; David is not among the visible tags, so the image is not treated as a direct portrait of him.',
        confidence: 'attached family-memory context; no direct David identification in the visible metadata',
        previewStatus: 'unavailable'
      },
      {
        kind: 'photo',
        title: 'Charles and Phebe Kingery family',
        date: 'Uploaded 31 December 2013',
        place: 'Not stated',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWVG-RCT',
        provenance: 'Titled FamilySearch memory attached to David’s page; contributed by Shannon24Eads; upload filename Kingery Charles Phoebe Lottie and John.jpg.',
        summary: 'This image is preserved as wider family context. The current memory metadata does not visibly identify David in the image, so it is not used as a direct identity claim.',
        confidence: 'contextual family-memory evidence; no direct David identification in the visible metadata',
        previewStatus: 'unavailable'
      }
    ]
  });
  if (typeof GUIDE_PROFILES !== 'undefined') {
    GUIDE_PROFILES.brenay_david = GUIDE_PROFILES.brenay_david || {};
    GUIDE_PROFILES.brenay_david.birthPlace = 'Saginaw, Saginaw County, Michigan';
    GUIDE_PROFILES.brenay_david.life = 'David Alvin Brenay was born on 15 March 1924 in Saginaw, Michigan, the son of Charles Albert Brenay and Marian Beulah Skinner. He belonged to a large Brenay household whose children carried the family through the interwar years and into the changing communities of the American Midwest and Southwest.\n\nThe FamilySearch record places David among thirteen children, including Marion, Joseph, Henry, Ruth, Moroni, Virginia, Esther, Martha, Ammon, and Joan. A childhood photograph captioned “Joe, David, and Marion Brenay” preserves a direct visual connection among three of the siblings. The contributor identifies them from left to right and places the photograph in Michigan, giving David’s brief life a rare human scale beyond the dates in a record.\n\nDavid’s family later appears in Mesa, Arizona, where he died on 7 November 1937 and was buried in Mesa Cemetery. Six attached sources include census and church-census entries, an Arizona death index, a GenealogyBank record, and a Find a Grave index entry. Together they support the basic chronology from Saginaw birth to Mesa death, while the records remain ordinary documentary anchors rather than a single complete narrative.\n\nTwo additional memories remain attached to David’s page: an untitled “Brenay clan plus Aunt Amanda” photograph and “Charles and Phebe Kingery family.” Their visible metadata supplies wider family context, but neither is treated here as a direct portrait of David without an explicit identification.\n\nDavid Alvin Brenay died at thirteen, before adulthood could leave the kinds of records that make a life easy to reconstruct. His documented place in the Brenay family is nevertheless clear enough to preserve: a Saginaw-born child, a brother in a large household, and a young member of the family’s move into the Mesa community. The surviving photograph and the six-source chronology keep his memory distinct without overstating what the evidence can prove.';
  }
})();

(() => {
  'use strict';
  const byId = id => DATA.nodes.find(n => n.id === id);
  const henry = byId('brenay_henry');
  if (!henry) return;
  Object.assign(henry, {
    name: 'Henry Brenay',
    years: '1926–1928',
    place: 'Mesa, Arizona → Socorro, New Mexico',
    branch: 'Brenay collateral',
    confidence: 'strong',
    note: 'Henry Brenay was a short-lived child in the Charles Albert Brenay and Marian Beulah Skinner household. Four attached FamilySearch sources preserve a consistent Arizona birth and New Mexico death trail; no memories are attached and no direct record image was opened in this pass.',
    evidence: []
  });
  if (typeof GUIDE_PROFILES !== 'undefined') {
    GUIDE_PROFILES.brenay_henry = GUIDE_PROFILES.brenay_henry || {};
    GUIDE_PROFILES.brenay_henry.birthPlace = 'Mesa, Maricopa County, Arizona';
    GUIDE_PROFILES.brenay_henry.life = 'Henry Brenay was born on 22 September 1926 in Mesa, Arizona, the son of Charles Albert Brenay and Marian Beulah Skinner. He was one of the children in the large Brenay household that carried the family through the interwar years and connected the Mesa community with the family’s later movements through the Southwest.\n\nHenry’s four attached FamilySearch sources include two entries for an Arizona birth-certificate index, a New Mexico death record, and a later GenealogyBank obituary entry in the record of his sister Virginia Lee Brenay Hawkins. The duplicate birth-index entries preserve the same 1926 identity, while the 1928 New Mexico death entry places the end of his life in Socorro County.\n\nHe died on 7 April 1928, before his second birthday. Unlike some of his siblings, Henry’s page has no attached memories, portraits, or family documents to enlarge the brief record. His place in the Brenay family is therefore preserved through the parent and sibling structure and through the small documentary trail that survives in the sources list.\n\nHenry’s story is necessarily modest: an Arizona-born child of Charles and Marian, remembered in the family’s later records as one of the siblings who died young. The available evidence supports the dates and family placement without supplying a new citizenship-grade record or a reason to extend the account beyond what the sources show.';
  }
})();

(() => {
  'use strict';
  const byId = id => DATA.nodes.find(n => n.id === id);
  const ruth = byId('brenay_ruth');
  if (!ruth) return;
  Object.assign(ruth, {
    name: 'Ruth Melvina Brenay',
    years: '1928–1929',
    place: 'Mesa, Arizona',
    branch: 'Brenay collateral',
    confidence: 'strong',
    note: 'Ruth Melvina Brenay was a short-lived child in the Charles Albert Brenay and Marian Beulah Skinner household. Her four attached sources include an Arizona birth index, a Mesa cemetery record, and a GenealogyBank obituary entry; a Find a Grave index is suggested but not attached. No memories are attached.',
    evidence: []
  });
  if (typeof GUIDE_PROFILES !== 'undefined') {
    GUIDE_PROFILES.brenay_ruth = GUIDE_PROFILES.brenay_ruth || {};
    GUIDE_PROFILES.brenay_ruth.birthPlace = 'Mesa, Maricopa County, Arizona';
    GUIDE_PROFILES.brenay_ruth.life = 'Ruth Melvina Brenay was born on 31 December 1928 in Mesa, Arizona, the daughter of Charles Albert Brenay and Marian Beulah Skinner. She was part of the large Brenay household whose children connected the family’s Mesa years with later movements through the American Southwest and Utah.\n\nRuth’s four attached FamilySearch sources include an Arizona birth-certificate index, a Mesa city-cemetery record, and a GenealogyBank obituary entry in the record of her sister Virginia Lee Brenay Hawkins. A Find a Grave index entry is suggested on the page but is not attached. The source pattern gives Ruth a concise documentary trail from birth to burial without supplying a newly opened original certificate or cemetery image.\n\nRuth died on 17 February 1929, only weeks after her birth. Her page has no attached memories or family photographs, so the surviving account rests on the source list and the parent-and-sibling structure preserved in Family Tree. The cemetery record is a useful burial lead, but it is not treated as citizenship-grade evidence for the direct Canadian line.\n\nRuth’s documented story is necessarily brief: a Mesa-born daughter of Charles and Marian, remembered in the family’s later records as one of the children who died in infancy. The available records support her dates and family placement while leaving the underlying Arizona certificate and cemetery image as future retrieval targets.';
  }
})();

(() => {
  'use strict';
  const byId = id => DATA.nodes.find(n => n.id === id);
  const virginia = byId('brenay_virginia');
  if (!virginia) return;
  Object.assign(virginia, {
    name: 'Virginia Lee Brenay',
    years: '1931–2010',
    place: 'Mesa, Arizona → Provo, Utah',
    branch: 'Brenay collateral',
    confidence: 'strong',
    note: 'Virginia Lee Brenay was a daughter of Charles Albert Brenay and Marian Beulah Skinner, a sister in the large Brenay household, and the wife of David Glenn Hawkins. Family photographs preserve her among the siblings in Mesa, at a 1955 Easter gathering in Lakeside, and at later family funerals and reunions. The handwritten letters and funeral-program memory remain family keepsakes rather than published document previews until their full readable transcription and translation are verified.',
    evidence: [
      {
        kind: 'photo',
        title: 'Charles Albert and Marian Brenay Family',
        date: '1942',
        place: 'Sandpoint, Bonner, Idaho',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWZ6-H5P',
        provenance: 'FamilySearch memory contributed by DeEdra Breckenridge on 26 January 2025; upload filename 1020022.jpg.',
        summary: 'The family caption identifies the children standing in back as Virginia, Esther, and Joe; sitting in chairs as Marion, Joan, and Charles; and on the porch as Martha and Ammon.',
        confidence: 'captioned family photograph; Virginia is named directly in the contributor description',
        previewStatus: 'unavailable'
      },
      {
        kind: 'photo',
        title: 'The Hawkins and Webb Families — Easter Visit',
        date: 'April 1955',
        place: 'Lakeside, Navajo, Arizona',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWZ6-H5P',
        provenance: 'FamilySearch memory contributed by DeEdra Breckenridge on 13 October 2025; upload filename 0059_a-Enhanced.jpg; tagged to David Glenn Hawkins, Virginia Lee Brenay, James Wilford Webb, and James Sheldon Webb.',
        summary: 'The caption identifies an extended-family Easter visit and names Virginia Hawkins among the group. It describes a visiting tradition between the Hawkins and Webb families that continued through the contributor’s childhood.',
        confidence: 'captioned family photograph with direct person tags and family context',
        previewStatus: 'unavailable'
      },
      {
        kind: 'photo',
        title: 'The Brenay Siblings Together',
        date: '2001',
        place: 'Mesa, Maricopa, Arizona',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWZ6-H5P',
        provenance: 'FamilySearch memory contributed by DeEdra Breckenridge on 7 November 2025; upload filename img0089-Enhanced.jpg; tagged to Arnold Albert Brenay, Marion Beulah Brenay, Virginia Lee Brenay, Martha Brenay, and Ammon Leroy Brenay.',
        summary: 'The contributor identifies the group left to right as Arnold Brenay, Marion Webb, Virginia Hawkins, Martha Lemmon, and Ammon Brenay, gathered at their brother Joseph Heber Brenay’s funeral in Mesa.',
        confidence: 'captioned family photograph with direct person tags',
        previewStatus: 'unavailable'
      },
      {
        kind: 'photo',
        title: 'Mom and Her Siblings',
        date: '28 June 1996',
        place: 'Mesa, Maricopa, Arizona',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWZ6-H5P',
        provenance: 'FamilySearch memory contributed by DeEdra Breckenridge on 7 November 2025; upload filename 0056_a-Enhanced.jpg; tagged to Arnold Albert Brenay, Marion Beulah Brenay, Joseph Heber Brenay, Virginia Lee Brenay, and Esther Brenay.',
        summary: 'The caption identifies a rare gathering at Marian Beulah Skinner Brenay’s funeral: Isaac and his wife, Ammon, Martha Lemmon, Esther Allred, Virginia Hawkins, Joseph, Marion Webb, and Arnold Brenay.',
        confidence: 'captioned family photograph with direct person tags; Isaac is preserved as a named collateral lead, not a newly asserted tree relationship',
        previewStatus: 'unavailable'
      },
      {
        kind: 'photo',
        title: 'Surviving Brenay Siblings at Arnold Brenay’s Funeral',
        date: 'October 2002',
        place: 'St. George, Washington, Utah',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWZ6-H5P',
        provenance: 'FamilySearch memory contributed by DeEdra Breckenridge on 10 September 2026; upload filename Uncle Arnold.pdf; tagged to James Wilford Webb, Ammon Leroy Brenay, Esther Brenay, Virginia Lee Brenay, and Marion Beulah Brenay.',
        summary: 'The contributor identifies the group left to right as Marion Webb, Virginia Hawkins, Esther Jensen, Martha Lemmon, Ammon Brenay, and Isaac Brenay. The memory contains a family-document image set; it is retained here as captioned family context, not as a readable published document.',
        confidence: 'captioned memory with direct person tags; Isaac remains an unresolved collateral identity lead',
        previewStatus: 'unavailable'
      }
    ]
  });
  if (typeof GUIDE_PROFILES !== 'undefined') {
    GUIDE_PROFILES.brenay_virginia = GUIDE_PROFILES.brenay_virginia || {};
    GUIDE_PROFILES.brenay_virginia.birthPlace = 'Mesa, Maricopa County, Arizona';
    GUIDE_PROFILES.brenay_virginia.life = `Virginia Lee Brenay was born on 15 September 1931 in Mesa, Arizona, the daughter of Charles Albert Brenay and Marian Beulah Skinner. She grew up in a large family whose early years moved between Arizona, Utah, and the wider Southwest. The surviving family photographs show her not as an isolated name in a record, but as one of the children in a close-knit household and one of the adults who kept that family visible across generations.

The Brenay home included older siblings Arnold and Marion, followed by David, Joseph, Henry, Ruth, Moroni, Virginia, Esther, Martha, Ammon, and Joan. A 1942 family photograph from Sandpoint, Idaho, identifies Virginia standing with Esther and Joe while other brothers and sisters sit nearby or gather on the porch. The caption preserves the arrangement of the household in a single frame and places Virginia within the everyday texture of the family’s wartime-era life.

In 1950, Virginia married David Glenn Hawkins in Mesa. Their marriage joined two local families whose lives remained closely connected. A 1955 Easter photograph from Lakeside records Virginia with David and members of the Hawkins and Webb families, including James Wilford Webb and James Sheldon Webb. The accompanying family account describes a tradition of alternating Easter visits between Lakeside and St. David, a custom that began before the contributor’s birth and continued through childhood. The photograph therefore preserves both the people present and the rhythm of visiting that linked the two families.

Virginia’s later years remain visible through several gatherings of the Brenay siblings. A 1996 photograph taken at the funeral of her mother, Marian Beulah Skinner Brenay, brings together Virginia, Marion, Joseph, Arnold, Esther, Martha, Ammon, and Isaac. A 2001 Mesa photograph taken at Joseph Heber Brenay’s funeral shows Virginia standing among Arnold, Marion, Martha, and Ammon. In 2002, at Arnold’s funeral in St. George, Virginia appears in a group identified from left to right as Marion Webb, Virginia Hawkins, Esther Jensen, Martha Lemmon, Ammon Brenay, and Isaac Brenay. These images show the siblings at moments of loss, but they also show the family’s persistence: brothers and sisters returning to one another as the years passed.

The family record places Virginia’s adult life in the communities of Mesa, Blanding, Navajo County, and Utah. Her death occurred in Provo on 4 February 2010, and she was buried at East Lawn Memorial Hills on 13 February. The later memories preserve the names she carried through adulthood—Virginia Lee Brenay and Virginia Lee Hawkins—while keeping her connected to the Brenay household of her childhood.

Virginia’s family memories also include handwritten letters from her grandmother, a funeral-program image, and other keepsakes. Those items preserve the emotional and documentary texture of the family, even when their text is not yet presented as a readable public record. The photographs that can be identified clearly already tell an important story: Virginia as a daughter among many siblings, a wife within the Hawkins family, a sister who gathered with the Brenays through marriage, funerals, and reunions, and a woman whose life remained woven into the family’s shared history from Mesa to Provo.`
  }
})();


(() => {
  'use strict';
  const esther = {
    id: 'brenay_esther',
    name: 'Esther Brenay',
    years: '1933–2018',
    place: 'Mesa, Arizona → Cedar City, Utah',
    branch: 'Brenay collateral',
    confidence: 'strong',
    note: 'Esther Brenay, known in family memories as Mickey, was the ninth of Charles Albert Brenay and Marian Beulah Skinner’s thirteen children. Her adult life included three marriages, two sons and a daughter, work as a bank teller, years of travel with a pipefitter husband, and a later home in Cedar City where she and Kenneth Allred served together.',
    x: 1.9, y: 3.35, z: -0.7,
    collateral: true,
    sideRoute: true,
    evidence: [
      {
        kind: 'photo',
        title: 'Esther and Kenneth',
        date: '12 October 2002',
        place: 'St. George, Washington, Utah',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWZ7-CRV',
        provenance: 'FamilySearch memory contributed by DeEdra Breckenridge on 7 November 2025; upload filename img0083-Enhanced.jpg; tagged to Kenneth Dwain Allred and Esther Brenay.',
        summary: 'The caption identifies Esther (Brenay) Allred with her husband Kenneth Allred at Arnold Brenay’s funeral and notes her bright smile.',
        confidence: 'captioned couple photograph with direct person tags',
        previewStatus: 'unavailable'
      },
      {
        kind: 'photo',
        title: 'Mom and Her Siblings',
        date: '28 June 1996',
        place: 'Mesa, Maricopa, Arizona',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWZ7-CRV',
        provenance: 'FamilySearch memory contributed by DeEdra Breckenridge on 7 November 2025; upload filename 0056_a-Enhanced.jpg.',
        summary: 'The contributor identifies Esther “Mickey” Allred in a rare gathering at the funeral of Marian Beulah Skinner Brenay, alongside Isaac, Ammon, Martha, Virginia, Joseph, Marion, and Arnold.',
        confidence: 'captioned family photograph with direct Esther identification',
        previewStatus: 'unavailable'
      },
      {
        kind: 'photo',
        title: 'Surviving Brenay Siblings at Arnold Brenay’s Funeral',
        date: 'October 2002',
        place: 'St. George, Washington, Utah',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWZ7-CRV',
        provenance: 'FamilySearch memory contributed by DeEdra Breckenridge on 10 September 2026; upload filename Uncle Arnold.pdf.',
        summary: 'The contributor identifies Esther Jensen in the sibling group gathered after Arnold Brenay’s funeral. The memory is preserved as captioned family context, not as a published document preview.',
        confidence: 'captioned family-memory evidence; Esther is identified by the contributor',
        previewStatus: 'unavailable'
      },
      {
        kind: 'photo',
        title: 'Charles Albert and Marian Brenay Family',
        date: '1942',
        place: 'Sandpoint, Bonner, Idaho',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWZ7-CRV',
        provenance: 'FamilySearch family memory attached across the Brenay sibling pages; contributor DeEdra Breckenridge, 26 January 2025; upload filename 1020022.jpg.',
        summary: 'The family caption identifies Esther standing in back with Virginia and Joe, with other siblings gathered around Charles and Marian.',
        confidence: 'captioned family photograph; Esther is named directly in the contributor description',
        previewStatus: 'unavailable'
      }
    ]
  };
  if (!DATA.nodes.some(n => n.id === esther.id)) DATA.nodes.push(esther);
  const map = window.__ATLAS_NODE_BY_ID;
  if (map) map.set(esther.id, esther);
  if (typeof parentMap !== 'undefined' && typeof childMap !== 'undefined') {
    for (const p of ['charles_albert','marian_skinner']) {
      if (!DATA.edges.some(e => e.a === esther.id && e.b === p)) DATA.edges.push({a:esther.id,b:p,confidence:'strong'});
      if (!parentMap.has(esther.id)) parentMap.set(esther.id, []);
      if (!parentMap.get(esther.id).includes(p)) parentMap.get(esther.id).push(p);
      if (!childMap.has(p)) childMap.set(p, []);
      if (!childMap.get(p).includes(esther.id)) childMap.get(p).push(esther.id);
    }
  }
  if (typeof GUIDE_PROFILES !== 'undefined') {
    GUIDE_PROFILES.brenay_esther = {
      birthPlace: 'Mesa, Maricopa County, Arizona',
      life: `Esther Brenay was born on 22 September 1933 in Mesa, Arizona, the ninth of the thirteen children of Charles Albert Brenay and Marian Beulah Skinner. In family memories she is often called Mickey, a name that follows her through the stories and photographs preserved by her brothers, sisters, and nieces. She grew up in a large household whose early years moved between Arizona and Utah, and whose members remained closely connected long after they left the childhood home.

A 1942 family photograph from Sandpoint, Idaho, places Esther standing in back with Virginia and Joe, while Marion, Joan, and Charles sit in chairs and Martha and Ammon sit on the porch. The arrangement preserves the family at a particular moment in wartime America, when the children’s ages stretch from the older siblings into the youngest part of the household. Esther’s later memories continue that same family thread: a 1996 photograph at her mother Marian’s funeral identifies her among Isaac, Ammon, Martha, Virginia, Joseph, Marion, and Arnold, a rare gathering of the siblings together.

In December 1950, Esther married Hardy Howell Segler Sr. in Kingman, Arizona. They moved to Henderson, Nevada, where Hardy worked at the titanium plant and Esther worked as a bank teller. Their children included Denny, born in 1952, Hardy Jr., born in 1954, and Judy Lynn, born in 1956. The family’s later account remembers Esther as a working mother during a period when the expanding industries of the Southwest drew families across state lines. Her first marriage eventually ended in divorce.

Esther married Rupert Lane in March 1964. His work as a pipefitter took them to many parts of the United States, giving their marriage a life shaped by travel and changing communities. Rupert died of cancer in 1988. The following year Esther married Kenneth Dwain Allred in Riviera, near Bullhead City, Arizona. In 1990 they moved to Oklahoma to be closer to Kenneth’s family, and in November 1991 they were sealed in the Dallas Texas Temple. They soon realized that the distance from Esther’s family was too great and returned west, settling in Cedar City, Utah.

In Cedar City, Esther and Kenneth served together in church callings. Their favorite work was as ordinance workers in the St. George Temple, a service that linked their later years to the southern Utah communities where Esther’s siblings and extended family continued to gather. A 12 October 2002 photograph shows Esther and Kenneth together at Arnold Brenay’s funeral in St. George; the caption remembers her bright smile, even in a day of mourning.

Esther died peacefully at home in Cedar City on 4 May 2018, aged eighty-four, and was buried in Cedar City Cemetery. Her obituary remembered her sons Denny and Hardy Jr., sixteen grandchildren, twenty-seven great-grandchildren, and one great-great-grandchild, along with brothers LeRoy and Isaac and brother-in-law Tony Lake. It also named the family members who had gone before her, including Kenneth, Judy Lynn, her parents, and several brothers and sisters.

The written memories attached to Esther’s family preserve more than dates. A remembrance of Joe, written by his sister Mickey, recalls his kindness and care for the family; a separate tribute explains why his brothers and sisters continued to remember him. Esther’s life appears in those memories as a daughter, sister, mother, wife, worker, traveler, and temple servant whose family ties remained active across Arizona, Nevada, Oklahoma, and Utah. Her bright smile in the 2002 photograph is one small surviving emblem of that long, shared life.`
    };
  }
})();


(() => {
  'use strict';
  const joan = {
    id: 'brenay_joan',
    name: 'Joan Carol Brenay',
    years: '1939–2016',
    place: 'Mesa, Arizona → Delta, Utah',
    branch: 'Brenay collateral',
    confidence: 'strong',
    note: "Joan Carol Brenay’s record is anchored in the Charles Albert Brenay and Marian Beulah Skinner family and in a single captioned 1942 family photograph. Her death entry remains a family-record claim with zero attached sources; do not present it as independently documented.",
    x: 2.35, y: 3.55, z: -0.75,
    collateral: true,
    sideRoute: true,
    evidence: [
      {
        kind: 'photo',
        title: 'Charles Albert and Marian Brenay Family',
        date: '1942',
        place: 'Sandpoint, Bonner, Idaho',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/LFCL-G8L',
        provenance: 'FamilySearch memory contributed by DeEdra Breckenridge on 26 January 2025; upload filename 1020022.jpg.',
        summary: 'The caption identifies Joan seated in a chair between Marion and Charles, with Virginia, Esther, and Joe standing behind and Martha and Ammon on the porch.',
        confidence: 'captioned family photograph with direct Joan identification',
        previewStatus: 'unavailable'
      }
    ]
  };
  if (!DATA.nodes.some(n => n.id === joan.id)) DATA.nodes.push(joan);
  const map = window.__ATLAS_NODE_BY_ID;
  if (map) map.set(joan.id, joan);
  if (typeof parentMap !== 'undefined' && typeof childMap !== 'undefined') {
    for (const p of ['charles_albert','marian_skinner']) {
      if (!DATA.edges.some(e => e.a === joan.id && e.b === p)) DATA.edges.push({a:joan.id,b:p,confidence:'strong'});
      if (!parentMap.has(joan.id)) parentMap.set(joan.id, []);
      if (!parentMap.get(joan.id).includes(p)) parentMap.get(joan.id).push(p);
      if (!childMap.has(p)) childMap.set(p, []);
      if (!childMap.get(p).includes(joan.id)) childMap.get(p).push(joan.id);
    }
  }
  if (typeof GUIDE_PROFILES !== 'undefined') {
    GUIDE_PROFILES.brenay_joan = {
      birthPlace: 'Mesa, Maricopa County, Arizona',
      life: "Joan Carol Brenay was born on 21 August 1939 in Mesa, Arizona, the twelfth child in the Charles Albert Brenay and Marian Beulah Skinner household. Her Family Tree record places her among the thirteen Brenay children and preserves the family’s movement between Arizona and Utah during the years of her childhood. The 1942 family photograph from Sandpoint, Idaho, identifies Joan seated in a chair between Marion and Charles, with Virginia, Esther, and Joe standing behind and Martha and Ammon on the porch. It is the only linked family memory currently attached to Joan, but it gives her a clear place within the household rather than leaving her as a name alone.\n\nJoan’s later record follows the same western family geography. The source inventory includes 1940, 1950, and 1955 church-census records, United States census material, and residence entries for Navajo County, Manti, and the wider Utah region. Several of the attached records are index or census records rather than newly opened images, so they are retained as supporting context rather than presented as a single definitive life narrative.\n\nOn 4 February 1956, Joan married Anthony Fielding Lake in Kingman, Arizona. Their Family Tree page shows the marriage and no attached children. Joan is also recorded under the married name Joan Carol Lake. The couple’s later family record connects her to Delta, Utah, where she died on 16 July 2016. The death entry is attributed to family records and currently has no attached source; that limitation remains visible in the audit rather than being silently converted into a sourced fact.\n\nJoan’s life is therefore preserved through a combination of census traces, church-census records, residence clues, her marriage connection to Anthony Lake, and the 1942 Brenay family portrait. The photograph’s caption is especially valuable because it identifies Joan in relation to both her parents and siblings: she appears not as an isolated record, but as part of the large family whose later gatherings and memories continue through the Atlas. Her page adds geographic continuity from Mesa to Kingman and Delta while keeping the unsourced 2016 death claim appropriately bounded."
    };
  }
})();


(() => {
  'use strict';
  const martha = {
    id: 'brenay_martha',
    name: 'Martha Brenay',
    years: '1935–2013',
    place: 'Blanding, Utah → Ogden, Utah',
    branch: 'Brenay collateral',
    confidence: 'strong',
    note: "Martha Brenay’s page provides a documented Utah birthplace and residence trail, a 1954 St. George marriage, four captioned family photographs, and a four-page handwritten-letter hold. Preserve the Larry Lemmon duplicate/step-family presentation as a cleanup lead rather than asserting a second biological child.",
    x: 2.15, y: 3.5, z: -0.8,
    collateral: true,
    sideRoute: true,
    evidence: [
      {
        kind: 'photo',
        title: 'The Brenay Siblings Together',
        date: '2001',
        place: 'Mesa, Maricopa, Arizona',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWC1-XFC',
        provenance: 'FamilySearch memory contributed by DeEdra Breckenridge on 7 November 2025; upload filename img0089-Enhanced.jpg.',
        summary: 'The caption identifies Arnold, Marion, Virginia, Martha, and Ammon at their brother Joseph Heber Brenay’s funeral in Mesa.',
        confidence: 'captioned family photograph with direct Martha identification',
        previewStatus: 'unavailable'
      },
      {
        kind: 'photo',
        title: 'Mom and Her Siblings',
        date: '28 June 1996',
        place: 'Mesa, Maricopa, Arizona',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWC1-XFC',
        provenance: 'FamilySearch memory contributed by DeEdra Breckenridge on 7 November 2025; upload filename 0056_a-Enhanced.jpg.',
        summary: 'The caption identifies Martha among Isaac, Ammon, Esther, Virginia, Joseph, Marion, and Arnold at Marian Beulah Skinner Brenay’s funeral.',
        confidence: 'captioned family photograph with direct Martha identification',
        previewStatus: 'unavailable'
      },
      {
        kind: 'photo',
        title: 'Brenay Family',
        date: '10 October 2025 upload',
        place: 'Family gathering',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWC1-XFC',
        provenance: 'FamilySearch memory contributed by DeEdra Breckenridge on 10 October 2025; upload filename 0013_a-Repaired.jpg.',
        summary: 'The caption names Martha (Brenay) Lemmon with Charles Albert, Marian Skinner, Esther, Joseph, Marion, and Arnold around a dining table.',
        confidence: 'captioned family photograph with direct Martha identification',
        previewStatus: 'unavailable'
      },
      {
        kind: 'photo',
        title: 'Charles Albert and Marian Brenay Family',
        date: '1942',
        place: 'Sandpoint, Bonner, Idaho',
        sourcePage: 'https://www.familysearch.org/en/tree/person/memories/KWC1-XFC',
        provenance: 'FamilySearch family memory attached across the Brenay sibling pages; contributor DeEdra Breckenridge, 26 January 2025; upload filename 1020022.jpg.',
        summary: 'The caption places Martha on the porch with Ammon; Virginia, Esther, and Joe stand behind, while Marion, Joan, and Charles sit in chairs.',
        confidence: 'captioned family photograph; Martha is named directly in the contributor description',
        previewStatus: 'unavailable'
      }
    ]
  };
  if (!DATA.nodes.some(n => n.id === martha.id)) DATA.nodes.push(martha);
  const map = window.__ATLAS_NODE_BY_ID;
  if (map) map.set(martha.id, martha);
  if (typeof parentMap !== 'undefined' && typeof childMap !== 'undefined') {
    for (const p of ['charles_albert','marian_skinner']) {
      if (!DATA.edges.some(e => e.a === martha.id && e.b === p)) DATA.edges.push({a:martha.id,b:p,confidence:'strong'});
      if (!parentMap.has(martha.id)) parentMap.set(martha.id, []);
      if (!parentMap.get(martha.id).includes(p)) parentMap.get(martha.id).push(p);
      if (!childMap.has(p)) childMap.set(p, []);
      if (!childMap.get(p).includes(martha.id)) childMap.get(p).push(martha.id);
    }
  }
  if (typeof GUIDE_PROFILES !== 'undefined') {
    GUIDE_PROFILES.brenay_martha = {
      birthPlace: 'Blanding, San Juan County, Utah',
      life: "Martha Brenay was born on 26 July 1935 in Blanding, San Juan County, Utah, a birthplace that distinguishes her from the older Brenay siblings whose records often begin in Mesa, Arizona. Her Family Tree page places her among the thirteen children of Charles Albert Brenay and Marian Beulah Skinner and preserves a later residence trail through Navajo County, Manti, Hurricane, Florida, Ogden, and Hinckley. The record shows how the family’s geography widened across the American West while keeping the Brenay household connected.\n\nMartha married Larry Allred Lemmon on 12 June 1954 in St. George, Utah. The couple’s page shows the marriage and no attached children. Martha is also recorded under the married name Martha Lemmon. A separate Larry Lemmon entry appears in the parent-family list beside Martha; that duplicate or step-family presentation is preserved as a tree-cleanup lead, not normalized into a claim about an additional biological child.\n\nThe family photographs attached to Martha’s page place her within several generations of Brenay memory. In the 2001 photograph taken at Joseph Heber Brenay’s funeral in Mesa, Martha stands in the identified line between Virginia Hawkins and Ammon, alongside Arnold and Marion. A 1996 photograph at her mother Marian’s funeral names Martha among Isaac, Ammon, Esther, Virginia, Joseph, Marion, and Arnold, a rare gathering of the siblings. Another family photograph from 1942, taken in Sandpoint, Idaho, places Martha on the porch with Ammon while Joan, Charles, and Marion sit in chairs and Virginia, Esther, and Joe stand behind. A later family photograph around the dining table names Martha with her parents, Esther, Joseph, Marion, and Arnold.\n\nMartha’s source inventory includes census and church-census records, the 1954 Western States Marriage Index and Utah marriage entry, public-record indexes, Social Security, and GenealogyBank obituary entries. Several records carry unfinished-attachment notices, and no single source should be treated as the complete account of her life. The page also preserves a four-page January 1985 set of handwritten letters from Grandma Brenay. Those letters are kept as a documentary hold until a readable public preview and complete original-language transcription/translation can be verified.\n\nMartha died on 26 May 2013 in Ogden, Utah, and the tree records burial on 1 June at Aultorest Memorial Park. Her page therefore contributes a clear Utah branch to the family story: a Blanding birth, a St. George marriage, years connected with Manti and other Utah communities, and an Ogden life remembered through family photographs and handwritten keepsakes."
    };
  }
})();
