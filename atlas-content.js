/* Ancestry Atlas v3.4.0 — content contract.
   Text associated with a recorded narration must be byte-for-byte maintained here alongside that audio mapping. */

const BRANCH_TOURS = {
  canada: {
    title:'Canada — Brenay & Gooley',
    narrator:{id:'charles_godfrey', origin:'Germany → Ontario / Michigan', intro:'From Arizona, this branch reaches north through Michigan and Ontario, then farther back toward its European roots.'},
    languagePrefs:['en-CA','de-DE','en-US','en-GB'],
    steps:[
      {id:'james_sheldon', copy:'James Sheldon Webb is the modern starting point for this branch, linking the present family to the Brenay and Gooley generations that came before him.', event:'Born during the Second World War era, he entered a world being reshaped by global conflict, mass aviation, antibiotics, and the postwar transformation of the American West.'},
      {id:'marion_brenay', copy:'Marion Beulah Brenay carries the Canadian ancestry into the modern Webb family. Her obituary provides an important bridge by naming Charles Albert Brenay and Marian Beulah Skinner as her parents.', event:'Marion was born in 1923. Her childhood overlapped the Great Depression, and she reached adulthood as the Second World War transformed daily life across North America.'},
      {id:'charles_albert', copy:'Charles Albert Brenay was born in Arnstein, Ontario, in 1897. His life connects this family directly to a small northern Ontario community at the end of the nineteenth century.', event:'His lifetime crossed the First World War, the 1918 influenza pandemic, the Great Depression, and the Second World War—events that transformed borders, migration, work, and family life across Canada and the United States.'},
      {id:'charles_godfrey', copy:'Charles Godfrey, also recorded as Gottfried Brenay or Brunne, moved from Germany into the Canadian and Michigan world of this family during the era of mass transatlantic migration.', event:'European mass migration to North America defined this era. Industrialization, steamship travel, and expanding rail networks made transatlantic and cross-border family movement possible on a scale earlier generations could scarcely imagine.'},
      {id:'ida_mae', copy:'Ida Mae Gooley links the Brenay household to a family with roots in Quebec and Ontario. Multiple records make John Peter Gooley and Mary Ann Dennis the strongest parent identification.', event:'Her generation lived through the rapid industrial growth of the Great Lakes region, when Michigan and Ontario were increasingly tied together by lumber, shipping, railways, and migration.'},
      {id:'john_peter', copy:'John Peter Gooley was born in Quebec in 1842 and later lived in Ontario and Michigan. His exact baptism is still missing, placing an important research frontier immediately before him.', event:'He was born before Canadian Confederation in 1867. During his lifetime, the Province of Canada became part of the new Dominion of Canada, while the neighboring United States passed through the Civil War and Reconstruction.'},
      {id:'mary_ann', copy:'Mary Ann Dennis was born in Ontario in 1844. Her documented place in the family is strong, while her exact birthplace and parents remain unresolved.', event:'She grew up as Canada West was transformed by canals, steamships and railways, and lived to see the Dominion of Canada and the increasingly industrial Great Lakes borderland.'}
    ]
  },
  webb: {
    title:'Webb — Arizona to Connecticut',
    narrator:{id:'james_webb_jr', origin:'Connecticut, 1777', intro:'I am James Webb Jr., born in Connecticut in 1777—the earliest Webb ancestor on this branch whose place in the line is strongly supported before the evidence begins to darken. I will tell the story from the present day backward, until we reach the question that still waits for proof.'},
    languagePrefs:['en-GB','en-US'],
    steps:[
      {id:'james_sheldon', copy:'James Sheldon Webb is the modern anchor of the Webb line, connecting the present family to generations that moved through Arizona and the American West.'},
      {id:'james_wilford', copy:'James Wilford “Jay” Webb connects the present family to Jonathan Henry Webb and Della Ray in Arizona.'},
      {id:'jonathan_henry', copy:'Jonathan Henry Webb was born in Woodruff, Arizona, in 1886. His generation belonged to the transition from territorial communities to a rapidly modernizing American Southwest.', event:'Arizona did not become a state until 1912. Jonathan lived through that transition, the First World War, the Great Depression, and the Second World War.'},
      {id:'edward_milo_jr', copy:'Edward Milo Webb Jr. was born in Missouri in 1847. His historical profile securely identifies Edward Milo Webb Sr. and Caroline Amelia Owens as his parents. His death date remains conflicting across otherwise valuable sources.', event:'He was a teenager when the American Civil War began in 1861. His generation then lived through Reconstruction, continental railroad expansion, and the settlement of the western territories.'},
      {id:'edward_milo_sr', copy:'Edward Milo Webb Sr. was born in New York in 1815. Historical sources identify James Webb Jr. and Hannah Griswold as his parents, giving us a strong bridge into the early nineteenth century.', event:'His lifetime overlapped the Erie Canal era, rapid westward migration, the early Latter-day Saint movement, and the upheavals that eventually led to the Civil War.'},
      {id:'james_webb_jr', copy:'James Webb Jr. was born in Connecticut in 1777. Later family histories identify his parents as James Webb and Elizabeth Douglas, but the original town, land, or probate record that would settle the relationship has not yet been secured.', event:'He was born while the American Revolution was still underway. His childhood unfolded during the creation of the United States, the adoption of the Constitution, and the unstable first decades of the new republic.'},
      {id:'james_webb_sr', copy:'Here the light falls noticeably. James Webb is the reported father of James Webb Jr., but the relationship still awaits the right original Connecticut record.'},
      {id:'elizabeth_douglas', copy:'Elizabeth Douglas is the unresolved identity problem at this frontier. Compiled genealogies disagree about which woman of that name belongs here, so the atlas deliberately refuses to brighten this generation until the evidence does.'}
    ]
  },
  dunbar: {
    title:'Dunbar — Missouri to the Revolution',
    narrator:{id:'rev_thomas', origin:'Loudoun County, Virginia', intro:'I am Thomas Dunbar, a Revolutionary War veteran and the earliest securely documented voice on this Dunbar branch. I will tell the family story from the present day backward, through Missouri and into the revolutionary generation I knew.'},
    languagePrefs:['en-US','en-GB'],
    steps:[
      {id:'inez_karen', copy:'Inez Karen Prather anchors the maternal side of the atlas. Her Prather ancestry is still less developed, while the Hill and Dunbar branch gives us a clearer path backward.'},
      {id:'grace_hill', copy:'Grace Mildred Hill was born in Richmond, Ray County, Missouri, in 1908. She anchors the documented maternal Hill branch.', event:'Her lifetime began just before the First World War and spanned the 1918 influenza pandemic, the Great Depression, and the enormous social changes of the twentieth century.'},
      {id:'isaiah_hill', copy:'Isaiah “Zay” Hill Sr. connects Grace to Colonel Russell Hill and David Ann Dunbar. Collateral relatives are being used carefully to strengthen this family cluster.'},
      {id:'russell_hill', copy:'Colonel Russell Hill is strongly placed in this family, but his own parents are unresolved. A Boone County marriage record and earlier census evidence remain high-value targets.', event:'Born around the middle of the nineteenth century, he lived through the American Civil War and Reconstruction—events that profoundly affected families in both Missouri and Kentucky.'},
      {id:'davia_dunbar', copy:'David Ann Dunbar provides the bridge into the older Dunbar family. Her relationship to Thomas D. Dunbar and Elizabeth A. Edwards is strongly supported, while the marriage documentation remains an important proof target.'},
      {id:'thomas_d', copy:'Thomas D. Dunbar belongs to the generation that carried the family through the antebellum period and the Civil War era. His ancestry leads toward William Weedon Dunbar.'},
      {id:'william_weedon', copy:'William Weedon Dunbar lived from the early republic through most of the nineteenth century, bridging the Revolutionary generation and the Civil War generation.', event:'His lifetime covered the War of 1812, westward expansion, the Mexican-American War, the Civil War, emancipation, and Reconstruction.'},
      {id:'rev_thomas', copy:'Thomas Dunbar is one of the strongest historical anchors in the branch. His pension testimony records militia service and Yorktown-era service and identifies his sister Elizabeth Webb.', event:'The American Revolution was not background for Thomas—it was part of his own life. The Yorktown campaign of 1781 helped bring the war toward its decisive conclusion and reshaped the political world his descendants inherited.'},
      {id:'dunbar_frontier', copy:'Beyond Thomas the line grows darker. Candidate parents exist in compiled genealogies, but they remain unproved, so the tour stops rather than turning family tradition into fact.'}
    ]
  },
  denmark: {
    title:'Denmark — Mortensen, Jensen & Møn',
    narrator:{id:'levin_zander', origin:'German-born, settled on Møn, Denmark', intro:'I am Levin Zander, a German-born soldier who settled on the Danish island of Møn and the earliest confirmed person currently anchoring this branch. I will tell our story from the present day backward, through the Mortensen and Jensen families to the seventeenth century.'},
    languagePrefs:['da-DK','en-GB','en-US'],
    steps:[
      {id:'della_ray', copy:'Della Ray connects the modern Arizona family to James Wilford Ray and Elsie Margaret Mortensen, opening the Danish branch.'},
      {id:'elsie_mortensen', copy:'Elsie Margaret Mortensen was a daughter of Morten Peder Mortensen and Dorthea Knudsen Jensen. Family and church sources make this nineteenth-century Danish connection unusually rich.'},
      {id:'morten_peder', copy:'Morten Peder Mortensen was born in Hårbølle, Fanefjord, in 1828. His historical Church profile names his parents and preserves an official portrait.', event:'His lifetime overlapped the Danish constitutional transformation of 1849, the First and Second Schleswig Wars, mass emigration, and major religious change.'},
      {id:'dorthea_jensen', copy:'Dorthea Knudsen Jensen was born in 1840. Her family gives us the Jensen and Olsen lines in Toreby and surrounding Danish parishes.', event:'She was born in a Denmark still ruled by an absolute monarchy. Nine years later, the Constitution of 1849 established a constitutional monarchy and changed the country’s political order.'},
      {id:'knud_jensen_brygger', copy:'Knud Jensen Brygger belongs to the earlier nineteenth-century Toreby generation. Some of the parentage above him remains provisional and awaits original parish images.'},
      {id:'levin_madsen', copy:'Levin Sander Madsen carries the line into the eighteenth century on Møn, where parish and local records begin to reveal a much older rural community.'},
      {id:'morten_nielsen', copy:'Morten Nielsen belongs to the early eighteenth-century generation, with Niels Pedersen and Avens Mortensdatter strongly supported as his parents.', event:'This was the age of the Great Northern War, when Denmark-Norway and its neighbors fought for power around the Baltic from 1700 to 1721. Rural families on the Danish islands lived under the economic and military pressures of that wider conflict.'},
      {id:'levin_zander', copy:'Levin Zander, a German-born soldier or retired guardsman, took a farm at Dame on Møn in 1697. He is the furthest-back confirmed narrator for this branch; his precise German origin is still unknown.', event:'His life fell in the era of absolute monarchy in Denmark-Norway, established in 1660, and the intense Baltic rivalries that would erupt into the Great Northern War shortly after the turn of the century.'}
    ]
  }
};

