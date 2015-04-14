var request = require("superagent");

function UserStore(){
  this.channels = [];
}

UserStore.getUser = function() {
  return global.localStorage.getItem('userToken');    
}

UserStore.setUser = function(data) {
  return global.localStorage.setItem('userToken', data["access_token"])
}

UserStore.removeUser = function() {
  global.localStorage.setItem('userToken', null);
}

UserStore.getFavorites = function() {
  var that = this;
  return new Promise(function(resolve, reject) {
    request.get('https://api.twitch.tv/kraken/streams/followed?oauth_token='+that.getUser()).end( function(error, result) {
      if(error){
        // Token Expired
        that.removeUser();
        reject()
      }
      else
        resolve(result.body.streams)
    })
  }).then(function(data){
    return this.channels = data;
  });
}


module.exports = UserStore;
