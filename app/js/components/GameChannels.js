var React = require('react');
var Router = require('react-router');
var StreamsStore = require('../models/StreamsStore.js');
var ChannelItem = require('../components/ChannelItem.js');

var GameChannels = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },


  getInitialState: function() {
    return {
      channels: []
    }
  },

  componentDidMount: function() {
    var that = this;
    var option = { game: this.context.router.getCurrentQuery().game };
    StreamsStore.getAll(option).then(function(data){
      that.setState({channels: data});
    });
  },

  render: function() {
    var channels = [];
    for (var i = 0; i < this.state.channels.length; i++) {
      channels.push(<ChannelItem channel={this.state.channels[i]} />);
    };
    return (
      <div>
        <ul className="list">
          <div className="items">
            {channels}
          </div>
        </ul>
      </div>
    );
  }
})

module.exports = GameChannels;