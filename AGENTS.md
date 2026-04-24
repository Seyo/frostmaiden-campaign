# AGENTS.md — Frostmaiden Campaign Wiki

This file defines agent capabilities and code-health goals for the Frostmaiden campaign vault, published via Quartz v4. It is the entry point for any AI agent working in this repository.

## Project Context

- **Vault:** Obsidian + Quartz v4 → GitHub Pages
- **Language rule:** Reason in English; output wiki content in Swedish
- **Structure:** See `CLAUDE.md` for full vault conventions, data–layout separation rules, and wikilink formatting

## Code Health Goals (CodeScene-inspired)

Apply the following lenses when analyzing or generating campaign content:

| Goal | Definition |
|------|------------|
| **Hotspot detection** | Notes that are heavily cross-linked AND frequently edited carry the most narrative risk — they need the most consistency care |
| **Low cohesion** | A note mixing unrelated concerns (e.g. a location file tracking faction politics) should be split |
| **Coupling** | A note that `[[wikilinks]]` to 10+ others is tightly coupled; changes ripple across the graph |
| **Churn** | Notes edited across many sessions are "unstable lore" — flag for canonization |
| **Orphans** | Notes with zero inbound links are unintegrated — surface them for connection |

These goals inform the `campaign-health-report` skill but should guide all content generation.

## Skills

Skills live in `.agents/skills/`. Each skill has a `SKILL.md` spec, a `scripts/` subdirectory for executable logic, and a `references/` subdirectory for templates and lore anchors.

| Skill | Purpose |
|-------|---------|
| [`map-data-sync`](.agents/skills/map-data-sync/SKILL.md) | Safely append a new pin to `quartz/static/map-data.js` |
| [`session-distiller`](.agents/skills/session-distiller/SKILL.md) | Convert raw notes or transcription into a structured session page |
| [`lore-consistency-check`](.agents/skills/lore-consistency-check/SKILL.md) | Validate new entries against `content/Platser/` and established canon |
| [`link-validator`](.agents/skills/link-validator/SKILL.md) | Verify all `[[wikilinks]]` in new content resolve to real vault files |
| [`campaign-health-report`](.agents/skills/campaign-health-report/SKILL.md) | Generate a CodeScene-style hotspot report on the vault |
| [`plan-runner`](.agents/skills/plan-runner/SKILL.md) | Execute one pending phase from `task_plan.md`, update planning files, then stop |

## Global Agent Rules

1. **Reason in English, output content in Swedish** — all wiki notes, session pages, and NPC entries must be in Swedish.
2. **Never hardcode data in HTML** — use `map-data.js` and `timeline-data.js` as the sole source of truth.
3. **Wikilinks must resolve** — run `link-validator` on any batch of new content before committing.
4. **Deceased characters** — mark with `†` in filename and body text.
5. **Data–layout separation** — see `CLAUDE.md` for the canonical data-file table.
6. **Portraits** — embed with `<div class="portrait-right">![[image.png]]</div>`, stored alongside the `.md` file.
