# Paid Ads Guide — UGC Host + Green Screen

These scripts are built to run as **paid social ads** (Meta, TikTok, YouTube Shorts), not organic posts only. Export **three lengths** from each master script.

---

## Ad specs

| Platform | Primary format | Lengths to export | Safe zone |
|----------|----------------|-------------------|-----------|
| **Meta** (FB + IG Reels/Stories) | 9:16 | 15s · 30s · 6s bumper | Keep face + CTA above bottom 250px (UI overlap) |
| **TikTok** | 9:16 | 15s · 30s | CTA + logo above bottom 320px |
| **YouTube Shorts** | 9:16 | 15s · 30s | End card last 3s |
| **Kick/Twitch promo** | 16:9 optional | 30s | Lower-third CTA |

**Default deliverable:** 9:16 · **15s ad cut** (primary) + **30s ad cut** (retargeting).

---

## Ad edit rules (on top of green-screen rules)

1. **Hook first** — bold text overlay + spoken line in **0:00–0:03**. No logo fade-in before the hook.
2. **No “link in bio”** in paid cuts — use **“Tap below”**, **“Book now”**, or show URL on end card.
3. **End card (last 3s)** — logo, one CTA line, destination URL (or platform CTA button handles click).
4. **Captions burned in** — always (sound-off viewers).
5. **Music** — low bed under VO OK for ads; keep VO clear.
6. **Graphics** — punch in B-roll on every `[GRAPHIC:]` cue; don’t leave host on green for more than 5s straight.

### Length templates

**15s ad cut**

```
0:00–0:03  Hook (spoken + text overlay)
0:03–0:11  One proof point (tent / fight / prize / POV)
0:11–0:12  CTA spoken
0:12–0:15  End card — logo + “Book Now” + URL
```

**30s ad cut**

```
Use full script VO from each .md file — trim “link in bio” → “Tap to book”
End card last 3s
```

**6s bumper (optional)**

```
0:00–0:02  Hook text only + 1 fight clip
0:02–0:06  Logo + CTA
```

---

## Campaign objectives → scripts

| Objective | Best scripts | Destination |
|-----------|--------------|-------------|
| **Awareness** | 01, 02, 11, 24 | `/about.html` or `/` |
| **Consideration** | 03, 13, 18–18c, 19, 21 | `/fighters.html` or `/watch.html` |
| **Conversion — tickets** | 05, 06, 07, 15, 26 | `/book.html` |
| **Conversion — waitlist** | 29 | `/landing.html` |
| **Conversion — events** | 09, 16 | `/book.html` (booking form) |
| **Lead — fighters** | 27 | `/book.html#apply` |
| **Lead — partners** | 28 | mailto or `/book.html#partner` |
| **Stream tune-in** | 08, 12 | Kick / Twitch (or `/watch.html`) |

---

## UTM links (copy into ad manager)

Base: `https://creators-ai-hologram-boxing.vercel.app`

```
Book tickets:
/book.html?utm_source={{platform}}&utm_medium=paid_social&utm_campaign=hb002_tickets&utm_content={{script_id}}

Waitlist:
/landing.html?utm_source={{platform}}&utm_medium=paid_social&utm_campaign=waitlist&utm_content={{script_id}}

Fighters:
/book.html?utm_source={{platform}}&utm_medium=paid_social&utm_campaign=fighter_apply&utm_content=27_apply#apply

Watch / VOD:
/watch.html?utm_source={{platform}}&utm_medium=paid_social&utm_campaign=watch_vod&utm_content={{script_id}}
```

Replace `{{platform}}` with `meta`, `tiktok`, or `youtube`. Replace `{{script_id}}` with file slug (e.g. `15_hb002`).

---

## Meta Ads setup

| Field | Guidance |
|-------|----------|
| **Campaign** | Sales or Leads for book/waitlist; Awareness for tent/brand |
| **Placement** | Advantage+ or manual: IG Reels, FB Reels, Stories |
| **CTA button** | Book Now · Learn More · Sign Up (waitlist) · Watch More |
| **Primary text** | See [AD-COPY.md](./AD-COPY.md) |
| **Headline** | 40 chars max |
| **Creative** | Upload 15s + 30s; test hook variants |

---

## TikTok Ads setup

| Field | Guidance |
|-------|----------|
| **Objective** | Website conversions or Traffic |
| **Ad text** | See [AD-COPY.md](./AD-COPY.md) — keep under 100 chars for best delivery |
| **CTA** | Learn More · Sign Up · Shop Now (maps to Book) |
| **Spark Ads** | Optional — boost organic if creator account exists |

---

## Compliance notes (keep in primary text or landing page)

- Tickets paid in **Me vs Me (MVM) crypto only** — state in conversion ads.
- **Spectator experience** — attendees do not fight in the ring.
- **Prize pool** — subject to event rules; fan pool entry requires ticket + correct fighter pick.
- **Dates** — Hologram Boxing 002 dates from `site-config.json`; refresh ad copy when dates change.

---

## Production checklist per ad

- [ ] 15s cut exported with hook + end card  
- [ ] 30s cut exported (retargeting)  
- [ ] Burned-in captions  
- [ ] End card URL matches UTM link in ad manager  
- [ ] CTA button destination tested on mobile  
- [ ] `script_id` in utm_content matches row in AD-COPY.md  

**All headlines, hooks, and platform copy:** [AD-COPY.md](./AD-COPY.md)
