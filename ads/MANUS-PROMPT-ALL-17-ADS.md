# Manus Prompt — Full 17-Ad Launch Runbook

**Paste this into Manus** (or use the task link created from Cursor).

---

## Instruction

You are the paid media strategist for **Creators AI Hologram Boxing**. Build a complete, beginner-friendly **click-by-click runbook** to launch ads on **Facebook, Instagram, and TikTok**.

This runbook must cover **all 17 ads** below — grouped by phase. The user is a beginner. Use plain language. Include exact field names as they appear in Meta Ads Manager and TikTok Ads Manager.

**You cannot publish ads or spend money.** Your job is the step-by-step guide only.

### Reference files (in repo)
- `ads/ALL-ADS-CATALOG.json` — full ad data
- `ads/launch-hub.html` — copy-paste tool (dropdown for all 17 ads)
- `ads/MANUS-FULL-LAUNCH-BRIEF.md` — phase summary
- Site: https://creators-ai-hologram-boxing.vercel.app
- Landing: https://creators-ai-hologram-boxing.vercel.app/landing.html

### Launch order (critical)
1. **Day 1** — Hero ads only (2 cinematic 15s ads). Budget: $20/day Meta + $15/day TikTok
2. **Week 1+** — Phase 1 waitlist UGC (2 ads)
3. **Week 2+** — Phase 2 awareness (4 ads) + Phase 3 consideration (5 ads)
4. **When tickets live** — Phase 4 conversion (4 ads)

Do NOT tell the user to upload all 17 ads on Day 1.

---

## DAY 1 — Hero Ad A: Would You Walk Inside ★

| Field | Value |
|-------|-------|
| Video (Desktop) | `C:\Users\suzet\Desktop\WOULD-YOU-WALK-INSIDE-15s-9x16.mp4` |
| Video (repo) | `ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-VO.mp4` |
| Campaign | CAMP_HB_WalkInside_001 |
| Headline | Would You Walk Inside? |
| Primary text | Something the world has never seen is waiting behind that door. AI hologram boxers. Live. Front row energy. Become a Founding Fan. |
| TikTok text | Would you walk inside? AI hologram boxers LIVE. Front row energy. Become a Founding Fan |
| CTA | Sign Up |
| URL | https://creators-ai-hologram-boxing.vercel.app/landing.html?utm_source=meta&utm_medium=paid_social&utm_campaign=walk_inside&utm_content=launch_15s_vo |

## DAY 1 — Hero Ad B: The Future Is Here

| Field | Value |
|-------|-------|
| Video (Desktop) | `C:\Users\suzet\Desktop\FUTURE-IS-HERE-15s-9x16.mp4` |
| Video (repo) | `ads/output/FUTURE-IS-HERE-15s-9x16-VO.mp4` |
| Campaign | CAMP_HB_FutureIsHere_001 |
| Headline | The Future Is Here |
| Primary text | The future of live entertainment just arrived. Walk into the arena, gear up, and watch AI hologram boxers go live — front row energy you have never felt before. Become a Founding Fan. |
| TikTok text | Picture this — tent + AR + AI boxers LIVE. Front row. Become a Founding Fan |
| CTA | Sign Up |
| URL | https://creators-ai-hologram-boxing.vercel.app/landing.html?utm_source=meta&utm_medium=paid_social&utm_campaign=future_is_here&utm_content=launch_15s_vo |

---

## PHASE 1 — Waitlist (Week 1+)

**Folder:** `ugc/output/`  
**Destination:** landing.html (waitlist)

### 1. AD_HB_Waitlist_FoundingFan
- Video: `ads-avatar-what-is-hologram-boxing-plate.mp4`
- Headline: Join the Waitlist
- Primary: The world's first live AI hologram boxing experience is launching. Drop your email for early access, ticket alerts, and exclusive drops.
- TikTok: Hologram boxing launching soon. Waitlist = first in the tent. Tap to join.
- Campaign: CAMP_HB_Waitlist_001
- URL: .../landing.html?utm_campaign=waitlist&utm_content=29_waitlist

