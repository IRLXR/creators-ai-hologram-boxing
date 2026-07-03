# Pillar 4 — Rituals

**Primal Code:** Repeatable behaviors, habits, and routines that actively engage people with the brand.

---

## What it is (plain English)

Rituals are the **things fans do again and again** that make them feel like insiders. Not one-time stunts — **habits** that turn strangers into Founding Fans and Founding Fans into regulars.

---

## Core rituals (the experience)

### Ritual 1 — Walk inside

**The threshold moment.**

1. Approach the black inflatable tent at night
2. Pass through the **blue-lit entrance**
3. Step into fog, quilted walls, and the glowing square

**Copy hook:** *Would you walk inside?*

This is the brand's physical baptism. Every campaign, ad, and social post should echo this motion.

---

### Ritual 2 — Gear up

**Headset on = you're in.**

1. Receive or pick up the white AR headset
2. Strap on (three pill sensors visible)
3. Face the center — crowd and square aligned

**Copy hook:** *One headset. Infinite possibilities.*

No bare heads. Everyone participates the same way — democratized front row.

---

### Ritual 3 — Pick your fighter

**Before tickets unlock, choose a side.**

1. Browse Wave roster (Gold, Fire, Blue, Silver, Green, Pink)
2. Enter an **influencer code** or pick a matchup
3. Wait for the **countdown** — tickets appear when the clock hits zero

**Copy hook:** *Pick your fighter — if they win, you're in the running for the fan prize pool.*

Codes: `GOLDENWAVE`, `BLAZEHYPE`, `BLUECREW`, etc. — see `site-config.js`.

---

### Ritual 4 — Countdown to fight night

**Shared anticipation.**

1. Watch **Next Event** timer (landing page, site banner, fight cards)
2. Share countdown clips on social
3. Stream free on **Kick / Twitch** while waiting
4. Return when tickets go live

**Copy hook:** *HB 002 tickets unlock when the countdown hits zero.*

---

### Ritual 5 — Become a Founding Fan

**Pre-launch belonging.**

1. Enter email on landing page
2. See **Submitting → Submitted → thank-you video**
3. Join before public launch — insider status

**Copy hook:** *Join before launch. You're officially on the list.*

Stored locally + synced to Go High Level waitlist.

---

### Ritual 6 — Watch live, then pull up

**Hybrid remote → IRL loop.**

1. Stream fight night free on Kick/Twitch
2. See tent clips, roster drops, episode recaps in the feed
3. Book tickets and **pull up to the tent** for full AR experience

**Copy hook:** *Stream free online. Pull up when you're ready for the full experience.*

---

### Ritual 7 — You had to be there

**Post-event storytelling.**

1. Attend or watch the event
2. Share clips, photos, reactions — *inside the tent* energy
3. Replay highlights on demand (`watch.html`)

**Copy hook:** *You had to be there.*

Social proof ritual — FOMO that pulls the next wave in.

---

## Digital rituals (social & community)

| Ritual | Platform | Frequency |
|--------|----------|-----------|
| Founding Fan link in bio | Instagram, TikTok | Always |
| 7-day Social Collection arc | Instagram feed | Launch week |
| Fight card drop posts | All platforms | Per event |
| Episode recaps | Kick, Twitch, site | Post-event |
| Influencer code callouts | Book page, UGC | Per fight |

---

## Ritual design principles

1. **Repeatable** — same motion, new content (new fight, new Wave matchup)
2. **Participatory** — headset on, fighter picked, email submitted
3. **Timed** — countdowns create shared calendar moments
4. **Shareable** — each ritual produces a clip or caption fans can post

---

## What to avoid

- One-off gimmicks with no sequel (no "ritual next time")
- Skipping the walk-inside / gear-up sequence in favor of abstract AI visuals
- Ticket sales without countdown — breaks the **unlock** ritual

---

## Where rituals are implemented

- `landing.html` — waitlist + Next Event countdown
- `index.html` / `fighters.html` — fight countdowns, pick your fighter
- `book.html` — ticket flow, influencer codes, headset vs attendee POV
- `watch.html` — live stream + on-demand episodes
- `TICKET-SYSTEM.md` — countdown unlock mechanics

---

## Reference

- `ugc/13-how-it-works-four-steps.md`
- `ugc/26-book-ticket-three-steps.md`
- `ugc/29-join-waitlist-early-access.md`
- `assets/social-collection-001/SOCIAL-COLLECTION-001-MANAGER-BRIEF.md` (7-day posting ritual)
