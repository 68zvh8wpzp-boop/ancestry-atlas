import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const context={console,window:{}};
vm.createContext(context);
vm.runInContext(`${read('atlas-content.js')}\n;globalThis.EXPORTED_MEDIA=TOUR_MEDIA;`,context);
for(const file of [
  'biographies/marion/marion-story-module.js',
  'biographies/brenay-canada/brenay-canada-story-modules.js',
  'biographies/webb-branch/webb-story-modules.js'
])vm.runInContext(read(file),context);

const productionLanguage=/\b(approved|composition|generated original|project owner|commercial release|cleared or replaced|project-created|presentation treatment|source material|the atlas|behind the scenes|editorial)\b/i;
const failures=[];
for(const [personId,media] of Object.entries(context.EXPORTED_MEDIA)){
  if(productionLanguage.test(media.transcript||''))failures.push(`${personId}: narration contains production language`);
  for(const [index,scene] of (media.scenes||[]).entries()){
    if(productionLanguage.test(scene.caption||''))failures.push(`${personId} scene ${index+1}: caption contains production language`);
  }
}

console.log(JSON.stringify({biographies:Object.keys(context.EXPORTED_MEDIA).length,failures},null,2));
if(failures.length)process.exitCode=1;
