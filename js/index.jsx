var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var Provider = require( 'react-redux' ).Provider;
var router = require('react-router');

var Router = router.Router;
var Route = router.Route;
var Link = router.Link;
var IndexRoute = router.IndexRoute;
var hashHistory = router.hashHistory;

var actions = require('./actions');
var store = require( './store' );
var MainContainer = require('./main-container').Container;
var CasinoDetails = require('./casino-details').Container;
var TournamentInfo = require('./tournament-info').Container;


var App = function(props) {
    return (
        <div>
            <h1>Search for U.S. Casinos and Poker Tournament Details</h1>
            <nav>
              <Link to={'/pokercasinos'}>Poker Casinos</Link>
              <br/>
              <Link to={'/allcasinos'}>All Casinos</Link>
            </nav>
            <div>
                {props.children}
            </div>
        </div>
    );
};
var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
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