# Progress Log — LLM Chat over Campaign Wiki

## Session 1 — 2026-04-25

### Phase 1: Utforskning & Analys
- **Status:** complete
- Actions taken:
  - Arkiverade gamla planfiler till `.planning/2026-04-24-kampanjhalsa/`
  - Kartlade repo-struktur: 42 content/.md-filer, quartz/static/, deploy.yml
  - Identifierade teknisk approach: Python build-script + standalone chat.html
  - Estimerade tokenstorlek: ~21k tokens (full kontext ryms i 200k window)
- Files created/modified:
  - `task_plan.md` (skapad)
  - `findings.md` (skapad)
  - `progress.md` (skapad)

### Phase 2: Knowledge Builder
- **Status:** complete
- Actions taken:
  - Skapade `scripts/build-knowledge.py` (Python, generisk, portabel)
  - Lade till "Build Campaign Knowledge"-steg i `deploy.yml` (före Quartz build)
  - Testade lokalt: 41 noter, 36 KB output
- Files created/modified:
  - `scripts/build-knowledge.py` (skapad)
  - `.github/workflows/deploy.yml` (uppdaterad)
  - `quartz/static/campaign-knowledge.json` (genererad lokalt)

### Phase 3: Chat Widget
- **Status:** complete
- Actions taken:
  - Skapade `quartz/static/chat.html` med frost-vellum-tema, fixed topbar, natt-läge
  - BYOK: API-nyckel + modell sparas i localStorage
  - SSE-streaming av Claude API direkt från browser
  - Wikilinks i svar konverteras till klickbara inklink-ankare med wiki-URL-mapping
  - Lade till nav-länk och hero-knapp i `landing.html`
- Files created/modified:
  - `quartz/static/chat.html` (skapad)
  - `quartz/static/landing.html` (uppdaterad: topnav + hero-actions)

## Test Results
| Test | Input | Expected | Actual | Status |
|------|-------|----------|--------|--------|
| — | — | — | — | — |

## Error Log
| Timestamp | Error | Attempt | Resolution |
|-----------|-------|---------|------------|
| — | — | — | — |

## 5-Question Reboot Check
| Question | Answer |
|----------|--------|
| Where am I? | Phase 2 — Knowledge Builder |
| Where am I going? | Phase 3 (chat widget), Phase 4 (skala), Phase 5 (test) |
| What's the goal? | Client-side BYOK-chatt för kampanjwiki, ingen backend |
| What have I learned? | Se findings.md — schema, storleksestimering, portabilitetsstrategi |
| What have I done? | Planfiler skapade, repo utforskat, arkitektur beslutad |
