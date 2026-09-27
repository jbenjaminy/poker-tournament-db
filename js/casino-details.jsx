var React = require('react');
var router = require('react-router');
var connect = require('react-redux').connect;
var actions = require('./actions');
var Link = router.Link;
var roomsWithSchedules = require('./rooms-with-schedules');

var scheduleSet = {};
(roomsWithSchedules || []).forEach(function(name) {
	scheduleSet[name] = true;
});

var SCRAPE_NOTE_RE = /poker\s*atlas|deepstack\s*pdf|scrape\s*pass|not yet re-verified|aggregator|imported from seed|status:\s*stale|meta\s*report|sourceurls?|\bfetcher\b|enrichment|secondary-confidence|corroborat|does not expose|official domain currently|keep as a\b|\bthis pass\b|\bpass\s*\d+\b|\b404\b|unverified|not confirmed|no (?:public )?(?:recurring|current|verified)|does not currently run|prior verified status|empty tourneys|returned errors|fetch fail|thin weekly/i;

var CasinoDetails = React.createClass({
	componentDidMount: function() {
		this.loadFromRoute();
	},
	componentWillReceiveProps: function(nextProps) {
		if (!nextProps.params || !this.props.params) { return; }
		if (nextProps.params.name !== this.props.params.name) {
			this.loadFromRoute(nextProps);
		}
	},
	loadFromRoute: function(props) {
		props = props || this.props;
		var name = props.params && props.params.name;
		if (!name) { return; }
		try { name = decodeURIComponent(name); } catch (e) {}
		// Match mock-server / Netlify decode of room slugs
		name = String(name).split('4').join(',').split('$').join('&').split('_').join(' ');
		this.props.dispatch(actions.fetchCasinoDetails(name));
	},
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
	isPlayerUsefulDescription: function(val) {
		if (!this.isRealValue(val)) { return false; }
		if (SCRAPE_NOTE_RE.test(String(val))) { return false; }
		return true;
	},
	getTournaments: function() {
		var casinoName = this.props.casino.name;
		casinoName = casinoName.split(',').join('4');
		casinoName = casinoName.split('&').join('$');
		casinoName = casinoName.split(' ').join('_');
		this.props.dispatch(actions.fetchTournamentInfo(casinoName));
	},
  	render: function () {
  		var casino = this.props.casino || {};
  		var addressClass = 'casino-prop ';
  		var phoneClass = 'casino-prop ';
  		var websiteClass = 'casino-prop ';
  		var hoursClass = 'casino-prop ';
  		var otherClass = 'casino-prop ';
  		var gamesClass = 'casino-prop ';
  		var descriptionClass = 'casino-prop ';
  		var specialsClass = 'casino-prop ';
  		var promotionsClass = 'casino-prop ';
  		var pokerUrlClass = 'casino-prop ';
  		var calendarClass = 'casino-prop ';

		if (!this.isRealValue(casino.address)) { addressClass += 'hidden'; }
		if (!this.isRealValue(casino.phone)) { phoneClass += 'hidden'; }
		if (!this.isRealValue(casino.website)) { websiteClass += 'hidden'; }
		if (!this.isRealValue(casino.hours)) { hoursClass += 'hidden'; }
		if (!this.isRealValue(casino.other_games)) { otherClass += 'hidden'; }
		if (!this.isRealValue(casino.games_offered)) { gamesClass += 'hidden'; }
		if (!this.isPlayerUsefulDescription(casino.description)) { descriptionClass += 'hidden'; }
		if (!this.isRealValue(casino.specials)) { specialsClass += 'hidden'; }
		if (!this.isRealValue(casino.poker_promotions)) { promotionsClass += 'hidden'; }
		if (!this.isRealValue(casino.poker_url)) { pokerUrlClass += 'hidden'; }
		if (!this.isRealValue(casino.calendar_url)) { calendarClass += 'hidden'; }

	    var listPath = '/' + (this.props.params && this.props.params.casinos ? this.props.params.casinos : 'allcasinos');
	    var displayName = casino.name ? casino.name : 'Loading…';
	    var hasSchedule = !!(casino.name && scheduleSet[casino.name]);
	    var showTournamentCta = !!casino.has_poker;
	    var tourneyPath = '/' + (this.props.params && this.props.params.casinos ? this.props.params.casinos : 'allcasinos') + '/' + (this.props.params && this.props.params.name ? this.props.params.name : '');

	    return (
	    		<div className="casino-details">
	    		<div className="detail-toolbar">
	    			<Link to={listPath} className="back-link">← Back to search</Link>
	    		</div>
	    		<ul>
	    			<li className="casino-prop casino-title-row" id="name" key="1">
	    				<h4 className="name">{displayName}</h4>
	    				{hasSchedule ? <span className="schedule-badge">Schedule on file</span> : null}
	    			</li>
	    			{showTournamentCta ? (
	    				<li className="casino-prop" id="tournament-info" key="2" onClick={hasSchedule ? this.getTournaments : null}>
	    					{hasSchedule ? (
	    						<Link to={tourneyPath + '/tournaments'}>View tournament schedule</Link>
	    					) : (
	    						<p className="schedule-pending">No daily/weekly schedule on file yet — contact info and links below.</p>
	    					)}
	    				</li>
	    			) : null}
	    			<li className={addressClass} id="address" key="3"><p className="title">Address</p><span>{casino.address}</span></li>
	    			<li className={phoneClass} id="phone" key="4"><p className="title">Phone</p><span>{casino.phone}</span></li>
	    			<li className={hoursClass} id="hours" key="5"><p className="title">Hours</p><span>{casino.hours}</span></li>
	    			<li className={gamesClass} id="games-offered" key="9"><p className="title">Poker games</p><span>{casino.games_offered}</span></li>
	    			<li className={otherClass} id="other-games" key="6"><p className="title">Other casino games</p><span>{casino.other_games}</span></li>
	    			<li className={descriptionClass} id="description" key="10"><p className="title">About the room</p><span>{casino.description}</span></li>
	    			<li className={promotionsClass} id="poker-promotions" key="11"><p className="title">Poker promotions</p><span>{casino.poker_promotions}</span></li>
	    			<li className={websiteClass} id="website" key="12"><a href={casino.website}>Website</a></li>
	    			<li className={specialsClass} id="specials" key="13"><a href={casino.specials}>Specials &amp; promotions</a></li>
	    			<li className={pokerUrlClass} id="poker-url" key="14"><a href={casino.poker_url}>Poker room site</a></li>
	    			<li className={calendarClass} id="calendar-url" key="15"><a href={casino.calendar_url}>Tournament calendar</a></li>
				</ul>
				</div>
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
