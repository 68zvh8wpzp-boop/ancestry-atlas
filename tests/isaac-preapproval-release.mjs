import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const get=(p)=>fs.readFileSync(new URL(p,root));
const text=(p)=>get(p).toString('utf8');
const d={nodes:[{id:'isaac_carling',name:'Isaac Van Wagoner Carling',years:'1831–1911',branch:'Webb / Carling',evidence:[],historicalNotes:[],note:'Old short note'},{id:'sarah_carling',name:'Sarah Elizabeth Carling'}]};
const guide={},history={},ctx=vm.createContext({DATA:d,GUIDE_PROFILES:guide,HISTORICAL_CONTEXT:history});
const scripts=[
'isaac-carling-mobile-biography-20261018.js',
'isaac-carling-1854-marriage-original-media-20261018.js',
'isaac-carling-orderville-1900-context-photo-20261018.js',
'isaac-carling-daughter-1924-death-certificate-media-20261018.js',
'isaac-carling-1852-diary-digitized-volume-source-20261018.js',
'isaac-carling-final-preapproval-presentation-20261018.js'
];
const html=text('atlas-v3.9.62.html');
for(const s of scripts){
 assert(html.includes('<script src="'+s+'?'), 'Missing published script '+s);
 new vm.Script(text(s),{filename:s});
}
const ordered=scripts.map(s=>html.indexOf('<script src="'+s+'?'));
assert(ordered.every((v,i)=>v>=0&&(i===0||v>ordered[i-1])), 'Script load order invalid');
for(let pass=0;pass<2;pass++)for(const s of scripts)vm.runInContext(text(s),ctx,{filename:s});
const n=d.nodes[0];assert.equal(d.nodes[1].name,'Sarah Elizabeth Carling');
assert.equal(n.BIOGRAPHY,guide.isaac_carling.life,'Displayed biography must match person biography');
assert(n.BIOGRAPHY.length>3000,'Missing substantive biography');
assert(!/corresponding nineteenth-century board/.test(n.BIOGRAPHY),'Internal source audit leaked into biography');
assert.equal(n.historicalNotes.length,2,'Exactly two separately presented notes');
assert(n.historicalNotes.every(e=>!e.paragraphs.join(' ').includes('Do not reopen')),'Internal instructions leaked to visitor');
assert.equal(n.portrait,undefined,'No verified personal portrait; cannot invent');
assert.equal(n.preapprovalAudit.verifiedIsaacPortraits,0);
assert.equal(n.evidence.length,10,'Unexpected source additions/duplicates');
assert.equal(new Set(n.evidence.map(e=>e.id)).size,n.evidence.length);
const docs=n.evidence.filter(e=>e.kind==='document'&&(e.thumb||e.full));
const places=n.evidence.filter(e=>e.kind==='place'&&(e.thumb||e.full));
const links=n.evidence.filter(e=>!(e.thumb||e.full));
assert.equal(docs.length,3,'2 views of original 1854 plus 1 original daughter 1924 copy');
assert.equal(places.length,1,'Orderville is historical place, not Isaac portrait');
assert.equal(links.length,6,'Unverified archival items must be links, not image tiles');
assert(docs.find(e=>e.id==='isaac-1924-daughter-asenath-carling-spencer-death-certificate').summary.includes('not for Isaac'));
assert(places[0].summary.includes('No individual in this view'));
assert.equal(docs.filter(e=>e.originalAsset?.endsWith('.pdf')).length,2,'Both views must reference SAME original 1854 PDF');
assert.equal(new Set(docs.filter(e=>e.originalAsset?.endsWith('.pdf')).map(e=>e.originalAsset)).size,1);
for(const e of n.evidence){
 assert(e.sourcePage?.startsWith('https://'), 'Source link missing for '+e.id);
 for(const key of ['thumb','full','originalAsset']){
   const path=e[key];
   if(path && !path.startsWith('data:')){
     assert(path.startsWith('assets/isaac-carling/'), 'Invalid Isaac asset path '+path);
     assert(fs.existsSync(new URL(path,root)), 'Broken '+key+' local asset '+path);
   }
 }
}
for(const e of links)assert(!e.originalAsset,'Uncaptured source should not link to false local original');
const suppressed=/\b(?:captured|capture|pending|not yet|original .* not|remains linked)\b/i;
for(const e of [...docs,...places])assert(!suppressed.test(e.summary||''),'Public card might show generic WRONG-person fallback '+e.id);
for(const key of ['1854-deseret-news-p3-marriage-original.pdf','orderville-townscape-circa-1900-usu-plate548x-original-web.jpg','1924-asenath-emeline-carling-spencer-death-certificate-source.jpg']){
 const p='assets/isaac-carling/'+key;
 assert(fs.statSync(new URL(p,root)).size>15000);
}
const originals=[
['assets/isaac-carling/1854-deseret-news-p3-marriage-original.pdf','e8eb7ae86f6e8a7f5a247b6ad0fc3159675df3e948290cff8514a77b4e27d4be',308420],
['assets/isaac-carling/orderville-townscape-circa-1900-usu-plate548x-original-web.jpg','4f258b39f84019be837736bb4050f1247a6dfcad19c5e63f2bd9ab7e72808f6f',348849],
['assets/isaac-carling/1924-asenath-emeline-carling-spencer-death-certificate-source.jpg','88a70e481e7b3bf94205815d2a2b3bf053589efee615514d5fd479d640499fc0',196665],
];
for(const [path,sha,bytes] of originals){
 const b=get(path);
 assert.equal(b.length,bytes,'Original file wrong byte length '+path);
 assert.equal(crypto.createHash('sha256').update(b).digest('hex'),sha,'Original checksum mismatch '+path);
 if(path.endsWith('.pdf'))assert.equal(b.subarray(0,4).toString(),'%PDF');
 else assert.equal(b.subarray(0,3).toString('hex'),'ffd8ff');
}
for(const p of ['assets/isaac-carling/1854-isaac-asenath-marriage-notice-view.png','assets/isaac-carling/1854-deseret-news-p3-fullpage-view.jpg']){
 const b=get(p);assert(b.length>20000,'Unreadable small derivative '+p);
 if(p.endsWith('png'))assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 else assert.equal(b.subarray(0,3).toString('hex'),'ffd8ff');
}
const index=text('index.html'),manifest=JSON.parse(text('manifest.webmanifest'));
assert(index.includes('atlas-v3.9.62.html?iphone-refresh=20261018-isaac-qa-b6'));
assert(manifest.start_url.includes('atlas-v3.9.62.html?iphone-refresh=20261018-isaac-qa-b6'));
assert(!html.includes('Isaac Carling (1825)'), 'Wrong ancestor biography collision');
const r={person:n.id,release:'v3.9.62',biographyChars:n.BIOGRAPHY.length,notes:n.historicalNotes.length,documentTiles:docs.length,distinctDocumentSources:2,historicalPlaceImages:places.length,sourceOnlyReferences:links.length,authenticatedIsaacPortraits:0,originalBytesVerified:originals.reduce((t,o)=>t+o[2],0),status:'PASS — source and app-model QA; human iPhone visual QA required'};
console.log(JSON.stringify(r,null,2));
