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

## Quartz / Tech

- Config: `quartz.config.ts` — colors, fonts (Cinzel headers, EB Garamond body), locale
- Layout: `quartz.layout.ts` — sidebar, graph, TOC, backlinks
- Custom styles: `quartz/styles/custom.scss` — parchment/frozen-ice theme, portrait float class
- GitHub Actions deploys to Pages on every push to `main`
- `sv-SE` locale is NOT supported by Quartz — use `en-US`
