/* Isaac Van Wagoner Carling — v3.9.57 RELEASE overlay, 2026-10-18.
   Loaded after the app data and historical overlays by atlas-v3.9.57.html.
   Canonical text: research/isaac-carling-tranche-10-museum-biography-review-20261018.md
   Source review and exceptions: tranches 01–13. No fabricated original assets. */
(()=>{
'use strict';
if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
const person=DATA.nodes.find(n=>n.id==='isaac_carling');
if(!person)return;
const biography="Isaac Van Wagoner Carling was born on 30 November 1831 in Ulster County, New York, to John Carling and Emeline Keaton. His family moved westward with the Latter-day Saint migration, passing through Nauvoo, Illinois, where Emeline died during his childhood. His father's later wife, Ann Green Carling, became Isaac's stepmother. Family recollections describe a resourceful boy who repaired a damaged violin, worked with his father on wagons and learned to make things by hand. These stories are preserved in later family writings rather than an examined childhood journal.\n\nAt twenty, Isaac joined his father, stepmother and siblings in the overland journey from the Council Bluffs area to Utah. His account of 1852, surviving through a published transcription of his diary, dwells on the practical work of migration: ferrying wagons, repairing equipment, finding feed for animals and coping with storms. He also noticed the graves along the trail and remembered the relief of dancing after difficult days. He reached Salt Lake City ahead of the wagons on 29 September; the wagons arrived the next day. It is an unusually personal record of a long journey otherwise often reduced to a date on a family tree.\n\nThe Carlings settled first in Provo and later in Fillmore. A letter dated 19 June 1853, preserved in the family history as a transcription rather than an examined autograph, records Isaac's proposal to Asenath Elizabeth Browning. Their marriage was announced in the *Deseret News*: they married on 17 November 1854 in Ogden City, with Ezra T. Benson officiating. Their daughter Sarah Elizabeth, born in 1856, became an ancestor in the Webb line. Isaac became known within his family as a skilled woodworker who made useful objects as well as ornamental pieces, including furniture and spinning wheels.\n\nDuring his years in Fillmore, Isaac also established a family with Miriam Elizabeth Hobson while his marriage to Asenath continued, a plural-family arrangement reflected in the surviving family accounts. Miriam and Isaac are remembered as the parents of John Henry, Ellen Alvira, Lydia May and Jesse Hobson. Miriam died in 1869. The exact date and place of the marriage to Miriam remain disputed in later accounts, and the original marriage entry has not been examined. \n\nIn the mid-1870s, Isaac and Asenath moved their extended family from Fillmore to Orderville in southern Utah, where residents were building an unusually communal system of shared labor and production. Family recollections describe three covered wagons carrying a woodworking lathe, household tools and musical instruments. Later accounts credit his woodworking and painting skills with an important place in the settlement's workshops, and describe him as a cooperative officer and church counselor. The corresponding nineteenth-century board and departmental records have been located, but no page naming Isaac in those offices has yet been read; the exact titles remain family-history claims. The remembered work itself ranged from chairs and cabinets to building trim. Isaac's household also sustained music and gardening. Relatives recalled his violin, seed-growing, drawing lessons and close attention to plants—interests that suggest how craft, family life and curiosity occupied the same space in his daily experience.\n\nIsaac remained in Orderville after the communal system had ended. He died there on 24 May 1911, aged 79, and family records place his burial in Orderville Cemetery the next day. His legacy is not only the long migration from New York to Utah, but the combination of practical skill, careful observation and artistic interests that later generations associated with the homes and communities he helped build.";
const sourceLinks=[
  {
    "id": "isaac-1854-marriage-notice",
    "kind": "document",
    "sourceLevel": "original",
    "title": "Marriage notice — Deseret News, 1854",
    "date": "23 November 1854",
    "sourcePage": "https://newspapers.lib.utah.edu/udn_files/e7/54/e754867dc2a2b533fd0e62e58209eecd3876ed28.pdf",
    "summary": "Original newspaper page reports Isaac and Asenath Elizabeth Browning married on 17 November 1854 in Ogden City, by Ezra T. Benson. The page was read in the archive; no image file is stored here.",
    "provenance": "Deseret News (Great Salt Lake City), 23 Nov 1854, vol. 4, no. 37, p. 3; Utah Digital Newspapers, issue 2581309, page 3."
  },
  {
    "id": "isaac-1852-diary-published",
    "kind": "document",
    "sourceLevel": "transcription",
    "title": "Isaac's 1852 overland diary — published transcription",
    "date": "30 June–30 September 1852",
    "sourcePage": "https://history.churchofjesuschrist.org/chd/transcript?lang=eng&name=transcript-for-carling-isaac-v-diary-in-elda-mortenson-comp-isaac-v-carling",
    "summary": "Dated travel narrative describes river crossings, wagon repairs, storms, passing Curtis's company and reaching Salt Lake at the end of September. Published transcription reviewed; original handwriting not captured.",
    "provenance": "Church History Biographical Database, attributed diary from Elda P. Mortenson, Isaac V. Carling Family History, vol. 1 (1966), pp. 48–55."
  },
  {
    "id": "isaac-1856-sarah-parents",
    "kind": "document",
    "sourceLevel": "compiled",
    "title": "Sarah Elizabeth Carling Webb — parents",
    "date": "1856 / retrospective history",
    "sourcePage": "https://rsc.byu.edu/pioneer-women-arizona/w",
    "summary": "Later biographical history identifies Isaac Van Wagoner Carling and Asenath Elizabeth Browning as the parents of daughter Sarah Elizabeth.",
    "provenance": "Pioneer Women of Arizona, Brigham Young University Religious Studies Center, Sarah Elizabeth Carling Webb entry."
  },
  {
    "id": "isaac-1911-death-profile",
    "kind": "document",
    "sourceLevel": "institutional-index",
    "title": "Isaac Carling — birth and death dates",
    "date": "1831–1911",
    "sourcePage": "https://history.churchofjesuschrist.org/chd/individual/isaac-vanwagoner-carling-1831?lang=eng",
    "summary": "Institutional biographical timeline reports birth 30 November 1831 and death 24 May 1911. Original 1911 Kane County death certificate is not saved or transcribed.",
    "provenance": "Church History Biographical Database, Isaac VanWagoner Carling (PER-6SFMYP8)."
  },
  {
    "id": "isaac-miriam-hobson-dates",
    "kind": "document",
    "sourceLevel": "institutional-derived",
    "title": "Miriam Hobson — conflicting marriage chronology",
    "date": "1857 / later conflicting recollection",
    "sourcePage": "https://history.churchofjesuschrist.org/chd/individual/miriam-elizabeth-hobson-1843?lang=eng",
    "summary": "Institutional profile reports 1857 marriage; a later family history also gives 1859 and different location and age. Neither event's contemporary register page has been examined.",
    "provenance": "Church History Biographical Database, Miriam Elizabeth Hobson; Elda P. Mortenson family-history accounts compared in Tranche 06."
  },
  {
    "id": "isaac-orderville-moving-traditions",
    "kind": "document",
    "sourceLevel": "retrospective-family-history",
    "title": "Carling family — Orderville move and woodworking",
    "date": "Mid-1870s (reported)",
    "sourcePage": "https://de.scribd.com/document/48194950/Isaac-Van-Wagoner-Carling",
    "summary": "Later Carling family compilation recounts 4 August 1876 departure from Fillmore with wagons and tools; a separate 1965 family reunion account dates arrival 11 August 1875. Exact year remains unresolved.",
    "provenance": "Compiled Isaac Van Wagoner Carling family history; compare 1965 Chamberlain family reunion history, FamilySearch Memory 2501673."
  }
];
const historicalNotes=[
  {
    "title": "Orderville and the United Order",
    "paragraphs": [
      "The United Order was a Latter-day Saint cooperative economic movement expanded in the 1870s. Orderville, established in 1875 in southern Utah, was one of its most thorough experiments. Families brought labor and productive resources into a shared system; work was organized in departments, and residents made or distributed many of the goods they needed. A common dining hall, carpenter shop, blacksmith shop, commissary and other shared buildings gave the settlement an unusually planned form. The system reduced some household costs and offered opportunities for local manufacturing, but also demanded extensive discipline and blurred boundaries between family, employment and community leadership. Disputes over personal property, competing outside economic opportunities and federal pressure surrounding plural marriage helped weaken communal arrangements, which largely ended in 1885; some assets continued to be disposed of in later years.",
      "This economic institution was not identical to plural marriage or to an individual's church calling. For Isaac, the communal workshops provide a well-documented setting for work attributed to him by descendants, but neither the town's existence nor the catalog of its board minutes independently proves a particular job title."
    ],
    "links": [
      {
        "label": "Orderville town history",
        "url": "https://orderville.utah.gov/our-history"
      },
      {
        "label": "United Order history",
        "url": "https://www.churchofjesuschrist.org/study/history/topics/united-orders?lang=eng"
      },
      {
        "label": "Historical Orderville settlement view",
        "url": "https://collections.lib.utah.edu/ark:/87278/s6b2859f"
      }
    ]
  },
  {
    "title": "Two family journeys crossed paths in 1852",
    "paragraphs": [
      "Isaac's published diary entry for 1 August 1852 says the Miller party passed “Curtis' Company.” Church History places the five-year-old future son-in-law Edward Milo Webb Jr. in Uriah Curtis's company; that boy's father, Edward Milo Webb Sr., had died on 31 July 1852. This is a company-level convergence, not proof of an encounter, sighting, or knowledge of the Webb family's bereavement. The two migration stories were brought into the same direct line only decades later. Keep as a special research/historical note, not an invented scene in Isaac's biography. Do not reopen already user-approved Edward Jr."
    ],
    "links": [
      {
        "label": "Isaac's published diary",
        "url": "https://history.churchofjesuschrist.org/chd/transcript?lang=eng&name=transcript-for-carling-isaac-v-diary-in-elda-mortenson-comp-isaac-v-carling"
      }
    ]
  }
];
person.name='Isaac Van Wagoner Carling';
person.years='1831–1911';
person.place='Ulster County, New York → Fillmore → Orderville, Utah';
person.confidence='strong'; // Direct Sara/Sarah Elizabeth link still requires original parentage review.
person.note='Isaac crossed the plains in 1852, married Asenath Elizabeth Browning in Ogden in 1854, and worked as a skilled craftsman in Utah. Later family accounts place him in Orderville’s United Order during the mid-1870s and remember his interest in music, gardening and woodworking.';
person.BIOGRAPHY=biography;
person.biography=biography;
person.CONTEXT='Isaac’s family belonged to the nineteenth-century migration from New York through the Midwest to Utah, then the agricultural and cooperative settlements of the territory.';
person.historicalNotes=[...(person.historicalNotes||[]).filter(n=>!['Orderville and the United Order','Two family journeys crossed paths in 1852'].includes(n.title)),...historicalNotes];
person.evidence=person.evidence||[];
sourceLinks.forEach(source=>{if(!person.evidence.some(e=>e.id===source.id))person.evidence.push(source);});
// No portrait unless an actual individual Isaac image and attribution are inspected.
// No sourceLinks entry uses full/thumb/originalAsset because originals were not saved.
if(typeof GUIDE_PROFILES!=='undefined'){
 GUIDE_PROFILES.isaac_carling=Object.assign({},GUIDE_PROFILES.isaac_carling||{},{
  birthPlace:'Ulster County, New York (exact town spelling unresolved)',
  townContext:'Isaac was born in the Hudson Valley before his family’s westward movements; later lived at Fillmore and Orderville, Utah.',
  macroContext:'His lifetime spanned westward migrations, the territorial American West, industrialization and Utah statehood.',
  life:biography,
  events:[{title:'Migration to Utah',group:'westward',summary:'His published 1852 diary records a wagon journey and late-September arrival.'},{title:'Life in Orderville',group:'westward',summary:'Later family accounts remember skilled carpentry, music and gardening in the communal settlement.'}]
 });
}
if(typeof HISTORICAL_CONTEXT!=='undefined'){
 HISTORICAL_CONTEXT.isaac_carling={
  local:'The Ulster County Hudson Valley where Isaac was born was a region of farms, canals and developing market towns in the early nineteenth century.',
  macro:'Railroads and industrialization expanded across America during Isaac’s lifetime, as new Mormon settlements grew in the western territories.'
 };
}
person.contentRelease={tranche:15,status:'published-awaiting-user-iphone-acceptance',biographyDraft:'research/isaac-carling-tranche-10-museum-biography-review-20261018.md',mediaOriginalsCaptured:0,sourceLinkCount:sourceLinks.length};
})();
