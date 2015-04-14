var React = require('react');
var Router = require('react-router');
var GamesStore = require('../stores/GamesStore.js');
var GameItem = require('../components/GameItem.js');

var TopGames = React.createClass({
  getInitialState: function() {
    return {
      games: []
    }
  },

  componentDidMount: function() {
    var that = this;
    GamesStore.getAll().then(function(data){
      that.setState({games: data});
    });
  },

  render: function() {
    var games = [];
    for (var i = 0; i < this.state.games.length; i++) {
      games.push(<GameItem game={this.state.games[i]} />);
    };
    return (
      <div>
        <ul className="list">
          <div className="items">
            {games}
          </div>
        </ul>
      </div>
    );
  }
})

module.exports = TopGames;