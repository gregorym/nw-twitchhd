var fs     = require('fs');
var path   = require('path');
var psTree = require('ps-tree');

var kill = function (pid, signal, callback) {
    signal   = signal || 'SIGKILL';
    callback = callback || function () {};
    var killTree = true;
    if(killTree) {
        psTree(pid, function (err, children) {
            [pid].concat(
                children.map(function (p) {
                    return p.PID;
                })
            ).forEach(function (tpid) {
                try { process.kill(tpid, signal) }
                catch (ex) { }
            });
            callback();
        });
    } else {
        try { process.kill(pid, signal) }
        catch (ex) { }
        callback();
    }
};

var Airplay = function(){
  this.exec = require('child_process').exec;
  this.child;
}

Airplay.prototype.play = function(url) {
  var cmd = "export GEM_HOME=./ruby/ruby_gems; export GEM_PATH=./ruby/ruby_gems; ./ruby/ruby_gems/bin/air play ";
  
  this.child = this.exec(cmd + "'" + url + "'", function(error, stdout, stderr){
    
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

  return;
}

Airplay.prototype.stop = function() {
  if (this.child) {
    kill(this.child.pid);
  }
}