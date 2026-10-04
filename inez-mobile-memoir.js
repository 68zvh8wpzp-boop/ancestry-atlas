/* Inez Prather memoir biography and photographs — mobile release. */
(() => {
'use strict';
if(typeof DATA==='undefined'||typeof GUIDE_PROFILES==='undefined')return;
const i=DATA.nodes.find(n=>n.id==='inez_karen');
if(!i)return;
  const inezLife = `Inez Karen Prather was born at home in Lakeside, Arizona, on 10 January 1946, during a snowstorm. Her parents, Grace Mildred Hill and Thomas Estil Prather, were much older than most parents of a newborn: Grace was thirty-six and Thomas sixty-eight. Inez arrived in the family’s rented Pink Haven house, with her older half-sister Cecilia, known as Tootie, already nineteen. Tootie chose the name “Snookie,” which stayed with Inez through high school and remained familiar to people from the Lakeside community. At college she began using Inez.

Her childhood unfolded in a small White Mountains community where families knew one another and school classes were tiny. Inez entered first grade in 1951, without kindergarten, and was the youngest child in her class. She was left-handed. The same small group of classmates moved through the grades together; in May 1963 she graduated from the last class at Lakeside High School before the school’s change to Blue Ridge. She cheered, attended basketball and football games, and worked at the local drive-in during summer. The photographs of her as a little girl, a grade-school student, and a senior preserve the visible passage through that close-knit school world.

Inez first noticed James Sheldon Webb when she was about thirteen. Their courtship began around 1959 and continued through school and college, nearly six years before marriage. In September 1963 she enrolled at Arizona State College in Flagstaff, later Northern Arizona University. She and Sheldon married in Lakeside on 21 January 1965, on a cold, snowy day. Inez made her wedding gown and the bridesmaid dresses. The ceremony took place in the Lakeside Chapel’s Relief Society room, a choice that allowed her mother to attend; a reception brought together relatives and neighbors. The couple later had a religious sealing in Mesa on 12 June. Only a small number of wedding photographs survived a mix-up with the town photographer, and the surviving images are kept with the family collection.

Inez was baptized in 1961. She completed her teaching degree in May 1967. Their first son, James Shared Webb, was born in Flagstaff on 11 October that year; Sheldon completed his own teaching degree in 1968. The early years of their family life involved university housing, rented apartments, new teaching jobs, and frequent moves. Inez remembered that she and Sheldon changed homes more than two dozen times. Across those moves she raised three sons—Shared, Jay Sterling, and Jeremy Sean—while developing a teaching career of her own.

From 1968 to 1969, the young family lived in Kayenta, where Inez substituted. They moved to Kirtland, New Mexico, in 1969. She taught English at Central Junior High and then home economics at Farmington High School through 1972. A move to the Panama Canal Zone followed. Their second son, Jay Sterling, was born at Gorgas Hospital in Balboa on 10 January 1973. In August 1973 the family drove from Lakeside to Panama, a long overland journey that turned an international job change into a family expedition. Inez later taught home economics at Balboa High School.

In 1976 they returned to the Lakeside–Pinetop area. Inez taught Title I mathematics at Blue Ridge Junior High in 1976–77. Their youngest son, Jeremy Sean, was born in 1977. From 1981 to 1990 she taught business at Blue Ridge High School, balancing classroom work with the everyday demands of a growing household. She also served for about ten years as secretary of the Larson Memorial Library Board and helped raise funds for a library addition. The family repaired and improved its home over time, making each return to the White Mountains another period of settling in and starting again.

Teaching took the family abroad once more. From 1990 to 1992 Inez taught computer classes for grades seven through twelve at Escola Graduada in São Paulo, Brazil. From 1992 to 1995 she taught computers from kindergarten through twelfth grade at the American School of Kuwait in Hawalli. The work placed her in large international schools and new cultural settings, while the family remained connected to Arizona through calls, visits, and later moves home. In this stage she was not simply accompanying Sheldon’s career: she was an experienced teacher in her own right, learning new systems and teaching new generations of students.

After returning to Arizona, Inez continued teaching in the Phoenix area. Her positions included home economics at Gilliland Middle School in Tempe, computer instruction at Desert Eagle High School, work at Global Renaissance Academy and Integrity Learning Center, and business and computer applications at Alhambra High School. She later taught at Cesar Chavez High School. She retired in May 2007 after thirty-one years of teaching across twelve districts, two U.S. states, and three foreign countries. In an era when computers were transforming school administration and instruction, her work repeatedly placed her at the point where new technology entered everyday classrooms.

Family, service, and travel occupied the years after retirement. Inez and Sheldon served for eighteen months in Lima, Peru, in 2011–12. She recorded visits to relatives, markets, archaeological sites, mountain landscapes, and coastal places, as well as the people and local scenes she encountered. The photographs from Peru retain that range: posed family pictures sit beside views of Lima, the Andes, Machu Picchu, Caral, Lake Titicaca, and everyday markets. A later Alaska cruise and other trips continued a pattern of travel that had accompanied their lives together. In 2013 Inez was living again at the family home in Lakeside.

Inez began keeping life-story notes in 1983, after her mother’s death on 27 April that year. She returned to the project in 2006 and wrote more in 2011 and 2014. Those pages preserve not just dates but the details that formal records omit: how names were chosen, how a family managed a move, how a home was improved, which work made a household possible, and how relatives cared for one another. Her long account turns teaching, motherhood, travel, and family history into a record that her descendants can revisit.

Inez and Sheldon marked their fiftieth wedding anniversary in January 2015. In Sheldon’s final years she cared for him as Parkinson’s disease and a tumor affected his health. He died in an assisted-living residence in Gilbert on 9 April 2016. Their shared story includes three sons and a growing family, but Inez’s own life stands on its own: a small-town student who became a teacher across continents, a library volunteer, a traveler, and the family’s determined recorder of memory.`;
  i.years = '1946–';
  i.place = 'Lakeside, Arizona';
  i.biography = inezLife;
  i.note = 'Inez Karen Prather grew up in Lakeside, Arizona, became a teacher in the United States and abroad, and preserved her family’s story in a detailed memoir.';
  GUIDE_PROFILES.inez_karen = {
    birthPlace:'Pink Haven, Lakeside, Arizona',
    townContext:'Lakeside is in Arizona’s White Mountains. Inez’s account describes a small school, a drive-in theatre, nearby family homes, and a community where relatives and neighbors were closely connected.',
    macroContext:'Inez’s life crossed postwar Arizona, the growth of international schools, and the rapid introduction of computers into classrooms. Her teaching career took her from the White Mountains to New Mexico, the Panama Canal Zone, Brazil, Kuwait, and the Phoenix area.',
    life:inezLife,
    events:[{title:'A small-town childhood',group:'arizona',summary:'Inez grew up in Lakeside and graduated in 1963 from the town’s final class before the school became Blue Ridge.'},{title:'Teaching across borders',group:'international',summary:'Her career included Arizona and New Mexico schools, the Panama Canal Zone, São Paulo, and Kuwait.'},{title:'A family life documented in her own words',group:'family',summary:'Beginning in 1983, Inez wrote and revised a long account of her childhood, teaching, family moves, travel, and later years.'}]
  };

  const photo = (file,title,date,place,summary,transcription) => ({
    kind:'photo', title,date,place,
    thumb:`assets/inez-life-story/${file}`,full:`assets/inez-life-story/${file}`,
    summary, provenance:'Family photograph embedded in Inez Prather’s life story manuscript.',
    confidence:'Family caption; date and identity retained with stated uncertainty.',
    transcription:transcription || 'Original: [no text present]\nTranslation: [not applicable]'
  });
  const noText = 'Original: [no text present]\nTranslation: [not applicable]';
  const memoirPhotos = [
    photo('image3.jpeg','Inez as a young child','about 1948','Lakeside, Arizona','Childhood portrait of Inez.','Original: [no text present]\nTranslation: [not applicable]'),
    photo('image4.jpeg','Inez at about age ten','about 1956','Arizona','School-age portrait of Inez.','Original: [no text present]\nTranslation: [not applicable]'),
    photo('image5.jpeg','Inez’s high-school portrait','about 1963','Lakeside, Arizona','Portrait from her high-school years.','Original: [no text present]\nTranslation: [not applicable]'),
    photo('image6.jpeg','Lakeside High School seniors, 1963','1963','Lakeside, Arizona','Senior composite that includes Inez. Visible names and school title transcribed from the photograph.','Original:\nJOHNNY AMOS | PAM DEFENBAUGH | DAVID GILLESPIE | WESLEY HENNING | GRACE JACKSON | BILLIE JO JOHNSON\nLAKESIDE\nSENIORS\n1963\nLANNY JOHNSON | RICKY JOHNSON\nLINDA KELLY | DALE KING | BEVERLY PENROD | TERRY PENROD | INEZ PRATHER | TOM RHOTON\n[Portrait captions along the bottom edge are cropped.]\nTranslation: The title and all visible names are in English and remain unchanged. [Portrait captions along the bottom edge are cropped.]'),
    photo('image8.jpeg','Inez and Sheldon with their two young sons','1973 or later','Arizona','Family portrait from the early years of parenthood.',noText),
    photo('image9.jpeg','Inez portrait','undated','Arizona','Professional portrait of Inez.',noText),
    photo('image10.jpeg','Inez portrait','undated','Arizona','A second professional portrait of Inez.',noText),
    photo('image11.jpeg','Inez, Sheldon, and their three sons','undated','Arizona','Family portrait with their three sons.',noText),
    photo('image12.jpeg','Inez and Sheldon at Niagara Falls','2008','Niagara Falls','The couple on a trip to Niagara Falls.',noText),
    photo('image13.jpeg','Inez and Sheldon at a monument in Peru','undated','Peru','Travel photograph of the couple at a large stone monument.',noText),
    photo('image14.jpeg','Inez with a group in Lima','2011–12','Lima, Peru','Group photograph from the period of their Lima service.',noText),
    photo('image15.jpeg','Grandson Griffin as a baby','undated','Arizona','Photograph of a young grandchild.',noText),
    photo('image16.jpeg','Inez with a large group in Lima','2011','Lima, Peru','Group photograph from the Lima period.',noText),
    photo('image17.jpeg','Inez at a museum exhibit','undated','Peru','Inez viewing a museum display.',noText),
    photo('image18.png','A Lima avenue and surrounding neighborhoods','2011–12','Lima, Peru','City view from Inez’s time in Lima.',noText),
    photo('image19.jpeg','Market vendor in the Andes','2011–12','Peru','Travel photograph of a woman at an outdoor market.',noText),
    photo('image20.png','Andean valley and cultivated fields','2011–12','Peru','Mountain landscape with fields and settlements.',noText),
    photo('image21.png','Inez and Sheldon on a mountain overlook','2011–12','Peru','Family travel photograph in the Andes.',noText),
    photo('image22.png','Market scene in Peru','2011–12','Peru','Travel photograph of market stalls and visitors.',noText),
    photo('image23.jpeg','Caral archaeological site','2011–12','Peru','Photograph of the stone structures at Caral.',noText),
    photo('image24.jpeg','Family at Caral','2011–12','Peru','Inez and family members among the structures at Caral.',noText),
    photo('image25.jpeg','Caral archaeological landscape','2011–12','Peru','Wide view of the archaeological site.',noText),
    photo('image28.jpeg','Temple grounds in Peru','2011–12','Peru','Photograph of a temple building seen during travel.',noText),
    photo('image29.jpeg','Inez and Sheldon with a physician','undated','Arizona','The couple photographed with a physician.',noText),
    photo('image30.jpeg','Stone terraces at Machu Picchu','2011–12','Peru','Travel photograph of the archaeological landscape.',noText),
    photo('image31.jpeg','Inez and Sheldon at Machu Picchu','2011–12','Peru','The couple among the ruins at Machu Picchu.',noText),
    photo('image32.jpeg','Machu Picchu and Huayna Picchu','2011–12','Peru','Landscape view of the site and surrounding mountains.',noText),
    photo('image33.png','Floating reed islands on Lake Titicaca','2011–12','Peru','Travel photograph on Lake Titicaca.',noText),
    photo('image34.png','Market beside a highland lake','2011–12','Peru','Outdoor market and highland landscape.',noText),
    photo('image35.jpeg','The Webb family together','December 2012','Arizona','Family photograph from December 2012.',noText),
    photo('image36.jpeg','Family on an Alaska cruise','undated','Alaska','Family members aboard a cruise ship.',noText),
    photo('image37.jpeg','Alaska fjord from the ship','undated','Alaska','View across a glacial fjord.',noText),
    photo('image38.jpeg','Totem pole in Alaska','undated','Alaska','Photograph of a carved totem pole beside a road.',noText),
    photo('image39.jpeg','Totem pole in a forest clearing','undated','Alaska','A second view of a carved totem pole.',noText),
    photo('image40.jpeg','Saxman historical sign','undated','Saxman, Alaska','Photograph of a roadside sign describing the village and its totem poles.','Original:\nSAXMAN\nLEGEND: TLINGIT INDIAN VILLAGE, ESTABLISHED 1894, IS NAMED\nFOR SCHOOL TEACHER SAMUEL SAXMAN. ONE OF THREE\nMEN LOST DEC. OF 1886 WHILE SCOUTING FOR A NEW\nLOCATION FOR PEOPLE OF TONGASS AND CAPE FOX\nVILLAGES. TOTEMS HERE COMPRISING WORLD’S LARGEST\nCOLLECTION, INCLUDING POLES MOVED FROM PENNOCK,\nTONGASS, AND VILLAGE ISLANDS AND FROM OLD CAPE\nFOX VILLAGE AT KIRK POINT. MANY ARE POLES RESTORED\nUNDER FEDERAL WORKS PROJECT DIRECTED BY THE\nU.S. FOREST SERVICE BEGINNING IN 1939.\nALASKA DEPARTMENT OF HIGHWAYS [lower line partly clipped]\nTranslation: The sign is in English; the transcription is unchanged. [The lower line is partly clipped.]'),
    photo('image43.jpeg','Inez and Sheldon at home','about 2015','Arizona','A later photograph of the couple together.',noText),
    photo('image49.jpeg','View across Lima','2011–12','Lima, Peru','A second city view from the Lima period.',noText),
    photo('image50.jpeg','Tropical beach and palms','undated','Peru','Travel photograph of a Pacific coast beach.',noText),
    photo('image55.jpeg','Machu Picchu panorama','2011–12','Peru','Wide view across the Machu Picchu site.',noText)
  ];

  i.evidence = i.evidence || [];
  for (const item of memoirPhotos) {
    if (!i.evidence.some(existing => existing.full === item.full)) i.evidence.push(item);
  }
})();
