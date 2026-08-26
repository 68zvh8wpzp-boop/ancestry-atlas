/* Marion Beulah Brenay Webb guided-biography module.
   Visuals and narration draft are approved. Playback remains unavailable until
   a user-approved recorded MP3 and authoritative timing data are supplied. */
(function registerMarionBiography(){
  'use strict';

  const base='biographies/marion/assets/';
  const module={
    moduleVersion:'1.0.0',
    personId:'marion_brenay',
    status:'approved-visual-preview-awaiting-fable',
    storyReady:false,
    unavailableLabel:'Fable narration pending — approved visual preview available',
    audio:null,
    narrator:'Fable',
    audioCandidates:[],
    narrationContract:'approved photo-context text; generated Fable recording becomes timing authority after approval',
    transcript:"Marion Beulah Brenay was born on January 20, 1923, in Saginaw, Michigan, the second of thirteen children of Charles Albert Brenay and Marian Beulah Skinner. Arizona had been a state eleven years. A restored childhood photograph preserves Marion as a small girl near the beginning of that large family story.\n\nIn 1925, before interstate highways, the Brenays left Michigan for the Southwest. Four children and all the family could carry rode beneath canvas in an old Ford. Thirty days of dirt roads and cow trails took them through 126-degree heat at Needles and across the Colorado River at Parker by ferry. They reached Mesa in July.\n\nMarion’s childhood stretched across the desert and mountain West as the country entered the Great Depression. Money was scarce, and her father’s pursuit of a family farm repeatedly set them in motion. Free homestead land drew them to the desert near Buckeye, but illness, death and harsh conditions ended the attempt. A land trade and promised sawmill work took them to Nutrioso; when it failed, they returned to Mesa. The hope of raising their own food led them to Blanding, but dry farming failed. Hardship followed them to Salt Lake City and back to Arizona.\n\nThe map changed, but the labor did not. Homes were often unfinished, without plumbing or electricity. By eleven, Marion cooked, baked bread, cared for younger children and worked beside the family. She picked crops and washed clothes before school. Several younger siblings died. Poverty and loss made childhood brief.\n\nIn 1940, health and opportunity set the family on another road. Marion’s brother Ammon had suffered pneumonia, and a doctor recommended Arizona’s pine country. A farm trade brought them to Lakeside by rough road through tall pines. Their home had no electricity or running water, and the little mountain school felt worlds away from Mesa High. There Marion met James Wilford Webb, known as Jay.\n\nTheir courtship unfolded mostly on foot—walks around the lake, dances and evenings with friends. They married in St. Johns on May 5, 1941, and began with almost nothing in rough housing tied to the local sawmill economy. A family photograph from 1941 preserves Marion and Jay together near the beginning of their life as a couple.\n\nSoon the wider world entered their home. After the United States entered the Second World War, Jay joined the Army. Marion faced separation with their baby, James Sheldon, little money and no car. She traveled alone with Sheldon and moved where relatives and housing could support them until Jay returned. Marion’s 1945 portrait records the young mother during those years of separation and uncertainty.\n\nAfter the war, timber work directed family life through Vernon, Lakeside, Forestdale and Hilltop, often in temporary housing. A son, Jamar, died at birth during complications that threatened Marion’s life. Daughters Diane, Drinette, Daphne and DeEdra enlarged the family. Marion later endured major kidney surgery without medical insurance. Later family photographs show Marion first with young Diane and then amid the expanding Webb household.\n\nAs life settled, Marion began preserving the journey behind them. She started a diary in January 1977 and continued for decades. Her memories connect private endurance to desert homesteads, mountain timber towns, Depression hardship and world war. Marion made sure the family’s places, pressures and people survived. A final family photograph shows Marion in the role she sustained for decades: keeper of the family’s memory.",
    overlayManifest:'biographies/marion/overlays.json',
    rightsManifest:'biographies/marion/rights-manifest.json',
    scenes:[
      {src:base+'marion_child_photo_only_sharpened.jpg',secondarySrc:base+'marion_birth_house_candidate_conservative.jpg',title:'Marion’s earliest years',caption:'Marion Beulah Brenay as a young child.',source:'Family archive • approved restored crop',triggerParagraph:0,locator:'Saginaw, Michigan → Arizona • 1923',flagKey:'michigan-1923',mapKey:'great-lakes-to-southwest',visualType:'family-photo'},
      {src:base+'marion_1925_journey_candidate.jpg',title:'Westward in 1925',caption:'Archival context for overland family travel. The people shown are not the Brenay family.',source:'Russell Lee • Library of Congress FSA/OWI collection • no known restrictions',triggerParagraph:1,locator:'Michigan → Arizona • 1925',flagKey:'arizona-1917',mapKey:'great-lakes-to-southwest',visualType:'archival-photo'},
      {src:base+'marion_arizona_childhood_candidate.jpg',title:'Childhood across the Southwest',caption:'Children at Camelback Farms near Phoenix in 1942. The children shown are not Marion or her siblings.',source:'Russell Lee • Library of Congress • LC-DIG-fsa-8a30947 • no known restrictions',triggerParagraph:2,locator:'Arizona / Utah / Four Corners • 1930s',flagKey:'arizona-1917',mapKey:'depression-western-moves',visualType:'archival-photo'},
      {src:base+'marion_child_photo_only_sharpened.jpg',title:'Work began early',caption:'Marion’s childhood was shaped by family work, poverty and repeated loss.',source:'Family archive • approved restored crop',triggerParagraph:3,locator:'Arizona and the mountain West • 1930s',flagKey:'arizona-1917',mapKey:'depression-western-moves',visualType:'family-photo'},
      {src:base+'marion_school_independence_candidate.jpg',title:'A new life in the pine country',caption:'School travel between Concho and St. Johns in 1940. The people shown are not Marion.',source:'Russell Lee • Library of Congress • LC-DIG-fsa-8a29603 • no known restrictions',triggerParagraph:4,locator:'Mesa → Lakeside, Arizona • 1940',flagKey:'arizona-1917',mapKey:'mesa-to-lakeside',visualType:'archival-photo'},
      {src:base+'jay_marion_mesa_1941_restored.jpg',title:'Marion and Jay',caption:'Marion and James Wilford “Jay” Webb near the beginning of their life together.',source:'Family archive • approved restoration',triggerParagraph:5,locator:'Lakeside / St. Johns, Arizona • 1941',flagKey:'arizona-1917',mapKey:'white-mountains',visualType:'family-photo'},
      {src:base+'marion_webb_1945_restored.jpg',title:'Marion during the war years',caption:'Marion’s 1945 portrait during the family’s wartime separation.',source:'Family archive • approved clean portrait restoration',triggerParagraph:6,locator:'Arizona • Second World War',flagKey:'united-states-48-star',mapKey:'white-mountains',visualType:'family-photo'},
      {src:base+'marion_with_diane_candidate_sharpened.jpg',secondarySrc:base+'marion_children_family_photo_candidate.jpg',title:'The growing Webb family',caption:'Marion with Diane, followed by the expanding Webb family.',source:'Family archive • approved restored photographs',triggerParagraph:7,locator:'Vernon / Lakeside / Forestdale / Hilltop • postwar years',flagKey:'arizona-1917',mapKey:'white-mountains',visualType:'family-photo'},
      {src:base+'marion_family_historian_candidate.jpg',title:'The family historian',caption:'Marion preserved the family’s journey for the generations that followed.',source:'Family archive • Marion Beulah Brenay Webb life story',triggerParagraph:8,locator:'Arizona • family memory',flagKey:'arizona-1917',mapKey:'white-mountains',visualType:'family-photo'}
    ]
  };

  if(typeof TOUR_MEDIA==='undefined'){
    console.error('Marion biography module could not register because the Atlas media registry is unavailable.');
    return;
  }
  if(TOUR_MEDIA.marion_brenay){
    console.warn('Marion biography module was already registered; the existing registration was preserved.');
    return;
  }
  TOUR_MEDIA.marion_brenay=module;
  window.AncestryBiographyModules=window.AncestryBiographyModules||{};
  window.AncestryBiographyModules.marion_brenay=module;
})();
