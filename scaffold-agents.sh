#!/usr/bin/env bash
set -euo pipefail

# ── Directory scaffold ───────────────────────────────────────────────────────
mkdir -p .agents/skills/map-data-sync/{scripts,references}
mkdir -p .agents/skills/session-distiller/{scripts,references}
mkdir -p .agents/skills/lore-consistency-check/{scripts,references}
mkdir -p .agents/skills/link-validator/{scripts,references}
mkdir -p .agents/skills/campaign-health-report/{scripts,references}

# ── AGENTS.md ────────────────────────────────────────────────────────────────
cat > AGENTS.md << 'EOF'
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

## Global Agent Rules

1. **Reason in English, output content in Swedish** — all wiki notes, session pages, and NPC entries must be in Swedish.
2. **Never hardcode data in HTML** — use `map-data.js` and `timeline-data.js` as the sole source of truth.
3. **Wikilinks must resolve** — run `link-validator` on any batch of new content before committing.
4. **Deceased characters** — mark with `†` in filename and body text.
5. **Data–layout separation** — see `CLAUDE.md` for the canonical data-file table.
6. **Portraits** — embed with `<div class="portrait-right">![[image.png]]</div>`, stored alongside the `.md` file.
EOF

echo "✓ AGENTS.md"

# ── map-data-sync ────────────────────────────────────────────────────────────
cat > .agents/skills/map-data-sync/SKILL.md << 'EOF'
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
EOF

cat > .agents/skills/map-data-sync/references/pin-template.js << 'EOF'
// Canonical MAP_PINS entry shape
// Copy and fill in; remove the icon field if using the type default.
{
  name: "Platsnamn på svenska",   // display label on the map
  x: 42.5,                        // 0–100, left-to-right % on map image
  y: 31.0,                        // 0–100, top-to-bottom % on map image
  type: "town",                   // town | dungeon | wilderness | landmark | faction
  icon: "🏰",                     // optional override
  desc: `Kort beskrivning på svenska.
         <a href="../Platser/Platsnamn">Läs mer →</a>`
}
EOF

echo "✓ map-data-sync"

# ── session-distiller ────────────────────────────────────────────────────────
cat > .agents/skills/session-distiller/SKILL.md << 'EOF'
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

File path: `Sessions/Session-NN.md`

See `references/session-template.md` for a complete worked example.

## References

See `references/session-template.md`.
EOF

cat > .agents/skills/session-distiller/references/session-template.md << 'EOF'
# Session NN — [Undertitel från viktigaste händelse]

**Datum:** YYYY-MM-DD
**Kampanjdag:** Dag X–Y
**Plats:** [[Platsnamn]]

## Sammanfattning

[2–4 meningar som fångar sessionens övergripande båge. Vad förändrades? Vad är annorlunda nu jämfört med innan sessionen?]

## Vad hände

[Tredjepersonsberättelse på svenska, 400–600 ord. Länka NPCer, platser och fraktioner som [[wikilinks]]. Skriv flödande prosa, inte punkter.]

## Viktiga händelser

- [Händelse 1 — formulera som ett faktum som förändrat kampanjen]
- [Händelse 2]
- [Händelse 3]

## Öppna frågor

- [Olöst tråd eller cliffhanger som gruppen bär med sig]
- [Mysterium som fördjupades under sessionen]

## XP & loot

| Karaktär | XP | Noterbart loot |
|----------|----|----------------|
| [[Sork]]   |    |                |
| [[Nasher]] |    |                |
| [[Zahir]]  |    |                |
| [[Borc]]   |    |                |
EOF

echo "✓ session-distiller"

# ── lore-consistency-check ───────────────────────────────────────────────────
cat > .agents/skills/lore-consistency-check/SKILL.md << 'EOF'
---
name: lore-consistency-check
description: Validate that a new content entry is internally consistent with existing lore in content/Platser/, NPC/, Sessions/, and Fraktioner/.
---

## Purpose

Before committing a new note or batch of edits, check for contradictions, name mismatches, and timeline violations against established canon.

## Inputs

- New or edited file content (paste inline or provide file path)
- Scope of comparison (default: `content/Platser/`, `content/NPC/`, `content/Sessions/`, `content/Fraktioner/`)

## Checks

| Check | What to look for |
|-------|-----------------|
| **Name consistency** | Same NPC or location referred to by different spellings |
| **Timeline** | Campaign-day references out of order with `quartz/static/timeline-data.js` |
| **Faction alignment** | NPC's stated faction differs from their file in `Fraktioner/` |
| **Deceased flag** | NPC known to be dead (†) but referenced as living |
| **Geography** | Described travel distances or directions contradict `content/Platser/` notes |
| **Ability continuity** | Character gains an ability before the session it was acquired |

## Reasoning Instructions

1. Parse the new content for all proper nouns (names, places, factions, item names).
2. Cross-reference each against existing files using case-insensitive, diacritic-tolerant matching.
3. Check any campaign-day references against `quartz/static/timeline-data.js`.
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
EOF

