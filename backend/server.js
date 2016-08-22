/* --------- DEPENDENCIES --------- */
var express = require('express');
var bodyParser = require('body-parser');

var knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'PokerTourneys'
    },
});

/* --------- GLOBAL VARIABLES --------- */
var jsonParser = bodyParser.json();
var app = express();

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/* ----------- USER ENDPOINTS ---------- */

// GET CASINO DETAILS BY NAME
app.get('/casinos/:name', jsonParser, function(request, response) {
    var name = request.params.name;
    name = name.split('4').join(',');
    name = name.split('$').join('&');
    name = name.split('_').join(' ');
    console.log(name, 'server name')

    knex.select()
        .from('casinos')
        .where({name: name})
        .then(function(casinoDetails) {
            console.log('get casino details success');
            console.log('casino details: ', casinoDetails);
            return response.json(casinoDetails);
        })
        .catch(function(error) {
            console.log('get casino details error');
            response.sendStatus(500);
        });
});


// GET TOURNAMENT INFO BY CASINO_ID
app.get('/casinos/:id/tournaments', jsonParser, function(request, response) {
    var casino_id = request.params.id;

    knex.select()
        .from('tournaments')
        .where({casino_id: casino_id})
        .orderBy('id')
        .then(function(tournaments) {
            console.log('get tournament info success');
            console.log('tournament info: ', tournaments);
            return response.json(tournaments);
        })
        .catch(function(error) {
            console.log('get tournament info error');
            return response.sendStatus(500);
        });
});


// GET CASINOS
app.get('/casinos', jsonParser, function(request, response) {
    knex.select('name', 'id')
        .from('casinos')
        .orderBy('id')
        .then(function(casinoDetails) {
            console.log('get casino details success');
            console.log('casino details: ', casinoDetails);
            return response.json(casinoDetails);
        })
        .catch(function(error) {
            console.log('get casino details error');
            response.sendStatus(500);
        });
});


// POST CASINO OBJECTS PASSED IN ARRAY TO CASINOS TABLE
app.post('/casinos', jsonParser, function(request, response) {
    var casinosArray = request.body;
    var completed = 0;

    casinosArray.forEach(function(casino) {
        knex.insert({
            name: casino.name,
            place_id: casino.placeId,
            address: casino.address,
            state: casino.state,
            phone: casino.phone,
            website: casino.website,
            hours: casino.hours,
            has_poker: casino.hasPoker,
            games_offered: casino.gamesOffered,
            description: casino.description,
            specials: casino.specials,
            poker_url: casino.pokerUrl,
            calendar_url: casino.calendarUrl
            })
            .returning('id')
            .into('casinos')
            .then(function(id) {
                console.log('post casino success', id);
            })
            .catch(function(error) {
                console.log('post casino error', error, casino.name);
            });
        completed++;
        if (completed === casinosArray.length) {
            return response.status(201).json();
        }
    });
});

// POST TOURNAMENTS OBJECTS PASSED IN ARRAY TO TOURNAMENTS TABLE
app.post('/tournaments', jsonParser, function(request, response) {
    var tournamentsArray = request.body;
    var completed = 0;

    tournamentsArray.forEach(function(casino) {
        knex.insert({
            casino_id: tournaments.casinoId,
            name: tournaments.name,
            day: tournaments.day,
            tourney_start: tournaments.tourneyStart,
            reg_start: tournaments.regStart,
            reg_end: tournaments.regEnd,
            game: tournaments.game,
            buyin: tournaments.buyin,
            rebuy: tournaments.rebuy,
            add_on: tournaments.addOn,
            bounty: tournaments.bounty,
            reentry: tournaments.reentry,
            prize_gtd: tournaments.prizeGtd,
            other: tournaments.other
            })
            .returning('id')
            .into('tournaments')
            .then(function(id) {
                console.log('post tournament success', id);
            })
            .catch(function(error) {
                console.log('post tournament error', error, tournaments.name, tournaments.casino_id);
            });
        completed++;
        if (completed === tournamentsArray.length) {
            return response.status(201).json();
        }
    });
});

var port = process.env.PORT || 8081;
app.listen(port, function() {
    console.log('Listening on port:' + port);
});
