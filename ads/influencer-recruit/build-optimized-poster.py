"""TikTok-optimized influencer open-call poster — 9:16 hook-first layout."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont

ROOT = Path(__file__).resolve().parents[2]
BG = ROOT / "assets/social-collection-002/POST-008-first-step-1080x1350.png"
OUT = Path(__file__).resolve().parent / "output"
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1080, 1920
base = Image.open(BG).convert("RGB")
src_w, src_h = base.size
scale = max(W / src_w, H / src_h)
resized = base.resize((int(src_w * scale), int(src_h * scale)), Image.LANCZOS)
left = (resized.width - W) // 2
top = (resized.height - H) // 2
canvas = resized.crop((left, top, left + W, top + H))
canvas = ImageEnhance.Brightness(canvas).enhance(0.55)

overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
for y in range(H):
    alpha = int(200 * (y / H) ** 1.3)
    od.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
for y in range(500):
    alpha = int(140 * (1 - y / 500))
    od.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
canvas = Image.alpha_composite(canvas.convert("RGBA"), overlay).convert("RGB")
draw = ImageDraw.Draw(canvas)

for fp in [r"C:\Windows\Fonts\arialbd.ttf", r"C:\Windows\Fonts\impact.ttf"]:
    try:
        h1 = ImageFont.truetype(fp, 88)
        h2 = ImageFont.truetype(fp, 72)
        body = ImageFont.truetype(fp, 40)
        cta = ImageFont.truetype(fp, 36)
        break
    except OSError:
        h1 = h2 = body = cta = ImageFont.load_default()


def center(text, y, font, fill, stroke=3):
    lines = text.split("\n")
    cy = y
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        x = (W - tw) // 2
        draw.text((x, cy), line, font=font, fill=fill, stroke_width=stroke, stroke_fill=(0, 0, 0))
        cy += th + 10


center("OPEN CALL", 180, h1, (255, 255, 255), 4)
center("STREAMERS\n& CREATORS", 300, h2, (57, 255, 20), 4)
center("WE WANT YOU", 520, h1, (255, 255, 255), 4)
center("Live stream the first event.\nYour fans watch ringside.", 680, body, (34, 211, 238), 2)
center("VIP access · Co-stream · Brand deals", 820, body, (255, 255, 255), 2)
center("DM @hologramboxing", 1680, cta, (57, 255, 20), 3)
center("hologramboxing.com", 1740, cta, (251, 191, 36), 2)

out = OUT / "OPEN-CALL-OPTIMIZED-TIKTOK-9x16.png"
canvas.save(out, quality=95)
print(out)
