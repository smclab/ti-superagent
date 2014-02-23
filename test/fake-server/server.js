
var path = require('path');
var url = require('url');
var config;

try {
  config = require('../fake-app/Resources/config');
}
catch (e) {
  console.error("No configuration found!");
  console.error("Create one at\n\t%s", path.resolve(__dirname, '../fake-app/Resources/config.js'));
  process.exit();
}

var host = url.parse(config.HOST);

var port = +(host.port || 3000);

require('http').createServer(function (req, res) {

  var route = router.bind(null, req, res);

  if (route('GET', '/counter', function () {

    var count = req.headers[ 'x-count' ];

  	console.log('» counter for %s', count);

  	res.writeHead(200, {'Content-Type': 'text/plain'});

  	var prefix = '00000';

  	for (var i = 0; i < count; ++i) {
  		res.write(new Buffer(2));
  	}

  	res.end();

  })) return;

  if (route('GET', '/timeout', function () {

    var sleep = req.headers[ 'x-sleep' ] || 100;

    console.log('» timeout for %s', sleep);

    setTimeout(function () {
      res.write('Timeout finished');
      res.end();
    }, sleep);

  })) return;

}).listen(port);

console.log('Listening on port %s', port);

function router(req, res, method, path, fn) {
  if (req.method !== method) return;
  if (req.url !== path && req.url !== path + '/') return;
  fn();
  return true;
}
