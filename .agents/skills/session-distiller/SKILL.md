---
name: session-distiller
description: Convert raw session notes or a PDF transcription into a structured Quartz session page in Swedish.
---

## Purpose

Transform unstructured session notes (text dump, PDF extraction, or bullet points from Nasher's journal) into a canonical `Sessions/Session-NN.md` file that follows vault conventions.

## Inputs

| Field | Notes |
|-------|-------|
| Raw text or PDF extraction | The source material — Nasher's first-person journal or GM notes |
| Session number | e.g. `12` |
| Real-world date | YYYY-MM-DD |
| Campaign day range | e.g. `Dag 14–15` (if known) |

## Reasoning Instructions

1. Identify the session's main narrative arc: what changed by the end?
2. Extract all named NPCs, locations, and factions — they become `[[wikilinks]]`.
3. Flag any lore that may conflict with existing `Sessions/`, `NPC/`, or `Platser/` notes — add a comment for human review.
4. Derive the session subtitle from the most consequential single event.
5. Write `Vad hände` as a clean Swedish third-person narrative, not a bullet dump. Target 400–600 words.
6. Populate `Öppna frågor` with genuine unresolved threads, not summaries.

**Reason in English. All output content must be in Swedish.**

## Output Format

File path: `content/Sessions/Session-NN - <slug>.md` (Swedish source).

The site is bilingual — also create an English mirror at `content-en/Sessions/Session-NN - <slug>.md` with the **same filename** (file names stay Swedish; only the prose is translated). The English file requires a `title:` frontmatter block. See `Session 02 - Caer Konig.md` and its `content-en/` mirror for the canonical pair.

After distilling a session, update the relevant `quartz/static/data/*.json` files where applicable: `timeline.json` (new session entry + key events with `_en` fields), `status.json` (latest day, quote, open questions), and `wiki-sections.json` (sessions count + items list).

See `references/session-template.md` for a complete worked example.

## References

See `references/session-template.md`.
