# Video clip & B-roll matching guide

**Final ad = cinematic hologram boxing B-roll (full screen) + influencer host PiP (white keyed out).**

**Related:** `VIDEO-TOPIC-MATCHING-GUIDE.md` (full catalog + per-script topic matches) · [INFLUENCER-PREVIEW-LAUNCH-MATRIX.md](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md) (`XX.YY.ZZ` doc IDs) · `INFLUENCER-TALKING-HEAD-SCRIPTS.md` · `build-influencer-composites.ps1`

---

## Golden rules

| Layer | What viewers see |
|-------|------------------|
| **Background (full frame)** | Hologram boxing videos from **website**, **landing page**, and **brief campaigns** — tent fights, walk-ins, memory lane, future mystery. **Nobody talking.** |
| **Foreground (PiP)** | Influencer talking heads (`INFLUENCER-*-15s-VO.mp4`) — white plate, chroma keyed, bottom-center ~400px. **Host audio only** (mute B-roll). |

### ✅ Approved background sources (Tier A)

| Source | Examples |
|--------|----------|
| **Website `assets/`** | `ep3-ar-experience.mp4`, `ep3-ar-experience-hero.mp4`, `ep1-tent-preview.mp4`, `ep3-tent-corner-crowd.mp4`, `ep3-fight-impact.mp4`, `higgsfield-892f90b0…mp4` |
| **Landing page** | `ep3-ar-experience-hero.mp4` (hero), `MEMORY-60s-16x9-silent.mp4` (memory lane) |
| **Brief 002 — Walk Inside** | `WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` ← **prefer silent** for composites |
| **Brief 001 — Future mystery** | `Director_Brief_001_Version_B_Cinematic_Mystery.mp4` |
| **Brief 004 — Memory** | `MEMORY-60s-16x9-silent.mp4` (crop to 9:16) |
| **Fan seedance suite** | `01-enter-the-arena` … `04-world-watching-seedance.mp4`, `FUTURE-IS-HERE-15s-9x16-ambient.mp4` |

### ✅ Silent poster backgrounds (Tier B)

**PNG → 15s silent MP4** (`-an`, slow zoom). Use when the talking head **matches the flyer** the script was built from — host VO only, no double audio.

| Silent poster video | Source PNG | Use behind… |
|---------------------|------------|---------------|
| `output/OPEN-CALL-EXACT-POSTER-15s.mp4` | `input/hf_20260624_011044…png` | Script 33 open call · Script 45 confirms open call |
| `output/TIKTOK-CALLING-ALL-INFLUENCERS-15s.mp4` | `CALLING-ALL-INFLUENCERS-9x16.png` | Script 34 calling all |
| `output/TIKTOK-OPEN-CALL-OPTIMIZED-15s.mp4` | `OPEN-CALL-OPTIMIZED-TIKTOK-9x16.png` | Script 35 join the team |
| `output/PARTNER-SPOTLIGHT-15s.mp4` | `PARTNER-SPOTLIGHT-9x16.png` | Script 37 partner reviews |
| `output/CREATOR-REMINDER-15s.mp4` | `CREATOR-REMINDER-9x16.png` | Script 38 reminder slots |
| `output/COUNTDOWN-TIMER-15s.mp4` | `COUNTDOWN-TIMER-9x16.png` | Script 40 L5 countdown |
| `output/STREAMER-LAST-CALL-15s.mp4` | `STREAMER-LAST-CALL-9x16.png` | Script 41 L5 last call |

**Rebuild poster videos:** `python ads/influencer-recruit/build-staircase-creatives.py` · exact open-call poster: `python ads/influencer-recruit/build-exact-poster-video.py`

**Rule:** Prefer **silent** B-roll (`*-silent.mp4`, `*-ambient.mp4`, poster `-an` MP4) whenever the foreground host has VO.

### ❌ Never use as background

| File pattern | Why |
|--------------|-----|
| `ugc/output/*-plate.mp4` | **Another host talking** on white |
| `ads/output/32-live-interactive-effects-plate.mp4` | UGC host explaining FX |
| `ugc/output/02-the-inflatable-tent-plate.mp4` | Host describes tent — not tent footage |
| `ugc/output/08-watch-free-on-kick-twitch-plate.mp4` | Host talking about streams |
| `ugc/output/ads-avatar-what-is-hologram-boxing-plate.mp4` | Host talking |
| `*-VO.mp4` brief clips when host PiP has VO | Double VO — use **silent/ambient** B-roll |
| `ep3-dome-corner-crowd` · `ep3-ar-wide-dome` | Dome venue — use **inflatable tent** clips |

**Deliverable for ads:** `INFLUENCER-*-COMPOSITE-15s.mp4` (cinematic — **primary ship file**) · optional A/B: `INFLUENCER-*-COMPOSITE-POSTER-15s.mp4` (silent poster BG add-on).

**Rebuild all composites:** `powershell -File scripts/marketing/build-influencer-composites.ps1`

---

## Composite map — cinematic (primary, built)

