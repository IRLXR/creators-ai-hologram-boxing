"""Build influencer staircase creatives (L4 spotlight + L5 countdown posters + 15s videos)."""
from __future__ import annotations

import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "output"
OUT.mkdir(parents=True, exist_ok=True)
PARTNERS_PATH = ROOT / "CONFIRMED-PARTNERS.json"
SITE_CONFIG = ROOT.parents[1] / "site-config.json"

W, H = 1080, 1920
BG = ROOT.parents[1] / "assets/social-collection-002/POST-008-first-step-1080x1350.png"


def load_fonts():
    for fp in (
        r"C:\Windows\Fonts\arialbd.ttf",
        r"C:\Windows\Fonts\impact.ttf",
        r"C:\Windows\Fonts\segoeuib.ttf",
    ):
        try:
            return (
                ImageFont.truetype(fp, 88),
                ImageFont.truetype(fp, 52),
                ImageFont.truetype(fp, 40),
                ImageFont.truetype(fp, 32),
            )
        except OSError:
            continue
    d = ImageFont.load_default()
    return d, d, d, d


def poster_canvas() -> Image.Image:
    base = Image.open(BG).convert("RGB")
    sw, sh = base.size
    scale = max(W / sw, H / sh)
    resized = base.resize((int(sw * scale), int(sh * scale)), Image.LANCZOS)
    left = (resized.width - W) // 2
    top = (resized.height - H) // 2
    canvas = resized.crop((left, top, left + W, top + H))
    canvas = ImageEnhance.Brightness(canvas).enhance(0.68)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for y in range(H):
        alpha = int(180 * (y / H) ** 1.4)
        od.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
    for y in range(420):
        alpha = int(120 * (1 - y / 420))
        od.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
    return Image.alpha_composite(canvas.convert("RGBA"), overlay).convert("RGB")


def draw_centered(draw, lines, y, font, fill, stroke=3, gap=14):
    cy = y
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        x = (W - tw) // 2
        draw.text((x, cy), line, font=font, fill=fill, stroke_width=stroke, stroke_fill=(0, 0, 0))
        cy += th + gap


def save_poster(name: str, lines_head, lines_sub, lines_footer, accent=(34, 211, 238)):
    headline_font, _, sub_font, footer_font = load_fonts()
    canvas = poster_canvas()
    draw = ImageDraw.Draw(canvas)
    draw_centered(draw, lines_head, 200, headline_font, (255, 255, 255), 4)
    draw_centered(draw, lines_sub, 560, sub_font, accent, 3)
    if lines_footer:
        draw_centered(draw, lines_footer, 1680, footer_font, (251, 191, 36), 2)
    path = OUT / name
    canvas.save(path, quality=95)
    return path


def save_spotlight_poster(name: str, partners: list[dict]):
    headline_font, roster_font, sub_font, footer_font = load_fonts()
    canvas = poster_canvas()
    draw = ImageDraw.Draw(canvas)
    draw_centered(draw, ["CONFIRMED", "PARTNER SPOTLIGHT"], 160, headline_font, (255, 255, 255), 4, 10)
    draw_centered(
        draw,
        ["These creators locked their co-stream slots."],
        400,
        sub_font,
        (34, 211, 238),
        2,
    )

    y = 560
    for p in partners[:3]:
        line = f"{p['handle']}  ·  {p['platform']}  ✓"
        bbox = draw.textbbox((0, 0), line, font=roster_font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        x = (W - tw) // 2
        draw.rounded_rectangle(
            (x - 28, y - 12, x + tw + 28, y + th + 20),
            radius=16,
            fill=(20, 24, 36),
            outline=(34, 211, 238),
            width=2,
        )
        draw.text((x, y), line, font=roster_font, fill=(255, 255, 255), stroke_width=2, stroke_fill=(0, 0, 0))
        y += th + 56

    draw_centered(
        draw,
        ["Your slot is still open.", "Join the HB 002 creator roster."],
        1380,
        sub_font,
        (251, 191, 36),
        2,
    )
    draw_centered(draw, ["Sign Up — hologramboxing.com"], 1680, footer_font, (255, 255, 255), 2)
    path = OUT / name
    canvas.save(path, quality=95)
    return path


def save_countdown_poster(name: str, event_name: str, days: int, hours: int):
    headline_font, big_font, sub_font, footer_font = load_fonts()
    canvas = poster_canvas()
    draw = ImageDraw.Draw(canvas)
    draw_centered(draw, ["PARTNER SLOTS", "CLOSE IN"], 180, headline_font, (255, 255, 255), 4, 8)
    draw_centered(
        draw,
        [f"{days:02d} DAYS", f"{hours:02d} HOURS"],
        620,
        big_font,
        (239, 68, 68),
        4,
        24,
    )
    draw_centered(
        draw,
        [event_name, "Co-stream hologram boxing live."],
        1080,
        sub_font,
        (34, 211, 238),
        2,
    )
    draw_centered(draw, ["Countdown synced with site — apply now"], 1680, footer_font, (251, 191, 36), 2)
    path = OUT / name
    canvas.save(path, quality=95)
    return path


def poster_to_video(png: Path, mp4: Path):
    vf = (
        "scale=1080:-2,"
        "pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x0a0b10,"
        "zoompan=z='min(zoom+0.00035,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=450:s=1080x1920:fps=30"
    )
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-loop",
            "1",
            "-i",
            str(png),
            "-vf",
            vf,
            "-t",
            "15",
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-an",
            str(mp4),
        ],
        check=True,
    )
    print(mp4)


