# Video topic matching guide

**Purpose:** Match **influencer talking-head scripts** (what the host says) to **B-roll** from the website, landing page, brief campaigns, and **silent poster flyers**. Use for PiP composites — **background = nobody talking**, foreground = host on white.

**Related:** `VIDEO-BROLL-TALKING-HEAD-MATCHING.md` (composite rules + ship files) · [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) (64 preview cards → launch) · `INFLUENCER-TALKING-HEAD-SCRIPTS.md` · `build-influencer-composites.ps1`

**Outputs (two sets, both built):**
- **Primary ship:** `INFLUENCER-*-COMPOSITE-15s.mp4` — cinematic / silent-video B-roll
- **A/B add-on:** `INFLUENCER-*-COMPOSITE-POSTER-15s.mp4` — silent flyer poster BG (where script has a matching PNG)

**Rule:** If the clip has a **person talking to camera on white**, it is **not** B-roll — it is a UGC plate (`ugc/output/*-plate.mp4`). Use as **foreground only** (L2/L3 staircase slots).

---

## How to read this doc

| Column | Meaning |
|--------|---------|
| **Talking head** | Script # · VO file · composite (if built) |
| **What they're saying** | Topic beats in the 15s VO |
| **Built (cinematic)** | Primary composite BG — **ship this** in preview/launch |
| **Built (poster A/B)** | Silent flyer composite — optional second creative |
| **Preview / doc ID** | Card in [preview](../ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html) · `XX.YY.00` in [launch matrix](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) |
| **Also works** | Alternate clips from catalog (swap in build script) |
| **On website** | Where that B-roll already appears |

---

# Part 1 — Cinematic video catalog (B-roll only)

Videos you **can** put behind a talking head. Grouped by **topic**.

---

## A. Landing page & creator recruit

| File | Visual | Duration | On site | Use when host talks about… |
|------|--------|----------|---------|---------------------------|
| `assets/ep3-ar-experience-hero.mp4` | Quest girl, crowd, Blue vs Silver fight in tent — **landing hero trim** | ~15s | **landing.html** hero | Open call, creator partners, “you checked us out”, co-stream signup, fight night |
| `assets/ep3-ar-experience.mp4` | Full Blue vs Silver AR episode feel | varies | **landing.html** fallback, **index.html**, **watch.html** ep3 | What hologram boxing is, co-stream from tent, VIP ringside, full event energy |
| `assets/083e858b3a4647d299e25b5f543e7577.mov` | Brand hero — Quest crowd + fight energy | varies | **index.html** hero, **landing.html** fallback | Brand intro, “first live AI hologram fight night”, spectacle |
| `ads/brief-004/output/MEMORY-60s-16x9-silent.mp4` | Memory lane montage — fighting through time | 60s (crop 9:16) | **landing.html** memory section | Heritage, “what you're joining”, emotional brand, fight legacy |
| `ads/brief-004/output/MEMORY-60s-16x9-ambient.mp4` | Same visuals, no VO | 60s | — | Same as silent — safest for composites |

---

## B. Walk inside / mystery / invitation

| File | Visual | Duration | On site | Use when host talks about… |
|------|--------|----------|---------|---------------------------|
| `ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` | Exterior tent → walk in → mystery | 15s | Fan ads L1 | “Would you walk inside”, calling streamers, invitation, open call mystery |
| `ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-VO.mp4` | Same + Roman VO | 15s | — | **Standalone only** — mute if compositing host VO |
| `ads/brief-001/output/Director_Brief_001_Version_B_Cinematic_Mystery.mp4` | Premium future / arena mystery | 15s | Fan ads L1 | Future of live entertainment, premium brand, curiosity |
| `ads/output/FUTURE-IS-HERE-15s-9x16-ambient.mp4` | Enter arena → gear up → fight → crowd | 15s | L3 cross | “Future is here”, first-of-its-kind, hype discovery |

---

## C. Tent interior (inflatable tent — not dome)

