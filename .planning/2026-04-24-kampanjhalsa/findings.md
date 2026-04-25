# Findings — Kampanjhälsoåtgärder

## Källdata: Kampanjhälsorapport 2026-04-24

### Hotspot-ranking (inkommande × churn)
| Fil | Score | Inkommande | Ändringar |
|-----|------:|----------:|----------:|
| `Platser/Caer Konig.md` | 78 | 26 | 3 |
| `NPC/Jarthra.md` | 30 | 10 | 3 |
| `Fraktioner/Ten-Towns.md` | 28 | 14 | 2 |
| `NPC/Eevie.md` | 24 | 12 | 2 |
| `NPC/Torg.md` | 18 | 6 | 3 |

### Tätt kopplade noter (utgående > 12)
| Fil | Utgående |
|-----|--------:|
| `Sessions/Session 02 - Caer Konig.md` | 40 |
| `Sessions/Session 01 - Vägen till Caer Konig.md` | 30 |
| `Karaktärer/Sork the Shadow.md` | 21 |
| `Platser/Caer Konig.md` | 15 |
| `Platser/Icewind Dale.md` | 13 |
| `Händelser/Dödsloggen.md` | 13 |

### Föräldralösa noter (0 inkommande)
- `Platser/Caer-Dineval.md` ← broken link (fil: bindestreck, länkar: mellanslag)
- `Fraktioner/Dvärgarna i Dvärgadalen.md` ← mismatch (noter länkr `[[Dvärgadalen]]`)
- `Händelser/Dödsloggen.md` (13 utgående, 0 inkommande)
- `Händelser/Sorks fuckup.md`
- `Händelser/Tidslinje.md`
- `Platser/Easthaven.md`
- `Uppdrag & rykten/Aurils Rime (Världsinfo).md`
- `Uppdrag & rykten/Quest tracker.md`
- `Sessions/Session 01`, `Session 02` (föräldralösa by design — nås via tidslinjen)
- `content/index.md` (föräldralös by design)

### Churn-topplista (git commits per fil)
| Fil | Commits |
|-----|--------:|
| `content/index.md` | 9 |
| `Rime of the Frostmaiden.md` | 4 |
| `Sessions/Session 02 - Caer Konig.md` | 3 |
| `Platser/Caer Konig.md` | 3 |
| `NPC/Trovus.md` | 3 |
| `NPC/Torg.md` | 3 |
| `NPC/Jarthra.md` | 3 |
| `NPC/Hildur Trollbane.md` | 3 |
| `NPC/Glenn.md` | 3 |
| `Kartor/Interaktiv karta.md` | 3 |

### Övriga observationer
- Ingen fil överstiger 200 rader — inga splittkandidater just nu
- `Caer Dineval` har 4 inkommande länkar men 0 når filen (`Caer-Dineval.md`) — trolig Quartz-miss
- `Dvärgadalen` har 6 inkommande men fraktionsfilen heter `Dvärgarna i Dvärgadalen.md`
