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

var seed = require('./netlify/functions/_seed');

var app = express();
var jsonParser = bodyParser.json();
var PORT = process.env.PORT || 8080;

var data = seed.getData();
var casinos = data.casinos;
var tournaments = data.tournaments;
app.use(express.static(path.join(__dirname, 'build')));

app.get('/casinos/:name/tournaments', jsonParser, function(req, res) {
  var name = seed.decodeName(req.params.name);
  var rows = tournaments.filter(function(t) {
    return t.casino_name === name;
  });
  res.json(rows);
});

app.get('/casinos/:name', jsonParser, function(req, res) {
  var name = seed.decodeName(req.params.name);
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
