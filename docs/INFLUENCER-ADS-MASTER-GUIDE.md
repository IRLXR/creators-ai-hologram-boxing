# Influencer Ads — Master Guide (Readiness, Fixes & Operations)

**Last updated:** July 12, 2026  
**Audience:** Streamers, Kick/Twitch/YouTube/TikTok creators in Florida  
**Goal:** Creators apply as co-stream partners for **Hologram Boxing 002**  
**Landing:** https://www.hologramboxing.com/landing.html  
**UTM campaign:** `influencer_recruit`  
**Ads status:** All **PAUSED/OFF** until creative + funnel fixes are complete

---

## Quick links

| What | Where |
|------|--------|
| **Watch all ads locally** | `OPEN-INFLUENCER-ADS-PREVIEW.bat` or `npm run preview:influencer-ads:open` |
| **Preview HTML** | `ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html` |
| **Launch matrix (64 ads · doc IDs)** | [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) |
| **Machine spec (IDs, copy, files)** | `ads/influencer-recruit/INFLUENCER-STAIRCASE.json` |
| **Talking-head scripts (VO + prompts)** | `ads/influencer-recruit/INFLUENCER-TALKING-HEAD-SCRIPTS.md` |
| **L4 retarget scripts** | `ads/influencer-recruit/INFLUENCER-L4-RETARGET-SCRIPTS.md` |
| **L5 countdown scripts** | `ads/influencer-recruit/INFLUENCER-L5-COUNTDOWN-SCRIPTS.md` |
| **Talking-head job IDs** | `ads/influencer-recruit/INFLUENCER-UGC-JOBS.json` |
| **TikTok deploy manifest** | `ads/influencer-recruit/LAUNCH-MANIFEST.json` |
| **Staircase overview** | `docs/INFLUENCER-STAIRCASE-GUIDE.md` |
| **Full funnel (fans + creators)** | `docs/AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md` |
| **TikTok Ads Manager** | https://ads.tiktok.com |
| **Meta Ads Manager** | https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=534185933351087 |
| **Test creator landing** | https://www.hologramboxing.com/landing.html?utm_campaign=influencer_recruit |
| **Creator deep link (hash)** | https://www.hologramboxing.com/landing.html#creators |
| **Memory film on landing (Scene 2)** | https://www.hologramboxing.com/landing.html#experience |
| **Brief 004 film preview (local)** | `ads/brief-004/output/preview.html` via `npm start` |

---

## Platform status (July 12, 2026)

| Platform | Campaigns | Ad groups | Staircase ads | Preview cards | Ready to turn on? |
|----------|-----------|-----------|---------------|---------------|-------------------|
| **TikTok** | 5 | 14 | **54** | **64** (+10 bonus A/B) | Composites built & paused — **re-upload ship files** to TikTok library |
| **Meta** | 1 of 5 (L3 partial) | 2 of 14 | 2 of 54 | — | **Blocked** — refresh `META_ACCESS_TOKEN` |

**Ship rule:** Upload `INFLUENCER-*-COMPOSITE-15s.mp4` (cinematic PiP) — not raw `*-15s-VO.mp4` plates. Full per-ad map: [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md).

| Item | Value |
|------|--------|
| TikTok advertiser | `7658020511833014273` |
| TikTok identity | @hologramboxing |
| TikTok pixel (API) | `7658773511775043592` |
| Meta ad account | `534185933351087` |
| Meta pixel | `3661825047289885` |
| Budget per campaign | $20/day CBO |
| Geo | FL DMAs — Orlando, Miami, Tampa, Jacksonville |

**GitHub:** https://github.com/IRLXR/creators-ai-hologram-boxing  
**Production site:** https://www.hologramboxing.com  
**Last deploy:** July 11, 2026 (commit `2d69354` — creator landing + Brief 004 memory film on Scene 2)

---

## The 5-layer staircase

| Layer | Ads Manager | Plain English | TikTok campaign | Campaign ID | Ads |
|-------|-------------|---------------|-----------------|-------------|-----|
| **L1** | Awareness | See you | `CAMP_HB_Influencer_L1_SeeYou_001` | `1870345571958114` | 6 |
| **L2** | Consideration | Get curious | `CAMP_HB_Influencer_L2_Curious_001` | `1870345580231025` | 6 |
| **L3** | Conversion | Sign up | `CAMP_HB_InfluencerRecruit_001` | `1870260441542146` | 24 |
| **L4** | Retargeting | Come back | `CAMP_HB_Influencer_L4_ComeBack_001` | `1870345588238449` | **12** |
| **L5** | Countdown | Show up | `CAMP_HB_Influencer_L5_ShowUp_001` | `1870345600654738` | 6 |

