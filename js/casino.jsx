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

var Casino = React.createClass({
	getDetails: function (event) {
		var casinoName = this.props.casino.substr(0, this.props.casino.indexOf(':'));
		casinoName = casinoName.split(',').join('4');
		casinoName = casinoName.split('&').join('$');
		casinoName = casinoName.split(' ').join('_');
		this.props.dispatch(actions.fetchCasinoDetails(casinoName));
	},

  	render: function () {
  		var casino = this.props.casino;
  		var splitAt = casino.indexOf(': ');
  		var name = splitAt > -1 ? casino.substr(0, splitAt) : casino;
  		var meta = splitAt > -1 ? casino.substr(splitAt + 2) : '';
  		var slug = name.split(',').join('4').split('&').join('$').split(' ').join('_');
  		var hasSchedule = !!scheduleSet[name];
    	return (
		      	<li className={'output-item' + (hasSchedule ? ' has-schedule' : '')} key={this.props.casino} >
			      	<Link to={`/${this.props.list || 'allcasinos'}/${slug}`} onClick={this.getDetails}>
			      		<span className="casino-result-main">
			      			<span className="casino-result-name">{name}</span>
			      			{hasSchedule ? <span className="schedule-badge" title="Daily or weekly tournament schedule on file">Schedule</span> : null}
			      		</span>
			      		{meta ? <span className="casino-result-meta">{meta}</span> : null}
			      	</Link>
		     	</li>
	    );
  	}
});

var Container = connect()(Casino);
exports.Casino = Casino;
exports.Container = Container;
