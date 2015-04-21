var React       = require('react');
var Router      = require('react-router');
var GemService  = require('../services/GemService.js');

var dependency = 'airplay-cli';

var Loader = React.createClass({

   getInitialState: function() {
    return {
      loading: true,
      classNames: ['loader']
    };
  },

  componentDidMount: function() {
    var _this = this;
    GemService.isInstalled(dependency).then(function(isInstalled) {
      if (isInstalled){
        _this.removeLoader();
      } else {
        GemService.install(dependency).then(function(){
          _this.removeLoader();
        });
      }
    }).catch(function(ex){
        _this.setState({ error: true, loading: false });
    });
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
