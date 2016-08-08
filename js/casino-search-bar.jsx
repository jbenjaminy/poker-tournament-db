var React = require('react');
var Casino = require('./casino');

var CasinoSearchBar = React.createClass({
  render: function () {
    var casinos = this.props.output;
    casinos.map(function(casino) {
      return <Casino casino={casino}/>;
    });
    return (
      <div className="userInput">
        <input type="text" placeholder="Search Casinos" onChange={this.props.addInput} />
        <ul className="output">{casinos}</ul>
      </div>
    );
  }
});



