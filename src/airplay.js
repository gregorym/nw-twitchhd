var Airplay = function(){
  this.exec = require('child_process').exec;
  this.child;
}

Airplay.prototype.install = function(){
  this.exec(
    "gem install --no-ri --no-rdoc airplay-cli-1.0.2.gem --install-dir ./gems", 
    function(error, stdout, stderr) {
      if(error && alert) {
        alert('Unable to install TwitchHD');
      }
    }
  );
}

Airplay.prototype.play = function(url) {
  this.child = this.exec("./gems/bin/air play '" + url +"'", function(){
    console.log(arguments);
  });
}

Airplay.prototype.stop = function() {
  this.child.kill();
}