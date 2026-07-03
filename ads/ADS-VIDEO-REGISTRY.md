# AI Hologram Boxing — Video Ads Registry

**Site:** https://creators-ai-hologram-boxing.vercel.app  
**Landing:** https://creators-ai-hologram-boxing.vercel.app/landing.html  
**Last updated:** 2026-07-02  

Master reference for every generated video ad: final exports, prompts, Higgsfield job IDs, voice tracks, and rebuild commands.

---

## Table of contents

1. [Production rules (all ads)](#production-rules-all-ads)
2. [Voice & audio](#voice--audio)
3. [Hero cinematic ads](#hero-cinematic-ads)
4. [Launch catalog — 19 paid/social ads](#launch-catalog--19-paidsocial-ads)
5. [UGC talking-head plates](#ugc-talking-head-plates)
6. [Source files & manifests](#source-files--manifests)
7. [Desktop copies](#desktop-copies)
8. [Regenerate commands](#regenerate-commands)

---

## Production rules (all ads)

| Type | Model | Notes |
|------|--------|--------|
| Stills / keyframes | `nano_banana_2` only | Upload refs via `media_upload` → PUT → `media_confirm` |
| All video | `seedance_2_0` only | **Never Kling.** Use `start_image` = Nano Banana `job_id` |
| Tent venue | Inflatable tent | Not dome/octagon. Interior: quilted walls, fog, blue-purple floor square |
| Headsets | Quest 3–style | White visor, three vertical pill sensors, luxury strap — **every visible person** |
| Wave fighters | Wireframe mesh | Human 1:1 scale, WAVE waistband, restrained glow from feet + square |

Full rules: `VISUAL-PROMPT-RULES.md` · `.cursor/rules/higgsfield-visual-prompts.mdc`

---

## Voice & audio

| Use case | Provider | Voice | ID / preset |
|----------|----------|-------|-------------|
| Hero ads 001 & 002 (hype) | Higgsfield `seed_audio` | **Roman** | `7e63ac18-5fcd-4aba-8078-a86d4e11c127` · speech_rate 2–4 |
| Brief 003 documentary | ElevenLabs | **Bill** | `pqHfZKP75CvOlQylNhV4` · model `eleven_multilingual_v2` |
| UGC plates (post-pass) | Higgsfield `voice_change` | **Gia / Skye / DEJ-1** | See `ugc/README.md` |

Config: `ads/VOICE-CONFIG.json` · ElevenLabs setup: `docs/ELEVENLABS-CONNECT.md`

---

## Hero cinematic ads

### Brief 001 — The Future Is Here (15s · 9:16)

**Campaign:** Premium launch · 4 Seedance beats + title/CTA editorial  
**Manifest:** `ads/master-frames/MASTER-FRAMES-MANIFEST.json`  
**Brief:** `production-library/14_DIRECTOR_BRIEF_001.md`

#### Final exports

| Variant | File | Duration | VO |
|---------|------|----------|-----|
| **Version A — With VO** | `ads/brief-001/output/Director_Brief_001_Version_A_With_VoiceOver.mp4` | 15s | Roman hype |
| **Version B — Cinematic Mystery** | `ads/brief-001/output/Director_Brief_001_Version_B_Cinematic_Mystery.mp4` | 15s | None · on-screen text |
| Master (ambient) | `ads/output/FUTURE-IS-HERE-15s-9x16.mp4` | 15s | None |
| Master + VO | `ads/output/FUTURE-IS-HERE-15s-9x16-VO.mp4` | 15s | Roman v4 hype |
| Comparison report | `ads/brief-001/COMPARISON-REPORT.md` | — | A/B notes |

#### Roman VO script (v4 hype)

**Job:** `07dbca51-8e55-4152-9c6c-a000142dd041` · **Audio:** `ads/output/FUTURE-IS-HERE-vo-roman-v4-hype.wav`  
**Script file:** `ads/output/FUTURE-IS-HERE-VO-SCRIPT.md`

> Picture this — you walk into the arena, gear up, throw on the headset… and BOOM — you're front row! AI hologram boxers going live. Real crowd. Real energy. The whole world's tuning in. Become a Founding Fan — link in bio!

#### Nano Banana 2 keyframes (Revision 3)

| Beat | File | Nano job ID |
|------|------|-------------|
| 01 Enter the Arena | `ads/master-frames/01-enter-the-arena.png` | `9f11a9f7-aff6-4b74-a8e7-4edcbfa038f2` |
| 02 Gear Up | `ads/master-frames/02-gear-up.png` | `bc8b155f-862e-42fe-8f7c-b33b953f2781` |
| 03 The Fight Begins | `ads/master-frames/03-fight-begins.png` | `c5744bc4-e9fa-49ed-9add-0b283c72521e` |
| 04 The World Is Watching | `ads/master-frames/04-world-watching.png` | `94ca1696-ee58-4dc3-927b-cd40a849f132` |

**Host reference:** `assets/Ads/card-apply.png` · media_id `819d7e88-b1ee-4838-882f-ea53d5933493`  
**Wave reference:** `assets/fighter-cyber.png` · media_id `0e48aecc-a9ac-49ea-9784-b09399185324`

#### Seedance 2.0 clips (5s · trimmed in edit)

| Beat | Seedance job ID | Clip file | Notes |
|------|-----------------|-----------|--------|
| 01 | `e208ecdc-245d-47ea-a2e6-01276b14a88f` | `ads/output/01-enter-the-arena-seedance.mp4` | v1 `1a154d22…` flagged NSFW — regenerated |
| 02 | `dd10679c-0f49-4cff-87f8-fb06fc7e1f14` | `ads/output/02-gear-up-seedance.mp4` | |
| 03 | `dc7cbb2c-173c-4cf8-8f5f-2e7f4e42e3f5` | `ads/output/03-fight-begins-seedance.mp4` | |
| 04 | `19254744-5c3c-41e4-a2dc-49b2c9af947d` | `ads/output/04-world-watching-seedance.mp4` | |

**Seedance settings:** `seedance_2_0` · 5s · `start_image` = Nano job ID above · slow dolly/crane · preserve composition · no dialogue.

**Edit structure:** 2s title + 4 beats @ ~2.75s + 2s CTA · ambient ducked under Roman VO.

---

### Brief 002 — Would You Walk Inside? (15s · 9:16)

**Campaign:** Anticipation trailer · 5 beats × 3s  
**Manifest:** `ads/brief-002/MASTER-FRAMES-MANIFEST.json`  
**Brief:** `ads/brief-002/DIRECTORS-BRIEF-002.md` · **Seedance prompts:** `ads/brief-002/SEEDANCE-SWAP.md`

#### Final exports

| File | Notes |
|------|--------|
| **Master + VO** | `ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-VO.mp4` |
| Seedance ambient | `ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-SEEDANCE.mp4` |
| Instagram Reel | `ads/brief-002/output/INSTAGRAM-REEL-WOULD-YOU-WALK-INSIDE.mp4` |
| TikTok | `ads/brief-002/output/TIKTOK-WOULD-YOU-WALK-INSIDE.mp4` |
| Facebook Reel | `ads/brief-002/output/FACEBOOK-REEL-WOULD-YOU-WALK-INSIDE.mp4` |
| YouTube Shorts | `ads/brief-002/output/YOUTUBE-SHORTS-WOULD-YOU-WALK-INSIDE.mp4` |

#### Roman VO script (v3)

**Job:** `9c2844f4-ef5b-4323-bbdc-32aaa3cfb137` · **Script:** `ads/brief-002/output/WOULD-YOU-WALK-INSIDE-VO-SCRIPT.md`

> Would you walk inside? Behind that glow — something the world has never seen. You gear up. You walk in. And BOOM — AI hologram boxers, live, front row. Real crowd. Real energy. Become a Founding Fan. **The future is waiting.**

#### Frames + Seedance (5s generated · 3s trimmed)

| Scene | Nano job ID | Seedance job ID | Seedance prompt |
|-------|-------------|-----------------|-----------------|
| **01 Would You Walk Inside** | `efd9e6fc-d9e2-4659-85e0-70ced56e5823` | `4cbd7370-bae2-4517-91b1-c5833d8cb4a1` | Slow cinematic dolly push toward glowing cyan inflatable hologram boxing tent at night. Crowd walks forward. Purple fog. Typography WOULD YOU WALK INSIDE? Photorealistic premium trailer. No dialogue. |
| **02 Welcome** | `6761b8ae-3a10-46ef-ba45-a9262837ef28` | `374fc012-7ff0-4f81-a651-52fcd46e2847` | Slow push-in close-up. Security welcomes smiling guests at tent entrance. Every guest wears white VR headset with monogram side strap. Cyan rim light. Exclusive VIP. No dialogue. |
| **03 Tunnel** | `89beb364-ba1b-4b5f-8015-268e852f9aaa` | `50bec302-1732-411a-ad98-2aa3becbc86e` | Steadicam follow behind two guests into blue-lit hexagonal tunnel. Fog on floor. Headsets visible. Mystery — cannot see inside. No dialogue. |
| **04 Arena Glimpse** | `cd2265a9-f2cd-4ce0-8177-5c2ed88d1112` | `b9dd15dd-8494-42ec-8ba4-6ae0cb037fb3` | Slow reveal push forward. Tunnel opens to partial arena glimpse. Blue volumetric light, floor fog, glowing square. Crowd in headsets. Faceless Wave wireframe silhouette max 25%. No dialogue. |
| **05 CTA End Card** | `4284b7e1-3892-4106-9a13-1d00607bcd51` | `a33d1de9-84d9-4fbb-a359-b8a2b6c6c025` | Subtle push-in on end card. Cyan holographic glove logo gentle glow pulse. THE FUTURE IS WAITING BECOME A FOUNDING FAN. No dialogue. |

**Brand refs (scene 04–05):** arena_interior `4d3b873e…` · headset `a80bd13f…` · Wave `7c8931af…` · strap `8e9c76e3…`

---

### Brief 003 — The Evolution of the Fight (~78–86s · 9:16 documentary)

**Campaign:** Historical documentary → AI Hologram Boxing future  
**Manifest:** `ads/brief-003/MASTER-FRAMES-MANIFEST.json`  
**Prompts:** `ads/brief-003/NANO-BANANA-PROMPTS.md` · **Storyboard:** `ads/brief-003/STORYBOARD.md` · **VO:** `ads/brief-003/VO-SCRIPT.md`

#### Final exports (latest)

| Version | File | Duration | Edit |
|---------|------|----------|------|
| **HQ remake (recommended)** | `ads/brief-003/output/EVOLUTION-HQ-9x16-VO.mp4` | ~78s | Photoreal Seedance + fade-black transitions + film grain |
| HQ ambient | `ads/brief-003/output/EVOLUTION-HQ-9x16-ambient.mp4` | ~78s | No VO |
| Montage + Bill VO | `ads/brief-003/output/EVOLUTION-60s-9x16-VO.mp4` | ~86s | Fast montage edit |
| Bill VO track | `ads/brief-003/output/EVOLUTION-vo-documentary-v1.mp3` | ~75s | ElevenLabs Bill |

**Build scripts:** `ads/brief-003/build_evolution_hq.py` · `ads/brief-003/build_evolution_film.py`  
**Generate VO:** `npm run generate:brief003-vo` (requires `ELEVENLABS_API_KEY` in `.env.local`)

#### Bill VO — closing lines (current master)

> Every generation has witnessed the next chapter… This… is ours.  
> A new era of live spectacle is beginning… Where hologram warriors clash… and the crowd wears the future on their eyes.  
> You don't just watch history anymore… You step inside it.  
> Be part of something… truly unforgettable.

#### Nano Banana 2 keyframes (all 10 approved)

| # | Scene | File | Nano job ID |
|---|-------|------|-------------|
| 01 | Prehistoric | `master-frames/01-prehistoric-gathering.png` | `227a737c-4153-4a25-97df-478da3fe78d3` |
| 02 | Egypt | `master-frames/02-egypt-ceremony.png` | `ba262c06-00d0-45d8-88bd-62facd358c07` |
| 03 | Greece | `master-frames/03-greece-olympics.png` | `b21fa97b-ab97-4341-ab53-6af2118de34f` |
| 04 | Rome | `master-frames/04-rome-colosseum.png` | `f322860a-dbef-4c88-9b34-6c7e0a24e1ba` |
| 05 | Asia | `master-frames/05-asia-martial-arts.png` | `3f0fcbd9-ae57-4d6e-bc66-40e47d2257ce` |
| 06 | Modern boxing | `master-frames/06-modern-boxing.png` | `e4bd092d-c135-4032-81f5-af865c140aaa` |
| 07 | Modern UFC | `master-frames/07-modern-ufc.png` | `22441d1c-1cdd-4b00-9c56-094b33fc2499` |
| 08 | Timeline | `master-frames/08-timeline-future-line.png` | `e8d856b0-87cb-4649-bc6b-97adc681267a` |
| 09 | Future tent + Wave | `master-frames/09-future-arena-wave.png` | `c77ccfa3-85c7-4dda-8d33-849128d09049` |
| 10 | CTA end card | `master-frames/10-cta-end-card.png` | `c8b3e222-d6ca-4513-83e7-1fbefc8a4799` |

Full Nano prompts: see `ads/brief-003/NANO-BANANA-PROMPTS.md` (photoreal · ARRI documentary · era-authentic palettes).

#### Seedance 2.0 — HQ photoreal pass (v2 · in `output/hq/`)

| Scene | HQ Seedance job ID | Local clip | Seedance prompt (summary) |
|-------|-------------------|------------|---------------------------|
| 01 Prehistoric | *(NSFW flagged — Ken Burns on still)* | — | National Geographic campfire · families · no weapons |
| 02 Egypt | `16854129-ad2b-429c-a40a-b506bc29be14` | `hq/02-egypt-ceremony.mp4` | Golden hour temple · ritual movement · gimbal push · film grain |
| 03 Greece | `341d8a96-eca6-4694-b5a8-c8f4187a5440` | `hq/03-greece-olympics.mp4` | Marble stadium · athletes · chalk dust · ARRI realism |
| 04 Rome | `a9fcbbe8-ccc0-4287-9bd8-23f3d2af5ce3` | `hq/04-rome-colosseum.mp4` | Colosseum entry · golden dust · no blood |
| 05 Asia | `de5d9cd0-c892-4159-ab25-bf9c68384115` | `hq/05-asia-martial-arts.mp4` | Dawn courtyard · disciplined training · NOT anime |
| 06 Boxing | `50d2d156-35ef-4345-8d9c-0e8882231813` | `hq/06-modern-boxing.mp4` | ESPN/HBO broadcast · sweat in light · NOT CGI |
| 07 UFC | `e00d8e06-f55c-434c-b041-1bdc60f6eec9` | `hq/07-modern-ufc.mp4` | Octagon walkout · live arena camera |
| 08 Timeline | `df67a966-38ae-47f0-8638-5a9af7ab2388` | `hq/08-timeline-future-line.mp4` | Abstract blue timeline · Netflix doc VFX |
| 09 Future | `dd5fbc4a-9b5c-4eb4-950d-4543176f583d` | `hq/09-future-arena-wave.mp4` | Official tent · VR headsets all guests · Wave tease |
| 10 CTA | `33b1dad6-35cb-47dc-9daa-e2a3cec19b18` | `hq/10-cta-end-card.mp4` | Slow push on cyan typography |

**HQ edit:** `fadeblack` crossfades (0.55s) between chapters · subtle film grain · CRF 16–17 · 1080×1920.

#### Seedance 2.0 — original pass (v1 · in `output/`)

| Scene | Seedance job ID | Clip |
|-------|-----------------|------|
| 02–07, 09–10 | See `MASTER-FRAMES-MANIFEST.json` | `02-egypt-ceremony.mp4` … `10-cta-end-card.mp4` |
| 01, 08 | NSFW — Ken Burns fallback | `01-prehistoric-gathering.mp4` · `08-timeline-future-line.mp4` |

---

## Launch catalog — 19 paid/social ads

**Machine-readable catalog:** `ads/ALL-ADS-CATALOG.json` · **Launch hub:** `ads/launch-hub.html`

| ID | Tier | Name | Video file | Meta campaign |
|----|------|------|------------|---------------|
| `walk_inside_001` | Hero | Would You Walk Inside | `brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-VO.mp4` | `CAMP_HB_WalkInside_001` |
| `future_is_here_001_vo` | Hero | The Future Is Here (VO) | `brief-001/output/Director_Brief_001_Version_A_With_VoiceOver.mp4` | `CAMP_HB_FutureIsHere_001` |
| `future_is_here_001_mystery` | Hero | The Future Is Here (Mystery) | `brief-001/output/Director_Brief_001_Version_B_Cinematic_Mystery.mp4` | `CAMP_HB_FutureIsHere_001` |
| `29_waitlist` | UGC | AD_HB_Waitlist_FoundingFan | `ugc/output/ads-avatar-what-is-hologram-boxing-plate.mp4` | `CAMP_HB_Waitlist_001` |
| `01_what_is_waitlist` | UGC | AD_HB_Waitlist_WhatIs | same plate | `CAMP_HB_Waitlist_001` |
| `01_what_is` | UGC | What Is Hologram Boxing? | same plate | `CAMP_HB_Awareness_001` |
| `02_tent` | UGC | Inside the Hologram Tent | `ugc/output/02-the-inflatable-tent-plate.mp4` | `CAMP_HB_Awareness_001` |
| `11_hero` | UGC | Hologram Boxing Is Here | `ugc/output/11-home-hero-brand-plate.mp4` | `CAMP_HB_Awareness_001` |
| `10_all_ages` | UGC | All Ages Welcome | `ugc/output/10-all-ages-family-night-plate.mp4` | `CAMP_HB_Awareness_001` |
| `03_roster` | UGC | Meet the Wave Roster | `ugc/output/03-meet-the-wave-fighters-plate.mp4` | `CAMP_HB_Consideration_001` |
| `13_how_it_works` | UGC | How It Works | `ugc/output/13-how-it-works-four-steps-plate.mp4` | `CAMP_HB_Consideration_001` |
| `04_headset` | UGC | AR Headset Experience | `ugc/output/04-ar-headset-experience-plate.mp4` | `CAMP_HB_Consideration_001` |
| `08_stream` | UGC | Watch Free on Kick & Twitch | `ugc/output/08-watch-free-on-kick-twitch-plate.mp4` | `CAMP_HB_Consideration_001` |
| `32_interactive` | UGC | Live Interactive Stream Effects | `ads/output/32-live-interactive-effects-plate.mp4` | `CAMP_HB_Consideration_001` |
| `14_hb001` | UGC | Hologram Boxing 001 | `ugc/output/14-event-archive-hb001-plate.mp4` | `CAMP_HB_Consideration_001` |
| `15_hb002` | UGC | HB 002 — Book Now | `ugc/output/15-hologram-boxing-002-plate.mp4` | `CAMP_HB_Tickets_001` |
| `05_mvm` | UGC | Book with Me vs Me Crypto | `ugc/output/05-tickets-and-mvm-crypto-plate.mp4` | `CAMP_HB_Tickets_001` |
| `06_prizes` | UGC | $10K Prize Pool | `ugc/output/06-pick-your-fighter-win-prizes-plate.mp4` | `CAMP_HB_Tickets_001` |
| `07_pov` | UGC | Choose Your POV | `ugc/output/07-headset-pov-vs-attendee-pov-plate.mp4` | `CAMP_HB_Tickets_001` |

**Note:** Brief 003 documentary is **not yet** in the launch catalog — add when ready for paid social.

Each catalog entry includes: headline, meta_primary, tiktok_text, UTM path, CTA. See JSON for full copy.

---

## UGC talking-head plates

**Pipeline:** `nano_banana_2` white keyframe → `seedance_2_0` 15s plate → optional `voice_change` (Gia/Skye/DEJ-1)

**Guide:** `ugc/README.md` · **Scripts:** `ugc/01-*.md` … `ugc/32-*.md` · **Ad copy:** `ugc/AD-COPY.md`

### Standard host keyframe prompt block

```
15s 9:16 locked tripod WAIST-UP PURE WHITE #FFFFFF. Meta Quest 3 on forehead:
white visor with THREE BLACK vertical pill sensors, ski-goggle head strap, tiny mic, dark blazer.
Zero camera movement. Visual-only plate OR minimal ambient — voice added via voice_change pass.
```

### Standard Seedance animate step

- Model: `seedance_2_0`
- Duration: 15s (or 2×15s for long scripts — concat)
- Aspect: 9:16
- `start_image` = keyframe job ID
- Locked camera · host delivers script hook + VO lines from each `ugc/*.md` file

### Generated UGC video files

| Script | Output MP4 |
|--------|------------|
| 01 What is hologram boxing | `ugc/output/ads-avatar-what-is-hologram-boxing-plate.mp4` |
| 02 Inflatable tent | `ugc/output/02-the-inflatable-tent-plate.mp4` |
| 03 Wave roster | `ugc/output/03-meet-the-wave-fighters-plate.mp4` |
| 04 AR headset | `ugc/output/04-ar-headset-experience-plate.mp4` |
| 05 MVM tickets | `ugc/output/05-tickets-and-mvm-crypto-plate.mp4` |
| 06 Prize pool | `ugc/output/06-pick-your-fighter-win-prizes-plate.mp4` |
| 07 POV tiers | `ugc/output/07-headset-pov-vs-attendee-pov-plate.mp4` |
| 08 Kick/Twitch | `ugc/output/08-watch-free-on-kick-twitch-plate.mp4` |
| 10 All ages | `ugc/output/10-all-ages-family-night-plate.mp4` |
| 11 Home hero | `ugc/output/11-home-hero-brand-plate.mp4` |
| 13 How it works | `ugc/output/13-how-it-works-four-steps-plate.mp4` |
| 14 HB 001 archive | `ugc/output/14-event-archive-hb001-plate.mp4` |
| 15 HB 002 | `ugc/output/15-hologram-boxing-002-plate.mp4` |
| 32 Live interactive effects | `ugc/output/32-live-interactive-effects-plate.mp4` · `ads/output/32-live-interactive-effects-plate.mp4` |

Per-script Nano + Seedance prompts live inside each `ugc/{id}.md` file (see Script 01 & 32 for full examples).

---

## Source files & manifests

| Resource | Path |
|----------|------|
| All ads catalog (JSON) | `ads/ALL-ADS-CATALOG.json` |
| Brief 001 frames + Seedance | `ads/master-frames/MASTER-FRAMES-MANIFEST.json` |
| Brief 002 frames + Seedance | `ads/brief-002/MASTER-FRAMES-MANIFEST.json` |
| Brief 003 frames + Seedance | `ads/brief-003/MASTER-FRAMES-MANIFEST.json` |
| Voice config | `ads/VOICE-CONFIG.json` |
| Visual prompt rules | `VISUAL-PROMPT-RULES.md` |
| Higgsfield guide | `production-library/12_HIGGSFIELD_GUIDE.md` |
| Launch checklist | `ads/LAUNCH-CHECKLIST.md` |
| Manus all-ads prompt | `ads/MANUS-PROMPT-ALL-17-ADS.md` |

---

## Desktop copies

| Title | Desktop path |
|-------|--------------|
| **Evolution documentary (HQ · watch this)** | `C:\Users\suzet\Desktop\Evolution of the Fight - WATCH THIS.mp4` |
| Evolution (montage version) | `C:\Users\suzet\Desktop\Brief-003-Evolution-Film\` |
| Would You Walk Inside | `C:\Users\suzet\Desktop\WOULD-YOU-WALK-INSIDE-15s-9x16.mp4` |
| Future Is Here Version A | `C:\Users\suzet\Desktop\Director_Brief_001_Version_A_With_VoiceOver.mp4` |
| Future Is Here Version B | `C:\Users\suzet\Desktop\Director_Brief_001_Version_B_Cinematic_Mystery.mp4` |
| Brief 003 master frames | `C:\Users\suzet\Desktop\Brief-003-Master-Frames\` |

---

## Regenerate commands

```bash
# Brief 003 — ElevenLabs Bill VO
npm run generate:brief003-vo

# Brief 003 — HQ documentary (Seedance clips in output/hq/ required)
python ads/brief-003/build_evolution_hq.py

# Brief 003 — montage version
python ads/brief-003/build_evolution_film.py

# Brief 001 — Version B cinematic mystery
python ads/brief-001/build_version_b.py
```

**Higgsfield MCP:** `generate_image` (nano_banana_2) · `generate_video` (seedance_2_0) · `generate_audio` / `voice_change` · `job_status`

---

## Quick reference — models only

```
STILLS  → nano_banana_2
VIDEO   → seedance_2_0   (never Kling)
VO hype → seed_audio Roman
VO doc  → ElevenLabs Bill (pqHfZKP75CvOlQylNhV4)
UGC VO  → voice_change preset Gia / Skye / DEJ-1
```

---

*Generated for Creators AI Hologram Boxing ad production. Update this file whenever new Seedance jobs or final exports are added.*
