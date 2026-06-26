import http.server
import socketserver
import sys

PORT = 8000

class LuxurySalonHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Disable caching in development for instant updates
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

# Map JSX extensions to standard javascript MIME type so browser doesn't block execution
LuxurySalonHandler.extensions_map.update({
    '.jsx': 'application/javascript',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html'
})

print("==========================================================")
print("             SADHANA LUXURY SALON & SPA                   ")
print("          Zero-Node Local Development Server              ")
print("==========================================================")

try:
    with socketserver.TCPServer(("", PORT), LuxurySalonHandler) as httpd:
        print(f"🚀 Dev Server initialized successfully!")
        print(f"🔗 Click to view: http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server.\n")
        httpd.serve_forever()
except Exception as e:
    print(f"❌ Failed to start server: {e}", file=sys.stderr)
    print("Ensure port 8000 is not in use.", file=sys.stderr)
    sys.exit(1)
except KeyboardInterrupt:
    print("\n👋 Server stopped. Have a nice day!")
    sys.exit(0)
