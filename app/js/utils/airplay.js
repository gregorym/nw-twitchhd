var fs = require('fs');
var Airplay = function(){
  this.exec = require('child_process').exec;
  this.child;
}

Airplay.prototype.install = function(){
  if (this.isInstalled())
    return;

  this.exec(
    "gem install --no-ri --no-rdoc ./gems/airplay-cli-1.0.2.gem --install-dir ./gems", 
    function(error, stdout, stderr) {
      if(error && alert) {
        alert('Unable to install TwitchHD ' + error );
      }
    }
  );
}

Airplay.prototype.isInstalled = function(){
  return fs.existsSync('./gems/bin/air');
}

Airplay.prototype.play = function(url) {
  this.child = this.exec("./gems/bin/air play '" + url +"'", function(){
    console.log(arguments);
  });
}

Airplay.prototype.stop = function() {
  this.child.kill();
}