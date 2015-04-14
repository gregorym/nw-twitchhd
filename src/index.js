var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Header        = require('./components/Header.js');
var Nav           = require('./components/Navigation.js');
var StatusBanner  = require('./components/StatusBanner.js');
var TopGames      = require('./components/TopGames.js');
var TopChannels   = require('./components/TopChannels.js');
var GameChannels  = require('./components/GameChannels.js');
var Favorites     = require('./components/Favorites.js');

var App = React.createClass({
  render: function () {
    return (
      <div className="main-window">
        <Header />
        <div id="content">
          <Nav />
          <div id="main-browser">
            <div className="list-region">
              <StatusBanner />
              <RouteHandler/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="topGames" handler={TopGames} path="/" />
    <Route name="topChannels" handler={TopChannels}/>
    <Route name="gameChannels" handler={GameChannels}/>
    <Route name="favorites" handler={Favorites}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById("react"));
});