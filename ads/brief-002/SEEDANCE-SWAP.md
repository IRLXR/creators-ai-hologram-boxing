# Seedance Swap — Brief 002

Run after **Higgsfield MCP is reconnected** in Cursor (Settings → MCP → Higgsfield → re-authenticate).

## Frame job IDs (start_image)

| Scene | Job ID | Local frame |
|-------|--------|-------------|
| 01 | `efd9e6fc-d9e2-4659-85e0-70ced56e5823` | `master-frames/01-would-you-walk-inside.png` |
| 02 | `6761b8ae-3a10-46ef-ba45-a9262837ef28` | `master-frames/02-welcome-guests.png` |
| 03 | `89beb364-ba1b-4b5f-8015-268e852f9aaa` | `master-frames/03-tunnel-mystery.png` |
| 04 | `cd2265a9-f2cd-4ce0-8177-5c2ed88d1112` | `master-frames/04-arena-glimpse.png` |
| 05 | `4284b7e1-3892-4106-9a13-1d00607bcd51` | `master-frames/05-cta-end-card.png` |

## Seedance settings

- Model: `seedance_2_0`
- Aspect: `9:16`
- Duration: `5` (trim to 3s in ffmpeg)
- Role: `start_image` = job ID above

## Prompts

**01:** Slow cinematic dolly push toward glowing cyan inflatable hologram boxing tent at night. Crowd walks forward. Purple fog. Typography WOULD YOU WALK INSIDE? Photorealistic premium trailer. No dialogue.

**02:** Slow push-in close-up. Security welcomes smiling guests at tent entrance. Every guest wears white VR headset with monogram side strap. Cyan rim light. Exclusive VIP. No dialogue.

**03:** Steadicam follow behind two guests into blue-lit hexagonal tunnel. Fog on floor. Headsets visible. Mystery — cannot see inside. No dialogue.

**04:** Slow reveal push forward. Tunnel opens to partial arena glimpse. Blue volumetric light, floor fog, glowing square. Crowd in headsets. Faceless Wave wireframe silhouette max 25%. No dialogue.

**05:** Subtle push-in on end card. Cyan holographic glove logo gentle glow pulse. THE FUTURE IS WAITING BECOME A FOUNDING FAN. No dialogue.

## Post-stitch (ffmpeg)

```powershell
# Trim each Seedance clip to 3s, concat, add ambient (no VO)
# Output: output/WOULD-YOU-WALK-INSIDE-15s-9x16-SEEDANCE.mp4
```

Say **"run seedance swap"** in Cursor after reconnecting Higgsfield.
