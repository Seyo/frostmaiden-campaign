# Phase Details — Kampanjhälsoåtgärder

Konkreta filvägar och förväntade ändringar per fas. Uppdatera detta dokument om faserna förändras.

---

## Phase 1 — Fixa Caer-Dineval broken link

**Rotorsak:** Filnamnet använder bindestreck (`Caer-Dineval.md`) men alla wikilinks skriver `[[Caer Dineval]]` (mellanslag). Quartz resolvar inte filen.

**Exakt åtgärd:**
```bash
git mv "content/Platser/Caer-Dineval.md" "content/Platser/Caer Dineval.md"
```

**Verifiera att länkarna nu resolvar:**
```bash
grep -rl '[[Caer Dineval]]' content --include='*.md'
find content -iname "Caer Dineval.md"
```

Förväntad output: 4 filer innehåller länken, 1 fil matchar sökvägen.

**Commit-meddelande (förslag):**
```
fix: rename Caer-Dineval.md to match existing wikilinks
```

---

## Phase 2 — Integrera föräldralösa noter

### Dödsloggen
**Fil:** `content/Händelser/Dödsloggen.md`  
**Problem:** 13 utgående länkar, 0 inkommande. Ingen vet att filen finns.  
**Åtgärd:** Lägg till `[[Dödsloggen]]` i minst dessa filer:
- `content/Karaktärer/Zahirs gäng.md` — logisk plats (gruppens förlusträkning)
- `content/Sessions/Session 02 - Caer Konig.md` — om dödsfall inträffade under sessionen
- Läs `Dödsloggen.md` för att avgöra var det är naturligt

### Dvärgarna i Dvärgadalen
**Fil:** `content/Fraktioner/Dvärgarna i Dvärgadalen.md`  
**Problem:** 6 noter länkar till `[[Dvärgadalen]]` men ingen till `[[Dvärgarna i Dvärgadalen]]`.  
**Rekommenderad åtgärd:** Byt namn på filen:
```bash
git mv "content/Fraktioner/Dvärgarna i Dvärgadalen.md" "content/Fraktioner/Dvärgadalen.md"
```
Alternativt: lägg till `[[Dvärgarna i Dvärgadalen]]`-länk i `content/Platser/Icewind Dale.md` och `content/Fraktioner/Ten-Towns.md` (och andra relevanta filer).

### Övriga föräldralösa (lägre prioritet)
| Fil | Förslag på inkommande länk |
|-----|---------------------------|
| `Händelser/Sorks fuckup.md` | `Karaktärer/Sork the Shadow.md` |
| `Händelser/Tidslinje.md` | `content/index.md` |
| `Platser/Easthaven.md` | `Platser/Icewind Dale.md` |
| `Uppdrag & rykten/Quest tracker.md` | `content/index.md` |

---

## Phase 3 — Stabilisera Caer Konig-loren

**Fil att granska:** `content/Platser/Caer Konig.md`  
**Varför:** Hotspot score 78 — 26 noter pekar hit, filen har ändrats 3 gånger. Faktafel sprider sig brett.

**Kontrollpunkter:**
1. Finns en `## Kända invånare`-sektion? Om inte — skapa en med wikilinks till alla NPCer kopplade till Caer Konig.
2. Stämmer informationen mot sessionerna? Jämför mot `Sessions/Session 01` och `Sessions/Session 02`.
3. Har alla relevanta NPCer rätt `**Fraktion:**`-rad? Kontrollera:
   - `NPC/Jarthra.md` (inbound: 10, churn: 3)
   - `NPC/Torg.md` (inbound: 6, churn: 3)
   - `NPC/Hildur Trollbane.md` (inbound: 5, churn: 3)
4. Finns det fakta i sessionfilerna som borde konsolideras upp till Platser-filen?

**Mål:** `Platser/Caer Konig.md` ska vara den auktoritativa källan. Sessionsfilerna berättar vad som *hände* — Platser-filen berättar vad som *är sant*.
