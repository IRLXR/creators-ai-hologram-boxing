# Meta + TikTok Ads — Full Campaign Setup

Paste-ready setup for **Creators AI Hologram Boxing**. Create campaigns in **draft** first; set **Publish** when payment is ready.

**Site base:** `https://creators-ai-hologram-boxing.vercel.app`  
**Creatives folder:** `ugc/output/`  
**Structured data:** `ads/campaigns.json`

---

## Launch order (do not run everything Day 1)

| Phase | When | Campaigns | Daily budget |
|-------|------|-----------|--------------|
| **1 — Waitlist** | **Start here** | 2 ads → landing email | Meta $20 + TikTok $15 |
| **2 — Awareness** | Day 4–7 | 4 ads → about/book | Meta $15 + TikTok $15 |
| **3 — Consideration** | Week 2 | 5 ads → fighters/watch | Meta $15 + TikTok $10 |
| **4 — Tickets** | Countdown / tickets live | 4 ads → book | Meta $25 + TikTok $20 |

Keep Phase 1 live at least 3 days before turning on Phase 2.

---

## Shared targeting (all ad sets)

| Field | Value |
|-------|--------|
| **Location** | United States |
| **Age** | 18–44 |
| **Gender** | All |
| **Interests** | Boxing, MMA, esports, VR/AR, live streaming, Twitch, gaming, festivals |
| **Language** | English |

**Meta placements:** Instagram Reels, Instagram Stories, Facebook Reels, Facebook Feed (manual; turn off Audience Network for launch).

**TikTok placements:** TikTok feed + search (default automatic OK for test).

---

# PHASE 1 — WAITLIST (run first)

## Meta Ads Manager

**Campaign**
- Name: `CAMP_HB_Waitlist_001`
- Objective: **Leads** (if no pixel → **Traffic**)
- Budget: **$20/day** (campaign budget advantage ON for test)

**Ad set:** `ADSET_HB_Waitlist_US_18-44`  
Targeting: shared table above.

### Ad A — `AD_HB_Waitlist_FoundingFan`

| Field | Value |
|-------|--------|
| Video | `ugc/output/ads-avatar-what-is-hologram-boxing-plate.mp4` |
| Primary text | The world's first live AI hologram boxing experience is launching. Drop your email for early access, ticket alerts, and exclusive drops. |
| Headline | Join the Waitlist |
| CTA | **Sign Up** |
| URL | https://creators-ai-hologram-boxing.vercel.app/landing.html?utm_source=meta&utm_medium=paid_social&utm_campaign=waitlist&utm_content=29_waitlist |

### Ad B — `AD_HB_Waitlist_WhatIs`

| Field | Value |
|-------|--------|
| Video | `ugc/output/ads-avatar-what-is-hologram-boxing-plate.mp4` |
| Primary text | What is hologram boxing? Walk into an inflatable tent, AR on, watch Wave hologram boxers in a glowing square. Spectator only — fight night energy that hits different. Join the waitlist. |
| Headline | What Is Hologram Boxing? |
| CTA | **Sign Up** |
| URL | https://creators-ai-hologram-boxing.vercel.app/landing.html?utm_source=meta&utm_medium=paid_social&utm_campaign=waitlist&utm_content=01_what_is |

---

## TikTok Ads Manager

**Campaign:** `CAMP_HB_Waitlist_001` · **Website conversions** or **Traffic** · **$15/day**

**Ad group:** `ADGRP_HB_Waitlist_US_18-44`

### Ad A

| Field | Value |
|-------|--------|
| Video | `ads-avatar-what-is-hologram-boxing-plate.mp4` |
| Ad text | Hologram boxing launching soon. Waitlist = first in the tent. Tap to join. |
| CTA | Sign Up |
| URL | https://creators-ai-hologram-boxing.vercel.app/landing.html?utm_source=tiktok&utm_medium=paid_social&utm_campaign=waitlist&utm_content=29_waitlist |

### Ad B

| Field | Value |
|-------|--------|
| Video | same |
| Ad text | What is hologram boxing? Tent + AR + AI fighters. You watch — Wave fights. Tap to join. |
| CTA | Sign Up |
| URL | https://creators-ai-hologram-boxing.vercel.app/landing.html?utm_source=tiktok&utm_medium=paid_social&utm_campaign=waitlist&utm_content=01_what_is |

---

# PHASE 2 — AWARENESS

**Meta:** `CAMP_HB_Awareness_001` · Objective **Awareness** · $15/day  
**TikTok:** `CAMP_HB_Awareness_001` · Objective **Reach** · $15/day

