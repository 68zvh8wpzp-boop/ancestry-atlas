/* Jay owns work and military service. Marion owns courtship, separation,
   household hardship, loss and preservation of the family account. */
(()=>{
  'use strict';
  if(typeof TOUR_MEDIA==='undefined'||!TOUR_MEDIA.james_wilford)return;
  const jay=TOUR_MEDIA.james_wilford;
  jay.moduleVersion='1.1.0';
  jay.status='approved-audio-archived-runtime-ready';
  jay.storyReady=true;
  jay.audio='approved-audio/fable/James_wilford_webb.mp3';
  jay.narrator='Fable';
  jay.unavailableLabel='Approved Fable narration is temporarily unavailable';
  jay.narrationContract='approved v3.8.19 text; matching checksummed Fable recording is timing authority';
  jay.transcript="James Wilford Webb, known throughout his life as Jay, was born on October 5, 1924, in Pinedale, Arizona. He was the son of Jonathan Henry Webb and Della Ray, whose lives connected Arizona’s Little Colorado settlements with the agricultural colonies of northern Mexico. Jay entered a high-country world of ponderosa pine, livestock, small farms and long distances between towns.\n\nHis childhood unfolded during the Great Depression. Cash was scarce, and practical work sustained families in northeastern Arizona. Timber and sawmills connected isolated communities to a wider economy, while rough roads and winter weather kept daily life intensely local. A family photograph of Clarence and Karl working on mill equipment preserves the working environment that shaped Jay’s early years.\n\nJay married Marion Beulah Brenay in St. Johns on May 5, 1941, and became a father when James Sheldon was born in 1943. Work and housing remained closely tied to the mills. A family photograph shows logs arriving at the Vernon mill, with Jay standing atop the load and Darcine seated on the truck cab.\n\nDuring the Second World War, Jay served in the United States Army. His 1944 portrait records him as a young private. A later photograph identifies Staff Sergeant James W. Webb guarding German prisoners of war at Rognac, France, in 1946. His unit and full service chronology remain unresolved, but the photographs establish his progression from private to staff sergeant and place him in France.\n\nAfter returning to Arizona, Jay resumed timber work. Employment carried him through Vernon, Lakeside, Forestdale and Hilltop as mills opened, shifted and closed. One family photograph records him hooking logs at a portable mill, capturing the physical skill and danger of the work more directly than a general picture of the timber industry could.\n\nA 1953 photograph preserves Jay in the middle years of that working life. He lived until 2014, spanning Arizona’s change from isolated mountain communities and rough roads to a far more connected modern state. His established arc is distinct: a Depression-era childhood, a working life in timber, wartime Army service and decades in Arizona’s high country. His military file and direct vital records remain important documentary goals.";

  const original=jay.scenes||[];
  jay.scenes=[original[0],original[1],original[3],original[4],original[5],original[6],original[7]].filter(Boolean);
  const triggers=[0,1,2,3,3,4,5];
  const captions=[
    'James Wilford Webb as a baby, circa 1924–1925.',
    'Clarence and Karl working on mill equipment in the Webb family’s timber-working world.',
    'Logs arriving at the Vernon mill, with Jay atop the load and Darcine seated on the truck cab.',
    'Private James W. Webb in 1944.',
    'Staff Sergeant James W. Webb guarding German prisoners of war at Rognac, France, in 1946.',
    'Jay hooking logs at a portable mill in Arizona’s White Mountains.',
    'James Wilford Webb in 1953.'
  ];
  jay.scenes=jay.scenes.map((scene,index)=>({...scene,triggerParagraph:triggers[index],caption:captions[index]}));
})();
