# Hologram Boxing Ticket System

This document describes how on-site tent tickets work for **Creators AI Hologram Boxing** events.

## Overview

On-site tent tickets are **not sold for cash**. The only way to buy a ticket is to hold enough **Me vs Me** crypto in your wallet at checkout.

| Setting | Value |
|---------|-------|
| Token name | Me vs Me |
| Token symbol | MVM |
| Headset POV price | 200 MVM |
| Attendee POV price | 350 MVM |

Prices are configured in `site-config.json` under the `crypto` object.

---

## Payment: Me vs Me Crypto Only

- Tickets are purchased exclusively with **Me vs Me (MVM)** coins.
- Buyers must confirm their wallet holds enough MVM to cover the selected viewing tier before submitting.
- Private event bookings (parties, corporate, festivals) use the separate **Booking Request Form** on `book.html` and are not the same as fight tickets.

---

## Viewing Options

When purchasing a ticket, attendees choose how they watch the hologram fight:

### 1. Headset POV (200 MVM)

- Watch through **your own AR headset** inside the inflatable tent.
- You see the hologram boxers from your personal augmented-reality point of view.
- Standard on-site tent experience.

### 2. Attendee POV (350 MVM)

- Pay a premium to watch through a **physical attendee's point of view**.
- You are assigned a ringside spectator's live camera feed instead of your own headset view.
- Ideal for fans who want the “being there in the crowd” perspective without wearing gear.

---

## Pick a Fighter to Win

Every ticket purchase includes a **fighter pick**:

1. Select the fight you are attending.
2. Choose which hologram fighter you are backing (e.g. Wave Gold or Wave Fire).
3. If **your chosen fighter wins** that fight, you are **entered to win** from the **spectator prize pool**.

This is separate from the main fighter prize pool (e.g. $10,000 for hologram fighters at Hologram Boxing 002). Ticket holders compete for the **spectator win pool** based on their fighter pick.

---

## Influencer Codes & Attendee POV Passes

Code behavior depends on which viewing experience you choose.

### Headset POV — enter a creator code

1. **Choose Headset POV** — the influencer code input appears.
2. **Enter your code** — Type the code from your creator (e.g. `GOLDENWAVE`) and hit **Apply**.
3. **Auto-fill** — We lock in the fight and fighter your influencer is backing.
4. **Purchase** — Confirm your wallet and hit **Purchase Ticket**.

### Attendee POV — auto-generated ringside pass

1. **Choose Attendee POV** — a unique code is **generated automatically** (e.g. `ATT-K7M2XP`).
2. **Copy & save** — Use the **Copy** button. This code links you to your live spectator feed inside the tent.
3. **Pick fight & fighter** — Choose manually below (no influencer code needed).
4. **Purchase** — Confirm your wallet and complete checkout.

You do **not** type a code for Attendee POV — we generate one for you.

### Active influencer codes (Headset POV only)

| Code | Influencer | Fight | Fighter Backed |
|------|------------|-------|----------------|
| `GOLDENWAVE` | Wave Gold Crew | Wave Gold vs Wave Fire | Wave Gold |
| `BLAZEHYPE` | Blaze Nation | Wave Gold vs Wave Fire | Wave Fire |
| `BLUECREW` | Cyber Blue Squad | Wave Blue vs Wave Silver | Wave Blue |
| `SILVERGHOST` | Phantom Feed | Wave Blue vs Wave Silver | Wave Silver |
| `GREENFORCE` | Titan Power | Wave Green vs Wave Pink | Wave Green |
| `PINKSPEED` | Spark Velocity | Wave Green vs Wave Pink | Wave Pink |

Codes are configured in `site-config.json` under `influencerCodes`.

### Deep link

Share a code via URL:

- `book.html?code=GOLDENWAVE` — auto-applies Headset POV + influencer selections

---

## Purchase Flow

1. **Wait for countdown** — Each fight card has its own countdown. The **Buy Ticket** button appears when the clock hits zero.
2. **Go to** [`book.html`](book.html) (or tap **Buy Ticket** on a fight card).
3. **Fill out the ticket form:**
   - Name & email
   - Me vs Me wallet address
   - Viewing mode (Headset POV or Attendee POV) — unlocks influencer code box
   - Fight selection & fighter pick (manual or auto-filled via influencer code)
   - Confirm sufficient MVM balance
4. **Submit** — Request is stored locally and can be sent via email for confirmation.
5. **Attend the event** — Enter the tent and experience the fight through your chosen view.

Deep links are supported:

- `book.html?fight=hb002-main` — pre-selects a fight
- `book.html?fighter=wave-gold` — pre-selects fight + fighter when applicable
- `book.html?code=GOLDENWAVE` — auto-applies influencer code (fight, fighter, POV)

---

## Free Alternative: Live Streams

Cannot attend or don't have MVM? Every event streams **free** on:

- [Kick](https://kick.com/creatorsai)
- [Twitch](https://www.twitch.tv/creatorsai)

Streams do not include on-site tent AR viewing or spectator win-pool eligibility.

---

## Technical Reference

| File | Purpose |
|------|---------|
| `site-config.json` / `site-config.js` | Token name, symbol, and ticket prices |
| `book.html` | Ticket purchase form (`#ticket-form`) |
| `js/main.js` | `initTicketForm()`, fight card ticket buttons, branding data attributes |
| `TICKET-SYSTEM.md` | This document |

### Config example

```json
"crypto": {
  "name": "Me vs Me",
  "symbol": "MVM",
  "ticketPriceHeadset": 200,
  "ticketPriceAttendee": 350
}
```

### Data attributes (auto-filled from config)

- `data-crypto-name` — Me vs Me
- `data-crypto-symbol` — MVM
- `data-ticket-price-headset` — Headset tier price
- `data-ticket-price-attendee` — Attendee POV tier price
- `data-admission` — Legacy attribute; now shows headset MVM price

---

## Summary

| Question | Answer |
|----------|--------|
| How do I pay? | Me vs Me (MVM) crypto only |
| What view options exist? | Your headset POV or a physical attendee's POV |
| Can I win as a ticket holder? | Yes — pick a fighter; if they win, you're in the spectator win pool |
| Where do I buy? | [book.html](book.html) when tickets are on sale |
| Free option? | Kick & Twitch live streams |
| Can I use an influencer code? | Headset POV only — type & apply. Attendee POV gets an auto-generated pass code |
