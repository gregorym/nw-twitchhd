var React           = require('react');
var ReactToastr     = require("react-toastr");
var UpdaterService  = require('../services/UpdaterService.js');

var Updater = React.createClass({
  componentDidMount: function(){
    var _this = this;
    UpdaterService.checkNewVersion().then(function(bool){
      if(bool){
        // var notification = new Notification("A new version is available", {
        //   body: "Click to install the latest version"
        // });
        // notification.onclick = _this.handleNotificationClick;
      }
    });
  },

  handleNotificationClick: function(){
    new Notification("Downloading new version", {
      body: "TwitchHD will restart once the application is updated"
    });
    this.getLatestVersion();
  },

  getLatestVersion: function() {
    UpdaterService.checkNewVersion()
    .then(UpdaterService.downloadLatestVersion).
    then(function(filename){
      console.log("unpacking", filename);
      return UpdaterService.unpackDownload(filename);
    }).
    then(function(path){
      console.log("installLatestVersion", path);
      return UpdaterService.installLatestVersion(path);
    });
  },

  render: function() {
    return (<div></div>);
  }
})


module.exports = Updater;
