// i18n.js — shared translation strings for all static pages.
// Strings live in ./data/i18n.json (single source of truth).
// Functions like map_pins_count(n) are templates with {n} placeholders.
// Each page must `await I18N_READY` before calling t() or tf().

var I18N = null;
var I18N_READY = fetch('./data/i18n.json')
  .then(function (r) { return r.json(); })
  .then(function (d) { I18N = d; return d; });

function getLang() {
  return localStorage.getItem('lang') || 'sv';
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
}

function t(key) {
  if (!I18N) return key;
  var lang = getLang();
  var strings = I18N[lang] || I18N.sv;
  return (key in strings) ? strings[key] : (I18N.sv[key] || key);
}

// tf(key, n) — replaces {n} placeholder in the translated string.
function tf(key, n) {
  return t(key).replace('{n}', n);
}

function toggleLang() {
  setLang(getLang() === 'sv' ? 'en' : 'sv');
  location.reload();
}
