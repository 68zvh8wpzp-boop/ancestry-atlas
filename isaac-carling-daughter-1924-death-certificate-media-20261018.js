/* Isaac Carling media batch 03 — ASENATH EMELINE CARLING SPENCER's 1924 Utah death certificate.
   Isaac's *daughter*, NOT his own 1911 certificate; copied unchanged from published
   Spencer family archive: source 576x518 JPG, sha256
   88a70e481e7b3bf94205815d2a2b3bf053589efee615514d5fd479d640499fc0.
   Primary content: civil death certificate, image redistributed on family page;
   archive paper/original-state digital master NOT acquired. Never label as portrait.
*/
(()=>{'use strict';
 if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
 const person=DATA.nodes.find(n=>n.id==='isaac_carling');
 if(!person)return;
 const image='assets/isaac-carling/1924-asenath-emeline-carling-spencer-death-certificate-source.jpg';
 const record={
  id:'isaac-1924-daughter-asenath-carling-spencer-death-certificate',
  kind:'document',
  sourceLevel:'original-civil-record-image-family-hosted-copy',
  title:'Asenath Emeline Carling Spencer — her 1924 death certificate (names Isaac as father)',
  date:'15 May 1924',
  place:'Orderville, Kane County, Utah',
  thumb:image,full:image,
  originalAsset:image,
  sourcePage:'https://icspencerfamily.weebly.com/howard-orson-spencer-family-public-records.html',
  provenance:'State of Utah State Board of Health, death certificate for Asenath Emeline Carling Spencer, Kane County, Orderville, 15 May 1924, State Board of Health File No. 40 as legible on the family-hosted image. Utah State Archives and Records Service, Office of Vital Records and Statistics Death certificates, Series 81448. Digitized image redistributed by Isaac Carling Spencer family archive, https://icspencerfamily.weebly.com/uploads/7/4/5/4/7454195/6182216.jpg, saved unchanged (576 × 518, 196665 bytes; SHA-256 88a70e481e7b3bf94205815d2a2b3bf053589efee615514d5fd479d640499fc0). This is a published web-size scan, not the original state-held paper or archive master.',
  summary:'Asenath Emeline Carling Spencer was Isaac Van Wagoner Carling’s daughter. This contemporary death certificate names her father as Isaac Vanwagoner Carling, born in New York, and her mother as Asenath E. Browning. It is **NOT** Isaac’s own 1911 death certificate. The parental information was supplied by a later informant; the birth-parent relationship is supported by the stated record but is not a birth-register primary observation.',
  transcription:'SELECTED ORIGINAL FIELDS (read from low-resolution certificate, not a full transcription):\nDeceased: Asenath Emeline Carling Spencer\nPlace of death: Kane County, Orderville, Utah\nDate of death: May 15, 1924\nFather: Isaac Vanwagoner Carling [handwriting and spacing vary]\nBirthplace of father: New York\nMother: Asenath E. Browning\nBirthplace of mother: Illinois [abbreviated, confirm from higher resolution]\n\nFULLTEXT_TRANSLATION: Not applicable — English original.\nNOTE: Cause of death and informant address are not fully transcribed from the 576px archival reproduction.',
  previewStatus:'published-576px-source-image-saved-unchanged-higher-resolution-desirable',
  confidence:'Authentic state-issued death certificate reproduced by family archive; low-res source image supports parentage but does not replace daughter birth certificate or Isaac 1911 certificate.'
 };
 person.evidence=person.evidence||[];
 const i=person.evidence.findIndex(e=>e.id===record.id);
 if(i>=0)person.evidence[i]=Object.assign({},person.evidence[i],record);
 else person.evidence.push(record);
 person.originalMediaAudit=Object.assign({},person.originalMediaAudit||{},{
   daughter1924DeathCertificate:'published-original-civil-document-scan-576px-captured',
   isaac1911DeathCertificate:'NOT-FOUND/NOT-CAPTURED',
   familyCivilCertificateCopiesCaptured:1,
   verifiedIsaacPortraits:0
 });
})();
