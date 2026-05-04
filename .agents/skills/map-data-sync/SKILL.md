---
name: map-data-sync
description: Safely append a new location pin to quartz/static/data/map-pins.json without breaking the existing JSON structure.
---

## Purpose

Add a new pin to `quartz/static/data/map-pins.json`. The fetcher `quartz/static/map-data.js` loads this JSON and exposes `MAP_PINS`; both `landing.html` and `map.html` consume it automatically — no other files need editing for the pin to appear.

## Inputs

Provide the following when invoking this skill:

| Field | Type | Notes |
|-------|------|-------|
| `id` | string (kebab-case) | Stable identifier; lowercase, hyphens, ASCII (å→a, ö→o, ä→a) |
| `name` | string (Swedish) | Display name of the location |
| `name_en` | string (English) | Required if `name` contains Swedish — omit if name is already English/internationally identical |
| `x`, `y` | number 0–100 | Percentage coordinates on the map image |
| `type` | string | One of: `town`, `mountain`, `fortress`, `faction`, `event` |
| `slug` | string (URL-encoded) | Path to the relevant wiki page, e.g. `Platser/Caer-Konig` or `Sessions/Session-03---%C3%85terkomst-till-Caer-Konig` |
| `blurb` | string (Swedish, HTML allowed) | Tooltip/popup description. Use `../Platser/...` or `../NPC/...` for wiki links. |
| `blurb_en` | string (English, HTML allowed) | English mirror of `blurb` |
| `label` | boolean (optional) | Set `true` to render the name as a visible text label on the map; omit otherwise |

## Reasoning Instructions

1. Read `quartz/static/data/map-pins.json` in full — understand the existing array structure and formatting style.
2. Verify the new coordinates are plausible relative to nearby pins (reference `Kartor/` for the Icewind Dale map).
3. Check `content/Platser/`, `content/NPC/`, or `content/Sessions/` for an existing wiki page that should be linked. Set `slug` accordingly (URL-encoded; verify by inspecting other pins).
4. Append the new pin object to the JSON array, maintaining consistent formatting:
   - Trailing comma on the previous last entry.
   - **No trailing comma** on the new last entry (JSON does not allow it).
5. Validate the resulting JSON parses cleanly — e.g. `python -c "import json; json.load(open('quartz/static/data/map-pins.json', encoding='utf-8'))"`.

**Reason in English. `name` and `blurb` must be in Swedish; `name_en` and `blurb_en` must be in English.**

## Output Format

A single targeted edit to `quartz/static/data/map-pins.json` with the new pin appended.

## References

See `references/pin-template.json` for the canonical pin object shape (note: `name_en` is required only when `name` contains Swedish-specific characters; `label` is optional and defaults to false).
