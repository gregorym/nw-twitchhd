var exec  = window.nodeRequire('child_process').exec;
var spawn = window.nodeRequire('child_process').spawn;

function isInstalled(gemName){
  var promise = new Promise(function(resolve, reject) {
    var _resolve = resolve;
    var _reject = reject;
    exec("gem list " + gemName, function(error, stdout, stderr){
      if (error || stderr) {
        _reject(error);
      } else {
        var installed = ((stdout == "\n") ? false : true);
        _resolve(installed);
      }
    });
  });

  return promise;
}

function install(gemName) {
  var cmd = `gem install ${gemName} --user-install --no-ri --no-rdoc`;
  var PromiseCallback = function(resolve, reject) {
    exec(cmd, function(error, stdout, stderr) {
      if (error)
        _reject(error);

      if (stdout)
        resolve();
    });
  };

  return new Promise(PromiseCallback);
}

module.exports = {
  isInstalled: isInstalled,
  install: install
};
