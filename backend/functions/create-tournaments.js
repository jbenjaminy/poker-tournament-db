var knex = require('../pg/connect');
var tourneyObjArray = require('../../other/tourney-obj-array');

var createTournaments = function() {
    return new Promise(function(resolve, reject) {
    	var completed = 0;
    	tourneyObjArray.forEach(function(tournaments) {
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
	        if (completed === tourneyObjArray.length) {
	            resolve(console.log('create tourneys success'));
	        }
    	});
    });
};

module.exports = createTournaments;