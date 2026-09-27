var React = require('react');
var router = require('react-router');
var connect = require('react-redux').connect;
var Link = router.Link;

var TournamentInfo = React.createClass({
	isRealValue: function(val) {
		if (val === null || val === undefined) { return false; }
		var s = String(val).trim();
		if (!s) { return false; }
		var lower = s.toLowerCase();
		if (lower === 'text' || lower === 'n/a' || lower === 'na' || lower === 'null' || lower === 'undefined' || lower === '-') {
			return false;
		}
		return true;
	},

	propClass: function(val) {
		return this.isRealValue(val) ? 'tournament-prop' : 'tournament-prop hidden';
	},

  	render: function () {
		var self = this;
		var tournaments = this.props.tournaments || [];

  		var tournamentArr = tournaments.map(function(tournament) {
			var day = tournament.day;
			var start = tournament.tourney_start;
			var regStart = tournament.reg_start;
			var regEnd = tournament.reg_end;
			var game = tournament.game;
			var buyin = tournament.buyin;
			var chips = tournament.starting_chips;
			var rebuy = tournament.rebuy;
			var addOn = tournament.add_on;
			var bounty = tournament.bounty;
			var reEntry = tournament.re_entry;
			var prizeGtd = tournament.prize_gtd;
			var other = tournament.other;

			var highlights = [];
			if (self.isRealValue(day)) { highlights.push({ key: 'day', label: 'Day', value: day }); }
			if (self.isRealValue(start)) { highlights.push({ key: 'start', label: 'Starts', value: start }); }
			if (self.isRealValue(buyin)) { highlights.push({ key: 'buyin', label: 'Buy-in', value: buyin }); }
			if (self.isRealValue(game)) { highlights.push({ key: 'game', label: 'Game', value: game }); }

			var highlightNodes = highlights.map(function(h) {
				return (
					<span className="tourney-chip" key={h.key}>
						<span className="tourney-chip-label">{h.label}</span>
						<span className="tourney-chip-value">{h.value}</span>
					</span>
				);
			});

			return (
				<li key={tournament.id} className="tournament-card">
					<ul className="tournament">
						<li className="tournament-prop tournament-name" id="name" key="1">
							<h4 className="name">{tournament.name || 'Tournament'}</h4>
						</li>
						{highlightNodes.length ? (
							<li className="tournament-prop tournament-highlights" key="highlights">
								{highlightNodes}
							</li>
						) : null}
		    			<li className={self.propClass(regStart)} id="reg-start" key="4"><p className="title">Registration opens</p><span>{regStart}</span></li>
		    			<li className={self.propClass(regEnd)} id="reg-end" key="5"><p className="title">Registration closes</p><span>{regEnd}</span></li>
		    			<li className={self.propClass(chips)} id="starting-chips" key="8"><p className="title">Starting chips</p><span>{chips}</span></li>
		    			<li className={self.propClass(rebuy)} id="rebuy" key="9"><p className="title">Re-buy</p><span>{rebuy}</span></li>
		      			<li className={self.propClass(addOn)} id="add-on" key="10"><p className="title">Add-on</p><span>{addOn}</span></li>
		      			<li className={self.propClass(bounty)} id="bounty" key="11"><p className="title">Bounty</p><span>{bounty}</span></li>
		      			<li className={self.propClass(reEntry)} id="re-entry" key="12"><p className="title">Re-entry</p><span>{reEntry}</span></li>
		      			<li className={self.propClass(prizeGtd)} id="prize-gtd" key="13"><p className="title">Prize guarantee</p><span>{prizeGtd}</span></li>
		      			<li className={self.propClass(other)} id="other" key="14"><p className="title">Notes</p><span>{other}</span></li>
					</ul>
				</li>
			);
		});

	    var casinos = (this.props.params && this.props.params.casinos) ? this.props.params.casinos : 'allcasinos';
	    var name = (this.props.params && this.props.params.name) ? this.props.params.name : '';
	    var casinoPath = '/' + casinos + (name ? '/' + name : '');
	    var listPath = '/' + casinos;
	    var displayName = (this.props.casino && this.props.casino.name) ? this.props.casino.name : 'this casino';
		var empty = !tournaments.length;

	    return (
	    		<div className="tournament-info">
	    			<div className="detail-toolbar">
	    				<Link to={casinoPath} className="back-link">← Back to casino</Link>
	    				<Link to={listPath} className="back-link back-link-muted">← Search</Link>
	    			</div>
	    			<h3>Tournaments at {displayName}</h3>
	    			{empty ? (
	    				<p className="tourney-empty">No tournament schedule on file for this room yet. Check the room’s calendar link on the casino page, or check back after the next data refresh.</p>
	    			) : (
	    				<ol className="tournament-list">{tournamentArr}</ol>
	    			)}
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
