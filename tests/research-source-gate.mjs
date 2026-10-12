import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validate} from '../research-source-gate.mjs';

const baseline=JSON.parse(readFileSync(new URL('../RESEARCH_SOURCE_REGISTRY.json',import.meta.url),'utf8'));
const clone=()=>structuredClone(baseline);
const expectRejection=(name,mutate,phrase)=>{
 const test=clone();mutate(test);
 const violations=validate(test);
 assert(violations.some(v=>v.includes(phrase)),name+': expected "'+phrase+'", received '+JSON.stringify(violations));
};
assert.deepEqual(validate(baseline,{checkPaths:true}),[],'registered baseline evidence and file paths should pass');

expectRejection('Godfrey naturalization already examined',d=>d.tasks.push({
 id:'duplicate-godfrey',recordId:'alpena-godfrey-naturalization-1917-1921',
 owner:'chat',action:'inspect-original',
 novelty:'Retrieve the previously examined original Godfrey naturalization petition',state:'queued'
}),'Already inspected');

expectRejection('Rename cannot bypass duplicate',d=>d.tasks.push({
 id:'bypass-godfrey',recordId:'alpena-godfrey-naturalization-1917-1921',
 owner:'chat',action:'find-record',novelty:'Find the already published naturalization document',state:'queued'
}),'Already inspected');

expectRejection('Unknown task action cannot bypass',d=>d.tasks.push({
 id:'unknown-action',recordId:'alpena-godfrey-naturalization-1917-1921',
 owner:'chat',action:'something-new',novelty:'Fetch the already examined original again',state:'queued'
}),'Unknown/bypass task action');

expectRejection('Parallel Work overlap',d=>d.tasks.push({
 id:'cross-session-overlap',recordId:'marian-skinner-1903-birth',
 owner:'chat',action:'inspect-original',
 novelty:'Examine the parentage details in the original register',state:'active'
}),'Concurrent research ownership conflict');

expectRejection('Duplicate archival identifier',d=>d.records.push({...d.records[0],id:'duplicate-with-new-title'}),
 'Duplicate source key');

expectRejection('Unregistered record',d=>d.tasks.push({
 id:'unknown-task',recordId:'not-a-record',owner:'chat',action:'inspect-original',
 novelty:'Read unknown original and collect full source evidence',state:'queued'
}),'Unknown record');

expectRejection('Unqualified evidence path',d=>{d.records[0].evidence='research-notes.md';},
 'Invalid evidence pointer');

expectRejection('Missing original file',d=>{d.records[0].originalRefs=[];},
 'Saved/published original has no retrievable originalRefs');

expectRejection('Malformed source key',d=>{d.records[0].sourceKeys=['vague-label'];},
 'Malformed source key');

expectRejection('False original locator',d=>{d.records.find(r=>r.id==='marian-skinner-1903-birth').sourceKeys=['fake-record:1'];},
 'Unlocated target incorrectly represented as original');

expectRejection('Unjustified targeted repeat',d=>d.tasks.push({
 id:'repeat-exception',recordId:'alpena-godfrey-naturalization-1917-1921',
 owner:'chat',action:'targeted-reexamination',
 novelty:'Look again at an original that is already in the Atlas',state:'queued'
}),'Targeted re-examination lacks specific reason');

expectRejection('Do not claim exhaustive inventory',d=>{delete d.coverage;},
 'Missing/invalid coverage declaration');

console.log('Research source gate: verified baseline and 12 negative regressions');
