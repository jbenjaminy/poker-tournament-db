/**
 * UI-first preview server (no Postgres).
 * Serves ./build static assets + mock /casinos API from other/*-obj-array.js
 *
 * Usage:  node mock-server.js
 * Open:   http://localhost:8080/allcasinos
 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var casinoSource;
var tourneySource;
try {
  casinoSource = require('./other/refreshed-casino-obj-array');
  tourneySource = require('./other/refreshed-tourney-obj-array');
} catch (e) {
  casinoSource = require('./other/casino-obj-array');
  tourneySource = require('./other/tourney-obj-array');
}

var app = express();
var jsonParser = bodyParser.json();
var PORT = process.env.PORT || 8080;

function decodeName(name) {
  var raw = String(name || '');
  try { raw = decodeURIComponent(raw); } catch (e) {}
  return raw
    .split('4').join(',')
    .split('$').join('&')
    .split('_').join(' ');
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

var casinos = casinoSource.map(mapCasino);
var tournaments = tourneySource.map(mapTourney);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/casinos/:name/tournaments', jsonParser, function(req, res) {
  var name = decodeName(req.params.name);
  var rows = tournaments.filter(function(t) {
    return t.casino_name === name;
  });
  res.json(rows);
});

app.get('/casinos/:name', jsonParser, function(req, res) {
  var name = decodeName(req.params.name);
  var rows = casinos.filter(function(c) {
    return c.name === name;
  });
  res.json(rows);
});

app.get('/casinos', jsonParser, function(req, res) {
  // Product is poker rooms only — drop non-poker casinos from the index
  var pokerRooms = casinos.filter(function(c) { return c.has_poker; });
  res.json(pokerRooms.map(function(c, i) {
    return { name: c.name, id: i + 1 };
  }));
});

// SPA fallback for react-router browserHistory
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function() {
  console.log('Mock UI preview listening on http://localhost:' + PORT);
  console.log('Try http://localhost:' + PORT + '/allcasinos');
  var pokerCount = casinos.filter(function(c) { return c.has_poker; }).length;
  console.log('Serving ' + casinos.length + ' casinos (' + pokerCount + ' poker rooms), ' + tournaments.length + ' tournaments (refreshed seed mock, no Postgres).');
});
