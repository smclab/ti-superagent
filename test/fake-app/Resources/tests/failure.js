
var request = require('ti-superagent');

module.exports = failuretest;

function failuretest(callback) {
  request.get("http://i-do-not-exist.com").end(function (err, res) {
    if (!err) callback(new Error("i-do-not-exist.com… exists…"));
    else callback(null);
  });
}
