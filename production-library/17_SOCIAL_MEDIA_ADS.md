# 17 — SOCIAL MEDIA ADS

## Default VO voice

All ad voiceovers use **`ads/VOICE-CONFIG.json`** unless overridden:

| Setting | Value |
|---------|--------|
| Voice | **Roman** |
| voice_id | `7e63ac18-5fcd-4aba-8078-a86d4e11c127` |
| voice_type | `preset` |
| Model | `seed_audio` |


- Instagram Reels
- TikTok
- Facebook Reels
- YouTube Shorts

## Aspect ratios

| Platform | Primary | Secondary |
|----------|---------|-----------|
| TikTok / Reels / Shorts | 9:16 | — |
| Facebook feed | 1:1 or 4:5 | 9:16 Reels |
| YouTube | 16:9 | 9:16 Shorts |

## Repo references

- Campaign configs: `ads/campaigns.json`, `ads/campaigns-set-b.json`
- Launch checklists: `ads/LAUNCH-CHECKLIST.md`, `ads/LAUNCH-CHECKLIST-SET-B.md`
- UGC plates: `ugc/output/`
- Ad copy: `ugc/AD-COPY.md`, `ugc/ADS-GUIDE.md`

## UTM pattern

Use landing UTMs from campaign JSON — e.g. `landing.html?utm_campaign=...&utm_content=...`
