"""
Vienkāršs serveris nometnes lapai.

Palaišana:  python serve.py
Pēc palaišanas pārlūkā automātiski atvērsies http://localhost:8000
Apturēšana: Ctrl+C (vai aizver logu).
"""
import http.server
import os
import socketserver
import sys
import webbrowser

# Lai latviešu burti drukājas arī Windows konsolē
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except AttributeError:
    pass

PORT = 8765  # ja aizņemts, automātiski mēģinās nākamos

# Vienmēr servē mapi, kurā atrodas šis skripts (lai vienalga, no kurienes palaiž)
os.chdir(os.path.dirname(os.path.abspath(__file__)))


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Bez kešošanas — config.js un CSV labojumi redzami uzreiz pēc pārlādes
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    httpd = None
    for port in range(PORT, PORT + 20):
        try:
            # Bez allow_reuse_address — Windows citādi ļauj diviem serveriem
            # klusi dalīt vienu portu, un atbild "svešais".
            # 127.0.0.1 — serveris redzams tikai šajā datorā, ne visam wi-fi tīklam
            # (mape satur arī .git ar visu vēsturi).
            httpd = socketserver.ThreadingTCPServer(("127.0.0.1", port), Handler)
            break
        except OSError:
            print(f"Ports {port} aizņemts, mēģinu nākamo...")
    if httpd is None:
        print("Neizdevās atrast brīvu portu.")
        sys.exit(1)

    url = f"http://localhost:{port}/"
    print(f"Nometnes lapa: {url}")
    print("Apturēšanai spied Ctrl+C")
    webbrowser.open(url)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServeris apturēts.")
    finally:
        httpd.server_close()
