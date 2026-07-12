# Ad Funnel Layers Guide — 2026 Q2 (Layman's Edition)

**For:** Creators AI Hologram Boxing  
**Goal:** Get emails, build buzz, fill the tent, and make the countdown feel real.  
**Landing page:** [hologramboxing.com/landing.html](https://www.hologramboxing.com/landing.html)  
**Geo priority:** Orlando → Miami → Tampa → Jacksonville  
**Last updated:** July 12, 2026 — Influencer staircase **54 ads** + **10 bonus** composites; launch matrix synced; fan matrix separate

This guide explains **what ad layers to build**, **why each exists**, and **what to fill in** so nothing is half-empty in Ads Manager. Written for humans, not ad nerds.

**Influencer-only staircase:** [INFLUENCER-STAIRCASE-GUIDE.md](./INFLUENCER-STAIRCASE-GUIDE.md) · **Launch matrix (64 cards · doc IDs):** [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) · **Master ops:** [INFLUENCER-ADS-MASTER-GUIDE.md](./INFLUENCER-ADS-MASTER-GUIDE.md) · **Watch all ads:** [INFLUENCER-42-ADS-PREVIEW.html](../ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html) (local server required)

**Companion docs:** [AD-SET-AD-BUILD-MATRIX.md](./AD-SET-AD-BUILD-MATRIX.md) (every row) · [AD-FUNNEL-LEARNING-GUIDE.md](./AD-FUNNEL-LEARNING-GUIDE.md) (10 lessons)

---

## What changed (July 12, 2026)

### July 12 — Composites + launch matrix

| Change | Before | After |
|--------|--------|-------|
| **Staircase ad count** | 42 (L4 = 6) | **54** (L4 = **12** incl. 6 confirmation ads) |
| **Preview cards** | 42–48 | **64** (54 staircase + 10 bonus A/B) |
| **Ship files** | VO plates / silent posters | **`INFLUENCER-*-COMPOSITE-15s.mp4`** (host PiP over cinematic B-roll) |
| **Per-ad launch spec** | Scattered across guides | [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) (`XX.YY.ZZ` doc IDs) |
| **Regenerate matrix** | — | `npm run docs:launch-matrix` |

### July 10 — Influencer staircase built (TikTok, PAUSED)

| Change | Before | After |
|--------|--------|-------|
| **Influencer funnel** | Only Layer 3 (conversion) — 1 campaign, 24 ads | **All 5 layers** — 5 campaigns, 14 ad groups |
| **L1 Awareness** | Not built for creators | `CAMP_HB_Influencer_L1_SeeYou_001` — 6 ads (doc `01.*`) |
| **L2 Consideration** | Not built for creators | `CAMP_HB_Influencer_L2_Curious_001` — 6 ads (doc `02.*`) |
| **L3 Conversion** | Already live | `CAMP_HB_InfluencerRecruit_001` — 6 ad groups, 24 ads (doc `03.*`) |
| **L4 Retargeting** | Not built | `CAMP_HB_Influencer_L4_ComeBack_001` — **12 ads** direct + confirmation (doc `04.*`) |
| **L5 Countdown** | Not built | `CAMP_HB_Influencer_L5_ShowUp_001` — 6 voiced composites (doc `05.*`) |

### New docs & scripts

| File | Purpose |
|------|---------|
| `docs/INFLUENCER-STAIRCASE-GUIDE.md` | Creator-only staircase map (awareness → countdown) |
| `ads/influencer-recruit/INFLUENCER-STAIRCASE.json` | Machine spec + campaign/ad group IDs |
| `scripts/marketing/launch-influencer-staircase-tiktok.mjs` | TikTok deploy script |
| `scripts/marketing/launch-influencer-staircase-meta.js` | Meta mirror (run after token refresh) |
| `docs/INFLUENCER-PREVIEW-LAUNCH-MATRIX.md` | **64-card preview → TikTok/Meta launch** (`XX.YY.ZZ` IDs) |
| `scripts/marketing/build-influencer-composites.ps1` | Rebuild cinematic + poster composites |
| `npm run docs:launch-matrix` | Regenerate matrix from preview HTML |

### Clarifications added to this guide

- **Influencer vs fan** — fan campaigns (`CAMP_HB_Awareness_001`, `CAMP_HB_Consideration_001`, `CAMP_HB_Convert_FoundingFan_001`) are **separate** and **not the current priority**
- **Layer mapping** — influencer L1 = Awareness, L2 = Consideration, L3 = Conversion, L4 = Retargeting, L5 = Countdown (same staircase logic, creator copy)
- **Turn-on order** — L1 + L2 + L3 first for creators; L4 after pixel data; L5 when HB 002 ≤14 days out

### Still pending

| Item | Action |
|------|--------|
| **TikTok composite re-upload** | Upload `*-COMPOSITE-15s.mp4` per [launch matrix](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) before turn-on |
| **Meta influencer staircase** | Refresh `META_ACCESS_TOKEN` → `npm run meta:launch-influencer-staircase` |
| **L4/L5 audiences** | Attach retarget lists in Ads Manager when pixel + event date are ready |
| **L1 duplicate** | One extra `WalkInside Gaming` ad in L1 — safe to pause duplicate in TikTok Ads Manager |

---

## Live inventory snapshot (July 12, 2026)

**All ads are PAUSED / DISABLE** — safe to review in Ads Manager before turning on.

| Platform | Campaigns | Ad sets / groups | Staircase ads | Preview | Status |
|----------|-----------|------------------|---------------|---------|--------|
| **TikTok (fans)** | 4 | 11 | 42 | — | Built — awareness, consideration, founding fan, experience |
| **TikTok (influencers)** | **5** | **14** | **54** | **64** | Composites built · **re-upload ship files** · PAUSED |
| **Meta (influencers)** | 0 of 5 | 0 of 14 | 0 of 54 | — | Pending token → `npm run meta:launch-influencer-staircase` |

### TikTok — Influencer staircase (PRIORITY #1 — creators only, all OFF)

| Layer | Ads Manager term | Staircase step | Campaign | Campaign ID | Ad groups | Ads | Doc layer | Budget |
|-------|------------------|----------------|----------|-------------|-----------|-----|-----------|--------|
| **1** | **Awareness** | See you | `CAMP_HB_Influencer_L1_SeeYou_001` | `1870345571958114` | 2 | 6 | `01.*` | $20/day |
| **2** | **Consideration** | Get curious | `CAMP_HB_Influencer_L2_Curious_001` | `1870345580231025` | 2 | 6 | `02.*` | $20/day |
| **3** | **Conversion** | Sign up | `CAMP_HB_InfluencerRecruit_001` | `1870260441542146` | 6 | 24 | `03.*` | $20/day |
| **4** | **Retargeting** | Come back | `CAMP_HB_Influencer_L4_ComeBack_001` | `1870345588238449` | 2 | **12** | `04.*` | $20/day |
| **5** | **Countdown** | Show up | `CAMP_HB_Influencer_L5_ShowUp_001` | `1870345600654738` | 2 | 6 | `05.*` | $20/day |

**Bonus A/B (not in staircase JSON):** 10 cards · doc `06.*` · preview #55–#64.

**Landing for all layers:** `landing.html` · **UTM:** `influencer_recruit` · **Ship rule:** `*-COMPOSITE-15s.mp4` where built

### TikTok — Fan funnel (run later — NOT influencer staircase)

| Campaign | Layer | Ad groups | Ads | Budget |
|----------|-------|-----------|-----|--------|
| `CAMP_HB_Convert_FoundingFan_001` | 3 Conversion (fans) | 4 | 16 | $25/day CBO |
| `CAMP_HB_Awareness_001` | 1 Awareness (fans) | 4 | 12 | $20/day CBO |
| `CAMP_HB_Consideration_001` | 2 Consideration (fans) | 2 | 8 | $20/day CBO |
| `CAMP_HB_Experience_001` | 1 + 3 (heroes) | 1 | 6 | $20/day CBO |

### Meta campaigns (all PAUSED)

| Campaign | Layer | Ad sets | Ads | Notes |
|----------|-------|---------|-----|-------|
| `CAMP_HB_InfluencerRecruit_001` | 3 Conversion (creators) | 2 | 2 | +4 new ad sets scripted — run `npm run meta:launch-influencer-adsets` after token refresh |
| `CAMP_HB_Experience_001` | 1 + 3 (heroes) | 1 | 2 | Walk Inside + Future Is Here |

### Still to build (both platforms)

| Layer | What | When |
|-------|------|------|
| **Meta influencer staircase** | L1–L5 mirror of TikTok | Refresh `META_ACCESS_TOKEN` → `npm run meta:launch-influencer-staircase` |
| **Meta fan mirror** | Founding Fan, Awareness, Consideration | Same token refresh → `npm run meta:launch-matrix` |
| **L4/L5 audiences** | Retarget + countdown | Pixel traffic + HB 002 date ≤14 days |

**Source of truth:** [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) · `ads/influencer-recruit/INFLUENCER-STAIRCASE.json` · `docs/INFLUENCER-STAIRCASE-GUIDE.md` · `LAUNCH-MANIFEST.json`

---

## The simple idea

Think of ads like a **staircase**, not one giant billboard.

| Step | Plain English | What you want them to do |
|------|---------------|---------------------------|
| **1. See you** | "What is hologram boxing?" | Stop scrolling, remember the brand |
| **2. Get curious** | "This looks wild — tell me more" | Click, watch longer, visit the site |
| **3. Sign up** | "I want in before tickets drop" | Leave email on landing page |
| **4. Come back** | "I visited but didn't sign up" | Retarget with urgency / countdown |
| **5. Show up** | "Event is soon" | Buy ticket / show up / tell friends |

Each step = **its own campaign layer** with **its own ad sets** and **its own ads**. Mixing everything into one ad set is how budgets get wasted in 2026.

---

## Influencer staircase first (your current priority)

You asked to focus on **influencers / streamers** first — not general fans. That means **5 separate influencer campaigns**, each matching a funnel layer:

| Staircase | Ads Manager layer | What creators should do | TikTok campaign |
|-----------|-------------------|-------------------------|-----------------|
| **L1 — See you** | **Awareness** | Stop scrolling; remember hologram boxing for streamers | `CAMP_HB_Influencer_L1_SeeYou_001` |
| **L2 — Get curious** | **Consideration** | Understand co-stream (tent, live FX, Kick/Twitch) | `CAMP_HB_Influencer_L2_Curious_001` |
| **L3 — Sign up** | **Conversion** | Apply at `landing.html` — open call | `CAMP_HB_InfluencerRecruit_001` |
| **L4 — Come back** | **Retargeting** | Finish application (visited, didn’t sign up) | `CAMP_HB_Influencer_L4_ComeBack_001` |
| **L5 — Show up** | **Countdown** | Last partner slots before HB 002 | `CAMP_HB_Influencer_L5_ShowUp_001` |

**Do not confuse with fan campaigns.** These are separate buckets for a different audience:

| Fan campaign (later) | Fan layer | Influencer equivalent |
|----------------------|-----------|------------------------|
| `CAMP_HB_Awareness_001` | Awareness (fans) | `CAMP_HB_Influencer_L1_SeeYou_001` |
| `CAMP_HB_Consideration_001` | Consideration (fans) | `CAMP_HB_Influencer_L2_Curious_001` |
| `CAMP_HB_Convert_FoundingFan_001` | Conversion (fans) | `CAMP_HB_InfluencerRecruit_001` |

Same staircase logic — different copy, creatives, and `utm_campaign` (`influencer_recruit` vs `founding_fan`).

**TikTok status (July 12):** **54 staircase ads** built and **PAUSED**. Cinematic **composites** in repo — re-upload `*-COMPOSITE-15s.mp4` before turn-on. Turn on **L1 + L2 + L3** first. **L4** after pixel data. **L5** when HB 002 is ≤14 days out. Per-ad detail: [launch matrix](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md).

Full map: [INFLUENCER-STAIRCASE-GUIDE.md](./INFLUENCER-STAIRCASE-GUIDE.md)

---

## Words you'll see in Ads Manager

| Term | Layman's meaning |
|------|------------------|
| **Campaign** | The big bucket — one main goal (awareness, traffic, or sign-ups) |
| **Ad set / Ad group** | Who sees the ad + where + how much per day |
| **Ad** | The actual video/image + text + button people tap |
| **Pixel** | Invisible tracker on your website — tells Meta/TikTok when someone signed up |
| **UTM tags** | Labels on your link so you know *which ad* sent the visitor |
| **CBO / Campaign budget** | TikTok/Meta splits daily budget across ad sets automatically |
| **Retargeting** | Showing ads again to people who already visited your site |
| **Lookalike** | "Find more people like the ones who already signed up" |
| **Creative** | The video or image file |
| **Placement** | Feed, Stories, Reels, TikTok For You Page, etc. |

---

## The 5 layers you should build (2026 Q2 best practice)

Top brands don't run one ad. They run **layers** and let data pick winners.

```
LAYER 1 — AWARENESS (cold audience, never heard of you)
    └── Ad sets by city + interest
    └── Ads: mystery, spectacle, "world's first" hooks

LAYER 2 — CONSIDERATION (watched or clicked, not signed up yet)
    └── Ad sets: retarget site visitors 7–30 days
    └── Ads: explain the experience, tent, VR, hologram fighters

LAYER 3 — CONVERSION (email capture = main KPI right now)
    └── Ad sets: Florida metros + creator interests
    └── Ads: "Become a Founding Fan", open call, countdown

LAYER 4 — RETARGETING (visited landing, no email)
    └── Ad sets: custom audience = landing page visitors
    └── Ads: urgency, social proof, "spots filling up"

LAYER 5 — EVENT / COUNTDOWN (hot audience + email list uploads)
    └── Ad sets: 14 days → 7 days → 48 hours before event
    └── Ads: date, location tease, prize pool, last chance
```

**Rule for Stage 1 (where you are now):** **Influencer layers 1–5 are built on TikTok** (all paused). Turn on influencer **L1 Awareness + L2 Consideration + L3 Conversion** first. Fan campaigns (`CAMP_HB_Awareness_001`, etc.) can wait until creator signup is flowing.

---

## Layer 1 — Brand awareness (cold traffic)

**Purpose:** Make strangers stop and remember *Hologram Boxing* exists.

> **Influencer L1 (built July 10):** `CAMP_HB_Influencer_L1_SeeYou_001` · 2 ad groups · 6 ads · creators/streamers FL · **DISABLE**. Ads: Calling All, Walk Inside, Future Mystery. See [INFLUENCER-STAIRCASE-GUIDE.md](./INFLUENCER-STAIRCASE-GUIDE.md).

### Campaign setup

| Field | What to choose | Hologram Boxing example |
|-------|----------------|-------------------------|
| **Objective** | Awareness or Video views | Meta: *Awareness* · TikTok: *Reach* or *Video views* |
| **Budget** | Start $15–25/day per platform | Test before scaling |
| **Goal** | Maximize **3-second video views** or **reach** | Hook in first 3 seconds |

### Ad sets to create (one per audience slice)

Create **separate ad sets** so you can see what works:

| Ad set name pattern | Who | Geo | Age | TikTok status |
|---------------------|-----|-----|-----|---------------|
| `ADSET_HB_Aware_CombatSports_FL` | UFC/boxing fans | Orlando + Miami + Tampa + Jacksonville (25 mi) | 18–44 | **LIVE** (TT) |
| `ADSET_HB_Aware_Tech_FL` | AI / VR / gaming | Same FL cities | 18–34 | **LIVE** (TT) |
| `ADSET_HB_Aware_General_FL` | Broad entertainment | Same FL cities | 18–44 | **LIVE** (TT) |
| `ADSET_HB_Aware_Tourists_Orlando` | Visitors near attractions | Orlando DMA only | 18–54 | **LIVE** (TT) |
| `ADSET_HB_Aware_Family_FL` | Parents, date night | Same FL cities | 25–54 | Not built yet |

**TikTok campaign:** `CAMP_HB_Awareness_001` · 4 ad groups · 12 ads · $20/day CBO · **DISABLE**

**Ads per ad group (3 each):** Walk Inside, Future Mystery, Future VO — reused across all four groups with audience-specific `utm_content`.

### Ads inside each ad set (2–3 minimum)

| Ad type | Creative idea | Text angle |
|---------|---------------|------------|
| **Mystery hook** | Tent exterior, glowing square, fog | "Would you walk inside?" |
| **Spectacle** | Hologram fighters sparring | "The world's first live AI hologram boxing experience" |
| **POV / AR** | Person in headset watching fight | "Step inside. Gear up. Witness history." |

**Landing URL:** Still `landing.html` — even awareness ads can send to waitlist. Use UTMs: `utm_campaign=awareness&utm_content=combat_fl`.

**Do NOT optimize for sign-ups yet** on this layer — you're buying attention cheaply.

---

## Layer 2 — Consideration (warm traffic)

**Purpose:** People who **engaged** (watched 50%+ video, clicked, visited site) but didn't email yet.

> **Influencer L2 (built July 10):** `CAMP_HB_Influencer_L2_Curious_001` · 2 ad groups · 6 ads · **DISABLE**. Ads: Live FX, Co-Stream, Inside Tent.

### Campaign setup

| Field | What to choose |
|-------|----------------|
| **Objective** | Traffic or Engagement |
| **Audience** | Custom: *Video viewers 50%+*, *Instagram profile visitors*, *Landing page visitors (7 days)* |

### Ad sets

| Ad set | Audience source | TikTok status |
|--------|-----------------|---------------|
| `ADSET_HB_Warm_VideoWatchers_7d` | Watched ≥50% of any video ad (7 days) | Not built |
| `ADSET_HB_Warm_SiteVisitors_14d` | Visited any page on hologramboxing.com | Not built |
| `ADSET_HB_Warm_LandingNoSignup_14d` | Visited landing.html but **did not** trigger Lead event | Not built |
| `ADGRP_HB_Consider_Explainer_FL` | Cold FL + entertainment interests | **LIVE** (TT) |
| `ADGRP_HB_Consider_Streamers_FL` | FL + gaming/streaming | **LIVE** (TT) |

**TikTok campaign:** `CAMP_HB_Consideration_001` · 2 ad groups · 8 ads · $20/day CBO · **DISABLE**

**Ads per ad group (4 each):** What Is, Tent, Headset, How It Works — UGC explainers pushing email CTA.

### Ads

- **Explainer:** 15–30s — what happens inside the tent  
- **Social proof:** "Join Founding Fans" + counter / waitlist energy  
- **Creator angle:** Streamers wanted (your open-call creative)

**Technique (2026):** Use **2–5 ad text variants** per ad (TikTok Smart+ and Meta dynamic copy). Let the platform rotate winners.

---

## Layer 3 — Conversion (email sign-up) ← **your main focus now**

**Purpose:** Get the email on `landing.html` — **Founding Fan waitlist**.

### Campaign setup

| Field | Meta | TikTok |
|-------|------|--------|
| **Objective** | *Leads* or *Sales* → website conversions | *Website conversions* |
| **Optimization event** | **Lead** or **Complete registration** | **Form submit** (FORM) |
| **Pixel required** | Yes — `3661825047289885` | Yes — pixel `7658773511775043592` |
| **Daily budget** | $20/day minimum (account rules) | $20/day CBO minimum |

### Ad sets — Creator recruit (influencer funnel)

**TikTok campaign:** `CAMP_HB_InfluencerRecruit_001` · $20/day CBO · **DISABLE**

| Platform | Ad set / Ad group | Audience | Ads | Status |
|----------|-------------------|----------|-----|--------|
| TikTok | `ADGRP_HB_OpenCallExact_US_Creators18-44` | FL DMAs · creator interests | 4 | **LIVE** |
| TikTok | `ADGRP_HB_InfluencerRecruit_US_18-44` | FL DMAs · broad creators | 4 | **LIVE** |
| TikTok | `ADGRP_HB_InfluencerRecruit_GamingStreamers_FL` | Kick/Twitch streamers, FL | 4 | **LIVE** |
| TikTok | `ADGRP_HB_InfluencerRecruit_CombatCreators_FL` | Boxing/MMA creators, FL | 4 | **LIVE** |
| TikTok | `ADGRP_HB_InfluencerRecruit_ReelsCreators_FL` | TikTok/Reels creators, FL | 4 | **LIVE** |
| TikTok | `ADGRP_HB_InfluencerRecruit_OrlandoMiami_FL` | Local creators, Orlando + Miami | 4 | **LIVE** |
| Meta | `ADSET_HB_OpenCallExact_US_Creators18-34` | FL cities + Twitch/YouTube/Gamer | 1 | **LIVE** (PAUSED) |
| Meta | `ADSET_HB_InfluencerRecruit_US_18-44` | FL cities + creator interests | 1 | **LIVE** (PAUSED) |
| Meta | `ADSET_HB_InfluencerRecruit_GamingStreamers_FL` | Gaming streamers, FL | 4 | **Scripted** — pending token |
| Meta | `ADSET_HB_InfluencerRecruit_CombatCreators_FL` | Combat creators, FL | 4 | **Scripted** — pending token |
| Meta | `ADSET_HB_InfluencerRecruit_ReelsCreators_FL` | Reels creators, FL | 4 | **Scripted** — pending token |
| Meta | `ADSET_HB_InfluencerRecruit_OrlandoMiami_FL` | Orlando + Miami only | 4 | **Scripted** — pending token |

**Creatives per influencer ad group (L3):** Ship files — `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` · `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` · `TIKTOK-OPEN-CALL-CREATORS-15s.mp4` (silent) · `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4`. Same files reused across 6 ad groups with different copy + `utm_content`. Doc IDs: `03.01.00`–`03.24.00`.

### Ad sets — Founding Fan (fan email funnel)

**TikTok campaign:** `CAMP_HB_Convert_FoundingFan_001` · $25/day CBO · **DISABLE**

| Ad set / Ad group | Who | Geo | Age | Ads | TikTok | Meta |
|-------------------|-----|-----|-----|-----|--------|------|
| `*_Convert_CombatSports_FL` | Fight fans | FL 4 cities | 18–44 | 4 | **LIVE** | Pending |
| `*_Convert_TechGamers_FL` | Early adopters | FL 4 cities | 18–34 | 4 | **LIVE** | Pending |
| `*_Convert_General_FL` | Broad entertainment | FL 4 cities | 18–44 | 4 | **LIVE** | Pending |
| `*_Convert_FamilyNight_FL` | Family / date night | FL 4 cities | 25–54 | 4 | **LIVE** | Pending |

**Ads per ad group (4 each):** Walk Inside · Future Is Here VO · Future Mystery · What Is — `utm_campaign=founding_fan`.

### Experience heroes (cross-layer)

**TikTok:** `CAMP_HB_Experience_001` · 1 ad group · 6 ads · **DISABLE**  
**Meta:** `CAMP_HB_Experience_001` · 1 ad set · 2 ads (Walk Inside + Future VO) · **PAUSED**

Creatives: Walk Inside, Future VO, Future Mystery, What Is, Tent, Headset.

### Ads per ad set (fill out completely)

Each ad needs **all** of these — empty fields = weaker delivery in 2026:

| Field | What to write |
|-------|---------------|
| **Video** | 9:16, 15s, hook in 0–3s |
| **Thumbnail** | Auto from video or custom frame with text |
| **Primary text / Ad text** | ≤100 chars TikTok · longer OK on Meta |
| **Headline** | "Become a Founding Fan" / "WE WANT YOU!" |
| **Description** (Meta) | One line: "Sign up for early access." |
| **CTA button** | **Sign Up** (matches landing form) |
| **Landing URL** | `https://www.hologramboxing.com/landing.html?utm_source=...&utm_medium=paid_social&utm_campaign=...&utm_content=...` |
| **Display link** | hologramboxing.com |
| **Identity** | @hologramboxing (TikTok) · Romethelife page (Meta) |

**2026 Q2 technique — "Creative portfolio":** Run 2–4 different videos in the same ad set (Walk Inside, Future Is Here, Open Call, Countdown). Kill losers after 3–5 days, put budget on winners.

---

## Layer 4 — Retargeting (people who almost signed up)

**Purpose:** Cheapest conversions. They already know you.

### How to build the audience

1. Install pixel on **every page** (done on deploy — see `site-config.js`).
2. In Events Manager, create audience: **Landing page visitors, last 14 days, exclude Lead event**.
3. Optional: upload email list from Go High Level as **Custom audience** for exclusion (don't pay to reach people already on the list).

### Ad sets

| Ad set | Audience | Message | Status |
|--------|----------|---------|--------|
| **Influencer (creators)** | | | |
| `ADGRP_HB_Inf_L4_GamingStreamers_FL` | FL gaming streamers 18–34 | Partner + Reminder + Retarget + **3 confirmation** composites | **BUILT** (TT) · doc `04.01`–`04.09` |
| `ADGRP_HB_Inf_L4_AllCreators_FL` | FL creators 18–44 | Same 6 ads, broader age | **BUILT** (TT) · doc `04.04`–`04.12` |
| **Fan (later)** | | | |
| `ADSET_HB_RT_Landing_7d` | Visited landing, no signup, 7 days | "You looked — don't miss the first event" | **Not built** (fans) |
| `ADSET_HB_RT_VideoEngagers_14d` | 75% video watch | "See what happens inside the tent" | **Not built** (fans) |
| `ADSET_HB_RT_CartAbandon_style` | Started typing email, didn't submit | "Finish joining — takes 5 seconds" | **Not built** (fans) |

**Prerequisite:** Run Layer 3 ads for 7+ days first so the pixel has visitor data to retarget. Attach **landing visitors 7d excluding Lead** audience before turning on influencer L4.

### Ads (influencer L4 — ship composites)

- `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` (`04.01` / `04.04`)
- `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` (`04.02` / `04.05`)
- `INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` (`04.03` / `04.06`)
- `INFLUENCER-L4-CONFIRMS-*-COMPOSITE-15s.mp4` (`04.07`–`04.12`)
- Poster A/B bonus: `*-COMPOSITE-POSTER-15s.mp4` (doc `06.*`)

**Budget tip:** Retargeting ad sets often run at **30–50% of cold budget** but deliver **2–5× better cost per email**.

---

## Layer 5 — Event & countdown (urgency)

**Purpose:** Turn waitlist into **ticket intent** and **event attendance** as HB 002 approaches.

### When to turn this on

- Event date confirmed on site (`nextEventDate` in config)
- Countdown visible on landing + homepage
- Ideally **14 days, 7 days, 48 hours** before doors

### Ad sets (time-based layers)

| Ad set | Window | Tone | Status |
|--------|--------|------|--------|
| **Influencer (creators)** | | | |
| `ADGRP_HB_Inf_L5_GamingStreamers_FL` | When HB 002 ≤14 days | Countdown + Last Call + Final slots **composites** | **BUILT** (TT) · doc `05.01`–`05.03` |
| `ADGRP_HB_Inf_L5_AllCreators_FL` | Same | Same 3 ads, creators 18–44 | **BUILT** (TT) · doc `05.04`–`05.06` |
| **Fan (later)** | | | |
| `ADSET_HB_Event_14d_FL` | 14–8 days out | "Two weeks until history" | **Not built** (fans) |
| `ADSET_HB_Event_7d_FL` | 7–3 days out | "One week — Founding Fans first" | **Not built** (fans) |
| `ADSET_HB_Event_48h_FL` | 48–0 hours | "Last chance for early access" | **Not built** (fans) |

**Note:** Prize pool (`UGC-PRIZE`) and HB002 (`UGC-HB002`) videos are already uploaded to TikTok and can drop into countdown ad sets when ready.

### Ads

- Date + city tease (even if venue is "undisclosed," use "Central Florida" or Orlando metro)
- Prize pool ($10K) if verified accurate
- Fight card posters (Gold vs Fire, etc.)
- **Countdown motion graphic** — numbers ticking (matches site)

**Objective shift:** Move from *Lead* → *Traffic* or *Conversions* on ticket/book page when tickets sell.

---

## Tracking — make every ad accountable

If tracking is wrong, you're flying blind. Here's the full stack for Hologram Boxing:

### 1. Meta Pixel (website)

| Item | Value |
|------|-------|
| **Pixel ID** | `3661825047289885` |
| **Where it lives** | `site-config.js` → loaded by `js/analytics.js` on all pages |
| **Key events to fire** | `PageView`, `Lead`, `CompleteRegistration`, `SubmitForm` |

**Verify:** Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkhdkcbjh) → visit landing → submit test email → see `Lead` fire.

### 2. TikTok Pixel

| Item | Value |
|------|-------|
| **Pixel ID** | `D94N53BC77UFCF7AK7E0` |
| **API pixel (ads)** | `7658773511775043592` |
| **Key events** | `SubmitForm`, `CompleteRegistration` |

### 3. UTM tags (every ad link)

Always use this pattern:

```
https://www.hologramboxing.com/landing.html
  ?utm_source=tiktok|meta
  &utm_medium=paid_social
  &utm_campaign=founding_fan|influencer_recruit|awareness|consideration|experience|countdown_7d
  &utm_content=walk_inside_15s|open_call_exact_gaming_fl
```

Store UTMs in ad platform **and** in the URL — TikTok `utm_params` block + Meta `url_tags`.

### 4. Go High Level (CRM)

- Form submissions → GHL contact record  
- Tag contacts: `source:meta`, `source:tiktok`, `campaign:founding_fan`  
- Use GHL for **email nurture** — ads get the click, email closes the relationship  

### 5. Attribution windows (what we use now)

| Platform | Click window | View window |
|----------|--------------|-------------|
| **Meta** | 1 day | 0 days (traffic campaigns) |
| **TikTok** | 7 days | 1 day |

### 6. Personal / advanced tracking (2026 Q2)

| Technique | Plain English | When to use |
|-----------|---------------|-------------|
| **Event ID deduplication** | Same ID sent from browser + server so sign-ups aren't counted twice | Already in `js/analytics.js` waitlist flow |
| **Hashed email (Advanced Matching)** | Send encrypted email to Meta/TikTok after signup | Improves match rate for retargeting |
| **Offline conversions** | Upload ticket buyers back to Meta | After first event |
| **UTM + GHL custom fields** | Store `utm_campaign` on contact | Report which ad set drove each fan |
| **Creative-level reporting** | Name ads `AD_HB_[Layer]_[Creative]_[Length]` | See winners in spreadsheets |

---

## Ad set checklist — fill out EVERY field

Use this before turning any ad set **ON**.

### Ad set / Ad group

- [ ] **Name** follows pattern: `ADSET_HB_[Layer]_[Audience]_[Geo]`
- [ ] **Objective** matches layer (awareness vs conversion)
- [ ] **Budget** set ($20/day min on your accounts)
- [ ] **Schedule** start = today, end = optional (or run continuously)
- [ ] **Locations** — not just "United States" — **Orlando, Miami, Tampa, Jacksonville** (or FL DMAs on TikTok)
- [ ] **Age** matches persona (18–34 creators, 18–44 fans)
- [ ] **Gender** — usually All unless data says otherwise
- [ ] **Language** — English
- [ ] **Placements** — Meta: FB + IG feed/stories/reels · TikTok: TikTok placement
- [ ] **Interests** (Meta) or **manual targeting** (TikTok) for creator/fan layers
- [ ] **Pixel + conversion event** wired (FORM / Lead)
- [ ] **Attribution window** set
- [ ] **Status** — start PAUSED/DISABLE, review, then enable

### Ad (creative)

- [ ] **Video uploaded** (9:16, ≤60s, 15s sweet spot)
- [ ] **Thumbnail / cover image** set
- [ ] **Primary text** — hook + CTA
- [ ] **Headline** (Meta)
- [ ] **Link description** (Meta)
- [ ] **CTA button** = Sign Up
- [ ] **Landing URL** with full UTMs
- [ ] **Identity** = @hologramboxing / Romethelife
- [ ] **2+ text variants** where platform allows
- [ ] **Tracking pixel** confirmed on ad
- [ ] **Preview** checked on mobile

---

## Creative types to produce (catalog)

Build these once, reuse across layers. **11 videos uploaded to TikTok asset library** (see `LAUNCH-MANIFEST.json`).

| Creative ID | Format | Used in layers | Status in repo | TikTok uploaded |
|-------------|--------|----------------|----------------|-----------------|
| Walk Inside 15s | 9:16 video | 1, 3, 7 | `ads/brief-002/` | Yes |
| Future Is Here 15s VO | 9:16 video | 1, 3, 7 | `ads/output/` | Yes |
| Future Mystery 15s | 9:16 video | 1, 3 | `ads/brief-001/` | Yes |
| Open Call exact **composite** 15s | 9:16 video | 3 (creators) | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | Re-upload |
| Open Call optimized **composite** 15s | 9:16 video | 3 (creators) | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | Re-upload |
| Open Call creators v1 15s | 9:16 silent poster | 3 (creators) | `TIKTOK-OPEN-CALL-CREATORS-15s.mp4` | Yes |
| L2 Live FX **composite** | 9:16 video | 2, 3 | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | Re-upload |
| L4/L5 voiced **composites** | 9:16 video | 4, 5 | `INFLUENCER-L4-*-COMPOSITE-15s.mp4` · `INFLUENCER-L5-*-COMPOSITE-15s.mp4` | Re-upload |
| What Is hologram boxing | 9:16 UGC | 2, 3 | `ugc/output/` | Yes |
| Tent / Headset / How It Works | 9:16 UGC | 2, 4, 7 | `ugc/output/` | Yes |
| Live interactive FX | 9:16 UGC | 3 (creators) | `ads/output/` | Yes |
| Prize pool | 9:16 UGC | 5 | `ugc/output/` | Yes |
| Memory / documentary 60s | 16:9 + cutdowns | 1, 2, 4 | `ads/brief-004/` | Not yet |
| Countdown motion | 9:16 10–15s | 4, 5 | **To produce** | — |
| Fight card static | 4:5 / 9:16 | 5 | `assets/fight-*.png` | — |

---

## Recommended build order (what to create next)

### Done on TikTok (July 2026) ✓

- [x] **Influencer staircase — all 5 layers** — 5 campaigns, 14 ad groups, **54 ads** *(July 12)*
- [x] **Cinematic composites built** — 17 staircase + 8 poster + 2 HF bonus
- [x] **Launch matrix doc** — 64 preview cards with `XX.YY.ZZ` IDs
- [x] Creator recruit L3 — 6 ad groups, 24 ads
- [x] Founding Fan conversion — 4 ad groups, 16 ads
- [x] Brand awareness (fans) — 4 ad groups, 12 ads
- [x] Consideration explainers (fans) — 2 ad groups, 8 ads
- [x] Experience heroes — 1 ad group, 6 ads
- [x] Video library uploaded to TikTok (11+ assets)

### Next priorities

| Priority | What | Why |
|----------|------|-----|
| **0** | Re-upload **composite** ship files to TikTok | Per [launch matrix](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) doc IDs `01.*`–`05.*` |
| **1** | Turn on **influencer L1 + L2 + L3** on TikTok at $20/day each | Creator awareness → consideration → signup |
| **2** | Refresh Meta token → `npm run meta:launch-influencer-staircase` | Mirror all 5 influencer layers on Meta |
| **3** | Influencer **L4 retargeting** | After 7+ days of landing traffic in pixel |
| **4** | Influencer **L5 countdown** | When HB 002 is ≤14 days out |
| **5** | Fan funnel on Meta (`npm run meta:launch-matrix`) | After creator signup CPA is stable |
| **6** | Lookalike from email list | After 100+ sign-ups |

---

## Budget split example ($40/day total)

**Starting point once you turn ads ON** (TikTok already has campaigns at $20–25/day CBO each):

| Layer | TikTok (built) | Meta (to mirror) | Notes |
|-------|----------------|------------------|-------|
| Conversion (Layer 3) | $45/day across 2 campaigns | $30/day | Influencer $20 + Founding Fan $25 on TT |
| Consideration (Layer 2) | $20/day | $10/day | Explainer ads — enable after conversion test |
| Awareness (Layer 1) | $20/day | $10/day | Add when conversion CPA is stable |
| Retargeting (Layer 4) | $10/day | $5/day | Only after pixel has 7+ days of data |
| Experience heroes | $20/day | $10/day | Cross-layer test bed |

**Do not scale** until landing page explains the experience and pixel shows steady `Lead` events for 3–7 days.

---

## Naming convention (keep Ads Manager clean)

```
Campaign:  CAMP_HB_[Layer]_[Goal]_001
Ad set:    ADSET_HB_[Layer]_[Audience]_[Geo]
Ad:        AD_HB_[CreativeName]_[Length]_[Variant]
```

Examples:

- `CAMP_HB_Convert_FoundingFan_001`
- `ADSET_HB_Convert_CombatSports_OrlandoMiamiTampaJax`
- `AD_HB_WalkInside_15s_VO_A`

---

## What "top tier" looks like in 2026 Q2

1. **Separate layers** — never one ad set for everything  
2. **Geo-first** — Orlando market before national scale  
3. **Hook in 3 seconds** — silent scroll stops on spectacle  
4. **Sign Up CTA** → one landing page → one form  
5. **Pixel + UTMs on every ad** — no naked links  
6. **2–4 creatives per ad set** — test, kill losers weekly  
7. **Retargeting within 7 days** of first visitor  
8. **Countdown sync** — ad urgency matches website countdown  
9. **Creator + fan funnels separate** — different messages, different ad sets  
10. **Pause before scale** — $20/day until cost per email is acceptable  

---

## Quick reference — your accounts

| | Meta | TikTok |
|---|------|--------|
| **Account** | `534185933351087` | `7658020511833014273` |
| **Page / Identity** | Romethelife (`118345932178751`) | @hologramboxing |
| **Pixel** | `3661825047289885` | Site: `D94N53BC77UFCF7AK7E0` · Ads API: `7658773511775043592` |
| **Landing** | hologramboxing.com/landing.html | Same |
| **Campaigns live** | 2 (influencer L3 + experience) | **9** (5 influencer + 4 fan) |
| **Ad sets / groups** | 3 | **31** (14 influencer + 17 fan) |
| **Ads** | 4 (PAUSED) | **120** (54 influencer staircase + 66 fan, all DISABLE) |
| **Ads Manager** | [Open Meta](https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=534185933351087) | [Open TikTok](https://ads.tiktok.com) |

**Meta blocker:** `META_ACCESS_TOKEN` expired — refresh at [Graph API Explorer](https://developers.facebook.com/tools/explorer/) then run `npm run meta:launch-influencer-staircase` (creators) or `npm run meta:launch-matrix` (full fan mirror).

---

## Related files in this repo

| File | Purpose |
|------|---------|
| `ads/influencer-recruit/LAUNCH-MANIFEST.json` | Live campaign IDs, totals, video library |
| `scripts/marketing/tiktok-ad-payloads.json` | TikTok campaign/ad group IDs + video assets |
| `scripts/marketing/launch-meta-matrix.js` | Meta bulk launcher (PAUSED by default) |
| `ads/influencer-recruit/CAMPAIGN-SPEC.json` | Creator campaign copy + URLs |
| `ads/influencer-recruit/GEO-TARGETING.json` | Florida city / DMA IDs |
| `docs/INFLUENCER-PREVIEW-LAUNCH-MATRIX.md` | **64-card preview → launch** (targeting, UTMs, ship files) |
| `docs/INFLUENCER-ADS-MASTER-GUIDE.md` | Readiness, blockers, composite ship rules |
| `docs/AD-FUNNEL-LEARNING-GUIDE.md` | Step-by-step learning guide |
| `marketing/acmo/` | Full IRLXR marketing brain |
| `js/analytics.js` | Pixel loading + Lead events |
| `docs/TIKTOK-MCP-CONNECT.md` | TikTok MCP setup |

| `docs/AD-SET-AD-BUILD-MATRIX.md` | Full campaign × ad set × ad matrix |

---

*Last updated: July 12, 2026 — Influencer staircase 54 ads + composites + launch matrix. TikTok matrix live (all OFF). Meta partial; full mirror pending token refresh.*
