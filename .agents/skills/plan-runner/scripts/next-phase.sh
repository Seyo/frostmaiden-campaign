#!/usr/bin/env bash
# next-phase.sh
# Prints the title and status of the first pending phase in task_plan.md.
# Usage: bash .agents/skills/plan-runner/scripts/next-phase.sh
# Exit code: 0 if a pending phase was found, 1 if all complete or file missing.

PLAN="${1:-task_plan.md}"

if [ ! -f "$PLAN" ]; then
  echo "ERROR: $PLAN not found. Are you in the project root?"
  exit 1
fi

# Find the first ## Phase block whose Status line is `pending`
awk '
  /^## Phase / { phase = $0; in_phase = 1 }
  in_phase && /\*\*Status:\*\* `pending`/ {
    print phase
    print "Status: pending"
    exit 0
  }
  in_phase && /^## Phase / && NR > 1 { in_phase = 0 }
' "$PLAN"

# If awk found nothing, print all-done message
if ! grep -q '`pending`' "$PLAN"; then
  echo "All phases complete."
  exit 1
fi
