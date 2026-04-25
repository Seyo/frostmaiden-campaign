// i18n.js — shared translation strings for all static pages.
// getLang() / setLang() / t() are the public API.
// Each page loads this file first, then calls applyI18n() after DOM is ready.

var I18N = {
  sv: {
    // ── Meta ──────────────────────────────────────────────────────────────────
    site_title:       "Frostmaiden · Kampanjkrönika",
    site_description: "En levande krönika över Zahirs gäng i Icewind Dale — Rime of the Frostmaiden.",
    map_title:        "Icewind Dale — Karta",
    timeline_title:   "Kampanjens tidslinje",
    quests_title:     "Uppdrag & rykten",
    chat_title:       "Saga · Frostmaiden",
    chat_name:        "Saga",

    // ── Nav ───────────────────────────────────────────────────────────────────
    nav_map:       "Kartan",
    nav_party:     "Partiet",
    nav_wiki:      "Wiki",
    nav_timeline:  "Tidslinje",
    nav_sessions:  "Sessioner",
    nav_chat:      "Saga",
    theme_day:     "☀ Dag",
    theme_night:   "☽ Natt",
    lang_toggle:   "EN",

    // ── Landing hero ──────────────────────────────────────────────────────────
    hero_kicker: "En kampanjkrönika från Icewind Dale",
    hero_sub:    "En levande krönika över Zahirs gäng — deras bedrifter och bakslag i Aurils frusna vidder. Uppdateras efter varje session.",
    hero_cta_map:  "Utforska kartan",
    hero_cta_wiki: "Öppna wikin",
    hero_cta_chat: "Fråga Saga",
    scroll_cue:    "Rulla ned till kartan",

    // ── Status card ───────────────────────────────────────────────────────────
    status_day_label: "Kampanjdag",
    status_latest:    "Senast i kampanjen",

    // ── Map section ───────────────────────────────────────────────────────────
    map_chapter:  "Kap. I · Topografi",
    map_heading:  "Icewind Dale",
    map_desc:     "Gruppen befinner sig i norr, söder om Sea of Moving Ice. Aurils förbannelse har släckt solen. Klicka på en nål för att läsa mer om platsen i wikin.",
    map_alt:      "Karta över Icewind Dale",
    map_scale:    "Skala: ~20 miles",
    map_pins_count: function (n) { return n + " markörer kartlagda"; },

    // ── Party section ─────────────────────────────────────────────────────────
    party_chapter:  "Kap. II · Zahirs gäng",
    party_heading:  "Partiet",
    party_desc:     "Fyra själar bundna av tillfällighet och nödvändighet — en paladin, en warlock, en rogue och en barbar.",
    char_read_more: "Läs mer →",

    // ── Wiki section ──────────────────────────────────────────────────────────
    wiki_chapter:  "Kap. III · Krönika",
    wiki_heading:  "Wikin",
    wiki_desc:     "Hela kampanjens dokumentation: platser, NPC:er, fraktioner, uppdrag och händelser. Klicka en sektion för att öppna kapitlet.",
    wiki_open:     "Öppna kapitel",
    wiki_more:     function (n) { return "+ " + n + " fler"; },

    // ── Timeline section ──────────────────────────────────────────────────────
    timeline_chapter:  "Kap. IV · Bedrifter",
    timeline_heading:  "Tidslinje",
    timeline_desc:     "Kampanjens händelser dag för dag — senaste händelsen högst upp.",
    tl_social:    "Socialt",
    tl_travel:    "Resa",
    tl_invest:    "Utredning",
    tl_combat:    "Strid",
    tl_death:     "Dödsfall",

    // ── Map tooltip ───────────────────────────────────────────────────────────
    tooltip_type:    "Plats",
    tooltip_open:    "Öppna i wikin →",

    // ── Map page (standalone) ─────────────────────────────────────────────────
    map_shift_hint:       "⇧ Klick — ny pin",
    pin_creator_title:    "Ny kartpunkt",
    pin_creator_close:    "Stäng",
    pin_blurb_label:      "Vad hände här?",
    pin_blurb_placeholder:"Beskriv platsen eller händelsen kortfattat…",
    pin_label_checkbox:   "Visa textetikett på kartan",
    pin_copy_btn:         "Kopiera prompt",
    pin_copied:           "Kopierat till urklipp!",
    pin_copy_error:       "Kopiera manuellt (clipboard ej tillgänglig)",

    // ── Quests page ───────────────────────────────────────────────────────────
    quests_heading:       "Uppdrag & rykten",
    quest_filter_all:     "Alla",
    quest_filter_active:  "Aktiv",
    quest_filter_unclear: "Oklar",
    quest_filter_done:    "Klar",
    quest_filter_failed:  "Misslyckad",

    // ── Footer ────────────────────────────────────────────────────────────────
    footer_day:   "Frost-vellum · Dagkrönika",
    footer_night: "Nattbok · Nordens mörka timmar",
  },

  en: {
    // ── Meta ──────────────────────────────────────────────────────────────────
    site_title:       "Frostmaiden · Campaign Chronicle",
    site_description: "A living chronicle of Zahir's gang in Icewind Dale — Rime of the Frostmaiden.",
    map_title:        "Icewind Dale — Map",
    timeline_title:   "Campaign Timeline",
    quests_title:     "Quests & Rumors",
    chat_title:       "Saga · Frostmaiden",
    chat_name:        "Saga",

    // ── Nav ───────────────────────────────────────────────────────────────────
    nav_map:       "The Map",
    nav_party:     "The Party",
    nav_wiki:      "Wiki",
    nav_timeline:  "Timeline",
    nav_sessions:  "Sessions",
    nav_chat:      "Saga",
    theme_day:     "☀ Day",
    theme_night:   "☽ Night",
    lang_toggle:   "SV",

    // ── Landing hero ──────────────────────────────────────────────────────────
    hero_kicker: "A campaign chronicle from Icewind Dale",
    hero_sub:    "A living chronicle of Zahir's gang — their feats and setbacks in Auril's frozen wastes. Updated after every session.",
    hero_cta_map:  "Explore the map",
    hero_cta_wiki: "Open the wiki",
    hero_cta_chat: "Ask Saga",
    scroll_cue:    "Scroll down to the map",

    // ── Status card ───────────────────────────────────────────────────────────
    status_day_label: "Campaign day",
    status_latest:    "Latest in the campaign",

    // ── Map section ───────────────────────────────────────────────────────────
    map_chapter:  "Ch. I · Topography",
    map_heading:  "Icewind Dale",
    map_desc:     "The party is in the north, south of the Sea of Moving Ice. Auril's curse has extinguished the sun. Click a pin to read more about the location in the wiki.",
    map_alt:      "Map of Icewind Dale",
    map_scale:    "Scale: ~20 miles",
    map_pins_count: function (n) { return n + " pins mapped"; },

    // ── Party section ─────────────────────────────────────────────────────────
    party_chapter:  "Ch. II · Zahir's Gang",
    party_heading:  "The Party",
    party_desc:     "Four souls bound by chance and necessity — a paladin, a warlock, a rogue, and a barbarian.",
    char_read_more: "Read more →",

    // ── Wiki section ──────────────────────────────────────────────────────────
    wiki_chapter:  "Ch. III · Chronicle",
    wiki_heading:  "The Wiki",
    wiki_desc:     "Full campaign documentation: locations, NPCs, factions, quests, and events. Click a section to open the chapter.",
    wiki_open:     "Open chapter",
    wiki_more:     function (n) { return "+ " + n + " more"; },

    // ── Timeline section ──────────────────────────────────────────────────────
    timeline_chapter:  "Ch. IV · Deeds",
    timeline_heading:  "Timeline",
    timeline_desc:     "The campaign's events day by day — most recent at the top.",
    tl_social:    "Social",
    tl_travel:    "Travel",
    tl_invest:    "Investigation",
    tl_combat:    "Combat",
    tl_death:     "Death",

    // ── Map tooltip ───────────────────────────────────────────────────────────
    tooltip_type:    "Location",
    tooltip_open:    "Open in wiki →",

    // ── Map page (standalone) ─────────────────────────────────────────────────
    map_shift_hint:       "⇧ Click — new pin",
    pin_creator_title:    "New map pin",
    pin_creator_close:    "Close",
    pin_blurb_label:      "What happened here?",
    pin_blurb_placeholder:"Briefly describe the location or event…",
    pin_label_checkbox:   "Show text label on map",
    pin_copy_btn:         "Copy prompt",
    pin_copied:           "Copied to clipboard!",
    pin_copy_error:       "Copy manually (clipboard unavailable)",

    // ── Quests page ───────────────────────────────────────────────────────────
    quests_heading:       "Quests & Rumors",
    quest_filter_all:     "All",
    quest_filter_active:  "Active",
    quest_filter_unclear: "Unclear",
    quest_filter_done:    "Complete",
    quest_filter_failed:  "Failed",

    // ── Footer ────────────────────────────────────────────────────────────────
    footer_day:   "Frost-vellum · Daily Chronicle",
    footer_night: "Night-book · The Dark Hours of the North",
  }
};

// ── Public API ────────────────────────────────────────────────────────────────

function getLang() {
  return localStorage.getItem('lang') || 'sv';
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
}

function t(key) {
  var lang = getLang();
  var strings = I18N[lang] || I18N.sv;
  return (key in strings) ? strings[key] : (I18N.sv[key] || key);
}

// t() with arguments — for keys that are functions (e.g. map_pins_count)
function tf(key) {
  var args = Array.prototype.slice.call(arguments, 1);
  var val = t(key);
  return (typeof val === 'function') ? val.apply(null, args) : val;
}

function toggleLang() {
  setLang(getLang() === 'sv' ? 'en' : 'sv');
  location.reload();
}
