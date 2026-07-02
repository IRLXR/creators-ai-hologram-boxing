# Connect ElevenLabs (voice AI)

Use this for **Brief 003 documentary narration** — deep, calm, cinematic VO.  
Your ads today use **Higgsfield `seed_audio`** (Roman, DEJ-1). ElevenLabs is a separate, optional path.

---

## 1. Get an API key

1. Sign in at [elevenlabs.io](https://elevenlabs.io)
2. Profile → **API Keys** → Create key
3. Copy the key (starts with `sk_` or similar)

---

## 2. Add to local env (never commit)

Create or edit `.env.local` in the project root:

```
ELEVENLABS_API_KEY=your_key_here
```

`.env.local` is gitignored.

---

## 3. Connect in Cursor (MCP)

**Option A — Copy project template**

1. Copy `mcp.elevenlabs.example.json` → `.cursor/mcp.json`
2. Replace the placeholder with your real API key (or use `"ELEVENLABS_API_KEY": "${env:ELEVENLABS_API_KEY}"` if your Cursor version supports env refs)
3. **Restart Cursor**

**Option B — Cursor Settings UI**

1. `Ctrl+Shift+J` → **Tools & MCP** → **Add new MCP server**
2. Name: `elevenlabs`
3. Type: **stdio**
4. Command: `python`
5. Args: `-m`, `elevenlabs_mcp`
6. Env: `ELEVENLABS_API_KEY` = your key
7. Save → restart Cursor

**Requires:** `pip install elevenlabs-mcp` (already installed on this machine).

When connected, the status dot in Tools & MCP should be **green**. Agent can then generate TTS, list voices, etc. from chat.

---

## 4. Pick a Brief 003 narrator voice

In ElevenLabs **Voice Library**, choose a deep, calm, documentary-style preset (not hype).  
Note the **Voice ID** and add to `ads/VOICE-CONFIG.json` under `elevenlabs_brief003`.

Suggested settings for Brief 003:

| Setting | Target |
|---------|--------|
| Model | `eleven_multilingual_v2` or `eleven_v3` |
| Stability | Higher (~0.6–0.75) |
| Speed | Slightly slow (~0.9) |
| Script | `ads/brief-003/VO-SCRIPT.md` |

---

## 5. GoHighLevel (optional)

To attach generated audio to waitlist contacts, use **Make** or **Zapier**:

- Trigger: GHL new contact / form submit  
- Action: ElevenLabs TTS → store MP3 URL on contact  

No code in this repo yet — CRM stays on existing `api/ghl-submit.js`.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| MCP red / disconnected | Check API key, restart Cursor, run `python -m elevenlabs_mcp --help` in terminal |
| `python` not found | Use full path to Python 3.14 or install Python |
| Out of credits | ElevenLabs dashboard → subscription / character quota |

---

**Not ElevenLabs?** If you meant another product called “Level Labs”, tell us the website or login URL and we’ll wire that instead.
