# Brief 003 — Narration Script (Documentary)

**Title:** The Evolution of the Fight  
**Duration target:** ~52s spoken over 60s film (pauses built into edit)  
**Voice direction:** Deep · calm · wise · authoritative · warm · timeless — **not** hype · **not** celebrity imitation  
**Model:** ElevenLabs `eleven_multilingual_v2` (preferred) or Higgsfield `seed_audio` fallback  
**Setup:** `docs/ELEVENLABS-CONNECT.md`  
**Pacing:** `speech_rate` negative or 0 · generous pauses between lines · `-14 LUFS` VO bed

---

## Full script (timed)

| Time | Line | Direction |
|------|------|-----------|
| 0:02 | Since the beginning of humanity… | After bass hit. Slow. Wonder. |
| 0:03 | We have gathered… | Pause before. |
| 0:04 | To witness strength… | |
| 0:05 | Courage… | Single-word beats. |
| 0:06 | Competition… | |
| 0:07 | And unforgettable moments. | Let line breathe into Ch1. |
| 0:09 | Long before history was written… | Over prehistoric scene. |
| 0:12 | Competition brought people together. | Warm close. |
| 0:16 | Civilizations grew… | Sand transition into Egypt. |
| 0:19 | But the desire to witness greatness never changed. | |
| 0:22 | From the birth of organized sport… | Greece. |
| 0:25 | Humanity celebrated those willing to compete. | |
| 0:28 | Empires rose… | Rome scale. |
| 0:30 | And millions gathered… | |
| 0:32 | To witness legends. | |
| 0:35 | Competition became more than strength… | Asia. |
| 0:37 | It became discipline… | |
| 0:38 | Honor… | |
| 0:39 | And mastery. | |
| 0:41 | The world evolved… | Modern boxing. |
| 0:44 | But one thing remained the same… | |
| 0:46 | People came together… | |
| 0:48 | To experience something unforgettable. | Hold into silence before future. |
| *(0:49–0:55 visual only)* | — | Silence / score · future chapter |
| 0:55 | Every generation has witnessed the next chapter… | Return of narrator. Intimate. |
| 0:58 | This… | Pause. |
| 0:59 | Is ours. | Fade to logo. |

---

## End card (on screen, not VO)

```
AI HOLOGRAM BOXING
BECOME A FOUNDING FAN
creators-ai-hologram-boxing.vercel.app/landing.html
```

---

## Mix notes

- Duck score ~6dB under VO · restore for future silence section  
- Chapter 7: minimal VO — score + bass + crowd ambience  
- Final bass hit mirrors opening hit (bookend)  
- No Roman hype profile — separate VO job from Brief 001/002  

---

## Output files (when recorded)

| File | Purpose |
|------|---------|
| `output/EVOLUTION-vo-documentary-v1.wav` | Raw VO |
| `output/EVOLUTION-60s-9x16-VO.mp4` | Final with narration |
| `output/EVOLUTION-60s-9x16-ambient.mp4` | Score-only variant |
