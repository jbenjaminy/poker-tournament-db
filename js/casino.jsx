var React = require('react');
var router = require('react-router');
var connect = require('react-redux').connect;
var actions = require('./actions');
var Link = router.Link;

var Casino = React.createClass({
	getDetails: function (event, casinoName) {
				this.props.dispatch(actions.fetchCasinoDetails(casinoName));
	},

  	render: function () {
  		var casino = this.props.casino;
  		var casinoName = casino.substr(0, casino.indexOf(' - '));
  		console.log('casinoName', casinoName);

  		var casinoLink = casinoName.match(/[A-Za-z]+/g).join('');
    	return (
		      	<li className="output-item" key={this.props.casino} >
			      	<Link to={`/${this.props.list}/${casinoLink}`} onClick={this.getDetails(casinoName)}>
			      		{this.props.casino}
			      	</Link>
		     	</li>
	    );
  	}
});

var Container = connect()(Casino);
exports.Casino = Casino;
exports.Container = Container;