"""Extract Full VO from UGC script markdown files."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "ugc"
SKIP = {
    "README.md",
    "AD-COPY.md",
    "ADS-GUIDE.md",
    "SITE-TOPIC-MAP.md",
    "TIKTOK-what-is-hologram-boxing.md",
    "_PAID-AD-BLOCK.md",
}


def extract_vo(text: str) -> str:
    m = re.search(r"## Full VO[^\n]*\n\n> (.+?)(?:\n\n---|\n\n## |\Z)", text, re.S)
    if not m:
        return ""
    lines = []
    for line in m.group(1).strip().splitlines():
        line = line.strip()
        if line.startswith(">"):
            line = line[1:].strip()
        if line:
            lines.append(line)
    vo = " ".join(lines)
    vo = re.sub(r"\*\*([^*]+)\*\*", r"\1", vo)
    return vo


def word_count(s: str) -> int:
    return len(s.split())


def parts_for_vo(vo: str) -> list[str]:
    """Split VO into ~15s chunks (~38 words each at TikTok pace)."""
    words = vo.split()
    if len(words) <= 42:
        return [vo]
    chunks: list[str] = []
    i = 0
    target = 38
    while i < len(words):
        end = min(i + target, len(words))
        if end < len(words):
            # break at sentence boundary if possible
            chunk_words = words[i:end]
            for j in range(len(chunk_words) - 1, max(0, len(chunk_words) - 12), -1):
                if chunk_words[j].endswith((".", "!", "?", "…")):
                    end = i + j + 1
                    break
        chunks.append(" ".join(words[i:end]))
        i = end
    return chunks


def main() -> None:
    scripts = sorted(p for p in ROOT.glob("*.md") if p.name not in SKIP and re.match(r"\d", p.name))
    for p in scripts:
        vo = extract_vo(p.read_text(encoding="utf-8", errors="replace"))
        parts = parts_for_vo(vo)
        print(f"{p.stem}\t{word_count(vo)}w\t{len(parts)}p\t{vo[:80]}...")


if __name__ == "__main__":
    main()
