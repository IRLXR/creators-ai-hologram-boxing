# Influencer Preview → Launch Matrix

**Last updated:** July 12, 2026  
**Purpose:** Bridge between the [64-card preview](../ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html) and TikTok/Meta launch — targeting, funnel phase, ship files, copy, and UTMs.  
**ID format:** `XX.YY.ZZ` — layer.slot.section (`XX.YY.00` = ad slot · `XX.YY.01`–`06` = field groups under that slot).

---

## 00.00.00 — Document overview

| Item | Value |
|------|-------|
| **Preview URL (local)** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html |
| **Open preview** | `npm run preview:influencer-ads:open` or `OPEN-INFLUENCER-ADS-PREVIEW.bat` |
| **Staircase ads** | 54 (#1–#54) — 48 base + 6 L4 confirmation |
| **Bonus A/B ads** | 10 (#55–#64) — 2 HF B-roll · 8 poster composites |
| **Total preview cards** | **64** |
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **Goal** | Creators sign up to co-stream Hologram Boxing |
| **Machine spec** | `ads/influencer-recruit/INFLUENCER-STAIRCASE.json` |
| **Deploy manifest** | `ads/influencer-recruit/LAUNCH-MANIFEST.json` |

### 00.00.01 Related documentation

| ID | Document | Role |
|----|----------|------|
| — | [INFLUENCER-ADS-MASTER-GUIDE.md](./INFLUENCER-ADS-MASTER-GUIDE.md) | Ops, readiness, platform status |
| — | [INFLUENCER-STAIRCASE-GUIDE.md](./INFLUENCER-STAIRCASE-GUIDE.md) | Layer rules, turn-on order |
| — | [AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md](./AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md) | Full funnel (fans + creators) |
| — | [AD-SET-AD-BUILD-MATRIX.md](./AD-SET-AD-BUILD-MATRIX.md) | Ad set × creative reuse |
| — | [VIDEO-TOPIC-MATCHING-GUIDE.md](./VIDEO-TOPIC-MATCHING-GUIDE.md) | Script ↔ B-roll topic fit |
| — | [VIDEO-BROLL-TALKING-HEAD-MATCHING.md](./VIDEO-BROLL-TALKING-HEAD-MATCHING.md) | Composite build rules |
| — | [INFLUENCER-TALKING-HEAD-SCRIPTS.md](../ads/influencer-recruit/INFLUENCER-TALKING-HEAD-SCRIPTS.md) | VO scripts + Seedance prompts |

---

## 00.01.00 — Master index (all 64 preview cards)

| Preview # | Doc ID | Layer | Funnel | Ad name | Creative key | Ship file | Launch |
|-----------|--------|-------|--------|---------|--------------|-----------|--------|
| 1 | `01.01.00` | L1 | Awareness | `AD_HB_Inf_L1_CallingAll_Gaming` | `inf_calling_all_vo` | `INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` | Staircase |
| 2 | `01.02.00` | L1 | Awareness | `AD_HB_Inf_L1_WalkInside_Gaming` | `walk` | `WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` | Staircase |
| 3 | `01.03.00` | L1 | Awareness | `AD_HB_Inf_L1_FutureMystery_Gaming` | `future_mystery` | `Director_Brief_001_Version_B_Cinematic_Mystery.mp4` | Staircase |
| 4 | `01.04.00` | L1 | Awareness | `AD_HB_Inf_L1_CallingAll_Creators` | `inf_calling_all_vo` | `INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` | Staircase |
| 5 | `01.05.00` | L1 | Awareness | `AD_HB_Inf_L1_WalkInside_Creators` | `walk` | `WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` | Staircase |
| 6 | `01.06.00` | L1 | Awareness | `AD_HB_Inf_L1_FutureMystery_Creators` | `future_mystery` | `Director_Brief_001_Version_B_Cinematic_Mystery.mp4` | Staircase |
| 7 | `02.01.00` | L2 | Consideration | `AD_HB_Inf_L2_LiveFX_Gaming` | `livefx` | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | Staircase |
| 8 | `02.02.00` | L2 | Consideration | `AD_HB_Inf_L2_CoStream_Gaming` | `stream` | `INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4` | Staircase |
| 9 | `02.03.00` | L2 | Consideration | `AD_HB_Inf_L2_InsideTent_Gaming` | `tent` | `INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` | Staircase |
| 10 | `02.04.00` | L2 | Consideration | `AD_HB_Inf_L2_LiveFX_Creators` | `livefx` | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | Staircase |
| 11 | `02.05.00` | L2 | Consideration | `AD_HB_Inf_L2_CoStream_Creators` | `stream` | `INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4` | Staircase |
| 12 | `02.06.00` | L2 | Consideration | `AD_HB_Inf_L2_InsideTent_Creators` | `tent` | `INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` | Staircase |
| 13 | `03.01.00` | L3 | Conversion | `AD_HB_OpenCallExact_Poster15s` | `inf_open_call_vo` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | Staircase |
| 14 | `03.02.00` | L3 | Conversion | `AD_HB_OpenCallExact_SignUp_V2` | `inf_open_call_vo` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | Staircase |
| 15 | `03.03.00` | L3 | Conversion | `AD_HB_OpenCallExact_WalkInside_X` | `walk` | `WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` | Staircase |
| 16 | `03.04.00` | L3 | Conversion | `AD_HB_OpenCallExact_StreamFX` | `livefx` | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | Staircase |
| 17 | `03.05.00` | L3 | Conversion | `AD_HB_OpenCall_Optimized15s` | `inf_join_team_vo` | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | Staircase |
| 18 | `03.06.00` | L3 | Conversion | `AD_HB_OpenCall_Optimized_Future_X` | `future_vo` | `FUTURE-IS-HERE-15s-9x16-ambient.mp4` | Staircase |
| 19 | `03.07.00` | L3 | Conversion | `AD_HB_OpenCall_UGC_WhatIs` | `whatis` | `INFLUENCER-L3-WHATIS-COMPOSITE-15s.mp4` | Staircase |
| 20 | `03.08.00` | L3 | Conversion | `AD_HB_OpenCall_Tent_Cross` | `tent` | `INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` | Staircase |
| 21 | `03.09.00` | L3 | Conversion | `AD_HB_Influencer_Gaming_OpenCallExact` | `inf_open_call_vo` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | Staircase |
| 22 | `03.10.00` | L3 | Conversion | `AD_HB_Influencer_Gaming_OpenCallOpt` | `inf_join_team_vo` | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | Staircase |
| 23 | `03.11.00` | L3 | Conversion | `AD_HB_Influencer_Gaming_OpenCallCreators` | `open_v1` | `TIKTOK-OPEN-CALL-CREATORS-15s.mp4` | Staircase |
| 24 | `03.12.00` | L3 | Conversion | `AD_HB_Influencer_Gaming_LiveFX` | `livefx` | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | Staircase |
| 25 | `03.13.00` | L3 | Conversion | `AD_HB_Influencer_Combat_OpenCallExact` | `inf_open_call_vo` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | Staircase |
| 26 | `03.14.00` | L3 | Conversion | `AD_HB_Influencer_Combat_OpenCallOpt` | `inf_join_team_vo` | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | Staircase |
| 27 | `03.15.00` | L3 | Conversion | `AD_HB_Influencer_Combat_OpenCallCreators` | `open_v1` | `TIKTOK-OPEN-CALL-CREATORS-15s.mp4` | Staircase |
| 28 | `03.16.00` | L3 | Conversion | `AD_HB_Influencer_Combat_LiveFX` | `livefx` | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | Staircase |
| 29 | `03.17.00` | L3 | Conversion | `AD_HB_Influencer_Reels_OpenCallExact` | `inf_open_call_vo` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | Staircase |
| 30 | `03.18.00` | L3 | Conversion | `AD_HB_Influencer_Reels_OpenCallOpt` | `inf_join_team_vo` | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | Staircase |
| 31 | `03.19.00` | L3 | Conversion | `AD_HB_Influencer_Reels_OpenCallCreators` | `open_v1` | `TIKTOK-OPEN-CALL-CREATORS-15s.mp4` | Staircase |
| 32 | `03.20.00` | L3 | Conversion | `AD_HB_Influencer_Reels_LiveFX` | `livefx` | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | Staircase |
| 33 | `03.21.00` | L3 | Conversion | `AD_HB_Influencer_OrlandoMiami_OpenCallExact` | `inf_open_call_vo` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | Staircase |
| 34 | `03.22.00` | L3 | Conversion | `AD_HB_Influencer_OrlandoMiami_OpenCallOpt` | `inf_join_team_vo` | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | Staircase |
| 35 | `03.23.00` | L3 | Conversion | `AD_HB_Influencer_OrlandoMiami_OpenCallCreators` | `open_v1` | `TIKTOK-OPEN-CALL-CREATORS-15s.mp4` | Staircase |
| 36 | `03.24.00` | L3 | Conversion | `AD_HB_Influencer_OrlandoMiami_LiveFX` | `livefx` | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | Staircase |
| 37 | `04.01.00` | L4 | Retargeting | `AD_HB_Inf_L4_PartnerSpotlight_Gaming` | `inf_l4_partner_reviews_vo` | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` | Staircase |
| 38 | `04.02.00` | L4 | Retargeting | `AD_HB_Inf_L4_Reminder_Gaming` | `inf_l4_reminder_vo` | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` | Staircase |
| 39 | `04.03.00` | L4 | Retargeting | `AD_HB_Inf_L4_OpenCallExact_Gaming` | `inf_l4_retarget_vo` | `INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` | Staircase |
| 40 | `04.04.00` | L4 | Retargeting | `AD_HB_Inf_L4_PartnerSpotlight_Creators` | `inf_l4_partner_reviews_vo` | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` | Staircase |
| 41 | `04.05.00` | L4 | Retargeting | `AD_HB_Inf_L4_Reminder_Creators` | `inf_l4_reminder_vo` | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` | Staircase |
| 42 | `04.06.00` | L4 | Retargeting | `AD_HB_Inf_L4_OpenCallExact_Creators` | `inf_l4_retarget_vo` | `INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` | Staircase |
| 43 | `04.07.00` | L4 | Retargeting | `AD_HB_Inf_L4_ConfirmsPartner_Gaming` | `inf_l4_confirms_partner_vo` | `INFLUENCER-L4-CONFIRMS-PARTNER-COMPOSITE-15s.mp4` | Staircase |
| 44 | `04.08.00` | L4 | Retargeting | `AD_HB_Inf_L4_ConfirmsReminder_Gaming` | `inf_l4_confirms_reminder_vo` | `INFLUENCER-L4-CONFIRMS-REMINDER-COMPOSITE-15s.mp4` | Staircase |
| 45 | `04.09.00` | L4 | Retargeting | `AD_HB_Inf_L4_ConfirmsOpenCall_Gaming` | `inf_l4_confirms_open_call_vo` | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-15s.mp4` | Staircase |
| 46 | `04.10.00` | L4 | Retargeting | `AD_HB_Inf_L4_ConfirmsPartner_Creators` | `inf_l4_confirms_partner_vo` | `INFLUENCER-L4-CONFIRMS-PARTNER-COMPOSITE-15s.mp4` | Staircase |
| 47 | `04.11.00` | L4 | Retargeting | `AD_HB_Inf_L4_ConfirmsReminder_Creators` | `inf_l4_confirms_reminder_vo` | `INFLUENCER-L4-CONFIRMS-REMINDER-COMPOSITE-15s.mp4` | Staircase |
| 48 | `04.12.00` | L4 | Retargeting | `AD_HB_Inf_L4_ConfirmsOpenCall_Creators` | `inf_l4_confirms_open_call_vo` | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-15s.mp4` | Staircase |
| 49 | `05.01.00` | L5 | Countdown | `AD_HB_Inf_L5_CountdownTimer_Gaming` | `inf_l5_countdown_vo` | `INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-15s.mp4` | Staircase |
| 50 | `05.02.00` | L5 | Countdown | `AD_HB_Inf_L5_LastCall_Gaming` | `inf_l5_last_call_vo` | `INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-15s.mp4` | Staircase |
| 51 | `05.03.00` | L5 | Countdown | `AD_HB_Inf_L5_OpenCallOpt_Gaming` | `inf_l5_final_slots_vo` | `INFLUENCER-L5-FINAL-SLOTS-CLOSING-COMPOSITE-15s.mp4` | Staircase |
| 52 | `05.04.00` | L5 | Countdown | `AD_HB_Inf_L5_CountdownTimer_Creators` | `inf_l5_countdown_vo` | `INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-15s.mp4` | Staircase |
| 53 | `05.05.00` | L5 | Countdown | `AD_HB_Inf_L5_LastCall_Creators` | `inf_l5_last_call_vo` | `INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-15s.mp4` | Staircase |
| 54 | `05.06.00` | L5 | Countdown | `AD_HB_Inf_L5_OpenCallOpt_Creators` | `inf_l5_final_slots_vo` | `INFLUENCER-L5-FINAL-SLOTS-CLOSING-COMPOSITE-15s.mp4` | Staircase |
| 55 | `06.01.00` | BONUS | A/B test pool | `BONUS_OpenCall_HF_386B5E5C` | `inf_open_call_hf` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-HF-386B5E5C-15s.mp4` | A/B only |
| 56 | `06.02.00` | BONUS | A/B test pool | `BONUS_JoinTeam_HF_B002936B` | `inf_join_team_hf` | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-HF-B002936B-15s.mp4` | A/B only |
| 57 | `06.03.00` | BONUS | A/B test pool | `BONUS_OpenCall_Poster_AB` | `inf_open_call_poster` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-POSTER-15s.mp4` | A/B only |
| 58 | `06.04.00` | BONUS | A/B test pool | `BONUS_CallingAll_Poster_AB` | `inf_calling_all_poster` | `INFLUENCER-CALLING-ALL-COMPOSITE-POSTER-15s.mp4` | A/B only |
| 59 | `06.05.00` | BONUS | A/B test pool | `BONUS_JoinTeam_Poster_AB` | `inf_join_team_poster` | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-POSTER-15s.mp4` | A/B only |
| 60 | `06.06.00` | BONUS | A/B test pool | `BONUS_L4_Partner_Poster_AB` | `inf_l4_partner_poster` | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-POSTER-15s.mp4` | A/B only |
| 61 | `06.07.00` | BONUS | A/B test pool | `BONUS_L4_Reminder_Poster_AB` | `inf_l4_reminder_poster` | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-POSTER-15s.mp4` | A/B only |
| 62 | `06.08.00` | BONUS | A/B test pool | `BONUS_L5_Countdown_Poster_AB` | `inf_l5_countdown_poster` | `INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-POSTER-15s.mp4` | A/B only |
| 63 | `06.09.00` | BONUS | A/B test pool | `BONUS_L5_LastCall_Poster_AB` | `inf_l5_last_call_poster` | `INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-POSTER-15s.mp4` | A/B only |
| 64 | `06.10.00` | BONUS | A/B test pool | `BONUS_L4_ConfirmsOpenCall_Poster_AB` | `inf_l4_confirms_open_call_poster` | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-POSTER-15s.mp4` | A/B only |

---

## 00.02.00 — Global targeting & platform rules

### 00.02.01 Geo & language

| Field | Value |
|-------|-------|
| **Locations** | Orlando · Miami · Tampa · Jacksonville (FL DMAs) |
| **TikTok DMA codes** | 534 · 528 · 539 · 561 |
| **Meta radius** | 25 mi around each city (when using city targeting) |
| **Language** | English |

### 00.02.02 Turn-on order (influencer staircase)

| Order | Layer | Doc IDs | When |
|-------|-------|---------|------|
| 1 | **L1 + L2 + L3** | `01.*` · `02.*` · `03.*` | Cold creator prospecting + signup — turn on first |
| 2 | **L4** | `04.*` | After L3 runs **7+ days** · pixel has **landing visitors 7d excl. Lead** |
| 3 | **L5** | `05.*` | When HB 002 is **≤14 days out** · sync site countdown |
| — | **Bonus** | `06.*` | A/B tests only — duplicate into live ad groups; not auto-launched |

### 00.02.03 Platform accounts & pixels

| Platform | Account / ID | Pixel |
|----------|--------------|-------|
| **TikTok advertiser** | `7658020511833014273` | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **TikTok identity** | @hologramboxing | — |
| **Meta ad account** | `534185933351087` | `3661825047289885` |

### 00.02.04 Campaign summary

| Layer | Campaign | TikTok ID | Ads | CTA | TikTok opt | Meta objective |
|-------|----------|-----------|-----|-----|------------|----------------|
| L1 | `CAMP_HB_Influencer_L1_SeeYou_001` | `1870345571958114` | 6 | Learn More | CLICK | Awareness → Reach |
| L2 | `CAMP_HB_Influencer_L2_Curious_001` | `1870345580231025` | 6 | Learn More | TRAFFIC_LANDING_PAGE_VIEW | Traffic → Link clicks |
| L3 | `CAMP_HB_InfluencerRecruit_001` | `1870260441542146` | 24 | Sign Up | CONVERT → FORM | Traffic → Link clicks |
| L4 | `CAMP_HB_Influencer_L4_ComeBack_001` | `1870345588238449` | 12 | Sign Up | CONVERT → FORM | Traffic → Link clicks |
| L5 | `CAMP_HB_Influencer_L5_ShowUp_001` | `1870345600654738` | 6 | Sign Up | CONVERT → FORM | Traffic → Link clicks |
| Bonus | — | — | 10 | Sign Up | per parent | per parent |

### 00.02.05 Ship-file priority

1. **Primary (staircase):** `INFLUENCER-*-COMPOSITE-15s.mp4` — cinematic B-roll + host PiP  
2. **A/B poster:** `INFLUENCER-*-COMPOSITE-POSTER-15s.mp4` — silent flyer BG + host PiP (Bonus #57–64)  
3. **A/B HF B-roll:** `INFLUENCER-*-COMPOSITE-HF-*.mp4` — alternate Higgsfield BG (Bonus #55–56)  
4. **Silent / trailer slots:** `walk` · `future_mystery` · `open_v1` · poster MP4s — no double VO  

### 00.02.06 L3 ad group map (24 ads)

| Preview # | Doc ID | TikTok ad group | Creatives in group |
|-----------|--------|-----------------|-------------------|
| 13–16 | `03.01.00`–`03.04.00` | `ADGRP_HB_OpenCallExact_US_Creators18-44` | Open Call Exact · Optimized · Creators v1 · Live FX |
| 17–20 | `03.05.00`–`03.08.00` | `ADGRP_HB_InfluencerRecruit_US_18-44` | Open Call Exact · Optimized · Creators v1 · Live FX |
| 21–24 | `03.09.00`–`03.12.00` | `ADGRP_HB_InfluencerRecruit_GamingStreamers_FL` | Open Call Exact · Optimized · Creators v1 · Live FX |
| 25–28 | `03.13.00`–`03.16.00` | `ADGRP_HB_InfluencerRecruit_CombatCreators_FL` | Open Call Exact · Optimized · Creators v1 · Live FX |
| 29–32 | `03.17.00`–`03.20.00` | `ADGRP_HB_InfluencerRecruit_ReelsCreators_FL` | Open Call Exact · Optimized · Creators v1 · Live FX |
| 33–36 | `03.21.00`–`03.24.00` | `ADGRP_HB_InfluencerRecruit_OrlandoMiami_FL` | Open Call Exact · Optimized · Creators v1 · Live FX |

---

## 01.00.00 — L1 — Awareness (See you)

Stop scroll · remember hologram boxing for streamers · CTA: Learn More

| Field | Value |
|-------|-------|
| **Preview range** | #1–#6 |
| **TikTok campaign** | `CAMP_HB_Influencer_L1_SeeYou_001` (`1870345571958114`) |
| **Funnel phase** | Awareness — See you |
| **CTA** | Learn More |
| **Turn-on** | Turn on with L2 + L3 for cold creator prospecting (influencers first). |
| **Retarget** | Cold — no retarget list required. |

---
### 01.01.00 — Preview #1 · `AD_HB_Inf_L1_CallingAll_Gaming`

#### 01.01.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 1 |
| **Layer** | L1 — Awareness (See you) |
| **Funnel phase** | Awareness |
| **Layer description** | Stop scroll · remember hologram boxing for streamers · CTA: Learn More |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 01.01.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers 18–34 FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L1_GamingStreamers_FL` · ID `1870345667162434` |
| **Age** | 18–34 |
| **Retarget rule** | Cold — no retarget list required. |
| **Turn-on rule** | Turn on with L2 + L3 for cold creator prospecting (influencers first). |

#### 01.01.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L1_SeeYou_001` (`1870345571958114`) | `CAMP_HB_Influencer_L1_SeeYou_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_AWARENESS |
| **Optimization** | CLICK | REACH |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Learn More | Learn More |

#### 01.01.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_calling_all_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 34 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-CALLING-ALL-15s-VO.mp4` |
| **BG cinematic source** | `ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-CALLING-ALL-COMPOSITE-POSTER-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 01.01.05 Copy

- **TikTok text 1:** Calling all streamers — live stream the first AI hologram boxing event.
- **TikTok text 2:** Creators — your next co-stream is waiting. Would you walk inside?

#### 01.01.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l1_callingall_gaming_inf_calling_all_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l1_callingall_gaming_inf_calling_all_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L1 |

---
### 01.02.00 — Preview #2 · `AD_HB_Inf_L1_WalkInside_Gaming`

#### 01.02.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 2 |
| **Layer** | L1 — Awareness (See you) |
| **Funnel phase** | Awareness |
| **Layer description** | Stop scroll · remember hologram boxing for streamers · CTA: Learn More |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 01.02.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers 18–34 FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L1_GamingStreamers_FL` · ID `1870345667162434` |
| **Age** | 18–34 |
| **Retarget rule** | Cold — no retarget list required. |
| **Turn-on rule** | Turn on with L2 + L3 for cold creator prospecting (influencers first). |

#### 01.02.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L1_SeeYou_001` (`1870345571958114`) | `CAMP_HB_Influencer_L1_SeeYou_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_AWARENESS |
| **Optimization** | CLICK | REACH |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Learn More | Learn More |

#### 01.02.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `walk` |
| **Ship file (preview)** | `ads/influencer-recruit/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` |
| **BG cinematic source** | `ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` |
| **Creative type** | silent cinematic B-roll |
| **Note** | No host PiP — full-screen silent walk plate |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 01.02.05 Copy

- **TikTok text 1:** Would you walk inside? Creators — stream hologram boxing live.
- **TikTok text 2:** Something wild is behind that door. Streamers — this is your next event.

#### 01.02.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l1_walkinside_gaming_walk` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l1_walkinside_gaming_walk` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L1 |

---
### 01.03.00 — Preview #3 · `AD_HB_Inf_L1_FutureMystery_Gaming`

#### 01.03.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 3 |
| **Layer** | L1 — Awareness (See you) |
| **Funnel phase** | Awareness |
| **Layer description** | Stop scroll · remember hologram boxing for streamers · CTA: Learn More |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 01.03.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers 18–34 FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L1_GamingStreamers_FL` · ID `1870345667162434` |
| **Age** | 18–34 |
| **Retarget rule** | Cold — no retarget list required. |
| **Turn-on rule** | Turn on with L2 + L3 for cold creator prospecting (influencers first). |

#### 01.03.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L1_SeeYou_001` (`1870345571958114`) | `CAMP_HB_Influencer_L1_SeeYou_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_AWARENESS |
| **Optimization** | CLICK | REACH |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Learn More | Learn More |

#### 01.03.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `future_mystery` |
| **Ship file (preview)** | `ads/influencer-recruit/brief-001/output/Director_Brief_001_Version_B_Cinematic_Mystery.mp4` |
| **BG cinematic source** | `ads/brief-001/output/Director_Brief_001_Version_B_Cinematic_Mystery.mp4` |
| **Creative type** | cinematic trailer |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 01.03.05 Copy

- **TikTok text 1:** THE FUTURE OF LIVE ENTERTAINMENT... stream it live.
- **TikTok text 2:** Premium fight night energy — built for creators who go live.

#### 01.03.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l1_futuremystery_gaming_future_mystery` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l1_futuremystery_gaming_future_mystery` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L1 |

---
### 01.04.00 — Preview #4 · `AD_HB_Inf_L1_CallingAll_Creators`

#### 01.04.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 4 |
| **Layer** | L1 — Awareness (See you) |
| **Funnel phase** | Awareness |
| **Layer description** | Stop scroll · remember hologram boxing for streamers · CTA: Learn More |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 01.04.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | All creators 18–44 FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L1_AllCreators_FL` · ID `1870345677808817` |
| **Age** | 18–44 |
| **Retarget rule** | Cold — no retarget list required. |
| **Turn-on rule** | Turn on with L2 + L3 for cold creator prospecting (influencers first). |

#### 01.04.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L1_SeeYou_001` (`1870345571958114`) | `CAMP_HB_Influencer_L1_SeeYou_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_AWARENESS |
| **Optimization** | CLICK | REACH |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Learn More | Learn More |

#### 01.04.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_calling_all_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 34 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-CALLING-ALL-15s-VO.mp4` |
| **BG cinematic source** | `ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-CALLING-ALL-COMPOSITE-POSTER-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 01.04.05 Copy

- **TikTok text 1:** Calling all streamers — live stream the first AI hologram boxing event.
- **TikTok text 2:** Creators — your next co-stream is waiting. Would you walk inside?

#### 01.04.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l1_callingall_creators_inf_calling_all_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l1_callingall_creators_inf_calling_all_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L1 |

---
### 01.05.00 — Preview #5 · `AD_HB_Inf_L1_WalkInside_Creators`

#### 01.05.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 5 |
| **Layer** | L1 — Awareness (See you) |
| **Funnel phase** | Awareness |
| **Layer description** | Stop scroll · remember hologram boxing for streamers · CTA: Learn More |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 01.05.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | All creators 18–44 FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L1_AllCreators_FL` · ID `1870345677808817` |
| **Age** | 18–44 |
| **Retarget rule** | Cold — no retarget list required. |
| **Turn-on rule** | Turn on with L2 + L3 for cold creator prospecting (influencers first). |

#### 01.05.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L1_SeeYou_001` (`1870345571958114`) | `CAMP_HB_Influencer_L1_SeeYou_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_AWARENESS |
| **Optimization** | CLICK | REACH |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Learn More | Learn More |

#### 01.05.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `walk` |
| **Ship file (preview)** | `ads/influencer-recruit/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` |
| **BG cinematic source** | `ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` |
| **Creative type** | silent cinematic B-roll |
| **Note** | No host PiP — full-screen silent walk plate |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 01.05.05 Copy

- **TikTok text 1:** Would you walk inside? Creators — stream hologram boxing live.
- **TikTok text 2:** Something wild is behind that door. Streamers — this is your next event.

#### 01.05.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l1_walkinside_creators_walk` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l1_walkinside_creators_walk` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L1 |

---
### 01.06.00 — Preview #6 · `AD_HB_Inf_L1_FutureMystery_Creators`

#### 01.06.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 6 |
| **Layer** | L1 — Awareness (See you) |
| **Funnel phase** | Awareness |
| **Layer description** | Stop scroll · remember hologram boxing for streamers · CTA: Learn More |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 01.06.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | All creators 18–44 FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L1_AllCreators_FL` · ID `1870345677808817` |
| **Age** | 18–44 |
| **Retarget rule** | Cold — no retarget list required. |
| **Turn-on rule** | Turn on with L2 + L3 for cold creator prospecting (influencers first). |

#### 01.06.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L1_SeeYou_001` (`1870345571958114`) | `CAMP_HB_Influencer_L1_SeeYou_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_AWARENESS |
| **Optimization** | CLICK | REACH |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Learn More | Learn More |

#### 01.06.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `future_mystery` |
| **Ship file (preview)** | `ads/influencer-recruit/brief-001/output/Director_Brief_001_Version_B_Cinematic_Mystery.mp4` |
| **BG cinematic source** | `ads/brief-001/output/Director_Brief_001_Version_B_Cinematic_Mystery.mp4` |
| **Creative type** | cinematic trailer |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 01.06.05 Copy

- **TikTok text 1:** THE FUTURE OF LIVE ENTERTAINMENT... stream it live.
- **TikTok text 2:** Premium fight night energy — built for creators who go live.

#### 01.06.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l1_futuremystery_creators_future_mystery` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l1_futuremystery_creators_future_mystery` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L1 |

---

## 02.00.00 — L2 — Consideration (Get curious)

Co-stream opportunity · tent, live FX, Kick/Twitch · CTA: Learn More

| Field | Value |
|-------|-------|
| **Preview range** | #7–#12 |
| **TikTok campaign** | `CAMP_HB_Influencer_L2_Curious_001` (`1870345580231025`) |
| **Funnel phase** | Consideration — Get curious |
| **CTA** | Learn More |
| **Turn-on** | Turn on with L1 + L3. Drives landing page views for tent / co-stream education. |
| **Retarget** | Cold — interest-based FL creators. |

---
### 02.01.00 — Preview #7 · `AD_HB_Inf_L2_LiveFX_Gaming`

#### 02.01.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 7 |
| **Layer** | L2 — Consideration (Get curious) |
| **Funnel phase** | Consideration |
| **Layer description** | Co-stream opportunity · tent, live FX, Kick/Twitch · CTA: Learn More |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 02.01.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers 18–34 FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L2_GamingStreamers_FL` · ID `1870345678592097` |
| **Age** | 18–34 |
| **Retarget rule** | Cold — interest-based FL creators. |
| **Turn-on rule** | Turn on with L1 + L3. Drives landing page views for tent / co-stream education. |

#### 02.01.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L2_Curious_001` (`1870345580231025`) | `CAMP_HB_Influencer_L2_Curious_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | TRAFFIC_LANDING_PAGE_VIEW | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Learn More | Learn More |

#### 02.01.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `livefx` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` |
| **Talking-head script** | L2 |
| **VO / foreground plate** | `ads/output/32-live-interactive-effects-plate.mp4` |
| **BG cinematic source** | `assets/ep3-ar-closeup-v2.mp4` |
| **Creative type** | composite L2 (host plate FG) |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 02.01.05 Copy

- **TikTok text 1:** Your chat controls the show — live interactive effects in the tent.
- **TikTok text 2:** Kick & Twitch creators — stream hologram boxing with live FX.

#### 02.01.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l2_livefx_gaming_livefx` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l2_livefx_gaming_livefx` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L2 |

---
### 02.02.00 — Preview #8 · `AD_HB_Inf_L2_CoStream_Gaming`

#### 02.02.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 8 |
| **Layer** | L2 — Consideration (Get curious) |
| **Funnel phase** | Consideration |
| **Layer description** | Co-stream opportunity · tent, live FX, Kick/Twitch · CTA: Learn More |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 02.02.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers 18–34 FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L2_GamingStreamers_FL` · ID `1870345678592097` |
| **Age** | 18–34 |
| **Retarget rule** | Cold — interest-based FL creators. |
| **Turn-on rule** | Turn on with L1 + L3. Drives landing page views for tent / co-stream education. |

#### 02.02.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L2_Curious_001` (`1870345580231025`) | `CAMP_HB_Influencer_L2_Curious_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | TRAFFIC_LANDING_PAGE_VIEW | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Learn More | Learn More |

#### 02.02.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `stream` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4` |
| **Talking-head script** | L2 |
| **VO / foreground plate** | `ugc/output/08-watch-free-on-kick-twitch-plate.mp4` |
| **BG cinematic source** | `assets/ep3-ar-ringside.mp4` |
| **Creative type** | composite L2 (host plate FG) |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 02.02.05 Copy

- **TikTok text 1:** Watch free on Kick & Twitch — or co-stream it with us.
- **TikTok text 2:** Streamers: bring your chat ringside to hologram boxing.

#### 02.02.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l2_costream_gaming_stream` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l2_costream_gaming_stream` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L2 |

---
### 02.03.00 — Preview #9 · `AD_HB_Inf_L2_InsideTent_Gaming`

#### 02.03.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 9 |
| **Layer** | L2 — Consideration (Get curious) |
| **Funnel phase** | Consideration |
| **Layer description** | Co-stream opportunity · tent, live FX, Kick/Twitch · CTA: Learn More |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 02.03.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers 18–34 FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L2_GamingStreamers_FL` · ID `1870345678592097` |
| **Age** | 18–34 |
| **Retarget rule** | Cold — interest-based FL creators. |
| **Turn-on rule** | Turn on with L1 + L3. Drives landing page views for tent / co-stream education. |

#### 02.03.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L2_Curious_001` (`1870345580231025`) | `CAMP_HB_Influencer_L2_Curious_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | TRAFFIC_LANDING_PAGE_VIEW | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Learn More | Learn More |

#### 02.03.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `tent` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` |
| **Talking-head script** | L2 |
| **VO / foreground plate** | `ugc/output/02-the-inflatable-tent-plate.mp4` |
| **BG cinematic source** | `assets/ep1-tent-preview.mp4` |
| **Creative type** | composite L2/L3 (host plate FG) |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 02.03.05 Copy

- **TikTok text 1:** Dark tent. Glowing square. Wireframe boxers. Your audience watches in VR.
- **TikTok text 2:** Show your followers what's inside — inflatable tent fight night.

#### 02.03.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l2_insidetent_gaming_tent` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l2_insidetent_gaming_tent` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L2 |

---
### 02.04.00 — Preview #10 · `AD_HB_Inf_L2_LiveFX_Creators`

#### 02.04.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 10 |
| **Layer** | L2 — Consideration (Get curious) |
| **Funnel phase** | Consideration |
| **Layer description** | Co-stream opportunity · tent, live FX, Kick/Twitch · CTA: Learn More |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 02.04.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | All creators 18–44 FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L2_AllCreators_FL` · ID `1870345677811185` |
| **Age** | 18–44 |
| **Retarget rule** | Cold — interest-based FL creators. |
| **Turn-on rule** | Turn on with L1 + L3. Drives landing page views for tent / co-stream education. |

#### 02.04.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L2_Curious_001` (`1870345580231025`) | `CAMP_HB_Influencer_L2_Curious_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | TRAFFIC_LANDING_PAGE_VIEW | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Learn More | Learn More |

#### 02.04.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `livefx` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` |
| **Talking-head script** | L2 |
| **VO / foreground plate** | `ads/output/32-live-interactive-effects-plate.mp4` |
| **BG cinematic source** | `assets/ep3-ar-closeup-v2.mp4` |
| **Creative type** | composite L2 (host plate FG) |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 02.04.05 Copy

- **TikTok text 1:** Your chat controls the show — live interactive effects in the tent.
- **TikTok text 2:** Kick & Twitch creators — stream hologram boxing with live FX.

#### 02.04.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l2_livefx_creators_livefx` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l2_livefx_creators_livefx` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L2 |

---
### 02.05.00 — Preview #11 · `AD_HB_Inf_L2_CoStream_Creators`

#### 02.05.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 11 |
| **Layer** | L2 — Consideration (Get curious) |
| **Funnel phase** | Consideration |
| **Layer description** | Co-stream opportunity · tent, live FX, Kick/Twitch · CTA: Learn More |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 02.05.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | All creators 18–44 FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L2_AllCreators_FL` · ID `1870345677811185` |
| **Age** | 18–44 |
| **Retarget rule** | Cold — interest-based FL creators. |
| **Turn-on rule** | Turn on with L1 + L3. Drives landing page views for tent / co-stream education. |

#### 02.05.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L2_Curious_001` (`1870345580231025`) | `CAMP_HB_Influencer_L2_Curious_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | TRAFFIC_LANDING_PAGE_VIEW | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Learn More | Learn More |

#### 02.05.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `stream` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4` |
| **Talking-head script** | L2 |
| **VO / foreground plate** | `ugc/output/08-watch-free-on-kick-twitch-plate.mp4` |
| **BG cinematic source** | `assets/ep3-ar-ringside.mp4` |
| **Creative type** | composite L2 (host plate FG) |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 02.05.05 Copy

- **TikTok text 1:** Watch free on Kick & Twitch — or co-stream it with us.
- **TikTok text 2:** Streamers: bring your chat ringside to hologram boxing.

#### 02.05.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l2_costream_creators_stream` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l2_costream_creators_stream` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L2 |

---
### 02.06.00 — Preview #12 · `AD_HB_Inf_L2_InsideTent_Creators`

#### 02.06.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 12 |
| **Layer** | L2 — Consideration (Get curious) |
| **Funnel phase** | Consideration |
| **Layer description** | Co-stream opportunity · tent, live FX, Kick/Twitch · CTA: Learn More |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 02.06.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | All creators 18–44 FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L2_AllCreators_FL` · ID `1870345677811185` |
| **Age** | 18–44 |
| **Retarget rule** | Cold — interest-based FL creators. |
| **Turn-on rule** | Turn on with L1 + L3. Drives landing page views for tent / co-stream education. |

#### 02.06.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L2_Curious_001` (`1870345580231025`) | `CAMP_HB_Influencer_L2_Curious_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | TRAFFIC_LANDING_PAGE_VIEW | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Learn More | Learn More |

#### 02.06.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `tent` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` |
| **Talking-head script** | L2 |
| **VO / foreground plate** | `ugc/output/02-the-inflatable-tent-plate.mp4` |
| **BG cinematic source** | `assets/ep1-tent-preview.mp4` |
| **Creative type** | composite L2/L3 (host plate FG) |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 02.06.05 Copy

- **TikTok text 1:** Dark tent. Glowing square. Wireframe boxers. Your audience watches in VR.
- **TikTok text 2:** Show your followers what's inside — inflatable tent fight night.

#### 02.06.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l2_insidetent_creators_tent` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l2_insidetent_creators_tent` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L2 |

---

## 03.00.00 — L3 — Conversion (Sign up)

Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads

| Field | Value |
|-------|-------|
| **Preview range** | #13–#36 |
| **TikTok campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) |
| **Funnel phase** | Conversion — Sign up |
| **CTA** | Sign Up |
| **Turn-on** | Primary signup layer — turn on first with L1 + L2. |
| **Retarget** | Cold + broad creator interests per ad group. |

---
### 03.01.00 — Preview #13 · `AD_HB_OpenCallExact_Poster15s`

#### 03.01.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 13 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.01.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Open Call Exact · FL creators 18–44 |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_OpenCallExact_US_Creators18-44` |
| **Age** | 18–44 |
| **Ad group focus** | FL creators 18–44 · open call exact |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.01.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.01.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_open_call_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 33 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4` |
| **BG cinematic source** | `assets/higgsfield-386b5e5c-43c6-44ee-a8f3-ab148fe272ca.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-POSTER-15s.mp4` |
| **HF B-roll variant** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-HF-386B5E5C-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.01.05 Copy

- **TikTok text 1:** OPEN CALL FOR STREAMERS & CONTENT CREATORS. WE WANT YOU! DM @hologramboxing
- **TikTok text 2:** WE WANT YOU! Join Creators AI Hologram Boxing — sign up on hologramboxing.com

#### 03.01.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `opencallexact_poster15s_inf_open_call_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=opencallexact_poster15s_inf_open_call_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.02.00 — Preview #14 · `AD_HB_OpenCallExact_SignUp_V2`

#### 03.02.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 14 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.02.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Open Call Exact |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_OpenCallExact_US_Creators18-44` |
| **Age** | 18–44 |
| **Ad group focus** | FL creators 18–44 · open call exact |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.02.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.02.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_open_call_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 33 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4` |
| **BG cinematic source** | `assets/higgsfield-386b5e5c-43c6-44ee-a8f3-ab148fe272ca.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-POSTER-15s.mp4` |
| **HF B-roll variant** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-HF-386B5E5C-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.02.05 Copy

- **TikTok text 1:** Streamers wanted — sign up at hologramboxing.com
- **TikTok text 2:** OPEN CALL FOR CREATORS. WE WANT YOU! Apply at hologramboxing.com

#### 03.02.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `opencallexact_signup_v2_inf_open_call_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=opencallexact_signup_v2_inf_open_call_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.03.00 — Preview #15 · `AD_HB_OpenCallExact_WalkInside_X`

#### 03.03.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 15 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.03.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Open Call Exact |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_OpenCallExact_US_Creators18-44` |
| **Age** | 18–44 |
| **Ad group focus** | FL creators 18–44 · open call exact |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.03.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.03.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `walk` |
| **Ship file (preview)** | `ads/influencer-recruit/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` |
| **BG cinematic source** | `ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` |
| **Creative type** | silent cinematic B-roll |
| **Note** | No host PiP — full-screen silent walk plate |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.03.05 Copy

- **TikTok text 1:** Would you walk inside? Creators — stream the first event. Apply.
- **TikTok text 2:** Something wild is behind that door. Creators — stream hologram boxing live.

#### 03.03.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `opencallexact_walkinside_x_walk` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=opencallexact_walkinside_x_walk` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.04.00 — Preview #16 · `AD_HB_OpenCallExact_StreamFX`

#### 03.04.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 16 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.04.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Open Call Exact |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_OpenCallExact_US_Creators18-44` |
| **Age** | 18–44 |
| **Ad group focus** | FL creators 18–44 · open call exact |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.04.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.04.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `livefx` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` |
| **Talking-head script** | L2 |
| **VO / foreground plate** | `ads/output/32-live-interactive-effects-plate.mp4` |
| **BG cinematic source** | `assets/ep3-ar-closeup-v2.mp4` |
| **Creative type** | composite L2 (host plate FG) |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.04.05 Copy

- **TikTok text 1:** Stream the tent — live interactive effects.
- **TikTok text 2:** Creators — co-stream hologram boxing. Sign up.

#### 03.04.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `opencallexact_streamfx_livefx` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=opencallexact_streamfx_livefx` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.05.00 — Preview #17 · `AD_HB_OpenCall_Optimized15s`

#### 03.05.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 17 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.05.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Optimized · FL creators 18–44 |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_US_18-44` |
| **Age** | 18–44 |
| **Ad group focus** | FL creators 18–44 · optimized broad |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.05.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.05.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_join_team_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 35 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-ar-experience-hero.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-POSTER-15s.mp4` |
| **HF B-roll variant** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-HF-B002936B-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.05.05 Copy

- **TikTok text 1:** Open call for streamers & creators — live stream hologram boxing. We want you. Apply now.
- **TikTok text 2:** Streamers & creators wanted. Sign up for the first AI hologram boxing event at hologramboxing.com

#### 03.05.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `opencall_optimized15s_inf_join_team_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=opencall_optimized15s_inf_join_team_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.06.00 — Preview #18 · `AD_HB_OpenCall_Optimized_Future_X`

#### 03.06.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 18 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.06.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Optimized |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_US_18-44` |
| **Age** | 18–44 |
| **Ad group focus** | FL creators 18–44 · optimized broad |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.06.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.06.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `future_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/FUTURE-IS-HERE-15s-9x16-ambient.mp4` |
| **BG cinematic source** | `ads/output/FUTURE-IS-HERE-15s-9x16-ambient.mp4` |
| **Creative type** | ambient cinematic |
| **Note** | Silent ambient — no double VO |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.06.05 Copy

- **TikTok text 1:** The future of live entertainment. Creators — we want you.
- **TikTok text 2:** Picture this — tent + AR + AI boxers LIVE. Creators apply now.

#### 03.06.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `opencall_optimized_future_x_future_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=opencall_optimized_future_x_future_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.07.00 — Preview #19 · `AD_HB_OpenCall_UGC_WhatIs`

#### 03.07.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 19 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.07.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Optimized |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_US_18-44` |
| **Age** | 18–44 |
| **Ad group focus** | FL creators 18–44 · optimized broad |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.07.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.07.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `whatis` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L3-WHATIS-COMPOSITE-15s.mp4` |
| **Talking-head script** | L3 |
| **VO / foreground plate** | `ugc/output/ads-avatar-what-is-hologram-boxing-plate.mp4` |
| **BG cinematic source** | `assets/ep3-ar-closeup.mp4` |
| **Creative type** | composite L3 (host plate FG) |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.07.05 Copy

- **TikTok text 1:** What is hologram boxing? Stream it live. Sign up.
- **TikTok text 2:** What is hologram boxing? Creators — join the first AI fight night.

#### 03.07.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `opencall_ugc_whatis_whatis` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=opencall_ugc_whatis_whatis` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.08.00 — Preview #20 · `AD_HB_OpenCall_Tent_Cross`

#### 03.08.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 20 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.08.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Optimized |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_US_18-44` |
| **Age** | 18–44 |
| **Ad group focus** | FL creators 18–44 · optimized broad |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.08.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.08.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `tent` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` |
| **Talking-head script** | L2 |
| **VO / foreground plate** | `ugc/output/02-the-inflatable-tent-plate.mp4` |
| **BG cinematic source** | `assets/ep1-tent-preview.mp4` |
| **Creative type** | composite L2/L3 (host plate FG) |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.08.05 Copy

- **TikTok text 1:** Join the team — stream the fights from inside the tent.
- **TikTok text 2:** Creators wanted. Stream hologram boxing live.

#### 03.08.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `opencall_tent_cross_tent` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=opencall_tent_cross_tent` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.09.00 — Preview #21 · `AD_HB_Influencer_Gaming_OpenCallExact`

#### 03.09.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 21 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.09.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_GamingStreamers_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Gaming streamers FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.09.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.09.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_open_call_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 33 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4` |
| **BG cinematic source** | `assets/higgsfield-386b5e5c-43c6-44ee-a8f3-ab148fe272ca.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-POSTER-15s.mp4` |
| **HF B-roll variant** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-HF-386B5E5C-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.09.05 Copy

- **TikTok text 1:** OPEN CALL — streamers wanted on Kick/Twitch. WE WANT YOU!
- **TikTok text 2:** Gaming creators — co-stream hologram boxing. Sign up.

#### 03.09.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_gaming_opencallexact_inf_open_call_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_gaming_opencallexact_inf_open_call_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.10.00 — Preview #22 · `AD_HB_Influencer_Gaming_OpenCallOpt`

#### 03.10.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 22 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.10.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_GamingStreamers_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Gaming streamers FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.10.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.10.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_join_team_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 35 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-ar-experience-hero.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-POSTER-15s.mp4` |
| **HF B-roll variant** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-HF-B002936B-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.10.05 Copy

- **TikTok text 1:** Open call for Kick & Twitch streamers — co-stream hologram boxing. Apply now.
- **TikTok text 2:** Gaming creators: stream the first AI fight night. Sign up.

#### 03.10.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_gaming_opencallopt_inf_join_team_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_gaming_opencallopt_inf_join_team_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.11.00 — Preview #23 · `AD_HB_Influencer_Gaming_OpenCallCreators`

#### 03.11.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 23 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.11.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_GamingStreamers_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Gaming streamers FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.11.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.11.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `open_v1` |
| **Ship file (preview)** | `ads/influencer-recruit/output/TIKTOK-OPEN-CALL-CREATORS-15s.mp4` |
| **BG cinematic source** | `ads/influencer-recruit/output/TIKTOK-OPEN-CALL-CREATORS-15s.mp4` |
| **Creative type** | silent poster flyer |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.11.05 Copy

- **TikTok text 1:** OPEN CALL FOR STREAMERS & CONTENT CREATORS — WE WANT YOU!
- **TikTok text 2:** Kick, Twitch, YouTube gamers — join hologram boxing. Sign up.

#### 03.11.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_gaming_opencallcreators_open_v1` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_gaming_opencallcreators_open_v1` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.12.00 — Preview #24 · `AD_HB_Influencer_Gaming_LiveFX`

#### 03.12.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 24 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.12.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_GamingStreamers_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Gaming streamers FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.12.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.12.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `livefx` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` |
| **Talking-head script** | L2 |
| **VO / foreground plate** | `ads/output/32-live-interactive-effects-plate.mp4` |
| **BG cinematic source** | `assets/ep3-ar-closeup-v2.mp4` |
| **Creative type** | composite L2 (host plate FG) |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.12.05 Copy

- **TikTok text 1:** Stream the tent — live interactive effects.
- **TikTok text 2:** Kick & Twitch streamers — hologram boxing needs you.

#### 03.12.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_gaming_livefx_livefx` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_gaming_livefx_livefx` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.13.00 — Preview #25 · `AD_HB_Influencer_Combat_OpenCallExact`

#### 03.13.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 25 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.13.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Combat creators FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_CombatCreators_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Combat creators FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.13.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.13.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_open_call_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 33 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4` |
| **BG cinematic source** | `assets/higgsfield-386b5e5c-43c6-44ee-a8f3-ab148fe272ca.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-POSTER-15s.mp4` |
| **HF B-roll variant** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-HF-386B5E5C-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.13.05 Copy

- **TikTok text 1:** OPEN CALL — boxing creators wanted. WE WANT YOU!
- **TikTok text 2:** MMA & boxing creators — stream hologram fight night. Sign up.

#### 03.13.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_combat_opencallexact_inf_open_call_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_combat_opencallexact_inf_open_call_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.14.00 — Preview #26 · `AD_HB_Influencer_Combat_OpenCallOpt`

#### 03.14.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 26 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.14.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Combat creators FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_CombatCreators_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Combat creators FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.14.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.14.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_join_team_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 35 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-ar-experience-hero.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-POSTER-15s.mp4` |
| **HF B-roll variant** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-HF-B002936B-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.14.05 Copy

- **TikTok text 1:** Open call for combat sports creators — live stream hologram boxing. Apply now.
- **TikTok text 2:** UFC fans, boxing creators — co-stream the tent. Sign up.

#### 03.14.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_combat_opencallopt_inf_join_team_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_combat_opencallopt_inf_join_team_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.15.00 — Preview #27 · `AD_HB_Influencer_Combat_OpenCallCreators`

#### 03.15.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 27 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.15.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Combat creators FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_CombatCreators_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Combat creators FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.15.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.15.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `open_v1` |
| **Ship file (preview)** | `ads/influencer-recruit/output/TIKTOK-OPEN-CALL-CREATORS-15s.mp4` |
| **BG cinematic source** | `ads/influencer-recruit/output/TIKTOK-OPEN-CALL-CREATORS-15s.mp4` |
| **Creative type** | silent poster flyer |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.15.05 Copy

- **TikTok text 1:** Calling all combat sports creators — WE WANT YOU!
- **TikTok text 2:** Boxing & MMA streamers — hologram boxing needs you. Sign up.

#### 03.15.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_combat_opencallcreators_open_v1` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_combat_opencallcreators_open_v1` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.16.00 — Preview #28 · `AD_HB_Influencer_Combat_LiveFX`

#### 03.16.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 28 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.16.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Combat creators FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_CombatCreators_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Combat creators FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.16.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.16.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `livefx` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` |
| **Talking-head script** | L2 |
| **VO / foreground plate** | `ads/output/32-live-interactive-effects-plate.mp4` |
| **BG cinematic source** | `assets/ep3-ar-closeup-v2.mp4` |
| **Creative type** | composite L2 (host plate FG) |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.16.05 Copy

- **TikTok text 1:** Stream the tent — live interactive effects.
- **TikTok text 2:** Combat sports creators — hologram boxing live effects. Sign up.

#### 03.16.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_combat_livefx_livefx` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_combat_livefx_livefx` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.17.00 — Preview #29 · `AD_HB_Influencer_Reels_OpenCallExact`

#### 03.17.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 29 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.17.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Reels creators FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_ReelsCreators_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Reels / TikTok creators FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.17.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.17.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_open_call_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 33 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4` |
| **BG cinematic source** | `assets/higgsfield-386b5e5c-43c6-44ee-a8f3-ab148fe272ca.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-POSTER-15s.mp4` |
| **HF B-roll variant** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-HF-386B5E5C-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.17.05 Copy

- **TikTok text 1:** OPEN CALL — TikTok & Reels creators wanted. WE WANT YOU!
- **TikTok text 2:** Short-form creators — film hologram boxing. Sign up.

#### 03.17.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_reels_opencallexact_inf_open_call_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_reels_opencallexact_inf_open_call_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.18.00 — Preview #30 · `AD_HB_Influencer_Reels_OpenCallOpt`

#### 03.18.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 30 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.18.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Reels creators FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_ReelsCreators_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Reels / TikTok creators FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.18.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.18.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_join_team_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 35 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-ar-experience-hero.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-POSTER-15s.mp4` |
| **HF B-roll variant** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-HF-B002936B-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.18.05 Copy

- **TikTok text 1:** Open call for TikTok & Reels creators — hype hologram boxing. Apply now.
- **TikTok text 2:** Short-form content creators — stream the first AI fight night. Sign up.

#### 03.18.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_reels_opencallopt_inf_join_team_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_reels_opencallopt_inf_join_team_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.19.00 — Preview #31 · `AD_HB_Influencer_Reels_OpenCallCreators`

#### 03.19.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 31 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.19.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Reels creators FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_ReelsCreators_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Reels / TikTok creators FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.19.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.19.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `open_v1` |
| **Ship file (preview)** | `ads/influencer-recruit/output/TIKTOK-OPEN-CALL-CREATORS-15s.mp4` |
| **BG cinematic source** | `ads/influencer-recruit/output/TIKTOK-OPEN-CALL-CREATORS-15s.mp4` |
| **Creative type** | silent poster flyer |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.19.05 Copy

- **TikTok text 1:** OPEN CALL FOR CREATORS — WE WANT YOU!
- **TikTok text 2:** TikTok, Reels, short-form — join hologram boxing. Sign up.

#### 03.19.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_reels_opencallcreators_open_v1` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_reels_opencallcreators_open_v1` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.20.00 — Preview #32 · `AD_HB_Influencer_Reels_LiveFX`

#### 03.20.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 32 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.20.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Reels creators FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_ReelsCreators_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Reels / TikTok creators FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.20.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.20.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `livefx` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` |
| **Talking-head script** | L2 |
| **VO / foreground plate** | `ads/output/32-live-interactive-effects-plate.mp4` |
| **BG cinematic source** | `assets/ep3-ar-closeup-v2.mp4` |
| **Creative type** | composite L2 (host plate FG) |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.20.05 Copy

- **TikTok text 1:** Stream the tent — live interactive effects.
- **TikTok text 2:** Reels & TikTok creators — hologram boxing needs you.

#### 03.20.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_reels_livefx_livefx` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_reels_livefx_livefx` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.21.00 — Preview #33 · `AD_HB_Influencer_OrlandoMiami_OpenCallExact`

#### 03.21.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 33 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.21.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Orlando + Miami FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_OrlandoMiami_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Orlando + Miami FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.21.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.21.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_open_call_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 33 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4` |
| **BG cinematic source** | `assets/higgsfield-386b5e5c-43c6-44ee-a8f3-ab148fe272ca.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-POSTER-15s.mp4` |
| **HF B-roll variant** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-HF-386B5E5C-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.21.05 Copy

- **TikTok text 1:** OPEN CALL — Orlando & Miami creators. WE WANT YOU!
- **TikTok text 2:** Local FL creators — co-stream hologram boxing. Sign up.

#### 03.21.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_orlandomiami_opencallexact_inf_open_call_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_orlandomiami_opencallexact_inf_open_call_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.22.00 — Preview #34 · `AD_HB_Influencer_OrlandoMiami_OpenCallOpt`

#### 03.22.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 34 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.22.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Orlando + Miami FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_OrlandoMiami_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Orlando + Miami FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.22.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.22.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_join_team_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 35 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-ar-experience-hero.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-POSTER-15s.mp4` |
| **HF B-roll variant** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-HF-B002936B-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.22.05 Copy

- **TikTok text 1:** Open call for Orlando & Miami creators — live stream hologram boxing. Apply now.
- **TikTok text 2:** South Florida creators — join the first AI fight night. Sign up.

#### 03.22.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_orlandomiami_opencallopt_inf_join_team_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_orlandomiami_opencallopt_inf_join_team_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.23.00 — Preview #35 · `AD_HB_Influencer_OrlandoMiami_OpenCallCreators`

#### 03.23.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 35 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.23.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Orlando + Miami FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_OrlandoMiami_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Orlando + Miami FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.23.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.23.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `open_v1` |
| **Ship file (preview)** | `ads/influencer-recruit/output/TIKTOK-OPEN-CALL-CREATORS-15s.mp4` |
| **BG cinematic source** | `ads/influencer-recruit/output/TIKTOK-OPEN-CALL-CREATORS-15s.mp4` |
| **Creative type** | silent poster flyer |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.23.05 Copy

- **TikTok text 1:** Calling Orlando & Miami content creators — WE WANT YOU!
- **TikTok text 2:** Local streamers & creators — hologram boxing is hiring partners. Sign up.

#### 03.23.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_orlandomiami_opencallcreators_open_v1` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_orlandomiami_opencallcreators_open_v1` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---
### 03.24.00 — Preview #36 · `AD_HB_Influencer_OrlandoMiami_LiveFX`

#### 03.24.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 36 |
| **Layer** | L3 — Conversion (Sign up) |
| **Funnel phase** | Conversion |
| **Layer description** | Open call · partner form · CTA: Sign Up · 6 ad groups × 4 ads |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 03.24.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Orlando + Miami FL |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_InfluencerRecruit_OrlandoMiami_FL` |
| **Age** | 18–44 |
| **Ad group focus** | Orlando + Miami FL |
| **Retarget rule** | Cold + broad creator interests per ad group. |
| **Turn-on rule** | Primary signup layer — turn on first with L1 + L2. |

#### 03.24.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_InfluencerRecruit_001` (`1870260441542146`) | `CAMP_HB_InfluencerRecruit_001` (`120249816887950588`) |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 03.24.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `livefx` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` |
| **Talking-head script** | L2 |
| **VO / foreground plate** | `ads/output/32-live-interactive-effects-plate.mp4` |
| **BG cinematic source** | `assets/ep3-ar-closeup-v2.mp4` |
| **Creative type** | composite L2 (host plate FG) |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 03.24.05 Copy

- **TikTok text 1:** Stream the tent — live interactive effects.
- **TikTok text 2:** Orlando & Miami creators — hologram boxing live effects. Sign up.

#### 03.24.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `influencer_orlandomiami_livefx_livefx` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=influencer_orlandomiami_livefx_livefx` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L3 |

---

## 04.00.00 — L4 — Retargeting (Come back)

6 direct retarget + 6 ad-confirmation talking heads (validates the other L4 ads) · CTA: Sign Up

| Field | Value |
|-------|-------|
| **Preview range** | #37–#48 |
| **TikTok campaign** | `CAMP_HB_Influencer_L4_ComeBack_001` (`1870345588238449`) |
| **Funnel phase** | Retargeting — Come back |
| **CTA** | Sign Up |
| **Turn-on** | Enable after L3 runs 7+ days and pixel has landing visitors. |
| **Retarget** | Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience). |

