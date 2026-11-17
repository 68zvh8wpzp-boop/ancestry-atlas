/* Original-evidence reference overlay, audit A141-A153, 16 Nov 2026.
   Link-only entries deliberately DO NOT claim that private Research Library
   originals are packaged in the public Atlas. Narrative/audio unchanged. */
(() => {
  'use strict';
  if (typeof DATA === 'undefined' || !Array.isArray(DATA.nodes)) return;
  const byId = id => DATA.nodes.find(n => n.id === id);
  const linkRecord = (personId, item) => {
    const n = byId(personId);
    if (!n) return;
    n.evidence = Array.isArray(n.evidence) ? n.evidence : [];
    if (n.evidence.some(e => e.atlasEvidenceId === item.atlasEvidenceId || e.title === item.title)) return;
    n.evidence.push(Object.assign({ kind: 'document', previewStatus: 'Original preserved in private Research Library; scan not embedded in this Atlas build' }, item));
  };
  const census1787 = {
    atlasEvidenceId: 'a141-peder-1787-census',
    title: '1787 Fanefjord census — Zander Madsen household (original)',
    date: '1787',
    place: 'Bredemad, Fanefjord, Møn, Denmark',
    sourceLevel: 'original',
    sourcePage: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CS21-P9MT-D?view=explore&action=view&cc=2790466&lang=en&groupId=TH-909-72893-18837-32',
    provenance: 'Danish National Archives; 1787 census, manuscript p.334, FamilySearch image 117/2117, DGS 103918407. Original reviewed and saved, audit A141.',
    summary: 'Contemporary household lists Zander Madsen, Margrete Andersdatter and son Peder, recorded aged 8. The age conflicts with Peder\'s indexed 1777 baptism; discrepancy retained.',
    confidence: 'Original page reviewed; person identity supported, census-age discrepancy unresolved.'
  };
  const baptism1777 = {
    atlasEvidenceId: 'a142-peder-1777-baptism',
    title: 'Peder — 1777 Fanefjord baptism, entry 12 (original)',
    date: '11 May 1777 (indexed christening)',
    place: 'Fanefjord, Møn, Denmark',
    sourceLevel: 'original',
    sourcePage: 'https://arkivalieronline.rigsarkivet.dk/da/billedviser?epid=17114637#149307,24690457',
    additionalSourcePage: 'https://www.familysearch.org/ark:/61903/1:1:H2H9-C6W2',
    provenance: 'Fanefjord Enesteministerialbog, F 1777–1794, register entry 12, archive image 24690457; full spread preserved in audit A142. FamilySearch indexed baptism H2H9-C6W2.',
    summary: 'The indexed baptism identifies father Levin Zander Madsen and mother Margrethe Andersdatter. Original entry 12 is faint; full Danish wording and witnesses have not been confidently transcribed. Baptism is not a certified birth date.',
    confidence: 'Original preserved, indexed names corroborative; full literal transcription pending.'
  };
  const census1801 = {
    atlasEvidenceId: 'a151-peder-1801-census',
    title: '1801 Fanefjord census — Peder and parental household (original)',
    date: '1 February 1801',
    place: 'Tostenæs og Bredemad, Fanefjord, Møn, Denmark',
    sourceLevel: 'collection',
    sourcePage: 'https://arkivalieronline.rigsarkivet.dk/da/rif/select/7/16489625',
    provenance: 'Danish National Archives, Folketælling 1801, Præstø Amt, Mønbo Herred, Fanefjord Sogn, viewer image 29/36, manuscript p.128; user-supplied complete original preserved in audit A151. Link leads to collection selector, not image 29.',
    summary: 'Original household 3 is associated with Levin Sander Madsen, Margrethe Andersdatter and Peder. Family identification strongly supported in context; complete diplomatic transcription, including precise name and age glyphs, remains pending.',
    confidence: 'Original scan preserved, family match strongly supported; verbatim household transcription unfinished.'
  };
  const marriage1802 = {
    atlasEvidenceId: 'a145-peder-ane-marriage',
    title: 'Peder Sandersen and Ane Kirstine Jørgensdatter — 1802 marriage (original)',
    date: '22 May and 9 July 1802',
    place: 'Fanefjord, Møn, Denmark',
    sourceLevel: 'original',
    sourcePage: 'https://arkivalieronline.rigsarkivet.dk/da/billedviser?epid=17114637#149305,24690196',
    provenance: 'Fanefjord Enesteministerialbog 1802, entry 8, archive image 24690196; full original scan supplied, inspected and saved in Research Library, audit A145.',
    summary: 'Entry 8 records the couple, registration on 22 May and a marginal marriage date of 9 July 1802, resolving the June-versus-July conflict. Guarantors probably Sander Madsen and Christen Nielsen; exact legal wording not yet fully transcribed. Guarantor status alone does not prove parentage.',
    confidence: 'Original directly supports couple and July 9 marriage date; full literal transcription pending.'
  };
  linkRecord('peder_sandersen', census1787);
  linkRecord('peder_sandersen', baptism1777);
  linkRecord('peder_sandersen', census1801);
  linkRecord('peder_sandersen', marriage1802);
  linkRecord('peder_sandersen', {
    atlasEvidenceId: 'a159-juhlbjerg-parcel21',
    title: 'Juhlbjerggård — historic Hårbølle farm parcel 21 (mapped candidate)',
    date: 'by 1834; later identification 2000 / 2010',
    place: 'Juhlbjerg, Vindebækvej 8, Hårbølle, Møn, Denmark',
    kind: 'document',
    sourceLevel: 'index',
    sourcePage: 'https://slaegtsbibliotek.dk/914001.pdf#page=58',
    provenance: 'Anton Blaabjerg, "Egmont og Møn," Slægten 21 (2000), printed p57 (PDF p58), identifies Peder Sandersen at Hårbølle matr.nr. 21 by 1834. Jonna Kjær-Nielsen, "Helgåringer i Hårbølle," Fanefjordhistorier (2010, reproducing 1982 Møns Tidende and local farm register), identifies matr. 21 as Juulbjerg/Juhlbjerg, Vindebækvej 8: https://abcdocz.com/doc/3126641/tryk-her . Danske Gårde i Tekst og Billeder, Storstrøms Amt II (early 1990s), "Hjulbjerggård" at the same street address: https://slaegtsbibliotek.dk/922555.pdf . Modern coordinate/address source: https://www.dingeo.dk/adresse/4792-askeby/vindeb%C3%A6kvej-8/ .',
    summary: 'Strong cross-source identification of Peder’s reported 1834 Hårbølle farm parcel 21 with the historic farm named Juulbjerg/Juhlbjerg (also Hjulbjerggård), now mapped to Vindebækvej 8 at 54.89532812 N, 12.1928158 E. Current building dates from about 1914–1919, not Peder’s lifetime. Historical farmstead footprint, land tenure and exact transfer are not yet confirmed by a contemporary deed or cadastral map; the modern parcel numbering may have changed. A separate Møn smithy history, archived as D212 (2018), also labels Himmerigssmedjen on parcel 25 at Vindebækvej 8, demonstrating why the address cannot alone resolve 1830s boundaries or farmhouse position. The original farm listing groups parcels 21 and 22 as old farm no. 5 before subdivision.',
    confidence: 'Strong historically matched farm name/parcel/address; original 1830s deed or cadastral map remains uninspected; modern building not an ancestral-era structure.',
    previewStatus: 'Mapped historic farm-site candidate · sources are published transcriptions and modern address geodata; no original farm image embedded.'
  });
  linkRecord('levin_madsen', census1787);
  linkRecord('levin_madsen', census1801);
  linkRecord('margrethe_anders', census1787);
  linkRecord('margrethe_anders', census1801);
  linkRecord('ane_kirstine', marriage1802);
  linkRecord('ane_kirstine', {
    atlasEvidenceId: 'a147-ane-1801-census',
    title: '1801 Fanefjord census — Ane Kirstine in Christen Nielsen household (original)',
    date: '1 February 1801',
    place: 'Tostenæs og Bredemad, Fanefjord, Møn, Denmark',
    sourceLevel: 'collection',
    sourcePage: 'https://arkivalieronline.rigsarkivet.dk/da/rif/select/7/16489625',
    provenance: 'Danish National Archives, Folketælling 1801, viewer image 30/36, manuscript p.129, household 11; user-provided scan preserved, audit A147. Link leads to the parish census selector, not directly to page 30.',
    summary: 'Ane Kirstine Jørgensdatter, reported age 23, appears as a servant in the household of Christen Nielsen, whose name recurs as a marriage guarantor in 1802. Identification is supported, but exact full-household transcription remains pending.',
    confidence: 'Original captured; name, age and associated guarantor cross-reference are strongly supported.'
  });
  const peder = byId('peder_sandersen');
  if (peder) peder.note = 'Father of Helena/Lene Pedersdatter. Fanefjord originals now retained for his 1777 baptism, 1787 and 1801 censuses, and his 9 July 1802 marriage to Ane Kirstine Jørgensdatter. His age in the 1787 census differs from the reported 1777 baptism. A published genealogical study places him on Hårbølle farm parcel 21 by 1834; a separate village history identifies that historic farm as Juhlbjerggård, now Vindebækvej 8 (54.89532812 N, 12.1928158 E). The present farmhouse dates to the early twentieth century and is not his original home. Historic parcel footprint and tenure remain unverified; an archived history places a smithy on parcel 25 at the same modern street address. The 1792 confirmation and 1846 burial also await original verification. Separate archival catalog entries associate parcel 25, a smithy, with the same modern address; a historical cadastral sheet is needed to confirm Peder’s dwelling footprint.';
  const ane = byId('ane_kirstine');
  if (ane) ane.note = 'Mother of Helena/Lene Pedersdatter; her 9 July 1802 marriage to Peder Sandersen is confirmed in the Fanefjord church register, and the 1801 census records an Ane Kirstine in Christen Nielsen\'s household. Proposed parents Jørgen Larsen and Maren Andersdatter remain unproven by an independently inspected baptism.';
})();