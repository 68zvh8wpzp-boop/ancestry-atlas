import fs from 'node:fs';
import vm from 'node:vm';

const read=path=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const context={console,window:{}};
vm.createContext(context);
vm.runInContext(`${read('atlas-content.js')}\n;globalThis.EXPORTED_MEDIA=TOUR_MEDIA;`,context);
for(const file of [
  'biographies/marion/marion-story-module.js',
  'biographies/brenay-canada/brenay-canada-story-modules.js',
  'biographies/brenay-canada/charles-albert-revision-3.8.19.js',
  'biographies/brenay-canada/john-mary-revision-3.8.19.js',
  'biographies/brenay-canada/charles-godfrey-ida-revision-3.8.19.js',
  'biographies/webb-branch/webb-story-modules.js'
  ,'biographies/webb-branch/jay-distinctness-revision-3.8.19.js'
])vm.runInContext(read(file),context);

const media=context.EXPORTED_MEDIA;
const failures=[];
if(Object.keys(media).length!==12)failures.push(`expected 12 biographies, found ${Object.keys(media).length}`);
const charles=media.charles_albert;
const marion=media.marion_brenay;
if(!charles||charles.transcript.length>1700)failures.push('Charles Albert must remain the concise cross-border biography');
for(const repeated of ['thirty days','Buckeye','Nutrioso','Blanding','Salt Lake City','Ammon suffered']){
  if(charles?.transcript.includes(repeated))failures.push(`Charles Albert still repeats Marion territory: ${repeated}`);
}
if(!marion?.transcript.includes('Thirty days of dirt roads'))failures.push('Marion must retain ownership of the detailed 1925 crossing');
if(charles?.audio)failures.push('revised Charles narration must not use the superseded recording');
if(charles?.scenes?.length!==4)failures.push('Charles visual sequence must contain four distinct beats');
if(charles?.scenes?.at(-1)?.visualType!=='map-only')failures.push('Charles must end with the full life-route map');

const john=media.john_peter;
const mary=media.mary_ann;
if(!john||john.transcript.length>2500)failures.push('John Peter must remain focused on migration and the Gooley frontier');
if(!mary||mary.transcript.length>1700)failures.push('Mary Ann must remain the concise Dennis evidence biography');
for(const biography of [john,mary]){
  if(biography?.audio)failures.push(`${biography?.personId} revised narration must not use a superseded recording`);
}
for(const repeated of ['fire swept','destroyed homes','Alpena rebuilt','lumber yards']){
  if(john?.transcript.includes(repeated))failures.push(`John Peter still repeats Ida's fire territory: ${repeated}`);
  if(mary?.transcript.includes(repeated))failures.push(`Mary Ann still repeats Ida's fire territory: ${repeated}`);
}
if(john?.scenes?.some(scene=>scene.src?.includes('alpena_fire')))failures.push('John Peter must not repeat Ida’s Alpena fire image');
if(mary?.scenes?.some(scene=>scene.src))failures.push('Mary Ann’s distinct evidence sequence must not repeat archival substitutes');
if(mary?.scenes?.length!==3||mary.scenes.some(scene=>scene.visualType!=='map-only'))failures.push('Mary Ann must use three full-stage evidence maps');

const godfrey=media.charles_godfrey;
const ida=media.ida_mae;
if(!godfrey||godfrey.transcript.length>1900)failures.push('Charles Godfrey must remain focused on immigration, names and naturalization');
if(!ida||ida.transcript.length>2300)failures.push('Ida Mae must remain focused on the Gooley borderland inheritance');
for(const biography of [godfrey,ida]){
  if(biography?.audio)failures.push(`${biography?.personId} revised narration must not use a superseded recording`);
}
for(const repeated of ['lumber yards','brick business blocks','identified as a Canadian citizen','registered for the American draft']){
  if(godfrey?.transcript.includes(repeated))failures.push(`Charles Godfrey repeats another biography's territory: ${repeated}`);
  if(ida?.transcript.includes(repeated))failures.push(`Ida repeats another biography's territory: ${repeated}`);
}
if(godfrey?.scenes?.some(scene=>scene.src?.includes('arnstein_observational')))failures.push('Charles Godfrey must not repeat Ida’s Arnstein visual');
if(godfrey?.scenes?.some(scene=>scene.src?.includes('alpena_churchill')))failures.push('Charles Godfrey must not repeat Ida’s lumber visual');
if(ida?.scenes?.some(scene=>scene.src?.includes('wwi_registration')))failures.push('Ida must not repeat Charles Albert’s draft-registration visual');

const jay=media.james_wilford;
if(!jay||jay.transcript.length>2300)failures.push('Jay must remain focused on timber work and Army service');
if(jay?.audio)failures.push('revised Jay narration must not use the superseded recording');
for(const repeated of ['Their courtship','faced separation','Jamar','kidney surgery','Daughters Diane']){
  if(jay?.transcript.includes(repeated))failures.push(`Jay still repeats Marion's household territory: ${repeated}`);
}
if(jay?.scenes?.some(scene=>scene.src?.includes('jay_marion')))failures.push('Jay must not repeat Marion’s couple photograph');
if(jay?.scenes?.some(scene=>/approved|restored|descreened|reproduced/i.test(scene.caption||'')))failures.push('Jay captions must not expose production language');

const productionContract=read('PRODUCTION_CONTRACT_v3_8_19_BIOGRAPHY_DISTINCTNESS.md');
for(const phrase of ['compare its complete narration against every','remove at least eighty percent','prior audio stale immediately']){
  if(!productionContract.includes(phrase))failures.push(`distinctness contract missing: ${phrase}`);
}

console.log(JSON.stringify({biographies:Object.keys(media).length,charlesCharacters:charles?.transcript.length,johnCharacters:john?.transcript.length,maryCharacters:mary?.transcript.length,failures},null,2));
if(failures.length)process.exitCode=1;
