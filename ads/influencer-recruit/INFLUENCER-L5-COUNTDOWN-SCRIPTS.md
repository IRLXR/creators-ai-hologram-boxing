# L5 Countdown — Talking-Head Scripts

**Last updated:** July 11, 2026  
**Layer:** L5 Show Up · Countdown / urgency  
**Campaign:** `CAMP_HB_Influencer_L5_ShowUp_001`  
**Audience:** Streamers & creators · FL · warm + retarget  
**Ads:** 6 (3 creatives × 2 ad groups)  
**CTA:** Sign Up · Lock your slot  
**Voice:** Skye · Pipeline: keyframe → `seedance_2_0` 15s → `voice_change`

**Countdown sync:** `site-config.json` → `nextEventDate` (currently `2026-08-15`)  
**Turn on when:** ≤14 days to fight night  
**Per-script files:** `ugc/40–42-*.md` · **Jobs:** `INFLUENCER-UGC-JOBS.json`

---

## Suite overview

| # | Script file | Angle | Output MP4 | L5 ad slots |
|---|-------------|-------|------------|-------------|
| 40 | `40-influencer-l5-countdown-timer.md` | Timer closes at zero | `INFLUENCER-L5-COUNTDOWN-TIMER-15s-VO.mp4` | Countdown Timer ×2 |
| 41 | `41-influencer-l5-last-call-streamers.md` | Last call for streamers | `INFLUENCER-L5-LAST-CALL-STREAMERS-15s-VO.mp4` | Last Call ×2 |
| 42 | `42-influencer-l5-final-slots-closing.md` | Open call closes | `INFLUENCER-L5-FINAL-SLOTS-CLOSING-15s-VO.mp4` | Open Call Opt ×2 |

---

## L5 rules (all scripts)

| L4 retarget | L5 countdown |
|-------------|--------------|
| “Slots are filling” | “Slots **close**” / roster **locks** |
| Finish application | **Lock your slot now** |
| Soft comeback | Hard deadline |

**Do:** deadline · scarcity · co-stream + live FX · single urgent CTA  
**Don't:** say “002” / “HB 002” in VO · re-explain whole product · guilt-trip

---

## Script 40 — Countdown Timer

**Host:** Blazer + Quest 3 · `916340ac`  
**UTM:** `l5_countdown_timer_host`  
**Replaces:** `COUNTDOWN-TIMER-15s.mp4`

**Hook:** `PARTNER SLOTS CLOSE AT ZERO` · Alt: `COUNTDOWN IS LIVE`

**VO (15s):**

> **The fight night countdown is live** on hologramboxing.com — streamer partner slots close when it hits zero.  
> Co-stream hologram boxing. VIP ringside. Live FX your chat controls.  
> **Lock your co-stream slot now** — before the roster fills.

**Ad copy:** Partner slots close when the countdown hits zero. Co-stream hologram boxing — lock your slot at hologramboxing.com.  
**Headline:** Countdown Is Live

**Note:** Regenerate VO if countdown copy changes materially (<7 days out).

---

## Script 41 — Last Call for Streamers

**Host:** Black creator · `0f1d806e`  
**UTM:** `l5_last_call_streamers_host`  
**Replaces:** `STREAMER-LAST-CALL-15s.mp4`

**Hook:** `LAST CALL FOR STREAMERS` · Alt: `PARTNER SLOTS CLOSING`

**VO (15s):**

> **Last call for streamers** — partner slots are closing and we're locking the co-stream roster.  
> Hologram boxing goes live from the tent. Bring your chat ringside. Interactive FX. VIP access.  
> **This is it.** Sign up at **hologramboxing.com** before applications close.

**Ad copy:** LAST CALL — streamer partner slots closing. Co-stream hologram boxing before the roster locks. Sign up now.  
**Headline:** Last Call for Streamers

---

## Script 42 — Final Slots Closing

**Host:** Black creator · `0f1d806e`  
**UTM:** `l5_final_slots_closing_host`  
**Replaces:** `INFLUENCER-JOIN-THE-TEAM` on L5 (Script 35 stays L3 only)

**Hook:** `OPEN CALL CLOSES SOON` · Alt: `FINAL PARTNER SLOTS`

**VO (15s):**

> **Open call is closing** — final co-stream partner slots for hologram boxing fight night.  
> Kick, Twitch, TikTok — go live with VIP tent access and clip-worthy content your audience hasn't seen.  
> **Last chance.** Apply at **hologramboxing.com** now.

**Ad copy:** Open call closing soon — stream hologram boxing live. Final co-stream partner slots. Apply now.  
**Headline:** Open Call Closing Soon

---

## Escalation ladder (L4 → L5)

| Layer | Sample hook | Energy |
|-------|-------------|--------|
| L4 | “You looked — finish your application” | Warm nudge |
| L4 | “Creators are already in” | Social proof |
| **L5** | **“Last call for streamers”** | **Hard close** |
| **L5** | **“Countdown is live — slots close at zero”** | **Deadline** |

---

## Regeneration

1. Edit VO in `ugc/40–42-*.md`  
2. `generate_video` — `seedance_2_0`, 15s, 9:16, host keyframe  
3. `voice_change` — Skye  
4. Save to `output/` · update `INFLUENCER-UGC-JOBS.json`  
5. Optional poster B-roll: `python ads/influencer-recruit/build-staircase-creatives.py`
