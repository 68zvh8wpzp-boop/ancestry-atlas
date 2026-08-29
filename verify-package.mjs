import {access,readFile,readdir,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root=path.dirname(fileURLToPath(import.meta.url));
const manifest=JSON.parse(await readFile(path.join(root,'PACKAGE_ASSET_MANIFEST.json'),'utf8'));
const content=await readFile(path.join(root,'atlas-content.js'),'utf8');
const marion=await readFile(path.join(root,'biographies/marion/marion-story-module.js'),'utf8');
const branch=await readFile(path.join(root,'biographies/brenay-canada/brenay-canada-story-modules.js'),'utf8');
const webb=await readFile(path.join(root,'biographies/webb-branch/webb-story-modules.js'),'utf8');
const webbProduction=JSON.parse(await readFile(path.join(root,'biographies/webb-branch/branch-production-manifest.json'),'utf8'));
const fableApproval=await readFile(path.join(root,'approved-audio/fable/APPROVAL.md'),'utf8');
const tour=await readFile(path.join(root,'atlas-tour-3.6.0.js'),'utf8');
const index=await readFile(path.join(root,'index.html'),'utf8');
const files=await readdir(root);

const sandbox={window:{},console};
vm.createContext(sandbox);
vm.runInContext(`${content}\nglobalThis.__media=TOUR_MEDIA;`,sandbox,{filename:'atlas-content.js'});
sandbox.TOUR_MEDIA=sandbox.__media;
vm.runInContext(marion,sandbox,{filename:'marion-story-module.js'});
vm.runInContext(branch,sandbox,{filename:'brenay-canada-story-modules.js'});
vm.runInContext(webb,sandbox,{filename:'webb-story-modules.js'});
const media=sandbox.TOUR_MEDIA;

const sceneFiles=[...new Set(Object.values(media).flatMap(item=>(item.scenes||[]).map(scene=>scene.src).filter(Boolean)))];
const indexFiles=[...index.matchAll(/(?:src|href)="([^"#?]+)(?:\?[^"#]*)?"/g)].map(match=>match[1]).filter(file=>!/^https?:|^data:/.test(file)&&!file.includes('${'));
const required=[...new Set([...manifest.runtime,...manifest.approvedBiographyAssets,...sceneFiles,...indexFiles])];
const checks=[];
for(const file of required){
  let exists=true,size=0;
  try{await access(path.join(root,file));size=(await stat(path.join(root,file))).size}catch{exists=false}
  checks.push({file,exists,size});
}

const failures=[];
const missing=checks.filter(item=>!item.exists||item.size===0);
if(missing.length)failures.push({kind:'missing-or-empty',items:missing});

const rejectedCharcoal=files.filter(file=>file.startsWith('charcoal_')&&!manifest.approvedBiographyAssets.includes(file));
if(rejectedCharcoal.length)failures.push({kind:'rejected-charcoal-present',items:rejectedCharcoal});
if(/speechSynthesis|SpeechSynthesisUtterance/.test(`${index}\n${tour}`))failures.push({kind:'browser-speech-present'});
if(/setStatus\([^\n]*Alfie/.test(tour))failures.push({kind:'hard-coded-legacy-narrator-status'});

const expected={
  james_sheldon:'biographies/sheldon/narration-approved-photo-context.txt',
  marion_brenay:'biographies/marion/narration-approved-photo-context.txt',
  charles_albert:'biographies/brenay-canada/narration/charles_albert_brenay.txt',
  charles_godfrey:'biographies/brenay-canada/narration/charles_godfrey_brenay.txt',
  ida_mae:'biographies/brenay-canada/narration/ida_mae_gooley.txt',
  john_peter:'biographies/brenay-canada/narration/john_peter_gooley.txt',
  mary_ann:'biographies/brenay-canada/narration/mary_ann_dennis.txt'
};
const approvedAudio={
  james_sheldon:'approved-audio/fable/James_sheldon_webb.mp3',
  marion_brenay:'approved-audio/fable/Marion_beulah_brenay_webb.mp3',
  charles_albert:'approved-audio/fable/Charles_albert_brenay.mp3',
  charles_godfrey:'approved-audio/fable/Charles_godfrey_brenay.mp3',
  ida_mae:'approved-audio/fable/Ida_mae_gooley.mp3',
  john_peter:'approved-audio/fable/John_peter_gooley.mp3',
  mary_ann:'approved-audio/fable/Mary_ann_dennis.mp3'
};
for(const person of webbProduction.people){
  const personDir=path.join(root,'biographies','webb-branch',person.artifactDirectory);
  const biography=JSON.parse(await readFile(path.join(personDir,'biography-manifest.json'),'utf8'));
  expected[person.personId]=path.relative(root,path.join(personDir,biography.narrationTextFile)).split(path.sep).join('/');
  approvedAudio[person.personId]=path.relative(root,path.resolve(personDir,biography.audio.file)).split(path.sep).join('/');
  if(!biography.status.includes('runtime-integrated')) failures.push({kind:'webb-biography-release-state-stale',id:person.personId,status:biography.status});
}
for(const [id,textPath] of Object.entries(expected)){
  const item=media[id];
  if(!item){failures.push({kind:'biography-missing',id});continue}
  const exact=(await readFile(path.join(root,textPath),'utf8')).trim();
  if(item.transcript!==exact)failures.push({kind:'transcript-mismatch',id,textPath});
  if(item.audio!==approvedAudio[id]||item.narrator!=='Fable'||item.storyReady!==true)failures.push({kind:'approved-fable-runtime-state-invalid',id});
  if(!(item.scenes||[]).length)failures.push({kind:'scenes-missing',id});
}

if(manifest.packageVersion!=='3.8.15-sheldon-visual-corrective')failures.push({kind:'package-version-drift',value:manifest.packageVersion});
if(!index.includes('BUILD v3.8.15')||!index.includes('>v3.8.15</span>'))failures.push({kind:'visible-build-version-drift'});
if(webbProduction.status!=='approved-and-runtime-integrated')failures.push({kind:'webb-branch-release-state-stale',value:webbProduction.status});
if(!/promoted into the live Atlas/.test(fableApproval))failures.push({kind:'fable-approval-release-state-stale'});
const expectedAudioNames=Object.values(approvedAudio).map(file=>path.basename(file)).sort();
const manifestAudioNames=[...(manifest.narration.expectedFiles||[])].sort();
if(JSON.stringify(expectedAudioNames)!==JSON.stringify(manifestAudioNames))failures.push({kind:'approved-audio-inventory-drift',expected:expectedAudioNames,actual:manifestAudioNames});

console.log(JSON.stringify({
  packageVersion:manifest.packageVersion,
  inputPackage:manifest.inputPackage,
  checked:checks.length,
  biographies:Object.keys(expected).length,
  approvedSceneCount:Object.values(media).reduce((sum,item)=>sum+(item.scenes||[]).length,0),
  rejectedCharcoal,
  browserSpeech:false,
  narrationStatus:manifest.narration.status,
  failures
},null,2));
if(failures.length)process.exitCode=1;
