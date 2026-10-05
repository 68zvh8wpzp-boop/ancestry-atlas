(() => {
'use strict';
if(typeof DATA==='undefined')return;
const thomas=DATA.nodes.find(n=>n.id==='thomas_d');if(!thomas)return;
const biography="Thomas D. Dunbar was born about 1821 in Kentucky and spent most of his adult life in central Missouri. His birthplace is remembered as Clark County, in the Bluegrass region east of Lexington. His family is linked to William Weeden Dunbar and Frances Fanny Weldon, although a birth record naming his parents has not been found. He belonged to a generation whose family connections reached from Virginia and Kentucky into Missouri, bringing older Upper-South ties into a new setting west of the Mississippi.\n\nClark County was formed soon after Kentucky became a state in 1792. The country around Winchester combined farms, market towns, roads and creek valleys. Thomas’s precise childhood home, schooling and first employment are unknown. The Kentucky-to-Missouri connection nevertheless helps place his early life geographically: relatives and neighbors could carry familiar names and relationships west even as they established homes in different counties and states. By January 1843, Thomas was marrying in Boone County, Missouri.\n\nBoone County, organized in 1820, belonged to the broader Boonslick country along the Missouri River. Migrants from Kentucky, Virginia and Tennessee formed a substantial part of its settler population. Their farms occupied a landscape of wooded creek bottoms and prairie, linked by roads to mills, merchants, churches and county institutions. This settlement followed Indigenous dispossession; the developing agricultural county was part of Missouri’s wider transformation from Native homelands into a state dominated by settler farms and towns. Thomas’s individual part in that transformation is not known.\n\nColumbia served as the county seat and a center for legal business and trade. Rocky Fork Township, where Thomas’s household later appears, took its name from a branch of Rock Perche Creek. Streams, roads and nearby market towns helped organize rural life. A farm household there could be rooted in a small neighborhood while remaining connected to county courts and regional commerce. Thomas’s adult story belongs to this established, developing agricultural world rather than to an isolated outpost.\n\nOn 19 January 1843, Thomas married Rebecca Williams in Boone County. Little survives about their life together. Rebecca is remembered as dying in 1847; the available material does not establish the circumstances of her death or whether they had children. Thomas married Eliza Edwards on 2 December 1847. Their marriage return says that both were of lawful age and that W. W. Tucker, a justice, performed the ceremony. Tucker signed the return on 18 January 1848, and it was recorded that day in the county marriage book.\n\nEliza Louise Edwards also appears under the names Louiza and Louisa Dunbar. These changing forms accompany a household that can be followed through several decades. In 1850, Thomas, aged twenty-eight, and Louiza, aged twenty, were living in Boone Township with infant James Dunbar. David J. Winscutt, twenty-three, was also in their household. His relationship to the family is unknown; his presence cannot by itself establish whether he was a relative, boarder or worker. Thomas and Eliza were then near the beginning of their long recorded life together.\n\nBy 1860, their home was in Rocky Fork Township. The household included James W., Samuel, a child entered as David A., and Harvey. The David A. entry has been associated with Davia Ann, their daughter, but its male designation leaves an unresolved question. Davia’s later identity should not be settled from that entry alone. The children named in the family’s wider history are James W., Samuel Victor, Davia Ann, Harvey W., Andrew J. and Robert Lee. Their births, spanning approximately 1849 to 1867, carried Thomas and Eliza from a household with one infant into a larger family.\n\nThose years coincided with profound conflict in Missouri. The state remained in the Union, but communities divided over slavery, secession and wartime allegiance. Central Missouri experienced armed movements and local fighting, including a skirmish in Boone County in September 1862. Thomas was around forty when the Civil War began, and Eliza was raising children. No military service or political allegiance has been established for him. The regional setting helps explain the conditions around the family without assigning them a wartime experience that is not known.\n\nEmancipation and the years of Reconstruction changed the legal and social world in which Missouri farms operated. The Dunbars’ surviving household history does not describe how they responded or how their finances changed. It does preserve continuity in place and family. Rocky Fork remained part of their story as children grew into adulthood. Farming, county markets and the relationships between neighboring households provide the practical setting for these years, even where the details of Thomas’s own land and daily work remain unknown.\n\nIn 1880, Thomas was listed as a farmer and head of household in Rocky Fork Township. He was sixty; Louisa was fifty; their son Robert was thirteen. On the same census page were Samuel Dunbar’s household and the nearby Hill household of C. R. Hill and Davia Ann, with their young children Charles H. and Mary E. The grouping places more than one generation of the family in the same community. It does not prove ownership of adjoining farms, but it provides a concrete glimpse of Thomas’s later years among adult children and grandchildren.\n\nBoone County agriculture increasingly connected rural households to railways and wider commercial markets during the later nineteenth century. Columbia’s institutions and the county’s agricultural organizations formed part of that regional world. Davia’s later life reached Richmond in Ray County and the Kansas City area; Thomas’s own final location was farther northeast, in Audrain County. These places belong to the family’s expanding Missouri geography, although the dates and reasons for every movement are not known.\n\nThomas died on 16 July 1897 in Vandalia, Audrain County, aged about seventy-six. Founded in 1871, Vandalia belonged to the generation of towns whose growth accompanied railway development. His burial place and cause of death remain unknown. His life had stretched from Kentucky in the early republic to Missouri at the end of the nineteenth century. Two marriages, a large family, a long connection with Boone County and a documented farming occupation give substance to that span. Through Davia, the Dunbar family continued into the Hill line and the generations of Isaiah “Zay” Hill, Grace Mildred Hill and Inez Karen Prather.";
thomas.biography=biography;
thomas.note='Kentucky-born farmer who raised the Dunbar family with Eliza Louise Edwards in Boone County, Missouri; father of Davia Ann Dunbar.';
if(typeof GUIDE_PROFILES!=='undefined'){GUIDE_PROFILES.thomas_d=Object.assign({},GUIDE_PROFILES.thomas_d||{},{life:biography,birthPlace:'Clark County, Kentucky (reported)'});}
  thomas.researchEvidence = [
    {
      "type": "person-record",
      "detail": "Thomas D. Dunbar (K6SJ-13R) is recorded as born in 1821 in Clark County, Kentucky, and dying 16 July 1897 in Vandalia, Audrain County, Missouri. The page links William Weeden Dunbar and Frances Fanny Weldon as parents, but that parentage remains a working lineage link rather than a direct birth-record proof."
    },
    {
      "type": "person-record",
      "detail": "The 19 January 1843 Boone County marriage record identifies Thomas Dunbar and Rebecca Williams. The 2 December 1847 Boone County marriage record identifies Thomas Dunbar and Eliza Edwards; the original viewer was visibly readable at image 220 of 553 and a 4,021 by 2,713 JPG was captured."
    },
    {
      "type": "person-record",
      "detail": "The 1850 census names Thomas Dunbar, Louiza Dunbar, infant James Dunbar, and David J. Winscutt in Boone Township, Boone County. The 1860 census names Thos Dunbar, Louisa Dunbar, James, Samuel, David A., and Harvey in Rocky Fork Township. The 1880 census names Thos. Dunbar, Louisa Dunbar, and Robert in Rocky Fork Township and identifies Thomas as a farmer."
    },
    {
      "type": "person-record",
      "detail": "A separate attachment uses the 1860 Dunbar household for a three-year-old male ‘David A. Dunbar,’ conflicting with Davia Ann Dunbar’s female profile. It is retained as a possible misattachment, transcription problem, or collateral-child lead, not as direct proof of Davia’s identity."
    },
    {
      "type": "person-record",
      "detail": "The page displays six children with Eliza Louise Edwards, including Davia Ann Dunbar. The Thomas-to-Davia relationship is a reasonable working lineage conclusion supported by the household cluster and downstream records, but no direct birth record naming both parents was located in this pass."
    },
    {
      "type": "person-record",
      "detail": "The page has 5 attached sources, 0 memories, and 1 collaboration note. The note contains no usable biographical detail. The About panel is computer-generated; its embedded timeline supplies family and place events, while the standalone timeline route required a reload and was not treated as an independent source."
    },
    {
      "type": "context-source",
      "url": "https://collections.shsmo.org/manuscripts/columbia/C2366/boone-county",
      "detail": "State Historical Society of Missouri Boone County material describes the Boonslick setting, early settlement, and Rocky Fork Creek geography in Boone County."
    },
    {
      "type": "context-source",
      "url": "https://shsmo.org/research/guides/civil-war/central",
      "detail": "State Historical Society of Missouri describes central Missouri’s Civil War entanglement and records a September 1862 Boone County skirmish; used only as regional context."
    },
    {
      "type": "context-source",
      "url": "https://collections.shsmo.org/manuscripts/columbia/c3041",
      "detail": "Boone County records held by the State Historical Society include agricultural and mechanical society material from 1852–1874, supporting context about organized agriculture without proving Thomas’s individual activity."
    },
    {
      "type": "context-source",
      "url": "https://raycountymuseum.org/home/history/",
      "detail": "Ray County Museum history describes Richmond as a trade and legal center for a livestock, grain, and coal-mining county and records postwar railroad growth."
    },
    {
      "type": "context-source",
      "url": "https://www.audraincounty.org/history",
      "detail": "Audrain County history notes early rail development through the county beginning in 1856 and the growth of Vandalia and neighboring towns after their founding in the 1870s."
    },
    {
      "type": "context-source",
      "url": "https://guides.loc.gov/reconstruction",
      "detail": "Library of Congress Reconstruction guide supplies the national 1865–1877 setting surrounding Thomas’s middle years without assigning a personal political position or wartime action."
    }
  ];
thomas.evidence=[{"kind": "document", "title": "Thomas Dunbar and Eliza Edwards — marriage", "date": "2 December 1847", "place": "Boone County, Missouri", "thumb": "assets/thomas-dunbar/thomas-dunbar-1847-marriage.jpg", "full": "assets/thomas-dunbar/thomas-dunbar-1847-marriage.jpg", "sourcePage": "https://www.familysearch.org/ark:/61903/1:1:QKZ7-8CT7", "summary": "The second entry on the left page records the marriage of Thomas Dunbar and Eliza Edwards. The entire original spread is preserved; the transcription covers their entry.", "transcription": "FULLTEXT_ORIGINAL: Thomas Dunbar and Eliza Edwards entry only; unrelated marriages are not transcribed.\n\nI joined in Marriage on the 2nd day of Decr\n1847 Mr. Thomas Dunbar to Miss Eliza Edwards\nboth of lawful age. Given under my hand this\n18th day of Jan 1848. W. W. Tucker Justice\nRecorded Jany 18th 1848. Robert L. Todd\nclerk & recorder\n\nFULLTEXT_TRANSLATION\nNot applicable — the original is in English.", "provenance": "Boone County marriage register, page350, film7424335, image220/553. Original4021×2713 JPG recovered unchanged from3October capture.", "previewStatus": "readable"}];
})();
