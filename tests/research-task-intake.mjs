import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {assessTask} from '../research-task-intake.mjs';

const d=JSON.parse(readFileSync(new URL('../RESEARCH_SOURCE_REGISTRY.json',import.meta.url),'utf8'));
const check=(args,decision,phrase)=>{
 const outcome=assessTask(d,args);
 assert.equal(outcome.decision,decision,JSON.stringify(outcome));
 assert(outcome.reason.includes(phrase),JSON.stringify(outcome));
};
check({recordId:'alpena-godfrey-naturalization-1917-1921',owner:'chat',action:'inspect-original'},'BLOCK','already inspected');
check({recordId:'marian-skinner-1903-birth',owner:'chat',action:'inspect-original'},'BLOCK','parallel work');
check({recordId:'marian-skinner-1903-birth',owner:'work',action:'inspect-original'},'CONTINUE_EXISTING','marian-1903-birth-original');
check({recordId:'unknown-original',owner:'chat',action:'inspect-original'},'HOLD','No unique registered source');
check({sourceKey:'alpena:certificate:1382499',owner:'chat',action:'find-record'},'BLOCK','already inspected');
check({recordId:'alpena-godfrey-naturalization-1917-1921',owner:'chat',action:'targeted-reexamination'},'HOLD','no assigned active task');
console.log('Research task intake: 6 stop/ownership/continuation tests passed');
