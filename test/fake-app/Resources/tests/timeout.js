
var request = require('superagent');

module.exports = timeouttest;

function timeouttest(config, callback) {

  var fired = false;

  var req = request
  .get(config.HOST + '/timeout')
  .set({
    "X-Sleep": 5e3
  })
  .timeout(500)
  .end(function (err, res) {
    fired = true;
    if (err && err.timeout) callback(null);
    else callback(err || new Error("No timeout happened!"));
  });

  setTimeout(function () {
    if (fired) return;

    req.abort();

    callback(new Error("No timeout at all!"));
  }, 3e3);
}
