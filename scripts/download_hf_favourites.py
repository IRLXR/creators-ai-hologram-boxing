"""Download favorited Higgsfield images via fnf.higgsfield.ai (browser session)."""
from __future__ import annotations

import argparse
import base64
import json
import os
import sqlite3
from pathlib import Path

import httpx

API = "https://fnf.higgsfield.ai"
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)
OUT_DIR = Path(__file__).resolve().parents[1] / "adds" / "favourites"


def _chrome_key(local_state_path: Path) -> bytes | None:
    data = json.loads(local_state_path.read_text(encoding="utf-8"))
    enc_key = base64.b64decode(data["os_crypt"]["encrypted_key"])
    enc_key = enc_key[5:]  # strip DPAPI prefix
    import win32crypt

    return win32crypt.CryptUnprotectData(enc_key, None, None, None, 0)[1]


def _decrypt_value(raw: bytes, key: bytes) -> str:
    if raw[:3] in (b"v10", b"v11"):
        from Cryptodome.Cipher import AES

        nonce = raw[3:15]
        payload = raw[15:]
        cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
        return cipher.decrypt_and_verify(payload[:-16], payload[-16:]).decode("utf-8")
    import win32crypt

    return win32crypt.CryptUnprotectData(raw, None, None, None, 0)[1].decode("utf-8")


def _read_profile_cookies(db: Path, key: bytes) -> dict[str, str]:
    import shutil
    import tempfile

    found: dict[str, str] = {}
    tmp = Path(tempfile.gettempdir()) / f"hf_ck_{db.parent.parent.name}.db"
    try:
        shutil.copy2(db, tmp)
    except OSError:
        return found

    conn = sqlite3.connect(str(tmp))
    cur = conn.cursor()
    cur.execute(
        """
        SELECT name, encrypted_value, host_key
        FROM cookies
        WHERE host_key LIKE '%higgsfield%'
          AND name IN ('__session', 'datadome', '__client', 'clerk_active_context')
        """
    )
    for name, enc, _host in cur.fetchall():
        try:
            val = _decrypt_value(enc, key)
        except Exception:
            continue
        if name == "__session" and val.startswith("eyJ"):
            found["session"] = val
        elif name == "datadome":
            found["datadome"] = val
        elif name == "__client":
            found["client"] = val
        elif name == "clerk_active_context":
            found["clerk_ctx"] = val
    conn.close()
    return found


def _read_browser_cookies() -> dict[str, str]:
    local = Path(os.environ["LOCALAPPDATA"])
    browsers = [
        local / "Google/Chrome/User Data",
        local / "Microsoft/Edge/User Data",
    ]

    for base in browsers:
        ls = base / "Local State"
        if not ls.exists():
            continue
        try:
            key = _chrome_key(ls)
        except Exception:
            continue

        for profile_dir in sorted(base.iterdir()):
            if not profile_dir.is_dir():
                continue
            db = profile_dir / "Network/Cookies"
            if not db.exists():
                continue
            found = _read_profile_cookies(db, key)
            if found.get("session"):
                return found

    return {}


def _session_from_env() -> tuple[str, dict[str, str]]:
    token = os.environ.get("HIGGSFIELD_TOKEN", "").strip()
    cookies: dict[str, str] = {}
    if token:
        return token, cookies

    cookie_string = os.environ.get("HIGGSFIELD_COOKIE", "").strip()
    if cookie_string:
        parsed: dict[str, str] = {}
        for part in cookie_string.split(";"):
            part = part.strip()
            if "=" not in part:
                continue
            k, v = part.split("=", 1)
            parsed[k.strip()] = v.strip()
        token = parsed.get("__session", "")
        if parsed.get("datadome"):
            cookies["datadome"] = parsed["datadome"]
        if token:
            return token, cookies

    token_file = Path(__file__).resolve().parent / "_hf_token.txt"
    if token_file.exists():
        token = token_file.read_text(encoding="utf-8").strip()
        if token:
            return token, cookies

    browser = _read_browser_cookies()
    token = browser.get("session", "")
    if browser.get("datadome"):
        cookies["datadome"] = browser["datadome"]
    return token, cookies


