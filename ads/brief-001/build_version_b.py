"""Build Director's Brief 001 Version B — cinematic mystery (no VO + text overlays)."""
from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
INPUT = ROOT / "ads/output/FUTURE-IS-HERE-15s-9x16-ambient.mp4"
OUTPUT = ROOT / "ads/brief-001/output/Director_Brief_001_Version_B_Cinematic_Mystery.mp4"
FONT_BOLD = "'C\\:/Windows/Fonts/segoeuib.ttf'"
FONT_REG = "'C\\:/Windows/Fonts/segoeui.ttf'"
CYAN = "0x38BDF8"


def q(value: str) -> str:
    return "'" + value.replace("\\", "\\\\").replace(":", "\\:").replace("'", "\\'") + "'"


def draw(
    text: str,
    *,
    size: int,
    y_expr: str,
    start: float,
    end: float,
    font: str = FONT_BOLD,
    color: str = CYAN,
    shadow: str = "black@0.85",
    box: bool = False,
) -> str:
    parts = [
        f"drawtext=fontfile={font}",
        f"text={q(text)}",
        f"fontcolor={color}",
        f"fontsize={size}",
        "x=(w-text_w)/2",
        f"y={y_expr}",
        f"shadowcolor={shadow}",
        "shadowx=3",
        "shadowy=3",
        f"enable='between(t\\,{start}\\,{end})'",
    ]
    if box:
        parts.extend(["box=1", "boxcolor=black@0.55", "boxborderw=16"])
    return ":".join(parts)


filters = ",".join(
    [
        draw(
            "THE FUTURE OF LIVE ENTERTAINMENT...",
            size=44,
            y_expr="(h/2)-60",
            start=0,
            end=2,
            box=True,
        ),
        draw(
            "IT\u2019S HERE.",
            size=76,
            y_expr="(h-text_h)/2",
            start=8,
            end=10,
        ),
        draw(
            "BECOME A FOUNDING FAN",
            size=50,
            y_expr="(h/2)-40",
            start=13,
            end=15,
            box=True,
        ),
        draw(
            "creators-ai-hologram-boxing.vercel.app/landing.html",
            size=24,
            y_expr="(h/2)+35",
            start=13,
            end=15,
            font=FONT_REG,
            color="white",
            shadow="black@0.75",
        ),
    ]
)

cmd = [
    "ffmpeg",
    "-y",
    "-i",
    str(INPUT),
    "-vf",
    filters,
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "18",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "copy",
    "-movflags",
    "+faststart",
    str(OUTPUT),
]

print("Building Version B...")
subprocess.run(cmd, check=True)
print("Wrote", OUTPUT)
