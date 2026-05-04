---
name: lore-consistency-check
description: Validate that a new content entry is internally consistent with existing lore in content/Platser/, NPC/, Sessions/, and Fraktioner/.
---

## Purpose

Before committing a new note or batch of edits, check for contradictions, name mismatches, and timeline violations against established canon.

## Inputs

- New or edited file content (paste inline or provide file path)
- Scope of comparison (default: `content/Platser/`, `content/NPC/`, `content/Sessions/`, `content/Fraktioner/`)

The Swedish vault under `content/` is the source of truth for canon. The English mirror in `content-en/` is a translation — if a fact is changed in `content/`, the corresponding `content-en/` file should be updated to match (drift between the two is itself a finding).

## Checks

| Check | What to look for |
|-------|-----------------|
| **Name consistency** | Same NPC or location referred to by different spellings |
| **Timeline** | Campaign-day references out of order with `quartz/static/data/timeline.json` |
| **Faction alignment** | NPC's stated faction differs from their file in `Fraktioner/` |
| **Deceased flag** | NPC known to be dead (†) but referenced as living |
| **Geography** | Described travel distances or directions contradict `content/Platser/` notes |
| **Ability continuity** | Character gains an ability before the session it was acquired |
| **Bilingual drift** | `content-en/` mirror contradicts the Swedish source for the same file |

## Reasoning Instructions

1. Parse the new content for all proper nouns (names, places, factions, item names).
2. Cross-reference each against existing files using case-insensitive, diacritic-tolerant matching.
3. Check any campaign-day references against `quartz/static/data/timeline.json`.
4. Categorize each finding: **Konflikt** (blocks merge), **Varning** (review suggested), **OK**.
5. For name mismatches, suggest the canonical form as used by the majority of existing files.

**Reason in English. Report output in Swedish, using the severity labels below.**

## Output Format

```
## Lore Consistency Report — [filnamn]

### Konflikter (måste åtgärdas)
- [Beskrivning av konflikten och vilka filer som kolliderar]

### Varningar (bör granskas)
- [Beskrivning av potentiell inkonsekvens]

### Godkänt
- [Antal] egennamn verifierade utan problem.
```

## References

See `references/canonical-names.md` for the authoritative spelling list of recurring proper nouns.
