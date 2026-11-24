/* Atlas 2D portrait crop registry (2026-11-23).
 * The original images remain in place. No AI reconstruction or face recognition.
 * Each crop is [x,y,width,height] in 0..1 source-image coordinates.
 * Only named individual portraits or groups with unambiguous caption+position are shown.
 * An absent, ambiguous, broken or unmapped portrait falls back to a silhouette.
 * Source evidence status describes photograph attribution, NOT genealogical proof.
 */
// 2026-11-24: primary local crop frames reviewed against preserved source images; display must contain, never re-crop.
window.ATLAS_2D_PORTRAITS={
  "marion_brenay": {
    "url": "biographies/marion/assets/jay_marion_mesa_1941_restored.jpg",
    "crop": [
      0.43,
      0.13,
      0.27,
      0.25
    ],
    "type": "identified-group-crop",
    "title": "Marion Beulah Brenay Webb — with Jay, circa 1941",
    "provenance": "Approved Webb family autobiography photo identifying Marion and Jay together circa 1940–1941; the historic original remains preserved in the biography archive.",
    "identityEvidence": "Marion is the woman on the right of Jay in the captioned Webb family photograph.",
    "sourceStatus": "captioned",
    "sourceBlobSha": "6c1fec12e526b38fe8442141a6c4d13fb76b8068",
    "alternatePortraits": [
      {
        "url": "https://cdn.tukioswebsites.com/57df7c61-7845-4fe1-8aad-f84726545720/lg",
        "title": "Marion Beulah Brenay Webb — obituary profile photo",
        "provenance": "Owens Livingston Mortuary obituary profile photo for Marion Brenay Webb.",
        "identityEvidence": "Obituary photograph labeled Marion Brenay Webb",
        "sourceStatus": "obituary"
      }
    ]
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
    "provenance": "Church History Department Pioneer Database portrait, republished by Church News.",
    "sourceBlobSha": "7dbf3cdb3ead6050971e1018d86e39d7c605b589"
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
      0.035,
      0,
      0.43,
      0.45
    ],
    "type": "identified-group-crop",
    "title": "James Sheldon Webb — 1965 wedding",
    "provenance": "Atlas wedding photograph, captioned Sheldon Webb and Inez Karen Prather, 1965. Groom at left.",
    "identityEvidence": "Groom at left; couple named in approved Atlas wedding caption",
    "sourceStatus": "captioned",
    "sourceGroup": "wedding",
    "sourceBlobSha": "550b0362aa14bc0c3fe0e27738ae2c0f0d75a3d5"
  },
  "inez_karen": {
    "url": "sheldon_inez_wedding_1965.jpeg",
    "crop": [
      0.56,
      0.055,
      0.44,
      0.52
    ],
    "type": "identified-group-crop",
    "title": "Inez Karen Prather Webb — 1965 wedding",
    "provenance": "Atlas wedding photograph, captioned Sheldon Webb and Inez Karen Prather, 1965. Bride at right.",
    "identityEvidence": "Bride at right; couple named in approved Atlas wedding caption",
    "sourceStatus": "captioned",
    "sourceGroup": "wedding",
    "sourceBlobSha": "550b0362aa14bc0c3fe0e27738ae2c0f0d75a3d5"
  },
  "james_wilford": {
    "url": "biographies/webb-branch/people/james_wilford/assets/jay_1953_family_restored.png",
    "crop": [
      0.34,
      0.045,
      0.43,
      0.32
    ],
    "type": "identified-solo-crop",
    "title": "James Wilford 'Jay' Webb, 1953",
    "provenance": "Family autobiography photograph captioned 'Me in 1953', restored conservatively for approved Webb biography.",
    "identityEvidence": "Person identified by first-person caption in family autobiography",
    "sourceStatus": "captioned",
    "sourceBlobSha": "a0c32ffcd7d4f132ec34566ec7dcb73866ff6e4f",
    "alternatePortraits": [
      {
        "url": "biographies/marion/assets/jay_marion_mesa_1941_restored.jpg",
        "crop": [
          0.29,
          0.095,
          0.25,
          0.26
        ],
        "title": "James Wilford “Jay” Webb with Marion, c. 1941",
        "provenance": "Webb family autobiography • approved 1941 couple photograph",
        "identityEvidence": "Jay on left in captioned family photo",
        "sourceStatus": "captioned",
        "sourceBlobSha": "6c1fec12e526b38fe8442141a6c4d13fb76b8068"
      }
    ]
  },
  "charles_albert": {
    "url": "assets/charles-albert/charles-marian-50th-anniversary.jpg",
    "crop": [
      0.47,
      0.085,
      0.53,
      0.49
    ],
    "type": "identified-group-crop",
    "title": "Charles Albert Brenay — 50th anniversary",
    "provenance": "Brenay family anniversary portrait labeled Charles and Marian, husband at right.",
    "identityEvidence": "Husband at right in the captioned Charles and Marian anniversary portrait",
    "sourceStatus": "captioned",
    "sourceBlobSha": "a058481f2730da3df133905289dc6b4317e44c9d"
  },
  "marian_skinner": {
    "url": "assets/marian-skinner/photo-24.jpg",
    "crop": [
      0.11,
      0.075,
      0.78,
      0.72
    ],
    "type": "identified-solo-crop",
    "title": "Marian Beulah Skinner Brenay — studio portrait",
    "provenance": "Original Atlas Marian Skinner person-page evidence; FamilySearch shared-memory contributor attributed portrait 'Marian as a young woman', photo-24.jpg.",
    "identityEvidence": "Individual portrait labeled Marian on person-page evidence",
    "sourceStatus": "family-attributed",
    "sourceBlobSha": "8890de6d9de717286e5c138a781b1842b0c1e657",
    "alternatePortraits": [
      {
        "url": "assets/charles-albert/charles-marian-50th-anniversary.jpg",
        "crop": [
          0.07,
          0.305,
          0.445,
          0.405
        ],
        "title": "Marian Skinner Brenay, fiftieth anniversary 1970",
        "provenance": "FamilySearch shared-memory anniversary portrait",
        "identityEvidence": "Marian on left of Charles in captioned anniversary portrait",
        "sourceStatus": "captioned",
        "sourceBlobSha": "a058481f2730da3df133905289dc6b4317e44c9d"
      }
    ]
  },
  "charles_godfrey": {
    "url": "assets/charles-godfrey/godfrey-young-portrait.jpg",
    "crop": [
      0.09,
      0.08,
      0.82,
      0.82
    ],
    "type": "identified-solo-crop",
    "title": "Charles Godfrey Brenay — earlier family portrait",
    "provenance": "Charles Godfrey Brenay person-page photograph from FamilySearch memory 93VH-G6X. Date and location unknown.",
    "identityEvidence": "Individual portrait attached to and labeled for Charles Godfrey",
    "sourceStatus": "family-attributed",
    "sourceBlobSha": "389a88e53c62b570bafea9a78660579be4462bc4"
  },
  "ida_mae": {
    "url": "assets/ida-mae/ida-portrait-contributed.jpg",
    "crop": [
      0.092,
      0.07,
      0.816,
      0.86
    ],
    "type": "identified-solo-crop",
    "title": "Ida Mae Gooley Brenay — family-attributed portrait",
    "provenance": "Preserved FamilySearch Book of Remembrance portrait attributed to Ida Mae Gooley by contributor DeEdra Breckenridge, memory 225811213.",
    "identityEvidence": "Family contributor attribution to Ida Mae Gooley",
    "sourceStatus": "family-attributed",
    "sourceBlobSha": "62605d794bfb8226ff7d36450154f6c17dcea82f"
  },
  "john_peter": {
    "url": "assets/john-peter/peter-portrait.jpg",
    "crop": [
      0.12,
      0,
      0.78,
      0.78
    ],
    "type": "identified-solo-crop",
    "title": "John Peter Gooley — family-attributed portrait",
    "provenance": "Original John Peter Gooley person-page family photo; contributed as 'Peter — family portrait'. Related Book of Remembrance describes Peter as Ida's father.",
    "identityEvidence": "Family-attributed image associated with John Peter Gooley; photograph date unknown",
    "sourceStatus": "family-attributed",
    "sourceBlobSha": "32d1c758d2d6a04d7d0f8cc3c4f38f106a179e31"
  },
  "mary_ann": {
    "url": "assets/mary-ann/mary-ann-portrait.jpg",
    "crop": [
      0.12,
      0.035,
      0.77,
      0.78
    ],
    "type": "identified-solo-crop",
    "title": "Mary Ann Dennis Gooley — family portrait",
    "provenance": "Mary Ann Dennis Gooley person-page family photo; contributed and repaired/enhanced by DeEdra Breckenridge, 12 October 2025.",
    "identityEvidence": "Family photo labeled for Mary Ann Dennis Gooley in original person-page evidence",
    "sourceStatus": "family-attributed",
    "sourceBlobSha": "ddac746ebd9a41554c3be4c078ce7e63be3c4fe8"
  },
  "davia_dunbar": {
    "url": "assets/davia/davia-ann-dunbar-portrait-original.jpeg",
    "crop": [
      0.15,
      0.045,
      0.72,
      0.67
    ],
    "type": "identified-solo-crop",
    "title": "Davia Ann Dunbar Hill Duffy — family portrait",
    "provenance": "Original family-attributed Davia Ann Dunbar portrait; FamilySearch memory 169542556. Portrait date unverified.",
    "identityEvidence": "Family portrait labeled Davia Ann Dunbar in person-page sources",
    "sourceStatus": "family-attributed",
    "sourceBlobSha": "fcc93feb62e4b7437151fac803a1700e3c77ebf1"
  },
  "jessie_irene_aurin": {
    "url": "assets/jessie-aurin/jessie-aurin-portrait.jpg",
    "crop": [
      0.11,
      0.095,
      0.78,
      0.81
    ],
    "type": "identified-solo-crop",
    "title": "Jessie Irene Aurin Skinner — contributed portrait",
    "provenance": "Jessie Irene Aurin person-page photo from FamilySearch memory 225811212; family contributor DeEdra Breckenridge enhanced image.",
    "identityEvidence": "Portrait attached to Jessie Irene Aurin in person-page sources",
    "sourceStatus": "family-attributed",
    "sourceBlobSha": "033a9b9652a5a0ef6125abd70ef25eca2ae187ae"
  },
  "wilhelm_brunne": {
    "url": "assets/wilhelm-brunne/portrait-book-remembrance.jpg",
    "crop": [
      0.115,
      0.067,
      0.77,
      0.865
    ],
    "type": "identified-solo-crop",
    "title": "Wilhelm Karl Charles Brunne — contributed portrait",
    "provenance": "Family-attributed Book of Remembrance portrait of Wilhelm Karl Charles Brunne from FamilySearch memory 225814179.",
    "identityEvidence": "Contributor labeled the portrait Wilhelm Karl Charles Brunne",
    "sourceStatus": "family-attributed",
    "sourceBlobSha": "c711bfaba5e51c95eb80a4325a117a24929afba2"
  },
  "johanne_weller": {
    "url": "assets/johanna-weller/johanna-portrait-scottdaphne-2016-original.jpg",
    "crop": [
      0.13,
      0.045,
      0.72,
      0.57
    ],
    "type": "identified-solo-crop",
    "title": "Johanna Dorothea Weller Brunne — contributed portrait",
    "provenance": "Family-attributed portrait linked to the Johanna Dorothea Weller person-page evidence. Photograph date and location unknown.",
    "identityEvidence": "Individual portrait attributed to Johanna Weller in Atlas person-page sources",
    "sourceStatus": "family-attributed",
    "sourceBlobSha": "85f3770939fbfd648095fc656b9b972100ccb50f"
  },
  "richard_francis_skinner": {
    "url": "assets/richard-skinner/richard-skinner-portrait.jpg",
    "crop": [
      0.117,
      0.091,
      0.767,
      0.82
    ],
    "type": "identified-solo-crop",
    "title": "Richard Francis Skinner — contributed portrait",
    "provenance": "Richard Francis Skinner person-page photo, FamilySearch memory 225811209; family contributor portrait crop.",
    "identityEvidence": "Family-contributed individual portrait labeled Richard Francis Skinner",
    "sourceStatus": "family-attributed",
    "sourceBlobSha": "2ff02da6a2f4c8a19db89819e5aa329057cb1a01"
  },
  "sarah_carling": {
    "url": "biographies/webb-branch/people/edward_milo_jr/assets/edward_jr_sarah_children_1891_family_use.png",
    "crop": [
      0.32,
      0.29,
      0.23,
      0.26
    ],
    "type": "identified-group-crop",
    "title": "Sarah Elizabeth Carling Webb — with five children, 1891",
    "provenance": "1891 A. Miller family photograph captioned Sarah Elizabeth Carling with Clark, Henry, Burr, Owen and Catherine; approved Atlas Webb biography. Sarah is the seated central adult.",
    "identityEvidence": "Sarah is the seated central adult; the source caption also identifies her children Clark, Henry, Burr, Owen, Catherine left to right.",
    "sourceStatus": "captioned",
    "sourceBlobSha": "2eb35382eb6740ea3a8fe89401b7cbbc2bacf604"
  },
  "jonathan_henry": {
    "url": "assets/della-ray/della-henry-webb-anniversary-1958-original.jpg",
    "crop": [
      0.216,
      0.184,
      0.175,
      0.385
    ],
    "type": "identified-group-crop",
    "title": "Jonathan Henry Webb — 50th anniversary",
    "provenance": "Original 1958 invitation names Mr. and Mrs. J. H. Webb; husband at right in the printed couple portrait.",
    "identityEvidence": "Husband at right in directly captioned anniversary invitation",
    "sourceStatus": "captioned",
    "sourceBlobSha": "1f5c8973908f70192e058145b2e11607280c1abf",
    "alternatePortraits": [
      {
        "url": "biographies/webb-branch/people/edward_milo_jr/assets/edward_jr_sarah_children_1891_family_use.png",
        "crop": [
          0.157,
          0.395,
          0.24,
          0.255
        ],
        "title": "Jonathan Henry Webb as a child, 1891",
        "provenance": "Pioneer Women of Arizona • A. Miller family photograph • https://rsc.byu.edu/pioneer-women-arizona/w",
        "identityEvidence": "Published caption identifies Clark, Henry, Burr, Owen, Catherine from left to right; Henry is second from left.",
        "sourceStatus": "captioned",
        "sourceBlobSha": "2eb35382eb6740ea3a8fe89401b7cbbc2bacf604"
      }
    ]
  },
  "grace_hill": {
    "url": "assets/inez-life-story/image2.jpeg",
    "crop": [
      0.065,
      0.085,
      0.87,
      0.79
    ],
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
      0.069,
      0.294,
      0.16,
      0.39
    ],
    "type": "identified-group-crop",
    "title": "Della Ray Webb — 50th anniversary",
    "provenance": "Original 1958 invitation names Mr. and Mrs. J. H. Webb; wife at left in the printed couple portrait.",
    "identityEvidence": "Wife at left in directly captioned anniversary invitation",
    "sourceStatus": "captioned",
    "sourceBlobSha": "1f5c8973908f70192e058145b2e11607280c1abf",
    "alternatePortraits": [
      {
        "url": "assets/della-ray/della-webb-and-daughters-1947-original.jpg",
        "crop": [
          0.392,
          0.205,
          0.2,
          0.34
        ],
        "title": "Della Webb with her daughters, 1947",
        "provenance": "FamilySearch contribution • original 7 April 1947 family photograph",
        "identityEvidence": "Contributor explicitly labels Zola, Thora, Della, Gwen, Louise from left to right; Della is third.",
        "sourceStatus": "captioned",
        "sourceBlobSha": "7e4601a4be2c8df53fa6a5e6c360017a871a8229"
      }
    ]
  }
};
