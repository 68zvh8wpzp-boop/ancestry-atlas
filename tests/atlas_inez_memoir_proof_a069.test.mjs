import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const js=readFileSync(new URL('../inez-mobile-memoir.js',import.meta.url),'utf8');

test('A069 Inez first-person original memoir governs nickname attribution',()=>{
  assert.match(js,/Tootie chose her given name, Inez Karen, after a friend named Inez Fish/);
  assert.match(js,/Her mother Grace gave her the nickname “Snookie”/);
  assert.doesNotMatch(js,/Tootie chose the name “Snookie”/);
});

test('A069 age-three source photo is circa 1949 with author caption, not about 1948',()=>{
  const row=js.split('\n').find(line=>line.includes("photo('image3.jpeg'"));
  assert.ok(row,'source family photo is retained');
  assert.match(row,/circa 1949/);
  assert.doesNotMatch(row,/about 1948/);
  assert.match(row,/Original adjacent memoir caption \(p\. 7\)/);
  assert.match(row,/Age 3 in a pink Crocheted dress my mom made for me/);
  assert.match(row,/Translation:/);
});

test('A069 approved original sibling/gallery identities and loader count unchanged',()=>{
 assert.match(js,/photo\('image4\.jpeg'/);
 assert.match(js,/photo\('image6\.jpeg'/);
 assert.equal(js.match(/const memoirPhotos = \[/g)?.length,1);
});
