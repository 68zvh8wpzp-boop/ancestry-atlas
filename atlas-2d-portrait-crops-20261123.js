/* 2D ancestor portrait crop registry · 2026-11-23.
 * Every URL points to an original or original-preserving photo already in Atlas.
 * Coordinates are fractional image rectangles [x,y,width,height].
 * Faces are selected by named source captions/contributor attributions, NEVER
 * by recognition of appearance. The original remains untouched in its path.
 * Crop is applied live when drawing the 2D family tree; no invented faces.
 */
(function(root){
  "use strict";
  var entries=[
  {
    "id": "james_sheldon",
    "url": "sheldon_inez_wedding_1965.jpeg",
    "sourceBlobSha": "550b0362aa14bc0c3fe0e27738ae2c0f0d75a3d5",
    "crop": {
      "x": 0.055,
      "y": 0.005,
      "w": 0.43,
      "h": 0.49
    },
    "portraitType": "group-crop",
    "subject": "Sheldon, on left, with Inez at their 1965 wedding",
    "basis": "Atlas-approved Sheldon biography photo, caption explicitly identifies the couple.",
    "provenance": "Family archive • Sheldon and Inez wedding photograph • 1965",
    "attribution": "source-identified"
  },
  {
    "id": "inez_karen",
    "url": "sheldon_inez_wedding_1965.jpeg",
    "sourceBlobSha": "550b0362aa14bc0c3fe0e27738ae2c0f0d75a3d5",
    "crop": {
      "x": 0.54,
      "y": 0.145,
      "w": 0.44,
      "h": 0.48
    },
    "portraitType": "group-crop",
    "subject": "Inez, on right, with Sheldon at their 1965 wedding",
    "basis": "Atlas-approved Sheldon biography photo, caption explicitly identifies the couple.",
    "provenance": "Family archive • Sheldon and Inez wedding photograph • 1965",
    "attribution": "source-identified"
  },
  {
    "id": "james_wilford",
    "url": "biographies/marion/assets/jay_marion_mesa_1941_restored.jpg",
    "sourceBlobSha": "6c1fec12e526b38fe8442141a6c4d13fb76b8068",
    "crop": {
      "x": 0.3,
      "y": 0.098,
      "w": 0.28,
      "h": 0.235
    },
    "portraitType": "group-crop",
    "subject": "Jay, on left, with Marion circa 1941",
    "basis": "Identified couple in approved Webb branch family-photo scene.",
    "provenance": "Webb family autobiography • Jay and Marion • circa 1941",
    "attribution": "source-identified"
  },
  {
    "id": "marion_brenay",
    "url": "biographies/marion/assets/jay_marion_mesa_1941_restored.jpg",
    "sourceBlobSha": "6c1fec12e526b38fe8442141a6c4d13fb76b8068",
    "crop": {
      "x": 0.43,
      "y": 0.142,
      "w": 0.3,
      "h": 0.245
    },
    "portraitType": "group-crop",
    "subject": "Marion, on right, with Jay circa 1941",
    "basis": "Identified couple in approved Webb branch family-photo scene.",
    "provenance": "Webb family autobiography • Jay and Marion • circa 1941",
    "attribution": "source-identified"
  },
  {
    "id": "sarah_carling",
    "url": "biographies/webb-branch/people/edward_milo_jr/assets/edward_jr_sarah_children_1891_family_use.png",
    "sourceBlobSha": "2eb35382eb6740ea3a8fe89401b7cbbc2bacf604",
    "crop": {
      "x": 0.3,
      "y": 0.275,
      "w": 0.31,
      "h": 0.29
    },
    "portraitType": "group-crop",
    "subject": "Sarah, seated center, in 1891 with five children",
    "basis": "Published photograph and caption explicitly identify Sarah with her children.",
    "provenance": "Pioneer Women of Arizona • A. Miller, 1891 • family photo",
    "sourcePage": "https://rsc.byu.edu/pioneer-women-arizona/w",
    "attribution": "source-identified"
  },
  {
    "id": "jonathan_henry",
    "url": "biographies/webb-branch/people/edward_milo_jr/assets/edward_jr_sarah_children_1891_family_use.png",
    "sourceBlobSha": "2eb35382eb6740ea3a8fe89401b7cbbc2bacf604",
    "crop": {
      "x": 0.157,
      "y": 0.395,
      "w": 0.24,
      "h": 0.255
    },
    "portraitType": "group-crop",
    "subject": "Henry, second child from left (standing front left), 1891",
    "basis": "Published source labels children left-to-right Clark, Henry, Burr, Owen, Catherine; Henry is second of five.",
    "provenance": "Pioneer Women of Arizona • A. Miller, 1891 • source's left-to-right caption",
    "sourcePage": "https://rsc.byu.edu/pioneer-women-arizona/w",
    "attribution": "source-identified"
  },
  {
    "id": "charles_albert",
    "url": "assets/charles-albert/charles-marian-50th-anniversary.jpg",
    "sourceBlobSha": "a058481f2730da3df133905289dc6b4317e44c9d",
    "crop": {
      "x": 0.485,
      "y": 0.092,
      "w": 0.425,
      "h": 0.41
    },
    "portraitType": "group-crop",
    "subject": "Charles, on right, in 50th-anniversary portrait",
    "basis": "Contributor labels Charles and Marian as the photographed anniversary couple.",
    "provenance": "FamilySearch • 1970 Charles and Marian anniversary photo",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XF6",
    "attribution": "source-identified"
  },
  {
    "id": "marian_skinner",
    "url": "assets/charles-albert/charles-marian-50th-anniversary.jpg",
    "sourceBlobSha": "a058481f2730da3df133905289dc6b4317e44c9d",
    "crop": {
      "x": 0.07,
      "y": 0.305,
      "w": 0.445,
      "h": 0.405
    },
    "portraitType": "group-crop",
    "subject": "Marian, on left, in 50th-anniversary portrait",
    "basis": "Contributor labels Charles and Marian as the photographed anniversary couple.",
    "provenance": "FamilySearch • 1970 Charles and Marian anniversary photo",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XF6",
    "attribution": "source-identified"
  },
  {
    "id": "della_ray",
    "url": "assets/della-ray/della-webb-and-daughters-1947-original-preview.jpg",
    "sourceBlobSha": "c7be24d37386ec5e9bc823eef2c7a8d21b58da78",
    "crop": {
      "x": 0.392,
      "y": 0.205,
      "w": 0.2,
      "h": 0.34
    },
    "portraitType": "group-crop",
    "subject": "Della, third from left, with four daughters in 1947",
    "basis": "Contributor explicitly identifies Zola, Thora, Della, Gwen, Louise left-to-right.",
    "provenance": "FamilySearch • Della and daughters, 7 April 1947 • preview of archived original",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWCR-Z55",
    "attribution": "source-identified"
  },
  {
    "id": "jessie_irene_aurin",
    "url": "assets/jessie-aurin/jessie-aurin-portrait.jpg",
    "sourceBlobSha": "033a9b9652a5a0ef6125abd70ef25eca2ae187ae",
    "crop": {
      "x": 0.09,
      "y": 0.095,
      "w": 0.79,
      "h": 0.78
    },
    "portraitType": "existing-family-crop",
    "subject": "Jessie Aurin Skinner, identified in preserved family photo crop",
    "basis": "Contributor-provided crop from a family photograph; identity from attached FamilySearch description.",
    "provenance": "FamilySearch Memory 225811212 • DeEdra Breckenridge",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/225811212",
    "attribution": "source-identified"
  },
  {
    "id": "richard_francis_skinner",
    "url": "assets/richard-skinner/richard-skinner-portrait.jpg",
    "sourceBlobSha": "2ff02da6a2f4c8a19db89819e5aa329057cb1a01",
    "crop": {
      "x": 0.1,
      "y": 0.12,
      "w": 0.8,
      "h": 0.76
    },
    "portraitType": "existing-family-crop",
    "subject": "Richard Francis Skinner in contributor-labeled portrait",
    "basis": "FamilySearch tagged portrait contributed from family holdings, not a generated likeness.",
    "provenance": "FamilySearch Memory 225811209 • DeEdra Breckenridge",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/225811209",
    "attribution": "source-identified"
  },
  {
    "id": "grace_hill",
    "url": "assets/inez-life-story/image2.jpeg",
    "sourceBlobSha": "60f036df64337f19afe59c8f99639e1b4f89004c",
    "crop": {
      "x": 0.085,
      "y": 0.095,
      "w": 0.83,
      "h": 0.7
    },
    "portraitType": "standalone",
    "subject": "Grace Mildred Hill, age 23, 1932",
    "basis": "Inez's family manuscript identifies this exact portrait and age; no facial inference.",
    "provenance": "Inez Prather life story • original embedded studio photograph • 1932",
    "attribution": "source-identified"
  },
  {
    "id": "davia_dunbar",
    "url": "assets/davia/davia-ann-dunbar-portrait.jpg",
    "sourceBlobSha": "c691c4612a28f29530a440f406c5a8e397e26cc7",
    "crop": {
      "x": 0.2,
      "y": 0.06,
      "w": 0.62,
      "h": 0.56
    },
    "portraitType": "standalone",
    "subject": "Davia Ann Dunbar Hill Duffy, family-identified portrait",
    "basis": "Contributor labels the single-person historical photo as Davia; date unknown.",
    "provenance": "FamilySearch Memory 169542556 • family identification",
    "sourcePage": "https://www.familysearch.org/memories/memory/169542556",
    "attribution": "source-identified"
  },
  {
    "id": "ida_mae",
    "url": "assets/ida-mae/ida-portrait-contributed.jpg",
    "sourceBlobSha": "62605d794bfb8226ff7d36450154f6c17dcea82f",
    "crop": {
      "x": 0.12,
      "y": 0.065,
      "w": 0.74,
      "h": 0.78
    },
    "portraitType": "standalone",
    "subject": "Ida Mae Gooley, Book of Remembrance portrait",
    "basis": "FamilySearch contributor identifies the individual subject in a family Book of Remembrance.",
    "provenance": "FamilySearch Memory 225811213 • family Book of Remembrance",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/225811213",
    "attribution": "source-identified"
  },
  {
    "id": "john_peter",
    "url": "assets/john-peter/peter-portrait.jpg",
    "sourceBlobSha": "32d1c758d2d6a04d7d0f8cc3c4f38f106a179e31",
    "crop": {
      "x": 0.235,
      "y": 0.02,
      "w": 0.63,
      "h": 0.625
    },
    "portraitType": "standalone",
    "subject": "Peter Gooley, family-attributed bearded portrait",
    "basis": "Contributor tagged image to the adult Peter; identification remains from family attribution, not independent biometric proof.",
    "provenance": "FamilySearch person memories K856-QYW • 0055_a enhanced portrait",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/K856-QYW",
    "attribution": "source-identified"
  },
  {
    "id": "mary_ann",
    "url": "assets/mary-ann/mary-ann-portrait.jpg",
    "sourceBlobSha": "ddac746ebd9a41554c3be4c078ce7e63be3c4fe8",
    "crop": {
      "x": 0.22,
      "y": 0.07,
      "w": 0.65,
      "h": 0.65
    },
    "portraitType": "standalone",
    "subject": "Mary Ann Dennis Gooley, family-attributed portrait",
    "basis": "Preserved contributor photo and subject tag; image date/location approximate.",
    "provenance": "FamilySearch person memories LZVC-KZB • 0050_a enhanced portrait",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/LZVC-KZB",
    "attribution": "source-identified"
  },
  {
    "id": "charles_godfrey",
    "url": "assets/charles-godfrey/godfrey-young-portrait.jpg",
    "sourceBlobSha": "389a88e53c62b570bafea9a78660579be4462bc4",
    "crop": {
      "x": 0.13,
      "y": 0.09,
      "w": 0.74,
      "h": 0.82
    },
    "portraitType": "standalone",
    "subject": "Charles Godfrey Brenay/Brunne, single-person work-clothes portrait",
    "basis": "Existing Charles Godfrey person biography identifies the historical single-person photo.",
    "provenance": "Atlas Charles Godfrey biography • family contributor portrait",
    "attribution": "source-identified"
  },
  {
    "id": "wilhelm_brunne",
    "url": "assets/wilhelm-brunne/portrait-book-remembrance.jpg",
    "sourceBlobSha": "c711bfaba5e51c95eb80a4325a117a24929afba2",
    "crop": {
      "x": 0.125,
      "y": 0.095,
      "w": 0.75,
      "h": 0.8
    },
    "portraitType": "standalone",
    "subject": "Wilhelm Karl Charles Brunne, Book of Remembrance portrait",
    "basis": "Single-person image attributed by contributor, independent identity not established.",
    "provenance": "FamilySearch Memory 225814179 • family-attributed",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/225814179",
    "attribution": "source-identified"
  },
  {
    "id": "johanne_weller",
    "url": "assets/johanna-weller/johanna-portrait-scottdaphne-2016-original.jpg",
    "sourceBlobSha": "85f3770939fbfd648095fc656b9b972100ccb50f",
    "crop": {
      "x": 0.105,
      "y": 0.05,
      "w": 0.81,
      "h": 0.79
    },
    "portraitType": "standalone",
    "subject": "Johanne Dorothea Weller, contributor-attributed portrait",
    "basis": "Family-attributed historic portrait; precise date and location not established.",
    "provenance": "FamilySearch contributor portrait • preserved Johanna Weller biography",
    "attribution": "source-identified"
  }
];
  var source=root.ATLAS_2D_PORTRAITS||{};
  var approved=new Set(["group-crop","existing-family-crop","standalone"]);
  var mapped=[];
  entries.forEach(function(entry){
    var r=entry.crop;
    if(!entry.id||!entry.url||!entry.basis||!entry.provenance||
       !approved.has(entry.portraitType)||
       ![r.x,r.y,r.w,r.h].every(function(x){return Number.isFinite(x)&&x>=0&&x<=1;})||
       r.w<=0||r.h<=0||r.x+r.w>1.000001||r.y+r.h>1.000001){
      throw Error("Unsafe Atlas portrait crop registration: "+entry.id);
    }
    var previous=source[entry.id];
    source[entry.id]=Object.assign({},entry,{
      // Keep the former standalone as a fallback when a group photograph fails to load.
      fallbackUrl:previous&&previous.url!==entry.url?previous.url:null
    });
    mapped.push(entry.id);
  });
  root.ATLAS_2D_PORTRAITS=source;
  root.ATLAS_2D_PORTRAIT_CROP_REGISTRY=Object.freeze({
    revision:"2026-11-23",entries:Object.freeze(entries),
    groupCropCount:entries.filter(function(x){return x.portraitType==="group-crop";}).length,
    status:"source-attributed, not biometric identification"
  });
})(typeof window!=="undefined"?window:globalThis);
