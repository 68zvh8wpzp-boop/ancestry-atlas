/* Ancestry Atlas v3.9.0 — project-wide evidence synchronization, 2026-09-13.
   This overlay updates the v3.8.22 application without replacing its later UI/media architecture. */
(()=>{
'use strict';
if(typeof DATA==='undefined') return;
const nodes=DATA.nodes||[];
const edges=DATA.edges||[];
const byId=id=>nodes.find(n=>n.id===id);
const patch=(id,changes)=>{const n=byId(id); if(n) Object.assign(n,changes);};
const ensureNode=n=>{if(!byId(n.id)) nodes.push(n);};
const ensureEdge=e=>{if(!edges.some(x=>x.a===e.a&&x.b===e.b)) edges.push(e);};

patch('charles_albert',{
  confidence:'confirmed',
  note:'Born 29 Mar 1897 in Arnstein, Parry Sound District, Ontario. Confirmed Canadian-born anchor. The 1901 Canadian census records Charles A. Brunne in Ontario with the exact 29 Mar 1897 birth date; the 1910 U.S. census continues him as Canada-English born with a reported 1903 immigration year; and his original 5 Jun 1918 draft registration, signed Albert Brenay, gives Arnstein/Ansteen, Canada and Canada as country of citizenship or subject status. The United Church of Canada Archives reported that the Arnstein EUB fonds contain administrative minutes rather than vital registers, so that search did not supply a baptismal record. Ontario civil-birth evidence and the complete Alpena naturalization history remain priority document targets.',
  hold:{kind:'priority',label:'Ontario birth proof + complete Alpena naturalization history; United Church fonds search negative for vital registers'}
});

patch('john_peter',{
  years:'1842–1910',
  place:'Quebec / Canada → Ontario → Hubbard Lake, Michigan',
  confidence:'strong',
  note:'Canadian-born Peter/John Peter Gooley of Hubbard Lake/Ossineke. A 1910 Michigan death certificate records Peter Gooley, married farmer, born Canada, died 6 Jun 1910, with Mary Gooley as informant; parents and exact birth date were unknown on the certificate. A 7 Jun 1910 Alpena Evening News obituary says he died at Hubbard Lake leaving a wife and six grown children. The 1890 federal veterans schedule records John Gooley at Hubbard Lake, while the 1894 Michigan veterans census records Peter Gooley in Ossineke; the shared small locality strongly supports John = Peter as a working identity, but the exact military service is unresolved. The commonly reported 2 May 1842 Quebec birth date remains secondary until an original Quebec record is found.',
  hold:{kind:'priority',label:'Best backward route: reported 1866 Wentworth marriage; James Francis Gooley 1898 marriage / 1932 death; exact Quebec baptism still unproved'}
});

patch('mary_ann',{
  note:'Mary Ann Gooley, wife of Peter Gooley, is directly established by two 1908 Ossineke Township deed images; one deed conveys about 80 acres to Benjamin Gooley. Identification with Mary Ann Dennis and her reported 15 Aug 1844 Ontario birth are strongly supported by the broader family reconstruction, but the deed does not state her maiden name. Priority: original marriage and child records that explicitly name Dennis.'
});

patch('peter_gooley',{
  confidence:'provisional',
  note:'Reported father of John Peter Gooley; exact identity, origin and spouse remain unproved. The documented Pierre Goulet who married Louise-Anne Tellier at Saint-Michel-de-Sherbrooke on 25 May 1846 remains a candidate research lead only and is not merged into the direct line. The previously explored 1828 John Peter Goulet / Benjamin Goulet / Marie-Agnès Dufault branch is a rejected hypothesis and must not be treated as ancestry.'
});

patch('gooley_frontier',{
  place:'Quebec / Ontario / unresolved origin',
  note:'Open origin problem. Current document-level evidence securely reaches the Canadian-born Peter/John Peter Gooley of Hubbard Lake/Ossineke but does not yet name his parents. The strongest next route is through the reported 1866 Wentworth, Ontario marriage and records of son James Francis Gooley. The 1846 Pierre Goulet + Louise-Anne Tellier couple remains a separate candidate lead only; the 1828 John Peter Goulet line is retained solely as rejected research history.'
});

patch('russell_hill',{
  note:'Father of Isaiah “Zay” Hill. Russell Hill and Davia/David Ann Dunbar remain the current working couple. The original Boone County, Missouri marriage book around 1874 remains the high-priority document-level bridge and has not yet been manually retrieved. Russell’s Kentucky parentage remains unresolved.',
  hold:{kind:'document',label:'Manual Boone County c.1874 Hill–Dunbar marriage-book retrieval'}
});

patch('james_webb_sr',{
  confidence:'provisional',
  note:'Retained as the working genealogical father of James Webb Jr. The relationship is not being discarded while the original-record bridge remains incomplete. Proof-gap bookmarks: restricted Middletown probate material and Chester Congregational Church image review.'
});

patch('james_webb_jr',{
  note:'Born in Connecticut in 1777. James Webb Sr. → James Webb Jr. is retained as the working genealogical conclusion while the remaining original-record bridge is pursued. The restricted Middletown probate file and Chester Congregational Church images remain explicit proof-gap targets.'
});

patch('dorthea_jensen',{
  note:'Mother of Elsie Margaret Mortensen and wife of Morten Peder Mortensen. The Jensen branch through Knud Jensen Brygger and Bodil Olesdatter remains strongly supported in the research structure; exact dates, parish images and selected earlier placements still require source-by-source normalization rather than speculative extension.'
});

ensureNode({id:'benjamin_gooley_1908',name:'Benjamin Gooley',years:'adult by 1908',place:'Ossineke / Hubbard Lake, Michigan',branch:'Gooley / Canada',confidence:'provisional',note:'Named as grantee in a March 1908 warranty deed from Peter Gooley and Mary Ann Gooley, his wife, both of Ossineke Township. The deed proves a direct land transaction and the Peter–Mary Ann marital relationship; Benjamin’s exact kinship is not stated in the deed and remains to be proved from additional records.',x:-0.1,y:7.7,z:-5.6,hold:{kind:'document',label:'Prove Benjamin’s relationship to Peter and Mary Ann'}});
ensureNode({id:'james_francis_gooley',name:'James Francis Gooley',years:'1867–1932',place:'Alpena, Michigan → Arnstein / Parry Sound District, Ontario',branch:'Gooley / Canada',confidence:'provisional',note:'Compiled family reconstruction identifies James Francis Gooley as one of the six adult children of Peter/John Peter Gooley and Mary Ann Dennis, reportedly born 5 Jan 1867 in Alpena and later resident in the Arnstein area. His 1898 Ontario marriage to Hannah/Johannah Sommacal and 1932 Ontario death registration are priority original records because either may name his parents directly.',x:-1.1,y:7.9,z:-5.8,hold:{kind:'priority',label:'1898 Ontario marriage + 1932 Ontario death registration'}});
ensureEdge({a:'benjamin_gooley_1908',b:'john_peter',confidence:'provisional'});
ensureEdge({a:'benjamin_gooley_1908',b:'mary_ann',confidence:'provisional'});
ensureEdge({a:'james_francis_gooley',b:'john_peter',confidence:'provisional'});
ensureEdge({a:'james_francis_gooley',b:'mary_ann',confidence:'provisional'});

if(typeof BRANCH_TOURS!=='undefined'){
  const amend=(track,id,copy)=>{const s=BRANCH_TOURS?.[track]?.steps?.find(x=>x.id===id); if(s) s.copy=copy;};
  amend('canada','charles_albert','Charles Albert Brenay was born in Arnstein, Ontario, in 1897. The 1901 Canadian census, 1910 U.S. census, and his 1918 draft registration now form the core evidence set for his Canadian birth and identity; the Arnstein church-fonds search did not contain vital registers.');
  amend('canada','john_peter','Peter or John Peter Gooley was Canadian-born and later lived at Hubbard Lake in Ossineke Township, Michigan. His 1910 death certificate, obituary, 1908 deeds, and the 1890/1894 veterans records anchor the same local family; the exact 1842 birth date, Quebec parish, parents, and military unit remain unproved.');
  amend('webb','james_webb_sr','James Webb Sr. to James Webb Jr. is retained as the working genealogical conclusion. The remaining proof gap is explicit: the restricted Middletown probate material and Chester Congregational Church images still need the original-record bridge.');
  amend('dunbar','russell_hill','Colonel Russell Hill and Davia or David Ann Dunbar remain the working couple in this line. The original Boone County, Missouri marriage book around 1874 is still the high-priority document-level bridge, while Russell’s own Kentucky parentage remains unresolved.');
  amend('denmark','dorthea_jensen','Dorthea Knudsen Jensen was born in 1840 and anchors the Jensen side of the documented Danish branch. The deeper Toreby and Møn structure is retained at its existing evidence weights; exact parish dates and some earlier parentage still require source-by-source normalization.');
}

const markVersion=()=>{
  document.title='Ancestry Atlas v3.9.0 — Master Evidence Sync';
  const chip=document.querySelector('.build-chip');
  if(chip) chip.textContent='BUILD v3.9.0 • master evidence sync • all branches • 13 Sep 2026';
  const heading=document.querySelector('h1 span');
  if(heading && /v\d/.test(heading.textContent||'')) heading.textContent='v3.9.0 • master sync';
};
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',markVersion,{once:true}); else markVersion();
})();
