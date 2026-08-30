import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const failures=[];
const sha256=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

const familyBlocks=(text,srcPattern)=>{
  const blocks=[...text.matchAll(/\{[^{}]*visualType\s*:\s*['"]family-photo['"][^{}]*\}/gs)].map(match=>match[0]);
  return blocks.map(block=>block.match(srcPattern)?.[1]).filter(Boolean);
};

const sheldonText=read('atlas-content.js');
const marionText=read('biographies/marion/marion-story-module.js');
const jayScenes=JSON.parse(read('biographies/webb-branch/people/james_wilford/scene-manifest.json')).scenes;

const allocations={
  james_sheldon:familyBlocks(sheldonText,/src\s*:\s*['"]([^'"]+)['"]/).map(asset=>path.join(root,asset)),
  marion_brenay:familyBlocks(marionText,/src\s*:\s*base\+['"]([^'"]+)['"]/).map(asset=>path.join(root,'biographies/marion/assets',asset)),
  james_wilford:jayScenes.filter(scene=>scene.visualType==='family-photo').map(scene=>path.resolve(root,'biographies/webb-branch/people/james_wilford',scene.asset))
};

for(const [person,files] of Object.entries(allocations)){
  for(const file of files){
    if(!fs.existsSync(file)) failures.push({kind:'missing-active-family-photo',person,file:path.relative(root,file)});
  }
}

const hashes=new Map();
for(const [person,files] of Object.entries(allocations)){
  for(const file of files){
    if(!fs.existsSync(file)) continue;
    const hash=sha256(file);
    const prior=hashes.get(hash);
    if(prior && prior.person!==person){
      failures.push({kind:'cross-biography-family-photo-duplicate',hash,first:prior,second:{person,file:path.relative(root,file)}});
    }else if(!prior){
      hashes.set(hash,{person,file:path.relative(root,file)});
    }
  }
}

const rightsFiles={
  marion_brenay:new Set(JSON.parse(read('biographies/marion/rights-manifest.json')).assets.map(item=>item.file.replace(/^assets\//,''))),
  james_wilford:new Set(JSON.parse(read('biographies/webb-branch/people/james_wilford/rights-manifest.json')).assets.map(item=>item.file))
};

for(const asset of familyBlocks(marionText,/src\s*:\s*base\+['"]([^'"]+)['"]/)){
  if(!rightsFiles.marion_brenay.has(asset)) failures.push({kind:'active-family-photo-missing-rights-entry',person:'marion_brenay',asset});
}
for(const scene of jayScenes.filter(scene=>scene.visualType==='family-photo')){
  if(!rightsFiles.james_wilford.has(scene.asset)) failures.push({kind:'active-family-photo-missing-rights-entry',person:'james_wilford',asset:scene.asset});
}

const marionStory=read('biographies/marion/story-manifest.json');
for(const stale of ['visual_candidates/','restored_assets/','MARION_VISUAL_RIGHTS_MANIFEST.json']){
  if(marionStory.includes(stale)) failures.push({kind:'stale-production-path',manifest:'biographies/marion/story-manifest.json',value:stale});
}

console.log(JSON.stringify({allocations:Object.fromEntries(Object.entries(allocations).map(([person,files])=>[person,files.length])),failures},null,2));
if(failures.length) process.exitCode=1;
