"""Dump all image URLs from copied Chrome History DBs."""
import sqlite3
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent
PROFILES = ("Default", "Profile21", "Profile30")


def main() -> None:
    for profile in PROFILES:
        db = SCRIPTS / f"_hist_{profile}.tmp"
        if not db.exists():
            continue
        conn = sqlite3.connect(str(db))
        cur = conn.cursor()
        cur.execute(
            """
            SELECT url, title
            FROM urls
            WHERE url LIKE '%.png%'
               OR url LIKE '%.webp%'
               OR url LIKE '%.jpg%'
            ORDER BY last_visit_time DESC
            LIMIT 40
            """
        )
        rows = cur.fetchall()
        print(f"\n=== {profile}: {len(rows)} image URLs ===")
        for url, title in rows:
            if "higgsfield" in url or "cloudfront" in url or "upload.higgsfield" in url:
                print(url[:180])
                if title:
                    print(f"  {title[:90]}")
        conn.close()


if __name__ == "__main__":
    main()
