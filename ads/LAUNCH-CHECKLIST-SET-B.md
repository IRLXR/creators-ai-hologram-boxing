# Campaign Set B — Meta + TikTok

**Companion to Set A** (`ads/LAUNCH-CHECKLIST.md`). Different creatives and angles — run **parallel** for A/B tests, not instead of Set A.

**Data file:** `ads/campaigns-set-b.json`

---

## Set A vs Set B (quick)

| | **Set A** | **Set B** |
|---|-----------|-----------|
| **Waitlist** | Blazer host avatar → landing | — |
| **TikTok UGC** | — | Crop tank + hoodie TikTok plates |
| **Stream** | One ad in Phase 3 | Dedicated stream + follow campaign |
| **Fight cards** | Generic ticket ads | Gold/Fire, Blue/Silver, Green/Pink |
| **B2B** | — | Private party + fighter apply |

---

## Budget (Set B only — add on top of Set A)

| Phase | When | Meta/day | TikTok/day |
|-------|------|----------|------------|
| **B1 TikTok Native** | Week 1 | $10 | **$25** |
| **B2 Stream** | Day 3+ | $10 | $15 |
| **B3 Fight Card** | Week 2 | $20 | $15 |
| **B4 Events/Leads** | Week 2+ | $10 | $5 |

**Week 1 total if running Set A + Set B:** ~$80–95/day combined.

---

# B1 — TikTok-Native UGC

**TikTok campaign:** `CAMP_HB_SetB_TikTokNative_001` · Website conversions · **$25/day**  
**Meta (optional):** same name · Traffic · **$10/day**  
**Age:** 18–34 on TikTok ad group

### Ad 1 — `AD_SetB_TT_WhatIs_CropTank`

| Field | Value |
|-------|--------|
| Video | `ugc/output/TIKTOK-what-is-hologram-boxing-plate.mp4` |
| TikTok text | What is hologram boxing? 🥊 You DON'T fight — AI boxers in a tent with AR on. Lowkey the future of fight night. |
| CTA | Learn More |
| URL | https://creators-ai-hologram-boxing.vercel.app/about.html?utm_source=tiktok&utm_medium=paid_social&utm_campaign=setb_ttnative&utm_content=tt_what_is |
| Note | Burn in captions — hook by 0:01 |

### Ad 2 — `AD_SetB_TT_WhatIs_Hoodie`

| Field | Value |
|-------|--------|
| Video | `ugc/output/TIKTOK-hoodie-what-is-hologram-boxing-plate.mp4` |
| TikTok text | POV: you find out hologram boxing is real 😭 Tent + AR + AI fighters. Tap to book ↓ |
| URL | `.../about.html?utm_source=tiktok&utm_medium=paid_social&utm_campaign=setb_ttnative&utm_content=tt_hoodie` |

### Ad 3 — `AD_SetB_TT_WhatIs_FullPlate`

| Field | Value |
|-------|--------|
| Video | `ugc/output/01-what-is-hologram-boxing-plate-full.mp4` |
| TikTok text | Real talk — you don't fight. You watch Wave hologram boxers in AR. Tap ↓ |
| URL | `.../book.html?utm_source=tiktok&utm_medium=paid_social&utm_campaign=setb_ttnative&utm_content=01_full` |

---

# B2 — Stream & Follow

**Campaign:** `CAMP_HB_SetB_Stream_001` · Traffic · Meta $10 + TikTok $15/day

### Ad 1 — `AD_SetB_Stream_Free`

| Field | Value |
|-------|--------|
| Video | `08-watch-free-on-kick-twitch-plate.mp4` |
| Meta primary | Every hologram fight streams live FREE on @creatorsai. Tent tickets = full AR in MVM crypto. Stream now, book later. |
| TikTok text | Free live hologram fights on Kick & Twitch @creatorsai 🔴 |
| URL | `.../watch.html?utm_source={{platform}}&utm_medium=paid_social&utm_campaign=setb_stream&utm_content=08_stream` |
| Alt | Link to https://kick.com/creatorsai for traffic-only tests |

### Ad 2 — `AD_SetB_Follow_CreatorsAI`

| Field | Value |
|-------|--------|
| Video | `12-social-kick-twitch-feed-plate.mp4` |
| TikTok text | Follow @creatorsai — live fights + HB 002 drops. Don't miss the next card. |
| URL | `.../watch.html?utm_source={{platform}}&utm_medium=paid_social&utm_campaign=setb_stream&utm_content=12_social` |

---

# B3 — Fight Card Hype

**Campaign:** `CAMP_HB_SetB_FightCard_001` · Meta Traffic / TikTok Conversions · $20 + $15/day

| Ad name | Video | Headline | URL suffix |
|---------|-------|----------|------------|
| AD_SetB_GoldVsFire | `15-hologram-boxing-002-plate.mp4` | Gold vs Fire — HB 002 | `/book.html?fighter=wave-gold&utm_campaign=setb_fightcard&utm_content=18_gold_fire` |
| AD_SetB_BlueVsSilver | `03-meet-the-wave-fighters-plate.mp4` | Blue vs Silver | `/book.html?utm_campaign=setb_fightcard&utm_content=18b_blue_silver` |
| AD_SetB_GreenVsPink | `03-meet-the-wave-fighters-plate.mp4` | Green vs Pink | `/book.html?utm_campaign=setb_fightcard&utm_content=18c_green_pink` |
| AD_SetB_10K_Prize | `06-pick-your-fighter-win-prizes-plate.mp4` | $10K Prize Pool | `/book.html?utm_campaign=setb_fightcard&utm_content=06_prizes` |

Prepend `https://creators-ai-hologram-boxing.vercel.app` and add `utm_source=meta` or `utm_source=tiktok` + `utm_medium=paid_social`.

**Ticket compliance:** MVM crypto only · spectators don't fight · prize pool per event rules.

---

# B4 — Private Events & Fighter Apply

**Campaign:** `CAMP_HB_SetB_Events_001` · Leads · Meta $10 + TikTok $5/day

### Ad 1 — `AD_SetB_BookTheTent`

| Field | Value |
|-------|--------|
| Video | `09-book-the-tent-for-your-party-plate.mp4` |
| Primary | Birthdays, corporate, festivals — inflatable tent + AR + Wave fights at your event. |
| URL | `.../book.html?utm_source={{platform}}&utm_medium=paid_social&utm_campaign=setb_private_event&utm_content=09_party` |

### Ad 2 — `AD_SetB_ApplyFighter`

| Field | Value |
|-------|--------|
| Video | `03-meet-the-wave-fighters-plate.mp4` |
| Primary | Creators — apply to be featured as a Wave variant. $10K pool at HB 002. |
| URL | `.../book.html?utm_source={{platform}}&utm_medium=paid_social&utm_campaign=setb_fighter_apply&utm_content=27_apply#apply` |
| Meta CTA | Apply Now |

---

## Recommended launch order (Set B)

1. **B1 TikTok Native** — same week as Set A Phase 1 (TikTok-heavy budget)
2. **B2 Stream** — Day 3
3. **B3 Fight Card** — Week 2
4. **B4 Events** — when ready for private bookings / fighter apps

---

## Full campaign map (Set A + Set B)

| Set | Campaigns | Total ads |
|-----|-----------|-----------|
| **A** | 4 phases | 15 ads |
| **B** | 4 phases | 11 ads |
| **Combined** | 8 campaigns | **26 ads** |

Start with **Set A Phase 1** + **Set B1** on TikTok if budget allows (~$60/day total).
