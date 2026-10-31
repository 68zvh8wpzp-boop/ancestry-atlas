/* Ancestry Atlas research-only Webb identity caution — Tranche 135, 2026-10-31.
 * The other James Webb reportedly died Feb 1835 in Ohio and married Anna Scott;
 * our direct James Webb Jr died 1845 and married Betsey Favill then Hannah Griswold.
 * Family history is derivative; no 1835 Ohio death original examined.
 * DOES NOT ADD ANY ANCESTOR NODE, PARENT EDGE OR BIOGRAPHY.
 */
(()=>{
  'use strict';
  if(globalThis.__ATLAS_WEBB_ANNA_SCOTT_T135?.applied)return;
  const frontier=globalThis.RESEARCH_FRONTIERS?.frontiers?.find(f=>f.branchId==='webb');
  if(!frontier)return;
  const add=(key,value)=>{
    if(!Array.isArray(frontier[key]))frontier[key]=[];
    if(!frontier[key].includes(value))frontier[key].push(value);
  };
  add('limitsAndConflicts',
    'New York same-name caution (T135): A separately researched James Webb and Anna Scott family reportedly lived in Herkimer/Oneida and nearby New York c1800–1830; family writers give James c1774–6 February 1835 Ohio and children Isaac (1802), David (1811), William (1819). Our James Webb Jr (1777–1845) is associated with Betsey Favill, then Hannah Griswold. These histories are DERIVATIVE, with some shared citations: do not merge households or confuse either with the elder Chatham/Saybrook father candidates. https://www.jameswebbfamily.org/jameswebbfamilybydonaldwebb.pdf'
  );
  add('limitsAndConflicts',
    'The 1804 Brookfield and 1808 Manheim James Webb deeds (original images already examined in T116/T117) cannot be placed in either family by surname and New York geography alone. Even the Anna Scott family historian cautioned that he could not identify the grantor as his own James. The March 18, 1835 Hanover James-and-Hannah deed (T118) postdates the rival family’s REPORTED February 6, 1835 death, but that Ohio death date has NOT been original-verified; use it as a proposed discriminator only.'
  );
  add('recordsNeeded',
    'Only a freely accessible, original, identity-bearing 1835 Ohio death/probate for James Webb husband of Anna Scott would test the reported death-date difference; no generic repeat of earlier 1804/1808 deeds or paid repository search.'
  );
  // Tranche 136 correction: Mayfield is an unverified death-place tradition, and specific originals are unread.
  add('limitsAndConflicts',
    'T136: Donald D. Webb (1979, p.4–5) reports the Anna Scott family James Webb died 6 February 1835, attributed to a record involving son Charles; the family tradition places death in Mayfield, CUYAHOGA County (not Perry, Geauga). No grave or original death/service record has been read; the author merely speculated about an accidental logging death. Treat date, place and cause as unconfirmed. Cuyahoga volunteer probate alpha index 1826–1904 has no James in its published Webb section, a limited INDEX NON-HIT (not proof that no probate exists).'
  );
  add('recordsNeeded',
    'T136 exact original test: freely view the item labeled Pension Affidavit Anna Webb, Charles Webb Military Service, 1849, linked from https://www.jameswebbfamily.org/webb_genealogical_findings_002.htm ; if legible, determine whether Anna names deceased husband James or death particulars. Actual image NOT yet accessed; 1979 author also lists claim 76629 / warrant 67318, unverified.'
  );
  add('recordsNeeded',
    'T136 separate Geauga original-deed retrieval target: Book 19 p244 Mary Call → James Webb (11 April 1834 in index) and p246 James Webb Jr → Gideon Moshier (14 February 1834 in index), Perry Lot25 two acres, historical film0020238. Both are VOLUNTEER INDEX ENTRIES ONLY; do not assume buyer and seller identical or that Jr refers to our James born 1777. Check original execution/recording date discrepancy if freely available.'
  );
  globalThis.__ATLAS_WEBB_ANNA_SCOTT_T135={
    applied:true,version:'2026-10-31-t135',class:'derivative-namesake-caution',
    namesakeMaritalIdentityOriginal:false,otherJames1835DeathOriginal:false,
    directLinePromoted:false,graphEdgesChanged:0
  };
})();
