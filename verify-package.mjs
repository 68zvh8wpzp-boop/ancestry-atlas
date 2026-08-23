import { access, readFile } from 'node:fs/promises';

const manifest=JSON.parse(await readFile(new URL('./PACKAGE_ASSET_MANIFEST.json',import.meta.url),'utf8'));
const required=[...manifest.runtime,...manifest.approvedBiographyAssets,manifest.narration.approvedFile];
const results=[];
for(const file of required){
  try{await access(new URL(`./${file}`,import.meta.url));results.push({file,exists:true});}
  catch{results.push({file,exists:false});}
}
const missing=results.filter(item=>!item.exists);
console.log(JSON.stringify({packageVersion:manifest.packageVersion,inputPackage:manifest.inputPackage,checked:results.length,missing},null,2));
if(missing.length)process.exitCode=1;
