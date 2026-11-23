# Ancestry Atlas — geographic globe, source and inference contract

Date: 2026-11-22. This file documents the first no-paid-service Places globe.

## Base map
- Public-domain **Natural Earth**, 1:110m land polygons: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson
- Natural Earth public-domain license: https://www.naturalearthdata.com/about/terms-of-use/
- Bundled as `atlas-world-land-110m.js`, with coordinate pairs rounded to 0.01 degrees; no map tile calls, API keys, or paid services.

## Locator semantics
- The 46 `atlas-geo-places-20261122.js` locators are approximate **cartographic centers**. Region markers (e.g., Arizona, Sweden, Germany) represent broad geography, not a house, birthplace, burial place, or specific parish.
- Locations are derived solely from **existing** `DATA.nodes[].place` summaries using literal place-name matching. No external search can introduce a new ancestor or alter a relationship.
- Entries with multiple places separated by `→` may render a dotted line between matched locations **only when focused on that person**. Such lines signify *order of mentions in an Atlas summary*, not a verified journey or migration.
- Unverified frontier and provisional person records are hidden by default. Toggling them on must not imply that these hypotheses are resolved.
- Collateral relatives are hidden by default. The separate switch does not change their genealogical class.
- Approximate spelling matches and Family navigation remain separate from geographic evidence.

## Example coordinate checks
- Arnstein, Parry Sound District, Ontario: approximately 45.9217 N, 79.9330 W. https://www.canadian1.net/weather/Ontario/Arnstein_Ontario_ON_weather.html
- Hårbølle, Fanefjord, Møn: approximately 54.896 N, 12.14 E. Hårbølle is a village, and nearby harbor is 54.8904 N, 12.1329 E. https://mapcarta.com/17587218 ; https://nordok.net/en/marinas/haarboelle-havn
- Colonia Pacheco, Casas Grandes, Chihuahua: approximately 30.0864 N, 108.3480 W. https://www.fallingrain.com/world/MX/06/Pacheco.html
- Pinedale, Navajo County, Arizona: approximately 34.3075 N, 110.2515 W. https://arizona.hometownlocator.com/az/navajo/pinedale.cfm
- Woodruff, Navajo County, Arizona: approximately 34.7814 N, 110.0434 W. https://arizona.hometownlocator.com/az/navajo/woodruff.cfm
- McNary, Arizona: approximately 34.09194 N, 109.85472 W. https://en.wikipedia.org/wiki/McNary%2C_Arizona
- St. Johns, Arizona (Apache County, **not** St. Johns in Maricopa County): approximately 34.50194 N, 109.37833 W. https://en.wikipedia.org/wiki/St._Johns%2C_Arizona
- Toreby, Lolland: approximately 54.75278 N, 11.78806 E. https://en.wikipedia.org/wiki/Toreby
- All other state, country, province, township, county, or island locators are generalized regional markers and are not precise gazetteer geocodes.

## Bounded historical event labels
The current 12 event/context labels in `atlas-geo-places-20261122.js` were copied into a **presentation-only index** from already existing person biographies or evidence descriptions. They are separated by epistemic status:
- **Original-record anchored:** Charles A. Brenay's 1897 Arnstein birth (1901 census; 1918 registration), Morten P. Mortensen's 1828 Hårbølle birth (original parish register), Jessie Irene Aurin's 1879 Crystal Township birth (original birth return) and 1880 Elbridge Township census residence, plus her recorded father's Swedish origin (not Jessie's own residency).
- **Atlas biography statements, not independently reverified in this globe tranche:** Della Ray's Colonia Pacheco birth and McNary death, James Wilford Webb's Pinedale birth, Jonathan Henry Webb's Woodruff birth, and Grace Hill's Richmond, Missouri birth.
- **Probable, not verified:** James Sheldon Webb's 1943 St. Johns birth and Marion Beulah Brenay's 1923 Saginaw birth.

No death/residence/migration event is created from the `place` summary alone. To add a new event marker, review and save the original record **first**, then annotate event, location precision, source, and confidence; never silently convert a place mention into a vital event.

## Future
1. Expand events systematically during the person-page audit, linked to preserved original images and the Atlas evidence fields.
2. Tighten geography for parish-level Denmark, Quebec, New England, and township-level Michigan and Arizona.
3. Verify live iPhone browser/Home Screen behavior; static checks do not replace real-device QA.
