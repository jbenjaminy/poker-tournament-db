var React = require('react');
var connect = require('react-redux').connect;
var CasinoSearchBar = require('./casino-search-bar');
var CasinoSearchArray = require('./casino-search-array');
var actions = require('./actions');

var MainContainer = React.createClass({

  onAddInput: function (event) {
    var casinos = CasinoSearchArray || [];
    var value = String(event.target.value || '').toLowerCase().trim();
    var tempLib = [];
    if (value.length > 0) {
      tempLib = casinos.filter(function (item) {
        return String(item).toLowerCase().indexOf(value) !== -1;
      });
    }
    this.props.dispatch(actions.addInput(tempLib));
  },

  render: function () {
    return (
      <div className="main-container">
        <CasinoSearchBar list={this.props.params.casinos || 'allcasinos'} addInput={this.onAddInput} output={this.props.output}/>
        {this.props.children}
      </div>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    output: state.output || [],
  }
};

var Container = connect(mapStateToProps)(MainContainer);
exports.MainContainer = MainContainer;
exports.Container = Container;