---
### 04.01.00 — Preview #37 · `AD_HB_Inf_L4_PartnerSpotlight_Gaming`

#### 04.01.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 37 |
| **Layer** | L4 — Retargeting (Come back) |
| **Funnel phase** | Retargeting |
| **Layer description** | 6 direct retarget + 6 ad-confirmation talking heads (validates the other L4 ads) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 04.01.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers 18–34 FL · retarget 7d |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L4_GamingStreamers_FL` · ID `1870345749405314` |
| **Age** | 18–34 |
| **Retarget rule** | Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience). |
| **Turn-on rule** | Enable after L3 runs 7+ days and pixel has landing visitors. |

#### 04.01.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L4_ComeBack_001` (`1870345588238449`) | `CAMP_HB_Influencer_L4_ComeBack_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 04.01.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_partner_reviews_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 37 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L4-PARTNER-REVIEWS-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep2-ar-experience.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-POSTER-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 04.01.05 Copy

- **Hook overlay (0–3s):** WHAT STREAMERS ARE SAYING
- **TikTok text 1:** Streamers who toured the tent say the content is insane — co-stream hologram boxing. Your turn. Sign up.
- **TikTok text 2:** Kick, Twitch, and TikTok partners are in. VIP ringside, live FX. Join the roster.

#### 04.01.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l4_partnerspotlight_gaming_inf_l4_partner_reviews_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l4_partnerspotlight_gaming_inf_l4_partner_reviews_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L4 |

---
### 04.02.00 — Preview #38 · `AD_HB_Inf_L4_Reminder_Gaming`

#### 04.02.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 38 |
| **Layer** | L4 — Retargeting (Come back) |
| **Funnel phase** | Retargeting |
| **Layer description** | 6 direct retarget + 6 ad-confirmation talking heads (validates the other L4 ads) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 04.02.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers 18–34 FL · retarget 7d |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L4_GamingStreamers_FL` · ID `1870345749405314` |
| **Age** | 18–34 |
| **Retarget rule** | Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience). |
| **Turn-on rule** | Enable after L3 runs 7+ days and pixel has landing visitors. |

