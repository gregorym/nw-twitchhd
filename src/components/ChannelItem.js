var React = require('react');

var ChannelItem = React.createClass({

  handleClick: function(){
    global.AppEventEmitter.emit('appletv:play', this.props.channel);
  },

  render: function() {
    var preview = this.props.channel.preview.template.replace("{width}", 200).replace("{height}", 100)
    return (
      <li className="item channel" onClick={this.handleClick}>
        <img src={preview} />
        <p className="title">{this.props.channel.channel.display_name}</p>
        <p className="viewers">{this.props.channel.viewers} viewers</p>
      </li>
    )
  }
})


module.exports = ChannelItem;