var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var Provider = require( 'react-redux' ).Provider;
var router = require('react-router');

var Router = router.Router;
var Route = router.Route;
var Link = router.Link;
var IndexRoute = router.IndexRoute;
var browserHistory = router.browserHistory;

var actions = require('./actions');
var store = require( './store' );
var MainContainer = require('./main-container').Container;
var CasinoDetails = require('./casino-details').Container;
var TournamentInfo = require('./tournament-info').Container;


var App = function(props) {
    return (
        <div>
            <h1>Search for U.S. Casinos and Poker Tournament Information</h1>
            <nav>
            <Link to={'/allcasinos'} className='nav-links'>Search All Casinos</Link>{'|'}<Link to={'/pokercasinos'} className='nav-links'>Search Poker Casinos</Link>
            </nav>
            <hr/>
            <div>
                {props.children}
            </div>
        </div>
    );
};
var routes = (
  <Router history={browserHistory}>
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