| File | Visual | Duration | On site | Use when host talks about… |
|------|--------|----------|---------|---------------------------|
| `assets/ep3-ar-wide-tent.mp4` | Wide **inflatable tent** interior, fog, square | varies | — | Inside the tent, VIP tent access, what streamers toured |
| `assets/ep3-tent-corner-crowd.mp4` | Tent corner, VR crowd, boxers in glowing square | 15s | Stream stories | Tent content, crowd energy, slots filling, partner roster |
| `assets/ep1-tent-preview.mp4` | HB001 tent BTS / preview | varies | **index.html**, **watch.html** ep1, **gallery.html** | Behind the scenes, “bring audience to the tent”, preview |
| `assets/ep3-ar-closeup.mp4` | AR headset close-up in tent | varies | — | AR experience, what is hologram boxing, headset POV |
| `assets/ep3-ar-closeup-v2.mp4` | AR close-up alt | varies | — | Same |

---

## D. Live interactive FX / Quest / chat controls

| File | Visual | Duration | On site | Use when host talks about… |
|------|--------|----------|---------|---------------------------|
| `assets/ep3-pov-passthrough.mp4` | Quest POV passthrough in tent | varies | **index.html** stream stories | “Chat controls interactive FX”, live FX, ringside tech |
| `assets/ep3-ar-ringside.mp4` | Ringside AR view | varies | **index.html** stream stories | Co-stream ringside, streamers, Kick/Twitch energy |
| `assets/ep3-ringside-ots.mp4` | Over-the-shoulder ringside | varies | — | Ringside VIP, spectator view |

---

## E. Fights & hype moments

| File | Visual | Duration | On site | Use when host talks about… |
|------|--------|----------|---------|---------------------------|
| `assets/higgsfield-892f90b0-5456-4ceb-9589-266f3b418c4d.mp4` | Gold vs Fire main event | varies | **index.html**, **watch.html** ep4, **gallery.html** | Main-event hype, “content their channels need”, knockout energy |
| `assets/ep3-fight-impact.mp4` | Punch impact, wireframe fighters | 15s | Stream stories | Hype clips, partner reviews, last call, fight night |
| `assets/ep3-blue-silver-v2-action.mp4` | Blue vs Silver mid-fight | varies | Stream stories | Mid-fight action, streamer clip bait |
| `assets/ep3-blue-silver-v3-knockout.mp4` | Knockout moment | varies | Stream stories | Countdown urgency, fight night closes |
| `assets/ep3-blue-silver-v1-faceoff.mp4` | Blue vs Silver face-off | varies | — | Face-off tension, fight night coming |
| `assets/ep2-ar-experience.mp4` | Green vs Pink full fight | varies | **index.html**, **watch.html** ep2, book BG | Alternate fight energy, highlights |
| `assets/higgsfield-386b5e5c-43c6-44ee-a8f3-ab148fe272ca.mp4` | Fight highlight reel | varies | **index.html** cards, **about.html**, **gallery.html** | Highlights, recap energy |
| `ads/output/03-fight-begins-seedance.mp4` | Fight begins beat | 5s | Brief 001 suite | Fight starting, countdown |
| `ads/output/04-world-watching-seedance.mp4` | Crowd / world watching | 5s | Brief 001 suite | Roster filling, crowd momentum |

---

## F. Seedance fan suite (short beats)

| File | Visual | Use when host talks about… |
|------|--------|---------------------------|
| `ads/output/01-enter-the-arena-seedance.mp4` | Walk into experience | Invitation, open call |
| `ads/output/02-gear-up-seedance.mp4` | Gear up / headset | AR, getting ready |
| `ads/output/03-fight-begins-seedance.mp4` | Fight starts | Hype, countdown |
| `ads/output/04-world-watching-seedance.mp4` | Global crowd | Social proof, roster |

---

## G. ❌ Not B-roll (hosts talking — foreground only)