def _image_url(item: dict) -> str:
    results = item.get("results") or {}
    raw = results.get("raw") or {}
    if isinstance(raw, dict) and raw.get("url"):
        return raw["url"]
    if isinstance(results, dict) and results.get("rawUrl"):
        return results["rawUrl"]
    return item.get("url") or item.get("preview_url") or ""


def _is_image(item: dict) -> bool:
    t = (item.get("type") or item.get("media_type") or "").lower()
    if t == "image":
        return True
    results = item.get("results") or {}
    raw = results.get("raw") or {}
    return (raw.get("type") or "").lower() == "image"


def _download_images(images: list[dict], out_dir: Path) -> int:
    downloaded = 0
    for item in images:
        url = item.get("url") or _image_url(item)
        if not url:
            continue
        job_id = (item.get("id") or "asset")[:8]
        ext = ".png" if ".png" in url.lower() else ".webp" if ".webp" in url.lower() else ".jpg"
        out = out_dir / f"hf_fav_{job_id}{ext}"
        r = httpx.get(url, timeout=120, follow_redirects=True)
        r.raise_for_status()
        out.write_bytes(r.content)
        mb = len(r.content) / (1024 * 1024)
        print(f"Saved {out.name} ({mb:.2f} MB)")
        downloaded += 1
    return downloaded


def main() -> None:
    parser = argparse.ArgumentParser(description="Download favorited Higgsfield images")
    parser.add_argument(
        "--manifest",
        type=Path,
        help="JSON from scripts/hf_browser_export_favourites.js (browser console export)",
    )
    args = parser.parse_args()

    try:
        import win32crypt  # noqa: F401
        from Cryptodome.Cipher import AES  # noqa: F401
    except ImportError:
        raise SystemExit("Run: pip install pywin32 pycryptodomex")

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    if args.manifest:
        data = json.loads(args.manifest.read_text(encoding="utf-8"))
        images = data.get("images") or []
        images = [i for i in images if i.get("url")]
        if not images:
            print("No images in manifest.")
            return
        count = _download_images(images, OUT_DIR)
        print(f"\nDone — {count} image(s) in {OUT_DIR}")
        return

    token, cookies = _session_from_env()
    if not token:
        raise SystemExit(
            "No Higgsfield session found.\n"
            "Option A: Log in at https://higgsfield.ai in Chrome (Profile: hello@irlxr.com), "
            "close Chrome, re-run this script.\n"
            "Option B: On higgsfield.ai, open DevTools Console, run document.cookie, then:\n"
            "  set HIGGSFIELD_COOKIE=<paste output>\n"
            "  python scripts/download_hf_favourites.py"
        )

    headers = {"Authorization": f"Bearer {token}", "User-Agent": UA}
    client = httpx.Client(base_url=API, headers=headers, cookies=cookies, timeout=60)

    user = client.get("/user")
    if user.status_code == 401:
        raise SystemExit("Higgsfield session expired. Log in again at https://higgsfield.ai")
    user.raise_for_status()
    print(f"Authenticated as Higgsfield user {user.json().get('id', '?')[:8]}…")

    items: list[dict] = []
    for path in ("/assets/favourites", "/assets/favorites"):
        resp = client.get(path)
        if resp.status_code == 200:
            data = resp.json()
            if isinstance(data, list):
                items = data
            elif isinstance(data, dict):
                items = data.get("items") or data.get("assets") or data.get("jobs") or []
            break

    if not items:
        # Fallback: scan recent jobs for is_favourite
        resp = client.get("/jobs/accessible", params={"size": 100})
        resp.raise_for_status()
        jobs = resp.json().get("jobs") or []
        items = [j for j in jobs if j.get("is_favourite")]

    images = [i for i in items if _is_image(i)]
    images.sort(key=lambda x: x.get("created_at") or 0, reverse=True)

    if not images:
        print("No favorited images found on your Higgsfield account.")
        return

    count = _download_images(images, OUT_DIR)
    print(f"\nDone — {count} favorited image(s) in {OUT_DIR}")


if __name__ == "__main__":
    main()