| Ad name | Video file | Headline | Meta CTA | Full URL path |
|---------|------------|----------|----------|---------------|
| AD_HB_01_WhatIs | ads-avatar-what-is-hologram-boxing-plate.mp4 | What Is Hologram Boxing? | Learn More | /about.html?utm_source=meta&utm_medium=paid_social&utm_campaign=awareness&utm_content=01_what_is |
| AD_HB_02_Tent | 02-the-inflatable-tent-plate.mp4 | Inside the Hologram Tent | Learn More | /about.html?utm_source=meta&utm_medium=paid_social&utm_campaign=awareness&utm_content=02_tent |
| AD_HB_11_Brand | 11-home-hero-brand-plate.mp4 | Hologram Boxing Is Here | Learn More | /book.html?utm_source=meta&utm_medium=paid_social&utm_campaign=awareness&utm_content=11_hero |
| AD_HB_10_AllAges | 10-all-ages-family-night-plate.mp4 | All Ages Welcome | Learn More | /book.html?utm_source=meta&utm_medium=paid_social&utm_campaign=awareness&utm_content=10_all_ages |

Copy for each ad: see `ugc/AD-COPY.md` (Awareness section).  
TikTok: swap `utm_source=tiktok` and use TikTok column from AD-COPY.

---

# PHASE 3 — CONSIDERATION

**Meta:** `CAMP_HB_Consideration_001` · **Traffic** · $15/day  
**TikTok:** `CAMP_HB_Consideration_001` · **Traffic** · $10/day

| Ad name | Video file | Headline | Destination |
|---------|------------|----------|-------------|
| AD_HB_03_Roster | 03-meet-the-wave-fighters-plate.mp4 | Meet the Wave Roster | /fighters.html?utm_campaign=consideration&utm_content=03_roster |
| AD_HB_13_HowItWorks | 13-how-it-works-four-steps-plate.mp4 | How It Works | /about.html?utm_campaign=consideration&utm_content=13_how_it_works |
| AD_HB_04_Headset | 04-ar-headset-experience-plate.mp4 | AR Headset Experience | /book.html?utm_campaign=consideration&utm_content=04_headset |
| AD_HB_08_Stream | 08-watch-free-on-kick-twitch-plate.mp4 | Watch Free on Kick & Twitch | /watch.html?utm_campaign=consideration&utm_content=08_stream |
| AD_HB_14_HB001 | 14-event-archive-hb001-plate.mp4 | Hologram Boxing 001 | /events.html?utm_campaign=consideration&utm_content=14_hb001 |

Append `utm_source=meta` or `utm_source=tiktok` and `utm_medium=paid_social` to every URL.

---

# PHASE 4 — TICKET CONVERSION

**Meta:** `CAMP_HB_Tickets_001` · **Sales** (or Traffic) · $25/day · CTA **Book Now**  
**TikTok:** `CAMP_HB_Tickets_001` · **Website conversions** · $20/day · CTA **Shop Now**

| Ad name | Video file | Headline |
|---------|------------|----------|
| AD_HB_15_HB002 | 15-hologram-boxing-002-plate.mp4 | HB 002 — Book Now |
| AD_HB_05_MVM | 05-tickets-and-mvm-crypto-plate.mp4 | Book with Me vs Me Crypto |
| AD_HB_06_Prizes | 06-pick-your-fighter-win-prizes-plate.mp4 | $10K Prize Pool |
| AD_HB_07_POV | 07-headset-pov-vs-attendee-pov-plate.mp4 | Choose Your POV |

Base URL: `https://creators-ai-hologram-boxing.vercel.app/book.html?utm_source={{platform}}&utm_medium=paid_social&utm_campaign=hb002_tickets&utm_content={{id}}`

**Compliance line** (add to primary text on ticket ads):  
*On-site tickets paid in Me vs Me (MVM) crypto only. Spectators do not fight in the ring. Prize pool subject to event rules.*

---

## A/B hook tests (swap first 3 seconds or text overlay)

Test one per ad set before scaling:

1. “Wait — hologram boxing is real? No cap.”
2. “HB 002 tickets unlock at countdown zero — don't sleep.”
3. “$10K pool — pick the winner, win with them.”
4. “You're front row through AR goggles. Literally.”
5. “2,400 at HB 001 — 002 hits different.”
6. “You don't fight. You watch. All ages.”

---

## Creative specs

| Platform | Format | Safe zone |
|----------|--------|-----------|
| Meta | 9:16 · 15s primary | Keep face + CTA above bottom **250px** |
| TikTok | 9:16 · 15s | Keep CTA above bottom **320px** |

Burn in captions on all paid cuts.

---

## Scripts without video yet

Use substitute plates until rendered — see `pending_creatives` in `ads/campaigns.json`.

---

## Manus runbook

Full click-by-click guide: https://manus.im/app/AkznDj4JqyFUwd3nXmEFxM

---

## After publish checklist

- [ ] Open each URL on **mobile** — email form loads on landing
- [ ] Confirm UTM shows in browser address bar
- [ ] Phase 1 only live for 72h before adding Phase 2
- [ ] Pause any ad with CTR &lt; 0.8% after 1,000 impressions
- [ ] Scale winners +20% budget every 3 days max