| File | Role |
|------|------|
| `ugc/output/02-the-inflatable-tent-plate.mp4` | L2 inside tent · **foreground** over tent B-roll |
| `ugc/output/08-watch-free-on-kick-twitch-plate.mp4` | L2 co-stream · **foreground** over ringside B-roll |
| `ugc/output/ads-avatar-what-is-hologram-boxing-plate.mp4` | L3 what is · **foreground** over AR close-up B-roll |
| `ads/output/32-live-interactive-effects-plate.mp4` | L2 live FX · **foreground** over Quest/AR B-roll |
| `ads/influencer-recruit/output/INFLUENCER-*-15s-VO.mp4` | Scripts 33–45 · **foreground** — chroma key white |

---

## H. Silent poster backgrounds (Tier B — flyer → 15s `-an` MP4)

PNG flyers animated with slow zoom. **Nobody talking.** Pair with matching talking-head script for poster A/B composites.

| Silent poster video | Source PNG | Scripts |
|---------------------|------------|---------|
| `output/OPEN-CALL-EXACT-POSTER-15s.mp4` | `input/hf_20260624_011044…png` | 33 open call · 45 confirms open call |
| `output/TIKTOK-CALLING-ALL-INFLUENCERS-15s.mp4` | `CALLING-ALL-INFLUENCERS-9x16.png` | 34 calling all |
| `output/TIKTOK-OPEN-CALL-OPTIMIZED-15s.mp4` | `OPEN-CALL-OPTIMIZED-TIKTOK-9x16.png` | 35 join the team |
| `output/PARTNER-SPOTLIGHT-15s.mp4` | `PARTNER-SPOTLIGHT-9x16.png` | 37 partner reviews |
| `output/CREATOR-REMINDER-15s.mp4` | `CREATOR-REMINDER-9x16.png` | 38 reminder slots |
| `output/COUNTDOWN-TIMER-15s.mp4` | `COUNTDOWN-TIMER-9x16.png` | 40 L5 countdown |
| `output/STREAMER-LAST-CALL-15s.mp4` | `STREAMER-LAST-CALL-9x16.png` | 41 L5 last call |

**Rebuild posters:** `python ads/influencer-recruit/build-staircase-creatives.py` · open-call exact: `python ads/influencer-recruit/build-exact-poster-video.py`

---

## I. ❌ Never use as background

| File pattern | Why |
|--------------|-----|
| `*-VO.mp4` brief clips when host PiP has VO | Double VO — use **silent/ambient/poster** instead |
| `ep3-dome-corner-crowd` · `ep3-ar-wide-dome` | Dome venue — use **inflatable tent** clips |

---

# Part 2 — Talking head → B-roll matches (built)

Each row = one influencer script or staircase slot. Composites live in `ads/influencer-recruit/output/`.

## Master map — scripts 33–45

