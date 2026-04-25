# Task Plan — LLM Chat over Campaign Wiki

**Mål:** Bygg ett client-side chatt-system för frostmaiden-campaign-siten där användare kan ställa frågor om kampanjen med sin egen API-nyckel, med LLM:en som expert på wikis innehåll.

## Current Phase
Phase 5

## Phases

### Phase 1: Utforskning & Analys
- [x] Kartlägg content/-struktur (42 .md-filer i 7 kataloger)
- [x] Granska befintlig deploy.yml-workflow
- [x] Inventera quartz/static/-assets
- **Status:** complete

### Phase 2: Knowledge Builder
- [x] Skriv Python-script (`scripts/build-knowledge.py`) som scannar `content/**/*.md`
- [x] Bygger `quartz/static/campaign-knowledge.json` med metadata per fil (41 noter, 36 KB)
- [x] Lägg till build-steg i `.github/workflows/deploy.yml` (före Quartz build)
- [x] Definiera JSON-schema: `[{type, title, path, content, wikilinks}]`
- **Status:** complete

### Phase 3: Chat Widget
- [x] Skapa `quartz/static/chat.html` (frost-vellum-tema, standalone)
- [x] BYOK: API-nyckel input → localStorage, modell-selector
- [x] Laddar `campaign-knowledge.json` → bygger formaterad systemkontext per typ
- [x] Anropar Claude API med SSE-streaming direkt från browser
- [x] Wikilinks `[[Notnamn]]` i svar → klickbara inklink-länkar
- [x] Länka från landing.html (topnav + hero-actions)
- **Status:** complete

### Phase 4: Skalstrategi & Portabilitet
- [ ] Dokumentera "full context"-strategin och tröskeln för att byta (~100 noter / ~150k tokens)
- [ ] Implementera enkel keyword-filtrering som opt-in (top-K relevanta noter)
- [ ] Säkerställ att chat.html + build-script är fristående och portabla
- **Status:** pending

### Phase 5: Integration & Verifiering
- [ ] Testa build-script lokalt
- [ ] Verifiera att deploy.yml genererar JSON korrekt
- [ ] Testa chat-widget med riktig API-nyckel
- [ ] Commit & push
- **Status:** pending

## Key Questions
1. Ska chat.html matcha frost-vellum.css-temat eller ha eget minimalistiskt utseende?
2. Vilken Claude-modell ska vara default? (haiku = billig/snabb, sonnet = bättre svar)
3. Ska wikilinks (`[[Note Name]]`) lösas upp till faktiskt innehåll i JSON, eller behållas som text?

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Standalone chat.html (ej inline i landing.html) | Enklare att porta, håller landing.html ren |
| Python-script för knowledge builder | Tillgängligt i GitHub Actions ubuntu, enkelt att underhålla |
| API-nyckel i localStorage | Bekvämt för återkommande användare, BYOK-konventionen |
| JSON-array med {type, title, path, content, wikilinks} | Enkelt att konsumera, bevarar metadata för filtrering |
| Full kontext nu, keyword-filtrering senare | Wikin är liten (42 filer), ingen prematur optimering |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| — | — | — |
