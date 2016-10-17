var knex = require('../../server.js');
var casinoObjArray = require('../../other/casino-obj-array');

var createCasinos = function() {
    return new Promise(function(resolve, reject) {
        casinoObjArray.forEach(function(casino) {
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
                if (completed === casinoObjArray.length) {
                    resolve(console.log('create casinos success'));
                }
            });
        });
    });
};

module.exports = createCasinos;