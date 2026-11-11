/* A054 — Sheldon Webb certificate custody correction.
 * User reports owning the 1943 Arizona birth certificate; it is NOT
 * uploaded and no contents/claims were inspected. Defer ingestion by request.
 * Keep approved biography, plot, narrator, family graph and gallery untouched.
 */
(() => {
  'use strict';
  if (typeof DATA === 'undefined' || !Array.isArray(DATA.nodes)) return;
  const sheldon = DATA.nodes.find(n=>n.id==='james_sheldon');
  if (!sheldon) return;
  const previous = 'but the actual certificate image has not yet been retrieved';
  if (typeof sheldon.note === 'string' && sheldon.note.includes(previous)) {
    sheldon.note = sheldon.note.replace(previous,
      'and the family reports possessing his birth certificate, which has not yet been supplied or inspected for this Atlas');
  }
  const notes=Array.isArray(sheldon.historicalNotes)?sheldon.historicalNotes:[];
  const source=notes.find(n=>n.title==='THE SOURCE STATUS OF THE BIRTH, MARRIAGE AND MILITARY RECORDS');
  if(source && Array.isArray(source.paragraphs)) {
    source.paragraphs = source.paragraphs.map(p =>
      p.replace('The original birth-certificate image is not yet present in the Atlas.',
        'The family reports having the original birth certificate, but no image or transcription has yet been supplied to the Atlas. The document will be incorporated later by the owner’s preference.'));
  }
  sheldon.sourceAudit = Object.assign({},sheldon.sourceAudit||{},{
    a054FamilyCertificateCustody: 'User explicitly confirmed 2026-11-11: owns Sheldon’s birth certificate and wishes to add it later.',
    certificateLocation: 'In user possession, NOT uploaded or read',
    certificateContentsInspected: false,
    deferredUntilOwnerSupplies: true,
    externalRecordAcquisitionNeeded: false,
    birthPlaceConflictResolved: false,
    fullOriginalMediaBytesNew: 0,
    approvedBiographyAndNarrationUnchanged: true,
    originalImageCaptionCannotBePromotedYet: true
  });
})();