#### 04.02.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L4_ComeBack_001` (`1870345588238449`) | `CAMP_HB_Influencer_L4_ComeBack_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 04.02.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_reminder_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 38 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L4-REMINDER-SLOTS-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-ringside-ots.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-POSTER-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 04.02.05 Copy

- **Hook overlay (0–3s):** STILL THINKING ABOUT IT?
- **TikTok text 1:** Still thinking about co-streaming hologram boxing? Partner slots are filling — finish at hologramboxing.com.
- **TikTok text 2:** Bring your chat ringside — live interactive FX. Finish your application.

#### 04.02.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l4_reminder_gaming_inf_l4_reminder_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l4_reminder_gaming_inf_l4_reminder_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L4 |

---
### 04.03.00 — Preview #39 · `AD_HB_Inf_L4_OpenCallExact_Gaming`

#### 04.03.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 39 |
| **Layer** | L4 — Retargeting (Come back) |
| **Funnel phase** | Retargeting |
| **Layer description** | 6 direct retarget + 6 ad-confirmation talking heads (validates the other L4 ads) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 04.03.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers 18–34 FL · retarget 7d |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L4_GamingStreamers_FL` · ID `1870345749405314` |
| **Age** | 18–34 |
| **Retarget rule** | Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience). |
| **Turn-on rule** | Enable after L3 runs 7+ days and pixel has landing visitors. |

#### 04.03.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L4_ComeBack_001` (`1870345588238449`) | `CAMP_HB_Influencer_L4_ComeBack_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 04.03.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_retarget_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 36 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L4-RETARGET-OPEN-CALL-15s-VO.mp4` |
| **BG cinematic source** | `ads/output/FUTURE-IS-HERE-15s-9x16-ambient.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 04.03.05 Copy

- **Hook overlay (0–3s):** YOUR SPOT'S STILL OPEN
- **TikTok text 1:** Your co-stream partner slot is still open. Open call live — finish at hologramboxing.com.
- **TikTok text 2:** Co-stream hologram boxing — VIP ringside, live FX. Sign up now.

#### 04.03.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l4_opencallexact_gaming_inf_l4_retarget_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l4_opencallexact_gaming_inf_l4_retarget_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L4 |

---
### 04.04.00 — Preview #40 · `AD_HB_Inf_L4_PartnerSpotlight_Creators`

#### 04.04.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 40 |
| **Layer** | L4 — Retargeting (Come back) |
| **Funnel phase** | Retargeting |
| **Layer description** | 6 direct retarget + 6 ad-confirmation talking heads (validates the other L4 ads) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 04.04.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | All creators 18–44 FL · retarget 7d |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L4_AllCreators_FL` · ID `1870345771609170` |
| **Age** | 18–44 |
| **Retarget rule** | Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience). |
| **Turn-on rule** | Enable after L3 runs 7+ days and pixel has landing visitors. |

