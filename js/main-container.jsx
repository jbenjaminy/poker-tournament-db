var React = require('react');
var connect = require('react-redux').connect;
var CasinoSearchBar = require('./casino-search-bar');
var CasinoSearchArray = require('./casino-search-array');
var PokerCasinoSearchArray = require('./poker-casino-search-array');
var actions = require('./actions');

var MainContainer = React.createClass({

  onAddInput: function (event) {
    if (this.props.params.casinos === '/pokercasinos') {
      var casinos = PokerCasinoSearchArray; 
    } else {
      var casinos = CasinoSearchArray;
    }
    var value = event.target.value.toLowerCase();
    if (value.length > 0) {
      var tempLib = casinos.filter(function (item) {
        item = item.toLowerCase();
        var casinoMatch = new RegExp(value);
        if (item.match(casinoMatch)) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      var tempLib = [];
    }
    this.props.dispatch(actions.addInput(tempLib));
  },

  render: function () {
    
    return (
      <CasinoSearchBar list={this.props.params.casinos} addInput={this.onAddInput} output={this.props.output}/>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    output: state.output,
  }
};

var Container = connect(mapStateToProps)(MainContainer);
exports.MainContainer = MainContainer;
exports.Container = Container;

