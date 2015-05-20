var React = require('react');
var Router = require('react-router');

var GameItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  handleClick: function(){
    this.context.router.transitionTo(
      'gameChannels',
      { game: this.props.game.game.name },
      { game: this.props.game.game.name }
    );
  },

  render: function() {
    return (
      <li className="item game" onClick={this.handleClick}>
        <img src={this.props.game.game.box.medium} />
        <p className="title">{this.props.game.game.name}</p>
        <p className="viewers">{this.props.game.viewers} viewers</p>
      </li>
    )
  }
})

module.exports = GameItem;