#### 04.04.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L4_ComeBack_001` (`1870345588238449`) | `CAMP_HB_Influencer_L4_ComeBack_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 04.04.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_partner_reviews_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 37 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L4-PARTNER-REVIEWS-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep2-ar-experience.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-POSTER-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 04.04.05 Copy

- **Hook overlay (0–3s):** CREATORS ARE ALREADY IN
- **TikTok text 1:** Confirmed creators are locking co-stream slots. Streamers say the tent content is insane — your turn.
- **TikTok text 2:** Kick, Twitch, and TikTok partners are in. Co-stream hologram boxing — join the roster.

#### 04.04.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l4_partnerspotlight_creators_inf_l4_partner_reviews_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l4_partnerspotlight_creators_inf_l4_partner_reviews_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L4 |

---
### 04.05.00 — Preview #41 · `AD_HB_Inf_L4_Reminder_Creators`

#### 04.05.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 41 |
| **Layer** | L4 — Retargeting (Come back) |
| **Funnel phase** | Retargeting |
| **Layer description** | 6 direct retarget + 6 ad-confirmation talking heads (validates the other L4 ads) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 04.05.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | All creators 18–44 FL · retarget 7d |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L4_AllCreators_FL` · ID `1870345771609170` |
| **Age** | 18–44 |
| **Retarget rule** | Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience). |
| **Turn-on rule** | Enable after L3 runs 7+ days and pixel has landing visitors. |

#### 04.05.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L4_ComeBack_001` (`1870345588238449`) | `CAMP_HB_Influencer_L4_ComeBack_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 04.05.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_reminder_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 38 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L4-REMINDER-SLOTS-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-ringside-ots.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-POSTER-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 04.05.05 Copy

- **Hook overlay (0–3s):** YOU LOOKED — SLOTS ARE FILLING
- **TikTok text 1:** You looked — streamer partner slots are filling. Finish your application at hologramboxing.com.
- **TikTok text 2:** VIP tent access, content your audience hasn't seen. Takes thirty seconds.

#### 04.05.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l4_reminder_creators_inf_l4_reminder_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l4_reminder_creators_inf_l4_reminder_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L4 |

---
### 04.06.00 — Preview #42 · `AD_HB_Inf_L4_OpenCallExact_Creators`

#### 04.06.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 42 |
| **Layer** | L4 — Retargeting (Come back) |
| **Funnel phase** | Retargeting |
| **Layer description** | 6 direct retarget + 6 ad-confirmation talking heads (validates the other L4 ads) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 04.06.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | All creators 18–44 FL · retarget 7d |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L4_AllCreators_FL` · ID `1870345771609170` |
| **Age** | 18–44 |
| **Retarget rule** | Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience). |
| **Turn-on rule** | Enable after L3 runs 7+ days and pixel has landing visitors. |