**Total staircase:** **54** ad slots (#1–#54) — 48 base + 6 L4 confirmation.  
**Preview total:** **64** cards (#1–#64) — includes **10 bonus** A/B composites (#55–#64: 2 HF B-roll · 8 poster). Bonus slots are **not** in `INFLUENCER-STAIRCASE.json` launch matrix.

**Talking-head coverage:** VO plates + **cinematic composites built** for L1–L5 (17 staircase composites + 8 poster A/B + 2 HF variants). See [Talking-head scripts](../ads/influencer-recruit/INFLUENCER-TALKING-HEAD-SCRIPTS.md) · rebuild: `scripts/marketing/build-influencer-composites.ps1`.

**Fan campaigns are separate** — do not mix `CAMP_HB_Awareness_001`, Founding Fan, etc. into this staircase.

---

## All staircase ads by layer (doc IDs)

**Canonical detail:** Every row below links to [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) (`XX.YY.ZZ` IDs). **Ship file** = what TikTok/Meta should serve (composites where built).

### L1 — Awareness (6 ads) · CTA: Learn More · doc `01.*`

| Preview # | Doc ID | Ad name | Audience | Ship file | Creative key |
|-----------|--------|---------|----------|-----------|--------------|
| 1 | `01.01.00` | `AD_HB_Inf_L1_CallingAll_Gaming` | Gaming 18–34 FL | `INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` | `inf_calling_all_vo` |
| 2 | `01.02.00` | `AD_HB_Inf_L1_WalkInside_Gaming` | Gaming 18–34 FL | `WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` | `walk` |
| 3 | `01.03.00` | `AD_HB_Inf_L1_FutureMystery_Gaming` | Gaming 18–34 FL | `Director_Brief_001_Version_B_Cinematic_Mystery.mp4` | `future_mystery` |
| 4 | `01.04.00` | `AD_HB_Inf_L1_CallingAll_Creators` | All creators 18–44 FL | `INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` | `inf_calling_all_vo` |
| 5 | `01.05.00` | `AD_HB_Inf_L1_WalkInside_Creators` | All creators 18–44 FL | `WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` | `walk` |
| 6 | `01.06.00` | `AD_HB_Inf_L1_FutureMystery_Creators` | All creators 18–44 FL | `Director_Brief_001_Version_B_Cinematic_Mystery.mp4` | `future_mystery` |

All paths under `ads/influencer-recruit/output/` unless noted (`walk` → `ads/brief-002/output/`, `future_mystery` → `ads/brief-001/output/`).

### L2 — Consideration (6 ads) · CTA: Learn More · doc `02.*`

| Preview # | Doc ID | Ad name | Audience | Ship file | Creative key |
|-----------|--------|---------|----------|-----------|--------------|
| 7 | `02.01.00` | `AD_HB_Inf_L2_LiveFX_Gaming` | Gaming 18–34 FL | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | `livefx` |
| 8 | `02.02.00` | `AD_HB_Inf_L2_CoStream_Gaming` | Gaming 18–34 FL | `INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4` | `stream` |
| 9 | `02.03.00` | `AD_HB_Inf_L2_InsideTent_Gaming` | Gaming 18–34 FL | `INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` | `tent` |
| 10 | `02.04.00` | `AD_HB_Inf_L2_LiveFX_Creators` | All creators 18–44 FL | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | `livefx` |
| 11 | `02.05.00` | `AD_HB_Inf_L2_CoStream_Creators` | All creators 18–44 FL | `INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4` | `stream` |
| 12 | `02.06.00` | `AD_HB_Inf_L2_InsideTent_Creators` | All creators 18–44 FL | `INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` | `tent` |

L2 composites = **host UGC plate (FG)** over **cinematic tent B-roll (BG)** — not raw plates alone.

### L3 — Conversion (24 ads) · CTA: Sign Up · doc `03.*`

**6 ad groups × 4 creatives** — preview #13–#36 · doc `03.01.00`–`03.24.00`

| Ad group | Preview # | Doc ID range | Audience |
|----------|-----------|--------------|----------|
| `ADGRP_HB_OpenCallExact_US_Creators18-44` | 13–16 | `03.01.00`–`03.04.00` | FL creators 18–44 |
| `ADGRP_HB_InfluencerRecruit_US_18-44` | 17–20 | `03.05.00`–`03.08.00` | Broad FL creators |
| `ADGRP_HB_InfluencerRecruit_GamingStreamers_FL` | 21–24 | `03.09.00`–`03.12.00` | Kick/Twitch gamers |
| `ADGRP_HB_InfluencerRecruit_CombatCreators_FL` | 25–28 | `03.13.00`–`03.16.00` | Boxing/MMA creators |
| `ADGRP_HB_InfluencerRecruit_ReelsCreators_FL` | 29–32 | `03.17.00`–`03.20.00` | TikTok/Reels creators |
| `ADGRP_HB_InfluencerRecruit_OrlandoMiami_FL` | 33–36 | `03.21.00`–`03.24.00` | Orlando + Miami local |

**4 creative slots per group (same ship files, different ad names + `utm_content`):**

| Slot | Ship file | Creative key | Audio |
|------|-----------|--------------|-------|
| Open Call Exact | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | `inf_open_call_vo` | ✅ Host PiP + Skye VO |
| Open Call Optimized | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | `inf_join_team_vo` | ✅ Host PiP + Skye VO |
| Open Call Creators v1 | `TIKTOK-OPEN-CALL-CREATORS-15s.mp4` | `open_v1` | ❌ Silent poster |
| Live FX | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | `livefx` | ✅ Host PiP over AR B-roll |

**Full 24-row table:** [Launch matrix §03](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md#030000--l3--conversion-sign-up--6-ad-groups--4-ads)

### L4 — Retargeting (12 ads) · CTA: Sign Up · doc `04.*`

**Job:** 6 direct retarget + **6 ad-confirmation** (2nd touch). Preview #37–#48.

| Preview # | Doc ID | Ad name | Type | Ship file | Creative key |
|-----------|--------|---------|------|-----------|--------------|
| 37 | `04.01.00` | `AD_HB_Inf_L4_PartnerSpotlight_Gaming` | Direct | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` | `inf_l4_partner_reviews_vo` |
| 38 | `04.02.00` | `AD_HB_Inf_L4_Reminder_Gaming` | Direct | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` | `inf_l4_reminder_vo` |
| 39 | `04.03.00` | `AD_HB_Inf_L4_OpenCallExact_Gaming` | Direct | `INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` | `inf_l4_retarget_vo` |
| 40 | `04.04.00` | `AD_HB_Inf_L4_PartnerSpotlight_Creators` | Direct | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` | `inf_l4_partner_reviews_vo` |
| 41 | `04.05.00` | `AD_HB_Inf_L4_Reminder_Creators` | Direct | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` | `inf_l4_reminder_vo` |
| 42 | `04.06.00` | `AD_HB_Inf_L4_OpenCallExact_Creators` | Direct | `INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` | `inf_l4_retarget_vo` |
| 43 | `04.07.00` | `AD_HB_Inf_L4_ConfirmsPartner_Gaming` | Confirmation | `INFLUENCER-L4-CONFIRMS-PARTNER-COMPOSITE-15s.mp4` | `inf_l4_confirms_partner_vo` |
| 44 | `04.08.00` | `AD_HB_Inf_L4_ConfirmsReminder_Gaming` | Confirmation | `INFLUENCER-L4-CONFIRMS-REMINDER-COMPOSITE-15s.mp4` | `inf_l4_confirms_reminder_vo` |
| 45 | `04.09.00` | `AD_HB_Inf_L4_ConfirmsOpenCall_Gaming` | Confirmation | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-15s.mp4` | `inf_l4_confirms_open_call_vo` |
| 46 | `04.10.00` | `AD_HB_Inf_L4_ConfirmsPartner_Creators` | Confirmation | `INFLUENCER-L4-CONFIRMS-PARTNER-COMPOSITE-15s.mp4` | `inf_l4_confirms_partner_vo` |
| 47 | `04.11.00` | `AD_HB_Inf_L4_ConfirmsReminder_Creators` | Confirmation | `INFLUENCER-L4-CONFIRMS-REMINDER-COMPOSITE-15s.mp4` | `inf_l4_confirms_reminder_vo` |
| 48 | `04.12.00` | `AD_HB_Inf_L4_ConfirmsOpenCall_Creators` | Confirmation | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-15s.mp4` | `inf_l4_confirms_open_call_vo` |

| Type | Scripts | Poster A/B (bonus) |
|------|---------|-------------------|
| Direct | 36–38 | Partner `…-POSTER-15s` (#60–61) · Reminder `…-POSTER-15s` |
| Confirmation | 43–45 | Confirms open call `…-POSTER-15s` (#64) |

**Confirmation pattern:** *“You saw that ad? It's true — finish signup at hologramboxing.com.”*

**Scripts:** `INFLUENCER-L4-RETARGET-SCRIPTS.md` · `ugc/36–45-*.md`

**Turn on when:** Pixel has landing visitors (7d, excluding leads). See matrix `00.02.02`.

### L5 — Countdown (6 ads) · CTA: Sign Up · doc `05.*`

Preview #49–#54 · full voiced composites built.

| Preview # | Doc ID | Ad name | Ship file | Creative key | Countdown angle |
|-----------|--------|---------|-----------|--------------|-----------------|
| 49 | `05.01.00` | `AD_HB_Inf_L5_CountdownTimer_Gaming` | `INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-15s.mp4` | `inf_l5_countdown_vo` | Timer live on site — slots close at zero |
| 50 | `05.02.00` | `AD_HB_Inf_L5_LastCall_Gaming` | `INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-15s.mp4` | `inf_l5_last_call_vo` | **LAST CALL** — partner slots closing |
| 51 | `05.03.00` | `AD_HB_Inf_L5_OpenCallOpt_Gaming` | `INFLUENCER-L5-FINAL-SLOTS-CLOSING-COMPOSITE-15s.mp4` | `inf_l5_final_slots_vo` | Open call closes — final partner slots |
| 52 | `05.04.00` | `AD_HB_Inf_L5_CountdownTimer_Creators` | `INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-15s.mp4` | `inf_l5_countdown_vo` | Same |
| 53 | `05.05.00` | `AD_HB_Inf_L5_LastCall_Creators` | `INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-15s.mp4` | `inf_l5_last_call_vo` | Same |
| 54 | `05.06.00` | `AD_HB_Inf_L5_OpenCallOpt_Creators` | `INFLUENCER-L5-FINAL-SLOTS-CLOSING-COMPOSITE-15s.mp4` | `inf_l5_final_slots_vo` | Same |

**Scripts:** `INFLUENCER-TALKING-HEAD-SCRIPTS.md` Scripts 40–42 · `ugc/40–42-*.md`  
**Poster A/B bonus:** #62 countdown · #63 last call (`*-COMPOSITE-POSTER-15s.mp4`)

**Turn on when:** Fight night ≤14 days out (sync with `site-config.json` countdown).

### Bonus — A/B test pool (10 ads) · doc `06.*` · NOT in staircase JSON

Preview #55–#64 · duplicate into live ad groups for creative tests only.

| Preview # | Doc ID | Name | Ship file |
|-----------|--------|------|-----------|
| 55 | `06.01.00` | HF Open Call (386b5e5c) | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-HF-386B5E5C-15s.mp4` |
| 56 | `06.02.00` | HF Join Team (b002936b) | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-HF-B002936B-15s.mp4` |
| 57–64 | `06.03.00`–`06.10.00` | Poster A/B composites | `INFLUENCER-*-COMPOSITE-POSTER-15s.mp4` |

Full detail: [Launch matrix §06](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md#060000--bonus--higgsfield-b-roll--poster-ab-10)

---

## Staircase creatives — ship files vs source plates

**Rule:** TikTok/Meta upload the **Ship file** column. VO plates and silent B-roll are **sources** for `build-influencer-composites.ps1`, not final ads (except `walk`, `future_mystery`, `open_v1`, `future_vo`).

### Talking-head keys → composite ship files

| Key | Ship file (upload this) | VO plate (source) | Host | Used in |
|-----|------------------------|-------------------|------|---------|
| `inf_calling_all_vo` | `INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` | `INFLUENCER-CALLING-ALL-15s-VO.mp4` | Black creator + mic | L1 ×2 · doc `01.01` `01.04` |
| `inf_open_call_vo` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | `INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4` | Black creator + mic | L3 ×6 · doc `03.*` open-call slots |
| `inf_join_team_vo` | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | `INFLUENCER-JOIN-THE-TEAM-15s-VO.mp4` | Blazer + Quest 3 | L3 ×6 · doc `03.*` optimized slots |
| `inf_l4_partner_reviews_vo` | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` | `INFLUENCER-L4-PARTNER-REVIEWS-15s-VO.mp4` | Blazer + Quest 3 | L4 ×2 · `04.01` `04.04` |
| `inf_l4_reminder_vo` | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` | `INFLUENCER-L4-REMINDER-SLOTS-15s-VO.mp4` | Black creator + mic | L4 ×2 · `04.02` `04.05` |
| `inf_l4_retarget_vo` | `INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` | `INFLUENCER-L4-RETARGET-OPEN-CALL-15s-VO.mp4` | Black creator + mic | L4 ×2 · `04.03` `04.06` |
| `inf_l4_confirms_partner_vo` | `INFLUENCER-L4-CONFIRMS-PARTNER-COMPOSITE-15s.mp4` | `INFLUENCER-L4-CONFIRMS-PARTNER-AD-15s-VO.mp4` | Black creator + mic | L4 ×2 · `04.07` `04.10` |
| `inf_l4_confirms_reminder_vo` | `INFLUENCER-L4-CONFIRMS-REMINDER-COMPOSITE-15s.mp4` | `INFLUENCER-L4-CONFIRMS-REMINDER-AD-15s-VO.mp4` | Black creator + mic | L4 ×2 · `04.08` `04.11` |
| `inf_l4_confirms_open_call_vo` | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-15s.mp4` | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-AD-15s-VO.mp4` | Black creator + mic | L4 ×2 · `04.09` `04.12` |
| `inf_l5_countdown_vo` | `INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-15s.mp4` | `INFLUENCER-L5-COUNTDOWN-TIMER-15s-VO.mp4` | Blazer + Quest 3 | L5 ×2 · `05.01` `05.04` |
| `inf_l5_last_call_vo` | `INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-15s.mp4` | `INFLUENCER-L5-LAST-CALL-STREAMERS-15s-VO.mp4` | Black creator + mic | L5 ×2 · `05.02` `05.05` |
| `inf_l5_final_slots_vo` | `INFLUENCER-L5-FINAL-SLOTS-CLOSING-COMPOSITE-15s.mp4` | `INFLUENCER-L5-FINAL-SLOTS-CLOSING-15s-VO.mp4` | Black creator + mic | L5 ×2 · `05.03` `05.06` |
| `inf_l4_streamer_reviews_vo` | `INFLUENCER-L4-STREAMER-REVIEWS-COMPOSITE-15s.mp4` | `INFLUENCER-L4-STREAMER-REVIEWS-15s-VO.mp4` | Black creator + mic | Built · optional A/B (not in 54-slot preview) |

**Full VO + Seedance prompts:** `INFLUENCER-TALKING-HEAD-SCRIPTS.md`  
**Pipeline:** keyframe → `seedance_2_0` 15s → `voice_change` Skye → composite over silent B-roll  
**Rebuild:** `.\scripts\marketing\build-influencer-composites.ps1` (17 cinematic + 8 poster)

### L2 / L3 composite slots (host plate FG + cinematic BG)

| Key | Ship file | FG plate | BG cinematic |
|-----|-----------|----------|--------------|
| `livefx` | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | `32-live-interactive-effects-plate.mp4` | `ep3-ar-closeup-v2.mp4` |
| `stream` | `INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4` | `08-watch-free-on-kick-twitch-plate.mp4` | `ep3-ar-ringside.mp4` |
| `tent` | `INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` | `02-the-inflatable-tent-plate.mp4` | `ep1-tent-preview.mp4` |
| `whatis` | `INFLUENCER-L3-WHATIS-COMPOSITE-15s.mp4` | `ads-avatar-what-is-hologram-boxing-plate.mp4` | `ep3-ar-closeup.mp4` |

### Full-screen / silent staircase creatives (no PiP composite)

| Key | Ship file | Audio | Used in | Doc IDs |
|-----|-----------|-------|---------|---------|
| `walk` | `WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` | ❌ Silent | L1 ×2, L3 cross | `01.02` `01.05` · L3 walk crosses |
| `future_mystery` | `Director_Brief_001_Version_B_Cinematic_Mystery.mp4` | Trailer | L1 ×2 | `01.03` `01.06` |
| `future_vo` | `FUTURE-IS-HERE-15s-9x16-ambient.mp4` | ❌ Ambient | L3 ×1 | `03.06` |
| `open_v1` | `TIKTOK-OPEN-CALL-CREATORS-15s.mp4` | ❌ Silent poster | L3 ×6 | `03.*` creators-v1 slots |

### Poster / HF A/B add-ons (bonus doc `06.*` — not auto-launched)

| Key | Ship file | Parent key |
|-----|-----------|------------|
| `inf_open_call_hf` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-HF-386B5E5C-15s.mp4` | `inf_open_call_vo` |
| `inf_join_team_hf` | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-HF-B002936B-15s.mp4` | `inf_join_team_vo` |
| `inf_*_poster` | `INFLUENCER-*-COMPOSITE-POSTER-15s.mp4` | matching `inf_*_vo` |

### Legacy silent posters (BG for poster composites — not primary ship)

| Key | Silent BG file | Replaced in staircase by |
|-----|----------------|--------------------------|
| `calling_all` | `TIKTOK-CALLING-ALL-INFLUENCERS-15s.mp4` | `inf_calling_all_vo` composite |
| `open_exact` | `OPEN-CALL-EXACT-POSTER-15s.mp4` | `inf_open_call_vo` composite |
| `open_opt` | `TIKTOK-OPEN-CALL-OPTIMIZED-15s.mp4` | `inf_join_team_vo` composite |
| `creator_reminder` | `CREATOR-REMINDER-15s.mp4` | `inf_l4_reminder_vo` composite |
| `partner_spotlight` | `PARTNER-SPOTLIGHT-15s.mp4` | `inf_l4_partner_reviews_vo` composite |
| `countdown_timer` | `COUNTDOWN-TIMER-15s.mp4` | `inf_l5_countdown_vo` composite |
| `streamer_last_call` | `STREAMER-LAST-CALL-15s.mp4` | `inf_l5_last_call_vo` composite |

### Supplementary — not in staircase yet (landing + future fan ads)

| Key | File | Resolution | Audio | Role |
|-----|------|------------|-------|------|
| `memory_60_vo` | `ads/brief-004/output/MEMORY-60s-16x9-VO.mp4` | 1920×1080 | ✅ Jessica VO + music | **Live on landing Scene 2** — night-out sizzle |
| `memory_60_silent` | `ads/brief-004/output/MEMORY-60s-16x9-silent.mp4` | 1920×1080 | ❌ | Future 9:16 cutdown / retarget (see `CR-MEMORY-60` in ad matrix) |

**Brief 004 docs:** `ads/brief-004/VO-SCRIPT-MEMORY.md` · `ads/brief-004/MASTER-FRAMES-SHOT-LIST.md` · `ads/brief-004/build_memory_film.py`  
**Regenerate VO:** `node --env-file=.env.local scripts/generate-brief004-vo.mjs` (Jessica · ElevenLabs)

---

## Readiness evaluation (July 12, 2026)

**Overall score: 8.2 / 10** today · **10/10 path** documented below.

| Dimension | Score | Notes |
|-----------|-------|-------|
| Funnel architecture | 9/10 | L1→L5 + launch matrix (`XX.YY.ZZ`) synced to preview |
| Creator-specific messaging | 7/10 | Composites ship voiced hosts; Blocker 3 on some silent/cross slots |
| Scroll-stopping creative | 9/10 | 17 cinematic + 8 poster + 2 HF composites built |
| Conversion path | 7/10 | Creator form + UTM live; Scene 2 CTA still fan-only |
| Landing social proof | 7.5/10 | Brief 004 memory film on Scene 2 |
| Production specs | 8.5/10 | **54/54 staircase slots** have defined ship files in preview |

### Path to 10/10

| Step | Unlocks |
|------|---------|
| ✅ Scripts L1–L5 + L4 confirmation (33–45) | Layer-native copy |
| ✅ Cinematic composites built (`build-influencer-composites.ps1`) | PiP ship files for TikTok/Meta |
| ✅ Launch matrix doc (`INFLUENCER-PREVIEW-LAUNCH-MATRIX.md`) | Per-ad targeting + UTMs |
| ⏳ TikTok re-upload **composite** ship files | Platform serves PiP ads not VO plates |
| ⏳ Blocker 3 — creator VO on walk/future/cross slots | Message match in-video |
| ⏳ Scene 2 creator CTA | Landing closes the loop |
| ⏳ Meta token refresh + full staircase deploy | Mirror TikTok with composite keys |
| ⏳ Turn on L1+L2+L3 → L4 → L5 in order | Funnel proves out |

### Strong copy (keep)

- “OPEN CALL — Kick & Twitch streamers. WE WANT YOU!”
- “Your chat controls the show — live interactive effects in the tent.”
- “Streamer partner slots are filling.”
- L3 audience splits (gaming / combat / reels / Orlando-Miami)

### Weak copy (rewrite)

- “Something wild is behind that door” (overused)
- “DM @hologramboxing” when CTA is Sign Up — pick one path
- Vague benefits without specifics (VIP access, co-stream slot, content rights)

---

## Three blockers & fix status

### Blocker 1 — Landing page mismatch ✅ FIXED (July 11, 2026)

**Problem:** Ads promised creator signup; landing only had Founding Fan email waitlist.

**Fix deployed to production:**

- Creator partner form on `landing.html` (username/handle, email, platform)
- Tab toggle: **Streamers & Creators** | **Founding Fans**
- Auto-shows creator form when `utm_campaign=influencer_recruit` **or** hash `#creators` / `#creator-partner`
- GHL tags: `creator-partner-lead`, `influencer-recruit`, `form-creator_partner`
- Confirmation email via `api/ghl-auto-reply.js`
- **Brief 004 memory film** in Scene 2 — 60s night-out sizzle (`MEMORY-60s-16x9-VO.mp4`) with custom **Watch 60s film** play button; sound unmutes on tap (iOS/TikTok in-app fallback)

**Files changed:** `landing.html`, `js/landing.js`, `css/landing.css`, `api/ghl-submit.js`, `api/ghl-auto-reply.js`, `ads/brief-004/output/MEMORY-60s-16x9-VO.mp4`

**Verify:** https://www.hologramboxing.com/landing.html?utm_campaign=influencer_recruit  
**Film:** https://www.hologramboxing.com/landing.html#experience

**Remaining gap (minor):** Scene 2 finale button still says “Become a Founding Fan” even in creator mode — should scroll to creator form when `lp-mode-creator` is active.

---

### Blocker 2 — Composites & platform upload ⏳ PARTIAL (July 12, 2026)

#### VO plates + composites ✅ BUILT

| Creative | VO plate (source) | Ship file (upload) | Staircase doc IDs |
|----------|-------------------|--------------------|-------------------|
| Open Call Exact | `INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | L3 · `03.*` |
| Calling All | `INFLUENCER-CALLING-ALL-15s-VO.mp4` | `INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` | L1 · `01.01` `01.04` |
| Join the Team | `INFLUENCER-JOIN-THE-TEAM-15s-VO.mp4` | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | L3 · `03.*` |
| L4 Partner Reviews | `INFLUENCER-L4-PARTNER-REVIEWS-15s-VO.mp4` | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` | `04.01` `04.04` |
| L4 Reminder Slots | `INFLUENCER-L4-REMINDER-SLOTS-15s-VO.mp4` | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` | `04.02` `04.05` |
| L4 Retarget Open Call | `INFLUENCER-L4-RETARGET-OPEN-CALL-15s-VO.mp4` | `INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` | `04.03` `04.06` |
| L4 Confirms (×3) | `INFLUENCER-L4-CONFIRMS-*-AD-15s-VO.mp4` | `INFLUENCER-L4-CONFIRMS-*-COMPOSITE-15s.mp4` | `04.07`–`04.12` |
| L5 Countdown / Last Call / Final | `INFLUENCER-L5-*-15s-VO.mp4` | `INFLUENCER-L5-*-COMPOSITE-15s.mp4` | `05.01`–`05.06` |
| L2 Live FX / Co-stream / Tent | UGC plates | `INFLUENCER-L2-*-COMPOSITE-15s.mp4` | `02.*` |
| L3 What Is | UGC plate | `INFLUENCER-L3-WHATIS-COMPOSITE-15s.mp4` | `03.07` |

**Scripts:** `INFLUENCER-TALKING-HEAD-SCRIPTS.md` · **Jobs:** `INFLUENCER-UGC-JOBS.json`  
**Rebuild:** `.\scripts\marketing\build-influencer-composites.ps1`  
**Regenerate matrix after preview edits:** `npm run docs:launch-matrix`

#### Still to do

| Item | Status |
|------|--------|
| **TikTok re-upload composites** | Ship `*-COMPOSITE-15s.mp4` per [launch matrix](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) — library may still map to VO/silent fallbacks |
| **Meta deploy** | Token refresh → `npm run meta:launch-influencer-staircase` (uses composite paths in `launch-influencer-staircase-meta.js`) |
| **Blocker 3** | Re-VO fan plates on walk / future / whatis cross slots |
| **L3 silent poster** | `TIKTOK-OPEN-CALL-CREATORS-15s.mp4` (6 slots) — intentional silent; poster A/B at `06.*` |
| **Bonus A/B upload** | Optional duplicate ads for HF + poster variants (#55–#64) |

---

### Blocker 3 — Fan videos with creator ad copy ⏳ PARTIAL

**Problem:** In-video CTA contradicts ad caption on **non-composite** slots.

| Preview / doc | Ship file | Says in video | Ad copy says |
|---------------|-----------|---------------|--------------|
| `01.02` `01.05` | `walk` silent | (silent — OK) | “Creators — stream live” |
| `03.06` | `future_vo` ambient | (ambient — OK) | “Creators — we want you” |
| L2 composites `02.*` | Host plate FG | Fan CTA on plate audio | “Co-stream with us” — **composite uses host audio only** |
| `03.07` | `whatis` composite | Fan explainer on plate | “Creators — join fight night” |

**Fix:** Creator-specific VO re-cuts on FG plates, then rebuild L2/L3 composites.

---

## Creator landing (how it works)

1. User clicks ad → `landing.html?utm_campaign=influencer_recruit&…` (or `#creators`)
2. Page detects influencer UTM or creator hash → shows **Streamers & Creators** mode
3. Headline: “WE WANT YOU TO CO-STREAM HOLOGRAM BOXING 002.”
4. Form fields: username/handle, email, platform (optional)
5. Submit → `POST /api/ghl-submit` with `formKey: creator_partner`
6. GHL contact tagged; auto-reply sent; TikTok Lead event fired
7. Scroll to Scene 2 → **Create a Memory** 60s film shows the night-out experience (fan-oriented sizzle; helps creators visualize the tent)

**Fan traffic** (no influencer UTM) still sees Founding Fan waitlist by default. Users can switch tabs manually.

**Local test (forms hit production GHL via proxy):**

```bash
npm start
# → http://127.0.0.1:3000/landing.html?utm_campaign=influencer_recruit
```

Uses `scripts/dev-server.py` — static files + `/api/*` proxied to production.

---

## Preview ads locally

**Do not double-click the HTML file** — browsers block video on `file://`.

```bash
# Option A — double-click in repo root
OPEN-INFLUENCER-ADS-PREVIEW.bat

# Option B — npm
npm run preview:influencer-ads:open
```

Opens: http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html

**QA against launch matrix:** For each preview card #N, verify ship file matches doc ID `XX.YY.00` in [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md).

---

## Launch commands

### TikTok (already built — all PAUSED)

```bash
npm run tiktok:launch-influencer-staircase
# or
node scripts/marketing/launch-influencer-staircase-tiktok.mjs
```

Campaign IDs in `ads/influencer-recruit/LAUNCH-MANIFEST.json`.

### Meta (pending token)

1. Refresh token: https://developers.facebook.com/tools/explorer/?app_id=1553077533181756  
   Scopes: `ads_read`, `ads_management`, `business_management`, `pages_show_list`, `pages_read_engagement`
2. Update `META_ACCESS_TOKEN` in `.env.local` (and Vercel env if needed)
3. Verify: `npm run meta:verify`
4. Deploy staircase:

```bash
npm run meta:launch-influencer-staircase -- --execute
npm run meta:launch-influencer-adsets -- --execute
```

---

## Recommended turn-on order (after composite re-upload)

| Phase | Turn on | Doc IDs | Why |
|-------|---------|---------|-----|
| **0** | Re-upload `*-COMPOSITE-15s.mp4` to TikTok/Meta | All `01.*`–`05.*` | Platform must serve PiP composites not VO plates |
| **1** | L3 — Gaming + Reels ad groups | `03.09`–`03.12` · `03.17`–`03.20` | Highest intent; test landing |
| **2** | L2 — Live FX + Co-Stream | `02.*` | Educate on co-stream offer |
| **3** | L1 — Calling All composite + Future Mystery | `01.01` `01.04` · `01.03` `01.06` | Scale awareness |
| **4** | L4 | `04.*` | After pixel has landing traffic 7d |
| **5** | L5 | `05.*` | ≤14 days to HB 002 |
| **A/B** | Bonus HF + poster | `06.*` | Optional creative tests in live ad groups |

---

## Deploy to production

```bash
git push origin master
npx vercel --prod --yes
```

Ensure Vercel project env has `GHL_PIT_TOKEN`, `GHL_LOCATION_ID`, and other secrets from `.env.local`.

---

## Ops cleanup (optional)

| Item | Action |
|------|--------|
| **TikTok composite swap** | Re-upload `INFLUENCER-*-COMPOSITE-15s.mp4` per launch matrix — not `*-15s-VO.mp4` |
| **Launch matrix sync** | `npm run docs:launch-matrix` after preview HTML changes |
| Scene 2 finale CTA | Still fan copy in creator mode — wire to `#creator-partner-signup` when `lp-mode-creator` |
| L1 duplicate `WalkInside Gaming` | Pause duplicate in TikTok Ads Manager if both walk slots compete |
| Meta full mirror | After token refresh — `launch-influencer-staircase-meta.js` already maps composite keys |

---

## Related files in repo

| File | Purpose |
|------|---------|
| `ads/influencer-recruit/INFLUENCER-L4-RETARGET-SCRIPTS.md` | L4 retarget suite (Scripts 36–39) |
| `ads/influencer-recruit/INFLUENCER-L5-COUNTDOWN-SCRIPTS.md` | L5 countdown suite (Scripts 40–42) |
| `ads/influencer-recruit/INFLUENCER-TALKING-HEAD-SCRIPTS.md` | Master VO scripts + Seedance prompts |
| `ads/influencer-recruit/INFLUENCER-UGC-JOBS.json` | Higgsfield job IDs for talking heads |
| `ads/influencer-recruit/ugc/33–42-*.md` | Per-script source files (L1–L5 talking heads) |
| `ads/influencer-recruit/BLOCKER2-VO-SCRIPTS.json` | Poster VO scripts (reminder, countdown, etc.) |
| `ads/influencer-recruit/INFLUENCER-STAIRCASE.json` | Full spec + campaign IDs |
| `ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html` | Visual preview grid |
| `ads/influencer-recruit/staircase-ad-ops.json` | TikTok ad payloads |
| `ads/influencer-recruit/CAMPAIGN-SPEC.json` | Open call copy + opportunities |
| `scripts/marketing/tiktok-ad-payloads.json` | Video library IDs |
| `scripts/marketing/launch-influencer-staircase-tiktok.mjs` | TikTok L1/L2/L4/L5 launcher |
| `scripts/marketing/launch-influencer-staircase-meta.js` | Meta L1/L2/L4/L5 launcher |
| `scripts/marketing/launch-meta-matrix.js` | Meta L3 ad sets |
| `scripts/serve-preview.mjs` | Local preview server |
| `scripts/dev-server.py` | Local landing + API proxy (`npm start`) |
| `ads/brief-004/` | Create a Memory 60s film (master frames, VO, exports) |
| `docs/INFLUENCER-PREVIEW-LAUNCH-MATRIX.md` | **64-card preview → launch** (`XX.YY.ZZ` doc IDs, targeting, UTMs) |
| `docs/VIDEO-BROLL-TALKING-HEAD-MATCHING.md` | Composite build rules |
| `docs/VIDEO-TOPIC-MATCHING-GUIDE.md` | Script ↔ B-roll topic fit |
| `scripts/marketing/build-influencer-composites.ps1` | Rebuild 17 cinematic + 8 poster composites |
| `scripts/marketing/generate-preview-launch-matrix.mjs` | Regenerate launch matrix from preview HTML |

| `docs/AD-SET-AD-BUILD-MATRIX.md` | Campaign × ad set matrix |

---

## Next steps (priority order)

1. ✅ **Creator landing** — deployed July 11, 2026
2. ✅ **Brief 004 on landing** — 60s memory film live in Scene 2
3. ✅ **Full talking-head script suite** — L1–L5 + L4 confirmation (Scripts 33–45)
4. ✅ **Cinematic composites built** — `build-influencer-composites.ps1` (17 + 8 poster + 2 HF bonus)
5. ✅ **Launch matrix doc** — `INFLUENCER-PREVIEW-LAUNCH-MATRIX.md` synced to 64-card preview
6. ⏳ **TikTok re-upload composites** — ship `*-COMPOSITE-15s.mp4` per doc IDs `01.*`–`05.*`
7. ⏳ **Creator-aware Scene 2 CTA** — finale button in creator mode
8. ⏳ **Re-VO fan FG plates** — L2/L3 composite sources (Blocker 3)
9. ⏳ **Meta token refresh** + full staircase deploy
10. ⏳ **Turn on L1+L2+L3 → L4 → L5** after #6 on key creatives

---

*This document is the single operational reference for the influencer 5-layer ad staircase, readiness audit, fixes, and launch workflow.*
