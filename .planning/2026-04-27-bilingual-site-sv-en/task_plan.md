# Task Plan: Bilingual Site (SV + EN)

**Goal:** Full English support alongside Swedish — same features, both languages, LLM-maintainable architecture. No data duplication where avoidable.

**Status:** PLANNING COMPLETE — ready to execute

**Branch:** `feat/bilingual` — all work on this branch, one commit per phase, PR to `main` when all phases done.

---

## Architecture Decision

**Single source of truth wherever possible. Separate files only when unavoidable.**

| Content type | Strategy | Why |
|---|---|---|
| UI strings (page titles, labels, buttons) | `i18n.js` — one file, both langs as objects | Single edit location for LLM |
| Data blurbs (map pins, timeline events) | Add `_en` fields to existing data files | No duplicate files; LLM sees SV+EN side by side |
| Wiki pages (.md) | Parallel dirs: `content/` (SV) + `content-en/` (EN) | Quartz renders whole files; no way around it |
| Chat page | Single file, i18n toggle; name = "Saga" (both langs) | Same page, different strings |

**English is treated as the primary source language** (Nasher's journal PDFs are already in English). Swedish is the translation. When adding new content, LLM workflow is: ingest PDF → write English → translate to Swedish. Never the other way around.

---

## URL Structure

```
https://seyo.github.io/frostmaiden-campaign/        ← Swedish Quartz wiki
https://seyo.github.io/frostmaiden-campaign/en/     ← English Quartz wiki
https://seyo.github.io/frostmaiden-campaign/static/landing.html  ← landing (has SV/EN toggle)
```

The lang toggle on static pages:
- Switches UI text immediately (localStorage)
- Changes wiki links to point at `/` vs `/en/` based on active language

---

## Git Workflow

```
git checkout -b feat/bilingual
```

One commit per phase (or per logical sub-task within large phases like 7). Commit message format: `feat(i18n): <what changed>`.

Final step: `ce-commit-push-pr` skill opens the PR to `main` with a summary of all phases.

---

## Phases

### Phase 0 — Create branch
**Status:** pending

```
git checkout -b feat/bilingual
```

No files changed — just establishes the branch before any work begins.

---

### Phase 1 — i18n foundation
**Status:** pending

Create `quartz/static/i18n.js` — shared translation strings for all static pages.

Structure:
```js
var I18N = {
  sv: {
    site_title: "Frostmaiden · Kampanjkrönika",
    chat_name: "Spåkvinnan",
    // ... all UI strings
  },
  en: {
    site_title: "Frostmaiden · Campaign Chronicle",
    chat_name: "Saga",
    // ...
  }
};
```

Also establish: `langToggle()` function, `getLang()`, `setLang()` — loaded once, reused by all pages.

**Files to create:**
- `quartz/static/i18n.js`

---

### Phase 2 — Translate data files (additive, zero risk)
**Status:** pending

Add `_en` fields to `MAP_PINS` and `TIMELINE_EVENTS`/`TIMELINE_SESSIONS`. Existing Swedish fields untouched.

```js
// Before
{ blurb: "Största staden i Ten-Towns." }

// After
{ blurb: "Största staden i Ten-Towns.", blurb_en: "The largest city in Ten-Towns." }
```

**LLM maintenance rule:** When adding a new pin or event, always fill both `blurb` and `blurb_en`. The English field is written first (from PDF source), Swedish second.

**Files to edit:**
- `quartz/static/map-data.js` — add `blurb_en` to all 19 pins
- `quartz/static/timeline-data.js` — add `title_en`, `desc_en`, `label_en` to all events/sessions

---

### Phase 3 — landing.html bilingual
**Status:** pending

- Add `<script src="./i18n.js">` 
- Add SV/EN toggle button in header (consistent style across all pages)
- Replace all hardcoded Swedish strings with `i18n.get('key')` calls
- Characters section: add `blurb_en` to the `CHARACTERS` array in landing.html
- Status card: add English version of current quote + open questions
- Map pins rendered by landing.html: use `blurb_en` when lang=en
- Timeline rendered by landing.html: use `_en` fields when lang=en
- Wiki links from landing: swap between `/frostmaiden-campaign/` and `/frostmaiden-campaign/en/` based on lang

**Files to edit:**
- `quartz/static/landing.html`

---

### Phase 4 — map.html + timeline.html bilingual
**Status:** pending

Both pages embed the data files and have their own UI strings. Add toggle + i18n wiring.

`timeline.html` is embedded as an iframe inside `landing.html`. The iframe must receive the lang preference from the parent — use `postMessage` or read `localStorage` directly (same origin, so localStorage works).

**Files to edit:**
- `quartz/static/map.html`
- `quartz/static/timeline.html`

---

### Phase 5 — chat.html bilingual (Spåkvinnan → Saga)
**Status:** pending

- Add toggle + i18n wiring
- AI character name is "Saga" in both Swedish and English (replaces "Spåkvinnan" entirely)
- System prompt needs an English variant: when lang=en, send English system prompt so Saga responds in English naturally
- The `campaign-knowledge.json` (RAG data) is Swedish — may need an English version or the AI can translate on the fly

**Open question:** Does `campaign-knowledge.json` need an English version? If the AI gets Swedish source data but the user asks in English, it can likely translate. But for consistency of named references (character names, place names), an English `campaign-knowledge-en.json` may be worth it eventually.

**Files to edit:**
- `quartz/static/chat.html`

---

### Phase 6 — quests.html bilingual
**Status:** pending

Simpler page, same treatment as map/timeline.

**Files to edit:**
- `quartz/static/quests.html`

---

### Phase 7 — English wiki (content-en/ + second Quartz build)
**Status:** pending

This is the biggest phase. Three sub-tasks:

#### 7a — Verify Quartz supports alternate content dir
Quartz v4 may support `--directory` flag or a config override for `contentFolderName`. Need to test before committing to this structure. Fallback: symlink or copy step in CI.

#### 7b — Create content-en/ with English translations
Translate existing 40+ .md files. Priority order (most impactful first):
1. `content/index.md` → `content-en/index.md`
2. `content/Karaktärer/` — 5 character pages (Sork, Nasher, Zahir, Borc, Zahirs gäng)
3. `content/Sessions/` — 2 session recaps (source is English PDF — easiest)
4. `content/Platser/` — ~10 location pages
5. `content/NPC/` — ~15 NPC pages
6. `content/Fraktioner/` — 3 faction pages
7. `content/Händelser/` — 4 event pages
8. `content/Uppdrag & rykten/` — 3 quest pages
9. `content/Kartor/` — 2 map reference pages

Folder names in content-en/ stay the same (URLs will be under `/en/` prefix anyway). Internal wikilinks inside English notes must point to the English slugs.

#### 7c — GitHub Actions: second build job
Add a second job to `.github/workflows/deploy.yml`:
```yaml
- name: Build English wiki
  run: npx quartz build --directory content-en --output public/en
```
(Exact flag to verify in 7a.)

---

### Phase 8 — Navigation consistency
**Status:** pending

Both wiki builds (SV and EN) need a way to get back to the landing page and to switch language. Options:
- Custom Quartz component (header link) — complex
- `quartz.layout.ts` already has a custom header area — add an "🌐 SV / EN" link there
- Simplest: just a footer note "← Back to overview" in both wikis

---

### Phase 9 — Document solutions with `/ce-compound`
**Status:** pending — run immediately after Phase 7 completes

Use the `ce-compound` skill to document the two non-obvious solutions this feature produced:

1. **Quartz multi-language build** — how `--directory` flag (or workaround) was used to produce two separate wiki builds from one repo. Future agents will need this without re-discovering it.
2. **i18n.js pattern** — the exact convention for how UI strings, data file `_en` fields, and localStorage lang preference work together across all static pages.

These go into `docs/solutions/` in a format that `ce-learnings-researcher` can index and retrieve automatically in future sessions.

**When to run:** After 7c (GitHub Actions second build) is verified working in production.

---

### Phase 10.5 — Open PR
**Status:** pending — last step before done

Run `/ce-commit-push-pr` to push `feat/bilingual` and open a PR to `main`. PR description should summarize all 10 phases and link to the live `/en/` URL once CI has deployed.

---

### Phase 10 — Automate new-session workflow with `/schedule`
**Status:** pending — run after Phase 7 completes

Set up a scheduled remote agent that handles the full "new session" workflow automatically:

**Trigger:** Manual (user invokes when a new Nasher PDF has been added to the repo)  
**Agent does:**
1. Read the new PDF (English source)
2. Create `content-en/Sessions/Session-XX.md` (English, from PDF)
3. Translate → create `content/Sessions/Session-XX.md` (Swedish)
4. Add new entry to `TIMELINE_SESSIONS` in `timeline-data.js` (with `label` + `label_en`)
5. Extract key events → add to `TIMELINE_EVENTS` (with `title_en`, `desc_en`)
6. Update `landing.html` status card (SV + EN)
7. Create a PR with all changes

**Why `/schedule` and not just a CLAUDE.md rule:** The workflow spans multiple files across both content dirs and data files. A scheduled agent with the full context is more reliable than expecting a future LLM to remember all 7 steps.

---

## LLM Maintenance Rules (for future sessions)

These rules govern how new content is added after initial implementation:

1. **New session added:** Create `content-en/Sessions/Session-XX.md` (from PDF) first, then `content/Sessions/Session-XX.md` (Swedish translation). Update both `TIMELINE_SESSIONS` entries simultaneously (add `id`, `label`, `label_en`, `slug`).

2. **New map pin:** Add to `map-data.js` with both `blurb` (SV) and `blurb_en` (EN) filled. Never leave `blurb_en` empty.

3. **New NPC:** Create both `content/NPC/Name.md` and `content-en/NPC/Name.md` in the same commit.

4. **Landing page status card:** Update both Swedish and English versions of the quote and open questions.

5. **campaign-knowledge.json:** When the Swedish wiki grows, decide whether to maintain an `campaign-knowledge-en.json` or rely on AI translation. Defer until chat EN is tested.

---

## Decisions Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-04-25 | English = source language | Nasher's PDFs are EN; cleaner for LLM workflow |
| 2026-04-25 | Bilingual data fields in same file (not duplicate files) | LLM sees both langs side by side; no sync drift |
| 2026-04-25 | Separate content-en/ dir for wiki | Quartz renders whole .md files; no other option |
| 2026-04-25 | Chat name = "Saga" in both SV and EN (replaces Spåkvinnan entirely) | "Saga" works as a name in both Swedish and English |
| 2026-04-25 | Defer campaign-knowledge-en.json | Need to test AI translation quality first |