#### 04.06.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L4_ComeBack_001` (`1870345588238449`) | `CAMP_HB_Influencer_L4_ComeBack_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 04.06.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_retarget_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 36 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L4-RETARGET-OPEN-CALL-15s-VO.mp4` |
| **BG cinematic source** | `ads/output/FUTURE-IS-HERE-15s-9x16-ambient.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 04.06.05 Copy

- **Hook overlay (0–3s):** YOU LOOKED — FINISH YOUR APPLICATION
- **TikTok text 1:** You looked — open call's still live for creators. Finish your signup at hologramboxing.com.
- **TikTok text 2:** Partner slots filling — your spot's still open. Sign up now.

#### 04.06.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l4_opencallexact_creators_inf_l4_retarget_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l4_opencallexact_creators_inf_l4_retarget_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L4 |

---
### 04.07.00 — Preview #43 · `AD_HB_Inf_L4_ConfirmsPartner_Gaming`

#### 04.07.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 43 |
| **Layer** | L4 — Retargeting (Come back) |
| **Funnel phase** | Retargeting |
| **Layer description** | 6 direct retarget + 6 ad-confirmation talking heads (validates the other L4 ads) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 04.07.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming · 2nd touch · confirms partner ad |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L4_GamingStreamers_FL` · ID `1870345749405314` |
| **Age** | 18–34 |
| **Retarget rule** | Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience). |
| **Turn-on rule** | Enable after L3 runs 7+ days and pixel has landing visitors. |

