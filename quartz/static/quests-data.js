// Shared quest data — fetched from ./data/quests.json
// Each page must `await QUESTS_DATA_READY` before reading QUESTS.
// LLM rule: when adding a quest, edit ./data/quests.json
// (always fill title_en, desc_en, and meta_en).
// status values: aktiv | oklar | klar | misslyckad  (also used as CSS class names)

var QUESTS = null;
var QUESTS_DATA_READY = fetch('./data/quests.json')
  .then(function (r) { return r.json(); })
  .then(function (d) { QUESTS = d; return d; });
