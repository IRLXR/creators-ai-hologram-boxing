"""Download voice-fixed UGC plates (Gia preset voice_change pass)."""
from __future__ import annotations

import json
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "ugc" / "output"
MANIFEST = OUT / "batch-manifest.json"

VOICE_FIXED = {
    "01-what-is-hologram-boxing": (
        "9d6a7dc4-290f-4456-8a1f-64e976ace9ad",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_210824_9d6a7dc4-290f-4456-8a1f-64e976ace9ad.mp4",
        "ads-avatar-what-is-hologram-boxing-plate.mp4",
    ),
    "02-the-inflatable-tent": (
        "4802f016-3508-475f-b057-9f3088131796",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_210903_4802f016-3508-475f-b057-9f3088131796.mp4",
        "02-the-inflatable-tent-plate.mp4",
    ),
    "03-meet-the-wave-fighters": (
        "c909f1e2-5477-4f57-a6b9-30fb035ee22a",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_210901_c909f1e2-5477-4f57-a6b9-30fb035ee22a.mp4",
        "03-meet-the-wave-fighters-plate.mp4",
    ),
    "04-ar-headset-experience": (
        "e106b1b9-8c56-4596-b68e-36e3f47458ec",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_210901_e106b1b9-8c56-4596-b68e-36e3f47458ec.mp4",
        "04-ar-headset-experience-plate.mp4",
    ),
    "05-tickets-and-mvm-crypto": (
        "ac2359ca-5eb8-4d32-b9f8-25671490c2be",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_210902_ac2359ca-5eb8-4d32-b9f8-25671490c2be.mp4",
        "05-tickets-and-mvm-crypto-plate.mp4",
    ),
    "06-pick-your-fighter-win-prizes": (
        "b88a83a4-f4b7-4e75-b159-6d426a077907",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_210904_b88a83a4-f4b7-4e75-b159-6d426a077907.mp4",
        "06-pick-your-fighter-win-prizes-plate.mp4",
    ),
    "07-headset-pov-vs-attendee-pov": (
        "a04f0b5a-02ea-4c2d-a8a2-01c07df2e937",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_210903_a04f0b5a-02ea-4c2d-a8a2-01c07df2e937.mp4",
        "07-headset-pov-vs-attendee-pov-plate.mp4",
    ),
    "08-watch-free-on-kick-twitch": (
        "f51713b5-0b08-4087-adaa-c1d9fc71ce4c",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_210902_f51713b5-0b08-4087-adaa-c1d9fc71ce4c.mp4",
        "08-watch-free-on-kick-twitch-plate.mp4",
    ),
    "09-book-the-tent-for-your-party": (
        "902fe99c-67a9-4269-81ed-fb87bfdcf349",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_210904_902fe99c-67a9-4269-81ed-fb87bfdcf349.mp4",
        "09-book-the-tent-for-your-party-plate.mp4",
    ),
}


def main() -> None:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    jobs = data.setdefault("jobs", {})
    voice = data.setdefault("voice", {})
    voice.update(
        {
            "preset": "Gia",
            "voice_id": "530df032-c311-483b-a750-cb3c9e1bcdfd",
            "voice_type": "preset",
            "pipeline": "voice_change post-pass on Seedance plates",
        }
    )
    with httpx.Client(timeout=120.0, follow_redirects=True) as client:
        for script_id, (job_id, url, filename) in VOICE_FIXED.items():
            dest = OUT / filename
            print(f"Downloading {filename}...")
            r = client.get(url)
            r.raise_for_status()
            dest.write_bytes(r.content)
            entry = jobs.get(script_id, {})
            entry["voice_job_id"] = job_id
            entry["voice_url"] = url
            entry["file"] = filename
            entry["status"] = "voice_fixed"
            jobs[script_id] = entry
    MANIFEST.write_text(json.dumps(data, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
