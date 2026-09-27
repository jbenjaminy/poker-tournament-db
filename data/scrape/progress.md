# Poker scrape progress

Last updated: **2026-09-24 ~1:20 PM CT** (pass 14 — nationwide standalone cardrooms: CA + FL + WA)

## Masters
| Metric | Value |
|--------|-------|
| Casinos | **996** (was 954, **+42**) |
| Tourney rows | **363** (was 355) |
| Verified tourneys | **251** |
| Unverified tourneys | **97** |
| Casinos with `hasPoker` true/yes | **255** (was 204, **+51**) |

Refreshed arrays regenerated under `other/` and `data/scrape/`. Originals untouched. UI untouched. No git push.

## Pass 14 focus: nationwide poker-only / standalone cardrooms

### State licensing models researched
- **CA** — CGCC licensed gambling establishments (standalone cardrooms)
- **FL** — FGCC cardrooms only at qualifying pari-mutuel facilities
- **WA** — WSGC commercial stimulant card rooms (≤15 tables; HB list)
- **TX** — private social clubs (already ingested pass 13)
- **Follow-up** — MT live-card premises, OR local social clubs, NH charitable halls

### California
- Diffed full CGCC Active GE list (**56 operating**) vs seed: **0 missing**
- Updated **Club One Casino** address → 3950 N Cedar Ave, Fresno
- Inventory: `data/scrape/ca-cardrooms-inventory.json` (operating + not-operating + stale suspects)

### Florida
- Flipped/renamed FGCC rooms: Calder, Creek Gretna, Club 52/Melbourne, Pensacola, One-Eyed Jack's/Sarasota, Hialeah, Lucky's/TGT, Ebro, Big Easy (ex-Mardi Gras), Harrah's Pompano (ex-Isle)
- **Added**: Orange City Racing and Card Club, Oxford Downs, Ocala Bets
- Inventory: `data/scrape/fl-cardrooms-inventory.json`

### Washington
- Ingested WSGC Feb 2026 house-banked licensed card rooms + Fortune/Caribbean/Ace's-class contacts
- Added **Little Creek** + **Jamestown Saloon** poker venues
- Unverified CardPlayer weekly rows for Caribbean, Black Pearl, Slo Pitch, Little Creek
- Inventory: `data/scrape/wa-cardrooms-inventory.json`

### hasPoker by priority state
| State | Venues | hasPoker before → after |
|-------|--------|-------------------------|
| CA | 155 | 81 → **81** |
| FL | 42 | 23 → **34** |
| WA | 84 | 1 → **41** |
| TX | 28 | 28 → **28** |

## Remaining gaps
- CA stale non-CGCC names still hasPoker (Black Sheep, Comstock, Village Club, etc.) — cleanup follow-up
- WA: fill city-only addresses; confirm Ace's Poker brand sites; Wild Goose licensed-not-operating skipped
- MT / OR / NH inventories noted in `other-states-cardrooms-notes.json`

## Run log
- Pass 1–13: prior refresh / CA / TX / NV enrichment
- Pass 14: nationwide cardrooms CA+FL+WA; summary `nationwide-cardrooms-summary.json`

---

# Pass 15 — schedule densify (2026-09-24 ~3:00 PM CT)

## Masters
| Metric | Before → After |
|--------|----------------|
| Casinos | 996 → **996** |
| Tourney rows | 363 → **397** (+34) |
| hasPoker | 255 → **260** |
| Rooms with schedules | 69 → **77** |
| Verified / unverified tourneys | 271 / 111 |

## Highlights
- Renamed **Ballys Hotel & Casino, Las Vegas** → **Horseshoe Las Vegas**; densified 6 daily slots
- Flipped + densified **Caesars Palace**, **Westgate**, **MGM Grand**, **Mandalay Bay**
- **Venetian**: recurring $200 5:10pm bounty only (series daytime skipped)
- **Commerce**: +Sat $25K / Sun $15K official PDFs; enriched Mon–Fri
- **Stones**: official page replace (Mon/Tue/Thu mornings + Tue/Thu nights)
- **Lodge Round Rock + San Antonio**: weekly regulars from official pages
- Blockers: Boulder/Santa Fe no grids; Hustler none; Bay 101 events 403; TCH JS calendars; Lucky Chances no times

Summary: `data/scrape/schedule-densify-summary.json`

---

# Pass 16 — schedule densify (2026-09-24 ~3:10 PM CT)

## Masters
| Metric | Before → After |
|--------|----------------|
| Casinos | 996 → **996** |
| Tourney rows | 397 → **417** (+20) |
| hasPoker | 260 → **260** |
| Rooms with schedules | 77 → **80** |
| Verified / unverified tourneys | 291 / 111 |

