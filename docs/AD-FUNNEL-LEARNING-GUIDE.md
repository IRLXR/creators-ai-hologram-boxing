# Learn Paid Ads for Hologram Boxing — Step-by-Step

**Who this is for:** You, learning how our Meta + TikTok ads work without ad-industry jargon.  
**Read time:** ~30 minutes if you go lesson by lesson.  
**Deep dives when you're ready:**
- [AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md](./AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md) — what each layer does
- [AD-SET-AD-BUILD-MATRIX.md](./AD-SET-AD-BUILD-MATRIX.md) — every campaign, ad set, and ad to build

---

## How to use this guide

Work through **Lesson 1 → Lesson 10 in order**. Each lesson builds on the last.

| Lesson | You'll understand… |
|--------|-------------------|
| 1 | Why we don't run "one ad and hope" |
| 2 | Campaign → Ad set → Ad (the 3 boxes) |
| 3 | The 5 funnel layers (the staircase) |
| 4 | Fans vs creators (two different conversations) |
| 5 | Reusing the same video many times |
| 6 | Tracking (pixel + UTMs) |
| 7 | What videos we already have |
| 8 | What's live today vs what to build |
| 9 | Your build order (what to do first) |
| 10 | Checklists + vocabulary cheat sheet |

**Self-check:** After each lesson, read the "Got it?" line. If it's fuzzy, re-read that section before moving on.

---

# Lesson 1 — The one idea behind everything

### Plain English

Paid social ads are not one billboard on the highway. They're a **staircase**:

