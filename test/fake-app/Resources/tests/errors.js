
var request = require('superagent');

var config = require('config');

module.exports = errorstest;

function errorstest(callback) {

  var statuses = [ 401, 403, 404, 500 ];

  ;(function tick() {
    test(statuses.pop(), function (err) {
      if (err) callback(err);
      else if (statuses.length) tick();
      else callback(null);
    });
  })();

  function test(expected, next) {
    var expectedText = 'xx' + expected + 'xx';

    var fired = 0;

    request
    .get(config.HOST + '/statuses')
    .set({
      "X-Status": expected
    })
    .timeout(100)
    .end(function (err, res) {
      if (err || !res) next(err || new Error("The request failed"));
      else if (res.status !== expected) next(new Error(
        "The response had the wrong status: " + JSON.stringify(res.status) +
        " instead of " + JSON.stringify(expected)
      ));
      else if (res.text !== expectedText) next(new Error(
        "The response had the wrong text: " + JSON.stringify(res.text) +
        " instead of " + JSON.stringify(expectedText)
      ));
      else fired += 1;
    });

    setTimeout(function () {
      if (fired === 0) next(new Error("No callback execution at all for " + expected));
      else if (fired > 1) next(new Error("Too many callbacks! Got " + fired + "  for " + expected));
      else if (fired !== 1) next(new Error("Something wrong happened for " + expected));
      else next(null);
    }, 300);
  }
}
