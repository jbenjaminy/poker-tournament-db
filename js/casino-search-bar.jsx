var React = require('react');
var Casino = require('./casino').Container;

var CasinoSearchBar = React.createClass({
  render: function () {
    var casinos = this.props.output;
    var list = this.props.list;
    casinos = casinos.map(function(casino, index) {
      return <Casino list={list} casino={casino} key={index}/>;
    });
    return (
      <div className="userInput">
        <input type="text" placeholder="Search Casinos" onChange={this.props.addInput} />
        <ul className="output">{casinos}</ul>
      </div>
    );
  }
});

module.exports = CasinoSearchBar;

