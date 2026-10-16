/* Additive, source-scoped birth/death endpoints recovered from existing Atlas biographies.
   Do not infer death place from a burial location, or a city from a state-level report. */
(()=>{
'use strict';
const data=window.ANCESTRY_GLOBE_DATA;
if(!data||!Array.isArray(data.places))return;
const event=(personId,name,branch,type,when,qualifier,evidence)=>({personId,name,branch,type,when,qualifier,evidence});
const additions=[
 {id:'hubbard_lake_mi',name:'Hubbard Lake, Michigan, USA',lng:-83.54442,lat:44.75973,precision:'locality',events:[
 event('john_peter','John Peter Gooley','canada','died','6 June 1910','Hubbard Lake, Michigan','Approved John Peter Gooley biography; Michigan death certificate discussed in Atlas person sources')]},
 {id:'ontario_birth_region',name:'Ontario, Canada',lng:-80.25,lat:44.5,precision:'province approximate',representativePin:true,locationStatus:'provisional',regionNote:'Mary Ann Dennis was born in Ontario; exact town is not documented. Pin is a representative province point, not a birthplace address.',events:[
 event('mary_ann','Mary Ann Dennis','canada','born','15 August 1844','Province only · exact Ontario locality unknown','Approved Mary Ann Dennis biography; original specific birthtown unresolved')]},
 {id:'phoenix_az',name:'Phoenix, Arizona, USA',lng:-112.074,lat:33.4484,precision:'city',events:[
 event('charles_albert','Charles Albert Brenay','canada','died','3 December 1983','Phoenix death; Mesa burial is a separate event and must not replace death place','Approved Charles Albert Brenay biography and burial evidence')]},
 {id:'auburn_bay_mi',name:'Auburn, Michigan, USA',lng:-84.0757,lat:43.6022,precision:'city',events:[
 event('charles_godfrey','Charles Godfrey / Gottfried Brenay (Brunne)','canada','died','21 October 1942','Auburn, Bay County; usual residence Bentley','Approved Charles Godfrey biography; Michigan death certificate')]},
 {id:'garfield_bay_mi',name:'Garfield Township, Bay County, Michigan, USA',lng:-84.09696,lat:43.77802,precision:'township approximate',representativePin:true,events:[
 event('ida_mae','Ida Mae Gooley','canada','died','4 June 1932','Township placement; street location unknown','Approved Ida Mae biography; death index KF4R-3T5 names Garfield, Bay County')]},
 {id:'santan_pinal_az',name:'Santan, Arizona, USA',lng:-111.7993,lat:33.17589,precision:'locality',events:[
 event('marion_brenay','Marion Beulah Brenay','canada','died','13 January 2012','Santan, Pinal County; buried in Vernon, a different location','Approved Marion Brenay autobiography and Atlas biography')]},
 {id:'crystal_oceana_mi',name:'Crystal Township, Oceana County, Michigan, USA',lng:-86.2183,lat:43.7736,precision:'township approximate',representativePin:true,events:[
 event('jessie_irene_aurin','Jessie Irene Aurin / Aurian','canada','born','25 October 1879','Crystal Township; representative township point','Approved Jessie Aurin biography; 1879 original Michigan birth return')]},
 {id:'spratt_alpena_mi',name:'Spratt, Alpena County, Michigan, USA',lng:-83.74804,lat:45.00862,precision:'hamlet',events:[
 event('jessie_irene_aurin','Jessie Irene Aurin / Aurian','canada','died','5 March 1956','Spratt hamlet; Spratt Cemetery is burial location','Approved Jessie Aurin biography and March 1956 obituary/headstone research')]},
 {id:'missouri_state_death',name:'Missouri, USA',lng:-92.5,lat:38.5,precision:'state approximate',representativePin:true,locationStatus:'provisional',regionNote:'Only Missouri as a state is reported for Russell Hill death, not Richmond or any other exact town. Point is not an exact death site.',events:[
 event('russell_hill','Colonel Russell Hill','hill','died','1899 (reported)','Missouri only · exact death locality and year need primary confirmation','Approved Russell Hill biography: remembered to have died in Missouri in 1899; burial at Richmond is not evidence of death city')]}
];
function mergePlace(place){
 const old=data.places.find(p=>p.id===place.id);
 if(!old){data.places.push(place);return;}
 for(const e of place.events||[]){
  if(!old.events.some(x=>x.personId===e.personId&&x.type===e.type))old.events.push(e);
 }
}
for(const place of additions)mergePlace(place);
const germany=data.places.find(p=>p.id==='region_germany');
if(germany&&!germany.events.some(e=>e.personId==='charles_godfrey'&&e.type==='born')){
 germany.events.push(event('charles_godfrey','Charles Godfrey / Gottfried Brenay (Brunne)','canada','born','January 1874 (approximate)','Germany only · exact German birthplace not established','Approved Charles Godfrey biography; German origin and naturalization evidence'));
}
const pinetop=data.places.find(p=>p.id==='pinetop');
if(pinetop&&!pinetop.events.some(e=>e.personId==='grace_hill'&&e.type==='died')){
 pinetop.events.push(event('grace_hill','Grace Mildred Hill','hill','died','27 April 1983','Lakeside final household inferred from family memoir · death place not independently established','Approved Grace Hill memoir: granddaughter found her at home; Lakeside burial; geographic attribution provisional'));
}
})();
