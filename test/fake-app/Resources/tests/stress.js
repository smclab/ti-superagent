
var request = require('superagent');

var MAX_ERRORS = 3;
var CHUNK = 500;
var MUL = 2;

module.exports = stresstest;

function stresstest(config, callback) {

  Ti.API.warn("Set up for Stress Test");

  var count = 0;
  var done = {};
  var errors = 0;

  function next(i) {

    Ti.API.warn("Stress Test for " + i);

    count += 1;

    if (count > 8) {
      Ti.API.warn("Reached final goal");
      return callback(null);
    }

    var req = request
    .get(config.HOST + '/counter')
    .set({
    	"X-Count": i
    })
    .end(function (err, res) {

      //trace("Call for " + i);

      if (done[i]) {
        callback(new Error("Duplicate callback!"));
      }
      else if (err) {
        done[i] = true;
        errors += 1;
        callback(err);
      }
      else if (res.type !== 'text/plain') {
        callback(new Error("Wrong content type"));
      }
      else {
        done[i] = true;
        Ti.API.info("Concludes correctly for " + i + " and res is " + res.text.length);
      	next(i * MUL);
      }
    });

    req.xhr.timeout = 3e3;

    /*timeoutId = setTimeout(function () {
      errors += 1;
      aborted = true;

      if (errors <= MAX_ERRORS) {
        Ti.API.info("I’ll try again for " + i);
        next(i);
      }
      else {
        Ti.API.error("Gross! Failed for " + i);
      }
    }, 1200);*/

  }

  next(CHUNK);

}

function trace(msg) {
  Ti.API.error((new Error(msg)).stack);
}
