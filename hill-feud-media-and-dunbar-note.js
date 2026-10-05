/* Hill–Evans visual history and a separate Dunbar historical note. */
(()=>{'use strict';if(typeof DATA==='undefined')return;
const n=DATA.nodes.find(x=>x.id==='russell_hill');
if(n){const additions=[
  {
    "kind": "photo",
    "title": "Hill family cemetery — Garrard County",
    "date": "Later photograph; exact date unknown",
    "place": "Garrard County, Kentucky",
    "thumb": "assets/hill-feud/hill-family-cemetery.jpg",
    "full": "assets/hill-feud/hill-family-cemetery.jpg",
    "sourcePage": "https://kentuckykindredgenealogy.com/2012/03/13/160-years-ago-the-feud-now-a-quiet-memory/",
    "summary": "The wooded Hill family burial ground near the area of the tobacco-house fight. A later view of the place, rather than a photograph of the 1852 encounter. Published by Kentucky Kindred Genealogy.",
    "transcription": "FULLTEXT_ORIGINAL: [illegible — distant stone lettering]\n\nFULLTEXT_TRANSLATION\nNot applicable — the legible words are in English; illegible lettering cannot be translated.",
    "previewStatus": "readable",
    "provenance": "Unchanged published JPG downloaded from Kentucky Kindred Genealogy; original dimensions and git blob retained in media manifest."
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
    "place": "Hill family cemetery, Garrard County, Kentucky",
    "thumb": "assets/hill-feud/isaiah-hill-gravestone.jpg",
    "full": "assets/hill-feud/isaiah-hill-gravestone.jpg",
    "sourcePage": "https://kentuckykindredgenealogy.com/2012/03/13/160-years-ago-the-feud-now-a-quiet-memory/",
    "summary": "The broken stone identified as Isaiah Hill’s by the cemetery researcher. Most surviving lettering cannot be read reliably in this photograph. Her reported partial reading was “I. Hill, Was Born, the 8 of …, And died, Mar …”; it is kept distinct from what can be read here. Published by Kentucky Kindred Genealogy.",
    "transcription": "FULLTEXT_ORIGINAL: [illegible — surviving inscription]\n\nFULLTEXT_TRANSLATION\nNot applicable — the legible words are in English; illegible lettering cannot be translated.",
    "previewStatus": "readable",
    "provenance": "Unchanged published JPG downloaded from Kentucky Kindred Genealogy; original dimensions and git blob retained in media manifest."
  },
  {
    "kind": "document",
    "title": "Lucy Hill and J. S. Hill — gravestones",
    "date": "1981 photograph, as dated by its publisher",
    "place": "Hill family cemetery, Garrard County, Kentucky",
    "thumb": "assets/hill-feud/lucy-hill-and-js-hill-gravestones.jpg",
    "full": "assets/hill-feud/lucy-hill-and-js-hill-gravestones.jpg",
    "sourcePage": "https://kentuckykindredgenealogy.com/2012/03/13/160-years-ago-the-feud-now-a-quiet-memory/",
    "summary": "Lucy’s white stone stands beside a stone bearing J. S. Hill. The cemetery researcher reports Lucy’s death as 4 March 1850 in her forty-third year. The initials on the adjoining stone do not establish its owner. Faded portions remain unreadable. Published by Kentucky Kindred Genealogy.",
    "transcription": "FULLTEXT_ORIGINAL: Lucy’s stone:\n[illegible]\nDIED\nMAR.4.1850\nin the 43[illegible]\n[illegible]\n\nAdjoining stone:\nJ. S. HILL\nWAS BORN\n[illegible]\n\nFULLTEXT_TRANSLATION\nNot applicable — the legible words are in English; illegible lettering cannot be translated.",
    "previewStatus": "readable",
    "provenance": "Unchanged published JPG downloaded from Kentucky Kindred Genealogy; original dimensions and git blob retained in media manifest."
  }
];n.evidence=(n.evidence||[]).filter(e=>!additions.some(a=>a.title===e.title)).concat(additions);}
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
