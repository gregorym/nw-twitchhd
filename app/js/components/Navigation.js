var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
  
var Navigation = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    return (
      <div className="filter-bar-region">
        <div className="filter-bar">
          <ul className="nav nav-hor left">
            <li className="source">
              <Link to="topGames">Top Games</Link>
            </li>
            <li className="source">
              <Link to="topChannels">Top Channels</Link>
            </li>
            <li className="source">
              <Link to="favorites">Favorites</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
})

module.exports = Navigation;