## Highlights
- **The Gardens Casino**: +9 from official daily pages (Hawaiian Gardens)
- **Bay 101**: 1→7 with start times from homepage Daily Tournaments
- **Commerce**: +Fri 4pm $140 / $5K GTD (40K chips) official PDF
- **Bicycle**: Nooner midnight typo → noon; merged Mon–Fri
- **bestbet Jacksonville / Orange Park / St. Augustine**: recurring weeklies from Sep 2026 calendars
- Blockers: Hustler none; Lucky Chances no times; Crystal/M8trix/Oaks empty; Gold Coast & Palace Station poker closed; TCH JS-walled

Summary: `data/scrape/schedule-densify-pass16-summary.json`

---

# Pass 17 — schedule densify (2026-09-24 ~5:50 PM CT)

## Masters
| Metric | Before → After |
|--------|----------------|
| Casinos | 996 → **996** |
| Tourney rows | 417 → **430** (+13) |
| hasPoker | 260 → **260** |
| Rooms with schedules | 80 → **81** |
| Verified / unverified tourneys | 304 / 111 |

## Highlights
- **Parkwest Casino Lodi**: NEW (0→6) from official weekly schedule + monthly championship
- **Red Rock**: densified Fri/Sat into daily $85 grid (3 rows, broader day coverage)
- **Canterbury Park**: Sun night buy-in fix + Tue night $200/$10K + monthly rows (13→16)
- **FireKeepers**: +2 Sat MSPT milestones (11→13)
- **Casino del Sol**: +Monday Reload Madness (2→3)
- **Running Aces**: re-verified + 1st-Sunday PLO (15→16)
- Regenerated `js/rooms-with-schedules.js`

Summary: `data/scrape/schedule-densify-pass17-summary.json`

---

# Pass 18 — schedule densify (2026-09-24 ~6:00 PM CT)

## Masters
| Metric | Before → After |
|--------|----------------|
| Casinos | 996 → **996** |
| Tourney rows | 430 → **459** (+29) |
| hasPoker | 260 → **260** |
| Rooms with schedules | 81 → **85** |
| Verified / unverified tourneys | 334 / 110 |

## Highlights
- **Orange City Racing and Card Club**: NEW (0→8) official weekly + monthly
- **Daytona Beach Kennel Club & Poker Room, Williamson Blvd**: NEW (0→8) official weekly
- **Stars Casino**: NEW (0→3) Tracy official /tournaments
- **Oxford Downs**: NEW (0→7) named recurring weeklies
- **Four Winds Casino South Bend**: +Fri $125 1pm (3→4)
- **Turning Stone Resort & Casino**: densified official Tue/Wed (1→3)
- Regenerated `js/rooms-with-schedules.js`
- Diminishing returns: **false**

Summary: `data/scrape/schedule-densify-pass18-summary.json`

---

# Pass 19 — schedule densify (2026-09-24 ~6:00 PM CT)

## Masters
| Metric | Before → After |
|--------|----------------|
| Casinos | 996 → **996** |
| Tourney rows | 459 → **483** (+24) |
| hasPoker | 260 → **260** |
| Rooms with schedules | 85 → **88** |
| Verified / unverified tourneys | 358 / 110 |

## Highlights
- **Palm Beach Kennel Club, West Palm Beach**: NEW (0→13) official weekly NLH/PLO grid
- **Ebro Poker Room**: NEW (0→4) official Tue/Wed/Thu/Sun guarantees
- **Outlaws Card Parlour**: NEW (0→4) Wed/Sat/Sun from outlawspoker.com
- **Seminole Hard Rock Hollywood**: densified Fri/Sat (6→9)
- Regenerated `js/rooms-with-schedules.js`
- Diminishing returns: **false**

Summary: `data/scrape/schedule-densify-pass19-summary.json`

---

# Pass 20 — schedule densify (2026-09-24 ~6:15 PM CT)

## Masters
| Metric | Before → After |
|--------|----------------|
| Casinos | 996 → **996** |
| Tourney rows | 483 → **518** (+35) |
| hasPoker | 260 → **260** |
| Rooms with schedules | 88 → **92** |
| Verified / unverified tourneys | 393 / 110 |

## Highlights
- **Derby Lane Poker Room**: NEW (0→13) Win! Derby official Sep 2026 weeklies
- **Doghouse Poker Club**: NEW (0→7) official nightly GTDs
- **The Hangar Poker House**: NEW (0→7) official Mon–Sun grid
- **Palace Poker Texas**: NEW (0→8) official calendar event details
- Regenerated `js/rooms-with-schedules.js`
- Diminishing returns: **false**

Summary: `data/scrape/schedule-densify-pass20-summary.json`

---

# Pass 21 — schedule densify (2026-09-24 ~6:20 PM CT)

## Masters
| Metric | Before → After |
|--------|----------------|
| Casinos | 996 → **996** |
| Tourney rows | 518 → **531** (+13) |
| hasPoker | 260 → **260** |
| Rooms with schedules | 92 → **95** |
| Verified / unverified tourneys | 406 / 110 |

