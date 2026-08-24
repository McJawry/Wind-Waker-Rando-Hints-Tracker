#!/usr/bin/env python3
import hashlib
import json
import mimetypes
import os
import posixpath
import socketserver
import sys
import urllib.parse
import webbrowser
from http.server import SimpleHTTPRequestHandler


ROOT = os.path.dirname(os.path.abspath(__file__))
BASE_PORT = 8757


def folder_port(root):
    digest = hashlib.sha256(os.path.abspath(root).lower().encode("utf-8")).digest()
    return BASE_PORT + (int.from_bytes(digest[:2], "little") % 1000)


class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        path = urllib.parse.urlparse(path).path
        path = posixpath.normpath(urllib.parse.unquote(path))
        parts = [part for part in path.split("/") if part and part not in (".", "..")]
        return os.path.join(ROOT, *parts)

    def log_message(self, format, *args):
        return

    def do_GET(self):
        if self.path in ("/", ""):
            self.path = "/index.html"
        if urllib.parse.urlparse(self.path).path == "/preferences.json":
            self.send_preferences()
            return
        super().do_GET()

    def do_POST(self):
        if urllib.parse.urlparse(self.path).path != "/preferences.json":
            self.send_error(405, "Method not allowed")
            return

        length = int(self.headers.get("Content-Length", "0"))
        body = self.rfile.read(length)
        try:
            json.loads(body.decode("utf-8"))
        except Exception:
            self.send_response(400)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(b'{"ok":false}')
            return

        with open(os.path.join(ROOT, "preferences.json"), "wb") as preferences:
            preferences.write(body)

        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write(b'{"ok":true}')

    def send_preferences(self):
        path = os.path.join(ROOT, "preferences.json")
        if os.path.exists(path):
            with open(path, "rb") as preferences:
                body = preferences.read()
        else:
            body = b"{}"

        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


mimetypes.add_type("text/javascript", ".js")

port_offset = folder_port(ROOT) - BASE_PORT
for attempt in range(1000):
    port = BASE_PORT + ((port_offset + attempt) % 1000)
    try:
        server = socketserver.ThreadingTCPServer(("localhost", port), Handler)
        server.daemon_threads = True
        break
    except OSError:
        server = None

if server is None:
    print("Could not start a local page server.", file=sys.stderr)
    sys.exit(1)

url = f"http://localhost:{port}/index.html"
print(f"Wind Waker Randomizer Hint Tracker is running at {url}")
print("Keep this window open while using the tracker. Press Ctrl+C to stop it.")
webbrowser.open(url)

try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
