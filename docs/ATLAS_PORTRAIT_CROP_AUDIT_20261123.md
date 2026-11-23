# Ancestry Atlas — portrait crop audit and source registry
**2026-11-23 · Completed implementation tranche · No paid services**

## Result
The connected 2D ancestry map now has presentation-only photo entries for **25 distinct people** (previously seven). This consists of **19 new/replacement crop records** covering **18 additional people**. One of the 19 replaces Marion's remote standalone photo with a locally saved, source-attributed family-photo crop. The registry has **nine source-attributed group crops**, **two existing contributor-supplied family-photo crops**, and **eight standalone person-photo entries**. The original seven-person portrait registry remains intact as a fallback.

All **15 distinct local image files** referenced by the new crop records were verified to exist in the connected GitHub repository. Their Git blob SHA-1 values are stored in each crop record, and the regression tests recompute those hashes from the original image bytes to catch unintended replacement. The 2D renderer uses normalized crop windows, with no reconstruction or editing of original pixel data and no transfer of images to third-party tools. Full-source images are available through the selected-person photo link in the Tree. **The exact source image SHA, local file path, named attribution, crop coordinates and source citation are retained in the registry.**

## Confirmed attribution sources
- The **Sarah Carling with children, 1891** photograph is published with the caption identifying the children **left-to-right** as Clark, Henry, Burr, Owen, Catherine. This supports a crop for the seated Sarah and the front-left young Henry (second child from the left). Source: [Pioneer Women of Arizona, Religious Studies Center](https://rsc.byu.edu/pioneer-women-arizona/w). This is a documented editorial photo caption, **not** a face-recognition judgment.
- The approved Webb autobiography and tour media label **Jay and Marion** together in the 1941 family picture, and **Sheldon and Inez** in the 1965 wedding picture.
- Existing FamilySearch contributor evidence labels **Charles and Marian** in the 1970 anniversary photograph; **Della** as the third of five women, listed left-to-right in the 1947 mother-and-daughters image; **Jessie** and **Richard Skinner** in their family photographs; and the remaining historical single-person portrait sources. These contributor identifications are family-attributed rather than independently biometric.
- **Grace Mildred Hill**'s studio photograph is captioned in Inez's autobiography as Grace at age 23 in 1932. Other biographies identify Davia, Ida, John Peter, Mary Ann, Charles Godfrey, Wilhelm and Johanne in contributor-held photographs, sometimes with unknown dates. Source files are preserved as provided.
- Historical ancestry confidence (confirmed/strong/provisional/frontier) remains a **separate** property from a person photo. Including a photograph never resolves an uncertain parentage or citizenship claim.

## New / replacement crop register

| Person record | Visual type | Position or attribution | Preserved source image |
|---|---|---|---|
| `james_sheldon` | group crop | Sheldon, on left, with Inez at their 1965 wedding | `sheldon_inez_wedding_1965.jpeg` |
| `inez_karen` | group crop | Inez, on right, with Sheldon at their 1965 wedding | `sheldon_inez_wedding_1965.jpeg` |
| `james_wilford` | group crop | Jay, on left, with Marion circa 1941 | `biographies/marion/assets/jay_marion_mesa_1941_restored.jpg` |
| `marion_brenay` | group crop | Marion, on right, with Jay circa 1941 | `biographies/marion/assets/jay_marion_mesa_1941_restored.jpg` |
| `sarah_carling` | group crop | Sarah, seated center, in 1891 with five children | `biographies/webb-branch/people/edward_milo_jr/assets/edward_jr_sarah_children_1891_family_use.png` |
| `jonathan_henry` | group crop | Henry, second child from left (standing front left), 1891 | `biographies/webb-branch/people/edward_milo_jr/assets/edward_jr_sarah_children_1891_family_use.png` |
| `charles_albert` | group crop | Charles, on right, in 50th-anniversary portrait | `assets/charles-albert/charles-marian-50th-anniversary.jpg` |
| `marian_skinner` | group crop | Marian, on left, in 50th-anniversary portrait | `assets/charles-albert/charles-marian-50th-anniversary.jpg` |
| `della_ray` | group crop | Della, third from left, with four daughters in 1947 | `assets/della-ray/della-webb-and-daughters-1947-original.jpg` |
| `jessie_irene_aurin` | existing family crop | Jessie Aurin Skinner, identified in preserved family photo crop | `assets/jessie-aurin/jessie-aurin-portrait.jpg` |
| `richard_francis_skinner` | existing family crop | Richard Francis Skinner in contributor-labeled portrait | `assets/richard-skinner/richard-skinner-portrait.jpg` |
| `grace_hill` | standalone | Grace Mildred Hill, age 23, 1932 | `assets/inez-life-story/image2.jpeg` |
| `davia_dunbar` | standalone | Davia Ann Dunbar Hill Duffy, family-identified portrait | `assets/davia/davia-ann-dunbar-portrait.jpg` |
| `ida_mae` | standalone | Ida Mae Gooley, Book of Remembrance portrait | `assets/ida-mae/ida-portrait-contributed.jpg` |
| `john_peter` | standalone | Peter Gooley, family-attributed bearded portrait | `assets/john-peter/peter-portrait.jpg` |
| `mary_ann` | standalone | Mary Ann Dennis Gooley, family-attributed portrait | `assets/mary-ann/mary-ann-portrait.jpg` |
| `charles_godfrey` | standalone | Charles Godfrey Brenay/Brunne, single-person work-clothes portrait | `assets/charles-godfrey/godfrey-young-portrait.jpg` |
| `wilhelm_brunne` | standalone | Wilhelm Karl Charles Brunne, Book of Remembrance portrait | `assets/wilhelm-brunne/portrait-book-remembrance.jpg` |
| `johanne_weller` | standalone | Johanne Dorothea Weller, contributor-attributed portrait | `assets/johanna-weller/johanna-portrait-scottdaphne-2016-original.jpg` |

## What remains unassigned
Do **not** label individual children in the large Sheldon-siblings photo or the other multi-person family gatherings until a left-to-right caption, labeled copy, or similarly specific identification is verified. Similarly, do not add alleged likenesses for Russell Hill or Isaac Carling without an actual attributable photo. Identified *source subjects* may be present, but identifying a position in every group must be justified by its source, not by age/sex or a guessed family resemblance.

## Rendering contract
1. Load `atlas-2d-portrait-index-20261123.js` first, then `atlas-2d-portrait-crops-20261123.js`, then `atlas-2d-map.js`.
2. For crop entry `{x,y,w,h}`, multiply by source image pixel dimensions and draw only that source rectangle into the ancestor's portrait tile with cover scaling; leave the original file unmodified.
3. On failure, fall back to an older preserved portrait when available; otherwise draw a neutral outline silhouette. Never create a synthetic face.
4. Keep original photograph provenance available via the selected card's “View full source photograph” link. The Della canvas now crops the saved full-resolution original; the selected-person source link opens that same archived original.
5. Do not infer who is depicted from appearance. Every named subject must be independently grounded in a caption, metadata, or person-source collection attribution.

## Remaining QA
Static source and numeric-rectangle validation is possible through GitHub. Real Safari/iPhone rendering, the host image decode behavior, and whether all crop windows look satisfactory at phone size still require a live device check. No claim of live-device verification is made.

**Source ownership:** Original imagery remains in the existing Atlas paths, with all byte identities recorded in `atlas-2d-portrait-crops-20261123.js`. New display crops are computed by the browser and are not falsely presented as separately preserved original photographs.
