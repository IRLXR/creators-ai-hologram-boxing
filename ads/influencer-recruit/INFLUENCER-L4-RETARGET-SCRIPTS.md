# L4 Retargeting — Talking-Head Scripts

**Last updated:** July 11, 2026  
**Layer:** L4 Come Back · Retargeting  
**Campaign:** `CAMP_HB_Influencer_L4_ComeBack_001`  
**Audience:** Landing visitors 7d · streamers, creators, influencers · FL · **excluding leads**  
**Ads:** 12 (6 direct retarget + 6 ad-confirmation · 6 creatives × 2 ad groups)  
**CTA:** Sign Up  
**Voice:** Skye · Pipeline: keyframe → `seedance_2_0` 15s → `voice_change`

**Per-script files:** `ugc/36–45-*.md` · **Jobs:** `INFLUENCER-UGC-JOBS.json` · **Preview:** `INFLUENCER-42-ADS-PREVIEW.html`

---

## Suite overview

| # | Script file | Angle | Output MP4 | L4 ad slots |
|---|-------------|-------|------------|-------------|
| 36 | `36-influencer-l4-retarget-open-call.md` | Finish open call | `INFLUENCER-L4-RETARGET-OPEN-CALL-15s-VO.mp4` | Open Call Exact ×2 |
| 37 | `37-influencer-l4-partner-reviews.md` | Reviews + roster | `INFLUENCER-L4-PARTNER-REVIEWS-15s-VO.mp4` | Partner Spotlight ×2 |
| 38 | `38-influencer-l4-reminder-slots.md` | You looked — slots filling | `INFLUENCER-L4-REMINDER-SLOTS-15s-VO.mp4` | Reminder ×2 |
| 39 | `39-influencer-l4-streamer-reviews-ab.md` | Testimonial A/B | `INFLUENCER-L4-STREAMER-REVIEWS-15s-VO.mp4` | optional vs 37 |

### Ad confirmation suite (2nd touch — “that ad was right”)

Host **agrees with** a prior L4 ad the viewer saw. Ice-cream pattern: *“You saw that ad? They're not lying — go get it.”*

| # | Script file | Confirms | Output MP4 | L4 slots |
|---|-------------|----------|------------|----------|
| 43 | `43-influencer-l4-confirms-partner-ad.md` | Script 37 partner/reviews ad | `INFLUENCER-L4-CONFIRMS-PARTNER-AD-15s-VO.mp4` | ConfirmsPartner ×2 |
| 44 | `44-influencer-l4-confirms-reminder-ad.md` | Script 38 reminder ad | `INFLUENCER-L4-CONFIRMS-REMINDER-AD-15s-VO.mp4` | ConfirmsReminder ×2 |
| 45 | `45-influencer-l4-confirms-open-call-ad.md` | Script 36 open call ad | `INFLUENCER-L4-CONFIRMS-OPEN-CALL-AD-15s-VO.mp4` | ConfirmsOpenCall ×2 |

**Deploy tip:** Sequence confirmation ads **after** the direct L4 ad they reference (frequency cap 3–5/day retarget).

---

## L4 rules (all scripts)

