import json, os, sqlite3
from pathlib import Path

def chrome_key(local_state_path):
    import base64, win32crypt
    data = json.loads(local_state_path.read_text(encoding="utf-8"))
    enc_key = base64.b64decode(data["os_crypt"]["encrypted_key"])[5:]
    return win32crypt.CryptUnprotectData(enc_key, None, None, None, 0)[1]

def decrypt_value(raw, key):
    if raw[:3] in (b"v10", b"v11"):
        from Cryptodome.Cipher import AES
        nonce = raw[3:15]
        payload = raw[15:]
        cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
        return cipher.decrypt_and_verify(payload[:-16], payload[-16:]).decode("utf-8")
    import win32crypt
    return win32crypt.CryptUnprotectData(raw, None, None, None, 0)[1].decode("utf-8")

local = Path(os.environ["LOCALAPPDATA"])
for browser in ["Google/Chrome/User Data", "Microsoft/Edge/User Data"]:
    base = local / browser
    if not (base / "Local State").exists():
        continue
    key = chrome_key(base / "Local State")
    print("BROWSER", browser)
    for profile_dir in base.iterdir():
        if not profile_dir.is_dir():
            continue
        db = profile_dir / "Network/Cookies"
        if not db.exists():
            continue
        print(" PROFILE", profile_dir.name)
        try:
            conn = sqlite3.connect(db.as_uri() + "?mode=ro&nolock=1", uri=True)
        except Exception as e:
            print("  open failed", e)
            continue
        cur = conn.cursor()
        cur.execute(
            "SELECT name, host_key, encrypted_value FROM cookies "
            "WHERE host_key LIKE '%higgsfield%' OR host_key LIKE '%clerk%'"
        )
        for name, host, enc in cur.fetchall():
            try:
                val = decrypt_value(enc, key)
                preview = val[:40] + "..." if len(val) > 40 else val
            except Exception as e:
                preview = f"<decrypt error: {e}>"
            print(f"  {host} | {name} | {preview}")
        conn.close()