#### 04.07.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L4_ComeBack_001` (`1870345588238449`) | `CAMP_HB_Influencer_L4_ComeBack_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 04.07.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_confirms_partner_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-PARTNER-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 43 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-PARTNER-AD-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-ar-wide-tent.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 04.07.05 Copy

- **Hook overlay (0–3s):** THAT PARTNER AD? IT'S REAL
- **TikTok text 1:** Saw our partner ad? It's real — streamers are locking co-stream slots. Finish at hologramboxing.com.
- **TikTok text 2:** That creators-are-in ad wasn't fluff. Go finish your signup like they said.

#### 04.07.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l4_confirmspartner_gaming_inf_l4_confirms_partner_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l4_confirmspartner_gaming_inf_l4_confirms_partner_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L4 |

---
### 04.08.00 — Preview #44 · `AD_HB_Inf_L4_ConfirmsReminder_Gaming`

#### 04.08.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 44 |
| **Layer** | L4 — Retargeting (Come back) |
| **Funnel phase** | Retargeting |
| **Layer description** | 6 direct retarget + 6 ad-confirmation talking heads (validates the other L4 ads) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 04.08.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming · 2nd touch · confirms reminder ad |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L4_GamingStreamers_FL` · ID `1870345749405314` |
| **Age** | 18–34 |
| **Retarget rule** | Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience). |
| **Turn-on rule** | Enable after L3 runs 7+ days and pixel has landing visitors. |

#### 04.08.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L4_ComeBack_001` (`1870345588238449`) | `CAMP_HB_Influencer_L4_ComeBack_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 04.08.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_confirms_reminder_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-REMINDER-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 44 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-REMINDER-AD-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-pov-passthrough.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 04.08.05 Copy

- **Hook overlay (0–3s):** THAT REMINDER AD? FACTS
- **TikTok text 1:** That reminder ad was right — partner slots are filling. Apply at hologramboxing.com.
- **TikTok text 2:** Don't sleep on it — co-stream hologram boxing spots are actually going.

#### 04.08.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l4_confirmsreminder_gaming_inf_l4_confirms_reminder_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l4_confirmsreminder_gaming_inf_l4_confirms_reminder_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L4 |

---
### 04.09.00 — Preview #45 · `AD_HB_Inf_L4_ConfirmsOpenCall_Gaming`

#### 04.09.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 45 |
| **Layer** | L4 — Retargeting (Come back) |
| **Funnel phase** | Retargeting |
| **Layer description** | 6 direct retarget + 6 ad-confirmation talking heads (validates the other L4 ads) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 04.09.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming · 2nd touch · confirms open call ad |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L4_GamingStreamers_FL` · ID `1870345749405314` |
| **Age** | 18–34 |
| **Retarget rule** | Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience). |
| **Turn-on rule** | Enable after L3 runs 7+ days and pixel has landing visitors. |

#### 04.09.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L4_ComeBack_001` (`1870345588238449`) | `CAMP_HB_Influencer_L4_ComeBack_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 04.09.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_confirms_open_call_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 45 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-OPEN-CALL-AD-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-blue-silver-v1-faceoff.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-POSTER-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 04.09.05 Copy

- **Hook overlay (0–3s):** THAT OPEN CALL AD? LEGIT
- **TikTok text 1:** Saw the open call ad? It's legit — they want co-stream creators. Finish at hologramboxing.com.
- **TikTok text 2:** Not clickbait. Hologram boxing wants streamers — your slot's still open.

#### 04.09.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l4_confirmsopencall_gaming_inf_l4_confirms_open_call_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l4_confirmsopencall_gaming_inf_l4_confirms_open_call_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L4 |

---
### 04.10.00 — Preview #46 · `AD_HB_Inf_L4_ConfirmsPartner_Creators`

#### 04.10.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 46 |
| **Layer** | L4 — Retargeting (Come back) |
| **Funnel phase** | Retargeting |
| **Layer description** | 6 direct retarget + 6 ad-confirmation talking heads (validates the other L4 ads) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 04.10.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Creators · 2nd touch · confirms partner ad |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L4_AllCreators_FL` · ID `1870345771609170` |
| **Age** | 18–44 |
| **Retarget rule** | Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience). |
| **Turn-on rule** | Enable after L3 runs 7+ days and pixel has landing visitors. |

#### 04.10.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L4_ComeBack_001` (`1870345588238449`) | `CAMP_HB_Influencer_L4_ComeBack_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 04.10.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_confirms_partner_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-PARTNER-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 43 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-PARTNER-AD-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-ar-wide-tent.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 04.10.05 Copy

- **Hook overlay (0–3s):** YES — CREATORS ARE SIGNING UP
- **TikTok text 1:** That partner ad? True — creators are locking co-stream slots. Sign up now.
- **TikTok text 2:** The reviews aren't fluff. Finish at hologramboxing.com.

#### 04.10.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l4_confirmspartner_creators_inf_l4_confirms_partner_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l4_confirmspartner_creators_inf_l4_confirms_partner_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L4 |

---
### 04.11.00 — Preview #47 · `AD_HB_Inf_L4_ConfirmsReminder_Creators`

#### 04.11.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 47 |
| **Layer** | L4 — Retargeting (Come back) |
| **Funnel phase** | Retargeting |
| **Layer description** | 6 direct retarget + 6 ad-confirmation talking heads (validates the other L4 ads) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 04.11.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Creators · 2nd touch · confirms reminder ad |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L4_AllCreators_FL` · ID `1870345771609170` |
| **Age** | 18–44 |
| **Retarget rule** | Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience). |
| **Turn-on rule** | Enable after L3 runs 7+ days and pixel has landing visitors. |

#### 04.11.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L4_ComeBack_001` (`1870345588238449`) | `CAMP_HB_Influencer_L4_ComeBack_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 04.11.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_confirms_reminder_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-REMINDER-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 44 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-REMINDER-AD-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-pov-passthrough.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 04.11.05 Copy

- **Hook overlay (0–3s):** YES — SLOTS ARE FILLING
- **TikTok text 1:** You saw the slots-filling ad? Yeah it's real. Co-stream hologram boxing — apply now.
- **TikTok text 2:** I checked the site — partner spots are going. Don't wait.

#### 04.11.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l4_confirmsreminder_creators_inf_l4_confirms_reminder_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l4_confirmsreminder_creators_inf_l4_confirms_reminder_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L4 |

---
### 04.12.00 — Preview #48 · `AD_HB_Inf_L4_ConfirmsOpenCall_Creators`

#### 04.12.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 48 |
| **Layer** | L4 — Retargeting (Come back) |
| **Funnel phase** | Retargeting |
| **Layer description** | 6 direct retarget + 6 ad-confirmation talking heads (validates the other L4 ads) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 04.12.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Creators · 2nd touch · confirms open call ad |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L4_AllCreators_FL` · ID `1870345771609170` |
| **Age** | 18–44 |
| **Retarget rule** | Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience). |
| **Turn-on rule** | Enable after L3 runs 7+ days and pixel has landing visitors. |

#### 04.12.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L4_ComeBack_001` (`1870345588238449`) | `CAMP_HB_Influencer_L4_ComeBack_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 04.12.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_confirms_open_call_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 45 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-OPEN-CALL-AD-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-blue-silver-v1-faceoff.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-POSTER-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 04.12.05 Copy

- **Hook overlay (0–3s):** YES — THEY WANT CREATORS
- **TikTok text 1:** The open call ad is real — they want creators. Finish at hologramboxing.com.
- **TikTok text 2:** I almost didn't apply. Do it — your slot's still open.

#### 04.12.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l4_confirmsopencall_creators_inf_l4_confirms_open_call_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l4_confirmsopencall_creators_inf_l4_confirms_open_call_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L4 |

---

## 05.00.00 — L5 — Countdown (Show up)

All 3 creatives = voiced talking heads (timer · last call · final slots) · CTA: Sign Up

| Field | Value |
|-------|-------|
| **Preview range** | #49–#54 |
| **TikTok campaign** | `CAMP_HB_Influencer_L5_ShowUp_001` (`1870345600654738`) |
| **Funnel phase** | Countdown — Show up |
| **CTA** | Sign Up |
| **Turn-on** | Enable when HB 002 is ≤14 days out; sync with site countdown. |
| **Retarget** | Warm creators + retarget pools; urgency creative set. |

---
### 05.01.00 — Preview #49 · `AD_HB_Inf_L5_CountdownTimer_Gaming`

#### 05.01.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 49 |
| **Layer** | L5 — Countdown (Show up) |
| **Funnel phase** | Countdown |
| **Layer description** | All 3 creatives = voiced talking heads (timer · last call · final slots) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 05.01.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers 18–34 FL · ≤14d to fight night |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L5_GamingStreamers_FL` · ID `1870345767397378` |
| **Age** | 18–34 |
| **Retarget rule** | Warm creators + retarget pools; urgency creative set. |
| **Turn-on rule** | Enable when HB 002 is ≤14 days out; sync with site countdown. |

#### 05.01.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L5_ShowUp_001` (`1870345600654738`) | `CAMP_HB_Influencer_L5_ShowUp_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 05.01.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l5_countdown_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 40 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L5-COUNTDOWN-TIMER-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-fight-impact.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-POSTER-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 05.01.05 Copy

- **TikTok text 1:** Partner slots close when the countdown hits zero. Co-stream hologram boxing — lock your slot at hologramboxing.com.
- **TikTok text 2:** Fight night countdown is live. Streamers — lock your co-stream slot before partner applications close.

#### 05.01.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l5_countdowntimer_gaming_inf_l5_countdown_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l5_countdowntimer_gaming_inf_l5_countdown_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L5 |

