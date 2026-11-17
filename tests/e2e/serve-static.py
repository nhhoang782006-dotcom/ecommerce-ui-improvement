from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class CourseworkHTTPServer(ThreadingHTTPServer):
    request_queue_size = 64


project_root = Path(__file__).resolve().parents[3]
handler = partial(SimpleHTTPRequestHandler, directory=str(project_root))
CourseworkHTTPServer(("127.0.0.1", 4173), handler).serve_forever()