| Script | Composite output | Background (cinematic) | Preview / doc IDs |
|--------|------------------|------------------------|-------------------|
| 33 open call | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4` | `higgsfield-386…` highlight reel | L3 ×6 · `03.*` slot 1 · bonus `06.01` HF |
| 34 calling all | `INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4` | `walk` silent | L1 `#1` `#4` · `01.01` `01.04` |
| 35 join team | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4` | `ep3-ar-experience-hero.mp4` (landing) | L3 ×6 slot 2 · bonus `06.02` HF |
| 36 L4 retarget | `INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4` | `FUTURE-IS-HERE-15s-9x16-ambient.mp4` | L4 `#39` `#42` · `04.03` `04.06` |
| 37 partner reviews | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4` | `ep2-ar-experience.mp4` (Green vs Pink) | L4 `#37` `#40` · `04.01` `04.04` |
| 38 reminder | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4` | `ep3-ringside-ots.mp4` | L4 `#38` `#41` · `04.02` `04.05` |
| 39 streamer reviews | `INFLUENCER-L4-STREAMER-REVIEWS-COMPOSITE-15s.mp4` | `higgsfield-892f90b0…mp4` | Built · optional A/B (not in 54-slot preview) |
| 40 L5 countdown | `INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-15s.mp4` | `ep3-fight-impact.mp4` | L5 `#49` `#52` · `05.01` `05.04` |
| 41 L5 last call | `INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-15s.mp4` | `ep3-ar-experience.mp4` | L5 `#50` `#53` · `05.02` `05.05` |
| 42 L5 final slots | `INFLUENCER-L5-FINAL-SLOTS-CLOSING-COMPOSITE-15s.mp4` | `ep3-tent-corner-crowd.mp4` | L5 `#51` `#54` · `05.03` `05.06` |
| 43 confirms partner | `INFLUENCER-L4-CONFIRMS-PARTNER-COMPOSITE-15s.mp4` | `ep3-ar-wide-tent.mp4` | L4 `#43` `#46` · `04.07` `04.10` |
| 44 confirms reminder | `INFLUENCER-L4-CONFIRMS-REMINDER-COMPOSITE-15s.mp4` | `ep3-pov-passthrough.mp4` | L4 `#44` `#47` · `04.08` `04.11` |
| 45 confirms open call | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-15s.mp4` | `ep3-blue-silver-v1-faceoff.mp4` | L4 `#45` `#48` · `04.09` `04.12` |
| L2 live FX | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | `ep3-ar-closeup-v2.mp4` | L2 `#7` `#10` · L3 `#16` `#24` … · `02.01` `02.04` |
| L2 co-stream | `INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4` | `ep3-ar-ringside.mp4` | L2 `#8` `#11` · `02.02` `02.05` |
| L2 inside tent | `INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` | `ep1-tent-preview.mp4` | L2 `#9` `#12` · L3 `#20` `#36` · `02.03` `02.06` |
| L3 what is | `INFLUENCER-L3-WHATIS-COMPOSITE-15s.mp4` | `ep3-ar-closeup.mp4` | L3 `#19` · `03.07.00` |

## Composite map — silent poster (add-on A/B, built)

Same talking heads · silent flyer BG · output suffix `-COMPOSITE-POSTER-15s.mp4`

| Script | Composite output | Background (silent poster) | Preview / doc ID |
|--------|------------------|----------------------------|------------------|
| 33 open call | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-POSTER-15s.mp4` | `OPEN-CALL-EXACT-POSTER-15s.mp4` | `#57` · `06.03.00` |
| 34 calling all | `INFLUENCER-CALLING-ALL-COMPOSITE-POSTER-15s.mp4` | `TIKTOK-CALLING-ALL-INFLUENCERS-15s.mp4` | `#58` · `06.04.00` |
| 35 join team | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-POSTER-15s.mp4` | `TIKTOK-OPEN-CALL-OPTIMIZED-15s.mp4` | `#59` · `06.05.00` |
| 37 partner reviews | `INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-POSTER-15s.mp4` | `PARTNER-SPOTLIGHT-15s.mp4` | `#60` · `06.06.00` |
| 38 reminder | `INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-POSTER-15s.mp4` | `CREATOR-REMINDER-15s.mp4` | `#61` · `06.07.00` |
| 40 L5 countdown | `INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-POSTER-15s.mp4` | `COUNTDOWN-TIMER-15s.mp4` | `#62` · `06.08.00` |
| 41 L5 last call | `INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-POSTER-15s.mp4` | `STREAMER-LAST-CALL-15s.mp4` | `#63` · `06.09.00` |
| 45 confirms open call | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-POSTER-15s.mp4` | `OPEN-CALL-EXACT-POSTER-15s.mp4` | `#64` · `06.10.00` |

## Composite map — Higgsfield B-roll bonus (A/B only)

| Script | Composite output | HF job | Preview / doc ID |
|--------|------------------|--------|------------------|
| 33 open call | `INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-HF-386B5E5C-15s.mp4` | `386b5e5c` | `#55` · `06.01.00` |
| 35 join team | `INFLUENCER-JOIN-THE-TEAM-COMPOSITE-HF-B002936B-15s.mp4` | `b002936b` | `#56` · `06.02.00` |

