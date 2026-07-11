"""15s 9:16 video from exact Open Call poster — no copy changes."""
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "input/hf_20260624_011044_6d239fc7-3b85-49ba-a813-6a42ad758976.png"
OUT_DIR = ROOT / "output"
OUT_DIR.mkdir(parents=True, exist_ok=True)
OUT = OUT_DIR / "OPEN-CALL-EXACT-POSTER-15s.mp4"

# Scale 3:4 poster into 9:16 canvas; subtle slow zoom keeps hook readable
vf = (
    "scale=1080:-2,"
    "pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x0a0b10,"
    "zoompan=z='min(zoom+0.00035,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=450:s=1080x1920:fps=30"
)

cmd = [
    "ffmpeg", "-y",
    "-loop", "1", "-i", str(SRC),
    "-vf", vf,
    "-t", "15",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-an",
    str(OUT),
]
subprocess.run(cmd, check=True)
print(OUT)
