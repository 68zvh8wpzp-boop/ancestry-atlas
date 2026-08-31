/* Distinctness revision: Charles Godfrey owns German migration, names and
   naturalization; Ida owns the Gooley inheritance and family borderland. */
(()=>{
  'use strict';
  if(typeof TOUR_MEDIA==='undefined')return;

  const godfrey=TOUR_MEDIA.charles_godfrey;
  if(godfrey){
    godfrey.moduleVersion='1.1.0';
    godfrey.status='approved-audio-archived-runtime-ready';
    godfrey.storyReady=true;
    godfrey.audio='approved-audio/fable/Charles_godfrey_brenay.mp3';
    godfrey.narrator='Fable';
    godfrey.unavailableLabel='Approved Fable narration is temporarily unavailable';
    godfrey.narrationContract='approved v3.8.19 text; matching checksummed Fable recording is timing authority';
    godfrey.transcript="Charles Godfrey Brenay was born in Germany around 1873. Records also identify him as Gottfried and use the surname Brunne. His exact birthplace and parents remain unresolved, so his German beginning can presently be placed only at the scale of the country.\n\nHe belonged to a generation in which millions of Europeans crossed the Atlantic. Steamships shortened the ocean passage and railways carried newcomers inland, but Charles’s departure port, ship and route have not yet been identified. An 1874 photograph of German emigrants preserves the human scale of that migration without depicting Charles himself.\n\nBy the 1890s, Charles was living in Ontario and had formed a family with Ida Mae Gooley. Their son Charles Albert was born at Arnstein in 1897. The household later settled in Alpena, Michigan.\n\nAcross German and English-speaking records, Gottfried became Godfrey and Brunne became Brenay. Those variations are not separate people but documentary traces of one immigrant life. They matter because a search under only one spelling can miss the records needed to follow him.\n\nIn Alpena, Charles entered the United States naturalization process. An Alpena County naturalization index has been identified, while the underlying declaration and petition remain priority evidence. Those papers may supply the arrival date, port, birthplace or allegiance details still missing from his early life.\n\nCharles lived until 1942. His legacy is the documented passage of one German-born man through Ontario into Michigan—and a name reshaped across languages and borders. Further evidence depends on the naturalization file and a record identifying his German birthplace or parents.";
    const original=godfrey.scenes||[];
    godfrey.scenes=[original[0],original[1],original[4],original[5]].filter(Boolean);
    const triggers=[0,1,4,5];
    godfrey.scenes=godfrey.scenes.map((scene,index)=>({...scene,triggerParagraph:triggers[index]}));
    if(godfrey.scenes[2])godfrey.scenes[2]={...godfrey.scenes[2],src:null,title:'The naturalization trail',caption:'Alpena County records preserve the next evidence target: Charles Godfrey’s underlying naturalization papers.',source:'Documentary research target',mapKey:'alpena-local',visualType:'map-only'};
    if(godfrey.scenes[3])godfrey.scenes[3]={...godfrey.scenes[3],caption:'Documented endpoints connect Germany, Ontario and Michigan; the exact Atlantic route remains unresolved.'};
  }

  const ida=TOUR_MEDIA.ida_mae;
  if(ida){
    ida.moduleVersion='1.1.0';
    ida.status='approved-audio-archived-runtime-ready';
    ida.storyReady=true;
    ida.audio='approved-audio/fable/Ida_mae_gooley.mp3';
    ida.narrator='Fable';
    ida.unavailableLabel='Approved Fable narration is temporarily unavailable';
    ida.narrationContract='approved v3.8.19 text; matching checksummed Fable recording is timing authority';
    ida.transcript="Ida Mae Gooley was born on July 11, 1872, in Alpena, Michigan, the daughter of John Peter Gooley and Mary Ann Dennis. Her father had been born in Quebec and her mother in Ontario, placing Ida within a Canadian-American family network around Lake Huron from birth.\n\nOne day later, fire swept through Alpena. Flames destroyed homes, businesses and mills across much of the young lumber town. Ida could not remember the disaster, but she entered life in a community forced almost immediately to rebuild. A surviving photograph records the shattered city, although no Gooley property or family member is identified.\n\nAlpena’s recovery followed the rhythms of the Great Lakes. Timber, lake shipping, railways and workshops shaped the town that rose around Ida’s generation. Michigan, Ontario and Quebec were linked by work and kinship as well as separated by an international border.\n\nIda married Charles Godfrey Brenay, a German-born immigrant. Their household joined her Quebec and Ontario inheritance to his German beginning, creating a family whose records crossed countries, languages and changing forms of the Brenay name.\n\nBy the 1890s, Ida and Charles were living at Arnstein in northern Ontario, where their son Charles Albert was born in 1897. Forest settlements, small farms and transportation links toward Georgian Bay formed the setting of Ida’s Canadian years.\n\nAround 1903, the household returned to Alpena. The exact route is unresolved, but the move brought Ida back to the city of her birth and placed her Canadian-born children within an American Great Lakes community.\n\nIda lived until 1932. She saw Charles Albert establish a family of his own and begin a western life. Her distinct legacy was the joining of the Gooley and Brenay lines across Michigan and Ontario.\n\nHer life forms a borderland arc: born in Alpena, raising a family in Ontario, and returning to Michigan. Through Ida, Quebec and Ontario ancestry became part of a German-Canadian-American household whose descendants carried that history west.";
    const original=ida.scenes||[];
    ida.scenes=[original[0],original[1],original[2],original[3],original[4],original[6]].filter(Boolean);
    const triggers=[0,2,3,4,5,7];
    ida.scenes=ida.scenes.map((scene,index)=>({...scene,triggerParagraph:triggers[index]}));
  }
})();
