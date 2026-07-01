"""Scan browser profiles for Higgsfield session cookies (via temp copy)."""
import json
import os
import shutil
import sqlite3
import tempfile
from pathlib import Path


def chrome_key(local_state_path: Path) -> bytes:
    import base64
    import win32crypt

    data = json.loads(local_state_path.read_text(encoding="utf-8"))
    enc_key = base64.b64decode(data["os_crypt"]["encrypted_key"])[5:]
    return win32crypt.CryptUnprotectData(enc_key, None, None, None, 0)[1]


def decrypt_value(raw: bytes, key: bytes) -> str:
    if raw[:3] in (b"v10", b"v11"):
        from Cryptodome.Cipher import AES

        nonce = raw[3:15]
        payload = raw[15:]
        cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
        return cipher.decrypt_and_verify(payload[:-16], payload[-16:]).decode("utf-8")
    import win32crypt

    return win32crypt.CryptUnprotectData(raw, None, None, None, 0)[1].decode("utf-8")


def main() -> None:
    local = Path(os.environ["LOCALAPPDATA"])
    found_session = None
    for browser in ("Google/Chrome/User Data", "Microsoft/Edge/User Data"):
        base = local / browser
        ls = base / "Local State"
        if not ls.exists():
            continue
        try:
            key = chrome_key(ls)
        except Exception as exc:
            print(f"{browser}: key error {exc}")
            continue
        print(f"=== {browser} ===")
        for profile_dir in sorted(base.iterdir()):
            if not profile_dir.is_dir():
                continue
            db = profile_dir / "Network/Cookies"
            if not db.exists():
                continue
            tmp = Path(tempfile.gettempdir()) / f"hf_ck_{profile_dir.name}.db"
            try:
                shutil.copy2(db, tmp)
            except Exception as exc:
                print(f"  {profile_dir.name}: copy failed ({exc})")
                continue
            conn = sqlite3.connect(str(tmp))
            cur = conn.cursor()
            cur.execute(
                "SELECT name, encrypted_value, host_key FROM cookies "
                "WHERE host_key LIKE '%higgsfield%'"
            )
            rows = cur.fetchall()
            if rows:
                print(f"  {profile_dir.name}: {len(rows)} cookie(s)")
                for name, enc, host in rows:
                    try:
                        val = decrypt_value(enc, key)
                        tag = "JWT" if val.startswith("eyJ") else val[:24]
                        print(f"    {host} | {name} | len={len(val)} | {tag}")
                        if name == "__session" and val.startswith("eyJ"):
                            found_session = val
                    except Exception as exc:
                        print(f"    {host} | {name} | decrypt error: {exc}")
            conn.close()
    if found_session:
        out = Path(__file__).resolve().parent / "_hf_token.txt"
        out.write_text(found_session, encoding="utf-8")
        print(f"\nSession saved to {out.name} ({len(found_session)} chars)")
    else:
        print("\nNo __session JWT found in any accessible profile.")


if __name__ == "__main__":
    main()