| Do | Don't |
|----|-------|
| Recognition (“you checked us out”) or social proof | Cold discovery pitch (that's L3) |
| “Finish your application” / friction kill | Guilt-trip |
| Light urgency — “slots filling” | Countdown panic (that's L5) |
| Sign Up CTA | Say “002” / “HB 002” in VO |

**Turn on when:** Pixel has landing visitors 7d excluding Lead.

---

## Hook mix (6 ads · no duplicate overlays)

Each L4 ad slot gets a **different** burn-in hook. Same VO video per creative; swap hook in post (or generate 2 MP4s per script with hook in Seedance prompt).

| Ad slot | Creative | Hook overlay |
|---------|----------|--------------|
| Partner Spotlight · Gaming | Script 37 | `WHAT STREAMERS ARE SAYING` |
| Partner Spotlight · Creators | Script 37 | `CREATORS ARE ALREADY IN` |
| Reminder · Gaming | Script 38 | `STILL THINKING ABOUT IT?` |
| Reminder · Creators | Script 38 | `YOU LOOKED — SLOTS ARE FILLING` |
| Open Call Exact · Gaming | Script 36 | `YOUR SPOT'S STILL OPEN` |
| Open Call Exact · Creators | Script 36 | `YOU LOOKED — FINISH YOUR APPLICATION` |

**Pool (rotate, don't repeat on adjacent retarget impressions):**  
`CREATORS ARE ALREADY IN` · `WHAT STREAMERS ARE SAYING` · `YOU LOOKED — SLOTS ARE FILLING` · `STILL THINKING ABOUT IT?` · `YOUR SPOT'S STILL OPEN` · `YOU LOOKED — FINISH YOUR APPLICATION`

---

## Script 36 — Finish Open Call

**Host:** Black creator · `0f1d806e`  
**UTM:** `l4_retarget_open_call_host`  
**Replaces:** cold L3 open call on L4 slots

**Hook:** `YOUR SPOT'S STILL OPEN` (Gaming) · `YOU LOOKED — FINISH YOUR APPLICATION` (Creators)

**VO (15s):**

> **Hey — you checked us out.** Open call's still live for streamers and creators.  
> Co-stream hologram boxing from the tent — VIP ringside, live FX your chat controls, partner slots filling.  
> **Finish your application** at **hologramboxing.com**. Your spot's still open.

**Ad copy:** You looked — partner slots are filling. Finish your application at hologramboxing.com.  
**Headline:** Your Spot's Still Open

---

## Script 37 — Partner Reviews & Social Proof

**Host:** Blazer + Quest 3 · `916340ac`  
**UTM:** `l4_partner_reviews_host`  
**Replaces:** `PARTNER-SPOTLIGHT-15s.mp4`  
**Roster ref:** `CONFIRMED-PARTNERS.json`

**Hook:** `WHAT STREAMERS ARE SAYING` (Gaming) · `CREATORS ARE ALREADY IN` (Creators)

**VO (15s):**

> **Creators on Kick, Twitch, and TikTok are locking partner slots** — and the reviews are wild.  
> Streamers say the tent content is insane — live FX your chat controls, VIP ringside, easy co-stream.  
> Your slot's still open. Sign up at **hologramboxing.com**.

**Ad copy:** Confirmed creators are locking co-stream slots. Streamers say the tent content is insane — your turn.  
**Headline:** Creators Are Already In

---

## Script 38 — Reminder (Slots Filling)

**Host:** Black creator · `0f1d806e`  
**UTM:** `l4_reminder_slots_host`  
**Replaces:** `CREATOR-REMINDER-15s.mp4`

**Hook:** `STILL THINKING ABOUT IT?` (Gaming) · `YOU LOOKED — SLOTS ARE FILLING` (Creators)

**VO (15s):**

> **You were on our page** — still thinking about co-streaming hologram boxing?  
> Partner slots are filling. Bring your chat ringside — live interactive FX, VIP tent access, content your audience hasn't seen.  
> **Finish your application** at **hologramboxing.com**. Takes thirty seconds.

**Ad copy:** You looked — streamer partner slots are filling. Finish your application at hologramboxing.com.  
**Headline:** Streamer Slots Filling

---

## Script 39 — Streamer Reviews (A/B)

**Host:** Black creator · `0f1d806e`  
**UTM:** `l4_streamer_reviews_host`  
**Use:** A/B vs Script 37 on Partner Spotlight slots

**Hook:** `WHAT STREAMERS ARE SAYING`

**VO (15s):**

> I keep hearing the same thing from streamers who checked out the tent — **this is the hype content their channels need**.  
> Co-stream hologram boxing live. Interactive FX your chat controls. VIP ringside access.  
> Partner slots are open — join the roster at **hologramboxing.com**.

**Ad copy:** Streamers who toured the tent say this is the hype content their channels need. Co-stream hologram boxing — apply now.  
**Headline:** What Streamers Are Saying

---

## Script 43 — Confirms Partner Ad

**Host:** Black creator · `0f1d806e`  
**Confirms:** Script 37  
**Hook Gaming:** `THAT PARTNER AD? IT'S REAL` · **Creators:** `YES — CREATORS ARE SIGNING UP`

**VO:** You probably saw that partner ad — creators locking co-stream slots? **It's true.** Kick and Twitch streamers are signing up. VIP tent, live FX — reviews aren't fluff. **Finish at hologramboxing.com** like they said.

---

## Script 44 — Confirms Reminder Ad

**Host:** Black creator  
**Confirms:** Script 38  
**Hook Gaming:** `THAT REMINDER AD? FACTS` · **Creators:** `YES — SLOTS ARE FILLING`

**VO:** That reminder ad about slots filling — **yeah, that's real.** I checked the site. Co-stream spots going. **Don't sleep on it** — apply at hologramboxing.com.

---

## Script 45 — Confirms Open Call Ad

**Host:** Black creator  
**Confirms:** Script 36  
**Hook Gaming:** `THAT OPEN CALL AD? LEGIT` · **Creators:** `YES — THEY WANT CREATORS`

**VO:** Saw the open call ad? **Not clickbait** — they want streamers. Co-stream from the tent, clip-worthy content. I almost didn't apply. **Do it** — hologramboxing.com.

---

## Regeneration

1. Edit VO in per-script `ugc/36–45-*.md` files  
2. `generate_video` — `seedance_2_0`, 15s, 9:16, host keyframe  
3. `voice_change` — Skye  
4. Save to `output/` · update `INFLUENCER-UGC-JOBS.json`
