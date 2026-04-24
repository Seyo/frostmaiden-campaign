---
name: link-validator
description: Scan new or edited content for [[wikilinks]] and verify each resolves to a real file in the vault.
---

## Purpose

Catch broken `[[wikilinks]]` before they reach the published site. A broken link in Quartz renders as plain text, silently breaking the knowledge graph.

## Inputs

- File path(s) or raw content to scan
- Vault root directory (default: `content/`)

## Algorithm

1. Extract all `[[Link]]` and `[[Link|Alias]]` patterns from the input.
2. Normalize each link: strip alias, trim whitespace.
3. Search for a matching `.md` file anywhere under `content/` (recursive, case-insensitive, with and without hyphens).
4. Classify each as **VALID**, **STUB NEEDED** (doesn't exist but clearly should), **AMBIGUOUS** (multiple matches), or **BROKEN** (no plausible match found).

## Reasoning Instructions

1. Run `scripts/validate-links.js` if Node.js is available; otherwise perform the check manually.
2. For **BROKEN** links, suggest the closest existing filename using edit-distance reasoning.
3. Distinguish **STUB NEEDED** (a new NPC or location being introduced that warrants its own note) from **BROKEN** (a typo or stale reference).
4. Group results by severity: broken → stub-needed → ambiguous → valid.

**Reason in English. Output the report in Swedish.**

## Output Format

```
## Länkvalidering — [filnamn/datum]

### Brutna länkar (måste åtgärdas)
- `[[BrokenLink]]` — ingen matchning hittades. Menade du `[[Befintlig Fil]]`?

### Stubbar som behövs (skapa dessa filer)
- `[[Ny NPC]]` → skapa `NPC/Ny-NPC.md`

### Tvetydiga (flera möjliga matchningar)
- `[[Berg]]` → matchar både `Platser/Kelvin-Berg.md` och `Platser/Nordberg.md`

### Giltiga
- 14 av 17 länkar verifierade.
```

## References

See `scripts/validate-links.js` for the Node.js implementation.