| # | Composite (cinematic) | BG cinematic | Poster A/B composite | BG poster | Preview / doc (staircase) |
|---|----------------------|--------------|----------------------|-----------|---------------------------|
| 33 | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | `higgsfield-386…` highlight reel | `…-COMPOSITE-POSTER-15s.mp4` | `OPEN-CALL-EXACT-POSTER-15s.mp4` | L3 ×6 · `03.*` slot 1 · HF `#55` `06.01` |
| 34 | `INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` | `walk` silent | `…-COMPOSITE-POSTER-15s.mp4` | `TIKTOK-CALLING-ALL-INFLUENCERS-15s.mp4` | `#1` `#4` · `01.01` `01.04` · poster `#58` |
| 35 | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | `ep3-ar-experience-hero.mp4` | `…-COMPOSITE-POSTER-15s.mp4` | `TIKTOK-OPEN-CALL-OPTIMIZED-15s.mp4` | L3 ×6 slot 2 · HF `#56` `06.02` |
| 36 | `INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` | `FUTURE-IS-HERE-ambient.mp4` | — | — | `#39` `#42` · `04.03` `04.06` |
| 37 | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` | `ep2-ar-experience.mp4` | `…-COMPOSITE-POSTER-15s.mp4` | `PARTNER-SPOTLIGHT-15s.mp4` | `#37` `#40` · `04.01` `04.04` · poster `#60` |
| 38 | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` | `ep3-ringside-ots.mp4` | `…-COMPOSITE-POSTER-15s.mp4` | `CREATOR-REMINDER-15s.mp4` | `#38` `#41` · `04.02` `04.05` · poster `#61` |
| 39 | `INFLUENCER-L4-STREAMER-REVIEWS-COMPOSITE-15s.mp4` | `higgsfield-892f90b0…mp4` | — | — | Built · optional A/B |
| 40 | `INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-15s.mp4` | `ep3-fight-impact.mp4` | `…-COMPOSITE-POSTER-15s.mp4` | `COUNTDOWN-TIMER-15s.mp4` | `#49` `#52` · `05.01` `05.04` · poster `#62` |
| 41 | `INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-15s.mp4` | `ep3-ar-experience.mp4` | `…-COMPOSITE-POSTER-15s.mp4` | `STREAMER-LAST-CALL-15s.mp4` | `#50` `#53` · `05.02` `05.05` · poster `#63` |
| 42 | `INFLUENCER-L5-FINAL-SLOTS-CLOSING-COMPOSITE-15s.mp4` | `ep3-tent-corner-crowd.mp4` | — | — | `#51` `#54` · `05.03` `05.06` |
| 43 | `INFLUENCER-L4-CONFIRMS-PARTNER-COMPOSITE-15s.mp4` | `ep3-ar-wide-tent.mp4` | — | — | `#43` `#46` · `04.07` `04.10` |
| 44 | `INFLUENCER-L4-CONFIRMS-REMINDER-COMPOSITE-15s.mp4` | `ep3-pov-passthrough.mp4` | — | — | `#44` `#47` · `04.08` `04.11` |
| 45 | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-15s.mp4` | `ep3-blue-silver-v1-faceoff.mp4` | `…-COMPOSITE-POSTER-15s.mp4` | `OPEN-CALL-EXACT-POSTER-15s.mp4` | `#45` `#48` · `04.09` `04.12` · poster `#64` |

## Master map — L2 / L3 UGC staircase (host plate + cinematic BG)

| Slot | Composite | BG cinematic | Foreground (host plate) | Preview / doc |
|------|-----------|--------------|-------------------------|---------------|
| L2 live FX | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | `ep3-ar-closeup-v2.mp4` | `32-live-interactive-effects-plate.mp4` | `#7` `#10` · L3 slot 4 · `02.01` `02.04` |
| L2 co-stream | `INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4` | `ep3-ar-ringside.mp4` | `08-watch-free-on-kick-twitch-plate.mp4` | `#8` `#11` · `02.02` `02.05` |
| L2 inside tent | `INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` | `ep1-tent-preview.mp4` | `02-the-inflatable-tent-plate.mp4` | `#9` `#12` · `03.08` `03.20` · `02.03` `02.06` |
| L3 what is | `INFLUENCER-L3-WHATIS-COMPOSITE-15s.mp4` | `ep3-ar-closeup.mp4` | `ads-avatar-what-is-hologram-boxing-plate.mp4` | `#19` · `03.07.00` |

---

## Script 33 — Open call exact (WE WANT YOU)

| | |
|--|--|
| **Host says** | Open call for streamers & creators · WE WANT YOU · co-stream from tent · Kick/Twitch/YouTube/TikTok · VIP ringside · sign up |
| **Talking head** | `INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4` |
| **Built (cinematic)** | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` ← `higgsfield-386…` highlight reel |
| **Built (poster A/B)** | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-POSTER-15s.mp4` ← `OPEN-CALL-EXACT-POSTER-15s.mp4` |
| **Also works** | `ep3-ar-experience.mp4` · `ep3-ar-experience-hero.mp4` · `walk` silent · `ep1-tent-preview.mp4` |
| **Landing tie-in** | Same energy as **landing.html** hero — creators see this when they click through |

---

## Script 34 — Calling all streamers (L1)

