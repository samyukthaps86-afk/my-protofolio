@echo off
echo ===================================================
echo Starting Samyuktha's Portfolio Website...
echo ===================================================
start "" "http://127.0.0.1:3000"
echo Server running at http://127.0.0.1:3000
echo Press Ctrl+C to stop the server.
python -m http.server 3000
