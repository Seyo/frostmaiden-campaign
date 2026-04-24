---
name: plan-runner
description: Read task_plan.md, execute exactly one pending phase, update the planning files, then stop. Designed for small-context LLMs that need to clear context between phases.
---

## Purpose

You are a task executor. Your job is to:
1. Read the plan
2. Find the **first phase** with status `pending`
3. Execute **only that phase** — nothing else
4. Update the three planning files
5. **Stop** and report what you did

Do not start the next phase. Do not do extra work. One phase per run.

---

## Step 1 — Read all three planning files

Read these files in this order. They are in the project root.

```
task_plan.md    ← phases, checklist items, decisions
findings.md     ← research and raw data (read-only reference)
progress.md     ← session log (you will append to this)
```

If any file is missing, stop and say: "Planning files not found. Run the campaign-health-report skill first."

---

## Step 2 — Find the next pending phase

Scan `task_plan.md` for lines that say `**Status:** \`pending\``.

Take the **first** one you find. That is your target phase. Ignore all others.

If no pending phase exists: say "All phases are complete." and stop.

---

## Step 3 — Execute the phase

Work through each unchecked checklist item (`- [ ]`) in that phase, top to bottom.

### Rules for execution

- **Change `- [ ]` to `- [x]`** in `task_plan.md` as you complete each item.
- **Do not skip items.** If an item is blocked, write why in the Errors table in `task_plan.md` and continue with the next item.
- **Read `findings.md`** if you need background data — it has the raw health report data.
- **Do not modify `findings.md`** unless you have genuinely new data to add.
- **Do not start Phase N+1** even if Phase N finishes quickly.

### Common operations in this project

**Renaming a file (preserve git history):**
```bash
git mv "content/Platser/OldName.md" "content/Platser/New Name.md"
```

**Finding which files contain a wikilink:**
```bash
grep -rl '\[\[Target Name\]\]' content --include='*.md'
```

**Adding a wikilink to an existing file:**
Find the appropriate sentence or section in the file, then insert `[[Note Name]]` inline.
Do not add a bare link at the bottom — integrate it into the prose naturally.

**Verifying a link resolves:**
```bash
find content -iname "*.md" | grep -i "note name"
```

---

## Step 4 — Update `task_plan.md`

After finishing the phase:

1. Change the phase's status line from:
   ```
   **Status:** `pending`
   ```
   to:
   ```
   **Status:** `complete`
   ```

2. All checklist items in the phase should now be `- [x]`.

3. If you encountered any errors, add a row to the Errors table:
   ```
   | What went wrong | Which attempt | How you resolved it |
   ```

---

## Step 5 — Append to `progress.md`

Add a new entry at the bottom of `progress.md`:

```markdown
## Session [N] — [today's date]

### Utfört
- Completed Phase [X]: [phase title]
- [1–3 bullet points describing what you actually changed]

### Filer ändrade
- [list of files you touched]

### Status per fas
| Fas | Status |
|-----|--------|
| Phase 1 — ... | `complete` or `pending` |
| Phase 2 — ... | `complete` or `pending` |
| Phase 3 — ... | `complete` or `pending` |

### Nästa steg
[One sentence: what the next pending phase is]
```

---

## Step 6 — Stop and report

Reply with a short summary (3–5 sentences) of what you did:
- Which phase you executed
- Which files you changed
- Whether everything succeeded or if anything was blocked

**Do not proceed to the next phase.** The user will re-invoke you when ready.

---

## Phase reference (current plan)

These are the three phases in this project's `task_plan.md`:

| Phase | Title | What it involves |
|-------|-------|-----------------|
| 1 | Fixa Caer-Dineval broken link | `git mv` the file, verify links |
| 2 | Integrera föräldralösa noter | Add wikilinks into existing files |
| 3 | Stabilisera Caer Konig-loren | Review and consolidate lore in Platser-file |

See `references/phase-details.md` for the specific file paths and expected changes per phase.

---

## Important constraints

- **Reason in English.** Any wiki content you add (prose, headings) must be in **Swedish**.
- **Wikilinks must use the exact file name** (case-sensitive on Linux/Quartz). Use `find content -iname "*.md"` to confirm the correct spelling before linking.
- **Never hardcode data in HTML files.** If a change involves the map or timeline, edit the `.js` data files only (`quartz/static/map-data.js`, `quartz/static/timeline-data.js`).
- **Do not amend commits.** If you commit, create a new commit.
