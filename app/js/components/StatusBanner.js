var React = require('react');
var Router = require('react-router');
var StreamsStore = require('../models/StreamsStore.js');

var StatusBanner = React.createClass({
  getInitialState: function(){
    return {
      'appletv:online': false
    }
  },

  componentDidMount: function(){
    var that = this;
    
    global.AppEventEmitter.on('appletv:play', function(channel){
      that.setState({'channel': channel});
      StreamsStore.getHLS(channel.channel).then(function(data){
        global.Airplay.play(data);
      });
      
    });
  },

  handleStopStream: function(){
    this.setState({'channel': null});
    global.Airplay.stop();
  },

  render: function() {
    var block;
    if(this.state.channel){
      var channel = this.state.channel;
      block = (
        <div className="status-bar row">
          <div className="col-xs-2">
            <img src={channel.preview.small} />
          </div>
          <div className="col-xs-5">
            <div className="who">
              <span className="name">{channel.channel.display_name}</span>
              <p>
                <span>Playing </span>
                <span>{channel.channel.game}</span>
              </p>
            </div>
          </div>
          <div className="col-xs-2 col-xs-offset-3 actions">
            <i title="Stop Stream" onClick={this.handleStopStream} className="glyphicon glyphicon-remove" />
          </div>
        </div>
      )
    } else {
      block = null;
    }

    return block;
  }
})

module.exports = StatusBanner;
