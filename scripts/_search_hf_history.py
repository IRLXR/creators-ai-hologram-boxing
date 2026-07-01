"""Search copied Chrome History DBs for Higgsfield asset URLs."""
import re
import sqlite3
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent
PROFILES = ("Default", "Profile21", "Profile30")
JOB_RE = re.compile(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", re.I)


def main() -> None:
    all_urls: list[tuple[str, str, str]] = []
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
            WHERE url LIKE '%higgsfield%'
               OR url LIKE '%cloudfront.net/user_36qUG9%'
               OR url LIKE '%upload.higgsfield%'
            ORDER BY last_visit_time DESC
            LIMIT 100
            """
        )
        for row in cur.fetchall():
            all_urls.append((profile, *row))
        conn.close()

    print(f"Found {len(all_urls)} Higgsfield-related URLs in history\n")
    seen_jobs: set[str] = set()
    for profile, url, title, _t in all_urls:
        print(f"[{profile}] {url[:140]}")
        if title:
            print(f"  title: {title[:80]}")
        for m in JOB_RE.findall(url):
            seen_jobs.add(m.lower())
        print()

    print("Unique job IDs from URLs:")
    for jid in sorted(seen_jobs):
        print(f"  {jid}")


if __name__ == "__main__":
    main()
