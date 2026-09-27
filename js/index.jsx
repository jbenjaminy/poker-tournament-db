var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var Provider = require( 'react-redux' ).Provider;
var router = require('react-router');

var Router = router.Router;
var Route = router.Route;
var IndexRoute = router.IndexRoute;
var IndexRedirect = router.IndexRedirect;
var browserHistory = router.browserHistory;

var actions = require('./actions');
var store = require( './store' );
var MainContainer = require('./main-container').Container;
var CasinoDetails = require('./casino-details').Container;
var TournamentInfo = require('./tournament-info').Container;
var HubPage = require('./pages/hub-page');
var GuideDailyTournaments = require('./pages/guide-daily-tournaments');
var Glossary = require('./pages/glossary');

var STAKE_AFFILIATE_URL = 'https://stake.us/?c=DegenUS';

var StakeBanner = function() {
    return (
        <aside className="stake-ad" aria-label="Sponsored">
          <a
            className="stake-banner"
            href={STAKE_AFFILIATE_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            aria-label="Play poker on Stake.us — affiliate offer"
          >
            <img
              className="stake-banner-art"
              src="/images/stake-us-banner.png?v=27"
              alt="Stake.us — Play poker. Claim offer."
            />
          </a>
          <p className="stake-banner-disclosure">Sponsored · Affiliate link · 21+ · Play responsibly · Terms on Stake.us</p>
        </aside>
    );
};

var App = function(props) {
    return (
        <div className="app-shell">
            <StakeBanner />

            <header className="app-header">
              <div className="header-band">
                <div className="brand-row">
                  <span className="brand-mark" aria-hidden="true"></span>
                  <span className="brand-name">Daily Tourneys</span>
                </div>
                <h1>Find U.S. casino and poker room tournament schedules</h1>
                <p className="tagline">Search daily and weekly poker tournaments at U.S. casinos — rooms, buy-ins, and what’s running.</p>
              </div>
            </header>

            <main className="panel">
                {props.children}
            </main>
        </div>
    );
};

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      {/* / had no child UI; IndexRoute MainContainer did not paint in prod — send users to working search */}
      <IndexRedirect to="/allcasinos" />
      {/* Static content routes MUST come before :casinos or they are swallowed */}
      <Route path="guides/how-daily-tournaments-work" component={GuideDailyTournaments} />
      <Route path="guides/tournament-terms" component={Glossary} />
      <Route path="texas-poker-rooms" component={HubPage} />
      <Route path="california-poker-rooms" component={HubPage} />
      <Route path="washington-poker-rooms" component={HubPage} />
      <Route path="florida-poker-rooms" component={HubPage} />
      <Route path="hubs/:slug" component={HubPage} />
      <Route path=":casinos">
        <IndexRoute component={MainContainer}/>
          <Route path=":name">
            <IndexRoute component={CasinoDetails}/>
              <Route path=":tournaments">
                <IndexRoute component={TournamentInfo}/>
              </Route>
          </Route>
      </Route>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function() {
  store.dispatch(actions.newSearch());

    ReactDOM.render(
      <Provider store={store}>
        {routes}
      </Provider>, document.getElementById('app'));
});
