"""Assemble Brief 003 — The Evolution of the Fight (9:16 · Bill VO · action montage)."""
from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BRIEF = ROOT / "ads/brief-003"
FRAMES = BRIEF / "master-frames"
OUT = BRIEF / "output"
OUT.mkdir(parents=True, exist_ok=True)

VO = OUT / "EVOLUTION-vo-documentary-v1.mp3"
FINAL = OUT / "EVOLUTION-60s-9x16-VO.mp4"
AMBIENT = OUT / "EVOLUTION-60s-9x16-ambient.mp4"
WORK = OUT / "segments"

OPEN_BLACK_SEC = 2.0
OPEN_VO_BLACK_SEC = 5.0
VO_DELAY_MS = 2000

# Montage: motion + still beats per chapter for more action and photo variety.
SEGMENTS: list[dict] = [
    {"kind": "black", "dur": OPEN_BLACK_SEC},
    {"kind": "black", "dur": OPEN_VO_BLACK_SEC},
    # 01 prehistoric
    {"kind": "still", "frame": "01-prehistoric-gathering.png", "dur": 3.5, "zoom": 1.14, "pan": "left"},
    {"kind": "still", "frame": "01-prehistoric-gathering.png", "dur": 3.5, "zoom": 1.1, "pan": "right"},
    # 02 egypt
    {"kind": "motion", "clip": "02-egypt-ceremony", "dur": 3.0, "start": 0.0, "speed": 1.12},
    {"kind": "still", "frame": "02-egypt-ceremony.png", "dur": 3.0, "zoom": 1.12, "pan": "up"},
    # 03 greece
    {"kind": "motion", "clip": "03-greece-olympics", "dur": 3.0, "start": 0.5, "speed": 1.1},
    {"kind": "motion", "clip": "03-greece-olympics", "dur": 3.0, "start": 2.0, "speed": 1.08},
    # 04 rome
    {"kind": "motion", "clip": "04-rome-colosseum", "dur": 3.0, "start": 0.0, "speed": 1.12},
    {"kind": "still", "frame": "04-rome-colosseum.png", "dur": 3.0, "zoom": 1.15, "pan": "center"},
    # 05 asia
    {"kind": "motion", "clip": "05-asia-martial-arts", "dur": 3.0, "start": 0.0, "speed": 1.1},
    {"kind": "motion", "clip": "05-asia-martial-arts", "dur": 3.0, "start": 1.8, "speed": 1.08},
    # 06 boxing
    {"kind": "motion", "clip": "06-modern-boxing", "dur": 2.5, "start": 0.0, "speed": 1.15},
    {"kind": "still", "frame": "06-modern-boxing.png", "dur": 2.5, "zoom": 1.12, "pan": "left"},
    # 07 ufc
    {"kind": "motion", "clip": "07-modern-ufc", "dur": 2.5, "start": 0.0, "speed": 1.15},
    {"kind": "motion", "clip": "07-modern-ufc", "dur": 2.5, "start": 1.5, "speed": 1.12},
    # 08 timeline
    {"kind": "still", "frame": "08-timeline-future-line.png", "dur": 2.0, "zoom": 1.08, "pan": "right"},
    {"kind": "still", "frame": "08-timeline-future-line.png", "dur": 2.0, "zoom": 1.12, "pan": "left"},
    # 09 future — extended closing montage for new ending VO
    {"kind": "motion", "clip": "09-future-arena-wave", "dur": 5.0, "start": 0.0, "speed": 1.08},
    {"kind": "still", "frame": "09-future-arena-wave.png", "dur": 4.5, "zoom": 1.14, "pan": "center"},
    {"kind": "motion", "clip": "09-future-arena-wave", "dur": 4.5, "start": 1.2, "speed": 1.1},
    {"kind": "still", "frame": "08-timeline-future-line.png", "dur": 3.0, "zoom": 1.12, "pan": "right"},
    {"kind": "motion", "clip": "06-modern-boxing", "dur": 2.5, "start": 0.5, "speed": 1.12},
    {"kind": "still", "frame": "09-future-arena-wave.png", "dur": 4.0, "zoom": 1.1, "pan": "left"},
    # 10 cta — longer hold for invitation + logo
    {"kind": "motion", "clip": "10-cta-end-card", "dur": 3.5, "start": 0.0, "speed": 1.0},
    {"kind": "still", "frame": "10-cta-end-card.png", "dur": 6.0, "zoom": 1.08, "pan": "center"},
]


def run(cmd: list[str], *, check: bool = True) -> subprocess.CompletedProcess[str]:
    print(">", " ".join(cmd))
    return subprocess.run(cmd, check=check, text=True, capture_output=True)


def probe_duration(path: Path) -> float:
    result = run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ]
    )
    return float(result.stdout.strip() or "0")


def scale_crop(speed: float = 1.0, extra: str = "") -> str:
    parts = [
        "scale=1080:1920:force_original_aspect_ratio=increase",
        "crop=1080:1920",
        "fps=30",
    ]
    if extra:
        parts.append(extra)
    if speed != 1.0:
        parts.append(f"setpts=PTS/{speed}")
    return ",".join(parts)


