<!--
  CANONICAL SESSION TEMPLATE
  ==========================
  Output two files with the SAME Swedish filename:

    1. content/Sessions/Session NN - <slug>.md     (Swedish source)
    2. content-en/Sessions/Session NN - <slug>.md  (English mirror)

  - Filenames stay Swedish in both vaults — only prose is translated.
  - The Swedish file has NO frontmatter (matches Session 02/03 in the vault).
  - The English mirror requires a `title:` frontmatter block.
  - Use day-by-day bullet structure as shown below; this matches the existing
    sessions and renders cleanly in Quartz.
  - Wikilink NPCs / places / factions inline. Files keep their Swedish names
    in both vaults, so [[Sork the Shadow]] works in EN content too.

  After writing the session, also update the relevant data JSON files
  (see SKILL.md): timeline.json, status.json, wiki-sections.json,
  characters.json, quests.json, map-pins.json — whichever the new session
  touches.
-->

# Session N – [Undertitel från viktigaste händelse]

**Dag X – [Kort fasrubrik]:**
- [Händelse 1, prosa-ish bullet med [[wikilinks]] till NPCer/platser/fraktioner]
- [Händelse 2 — formulerad som ett faktum som flyttar handlingen framåt]
- [Sub-bullet om det finns underhändelser]
  - [Detalj]

**Dag X+1 – [Nästa fas]:**
- [Händelse]
- [Händelse]

**Dag X+2 – [Sluthändelse / cliffhanger]:**
- [Händelse]
- [Avslutande detalj som leder över i nästa session]

---

*Sammanfattning baserad på [Nashers in-character-journal / minnesanteckningar / GM-anteckningar]. Fyll på när mer detaljer kommer.*

---

## English mirror frontmatter

The `content-en/Sessions/Session NN - <slug>.md` file MUST start with:

```markdown
---
title: "Session N – [English subtitle]"
---

# Session N – [English subtitle]

...
```

Translate the prose only. Keep `[[wikilinks]]` pointing at the same Swedish file names.
