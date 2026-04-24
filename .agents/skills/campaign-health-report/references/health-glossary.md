# Hälsomåttens ordlista

| Term | Definition |
|------|-----------|
| **Hotspot** | En fil som både ändras ofta (hög churn) och har många inkommande länkar. Narrativt riskabel — inkonsistenser sprider sig lätt. |
| **Koppling (coupling)** | Antal utgående `[[wikilinks]]` från en fil. Hög koppling = filen påverkas av många andra noters förändringar. |
| **Churn** | Antal git-commits som berör filen. Hög churn = instabil lore som ännu inte kanonicerades. |
| **Föräldralös (orphan)** | En fil utan inkommande länkar. Existerar isolerat i kunskapsgrafen — möjlig integration saknas. |
| **Hotspot-score** | `inkommande_länkar × churn`. Kombinerar popularitet och instabilitet till ett enda riskvärde. |
| **Stub** | En fil som bör skapas men saknas. Märks av länkvalidatorn som "stubb behövs". |
