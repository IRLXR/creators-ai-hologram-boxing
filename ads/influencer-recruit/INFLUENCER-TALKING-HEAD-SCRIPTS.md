# Influencer Talking-Head Ad Scripts

**Last updated:** July 11, 2026  
**Format:** 15s · 9:16 · voiced UGC plates  
**Landing:** https://www.hologramboxing.com/landing.html  
**UTM campaign:** `influencer_recruit`  
**CTA:** Sign Up  
**Voice:** Skye (`voice_id=1fb253b8-928b-4d29-a349-f242a71eaddf`)  
**Pipeline:** keyframe → `seedance_2_0` 15s → `voice_change` Skye  

**Job tracking:** `INFLUENCER-UGC-JOBS.json`  
**Preview:** `OPEN-INFLUENCER-ADS-PREVIEW.bat`  
**Layer suites:** [L4 retarget](INFLUENCER-L4-RETARGET-SCRIPTS.md) · [L5 countdown](INFLUENCER-L5-COUNTDOWN-SCRIPTS.md)

---

## Production rules (all plates)

| Rule | Spec |
|------|------|
| Background | Pure white `#FFFFFF` (key in post) |
| Framing | Waist-up, locked tripod, centered |
| Prop | Tiny black handheld mic at mouth |
| Movement | Minimal — mic stays at mouth |
| Hook | Spoken + text overlay in first 3s |
| CTA | Sign up at **hologramboxing.com** |
| Do not say | Event number “002” / “HB 002” in VO |

---

## Hosts

| Host | Keyframe | Used in |
|------|----------|---------|
| **Black creator** (lavender crop tank, locs, gold jewelry, mic) | `0f1d806e` · `ugc/output/host-keyframe-v4-social-outfit.png` | Scripts 1–2, 4 |
| **Blazer host** (Quest 3 on forehead, dark blazer, mic) | `916340ac` · `ugc/output/host-keyframe-ads-avatar-quest3-strap.png` | Script 3, L4 partner reviews |

---

## Script 1 — Open Call Exact (WE WANT YOU)

**Source flyer:** `OPEN-CALL-EXACT-COPY.json` / `hf_20260624_011044` poster  
**Output:** `output/INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4`  
**Host:** Black creator  
**Staircase:** L3 Conversion (×6) only  
**UTM content:** `open_call_exact_host`

### Hook overlay (burn in 0:00–0:03)

`OPEN CALL — WE WANT YOU!`

### Full VO (15s — read at TikTok pace)

> Open call for streamers and content creators — **WE WANT YOU!**  
> Kick, Twitch, YouTube, TikTok — co-stream hologram boxing live from the tent.  
> VIP ringside access, brand ambassador roles, co-stream partnerships.  
> Sign up at **hologramboxing.com** — your slot is waiting.

### TikTok / Meta ad copy

**Primary:** OPEN CALL for streamers & content creators. WE WANT YOU — co-stream hologram boxing live. VIP access, brand ambassador roles. Sign up now.

**Headline:** WE WANT YOU!

### Seedance prompt block

```
15s 9:16 locked tripod waist-up PURE WHITE #FFFFFF. Black woman TikTok creator host — locs, lavender-purple crop tank, gold jewelry, tiny black mic at mouth. She says: "Open call for streamers and content creators — WE WANT YOU! Kick, Twitch, YouTube, TikTok — co-stream hologram boxing live from the tent. VIP ringside, brand ambassador roles. Sign up at hologramboxing.com." Photorealistic UGC talking head, zero camera movement.
```

---

## Script 2 — Calling All Streamers

**Source flyer:** `CALLING-ALL-INFLUENCERS-9x16.png`  
**Output:** `output/INFLUENCER-CALLING-ALL-15s-VO.mp4`  
**Host:** Black creator  
**Staircase:** L1 Awareness (×2)  
**UTM content:** `calling_all_host`

### Hook overlay (burn in 0:00–0:03)

`CALLING ALL STREAMERS`

### Full VO (15s)

> **Calling all streamers!** Creators AI Hologram Boxing wants **you** as a co-stream partner.  
> It's the first live AI hologram fight night — your chat controls interactive FX ringside.  
> Bring your audience to the tent. Apply now at **hologramboxing.com**.

### TikTok / Meta ad copy

