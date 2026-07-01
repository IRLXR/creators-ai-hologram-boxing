# UGC Ad Scripts — Creators AI Hologram Boxing

Talking-head **paid social ads** for an **AI influencer** — one topic per ad, mapped to every website section. Built for **green-screen compositing** + export as **15s / 30s ad cuts** for Meta, TikTok, and YouTube Shorts.

| Doc | Purpose |
|-----|---------|
| [SITE-TOPIC-MAP.md](./SITE-TOPIC-MAP.md) | Website section → script file |
| [ADS-GUIDE.md](./ADS-GUIDE.md) | Platform specs, UTM links, campaign objectives |
| [AD-COPY.md](./AD-COPY.md) | Hooks, headlines, primary text, TikTok copy, URLs |
| [TIKTOK-what-is-hologram-boxing.md](./TIKTOK-what-is-hologram-boxing.md) | **TikTok-native** 15s script + captions + post copy |

---

## Production rules (every ad)

| Rule | Spec |
|------|------|
| **Primary format** | **9:16** for Meta Reels/Stories + TikTok |
| **Deliverables** | **15s ad** (prospecting) + **30s ad** (retargeting) per topic |
| **Background (generation)** | Solid **white** (#FFFFFF) — evenly lit, no shadows; key to green in post |
| **Background (final comp)** | Chroma green or keyed plate over B-roll |
| **Camera** | **Locked tripod** — no handheld |
| **Framing** | **Stomach up** (waist to head); centered; CTA safe above bottom 250–320px |
| **Prop** | **Mini handheld mic** held up to mouth (one hand); other hand free for small gestures |
| **Outfit** | Match **`assets/Ads/card-apply.png`** host — dark structured blazer default; hoodie/crop variants optional |
| **Movement** | Minimal — subtle nods; mic stays at mouth; free hand gestures stay below chest |
| **Hook** | Spoken + text overlay in **first 3 seconds** |
| **CTA** | **“Tap to book”** / **“Book now”** — not “link in bio” |
| **End card** | Last **3s** — logo + CTA + URL |
| **Captions** | Burned in on all ad exports |

Pause half a beat before each `[GRAPHIC: …]` cue. See [ADS-GUIDE.md](./ADS-GUIDE.md) for full ad edit workflow.

---

## Gen Z voice (all scripts)

Write like a **TikTok / Twitch / Kick creator** talking to followers — not a corporate VO.

| Do | Don't |
|----|-------|
| Short punchy sentences | Long formal paragraphs |
| Light slang (*lowkey, no cap, it's giving, fr, bet, hits different*) | Slang every line / forced memes |
| Direct hooks in first 3s | Slow warm-up |
| **Tap to book now** CTA | "Link in bio" |
| Keep brand terms (**Wave**, **MVM**, tent, glowing square) | Dumb down product names |

**Read `## Full VO` on each script** for the Gen Z rewrite. Host table lines = edit cues; VO is the spoken master.

---

## AI presenter prompt (Seedance generation — white plate)

Use **nano_banana_2** keyframe → **seedance_2_0** animation. Every UGC plate: **pure white #FFFFFF** backdrop.

```
9:16 waist-up talking-head UGC host — stomach up, centered, locked tripod.
Reference avatar: assets/Ads/card-apply.png — East Asian woman, long straight dark center-part hair, warm smile, dark structured blazer.
Meta Quest 3 VR headset pushed on forehead — white visor with THREE BLACK vertical pill-shaped front sensors clearly visible, white ski-goggle style head strap (NOT standard side arms).
PURE SOLID WHITE seamless backdrop (#FFFFFF) only — no ad text, logos, or graphics.
Tiny compact black mini handheld microphone held to mouth in one hand.
Direct eye contact, natural speech, minimal movement. Photorealistic UGC, clean edges for chroma key.

**Voice (TikTok / Instagram UGC — natural, not robotic):**
After Seedance, run **`voice_change`** on the **original plate `job_id`** (not a prior voice pass) with preset **Skye** (`voice_id=1fb253b8-928b-4d29-a349-f242a71eaddf`, `voice_type=preset`). Skye = casual creator tone, lighter and more conversational than Gia. ~2 credits/plate.
```

**Canonical avatar (Ads):**
- Source: `assets/Ads/card-apply.png` · media_id `819d7e88-b1ee-4838-882f-ea53d5933493`
- Headset ref: `assets/hf_20260614_083229_a1706812-*.png` — Meta Quest 3 **ski-goggle head strap**, **three BLACK pill sensors** on white visor
- Keyframe job: `916340ac-0891-4ea8-b20f-59ecb4267d25` · `ugc/output/host-keyframe-ads-avatar-quest3-strap.png`
- Video plate job: `721f7c0e-f660-49f1-bb79-add7416fdf11` · `ugc/output/ads-avatar-what-is-hologram-boxing-plate.mp4`

**Legacy hosts (optional):** crop tank `0f1d806e` · hoodie `5fc6606d`

### Batch generation (Ads avatar + Quest 3 black sensors)

**Keyframe:** `916340ac-0891-4ea8-b20f-59ecb4267d25` · `host-keyframe-ads-avatar-quest3-strap.png`

Each script gets a **15s prospecting plate** → `ugc/output/{script-id}-plate.mp4`. Track progress in `ugc/output/batch-manifest.json`.

| Status | Scripts |
|--------|---------|
| **Done (15/31)** | 01 (ads avatar), 02–15 |
| **Pending (~1340 credits)** | 16–31 (20 scripts) |

Resume: top up Higgsfield credits, reply **“continue batch”** — submits 8 at a time (concurrency limit).

**Host prompt block (every plate):**
```
15s 9:16 locked tripod WAIST-UP PURE WHITE #FFFFFF. Meta Quest 3 on forehead:
white visor with THREE BLACK vertical pill sensors, ski-goggle head strap, tiny mic, dark blazer.
Zero camera movement. Visual-only plate OR minimal ambient — voice added via voice_change pass.
```
**Voice post-pass:** `voice_change` → preset **Skye** on each **Seedance** plate `job_id` (~2 credits). Script 01 updated; re-run 02–15 when credits available.
Use `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612` to avoid IN THE DARK preset hijack.

### First video pipeline (`01-what-is-hologram-boxing.md`)

1. **Keyframe** — `nano_banana_2`, 9:16, white bg, MCU host (see prompt above).
2. **Animate** — `seedance_2_0`, 15s, 9:16, `start_image` = keyframe job id, locked camera, minimal movement, host delivers hook + script VO.
3. **Download** — save to `ugc/output/01-what-is-hologram-boxing-plate.mp4`.
4. **Edit** — key white → green (or direct comp), add B-roll from script cues, export 15s + 30s ad cuts per [ADS-GUIDE.md](./ADS-GUIDE.md).

### Every other script

Same pipeline: **nano_banana_2** white keyframe → **seedance_2_0** 15s plate → `ugc/output/{script-id}-plate.mp4`. Copy hook + VO from each script file and [AD-COPY.md](./AD-COPY.md).

---

## Scripts by website page

### Home (`index.html`)

| Script | Topic |
|--------|--------|
| [11-home-hero-brand.md](./11-home-hero-brand.md) | Hero — brand intro |
| [12-social-kick-twitch-feed.md](./12-social-kick-twitch-feed.md) | Social marquee |
| [13-how-it-works-four-steps.md](./13-how-it-works-four-steps.md) | How It Works (4 steps) |
| [14-event-archive-hb001.md](./14-event-archive-hb001.md) | Event archive preview |
| [15-hologram-boxing-002.md](./15-hologram-boxing-002.md) | Upcoming fight cards |
| [03-meet-the-wave-fighters.md](./03-meet-the-wave-fighters.md) | Wave roster |
| [19-watch-episodes-on-demand.md](./19-watch-episodes-on-demand.md) | Latest episodes |
| [08-watch-free-on-kick-twitch.md](./08-watch-free-on-kick-twitch.md) | Live streams |
| [22-news-prize-pool-doubled.md](./22-news-prize-pool-doubled.md) | News / prize pool |
| [30-faq-common-questions.md](./30-faq-common-questions.md) | FAQ preview |
| [28-become-a-partner.md](./28-become-a-partner.md) | Partnerships |

### About (`about.html`)

| Script | Topic |
|--------|--------|
| [01-what-is-hologram-boxing.md](./01-what-is-hologram-boxing.md) | What hologram boxing is |
| [02-the-inflatable-tent.md](./02-the-inflatable-tent.md) | Inflatable tent venue |
| [23-about-five-step-journey.md](./23-about-five-step-journey.md) | Arrival to knockout (5 steps) |

### Events (`events.html`)

| Script | Topic |
|--------|--------|
| [14-event-archive-hb001.md](./14-event-archive-hb001.md) | Hologram Boxing 001 |
| [16-downtown-hologram-showdown.md](./16-downtown-hologram-showdown.md) | Downtown pop-up |
| [17-title-fight-night.md](./17-title-fight-night.md) | Title fight night |
| [15-hologram-boxing-002.md](./15-hologram-boxing-002.md) | HB 002 upcoming |

### Fighters (`fighters.html`)

| Script | Topic |
|--------|--------|
| [03-meet-the-wave-fighters.md](./03-meet-the-wave-fighters.md) | Full roster |
| [18-fight-card-gold-vs-fire.md](./18-fight-card-gold-vs-fire.md) | Main event |
| [18b-fight-card-blue-vs-silver.md](./18b-fight-card-blue-vs-silver.md) | Co-main |
| [18c-fight-card-green-vs-pink.md](./18c-fight-card-green-vs-pink.md) | Undercard |

### Watch (`watch.html`)

| Script | Topic |
|--------|--------|
| [19-watch-episodes-on-demand.md](./19-watch-episodes-on-demand.md) | Episode library |
| [20-hb001-recap-highlights.md](./20-hb001-recap-highlights.md) | VHS recap + KOs |

### Gallery (`gallery.html`)

| Script | Topic |
|--------|--------|
| [21-gallery-inside-the-tent.md](./21-gallery-inside-the-tent.md) | Inside the tent |

### News (`news.html`)

| Script | Topic |
|--------|--------|
| [31-website-launch.md](./31-website-launch.md) | Site launch |
| [20-hb001-recap-highlights.md](./20-hb001-recap-highlights.md) | HB 001 recap |
| [22-news-prize-pool-doubled.md](./22-news-prize-pool-doubled.md) | Prize pool doubled |
| [24-hologram-tent-technology.md](./24-hologram-tent-technology.md) | Tent technology |
| [25-food-drinks-experience.md](./25-food-drinks-experience.md) | Food & drinks |
| [27-apply-hologram-fighter.md](./27-apply-hologram-fighter.md) | Fighter applications |

### Book (`book.html`)

| Script | Topic |
|--------|--------|
| [05-tickets-and-mvm-crypto.md](./05-tickets-and-mvm-crypto.md) | MVM tickets |
| [07-headset-pov-vs-attendee-pov.md](./07-headset-pov-vs-attendee-pov.md) | Two POV tiers |
| [04-ar-headset-experience.md](./04-ar-headset-experience.md) | AR headset moment |
| [06-pick-your-fighter-win-prizes.md](./06-pick-your-fighter-win-prizes.md) | Pick fighter / prizes |
| [26-book-ticket-three-steps.md](./26-book-ticket-three-steps.md) | 3-step ticket flow |
| [26b-influencer-codes.md](./26b-influencer-codes.md) | Influencer codes |
| [26c-attendee-ringside-pass.md](./26c-attendee-ringside-pass.md) | Attendee pass code |
| [09-book-the-tent-for-your-party.md](./09-book-the-tent-for-your-party.md) | Private booking |
| [27-apply-hologram-fighter.md](./27-apply-hologram-fighter.md) | Fighter apply |
| [28-become-a-partner.md](./28-become-a-partner.md) | Partnerships |

### FAQ (`faq.html`)

| Script | Topic |
|--------|--------|
| [30-faq-common-questions.md](./30-faq-common-questions.md) | Top FAQ answers |
| [10-all-ages-family-night.md](./10-all-ages-family-night.md) | Family friendly |

### Landing (`landing.html`)

| Script | Topic |
|--------|--------|
| [29-join-waitlist-early-access.md](./29-join-waitlist-early-access.md) | Email waitlist |

---

## Brand facts

- **Tagline:** Step in. Gear up. Watch hologram boxing.
- **Venue:** Inflatable tent · glowing blue-purple floor square
- **Fighters:** Wave — 6 variants (Gold, Fire, Blue, Silver, Green, Pink)
- **Tickets:** MVM only — 200 headset / 350 attendee
- **Prize pool:** $10,000 (HB 002)
- **Stream:** kick.com/creatorsai · twitch.tv/creatorsai

---

## Ad workflow

1. Pick script + matching row in [AD-COPY.md](./AD-COPY.md).
2. Generate host plate on **white #FFFFFF** (prompt above + **15s hook VO** first); key to green in post.
3. Composite `[GRAPHIC: …]` with site assets / Higgsfield B-roll (`VISUAL-PROMPT-RULES.md`).
4. Export **15s** and **30s** cuts with burned-in captions + 3s end card.
5. Upload to Meta / TikTok with UTM link + headline/primary text from AD-COPY.
6. Retarget 30s viewers who watched 50%+ with ticket/booking scripts (05, 06, 15, 26).
