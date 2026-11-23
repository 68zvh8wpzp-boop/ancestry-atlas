import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import vm from 'node:vm';

const read = name => readFile(new URL('../' + name, import.meta.url), 'utf8');

test('mobile navigator code parses and contains reversible people/family/tree paths', async () => {
  const js = await read('mobile-hybrid-navigation-20261117.js');
  assert.doesNotThrow(() => new vm.Script(js, {filename:'mobile-hybrid-navigation-20261117.js'}));
  for(const key of ['function routeTo(', 'function renderPeopleResults(', 'function renderFamily(',
                    'function openClassic(', 'function openProfile(', 'data-mh-tab="tree"']){
    assert.ok(js.includes(key), 'missing navigation contract: ' + key);
  }
  assert.ok(!js.includes('DATA.nodes.push('), 'navigator must not rewrite lineage');
});

test('v3.9.63 preserves legacy source assets while four-door navigation runs by default', async () => {
  const [html,css] = await Promise.all([
    read('atlas-v3.9.63.html'), read('mobile-hybrid-navigation-20261117.css')
  ]);
  for(const element of ['id="mobileTreeDock"', 'id="card"', 'id="mobilePersonSearchInput"']){
    assert.ok(html.includes(element), 'missing legacy UI ' + element);
  }
  assert.ok(html.includes('window.__ATLAS_DATA = DATA'), 'genealogy data accessor missing');
  // Four-door navigation is now the published entry; the hybrid files are
  // retained for historical rollback, but must not run alongside it.
  assert.ok(html.includes('atlas-four-doors-20261123.js'));
  assert.ok(html.includes('atlas-four-doors-20261123.css'));
  assert.ok(!html.includes('<script src="mobile-hybrid-navigation-20261117.js'));
  assert.ok(!html.includes('<link rel="stylesheet" href="mobile-hybrid-navigation-20261117.css'));
  assert.ok(css.includes('#mobileHybridNav[hidden]') && css.includes('@media(max-width:800px)'));
  const blocks = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
  for(const [i, match] of blocks.entries()){
    if(match[1].trim())assert.doesNotThrow(()=>new vm.Script(match[1]), 'inline script parse error in block ' + i);
  }
});

test('home/PWA entry points are consistent and the older iPhone shortcut is bridged', async () => {
  const [entry,manifest,old] = await Promise.all([
    read('index.html'), read('manifest.webmanifest'), read('atlas-v3.9.62.html')
  ]);
  const manifestStart = JSON.parse(manifest).start_url;
  const entryName = entry.match(/var target = '\.\/(atlas-v[\d.]+\.html)/)?.[1];
  assert.ok(entryName, 'index.html must name the current Atlas file');
  assert.ok(manifestStart.includes(entryName), 'PWA start URL must match index.html');
  await read(entryName);
  assert.ok(old.includes('atlas-v3.9.63.html') && old.includes('legacy'), 'older mobile shortcut needs opt-out redirect');
});
