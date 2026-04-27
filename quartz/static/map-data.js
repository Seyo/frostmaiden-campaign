// Shared map pin data — fetched from ./data/map-pins.json
// Each page must `await MAP_DATA_READY` before reading MAP_PINS.
// LLM rule: when adding a new pin, edit ./data/map-pins.json (always fill both blurb (SV) and blurb_en (EN)).

var MAP_PINS = null;
var MAP_DATA_READY = fetch('./data/map-pins.json')
  .then(function (r) { return r.json(); })
  .then(function (d) { MAP_PINS = d; return d; });
