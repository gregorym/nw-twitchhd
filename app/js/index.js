var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
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
var Loader        = require('./components/Loader.js');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  
  render: function () {
    var name = this.context.router.getCurrentPath();

    return (
      <div className="main-window">
        <Loader />
        <Header />
        <div id="content">
          <Nav />
          <div id="main-browser">
            <div className="list-region">
              <StatusBanner />
              <TransitionGroup component="div" transitionName="example">
                <RouteHandler key={name}/>
              </TransitionGroup>
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
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById("react"));
});