1. **See you** — stranger stops scrolling
2. **Get curious** — they click or watch longer
3. **Sign up** — they leave their email on [landing.html](https://www.hologramboxing.com/landing.html)
4. **Come back** — they visited but didn't sign up; we remind them
5. **Show up** — event is soon; urgency kicks in

Each step needs **different words, different videos, and different audiences**. If you mix them all into one ad set, the platform gets confused and your money goes to the wrong people.

### Real-world analogy

Imagine opening a nightclub:

- **Layer 1 (Awareness):** Flyers on the street — "Something wild is opening."
- **Layer 2 (Consideration):** A friend explains what's inside the tent.
- **Layer 3 (Conversion):** Bouncer at the door — "Drop your email for VIP list."
- **Layer 4 (Retargeting):** Text to people who walked up but didn't sign in.
- **Layer 5 (Countdown):** "Doors in 48 hours — last call."

You wouldn't use the same flyer for all five moments.

### Your #1 goal right now

**Get emails on the landing page** — "Become a Founding Fan" waitlist.

Everything else (awareness, retarget, countdown) supports that goal.

### Got it?

You understand the system when you can say: *"We're not buying random views — we're moving strangers through steps until they sign up."*

---

# Lesson 2 — The three boxes (Campaign → Ad set → Ad)

Every ad platform (Meta = Facebook/Instagram, TikTok) uses the same nesting:

```
CAMPAIGN .............. The big goal ("get sign-ups" or "get views")
  └── AD SET ........... Who sees it + where + budget slice
        └── AD ......... The actual video + text + button
```

Think: **Store → Aisle → Product on shelf.**

### Campaign = the store's purpose

Examples from our plan:

| Campaign | Purpose |
|----------|---------|
| `CAMP_HB_InfluencerRecruit_001` | Recruit streamers/creators |
| `CAMP_HB_Convert_FoundingFan_001` *(to build)* | Get fan emails |
| `CAMP_HB_Awareness_001` *(to build)* | Make strangers remember us |

**One campaign = one main goal.** Don't mix "recruit creators" and "sell tickets to families" in the same campaign.

### Ad set / Ad group = who + where + how much

This is where you choose:

- **Geo:** Orlando, Miami, Tampa, Jacksonville (not "all of USA" yet)
- **Age:** 18–34 for gamers, 25–54 for family night, etc.
- **Interests:** Boxing fans, Twitch, VR, family entertainment
- **Budget:** e.g. $15/day on this slice of audience
- **Optimization:** "Show this to people likely to sign up" vs "Show this to people likely to watch"

**Why separate ad sets?** So you can see: *Combat fans in Tampa respond better to Walk Inside than Tech fans in Orlando.*

### Ad = what people actually see

One ad = one video (or image) + text + button + link.

Example:

- **Video:** "Would You Walk Inside?" 15s clip
- **Text:** "AI hologram boxers LIVE. Become a Founding Fan."
- **Button:** Sign Up
- **Link:** `hologramboxing.com/landing.html?utm_...`

You can have **many ads inside one ad set** — that's how we test which video wins.

### Got it?

You understand the hierarchy when you can point to Ads Manager and say: *"This campaign is for emails. This ad set is Florida fight fans. This ad is the Walk Inside video with Sign Up."*

---

# Lesson 3 — The 5 funnel layers (your staircase)

These map 1:1 to how pro brands run ads in 2026. Each layer = usually its **own campaign** (or clear ad sets inside one campaign).

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 1 — AWARENESS     "Who are you?"                 │
│  Cold strangers in Florida. Cheap views. Remember brand.│
├─────────────────────────────────────────────────────────┤
│  LAYER 2 — CONSIDERATION "Tell me more"                 │
│  Watched video or visited site. Explain the experience. │
├─────────────────────────────────────────────────────────┤
│  LAYER 3 — CONVERSION    "I want in"          ← NOW     │
│  Optimize for email sign-up. Main KPI.                  │
├─────────────────────────────────────────────────────────┤
│  LAYER 4 — RETARGETING   "You almost did it"            │
│  Visited landing, no email. Cheaper sign-ups.           │
├─────────────────────────────────────────────────────────┤
│  LAYER 5 — COUNTDOWN     "Event is soon"                │
│  14d → 7d → 48h urgency. Prize pool, date, fighters.  │
└─────────────────────────────────────────────────────────┘
```

### Layer 1 — Awareness (cold traffic)

**Who:** Never heard of Hologram Boxing.  
**What we want:** Stop the scroll. Remember the name.  
**Videos:** Mystery hooks — tent, fog, "Would you walk inside?"  
**Budget mindset:** Buy attention cheaply. Don't stress sign-ups yet.  
**Still send to:** landing.html (with UTMs) — some people sign up anyway.

### Layer 2 — Consideration (warm traffic)

**Who:** Watched 50%+ of a video, or visited the site, but no email yet.  
**What we want:** Explain what happens inside — tent, headset, hologram fighters, how it works.  
**Videos:** UGC explainers — "What is hologram boxing?", "Inside the tent", "4 steps".

### Layer 3 — Conversion (your focus today)

**Who:** People likely to sign up — fans OR creators, separate ad sets.  
**What we want:** **Email on landing page.**  
**Videos:** Heroes + open call + "Become a Founding Fan".  
**Platform setting:** Optimize for **Lead / Form submit**, not just clicks.

### Layer 4 — Retargeting

**Who:** Already visited landing.html in the last 7–14 days, **did not** sign up.  
**What we want:** Second chance — often **2–5× cheaper** per email than cold ads.  
**Videos:** Same heroes, different text — "You looked — don't miss the first event."

**When to turn on:** After the pixel has collected visitor data (a few days of traffic).

### Layer 5 — Event & countdown

**Who:** Florida + your warm audiences.  
**When:** Event date locked, countdown live on site, ideally ≤14 days out.  
**What we want:** Urgency — HB 002, $10K pool, Gold vs Fire, "48 hours left".  
**Videos:** Event plates, roster, prize pool.

### What to prioritize **right now** (Stage 1)

| Priority | Layer | Why |
|----------|-------|-----|
| **Now** | Layer 3 Conversion | Emails = the business |
| **Soon** | Layer 4 Retarget | Cheap wins from warm visitors |
| **Then** | Layer 1 Awareness | Fill the top of the funnel in FL |
| **Later** | Layer 5 Countdown | When HB 002 date is near |
| **Ongoing** | Layer 2 Consideration | Supports people who need more info |

### Got it?

You understand layers when you can answer: *"Would I show the Open Call poster to someone who never heard of us, or save it for creators we're recruiting?"* (Answer: Layer 3, creator ad sets — not random cold fight fans.)

---

# Lesson 4 — Two funnels, not one

Hologram Boxing talks to **two different people**. Never blend their messages in the same ad set.

### Funnel A — Founding Fans (general public)

| | |
|---|---|
| **Who** | Fight fans, tech/gamers, families, tourists in FL |
| **Message** | "Become a Founding Fan — early access, first events, waitlist" |
| **Landing** | [landing.html](https://www.hologramboxing.com/landing.html) |
| **Hero videos** | Walk Inside, Future Is Here, What Is Hologram Boxing |
| **Campaign to build** | `CAMP_HB_Convert_FoundingFan_001` |

### Funnel B — Creators / streamers (partners)

| | |
|---|---|
| **Who** | Kick, Twitch, YouTube, TikTok, Reels creators |
| **Message** | "OPEN CALL — WE WANT YOU" (exact poster copy) |
| **Landing** | Same landing page (sign-up) |
| **Hero videos** | Open Call exact poster, optimized open call |
| **Campaign (live, PAUSED)** | `CAMP_HB_InfluencerRecruit_001` |

**Why separate?** A UFC fan doesn't care about "stream our tent on Kick." A streamer doesn't care about "family date night." Same website, different front door.

### Got it?

You understand two funnels when you wouldn't put the Open Call poster in the "Family Night Florida" ad set.

---

# Lesson 5 — Reusing videos (the matrix secret)

This is the big idea from the [Build Matrix](./AD-SET-AD-BUILD-MATRIX.md):

> **One video file ≠ one ad.**

We have ~**15 core videos**. The plan builds **78 ads** from them by reusing each file across:

- Different **ad sets** (combat fans vs tech fans vs retarget)
- Different **platforms** (Meta + TikTok)
- Different **UTM labels** (so we know which combo worked)
- Sometimes different **text** on the same clip

### Example: `Walk Inside` video used 5+ times

| Ad name | Ad set | Message tweak |
|---------|--------|---------------|
| `AD_HB_Convert_CombatSports_WalkInside` | FL fight fans | "Would you walk inside?" |
| `AD_HB_Convert_TechGamers_WalkInside` | FL gamers | Same video, tech-leaning copy |
| `AD_HB_Aware_CombatSports_WalkInside` | Awareness layer | Same video, awareness objective |
| `AD_HB_RT_Landing_WalkInside_RT` | Retarget | "You looked — don't miss it" |
| `AD_HB_OpenCallExact_WalkInside_X` | Creator ad set | "Creators — stream the first event" |

**Same .mp4 file. Five different ad objects.** That's intentional — not duplication by mistake.

### The reuse rule

Each hero or UGC video should appear in **at least 3–6 ad placements** before you make a brand-new video.

### Why UTMs matter when reusing

Every ad gets a unique tag on the link:

```
landing.html?utm_source=meta
  &utm_medium=paid_social
  &utm_campaign=founding_fan
  &utm_content=walk_inside_combat_fl
```

`utm_content` = which video + which ad set. Without it, all sign-ups look the same in analytics.

### Got it?

You understand reuse when you stop thinking "we need 78 new videos" and start thinking "we need 15 videos placed 78 smart ways."

---

# Lesson 6 — Tracking (how you know it's working)

Ads without tracking = spending money blind.

### The pixel (invisible website helper)

A small script on hologramboxing.com tells Meta and TikTok:

- Someone visited the landing page
- Someone submitted the email form (**Lead** / **Form submit**)

| Platform | Pixel ID |
|----------|----------|
| **Meta** | `3661825047289885` |
| **TikTok (site)** | `D94N53BC77UFCF7AK7E0` |

**Where it lives in our repo:** `site-config.js` → loaded by `js/analytics.js`.  
**Landing page** loads the pixel immediately (important for conversion ads).

**Quick test:** Install Meta Pixel Helper browser extension → visit landing → submit test email → see `Lead` fire.

### UTMs (labels on links)

The pixel says *"someone signed up."*  
UTMs say *"they came from TikTok, founding_fan campaign, Walk Inside video, combat Florida ad set."*

Always use this pattern:

```
?utm_source=tiktok|meta
&utm_medium=paid_social
&utm_campaign=founding_fan|influencer_recruit|awareness|countdown_7d
&utm_content=walk_inside_15s|open_call_exact
```

### Go High Level (CRM)

Form submits → contact in GHL.  
Use tags like `source:meta`, `campaign:founding_fan` so email follow-up knows where they came from.

**Ads get the click. Email nurtures the relationship.**

### Attribution windows (simple version)

"If someone clicks your ad today and signs up within X days, the ad gets credit."

| Platform | Click window | View window |
|----------|--------------|-------------|
| Meta | 1 day | 0 days |
| TikTok | 7 days | 1 day |

### Got it?

You understand tracking when every ad link has UTMs, the pixel is on the landing page, and you can trace a sign-up back to a specific video + ad set.

---

# Lesson 7 — Your video library (what we already made)

You don't need to memorize file paths. Learn the **types**:

### Tier A — Hero cinematic (15 seconds, vertical, best for paid)

| Nickname | What it is | Best for |
|----------|------------|----------|
| **Walk Inside** | Mystery tent hook + voice | Cold traffic, conversion, retarget |
| **Future Is Here (VO)** | Hype narration | Tech fans, conversion |
| **Future Is Here (Mystery)** | Cinematic, no voice | Instagram Reels, awareness |

### Tier B — Creator open call

| Nickname | What it is | Best for |
|----------|------------|----------|
| **Open Call Exact** | Poster copy, word-for-word | Creator recruit |
| **Open Call Optimized** | TikTok-friendly cut | Creator recruit |

### Tier C — Long-form (60s)

| Nickname | What it is | Best for |
|----------|------------|----------|
| **Evolution** | Brand story documentary | Awareness (or trim to 15s) |
| **Memory** | Emotional silent piece | Retarget, countdown mood |

### Tier D — UGC talking-head plates

Short explainers from our avatar — **reuse heavily**:

- What is hologram boxing?
- Inside the inflatable tent
- Meet the Wave fighters
- AR headset experience
- How it works (4 steps)
- HB 002 event tease
- $10K prize pool
- All ages / family night

**Full file list:** [AD-SET-AD-BUILD-MATRIX.md](./AD-SET-AD-BUILD-MATRIX.md) · [ALL-ADS-CATALOG.json](../ads/ALL-ADS-CATALOG.json)

### Got it?

You understand the library when you can pick the right video for the moment: Walk Inside for mystery, What Is for explainers, Open Call for creators, HB002 plate for countdown.

---

# Lesson 8 — What's live vs what's planned

### Live today (all PAUSED / OFF — safe to review)

**TikTok — Creator recruit**

- Campaign: `CAMP_HB_InfluencerRecruit_001` · $20/day
- 2 ad groups (Florida, 18–44)
- 2 ads (Open Call exact + optimized)

**Meta — Creator recruit**

- Same campaign name
- 2 ad sets (creators 18–34 exact, general 18–44)
- 2 ads

**Meta — Experience (fan heroes)**

- Campaign: `CAMP_HB_Experience_001`
- 1 ad set, hero ads (Walk Inside, Future Is Here)

### The full plan (when complete)

| | Live now | To build | Total |
|---|----------|----------|-------|
| Campaigns | 2 | 5 | **7** |
| Ad sets / groups | 5 | 18 | **23** |
| Ads | 6 | 72 | **78** |
| Unique videos | ~4 in ads | ~15 reused | **~15 files** |

### The 7 campaigns at a glance

| # | Campaign | Layer | Ads | Status |
|---|----------|-------|-----|--------|
| 1 | Creator recruit | 3 Conversion | 12 | Live — add 8 more |
| 2 | Founding Fan email | 3 Conversion | 28 | **Build next** |
| 3 | Brand awareness | 1 Awareness | 21 | Build |
| 4 | Consideration | 2 Consideration | 16 | Build |
| 5 | Retargeting | 4 Retarget | 12 | After pixel data |
| 6 | Event countdown | 5 Countdown | 18 | ≤14 days before event |
| 7 | Day 1 Experience | 1 + 3 | 10 | Expand + TikTok mirror |

### Got it?

You understand the snapshot when you know: *We have creator ads built and paused; the next big build is Founding Fan conversion — 7 ad sets, 28 ads, 4 videos reused.*

---

# Lesson 9 — Your step-by-step build path

Follow this order. Don't skip to countdown ads before you have emails flowing.

### Phase 0 — Done ✓

- [x] Creator recruit campaign (Meta + TikTok, PAUSED)
- [x] Landing page + pixels deployed
- [x] Video library in repo

### Phase A — Founding Fan conversion (DO THIS NEXT)

**Goal:** 28 ads across 7 ad sets, 4 videos each.

1. Create campaign `CAMP_HB_Convert_FoundingFan_001` on Meta + TikTok
2. Create 7 ad sets:
   - Combat sports FL
   - Tech/gamers FL
   - Family night FL
   - General FL
   - (Same four slices on TikTok = 3 ad groups if you combine some)
3. In **each** ad set, add 4 ads:
   - Walk Inside
   - Future Is Here (VO)
   - Future Is Here (Mystery)
   - What Is Hologram Boxing (UGC)
4. Every ad: Sign Up CTA → landing.html + unique UTMs
5. Leave **PAUSED** until you approve

**Budget example:** $25–40/day total split across ad sets.

### Phase B — Expand existing campaigns

Add cross-creative ads to creator + experience campaigns (same videos, new UTMs) — 18 more ad slots. See [Build Matrix Campaign 1 & 7](./AD-SET-AD-BUILD-MATRIX.md#campaign-1--creator-recruit-live--expand-ads).

### Phase C — Awareness

7 ad sets, 21 ads. Walk Inside + Future Mystery + Evolution clip. Lower daily budget ($10–15/day). Layer 1 objective = views/reach.

### Phase D — Consideration

4 ad sets, 16 ads. UGC explainers only.

### Phase E — Retargeting

**Wait until:** Pixel shows landing page visitors for 3–7 days.

4 ad sets, 12 ads. Same hero videos, urgency copy.

### Phase F — Countdown

**Wait until:** HB 002 date is on the site and ≤14 days out.

6 ad sets (14d / 7d / 48h × Meta + TikTok), 18 ads. HB002, prize pool, roster videos.

### Budget split cheat sheet ($40/day total)

| Layer | Meta | TikTok | Notes |
|-------|------|--------|-------|
| Conversion (3) | $15 | $15 | Founding Fan + creators |
| Retarget (4) | $5 | $5 | Only after pixel data |
| Awareness (1) | $5 | $5 | Add when cost-per-email is stable |

**Rule:** Don't scale until landing page converts and you see steady Lead events for 3–7 days.

### Got it?

You understand the build path when you can tell someone: *"Next we build Founding Fan — seven Florida audience slices, four videos each, all paused for review."*

---

# Lesson 10 — Checklists, naming, and vocabulary

### Before you turn ANY ad set ON

**Ad set level:**

- [ ] Name follows pattern: `ADSET_HB_[Layer]_[Audience]_FL`
- [ ] Objective matches layer (awareness vs conversion)
- [ ] Budget set ($20/day minimum on our accounts)
- [ ] Locations = Orlando, Miami, Tampa, Jacksonville (not whole US)
- [ ] Age + interests match the audience slice
- [ ] Pixel + conversion event wired (Lead / FORM)
- [ ] Status = PAUSED first → review → then enable

**Ad level:**

- [ ] Video uploaded (9:16 vertical, ~15 seconds)
- [ ] Thumbnail set
- [ ] Text + headline + CTA = **Sign Up**
- [ ] Landing URL with full UTMs
- [ ] Identity: @hologramboxing (TikTok) · Romethelife (Meta)
- [ ] Preview on mobile

### Naming convention

```
Campaign:  CAMP_HB_[Layer]_[Goal]_001
Ad set:    ADSET_HB_[Layer]_[Audience]_FL
Ad:        AD_HB_[CreativeName]_[AudienceOrVariant]
```

Examples:

- `CAMP_HB_Convert_FoundingFan_001`
- `ADSET_HB_Convert_CombatSports_FL`
- `AD_HB_WalkInside_CombatSports`

Clean names = clean reports.

### Vocabulary cheat sheet

| Term | Remember it as… |
|------|-----------------|
| **Campaign** | The store's main purpose |
| **Ad set / Ad group** | Which aisle + who shops there + shelf budget |
| **Ad** | The product on the shelf (video + text + button) |
| **Creative** | The video or image file |
| **Pixel** | Security camera that sees who signed up |
| **UTM** | Sticker on the link saying which ad sent them |
| **CBO** | TikTok/Meta splits daily budget across ad sets for you |
| **Retargeting** | Ads to people who already visited you |
| **Lookalike** | "Find more people like our sign-ups" (after 100+ emails) |
| **CPA / Cost per email** | Dollars spent ÷ emails collected |
| **Cold traffic** | Strangers who never heard of you |
| **Warm traffic** | Already watched, clicked, or visited |
| **Placement** | Feed, Stories, Reels, TikTok FYP |
| **FORM / Lead event** | Platform knows someone submitted the form |

### Account quick reference

| | Meta | TikTok |
|---|------|--------|
| **Ad account** | `534185933351087` | `7658020511833014273` |
| **Page / handle** | Romethelife | @hologramboxing |
| **Pixel** | `3661825047289885` | `D94N53BC77UFCF7AK7E0` |
| **Landing** | hologramboxing.com/landing.html | Same |

### Copy you can paste (Founding Fan)

**TikTok (short):**

1. Would you walk inside? AI hologram boxers LIVE. Become a Founding Fan.
2. The future of live entertainment is here. Sign up — first access to HB 002.
3. What is hologram boxing? Tent + AR + AI fighters. Join the waitlist.

**Meta (longer):**

1. Something the world has never seen is waiting behind that door. AI hologram boxers. Live. Front row energy. **Become a Founding Fan** — drop your email for early access.
2. Walk into the inflatable tent, gear up, watch Wave hologram boxers in the glowing square. **Join the waitlist** before tickets drop.

More copy: [Build Matrix — Copy bank](./AD-SET-AD-BUILD-MATRIX.md#copy-bank-paste-into-ads-manager)

### Got it?

You're ready to operate when you can open Ads Manager, name things correctly, fill every field, leave ads paused, and read a report that says which video + audience got the cheapest emails.

---

# Pull it all together — one page summary

```
GOAL: Emails on landing.html (Founding Fan waitlist)

STRUCTURE:
  Campaign (one goal)
    → Ad set (who + where + budget)
      → Ad (video + text + Sign Up + UTMs)

STAIRCASE:
  1 Awareness → 2 Consideration → 3 Conversion → 4 Retarget → 5 Countdown
  Focus NOW: Layer 3 (+ Layer 4 soon)

TWO FUNNELS:
  Fans (Walk Inside, Future, What Is)
  Creators (Open Call exact — separate ad sets)

REUSE:
  ~15 videos → 78 ad placements (not 78 new videos)

TRACK:
  Meta pixel 3661825047289885
  TikTok pixel D94N53BC77UFCF7AK7E0
  UTMs on every link

GEO:
  Orlando → Miami → Tampa → Jacksonville

NEXT BUILD:
  Campaign 2 — Founding Fan — 7 ad sets × 4 ads = 28 ads (PAUSED)

DON'T:
  - Mix fan + creator messages in one ad set
  - Run "United States" before Florida works
  - Turn on ads without pixel + UTMs
  - Scale budget before 3–7 days of Lead data
```

---

# Where to go next

| I want to… | Open this |
|------------|-----------|
| Understand each layer in detail | [AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md](./AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md) |
| See every ad set + ad to create | [AD-SET-AD-BUILD-MATRIX.md](./AD-SET-AD-BUILD-MATRIX.md) |
| See what's live in platforms today | [ADS-COMPLETION-CHECKLIST.json](../ads/influencer-recruit/ADS-COMPLETION-CHECKLIST.json) |
| Florida city/DMA IDs for targeting | [GEO-TARGETING.json](../ads/influencer-recruit/GEO-TARGETING.json) |
| All video files + copy | [ALL-ADS-CATALOG.json](../ads/ALL-ADS-CATALOG.json) |
| TikTok MCP setup | [TIKTOK-MCP-CONNECT.md](./TIKTOK-MCP-CONNECT.md) |

---

*Learning guide — July 2026. Start at Lesson 1; use the two reference docs when you're building in Ads Manager.*