cat > .agents/skills/lore-consistency-check/references/canonical-names.md << 'EOF'
# Canonical Names — Frostmaiden Campaign

Use these spellings in all new content. Update this list when a new recurring name is established.

## Platser
- Icewind Dale (not "Isvindsätten" etc.)
- Caer-Dineval (hyphenated)
- Ten-Towns (hyphenated)

## Karaktärer (spelarna)
- Sork (the Shadow)
- Nasher
- Zahir
- Borc

## Fraktioner
- Tribe of the Owl
- The Burning Hammers
- Dvärgarna i Dvärgadalen

## Konventioner
- Döda karaktärer markeras alltid med `†` i filnamn och brödtext.
- Platsnamn på engelska behålls på engelska om gruppen använder dem så.
EOF

echo "✓ lore-consistency-check"

# ── link-validator ───────────────────────────────────────────────────────────
cat > .agents/skills/link-validator/SKILL.md << 'EOF'
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
EOF

cat > .agents/skills/link-validator/scripts/validate-links.js << 'EOF'
#!/usr/bin/env node
/**
 * validate-links.js
 * Usage: node validate-links.js <file-or-dir> [vault-root]
 *
 * Scans Markdown files for [[wikilinks]] and checks whether a matching
 * .md file exists under the vault root (default: content/).
 */
const fs = require("fs");
const path = require("path");

const target = process.argv[2] || ".";
const vaultRoot = process.argv[3] || "content";

function getAllMdFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllMdFiles(full));
    else if (entry.name.endsWith(".md")) results.push(full);
  }
  return results;
}

function extractLinks(content) {
  const re = /\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g;
  const links = [];
  let m;
  while ((m = re.exec(content)) !== null) links.push(m[1].trim());
  return links;
}

function normalize(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

const vaultFiles = getAllMdFiles(vaultRoot);
const vaultNames = new Set(
  vaultFiles.map((f) => normalize(path.basename(f, ".md")))
);

const filesToCheck = fs.statSync(target).isDirectory()
  ? getAllMdFiles(target)
  : [target];

let broken = 0, valid = 0;

for (const file of filesToCheck) {
  const content = fs.readFileSync(file, "utf8");
  const links = extractLinks(content);
  for (const link of links) {
    const key = normalize(link);
    if (vaultNames.has(key)) {
      valid++;
    } else {
      console.error(`BROKEN  ${link}  (in ${file})`);
      broken++;
    }
  }
}

console.log(`\nResult: ${valid} valid, ${broken} broken`);
process.exit(broken > 0 ? 1 : 0);
EOF

echo "✓ link-validator"

# ── campaign-health-report ───────────────────────────────────────────────────
cat > .agents/skills/campaign-health-report/SKILL.md << 'EOF'
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
EOF

cat > .agents/skills/campaign-health-report/scripts/health-report.sh << 'EOF'
#!/usr/bin/env bash
# health-report.sh — collect raw data for campaign-health-report
# Outputs two TSV tables: churn counts and outbound link counts.
set -euo pipefail

VAULT_ROOT="${1:-content}"

echo "=== CHURN (commits per file) ==="
git log --name-only --pretty=format: -- "$VAULT_ROOT" \
  | grep '\.md$' \
  | sort \
  | uniq -c \
  | sort -rn \
  | head -20

echo ""
echo "=== OUTBOUND LINKS (wikilink count per file) ==="
grep -roh '\[\[[^]]*\]\]' "$VAULT_ROOT" --include='*.md' \
  | sed 's|:.*||' \
  | sort \
  | uniq -c \
  | sort -rn \
  | head -20

echo ""
echo "=== OVERSIZED FILES (> 200 lines) ==="
find "$VAULT_ROOT" -name '*.md' | while read -r f; do
  lines=$(wc -l < "$f")
  if [ "$lines" -gt 200 ]; then
    echo "$lines  $f"
  fi
done | sort -rn
EOF
chmod +x .agents/skills/campaign-health-report/scripts/health-report.sh

cat > .agents/skills/campaign-health-report/references/health-glossary.md << 'EOF'
# Hälsomåttens ordlista

| Term | Definition |
|------|-----------|
| **Hotspot** | En fil som både ändras ofta (hög churn) och har många inkommande länkar. Narrativt riskabel — inkonsistenser sprider sig lätt. |
| **Koppling (coupling)** | Antal utgående `[[wikilinks]]` från en fil. Hög koppling = filen påverkas av många andra noters förändringar. |
| **Churn** | Antal git-commits som berör filen. Hög churn = instabil lore som ännu inte kanonicerades. |
| **Föräldralös (orphan)** | En fil utan inkommande länkar. Existerar isolerat i kunskapsgrafen — möjlig integration saknas. |
| **Hotspot-score** | `inkommande_länkar × churn`. Kombinerar popularitet och instabilitet till ett enda riskvärde. |
| **Stub** | En fil som bör skapas men saknas. Märks av länkvalidatorn som "stubb behövs". |
EOF

echo "✓ campaign-health-report"
echo ""
echo "Done. Structure created:"
find .agents AGENTS.md -type f | sort
