# Findings & Decisions — LLM Chat over Campaign Wiki

## Requirements
- GitHub Action bygger `campaign-knowledge.json` vid varje push till main
- Chat-widget (client-side HTML/JS) med BYOK (Claude API-nyckel i localStorage)
- Laddar kunskapsbasen som systemkontext, anropar Claude API direkt från browser
- Ingen backend, inga löpande kostnader utöver användarens API-anrop
- Ska enkelt kunna portas till andra Quartz-kampanjsites
- Skalstrategi: full kontext nu → keyword-filtrering när wikin växer

## Repo-struktur (utforskat 2026-04-25)
- **42 content/.md-filer** i 7 kataloger: Sessions, Karaktärer, NPC, Platser, Fraktioner, Uppdrag & rykten, Händelser, Kartor
- **quartz/static/**: landing.html, map.html, timeline.html, map-data.js, timeline-data.js, frost-vellum.css, page.css, quests.html
- **deploy.yml**: ubuntu-22.04, Node 22, `npm ci` + `npx quartz build` → upload public/ → deploy pages

## Deploy-workflow (nyckelinformation)
```yaml
# Befintliga steg: checkout → setup-node → npm ci → npx quartz build → upload artifact
# Ny steps att lägga till FÖRE "Build Quartz":
#   - name: Build Campaign Knowledge
#     run: python scripts/build-knowledge.py
```
Quartz kopierar allt i `quartz/static/` till `public/` — script-output hamnar rätt automatiskt.

## JSON-schema för campaign-knowledge.json
```json
[
  {
    "type": "session|character|npc|location|faction|quest|event|other",
    "title": "Session 01 - Vägen till Caer Konig",
    "path": "Sessions/Session 01 - Vägen till Caer Konig.md",
    "content": "... markdown-text ...",
    "wikilinks": ["Caer Konig", "Nasher", "Sork the Shadow"]
  }
]
```
Typ bestäms av katalognamn: Sessions→session, Karaktärer→character, NPC→npc, Platser→location, Fraktioner→faction, Uppdrag & rykten→quest, Händelser→event.

## Storleksestimering
- Medelfil: ~500 tokens. 42 filer × 500 = ~21 000 tokens för kunskapsbasen
- Claude Haiku context window: 200k tokens → full kontext ryms med god marginal
- Tröskeln för att behöva filtrera: ~400 filer × 500 tokens ≈ 200k (ca 3-4 år av kampanj)

## Chat-widget: teknisk approach
- `fetch()` direkt till `https://api.anthropic.com/v1/messages`
- Header: `anthropic-dangerous-direct-browser-access: true` (krävs för browser CORS)
- Systemkontext: "Du är en expert på denna D&D-kampanj. Här följer allt innehåll:\n\n{knowledge}"
- Modell-default: `claude-haiku-4-5-20251001` (billig, snabb, tillräcklig för faktafrågor)
- Conversation history: array av {role, content} i minnet (rensas vid sidladdning)

## Portabilitets-design
Två filer att kopiera för ny kampanj:
1. `scripts/build-knowledge.py` — generisk, läser alla .md-filer
2. `quartz/static/chat.html` — självständig, ingen hårdkodad kampanjdata

Enda anpassning: systemprompten i chat.html (kampanjnamn + språk).

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Python för build-script | Inget extra beroende, finns i ubuntu-22.04 |
| `anthropic-dangerous-direct-browser-access` header | Officiellt sätt att anropa Anthropic API från browser utan proxy |
| claude-haiku som default | ~10x billigare än sonnet, svarar snabbt på faktafrågor |
| Markdown bevaras i content-fältet | LLM:ar läser markdown bra, ingen förlust av struktur |
| Wikilinks extraheras separat | Möjliggör framtida graph-traversal för kontext-expansion |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| — | — |

## Resources
- Befintlig deploy-workflow: `.github/workflows/deploy.yml`
- Quartz static-katalog: `quartz/static/`
- Befintlig CSS-tema: `quartz/static/frost-vellum.css`
- Anthropic browser API: kräver `anthropic-dangerous-direct-browser-access: true`
