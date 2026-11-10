import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const src=readFileSync(new URL('ann-eliza-wife-no19-supplement.js',root),'utf8');
const book=readFileSync(new URL('sources/ann-eliza-young/wife-no-19-1876-complete-original-ocr.txt',root),'utf8');
const synopsis=readFileSync(new URL('sources/ann-eliza-young/wife-no-19-1876-faithful-summary.md',root),'utf8');

test('the complete 1876 edition is stored as uncorrected public domain OCR',()=>{
 assert.ok(book.length>900000,'complete text required, not a short excerpt');
 assert.match(book,/public domain original-era printed book/i);
 assert.match(book,/OCR, NOT A PROOFREAD TRANSCRIPTION/i);
 assert.match(book,/we were married the 7th of April, 1869/i,'book text Chapter XXIX marriage date');
 assert.match(book,/married to him on the 6th of April, 1868/i,'book text Chapter XXXVII inconsistent marriage date');
 assert.ok(book.lastIndexOf('THE END.')>850000,'original has final chapter text');
});

test('the Ann Eliza page gets short overview and detailed collapsible reading supplement',()=>{
 const ann={id:'ann_eliza_webb',name:'Ann Eliza Webb',evidence:[]};
 const map=new Map([['ann_eliza_webb',ann]]);
 vm.runInNewContext(src,{window:{__ATLAS_NODE_BY_ID:map}},{filename:'ann-eliza-wife-no19-supplement.js',timeout:3000});
 assert.equal(ann.bookSupplement.sections.length,13);
 assert.ok(ann.bookSupplement.short.length>250&&ann.bookSupplement.short.length<900);
 assert.ok(ann.bookSupplement.sections.flatMap(s=>s.paragraphs).join(' ').split(/\s+/).length>2000);
 assert.equal(ann.bookSupplement.sections.at(-1).sourceChapter,null,'post-book afterword separate');
 for(const section of ann.bookSupplement.sections){assert.ok(section.paragraphs.length>=2);assert.ok(section.range)}
 assert.match(ann.bookSupplement.sections.find(s=>/disputed date/.test(s.title)).paragraphs.join(' '),/1869/);
 assert.match(ann.bookSupplement.sections.find(s=>/disputed date/.test(s.title)).paragraphs.join(' '),/1868/);
 assert.equal(ann.evidence.filter(e=>e.title==='Wife No. 19 — complete 1876 edition OCR text').length,1);
 assert.equal(ann.evidence.at(-1).sourceLevel,'original-ocr');
 assert.ok(html.includes('ann-eliza-wife-no19-supplement.js?v=20261109-a043'));
 assert.ok(html.includes('<details class="book-long-summary">'),'expansion must be on user selection');
 assert.ok(html.includes('Download complete original-era text (OCR)'));
 assert.match(synopsis,/How to read this:/);
 assert.match(synopsis,/Afterword — what happened after this 1876 narrative/);
});

test('An unrelated person is unchanged by the book-supplement script',()=>{
 const other={id:'james_webb_jr',evidence:[]};
 const map=new Map([['james_webb_jr',other]]);
 vm.runInNewContext(src,{window:{__ATLAS_NODE_BY_ID:map}},{filename:'ann-eliza-wife-no19-supplement.js',timeout:3000});
 assert.deepEqual(other,{id:'james_webb_jr',evidence:[]});
});

test('upstream Atlas family graph remains unchanged',()=>{
 const key='const DATA = ';const start=html.indexOf(key)+key.length;
 const d=JSON.parse(html.slice(start,html.indexOf(';\n',start)));
 assert.equal(d.nodes.length,109);
 assert.equal(d.edges.length,111);
 assert.equal(d.researchLinks.length,8);
 assert.equal(d.unions.length,4);
 assert.equal(d.nodes.find(n=>n.id==='ann_eliza_webb').historicalNotes.length,4);
});