| | |
|--|--|
| **Host says** | Calling all streamers · co-stream partner · first AI hologram fight night · chat controls FX · bring audience to tent |
| **Talking head** | `INFLUENCER-CALLING-ALL-15s-VO.mp4` |
| **Built (cinematic)** | `INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` ← `WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` |
| **Built (poster A/B)** | `INFLUENCER-CALLING-ALL-COMPOSITE-POSTER-15s.mp4` ← `TIKTOK-CALLING-ALL-INFLUENCERS-15s.mp4` |
| **Also works** | `083e858b…mov` (index hero) · `ep3-tent-corner-crowd.mp4` · `ep3-pov-passthrough.mp4` |

---

## Script 35 — Join the team (L3 optimized)

| | |
|--|--|
| **Host says** | Be bold, be live · hiring creator partners · co-stream · fight night coverage · VIP tent · join before slots close |
| **Talking head** | `INFLUENCER-JOIN-THE-TEAM-15s-VO.mp4` |
| **Built (cinematic)** | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` ← `ep3-ar-experience-hero.mp4` (**landing.html**) |
| **Built (poster A/B)** | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-POSTER-15s.mp4` ← `TIKTOK-OPEN-CALL-OPTIMIZED-15s.mp4` |
| **Also works** | `ep3-ar-experience.mp4` · `ep3-ar-wide-tent.mp4` · `MEMORY-60s-16x9-silent.mp4` |

---

## Script 36 — L4 retarget open call

| | |
|--|--|
| **Host says** | You checked us out · open call still live · co-stream from tent · live FX · partner slots filling · finish application |
| **Talking head** | `INFLUENCER-L4-RETARGET-OPEN-CALL-15s-VO.mp4` |
| **Built (cinematic)** | `INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` ← `FUTURE-IS-HERE-15s-9x16-ambient.mp4` |
| **Built (poster A/B)** | — |
| **Also works** | `ep3-ar-experience-hero.mp4` (landing) · `walk` silent · `ep3-ar-experience.mp4` |

---

## Script 37 — L4 partner reviews

| | |
|--|--|
| **Host says** | Creators on Kick/Twitch/TikTok locking slots · reviews are wild · tent content insane · live FX · VIP ringside |
| **Talking head** | `INFLUENCER-L4-PARTNER-REVIEWS-15s-VO.mp4` |
| **Built (cinematic)** | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` ← `ep2-ar-experience.mp4` (Green vs Pink) |
| **Built (poster A/B)** | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-POSTER-15s.mp4` ← `PARTNER-SPOTLIGHT-15s.mp4` |
| **Also works** | `ep3-fight-impact.mp4` · `higgsfield-892f90b0…mp4` · `ep3-blue-silver-v2-action.mp4` |

---

## Script 38 — L4 reminder slots

| | |
|--|--|
| **Host says** | You were on our page · still thinking? · slots filling · chat ringside · live FX · VIP tent · finish application |
| **Talking head** | `INFLUENCER-L4-REMINDER-SLOTS-15s-VO.mp4` |
| **Built (cinematic)** | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` ← `ep3-ringside-ots.mp4` |
| **Built (poster A/B)** | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-POSTER-15s.mp4` ← `CREATOR-REMINDER-15s.mp4` |
| **Also works** | `ep3-tent-corner-crowd.mp4` · `ep3-ar-wide-tent.mp4` · `ep3-pov-passthrough.mp4` |

---

## Script 39 — L4 streamer reviews (A/B)

| | |
|--|--|
| **Host says** | Streamers who checked out the tent · hype content for their channels · co-stream live · interactive FX · VIP ringside |
| **Talking head** | `INFLUENCER-L4-STREAMER-REVIEWS-15s-VO.mp4` |
| **Built (cinematic)** | `INFLUENCER-L4-STREAMER-REVIEWS-COMPOSITE-15s.mp4` ← `higgsfield-892f90b0…mp4` (Gold vs Fire) |
| **Built (poster A/B)** | — |
| **Also works** | `ep3-fight-impact.mp4` · `ep3-blue-silver-v3-knockout.mp4` · `watch.html` episode cards |

