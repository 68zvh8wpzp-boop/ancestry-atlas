import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import vm from 'node:vm';

const read = name => readFile(new URL('../' + name, import.meta.url), 'utf8');
const normalize = value => String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();

test('Dorthea remains a mapped direct ancestor and Dorothea is a supported alias', async () => {
  const [html, snapshotCode] = await Promise.all([
    read('atlas-v3.9.63.html'),
    read('atlas-2d-pedigree-snapshot.js')
  ]);
  const start = html.indexOf('const DATA = ');
  const end = html.indexOf(';\n', start);
  assert.ok(start >= 0 && end > start, 'Atlas person data must be embedded');
  const data = JSON.parse(html.slice(start + 'const DATA = '.length, end));
  const node = data.nodes.find(n => n.id === 'dorthea_jensen');
  assert.equal(node?.name, 'Dorthea Jensen Mortensen');
  assert.ok(node.aliases.some(a => normalize(a).includes('dorothea')));
  for (const query of ['Dorthea', 'Dorothea', 'Dorothea Mortensen', 'Dorothea Jensen']) {
    const haystack = normalize([node.name,node.years,node.place,node.branch,node.aliases,node.alternateNames].join(' '));
    assert.ok(haystack.includes(normalize(query)), 'unsearchable spelling: ' + query);
  }
  const edges = new Set(data.edges.map(e=>e.a + '>' + e.b));
  for (const pair of [
    'you>james_sheldon',
    'james_sheldon>james_wilford',
    'james_wilford>della_ray',
    'della_ray>elsie_mortensen',
    'elsie_mortensen>dorthea_jensen'
  ]) assert.ok(edges.has(pair), 'lost direct-ancestor link: ' + pair);
  const sandbox = {window:{}};
  vm.runInNewContext(snapshotCode, sandbox);
  const copy = sandbox.window.ATLAS_2D_PEDIGREE.nodes.find(n=>n.id==='dorthea_jensen');
  assert.ok(copy,'Dorthea missing from 2D snapshot');
  assert.deepEqual(Array.from(copy.aliases), Array.from(node.aliases),'2D snapshot aliases must mirror primary record');
});

test('all actively linked search views consider alternate spellings', async () => {
  const [html,map,hybrid,explorer] = await Promise.all([
    read('atlas-v3.9.63.html'),
    read('atlas-2d-map.js'),
    read('mobile-hybrid-navigation-20261117.js'),
    read('iphone-ancestry-explorer-preview.js')
  ]);
  assert.equal((html.match(/const hits=DATA\.nodes\.filter/g)||[]).length,2,'desktop and mobile search must be present');
  assert.equal((html.match(/n\.aliases,n\.alternateNames/g)||[]).length,2,'both 3D search boxes must include aliases');
  assert.ok(map.includes('n.aliases,n.alternateNames'), '2D map must search aliases');
  assert.ok(hybrid.includes('n.aliases,n.alternateNames'), 'mobile family browser must search aliases');
  assert.ok(explorer.includes('n.aliases,n.alternateNames'), 'iPhone explorer must search aliases');
});
