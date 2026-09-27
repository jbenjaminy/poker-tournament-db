var React = require('react');
var connect = require('react-redux').connect;
var Link = require('react-router').Link;
var CasinoSearchBar = require('../casino-search-bar');
var CasinoSearchArray = require('../casino-search-array');
var SiteFooter = require('../site-footer');
var actions = require('../actions');

var PAGE_TITLE = 'Daily Tourneys | U.S. Casino & Poker Room Tournament Schedules';

var HomePage = React.createClass({
  componentDidMount: function () {
    document.title = PAGE_TITLE;
  },

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
      <div className="home-page main-container">
        <section className="home-intro" aria-label="About Daily Tourneys">
          <p className="home-intro-lead">
            Free search for daily and weekly poker tournament schedules at U.S. casinos and card rooms —
            buy-ins, start times, and room details in one place.
          </p>
          <p className="home-intro-links">
            Popular hubs:{' '}
            <Link to="/texas-poker-rooms">Texas</Link>
            <span aria-hidden="true"> · </span>
            <Link to="/california-poker-rooms">California</Link>
            <span aria-hidden="true"> · </span>
            <Link to="/florida-poker-rooms">Florida</Link>
            <span aria-hidden="true"> · </span>
            <Link to="/washington-poker-rooms">Washington</Link>
            <span aria-hidden="true"> · </span>
            <Link to="/guides/how-daily-tournaments-work">How dailies work</Link>
          </p>
        </section>

        <CasinoSearchBar
          list="allcasinos"
          addInput={this.onAddInput}
          output={this.props.output}
        />

        <SiteFooter />
      </div>
    );
  }
});

var mapStateToProps = function (state) {
  return {
    output: state.output || []
  };
};

module.exports = connect(mapStateToProps)(HomePage);
