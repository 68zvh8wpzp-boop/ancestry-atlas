import {access,readFile,readdir,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root=path.dirname(fileURLToPath(import.meta.url));
const manifest=JSON.parse(await readFile(path.join(root,'PACKAGE_ASSET_MANIFEST.json'),'utf8'));
const content=await readFile(path.join(root,'atlas-content.js'),'utf8');
const tour=await readFile(path.join(root,'atlas-tour-3.6.0.js'),'utf8');
const index=await readFile(path.join(root,'index.html'),'utf8');
const files=await readdir(root);

const sceneFiles=[...content.matchAll(/\bsrc:'([^']+)'/g)].map(match=>match[1]);
const required=[...new Set([...manifest.runtime,...manifest.approvedBiographyAssets,manifest.narration.approvedFile,...sceneFiles])];
const checks=[];
for(const file of required){
  let exists=true,size=0;
  try{await access(path.join(root,file));size=(await stat(path.join(root,file))).size}catch{exists=false}
  checks.push({file,exists,size});
}

const rejectedCharcoal=files.filter(file=>file.startsWith('charcoal_')&&!manifest.approvedBiographyAssets.includes(file));
const forbiddenSpeech=/speechSynthesis|SpeechSynthesisUtterance/.test(`${index}\n${tour}`);
const narrationReference=content.includes("audio: 'James_sheldon_webb.mp3'");
const transcriptPresent=content.includes('James Sheldon Webb was born on April 11, 1943');
const missing=checks.filter(item=>!item.exists||item.size===0);
const failures=[];
if(missing.length) failures.push({kind:'missing-or-empty',items:missing});
if(rejectedCharcoal.length) failures.push({kind:'rejected-charcoal-present',items:rejectedCharcoal});
if(forbiddenSpeech) failures.push({kind:'browser-speech-present'});
if(!narrationReference) failures.push({kind:'approved-audio-reference-changed'});
if(!transcriptPresent) failures.push({kind:'locked-transcript-missing'});

console.log(JSON.stringify({
  packageVersion:manifest.packageVersion,
  inputPackage:manifest.inputPackage,
  checked:checks.length,
  approvedSceneCount:sceneFiles.length,
  rejectedCharcoal,
  forbiddenSpeech,
  narrationReference,
  transcriptPresent,
  failures
},null,2));
if(failures.length) process.exitCode=1;
