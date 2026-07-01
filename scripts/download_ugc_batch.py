"""Download completed UGC batch plates and update manifest."""
from __future__ import annotations

import json
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "ugc" / "output"
MANIFEST = OUT / "batch-manifest.json"

DOWNLOADS = {
    "02-the-inflatable-tent": (
        "df6cd1f8-13f8-4187-82bb-c19ef54a8367",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_190452_df6cd1f8-13f8-4187-82bb-c19ef54a8367.mp4",
    ),
    "03-meet-the-wave-fighters": (
        "98759b86-ed03-4898-a0ec-cc94959eac2b",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_190453_98759b86-ed03-4898-a0ec-cc94959eac2b.mp4",
    ),
    "04-ar-headset-experience": (
        "31827018-8e45-4f63-9a70-57b0fb534588",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_190513_31827018-8e45-4f63-9a70-57b0fb534588.mp4",
    ),
    "05-tickets-and-mvm-crypto": (
        "e946260c-526a-42f1-87c1-6fe65dade912",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_190453_e946260c-526a-42f1-87c1-6fe65dade912.mp4",
    ),
    "07-headset-pov-vs-attendee-pov": (
        "f85a7380-5fcc-419a-9a4b-f515fa1d8a05",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_190514_f85a7380-5fcc-419a-9a4b-f515fa1d8a05.mp4",
    ),
    "08-watch-free-on-kick-twitch": (
        "aaacd4de-16e2-4587-845a-9c9d2c584a6b",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_190515_aaacd4de-16e2-4587-845a-9c9d2c584a6b.mp4",
    ),
    "09-book-the-tent-for-your-party": (
        "9476e6a1-2c3c-4a16-be12-25232e2b1b8e",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_190515_9476e6a1-2c3c-4a16-be12-25232e2b1b8e.mp4",
    ),
}


def main() -> None:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    jobs = data.setdefault("jobs", {})
    with httpx.Client(timeout=120.0, follow_redirects=True) as client:
        for script_id, (job_id, url) in DOWNLOADS.items():
            dest = OUT / f"{script_id}-plate.mp4"
            print(f"Downloading {dest.name}...")
            r = client.get(url)
            r.raise_for_status()
            dest.write_bytes(r.content)
            jobs[script_id] = {"job_id": job_id, "url": url, "file": str(dest.name), "status": "completed"}
            print(f"  OK {len(r.content) // 1024 // 1024} MB")
    MANIFEST.write_text(json.dumps(data, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
