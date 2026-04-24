---
name: map-data-sync
description: Safely append a new location pin to quartz/static/map-data.js without breaking the existing array structure.
---

## Purpose

Add a new pin to the `MAP_PINS` array in `quartz/static/map-data.js`. Both `landing.html` and `map.html` consume this file automatically — no other files need editing for the pin to appear.

## Inputs

Provide the following when invoking this skill:

| Field | Type | Notes |
|-------|------|-------|
| `name` | string (Swedish) | Display name of the location |
| `x`, `y` | number 0–100 | Percentage coordinates on the map image |
| `type` | string | One of: `town`, `dungeon`, `wilderness`, `landmark`, `faction` |
| `desc` | string (HTML allowed) | Tooltip/popup description. Use `../Platser/...` for wiki links. |
| `icon` | string (optional) | Emoji or symbol override |

## Reasoning Instructions

1. Read `quartz/static/map-data.js` in full — understand the existing array structure and formatting style.
2. Verify the new coordinates are plausible relative to nearby pins (reference `Kartor/` for the Icewind Dale map).
3. Check `content/Platser/` for an existing note — link to it from `desc` using `../Platser/Note-Name`.
4. Append the new pin object, maintaining consistent formatting: trailing comma on the previous last entry, no trailing comma on the new last entry.
5. Mentally validate that the resulting JS is syntactically correct (balanced brackets, no duplicate keys).

**Reason in English. The `name` and `desc` fields must be in Swedish.**

## Output Format

A single targeted edit to `quartz/static/map-data.js` with the new pin appended.

## References

See `references/pin-template.js` for the canonical pin object shape.
