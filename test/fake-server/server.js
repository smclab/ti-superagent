var port = 8080;

require('http').createServer(function (req, res) {

  var count = req.headers[ 'x-count' ];

	console.log('-- request for %s', count);

	res.writeHead(200, {'Content-Type': 'text/plain'});

	var prefix = '00000';

	for (var i = 0; i < count; ++i) {
		res.write(new Buffer(2));
	}

	res.end();

}).listen(port);

console.log('Listening on port %s', port);
