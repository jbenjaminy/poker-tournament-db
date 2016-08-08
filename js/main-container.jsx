var React = require('react');
var connect = require('react-redux').connect;
var CasinoSearchBar = require('./casino-search-bar');
var CasinoLists = require('./casino-lists');

var MainContainer = React.createClass({

  onAddInput: function (event) {
    var casinoList = this.props.params.casinos;
    var casinos = CasinoLists.casinoList;
    var value = event.target.value.toLowerCase();
    if (value.length > 0) {
      var tempLib = this.props.casinos.filter(function (item) {
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
      <CasinoSearchBar addInput={this.onAddInput} output={this.props.output}/>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    output: state.output,
  }
};

var Container = connect(mapStateToProps)(MainContainer);
module.exports = Container;

