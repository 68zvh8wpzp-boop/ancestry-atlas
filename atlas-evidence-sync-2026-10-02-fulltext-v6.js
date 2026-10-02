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
