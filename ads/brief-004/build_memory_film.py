"""Assemble Brief 004 — Create a Memory (60s · 16:9 · FFmpeg cinematic v2)."""
from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BRIEF = ROOT / "ads/brief-004"
FRAMES = BRIEF / "master-frames"
OUT = BRIEF / "output"
WORK = OUT / "segments-v3"
OUT.mkdir(parents=True, exist_ok=True)

VO = OUT / "MEMORY-vo-invite-v3-fit.wav"
MUSIC = OUT / "MEMORY-bg-music-v1.wav"
FINAL = OUT / "MEMORY-60s-16x9-VO.mp4"
AMBIENT = OUT / "MEMORY-60s-16x9-ambient.mp4"

VO_DELAY_MS = 500  # brief breath before first line
MUSIC_VOL = 0.22   # bed under narration
TARGET_SEC = 60.0
XFADE = 0.25
FPS = 30
CRF = 17

# Edit map — 60s total (DIRECTORS-BRIEF + MASTER-FRAMES-SHOT-LIST)
# Act 1 0:00-0:12 · Act 2 0:12-0:28 · Act 3 0:28-0:40 · Act 4 0:40-0:48 · Act 5 0:48-1:00
_SEGMENTS: list[dict] = [
    # Act 1 — Arrival
    {"kind": "still", "frame": "01-arrival-wide-tent.png", "dur": 4.0, "zoom": 1.08, "pan": "right"},
    {"kind": "still", "frame": "02-friends-selfie-entrance.png", "dur": 3.0, "zoom": 1.1, "pan": "center"},
    {"kind": "still", "frame": "03-friends-laughing-walk-in.png", "dur": 3.0, "zoom": 1.14, "pan": "left"},
    {"kind": "still", "frame": "04-couple-entering.png", "dur": 2.0, "zoom": 1.08, "pan": "right"},
    # Act 2 — Entering & waiting (memory moments — equal 4s each)
    {"kind": "still", "frame": "05-popcorn-parent-child.png", "dur": 4.0, "zoom": 1.12, "pan": "center"},
    {"kind": "still", "frame": "06-family-photo-tent.png", "dur": 4.0, "zoom": 1.1, "pan": "right"},
    {"kind": "still", "frame": "07-first-enter-amazement.png", "dur": 4.0, "zoom": 1.12, "pan": "up"},
    {"kind": "still", "frame": "08-concession-waiting.png", "dur": 4.0, "zoom": 1.12, "pan": "left"},
    # Act 3 — Experience begins
    {"kind": "still", "frame": "09-perimeter-awe-seats.png", "dur": 4.0, "zoom": 1.1, "pan": "center"},
    {"kind": "still", "frame": "10-wave-appears-pointing.png", "dur": 8.0, "zoom": 1.12, "pan": "center"},
    # Act 4 — After the event
    {"kind": "still", "frame": "11-friends-celebrating-after.png", "dur": 4.0, "zoom": 1.08, "pan": "right"},
    {"kind": "still", "frame": "12-families-leaving-talking.png", "dur": 4.0, "zoom": 1.12, "pan": "left"},
    # Act 5 — Final memory
    {"kind": "motion", "clip": "13-child-turns-back-seedance", "dur": 6.0, "start": 0.0, "speed": 0.85,
     "fallback": "13-child-turns-back.png", "zoom": 1.08, "pan": "center"},
    {"kind": "still", "frame": "14-crane-tent-skyline.png", "dur": 4.0, "zoom": 1.1, "pan": "up"},
    {"kind": "still", "frame": "15-end-card.png", "dur": 2.0, "zoom": 1.04, "pan": "center"},
]

# Scale segment lengths so xfade chain lands on TARGET_SEC
_base_sum = sum(s["dur"] for s in _SEGMENTS)
_xfade_overlap = (len(_SEGMENTS) - 1) * XFADE
_scale = (TARGET_SEC + _xfade_overlap) / _base_sum
SEGMENTS = [{**s, "dur": round(s["dur"] * _scale, 3)} for s in _SEGMENTS]


def run(cmd: list[str], *, check: bool = True) -> subprocess.CompletedProcess[str]:
    print(">", " ".join(cmd))
    return subprocess.run(cmd, check=check, text=True, capture_output=True)


def probe_duration(path: Path) -> float:
    result = run(
        [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            str(path),
        ]
    )
    return float(result.stdout.strip() or "0")


