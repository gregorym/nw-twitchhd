/** @jsx React.DOM */
var request = require("superagent");

function GameStore() {
    this.games = [];
}

GameStore.getAll = function() {
  return new Promise(function(resolve, reject) {
    
    request.get('https://api.twitch.tv/kraken/games/top?limit=100').end(function(error, result) { 
      if(error)
        reject()
      else
        resolve(result.body.top) 
    })
    
  }).then(function(data) { return this.games = data})
}

module.exports = GameStore;