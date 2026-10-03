/* Zeffie Lee Hill West bounded family-page correction — 2026-10-03. */
(() => {
  'use strict';
  const byId = window.__ATLAS_NODE_BY_ID;
  const zeffie = byId && byId.get('zeffie_west');
  if (!zeffie) return;

  zeffie.note = "Zeffie Lee Hill West was born in Missouri and made her home in Ray County with Joseph West and their daughters Eva, Hazel, and Annie.";
  zeffie.hold = null;
  zeffie.warning = "";

  if (typeof GUIDE_PROFILES !== 'undefined') {
    GUIDE_PROFILES.zeffie_west = {
      birthPlace: 'Sturgeon, Boone County, Missouri',
      townContext: 'Sturgeon and Ray County belonged to the agricultural and rail-connected landscape of north-central Missouri.',
      macroContext: 'Zeffie’s adult years spanned the turn of the twentieth century, the First World War, the Great Depression, and the Second World War.',
      life: 'Zeffie Lee Hill was born on 2 October 1889 in Sturgeon, Boone County, Missouri. In 1900, at eleven, she was enumerated in Westport Township, Jackson County, in the household of Lawrence and Annie Duffy. The household also included boys bearing the Hill surname. The census described Lawrence and Annie as Zeffie’s stepfather and stepmother, preserving a glimpse of a changed family household without explaining how it came together.\n\nBy 1910 Zeffie was living in Richmond, Ray County, with Joseph West, whom the family record dates their marriage to 24 August 1903. Their household included daughters Eva and Hazel. The 1920 census again places Zeffie and Joseph in Richmond with their daughters, listing Eve, Hazel, and Annie. The slight variation in Eva’s name reflects the forms used in the household entries; the family names their daughters Eva Lillian, Hazel Viola, and Annie West. A 1930 census entry also records Zeffie under the West name. These household records trace her passage from the Hill name in childhood to a West family in the county where she spent much of her adult life.\n\nZeffie’s days are not described in detail by the surviving family account. It preserves instead a steady outline: a Missouri childhood, marriage to Joseph, and a home shared with three daughters in Ray County. Zeffie died in Missouri in 1944. The records that place her in the West household do not settle her birth parentage, so her family connections are presented with care. Her story remains rooted in the people and places recorded around her: the Hill children in the 1900 household, Joseph, and Eva, Hazel, and Annie in the years that followed.',
      events: [
        { title: 'A Missouri childhood', group: 'missouri', summary: 'The 1900 household places Zeffie in Westport Township among children bearing the Hill name.' },
        { title: 'A family in Ray County', group: 'missouri', summary: 'Later household entries place Zeffie with Joseph West and their daughters in Richmond.' }
      ]
    };
  }

  if (typeof window.buildExtraInfo === 'function') {
    const previous = window.buildExtraInfo;
    window.buildExtraInfo = function(id) {
      if (id !== 'zeffie_west') return previous.apply(this, arguments);
      return '<div><strong>Family connections shown here:</strong> Joseph West; daughters Eva Lillian, Hazel Viola, and Annie West.</div>' +
        '<div><strong>Parents:</strong> Colonel Russell Hill and Davia Ann Dunbar are shown in the family tree. The 1900 household lists Lawrence and Annie Duffy as step-parents; the available household entries do not establish Zeffie’s birth parents.</div>';
    };
  }
})();