def _zoompan(duration: float, zoom: float, pan: str) -> str:
    frames = max(int(duration * FPS), 1)
    step = (zoom - 1.0) / frames
    if pan == "left":
        x_expr = f"iw/2-(iw/zoom/2)-on*{frames}*0.08"
        y_expr = "ih/2-(ih/zoom/2)"
    elif pan == "right":
        x_expr = f"iw/2-(iw/zoom/2)+on*{frames}*0.08"
        y_expr = "ih/2-(ih/zoom/2)"
    elif pan == "up":
        x_expr = "iw/2-(iw/zoom/2)"
        y_expr = f"ih/2-(ih/zoom/2)-on*{frames}*0.07"
    else:
        x_expr = "iw/2-(iw/zoom/2)"
        y_expr = "ih/2-(ih/zoom/2)"
    return (
        f"zoompan=z='min(zoom+{step:.6f},{zoom})':"
        f"x='{x_expr}':y='{y_expr}':d={frames}:s=1920x1080:fps={FPS}"
    )


def _grade() -> str:
    return "eq=contrast=1.04:saturation=1.03:brightness=0.01,format=yuv420p"


def still_segment(frame: Path, out: Path, duration: float, *, zoom: float, pan: str) -> None:
    vf = ",".join([
        "scale=1920:1080:force_original_aspect_ratio=increase",
        "crop=1920:1080",
        _zoompan(duration, zoom, pan),
        _grade(),
    ])
    run([
        "ffmpeg", "-y", "-loop", "1", "-i", str(frame),
        "-vf", vf, "-t", str(duration),
        "-c:v", "libx264", "-crf", str(CRF), "-preset", "medium",
        "-pix_fmt", "yuv420p", "-an", str(out),
    ])


def motion_segment(src: Path, out: Path, duration: float, *, start: float, speed: float) -> None:
    src_dur = probe_duration(src)
    read_len = min(duration * speed, max(src_dur - start, 0.1))
    pad = max(duration - read_len / speed, 0.0)
    vf_parts = [
        "scale=1920:1080:force_original_aspect_ratio=increase",
        "crop=1920:1080",
        f"fps={FPS}",
        "eq=contrast=1.04:saturation=1.03:brightness=0.01",
    ]
    if speed != 1.0:
        vf_parts.append(f"setpts=PTS/{speed}")
    if pad > 0.05:
        vf_parts.append(f"tpad=stop_mode=clone:stop_duration={pad:.3f}")
    vf_parts.append(f"trim=duration={duration:.3f},setpts=PTS-STARTPTS,format=yuv420p")
    run([
        "ffmpeg", "-y", "-ss", str(start), "-i", str(src),
        "-t", str(read_len + 0.5),
        "-vf", ",".join(vf_parts),
        "-c:v", "libx264", "-crf", str(CRF), "-preset", "medium",
        "-pix_fmt", "yuv420p", "-an", str(out),
    ])


def build_segment(index: int, spec: dict) -> Path:
    out = WORK / f"{index:02d}.mp4"
    dur = spec["dur"]

    if spec["kind"] == "still":
        still_segment(
            FRAMES / spec["frame"], out, dur,
            zoom=spec.get("zoom", 1.08), pan=spec.get("pan", "center"),
        )
        return out

    clip = OUT / f"{spec['clip']}.mp4"
    if clip.exists():
        motion_segment(clip, out, dur, start=spec.get("start", 0.0), speed=spec.get("speed", 1.0))
    else:
        fb = spec.get("fallback", "13-child-turns-back.png")
        print(f"  fallback still for missing motion: {clip.name}")
        still_segment(
            FRAMES / fb, out, dur,
            zoom=spec.get("zoom", 1.08), pan=spec.get("pan", "center"),
        )
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
            f"{prev}[{i}:v]xfade=transition=fade:duration={XFADE}:offset={offset:.3f}{label}"
        )
        prev = label
        cumulative = offset + durs[i]

    parts.append("[vxf]format=yuv420p[vout]")

    run([
        "ffmpeg", "-y", *inputs,
        "-filter_complex", ";".join(parts),
        "-map", "[vout]",
        "-c:v", "libx264", "-crf", str(CRF), "-preset", "medium",
        "-pix_fmt", "yuv420p", "-an", str(out),
    ])


def pad_video_to_duration(video: Path, out: Path, duration: float) -> None:
    """Extend last frame if video is shorter than required duration."""
    cur = probe_duration(video)
    pad = max(duration - cur, 0.0)
    if pad < 0.05:
        if video != out:
            shutil.copy2(video, out)
        return
    run([
        "ffmpeg", "-y", "-i", str(video),
        "-vf", f"tpad=stop_mode=clone:stop_duration={pad:.3f},format=yuv420p",
        "-c:v", "libx264", "-crf", str(CRF), "-preset", "medium",
        "-pix_fmt", "yuv420p", "-an",
        "-t", f"{duration:.3f}", str(out),
    ])


