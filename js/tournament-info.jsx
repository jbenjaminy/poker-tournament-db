var React = require('react');
var router = require('react-router');
var connect = require('react-redux').connect;
var Link = router.Link;

var BANDS = [
	{ id: 'all', label: 'All buy-ins' },
	{ id: 'freeroll', label: 'Freeroll' },
	{ id: 'low', label: '$1–50' },
	{ id: 'mid', label: 'Mid' },
	{ id: 'deep', label: 'Deepstack' }
];

var BAND_LABEL = {
	freeroll: 'Freeroll',
	low: '$1–50',
	mid: 'Mid',
	deep: 'Deepstack'
};

var TournamentInfo = React.createClass({
	getInitialState: function() {
		return { band: 'all', bounty: false, plo: false, kind: 'all' };
	},

	componentDidMount: function() {
		this.loadFromRoute();
	},

	componentWillReceiveProps: function(nextProps) {
		var prev = this.props.params && this.props.params.name;
		var next = nextProps.params && nextProps.params.name;
		if (prev !== next) { this.loadFromRoute(nextProps); }
	},

	routeName: function(props) {
		props = props || this.props;
		var name = props.params && props.params.name;
		if (!name) { return ''; }
		try { name = decodeURIComponent(name); } catch (e) {}
		return String(name).split('4').join(',').split('$').join('&').split('_').join(' ');
	},

	loadFromRoute: function(props) {
		var name = this.routeName(props);
		if (!name) { return; }
		var actions = require('./actions');
		this.props.dispatch(actions.fetchCasinoDetails(name));
		this.props.dispatch(actions.fetchTournamentInfo(name));
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

	propClass: function(val) {
		return this.isRealValue(val) ? 'tournament-prop' : 'tournament-prop hidden';
	},

	setBand: function(id) {
		this.setState({ band: id });
	},

	toggle: function(key) {
		var next = {};
		next[key] = !this.state[key];
		this.setState(next);
	},

	setKind: function(id) {
		this.setState({ kind: id });
	},

	matches: function(tournament) {
		if (this.state.band !== 'all' && tournament.buyin_band !== this.state.band) { return false; }
		var tags = tournament.structure_tags || [];
		if (this.state.bounty && tags.indexOf('bounty') === -1) { return false; }
		if (this.state.plo && tags.indexOf('plo') === -1) { return false; }
		if (this.state.kind === 'weekly' && tournament.schedule_type === 'series') { return false; }
		if (this.state.kind === 'series' && tournament.schedule_type !== 'series') { return false; }
		return true;
	},

	renderCard: function(tournament) {
		var self = this;
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

		var tagNodes = [];
		if (tournament.buyin_band && BAND_LABEL[tournament.buyin_band]) {
			tagNodes.push(
				<span className={'tourney-tag tag-' + tournament.buyin_band} key="band">{BAND_LABEL[tournament.buyin_band]}</span>
			);
		}
		var tags = tournament.structure_tags || [];
		if (tags.indexOf('bounty') !== -1) {
			tagNodes.push(<span className="tourney-tag tag-bounty" key="bounty">Bounty</span>);
		}
		if (tags.indexOf('plo') !== -1) {
			tagNodes.push(<span className="tourney-tag tag-plo" key="plo">PLO</span>);
		}
		if (tournament.schedule_type === 'series') {
			tagNodes.push(<span className="tourney-tag tag-series" key="series">Series</span>);
		}

		return (
			<li key={tournament.id} className="tournament-card">
				<ul className="tournament">
					<li className="tournament-prop tournament-name" id="name" key="1">
						<h4 className="name">{tournament.name || 'Tournament'}</h4>
						{tagNodes.length ? <div className="tourney-tags">{tagNodes}</div> : null}
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
	},

	renderSection: function(title, note, rows) {
		if (!rows.length) { return null; }
		return (
			<div className="tourney-section" key={title}>
				<h4 className="tourney-section-title">{title}</h4>
				{note ? <p className="tourney-section-note">{note}</p> : null}
				<ol className="tournament-list">{rows.map(this.renderCard)}</ol>
			</div>
		);
	},

	render: function () {
		var self = this;
		var tournaments = this.props.tournaments || [];
		var filtered = tournaments.filter(function(t) { return self.matches(t); });
		var weekly = filtered.filter(function(t) { return t.schedule_type !== 'series'; });
		var series = filtered.filter(function(t) { return t.schedule_type === 'series'; });

		var casinos = (this.props.params && this.props.params.casinos) ? this.props.params.casinos : 'allcasinos';
		var name = (this.props.params && this.props.params.name) ? this.props.params.name : '';
		var casinoPath = '/' + casinos + (name ? '/' + name : '');
		var listPath = '/' + casinos;
		var displayName = (this.props.casino && this.props.casino.name) ? this.props.casino.name : (this.routeName() || 'this casino');
		var empty = !tournaments.length;
		var filteredEmpty = !empty && !filtered.length;

		var bandButtons = BANDS.map(function(b) {
			var on = self.state.band === b.id;
			return (
				<button
					type="button"
					key={b.id}
					className={on ? 'filter-chip is-on' : 'filter-chip'}
					aria-pressed={on}
					onClick={function() { self.setBand(b.id); }}
				>{b.label}</button>
			);
		});

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
					<div>
						<div className="tourney-filters" role="group" aria-label="Filter tournaments">
							<div className="filter-row">{bandButtons}</div>
							<div className="filter-row">
								<button type="button" className={self.state.bounty ? 'filter-chip is-on' : 'filter-chip'} aria-pressed={self.state.bounty} onClick={function() { self.toggle('bounty'); }}>Bounty</button>
								<button type="button" className={self.state.plo ? 'filter-chip is-on' : 'filter-chip'} aria-pressed={self.state.plo} onClick={function() { self.toggle('plo'); }}>PLO</button>
								<button type="button" className={self.state.kind === 'all' ? 'filter-chip is-on' : 'filter-chip'} aria-pressed={self.state.kind === 'all'} onClick={function() { self.setKind('all'); }}>Weekly + series</button>
								<button type="button" className={self.state.kind === 'weekly' ? 'filter-chip is-on' : 'filter-chip'} aria-pressed={self.state.kind === 'weekly'} onClick={function() { self.setKind('weekly'); }}>Weekly only</button>
								<button type="button" className={self.state.kind === 'series' ? 'filter-chip is-on' : 'filter-chip'} aria-pressed={self.state.kind === 'series'} onClick={function() { self.setKind('series'); }}>Series only</button>
							</div>
						</div>
						{filteredEmpty ? (
							<p className="tourney-empty">Nothing on file matches those filters. Clear a chip to see the rest of the schedule.</p>
						) : (
							<div>
								{this.renderSection('Weekly schedule', 'Recurring daily and weekly tournaments.', weekly)}
								{this.renderSection('Series & circuit stops', 'Festival, circuit, and milestone events — not the regular weekly grid.', series)}
							</div>
						)}
					</div>
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
