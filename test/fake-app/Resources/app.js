
var request = require('ti-superagent');

var config = require('config');

var MAX_ERRORS = 3;
var CHUNK = 500;
var MUL = 2;
var errors = 0;

var DONE = {};

function next(i) {
  var req = request
  .get(config.HOST)
  .set({
  	"X-Count": i
  })
//  .timeout(3000)
  .end(function (err, res) {

    //trace("Call for " + i);

    if (DONE[i]) {
      throw new Error("Duplicate callback!");
    }
    else if (err) {
      DONE[i] = true;
      errors += 1;
      Ti.API.error("uaoo");
      throw err;
    }
    else {
      DONE[i] = true;
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

function trace(msg) {
  Ti.API.error((new Error(msg)).stack);
}
