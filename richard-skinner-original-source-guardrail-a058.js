/* A058 Richard Francis Skinner: image-level original-source guardrail.
 * An existing complete Michigan 1933 original death certificate was re-inspected
 * from private Library and matched to the already packaged Richard gallery.
 * DO NOT re-download. No parent or spouse relationship modifications.
 * No approved biography, narration, TOUR_MEDIA, audio, Story or graph mutation.
 */
(() => {
  'use strict';
  if (typeof DATA === 'undefined' || !Array.isArray(DATA.nodes)) return;
  const person=DATA.nodes.find(n=>n.id==='richard_francis_skinner');
  if (!person) return;
  const title='1933 death certificate — recorded mother name conflicts with contemporary family records';
  person.historicalNotes=Array.isArray(person.historicalNotes)?person.historicalNotes:[];
  if (!person.historicalNotes.some(n=>n.title===title)) person.historicalNotes.push({
    title,
    paragraphs:[
      'The complete Michigan death certificate for Richard F. Skinner, dated 17 November 1933, has already been preserved in this page’s Documents gallery. Reinspection of the full original shows “Jesse Skinner” in the spouse field and “Jessie Auron” in the mother’s maiden-name field. The latter is an error in the recorded certificate itself, not a problem introduced only by an online index.',
      'Richard’s original marriage to Jessie Aurin on 5 November 1899 independently identifies his mother as Marian Lewis (also spelled Marion). Census household evidence is consistent with that identity. Do NOT place Jessie Aurin as Richard’s biological mother and do not construct a parentage link from the erroneous field.',
      'The same 1933 certificate supplies birth 11 November 1862 and age 71 years, 0 months, 6 days at death on 17 November 1933; the day and the age agree. A second historical concern remains unresolved: the currently approved life biography says Ellen Marie Hay died in 1899. The 1882 Ellen Hay marriage and the November 1899 remarriage to Jessie are documented, but this review did not establish Ellen’s death date or whether the first marriage ended by death or divorce. Treat “Ellen died in 1899” as NOT INDEPENDENTLY PROVEN pending an original death, burial or divorce record. No approved narration or biography has been rewritten in this audit-only supplement.'
    ],
    links:[
      {label:'1933 original Michigan death certificate — institutional source',url:'https://michigan.access.preservica.com/uncategorized/IO_faf5a5bd-8972-4168-bbac-6c461f2f1341/'},
      {label:'1882 Ellen Hay marriage index',url:'https://www.familysearch.org/ark:/61903/1:1:N3N4-76B'},
      {label:'1899 Richard/Jessie original marriage',url:'https://www.familysearch.org/ark:/61903/3:1:S3HT-67LS-TW4'}
    ]
  });
  const already=Array.isArray(person.evidence)&&person.evidence.some(e=>/death certificate/i.test(e.title||'') && /1933/.test(e.date||''));
  person.sourceAudit=Object.assign({},person.sourceAudit||{},{
    a058:'Reexamined already-packaged 1933 original image; mistaken original mother field and unproven Ellen Hay 1899 death claim explicitly segregated.',
    originalDeathCertificateAlreadyPackaged:already,
    originalDeath1933ImageReviewed:true,
    originalMotherNameAsWritten:'Jessie Auron — conflicting recorded mother field; not genealogical parentage',
    originalSpouseNameAsWritten:'Jesse Skinner',
    motherIndependentlyIdentified:'Marian / Marion Lewis (1899 original marriage and census household)',
    birthDayAsWrittenAndAgeConcordance:'11 November 1862; age 71 years, 0 months, 6 days at 17 November 1933 death',
    firstMarriageTermination:'UNKNOWN — death of Ellen Marie Hay in 1899 is a biographical assertion, not established by 1882/1899 marriage originals',
    duplicateOriginalDownloads:0,
    sourceImageBytesAcquired:0,
    newGraphEdges:0,
    parentagePromoted:false,
    currentApprovedBiographyChanged:false,
    narrationAndStoryFrozen:true,
    iPhoneImageValidated:false,
    fullPersonAuditCertified:false
  });
})();
