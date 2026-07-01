# UGC Script 01 — What Is Hologram Boxing?

**Website:** `about.html` / `faq.html`  
**Tone:** Gen Z UGC — casual, punchy, TikTok-native (light slang, no cringe overload)  
**Topic:** Intro — what hologram boxing actually is  
**Ad objective:** Awareness  
**Deliverables:** 15s + 30s · 9:16  
**Destination:** `/about.html?utm_campaign=hb002_tickets&utm_content=01_what_is`  
**Ad copy:** [AD-COPY.md § 01](./AD-COPY.md)  

---

## Paid ad cuts

| Cut | Structure |
|-----|-----------|
| **15s** | 0:00 Hook: “You don’t fight — you watch AI boxers in a tent.” → 0:03 tent + AR + glowing square → 0:11 “Family-friendly — tap below” → 0:12–0:15 End card |
| **30s** | Full VO below |

**Hook overlay text:** `WHAT IS HOLOGRAM BOXING?`  
**End card:** Logo · **Tap to Book** · creators-ai-hologram-boxing.vercel.app/about.html  

---

## Higgsfield generation (white plate → Seedance)

**Step 1 — Keyframe** (`nano_banana_2`, 9:16):

```
UGC talking-head keyframe. Same host face as prior plates. Social-media creator outfit: fitted lavender-purple ribbed crop tank, thin gold chain necklace, layered gold bracelets, gold hoop earrings. WAIST-UP from stomach up, locked tripod, direct eye contact, mouth slightly open mid-speech.
She holds a **tiny** black mini handheld microphone up to her mouth in her right hand. PURE SOLID WHITE backdrop (#FFFFFF). 9:16 photorealistic scroll-stopping UGC.
```

**Step 2 — Animate** (`seedance_2_0`, **2×15s**, 9:16, start_image = keyframe):

Seedance max is **15s** — generate **Part 1** and **Part 2**, then concat to ~30s full script plate.

**Part 1:**
```
15s 9:16 waist-up PURE WHITE #FFFFFF, tiny mic to mouth, locked tripod. She opens: "What is hologram boxing? Real talk — it's not what you think." Then: "You walk into an inflatable tent, throw on an AR headset, and watch AI hologram boxers throw down in a glowing square on the floor. You're not in the ring. You don't fight." Open-palm gesture on "you don't fight."
```

**Part 2:**
```
15s 9:16 same host/framing. She says: "You're front row watching Wave in full neon wireframe glory. No cap. It's giving fight night plus future tech — and it's family friendly lowkey. Creators AI Hologram Boxing. Tap to book now — see you in the tent."
```

**Output:** `ugc/output/01-what-is-hologram-boxing-plate-full.mp4` (Part 1 + Part 2 stitched)

---

## Production notes

- **Framing:** Waist-up from stomach; mic hand at mouth; stay in frame for keying.  
- **Movement:** One small open-palm gesture at "you don't fight" with free hand — mic stays at mouth.  
- **Graphics:** Full-screen tent B-roll behind host after second sentence; host keyed small bottom-right optional.

---

## Script

| Time | Speaker | On-screen |
|------|---------|-----------|
| 0:00 | **HOST** | White plate, waist-up, mini mic — opens with title question |
| 0:02 | **What is hologram boxing?** Real talk — let me break it down. | Text: **WHAT IS HOLOGRAM BOXING?** |
| 0:05 | You walk into an **inflatable tent**, throw on an **AR headset**, and watch **AI hologram boxers** throw down in a **glowing square** on the floor. | `[GRAPHIC: tent interior wide — Wave Blue vs Silver in floor square, crowd in VR goggles]` |
| 0:14 | You're not in the ring. **You don't fight** — you're front row watching **Wave** in full neon wireframe glory. No cap. | `[GRAPHIC: close-up Wave wireframe boxer, WAVE waistband visible]` |
| 0:22 | It's giving fight night plus future tech — and it's **family friendly** lowkey. | `[GRAPHIC: crowd reactions, clapping, all headsets on]` |
| 0:27 | **Creators AI Hologram Boxing.** Tap to book now — see you in the tent. | Logo + tagline lower third |

---

## Full VO (read straight through)

> **What is hologram boxing?** Real talk — it's not what you think.  
> You walk into an **inflatable tent**, throw on an **AR headset**, and watch **AI hologram boxers** throw down in a **glowing square** on the floor.  
> You're not in the ring. **You don't fight** — you're front row watching **Wave**, our hologram champ, in full neon wireframe glory. No cap.  
> It's giving fight night plus future tech — and it's **family friendly** lowkey.  
> **Creators AI Hologram Boxing.** Tap to book now — see you in the tent.

---

## B-roll / asset suggestions

- `assets/ep3-ar-experience.mp4` — crowd + fight in tent  
- `assets/hf_20260614_065850_a75c5615-f5be-41c3-892e-abb67d468ce0.png` — Wave wireframe reference  
