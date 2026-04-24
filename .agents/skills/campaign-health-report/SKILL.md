---
name: campaign-health-report
description: Generate a CodeScene-style hotspot and complexity report on the vault to surface lore that needs attention.
---

## Purpose

Apply software code-health heuristics to the campaign wiki. Surface notes that are high-churn, over-coupled, or low-cohesion — the narrative equivalent of technical debt.

## Metrics

| Metric | How measured | Flag threshold |
|--------|-------------|----------------|
| **Hotspot score** | `inbound_links × git_churn` | Top 5 by score |
| **Coupling** | Count of outbound `[[wikilinks]]` | > 12 outbound |
| **Churn** | Number of commits touching the file | > 5 commits |
| **Size** | Line count | > 200 lines → consider splitting |
| **Orphan** | Zero inbound links | Any orphan = unintegrated lore |

## Reasoning Instructions

1. Run `scripts/health-report.sh` to collect raw git churn and wikilink data (or derive manually).
2. Build the inbound-link graph: for each file, count how many other files link to it.
3. Build the outbound-link graph: for each file, count how many files it links to.
4. Compute hotspot score: `inbound_links × churn_count` for each file.
5. Rank by hotspot score; flag the top 5 as priority review targets.
6. List orphans (zero inbound), oversized files (> 200 lines), and highly coupled files (> 12 outbound).
7. Write three concrete recommendations based on the findings.

**Reason in English. Write the final report in Swedish.**

## Output Format

```
## Kampanjhälsorapport — [datum]

### Hotspots (prioriterad granskning)
| Fil | Score | Inkommande | Ändringar |
|-----|-------|-----------|-----------|
| NPC/Exempel.md | 24 | 6 | 4 |

### Tätt kopplade noter (> 12 utgående länkar)
- NPC/Bar.md — 15 utgående länkar

### Instabil lore (hög churn)
- Sessions/Session-03.md — 7 commits

### Föräldralösa noter (0 inkommande länkar)
- Händelser/Händelse-X.md

### Rekommendationer
1. [Åtgärd baserad på hotspot-analys]
2. [Åtgärd för att integrera föräldralösa noter]
3. [Åtgärd för att dela upp för stora noter]
```

## References

See `scripts/health-report.sh` for the data-collection script and `references/health-glossary.md` for metric definitions in Swedish.