**Primary:** Calling all streamers — live stream the first AI hologram boxing event. Co-stream partner slots open. Apply now.

**Headline:** Calling All Influencers

### Seedance prompt block

```
15s 9:16 locked tripod waist-up PURE WHITE #FFFFFF. Black woman TikTok creator host — locs, lavender-purple crop tank, gold jewelry, tiny black mic. She says: "Calling all streamers! Creators AI Hologram Boxing wants you as a co-stream partner. It's the first live AI hologram fight night — your chat controls interactive FX ringside. Bring your audience to the tent. Apply now at hologramboxing.com." Photorealistic UGC talking head.
```

---

## Script 3 — Join the Team (Optimized Flyer)

**Source flyer:** `OPEN-CALL-OPTIMIZED-TIKTOK-9x16.png` / `CAMPAIGN-SPEC.json` taglines  
**Output:** `output/INFLUENCER-JOIN-THE-TEAM-15s-VO.mp4`  
**Host:** Blazer + Quest 3  
**Staircase:** L3 Conversion (×6) only  
**UTM content:** `open_call_optimized_host`

### Hook overlay (burn in 0:00–0:03)

`JOIN THE TEAM · STREAM THE FIGHTS`

### Full VO (15s)

> **Be bold. Be live. Stream it!** We're hiring creator partners for hologram boxing.  
> Co-stream partnerships, fight night coverage, VIP tent access — grow your channel with us.  
> Join the team. Sign up at **hologramboxing.com** before partner slots close.

### TikTok / Meta ad copy

**Primary:** Open call for streamers & creators — live stream hologram boxing. We want you. Co-stream partnerships, VIP access. Apply now.

**Headline:** Open Call — We Want You

### Seedance prompt block

```
15s 9:16 locked tripod waist-up PURE WHITE #FFFFFF. Official host — dark blazer, Quest 3 on forehead, tiny mic, warm direct smile. She says: "Be bold. Be live. Stream it! We're hiring creator partners for hologram boxing. Co-stream partnerships, fight night coverage, VIP tent access — grow your channel with us. Join the team. Sign up at hologramboxing.com before partner slots close." Natural UGC speech, minimal gestures, photorealistic.
```

---

---

## L4 retargeting suite (Scripts 4–7)

All L4 talking heads target **landing visitors 7d · excluding leads**. Each ad slot uses a different retargeting angle:

| Script | Angle | Replaces silent poster | L4 slots |
|--------|-------|------------------------|----------|
| **4** | Finish open call | — | Open Call Exact ×2 |
| **5** | Partner reviews + roster | `PARTNER-SPOTLIGHT-15s.mp4` | Partner Spotlight ×2 |
| **6** | You looked — slots filling | `CREATOR-REMINDER-15s.mp4` | Reminder ×2 |
| **7** | Streamer reviews (A/B) | optional swap for Script 5 | — |

**L4 retargeting rules (all scripts):** recognition or social proof · no cold discovery · no “002” in VO · Sign Up CTA · save countdown panic for L5.

### Hook mix (6 unique overlays)

| Ad slot | Hook |
|---------|------|
| Partner Spotlight · Gaming | `WHAT STREAMERS ARE SAYING` |
| Partner Spotlight · Creators | `CREATORS ARE ALREADY IN` |
| Reminder · Gaming | `STILL THINKING ABOUT IT?` |
| Reminder · Creators | `YOU LOOKED — SLOTS ARE FILLING` |
| Open Call · Gaming | `YOUR SPOT'S STILL OPEN` |
| Open Call · Creators | `YOU LOOKED — FINISH YOUR APPLICATION` |

Same VO MP4 per creative — burn different hook in post per ad slot. See `INFLUENCER-L4-RETARGET-SCRIPTS.md`.

---

## Script 4 — L4 Retarget Open Call (Finish Application)

**Audience:** Landing visitors 7d (pixel retarget) · streamers, creators, influencers · FL · excluding leads  
**Output:** `output/INFLUENCER-L4-RETARGET-OPEN-CALL-15s-VO.mp4`  
**Host:** Black creator  
**Staircase:** L4 Retargeting (×2) only  
**UTM content:** `l4_retarget_open_call_host`  
**Status:** Script ready · **regenerate video** before TikTok swap

### Why L4 ≠ L3 (retargeting best practices)

