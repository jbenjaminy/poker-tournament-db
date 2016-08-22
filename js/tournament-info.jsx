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
	  		var rebuyClass = 'tournament-prop ';
	  		var addOnClass = 'tournament-prop ';
	  		var bountyClass = 'tournament-prop ';
	  		var reentryClass = 'tournament-prop ';
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
				reentryClass += 'hidden';
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
						<li className="tournament-prop" id="name" key="1">Name: {tournament.name}</li>
		    			<li className={dayClass} id="day" key="2">Day: {tournament.day}</li>
		    			<li className={startClass} id="tourney-start" key="3">Tournament Start Time: {tournament.tourney_start}</li>
		    			<li className={regStartClass} id="reg-start" key="4">Registration Start Time: {tournament.regStart}</li>
		    			<li className={regEndClass} id="reg-end" key="5">Registration End Time: {tournament.reg_end}</li>
		    			<li className={gameClass} id="game" key="6">Game: {tournament.game}</li>
		    			<li className={buyinClass} id="buyin" key="7">Buy-in: {tournament.buyin}</li>
		    			<li className={rebuyClass} id="rebuy" key="8">Re-buy: {tournament.rebuy}</li>
		      			<li className={addOnClass} id="add-on" key="9">Add-on: {tournament.add_on}</li>
		      			<li className={bountyClass} id="bounty" key="10">Bounty: {tournament.bounty}</li>
		      			<li className={reentryClass} id="re-entry" key="11">Re-entry: {tournament.reentry}</li>
		      			<li className={prizeGtdClass} id="prize-gtd" key="12">Prize Guarantee: {tournament.prize_gtd}</li>
		      			<li className={otherClass} id="other" key="13">Additional Information: {tournament.other}</li>
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