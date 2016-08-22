var React = require('react');
var connect = require('react-redux').connect;

var TournamentInfo = React.createClass({

  	render: function () {
  		// SET TO RETURN EACH PROP ONLY IF NOT NULL;
  		var tournamentArr = this.props.tournaments.map(function(tournament) {
			return (
				<li key={tournament.id}>
					<ul className="tournament">
						<li className="tournament-prop" id="name" key="1">Name: {tournament.name}</li>
		    			<li className="tournament-prop" id="day" key="2">Day: {tournament.day}</li>
		    			<li className="tournament-prop" id="tourney-start" key="3">Tournament Start Time: {tournament.tourney_start}</li>
		    			<li className="tournament-prop" id="reg-start" key="4">Registration Start Time: {tournament.regStart}</li>
		    			<li className="tournament-prop" id="reg-end" key="5">Registration End Time: {tournament.reg_end}</li>
		    			<li className="tournament-prop" id="game" key="6">Game: {tournament.game}</li>
		    			<li className="tournament-prop" id="buyin" key="7">Buy-in: {tournament.buyin}</li>
		    			<li className="tournament-prop" id="rebuy" key="8">Re-buy: {tournament.rebuy}</li>
		      			<li className="tournament-prop" id="add-on" key="9">Add-on: {tournament.add_on}</li>
		      			<li className="tournament-prop" id="bounty" key="10">Bounty: {tournament.bounty}</li>
		      			<li className="tournament-prop" id="re-entry" key="11">Re-entry: {tournament.reentry}</li>
		      			<li className="tournament-prop" id="prize-gtd" key="12">Prize Guarantee: {tournament.prize_gtd}</li>
		      			<li className="tournament-prop" id="other" key="13">Additional Information: {tournament.other}</li>
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