| Principle | How this script applies |
|-----------|-------------------------|
| **Recognition** | Opens with “you checked us out” — mirrors their prior visit |
| **No cold re-pitch** | Assumes they know hologram boxing; one benefit line only |
| **Friction removal** | “Finish your application” + “your spot's still open” |
| **Light urgency** | “Partner slots filling” — not countdown panic (save that for L5) |
| **Same layer CTA** | Sign Up / finish application — not Learn More |
| **Warm UGC tone** | Direct eye contact, comeback energy — not discovery hype |

### Hook overlay (burn in 0:00–0:03)

Gaming: `YOUR SPOT'S STILL OPEN` · Creators: `YOU LOOKED — FINISH YOUR APPLICATION`

### Full VO (15s)

> **Hey — you checked us out.** Open call's still live for streamers and creators.  
> Co-stream hologram boxing from the tent — VIP ringside, live FX your chat controls, partner slots filling.  
> **Finish your application** at **hologramboxing.com**. Your spot's still open.

### TikTok / Meta ad copy

**Primary:** You looked — streamer and creator partner slots are filling. Finish your application at hologramboxing.com.

**Headline:** Your Spot's Still Open

**Alt primary:** Open call's still live for Kick, Twitch, and TikTok creators. Co-stream hologram boxing — finish your signup.

### Seedance prompt block

```
15s 9:16 locked tripod waist-up PURE WHITE #FFFFFF. Black woman TikTok creator host — locs, lavender-purple crop tank, gold jewelry, tiny black mic at mouth. Warm direct eye contact, subtle urgency. She says: "Hey — you checked us out. Open call's still live for streamers and creators. Co-stream hologram boxing from the tent — VIP ringside, live FX your chat controls, partner slots filling. Finish your application at hologramboxing.com. Your spot's still open." Photorealistic UGC talking head, zero camera movement.
```

---

## Script 5 — L4 Partner Reviews & Social Proof

**Output:** `output/INFLUENCER-L4-PARTNER-REVIEWS-15s-VO.mp4`  
**Host:** Blazer + Quest 3  
**Staircase:** L4 Partner Spotlight (×2)  
**UTM content:** `l4_partner_reviews_host`  
**Status:** Script ready · video pending

### Hook overlay

Gaming: `WHAT STREAMERS ARE SAYING` · Creators: `CREATORS ARE ALREADY IN`

### Full VO (15s)

> **Creators on Kick, Twitch, and TikTok are locking partner slots** — and the reviews are wild.  
> Streamers say the tent content is insane — live FX your chat controls, VIP ringside, easy co-stream.  
> Your slot's still open. Sign up at **hologramboxing.com**.

### TikTok / Meta ad copy

**Primary:** Confirmed creators are locking co-stream slots. Streamers say the tent content is insane — your turn. Sign up.

**Headline:** Creators Are Already In

### Seedance prompt block

```
15s 9:16 locked tripod waist-up PURE WHITE #FFFFFF. Official host — dark blazer, Quest 3 on forehead, tiny mic, confident warm smile. She says: "Creators on Kick, Twitch, and TikTok are locking partner slots — and the reviews are wild. Streamers say the tent content is insane — live FX your chat controls, VIP ringside, easy co-stream. Your slot's still open. Sign up at hologramboxing.com." Photorealistic UGC talking head, zero camera movement.
```

---

## Script 6 — L4 Reminder (Slots Filling)

**Output:** `output/INFLUENCER-L4-REMINDER-SLOTS-15s-VO.mp4`  
**Host:** Black creator  
**Staircase:** L4 Reminder (×2)  
**UTM content:** `l4_reminder_slots_host`  
**Status:** Script ready · video pending

### Hook overlay

Gaming: `STILL THINKING ABOUT IT?` · Creators: `YOU LOOKED — SLOTS ARE FILLING`

### Full VO (15s)

> **You were on our page** — still thinking about co-streaming hologram boxing?  
> Partner slots are filling. Bring your chat ringside — live interactive FX, VIP tent access, content your audience hasn't seen.  
> **Finish your application** at **hologramboxing.com**. Takes thirty seconds.

### TikTok / Meta ad copy

**Primary:** You looked — streamer partner slots are filling. Finish your application at hologramboxing.com.

**Headline:** Streamer Slots Filling

