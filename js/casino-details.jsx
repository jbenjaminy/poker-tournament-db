var React = require('react');
var router = require('react-router');
var connect = require('react-redux').connect;
var actions = require('./actions');
var Link = router.Link;

var CasinoDetails = React.createClass({
	getTournaments: function() {
		var casinoName = this.props.casino.name;
		casinoName = casinoName.split(',').join('4');
		casinoName = casinoName.split('&').join('$');
		casinoName = casinoName.split(' ').join('_');
		this.props.dispatch(actions.fetchTournamentInfo(casinoName));
	},
  	render: function () {
  		var addressClass = 'casino-prop ';
  		var phoneClass = 'casino-prop ';
  		var websiteClass = 'casino-prop ';
  		var hoursClass = 'casino-prop ';
  		var otherClass = 'casino-prop '
  		var gamesClass = 'casino-prop ';
  		var descriptionClass = 'casino-prop ';
  		var specialsClass = 'casino-prop ';
  		var promotionsClass = 'casino-prop ';
  		var pokerUrlClass = 'casino-prop ';
  		var calendarClass = 'casino-prop ';
  		var tournamentsClass = 'casino-prop ';
  		var hasTournamentsClass = 'casino-prop ';
  		var hasPoker = 'yes';
  		var pokerTournaments = 'yes';
		if (!this.props.casino.address) {
			addressClass += 'hidden';
		};
		if (!this.props.casino.phone) {
			phoneClass += 'hidden';
		};
		if (!this.props.casino.website) {
			websiteClass += 'hidden';
		};
		if (!this.props.casino.hours) {
			hoursClass += 'hidden';
		};
		if (!this.props.casino.other_games) {
			otherClass += 'hidden';
		};
		if (!this.props.casino.games_offered) {
			gamesClass += 'hidden';
		};
		if (!this.props.casino.description) {
			descriptionClass += 'hidden';
		};
		if (!this.props.casino.specials) {
			specialsClass += 'hidden';
		};
		if (!this.props.casino.poker_promotions) {
			promotionsClass += 'hidden';
		};
		if (!this.props.casino.poker_url) {
			pokerUrlClass += 'hidden';
		};
		if (!this.props.casino.calendar_url) {
			calendarClass += 'hidden';
		};
		if (!this.props.casino.has_poker) {
			hasPoker = 'no';
			tournamentsClass += 'hidden';
			hasTournamentsClass += 'hidden';
		};
		if (this.props.casino.has_poker && !this.props.casino.poker_tournaments) {
			pokerTournaments = 'no';
			tournamentsClass += 'hidden';

		};
	    return (
	    		<ul>
	    			<li className="casino-prop" id="name" key="1">Name: {this.props.casino.name}</li>
	    			<li className={addressClass} id="address" key="2">Address: {this.props.casino.address}</li>
	    			<li className={phoneClass} id="phone" key="3">Phone: {this.props.casino.phone}</li>
	    			<li className={websiteClass} id="website" key="4"><a href={this.props.casino.website}>View Website</a></li>
	    			<li className={hoursClass} id="hours" key="5">Hours: {this.props.casino.hours}</li>
	    			<li className={otherClass} id="other-games" key="6">Casino Games: {this.props.casino.other_games}</li>
	    			<li className="casino-prop" id="has-poker" key="6">Has Poker: {hasPoker}</li>
	    			<li className={hasTournamentsClass} id="poker-tournaments" key="8">Has Poker Tournaments: {pokerTournaments}</li>
	    			<li className={gamesClass} id="games-offered" key="9">Games Offered: {this.props.casino.games_offered}</li>
	    			<li className={descriptionClass} id="description" key="10">Poker Room Description: {this.props.casino.description}</li>
	    			<li className={specialsClass} id="specials" key="11"><a href={this.props.casino.specials}>View Info on Specials and Promotions</a></li>
	    			<li className={promotionsClass} id="poker-promotions" key="12">Poker Promotions: {this.props.casino.poker_promotions}</li>
	    			<li className={tournamentsClass} id="tournament-info" key="13" onClick={this.getTournaments}>
	      				<Link to={`/${this.props.params.casinos}/${this.props.params.name}/tournaments`}>
				      		View Poker Tournament Info
				      	</Link></li>
	    			<li className={pokerUrlClass} id="poker-url" key="14"><a href={this.props.casino.poker_url}>View Poker Room Site</a></li>
	    			<li className={calendarClass} id="calendar-url" key="15"><a href={this.props.casino.calendar_url}>View Poker Tournament Calendar</a></li>
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