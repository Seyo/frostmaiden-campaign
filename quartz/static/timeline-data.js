// Shared timeline data — used by landing.html and timeline.html
// To add a session: push to TIMELINE_SESSIONS (keep chronological order)
// To add an event:  push to TIMELINE_EVENTS  (keep chronological order)
//
// type:  social | travel | invest | combat | death
// desc:  HTML is allowed; use <a href="../Platser/..."> for wiki links
//        (both /static/ pages resolve ../ to the wiki root)

var TIMELINE_SESSIONS = [
  {
    id:    "s01",
    label: "Session 1 — Dag 1–16 — Vägen till Caer Konig",
    slug:  "Sessions/Session-01---V%C3%A4gen-till-Caer-Konig"
  },
  {
    id:    "s02",
    label: "Session 2 — Dag 16–18 — Caer Konig & Kelvins Cairn",
    slug:  "Sessions/Session-02---Caer-Konig"
  }
];

var TIMELINE_EVENTS = [
  {
    session: "s01", day: "Dag 1", type: "social", icon: "👥",
    title: "Zahirs gäng träffas i Fireshear",
    desc:  'Sork, Nasher, Zahir och Borc möts i <a href="../Platser/Fireshear">Fireshear</a>.'
  },
  {
    session: "s01", day: "Dag 2–5", type: "social", icon: "👥",
    title: "Aubril anlitar sällskapet",
    desc:  'Köpmannen Aubril (Torgs Imports) hyr gruppen för 75 gp att eskortera honom och lasten till <a href="../Platser/Bryn-Shander">Bryn Shander</a>. Rykten om osynliga tjuvar och seriemördare med isdolk.'
  },
  {
    session: "s01", day: "Dag 6", type: "combat", icon: "⚔️",
    title: "Gränsen till Icewind Dale",
    desc:  'Magiskt mörker faller vid gränsen — ljusbesvärjelser slutar fungera. Vargattack under natten. Nasher faller men överlever.'
  },
  {
    session: "s01", day: "Dag 7", type: "death", icon: "🐺",
    title: "Aubril dödad av vargar",
    desc:  'Gruppen vaknar och finner Aubril söndertrasad av vargar. Zahir vill spränga kroppen med magi — Nasher sätter stopp. Sork navigerar fel; gruppen tvingas dubbelbacka och övernatta på samma plats igen.'
  },
  {
    session: "s01", day: "Dag 8", type: "travel", icon: "🏘️",
    title: "Ankomst till Bryn Shander",
    desc:  'Sällskapet når <a href="../Platser/Bryn-Shander">Bryn Shander</a> sent på kvällen. Aubrils kvarlåtenskaper levereras till Torg — Zahir förhandlar fram halva betalningen trots dödsfall.'
  },
  {
    session: "s01", day: "Dag 10–15", type: "invest", icon: "🔍",
    title: "Vila och rykten i Bryn Shander",
    desc:  'Gruppen håller till på The Hooked Knucklehead. Möter Hildur Trollbane. Mordutredning: minst 22 offer i Ten-Towns — isdolk rätt genom hjärtat på varje offer.'
  },
  {
    session: "s01", day: "Dag 16", type: "travel", icon: "🏘️",
    title: "Ankomst till Caer Konig",
    desc:  'Hundslädsfärd norrut. Hagelstorm längs vägen — 2 hundar dör. Stopp i Caer Dineval. Sen ankomst till <a href="../Platser/Caer-Konig">Caer Konig</a>. Möter Trovus. Bronn Bearhammers mord avslöjas — hustrun Eevie saknas.'
  },
  {
    session: "s02", day: "Dag 17", type: "invest", icon: "🔍",
    title: "Utredning i Caer Konig",
    desc:  'Spårar fotspår från Snow Fox Hideout längs Lac Dinneshere. Undersöker Snowy Baubles — Bronns hem och smedja. Möter Jarthra som guide upp mot berget. Keegan Valryn försvinner under jakt efter The Burning Hammers.'
  },
  {
    session: "s02", day: "Dag 18", type: "combat", icon: "⚔️",
    title: "Sunblights fästning — Nildar besegrad",
    desc:  'Expedition till fästningen vid <a href="../Platser/Kelvins-Cairn">Kelvins Cairn</a>. Nildar Sunblight besegrad — Zahir med Tasha\'s Hideous Laughter, Sork med pilar. Sista ord: <em>"Min fader rider på en drakes rygg och ska förgöra alla Ten-Towns."</em> Nashers misstag: dödade den svampinfekterade varelsen i cellen — möjligen Eevie.'
  }
];
