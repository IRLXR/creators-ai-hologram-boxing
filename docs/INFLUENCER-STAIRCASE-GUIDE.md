# Influencer Staircase — Creator Partner Ads

**Audience:** Streamers, Kick/Twitch creators, reels creators, combat/gaming content makers  
**Goal:** Sign up at [landing.html](https://www.hologramboxing.com/landing.html) → co-stream HB 002 to their followers  
**UTM campaign:** `influencer_recruit`  
**Status:** All ads **PAUSED / OFF** until you review in Ads Manager

---

## The staircase (creators only)

| Step | Ads Manager layer | Plain English | Creator job | TikTok campaign | Ads |
|------|-------------------|---------------|-------------|-----------------|-----|
| **L1** | **Awareness** | See you | Stop scroll — hologram boxing exists for streamers | `CAMP_HB_Influencer_L1_SeeYou_001` | 6 |
| **L2** | **Consideration** | Get curious | Understand co-stream (tent, live FX, Kick/Twitch) | `CAMP_HB_Influencer_L2_Curious_001` | 6 |
| **L3** | **Conversion** | Sign up | Open call → partner form | `CAMP_HB_InfluencerRecruit_001` | 24 |
| **L4** | **Retargeting** | Come back | Retarget landing visitors who didn’t apply | `CAMP_HB_Influencer_L4_ComeBack_001` | 6 |
| **L5** | **Countdown** | Show up | Urgency — last partner slots before HB 002 | `CAMP_HB_Influencer_L5_ShowUp_001` | 6 |

**TikTok:** All 42 ads built · all campaigns **PAUSED/OFF** · July 10, 2026  
**Meta:** Mirror with `npm run meta:launch-influencer-staircase` after token refresh

**Do not mix fan ads** (Founding Fan, Awareness) into these campaigns — same landing page, different message.

---

## Structure per layer (TikTok + Meta mirror)

Each of L1, L2, L4, L5 has:

| | Gaming streamers | All creators |
|---|----------------|--------------|
| **Ad set name** | `…_GamingStreamers_FL` | `…_AllCreators_FL` |
| **Age** | 18–34 | 18–44 |
| **Geo** | FL DMAs: Orlando, Miami, Tampa, Jacksonville | Same |
| **Ads per set** | 3 | 3 |
| **Total per layer** | 6 ads | |

**L3 (existing)** has 6 TikTok ad groups × 4 ads = **24 ads** (open call exact/opt/v1 + live FX across gaming, combat, reels, Orlando/Miami).

**Grand total when complete:** 5 campaigns · 14 ad groups/ad sets · **42 ads** per platform.

---

## Optimization by layer

| Layer | TikTok optimization | Meta objective | CTA |
|-------|---------------------|----------------|-----|
| L1 See you | `CLICK` | Awareness → Reach | Learn More |
| L2 Get curious | `TRAFFIC_LANDING_PAGE_VIEW` | Traffic → Link clicks | Learn More |
| L3 Sign up | `CONVERT` → `FORM` | Traffic → Link clicks | Sign Up |
| L4 Come back | `CONVERT` → `FORM` | Traffic → Link clicks | Sign Up |
| L5 Show up | `CONVERT` → `FORM` | Traffic → Link clicks | Sign Up |

**L4 audience:** Turn on when pixel has **landing visitors 7d, excluding Lead**.  
**L5 audience:** Turn on when HB 002 is **≤14 days out** (sync with site countdown).

---

## Creatives map

| Layer | Ad | Creative file | Message focus |
|-------|-----|---------------|---------------|
| L1 | Calling All | `TIKTOK-CALLING-ALL-INFLUENCERS-15s.mp4` | Open call hook for streamers |
| L1 | Walk Inside | `WOULD-YOU-WALK-INSIDE-15s-9x16-VO.mp4` | Mystery / tent intrigue |
| L1 | Future Mystery | `Director_Brief_001_Version_B_Cinematic_Mystery.mp4` | Premium trailer energy |
| L2 | Live FX | `32-live-interactive-effects-plate.mp4` | Chat controls AR effects |
| L2 | Co-Stream | `08-watch-free-on-kick-twitch-plate.mp4` | Kick & Twitch co-stream |
| L2 | Inside Tent | `02-the-inflatable-tent-plate.mp4` | Show followers the venue |
| L3 | *(existing pack)* | Open exact / opt / creators v1 / live FX | WE WANT YOU — apply now |
| L4 | Reminder | `CREATOR-REMINDER-15s.mp4` | You looked — finish application |
| L4 | Open Call Exact | `OPEN-CALL-EXACT-POSTER-15s.mp4` | WE WANT YOU retarget |
| L4 | Walk Inside RT | Walk Inside VO | Don’t miss the stream |
| L5 | Last Call | `STREAMER-LAST-CALL-15s.mp4` | Partner slots closing |
| L5 | Open Call Opt | `TIKTOK-OPEN-CALL-OPTIMIZED-15s.mp4` | Final open call |
| L5 | Live FX Urgency | Live FX plate | Go live with us |

---

## TikTok IDs (July 10, 2026)

| Campaign | ID | Budget |
|----------|-----|--------|
| L1 See you | `1870345571958114` | $20/day CBO |
| L2 Curious | `1870345580231025` | $20/day |
| L3 Sign up | `1870260441542146` | $20/day |
| L4 Come back | `1870345588238449` | $20/day |
| L5 Show up | `1870345600654738` | $20/day |

### L1–L5 ad groups (new layers)

| Layer | Gaming | Creators |
|-------|--------|----------|
| L1 | `1870345667162434` | `1870345677808817` |
| L2 | `1870345678592097` | `1870345677811185` |
| L4 | `1870345749405314` | `1870345771609170` |
| L5 | `1870345767397378` | `1870345772618818` |

---

## Launch commands

```bash
# TikTok — ad groups via MCP; ads via Cursor TikTok MCP (sequential)
node scripts/marketing/launch-influencer-staircase-tiktok.mjs

# Meta — after refreshing META_ACCESS_TOKEN in .env.local
node scripts/marketing/launch-influencer-staircase-meta.js --execute
```

---

## Source files

- `ads/influencer-recruit/INFLUENCER-STAIRCASE.json` — machine spec
- `ads/influencer-recruit/LAUNCH-MANIFEST.json` — live IDs
- `scripts/marketing/tiktok-ad-payloads.json` — video library IDs
- `docs/AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md` — full funnel (fans + creators)
