import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const inez=readFileSync(new URL('inez-mobile-memoir.js',root),'utf8');
const sheldon=readFileSync(new URL('atlas-sheldon-presentation-2026-09-30.js',root),'utf8');
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');

test('A075 Inez author-name, age, and age-three original photo caption',()=>{
 const DATA={nodes:[{id:'inez_karen',evidence:[],biography:'before'}],edges:[{a:'inez_karen',b:'grace_hill'}]};
 const GUIDE_PROFILES={inez_karen:{life:'before'}};
 const ctx=vm.createContext({DATA,GUIDE_PROFILES});
 const g=JSON.stringify(DATA.edges);
 vm.runInContext(inez,ctx,{timeout:5000});
 vm.runInContext(inez,ctx,{timeout:5000});
 assert.match(GUIDE_PROFILES.inez_karen.life,/Tootie chose her given name, Inez Karen, after a friend named Inez Fish/);
 assert.match(GUIDE_PROFILES.inez_karen.life,/Her mother Grace gave her the nickname “Snookie”/);
 assert.match(GUIDE_PROFILES.inez_karen.life,/Grace was in her thirties and Thomas in his late sixties/);
 assert.doesNotMatch(GUIDE_PROFILES.inez_karen.life,/Tootie chose the name “Snookie”/);
 assert.equal(DATA.nodes[0].evidence.length,39,'do not add duplicate gallery images');
 const photo=DATA.nodes[0].evidence.find(e=>(e.full||'').endsWith('/image3.jpeg'));
 assert.ok(photo,'existing source photo retained');
 assert.equal(photo.date,'circa 1949');
 assert.match(photo.summary,/age three/);
 assert.match(photo.transcription,/Age 3 in a pink Crocheted dress my mom made for me/);
 assert.equal(JSON.stringify(DATA.edges),g);
});
test('A075 Sheldon original 1965 ceremony and birth-order correction',()=>{
 const DATA={nodes:[{id:'james_sheldon',evidence:[],biography:'before'}],edges:[{a:'james_sheldon',b:'jay_webb'}]};
 const GUIDE_PROFILES={james_sheldon:{life:'before'}};
 const ctx=vm.createContext({DATA,GUIDE_PROFILES});
 const g=JSON.stringify(DATA.edges);
 vm.runInContext(sheldon,ctx,{timeout:5000});
 const life=GUIDE_PROFILES.james_sheldon.life;
 assert.match(life,/married in Lakeside, Arizona, on 21 January 1965/);
 assert.match(life,/separate religious sealing in Mesa on 12 June/);
 assert.match(life,/Shared in 1967, Sterling in 1973, and Jeremy in 1977/);
 assert.doesNotMatch(life,/raised three sons, Shared, Jeremy, and Sterling/);
 assert.equal(JSON.stringify(DATA.edges),g);
});
test('A075 iPhone cache bust is targeted; private media and narration untouched',()=>{
 const i='inez-mobile-memoir.js?v=20261113-a075';
 const s='atlas-sheldon-presentation-2026-09-30.js?v=20261113-a075';
 assert.equal(html.split(i).length-1,1);
 assert.equal(html.split(s).length-1,1);
 assert.doesNotMatch(inez+sheldon,/TOUR_MEDIA|image41\.jpeg|image42\.jpeg/);
});
