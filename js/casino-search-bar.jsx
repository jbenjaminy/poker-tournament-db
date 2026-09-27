var React = require('react');
var Casino = require('./casino').Container;

var CasinoSearchBar = React.createClass({
  render: function () {
    var casinos = this.props.output || [];
    var list = this.props.list;
    var hasResults = casinos.length > 0;
    var items = casinos.map(function(casino, index) {
      return <Casino list={list} casino={casino} key={index}/>;
    });
    return (
      <div className="userInput">
        <label className="search-label" htmlFor="casino-search">Search casinos</label>
        <div className="search-field">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            id="casino-search"
            type="search"
            placeholder="Name or state — e.g. Bellagio, Texas"
            onChange={this.props.addInput}
            autoComplete="off"
          />
        </div>
        {hasResults ? (
          <div className="output-shell">
            <ul className="output">{items}</ul>
          </div>
        ) : (
          <p className="search-hint">Start typing to filter poker rooms. Results update as you type.</p>
        )}
      </div>
    );
  }
});

module.exports = CasinoSearchBar;