Raw white plates (`*-15s-VO.mp4`) = **intermediate only** for compositing.

---

## Staircase creative keys (preview / launch)

| Key | Ship file | Role | Preview / doc |
|-----|-----------|------|---------------|
| `walk` | `brief-002/.../WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` | Standalone L1/L3 **or** composite BG | `#2` `#5` `#15` · `01.02` `01.05` |
| `future_mystery` | `brief-001/.../Version_B_Cinematic_Mystery.mp4` | Standalone L1 | `#3` `#6` · `01.03` `01.06` |
| `memory` | `brief-004/.../MEMORY-60s-16x9-silent.mp4` | Landing memory lane BG | — |
| `future_vo` | `ads/output/FUTURE-IS-HERE-15s-9x16-ambient.mp4` | Standalone (no double VO) | `#18` · `03.06.00` |
| `open_v1` | `TIKTOK-OPEN-CALL-CREATORS-15s.mp4` | Silent poster L3 | `#23` etc. · `03.*` slot 3 |
| `tent` | `INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4` | L2/L3 — host over tent B-roll | `02.03` `02.06` · `03.08` `03.20` |
| `livefx` | `INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4` | L2/L3 — host over Quest POV B-roll | `02.01` `02.04` · L3 slot 4 |
| `stream` | `INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4` | L2 — host over ringside B-roll | `02.02` `02.05` |
| `whatis` | `INFLUENCER-L3-WHATIS-COMPOSITE-15s.mp4` | L3 — host over AR close-up B-roll | `03.07.00` |
| `inf_*_vo` | `INFLUENCER-*-COMPOSITE-15s.mp4` | **Ship this** — host PiP over cinematic BG | See composite maps above |
| `inf_*_hf` | `INFLUENCER-*-COMPOSITE-HF-*.mp4` | Bonus A/B only | `#55` `#56` · `06.01` `06.02` |
| `inf_*_poster` | `INFLUENCER-*-COMPOSITE-POSTER-15s.mp4` | Bonus A/B only | `#57`–`#64` · `06.03`–`06.10` |

---

## Website & landing video map

| Page | Video | Use as B-roll when… |
|------|-------|---------------------|
| **index.html** hero | `assets/083e858b…mov` | Brand energy (convert to mp4 for ffmpeg) |
| **index.html** / **watch.html** | `ep1-tent-preview`, `ep2/ep3-ar-experience`, `higgsfield-892f90b0…` | Episodes, fights, tent |
| **landing.html** hero | `ep3-ar-experience-hero.mp4` | Creator recruit / retarget |
| **landing.html** memory | `MEMORY-60s-16x9-silent.mp4` | Nostalgia / “what you're joining” |
| **Stream story grid** | `ep3-fight-impact`, `ep3-blue-silver-v*`, `ep3-pov-passthrough`, `ep3-tent-corner-crowd` | Hype, urgency, tent |

---

## ffmpeg composite recipe

```bash
ffmpeg -i assets/ep3-tent-corner-crowd.mp4 \
  -i ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-PARTNER-AD-15s-VO.mp4 \
  -filter_complex "\
    [0:v]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280[bg];\
    [1:v]scale=400:-1,format=rgba,colorkey=0xFFFFFF:0.08:0.04[fg];\
    [bg][fg]overlay=(W-w)/2:H-h-20:shortest=1[outv]" \
  -map "[outv]" -map 1:a -c:v libx264 -crf 19 -c:a aac -movflags +faststart \
  output-composite.mp4
```

- **Mute B-roll:** only `-map 1:a`
- **16:9 memory clip:** same scale/crop filter works for 9:16 output

---

## Quick pick

| I need… | File |
|---------|------|
| Walk-in mystery | `brief-002/.../WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4` |
| Landing hero / recruit | `assets/ep3-ar-experience-hero.mp4` |
| Memory lane | `brief-004/.../MEMORY-60s-16x9-silent.mp4` |
| Future / premium | `brief-001/.../Version_B_Cinematic_Mystery.mp4` |
| Tent + crowd + fight | `assets/ep3-tent-corner-crowd.mp4` |
| Punch / hype | `assets/ep3-fight-impact.mp4` |
| Main event energy | `assets/higgsfield-892f90b0…mp4` |
| Host overlay (intermediate) | `output/INFLUENCER-*-15s-VO.mp4` |
| **Silent poster BG** | `output/*-POSTER-15s.mp4` · `TIKTOK-*.mp4` · `PARTNER-SPOTLIGHT-15s.mp4` etc. |
| **Ship to TikTok/Meta (primary)** | `output/INFLUENCER-*-COMPOSITE-15s.mp4` |
| **Ship A/B (poster BG)** | `output/INFLUENCER-*-COMPOSITE-POSTER-15s.mp4` |

---

*Last updated: 2026-07-12 · 17 cinematic + 8 poster + 2 HF composites · Preview #1–#64 · [launch matrix](./INFLUENCER-PREVIEW-LAUNCH-MATRIX.md)*
