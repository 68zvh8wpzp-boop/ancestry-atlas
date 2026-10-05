/* Hill–Evans visual history and a separate Dunbar historical note. */
(()=>{'use strict';if(typeof DATA==='undefined')return;
const n=DATA.nodes.find(x=>x.id==='russell_hill');
if(n){const additions=[
  {
    "kind": "photo",
    "title": "Hill family cemetery — Garrard County",
    "date": "Later photograph; exact date unknown",
    "place": "Hill family cemetery, on the farm recorded as the Pendleton farm near KY Route 563, approximately half a mile south of Scotts Fork Church, Garrard County, Kentucky. Published cemetery map pin: 37.72277, -84.55194; not a surveyed grave location. No verified street number is available.",
    "thumb": "assets/hill-feud/hill-family-cemetery.jpg",
    "full": "assets/hill-feud/hill-family-cemetery.jpg",
    "sourcePage": "https://kentuckykindredgenealogy.com/2012/03/13/160-years-ago-the-feud-now-a-quiet-memory/",
    "summary": "The wooded Hill family burial ground near the area of the tobacco-house fight. A later view of the place, rather than a photograph of the 1852 encounter. Published by Kentucky Kindred Genealogy. Location: near KY 563 on the recorded Pendleton farm, about half a mile south of Scotts Fork Church. Published map pin 37.72277, -84.55194 (not surveyed).",
    "transcription": "FULLTEXT_ORIGINAL: [illegible — distant stone lettering]\n\nFULLTEXT_TRANSLATION\nNot applicable — the legible words are in English; illegible lettering cannot be translated.",
    "previewStatus": "readable",
    "provenance": "Unchanged published JPG downloaded from Kentucky Kindred Genealogy; original dimensions and git blob retained in media manifest.",
    "locationSources": [
      "https://kygenweb.net/garrard/cemeteries/Hill_Cemetery.html",
      "https://peoplelegacy.net/cemetery/hill_cemetery-572M6/"
    ],
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=37.72277%2C-84.55194"
  },
  {
    "kind": "photo",
    "title": "Isaiah Hill and Lydia Ross — the younger generation",
    "date": "Undated family portrait",
    "place": "Kentucky",
    "thumb": "assets/hill-feud/isaiah-hill-and-lydia-ross.jpg",
    "full": "assets/hill-feud/isaiah-hill-and-lydia-ross.jpg",
    "sourcePage": "https://kentuckykindredgenealogy.com/2011/06/19/lucky-to-be-alive/",
    "summary": "Identified by Kentucky Kindred Genealogy as Isaiah and Lucy Murphy Hill’s son Isaiah with his wife Lydia Ross. He is Russell’s probable brother, not Isaiah the father killed in 1852, and this is not a portrait of Russell.",
    "transcription": "FULLTEXT_ORIGINAL: [illegible — lettering in the left background]\n\nFULLTEXT_TRANSLATION\nNot applicable — the legible words are in English; illegible lettering cannot be translated.",
    "previewStatus": "readable",
    "provenance": "Unchanged published JPG downloaded from Kentucky Kindred Genealogy; original dimensions and git blob retained in media manifest."
  },
  {
    "kind": "document",
    "title": "Isaiah Hill — damaged gravestone",
    "date": "Later photograph; exact date unknown",
    "place": "Hill family cemetery, on the farm recorded as the Pendleton farm near KY Route 563, approximately half a mile south of Scotts Fork Church, Garrard County, Kentucky. Published cemetery map pin: 37.72277, -84.55194; not a surveyed grave location. No verified street number is available.",
    "thumb": "assets/hill-feud/isaiah-hill-gravestone.jpg",
    "full": "assets/hill-feud/isaiah-hill-gravestone.jpg",
    "sourcePage": "https://kentuckykindredgenealogy.com/2012/03/13/160-years-ago-the-feud-now-a-quiet-memory/",
    "summary": "The broken stone identified as Isaiah Hill’s by the cemetery researcher. Most surviving lettering cannot be read reliably in this photograph. Her reported partial reading was “I. Hill, Was Born, the 8 of …, And died, Mar …”; it is kept distinct from what can be read here. Published by Kentucky Kindred Genealogy. Location: near KY 563 on the recorded Pendleton farm, about half a mile south of Scotts Fork Church. Published map pin 37.72277, -84.55194 (not surveyed).",
    "transcription": "FULLTEXT_ORIGINAL: [illegible — surviving inscription]\n\nFULLTEXT_TRANSLATION\nNot applicable — the legible words are in English; illegible lettering cannot be translated.",
    "previewStatus": "readable",
    "provenance": "Unchanged published JPG downloaded from Kentucky Kindred Genealogy; original dimensions and git blob retained in media manifest.",
    "locationSources": [
      "https://kygenweb.net/garrard/cemeteries/Hill_Cemetery.html",
      "https://peoplelegacy.net/cemetery/hill_cemetery-572M6/"
    ],
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=37.72277%2C-84.55194"
  },
  {
    "kind": "document",
    "title": "Lucy Hill and J. S. Hill — gravestones",
    "date": "1981 photograph, as dated by its publisher",
    "place": "Hill family cemetery, on the farm recorded as the Pendleton farm near KY Route 563, approximately half a mile south of Scotts Fork Church, Garrard County, Kentucky. Published cemetery map pin: 37.72277, -84.55194; not a surveyed grave location. No verified street number is available.",
    "thumb": "assets/hill-feud/lucy-hill-and-js-hill-gravestones.jpg",
    "full": "assets/hill-feud/lucy-hill-and-js-hill-gravestones.jpg",
    "sourcePage": "https://kentuckykindredgenealogy.com/2012/03/13/160-years-ago-the-feud-now-a-quiet-memory/",
    "summary": "Lucy’s white stone stands beside a stone bearing J. S. Hill. The cemetery researcher reports Lucy’s death as 4 March 1850 in her forty-third year. The initials on the adjoining stone do not establish its owner. Faded portions remain unreadable. Published by Kentucky Kindred Genealogy. Location: near KY 563 on the recorded Pendleton farm, about half a mile south of Scotts Fork Church. Published map pin 37.72277, -84.55194 (not surveyed).",
    "transcription": "FULLTEXT_ORIGINAL: Lucy’s stone:\n[illegible]\nDIED\nMAR.4.1850\nin the 43[illegible]\n[illegible]\n\nAdjoining stone:\nJ. S. HILL\nWAS BORN\n[illegible]\n\nFULLTEXT_TRANSLATION\nNot applicable — the legible words are in English; illegible lettering cannot be translated.",
    "previewStatus": "readable",
    "provenance": "Unchanged published JPG downloaded from Kentucky Kindred Genealogy; original dimensions and git blob retained in media manifest.",
    "locationSources": [
      "https://kygenweb.net/garrard/cemeteries/Hill_Cemetery.html",
      "https://peoplelegacy.net/cemetery/hill_cemetery-572M6/"
    ],
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=37.72277%2C-84.55194"
  }
];n.evidence=(n.evidence||[]).filter(e=>!additions.some(a=>a.title===e.title)).concat(additions);}
if(n){const feudNote={"title": "Special historical note · The Hill–Evans feud", "paragraphs": ["Russell’s probable parents were Isaiah Hill and Lucy Murphy of Garrard County. Their family belonged to the Hill side of the Hill–Evans feud, a prolonged conflict centered on Lancaster and the countryside around Sugar Creek. The relationship of the younger Russell to Isaiah and Lucy remains probable rather than independently established. The history of the fighting, however, explains the circumstances in which that family lost several adult men and its children were left without their fathers.", "The feud developed in the 1820s between neighbors John Hill Sr. and Dr. Hezekiah Evans, whose homes stood across the creek from one another. Accounts differ about the first quarrel. Some describe disputes over land, money and promissory notes; an account associated with J. J. Thompson’s 1854 history traces an early confrontation to Evans’s hiring of an enslaved woman from Hill. The disagreement grew into recurring lawsuits, insults and physical violence. John Hill’s death in 1839 did not end it: younger members of the Hill family continued the quarrel. In this community, an old dispute became an inherited family obligation, drawing relatives and allies into opposing parties.", "A decisive escalation came in March 1850, when Lancaster was crowded for court day and a speech by Judge Robertson. After an exchange of insults, Dr. Evans shot Jesse Hill, brother of Isaiah, Frederick and the older Russell. Jesse was carried to an upstairs room belonging to Dr. Oliver Perry Hill and died of his wounds. Evans withdrew to his home and later went to Indiana. His eventual acquittal left the bereaved Hills without a murder conviction. Further confrontations followed, and in December 1850 both parties were placed under court orders to keep the peace, backed by substantial financial penalties. For a time the immediate violence subsided.", "On 13 March 1852, Isaiah, Frederick and Russell Hill were helping John Brown move his family and household goods toward Teatersville. Their party included a wagon carrying Brown’s wife, children and furniture, as well as several sons of the Hill brothers. On the return journey they passed a tobacco house beside Scotch Fork of Sugar Creek. Gunfire from the building struck the older Russell, who fell dead from his horse. Isaiah was killed by John Sellars as the party tried to reach shelter and return fire. Frederick continued fighting despite grave injuries. Isaiah’s son James killed Sellars and was himself wounded; William Chrisman also died. Four men died in the encounter, and Frederick later died from his injuries. This older Russell was Isaiah’s adult brother, not the small child who would become the Missouri farmer.", "The tobacco-house fight was the feud’s most destructive encounter, but it did not bring an immediate peace. Later violence took the lives of Nelson Sutherland, Jesse May and Joseph Murphy. A family historian’s reconstruction counts nine deaths across the feud and records acquittals rather than murder convictions. The conflict eventually diminished as families dispersed: many Hills moved to Washington and Anderson counties, while several Evans sons went to Texas. Some relatives remained in Garrard County. There was no clear victory to compensate either side for the dead; the lasting outcome was bereavement, damaged households and the scattering of a once closely connected community.", "Lucy Murphy Hill had died on 4 March 1850, two years before Isaiah’s killing. Her surviving cemetery inscription records her death in her forty-third year. Her cause of death is unknown, and she is not established as a victim of the feud. Isaiah’s death therefore added a father’s violent loss to a family that had already lost its mother. If the younger Russell was their son, he was still under five when both parents were gone. Family accounts describe relatives caring for surviving children, but Russell’s own guardian and childhood household have not been established. Nor is he known to have witnessed the tobacco-house fight. His early story belongs to the children who lived with the consequences, rather than to the armed men whose names filled the accounts of the conflict.", "The cemetery today: Hill family cemetery, on the farm recorded as the Pendleton farm near KY Route 563, approximately half a mile south of Scotts Fork Church, Garrard County, Kentucky. Published cemetery map pin: 37.72277, -84.55194; not a surveyed grave location. No verified street number is available. The photographed burial ground is separate from Scotts Fork Church Cemetery. A visitor’s account describes a small wooded burial ground beside cultivated fields, reached across private farmland. Access arrangements must be made with the current landowner."], "links": [{"label": "Hill Cemetery · location and burials", "url": "https://kygenweb.net/garrard/cemeteries/Hill_Cemetery.html"}, {"label": "Published cemetery coordinates", "url": "https://peoplelegacy.net/cemetery/hill_cemetery-572M6/"}, {"label": "Open cemetery map pin", "url": "https://www.google.com/maps/search/?api=1&query=37.72277%2C-84.55194"}, {"label": "Cemetery photographs and field account", "url": "https://kentuckykindredgenealogy.com/2012/03/13/160-years-ago-the-feud-now-a-quiet-memory/"}]};n.historicalNotes=(n.historicalNotes||[]).filter(z=>z.title!==feudNote.title).concat(feudNote);}
const note={
  "title": "Special historical note · Clan Dunbar",
  "paragraphs": [
    "Clan Dunbar’s medieval story centres on Dunbar, the coastal town and fortress in East Lothian, Scotland. In the eleventh century, Gospatric, formerly Earl of Northumbria, received lands around Dunbar from King Malcolm III after losing his English earldom. His descendants became the powerful Earls of Dunbar and March, whose estates and castles gave them a major role along Scotland’s eastern border.",
    "The earls lived amid the competing demands of Scottish and English kings. Dunbar Castle figured in the Wars of Independence, including the English victory at Dunbar in 1296. In 1338 Agnes Randolph, remembered as Black Agnes and married to the Earl of Dunbar, successfully defended the castle against an English siege. Her resistance became one of the best-known episodes associated with the family.",
    "In 1435 King James I confiscated the earldom, ending the medieval earls’ rule at Dunbar. Other Dunbar branches continued elsewhere in Scotland, including families associated with Moray and Mochrum. Their history survives in castles, estates, churches and family traditions.",
    "This is historical background to the Dunbar name. A documented line connecting Thomas, Davia and the other Missouri Dunbars to Gospatric or the medieval earls has not been established; a shared surname alone cannot make that connection."
  ],
  "links": [
    {
      "label": "Dunbar History Society",
      "url": "https://dunbarhistory.org.uk/2020/08/clan-dunbar-international/"
    },
    {
      "label": "Clan Dunbar · castles and estates",
      "url": "https://www.clandunbar.org/region-summaries"
    }
  ]
};
DATA.nodes.filter(x=>x.id==='russell_hill'||/Dunbar/i.test(x.name||'')).forEach(x=>{x.historicalNotes=(x.historicalNotes||[]).filter(z=>z.title!==note.title).concat(note);});
})();
