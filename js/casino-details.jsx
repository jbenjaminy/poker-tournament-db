var React = require('react');
var router = require('react-router');
var connect = require('react-redux').connect;
var actions = require('./actions');
var Link = router.Link;

var CasinoDetails = React.createClass({
	getTournaments: function() {
		this.props.dispatch(actions.fetchTournamentInfo(this.props.casino.id));
	},
  	render: function () {
  		// figure out how to use booleans here
	    return (
	    		<ul>
	    			<li className="casino-prop" id="name" key="1">Name: {this.props.casino.name}</li>
	    			<li className="casino-prop" id="address" key="2">Address: {this.props.casino.address}</li>
	    			<li className="casino-prop" id="phone" key="3">Phone: {this.props.casino.phone}</li>
	    			<li className="casino-prop" id="website" key="4"><a href={this.props.casino.website}>View Website</a></li>
	    			<li className="casino-prop" id="hours" key="5">Hours: {this.props.casino.hours}</li>
	    			<li className="casino-prop" id="has-poker" key="6">Has Poker: {this.props.casino.has_poker}</li>
	    			<li className="casino-prop" id="games-offered" key="7">Games Offered: {this.props.casino.games_offered}</li>
	    			<li className="casino-prop" id="description" key="8">Poker Room Description: {this.props.casino.description}</li>
	    			<li className="casino-prop" id="specials" key="9">Specials and Promotions: {this.props.casino.specials}</li>
	    			<li className="casino-prop" id="tournament-info" key="10" onClick={this.getTournaments}>
	      				<Link to={`/${this.props.params.casinos}/${this.props.params.name}/tournaments`}>
				      		View Poker Tournament Info
				      	</Link></li>
	    			<li className="casino-prop" id="poker-url" key="11"><a href={this.props.casino.poker_url}>View Poker Room Site</a></li>
	    			<li className="casino-prop" id="calendar-url" key="12"><a href={this.props.casino.calendar_url}>View Poker Tournament Calendar</a></li>
				</ul>
    	);
  	}
});

var mapStateToProps = function(state, props) {
  return {
    casino: state.casino
  }
};

var Container = connect(mapStateToProps)(CasinoDetails);
exports.CasinoDetails = CasinoDetails;
exports.Container = Container;