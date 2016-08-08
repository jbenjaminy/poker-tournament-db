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
  		// SET TO RETURN EACH PROP ONLY IF NOT NULL;
	    return (
	    		<ul>
	    			<li className="casino-prop" id="name" key="1">Name: {this.props.casino.name}</li>
	    			<li className="casino-prop" id="address" key="2">Address: {this.props.casino.address}</li>
	    			<li className="casino-prop" id="phone" key="3">{phone: this.props.casino.phone}</li>
	    			<li className="casino-prop" id="website" key="4"><a href={this.props.casino.website}>Website</a></li>
	    			<li className="casino-prop" id="hours" key="5">Hours: {this.props.casino.hours}</li>
	    			<li className="casino-prop" id="has-poker" key="6">Has Poker: {this.props.casino.hasPoker}</li>
	    			<li className="casino-prop" id="games-offered" key="7">Games Offered: {this.props.casino.gamesOffered}</li>
	    			<li className="casino-prop" id="other" key="7">Additional Info: {this.props.casino.other}</li>
	      			<li className="casino-prop" id="tournament-info" key="11" onClick={this.getTournaments}>
	      				<Link to={'search/' + {this.props.params.casinos} + '/' + {this.props.casino.id} + '/tournaments'}>
				      		Tournament Info
				      	</Link>
				    </li>
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
module.exports = Container;