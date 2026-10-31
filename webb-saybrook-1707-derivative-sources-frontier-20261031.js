/* Webb Tranche 129 — 31 October 2026: EARLY SAYBROOK SOURCE-AUDIT ONLY.
 * Does NOT create people, parent-child edges, or claimed original 1707 images.
 * Keeps 1777 James Webb Jr. father-identity and older ancestry unresolved.
 * Harrison E. Webb TAG 22(1):44–47 (1945) and 22(3):200 (1946)
 * quote different Saybrook Land Records II:209 and II:208 documents.
 * The 1707 original deed pages are UNREAD in our research.
 */
(()=>{
  'use strict';
  const f=globalThis.RESEARCH_FRONTIERS?.frontiers?.find(x=>x.branchId==='webb');
  if(!f||globalThis.__ATLAS_WEBB_SAYBROOK1707_T129?.applied)return;
  const add=(field,value)=>{
    if(!Array.isArray(f[field]))f[field]=[];
    if(!f[field].includes(value))f[field].push(value);
  };
  add('evidenceFor',
    'EARLY SAYBROOK CANDIDATE FAMILY ONLY — Harrison E. Webb, TAG 22(1) (July 1945):44–47, quotes a 22 Apr 1731 Saybrook land deed and bond (IV:340) naming deceased John Webb as father of Samuel and Lydia Webb. These are published quotations, NOT original book images. No demonstrated relationship to our James Webb born 1777.'
  );
  add('limitsAndConflicts',
    'Harrison E. Webb, TAG 22(3) (Jan 1946):200, quotes a 31 July 1707 Saybrook Land Records II:208 John Webb–John Graves deed referring to “my honored mother Hannah Davis, widow.” The original has NOT been inspected; Davis in 1707 is NOT established as her maiden surname. This historical woman is NOT proved to be our direct ancestor.'
  );
  add('limitsAndConflicts',
    'A different same-date 31 July 1707 deed, Deacon William Parker to John Webb (Saybrook II:209), is referenced in TAG 22(1):44 (July 1945). Do not combine volume-II pages 208 and 209 into one deed. The 1707 originals and the 1731 father-naming original remain unread.'
  );
  add('recordsNeeded',
    'Original Saybrook Land Records volume II, pp. 208–209 (two distinct 31 July 1707 deeds). FamilySearch catalog 29010 under Deep River / Saybrook historical land records is a possible locator, but exact volume images remain sign-in gated and have NOT been verified; no fee or other restriction bypass.'
  );
  add('recordsNeeded',
    'Original Saybrook Land Records IV:340 and accompanying 1731 bond, to test the published wording John Webb → Samuel and Lydia. This belongs to the historical Saybrook cluster until an independent record links it to our 1777 Webb ancestry.'
  );
  // Tranche 130: source-custody correction only, no ancestry promotion.
  add('recordsNeeded',
    'The Deep River Town Clerk is the historical keeper of early Saybrook Colony records (town genealogy page, verified 31 October 2026): https://www.deepriverct.us/380/Genealogical-Research. Its public https://deepriver.ct.publicsearch.us/ portal does not verify a 1707 coverage window; town guidance says online deed images may cost money. Do not treat modern Old Saybrook 1854+ holdings as the original 1707 book or pay to view images.'
  );
  add('limitsAndConflicts',
    'Connecticut State Library newly digitized Deep River [Saybrook] Vital Records 1767–1851 begin too late to reproduce the 1707 Saybrook deeds. A separate Colchester 1697–1729 collection is a different jurisdiction, not proof of Saybrook entries. The 1707 and 1731 historical deed manuscripts have NOT been seen.'
  );
  // Tranche 131: 1848 online portal boundary, confirmed by user Advanced Search screenshot.
  add('limitsAndConflicts',
    'User-tested official Deep River Advanced Search starts its recorded-date range at 30 August 1848. The Northeast House Historian Connecticut land-record directory independently lists online Deep River coverage as 8/30/1848–present. Thus the modern online portal is CLOSED as a viable source of the 1707 and 1731 Saybrook deed images; this says nothing about survival of older physical town volumes.'
  );
  add('recordsNeeded',
    'Do NOT repeat https://deepriver.ct.publicsearch.us/ for 1707/1731: its online index begins 30 August 1848. Research the HISTORICAL Deep River Town Clerk colonial Saybrook books or Connecticut State Library archival custody; original volume II pp. 208–209 remain unread, and direct ancestry remains unproved.'
  );
  // T132: Connecticut State Library microfilms and interlibrary loans (no new kinship).
  add('recordsNeeded',
    'Connecticut State Library research confirms colonial Connecticut town land-record microfilms are held by the State Library or available through Family History Centers. The exact Saybrook Land II:208-209 film or accessible original has NOT been located. Source: https://libguides.ctstatelibrary.org/hg/maps/landrecords'
  );
  add('recordsNeeded',
    'State Library interlibrary loan is a CONDITIONAL, library-to-library route: https://portal.ct.gov/csl/about/interlibrary-loans---ill . Eligible copies of up to 10 pages are no-charge BY CSL, but the 1707 Saybrook deed copies may be ineligible and a receiving library may assess fees. No request made, no fee approved. Do not ask the user to revisit Deep River 1848+ or FamilySearch restricted images.'
  );
  // T133 CHS half-box collection: different archival series, NOT the original town volume.
  add('limitsAndConflicts',
    'ArchiveGrid identifies the separate Connecticut Historical Society Saybrook town records collection 1656–1834 as only half a box (0.25 linear feet) of assembled deeds, tax, court, and municipal loose papers; five accession numbers 18476 / 38139 / 48376 / 54439 / 54449. This is NOT shown to be the official town land-record Book II. No named Webb or 1707 item was identified from the brief collection description, which is NOT a negative search of the manuscripts. https://researchworks.oclc.org/archivegrid/collection/data/74277973'
  );
  f.nextProof='Our direct-line priority remains a contemporary parent-naming original that differentiates James Webb Jr. (born 1777)\'s father from the c1733 Chatham and 1754 Saybrook namesakes. A parallel, more remote Saybrook source test targets Land Records II:208–209 (1707) and IV:340 (1731); original images remain unread. No earlier family is promoted from scholarly quotations alone.';
  globalThis.__ATLAS_WEBB_SAYBROOK1707_T129={
    applied:true,original1707Inspected:false,original1731Inspected:false,
    directLinePromoted:false,personEdgesChanged:0,
    sourceReport:'research/webb-tranche129-saybrook-1707-land-records-vol2-access-and-Atlas-frontier-20261031.md'
  };
})();
