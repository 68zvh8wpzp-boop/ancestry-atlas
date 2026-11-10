import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';

const root=new URL('../',import.meta.url);
const source=readFileSync(new URL('atlas-evidence-sync-2026-10-03-fulltext-v9.js',root),'utf8');
const charles=readFileSync(new URL('charles-albert-mobile-biography.js',root),'utf8');
const asset='assets/charles-albert/charles-family-1942.jpg';

test('A044: the 1942 family photograph already exists in Charles evidence',()=>{
  assert.ok(statSync(new URL(asset,root)).size>100000,'a preserved local image exists');
  assert.ok(charles.includes('"full": "'+asset+'"'),'Charles entry uses this file');
  assert.ok(charles.includes('FamilySearch1020022.jpg'),'existing source metadata identifies the same contributor file');
  assert.ok(charles.includes('Sandpoint Idaho 1942'),'existing transcription provides place and year');
});

test('A044: five named child pages reuse existing photo rather than unavailable preview',()=>{
  const blocks=[...source.matchAll(/\{\s*kind: 'photo',\s*title: 'Charles Albert and Marian Brenay Family',[\s\S]*?previewStatus: 'readable'/g)].map(m=>m[0]);
  assert.equal(blocks.length,5,'Virginia, Esther, Joan, Martha and Ammon should each link the SAME file');
  const personIds=['KWZ6-H5P','KWZ7-CRV','LFCL-G8L','KWC1-XFC','KWZX-HGG'];
  for(let i=0;i<blocks.length;i++){
    assert.ok(blocks[i].includes("thumb: '"+asset+"'"));
    assert.ok(blocks[i].includes("full: '"+asset+"'"));
    assert.ok(blocks[i].includes('1020022.jpg'));
    assert.ok(blocks[i].includes(personIds[i]));
  }
  assert.equal((source.match(/title: 'Charles Albert and Marian Brenay Family'/g)||[]).length,5);
});

test('A044: no false assertion that Marian is identified within the caption',()=>{
  assert.ok(!source.includes('other siblings gathered around Charles and Marian.'));
});

test('A044: direct ancestor Marion also sees the same surviving 1942 photo',()=>{
  const marion=readFileSync(new URL('marion-atlas-update-2026-09-29.js',root),'utf8');
  assert.ok(marion.includes("title: '1942 Brenay siblings and father at Sandpoint'"));
  assert.ok(marion.includes("full: '"+asset+"'"));
  assert.ok(marion.includes('FamilySearch 1020022.jpg'));
  assert.ok(marion.includes('Marian (mother) is not separately named'));
});
