/* Ancestry Atlas presentation corrective — James Sheldon Webb, 2026-09-30.
   The research layer remains source-rich; this layer keeps the person page
   readable and museum-facing while retaining source links in the evidence modal.
*/
(() => {
  'use strict';
  if (typeof DATA === 'undefined') return;
  const sheldon = DATA.nodes.find(node => node.id === 'james_sheldon');
  const profile = typeof GUIDE_PROFILES !== 'undefined' && GUIDE_PROFILES.james_sheldon;
  if (!sheldon || !profile) return;

  const cleanBiography = `James Sheldon Webb was born on 11 April 1943 in Snowflake, Navajo County, Arizona, the first child of James Wilford “Jay” Webb and Marion Beulah Brenay. He entered a family whose life was tied to the timber country of the White Mountains: small mill communities, long winter roads, handmade homes, and relatives who relied on one another when work, money, or health failed. His childhood unfolded during the Second World War and the difficult years immediately afterward, when even ordinary necessities could require ingenuity.

Jay’s military service brought a long separation during Sheldon’s earliest years. Marion cared for her young son with little money and no dependable car, moving among relatives when necessary and managing the household through rationing, illness, and hard travel. Family recollections describe a serious bout of measles that frightened the household and brought Jay home briefly. When Jay finally returned from the war, Sheldon ran down the road to meet him. That image became part of the family’s memory of reunion after a period when absence had been the central fact of daily life.

Sheldon grew up in the eastern Arizona timber country with his sisters Diane, Drinette, Daphne, and DeEdra, and with the memory of his infant brother Jamar, who died in 1946. The Webb household was modest and mobile. The family lived in mill towns, camps, repaired houses, and homes enlarged through years of work. Sheldon’s early world included heavy snow, sawdust, long walks, family gardens, school photographs, cousins, and the constant movement of adults looking for the next workable job. His mother’s life story remembers a boy surrounded by family, expected to help, and shaped by both hardship and affection.

The postwar Southwest was changing rapidly around him. Highways and automobiles shortened distances, television entered homes, military installations expanded, and the Cold War brought new technology and new anxieties. Sheldon belonged to the generation that crossed from the small-town, timber-centered world of his childhood into a more mobile and modern America. He graduated from high school in 1960 and soon traveled to California with his friend Kenny MacClaron in search of work. That journey marked the beginning of a wider adult life beyond the White Mountains.

Sheldon served approximately two and a half years in the United States Air Force during the early 1960s. The military period appears in family photographs from training and service, including portraits in uniform and images associated with Merced, California. Family recollections describe a hardship discharge that enabled him to return home and help his father. The exact unit and discharge circumstances are not part of the surviving family narrative, but the service years clearly shaped his sense of responsibility and redirected the next stage of his life.

After returning to Arizona, Sheldon continued his education and attended Northern Arizona University. There he built the partnership that would define his adult life with Inez Karen Prather. They married in the mid-1960s and raised three sons, Shared, Jeremy, and Sterling. Their family life was marked by education, travel, work, faith, and a strong habit of gathering people together. Photographs from their wedding, early years in Flagstaff and Mesa, family visits, reunions, and later journeys preserve a household that remained closely connected across distance and generations.

Education became Sheldon’s profession and one of his enduring contributions. He taught mathematics and later served as assistant principal at Show Low High School from 1984 through 1990. His work also carried the family beyond Arizona. He taught at American International Schools in Kuwait, Panama, and São Paulo, Brazil, giving his children an international childhood and exposing students in several countries to his patient, practical approach to mathematics. Sheldon and Inez later served an eighteen-month mission in Lima, Peru. Travel was not merely a series of destinations for him; it became part of how he taught, formed friendships, and understood the lives of people beyond his own region.

Those who knew Sheldon remembered a man with many interests. He was an artist, linguist, traveler, and gifted athlete who excelled in football, basketball, and tennis. He enjoyed making things, learning how systems worked, and using his abilities for other people. His family remembered generosity more readily than self-promotion: he helped with weddings and reunions, welcomed relatives home, and gave time to projects that strengthened the family’s sense of itself. A life sketch he prepared for his uncle Joseph Heber Brenay shows another side of his character. Sheldon was not only a participant in family history; he was also someone willing to gather memories, shape them into a story, and share them with others.

Later life brought the ordinary richness of a large family: sons, grandchildren, great-grandchildren, reunions, travel, and repeated returns to Arizona. Family photographs place Sheldon with Inez, his parents, siblings, children, cousins, and friends across many decades. They show the continuity between the boy in the White Mountains, the young airman, the teacher, the international school administrator, and the grandfather surrounded by an expanding family. The visual record is especially valuable because it preserves not only formal milestones but also the unguarded moments in which affection, humor, work, and belonging are easiest to see.

Sheldon died in Gilbert, Maricopa County, Arizona, on 9 April 2016 and was laid to rest at Lakeside Cemetery in Lakeside, Navajo County. He was preceded in death by his parents and by his brother Jamar. He is remembered by Inez, their sons Shared, Jeremy, and Sterling, their descendants, and the wider Webb, Brenay, Prather, and related families. His life joined wartime Arizona to an international teaching career, a long marriage, athletic and artistic pursuits, and a sustained devotion to family. The legacy he left is both personal and communal: students who learned from him, relatives who benefited from his generosity, and generations who continue to know their family through the stories and images he helped preserve.`;

  sheldon.note = 'James Sheldon Webb’s life is preserved through a birth record naming his parents and certificate 793, a 1950 Apache County census image, a marriage record, military-service evidence, and family photographs and documents. Together these records trace his childhood, Air Force service, education, marriage, teaching career, and family life. Family memories are presented as testimony, distinct from civil records.';
  profile.birthPlace = 'Snowflake, Navajo County, Arizona';
  profile.life = cleanBiography;

  // These records have trustworthy source links but no captured original scan.
  // Give them a legible, explicitly labeled display card instead of a black void.
  const displayCards = {
    'Arizona birth record — certificate no. 793': 'assets/sheldon/source-record-civil-birth.svg',
    'Arizona county marriage record — Sheldon Webb and Inez Karen Prather': 'assets/sheldon/source-record-civil-marriage.svg',
    'U.S. Department of Veterans Affairs BIRLS Death File — military-service lead': 'assets/sheldon/source-record-military.svg'
  };
  if (sheldon.portrait && sheldon.portrait.title) {
    sheldon.portrait.title = sheldon.portrait.title.replace(/FamilySearch/gi, '').trim();
  }
  (sheldon.evidence || []).forEach(item => {
    const preview = displayCards[item.title];
    if (preview) {
      item.kind = 'document';
      item.visualKind = 'document';
      if (!item.thumb && !item.full) item.thumb = preview;
    }
  });
})();