def mix_vo(video: Path, out: Path) -> None:
    if not VO.exists():
        raise FileNotFoundError(f"Missing VO track: {VO}")

    vo_dur = probe_duration(VO)
    video_dur = probe_duration(video)
    vo_start = VO_DELAY_MS / 1000
    total = max(TARGET_SEC, video_dur, vo_start + vo_dur + 0.25)

    padded = OUT / "_video_padded.mp4"
    pad_video_to_duration(video, padded, total)

    has_music = MUSIC.exists()
    if has_music:
        audio_filter = (
            f"[1:a]adelay={VO_DELAY_MS}|{VO_DELAY_MS},apad=whole_dur={total:.3f},volume=1.0[vo];"
            f"[2:a]atrim=duration={total:.3f},volume={MUSIC_VOL}[bed];"
            f"[vo][bed]amix=inputs=2:duration=first:dropout_transition=0,"
            f"afade=t=in:st=0:d=1,afade=t=out:st={max(total - 2, 0):.3f}:d=2[aout]"
        )
        inputs = ["-i", str(padded), "-i", str(VO), "-i", str(MUSIC)]
    else:
        audio_filter = (
            f"[1:a]adelay={VO_DELAY_MS}|{VO_DELAY_MS},apad=whole_dur={total:.3f},volume=1.0[aout]"
        )
        inputs = ["-i", str(padded), "-i", str(VO)]

    run([
        "ffmpeg", "-y", *inputs,
        "-filter_complex", audio_filter,
        "-map", "0:v", "-map", "[aout]",
        "-c:v", "copy",
        "-c:a", "aac", "-b:a", "192k",
        "-t", f"{total:.3f}", str(out),
    ])
    if padded.exists() and padded != video:
        padded.unlink(missing_ok=True)


def main() -> None:
    if WORK.exists():
        shutil.rmtree(WORK)
    WORK.mkdir(parents=True)

    parts = [build_segment(i, spec) for i, spec in enumerate(SEGMENTS)]

    silent = OUT / "MEMORY-60s-16x9-silent.mp4"
    xfade_chain(parts, silent)
    shutil.copy2(silent, AMBIENT)
    mix_vo(silent, FINAL)

    video_dur = probe_duration(FINAL)
    vo_dur = probe_duration(VO)

    manifest_path = BRIEF / "MASTER-FRAMES-MANIFEST.json"
    if manifest_path.exists():
        data = json.loads(manifest_path.read_text(encoding="utf-8"))
        data["status"] = "complete"
        data["video_status"] = "complete"
        data["total_duration_sec"] = round(video_dur, 1)
        data["voiceover"] = {
            "style": "Warm · happy · invite · FOMO — not scene description",
            "provider": "elevenlabs",
            "voice": "Jessica (ElevenLabs · warm · happy · invite)",
            "path": "ads/brief-004/output/MEMORY-vo-invite-v3-fit.wav",
            "raw_path": "ads/brief-004/output/MEMORY-vo-invite-v3-raw.mp3",
            "music_path": "ads/brief-004/output/MEMORY-bg-music-v1.wav",
            "music_job_id": "215d9113-fd3b-4f15-82d3-2b8a4c972d5c",
            "duration_sec": round(vo_dur, 2),
            "vo_delay_ms": VO_DELAY_MS,
            "coverage": "invite hook · poetic close preserved",
            "status": "recorded",
        }
        data["final_film"] = {
            "path": str(FINAL.relative_to(ROOT)).replace("\\", "/"),
            "ambient_path": str(AMBIENT.relative_to(ROOT)).replace("\\", "/"),
            "aspect_ratio": "16:9",
            "assembled_at": "2026-07-04",
            "edit": "FFmpeg cinematic v3 — full Gideon VO · edit-map timing · Ken Burns + crossfades + Seedance frame 13",
        }
        for frame in data.get("frames", []):
            if frame.get("id") == "13-child-turns-back":
                frame["seedance_job_id"] = "c5b9444d-790f-4dd1-b802-2f3965769e14"
                frame["video_path"] = "ads/brief-004/output/13-child-turns-back-seedance.mp4"
        manifest_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")

    print(f"\nDone (cinematic v3):")
    print(f"  Video: {video_dur:.1f}s")
    print(f"  VO:    {vo_dur:.1f}s (delay {VO_DELAY_MS/1000:.0f}s)")
    print(f"  Xfade: {XFADE}s between {len(SEGMENTS)} shots")
    print(f"  Final: {FINAL}")


if __name__ == "__main__":
    main()
