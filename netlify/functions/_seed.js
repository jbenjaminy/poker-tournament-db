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
    other: t.other
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

module.exports = { getData: getData, decodeName: decodeName };
