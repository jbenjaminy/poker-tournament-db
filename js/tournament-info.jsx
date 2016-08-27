var React = require('react');
var connect = require('react-redux').connect;

var TournamentInfo = React.createClass({

  	render: function () {
  		
  		var tournamentArr = this.props.tournaments.map(function(tournament) {

  			var dayClass = 'tournament-prop ';
	  		var startClass = 'tournament-prop ';
	  		var regStartClass = 'tournament-prop ';
	  		var regEndClass = 'tournament-prop ';
	  		var gameClass = 'tournament-prop ';
	  		var buyinClass = 'tournament-prop ';
	  		var startingChipsClass = 'tournament-prop ';
	  		var rebuyClass = 'tournament-prop ';
	  		var addOnClass = 'tournament-prop ';
	  		var bountyClass = 'tournament-prop ';
	  		var reEntryClass = 'tournament-prop ';
	  		var prizeGtdClass = 'tournament-prop ';
	  		var otherClass = 'tournament-prop ';
			if (!tournament.day) {
				dayClass += 'hidden';
			};
			if (!tournament.start) {
				startClass += 'hidden';
			};
			if (!tournament.reg_start) {
				regStartClass += 'hidden';
			};
			if (!tournament.reg_end) {
				regEndClass += 'hidden';
			};
			if (!tournament.game) {
				gameClass += 'hidden';
			};
			if (!tournament.buyin) {
				buyinClass += 'hidden';
			};
			if (!tournament.starting_chips) {
				startingChipsClass += 'hidden';
			};
			if (!tournament.rebuy) {
				rebuyClass += 'hidden';
			};
			if (!tournament.add_on) {
				addOnClass += 'hidden';
			};
			if (!tournament.bounty) {
				bountyClass += 'hidden';
			};
			if (!tournament.reentry) {
				reEntryClass += 'hidden';
			};
			if (!tournament.prize_gtd) {
				prizeGtdClass += 'hidden';
			};
			if (!tournament.other) {
				otherClass += 'hidden';
			};
			return (
				<li key={tournament.id}>
					<ul className="tournament">
						<li className="tournament-prop" id="name" key="1"><p className="title">Name:&nbsp;</p><h4 className='name'>{tournament.name}</h4></li>
		    			<li className={dayClass} id="day" key="2"><p className="title">Day:&nbsp;</p>{tournament.day}</li>
		    			<li className={startClass} id="tourney-start" key="3"><p className="title">Tournament Start Time:&nbsp;</p>{tournament.tourney_start}</li>
		    			<li className={regStartClass} id="reg-start" key="4"><p className="title">Registration Start Time:&nbsp;</p>{tournament.regStart}</li>
		    			<li className={regEndClass} id="reg-end" key="5"><p className="title">Registration End Time:&nbsp;</p>{tournament.reg_end}</li>
		    			<li className={gameClass} id="game" key="6"><p className="title">Game:&nbsp;</p>{tournament.game}</li>
		    			<li className={buyinClass} id="buyin" key="7"><p className="title">Buy-in:&nbsp;</p>{tournament.buyin}</li>
		    			<li className={startingChipsClass} id="starting-chips" key="8"><p className="title">Starting Chips:&nbsp;</p>{tournament.starting_chips}</li>
		    			<li className={rebuyClass} id="rebuy" key="9"><p className="title">Re-buy:&nbsp;</p>{tournament.rebuy}</li>
		      			<li className={addOnClass} id="add-on" key="10"><p className="title">Add-on:&nbsp;</p>{tournament.add_on}</li>
		      			<li className={bountyClass} id="bounty" key="11"><p className="title">Bounty:&nbsp;</p>{tournament.bounty}</li>
		      			<li className={reEntryClass} id="re-entry" key="12"><p className="title">Re-entry:&nbsp;</p>{tournament.re_entry}</li>
		      			<li className={prizeGtdClass} id="prize-gtd" key="13"><p className="title">Prize Guarantee:&nbsp;</p>{tournament.prize_gtd}</li>
		      			<li className={otherClass} id="other" key="14"><p className="title">Additional Information:&nbsp;</p>{tournament.other}</li>
					</ul>
				</li>
			);
		})

	    return (
	    		<div>
	    			<h3>Tournament info for: {this.props.casino.name}</h3>
	    			<ol>{tournamentArr}</ol>
	    		</div>
    	);
  	}
});

var mapStateToProps = function(state, props) {
  return {
  	casino: state.casino,
    tournaments: state.tournaments
  }
};

var Container = connect(mapStateToProps)(TournamentInfo);
exports.TournamentInfo = TournamentInfo;
exports.Container = Container;