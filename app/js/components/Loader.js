var React       = require('react');
var Router      = require('react-router');
var GemService  = require('../services/GemService.js');
var gui         = global.window.nwDispatcher.requireNwGui();
var win         = gui.Window.get();

var dependency = 'airplay-cli';

var Loader = React.createClass({

   getInitialState: function() {
    return {
      loading: true,
      classNames: ['loader']
    };
  },

  handleError: function(error) {
    var _this = this;
    
    var errorMessage = 'There was a problem installing dependencies.';
    errorMessage += "<div class='more'>";
    errorMessage += 'If you keep seeing this message, try to install the dependencies manually.';
    errorMessage += '<br />';
    errorMessage += 'Open the Terminal App and run this command:';
    errorMessage += '<br />';
    errorMessage += '<code>gem install airplay-cli --user-install --no-ri --no-rdoc</code>';
    errorMessage += '</div>';

    sweetAlert({
      title: "Oops ...",
      text: errorMessage,
      type: "error",
      showCancelButton: true,
      confirmButtonText: "Quit",
      confirmButtonText: "Retry",
      confirmButtonColor: "#ec6c62",
      closeOnConfirm: true,
      html: true
    }, function(isConfimed) {
      if (isConfimed) {
        _this.checkDependencies();
      }
      else {
        global.Airplay.stop();
        win.close();
      }

    });
  },

  checkDependencies: function() {
    var _this = this;
    GemService.isInstalled(dependency).then(function(isInstalled) {
      if (isInstalled){
        _this.removeLoader();
      } else {
        sweetAlert("Almost Done!", "We are installing dependencies, it may take a few minutes.", "success");
        GemService.install(dependency).then(function(){
          _this.removeLoader();
        })
        .catch(_this.handleError);
      }
    }).catch(_this.handleError);
  },

  componentDidMount: function() {
    this.checkDependencies();
  },

  removeLoader: function() {
    var _this = this;
    var classNames = this.state.classNames;
    classNames.push('hideme');
    this.setState({
      loading: false,
      classNames: classNames
    });

    setTimeout(function() {
      classNames.push('hidden');
      _this.setState({classNames: classNames});
    }, 1000);

  },

  render: function() {
    return (
      <div className={this.state.classNames.join(' ')}>
        <div className="loader-inner ball-scale-ripple-multiple">
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
});

module.exports = Loader;
