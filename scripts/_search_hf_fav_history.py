"""Search Chrome history for favourites page and all higgsfield.ai paths."""
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
            SELECT url, title, last_visit_time
            FROM urls
            WHERE url LIKE '%higgsfield.ai%'
            ORDER BY last_visit_time DESC
            LIMIT 80
            """
        )
        rows = cur.fetchall()
        print(f"\n=== {profile}: {len(rows)} higgsfield.ai URLs ===")
        for url, title, _ in rows:
            if any(k in url.lower() for k in ("favour", "favor", "asset", "library", "image", "supercomputer", "star")):
                print(url[:160])
                if title:
                    print(f"  {title[:100]}")
        conn.close()


if __name__ == "__main__":
    main()
