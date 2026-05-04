# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is an **Obsidian vault** published via **Quartz v4** to GitHub Pages at `https://seyo.github.io/frostmaiden-campaign`. It is a **Swedish-language D&D campaign wiki** for the "Rime of the Frostmaiden" campaign, organized as a linked knowledge graph using Obsidian wikilinks (`[[Note Name]]`).

There are no build/test/lint commands. To preview locally: `npx quartz build --serve` (runs on http://localhost:8080).

## Players & Roles

- **Emil (this user)** — plays **Sork the Shadow**. Maintains this vault, responsible for maps and spatial/geographic context.
- **Nasher's player** — keeps session notes and writes the in-character journal (PDF sources for session recaps). The PDF journals are written from Nasher's first-person perspective.

## Vault Structure

- **Sessions/** — Per-session recaps (sourced from Nasher's journal PDFs, translated and summarized)
- **Karaktärer/** — Player characters (Zahirs gäng: Sork, Nasher, Zahir, Borc)
- **NPC/** — Non-player characters
- **Platser/** — Locations (includes Icewind Dale overview with map)
- **Fraktioner/** — Factions (Tribe of the Owl, Ten-Towns, Dvärgarna i Dvärgadalen, etc.)
- **Uppdrag & rykten/** — Quests and rumors
- **Händelser/** — Notable campaign events
- **Kartor/** — Map images

## Conventions

- Vault content is in **Swedish**; technical config files (quartz.config.ts etc.) in English
- English names kept as-is when that's how the group refers to them (e.g. "Tribe of the Owl", "The Burning Hammers")
- Obsidian wikilinks: `[[Note Name]]` for internal links
- Deceased characters/NPCs marked with `†` in filename and text
- Character portrait images live alongside their `.md` file in `Karaktärer/` or `NPC/`
- Portraits embedded with float wrapper: `<div class="portrait-right">![[image.png]]</div>`
- Faction listed at top of each NPC/character file: `**Fraktion:** [[Faction Name]]`

## Data vs Layout — quartz/static/

Campaign data lives in JSON files in `quartz/static/data/` so HTML files only contain layout and rendering logic. The thin `*-data.js` files in `quartz/static/` are just fetchers that load the matching JSON and expose a global variable plus a `*_READY` promise pages must `await` before reading. **Never hardcode events, pins, or character data directly in HTML.** When adding new content, only the JSON file needs changing — all consumers pick it up automatically.

| JSON data file | Consumed by (mechanism) |
|---|---|
| `data/map-pins.json` | `landing.html`, `map.html` (via `map-data.js` → `MAP_PINS`) |
| `data/timeline.json` | `landing.html`, `timeline.html` (via `timeline-data.js` → `TIMELINE_SESSIONS`, `TIMELINE_EVENTS`) |
| `data/quests.json` | `quests.html` (via `quests-data.js`) |
| `data/i18n.json` | all pages (via `i18n.js` → `I18N`) |
| `data/status.json` | `landing.html` — status card (day, quote, open questions) |
| `data/characters.json` | `landing.html` — CHARACTERS array |
| `data/wiki-sections.json` | `landing.html` — WIKI_SECTIONS array |

**To add a map pin:** edit `data/map-pins.json`.  
**To add a timeline event:** edit `data/timeline.json` under `events` (keep chronological order; `landing.html` reverses automatically).  
**To add a session:** edit `data/timeline.json` under `sessions`.

In `desc` fields, HTML is allowed. Use `../Platser/...` or `../NPC/...` for wiki links — both `/static/` pages resolve `../` to the wiki root. `timeline.html` automatically adds `target="_parent"` since it runs inside an iframe.

## Landing Page (quartz/static/landing.html)

Quartz does **not** auto-generate `landing.html` — the layout is hand-maintained, but all data is loaded from `data/*.json`. When content changes, edit the JSON files (the HTML rarely needs touching):

- **`status-card` (Senast i kampanjen):** Edit `data/status.json` — update `day`, the quote, and the open questions when a new session is added or a cliffhanger changes.
- **Character blurbs:** Edit `data/characters.json` — keep each character's `blurb` current (HP status, key events, etc.).
- **Map pins:** Edit `data/map-pins.json`.
- **Timeline:** Edit `data/timeline.json` (sessions + events).
- **Wiki sections:** Edit `data/wiki-sections.json` — update `count` and `items` when new notes are added.
- **Quests:** Edit `data/quests.json`.

Always update the relevant `data/*.json` files alongside content changes, then push together. `landing.html` itself only needs editing for layout/template changes.

## Bilingual Architecture (SV + EN)

The site runs two parallel wikis:
- **Swedish wiki** — `content/` → `public/` (served at `/`)
- **English wiki** — `content-en/` → `public/en/` (served at `/en/`)

Both share a single `quartz.layout.ts` and all `quartz/static/` pages.

### Content rules

- `content-en/` mirrors the **exact same folder and file names** as `content/` so that links from `quartz/static/` pages resolve correctly in both wikis.
- Images are copied into `content-en/` alongside their corresponding `.md` files (Quartz vault-scoped resolution).
- Wikilinks within `content-en/` files use the same Swedish file names (the files keep their Swedish names).

### Static pages (quartz/static/)

- `data/i18n.json` — single source of truth for all UI strings (`I18N.sv` and `I18N.en`). Loaded via `i18n.js`, which exposes the API: `getLang()`, `setLang()`, `t(key)`, `tf(key, ...args)`, `toggleLang()`.
- Most data JSON files (`map-pins.json`, `timeline.json`, `quests.json`, `characters.json`, `wiki-sections.json`) carry both-language content using the `_en` field convention: `title_en`, `desc_en`, `meta_en`, `blurb_en`, `name_en`, `label_en`, `subtitle_en`, `role_en`. `status.json` uses nested `sv`/`en` objects instead.
- `processDesc(html)` rewrites `href="../` → `href="../en/` when `lang === 'en'`, so wiki links target the EN build without storing duplicate URLs.
- `var WIKI = lang === 'en' ? '../en/' : '../'` — used wherever a link to the wiki is constructed.

### Wiki sidebar

`quartz/components/LangSwitch.tsx` — renders an EN/SV button next to Darkmode. An `afterDOMLoaded` script computes the equivalent page in the other language by inserting or removing `/en/` in the URL.

### Deploy

`.github/workflows/deploy.yml` runs two sequential Quartz builds before uploading:
```
npx quartz build                          # SV → public/
npx quartz build -d content-en -o public/en  # EN → public/en/
```
Both outputs are uploaded together as a single Pages artifact.

### Adding a new wiki note

Add it to **both** `content/` (Swedish) and `content-en/` (English) with the same filename. Copy any images. Update data files if the note is referenced from static pages.

## Quartz / Tech

- Config: `quartz.config.ts` — colors, fonts (Cinzel headers, EB Garamond body), locale
- Layout: `quartz.layout.ts` — sidebar, graph, TOC, backlinks
- Custom styles: `quartz/styles/custom.scss` — parchment/frozen-ice theme, portrait float class
- GitHub Actions deploys to Pages on every push to `main`
- `sv-SE` locale is NOT supported by Quartz — use `en-US`
