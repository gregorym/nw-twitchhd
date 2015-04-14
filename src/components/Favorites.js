var React = require('react');
var UserStore = require('../stores/UserStore.js');
var ChannelItem = require('../components/ChannelItem.js');

var scopes = [
  "user_read",
  "user_blocks_read",
  "user_blocks_edit",
  "user_follows_edit",
  "user_subscriptions"
];

var Favorites = React.createClass({

  getInitialState: function() {
    return {
      user: UserStore.getUser(),
      channels: []
    }
  },

  handleLoginClick: function() {
    var url = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id=18shf9aqsr9zghxyaea45xjexzm6x0p&redirect_uri=app://twitch-hd/oauth.html&scope=";
    
    global.gui.App.addOriginAccessWhitelistEntry("https://api.twitch.tv", "app", "twitch-hd", true);
    window.OAUTH_CALLBACK = this.oauthCallback;
    this.oauth_win = global.gui.Window.open(url);
  },

  oauthCallback: function(hash){
    var params = hash.split("&").reduce(function( obj, elem ) {
        var split = elem.split( "=" );
        obj[ split.splice( 0, 1 ) ] = split.join( "=" );
        return obj;
      }, {} );
    this.setState({user: UserStore.setUser(params)});
    this.fetchFavorites();
    this.oauth_win.close();
  },

  componentDidMount: function(){
    if(this.state.user){
      this.fetchFavorites();
    }
  },

  fetchFavorites: function(){
    var that = this;
    if (that.state.user){
      UserStore.getFavorites()
      .then(function(channels){
        that.setState({channels: channels});
      })
    }
  },

  render: function() {
    var html;
    if (this.state.user) {
      if (this.state.channels.length > 0) {
        html = (
          <ul className="list">
            <div className="items">
              {this.state.channels.map(function(c){return (<ChannelItem channel={c} />)})}
            </div>
          </ul>
        ) 
      } else
        html = (<p>No Stream currently Online.</p>)
    } else {
      html = (<button onClick={this.handleLoginClick}>Login</button>);
    }

    return (
      <div className="favorites">
        {html}
      </div>
    )
  }
})

module.exports = Favorites;