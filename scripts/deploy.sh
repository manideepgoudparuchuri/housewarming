#!/usr/bin/env bash
# Build, commit, push to GitHub and wait for the GitHub Pages deploy.
# Usage: npm run deploy -- "what you changed"
set -euo pipefail
cd "$(dirname "$0")/.."

MSG="${1:-Update invitation}"
REPO="manideepgoudparuchuri/housewarming"

echo "▶ Building…"
npm run build --silent

echo "▶ Committing…"
git add -A
if git diff --cached --quiet; then
  echo "Nothing changed — nothing to deploy."
  exit 0
fi
git commit -q -m "$MSG"

echo "▶ Pushing…"
# Use the personal GitHub login from `gh`, ignoring any work token in GH_TOKEN / GITHUB_TOKEN.
TOK=$(env -u GH_TOKEN -u GITHUB_TOKEN gh auth token)
AUTH=$(printf 'x-access-token:%s' "$TOK" | base64)
git -c http.extraheader= -c http.extraheader="AUTHORIZATION: basic $AUTH" -c credential.helper= push -q origin main
unset TOK AUTH

echo "▶ Waiting for GitHub Pages deploy…"
SHA=$(git rev-parse HEAD)
RUN=""
for _ in $(seq 1 30); do
  RUN=$(env -u GH_TOKEN -u GITHUB_TOKEN gh run list -R "$REPO" --commit "$SHA" --limit 1 --json databaseId -q '.[0].databaseId')
  [ -n "$RUN" ] && break
  sleep 3
done
[ -n "$RUN" ] || { echo "Pushed, but couldn't find the deploy run — check https://github.com/$REPO/actions"; exit 1; }
env -u GH_TOKEN -u GITHUB_TOKEN gh run watch "$RUN" -R "$REPO" --exit-status >/dev/null
echo "✅ Live: https://manideepgoudparuchuri.github.io/housewarming/  (hard-refresh if you still see the old page)"
