import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import vm from 'node:vm';

const read=name=>readFile(new URL('../'+name,import.meta.url),'utf8');
async function loadSearch(){
  const context={window:{},module:{exports:{}}};
  vm.runInNewContext(await read('atlas-person-search.js'),context);
  return context.window.AtlasPersonSearch;
}
const people=[
  {id:'dorthea_jensen',name:'Dorthea Jensen Mortensen',aliases:['Dorothea Jensen Mortensen','Dorothea Mortensen'],years:'1840–1916',branch:'Denmark / Jensen'},
  {id:'marion_brenay',name:'Marion Beulah Brenay',years:'1900–1980',branch:'Brenay'},
  {id:'john_peter',name:'John Peter Gooley',years:'1842–1906',branch:'Canada'},
  {id:'james_wilford',name:'James Wilford Webb',years:'1886–1952',branch:'Webb'},
  {id:'james_wilford_ray',name:'James Wilford Ray',years:'1861–1920',branch:'Denmark / Mortensen'}
];

test('search ranks exact name and aliases ahead of guesses',async()=>{
  const s=await loadSearch();
  let r=s.search(people,'Dorothea',{limit:6});
  assert.equal(r.approximate,false);
  assert.equal(r.matches[0]?.person.id,'dorthea_jensen');
  assert.equal(r.matches[0]?.kind,'exact');
  r=s.search(people,'James Wilford Webb');
  assert.equal(r.matches[0]?.person.id,'james_wilford');
  assert.equal(r.matches[0]?.kind,'exact');
  r=s.search(people,'Denmark');
  assert.equal(r.approximate,false);
  assert.ok(r.matches.some(x=>x.person.id==='dorthea_jensen'));
});

test('suggestions recover minor typos and do not mutate people or evidence',async()=>{
  const s=await loadSearch();
  const original=JSON.stringify(people);
  for(const q of ['Dorothia','Dorothia Mortensen','Dorthee Jensen']){
    const r=s.search(people,q,{limit:6});
    assert.equal(r.approximate,true,'expected close-match suggestions for '+q);
    assert.equal(r.matches[0]?.person.id,'dorthea_jensen','wrong first suggestion for '+q);
    assert.equal(r.matches[0]?.kind,'close');
  }
  const transposed=s.search(people,'Jhon');
  assert.equal(transposed.matches[0]?.person.id,'john_peter');
  assert.equal(transposed.matches[0]?.kind,'close');
  assert.equal(JSON.stringify(people),original,'lookup must never edit genealogy');
});

test('short queries, dates and unrelated words never create speculative ancestors',async()=>{
  const s=await loadSearch();
  for(const q of ['Jh','Jon','1863','qqqqqqq','GibberishWithoutMatches']){
    const r=s.search(people,q);
    assert.equal(r.approximate,false,'unsafe approximate match for '+q);
    assert.equal(r.matches.length,0,'unrelated spelling yielded a person: '+q);
  }
  assert.equal(s.search(people,'').matches.length,0);
});

test('every Atlas search view loads or invokes the same read-only matcher',async()=>{
  const [main,hybrid,explorer,map,mapHtml]=await Promise.all([
    read('atlas-v3.9.63.html'),read('mobile-hybrid-navigation-20261117.js'),
    read('iphone-ancestry-explorer-preview.js'),read('atlas-2d-map.js'),
    read('atlas-2d-journey-preview.html')
  ]);
  assert.ok(main.includes('<script src="atlas-person-search.js?v='));
  assert.ok(mapHtml.includes('<script src="./atlas-person-search.js?v='));
  assert.equal((main.match(/AtlasPersonSearch\.search\(DATA\.nodes/g)||[]).length,2);
  for(const source of [hybrid,explorer,map])
    assert.ok(source.includes('AtlasPersonSearch.search('),'inconsistent search implementation');
  assert.ok(main.indexOf('<script src="atlas-person-search.js?v=')<main.indexOf('const DATA = '),'search library must load before main runtime');
  assert.ok(mapHtml.indexOf('atlas-person-search.js?v=')<mapHtml.indexOf('atlas-2d-map.js?v='));
  assert.ok(!/DATA\.nodes\.push\(|data\.edges\s*=/.test(hybrid+explorer+map),'search must not change ancestry relationships');
});
