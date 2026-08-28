import {access, readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const branchDir=path.join(root,'biographies','webb-branch');
const production=JSON.parse(await readFile(path.join(branchDir,'branch-production-manifest.json'),'utf8'));
const sources=JSON.parse(await readFile(path.join(branchDir,'sources.json'),'utf8'));
const register=JSON.parse(await readFile(path.join(branchDir,'research-register.json'),'utf8'));
const frontiers=JSON.parse(await readFile(path.join(root,'biographies','research-frontiers.json'),'utf8'));
const atlasHtml=await readFile(path.join(root,'index.html'),'utf8');
const failures=[];
const sourceIds=new Set(sources.sources.map(source=>source.sourceId));

for(const claim of register.claims){
  if(!claim.sourceRefs.length) failures.push({kind:'claim-without-source',claimId:claim.claimId});
  for(const sourceId of claim.sourceRefs){
    if(!sourceIds.has(sourceId)) failures.push({kind:'unknown-claim-source',claimId:claim.claimId,sourceId});
  }
}

for(const person of production.people){
  const dir=path.join(branchDir,person.artifactDirectory);
  const manifestPath=path.join(dir,'biography-manifest.json');
  const scenesPath=path.join(dir,'scene-manifest.json');
  try{await access(manifestPath);await access(scenesPath)}catch{
    failures.push({kind:'person-artifact-missing',personId:person.personId});
    continue;
  }
  const manifest=JSON.parse(await readFile(manifestPath,'utf8'));
  const scenes=JSON.parse(await readFile(scenesPath,'utf8'));
  const narration=(await readFile(path.join(dir,manifest.narrationTextFile),'utf8')).trim();
  if(manifest.personId!==person.personId||scenes.personId!==person.personId) failures.push({kind:'person-id-mismatch',personId:person.personId});
  if(narration.length<1800||narration.length>3000) failures.push({kind:'narration-length-outside-project-contract',personId:person.personId,length:narration.length});
  if(manifest.status==='approved-script-awaiting-audio'){
    if(/\b(?:the|this) atlas\b/i.test(narration)) failures.push({kind:'approved-narration-contains-product-commentary',personId:person.personId});
    if(manifest.narrationCharacterCount!==narration.length) failures.push({kind:'approved-narration-character-count-drift',personId:person.personId,manifestCount:manifest.narrationCharacterCount,actualCount:narration.length});
  }
  if(!scenes.scenes?.length) failures.push({kind:'scene-draft-empty',personId:person.personId});
  if(manifest.audio!==null) failures.push({kind:'unapproved-audio-present',personId:person.personId});
  if(person.personId==='jonathan_henry'){
    if(/Colonia Morelos,\s*Chihuahua/i.test(narration)) failures.push({kind:'colonia-morelos-wrong-state',personId:person.personId});
    const routeScene=scenes.scenes?.find(scene=>scene.id==='jonathan-04-revolution');
    if(routeScene?.approvalStatus==='approved'){
      if(!/Colonia Morelos, Sonora/.test(routeScene.place||'')) failures.push({kind:'approved-route-map-missing-sonora',sceneId:routeScene.id});
      if(!/route and date unresolved/i.test(`${routeScene.place||''} ${routeScene.assetBrief||''}`)) failures.push({kind:'approved-route-map-lost-uncertainty',sceneId:routeScene.id});
    }
  }
  if(person.personId==='edward_milo_jr'){
    const familyScene=scenes.scenes?.find(scene=>scene.id==='emj-06-family');
    if(familyScene?.approvalStatus==='approved'&&familyScene.releaseGate!=='commercial-clearance-or-replacement'){
      failures.push({kind:'uncleared-family-photo-lost-commercial-gate',sceneId:familyScene.id});
    }
    const rights=JSON.parse(await readFile(path.join(dir,manifest.rightsManifest),'utf8'));
    const familyAsset=rights.assets?.find(asset=>asset.file===familyScene?.asset);
    if(familyScene?.approvalStatus==='approved'&&familyAsset?.commercialStatus!=='blocked-pending-clearance'){
      failures.push({kind:'uncleared-family-photo-not-commercially-blocked',sceneId:familyScene.id});
    }
    const deathScene=scenes.scenes?.find(scene=>scene.id==='emj-07-evidence');
    if(deathScene?.approvalStatus==='approved'){
      const evidenceText=`${deathScene.assetBrief||''} ${narration}`;
      if(!/1921[^.]{0,80}strongly supported/i.test(evidenceText)) failures.push({kind:'death-evidence-lost-1921-weight',sceneId:deathScene.id});
      if(!/1924[^.]{0,80}anomal/i.test(evidenceText)) failures.push({kind:'death-evidence-lost-1924-anomaly',sceneId:deathScene.id});
    }
    const routeScene=scenes.scenes?.find(scene=>scene.id==='emj-08-route');
    if(routeScene?.approvalStatus==='approved'){
      const routeText=`${routeScene.assetBrief||''}`;
      if(!/broad[^.]{0,80}corridor/i.test(routeText)||!/not an exact daily track/i.test(routeText)) failures.push({kind:'edward-route-lost-approximation-boundary',sceneId:routeScene.id});
      if(!/without claiming the roads/i.test(routeText)) failures.push({kind:'edward-route-invents-roads',sceneId:routeScene.id});
    }
  }
  if(person.personId==='edward_milo_sr'){
    const hanoverScene=scenes.scenes?.find(scene=>scene.id==='ems-01-hanover');
    if(hanoverScene?.approvalStatus==='approved'){
      const locatorText=hanoverScene.assetBrief||'';
      if(!/on land/i.test(locatorText)) failures.push({kind:'hanover-locator-lost-land-constraint',sceneId:hanoverScene.id});
      if(!/exact birth site/i.test(locatorText)) failures.push({kind:'hanover-locator-overclaims-site',sceneId:hanoverScene.id});
    }
    const marriageScene=scenes.scenes?.find(scene=>scene.id==='ems-02-marriage');
    if(marriageScene?.approvalStatus==='approved'){
      const marriageText=`${marriageScene.assetBrief||''} ${marriageScene.place||''}`;
      if(!/no connecting line/i.test(marriageText)) failures.push({kind:'marriage-context-invents-route',sceneId:marriageScene.id});
      if(!/exact route/i.test(marriageText)||!/marriage place/i.test(marriageText)) failures.push({kind:'marriage-context-lost-uncertainty',sceneId:marriageScene.id});
    }
    const nauvooScene=scenes.scenes?.find(scene=>scene.id==='ems-03-nauvoo');
    if(nauvooScene?.approvalStatus==='approved'){
      const nauvooText=nauvooScene.assetBrief||'';
      if(!/circa 1846/i.test(nauvooText)) failures.push({kind:'nauvoo-image-lost-circa-date',sceneId:nauvooScene.id});
      if(!/authorship is not definitive/i.test(nauvooText)) failures.push({kind:'nauvoo-image-overstates-authorship',sceneId:nauvooScene.id});
      if(!/no visible person is identified as Edward/i.test(nauvooText)) failures.push({kind:'nauvoo-image-invents-edward-likeness',sceneId:nauvooScene.id});
    }
    const movingScene=scenes.scenes?.find(scene=>scene.id==='ems-04-missouri');
    if(movingScene?.approvalStatus==='approved'){
      const movingText=movingScene.assetBrief||'';
      if(!/1867 painting/i.test(movingText)||!/historical rendering/i.test(movingText)) failures.push({kind:'moving-visual-misstates-period',sceneId:movingScene.id});
      if(!/not an eyewitness Webb scene/i.test(movingText)) failures.push({kind:'moving-visual-invents-webb-scene',sceneId:movingScene.id});
      if(!/supporting evidence rather than the narrative visual/i.test(movingText)) failures.push({kind:'moving-map-not-demoted',sceneId:movingScene.id});
    }
  }
  for(const scene of scenes.scenes||[]){
    if(['approved','approved-reuse'].includes(scene.approvalStatus)){
      if(!scene.asset){
        failures.push({kind:'approved-scene-without-asset',personId:person.personId,sceneId:scene.id});
      }else{
        try{await access(path.resolve(dir,scene.asset))}catch{
          failures.push({kind:'approved-scene-asset-missing',personId:person.personId,sceneId:scene.id,asset:scene.asset});
        }
      }
    }
  }
  for(const sourceId of manifest.sourceRefs||[]){
    if(!sourceIds.has(sourceId)) failures.push({kind:'unknown-biography-source',personId:person.personId,sourceId});
  }
}

const frontier=production.people.find(person=>person.personId==='james_webb_jr');
if(frontier?.role!=='proof-frontier-biography') failures.push({kind:'proof-frontier-role-missing'});

if(frontiers.presentation?.entryMode!=='explicit-opt-in-after-supported-tour') failures.push({kind:'research-frontier-not-explicit-opt-in'});
for(const branchId of ['webb','canada']){
  const branch=frontiers.frontiers?.find(item=>item.branchId===branchId);
  if(!branch) failures.push({kind:'research-frontier-branch-missing',branchId});
  for(const pathItem of branch?.candidatePaths||[]){
    for(const nodeId of pathItem.nodeIds||[]){
      if(!atlasHtml.includes(`"id":"${nodeId}"`)) failures.push({kind:'research-frontier-node-missing-from-canonical-graph',branchId,nodeId});
    }
  }
}

console.log(JSON.stringify({
  branch:production.branchId,
  people:production.people.length,
  normalizedSources:sources.sources.length,
  claims:register.claims.length,
  failures
},null,2));
if(failures.length) process.exitCode=1;
