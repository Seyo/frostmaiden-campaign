#!/usr/bin/env bash
# health-report.sh — collect raw data for campaign-health-report
# Outputs two TSV tables: churn counts and outbound link counts.
set -euo pipefail

VAULT_ROOT="${1:-content}"

echo "=== CHURN (commits per file) ==="
git log --name-only --pretty=format: -- "$VAULT_ROOT" \
  | grep '\.md$' \
  | sort \
  | uniq -c \
  | sort -rn \
  | head -20

echo ""
echo "=== OUTBOUND LINKS (wikilink count per file) ==="
grep -roh '\[\[[^]]*\]\]' "$VAULT_ROOT" --include='*.md' \
  | sed 's|:.*||' \
  | sort \
  | uniq -c \
  | sort -rn \
  | head -20

echo ""
echo "=== OVERSIZED FILES (> 200 lines) ==="
find "$VAULT_ROOT" -name '*.md' | while read -r f; do
  lines=$(wc -l < "$f")
  if [ "$lines" -gt 200 ]; then
    echo "$lines  $f"
  fi
done | sort -rn