---
### 05.02.00 — Preview #50 · `AD_HB_Inf_L5_LastCall_Gaming`

#### 05.02.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 50 |
| **Layer** | L5 — Countdown (Show up) |
| **Funnel phase** | Countdown |
| **Layer description** | All 3 creatives = voiced talking heads (timer · last call · final slots) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 05.02.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers 18–34 FL · ≤14d to fight night |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L5_GamingStreamers_FL` · ID `1870345767397378` |
| **Age** | 18–34 |
| **Retarget rule** | Warm creators + retarget pools; urgency creative set. |
| **Turn-on rule** | Enable when HB 002 is ≤14 days out; sync with site countdown. |

#### 05.02.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L5_ShowUp_001` (`1870345600654738`) | `CAMP_HB_Influencer_L5_ShowUp_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 05.02.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l5_last_call_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 41 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L5-LAST-CALL-STREAMERS-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-ar-experience.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-POSTER-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 05.02.05 Copy

- **TikTok text 1:** LAST CALL — streamer partner slots closing. Co-stream hologram boxing before the roster locks. Sign up now.
- **TikTok text 2:** Final call for Kick & Twitch creators — co-stream hologram boxing live. Partner applications closing soon.

#### 05.02.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l5_lastcall_gaming_inf_l5_last_call_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l5_lastcall_gaming_inf_l5_last_call_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L5 |

---
### 05.03.00 — Preview #51 · `AD_HB_Inf_L5_OpenCallOpt_Gaming`

#### 05.03.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 51 |
| **Layer** | L5 — Countdown (Show up) |
| **Funnel phase** | Countdown |
| **Layer description** | All 3 creatives = voiced talking heads (timer · last call · final slots) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 05.03.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Gaming streamers 18–34 FL · ≤14d to fight night |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L5_GamingStreamers_FL` · ID `1870345767397378` |
| **Age** | 18–34 |
| **Retarget rule** | Warm creators + retarget pools; urgency creative set. |
| **Turn-on rule** | Enable when HB 002 is ≤14 days out; sync with site countdown. |

#### 05.03.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L5_ShowUp_001` (`1870345600654738`) | `CAMP_HB_Influencer_L5_ShowUp_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 05.03.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l5_final_slots_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L5-FINAL-SLOTS-CLOSING-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 42 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L5-FINAL-SLOTS-CLOSING-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-tent-corner-crowd.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 05.03.05 Copy

- **TikTok text 1:** Open call closing soon — stream hologram boxing live. Final co-stream partner slots. Apply now.
- **TikTok text 2:** Creators — last chance to join the co-stream roster. VIP tent access. Sign up at hologramboxing.com.

#### 05.03.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l5_opencallopt_gaming_inf_l5_final_slots_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l5_opencallopt_gaming_inf_l5_final_slots_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L5 |

---
### 05.04.00 — Preview #52 · `AD_HB_Inf_L5_CountdownTimer_Creators`

#### 05.04.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 52 |
| **Layer** | L5 — Countdown (Show up) |
| **Funnel phase** | Countdown |
| **Layer description** | All 3 creatives = voiced talking heads (timer · last call · final slots) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 05.04.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | All creators 18–44 FL · ≤14d to fight night |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L5_AllCreators_FL` · ID `1870345772618818` |
| **Age** | 18–44 |
| **Retarget rule** | Warm creators + retarget pools; urgency creative set. |
| **Turn-on rule** | Enable when HB 002 is ≤14 days out; sync with site countdown. |

#### 05.04.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L5_ShowUp_001` (`1870345600654738`) | `CAMP_HB_Influencer_L5_ShowUp_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 05.04.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l5_countdown_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 40 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L5-COUNTDOWN-TIMER-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-fight-impact.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-POSTER-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 05.04.05 Copy

- **TikTok text 1:** Partner slots close when the countdown hits zero. Co-stream hologram boxing — lock your slot at hologramboxing.com.
- **TikTok text 2:** Fight night countdown is live. Streamers — lock your co-stream slot before partner applications close.

#### 05.04.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l5_countdowntimer_creators_inf_l5_countdown_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l5_countdowntimer_creators_inf_l5_countdown_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L5 |

---
### 05.05.00 — Preview #53 · `AD_HB_Inf_L5_LastCall_Creators`

#### 05.05.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 53 |
| **Layer** | L5 — Countdown (Show up) |
| **Funnel phase** | Countdown |
| **Layer description** | All 3 creatives = voiced talking heads (timer · last call · final slots) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 05.05.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | All creators 18–44 FL · ≤14d to fight night |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L5_AllCreators_FL` · ID `1870345772618818` |
| **Age** | 18–44 |
| **Retarget rule** | Warm creators + retarget pools; urgency creative set. |
| **Turn-on rule** | Enable when HB 002 is ≤14 days out; sync with site countdown. |

#### 05.05.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L5_ShowUp_001` (`1870345600654738`) | `CAMP_HB_Influencer_L5_ShowUp_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 05.05.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l5_last_call_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 41 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L5-LAST-CALL-STREAMERS-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-ar-experience.mp4` |
| **Poster A/B composite** | `ads/influencer-recruit/output/INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-POSTER-15s.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 05.05.05 Copy

- **TikTok text 1:** LAST CALL — streamer partner slots closing. Co-stream hologram boxing before the roster locks. Sign up now.
- **TikTok text 2:** Final call for Kick & Twitch creators — co-stream hologram boxing live. Partner applications closing soon.

#### 05.05.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l5_lastcall_creators_inf_l5_last_call_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l5_lastcall_creators_inf_l5_last_call_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L5 |

---
### 05.06.00 — Preview #54 · `AD_HB_Inf_L5_OpenCallOpt_Creators`

#### 05.06.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 54 |
| **Layer** | L5 — Countdown (Show up) |
| **Funnel phase** | Countdown |
| **Layer description** | All 3 creatives = voiced talking heads (timer · last call · final slots) · CTA: Sign Up |
| **In staircase launch** | Yes — ship in TikTok/Meta staircase |
| **Format** | 15s · 9:16 video |

#### 05.06.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | All creators 18–44 FL · ≤14d to fight night |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **TikTok ad group** | `ADGRP_HB_Inf_L5_AllCreators_FL` · ID `1870345772618818` |
| **Age** | 18–44 |
| **Retarget rule** | Warm creators + retarget pools; urgency creative set. |
| **Turn-on rule** | Enable when HB 002 is ≤14 days out; sync with site countdown. |

#### 05.06.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | `CAMP_HB_Influencer_L5_ShowUp_001` (`1870345600654738`) | `CAMP_HB_Influencer_L5_ShowUp_001` |
| **Objective** | WEB_CONVERSIONS | OUTCOME_TRAFFIC |
| **Optimization** | CONVERT → `FORM` | LINK_CLICKS |
| **Budget (campaign CBO)** | $20/day | $20/day |
| **CTA button** | Sign Up | Sign Up |

#### 05.06.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l5_final_slots_vo` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L5-FINAL-SLOTS-CLOSING-COMPOSITE-15s.mp4` |
| **Talking-head script** | Script 42 |
| **VO / foreground plate** | `ads/influencer-recruit/output/INFLUENCER-L5-FINAL-SLOTS-CLOSING-15s-VO.mp4` |
| **BG cinematic source** | `assets/ep3-tent-corner-crowd.mp4` |
| **Creative type** | composite cinematic |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 05.06.05 Copy

- **TikTok text 1:** Open call closing soon — stream hologram boxing live. Final co-stream partner slots. Apply now.
- **TikTok text 2:** Creators — last chance to join the co-stream roster. VIP tent access. Sign up at hologramboxing.com.

#### 05.06.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `inf_l5_opencallopt_creators_inf_l5_final_slots_vo` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=inf_l5_opencallopt_creators_inf_l5_final_slots_vo` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#L5 |

---

## 06.00.00 — Bonus — Higgsfield B-roll & Poster A/B (10)

Add-on composites · not in staircase launch matrix · use for TikTok A/B tests

---
### 06.01.00 — Preview #55 · `BONUS_OpenCall_HF_386B5E5C`

#### 06.01.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 55 |
| **Layer** | BONUS — A/B test pool (Bonus composites) |
| **Funnel phase** | A/B test pool |
| **Layer description** | Add-on composites · not in staircase launch matrix · use for TikTok A/B tests |
| **In staircase launch** | No — A/B test pool only |
| **Format** | 15s · 9:16 video |

#### 06.01.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Script 33 · HF highlight reel B-roll |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **Retarget rule** | Match parent script layer when testing (L3 open call, L4 partner, etc.). |
| **Turn-on rule** | Not in staircase launch matrix — duplicate into live ad groups for creative A/B only. |

#### 06.01.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | Match parent script layer when A/B testing | Match parent script layer when A/B testing |
| **Objective** | Same as parent L3/L4/L5 slot | Same as parent slot |
| **CTA button** | Sign Up | Sign Up |

