var React = require('react');
var StreamsStore = require('../stores/StreamsStore.js');
var ChannelItem = require('../components/ChannelItem.js');
var TopChannels = React.createClass({

  getInitialState: function() {
    return {
      channels: []
    }
  },

  componentDidMount: function() {
    var that = this;
    StreamsStore.getAll().then(function(data){
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

module.exports = TopChannels;