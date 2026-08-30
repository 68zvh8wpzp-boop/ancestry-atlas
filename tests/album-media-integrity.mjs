import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const html=read('index.html');
const start=html.indexOf('const DATA = ')+13;
const end=html.indexOf(';\nconst canvas',start);
if(start<13||end<0)throw new Error('Could not locate Atlas DATA payload');
const data=JSON.parse(html.slice(start,end));

const context={console,window:{}};
vm.createContext(context);
vm.runInContext(`${read('atlas-content.js')}\n;globalThis.EXPORTED_MEDIA=TOUR_MEDIA;`,context);
for(const file of [
  'biographies/marion/marion-story-module.js',
  'biographies/brenay-canada/brenay-canada-story-modules.js',
  'biographies/webb-branch/webb-story-modules.js'
])vm.runInContext(read(file),context);

const unavailable=new Set([
  'assets/goulet_tellier_marriage_1846_thumb.jpg',
  'assets/goulet_tellier_marriage_1846_full.jpg'
]);
const packaged=url=>!!url&&!/^https?:/i.test(url)&&!unavailable.has(url);
const refs=[];
for(const node of data.nodes){
  if(node.portrait&&packaged(node.portrait.url))refs.push(['portrait',node.id,node.portrait.url]);
  for(const evidence of node.evidence||[]){
    const thumb=evidence.thumb||evidence.full,full=evidence.full||evidence.thumb;
    if(packaged(thumb)&&packaged(full))refs.push(['document thumb',node.id,thumb],['document full',node.id,full]);
  }
}
for(const [personId,media] of Object.entries(context.EXPORTED_MEDIA)){
  for(const scene of media.scenes||[])if(scene?.src)refs.push(['biography image',personId,scene.src]);
}

const failures=[];
for(const [kind,personId,url] of refs){
  if(!fs.existsSync(path.join(root,url)))failures.push(`${kind} for ${personId} is missing: ${url}`);
}
if(/if\(n\.portrait\)\{/.test(html))failures.push('Album must not admit unverified remote portrait URLs');
if(!html.includes("b.type='button';b.className='album-card '"))failures.push('Album cards must be explicit buttons for reliable iPhone activation');
if(!html.includes("classList.add('viewer-behind')"))failures.push('Album must yield to one full-screen viewer layer');

console.log(JSON.stringify({checked:refs.length,failures},null,2));
if(failures.length)process.exitCode=1;