def load_confirmed_partners() -> list[dict]:
    data = json.loads(PARTNERS_PATH.read_text(encoding="utf-8"))
    return [p for p in data["spotlight"] if p.get("status") == "confirmed"]


def countdown_parts() -> tuple[str, int, int]:
    cfg = json.loads(SITE_CONFIG.read_text(encoding="utf-8"))
    target = datetime.fromisoformat(cfg["nextEventDate"]).replace(tzinfo=timezone.utc)
    now = datetime.now(timezone.utc)
    delta = target - now
    total_seconds = max(0, int(delta.total_seconds()))
    days = total_seconds // 86400
    hours = (total_seconds % 86400) // 3600
    return cfg.get("nextEventName", "Hologram Boxing 002"), days, hours


def main():
    partners = load_confirmed_partners()
    event_name, days, hours = countdown_parts()

    # L4 — partner spotlight (social proof retargeting)
    spotlight_png = save_spotlight_poster("PARTNER-SPOTLIGHT-9x16.png", partners)
    poster_to_video(spotlight_png, OUT / "PARTNER-SPOTLIGHT-15s.mp4")

    # L4 — reminder (visited, didn't apply)
    l4_png = save_poster(
        "CREATOR-REMINDER-9x16.png",
        ["YOU LOOKED", "STREAMER SLOTS", "ARE FILLING"],
        ["Co-stream hologram boxing live.", "Your audience. Your channel. Our tent."],
        ["Finish your application — Sign Up"],
        accent=(251, 191, 36),
    )
    poster_to_video(l4_png, OUT / "CREATOR-REMINDER-15s.mp4")

    # L5 — countdown timer (synced to site-config nextEventDate)
    countdown_png = save_countdown_poster("COUNTDOWN-TIMER-9x16.png", event_name, days, hours)
    poster_to_video(countdown_png, OUT / "COUNTDOWN-TIMER-15s.mp4")

    # L5 — last call poster
    l5_png = save_poster(
        "STREAMER-LAST-CALL-9x16.png",
        ["LAST CALL", "FOR STREAMERS"],
        ["HB 002 is loading.", "Partner slots closing soon."],
        ["Sign up now — bring your followers ringside"],
        accent=(239, 68, 68),
    )
    poster_to_video(l5_png, OUT / "STREAMER-LAST-CALL-15s.mp4")

    # L1 — ensure calling-all video from existing poster
    calling_png = OUT / "CALLING-ALL-INFLUENCERS-9x16.png"
    calling_mp4 = OUT / "TIKTOK-CALLING-ALL-INFLUENCERS-15s.mp4"
    if calling_png.exists() and not calling_mp4.exists():
        poster_to_video(calling_png, calling_mp4)

    print(f"Countdown: {days}d {hours}h to {event_name}")
    print(f"Spotlight partners: {len(partners)}")


if __name__ == "__main__":
    main()
