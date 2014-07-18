
var request = require('superagent');

var config = require('config');

module.exports = oncetest;

function oncetest(callback) {

  var fired = 0;

  var req = request
  .get(config.HOST + '/timeout')
  .set({
    "X-Sleep": 10
  })
  .timeout(300)
  .end(function (err, res) {
    if (err || !res) callback(err || new Error("The request failed"));
    else fired += 1;
  });

  setTimeout(function () {
    if (fired === 0) callback(new Error("No callback execution at all"));
    else if (fired > 1) callback(new Error("Too many callbacks! Got " + fired));
    else if (fired !== 1) callback(new Error("Something wrong happened"));
    else callback(null);
  }, 500);
}
