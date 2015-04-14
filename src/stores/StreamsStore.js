var request = require("superagent");

function StreamsStore(){
  this.channels = []
}

StreamsStore.getAll = function(options) {
    return new Promise(function(resolve, reject) {
      if (!options) {
        options = {}
      }
      options["limit"] = 100

      var params = "";
      for(var key in options){
        params += "&" + key + "=" + options[key];
      }

      request.get('https://api.twitch.tv/kraken/streams?'+params).end( function(error, result) {
        if(error)
          reject()
        else
          resolve(result.body.streams)
      })
    }).then(function(data){ return this.streams = data })
  }

StreamsStore.getHLS = function(channel) {
  return new Promise(function(resolve, reject) {
    request.get('http://api.twitch.tv/api/channels/' + channel.name +'/access_token?on_site=1').end(function(error, result) {
      if (error) {
        reject(error)
      } else {
        var token   = result.body.token;
        var sig     = result.body.sig;
        var m3u8Url = 'http://usher.justin.tv/api/channel/hls/' + channel.name + '.m3u8?token=' + escape(token) + "&allow_source=true&sig=" + sig;
        resolve(m3u8Url);
      }
    })
  })
}

module.exports = StreamsStore;