## Highlights
- **El Dorado Hills Casino**: NEW (0→2) official Sat/Sun weeklies
- **Ocala Bets**: NEW (0→7) official Sep 2026 recurring calendar weeklies
- **Central Coast Casino**: NEW (0→4) official Mon/Fri/Sun + 1st-Wed monthly
- Regenerated `js/rooms-with-schedules.js`
- Diminishing returns: **false**

Summary: `data/scrape/schedule-densify-pass21-summary.json`

---

# Pass 22 — schedule densify (2026-09-24 ~6:20 PM CT)

## Masters
| Metric | Before → After |
|--------|----------------|
| Casinos | 996 → **996** |
| Tourney rows | 531 → **543** (+12) |
| hasPoker | 260 → **260** |
| Rooms with schedules | 95 → **99** |
| Verified / unverified tourneys | 418 / 110 |

## Highlights
- **Lucky's Card Room (TGT Poker)**: NEW (0→7) official Sep 2026 calendar weeklies
- **Towers Casino & Card Room**: NEW (0→2) official Sunday Lucky Re-Buy + Super Sunday
- **Garlic City Casino & Restaurant**: NEW (0→2) official Wed/Sun weeklies
- **Fortune Casino Lacey**: NEW (0→1) official daily $60 11am
- Regenerated `js/rooms-with-schedules.js`
- Diminishing returns: **false**

Summary: `data/scrape/schedule-densify-pass22-summary.json`

---

# Pass 23 — schedule densify (2026-09-24 ~6:25 PM CT)

## Masters
| Metric | Before → After |
|--------|----------------|
| Casinos | 996 → **996** |
| Tourney rows | 543 → **558** (+15) |
| hasPoker | 260 → **260** |
| Rooms with schedules | 99 → **103** |
| Verified / unverified tourneys | 433 / 110 |

## Highlights
- **Casino Club**: NEW (0→4) official Tue/Thu/Sun + 3rd-Sat monthly
- **All Star Casino**: NEW (0→2) official daily 11am + Tue/Thu 7pm
- **Casino Caribbean Yakima**: NEW (0→2) official Sat/Sun noon + MWF 7pm
- **Crazy Moose Casino Pasco**: NEW (0→7) official daily flyer grid
- Regenerated `js/rooms-with-schedules.js`
- Diminishing returns: **false**

Summary: `data/scrape/schedule-densify-pass23-summary.json`

---

# Pass 24 — schedule densify (2026-09-24 ~6:30 PM CT)

## Masters
| Metric | Before → After |
|--------|----------------|
| Casinos | 996 → **996** |
| Tourney rows | 558 → **569** (+11) |
| hasPoker | 260 → **263** |
| Rooms with schedules | 103 → **106** |
| Verified / unverified tourneys | 444 / 110 |

## Highlights
- **Jackson Rancheria Casino**: NEW (0→3) official Thu/Sat/Sun weeklies
- **Boomtown Casino & Hotel, New Orleans**: NEW (0→1) official Thu 7pm $75
- **The Sands Casino, Bethlehem** (Wind Creek): NEW (0→5) official Sep 2026 bounty calendar
- **Stones Gambling Hall**: densified (2→4) Wed morning + Sat morning
- Regenerated `js/rooms-with-schedules.js`
- Diminishing returns: **false**

Summary: `data/scrape/schedule-densify-pass24-summary.json`

---

# Pass 25 — schedule densify (2026-09-24 ~6:35 PM CT)

## Masters
| Metric | Before → After |
|--------|----------------|
| Casinos | 996 → **996** |
| Tourney rows | 569 → **588** (+19) |
| hasPoker | 263 → **263** |
| Rooms with schedules | 106 → **109** |
| Verified / unverified tourneys | 463 / 110 |

## Highlights
- **The Casino @ Dania Beach**: NEW (0→6) official Sept 2026 weekly grid
- **Champions Club Texas**: NEW (0→5) official Sep 2026 events weeklies
- **Amarillo Social Club**: NEW (0→8) official poker-schedule weeklies
- Regenerated `js/rooms-with-schedules.js`
- Diminishing returns: **false**

Summary: `data/scrape/schedule-densify-pass25-summary.json`

---

# Pass 26 — schedule densify (2026-09-24 ~6:45 PM CT)

## Masters
| Metric | Before → After |
|--------|----------------|
| Casinos | 996 → **996** |
| Tourney rows | 588 → **590** (+2) |
| hasPoker | 263 → **263** |
| Rooms with schedules | 109 → **110** |
| Verified / unverified tourneys | 465 / 110 |

## Highlights
- **Alamo City Poker Club**: NEW (0→1) official Thu Ladies' Night
- **All Star Casino**: densified 2→3 official WSGG evening grid
- Regenerated `js/rooms-with-schedules.js`
- Diminishing returns: **true** — stop densify

Summary: `data/scrape/schedule-densify-pass26-summary.json`