---

## Script 40 — L5 countdown timer

| | |
|--|--|
| **Host says** | Fight night countdown live on site · slots close at zero · co-stream · VIP ringside · live FX · lock slot now |
| **Talking head** | `INFLUENCER-L5-COUNTDOWN-TIMER-15s-VO.mp4` |
| **Built (cinematic)** | `INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-15s.mp4` ← `ep3-fight-impact.mp4` |
| **Built (poster A/B)** | `INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-POSTER-15s.mp4` ← `COUNTDOWN-TIMER-15s.mp4` |
| **Also works** | `ep3-blue-silver-v3-knockout.mp4` · `03-fight-begins-seedance.mp4` · `ep3-blue-silver-v1-faceoff.mp4` |

---

## Script 41 — L5 last call streamers

| | |
|--|--|
| **Host says** | Last call for streamers · roster locking · hologram boxing live from tent · chat ringside · FX · VIP · this is it |
| **Talking head** | `INFLUENCER-L5-LAST-CALL-STREAMERS-15s-VO.mp4` |
| **Built (cinematic)** | `INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-15s.mp4` ← `ep3-ar-experience.mp4` |
| **Built (poster A/B)** | `INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-POSTER-15s.mp4` ← `STREAMER-LAST-CALL-15s.mp4` |
| **Also works** | `ep3-fight-impact.mp4` · `ep2-ar-experience.mp4` · `ep3-tent-corner-crowd.mp4` |

---

## Script 42 — L5 final slots closing

| | |
|--|--|
| **Host says** | Open call closing · final partner slots · Kick/Twitch/TikTok go live · VIP tent · clip-worthy content · last chance |
| **Talking head** | `INFLUENCER-L5-FINAL-SLOTS-CLOSING-15s-VO.mp4` |
| **Built (cinematic)** | `INFLUENCER-L5-FINAL-SLOTS-CLOSING-COMPOSITE-15s.mp4` ← `ep3-tent-corner-crowd.mp4` |
| **Built (poster A/B)** | — |
| **Also works** | `04-world-watching-seedance.mp4` · `ep3-ar-wide-tent.mp4` · `walk` silent |

---

## Script 43 — L4 confirms partner ad

| | |
|--|--|
| **Host says** | That partner ad was real · Kick/Twitch signing up · VIP tent · live FX · reviews aren't fluff · finish signup |
| **Talking head** | `INFLUENCER-L4-CONFIRMS-PARTNER-AD-15s-VO.mp4` |
| **Built (cinematic)** | `INFLUENCER-L4-CONFIRMS-PARTNER-COMPOSITE-15s.mp4` ← `ep3-ar-wide-tent.mp4` |
| **Built (poster A/B)** | — |
| **Also works** | `ep3-tent-corner-crowd.mp4` · `ep3-fight-impact.mp4` · `PARTNER-SPOTLIGHT-15s.mp4` |

---

## Script 44 — L4 confirms reminder ad

| | |
|--|--|
| **Host says** | That reminder ad was right · slots really filling · co-stream spots going · VIP tent · live FX · don't sleep on it |
| **Talking head** | `INFLUENCER-L4-CONFIRMS-REMINDER-AD-15s-VO.mp4` |
| **Built (cinematic)** | `INFLUENCER-L4-CONFIRMS-REMINDER-COMPOSITE-15s.mp4` ← `ep3-pov-passthrough.mp4` |
| **Built (poster A/B)** | — |
| **Also works** | `ep3-ar-wide-tent.mp4` · `CREATOR-REMINDER-15s.mp4` (poster) · `ep3-tent-corner-crowd.mp4` |

---

## Script 45 — L4 confirms open call ad

