var React = require('react');
var router = require('react-router');
var connect = require('react-redux').connect;
var actions = require('./actions');
var Link = router.Link;

var Casino = React.createClass({
	getDetails: function (event) {
		this.props.dispatch(actions.fetchCasinoDetails(this.props.casinoName));
	},

  	render: function () {
  		var casino = this.props.casino;
  		var casinoName = casino.substr(0, casino.indexOf(' - '));
  		var casinoLink = casinoName.match(/[A-Za-z]+/g).join('');
  		console.log(casinoName, '<casinoName', casinoLink, 'casinoLink');

    	return (
		      	<li className="output-item" key={this.props.casino}>
			      	<Link to={`/${this.props.list}/${casinoLink}`}>
			      		{this.props.casino}
			      	</Link>
		     	</li>
	    );
  	}
});

var Container = connect()(Casino);
exports.Casino = Casino;
exports.Container = Container;

// fix onClick={this.getDetails(casinoName)}