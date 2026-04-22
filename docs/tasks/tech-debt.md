# Tech Debt — Frostmaiden Campaign Wiki

Identifierat 2026-04-22 via kodbas-genomgång. Sorterat efter impact/ansträngning.

---

## P1 — Gör snart (hög impact, låg ansträngning)

### [ ] Dokumentera färgmappningen mellan de två systemen
**Problem:** Färgpaletten lever i två parallella system med olika namn:
- `quartz/static/frost-vellum.css` — CSS-variabler (`--vellum`, `--frost-deep`, `--rime`, etc.)
- `quartz.config.ts` — Quartz-config (`light`, `secondary`, `tertiary`, etc.)

De mappar mot varandra men namngivningen skiljer sig och de kan drifta isär vid framtida ändringar.

**Fix:** Lägg till en mappningstabell i `CLAUDE.md` så att ändringar görs konsekvent i båda systemen.

---

### [x] Flytta inline map-pin CSS från landing.html till frost-vellum.css
**Problem:** 7 rader CSS för map-pin-färger ligger i ett `<style>`-block inuti `quartz/static/landing.html` (raderna 13–20) istället för i `frost-vellum.css` där de hör hemma.

**Fix:** Flytta dessa regler till `quartz/static/frost-vellum.css` och ta bort `<style>`-blocket från landing.html.

---

## P2 — Planera (hög impact, medel ansträngning)

### [x] Konsolidera eller ta bort map.html
**Problem:** `quartz/static/map.html` har en egen `locations[]`-array med 14 platser — delvis annan namngivning (engelska vs svenska), pixel-koordinater istället för procent, och saknar 4 pins som finns i landing.html. Underhålls separat och riskerar att bli inaktuell.

**Alternativ:**
- Ta bort `map.html` om den inte används aktivt
- Konsolidera till en delad datakälla (t.ex. JSON-fil som båda läser)

---

### [ ] Sync quests.html + timeline.html med markdown
**Problem:** `quartz/static/quests.html` (6 quest-objekt) och `quartz/static/timeline.html` (session-events) har hårdkodad data som också finns i:
- `content/Uppdrag & rykten/` (quests)
- `content/Händelser/Tidslinje.md` (tidslinje)

Om markdown uppdateras syns det inte automatiskt i HTML-filerna.

**Fix:** Antingen ersätt HTML-filerna med Quartz-sidor (markdown), eller dokumentera tydligt att HTML-filerna måste synkas manuellt vid varje uppdatering.

---

## P3 — Ignorera (förväntad redundans)

- **`public/static/` = kopia av `quartz/static/`** — byggartefakt, genereras automatiskt, rör inte
- **Porträtt och kartor i tre kopior** — `content/` är källa, `public/` är build-output, `quartz/static/assets/` är för landing page. Acceptabelt.
- **CHARACTERS/MAP_PINS/WIKI_SECTIONS i landing.html** — manuell synk är ok, se CLAUDE.md för vad som ska uppdateras