### Seedance prompt block

```
15s 9:16 locked tripod waist-up PURE WHITE #FFFFFF. Black woman TikTok creator host — locs, lavender-purple crop tank, gold jewelry, tiny black mic. Warm nudge energy. She says: "You were on our page — still thinking about co-streaming hologram boxing? Partner slots are filling. Bring your chat ringside — live interactive FX, VIP tent access, content your audience hasn't seen. Finish your application at hologramboxing.com. Takes thirty seconds." Photorealistic UGC talking head.
```

---

## Script 7 — L4 Streamer Reviews (A/B variant)

**Output:** `output/INFLUENCER-L4-STREAMER-REVIEWS-15s-VO.mp4`  
**Host:** Black creator  
**Use:** A/B test vs Script 5 on Partner Spotlight slots  
**UTM content:** `l4_streamer_reviews_host`  
**Status:** Script ready · optional A/B

### Hook overlay

`WHAT STREAMERS ARE SAYING`

### Full VO (15s)

> I keep hearing the same thing from streamers who checked out the tent — **this is the hype content their channels need**.  
> Co-stream hologram boxing live. Interactive FX your chat controls. VIP ringside access.  
> Partner slots are open — join the roster at **hologramboxing.com**.

### TikTok / Meta ad copy

**Primary:** Streamers who toured the tent say this is the hype content their channels need. Co-stream hologram boxing — apply now.

**Headline:** What Streamers Are Saying

### Seedance prompt block

```
15s 9:16 locked tripod waist-up PURE WHITE #FFFFFF. Black woman TikTok creator host — locs, lavender crop tank, gold jewelry, tiny black mic. Conversational testimonial energy. She says: "I keep hearing the same thing from streamers who checked out the tent — this is the hype content their channels need. Co-stream hologram boxing live. Interactive FX your chat controls. VIP ringside access. Partner slots are open — join the roster at hologramboxing.com." Photorealistic UGC talking head.
```

---

## L4 ad confirmation suite (Scripts 43–45)

**Pattern:** 2nd-touch retarget — host validates a prior L4 ad (*“that ice cream ad was right — go buy it”*). See `INFLUENCER-L4-RETARGET-SCRIPTS.md`.

