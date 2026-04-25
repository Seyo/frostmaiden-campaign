# Task Plan — Kampanjhälsoåtgärder

**Mål:** Åtgärda de tre rekommendationerna från kampanjhälsorapporten (2026-04-24).  
**Källa:** Rapport genererad av `campaign-health-report`-skill.

---

## Phase 1 — Fixa Caer-Dineval broken link
**Status:** `completed`

**Problem:** `Platser/Caer-Dineval.md` har bindestreck i filnamnet. Fyra noter länkar till `[[Caer Dineval]]` (utan bindestreck) — Quartz kan aldrig resolva dessa.

**Åtgärd:**
- [x] Byt namn på `content/Platser/Caer-Dineval.md` → `content/Platser/Caer Dineval.md`
- [x] Verifiera med `link-validator` att alla `[[Caer Dineval]]`-länkar nu resolvar
- [x] Kör `git mv` för att behålla historik

**Berörda filer att kontrollera:**
- Alla filer med `[[Caer Dineval]]` (4 stycken enligt rapporten)

---

## Phase 2 — Integrera föräldralösa Händelser-noter
**Status:** `completed`

**Problem:** `Händelser/Dödsloggen.md` har 13 utgående länkar men 0 inkommande. `Fraktioner/Dvärgarna i Dvärgadalen.md` är osynlig eftersom noter länkr till `[[Dvärgadalen]]` istället för `[[Dvärgarna i Dvärgadalen]]`.

- [x] Besluta: byt namn på filen till `Dvärgadalen.md` (matcha befintliga länkar) ELLER lägg till `[[Dvärgarna i Dvärgadalen]]`-länkar i relevanta noter
- [x] Rekommendation: byt namn på filen — det är enklare och konsekvent med hur gruppen refererar till platsen
- [x] Identifiera vilka sessionsfiler eller karaktärssidor där `[[Dödsloggen]]` naturligt hör hemma
- [x] Lägg till länk i minst 2–3 relevanta noter

**Övriga föräldralösa att länka in (lägre prioritet):**
- `Händelser/Sorks fuckup.md` — länka från `Karaktärer/Sork the Shadow.md`
- `Händelser/Tidslinje.md` — länka från `index.md` eller landningssidan
- `Platser/Easthaven.md` — länka från `Platser/Icewind Dale.md` och relevanta sessions
- `Uppdrag & rykten/Quest tracker.md` — länka från `index.md`

---

## Phase 3 — Stabilisera Caer Konig-loren
**Status:** `completed`

**Problem:** `Platser/Caer Konig.md` är kampanjens hotspot (score 78). Med 26 inkommande och 15 utgående länkar samt 3 commits är det den fil där ett faktafel sprider sig mest. Informationen kan vara utspridd i sessionsfiler istället för konsoliderad.

**Åtgärd:**
- [x] Granska `Platser/Caer Konig.md` — är kärnfakta (geografi, invånare, händelsehistorik) komplett och korrekt?
- [x] Jämför mot `Sessions/Session 01` och `Sessions/Session 02` — finns information där som borde lyftas upp till Platser-filen?
- [x] Kontrollera att alla NPCer kopplade till Caer Konig (`[[Jarthra]]`, `[[Torg]]`, `[[Hildur Trollbane]]`, etc.) har korrekta `**Fraktion:**`-rader
- [x] Lägg till en `## Kända invånare`-sektion i Caer Konig-filen om en saknas

---

## Phase 4 — Fixa Bronn Bearhammer †-referens i Session 02
**Status:** `completed`

**Problem:** `Sessions/Session 02 - Caer Konig.md` refererade till `[[Bronn Bearhammer]]` (utan †) på rad 6 och rad 16, trots att han är markerad som död i filnamnet `Bronn Bearhammer(†).md`. Flaggat av `lore-consistency-check` 2026-04-25.

**Åtgärd:**
- [x] Byt rad 6: `[[Bronn Bearhammer]]` → `[[Bronn Bearhammer(†)]]`
- [x] Byt rad 16: `[[Bronn Bearhammer]]` → `[[Bronn Bearhammer(†)]]`

**Berörda filer:**
- `content/Sessions/Session 02 - Caer Konig.md`

---

## Errors Encountered
| Fel | Försök | Lösning |
|-----|--------|---------|
| — | — | — |

---

## Beslut & avvägningar
- Phase 1 görs med `git mv` (inte vanlig filbyte) för att bevara git-historik
- Phase 2, Dvärgadalen: filbyte föredras framför att ändra alla befintliga länkar
