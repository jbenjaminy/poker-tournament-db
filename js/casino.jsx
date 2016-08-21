var React = require('react');
var router = require('react-router');
var connect = require('react-redux').connect;
var actions = require('./actions');
var Link = router.Link;

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
    	return (
		      	<li className="output-item" key={this.props.casino} >
			      	<Link to={`/${this.props.list}/${this.props.casino.substr(0, casino.indexOf(': ')).match(/[A-Za-z]+/g).join('')}`} onClick={this.getDetails}>
			      		{casino}
			      	</Link>
		     	</li>
	    );
  	}
});

var Container = connect()(Casino);
exports.Casino = Casino;
exports.Container = Container;