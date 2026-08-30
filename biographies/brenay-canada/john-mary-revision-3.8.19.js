/* Distinctness revision: John Peter owns the Quebec-to-Michigan migration;
   Mary Ann owns the unresolved Dennis evidence and documented household. */
(()=>{
  'use strict';
  if(typeof TOUR_MEDIA==='undefined')return;

  const john=TOUR_MEDIA.john_peter;
  if(john){
    john.moduleVersion='1.1.0';
    john.status='revised-text-awaiting-audio-approval';
    john.storyReady=true;
    john.audio=null;
    john.narrator=null;
    john.unavailableLabel='Revised narration awaiting Fable recording';
    john.transcript="John Peter Gooley was born on May 2, 1842, in Quebec. His father was remembered as Peter or Pierre Gooley and his mother as Louise, but the family’s exact parish has not yet been identified. His story therefore begins within the wider St. Lawrence world rather than at a particular town.\n\nQuebec was then part of the Province of Canada. Farms, parish communities and market towns were tied together by rivers and canals, while early railways were beginning to change travel across British North America. A surviving 1856 photograph of a Quebec farm preserves part of that material world without identifying John Peter’s home or family.\n\nAs John Peter grew up, steamships, canals and rail lines connected Quebec more closely with Ontario and the American Great Lakes. Those expanding networks made westward movement easier than it had been in his parents’ generation. A period Ontario railway-station photograph records that changing transportation world without establishing his particular route.\n\nJohn Peter eventually lived in Ontario, where his life joined that of Mary Ann Dennis, born there in 1844. Their marriage place has not been established. Together they formed a household whose beginnings reached into both Quebec and Ontario.\n\nThe couple later moved into Michigan. By 1872 they were living in Alpena, where their daughter Ida Mae was born. The young Lake Huron lumber and shipping town linked Michigan to Ontario through water, commerce and family movement. Ida’s own biography carries the story of the fire that struck Alpena immediately after her birth.\n\nDuring John Peter’s lifetime, the Province of Canada became the Dominion of Canada and the Great Lakes borderland became increasingly industrial. His documented path—from Quebec through Ontario to Michigan—followed that larger pattern of movement while remaining a particular family migration.\n\nJohn Peter lived until 1910. Through Ida, his Canadian beginning entered the Brenay family and continued into later generations in the American Southwest.\n\nBefore John Peter, the trail remains unfinished. Peter or Pierre and Louise are the strongest names carried forward, but their identities and John Peter’s Quebec baptism remain unproved. His life marks both a Canadian foundation and the present edge of the documented Gooley story.";
    const original=john.scenes||[];
    john.scenes=[original[0],original[1],original[2],original[4],original[5],original[6]].filter(Boolean);
    const triggers=[0,2,3,5,6,7];
    john.scenes=john.scenes.map((scene,index)=>({...scene,triggerParagraph:triggers[index]}));
  }

  const mary=TOUR_MEDIA.mary_ann;
  if(mary){
    mary.moduleVersion='1.1.0';
    mary.status='revised-text-awaiting-audio-approval';
    mary.storyReady=true;
    mary.audio=null;
    mary.narrator=null;
    mary.unavailableLabel='Revised narration awaiting Fable recording';
    mary.transcript="Mary Ann Dennis was born on August 15, 1844, in Canada West, now Ontario. Her exact birthplace and the names of her parents remain unresolved. Unlike many family stories that begin in a known town or parish, hers begins with a province-wide record question.\n\nCanada West in Mary Ann’s childhood included growing farm settlements, established towns and communities linked by waterways and early roads. Yet the broad birthplace “Ontario” is not enough to identify her Dennis family. A town, church, marriage entry or household record is still needed to carry her line safely into an earlier generation.\n\nMary Ann married John Peter Gooley, who had been born in Quebec. Their marriage place has not been established. They later lived in Michigan, where surviving records most clearly identify Mary Ann through the family they formed together.\n\nBy 1872, Mary Ann was the mother of Ida Mae Gooley in Alpena. This documented relationship anchors Mary Ann firmly in the family even though her own parents remain unknown. Through Ida, the Dennis line continued into the Brenay family.\n\nMary Ann lived until 1919. Her biography ends not with a guessed ancestry, but with a research frontier: records naming her parents or narrowing her Ontario birthplace. Until such evidence is found, her story preserves both what is known about her household and what remains unproved.";
    const original=mary.scenes||[];
    mary.scenes=[original[0],original[2],original[6]].filter(Boolean).map((scene,index)=>({
      ...scene,
      triggerParagraph:[0,2,4][index]
    }));
    if(mary.scenes[1])mary.scenes[1]={...mary.scenes[1],title:'A documented household',caption:'Mary Ann’s Ontario beginning joined John Peter’s Quebec origin; their marriage place remains unresolved.'};
  }
})();
