// Shared timeline data — used by landing.html and timeline.html
// To add a session: push to TIMELINE_SESSIONS (keep chronological order)
// To add an event:  push to TIMELINE_EVENTS  (keep chronological order)
//
// type:  social | travel | invest | combat | death
// desc:  HTML is allowed; use <a href="../Platser/..."> for wiki links
//        (both /static/ pages resolve ../ to the wiki root)
// LLM rule: always fill label_en, title_en, and desc_en when adding new entries.

var TIMELINE_SESSIONS = [
  {
    id:       "s01",
    label:    "Session 1 — Dag 1–16 — Vägen till Caer Konig",
    label_en: "Session 1 — Days 1–16 — The Road to Caer Konig",
    slug:     "Sessions/Session-01---V%C3%A4gen-till-Caer-Konig"
  },
  {
    id:       "s02",
    label:    "Session 2 — Dag 16–18 — Caer Konig & Kelvins Cairn",
    label_en: "Session 2 — Days 16–18 — Caer Konig & Kelvins Cairn",
    slug:     "Sessions/Session-02---Caer-Konig"
  }
];

var TIMELINE_EVENTS = [
  {
    session: "s01", day: "Dag 1", type: "social", icon: "👥",
    title:    "Zahirs gäng träffas i Fireshear",
    title_en: "Zahir's Gang Meet in Fireshear",
    desc:     'Sork, Nasher, Zahir och Borc möts i <a href="../Platser/Fireshear">Fireshear</a>.',
    desc_en:  'Sork, Nasher, Zahir, and Borc meet in <a href="../Platser/Fireshear">Fireshear</a>.'
  },
  {
    session: "s01", day: "Dag 2–5", type: "social", icon: "👥",
    title:    "Aubril anlitar sällskapet",
    title_en: "Aubril Hires the Party",
    desc:     'Köpmannen Aubril (Torgs Imports) hyr gruppen för 75 gp att eskortera honom och lasten till <a href="../Platser/Bryn-Shander">Bryn Shander</a>. Rykten om osynliga tjuvar och seriemördare med isdolk.',
    desc_en:  'The merchant Aubril (Torg\'s Imports) hires the group for 75 gp to escort him and his cargo to <a href="../Platser/Bryn-Shander">Bryn Shander</a>. Rumors of invisible thieves and a serial killer with an ice pick.'
  },
  {
    session: "s01", day: "Dag 6", type: "combat", icon: "⚔️",
    title:    "Gränsen till Icewind Dale",
    title_en: "The Border of Icewind Dale",
    desc:     'Magiskt mörker faller vid gränsen — ljusbesvärjelser slutar fungera. Vargattack under natten. Nasher faller men överlever.',
    desc_en:  'Magical darkness falls at the border — light spells stop working. Wolf attack during the night. Nasher falls but survives.'
  },
  {
    session: "s01", day: "Dag 7", type: "death", icon: "🐺",
    title:    "Aubril dödad av vargar",
    title_en: "Aubril Killed by Wolves",
    desc:     'Gruppen vaknar och finner Aubril söndertrasad av vargar. Zahir vill spränga kroppen med magi — Nasher sätter stopp. Sork navigerar fel; gruppen tvingas dubbelbacka och övernatta på samma plats igen.',
    desc_en:  'The party wakes to find Aubril torn apart by wolves. Zahir wants to blast the body with magic — Nasher puts a stop to it. Sork navigates wrong; the party is forced to double back and camp at the same spot again.'
  },
  {
    session: "s01", day: "Dag 8", type: "travel", icon: "🏘️",
    title:    "Ankomst till Bryn Shander",
    title_en: "Arrival in Bryn Shander",
    desc:     'Sällskapet når <a href="../Platser/Bryn-Shander">Bryn Shander</a> sent på kvällen. Aubrils kvarlåtenskaper levereras till Torg — Zahir förhandlar fram halva betalningen trots dödsfall.',
    desc_en:  'The party reaches <a href="../Platser/Bryn-Shander">Bryn Shander</a> late in the evening. Aubril\'s belongings are delivered to Torg — Zahir negotiates half the payment despite the death.'
  },
  {
    session: "s01", day: "Dag 10–15", type: "invest", icon: "🔍",
    title:    "Vila och rykten i Bryn Shander",
    title_en: "Rest and Rumors in Bryn Shander",
    desc:     'Gruppen håller till på The Hooked Knucklehead. Möter Hildur Trollbane. Mordutredning: minst 22 offer i Ten-Towns — isdolk rätt genom hjärtat på varje offer.',
    desc_en:  'The group stays at The Hooked Knucklehead. Meets Hildur Trollbane. Murder investigation: at least 22 victims in Ten-Towns — an ice pick straight through the heart in every case.'
  },
  {
    session: "s01", day: "Dag 16", type: "travel", icon: "🏘️",
    title:    "Ankomst till Caer Konig",
    title_en: "Arrival in Caer Konig",
    desc:     'Hundslädsfärd norrut. Hagelstorm längs vägen — 2 hundar dör. Stopp i Caer Dineval. Sen ankomst till <a href="../Platser/Caer-Konig">Caer Konig</a>. Möter Trovus. Bronn Bearhammers mord avslöjas — hustrun Eevie saknas.',
    desc_en:  'Dog sled journey north. Hail storm along the way — 2 dogs die. Stop in Caer Dineval. Late arrival at <a href="../Platser/Caer-Konig">Caer Konig</a>. Meet Trovus. Bronn Bearhammer\'s murder revealed — his wife Eevie is missing.'
  },
  {
    session: "s02", day: "Dag 17", type: "invest", icon: "🔍",
    title:    "Utredning i Caer Konig",
    title_en: "Investigation in Caer Konig",
    desc:     'Spårar fotspår från Snow Fox Hideout längs Lac Dinneshere. Undersöker Snowy Baubles — Bronns hem och smedja. Möter Jarthra som guide upp mot berget. Keegan Valryn försvinner under jakt efter The Burning Hammers.',
    desc_en:  'Tracks footprints from the Snow Fox Hideout along Lac Dinneshere. Investigates Snowy Baubles — Bronn\'s home and smithy. Meets Jarthra as a guide up the mountain. Keegan Valryn disappears while pursuing The Burning Hammers.'
  },
  {
    session: "s02", day: "Dag 18", type: "combat", icon: "⚔️",
    title:    "Sunblights fästning — Nildar besegrad",
    title_en: "Sunblight's Fortress — Nildar Defeated",
    desc:     'Expedition till fästningen vid <a href="../Platser/Kelvins-Cairn">Kelvins Cairn</a>. Nildar Sunblight besegrad — Zahir med Tasha\'s Hideous Laughter, Sork med pilar. Sista ord: <em>"Min fader rider på en drakes rygg och ska förgöra alla Ten-Towns."</em> Nashers misstag: dödade den svampinfekterade varelsen i cellen — möjligen Eevie.',
    desc_en:  'Expedition to the fortress at <a href="../Platser/Kelvins-Cairn">Kelvins Cairn</a>. Nildar Sunblight defeated — Zahir with Tasha\'s Hideous Laughter, Sork with arrows. Last words: <em>"My father rides on a dragon\'s back and will destroy all of Ten-Towns."</em> Nasher\'s mistake: killed the fungus-infected creature in the cell — possibly Eevie.'
  }
];
