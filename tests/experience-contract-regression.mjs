import fs from 'node:fs';

const read=path=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const tour=read('atlas-tour-3.6.0.js');
const css=read('experience-3.8.1.css');
const content=read('atlas-content.js');
const overlays=read('story-overlays-3.8.1.js');
const failures=[];
const requireText=(text,needle,label)=>{if(!text.includes(needle))failures.push(label)};
const forbidText=(text,needle,label)=>{if(text.includes(needle))failures.push(label)};

requireText(tour,'let ids=setBranchOnly(track)','tour entrance must use the selected branch track');
requireText(tour,'fitMobileBranch(ids,focusId)','phone branch must be fitted to the measured viewport');
forbidText(tour,'AncestryMobileTreeInternal.neighborhood(focusId,7)','tour must not replace a branch with a generic family neighborhood');
requireText(tour,"const returnId=currentStep()?.id",'biography exit must privilege the biography subject');
requireText(css,'body.aa-phone.tour-active #proofNotice{display:none!important}','orientation must not be obscured by the evidence notice');
requireText(css,"bottom:var(--aa-edge-bottom)!important;\n  width:42vw!important",'flag and map must remain visible in the lower utility rail');
forbidText(css,"content:'Map + flag'",'geography must not collapse into an improvised pill');
requireText(content,"mapKey:'arizona-mesa-regional'",'opening scene must use regional Mesa context');
requireText(content,"mapKey:'mesa-to-st-johns'",'second scene must show the supported Mesa to St. Johns movement');
requireText(overlays,"'arizona-mesa-regional':{base:'southwest'",'regional Southwest map definition must exist');

console.log(JSON.stringify({failures},null,2));
if(failures.length)process.exitCode=1;
