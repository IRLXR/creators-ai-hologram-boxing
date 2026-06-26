# Creators AI Hologram Boxing — Visual & Prompt Rules

Rules for Higgsfield generation using **Nano Banana 2** (stills) and **Seedance 2.0** (video) only. Use before every prompt. Cursor rule: `.cursor/rules/higgsfield-visual-prompts.mdc`.

---

## 1. Golden rules

1. **Models:** `nano_banana_2` for all images/keyframes. `seedance_2_0` for all video. **Never Kling.**
2. **Venue:** **Inflatable tent** interior/exterior — not a 12ft dome, boxing arena, or octagon as the primary set.
3. **Never recreate recognizable real fights or celebrity likenesses.** Extract **style only** and generate **original** Wave fights.
4. **Every spectator wears VR headsets.** Zero bare heads. Non-negotiable.
5. **Wave fighters are human-sized (1:1)** inside the glowing floor square in the tent.
6. **Preserve camera motion** when iterating — reference the prior approved job ID.
7. **Upload references via Higgsfield** (`media_upload` → PUT → `media_confirm`). Use `media_id` or completed `job_id` in `medias[].value`.

---

## 2. Visual identity — Wave wireframe boxer

### Character design (still images → `nano_banana_2`)

| Element | Rule |
|--------|------|
| Body | Low-poly muscular boxer, full-body **white wireframe mesh** on skin and gear |
| Branding | Shorts waistband reads **WAVE** (not WIRE) |
| Hero color | Purple/violet neon + backing glow (`assets/hf_*_a75c5615*.png`, `assets/wave-*.png`) |
| Opponent | Same build, **white + silver** wireframe, white shorts and gloves |
| Scale | Human-sized inside tent floor square |

**Canonical still refs**

- Purple Wave boxer: `assets/hf_20260614_065850_a75c5615-f5be-41c3-892e-abb67d468ce0.png`
- Face-offs: `assets/fight-blue-vs-silver.png`, `assets/fight-gold-vs-fire.png`, `assets/fight-green-vs-pink.png`
- Roster: `assets/fighter-*.png`, `assets/wave-*.png`

### Hologram fight motion (video → `seedance_2_0`)

- Glowing digital wireframe figures — purple/blue/cyan/silver light particles
- Realistic boxing: jabs, crosses, hooks, footwork
- Restrained glow on impact; glow from **feet** + **tent floor square grid** + rolling fog

---

## 3. VR headset / “ski goggle” spec

| Feature | Description |
|--------|-------------|
| Form factor | Quest 3–style VR headset, ski-goggle shape |
| Visor | Opaque **white** front plate |
| Sensors | **Three vertical pill-shaped** lenses |
| Strap | White luxury patterned ski-goggle band |
| Coverage | **100% of visible humans** |

```
ABSOLUTE RULE — VR HEADSETS ON EVERY PERSON: Every visible human wears a sleek white VR headset 
in ski-goggle shape with three vertical pill-shaped sensors on the visor and a white luxury 
patterned head strap. Zero bare heads. All spectators face the center fight inside the tent.
```

**Reference:** `assets/hf_20260614_083229_a1706812-1a5e-4c60-bd08-811341c91a7a.png`

---

## 4. Environment — the tent

### Exterior (9:16 social / entry shots)

- Black **inflatable tent**, urban streetwear crowd waiting outside
- Camera dollies to entrance → **hard fade to black** before interior is revealed

### Interior (9:16 or 16:9 — primary venue for all episodes)

- Dark **quilted padded tent** walls (high-tech inflatable structure)
- Wall-mounted screens with fight feeds (optional)
- **Glowing blue-and-purple square** on the tent floor = fight boundary
- Wave wireframe boxers spar **human-sized inside the square**
- Spectators on **perimeter of glowing lines**, all in VR headsets, urban clubwear
- **Thick ground fog** lit by square glow and boxer foot emission

Do **not** prompt for geodesic dome, 12ft arena, MMA cage, or standalone boxing hall unless explicitly retargeting legacy site copy.

---

## 5. Model pipeline (Nano Banana → Seedance only)

| Step | Model | Purpose |
|------|--------|---------|
| 1. Keyframe / layout / face-off | **`nano_banana_2`** | Wide tent interior, crowd layout, Wave stills, goggle hero |
| 2. Animate keyframe | **`seedance_2_0`** | `medias: [{ role: "start_image", value: "<media_id>" }]` |
| 3. Iterate motion | **`seedance_2_0`** | Cite prior job ID; keep camera movement |
| 4. Upscale (optional) | **`upscale_video`** (Bytedance) | 2K pass on finished Seedance clip |

