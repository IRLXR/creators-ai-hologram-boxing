"""Extract all Higgsfield CDN asset URLs from copied Chrome History DBs."""
import re
import sqlite3
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent
PROFILES = ("Default", "Profile21", "Profile30")
CDN_RE = re.compile(
    r"https://d8j0ntlcm91z4\.cloudfront\.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/"
    r"(hf_[^\s\"']+\.(?:png|webp|jpg|jpeg|mp4))",
    re.I,
)


def main() -> None:
    urls: dict[str, tuple[str, str]] = {}
    for profile in PROFILES:
        db = SCRIPTS / f"_hist_{profile}.tmp"
        if not db.exists():
            continue
        conn = sqlite3.connect(str(db))
        cur = conn.cursor()
        cur.execute(
            """
            SELECT url, title, last_visit_time
            FROM urls
            WHERE url LIKE '%cloudfront.net/user_36qUG9%'
               OR url LIKE '%upload.higgsfield.ai/user_36qUG9%'
            ORDER BY last_visit_time DESC
            """
        )
        for url, title, visit in cur.fetchall():
            m = CDN_RE.search(url)
            if not m:
                continue
            fname = m.group(1)
            if fname not in urls or visit > urls[fname][1]:
                urls[fname] = (profile, str(visit))
        conn.close()

    images = sorted(
        (f, p, v) for f, (p, v) in urls.items() if f.lower().endswith((".png", ".webp", ".jpg", ".jpeg"))
    )
    print(f"Found {len(images)} unique CDN image(s)\n")
    for fname, profile, visit in images:
        print(f"[{profile}] {fname}")
    print("\n--- URLs ---")
    for fname, _, _ in images:
        print(f"https://d8j0ntlcm91z4.cloudfront.net/user_36qUG9ViEiTTb1uSQP8OYOk94zV/{fname}")


if __name__ == "__main__":
    main()
