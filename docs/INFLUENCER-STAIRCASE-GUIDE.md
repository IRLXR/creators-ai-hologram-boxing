# Influencer Staircase — Creator Partner Ads

**Audience:** Streamers, Kick/Twitch creators, reels creators, combat/gaming content makers  
**Goal:** Sign up at [landing.html](https://www.hologramboxing.com/landing.html) → co-stream HB 002 to their followers  
**UTM campaign:** `influencer_recruit`  
**Status:** All ads **PAUSED / OFF** until composite re-upload + QA complete  
**Last updated:** July 12, 2026

**Doc ID format:** `XX.YY.ZZ` — see [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) for all 64 preview cards.

---

## Quick links

| What | Where |
|------|--------|
| **Watch all ads** | `npm run preview:influencer-ads:open` → [INFLUENCER-42-ADS-PREVIEW.html](../ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html) |
| **Launch matrix (64 ads)** | [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) |
| **Master ops + readiness** | [INFLUENCER-ADS-MASTER-GUIDE.md](./INFLUENCER-ADS-MASTER-GUIDE.md) |
| **Machine spec** | `ads/influencer-recruit/INFLUENCER-STAIRCASE.json` |

**Do not mix fan ads** (Founding Fan, Awareness) into these campaigns — same landing page, different message.

---

## The staircase (creators only)

| Step | Ads Manager | Plain English | Creator job | TikTok campaign | Staircase ads | Doc layer |
|------|---------------|---------------|-------------|-----------------|---------------|-----------|
| **L1** | **Awareness** | See you | Stop scroll — hologram boxing exists for streamers | `CAMP_HB_Influencer_L1_SeeYou_001` | 6 | `01.*` |
| **L2** | **Consideration** | Get curious | Understand co-stream (tent, live FX, Kick/Twitch) | `CAMP_HB_Influencer_L2_Curious_001` | 6 | `02.*` |
| **L3** | **Conversion** | Sign up | Open call → partner form | `CAMP_HB_InfluencerRecruit_001` | 24 | `03.*` |
| **L4** | **Retargeting** | Come back | 6 direct retarget + **6 ad-confirmation** | `CAMP_HB_Influencer_L4_ComeBack_001` | **12** | `04.*` |
| **L5** | **Countdown** | Show up | Timer · last call · final partner slots | `CAMP_HB_Influencer_L5_ShowUp_001` | 6 | `05.*` |

**Staircase total:** **54 ads** (preview #1–#54).  
**Bonus A/B pool:** **10 ads** (preview #55–#64, doc `06.*`) — HF B-roll + poster composites; not in launch JSON.

**TikTok:** All 54 staircase slots built · composites in repo · **re-upload `*-COMPOSITE-15s.mp4`** before turn-on.  
**Meta:** Mirror with `npm run meta:launch-influencer-staircase` after token refresh.

---

## Structure per layer (TikTok + Meta mirror)

### L1, L2, L4, L5 — 2 ad groups × 3 ads = 6 per layer

| | Gaming streamers | All creators |
|---|----------------|--------------|
| **Ad set name** | `…_GamingStreamers_FL` | `…_AllCreators_FL` |
| **Age** | 18–34 | 18–44 |
| **Geo** | FL DMAs: Orlando, Miami, Tampa, Jacksonville | Same |
| **Ads per set** | 3 | 3 |

### L3 — 6 ad groups × 4 ads = 24

| Ad group | Preview # | Doc IDs |
|----------|-----------|---------|
| `ADGRP_HB_OpenCallExact_US_Creators18-44` | 13–16 | `03.01.00`–`03.04.00` |
| `ADGRP_HB_InfluencerRecruit_US_18-44` | 17–20 | `03.05.00`–`03.08.00` |
| `ADGRP_HB_InfluencerRecruit_GamingStreamers_FL` | 21–24 | `03.09.00`–`03.12.00` |
| `ADGRP_HB_InfluencerRecruit_CombatCreators_FL` | 25–28 | `03.13.00`–`03.16.00` |
| `ADGRP_HB_InfluencerRecruit_ReelsCreators_FL` | 29–32 | `03.17.00`–`03.20.00` |
| `ADGRP_HB_InfluencerRecruit_OrlandoMiami_FL` | 33–36 | `03.21.00`–`03.24.00` |

**Grand total:** 5 campaigns · 14 ad groups/ad sets · **54 staircase ads** per platform (+10 bonus for A/B).

---

## Optimization by layer

| Layer | TikTok optimization | Meta objective | CTA | Doc |
|-------|---------------------|----------------|-----|-----|
| L1 See you | `CLICK` | Awareness → Reach | Learn More | `01.*` |
| L2 Get curious | `TRAFFIC_LANDING_PAGE_VIEW` | Traffic → Link clicks | Learn More | `02.*` |
| L3 Sign up | `CONVERT` → `FORM` | Traffic → Link clicks | Sign Up | `03.*` |
| L4 Come back | `CONVERT` → `FORM` | Traffic → Link clicks | Sign Up | `04.*` |
| L5 Show up | `CONVERT` → `FORM` | Traffic → Link clicks | Sign Up | `05.*` |

**Turn-on order:** L1 + L2 + L3 together → L4 after **7d landing visitors excl. Lead** → L5 when HB 002 **≤14 days out**.  
Matrix reference: `00.02.02` in [launch matrix](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md).

---

## Creatives map — ship files (composites)

**Upload `*-COMPOSITE-15s.mp4` to TikTok/Meta** — not raw `*-15s-VO.mp4` plates. Rebuild: `scripts/marketing/build-influencer-composites.ps1`.

| Layer | Ad slot | Ship file | Creative key | Doc IDs (gaming / creators) |
|-------|---------|-----------|--------------|----------------------------|
| **L1** | Calling All | `INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` | `inf_calling_all_vo` | `01.01` / `01.04` |
| **L1** | Walk Inside | `WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` | `walk` | `01.02` / `01.05` |
| **L1** | Future Mystery | `Director_Brief_001_Version_B_Cinematic_Mystery.mp4` | `future_mystery` | `01.03` / `01.06` |
| **L2** | Live FX | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | `livefx` | `02.01` / `02.04` |
| **L2** | Co-Stream | `INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4` | `stream` | `02.02` / `02.05` |
| **L2** | Inside Tent | `INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` | `tent` | `02.03` / `02.06` |
| **L3** | Open Call Exact | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | `inf_open_call_vo` | all 6 groups · slot 1 |
| **L3** | Open Call Optimized | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | `inf_join_team_vo` | all 6 groups · slot 2 |
| **L3** | Open Call Creators v1 | `TIKTOK-OPEN-CALL-CREATORS-15s.mp4` | `open_v1` | all 6 groups · slot 3 (silent) |
| **L3** | Live FX | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | `livefx` | all 6 groups · slot 4 |
| **L4** | Partner Spotlight | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` | `inf_l4_partner_reviews_vo` | `04.01` / `04.04` |
| **L4** | Reminder | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` | `inf_l4_reminder_vo` | `04.02` / `04.05` |
| **L4** | Open Call retarget | `INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` | `inf_l4_retarget_vo` | `04.03` / `04.06` |
| **L4** | Confirms Partner | `INFLUENCER-L4-CONFIRMS-PARTNER-COMPOSITE-15s.mp4` | `inf_l4_confirms_partner_vo` | `04.07` / `04.10` |
| **L4** | Confirms Reminder | `INFLUENCER-L4-CONFIRMS-REMINDER-COMPOSITE-15s.mp4` | `inf_l4_confirms_reminder_vo` | `04.08` / `04.11` |
| **L4** | Confirms Open Call | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-15s.mp4` | `inf_l4_confirms_open_call_vo` | `04.09` / `04.12` |
| **L5** | Countdown Timer | `INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-15s.mp4` | `inf_l5_countdown_vo` | `05.01` / `05.04` |
| **L5** | Last Call | `INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-15s.mp4` | `inf_l5_last_call_vo` | `05.02` / `05.05` |
| **L5** | Final slots | `INFLUENCER-L5-FINAL-SLOTS-CLOSING-COMPOSITE-15s.mp4` | `inf_l5_final_slots_vo` | `05.03` / `05.06` |

All composite paths: `ads/influencer-recruit/output/`. Silent walk: `ads/brief-002/output/`.

### Bonus A/B (doc `06.*` — optional tests)

| Preview # | Ship file | Use |
|-----------|-----------|-----|
| 55–56 | `*-COMPOSITE-HF-*.mp4` | Alternate Higgsfield B-roll |
| 57–64 | `*-COMPOSITE-POSTER-15s.mp4` | Silent flyer BG + host PiP |

---

## TikTok IDs (July 10, 2026)

| Campaign | ID | Budget | Ads |
|----------|-----|--------|-----|
| L1 See you | `1870345571958114` | $20/day CBO | 6 |
| L2 Curious | `1870345580231025` | $20/day | 6 |
| L3 Sign up | `1870260441542146` | $20/day | 24 |
| L4 Come back | `1870345588238449` | $20/day | **12** |
| L5 Show up | `1870345600654738` | $20/day | 6 |

### L1–L5 ad groups

| Layer | Gaming | Creators |
|-------|--------|----------|
| L1 | `1870345667162434` | `1870345677808817` |
| L2 | `1870345678592097` | `1870345677811185` |
| L4 | `1870345749405314` | `1870345771609170` |
| L5 | `1870345767397378` | `1870345772618818` |

L3 ad groups: see [launch matrix `00.02.06`](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md).

---

## Launch commands

```bash
# Rebuild composites after VO/B-roll changes
.\scripts\marketing\build-influencer-composites.ps1

# Regenerate launch matrix after preview HTML edits
npm run docs:launch-matrix

# TikTok deploy (PAUSED)
npm run tiktok:launch-influencer-staircase

# Meta — after refreshing META_ACCESS_TOKEN in .env.local
npm run meta:launch-influencer-staircase -- --execute
```

---

## Source files

- `ads/influencer-recruit/INFLUENCER-STAIRCASE.json` — machine spec
- `ads/influencer-recruit/LAUNCH-MANIFEST.json` — live IDs
- `docs/INFLUENCER-PREVIEW-LAUNCH-MATRIX.md` — **64-card preview → launch** (`XX.YY.ZZ`)
- `docs/INFLUENCER-ADS-MASTER-GUIDE.md` — readiness, blockers, turn-on order
- `docs/VIDEO-BROLL-TALKING-HEAD-MATCHING.md` — composite rules
- `docs/AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md` — full funnel (fans + creators)
- `scripts/marketing/tiktok-ad-payloads.json` — video library IDs
