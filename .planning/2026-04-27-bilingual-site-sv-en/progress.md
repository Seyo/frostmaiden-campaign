# Progress Log

## Session 2026-04-25

**Goal:** Plan English internationalization of the Frostmaiden campaign site.

### Done
- [x] Inventoried all static pages (5 HTML files)
- [x] Inventoried all data files (map-data.js, timeline-data.js)
- [x] Counted wiki content: 40+ .md files across 7 categories
- [x] Analyzed Quartz constraints (no native i18n)
- [x] Got user clarifications: full bilingual, LLM-maintainable, ongoing, chat=yes, Saga=EN name
- [x] Finalized architecture: i18n.js + bilingual data fields + content-en/ parallel dir
- [x] Established that English = source language (Nasher's PDFs are in English)
- [x] Wrote complete 10-phase plan with LLM maintenance rules + git workflow

### Not started
- Phase 0: git checkout -b feat/bilingual
- Phase 1: i18n.js
- Phase 2: data file _en fields
- Phase 3: landing.html
- Phase 4: map.html + timeline.html
- Phase 5: chat.html
- Phase 6: quests.html
- Phase 7: content-en/ + second Quartz build
- Phase 8: navigation consistency
- Phase 9: /ce-compound — document Quartz multi-build + i18n.js patterns
- Phase 10.5: /ce-commit-push-pr — open PR to main
- Phase 10: /schedule — automate new-session workflow (PDF → EN + SV + timeline-data + PR)