| Script | Confirms | Hook (Gaming / Creators) | Output |
|--------|----------|--------------------------|--------|
| **43** | Script 37 partner ad | `THAT PARTNER AD? IT'S REAL` / `YES — CREATORS ARE SIGNING UP` | `INFLUENCER-L4-CONFIRMS-PARTNER-AD-15s-VO.mp4` |
| **44** | Script 38 reminder ad | `THAT REMINDER AD? FACTS` / `YES — SLOTS ARE FILLING` | `INFLUENCER-L4-CONFIRMS-REMINDER-AD-15s-VO.mp4` |
| **45** | Script 36 open call ad | `THAT OPEN CALL AD? LEGIT` / `YES — THEY WANT CREATORS` | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-AD-15s-VO.mp4` |

**Host:** Black creator · `0f1d806e` · per-script files `ugc/43–45-*.md`

---

---

## L5 countdown suite (Scripts 40–42)

Turn on **≤14 days** to `nextEventDate` in `site-config.json`. All L5 plates use **hard deadline** energy — roster locks, applications close, countdown live on site.

| Script | Angle | Replaces | L5 slots |
|--------|-------|----------|----------|
| **40** | Countdown at zero | `COUNTDOWN-TIMER-15s.mp4` | Countdown Timer ×2 |
| **41** | Last call for streamers | `STREAMER-LAST-CALL-15s.mp4` | Last Call ×2 |
| **42** | Open call closes soon | `INFLUENCER-JOIN-THE-TEAM` on L5 | Open Call Opt ×2 |

**L5 rules:** deadline + scarcity · lock your slot · no “002” in VO · peer urgency (41/42) vs official timer (40).

### Path to 10/10 creative score

| Requirement | Status |
|-------------|--------|
| Distinct script per funnel layer (L1→L5) | ✅ |
| Voiced UGC on all conversion + retarget + countdown slots | ⏳ generate L4/L5 MP4s |
| Creator-native language (co-stream, chat FX, Kick/Twitch) | ✅ all scripts |
| L4 soft urgency → L5 hard close escalation | ✅ |
| No fan-VO bleed on creator ads (Blocker 3) | ⏳ separate task |
| TikTok/Meta serving correct MP4s | ⏳ re-upload after generation |

---

## Script 40 — L5 Countdown Timer (Slots Close at Zero)

**Output:** `output/INFLUENCER-L5-COUNTDOWN-TIMER-15s-VO.mp4`  
**Host:** Blazer + Quest 3  
**UTM content:** `l5_countdown_timer_host`

### Hook overlay

`PARTNER SLOTS CLOSE AT ZERO` · Alt: `COUNTDOWN IS LIVE`

### Full VO (15s)

> **The fight night countdown is live** on hologramboxing.com — streamer partner slots close when it hits zero.  
> Co-stream hologram boxing. VIP ringside. Live FX your chat controls.  
> **Lock your co-stream slot now** — before the roster fills.

### TikTok / Meta ad copy

**Primary:** Partner slots close when the countdown hits zero. Co-stream hologram boxing — lock your slot at hologramboxing.com.

**Headline:** Countdown Is Live

### Seedance prompt block

```
15s 9:16 locked tripod waist-up PURE WHITE #FFFFFF. Official host — dark blazer, Quest 3 on forehead, tiny mic, urgent confident delivery. She says: "The fight night countdown is live on hologramboxing.com — streamer partner slots close when it hits zero. Co-stream hologram boxing. VIP ringside. Live FX your chat controls. Lock your co-stream slot now — before the roster fills." Photorealistic UGC talking head, zero camera movement.
```

---

## Script 41 — L5 Last Call for Streamers

**Output:** `output/INFLUENCER-L5-LAST-CALL-STREAMERS-15s-VO.mp4`  
**Host:** Black creator  
**UTM content:** `l5_last_call_streamers_host`

### Hook overlay

`LAST CALL FOR STREAMERS` · Alt: `PARTNER SLOTS CLOSING`

### Full VO (15s)

> **Last call for streamers** — partner slots are closing and we're locking the co-stream roster.  
> Hologram boxing goes live from the tent. Bring your chat ringside. Interactive FX. VIP access.  
> **This is it.** Sign up at **hologramboxing.com** before applications close.

### TikTok / Meta ad copy

**Primary:** LAST CALL — streamer partner slots closing. Co-stream hologram boxing before the roster locks. Sign up now.

**Headline:** Last Call for Streamers

### Seedance prompt block

```
15s 9:16 locked tripod waist-up PURE WHITE #FFFFFF. Black woman TikTok creator host — locs, lavender-purple crop tank, gold jewelry, tiny black mic. Urgent peer energy, streamer-to-streamer. She says: "Last call for streamers — partner slots are closing and we're locking the co-stream roster. Hologram boxing goes live from the tent. Bring your chat ringside. Interactive FX. VIP access. This is it. Sign up at hologramboxing.com before applications close." Photorealistic UGC talking head, zero camera movement.
```

---

## Script 42 — L5 Final Slots Closing

**Output:** `output/INFLUENCER-L5-FINAL-SLOTS-CLOSING-15s-VO.mp4`  
**Host:** Black creator  
**UTM content:** `l5_final_slots_closing_host`  
**Note:** Replaces Script 35 on L5 only — Script 35 stays L3 cold conversion.

### Hook overlay

`OPEN CALL CLOSES SOON` · Alt: `FINAL PARTNER SLOTS`

### Full VO (15s)

> **Open call is closing** — final co-stream partner slots for hologram boxing fight night.  
> Kick, Twitch, TikTok — go live with VIP tent access and clip-worthy content your audience hasn't seen.  
> **Last chance.** Apply at **hologramboxing.com** now.

### TikTok / Meta ad copy

**Primary:** Open call closing soon — stream hologram boxing live. Final co-stream partner slots. Apply now.

**Headline:** Open Call Closing Soon

### Seedance prompt block

```
15s 9:16 locked tripod waist-up PURE WHITE #FFFFFF. Black woman TikTok creator host — locs, lavender crop tank, gold jewelry, tiny black mic. Final-call energy. She says: "Open call is closing — final co-stream partner slots for hologram boxing fight night. Kick, Twitch, TikTok — go live with VIP tent access and clip-worthy content your audience hasn't seen. Last chance. Apply at hologramboxing.com now." Photorealistic UGC talking head, zero camera movement.
```

---

## Flyer source copy (reference)

From `OPEN-CALL-EXACT-COPY.json` / `CAMPAIGN-SPEC.json` — use for graphics, not verbatim VO:

**Headline:** OPEN CALL FOR STREAMERS & CONTENT CREATORS  
**Sub:** WE WANT YOU!  
**Taglines:** BE BOLD. BE LIVE. STREAM IT! · JOIN THE TEAM. STREAM THE FIGHTS. GROW YOUR CHANNEL!

**Looking for:** Kick & Twitch Streamers · YouTube Creators · TikTok & Reel Creators · Social Media Influencers · Event Hype Teams

**Opportunities:** Live Fight Night Streaming Access · Co-Stream Partnerships · Hologram Boxing Event Coverage · Brand Ambassador Roles · Exclusive VIP Ringside Access

---

## Staircase map

| Script | Video file | Layers |
|--------|------------|--------|
| Calling All | `INFLUENCER-CALLING-ALL-15s-VO.mp4` | L1 ×2 |
| Open Call Exact | `INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4` | L3 ×6 |
| Join the Team | `INFLUENCER-JOIN-THE-TEAM-15s-VO.mp4` | L3 ×6 |
| L4 Retarget Open Call | `INFLUENCER-L4-RETARGET-OPEN-CALL-15s-VO.mp4` | L4 Open Call ×2 |
| L4 Partner Reviews | `INFLUENCER-L4-PARTNER-REVIEWS-15s-VO.mp4` | L4 Spotlight ×2 |
| L4 Reminder Slots | `INFLUENCER-L4-REMINDER-SLOTS-15s-VO.mp4` | L4 Reminder ×2 |
| L4 Streamer Reviews (A/B) | `INFLUENCER-L4-STREAMER-REVIEWS-15s-VO.mp4` | optional A/B |
| L4 Confirms Partner Ad | `INFLUENCER-L4-CONFIRMS-PARTNER-AD-15s-VO.mp4` | L4 ConfirmsPartner ×2 |
| L4 Confirms Reminder Ad | `INFLUENCER-L4-CONFIRMS-REMINDER-AD-15s-VO.mp4` | L4 ConfirmsReminder ×2 |
| L4 Confirms Open Call Ad | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-AD-15s-VO.mp4` | L4 ConfirmsOpenCall ×2 |
| L5 Countdown Timer | `INFLUENCER-L5-COUNTDOWN-TIMER-15s-VO.mp4` | L5 Timer ×2 |
| L5 Last Call Streamers | `INFLUENCER-L5-LAST-CALL-STREAMERS-15s-VO.mp4` | L5 Last Call ×2 |
| L5 Final Slots Closing | `INFLUENCER-L5-FINAL-SLOTS-CLOSING-15s-VO.mp4` | L5 Open Call Opt ×2 |

