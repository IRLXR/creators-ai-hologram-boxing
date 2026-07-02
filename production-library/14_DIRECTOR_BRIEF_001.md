# 14 — DIRECTOR'S BRIEF 001

## Version 2.0

**Campaign:** The Future Is Here  
**Format:** 15-second premium launch commercial  
**Objective:** Convert viewers to Founding Fans — curiosity, wonder, premium Hollywood technology launch feel.

> This brief is for **advertisement production**. It is separate from the landing page Scene 2 brief at repo root (`DIRECTOR'S_BRIEF_001.md`). Never use landing-page images as production references.

---

## Part 1 — Vision

### Executive vision

Launch AI Hologram Boxing as the world's first premium live holographic boxing experience — not a game, not VR, a real-world event you attend.

### Cinematic language

- ARRI ALEXA 65 look · slow dolly · crane · gimbal
- Blue practical + white rim · volumetric fog · high contrast
- Electric blue, cyan, white, matte black, silver

### Story foundation

Six beats in 15 seconds. Emotion over explanation. No crypto, no ticket pricing, no tech lectures.

---

## Part 2 — Storyboard

| Scene | Beat | Visual | Duration |
|-------|------|--------|----------|
| 1 | Mystery title | Dark hold → title card energy · "THE FUTURE IS HERE" | ~2s |
| 2 | Arena arrival | Guests at night · matte black inflatable tent · blue entrance glow | ~3s |
| 3 | Headset close-up | Official monogram strap · putting on AR headset | ~2s |
| 4 | Partial Wave reveal | Wireframe fighter materializes in glowing square · tease only | ~3s |
| 5 | Audience reactions | Crowd in headsets · wonder · immersive | ~3s |
| 6 | CTA | **Become a Founding Fan** | ~2s |

### Scenes 1–3 detail

- **Scene 1:** Typography-forward mystery open. Premium, minimal, cinematic.
- **Scene 2:** Exterior arrival. Official host character when primary female appears (`assets/Ads/card-apply.png`). Diverse realistic crowd. All headsets on.
- **Scene 3:** Macro/detail on branded strap + visor. Interior tent glow beginning.

### Scenes 4–6 detail

- **Scene 4:** Partial Wave reveal — faceless wireframe, athletic proportions, gold/cyan or approved matchup. Fighters are visual focus.
- **Scene 5:** Audience reactions inside tent — authentic expressions, no duplicate faces, every spectator in headset.
- **Scene 6:** End card · CTA · brand lockup feel without protected third-party logos.

---

## Part 3 — Production execution

### Pre-production (free first)

1. Storyboard all six beats.
2. Nano Banana master frame per beat (`11_NANO_BANANA_GUIDE.md`).
3. User approval gate — **STOP** before Seedance.
4. Regenerate only failed frames.

### Approved master frames (Revision 3)

Manifest: `ads/master-frames/MASTER-FRAMES-MANIFEST.json`

| Beat | Frame | File | Status |
|------|-------|------|--------|
| 2 Arena arrival | 01 | `ads/master-frames/01-enter-the-arena.png` | Approved |
| 3 Headset / gear | 02 | `ads/master-frames/02-gear-up.png` | Approved |
| 4–5 Fight / crowd | 03 | `ads/master-frames/03-fight-begins.png` | Approved |
| Broadcast / world | 04 | `ads/master-frames/04-world-watching.png` | Approved |

Scenes 1 (title) and 6 (CTA) may require additional Nano Banana frames or motion graphics — not yet generated.

### Video generation

- Seedance 2.0 · one shot at a time · `start_image` = approved frame
- Match approved frame in composition, lighting, branding, scale
- See `12_HIGGSFIELD_GUIDE.md`

### Final delivery

- 15s master · 9:16 + 16:9 exports per `17_SOCIAL_MEDIA_ADS.md`
- QC per `19_QUALITY_CONTROL.md`
- Archive per `20_EXPORT_GUIDE.md`

---

## Approval gate

Before export, verify:

- Original imagery (not landing-page reuse)
- Correct arena, headset, Wave
- No AI artifacts · no morphing · no flickering
- Lighting and branding continuity
- Professional cinematic motion throughout

If any requirement fails, regenerate **only** the affected shot.
