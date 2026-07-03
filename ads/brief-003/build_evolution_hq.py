"""Brief 003 HQ remake — photoreal Seedance clips, crossfade transitions, Bill VO."""
from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BRIEF = ROOT / "ads/brief-003"
FRAMES = BRIEF / "master-frames"
OUT = BRIEF / "output"
HQ = OUT / "hq"
WORK = OUT / "hq-work"
VO = OUT / "EVOLUTION-vo-documentary-v1.mp3"
FINAL = OUT / "EVOLUTION-HQ-9x16-VO.mp4"
AMBIENT = OUT / "EVOLUTION-HQ-9x16-ambient.mp4"

VO_DELAY_MS = 2000
XFADE = 0.55
FPS = 30

# (label, duration seconds, source clip stem or None for black)
SCENES: list[tuple[str, float, str | None]] = [
    ("opening-black-1", 2.0, None),
    ("opening-black-2", 5.0, None),
    ("01-prehistoric-gathering", 7.0, "01-prehistoric-gathering"),
    ("02-egypt-ceremony", 6.0, "02-egypt-ceremony"),
    ("03-greece-olympics", 6.0, "03-greece-olympics"),
    ("04-rome-colosseum", 6.0, "04-rome-colosseum"),
    ("05-asia-martial-arts", 6.0, "05-asia-martial-arts"),
    ("06-modern-boxing", 5.0, "06-modern-boxing"),
    ("07-modern-ufc", 5.0, "07-modern-ufc"),
    ("08-timeline-future-line", 3.0, "08-timeline-future-line"),
    ("09-future-a", 6.0, "09-future-arena-wave"),
    ("09-future-b", 6.0, "09-future-arena-wave"),
    ("09-future-c", 6.0, "09-future-arena-wave"),
    ("10-cta-end-card", 6.0, "10-cta-end-card"),
]

CLIP_OFFSETS = {
    "09-future-b": 1.2,
    "09-future-c": 2.4,
}


def run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    print(">", " ".join(cmd))
    return subprocess.run(cmd, check=True, text=True, capture_output=True)


def probe_duration(path: Path) -> float:
    r = run(
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
    return float(r.stdout.strip() or "0")


def find_clip(stem: str) -> Path:
    for base in (HQ, OUT):
        p = base / f"{stem}.mp4"
        if p.exists():
            return p
    raise FileNotFoundError(f"Missing clip: {stem}.mp4")


def still_to_clip(frame: Path, out: Path, duration: float) -> None:
    frames = int(duration * FPS)
    vf = (
        "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        f"zoompan=z='min(zoom+0.0006,1.1)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
        f"d={frames}:s=1080x1920:fps={FPS},"
        "eq=contrast=1.03:saturation=1.02,format=yuv420p"
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
            "-crf",
            "17",
            "-pix_fmt",
            "yuv420p",
            "-an",
            str(out),
        ]
    )


def normalize_clip(src: Path, out: Path, duration: float, *, start: float = 0.0) -> None:
    src_dur = probe_duration(src) if src.exists() else duration
    pad = max(duration - min(src_dur - start, duration), 0.0)
    vf_parts = [
        "scale=1080:1920:force_original_aspect_ratio=increase",
        "crop=1080:1920",
        f"fps={FPS}",
        "eq=contrast=1.03:saturation=1.04:brightness=0.01",
    ]
    if start > 0:
        pass  # handled by -ss
    if pad > 0.05:
        vf_parts.append(f"tpad=stop_mode=clone:stop_duration={pad}")
    vf_parts.append(f"trim=duration={duration},setpts=PTS-STARTPTS")
    vf = ",".join(vf_parts)
    cmd = ["ffmpeg", "-y"]
    if start > 0:
        cmd.extend(["-ss", str(start)])
    cmd.extend(
        [
            "-i",
            str(src),
            "-vf",
            vf,
            "-t",
            str(duration),
            "-c:v",
            "libx264",
            "-crf",
            "17",
            "-preset",
            "medium",
            "-pix_fmt",
            "yuv420p",
            "-an",
            str(out),
        ]
    )
    run(cmd)


def black_clip(out: Path, duration: float) -> None:
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            f"color=c=black:s=1080x1920:d={duration}:r={FPS}",
            "-c:v",
            "libx264",
            "-crf",
            "17",
            "-pix_fmt",
            "yuv420p",
            "-an",
            str(out),
        ]
    )


def prep_scene(index: int, label: str, duration: float, stem: str | None) -> Path:
    out = WORK / f"{index:02d}-{label}.mp4"
    if stem is None:
        black_clip(out, duration)
        return out

    if stem == "01-prehistoric-gathering" and not (HQ / f"{stem}.mp4").exists():
        still_to_clip(FRAMES / "01-prehistoric-gathering.png", out, duration)
        return out

    src = find_clip(stem)
    offset = CLIP_OFFSETS.get(label, 0.0)
    normalize_clip(src, out, duration, start=offset)
    return out


def xfade_chain(clips: list[Path], out: Path) -> None:
    if len(clips) == 1:
        shutil.copy2(clips[0], out)
        return

    inputs: list[str] = []
    for c in clips:
        inputs.extend(["-i", str(c)])

    durs = [probe_duration(c) for c in clips]
    parts: list[str] = []
    prev = "[0:v]"
    cumulative = durs[0]

    for i in range(1, len(clips)):
        offset = max(cumulative - XFADE, 0.0)
        label = f"[v{i}]" if i < len(clips) - 1 else "[vxf]"
        parts.append(
            f"{prev}[{i}:v]xfade=transition=fadeblack:duration={XFADE}:offset={offset:.3f}{label}"
        )
        prev = label
        cumulative = offset + durs[i]

    parts.append("[vxf]noise=alls=5:allf=t+u,format=yuv420p[vout]")

    run(
        [
            "ffmpeg",
            "-y",
            *inputs,
            "-filter_complex",
            ";".join(parts),
            "-map",
            "[vout]",
            "-c:v",
            "libx264",
            "-crf",
            "16",
            "-preset",
            "medium",
            "-pix_fmt",
            "yuv420p",
            "-an",
            str(out),
        ]
    )


def mix_vo(video: Path, out: Path) -> None:
    vo_dur = probe_duration(VO)
    vid_dur = probe_duration(video)
    total = max(vid_dur, vo_dur + VO_DELAY_MS / 1000 + 1.5)
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
            "-crf",
            "16",
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
    HQ.mkdir(parents=True, exist_ok=True)

    if not VO.exists():
        raise FileNotFoundError(f"Missing narration: {VO}")

    prepared: list[Path] = []
    for i, (label, dur, stem) in enumerate(SCENES):
        prepared.append(prep_scene(i, label, dur, stem))

    silent = WORK / "silent-xfade.mp4"
    xfade_chain(prepared, silent)
    shutil.copy2(silent, AMBIENT)
    mix_vo(silent, FINAL)

    desktop = Path.home() / "Desktop" / "Evolution of the Fight - WATCH THIS.mp4"
    shutil.copy2(FINAL, desktop)

    print(f"\nDone:\n  {FINAL}\n  Desktop: {desktop}\n  Duration: {probe_duration(FINAL):.1f}s")


if __name__ == "__main__":
    main()
