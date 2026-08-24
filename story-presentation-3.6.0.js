/* Ancestry Atlas v3.6.0 — presentation-only story adapter. */
(()=>{
  'use strict';
  const body=document.body;
  const title=document.getElementById('storyTitle');
  const person=document.getElementById('storyPerson');
  const locator=document.getElementById('storyLocatorLabel');
  const storyTop=title?.parentElement;
  let year=document.getElementById('storySceneYear');
  if(storyTop&&!year){year=document.createElement('div');year.id='storySceneYear';year.className='story-scene-year';storyTop.appendChild(year)}
  function locatorParts(){
    const current=locator?.textContent||'';
    if(current.includes('•'))locator.dataset.fullLocator=current;
    const full=locator?.dataset.fullLocator||current;
    const parts=full.split('•');
    return{region:(parts[0]||'').trim(),year:(parts.length>1?parts[parts.length-1]:'').trim()};
  }
  function sync(){
    const open=body.classList.contains('tour-story-open');
    body.classList.toggle('story-presentation-v360',open);
    if(!open)return;
    const place=locatorParts();
    if(title&&person?.textContent)title.textContent=person.textContent;
    if(year)year.textContent=place.year;
    if(locator&&locator.textContent!==place.region)locator.textContent=place.region;
  }
  const observer=new MutationObserver(sync);
  observer.observe(body,{attributes:true,attributeFilter:['class']});
  if(person)observer.observe(person,{childList:true,characterData:true,subtree:true});
  if(locator)observer.observe(locator,{childList:true,characterData:true,subtree:true});
  sync();
  document.addEventListener('click',event=>{if(!event.target.closest('#tvStartMode,#tvInstructionsStart,#tourWatchHere,#storyPlayPause'))return;if(!window.matchMedia('(display-mode: standalone)').matches)return;const lock=screen.orientation?.lock;if(typeof lock==='function')lock.call(screen.orientation,'landscape').catch(()=>{})});
})();