**Talking-head coverage:** **30 of 48** slots when L4 + L5 suites are generated (+ L1/L3 live today)

---

## Regeneration checklist

1. Edit VO in this file (or per-script files in `ugc/33–42-*.md`)
2. `generate_video` — `seedance_2_0`, 15s, 9:16, `start_image` = host keyframe job ID
3. `voice_change` — Skye on Seedance `job_id`
4. Download to `output/` · update `INFLUENCER-UGC-JOBS.json`
5. Preview via `INFLUENCER-42-ADS-PREVIEW.html`

**Per-script files:**  
- `ugc/33-influencer-open-call-exact.md`  
- `ugc/34-influencer-calling-all.md`  
- `ugc/35-influencer-join-the-team.md`  
- `ugc/36-influencer-l4-retarget-open-call.md`  
- `ugc/37-influencer-l4-partner-reviews.md`  
- `ugc/38-influencer-l4-reminder-slots.md`  
- `ugc/39-influencer-l4-streamer-reviews-ab.md`  
- `ugc/40-influencer-l5-countdown-timer.md`  
- `ugc/41-influencer-l5-last-call-streamers.md`  
- `ugc/42-influencer-l5-final-slots-closing.md`  
- `ugc/43-influencer-l4-confirms-partner-ad.md`  
- `ugc/44-influencer-l4-confirms-reminder-ad.md`  
- `ugc/45-influencer-l4-confirms-open-call-ad.md`
