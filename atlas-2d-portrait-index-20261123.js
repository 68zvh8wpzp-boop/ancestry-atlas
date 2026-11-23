/* Atlas 2D portrait crop registry (2026-11-23).
 * The original images remain in place. No AI reconstruction or face recognition.
 * Each crop is [x,y,width,height] in 0..1 source-image coordinates.
 * Only named individual portraits or groups with unambiguous caption+position are shown.
 * An absent, ambiguous, broken or unmapped portrait falls back to a silhouette.
 * Source evidence status describes photograph attribution, NOT genealogical proof.
 */
window.ATLAS_2D_PORTRAITS={
  "marion_brenay": {
    "url": "https://cdn.tukioswebsites.com/57df7c61-7845-4fe1-8aad-f84726545720/lg",
    "title": "Marion Beulah Brenay Webb — obituary profile photo",
    "provenance": "Owens Livingston Mortuary obituary profile photo for Marion Brenay Webb."
  },
  "morten_peder": {
    "url": "https://history.churchofjesuschrist.org/church-history-people/bc/missionaries/portraits/M/morten-p-mortensen-1828-fs.jpg",
    "title": "Morten Peder Mortensen (1828–1891) — historical portrait",
    "provenance": "Church History Biographical Database profile image for Morten Peder Mortensen."
  },
  "peder_mortensen_1806": {
    "url": "https://history.churchofjesuschrist.org/church-history-people/bc/Pioneer%20Photos/Pioneers%20M/390x520/Mortensen_Peter%201806%201866.jpg",
    "title": "Peder Mortensen (1806–1866) — historical portrait",
    "provenance": "Church History Biographical Database profile image for Peder Mortensen."
  },
  "helena_sandersen": {
    "url": "https://history.churchofjesuschrist.org/church-history-people/bc/Pioneer%20Photos/Pioneers%20M/120x120/Mortensen_Helena_KWJX-W5B.jpg",
    "title": "Helena Pedersen Mortensen (1808–1890) — historical portrait",
    "provenance": "Church History Biographical Database profile image for Helena Pedersen Mortensen."
  },
  "edward_milo_jr": {
    "url": "biographies/webb-branch/people/edward_milo_jr/assets/edward_milo_jr_portrait.jpg",
    "title": "Edward Milo Webb Jr. — historical portrait",
    "provenance": "Church History Department Pioneer Database portrait, republished by Church News."
  },
  "caroline_owens": {
    "url": "https://history.churchofjesuschrist.org/church-history-people/bc/Pioneer%20Photos/Pioneers%20W/390x520/Webb_Caroline%20Amelia%20%20KWJR-FCL.jpg",
    "title": "Caroline Amelia Owens Webb — historical portrait",
    "provenance": "Church History Biographical Database profile image for Caroline Amelia Owens."
  },
  "dorthea_jensen": {
    "url": "https://history.churchofjesuschrist.org/church-history-people/bc/Pioneer%20Photos/Pioneers%20M/120x120/Mortensen_DortheaKnudsenJensen%20%20KWJD-TJ5.jpg",
    "title": "Dorthea Knudsen Jensen Mortensen (1840–1916) — historical portrait",
    "provenance": "Church History Biographical Database profile image for Dorthea Knudsen Jensen."
  },
  "james_sheldon": {
    "url": "sheldon_inez_wedding_1965.jpeg",
    "crop": [
      0.07,
      0.01,
      0.37,
      0.4
    ],
    "type": "identified-group-crop",
    "title": "James Sheldon Webb — 1965 wedding",
    "provenance": "Atlas wedding photograph, captioned Sheldon Webb and Inez Karen Prather, 1965. Groom at left.",
    "identityEvidence": "Groom at left; couple named in approved Atlas wedding caption",
    "sourceStatus": "captioned",
    "sourceGroup": "wedding"
  },
  "inez_karen": {
    "url": "sheldon_inez_wedding_1965.jpeg",
    "crop": [
      0.59,
      0.13,
      0.4,
      0.39
    ],
    "type": "identified-group-crop",
    "title": "Inez Karen Prather Webb — 1965 wedding",
    "provenance": "Atlas wedding photograph, captioned Sheldon Webb and Inez Karen Prather, 1965. Bride at right.",
    "identityEvidence": "Bride at right; couple named in approved Atlas wedding caption",
    "sourceStatus": "captioned",
    "sourceGroup": "wedding"
  },
  "james_wilford": {
    "url": "biographies/webb-branch/people/james_wilford/assets/jay_1953_family_restored.png",
    "crop": [
      0.39,
      0.04,
      0.39,
      0.25
    ],
    "type": "identified-solo-crop",
    "title": "James Wilford 'Jay' Webb, 1953",
    "provenance": "Family autobiography photograph captioned 'Me in 1953', restored conservatively for approved Webb biography.",
    "identityEvidence": "Person identified by first-person caption in family autobiography",
    "sourceStatus": "captioned"
  },
  "charles_albert": {
    "url": "assets/charles-albert/charles-marian-50th-anniversary.jpg",
    "crop": [
      0.49,
      0.11,
      0.42,
      0.35
    ],
    "type": "identified-group-crop",
    "title": "Charles Albert Brenay — 50th anniversary",
    "provenance": "Brenay family anniversary portrait labeled Charles and Marian, husband at right.",
    "identityEvidence": "Husband at right in the captioned Charles and Marian anniversary portrait",
    "sourceStatus": "captioned"
  },
  "marian_skinner": {
    "url": "assets/marian-skinner/photo-24.jpg",
    "crop": [
      0.16,
      0.07,
      0.7,
      0.52
    ],
    "type": "identified-solo-crop",
    "title": "Marian Beulah Skinner Brenay — studio portrait",
    "provenance": "Original Atlas Marian Skinner person-page evidence; FamilySearch shared-memory contributor attributed portrait 'Marian as a young woman', photo-24.jpg.",
    "identityEvidence": "Individual portrait labeled Marian on person-page evidence",
    "sourceStatus": "family-attributed"
  },
  "charles_godfrey": {
    "url": "assets/charles-godfrey/godfrey-young-portrait.jpg",
    "crop": [
      0.12,
      0.12,
      0.76,
      0.73
    ],
    "type": "identified-solo-crop",
    "title": "Charles Godfrey Brenay — earlier family portrait",
    "provenance": "Charles Godfrey Brenay person-page photograph from FamilySearch memory 93VH-G6X. Date and location unknown.",
    "identityEvidence": "Individual portrait attached to and labeled for Charles Godfrey",
    "sourceStatus": "family-attributed"
  },
  "ida_mae": {
    "url": "assets/ida-mae/ida-portrait-contributed.jpg",
    "crop": [
      0.16,
      0.05,
      0.66,
      0.65
    ],
    "type": "identified-solo-crop",
    "title": "Ida Mae Gooley Brenay — family-attributed portrait",
    "provenance": "Preserved FamilySearch Book of Remembrance portrait attributed to Ida Mae Gooley by contributor DeEdra Breckenridge, memory 225811213.",
    "identityEvidence": "Family contributor attribution to Ida Mae Gooley",
    "sourceStatus": "family-attributed"
  },
  "john_peter": {
    "url": "assets/john-peter/peter-portrait.jpg",
    "crop": [
      0.28,
      0.015,
      0.54,
      0.56
    ],
    "type": "identified-solo-crop",
    "title": "John Peter Gooley — family-attributed portrait",
    "provenance": "Original John Peter Gooley person-page family photo; contributed as 'Peter — family portrait'. Related Book of Remembrance describes Peter as Ida's father.",
    "identityEvidence": "Family-attributed image associated with John Peter Gooley; photograph date unknown",
    "sourceStatus": "family-attributed"
  },
  "mary_ann": {
    "url": "assets/mary-ann/mary-ann-portrait.jpg",
    "crop": [
      0.24,
      0.05,
      0.56,
      0.56
    ],
    "type": "identified-solo-crop",
    "title": "Mary Ann Dennis Gooley — family portrait",
    "provenance": "Mary Ann Dennis Gooley person-page family photo; contributed and repaired/enhanced by DeEdra Breckenridge, 12 October 2025.",
    "identityEvidence": "Family photo labeled for Mary Ann Dennis Gooley in original person-page evidence",
    "sourceStatus": "family-attributed"
  },
  "davia_dunbar": {
    "url": "assets/davia/davia-ann-dunbar-portrait-original.jpeg",
    "crop": [
      0.27,
      0.08,
      0.48,
      0.52
    ],
    "type": "identified-solo-crop",
    "title": "Davia Ann Dunbar Hill Duffy — family portrait",
    "provenance": "Original family-attributed Davia Ann Dunbar portrait; FamilySearch memory 169542556. Portrait date unverified.",
    "identityEvidence": "Family portrait labeled Davia Ann Dunbar in person-page sources",
    "sourceStatus": "family-attributed"
  },
  "jessie_irene_aurin": {
    "url": "assets/jessie-aurin/jessie-aurin-portrait.jpg",
    "crop": [
      0.15,
      0.1,
      0.66,
      0.7
    ],
    "type": "identified-solo-crop",
    "title": "Jessie Irene Aurin Skinner — contributed portrait",
    "provenance": "Jessie Irene Aurin person-page photo from FamilySearch memory 225811212; family contributor DeEdra Breckenridge enhanced image.",
    "identityEvidence": "Portrait attached to Jessie Irene Aurin in person-page sources",
    "sourceStatus": "family-attributed"
  },
  "wilhelm_brunne": {
    "url": "assets/wilhelm-brunne/portrait-book-remembrance.jpg",
    "crop": [
      0.19,
      0.13,
      0.62,
      0.74
    ],
    "type": "identified-solo-crop",
    "title": "Wilhelm Karl Charles Brunne — contributed portrait",
    "provenance": "Family-attributed Book of Remembrance portrait of Wilhelm Karl Charles Brunne from FamilySearch memory 225814179.",
    "identityEvidence": "Contributor labeled the portrait Wilhelm Karl Charles Brunne",
    "sourceStatus": "family-attributed"
  },
  "johanne_weller": {
    "url": "assets/johanna-weller/johanna-portrait-scottdaphne-2016-original.jpg",
    "crop": [
      0.14,
      0.02,
      0.72,
      0.73
    ],
    "type": "identified-solo-crop",
    "title": "Johanna Dorothea Weller Brunne — contributed portrait",
    "provenance": "Family-attributed portrait linked to the Johanna Dorothea Weller person-page evidence. Photograph date and location unknown.",
    "identityEvidence": "Individual portrait attributed to Johanna Weller in Atlas person-page sources",
    "sourceStatus": "family-attributed"
  },
  "richard_francis_skinner": {
    "url": "assets/richard-skinner/richard-skinner-portrait.jpg",
    "crop": [
      0.12,
      0.11,
      0.76,
      0.77
    ],
    "type": "identified-solo-crop",
    "title": "Richard Francis Skinner — contributed portrait",
    "provenance": "Richard Francis Skinner person-page photo, FamilySearch memory 225811209; family contributor portrait crop.",
    "identityEvidence": "Family-contributed individual portrait labeled Richard Francis Skinner",
    "sourceStatus": "family-attributed"
  },
  "sarah_carling": {
    "url": "biographies/webb-branch/people/edward_milo_jr/assets/edward_jr_sarah_children_1891_family_use.png",
    "crop": [
      0.315,
      0.29,
      0.28,
      0.32
    ],
    "type": "identified-group-crop",
    "title": "Sarah Elizabeth Carling Webb — with five children, 1891",
    "provenance": "1891 A. Miller family photograph captioned Sarah Elizabeth Carling with Clark, Henry, Burr, Owen and Catherine; approved Atlas Webb biography. Sarah is the seated central adult.",
    "identityEvidence": "Only seated central adult in named family photograph; children not assigned positions",
    "sourceStatus": "captioned"
  },
  "jonathan_henry": {
    "url": "assets/della-ray/della-henry-webb-anniversary-1958-original.jpg",
    "crop": [
      0.22,
      0.19,
      0.17,
      0.29
    ],
    "type": "identified-group-crop",
    "title": "Jonathan Henry Webb — 50th anniversary",
    "provenance": "Original 1958 invitation names Mr. and Mrs. J. H. Webb; husband at right in the printed couple portrait.",
    "identityEvidence": "Husband at right in directly captioned anniversary invitation",
    "sourceStatus": "captioned"
  },
  "grace_hill": {
    "url": "assets/inez-life-story/image2.jpeg",
    "crop": [0.085, 0.095, 0.83, 0.70],
    "type": "identified-solo-crop",
    "title": "Grace Mildred Hill — age 23 (1932)",
    "provenance": "Original studio portrait embedded in Inez Karen Prather's life story, captioned 'Grace Mildred Hill (Age 23) 1932', Excelsior Springs, Missouri.",
    "identityEvidence": "Inez's preserved family manuscript explicitly names Grace Mildred Hill and dates her portrait to 1932",
    "sourceStatus": "family-attributed",
    "sourceBlobSha": "60f036df64337f19afe59c8f99639e1b4f89004c"
  },
  "della_ray": {
    "url": "assets/della-ray/della-henry-webb-anniversary-1958-original.jpg",
    "crop": [
      0.08,
      0.3,
      0.17,
      0.31
    ],
    "type": "identified-group-crop",
    "title": "Della Ray Webb — 50th anniversary",
    "provenance": "Original 1958 invitation names Mr. and Mrs. J. H. Webb; wife at left in the printed couple portrait.",
    "identityEvidence": "Wife at left in directly captioned anniversary invitation",
    "sourceStatus": "captioned"
  }
};