### 2. AD_HB_Waitlist_WhatIs
- Video: `ads-avatar-what-is-hologram-boxing-plate.mp4`
- Headline: What Is Hologram Boxing?
- Primary: What is hologram boxing? Walk into an inflatable tent, AR on, watch Wave hologram boxers in a glowing square. Spectator only — fight night energy that hits different. Join the waitlist.
- TikTok: What is hologram boxing? Tent + AR + AI fighters. You watch — Wave fights. Tap to join.
- Campaign: CAMP_HB_Waitlist_001
- URL: .../landing.html?utm_campaign=waitlist&utm_content=01_what_is

---

## PHASE 2 — Awareness (Week 2+)

**Destination:** about.html or book.html

| # | Name | Video | Headline |
|---|------|-------|----------|
| 3 | What Is Hologram Boxing? | ads-avatar-what-is-hologram-boxing-plate.mp4 | What Is Hologram Boxing? |
| 4 | Inside the Hologram Tent | 02-the-inflatable-tent-plate.mp4 | Inside the Hologram Tent |
| 5 | Hologram Boxing Is Here | 11-home-hero-brand-plate.mp4 | Hologram Boxing Is Here |
| 6 | All Ages Welcome | 10-all-ages-family-night-plate.mp4 | All Ages Welcome |

Campaign: CAMP_HB_Awareness_001 · CTA: Learn More

---

## PHASE 3 — Consideration (Week 2+)

**Destinations:** fighters.html, about.html, watch.html, events.html

| # | Name | Video | Headline |
|---|------|-------|----------|
| 7 | Meet the Wave Roster | 03-meet-the-wave-fighters-plate.mp4 | Meet the Wave Roster |
| 8 | How It Works | 13-how-it-works-four-steps-plate.mp4 | How It Works |
| 9 | AR Headset Experience | 04-ar-headset-experience-plate.mp4 | AR Headset Experience |
| 10 | Watch Free on Kick & Twitch | 08-watch-free-on-kick-twitch-plate.mp4 | Watch Free on Kick & Twitch |
| 11 | Hologram Boxing 001 | 14-event-archive-hb001-plate.mp4 | Hologram Boxing 001 |

Campaign: CAMP_HB_Consideration_001 · CTA: Learn More

---

## PHASE 4 — Tickets (when booking opens)

**Destination:** book.html

| # | Name | Video | Headline |
|---|------|-------|----------|
| 12 | HB 002 — Book Now | 15-hologram-boxing-002-plate.mp4 | HB 002 — Book Now |
| 13 | Book with Me vs Me Crypto | 05-tickets-and-mvm-crypto-plate.mp4 | Book with Me vs Me Crypto |
| 14 | $10K Prize Pool | 06-pick-your-fighter-win-prizes-plate.mp4 | $10K Prize Pool |
| 15 | Choose Your POV | 07-headset-pov-vs-attendee-pov-plate.mp4 | Choose Your POV |

Campaign: CAMP_HB_Tickets_001 · CTA: Book Now

---

## Deliverables required from Manus

1. **One-time setup checklist** — Meta Business Suite, Ads Manager billing, TikTok Business Center, IG bio link, pixel setup
2. **Day 1 runbook** — exact clicks to publish Hero A + Hero B on Meta (IG+FB) and TikTok
3. **Phase rollout calendar** — when to add Phase 1–4 ads
4. **Per-ad sheets** — for all 17 ads: campaign name, ad set name, ad name, primary text, headline, CTA, destination URL, video filename
5. **Metricool section** — how to connect FB/IG/TikTok in Metricool for reporting (read-only from Cursor)
6. **Budget & targeting defaults** — US 18–44, interests (boxing, AR/VR, live events), $20 Meta / $15 TikTok Day 1
7. **KPIs** — waitlist sign-ups, cost per lead, CTR; when to kill/scale each ad

### Brand facts (locked)
- Inflatable tent venue (not dome/octagon)
- Wave wireframe hologram fighters in glowing floor square
- Quest-style VR headsets on all visible people
- Me vs Me crypto for on-site tickets (200 MVM headset / 350 MVM attendee POV)
- Stream: kick.com/creatorsai · twitch.tv/creatorsai
- HB 002: Aug 15 2026 · $10K prize pool · Gold vs Fire main event