**Forbidden:** `kling3_0`, `kling3_0_turbo`, Kling multi-shot, or Kling-as-default for any new asset.

**Seedance defaults:** 720p, `std` mode, 15s typical for episodes.

---

## 6. IP & failure recovery

1. Do not retry celebrity/real-fight video references.
2. Extract: wireframe style, **tent** layout, camera language, Wave character design.
3. Seedance `ip_detected` → **`reveal_generation`** when appropriate.
4. New sequences: “original Wave wireframe spar inside tent glowing square.”

| Safe | Unsafe |
|------|--------|
| Your Wave stills & completed jobs | Real fight footage / recognizable athletes |
| Tent layout Nano Banana keyframes | Celebrity names in prompts |
| VR goggle redesign still | Video-to-video of IP-blocked source |

---

## 7. Prompt template — Nano Banana 2 (keyframe)

```
Wide/interior/exterior shot of the inflatable tent [interior | entrance exterior].
Dark quilted padded walls, glowing blue-purple square on floor, rolling fog optional.
Wave [Color] vs Wave [Color] wireframe boxers human-sized inside the square OR face-off still.
[Headset block on all crowd members if present].
Glow Hologram Recreation, super-computer wireframe, photorealistic people.
REFERENCES: medias role image → [media_id list].
```

---

## 8. Prompt template — Seedance 2.0 (video)

```
15s experiential promo [16:9 | 9:16] inside the inflatable tent interior.
Dark quilted padded tent walls, glowing blue-purple neon square on floor, thick ground fog.

[Headset block from §3].

FIGHTERS: Wave [Color] vs Wave [Color] — human-sized wireframe hologram boxers, realistic boxing,
restrained [color] glow on impacts, light spilling from feet onto fog and square grid.

CROWD: urban clubwear on perimeter of glowing lines, all facing center — OR empty tent.
CAMERA: [dolly | orbit | OTS | pull back]. PRESERVE exact camera from job [uuid] if iterating.
STYLE: Glow Hologram Recreation, photorealistic spectators, holographic fighters.
```

### Live site cuts (regenerate with tent interior framing)

| Episode | File | Job | Matchup |
|---------|------|-----|---------|
| Ep 4 / Hero | `higgsfield-892f90b0-*.mp4` | `b1820e01` | Wave Gold vs Fire |
| Ep 3 | `ep3-ar-experience.mp4` | `120bff2c` | Wave Blue vs Silver |
| Ep 2 | `ep2-ar-experience.mp4` | `0916db6b` | Wave Green vs Pink |
| Experience | `higgsfield-386b5e5c-*.mp4` | `2d9e5a79` | Tent interior wide |
| Ep 1 Preview | `ep1-tent-preview.mp4` | `22b966ec` | Tent exterior entrance |

---

## 9. Checklist

- [ ] `nano_banana_2` for stills, `seedance_2_0` for video — **no Kling**
- [ ] Scene is **tent** (not dome/arena)
- [ ] Headset rule in every crowd shot
- [ ] Human-sized Wave fighters in floor square
- [ ] No celebrity / real-fight reconstruction
- [ ] `media_id` confirmed before generation
- [ ] Download → `assets/` → wire HTML → deploy Vercel

---

## 10. Key job & asset map

| Job ID | Purpose |
|--------|---------|
| `a75c5615-f5be-41c3-892e-abb67d468ce0` | Purple Wave boxer (WAVE waistband) |
| `cf9b5b92-e509-41f0-9e24-f6741c257c5e` | Purple vs white-silver face-off |
| `a1706812-1a5e-4c60-bd08-811341c91a7a` | Quest-style VR goggle redesign |
| `dad1b231-bb7b-4e15-b8ec-a3fc1f166506` | Tent interior — square ring + crowd |
| `3be32b87-31b8-4bb6-b23b-ef897cc4bf68` | Ep 3 Seedance |
| `b6cf03ab-97bc-42a6-9164-2b0f2e43e313` | Ep 2 Seedance |
| `892f90b0-5456-4ceb-9589-266f3b418c4d` | Fog + square + crowd (legacy) |

---

## 11. Storyboard pipeline

1. **Frames:** `nano_banana_2` — close-up goggle reaction → medium crowd in tent → wide spar in square.
2. **Video:** `seedance_2_0` — animate best keyframe; optional 4 parallel variations.
3. **Optional:** `upscale_video` to 2K.

---

*Last updated: June 2026 — Nano Banana 2 + Seedance 2.0 only · tent venue · no Kling.*
