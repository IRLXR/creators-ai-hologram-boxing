# Ad Set & Ad Build Matrix — Reuse Every Creative

**For:** Creators AI Hologram Boxing  
**Strategy:** One video ≠ one ad. **Reuse the same file across many ad sets** with different audiences, copy, or UTMs.  
**Primary KPI (now):** Email sign-up → [landing.html](https://www.hologramboxing.com/landing.html)  
**Geo (all cold/warm FL ad sets):** Orlando · Miami · Tampa · Jacksonville  
**Reference:** [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) (`XX.YY.ZZ` doc IDs) · [INFLUENCER-ADS-MASTER-GUIDE.md](./INFLUENCER-ADS-MASTER-GUIDE.md) · [AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md](./AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md) · [ALL-ADS-CATALOG.json](../ads/ALL-ADS-CATALOG.json)

**Influencer ship rule:** Upload `INFLUENCER-*-COMPOSITE-15s.mp4` — not raw `*-15s-VO.mp4` or silent posters (except `CR-OPEN-V1` silent slot).

---

## Influencer staircase at a glance (July 12, 2026)

| | Staircase | Bonus A/B | Preview cards |
|---|-----------|-----------|---------------|
| **Campaigns** | 5 (L1–L5) | — | — |
| **Ad groups / sets** | 14 | — | — |
| **Ads** | **54** | **10** | **64** |
| **Ship files** | 17 cinematic composites + silent/trailer slots | 2 HF + 8 poster composites | doc `06.*` |

**Full per-ad matrix:** [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) · Regenerate: `npm run docs:launch-matrix`

---

## At a glance (fan + legacy matrix)

| | Already live (PAUSED/OFF) | To build next | **Total when complete** |
|---|---------------------------|---------------|-------------------------|
| **Campaigns** | 2 (Influencer + Experience) | 5 new campaigns | **7** |
| **Ad sets / Ad groups** | 5 (2 TT + 3 Meta) | 18 new ad sets | **23** |
| **Ads** | 6 | **72 new ads** | **78** |
| **Unique video files reused** | 4 | 19 catalog + heroes | **~15 core files × multiple placements** |

**Reuse rule:** Each hero/UGC file should appear in **3–6 ads minimum** (different ad set + `utm_content`).

---

## Media library — what we already have

### Tier A — Hero cinematic (15s · 9:16 · best for paid)

| ID | File | Best for |
|----|------|----------|
| `CR-WALK-VO` | `ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-VO.mp4` | Mystery hook, cold traffic, retarget |
| `CR-FUTURE-VO` | `ads/output/FUTURE-IS-HERE-15s-9x16-VO.mp4` | Hype, tech fans, conversion |
| `CR-FUTURE-MYST` | `ads/brief-001/output/Director_Brief_001_Version_B_Cinematic_Mystery.mp4` | IG Reels, awareness, no VO |
| `CR-FUTURE-A` | `ads/brief-001/output/Director_Brief_001_Version_A_With_VoiceOver.mp4` | Same as VO master (alt export) |

### Tier B — Influencer composites (ship to TikTok/Meta)

| ID | Ship file | Creative key | Reused in | Doc layer |
|----|-----------|--------------|-----------|-----------|
| `CR-INF-CALL-COMP` | `INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` | `inf_calling_all_vo` | L1 ×2 | `01.01` `01.04` |
| `CR-INF-OPEN-COMP` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | `inf_open_call_vo` | L3 ×6 | `03.*` slot 1 |
| `CR-INF-JOIN-COMP` | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | `inf_join_team_vo` | L3 ×6 | `03.*` slot 2 |
| `CR-INF-LIVEFX-COMP` | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | `livefx` | L2 ×2 · L3 ×6 | `02.*` · `03.*` slot 4 |
| `CR-INF-TENT-COMP` | `INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` | `tent` | L2 ×2 · L3 cross | `02.*` · `03.08` `03.20` |
| `CR-INF-STREAM-COMP` | `INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4` | `stream` | L2 ×2 | `02.02` `02.05` |
| `CR-INF-WHATIS-COMP` | `INFLUENCER-L3-WHATIS-COMPOSITE-15s.mp4` | `whatis` | L3 ×1 | `03.07` |
| `CR-INF-L4-PARTNER` | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` | `inf_l4_partner_reviews_vo` | L4 ×2 | `04.01` `04.04` |
| `CR-INF-L4-REMIND` | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` | `inf_l4_reminder_vo` | L4 ×2 | `04.02` `04.05` |
| `CR-INF-L4-RETARGET` | `INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` | `inf_l4_retarget_vo` | L4 ×2 | `04.03` `04.06` |
| `CR-INF-L4-CONF-*` | `INFLUENCER-L4-CONFIRMS-*-COMPOSITE-15s.mp4` | `inf_l4_confirms_*_vo` | L4 ×6 | `04.07`–`04.12` |
| `CR-INF-L5-*` | `INFLUENCER-L5-*-COMPOSITE-15s.mp4` | `inf_l5_*_vo` | L5 ×6 | `05.01`–`05.06` |

### Tier B — Silent / legacy (BG sources or standalone slots)

| ID | File | Best for |
|----|------|----------|
| `CR-WALK-SILENT` | `ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` | L1/L3 full-screen · composite BG for calling all |
| `CR-OPEN-V1` | `ads/influencer-recruit/output/TIKTOK-OPEN-CALL-CREATORS-15s.mp4` | L3 ×6 silent poster slot |
| `CR-OPEN-EXACT-POSTER` | `ads/influencer-recruit/output/OPEN-CALL-EXACT-POSTER-15s.mp4` | Poster A/B BG only — ship `CR-INF-OPEN-POSTER-COMP` |
| `CR-OPEN-OPT-POSTER` | `ads/influencer-recruit/output/TIKTOK-OPEN-CALL-OPTIMIZED-15s.mp4` | Poster A/B BG — ship `CR-INF-JOIN-POSTER-COMP` |

### Tier C — Long-form → cutdowns / awareness

| ID | File | Best for |
|----|------|----------|
| `CR-EVOL-60-VO` | `ads/brief-003/output/EVOLUTION-60s-9x16-VO.mp4` | Awareness, brand story (or trim to 15s) |
| `CR-MEMORY-60` | `ads/brief-004/output/MEMORY-60s-16x9-silent.mp4` | Emotional retarget, countdown |

### Tier D — UGC plates (from catalog — reuse heavily)

| ID | File | Catalog ID |
|----|------|------------|
| `UGC-WHATIS` | `ugc/output/ads-avatar-what-is-hologram-boxing-plate.mp4` | `29_waitlist`, `01_what_is` |
| `UGC-TENT` | `ugc/output/02-the-inflatable-tent-plate.mp4` | `02_tent` |
| `UGC-ROSTER` | `ugc/output/03-meet-the-wave-fighters-plate.mp4` | `03_roster` |
| `UGC-HEADSET` | `ugc/output/04-ar-headset-experience-plate.mp4` | `04_headset` |
| `UGC-HOW` | `ugc/output/13-how-it-works-four-steps-plate.mp4` | `13_how_it_works` |
| `UGC-HERO` | `ugc/output/11-home-hero-brand-plate.mp4` | `11_hero` |
| `UGC-ALLAGES` | `ugc/output/10-all-ages-family-night-plate.mp4` | `10_all_ages` |
| `UGC-STREAM` | `ugc/output/08-watch-free-on-kick-twitch-plate.mp4` | `08_stream` |
| `UGC-LIVE-FX` | `ads/output/32-live-interactive-effects-plate.mp4` | `32_interactive` |
| `UGC-HB002` | `ugc/output/15-hologram-boxing-002-plate.mp4` | `15_hb002` |
| `UGC-PRIZE` | `ugc/output/06-pick-your-fighter-win-prizes-plate.mp4` | `06_prizes` |
| `UGC-POV` | `ugc/output/07-headset-pov-vs-attendee-pov-plate.mp4` | `07_pov` |
| `UGC-HB001` | `ugc/output/14-event-archive-hb001-plate.mp4` | `14_hb001` |

---

## Creative reuse map (same file → many ad sets)

| Creative ID | Ad sets it should run in | Times reused |
|-------------|--------------------------|--------------|
| `CR-WALK-VO` | Awareness Combat · Awareness General · Convert FoundingFan · Retarget Landing · Countdown 7d | **5+** |
| `CR-FUTURE-VO` | Awareness Tech · Convert FoundingFan · Convert Tech · Retarget Video | **4+** |
| `CR-FUTURE-MYST` | Awareness General · Consideration Warm · Retarget Landing | **3+** |
| `CR-INF-OPEN-COMP` | L3 all 6 ad groups · L4 retarget cross | **6+** |
| `CR-INF-JOIN-COMP` | L3 all 6 ad groups | **6** |
| `CR-INF-LIVEFX-COMP` | L2 ×2 · L3 ×6 | **8** |
| `CR-WALK-SILENT` | L1 ×2 · L3 walk cross · fan funnels | **5+** |
| `UGC-WHATIS` | Awareness General · Convert Explain · Retarget · Consideration | **4+** |
| `UGC-TENT` | Awareness · Consideration · Convert | **3+** |
| `UGC-HB002` | Countdown 14d · Countdown 7d · Countdown 48h · Convert urgency | **4** |
| `UGC-PRIZE` | Countdown · Convert prize angle · Consideration | **3+** |

---

## Standard fields (every ad set — fill completely)

| Field | Value |
|-------|--------|
| **Locations** | Orlando, Miami, Tampa, Jacksonville (Meta 25 mi · TikTok DMA 534/528/539/561) |
| **Language** | English |
| **Landing (email goal)** | `https://www.hologramboxing.com/landing.html` + UTMs below |
| **CTA** | Sign Up |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` |
| **Status at launch** | PAUSED / DISABLE until approved |

**UTM pattern:**

```
?utm_source={meta|tiktok}&utm_medium=paid_social&utm_campaign={campaign_slug}&utm_content={creative_id}_{adset_slug}
```

---

# INFLUENCER STAIRCASE — 5 campaigns · 54 ads *(PRIORITY #1)*

**Goal:** Recruit streamers/creators · sign up at `landing.html`  
**UTM:** `influencer_recruit` · **Detail:** [launch matrix](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md)

| Layer | Campaign | Ad groups | Ads | Doc IDs |
|-------|----------|-----------|-----|---------|
| L1 Awareness | `CAMP_HB_Influencer_L1_SeeYou_001` | 2 | 6 | `01.01`–`01.06` |
| L2 Consideration | `CAMP_HB_Influencer_L2_Curious_001` | 2 | 6 | `02.01`–`02.06` |
| L3 Conversion | `CAMP_HB_InfluencerRecruit_001` | 6 | 24 | `03.01`–`03.24` |
| L4 Retargeting | `CAMP_HB_Influencer_L4_ComeBack_001` | 2 | **12** | `04.01`–`04.12` |
| L5 Countdown | `CAMP_HB_Influencer_L5_ShowUp_001` | 2 | 6 | `05.01`–`05.06` |

**Bonus A/B (not in staircase JSON):** preview #55–#64 · doc `06.01`–`06.10`

### L3 — 6 ad groups × 4 creatives (ship files)

| Slot | Creative ID | Ship file | Preview doc (per group) |
|------|-------------|-----------|-------------------------|
| Open Call Exact | `CR-INF-OPEN-COMP` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | `03.01` `03.09` `03.13` `03.17` `03.21` + variants |
| Open Call Optimized | `CR-INF-JOIN-COMP` | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | `03.05` `03.10` … slot 2 each group |
| Creators v1 | `CR-OPEN-V1` | `TIKTOK-OPEN-CALL-CREATORS-15s.mp4` | slot 3 each group (silent) |
| Live FX | `CR-INF-LIVEFX-COMP` | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | slot 4 each group |

**utm_content pattern:** `{ad_name_slug}_{creative_key}` — see matrix `*.06` sections per ad.

---

# CAMPAIGN 1 — Creator recruit L3 *(LIVE — 6 ad groups · 24 ads)*

**Goal:** Recruit streamers/creators to partner + sign up  
**Layer:** 3 Conversion (creators) · **Ship composites** per table above

### TikTok — `CAMP_HB_InfluencerRecruit_001` · $20/day CBO · OFF

| Ad group | Status | Preview # | Doc IDs | Age |
|----------|--------|-----------|---------|-----|
| `ADGRP_HB_OpenCallExact_US_Creators18-44` | **LIVE** | 13–16 | `03.01`–`03.04` | 18–44 |
| `ADGRP_HB_InfluencerRecruit_US_18-44` | **LIVE** | 17–20 | `03.05`–`03.08` | 18–44 |
| `ADGRP_HB_InfluencerRecruit_GamingStreamers_FL` | **LIVE** | 21–24 | `03.09`–`03.12` | 18–44 |
| `ADGRP_HB_InfluencerRecruit_CombatCreators_FL` | **LIVE** | 25–28 | `03.13`–`03.16` | 18–44 |
| `ADGRP_HB_InfluencerRecruit_ReelsCreators_FL` | **LIVE** | 29–32 | `03.17`–`03.20` | 18–44 |
| `ADGRP_HB_InfluencerRecruit_OrlandoMiami_FL` | **LIVE** | 33–36 | `03.21`–`03.24` | 18–44 |

**Example ads (Open Call Exact ad group):**

| Ad name | Creative ID | Ship file | utm_content | Doc ID |
|---------|-------------|-----------|-------------|--------|
| `AD_HB_OpenCallExact_Poster15s` | `CR-INF-OPEN-COMP` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | `open_call_exact_poster_inf_open_call_vo` | `03.01.00` |
| `AD_HB_OpenCallExact_SignUp_V2` | `CR-INF-OPEN-COMP` | same | `open_call_exact_signup_v2_inf_open_call_vo` | `03.02.00` |
| `AD_HB_OpenCallExact_WalkInside_X` | `CR-WALK-SILENT` | `WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` | `walk_inside_creator_cross_walk` | `03.03.00` |
| `AD_HB_OpenCallExact_StreamFX` | `CR-INF-LIVEFX-COMP` | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | `…_livefx` | `03.04.00` |

**All 24 rows:** [launch matrix §03](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md#030000--l3--conversion-sign-up--6-ad-groups--4-ads)

### Meta — `CAMP_HB_InfluencerRecruit_001` · PAUSED

| Ad set | Status | Audience | Age |
|--------|--------|----------|-----|
| `ADSET_HB_OpenCallExact_US_Creators18-34` | **LIVE** | FL cities + Twitch/YouTube/Gamer interests | 18–34 |
| `ADSET_HB_InfluencerRecruit_US_18-44` | **LIVE** | FL cities + creator interests | 18–44 |
| *(+4 ad sets scripted)* | Pending token | Gaming · Combat · Reels · Orlando/Miami | 18–44 |

**Meta ads:** Use same **ship files** and `utm_content` as TikTok rows in launch matrix.

**Campaign 1 totals:** 6 TT ad groups · 6 Meta ad sets (2 live + 4 scripted) · **24 ads**

---

# CAMPAIGN 2 — Founding Fan email capture *(BUILD NEXT)*

**Goal:** Fan waitlist emails  
**Layer:** 3 Conversion  
**Objective:** Meta Leads/Traffic · TikTok Website Conversions (FORM)

### New ad sets to create

| Ad set / Ad group | Platform | Audience interests | Age | Budget |
|-------------------|----------|-------------------|-----|--------|
| `ADSET_HB_Convert_CombatSports_FL` | Meta | MMA, boxing, UFC, live events | 18–44 | $15/day |
| `ADSET_HB_Convert_TechGamers_FL` | Meta | Video games, VR, technology | 18–34 | $15/day |
| `ADSET_HB_Convert_FamilyNight_FL` | Meta | Family entertainment, date night | 25–54 | $10/day |
| `ADSET_HB_Convert_General_FL` | Meta | Broad FL + live entertainment | 18–44 | $15/day |
| `ADGRP_HB_Convert_CombatSports_FL` | TikTok | FL DMAs · combat interest suggestions | 18–44 | CBO $25/day |
| `ADGRP_HB_Convert_TechGamers_FL` | TikTok | FL DMAs · gaming/tech | 18–34 | (same campaign) |
| `ADGRP_HB_Convert_General_FL` | TikTok | FL DMAs · broad | 18–44 | (same campaign) |

### Ads per ad set (4 ads each × 7 ad sets = 28 ad slots)

**Use this ad pack in EVERY Founding Fan ad set** — same videos, different `utm_content` suffix = `{creative}_{adset_slug}`:

| Ad name suffix | Creative | TikTok text / Meta headline | Primary message angle |
|----------------|----------|----------------------------|------------------------|
| `_WalkInside` | `CR-WALK-VO` | Would you walk inside? / Would You Walk Inside? | Mystery hook |
| `_FutureIsHere` | `CR-FUTURE-VO` | Become a Founding Fan / The Future Is Here | Hype + VO |
| `_FutureMystery` | `CR-FUTURE-MYST` | THE FUTURE IS HERE / The Future Is Here | Cinematic no VO |
| `_WhatIs` | `UGC-WHATIS` | What is hologram boxing? Tap to join. / Join the Waitlist | Explainer |

**Example full ad name:** `AD_HB_Convert_CombatSports_WalkInside`  
**Example URL:** `.../landing.html?utm_campaign=founding_fan&utm_content=walk_inside_combat_fl`

**Campaign 2 totals:** 7 ad sets · **28 ads**

---

# CAMPAIGN 3 — Brand awareness *(BUILD)*

**Goal:** Views + remember the brand (still send to landing)  
**Layer:** 1 Awareness  
**Objective:** Meta Awareness/Video views · TikTok Reach/Video views · **$10–15/day**

### Ad sets

| Ad set / Ad group | Platform | Interests | Age |
|-------------------|----------|-----------|-----|
| `ADSET_HB_Aware_CombatSports_FL` | Meta | MMA, boxing, UFC | 18–44 |
| `ADSET_HB_Aware_Tech_FL` | Meta | VR, AI, video games | 18–34 |
| `ADSET_HB_Aware_Family_FL` | Meta | Family activities | 25–54 |
| `ADSET_HB_Aware_Tourists_Orlando` | Meta | Orlando DMA only · travel/attractions | 18–54 |
| `ADGRP_HB_Aware_CombatSports_FL` | TikTok | FL DMAs | 18–44 |
| `ADGRP_HB_Aware_Tech_FL` | TikTok | FL DMAs | 18–34 |
| `ADGRP_HB_Aware_General_FL` | TikTok | FL DMAs | 18–44 |

### Ad pack (3 ads per ad set × 7 = 21 ads)

| Ad suffix | Creative | Hook |
|-----------|----------|------|
| `_WalkInside` | `CR-WALK-VO` | Would you walk inside? |
| `_FutureMystery` | `CR-FUTURE-MYST` | Premium trailer energy |
| `_Evolution15` | `CR-EVOL-60-VO` *(first 15s)* | History → future of combat |

**Landing:** still `landing.html` · `utm_campaign=awareness`

**Campaign 3 totals:** 7 ad sets · **21 ads**

---

# CAMPAIGN 4 — Consideration / warm explainers *(BUILD)*

**Goal:** People who need more info before email  
**Layer:** 2 Consideration  
**Objective:** Traffic → landing or site pages (still push email CTA)

### Ad sets

| Ad set / Ad group | Platform | Audience |
|-------------------|----------|----------|
| `ADSET_HB_Consider_Explainer_FL` | Meta | Cold FL + entertainment interests |
| `ADSET_HB_Consider_Tech_FL` | Meta | Tech/gaming FL |
| `ADGRP_HB_Consider_Explainer_FL` | TikTok | FL DMAs 18–44 |
| `ADGRP_HB_Consider_Streamers_FL` | TikTok | FL + gaming/streaming suggestions |

### Ad pack (4 ads × 4 ad sets = 16 ads)

| Ad suffix | Creative | Message |
|-----------|----------|---------|
| `_WhatIs` | `UGC-WHATIS` | What is hologram boxing? |
| `_Tent` | `UGC-TENT` | Inside the inflatable tent |
| `_Headset` | `UGC-HEADSET` | AR headset experience |
| `_HowItWorks` | `UGC-HOW` | 4 steps — buy, gear up, watch, win |

**Campaign 4 totals:** 4 ad sets · **16 ads**

---

# CAMPAIGN 5 — Retargeting *(BUILD after pixel data)*

**Goal:** Cheap email sign-ups from warm visitors  
**Layer:** 4 Retarget  
**Audience:** Landing visitors 7–14 days, exclude Lead event

### Ad sets

| Ad set / Ad group | Platform | Custom audience |
|-------------------|----------|-----------------|
| `ADSET_HB_RT_Landing_7d_NoLead` | Meta | Visited landing, no Lead, 7d |
| `ADSET_HB_RT_Video75_14d` | Meta | 75% video viewers 14d |
| `ADGRP_HB_RT_Landing_7d_NoLead` | TikTok | Pixel audience / retarget list |
| `ADGRP_HB_RT_Engagers_14d` | TikTok | Engaged with profile/video |

### Ad pack (3 ads × 4 = 12 ads) — **reuse heroes with urgency copy**

| Ad suffix | Creative | Message |
|-----------|----------|---------|
| `_WalkInside_RT` | `CR-WALK-VO` | You looked — don't miss the first event |
| `_Future_RT` | `CR-FUTURE-VO` | Founding Fan spots — sign up now |
| `_WhatIs_RT` | `UGC-WHATIS` | Still curious? Join the waitlist |

**Campaign 5 totals:** 4 ad sets · **12 ads**

---

# CAMPAIGN 6 — Event & countdown *(BUILD when HB 002 ≤ 14 days out)*

**Goal:** Urgency + event awareness + email/ticket intent  
**Layer:** 5 Countdown

### Ad sets

| Ad set / Ad group | Platform | Window |
|-------------------|----------|--------|
| `ADSET_HB_Event_14d_FL` | Meta | 14–8 days out |
| `ADSET_HB_Event_7d_FL` | Meta | 7–3 days out |
| `ADSET_HB_Event_48h_FL` | Meta | 48h–0 |
| `ADGRP_HB_Event_14d_FL` | TikTok | 14–8 days |
| `ADGRP_HB_Event_7d_FL` | TikTok | 7–3 days |
| `ADGRP_HB_Event_48h_FL` | TikTok | 48h–0 |

### Ad pack (3 ads × 6 = 18 ads)

| Ad suffix | Creative | Message |
|-----------|----------|---------|
| `_HB002` | `UGC-HB002` | HB 002 · $10K pool · Gold vs Fire |
| `_Prize10K` | `UGC-PRIZE` | $10K prize pool — pick your fighter |
| `_Roster` | `UGC-ROSTER` | Meet Wave Gold vs Wave Fire |

**Optional cross-use:** `CR-WALK-VO` in 48h ad set as “Last chance to become a Founding Fan”

**Campaign 6 totals:** 6 ad sets · **18 ads**

---

# CAMPAIGN 7 — Day 1 Experience *(Meta LIVE — expand)*

**Goal:** Original fan hero ads  
**Status:** `CAMP_HB_Experience_001` · `ADSET_HB_Experience_US_18-44` · PAUSED

### Ads to add to existing Meta ad set (reuse + FL geo update)

| Ad name | Creative | Headline |
|---------|----------|----------|
| `AD_HB_WalkInside_Launch15s` | `CR-WALK-VO` | Would You Walk Inside? *(may exist)* |
| `AD_HB_FutureIsHere_Launch15s_VO` | `CR-FUTURE-VO` | The Future Is Here *(may exist)* |
| `AD_HB_FutureIsHere_Mystery15s` | `CR-FUTURE-MYST` | The Future Is Here |
| `AD_HB_WhatIs_Waitlist15s` | `UGC-WHATIS` | Join the Waitlist |
| `AD_HB_Tent_Experience15s` | `UGC-TENT` | Inside the Hologram Tent |

**Also create matching TikTok campaign:** `CAMP_HB_Experience_001` with `ADGRP_HB_Experience_FL_18-44` + same 5 ads.

**Campaign 7 totals:** 1 Meta ad set (live) + 1 TikTok ad group to add · **10 ads** (5 per platform)

---

## Master build order (recommended)

| Phase | What | Ad sets | Ads | Budget |
|-------|------|---------|-----|--------|
| **Done** | Creator recruit | 4 | 4 live (+8 expand) | $20/day TT |
| **Phase A** | Founding Fan convert | 7 | 28 | $25–40/day |
| **Phase B** | Expand creator + experience ads | 0 new sets | 18 | existing |
| **Phase C** | Awareness | 7 | 21 | $15/day |
| **Phase D** | Consideration | 4 | 16 | $10/day |
| **Phase E** | Retarget | 4 | 12 | $10/day |
| **Phase F** | Countdown | 6 | 18 | scale event week |

---

## Copy bank (paste into Ads Manager)

### Founding Fan — TikTok (≤100 chars)

1. Would you walk inside? AI hologram boxers LIVE. Become a Founding Fan.
2. The future of live entertainment is here. Sign up — first access to HB 002.
3. What is hologram boxing? Tent + AR + AI fighters. Join the waitlist.
4. $10K prize pool. Gold vs Fire. Founding Fans get in first — sign up.

### Founding Fan — Meta primary text

1. Something the world has never seen is waiting behind that door. AI hologram boxers. Live. Front row energy. **Become a Founding Fan** — drop your email for early access.
2. Walk into the inflatable tent, gear up, watch Wave hologram boxers in the glowing square. **Join the waitlist** before tickets drop.
3. Hologram Boxing 002 is loading — $10,000 prize pool, Gold vs Fire main event. **Sign up** for ticket alerts and exclusive drops.

### Countdown — urgency

1. **14 days** until Hologram Boxing 002. Founding Fans first — sign up now.
2. **One week out.** Limited tent capacity. Get on the list.
3. **48 hours.** Last call for Founding Fan early access.

---

## Tracking per ad (required)

| Check | Meta | TikTok |
|-------|------|--------|
| Pixel on ad/account | ✓ | ✓ |
| Conversion event | Lead / CompleteRegistration | FORM |
| UTM on URL | ✓ | ✓ + utm_params block |
| url_tags (Meta) | `utm_source=meta&utm_medium=paid_social&utm_campaign={campaign}` | — |
| 2+ text variants | headline + primary + description | ad_text_list × 2 |
| Thumbnail set | ✓ | cover from video |
| Identity | Romethelife | @hologramboxing |

---

## Files to use when building

| File | Purpose |
|------|---------|
| [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) | **54 staircase + 10 bonus** — per-ad ship file, targeting, UTMs |
| [INFLUENCER-ADS-MASTER-GUIDE.md](./INFLUENCER-ADS-MASTER-GUIDE.md) | Readiness, blockers, turn-on order |
| `scripts/marketing/build-influencer-composites.ps1` | Rebuild cinematic + poster composites |
| `npm run docs:launch-matrix` | Regenerate launch matrix from preview HTML |
| [ALL-ADS-CATALOG.json](../ads/ALL-ADS-CATALOG.json) | Copy + paths for 19 catalog ads |
| [GEO-TARGETING.json](../ads/influencer-recruit/GEO-TARGETING.json) | FL city/DMA IDs |
| [ADS-COMPLETION-CHECKLIST.json](../ads/influencer-recruit/ADS-COMPLETION-CHECKLIST.json) | What's live today |
| [ADS-VIDEO-REGISTRY.md](../ads/ADS-VIDEO-REGISTRY.md) | All video exports |

---

## Summary — reuse beats one-offs

```
15 core video files
  × 3–6 ad sets each
  × 2 platforms (Meta + TikTok)
  = 78 total ad objects from ~15 creatives (not 78 unique videos)
```

**Next action:** Build **Campaign 2 (Founding Fan)** first — 7 ad sets, 28 ads, reusing `CR-WALK-VO`, `CR-FUTURE-VO`, `CR-FUTURE-MYST`, and `UGC-WHATIS` four times each across Florida audience slices.

---

*Last updated: July 12, 2026 — Influencer staircase 54 ads + composite ship IDs. Fan matrix below unchanged.*
