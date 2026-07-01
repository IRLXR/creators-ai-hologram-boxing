"""Download all completed UGC batch plates from batch-manifest job entries."""
from __future__ import annotations

import json
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "ugc" / "output"
MANIFEST = OUT / "batch-manifest.json"

BATCH2 = {
    "06-pick-your-fighter-win-prizes": (
        "6d83e019-9647-482a-8025-1960b1591adc",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_191016_6d83e019-9647-482a-8025-1960b1591adc.mp4",
    ),
    "10-all-ages-family-night": (
        "5f2d4984-51d6-4c70-a35d-0577d037bdc5",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_191016_5f2d4984-51d6-4c70-a35d-0577d037bdc5.mp4",
    ),
    "11-home-hero-brand": (
        "75aa205a-c179-4957-a876-43883fc694c5",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_191017_75aa205a-c179-4957-a876-43883fc694c5.mp4",
    ),
    "12-social-kick-twitch-feed": (
        "30eb618d-b53a-449b-9819-6107df89689d",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_191018_30eb618d-b53a-449b-9819-6107df89689d.mp4",
    ),
    "13-how-it-works-four-steps": (
        "8bfc90f9-eaea-46bf-b448-63443eec18d7",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_191019_8bfc90f9-eaea-46bf-b448-63443eec18d7.mp4",
    ),
    "14-event-archive-hb001": (
        "92bf33f6-7030-4995-96ac-a47c94e20b8c",
        "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260626_191020_92bf33f6-7030-4995-96ac-a47c94e20b8c.mp4",
    ),
}

PENDING = [
    "16-downtown-hologram-showdown",
    "17-title-fight-night",
    "18-fight-card-gold-vs-fire",
    "18b-fight-card-blue-vs-silver",
    "18c-fight-card-green-vs-pink",
    "19-watch-episodes-on-demand",
    "20-hb001-recap-highlights",
    "21-gallery-inside-the-tent",
    "22-news-prize-pool-doubled",
    "23-about-five-step-journey",
    "24-hologram-tent-technology",
    "25-food-drinks-experience",
    "26-book-ticket-three-steps",
    "26b-influencer-codes",
    "26c-attendee-ringside-pass",
    "27-apply-hologram-fighter",
    "28-become-a-partner",
    "29-join-waitlist-early-access",
    "30-faq-common-questions",
    "31-website-launch",
]


def download_map(client: httpx.Client, mapping: dict, jobs: dict) -> None:
    for script_id, (job_id, url) in mapping.items():
        dest = OUT / f"{script_id}-plate.mp4"
        print(f"Downloading {dest.name}...")
        r = client.get(url)
        r.raise_for_status()
        dest.write_bytes(r.content)
        jobs[script_id] = {
            "job_id": job_id,
            "url": url,
            "file": dest.name,
            "status": "completed",
        }
        print(f"  OK {len(r.content) // 1024 // 1024} MB")


def main() -> None:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    jobs = data.setdefault("jobs", {})
    data["pending"] = PENDING
    data["completed_count"] = len(jobs)
    with httpx.Client(timeout=120.0, follow_redirects=True) as client:
        download_map(client, BATCH2, jobs)
    MANIFEST.write_text(json.dumps(data, indent=2), encoding="utf-8")
    print(f"Pending: {len(PENDING)} scripts (~{len(PENDING) * 67} credits needed)")


if __name__ == "__main__":
    main()
