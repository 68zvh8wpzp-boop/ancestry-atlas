# Ancestry Atlas — A049 Jonathan Henry Webb person-page audit
Date: 2026-11-10

## Outcome
One substantive direct-ancestor PERSON CARD improved in draft; approved August 28 Story and all narration files/hashes frozen. Do not merge or deploy. No source bytes, portraits, graph edges or family photo were added. No individual page is fully certified until originals and full Sources/Memories review.

## Key newly inspected published source
*The Morten Peder Mortensen Families*, publicly reproduced PDF, printed pp. 185–187 (and continuing); https://www.familysearch.org/patron/v2/TH-301-43970-40-28/dist.pdf?ctx=ArtCtxPublic . Its Della Ray section on printed p185 expressly says Jonathan Henry Webb married Della Ray in Colonia Morelos 16 Aug 1908, sealing Salt Lake 2 Apr 1913; lists first child Thora (1909) and Henry Ray (1911) born Colonia Morelos. The later sequence lists Karl Albert born 5 Jan 1914 in Thatcher, Arizona (p186), Maurice Eugene in Pinedale in 1916 (p187), and ten children in the couple's household. Publication is a family compilation/derivative, NOT an original civil or church event register. The birth-location sequence narrows geographic chronology but CANNOT prove border-crossing date, reason or that the entire family moved together.

Prior known family memoir James Wilford Ray by Nellie Ray Toone (1974) independently recounts the 1908 marriage but is retrospective; its author was an infant in 1908: https://www.familysearch.org/ru/memories/memory/71246447/James%2BWilford%2BRay%2Bby%2BNellie%2BRay%2BToone . Do not conflate ceremony and 1913 sealing. The 2014 James W. 'Jay' Webb obituary historically indexed by Owens Livingston Mortuary names Jonathan and Della as parents and dates Jay's Pinedale birth to 5 Oct 1924; current obituary listing not fully retrieved, so count as known derivative corroboration, not new original.

## New draft code
- `jonathan-henry-person-page-a049.js`: 908-word, source-calibrated separate life bio, short person note, original-proof audit metadata. Not narrator text.
- `atlas-v3.9.62.html`: only adds module inclusion; PWA/entrypoint unchanged.
- `tests/atlas_jonathan_person_page_a049.test.mjs`: validates source-boundary caveats, no graph/portrait/audio mutation, draft-only.
- Proposed PR base: `review/a047-proof-queue-and-release-qa-20261110` not main.

## Deferred media
FamilySearch historic inventory: `Jonathan Henry Webb and His Six Sons`, circa April 1947, upload `img0008.jpg` by DeEdra Breckenridge. Photo itself, identity labels and permission not accessed or captured this tranche. Approved Story scene illustrations are contextual and must NOT be relabeled as personal portraits. 57 Sources/147 Memories from earlier FamilySearch inventory not itemized.

## Original-source gate
1. Colonia Morelos Ward LR11952/CR3758 1908 marriage event original (not yet established specifically inside volume).
2. 1914 Karl Albert Webb birth original, prior index reference S3HY-6793-SJ4; separate 1916 Maurice and 1909/1911 Mexico originals.
3. 1924 James Wilford (Jay) Webb original, indexed reference 3Q9M-CSZL-M9HL-4.
4. Jonathan 1975 Arizona civil death original.
5. 1947 photo exact source, rights, local high resolution, all six sons identification and no duplicate capture.
6. Complete each actual FamilySearch Sources and Memories item, gallery iPhone runtime review.
No paid access, outreach, email, or live deployment.

## Status
Person-card substantive draft staged; checks pending CI; 0 newly certified original documents, 0 new media bytes, person not complete. Audio frozen until full roster sweep.
