#!/usr/bin/env python3
"""Mux Blocker #2 Seedance video + Skye VO into final ad MP4s."""
from __future__ import annotations

import json
import subprocess
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SPEC = Path(__file__).resolve().parent / "BLOCKER2-JOBS.json"
AUDIO_DIR = Path(__file__).resolve().parent / "output" / "blocker2-audio"
VIDEO_DIR = Path(__file__).resolve().parent / "output" / "blocker2-video"

AUDIO_URLS = {
    "calling_all": "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260711_231301_0d9e38c5-d231-4f49-8d36-0668d2a02c7e.wav",
    "open_exact": "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260711_231301_b564ac51-77f0-48b2-976a-bd882078343a.wav",
    "open_opt": "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260711_231302_7c42dc47-1216-4be1-b1a1-76ec5d211e1f.wav",
    "creator_reminder": "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260711_231301_7ffa5381-69c3-4640-9a19-bb0e8fd10229.wav",
    "streamer_last_call": "https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/hf_20260711_231301_e02e32cd-289c-4a4b-9b48-7a5a80f55670.wav",
}


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        return
    print(f"Downloading {dest.name}...")
    urllib.request.urlretrieve(url, dest)


def mux(video: Path, audio: Path, out: Path) -> None:
  out.parent.mkdir(parents=True, exist_ok=True)
  tmp = out.with_suffix(".tmp.mp4")
  cmd = [
      "ffmpeg", "-y",
      "-i", str(video),
      "-i", str(audio),
      "-map", "0:v:0",
      "-map", "1:a:0",
      "-c:v", "copy",
      "-c:a", "aac",
      "-b:a", "192k",
      "-shortest",
      "-movflags", "+faststart",
      str(tmp),
  ]
  subprocess.run(cmd, check=True)
  tmp.replace(out)
  print(f"Wrote {out.relative_to(ROOT)}")


def main() -> None:
    spec = json.loads(SPEC.read_text(encoding="utf-8"))
    for ad_id, urls in AUDIO_URLS.items():
        download(urls, AUDIO_DIR / f"{ad_id}.wav")

    for ad_id, meta in spec["jobs"].items():
        video = VIDEO_DIR / f"{ad_id}.mp4"
        audio = AUDIO_DIR / f"{ad_id}.wav"
        out = ROOT / meta["output"]
        if not video.exists():
            print(f"SKIP {ad_id}: missing video {video}")
            continue
        mux(video, audio, out)


if __name__ == "__main__":
    main()