const TOUR_MEDIA = {
  james_sheldon: {
    audio: 'approved-audio/fable/James_sheldon_webb.mp3',
    narrator: 'Fable',
    storyReady: true,
    unavailableLabel: 'Fable narration pending — approved visual preview available',
    transcript: "James Sheldon Webb was born on April 11, 1943, in Arizona, while the United States was deep in the Second World War. A family photograph from 1941 preserves Jay and Marion together in Mesa, shortly before Sheldon’s birth.\n\nHis parents were James Wilford “Jay” Webb and Marion Beulah Brenay Webb. When Sheldon was born, they were living near the mill in a small one-room shack with a lean-to kitchen. Marion remembered bitter cold, heavy snowstorms, and having to walk about a quarter mile just to reach their car. Another surviving family photograph shows their first car beside the modest home they occupied as their young family began.\n\nBeyond their small community, wartime America was transforming the Southwest. Troops and military equipment moved across Arizona, while scientists at Los Alamos, just across the state line in New Mexico, secretly developed the first atomic weapons. In July 1945, when Sheldon was two, the Trinity test ushered in the atomic age. A United States government photograph of Trinity’s fireball preserves the event itself, while the family remained across the state line in Arizona.\n\nThe war touched Sheldon much more personally when Jay entered the Army. Marion was left with young Sheldon, little money, and no car, and temporarily moved to stay with Jay’s parents. Marion’s 1945 portrait preserves the young mother who held the household together through that separation.\n\nThen Sheldon became seriously ill with measles. Marion remembered him covered with red spots. His condition caused enough concern that Jay was allowed to come home briefly. Sheldon recovered.\n\nWhen Jay eventually returned from the war, Marion remembered Sheldon running down the road to meet his father.\n\nThe postwar years were not immediately easy. Jay struggled to find steady work, and the family moved into an old house they repaired themselves. As Sheldon’s brothers and sisters arrived, the household grew around him. Family photographs preserve this period, including Sheldon together with his siblings. A photograph of the Vernon house records one of the homes the family repaired, and another surviving picture places Sheldon among the brothers and sisters whose arrivals transformed the household around him.\n\nMeanwhile, Arizona was changing rapidly. Highways, automobiles, television, military installations, and Cold War technology were transforming the Southwest. Sheldon grew up between the older world of small-town Arizona and the increasingly modern America emerging after the war.\n\nHe graduated from high school in 1960. Soon afterward, Sheldon and his friend Kenny MacClaron went to California looking for work. Marion recalled that the two young men began considering the Air Force.\n\nSheldon joined and served for about two years before receiving a hardship discharge that allowed him to return home and help his father. He then continued his education and attended college.\n\nIn 1965, Sheldon married Inez Karen Prather, opening the next chapter of the Webb family story. Their 1965 wedding photograph preserves Sheldon and Inez at the beginning of that new chapter.\n\nSheldon’s early life stretched from wartime Arizona through the beginning of the atomic age and the transformation of the postwar Southwest. Behind those enormous events was a more intimate story: a boy growing up amid separation, illness, hard work, family, and extraordinary change.\n\nThat is where Sheldon’s story begins.",
    contract: 'approved-photo-context-awaiting-fable',
    visualStatus: 'archival-first',
    audioCandidates: [],
    scenes: [
      {
        src:'biographies/marion/assets/jay_marion_mesa_1941_restored.jpg',
        title:'Jay and Marion before Sheldon’s birth',
        caption:'James Wilford “Jay” Webb and Marion Beulah Brenay Webb in Mesa, 1941.',
        source:'Family archive • Marion Beulah Brenay Webb life story, p. 14',
        triggerParagraph:0,
        locator:'Arizona • 1941',flagKey:'arizona-1917',mapKey:'arizona-statewide',
        visualType:'family-photo'
      },
      {
        src:'webb_first_car_second_home_c1942.png',
        title:'The family world just before Sheldon’s birth',
        caption:'Jay and Marion’s first car and second home, immediately before Sheldon’s birth-era story.',
        source:'Family archive • Marion Beulah Brenay Webb life story, p. 15',
        triggerParagraph:1,
        locator:'Arizona • 1942–43',flagKey:'arizona-1917',mapKey:'white-mountains',
        visualType:'family-photo'
      },
      {
        src:'trinity_test_fireball_16ms.jpg',
        title:'The atomic age begins',
        caption:'The Trinity test in New Mexico, 16 July 1945.',
        source:'Berlyn Brixner • U.S. Government • public domain',
        triggerParagraph:2,
        locator:'Arizona / New Mexico • 1943–45',flagKey:'arizona-1917',mapKey:'southwest-trinity',
        visualType:'archival-photo'
      },
      {
        src:'marion_webb_1945.png',
        title:'Marion during the war years',
        caption:'Marion’s 1945 portrait. Her account describes raising young Sheldon during Jay’s wartime absence.',
        source:'Family archive • Marion Beulah Brenay Webb life story, p. 16',
        triggerParagraph:3,
        locator:'Arizona / Utah • wartime years',flagKey:'arizona-1917',mapKey:'four-corners',
        visualType:'family-photo'
      },
      {
        src:'charcoal_childhood_illness_wide.png',
        title:'A child’s wartime illness',
        caption:'Evidence-safe charcoal scene representing illness and uncertainty without inventing Sheldon’s likeness.',
        source:'Approved wide charcoal scene • distant, non-likeness figures',
        triggerParagraph:4,
        locator:'American Southwest • 1940s',flagKey:'arizona-1917',mapKey:'southwest-regional',
        visualType:'charcoal-alternate'
      },
      {
        src:'webb_first_house_vernon_1945.png',
        title:'The Webb family’s first house in Vernon, 1945',
        caption:'A family photograph of the Vernon home during Sheldon’s early childhood.',
        source:'Family archive • Marion Beulah Brenay Webb life story, p. 17',
        triggerParagraph:5,
        locator:'Vernon, Arizona • 1945',flagKey:'arizona-1917',mapKey:'white-mountains',
        visualType:'family-photo'
      },
      {
        src:'james_sheldon_with_siblings_c1951.png',
        title:'Sheldon with his brothers and sisters',
        caption:'The family photograph is captioned “Drinette, Daphne, Darwin, Diane and Sheldon.”',
        source:'Family archive • Marion Beulah Brenay Webb life story, p. 18',
        triggerParagraph:6,
        locator:'Arizona • early 1950s',flagKey:'arizona-1917',mapKey:'white-mountains',
        visualType:'family-photo'
      },
      {
        src:'postwar_arizona_road_1950.jpg',
        title:'Arizona changes after the war',
        caption:'Road and public-works construction in postwar Arizona.',
        source:'U.S. Forest Service archival photograph • public domain',
        triggerParagraph:7,
        locator:'Arizona • 1950s',flagKey:'arizona-1917',mapKey:'arizona-statewide',
        visualType:'archival-photo'
      },
      {
        src:'san_diego_highway_1960_65.jpg',
        title:'High school, then California',
        caption:'Southern California highway traffic in the early 1960s.',
        source:'Library of Congress • Bernard Gotfryd collection • no known restrictions',
        triggerParagraph:8,
        locator:'Arizona → California • 1960',flagKey:'united-states-50-star',mapKey:'arizona-california',
        visualType:'archival-photo'
      },
      {
        src:'usaf_flightline_airmen_1962.jpg',
        title:'United States Air Force',
        caption:'Airmen and vehicles on a United States Air Force flight line in 1962.',
        source:'United States Air Force archival photograph • public domain',
        triggerParagraph:9,
        locator:'United States • early 1960s',flagKey:'united-states-50-star',mapKey:'united-states-context',
        visualType:'archival-photo'
      },
      {
        src:'asc_students_sweethearts_ball_1964.jpg',
        title:'Arizona State College at Flagstaff',
        caption:'Students at Arizona State College at Flagstaff in 1964, showing campus life and contemporary dress.',
        source:'La Cuesta, 1964 • no copyright—United States',
        triggerParagraph:9,
        triggerFraction:.72,
        locator:'Flagstaff, Arizona • 1964',flagKey:'arizona-1917',mapKey:'arizona-flagstaff',
        visualType:'archival-photo'
      },
      {
        src:'sheldon_inez_wedding_1965.jpeg',
        title:'Marriage and the next generation',
        caption:'Sheldon Webb and Inez Karen Prather at their wedding in 1965.',
        source:'Family archive',
        triggerParagraph:10,
        locator:'Arizona • 1965',flagKey:'arizona-1917',mapKey:'arizona-statewide',
        visualType:'family-photo'
      }
    ]
  }
};

const VISUAL_CONTRACT = Object.freeze({
  archivalFirst: true,
  fallbackStyle: 'high-skill human charcoal drawing; clearly hand-rendered; not photorealistic',
  noGlobes: true,
  locator: 'compact period-style map, balanced to the flag',
  imageHoldMs: 2750,
  excludeReligiousMaterialFromMarionStory: true,
  noUnsupportedPersonalMilestones: true,
  audioTextLock: true
});
