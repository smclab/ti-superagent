
var request = require('ti-superagent');

module.exports = failuretest;

function failuretest(callback) {
  request.get("http://i-do-not-exist.com").end(function (err, res) {

    Ti.API.error(JSON.stringify(err, null, 2));

    if (!err) callback(new Error("i-do-not-exist.com… exists…"));
    else callback(null);
  });
}
