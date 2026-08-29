(()=>{
'use strict';
const $=id=>document.getElementById(id);
const modal=$('researchFrontierModal');
const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const byId=id=>(typeof nodeById!=='undefined'?nodeById.get(id):null);
let active=null;

function stageTone(status=''){
  if(status.includes('frontier'))return {label:'Research frontier',color:'#ff7f96'};
  if(status.includes('provisional')||status.includes('mixed'))return {label:'Candidate chain',color:'#f0c76b'};
  return {label:'Supported endpoint',color:'#70a8ff'};
}
function personLine(ids=[]){
  return ids.map(id=>byId(id)).filter(Boolean);
}
function stageMarkup(pathItem,index){
  const people=personLine(pathItem.nodeIds);
  const tone=stageTone(pathItem.status);
  const names=people.map(person=>person.name).join(' · ');
  const years=people.map(person=>person.years).filter(Boolean).join(' · ');
  return `<article class="research-frontier-stage" style="--frontier-color:${tone.color}"><div class="research-frontier-stage-label">${escape(tone.label)} ${index+1}</div><div class="research-frontier-people">${escape(names)}</div><div class="research-frontier-years">${escape(years)}</div><p>${escape(pathItem.warning)}</p></article>`;
}
function list(items=[]){return `<ul>${items.map(item=>`<li>${escape(item)}</li>`).join('')}</ul>`}
function open(branchId='webb'){
  const data=globalThis.RESEARCH_FRONTIERS;
  const frontier=data?.frontiers?.find(item=>item.branchId===branchId);
  if(!modal||!frontier)return false;
  active=frontier;
  const endpoint=byId(frontier.supportedEndpoint);
  $('researchFrontierTitle').textContent=frontier.title;
  $('researchFrontierSummary').textContent=frontier.summary;
  $('researchFrontierHero').style.backgroundImage=frontier.heroAsset?`url("${frontier.heroAsset}")`:'';
  $('researchFrontierHero').setAttribute('aria-label',frontier.heroAlt||frontier.title);
  $('researchFrontierBroken').textContent=`Broken proof link: ${frontier.brokenProofLink}. This continuation is a research theory, not an established pedigree.`;
  const endpointMarkup=`<article class="research-frontier-stage supported"><div class="research-frontier-stage-label">Supported endpoint</div><div class="research-frontier-people">${escape(endpoint?.name||frontier.supportedEndpoint)}</div><div class="research-frontier-years">${escape(endpoint?.years||'')}</div><p>The ordinary guided Webb story ends here.</p></article>`;
  $('researchFrontierChain').innerHTML=endpointMarkup+(frontier.candidatePaths||[]).map(stageMarkup).join('');
  $('researchFrontierFor').innerHTML=list(frontier.evidenceFor);
  $('researchFrontierLimits').innerHTML=list(frontier.limitsAndConflicts);
  $('researchFrontierNext').textContent=frontier.nextProof;
  $('researchFrontierRecords').innerHTML=(frontier.recordsNeeded||[]).map(item=>`<li>${escape(item)}</li>`).join('');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('research-frontier-open');
  $('researchFrontierClose')?.focus();
  return true;
}
function close(){
  if(!modal?.classList.contains('open'))return;
  const endpoint=active?.supportedEndpoint||null;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('research-frontier-open');
  active=null;
  document.dispatchEvent(new CustomEvent('ancestryatlas:frontierclose',{detail:{supportedEndpoint:endpoint}}));
}
$('researchFrontierClose')?.addEventListener('click',close);
$('researchFrontierReturn')?.addEventListener('click',close);
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modal?.classList.contains('open')){event.preventDefault();event.stopImmediatePropagation();close()}},true);
globalThis.AncestryResearchFrontier={open,close,get active(){return active}};
})();
