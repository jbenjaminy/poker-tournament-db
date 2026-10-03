/**
 * Load refreshed seed (same mapping as mock-server.js).
 * Paths resolve from repo root so Netlify included_files works.
 */
var path = require('path');

function loadArrays() {
  var root = path.join(__dirname, '..', '..');
  var casinoSource;
  var tourneySource;
  try {
    casinoSource = require(path.join(root, 'other', 'refreshed-casino-obj-array.js'));
    tourneySource = require(path.join(root, 'other', 'refreshed-tourney-obj-array.js'));
  } catch (e) {
    casinoSource = require(path.join(root, 'other', 'casino-obj-array.js'));
    tourneySource = require(path.join(root, 'other', 'tourney-obj-array.js'));
  }
  return { casinoSource: casinoSource, tourneySource: tourneySource };
}

function mapCasino(c) {
  return {
    name: c.name,
    place_id: c.placeId,
    address: c.address,
    state: c.state,
    phone: c.phone,
    website: c.website,
    hours: c.hours,
    other_games: c.otherGames,
    has_poker: c.hasPoker === true || c.hasPoker === 'true',
    poker_tournaments: c.pokerTournaments === true || c.pokerTournaments === 'true',
    games_offered: c.gamesOffered,
    description: c.description,
    specials: c.specials,
    poker_promotions: c.pokerPromotions,
    poker_url: c.pokerUrl,
    calendar_url: c.calendarUrl
  };
}


function parseBuyinDollars(buyin) {
  var s = String(buyin || '').trim().toLowerCase();
  if (!s) return null;
  if (s === 'free' || s.indexOf('freeroll') !== -1 || /^\$0(\b|\D)/.test(s)) return 0;
  var m = s.match(/\$(\d+(?:\.\d+)?)/);
  if (!m) return null;
  return parseFloat(m[1]);
}

function buyinBand(buyin) {
  var n = parseBuyinDollars(buyin);
  if (n === null) return '';
  if (n === 0) return 'freeroll';
  if (n <= 50) return 'low';
  if (n <= 200) return 'mid';
  return 'deep';
}

function structureTags(t) {
  var blob = [t.name, t.game, t.other, t.bounty, t.rebuy].join(' ');
  var tags = [];
  var bountyText = String(t.bounty || '').trim().toLowerCase();
  if (bountyText && bountyText !== 'no' && bountyText !== 'none') tags.push('bounty');
  else if (/\bbounty\b|\bbounties\b|\bpko\b|knockout/i.test(blob)) tags.push('bounty');
  if (/\bplo\b|omaha|\bbig o\b/i.test(blob)) tags.push('plo');
  return tags;
}

function scheduleType(t) {
  if (t.scheduleType === 'series' || t.schedule_type === 'series') return 'series';
  var blob = [t.name, t.other, t.game].join(' ');
  var weeklyExcuse = /non-series|excluding some series|around series|series weeks/i.test(blob);
  if (!weeklyExcuse && /\b(wsop|wpt|mspt|rgps|rungood|wsopc)\b/i.test(blob)) return 'series';
  if (/gapt series sundays/i.test(blob)) return 'series';
  return 'weekly';
}

function mapTourney(t, idx) {
  return {
    id: idx + 1,
    casino_name: t.casinoName,
    name: t.name,
    day: t.day,
    tourney_start: t.tourneyStart,
    reg_start: t.regStart,
    reg_end: t.regEnd,
    game: t.game,
    buyin: t.buyin,
    starting_chips: t.startingChips,
    rebuy: t.rebuy,
    add_on: t.addOn,
    bounty: t.bounty,
    re_entry: t.reEntry,
    prize_gtd: t.prizeGtd,
    other: t.other,
    bounty: t.bounty || '',
    buyin_band: buyinBand(t.buyin),
    structure_tags: structureTags(t),
    schedule_type: scheduleType(t)
  };
}

var cached;

function getData() {
  if (cached) return cached;
  var src = loadArrays();
  cached = {
    casinos: src.casinoSource.map(mapCasino),
    tournaments: src.tourneySource.map(mapTourney)
  };
  return cached;
}

function decodeName(name) {
  var raw = String(name || '');
  try { raw = decodeURIComponent(raw); } catch (e) {}
  return raw
    .split('4').join(',')
    .split('$').join('&')
    .split('_').join(' ');
}

module.exports = { getData: getData, decodeName: decodeName, mapCasino: mapCasino, mapTourney: mapTourney, buyinBand: buyinBand, structureTags: structureTags, scheduleType: scheduleType };