#### 06.01.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_open_call_hf` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-HF-386B5E5C-15s.mp4` |
| **Talking-head script** | Script 33 |
| **HF job ID** | `386b5e5c` · [share](https://higgsfield.ai/s/DSV6gTILagQ) |
| **Creative type** | composite HF bonus |
| **Parent creative key** | `inf_open_call_vo` |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 06.01.05 Copy

- **TikTok text 1:** OPEN CALL FOR STREAMERS & CONTENT CREATORS. WE WANT YOU! DM @hologramboxing
- **TikTok text 2:** WE WANT YOU! Join Creators AI Hologram Boxing — sign up on hologramboxing.com

#### 06.01.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `opencall_hf_386b5e5c_inf_open_call_hf` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=opencall_hf_386b5e5c_inf_open_call_hf` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#BONUS |

---
### 06.02.00 — Preview #56 · `BONUS_JoinTeam_HF_B002936B`

#### 06.02.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 56 |
| **Layer** | BONUS — A/B test pool (Bonus composites) |
| **Funnel phase** | A/B test pool |
| **Layer description** | Add-on composites · not in staircase launch matrix · use for TikTok A/B tests |
| **In staircase launch** | No — A/B test pool only |
| **Format** | 15s · 9:16 video |

#### 06.02.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Script 34 · HF tent B-roll (b002936b) |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **Retarget rule** | Match parent script layer when testing (L3 open call, L4 partner, etc.). |
| **Turn-on rule** | Not in staircase launch matrix — duplicate into live ad groups for creative A/B only. |

#### 06.02.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | Match parent script layer when A/B testing | Match parent script layer when A/B testing |
| **Objective** | Same as parent L3/L4/L5 slot | Same as parent slot |
| **CTA button** | Sign Up | Sign Up |

#### 06.02.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_join_team_hf` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-HF-B002936B-15s.mp4` |
| **Talking-head script** | Script 35 |
| **HF job ID** | `b002936b` · [share](https://higgsfield.ai/s/-hX774_N8iM) |
| **Creative type** | composite HF bonus |
| **Parent creative key** | `inf_join_team_vo` |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 06.02.05 Copy

- **TikTok text 1:** Open call for streamers & creators — live stream hologram boxing. We want you. Apply now.
- **TikTok text 2:** Streamers & creators wanted. Sign up for the first AI hologram boxing event at hologramboxing.com

#### 06.02.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `jointeam_hf_b002936b_inf_join_team_hf` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=jointeam_hf_b002936b_inf_join_team_hf` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#BONUS |

---
### 06.03.00 — Preview #57 · `BONUS_OpenCall_Poster_AB`

#### 06.03.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 57 |
| **Layer** | BONUS — A/B test pool (Bonus composites) |
| **Funnel phase** | A/B test pool |
| **Layer description** | Add-on composites · not in staircase launch matrix · use for TikTok A/B tests |
| **In staircase launch** | No — A/B test pool only |
| **Format** | 15s · 9:16 video |

#### 06.03.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Script 33 · silent poster BG |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **Retarget rule** | Match parent script layer when testing (L3 open call, L4 partner, etc.). |
| **Turn-on rule** | Not in staircase launch matrix — duplicate into live ad groups for creative A/B only. |

#### 06.03.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | Match parent script layer when A/B testing | Match parent script layer when A/B testing |
| **Objective** | Same as parent L3/L4/L5 slot | Same as parent slot |
| **CTA button** | Sign Up | Sign Up |

#### 06.03.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_open_call_poster` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-POSTER-15s.mp4` |
| **Talking-head script** | Script 33 |
| **Creative type** | composite poster A/B |
| **Parent creative key** | `inf_open_call_vo` |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 06.03.05 Copy

- **TikTok text 1:** OPEN CALL FOR STREAMERS & CONTENT CREATORS. WE WANT YOU! DM @hologramboxing
- **TikTok text 2:** WE WANT YOU! Join Creators AI Hologram Boxing — sign up on hologramboxing.com

#### 06.03.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `opencall_poster_ab_inf_open_call_poster` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=opencall_poster_ab_inf_open_call_poster` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#BONUS |

---
### 06.04.00 — Preview #58 · `BONUS_CallingAll_Poster_AB`

#### 06.04.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 58 |
| **Layer** | BONUS — A/B test pool (Bonus composites) |
| **Funnel phase** | A/B test pool |
| **Layer description** | Add-on composites · not in staircase launch matrix · use for TikTok A/B tests |
| **In staircase launch** | No — A/B test pool only |
| **Format** | 15s · 9:16 video |

#### 06.04.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Script 34 · silent poster BG |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **Retarget rule** | Match parent script layer when testing (L3 open call, L4 partner, etc.). |
| **Turn-on rule** | Not in staircase launch matrix — duplicate into live ad groups for creative A/B only. |

#### 06.04.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | Match parent script layer when A/B testing | Match parent script layer when A/B testing |
| **Objective** | Same as parent L3/L4/L5 slot | Same as parent slot |
| **CTA button** | Sign Up | Sign Up |

#### 06.04.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_calling_all_poster` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-CALLING-ALL-COMPOSITE-POSTER-15s.mp4` |
| **Talking-head script** | Script 34 |
| **Creative type** | composite poster A/B |
| **Parent creative key** | `inf_calling_all_vo` |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 06.04.05 Copy

- **TikTok text 1:** Calling all streamers — live stream the first AI hologram boxing event.
- **TikTok text 2:** Creators — your next co-stream is waiting. Would you walk inside?

#### 06.04.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `callingall_poster_ab_inf_calling_all_poster` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=callingall_poster_ab_inf_calling_all_poster` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#BONUS |

---
### 06.05.00 — Preview #59 · `BONUS_JoinTeam_Poster_AB`

#### 06.05.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 59 |
| **Layer** | BONUS — A/B test pool (Bonus composites) |
| **Funnel phase** | A/B test pool |
| **Layer description** | Add-on composites · not in staircase launch matrix · use for TikTok A/B tests |
| **In staircase launch** | No — A/B test pool only |
| **Format** | 15s · 9:16 video |

#### 06.05.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Script 35 · silent poster BG |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **Retarget rule** | Match parent script layer when testing (L3 open call, L4 partner, etc.). |
| **Turn-on rule** | Not in staircase launch matrix — duplicate into live ad groups for creative A/B only. |

#### 06.05.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | Match parent script layer when A/B testing | Match parent script layer when A/B testing |
| **Objective** | Same as parent L3/L4/L5 slot | Same as parent slot |
| **CTA button** | Sign Up | Sign Up |

#### 06.05.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_join_team_poster` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-COMPOSITE-POSTER-15s.mp4` |
| **Talking-head script** | Script 35 |
| **Creative type** | composite poster A/B |
| **Parent creative key** | `inf_join_team_vo` |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 06.05.05 Copy

- **TikTok text 1:** Open call for streamers & creators — live stream hologram boxing. We want you. Apply now.
- **TikTok text 2:** Streamers & creators wanted. Sign up for the first AI hologram boxing event at hologramboxing.com

#### 06.05.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `jointeam_poster_ab_inf_join_team_poster` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=jointeam_poster_ab_inf_join_team_poster` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#BONUS |

---
### 06.06.00 — Preview #60 · `BONUS_L4_Partner_Poster_AB`

#### 06.06.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 60 |
| **Layer** | BONUS — A/B test pool (Bonus composites) |
| **Funnel phase** | A/B test pool |
| **Layer description** | Add-on composites · not in staircase launch matrix · use for TikTok A/B tests |
| **In staircase launch** | No — A/B test pool only |
| **Format** | 15s · 9:16 video |

#### 06.06.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Script 37 · silent poster BG |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **Retarget rule** | Match parent script layer when testing (L3 open call, L4 partner, etc.). |
| **Turn-on rule** | Not in staircase launch matrix — duplicate into live ad groups for creative A/B only. |

#### 06.06.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | Match parent script layer when A/B testing | Match parent script layer when A/B testing |
| **Objective** | Same as parent L3/L4/L5 slot | Same as parent slot |
| **CTA button** | Sign Up | Sign Up |

#### 06.06.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_partner_poster` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-POSTER-15s.mp4` |
| **Talking-head script** | Script 37 |
| **Creative type** | composite poster A/B |
| **Parent creative key** | `inf_l4_partner_reviews_vo` |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 06.06.05 Copy

- **Hook overlay (0–3s):** WHAT STREAMERS ARE SAYING
- **TikTok text 1:** Streamers who toured the tent say the content is insane — co-stream hologram boxing. Your turn. Sign up.
- **TikTok text 2:** Kick, Twitch, and TikTok partners are in. VIP ringside, live FX. Join the roster.

#### 06.06.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `l4_partner_poster_ab_inf_l4_partner_poster` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=l4_partner_poster_ab_inf_l4_partner_poster` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#BONUS |

---
### 06.07.00 — Preview #61 · `BONUS_L4_Reminder_Poster_AB`

#### 06.07.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 61 |
| **Layer** | BONUS — A/B test pool (Bonus composites) |
| **Funnel phase** | A/B test pool |
| **Layer description** | Add-on composites · not in staircase launch matrix · use for TikTok A/B tests |
| **In staircase launch** | No — A/B test pool only |
| **Format** | 15s · 9:16 video |

#### 06.07.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Script 38 · silent poster BG |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **Retarget rule** | Match parent script layer when testing (L3 open call, L4 partner, etc.). |
| **Turn-on rule** | Not in staircase launch matrix — duplicate into live ad groups for creative A/B only. |

#### 06.07.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | Match parent script layer when A/B testing | Match parent script layer when A/B testing |
| **Objective** | Same as parent L3/L4/L5 slot | Same as parent slot |
| **CTA button** | Sign Up | Sign Up |

#### 06.07.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_reminder_poster` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-POSTER-15s.mp4` |
| **Talking-head script** | Script 38 |
| **Creative type** | composite poster A/B |
| **Parent creative key** | `inf_l4_reminder_vo` |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 06.07.05 Copy

- **Hook overlay (0–3s):** STILL THINKING ABOUT IT?
- **TikTok text 1:** Still thinking about co-streaming hologram boxing? Partner slots are filling — finish at hologramboxing.com.
- **TikTok text 2:** Bring your chat ringside — live interactive FX. Finish your application.

#### 06.07.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `l4_reminder_poster_ab_inf_l4_reminder_poster` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=l4_reminder_poster_ab_inf_l4_reminder_poster` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#BONUS |

---
### 06.08.00 — Preview #62 · `BONUS_L5_Countdown_Poster_AB`

#### 06.08.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 62 |
| **Layer** | BONUS — A/B test pool (Bonus composites) |
| **Funnel phase** | A/B test pool |
| **Layer description** | Add-on composites · not in staircase launch matrix · use for TikTok A/B tests |
| **In staircase launch** | No — A/B test pool only |
| **Format** | 15s · 9:16 video |

#### 06.08.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Script 40 · silent poster BG |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **Retarget rule** | Match parent script layer when testing (L3 open call, L4 partner, etc.). |
| **Turn-on rule** | Not in staircase launch matrix — duplicate into live ad groups for creative A/B only. |

#### 06.08.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | Match parent script layer when A/B testing | Match parent script layer when A/B testing |
| **Objective** | Same as parent L3/L4/L5 slot | Same as parent slot |
| **CTA button** | Sign Up | Sign Up |

#### 06.08.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l5_countdown_poster` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-POSTER-15s.mp4` |
| **Talking-head script** | Script 40 |
| **Creative type** | composite poster A/B |
| **Parent creative key** | `inf_l5_countdown_vo` |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 06.08.05 Copy

- **TikTok text 1:** Partner slots close when the countdown hits zero. Co-stream hologram boxing — lock your slot at hologramboxing.com.
- **TikTok text 2:** Fight night countdown is live. Streamers — lock your co-stream slot before partner applications close.

#### 06.08.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `l5_countdown_poster_ab_inf_l5_countdown_poster` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=l5_countdown_poster_ab_inf_l5_countdown_poster` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#BONUS |

---
### 06.09.00 — Preview #63 · `BONUS_L5_LastCall_Poster_AB`

#### 06.09.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 63 |
| **Layer** | BONUS — A/B test pool (Bonus composites) |
| **Funnel phase** | A/B test pool |
| **Layer description** | Add-on composites · not in staircase launch matrix · use for TikTok A/B tests |
| **In staircase launch** | No — A/B test pool only |
| **Format** | 15s · 9:16 video |

#### 06.09.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Script 41 · silent poster BG |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **Retarget rule** | Match parent script layer when testing (L3 open call, L4 partner, etc.). |
| **Turn-on rule** | Not in staircase launch matrix — duplicate into live ad groups for creative A/B only. |

#### 06.09.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | Match parent script layer when A/B testing | Match parent script layer when A/B testing |
| **Objective** | Same as parent L3/L4/L5 slot | Same as parent slot |
| **CTA button** | Sign Up | Sign Up |

#### 06.09.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l5_last_call_poster` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-POSTER-15s.mp4` |
| **Talking-head script** | Script 41 |
| **Creative type** | composite poster A/B |
| **Parent creative key** | `inf_l5_last_call_vo` |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 06.09.05 Copy

- **TikTok text 1:** LAST CALL — streamer partner slots closing. Co-stream hologram boxing before the roster locks. Sign up now.
- **TikTok text 2:** Final call for Kick & Twitch creators — co-stream hologram boxing live. Partner applications closing soon.

#### 06.09.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `l5_lastcall_poster_ab_inf_l5_last_call_poster` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=l5_lastcall_poster_ab_inf_l5_last_call_poster` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#BONUS |

---
### 06.10.00 — Preview #64 · `BONUS_L4_ConfirmsOpenCall_Poster_AB`

#### 06.10.01 Identity & funnel

| Field | Value |
|-------|-------|
| **Preview #** | 64 |
| **Layer** | BONUS — A/B test pool (Bonus composites) |
| **Funnel phase** | A/B test pool |
| **Layer description** | Add-on composites · not in staircase launch matrix · use for TikTok A/B tests |
| **In staircase launch** | No — A/B test pool only |
| **Format** | 15s · 9:16 video |

#### 06.10.02 Targeting & audience

| Field | Value |
|-------|-------|
| **Audience (preview)** | Script 45 · silent poster BG |
| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |
| **Language** | English |
| **Retarget rule** | Match parent script layer when testing (L3 open call, L4 partner, etc.). |
| **Turn-on rule** | Not in staircase launch matrix — duplicate into live ad groups for creative A/B only. |

#### 06.10.03 Platform objectives & CTA

| Field | TikTok | Meta |
|-------|--------|------|
| **Campaign** | Match parent script layer when A/B testing | Match parent script layer when A/B testing |
| **Objective** | Same as parent L3/L4/L5 slot | Same as parent slot |
| **CTA button** | Sign Up | Sign Up |

#### 06.10.04 Creative files

| Field | Path |
|-------|------|
| **Creative key** | `inf_l4_confirms_open_call_poster` |
| **Ship file (preview)** | `ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-POSTER-15s.mp4` |
| **Talking-head script** | Script 45 |
| **Creative type** | composite poster A/B |
| **Parent creative key** | `inf_l4_confirms_open_call_vo` |
| **Rebuild composites** | `scripts/marketing/build-influencer-composites.ps1` |

#### 06.10.05 Copy

- **Hook overlay (0–3s):** THAT OPEN CALL AD? LEGIT
- **TikTok text 1:** Saw the open call ad? It's legit — they want co-stream creators. Finish at hologramboxing.com.
- **TikTok text 2:** Not clickbait. Hologram boxing wants streamers — your slot's still open.

#### 06.10.06 Tracking & launch

| Field | Value |
|-------|-------|
| **Landing** | https://www.hologramboxing.com/landing.html |
| **UTM campaign** | `influencer_recruit` |
| **UTM content** | `l4_confirmsopencall_poster_ab_inf_l4_confirms_open_call_poster` |
| **Full UTM example** | `?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=l4_confirmsopencall_poster_ab_inf_l4_confirms_open_call_poster` |
| **Meta pixel** | `3661825047289885` |
| **TikTok pixel** | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |
| **Status** | PAUSED / OFF until QA complete |
| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#BONUS |

---

## 00.03.00 — QA checklist (before turn-on)

### 00.03.01 Per-ad QA

- [ ] Open preview card — video plays on http://127.0.0.1:8765 (not `file://`)
- [ ] Ship file matches **04 Creative files** row for that doc ID
- [ ] Host audio only on composites (no double VO from B-roll)
- [ ] TikTok texts match preview card copy
- [ ] CTA matches layer (Learn More L1/L2 · Sign Up L3–L5)
- [ ] `utm_content` unique per ad name

### 00.03.02 Layer QA

- [ ] L1–L3 paused ON together for first launch wave
- [ ] L4 audiences attached before enabling retarget campaign
- [ ] L5 countdown synced with site event date
- [ ] Bonus creatives uploaded only as A/B duplicates — not replacing staircase primaries

*Generated by `scripts/marketing/generate-preview-launch-matrix.mjs` — re-run after preview HTML changes.*