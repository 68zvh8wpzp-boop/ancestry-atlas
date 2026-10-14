(() => {
'use strict';
if (typeof DATA === 'undefined') return;
const person = DATA.nodes.find(node => node.id === 'marian_skinner');
if (!person) return;
const biography = "Marian Beulah Skinner Brenay was born on 3 March 1903 at Colfax, Michigan, the daughter of Richard Francis Skinner and Jessie Irene Aurin. Her childhood began in western Michigan, where farms, small settlements and lumber work connected families across neighboring townships. Richard and Jessie had married in Elbridge Township in 1899. Richard’s earlier marriage to Ellen Marie Hay had brought two older children, Millie Irene and Marcie Leo, into the family. Marian grew up within this extended household, with older children approaching working age while younger brothers and sisters were still small.\n\nRichard and Jessie’s children were Clifford D., Marian Beulah, Ellen Madelia, John Andrew, Richard Francis and Amanda Melvina. In 1910, seven-year-old Marian lived with her parents and siblings in Beaver Township, Newaygo County. Her father worked as a laborer in the woods, and the family owned its home with a mortgage. The household combined a sixteen-year-old son from Richard’s first marriage with the younger children of his marriage to Jessie. The youngest Richard died in infancy that year; Amanda, born in 1918, arrived when Marian was already a teenager.\n\nBy January 1920 the family had moved to Briley Township in Montmorency County, in Michigan’s northern inland country. Richard worked in the lumber woods, and Marcie and Clifford worked in a lumber camp. Logging and farming were closely connected in this landscape, where timber work supported households beyond the large lakeshore mill towns. Marian, then sixteen, could read and write and was still living at home. The 1940 census recorded eighth grade as her highest completed school grade.\n\nOn 13 September 1920, seventeen-year-old Marian married Charles Albert Brenay in Alpena. She was living at Atlanta, Michigan, while Charles, a twenty-three-year-old farmer, lived at Hubbard Lake. He had been born at Arnstein, Ontario, had crossed into Michigan as a child, and had served in the American Army during the First World War. Their marriage joined two families whose livelihoods had been shaped by the Great Lakes forests and rural communities. Early married life took Marian and Charles to Saginaw, where their daughter Marion was born in January 1923.\n\nMarian and Charles became the parents of thirteen children: Arnold Albert, Marion Beulah, David Alvin, Joseph Heber, Henry, Ruth Melvina, Moroni, Virginia Lee, Esther, Martha, Ammon Leroy, Joan Carol and Isaac Wilford Brenay. Their children’s ages spanned more than two decades. As the household grew, Marian’s life followed the practical demands of raising young children through repeated moves, changes in work and the search for a home that could support the family.\n\nIn 1925, the family loaded four small children and their possessions onto an old one-ton Ford truck covered with canvas and headed west. The journey lasted thirty days. They traveled through Midwestern cities and western towns, crossed the Colorado River by ferry near Parker, and reached Mesa on 17 July. Gravel roads, dirt tracks and desert heat made the trip very different from later highway travel. Marian left Michigan with a young family for a region where irrigated farms and growing towns stood beside large stretches of dry country.\n\nThe following years brought both growth and loss. Henry died in 1928, Ruth in infancy in 1929, Moroni in 1931 and thirteen-year-old David in 1937. Charles tried farming, building, repairs and shoe-shop work as the family moved between places offering land or employment. An attempt near Buckeye was followed by a move to Nutrioso, a return to Mesa, farming near Blanding and a period in Salt Lake City. These changes unfolded across the Depression, when finding reliable work and feeding a large household became harder.\n\nBy April 1930 Marian’s mother, Jessie, and her youngest sister, Amanda, were living with the Brenays in Mesa. Marian was twenty-seven. The census placed three generations together in a home valued at $1,000, with Charles working as a farm laborer. A decade later, Marian’s household was in Navajo County, Arizona. She reported that they had lived in Blanding, Utah, in 1935. The 1940 household owned a modest farm home, and Marian’s occupation was entered as housewife, working in her own home.\n\nThe family’s years in Arizona’s pine country included Lakeside in the White Mountains. A move associated with young Ammon’s recurring pneumonia brought them to the higher, cooler country. By 1942 Marian and Charles were in Sandpoint, Idaho. Photographs show them outdoors with their son Joseph and preserve Marian beside a profusion of peonies near a wooden house. One photograph bears the handwritten place and year, Sandpoint 1942; its family caption remembers the peony garden as prize-winning. Gardening gives a personal glimpse of Marian beyond the repeated moves and household responsibilities.\n\nIn April 1950 Marian was forty-seven and living in Manti, Utah. Six children were still at home with her and Charles. Her census entry described her principal activity as keeping house. Later photographs and correspondence followed the couple through Utah, Arizona and Oregon. A grandson remembered Marian and Charles living with his family in Veneta, Oregon. Their fiftieth wedding anniversary portrait, taken in Mesa in 1970, marked a marriage that had carried them through the interwar years, the Depression and the raising of a large family.\n\nGrandchildren remembered Marian as energetic and enjoyable to visit. Their mother and grandmother would talk for hours while the children listened. Visits brought dried fruit, food stored in the house and the companionship of several generations. When Charles rested with his feet raised because his legs troubled him, Marian attended to him. Her granddaughter Cheryl remembered that Marian walked almost everywhere and seldom drove, describing her as four feet eleven inches tall. Photographs of Marian outdoors after a walk preserve that familiar part of her daily life.\n\nCharles died on 3 December 1983. Marian continued to keep close contact with her children. In January 1988, at eighty-four, she wrote about a snowy Utah winter, Christmas visits and relatives’ housing plans. She said she was well and in good spirits, appreciated neighbors who looked after one another, and closed her letters with affection and concern for the children’s families. Her correspondence records the ordinary news through which a widely scattered family remained connected.\n\nMarian’s final home was in Summerfield, Florida, where she died on 25 June 1996 at ninety-three. Her family gathered in Mesa for funeral and graveside services, and she was buried beside Charles in Mesa City Cemetery. Their shared memorial calls them loving parents of thirteen children. Alongside that large family, Marian’s remembrance survives in her handwriting, childhood portraits, garden photographs and the visits her grandchildren recalled: a life extending from Michigan’s rural communities to homes across the American West and, finally, Florida.";
const context = "Marian’s early homes lay in Michigan’s forest and farming country, within the older Great Lakes homelands of Odawa and other Anishinaabe peoples. Her adult household moved between irrigated desert settlements, dry-farming country and mountain communities. Automobile travel made the 1925 migration possible before dependable paved highways eased such journeys. The Depression and the Second World War formed part of the wider setting, while family labor, home-making and changing opportunities shaped the Brenays’ daily life.";
person.biography = biography;
person.note = biography;
person.context = context;
person.CONTEXT = context;
person.place = 'Michigan → American West → Summerfield, Florida';
if (person.hold) person.hold = Object.assign({}, person.hold, {label: '1903 birth registration'});
if (typeof GUIDE_PROFILES !== 'undefined') {
  GUIDE_PROFILES.marian_skinner = Object.assign({}, GUIDE_PROFILES.marian_skinner || {}, {
    life: biography,
    townContext: context,
    birthPlace: 'Colfax, Michigan, United States'
  });
}
const letters = [
  {
    "kind": "document",
    "title": "Letters from Grandma Brenay",
    "date": "17 January 1988",
    "place": "Utah; exact address not stated",
    "thumb": "assets/ammon-docs-preview/letters-from-grandma-brenay-page-1.jpg",
    "full": "assets/ammon-docs-preview/letters-from-grandma-brenay-page-1.jpg",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/238454116",
    "originalAsset": "assets/marian-skinner/letters-original.pdf",
    "summary": "Marian writes to her children about winter, family visits and housing plans. Four pages contain two letters. The second letter does not state a year.",
    "provenance": "Grandma Brenay.pdf; DeEdra Breckenridge, 17 March 2026. Preserved unchanged four-page original; page previews rendered for readability.",
    "previewStatus": "pending-surface-verification",
    "transcription": "FULLTEXT_ORIGINAL:\n[Page 1]\nJan 17, 1988\n\nDear children All.\nBeleive me as we look Out\nthe Window we know it is\nWinter time here.\nHow ever we have enjoyed\nthe winter So far I have kept\nQuite Well no Colds or Sore throat\nIke is having Sore throat So\nis Janie. Both have trouble with\ntheir backs. Their Dr Said get\noff that Water bed and so they\nhave So hope they will be better\nThe kids Charlie, Shantel +\nErich have had their bouts\nwith Sore throats + Colds but\nnot So it slowed them down -\nany.\nWe are living in a good\nWard here. they look After one\nanother more than most Wards\nI have lived in.\nThey are a noisy bunch So\nthis Month has been stressing\nreverence in the chapel and I\nmust Say in the chapel its\nSelf in Sacrement meeting at least\nThey have improved 100%\n\n[Page 2]\nMartha + David Came to Visit\nMartha's kids for Christmas and\nthey Stayed with us a Couple nights\nboth Coming up and going back to\nmesa.\nAmmon + Mary have bought\na house here. they really like it\nhere They got a good deal on\nthe house\nThe house Ike wanted to buy in\nManti has not Cleared the title So I\ndont know if Ike will take it or\nnot it Would be Mar. before we\nwould know if the title Can be or\nwill be Cleared. Ikes offer on the\nplace was up 17 Jan. So he is\ndebating if he Should look for another\none - there were Several we all liked.\nI am Well and as the Saying.\ngoes. - In good Spirit\nHope and pray every thing is\ngoing Well with You + Yours\n\nLove mom.\n\n[Page 3]\nDear Marion + All.\nHere it is the 25 Jan. time is going\nwont be long until Glenn + Virginia\nWill be home\nwe have had some pretty good.\nSnow Storms Most of the [weeds?] how\never are bare utah never lets the Snow\nStay on the roads Very long.\nI am taking the Weather here\nJust fine while Ike, Janie, Erich + Shantel\nare all having a bad time with Colds\nand Sore throats even Ike.\nThe house didnt Clear title the\n17 of Jan. Sister Wisdom is mad at her\nReal estate agent She figured he Should\nof Cleared it for her and there was no\nway he could do it (that) She had to\ndo. So Ike isnt obligated to take that\nhouse any more but he Can re-negotiate\nterms with her if he so desires and\nshe very much wants him to.\nHowever Ike is going to look\naround Some more before he Settles for\nany thing\nCharles is still here Working for\nor with Ike he is thinking of going\nback to School and learn a trade in\n\n[Page 4]\nelectronis he has Checked and that would\nbe a good trade for him, he just\nisnt Cut Out to be a good Carpet\ninstaller nor is Erich.\nErich has been off his drugs Since\nhe has lived with Ike but he dont\nSeem to Want to Quite Smoking, nor\ndoes Charles they just Stop and Start\nagain which indicates they just dont\nWant to Quit.\nJanie is in bed with her Cold\nYesterday + to-day, the home teachers\nCame and gave her a blessing and\nshe feels better to-day but a long ways\nfrom being Out of the Woods So to Speak.\nWe had Ward Conference Yesterday\nand Stake Conference is Coming up.\n14 feb. this Mo. in Our Ward they have\nbeen Working on being more reverent\nin the Chapel. they have improved a\nlot - you know I Cant understand the\nloud laughter and [fridle?] remarks one\nhears now days in Our adult class\nrooms. one day in Our Sunday School\nClass some one Said something the class\nConsidered Very funny one Sister So for\ngot her Self she Started Clapping her\nhands - So you See they needed to be\ntaught to be reverent. Hope all is Well\nLove mom\n\nFULLTEXT_TRANSLATION\nNot applicable — English."
  },
  {
    "kind": "document",
    "title": "Letters from Grandma Brenay — page 2",
    "date": "17 January 1988",
    "place": "Utah; exact address not stated",
    "thumb": "assets/marian-skinner/letters-2.jpg",
    "full": "assets/marian-skinner/letters-2.jpg",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/238454116",
    "originalAsset": "assets/marian-skinner/letters-original.pdf",
    "summary": "Page 2 of Marian’s two handwritten January letters.",
    "provenance": "Grandma Brenay.pdf; DeEdra Breckenridge, 17 March 2026. Preserved unchanged four-page original; page previews rendered for readability.",
    "previewStatus": "pending-surface-verification",
    "transcription": "FULLTEXT_ORIGINAL:\nMartha + David Came to Visit\nMartha's kids for Christmas and\nthey Stayed with us a Couple nights\nboth Coming up and going back to\nmesa.\nAmmon + Mary have bought\na house here. they really like it\nhere They got a good deal on\nthe house\nThe house Ike wanted to buy in\nManti has not Cleared the title So I\ndont know if Ike will take it or\nnot it Would be Mar. before we\nwould know if the title Can be or\nwill be Cleared. Ikes offer on the\nplace was up 17 Jan. So he is\ndebating if he Should look for another\none - there were Several we all liked.\nI am Well and as the Saying.\ngoes. - In good Spirit\nHope and pray every thing is\ngoing Well with You + Yours\n\nLove mom.\n\nFULLTEXT_TRANSLATION\nNot applicable — English."
  },
  {
    "kind": "document",
    "title": "Letters from Grandma Brenay — page 3",
    "date": "25 January; year not written",
    "place": "Utah; exact address not stated",
    "thumb": "assets/marian-skinner/letters-3.jpg",
    "full": "assets/marian-skinner/letters-3.jpg",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/238454116",
    "originalAsset": "assets/marian-skinner/letters-original.pdf",
    "summary": "Page 3 of Marian’s two handwritten January letters.",
    "provenance": "Grandma Brenay.pdf; DeEdra Breckenridge, 17 March 2026. Preserved unchanged four-page original; page previews rendered for readability.",
    "previewStatus": "pending-surface-verification",
    "transcription": "FULLTEXT_ORIGINAL:\nDear Marion + All.\nHere it is the 25 Jan. time is going\nwont be long until Glenn + Virginia\nWill be home\nwe have had some pretty good.\nSnow Storms Most of the [weeds?] how\never are bare utah never lets the Snow\nStay on the roads Very long.\nI am taking the Weather here\nJust fine while Ike, Janie, Erich + Shantel\nare all having a bad time with Colds\nand Sore throats even Ike.\nThe house didnt Clear title the\n17 of Jan. Sister Wisdom is mad at her\nReal estate agent She figured he Should\nof Cleared it for her and there was no\nway he could do it (that) She had to\ndo. So Ike isnt obligated to take that\nhouse any more but he Can re-negotiate\nterms with her if he so desires and\nshe very much wants him to.\nHowever Ike is going to look\naround Some more before he Settles for\nany thing\nCharles is still here Working for\nor with Ike he is thinking of going\nback to School and learn a trade in\n\nFULLTEXT_TRANSLATION\nNot applicable — English."
  },
  {
    "kind": "document",
    "title": "Letters from Grandma Brenay — page 4",
    "date": "25 January; year not written",
    "place": "Utah; exact address not stated",
    "thumb": "assets/marian-skinner/letters-4.jpg",
    "full": "assets/marian-skinner/letters-4.jpg",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/238454116",
    "originalAsset": "assets/marian-skinner/letters-original.pdf",
    "summary": "Page 4 of Marian’s two handwritten January letters.",
    "provenance": "Grandma Brenay.pdf; DeEdra Breckenridge, 17 March 2026. Preserved unchanged four-page original; page previews rendered for readability.",
    "previewStatus": "pending-surface-verification",
    "transcription": "FULLTEXT_ORIGINAL:\nelectronis he has Checked and that would\nbe a good trade for him, he just\nisnt Cut Out to be a good Carpet\ninstaller nor is Erich.\nErich has been off his drugs Since\nhe has lived with Ike but he dont\nSeem to Want to Quite Smoking, nor\ndoes Charles they just Stop and Start\nagain which indicates they just dont\nWant to Quit.\nJanie is in bed with her Cold\nYesterday + to-day, the home teachers\nCame and gave her a blessing and\nshe feels better to-day but a long ways\nfrom being Out of the Woods So to Speak.\nWe had Ward Conference Yesterday\nand Stake Conference is Coming up.\n14 feb. this Mo. in Our Ward they have\nbeen Working on being more reverent\nin the Chapel. they have improved a\nlot - you know I Cant understand the\nloud laughter and [fridle?] remarks one\nhears now days in Our adult class\nrooms. one day in Our Sunday School\nClass some one Said something the class\nConsidered Very funny one Sister So for\ngot her Self she Started Clapping her\nhands - So you See they needed to be\ntaught to be reverent. Hope all is Well\nLove mom\n\nFULLTEXT_TRANSLATION\nNot applicable — English."
  }
];
person.evidence = (person.evidence || []).filter(item => !letters.some(page => page.title === item.title)).concat(letters);
const additionalMedia = [
  {
    "kind": "photo",
    "title": "Charles and Marian later in life",
    "thumb": "assets/marian-skinner/photo-06.jpg",
    "full": "assets/marian-skinner/photo-06.jpg",
    "originalAsset": "assets/marian-skinner/photo-06.jpg",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XFX",
    "summary": "Charles and Marian together later in life.",
    "provenance": "Preserved shared-memory original 0100_a-Repaired-Enhanced.jpg; D; DeEdra Breckenridge; 6 November 2025; SHA256 fd2a689562ab162df72adf12cc151b68b2bad72fafc424f6dad4e7b2ba4cde78. Contributor-supplied enhancements retained unchanged.",
    "transcription": "FULLTEXT_ORIGINAL:\n[no text present]\n\nFULLTEXT_TRANSLATION\nNot applicable — no text present.",
    "previewStatus": "pending-surface-verification",
    "place": "Mesa, Arizona"
  },
  {
    "kind": "photo",
    "title": "Charles and Marian — fiftieth wedding anniversary",
    "thumb": "assets/charles-albert/charles-marian-50th-anniversary.jpg",
    "full": "assets/charles-albert/charles-marian-50th-anniversary.jpg",
    "date": "1970",
    "place": "Mesa, Arizona",
    "summary": "Charles and Marian on their fiftieth wedding anniversary.",
    "provenance": "FamilySearch originaldownload0101_a-Enhanced.jpg; DeEdraBreckenridge6Nov2025. Suppliedenhanced original retained unchanged; no newderivative.",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XF6",
    "previewStatus": "pending-surface-verification",
    "transcription": "FULLTEXT_ORIGINAL:\n[no text present]\n\nFULLTEXT_TRANSLATION\nNot applicable — no text present."
  },
  {
    "kind": "photo",
    "title": "Charles and Marian in Oregon",
    "thumb": "assets/marian-skinner/photo-13.jpg",
    "full": "assets/marian-skinner/photo-13.jpg",
    "originalAsset": "assets/marian-skinner/photo-13.jpg",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XFX",
    "summary": "Charles and Marian outside a home. A grandson recalled that they lived with his family in Veneta; the year is not stated.",
    "provenance": "Preserved shared-memory original 0021_a-Enhanced.jpg; D; DeEdra Breckenridge; 11 October 2025; SHA256 48e3784166342cead648bb5497b1d1202316b11382da54bdf57594100afbaa6f. Contributor-supplied enhancements retained unchanged.",
    "transcription": "FULLTEXT_ORIGINAL:\n2\n4\n8\n1\n9\n[illegible vehicle inscription]\n\nFULLTEXT_TRANSLATION\nNot applicable — English/numerals; unclear text not translated.",
    "previewStatus": "pending-surface-verification",
    "place": "Veneta, Oregon"
  },
  {
    "kind": "photo",
    "title": "Charles and Marian with their son Joe",
    "thumb": "assets/marian-skinner/photo-14.jpg",
    "full": "assets/marian-skinner/photo-14.jpg",
    "originalAsset": "assets/marian-skinner/photo-14.jpg",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XFX",
    "summary": "Charles and Marian with Joseph, identified in the family caption.",
    "provenance": "Preserved shared-memory original 0015_a-Enhanced-Color-Restored.jpg; D; DeEdra Breckenridge; 10 October 2025; SHA256 2072626147e3b412231fc5916f04404b2f496506d8a53b713a4af7ef826d4aec. Contributor-supplied enhancements retained unchanged.",
    "transcription": "FULLTEXT_ORIGINAL:\n[no text present]\n\nFULLTEXT_TRANSLATION\nNot applicable — no text present.",
    "previewStatus": "pending-surface-verification"
  },
  {
    "kind": "photo",
    "title": "Charles and Marian seated at home",
    "thumb": "assets/marian-skinner/photo-15.jpg",
    "full": "assets/marian-skinner/photo-15.jpg",
    "originalAsset": "assets/marian-skinner/photo-15.jpg",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XFX",
    "summary": "Charles and Marian seated together indoors.",
    "provenance": "Preserved shared-memory original 0016_a-Enhanced.jpg; D; DeEdra Breckenridge; 10 October 2025; SHA256 a599ad2741affa1334dba857ec88074c88c1c0ad950a0e8ea00f83e5e7e8a81b. Contributor-supplied enhancements retained unchanged.",
    "transcription": "FULLTEXT_ORIGINAL:\n[no text present]\n\nFULLTEXT_TRANSLATION\nNot applicable — no text present.",
    "previewStatus": "pending-surface-verification"
  },
  {
    "kind": "photo",
    "title": "The Brenay home in Sandpoint",
    "thumb": "assets/marian-skinner/photo-16.jpg",
    "full": "assets/marian-skinner/photo-16.jpg",
    "originalAsset": "assets/marian-skinner/photo-16.jpg",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XFX",
    "summary": "The family home identified in the caption as Sandpoint.",
    "provenance": "Preserved shared-memory original 0011_a-Repaired.jpg; D; DeEdra Breckenridge; 10 October 2025; SHA256 647a38d4d333ec12dac965b19ea536204bf408846433b1a0ea27a001b22bf821. Contributor-supplied enhancements retained unchanged.",
    "transcription": "FULLTEXT_ORIGINAL:\n[no text present]\n\nFULLTEXT_TRANSLATION\nNot applicable — no text present.",
    "previewStatus": "pending-surface-verification",
    "place": "Sandpoint, Idaho"
  },
  {
    "kind": "photo",
    "title": "The Brenay family gathered at a table",
    "thumb": "assets/marian-skinner/photo-20.jpg",
    "full": "assets/marian-skinner/photo-20.jpg",
    "originalAsset": "assets/marian-skinner/photo-20.jpg",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XFX",
    "summary": "The caption identifies Charles, Marian, Martha, Esther, Joseph, daughter Marion and Arnold.",
    "provenance": "Preserved shared-memory original 0013_a-Repaired.jpg; D; DeEdra Breckenridge; 10 October 2025; SHA256 5de03073731f7a31c14929c6666d5e61315188fcfccbe6b380a1ca6865a65464. Contributor-supplied enhancements retained unchanged.",
    "transcription": "FULLTEXT_ORIGINAL:\n[no text present]\n\nFULLTEXT_TRANSLATION\nNot applicable — no text present.",
    "previewStatus": "pending-surface-verification"
  },
  {
    "kind": "photo",
    "title": "Marian as a young woman",
    "thumb": "assets/marian-skinner/photo-24.jpg",
    "full": "assets/marian-skinner/photo-24.jpg",
    "originalAsset": "assets/marian-skinner/photo-24.jpg",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XFX",
    "summary": "Marian in a studio portrait; the approximate date comes from the contributor.",
    "provenance": "Preserved shared-memory original img0013-Enhanced.jpg; D; DeEdra Breckenridge; 27 July 2025; SHA256 fd66baefa08e75d0f5ff7c84345a3d9d49064ec873509677cd98f3aa1c1ecf00. Contributor-supplied enhancements retained unchanged.",
    "transcription": "FULLTEXT_ORIGINAL:\n[no text present]\n\nFULLTEXT_TRANSLATION\nNot applicable — no text present.",
    "previewStatus": "pending-surface-verification",
    "date": "about 1925"
  },
  {
    "kind": "photo",
    "title": "Charles, Joseph and Marian in Sandpoint",
    "thumb": "assets/marian-skinner/photo-29.jpg",
    "full": "assets/marian-skinner/photo-29.jpg",
    "originalAsset": "assets/marian-skinner/photo-29.jpg",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XFX",
    "summary": "Charles, Joseph and Marian outdoors, identified in the family caption.",
    "provenance": "Preserved shared-memory original brenay pictures_0005_a.jpg; D; DeEdra Breckenridge; 23 March 2025; SHA256 db748fb71e0a87dd72e9170bc3df874b8ed4d41f502a147f16c65cc8c893566a. Contributor-supplied enhancements retained unchanged.",
    "transcription": "FULLTEXT_ORIGINAL:\n[no text present]\n\nFULLTEXT_TRANSLATION\nNot applicable — no text present.",
    "previewStatus": "pending-surface-verification",
    "place": "Sandpoint, Idaho",
    "date": "1942"
  },
  {
    "kind": "photo",
    "title": "Charles and Marian in Sandpoint",
    "thumb": "assets/marian-skinner/photo-31.jpg",
    "full": "assets/marian-skinner/photo-31.jpg",
    "originalAsset": "assets/marian-skinner/photo-31.jpg",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XFX",
    "summary": "Marian stands in front of Charles beneath a tree.",
    "provenance": "Preserved shared-memory original 1020025.jpg; D; DeEdra Breckenridge; 26 January 2025; SHA256 11f39d61e4d47c03e7c27b395914945460d31f1531d0d917b4a9cde7d602a7a1. Contributor-supplied enhancements retained unchanged.",
    "transcription": "FULLTEXT_ORIGINAL:\nSand point - 1942\n\nFULLTEXT_TRANSLATION\nNot applicable — English/numerals; unclear text not translated.",
    "previewStatus": "pending-surface-verification",
    "place": "Sandpoint, Idaho",
    "date": "1942"
  },
  {
    "kind": "photo",
    "title": "Charles and Marian in a car",
    "thumb": "assets/marian-skinner/photo-34.jpg",
    "full": "assets/marian-skinner/photo-34.jpg",
    "originalAsset": "assets/marian-skinner/photo-34.jpg",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XFX",
    "summary": "Marian and Charles in front of Joe and Doris Brenay’s home, according to the caption.",
    "provenance": "Preserved shared-memory original DeEdra_0043_a.jpg; D; DeEdra Breckenridge; 13 October 2024; SHA256 0f9b8837eedac52f1143fcac0ab01391b11abdcc932ef074fc55d9f3b97491e2. Contributor-supplied enhancements retained unchanged.",
    "transcription": "FULLTEXT_ORIGINAL:\n[illegible radiator inscription]\n\nFULLTEXT_TRANSLATION\nNot applicable — English/numerals; unclear text not translated.",
    "previewStatus": "pending-surface-verification",
    "place": "Mesa, Arizona",
    "date": "28 November 1963"
  },
  {
    "kind": "photo",
    "title": "Marian in the garden",
    "thumb": "assets/marian-skinner/photo-35.jpg",
    "full": "assets/marian-skinner/photo-35.jpg",
    "originalAsset": "assets/marian-skinner/photo-35.jpg",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XFX",
    "summary": "Marian seated beside a garden. The place and date come from the contributor.",
    "provenance": "Preserved shared-memory original Grandma & Grandpa Brenay058.jpg; D; DeEdra Breckenridge; 13 October 2024; SHA256 2cd7bf0b1a93096a726ef34e71b69b9a11f076f17e23756c4a63ab50447069a5. Contributor-supplied enhancements retained unchanged.",
    "transcription": "FULLTEXT_ORIGINAL:\n[no text present]\n\nFULLTEXT_TRANSLATION\nNot applicable — no text present.",
    "previewStatus": "pending-surface-verification",
    "place": "Mesa, Arizona",
    "date": "1941"
  },
  {
    "kind": "photo",
    "title": "The Brenay family outdoors",
    "thumb": "assets/marian-skinner/photo-45.jpg",
    "full": "assets/marian-skinner/photo-45.jpg",
    "originalAsset": "assets/marian-skinner/photo-45.jpg",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XFX",
    "summary": "A family group outdoors. The filename refers to Aunt Amanda; individual positions and the date are not established.",
    "provenance": "Preserved shared-memory original Brenay clan plus Aunt Amanda.jpg; S; ScottDaphne1; 18 August 2015; SHA256 3837c0f4273eb4a2586003cb2f33f4e4bff4b0c3cef9f038c1999d666546e4ce. Contributor-supplied enhancements retained unchanged.",
    "transcription": "FULLTEXT_ORIGINAL:\n[no text present]\n\nFULLTEXT_TRANSLATION\nNot applicable — no text present.",
    "previewStatus": "pending-surface-verification"
  },
  {
    "kind": "photo",
    "title": "Charles and Marian — early studio portrait",
    "thumb": "assets/marian-skinner/photo-47.jpg",
    "full": "assets/marian-skinner/photo-47.jpg",
    "originalAsset": "assets/marian-skinner/photo-47.jpg",
    "sourcePage": "https://www.familysearch.org/en/tree/person/memories/KWC1-XFX",
    "summary": "Marian and Charles in a studio portrait; the date and place are not stated.",
    "provenance": "Preserved shared-memory original charles and marion brenay.jpg; S; ScottDaphne1; 18 August 2015; SHA256 e03ec1522861d3b1791978a23a55506a5269e129e56b29e684191fec0f36a311. Contributor-supplied enhancements retained unchanged.",
    "transcription": "FULLTEXT_ORIGINAL:\n[no text present]\n\nFULLTEXT_TRANSLATION\nNot applicable — no text present.",
    "previewStatus": "pending-surface-verification"
  },
  {
    "kind": "document",
    "title": "Marian’s newspaper obituary",
    "thumb": "assets/marian-skinner/obituary-1996.jpg",
    "full": "assets/marian-skinner/obituary-1996.jpg",
    "originalAsset": "assets/marian-skinner/obituary-1996.jpg",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/231414426",
    "date": "27 June 1996",
    "summary": "The Arizona Republic, 27 June 1996, page B8. The notice reports Marian’s death and surviving family. Its wording “brothers” is preserved; the established family identifies those men as her sons.",
    "provenance": "Preserved original uploaded memory 231414426. Full transcription reviewed against the saved image.",
    "previewStatus": "pending-surface-verification",
    "transcription": "FULLTEXT_ORIGINAL:\nMarian Brenay, 93, of Summerfield, Fla., formerly of Mesa, died June 25, 1996. She was born in Colfax, Mich. Survivors include her daughters, Marian Webb, Mickey Allred, Virginia Hawkins, Martha Lemmon and Joan Lake; sister, Amanda; brothers, Arnold, Joseph, Ammon and Isaac; 45 grandchildren; 128 great-grandchildren; 47 great-great-grandchildren, and 14 great-great-great-grandchildren. Visitation: 7 to 9 p.m. Friday, Meldrum Mortuary, 52 N. Macdonald St., Mesa. Services: 8 a.m. Saturday, Mesa City Cemetery, 1212 N. Center St., Mesa.\n\nFULLTEXT_TRANSLATION\nNot applicable — English."
  },
  {
    "kind": "document",
    "title": "A tribute to Grandma Brenay",
    "thumb": "assets/marian-skinner/tribute-1996.jpg",
    "full": "assets/marian-skinner/tribute-1996.jpg",
    "originalAsset": "assets/marian-skinner/tribute-1996.jpg",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/232194653",
    "date": "25 June 1996",
    "summary": "Cheryl remembers her grandmother’s care, walking, height and faith. The text is signed Cheryl; it does not independently supply her surname.",
    "provenance": "Preserved original uploaded memory 232194653. Full transcription reviewed against the saved image.",
    "previewStatus": "pending-surface-verification",
    "transcription": "FULLTEXT_ORIGINAL:\nA Tribute to Grandma Brenay\n\nDonna, me again,\n\nToday is June 25th, my last Grandparent died today. She was 93 years old. I would sure like to be in her shoes when she crosses the veil. She spent her whole life doing Temple work. She was a convert to the church, my Dad being three years old when they joined the Church of Jesus Christ. Her Faith never wavered. She was a brick, her love for the Gospel so strong.\n\nShe is the one I told you had spirits come to her at night and beg her to do their Temple work. She told them not to come to her home, but to meet her at the Temple, And She did their work. She was one of the Lords' Valiant servants. She was so devoted to helping others, her mission in Life. Now she is with Grandpa, four of her children, Henry, Moroni, Ruth and David. She has 9 living children, My Dad being the oldest, 75 years old.\n\nMy Grandma took care of me when I was a little girl, I'll miss her the most, because I knew her the most. She walked everywhere she went, she never drove much, she was to short to see over the steering wheel, 4 feet 11 inches, with faith that would move mountains.\n\nI'll bet Grandpa is so happy to see her, and and her four children will be there to greet her.\n\nI know as she looks into the eyes of the Lord, he will say, \"You did well My Daughter\".\n\nI know some day soon I will see Grandma, she will be So happy, just like she was in her life, a wonderful Woman, she brought Joy to many who knew her.\n\nGood Bye Grandma, I love you, Thank you for being my Grandma. See you soon.\n\nLove Cheryl\n\nFULLTEXT_TRANSLATION\nNot applicable — English."
  },
  {
    "kind": "document",
    "title": "Marian’s funeral program — viewing and service",
    "thumb": "assets/marian-skinner/funeral-2.jpg",
    "full": "assets/marian-skinner/funeral-2.jpg",
    "originalAsset": "assets/marian-skinner/funeral-original.pdf",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/232143674",
    "date": "28 June 1996",
    "place": "Mesa, Arizona",
    "summary": "The program names relatives taking part in the service. The graveside time differs from the newspaper notice; both readings are retained.",
    "provenance": "Marian_Brenay_Funeral_Program.pdf; DeEdra Breckenridge, 19 November 2025. Page2 of3; preview rendered from the unchanged uploaded original.",
    "previewStatus": "pending-surface-verification",
    "transcription": "FULLTEXT_ORIGINAL:\nMeldrum Mortuary, Mesa Arizona\nJune 28, 1996\n\nMarian Beulah Skinner Brenay\nBorn -- Died\nMarch 3, 1903 --- June 25 1996\n\nViewing & Service\n\nOfficiating: Arnold Albert Brenay\n\nSong: In the garden - Janie Brenay\npiano: Diane Webb Hall\n\nPrayer: Isaac Wilford Brenay\n\nTribute to Mom: Mickey E. Brenay Allred\n\nSong: Family - 'How Great Thou Art'\nChorister: Marian B. Brenay Webb\nPiano: Diane Webb Hall\n\nMemories from Mama: Virginia L. Brenay Hawkins\n\nFamily Prayer: LeRoy Brenay\n\n\"But Blessed are they who are faithful and\nendure, whether in Life or in Death, for they\nshall inherit Eternal Life\"\n\nDoctrine & Covenants 50:5\n\nFULLTEXT_TRANSLATION\nNot applicable — English."
  },
  {
    "kind": "document",
    "title": "Marian’s funeral program — graveside service",
    "thumb": "assets/marian-skinner/funeral-3.jpg",
    "full": "assets/marian-skinner/funeral-3.jpg",
    "originalAsset": "assets/marian-skinner/funeral-original.pdf",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/232143674",
    "date": "29 June 1996",
    "place": "Mesa, Arizona",
    "summary": "The program names relatives taking part in the service. The graveside time differs from the newspaper notice; both readings are retained.",
    "provenance": "Marian_Brenay_Funeral_Program.pdf; DeEdra Breckenridge, 19 November 2025. Page3 of3; preview rendered from the unchanged uploaded original.",
    "previewStatus": "pending-surface-verification",
    "transcription": "FULLTEXT_ORIGINAL:\nGraveside Service - 29 June, 1996 - 9a.m.\n\nMesa City Cemetery, Mesa, Arizona\n\nOfficiating: Arnold Albert Brenay\n\nPrayer: John Brenay\nA special tribute to Grandma: written by Cheryl Brenay Abel\nand read by, Glenda Hawkins Anderson\nSong: A special song written and sang by Janie Brenay\n\nDedication of Grave: Joseph Heber Brenay\n\nFamily Luncheon hosted by Lonnie & Claudia Hawkins following\nservice\n\nFULLTEXT_TRANSLATION\nNot applicable — English."
  }
];
person.evidence = (person.evidence || []).filter(item => !additionalMedia.some(media => media.title === item.title || (item.full && media.full === item.full))).concat(additionalMedia);
const homePhoto = {"kind":"photo","title":"Charles and Marian outside their home","date":"1941","place":"Sandpoint, Idaho","thumb":"assets/marian-skinner/photo-37.jpg","full":"assets/marian-skinner/photo-37.jpg","originalAsset":"assets/marian-skinner/photo-37.jpg","sourcePage":"https://www.familysearch.org/en/tree/person/memories/KWC1-XFX","summary":"Charles and Marian beside a vehicle outside their home. The place and year come from the contributor.","provenance":"Grandma & Grandpa Brenay056.jpg; DeEdra Breckenridge, 13 October 2024; preserved unchanged. SHA256 60f9d761d7159ecac31a76ecba6a2c744ef01fd2931608245cdb964435fafc96.","transcription":"FULLTEXT_ORIGINAL:\n[partially visible number plate: illegible]\n\nFULLTEXT_TRANSLATION\nNot applicable — unclear numerals not expanded.","previewStatus":"pending-surface-verification"};
person.evidence = (person.evidence || []).filter(item => item.full !== homePhoto.full && item.title !== homePhoto.title).concat(homePhoto);
const childhoodPhotos = [
  {
    "kind": "photo",
    "title": "Jessie and Marian Skinner",
    "date": "Date uncertain",
    "place": "Michigan",
    "thumb": "assets/jessie-aurin/jessie-and-marian-skinner.jpg",
    "full": "assets/jessie-aurin/jessie-and-marian-skinner.jpg",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/230107475",
    "provenance": "DeEdra Breckenridge; 2025-10-13; 0057_a-Enhanced.jpg. Contributor repair/enhancement preserved unchanged.",
    "summary": "Jessie stands beside her daughter Marian outside a brick house. The photograph’s date is uncertain.",
    "transcription": "FULLTEXT_ORIGINAL: [no text present]\nFULLTEXT_TRANSLATION: [not applicable]",
    "translation": "[not applicable]",
    "original_text": "[no text present]",
    "personId": "marian_skinner",
    "name": "Marian Beulah Skinner Brenay",
    "years": "1903–1996",
    "branch": "Skinner / Aurin",
    "originalAsset": "assets/jessie-aurin/jessie-and-marian-skinner.jpg",
    "previewStatus": "pending-surface-verification"
  },
  {
    "kind": "photo",
    "title": "Richard and Jessie Skinner with their children",
    "date": "About 1906",
    "place": "Michigan",
    "thumb": "assets/jessie-aurin/richard-jessie-family-c1906.jpg",
    "full": "assets/jessie-aurin/richard-jessie-family-c1906.jpg",
    "sourcePage": "https://www.familysearch.org/en/memories/memory/230097058",
    "provenance": "DeEdra Breckenridge; 2025-10-13; 0053_a-Repaired-Enhanced.jpg. Contributor repair/enhancement preserved unchanged.",
    "summary": "Richard and Jessie Skinner with three young children, approximately 1906. The family caption identifies Clifford, Marian and Ellen.",
    "transcription": "FULLTEXT_ORIGINAL: [no text present]\nFULLTEXT_TRANSLATION: [not applicable]",
    "translation": "[not applicable]",
    "original_text": "[no text present]",
    "personId": "marian_skinner",
    "name": "Marian Beulah Skinner Brenay",
    "years": "1903–1996",
    "branch": "Skinner / Aurin",
    "originalAsset": "assets/jessie-aurin/richard-jessie-family-c1906.jpg",
    "previewStatus": "pending-surface-verification"
  }
];
person.evidence = (person.evidence || []).filter(item => !childhoodPhotos.some(photo => photo.full === item.full)).concat(childhoodPhotos);
const storyScenes = [
  {src:'assets/jessie-aurin/richard-jessie-family-c1906.jpg',title:'Marian’s childhood family',caption:'Richard and Jessie with their children, about 1906; identified in the family caption.',triggerParagraph:0,visualType:'family-photo'},
  {src:'assets/jessie-aurin/jessie-and-marian-skinner.jpg',title:'Marian and her mother',caption:'Marian beside Jessie outside a brick house; date uncertain.',triggerParagraph:1,visualType:'family-photo'},
  {src:'assets/marian-skinner/photo-24.jpg',title:'Marian as a young woman',caption:'A studio portrait, dated approximately 1925 by its contributor.',triggerParagraph:3,visualType:'family-photo'},
  {src:'assets/marian-skinner/photo-31.jpg',title:'Marian and Charles in Sandpoint',caption:'The print bears the place and year, Sandpoint 1942.',triggerParagraph:8,visualType:'family-photo'},
  {src:'assets/charles-albert/charles-marian-50th-anniversary.jpg',title:'Fifty years of marriage',caption:'Marian and Charles, Mesa, 1970.',triggerParagraph:9,visualType:'family-photo'}
];
person.storyScenes = storyScenes;
if (typeof TOUR_MEDIA !== 'undefined') {
  TOUR_MEDIA.marian_skinner = Object.assign({}, TOUR_MEDIA.marian_skinner || {}, {
    transcript: biography, scenes: storyScenes, audio: null, audioCandidates: [],
    moduleVersion: '20261014-marian-2', storyReady: true
  });
}
})();
