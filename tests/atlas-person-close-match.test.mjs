import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import vm from 'node:vm';

const read = name => readFile(new URL('../'+name,import.meta.url),'utf8');
async function library(){
  const source=await read('atlas-person-search.js');
  const context={window:{},module:{exports:{}}};
  vm.runInNewContext(source,context,{filename:'atlas-person-search.js'});
  return context.window.AtlasPersonSearch;
}
const people=[
  {id:'dorthea_jensen',name:'Dorthea Jensen Mortensen',
   aliases:['Dorothea Jensen Mortensen','Dorthea Knudsen Jensen'],
   years:'1840–1916',branch:'Denmark / Jensen',place:'Lolland Denmark'},
  {id:'dora_jones',name:'Dora Jones',years:'1900–1970'},
  {id:'elsie_mortensen',name:'Elsie Margaret Mortensen Ray'},
  {id:'sarah_carling',name:'Sarah Carling Webb'}
];

test('exact, alternate, and bounded close spellings find the same mapped person',async()=>{
  const api=await library();
  for(const query of ['Dorthea','Dorothea','Dorothea Jensen',
      'Doretha','Dorthea Mortenson','Dorthea Jensn','Dorthea Knudsen Jensen']){
    const hits=api.search(people,query,8);
    assert.equal(hits[0]?.person.id,'dorthea_jensen','search: '+query);
  }
  assert.equal(api.search(people,'Dorothea',8)[0].label,'Alternative name');
  assert.equal(api.search(people,'Dorthea Jensn',8)[0].label,'Close spelling');
  assert.equal(api.search(people,'saraa',8)[0].person.id,'sarah_carling');
});

test('short or unrelated input does not create fictitious identities',async()=>{
  const api=await library();
  assert.equal(api.search(people,'zzzzzz',8).length,0);
  assert.equal(api.search(people,'do',8).map(x=>x.person.id).join(','),
    'dora_jones,dorthea_jensen');
  assert.equal(api.search(people,'1840')[0].person.id,'dorthea_jensen');
  assert.equal(api.search(people,'sarah')[0].person.id,'sarah_carling');
  assert.ok(api.search(people,'dorothea')[0].person.id!=='dora_jones');
});

test('3D, iPhone People, expandable Explorer and 2D all use one matcher',async()=>{
  const [main,mobile,explorer,map,html,snapshot]=await Promise.all([
    read('atlas-v3.9.63.html'),read('mobile-hybrid-navigation-20261117.js'),
    read('iphone-ancestry-explorer-preview.js'),read('atlas-2d-map.js'),
    read('atlas-2d-journey-preview.html'),read('atlas-2d-pedigree-snapshot.js')
  ]);
  assert.ok(main.includes('<script src="atlas-person-search.js?v='));
  assert.ok(main.indexOf('atlas-person-search.js?v=')<main.indexOf('const DATA = '));
  assert.ok((main.match(/window.AtlasPersonSearch.search\(DATA.nodes/g)||[]).length>=2);
  assert.ok(mobile.includes('window.AtlasPersonSearch.match(n,q)'));
  assert.ok(explorer.includes('window.AtlasPersonSearch.search(data.nodes,term,55)'));
  assert.ok(map.includes('window.AtlasPersonSearch.search(data.nodes,query,60)'));
  assert.ok(html.indexOf('atlas-person-search.js?v=')<html.indexOf('atlas-2d-map.js?v='));
  assert.ok(main.includes('"aliases":["Dorothea Jensen Mortensen","Dorthea Knudsen Jensen"]'));
  assert.ok(snapshot.includes('"aliases":["Dorothea Jensen Mortensen","Dorthea Knudsen Jensen"]'));
  for(const [name,source] of [['mobile',mobile],['explorer',explorer],['2d-map',map]]){
    assert.doesNotThrow(()=>new vm.Script(source),name+' syntax');
  }
  const inline=[...main.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
  inline.forEach((m,i)=>{if(m[1].trim())assert.doesNotThrow(()=>new vm.Script(m[1]),'inline block '+i);});
});

test('identity and parent-child edges are unchanged by search metadata',async()=>{
  const main=await read('atlas-v3.9.63.html');
  const marker='const DATA = ';
  const start=main.indexOf(marker)+marker.length;
  const end=main.indexOf(';\n',start);
  const data=JSON.parse(main.slice(start,end));
  const person=data.nodes.find(n=>n.id==='dorthea_jensen');
  assert.equal(person.name,'Dorthea Jensen Mortensen');
  assert.ok(data.edges.some(e=>e.a==='elsie_mortensen'&&e.b==='dorthea_jensen'));
  assert.ok(data.edges.some(e=>e.a==='dorthea_jensen'&&e.b==='knud_jensen_brygger'));
  assert.ok(data.edges.some(e=>e.a==='dorthea_jensen'&&e.b==='bodil_olesdatter'));
  assert.equal(data.nodes.filter(n=>n.id==='dorthea_jensen').length,1);
});
