#!/bin/bash
# SANO Command Center — Bundle & Deploy
# Bundles source files into index.html and pushes to GitHub/Cloudflare
# Usage: ./deploy.sh

set -e
cd "$(dirname "$0")"

echo "📦 Bundling command center..."
python3 -c "
with open('index.html.backup', 'r') if __import__('os').path.exists('index.html.backup') else open('/dev/null') as _: pass

# Read source files
import os
# Use the template (original index.html structure) if it exists, otherwise extract from current
# The template references external files - we inline them

template = '''<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, viewport-fit=cover\">
    <title>SANO Systems — Command Center</title>
    <meta name=\"description\" content=\"SANO Systems internal command center — AI-first launch tracker with agent pipeline monitoring.\">
    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">
    <link href=\"https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap\" rel=\"stylesheet\">
    <style>
CSS_PLACEHOLDER
    </style>
</head>
'''

with open('styles.css', 'r') as f:
    css = f.read()
with open('data.js', 'r') as f:
    data_js = f.read()
with open('app.js', 'r') as f:
    app_js = f.read()

# Read current index.html to get the body content
with open('index.html', 'r') as f:
    current = f.read()

# Extract body content from current file
import re
body_match = re.search(r'<body>(.*)</body>', current, re.DOTALL)
if body_match:
    body = body_match.group(1)
    # Remove old script tags (both inline and external)
    body = re.sub(r'<script[^>]*>.*?</script>', '', body, flags=re.DOTALL)
    body = re.sub(r'<script[^>]*src=[^>]*></script>', '', body)
else:
    print('ERROR: Could not extract body from index.html')
    exit(1)

# Build the final HTML
html = current.split('<body>')[0].split('<head>')[0]
html = '''<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, viewport-fit=cover\">
    <title>SANO Systems — Command Center</title>
    <meta name=\"description\" content=\"SANO Systems internal command center — AI-first launch tracker with agent pipeline monitoring.\">
    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">
    <link href=\"https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap\" rel=\"stylesheet\">
    <style>\n''' + css + '''\n    </style>
</head>
<body>''' + body + '''
    <script>\n''' + data_js + '''\n    </script>
    <script>\n''' + app_js + '''\n    </script>
</body>
</html>'''

with open('index.html', 'w') as f:
    f.write(html)

size = os.path.getsize('index.html')
print(f'✅ Bundled: index.html ({size:,} bytes)')
"

echo "📤 Pushing to GitHub..."
git add -A
git commit -m "Update command center — $(date '+%Y-%m-%d %H:%M')" 2>/dev/null || echo "No changes to commit"
git push origin master 2>/dev/null
git push origin master:main 2>/dev/null

echo "⏳ Waiting for Cloudflare deploy (15s)..."
sleep 15

echo "✅ Verifying deployment..."
LIVE_CHECK=$(curl -s https://sano-command-center.pages.dev/ | grep -c '<style>')
if [ "$LIVE_CHECK" -ge 1 ]; then
    echo "✅ DEPLOYED: https://sano-command-center.pages.dev is live with bundled version"
else
    echo "⚠️  Cloudflare may still be deploying. Check in 30 seconds."
fi
