#!/usr/bin/env python3
"""Static dev server with /api/* proxy to production (for local GHL testing)."""

from __future__ import annotations

import json
import os
import ssl
import sys
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROXY_TARGET = os.environ.get('HB_API_PROXY', 'https://www.hologramboxing.com')
PORT = int(os.environ.get('PORT', '3000'))

try:
    import certifi

    SSL_CONTEXT = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    SSL_CONTEXT = ssl.create_default_context()


class DevHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_OPTIONS(self):
        if self.path.startswith('/api/'):
            self.send_response(204)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            return
        self.send_error(501, 'Unsupported method')

    def do_POST(self):
        if not self.path.startswith('/api/'):
            self.send_error(501, 'Unsupported method (POST)')
            return

        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length) if length else b''
        url = f'{PROXY_TARGET}{self.path.split("?", 1)[0]}'

        req = urllib.request.Request(url, data=body, method='POST')
        req.add_header('Content-Type', self.headers.get('Content-Type', 'application/json'))

        try:
            with urllib.request.urlopen(req, timeout=30, context=SSL_CONTEXT) as resp:
                data = resp.read()
                self.send_response(resp.status)
                self.send_header('Content-Type', resp.headers.get('Content-Type', 'application/json'))
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(data)
        except urllib.error.HTTPError as err:
            payload = err.read()
            self.send_response(err.code)
            self.send_header('Content-Type', err.headers.get('Content-Type', 'application/json'))
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(payload or json.dumps({'error': err.reason}).encode())
        except Exception as err:  # noqa: BLE001
            self.send_response(502)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(err)}).encode())

    def log_message(self, format, *args):
        if args and isinstance(args[-1], str) and 'Broken pipe' in args[-1]:
            return
        super().log_message(format, *args)


def main():
    os.chdir(ROOT)
    server = ThreadingHTTPServer(('', PORT), DevHandler)
    print(f'Hologram Boxing dev server: http://localhost:{PORT}/')
    print(f'API proxy: /api/* -> {PROXY_TARGET}/api/*')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nStopped.')
        sys.exit(0)


if __name__ == '__main__':
    main()
