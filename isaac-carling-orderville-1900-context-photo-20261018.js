/* Isaac Carling media batch 02 — single circa-1900 historic Orderville VIEW.
   NOT a portrait of Isaac. No known camera photographer or depicted Isaac identity.
   Unchanged USU Extension Rural Rangeland Archive JPG SHA256:
   4f258b39f84019be837736bb4050f1247a6dfcad19c5e63f2bd9ab7e72808f6f
   Original print LDS Church Archives P-1093-12, source Plate 548X.
*/
(()=>{'use strict';
  if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
  const person=DATA.nodes.find(n=>n.id==='isaac_carling');if(!person)return;
  const asset='assets/isaac-carling/orderville-townscape-circa-1900-usu-plate548x-original-web.jpg';
  const photo={
    id:'isaac-context-orderville-townscape-circa-1900-usu-p1093-12',
    kind:'place',
    sourceLevel:'historic-photograph-context',
    title:'Orderville, Utah — historic town photograph, around 1900',
    date:'circa 1900',
    place:'Orderville, Kane County, Utah Territory / Utah',
    thumb:asset,
    full:asset,
    originalAsset:asset,
    sourcePage:'https://extension.usu.edu/rra/photos/orderville-utah-2',
    provenance:'Utah State University Extension, Rural Rangeland Archive, Plate 548X, Orderville, Utah, 1900; archive original photo reference P-1093-12, held by Church of Jesus Christ of Latter-day Saints Church Archives, Salt Lake City. Institutional published unmodified JPEG captured to Atlas 18 Oct 2026, 1500×1000, 348849 bytes, SHA-256 4f258b39f84019be837736bb4050f1247a6dfcad19c5e63f2bd9ab7e72808f6f. Photographer and exact date not documented.',
    summary:'A period townscape from about 1900 showing the Orderville settlement where Isaac lived in his later years. Isaac himself has NOT been identified in the photograph. This is an authentic historic place photograph, not a portrait or proof of where he stood.',
    confidence:'Town, date approximate and institutional photograph identifier documented; no individual Isaac identification or personal photographer claim.',
    previewStatus:'institutional-jpeg-captured-original-photo-print-offsite',
    visualType:'historical-place'
  };
  person.evidence=person.evidence||[];
  const i=person.evidence.findIndex(x=>x.id===photo.id);
  if(i<0)person.evidence.push(photo);else person.evidence[i]=photo;
  person.originalMediaAudit=Object.assign({},person.originalMediaAudit||{},{
    historicalPlacePhotographsCaptured:1,
    verifiedIsaacPortraits:0,
    ordervilleCirca1900PhotoCaptured:'institutional-JPEG-unchanged-published',
    ordervillePhotoOriginalArchive:'LDS Church Archives P-1093-12 (not captured original print)',
    ordervillePhotoRights:'ca1900 historical photograph; exact repository reuse terms not stated',
  });
})();
