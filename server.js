/* --------- DEPENDENCIES --------- */
var express = require('express');
var bodyParser = require('body-parser');
databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/pokerTournaments';
if (process.env.NODE_ENV === 'production') {
    databaseUrl += '?ssl=true';
}

var knex = require('knex')({
    client: 'pg',
    connection: databaseUrl
});

/* --------- GLOBAL VARIABLES --------- */
var jsonParser = bodyParser.json();
var app = express();

app.use(express.static('./build'));

/* ----------- USER ENDPOINTS ---------- */

// GET CASINO DETAILS BY NAME
app.get('/casinos/:name', jsonParser, function(request, response) {
    var name = request.params.name;
    name = name.split('4').join(',');
    name = name.split('$').join('&');
    name = name.split('_').join(' ');

    knex.select()
        .from('casinos')
        .where({name: name})
        .then(function(casinoDetails) {
            // console.log('get casino details success');
            return response.json(casinoDetails);
        })
        .catch(function(error) {
            // console.log('get casino details error');
            response.sendStatus(500);
        });
});


// GET TOURNAMENT INFO BY CASINO_ID
app.get('/casinos/:name/tournaments', jsonParser, function(request, response) {
    var casino_name = request.params.name;
    casino_name = casino_name.split('4').join(',');
    casino_name = casino_name.split('$').join('&');
    casino_name = casino_name.split('_').join(' ');

    knex.select()
        .from('tournaments')
        .where({casino_name: casino_name})
        .orderBy('id')
        .then(function(tournaments) {
            // console.log('get tournament info success');
            return response.json(tournaments);
        })
        .catch(function(error) {
            // console.log('get tournament info error');
            return response.sendStatus(500);
        });
});


// GET CASINOS
app.get('/casinos', jsonParser, function(request, response) {
    knex.select('name', 'id')
        .from('casinos')
        .orderBy('id')
        .then(function(casinoDetails) {
            // console.log('get casino details success');
            return response.json(casinoDetails);
        })
        .catch(function(error) {
            // console.log('get casino details error');
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
            other_games: casino.otherGames,
            has_poker: casino.hasPoker,
            poker_tournaments: casino.pokerTournaments,
            games_offered: casino.gamesOffered,
            description: casino.description,
            specials: casino.specials,
            poker_promotions: casino.pokerPromotions,
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

    tournamentsArray.forEach(function(tournaments) {
        knex.insert({
            casino_name: tournaments.casinoName,
            name: tournaments.name,
            day: tournaments.day,
            tourney_start: tournaments.tourneyStart,
            reg_start: tournaments.regStart,
            reg_end: tournaments.regEnd,
            game: tournaments.game,
            buyin: tournaments.buyin,
            starting_chips: tournaments.startingChips,
            rebuy: tournaments.rebuy,
            add_on: tournaments.addOn,
            bounty: tournaments.bounty,
            re_entry: tournaments.reEntry,
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

function runServer(callback) {
    let PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Listening on localhost: ${PORT}`);
        if (callback) {
            callback();
        }
    });
}

if (require.main === module) {
    runServer((err) => {
        if (err) {
            throw new Error(err);
        }
    });
}
