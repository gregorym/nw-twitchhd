var alt   = require('alt');

var AirplayActions = {
  notDetected(id, payload) {
    this.dispatch({ id, payload });
  }
}

module.exports = alt.createActions(AirplayActions);