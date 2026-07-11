from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont

base_path = Path(__file__).resolve().parents[2] / "assets/social-collection-002/POST-008-first-step-1080x1350.png"
out_dir = Path(__file__).resolve().parent / "output"
out_dir.mkdir(parents=True, exist_ok=True)

W, H = 1080, 1920
base = Image.open(base_path).convert("RGB")
src_w, src_h = base.size
scale = max(W / src_w, H / src_h)
resized = base.resize((int(src_w * scale), int(src_h * scale)), Image.LANCZOS)
left = (resized.width - W) // 2
top = (resized.height - H) // 2
canvas = resized.crop((left, top, left + W, top + H))

canvas = ImageEnhance.Brightness(canvas).enhance(0.72)
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
for y in range(H):
    alpha = int(180 * (y / H) ** 1.4)
    od.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
for y in range(420):
    alpha = int(120 * (1 - y / 420))
    od.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
canvas = Image.alpha_composite(canvas.convert("RGBA"), overlay).convert("RGB")
draw = ImageDraw.Draw(canvas)

font_paths = [
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\impact.ttf",
    r"C:\Windows\Fonts\segoeuib.ttf",
]
headline_font = sub_font = footer_font = ImageFont.load_default()
for fp in font_paths:
    try:
        headline_font = ImageFont.truetype(fp, 92)
        sub_font = ImageFont.truetype(fp, 46)
        footer_font = ImageFont.truetype(fp, 34)
        break
    except OSError:
        continue


def draw_centered_multiline(text, y, font, fill, stroke=3):
    lines = text.split("\n")
    line_heights = []
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        line_heights.append(bbox[3] - bbox[1])
    cy = y
    for i, line in enumerate(lines):
        bbox = draw.textbbox((0, 0), line, font=font)
        tw = bbox[2] - bbox[0]
        x = (W - tw) // 2
        draw.text((x, cy), line, font=font, fill=fill, stroke_width=stroke, stroke_fill=(0, 0, 0))
        cy += line_heights[i] + 12


draw_centered_multiline("CALLING ALL\nINFLUENCERS", 220, headline_font, (255, 255, 255), stroke=4)
draw_centered_multiline("LIVE STREAM THE FIRST EVENT", 560, sub_font, (34, 211, 238), stroke=3)
draw_centered_multiline("Your fans watch. You bring the energy.", 680, footer_font, (255, 255, 255), stroke=2)
draw_centered_multiline("Apply Now — hologramboxing.com", 1720, footer_font, (251, 191, 36), stroke=2)

poster = out_dir / "CALLING-ALL-INFLUENCERS-9x16.png"
canvas.save(poster, quality=95)
print(poster)
