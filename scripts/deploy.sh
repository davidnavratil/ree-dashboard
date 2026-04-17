#!/usr/bin/env bash
set -euo pipefail

SERVER="77.42.84.152"
REMOTE_DIR="/var/www/davidnavratil.com/analyses/ree-dashboard"
SSH_USER="root"

cd "$(dirname "$0")/.."
export PATH="$HOME/local/node/bin:$PATH"

echo "Building REE Dashboard..."
npm run build

echo "Fixing Next.js static export: adding index.html to lang dirs..."
for lang in cs en; do
  if [ -f "out/${lang}.html" ] && [ -d "out/${lang}" ] && [ ! -f "out/${lang}/index.html" ]; then
    cp "out/${lang}.html" "out/${lang}/index.html"
    echo "  Created ${lang}/index.html"
  fi
done

echo "Deploying to $SERVER..."
ssh "${SSH_USER}@${SERVER}" "mkdir -p ${REMOTE_DIR}"
rsync -avz --delete out/ "${SSH_USER}@${SERVER}:${REMOTE_DIR}/"

echo "Done. https://davidnavratil.com/analyses/ree-dashboard/"