def still_segment(frame: Path, out: Path, duration: float, *, zoom: float, pan: str) -> None:
    frames = max(int(duration * 30), 1)
    if pan == "left":
        x_expr = f"iw/2-(iw/zoom/2)-on*{frames}*0.15"
    elif pan == "right":
        x_expr = f"iw/2-(iw/zoom/2)+on*{frames}*0.15"
    elif pan == "up":
        y_expr = f"ih/2-(ih/zoom/2)-on*{frames}*0.12"
        x_expr = "iw/2-(iw/zoom/2)"
    else:
        x_expr = "iw/2-(iw/zoom/2)"
        y_expr = "ih/2-(ih/zoom/2)"

    if pan == "up":
        vf = (
            f"scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
            f"zoompan=z='min(zoom+{(zoom - 1) / frames:.6f},{zoom})':"
            f"x='{x_expr}':y='{y_expr}':d={frames}:s=1080x1920:fps=30"
        )
    else:
        vf = (
            f"scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
            f"zoompan=z='min(zoom+{(zoom - 1) / frames:.6f},{zoom})':"
            f"x='{x_expr}':y='ih/2-(ih/zoom/2)':d={frames}:s=1080x1920:fps=30"
        )

    run(
        [
            "ffmpeg",
            "-y",
            "-loop",
            "1",
            "-i",
            str(frame),
            "-vf",
            vf,
            "-t",
            str(duration),
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-an",
            str(out),
        ]
    )


def motion_segment(src: Path, out: Path, duration: float, *, start: float, speed: float) -> None:
    run(
        [
            "ffmpeg",
            "-y",
            "-ss",
            str(start),
            "-i",
            str(src),
            "-t",
            str(duration * speed),
            "-vf",
            scale_crop(speed),
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-an",
            str(out),
        ]
    )


def black_segment(out: Path, duration: float) -> None:
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            f"color=c=black:s=1080x1920:d={duration}:r=30",
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-an",
            str(out),
        ]
    )


def build_segment(index: int, spec: dict) -> Path:
    out = WORK / f"{index:02d}.mp4"
    kind = spec["kind"]
    dur = spec["dur"]

    if kind == "black":
        black_segment(out, dur)
        return out

    if kind == "still":
        still_segment(
            FRAMES / spec["frame"],
            out,
            dur,
            zoom=spec.get("zoom", 1.1),
            pan=spec.get("pan", "center"),
        )
        return out

    clip = OUT / f"{spec['clip']}.mp4"
    if not clip.exists():
        raise FileNotFoundError(f"Missing motion clip: {clip}")
    motion_segment(
        clip,
        out,
        dur,
        start=spec.get("start", 0.0),
        speed=spec.get("speed", 1.0),
    )
    return out


def concat_video(parts: list[Path], out: Path) -> None:
    list_file = WORK / "concat-list.txt"
    list_file.write_text(
        "\n".join(f"file '{p.as_posix()}'" for p in parts) + "\n",
        encoding="utf-8",
    )
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(list_file),
            "-c",
            "copy",
            str(out),
        ]
    )


def mix_vo(video: Path, out: Path) -> None:
    if not VO.exists():
        raise FileNotFoundError(f"Missing VO track: {VO}")

    video_dur = probe_duration(video)
    vo_dur = probe_duration(VO)
    total = max(video_dur, vo_dur + VO_DELAY_MS / 1000 + 1.0)

    run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(video),
            "-i",
            str(VO),
            "-filter_complex",
            f"[1:a]adelay={VO_DELAY_MS}|{VO_DELAY_MS},apad,volume=1.05[aout]",
            "-map",
            "0:v",
            "-map",
            "[aout]",
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-t",
            f"{total:.3f}",
            str(out),
        ]
    )


def main() -> None:
    if WORK.exists():
        shutil.rmtree(WORK)
    WORK.mkdir(parents=True)

    parts: list[Path] = []
    for i, spec in enumerate(SEGMENTS):
        parts.append(build_segment(i, spec))

    silent = OUT / "EVOLUTION-60s-9x16-silent.mp4"
    concat_video(parts, silent)
    shutil.copy2(silent, AMBIENT)
    mix_vo(silent, FINAL)

    video_dur = probe_duration(FINAL)
    vo_dur = probe_duration(VO)

    manifest_path = BRIEF / "MASTER-FRAMES-MANIFEST.json"
    if manifest_path.exists():
        data = json.loads(manifest_path.read_text(encoding="utf-8"))
        data["frames_status"] = "approved"
        data["video_status"] = "complete"
        data["status"] = "complete"
        data["total_duration_sec"] = round(video_dur, 1)
        data["voiceover"] = {
            "style": "Documentary — deep, calm, wise, authoritative, warm",
            "provider": "elevenlabs",
            "voice": "Bill (pqHfZKP75CvOlQylNhV4)",
            "model": "eleven_multilingual_v2",
            "path": str(VO.relative_to(ROOT)).replace("\\", "/"),
            "duration_sec": round(vo_dur, 2),
            "status": "recorded",
            "note": "Full narration preserved — no atrim cutoff",
        }
        data["final_film"]["path"] = str(FINAL.relative_to(ROOT)).replace("\\", "/")
        data["final_film"]["assembled_at"] = "2026-07-02"
        data["final_film"]["edit"] = "action montage — dual beats per chapter (motion + still)"
        manifest_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")

    print(f"\nDone:")
    print(f"  Video: {video_dur:.1f}s")
    print(f"  VO:    {vo_dur:.1f}s (+{VO_DELAY_MS/1000:.0f}s delay)")
    print(f"  Silent: {AMBIENT}")
    print(f"  VO cut: {FINAL}")


if __name__ == "__main__":
    main()
