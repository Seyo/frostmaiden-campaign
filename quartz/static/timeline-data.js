// Shared timeline data — fetched from ./data/timeline.json
// Each page must `await TIMELINE_DATA_READY` before reading TIMELINE_SESSIONS / TIMELINE_EVENTS.
//
// type:  social | travel | invest | combat | death
// desc:  HTML is allowed; use <a href="../Platser/..."> for wiki links
//        (both /static/ pages resolve ../ to the wiki root)
// LLM rule: when adding a session or event, edit ./data/timeline.json
// (always fill label_en, title_en, and desc_en for new entries).

var TIMELINE_SESSIONS = null;
var TIMELINE_EVENTS = null;
var TIMELINE_DATA_READY = fetch('./data/timeline.json')
  .then(function (r) { return r.json(); })
  .then(function (d) {
    TIMELINE_SESSIONS = d.sessions;
    TIMELINE_EVENTS = d.events;
    return d;
  });
