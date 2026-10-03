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

var SCRAPE_NOTE_RE = /poker\s*atlas|deepstack\s*pdf|scrape\s*pass|not yet re-verified|aggregator|imported from seed|status:\s*stale|meta\s*report|sourceurls?|\bfetcher\b|enrichment|secondary-confidence|corroborat|does not expose|official domain currently|keep as a\b|\bthis pass\b|\bpass\s*\d+\b|\b404\b|unverified|not confirmed|no (?:public )?(?:recurring|current|verified)|does not currently run|prior verified status|empty tourneys|returned errors|fetch fail|thin weekly|legacy seed|seed junk|do not invent|no public .+ tournament schedule|cardplayer lists|WSGC licensed|should be rechecked|useful .+ lead|confirm phone on-site|often associated with|official site treats|official site clearly|official site states|official contact page|linked schedule PDF still/i;

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
  	renderField: function(id, key, label, value) {
		if (!this.isRealValue(value)) { return null; }
		return (
			<li className="casino-prop" id={id} key={key}>
				<p className="title">{label}</p>
				<span>{value}</span>
			</li>
		);
	},
	renderLink: function(id, key, label, href) {
		if (!this.isRealValue(href)) { return null; }
		return (
			<li className="casino-prop casino-link-row" id={id} key={key}>
				<a className="casino-outbound-link" href={href} target="_blank" rel="noopener noreferrer">{label}</a>
			</li>
		);
	},
  	render: function () {
  		var casino = this.props.casino || {};

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
	    			{this.renderField('address', '3', 'Address', casino.address)}
	    			{this.renderField('phone', '4', 'Phone', casino.phone)}
	    			{this.renderField('hours', '5', 'Poker room hours', casino.hours)}
	    			{this.renderField('games-offered', '9', 'Cash games', casino.games_offered)}
	    			{this.renderField('other-games', '6', 'Other casino games', casino.other_games)}
	    			{this.isPlayerUsefulDescription(casino.description)
	    				? this.renderField('description', '10', 'About the room', casino.description)
	    				: null}
	    			{this.renderField('poker-promotions', '11', 'Poker promotions', casino.poker_promotions)}
	    			{this.renderLink('website', '12', 'Website', casino.website)}
	    			{this.renderLink('specials', '13', 'Specials & promotions', casino.specials)}
	    			{this.renderLink('poker-url', '14', 'Poker room site', casino.poker_url)}
	    			{this.renderLink('calendar-url', '15', 'Tournament calendar', casino.calendar_url)}
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
