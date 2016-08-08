var React = require('react');
var router = require('react-router');
var connect = require('react-redux').connect;
var actions = require('./actions');
var Link = router.Link;

var Casino = React.createClass({
	getDetails: function (event) {
		this.props.dispatch(actions.fetchCasinoDetails(this.props.casino.id));
	},

  	render: function () {
    	return (
		    <div>
		      	<li className="output-item" key={this.props.casino.id} onClick={this.getDetails}>
			      	<Link to={'search/' + {this.props.params.casinos} + '/' + {this.props.casino.id}}>
			      		{this.props.casino.name} - {this.props.casino.city}, {this.props.casino.state}
			      	</Link>
		     	</li>
		    </div>
	    );
  	}
});

var Container = connect()(Casino);
module.exports = Container;