| | |
|--|--|
| **Host says** | Open call ad wasn't clickbait · they want streamers · co-stream from tent · clip content · finish at hologramboxing.com |
| **Talking head** | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-AD-15s-VO.mp4` |
| **Built (cinematic)** | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-15s.mp4` ← `ep3-blue-silver-v1-faceoff.mp4` |
| **Built (poster A/B)** | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-POSTER-15s.mp4` ← `OPEN-CALL-EXACT-POSTER-15s.mp4` |
| **Also works** | `walk` silent · `ep3-ar-experience-hero.mp4` · `ep3-ar-experience.mp4` |

---

# Part 3 — Topic index (reverse lookup)

Find B-roll by **what the host mentions** in any script.

| Topic / keyword in VO | Best B-roll clips | Example talking heads |
|----------------------|-------------------|------------------------|
| **Landing page / you checked us out** | `ep3-ar-experience-hero.mp4` | 35, 36, 38, 44 |
| **Open call / WE WANT YOU / sign up** | `higgsfield-386…` (built 33) · `OPEN-CALL-EXACT-POSTER` (poster 33/45) · `walk` silent · landing hero | 33, 36, 45 |
| **Walk inside / mystery / invitation** | `WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` (built 34) · `TIKTOK-CALLING-ALL` poster | 34, 45 |
| **Co-stream / Kick / Twitch / TikTok** | `ep3-ar-ringside.mp4`, `higgsfield-892f90b0…mp4` | 33, 37, 39, 41, 42 |
| **Inside the tent / tent content** | `ep3-ar-wide-tent.mp4`, `ep3-tent-corner-crowd.mp4`, `ep1-tent-preview.mp4` | 37, 38, 43, 44 |
| **Live FX / chat controls / interactive** | `ep3-pov-passthrough.mp4`, `ep3-ar-ringside.mp4` | 33, 36, 37, 38, 39, 40 |
| **VIP ringside / fight night** | `ep3-ar-ringside.mp4`, `ep3-fight-impact.mp4`, `ep3-ar-experience.mp4` | 33, 35, 40, 41 |
| **Hype clips / insane content / reviews** | `ep2-ar-experience` (built 37) · `higgsfield-892f90b0…` (built 39) · `PARTNER-SPOTLIGHT` poster | 37, 39, 43 |
| **Partner slots / roster / filling** | `ep3-ringside-ots` (built 38) · `CREATOR-REMINDER` poster · `ep3-tent-corner-crowd` (built 42) | 36, 38, 42, 44 |
| **Countdown / close at zero / last chance** | `ep3-fight-impact` (built 40) · `COUNTDOWN-TIMER` poster · `STREAMER-LAST-CALL` poster | 40, 41, 42 |
| **Join the team / hiring partners** | `ep3-ar-experience-hero.mp4` (built 35) · `TIKTOK-OPEN-CALL-OPTIMIZED` poster | 35, 36 |
| **First AI hologram fight night** | `083e858b…mov`, `FUTURE-IS-HERE-ambient` (built 36) | 34, 36 |
| **Silent poster / flyer match** | `output/*-POSTER-15s.mp4` · `PARTNER-SPOTLIGHT` · `CREATOR-REMINDER` etc. | 33–35, 37–38, 40–41, 45 |
| **Memory / legacy / future of entertainment** | `MEMORY-60s-16x9-silent.mp4`, `Version_B_Cinematic_Mystery.mp4` | 34, 35 (alt) |
| **What is hologram boxing / AR** | `ep3-ar-closeup.mp4` (L3 built) · `ep3-ar-closeup-v2.mp4` (L2 livefx built) | L2 `livefx` · L3 `whatis` |

---

# Part 4 — Website page → videos → talking heads

Quick map: **if the visitor saw this on the site**, pair with these talking heads.

| Page / section | Video on page | Talking heads that relate |
|----------------|---------------|---------------------------|
| **landing.html** hero | `ep3-ar-experience-hero.mp4` | 35 Join team (built) · 38 Reminder · 44 Confirms reminder |
| **landing.html** memory | `MEMORY-60s-16x9-VO.mp4` (use **silent** for composite) | 34 Calling all · 35 Join team (emotional alt) |
| **index.html** hero | `083e858b…mov` | 34 Calling all · brand awareness |
| **index.html** inside tent | `higgsfield-892f90b0…mp4` | 37 Partner reviews · 39 Streamer reviews |
| **index.html** episodes | `ep1`, `ep2`, `ep3-ar-experience` | 33 Open call · any “what you're signing up for” |
| **index.html** stream stories | `ep3-pov-passthrough`, `ep3-fight-impact`, `ep3-blue-silver-*` | 37–41 FX / hype / countdown scripts |
| **watch.html** ep1 tent preview | `ep1-tent-preview.mp4` | 34 Calling all · 38 Reminder |
| **watch.html** ep3 Blue vs Silver | `ep3-ar-experience.mp4` | 33 Open call · 36 Retarget |
| **watch.html** ep4 Gold vs Fire | `higgsfield-892f90b0…mp4` | 39 Streamer reviews · 37 Partner reviews |
| **gallery.html** | fight + tent clips | 37, 39, 43 — social proof / hype |

---

# Part 5 — Staircase ad slots

**Full per-ad detail:** [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) (`00.01.00` master index)

## Full-screen only (no host PiP)

| Layer | Creative key | Ship file | Preview # | Doc ID |
|-------|--------------|-----------|-----------|--------|
| L1 | `walk` | `WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` | 2, 5 | `01.02` `01.05` |
| L1 | `future_mystery` | `Director_Brief_001_Version_B_Cinematic_Mystery.mp4` | 3, 6 | `01.03` `01.06` |
| L3 | `walk` cross | `walk` silent | 15 | `03.03.00` |
| L3 | `future_vo` | `FUTURE-IS-HERE-15s-9x16-ambient.mp4` | 18 | `03.06.00` |
| L3 | `open_v1` | `TIKTOK-OPEN-CALL-CREATORS-15s.mp4` | 23, 27, 31, 35 | `03.*` slot 3 |

## Host PiP composites (L2 + L3 cross + L1/L3/L4/L5 voiced)

| Layer | Creative key | Ship file | Preview # (examples) | Doc ID |
|-------|--------------|-----------|----------------------|--------|
| L1 | `inf_calling_all_vo` | `INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` | 1, 4 | `01.01` `01.04` |
| L2 | `tent` | `INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` | 9, 12, 20, 36 | `02.03` `02.06` |
| L2 | `livefx` | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | 7, 10, 16, 24… | `02.01` `02.04` |
| L2 | `stream` | `INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4` | 8, 11 | `02.02` `02.05` |
| L3 | `whatis` | `INFLUENCER-L3-WHATIS-COMPOSITE-15s.mp4` | 19 | `03.07.00` |
| L3 | `inf_open_call_vo` | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | 13, 14, 21… | `03.*` slot 1 |
| L3 | `inf_join_team_vo` | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | 17, 22… | `03.*` slot 2 |
| L4 | `inf_l4_*_vo` | `INFLUENCER-L4-*-COMPOSITE-15s.mp4` | 37–48 | `04.01`–`04.12` |
| L5 | `inf_l5_*_vo` | `INFLUENCER-L5-*-COMPOSITE-15s.mp4` | 49–54 | `05.01`–`05.06` |
| Bonus | `inf_*_hf` / `inf_*_poster` | `*-COMPOSITE-HF-*` / `*-POSTER-15s` | 55–64 | `06.01`–`06.10` |

---

## Rebuild composites

```powershell
# Poster silent videos (PNG → 15s -an)
python ads/influencer-recruit/build-staircase-creatives.py
python ads/influencer-recruit/build-exact-poster-video.py

# All composites: 17 cinematic + 8 poster A/B
powershell -File scripts/marketing/build-influencer-composites.ps1
```

Edit `$cinematicJobs` / `$posterJobs` in `build-influencer-composites.ps1`, then rebuild.

---

*Last updated: 2026-07-12 · 17 cinematic + 8 poster + 2 HF composites · Preview #1–#64 · [launch matrix](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md)*
