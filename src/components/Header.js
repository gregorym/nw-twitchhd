var React = require('react');
var gui = global.window.nwDispatcher.requireNwGui();
var win = gui.Window.get();

var Header = React.createClass({

  getInitialState: function() {
    return {
      platform: global.process.platform,
      buttons: {
        'win32': ['min', 'max', 'close'],
        'darwin': ['close', 'min', 'max'],
      }
    }
  },

  handleClick: function(e){
    switch(e.target.classList[1]){
      case "os-min":
        win.minimize();
        break;
      case "os-max":
        win.maximize();
        break;
      case "os-close":
        win.close();
        break;
    }
  },

  render: function() {
    var buttons = this.state.buttons[this.state.platform];
    var buttonList = [];
    for (var i = 0; i < buttons.length; i++) {
      buttonList.push(<button onClick={this.handleClick} className={"btn-os os-"+buttons[i]}></button>);
    };

    return (
      <div id="header">
        <div>
          <nav className={ "btn-set " + this.state.platform }>
            {buttonList}
          </nav>

          <h1>
            TwitchHD
          </h1>
        </div>
      </div>
    )
  }
})

module.exports = Header;