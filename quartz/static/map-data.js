// Shared map pin data — used by landing.html and map.html
// x/y = percentage coordinates on the 6000×4215 Icewind Dale image
var MAP_PINS = [
  { id: "bryn-shander",        type: "town",     name: "Bryn Shander",        x: 32.4, y: 56.7, slug: "Platser/Bryn-Shander",        blurb: "Största staden i Ten-Towns. Flyktingar, tempel till Triaden, sheriffen. Gruppen vilade på The Hooked Knucklehead." },
  { id: "targos",              type: "town",     name: "Targos",              x: 29.3, y: 53.6, slug: "Platser/Ten-Towns",            blurb: "Handelsstad vid Maer Dualdon. Skeppsbyggare nyligen mördad med isdolk." },
  { id: "bremen",              type: "town",     name: "Bremen",              x: 27.8, y: 51.2, slug: "Platser/Ten-Towns",            blurb: "Fiskesamhälle vid Maer Dualdon, strax väster om Targos." },
  { id: "lonelywood",          type: "town",     name: "Lonelywood",          x: 34.7, y: 43.8, slug: "Platser/Ten-Towns",            blurb: "Nordligast vid Maer Dualdon. Omgiven av den karga skogen." },
  { id: "termalaine",          type: "town",     name: "Termalaine",          x: 36.7, y: 45.9, slug: "Platser/Ten-Towns",            blurb: "Vid Maer Dualdon. En av de tio bosättningarna i Ten-Towns." },
  { id: "easthaven",           type: "town",     name: "Easthaven",           x: 46.8, y: 59.5, slug: "Platser/Easthaven",            blurb: "På The Eastway, vid södra Lac Dinneshere. Halfling-jägare mördad med isdolk." },
  { id: "caer-dineval",        type: "town",     name: "Caer Dineval",        x: 47.2, y: 51.5, slug: "Platser/Caer-Dineval",         blurb: "Vid Lac Dinneshere. Gruppen passerade under hundkälkeresan, betalade böter, köpte isyxor." },
  { id: "caer-konig",          type: "town",     name: "Caer Konig",          x: 49.8, y: 46.4, slug: "Platser/Caer-Konig",           blurb: "Liten bosättning vid Lac Dinneshere. Norrsken varje kväll. Mordet på Bronn Bearhammer. The Northern Light." },
  { id: "good-mead",           type: "town",     name: "Good Mead",           x: 39.1, y: 62.7, slug: "Platser/Ten-Towns",            blurb: "Vid Redwaters. Mjödbryggare i Ten-Towns." },
  { id: "dougans-hole",        type: "town",     name: "Dougan's Hole",       x: 35.2, y: 65.6, slug: "Platser/Ten-Towns",            blurb: "Minsta samhället vid Redwaters. Avsides." },
  { id: "kelvins-cairn",       type: "mountain", name: "Kelvins Cairn",       x: 45.9, y: 40.8, slug: "Platser/Kelvins-Cairn",        blurb: "Enormt berg norr om Caer Konig. Nildar Sunblights fästning vid östra foten. Dvärgadalen i dess skugga." },
  { id: "sunblights-fastning", type: "fortress", name: "Sunblights fästning", x: 47.2, y: 41.2, slug: "Platser/Kelvins-Cairn",        blurb: "Nildar Sunblights fästning vid östra foten av Kelvins Cairn — besegrad av Zahirs gäng dag 18.", label: true },
  { id: "dvargadalen",         type: "faction",  name: "Dvärgadalen",         x: 42.5, y: 44.9, slug: "Platser/D%C3%A4rgadalen",      blurb: "Dvärgkoloni i Kelvins Cairns skugga. Potentiella bundsförvanter." },
  { id: "aubrils-ode",         type: "event",    name: "Aubrils öde",         x: 27.3, y: 75.5, slug: "H%C3%A4ndelser/D%C3%B6dsloggen", blurb: "Dag 7 — vargarna dödade Aubril under natten. Sork navigerade fel, gruppen tvingades övernatta på samma plats igen.", label: true },
  { id: "hagelstormen",        type: "event",    name: "Hagelstormen",        x: 40.0, y: 57.7, slug: "Sessions/Session-01---V%C3%A4gen-till-Caer-Konig", blurb: "Dag 16 — under hundslädsfärden mot Caer Konig bröt en våldsam hagelstorm ut. Två hundar dog. Gruppen nådde Caer Konig sent på kvällen." },
];
