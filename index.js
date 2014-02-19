
;(function () {
	if (global === this) {

		global.window = global;

		global.XMLHttpRequest = function XMLHttpRequest() {
			var xhr = Ti.Network.createHTTPClient();

			xhr.onerror = function (err) {
				xhr.error = err;
				xhr.onreadystatechange();
			};

			if (typeof xhr.getResponseHeaders !== 'undefined') {
				xhr.getAllResponseHeaders = getAllResponseHeaders;
			}

			function getAllResponseHeaders() {
				var headers = xhr.getResponseHeaders();
				return Object.keys(headers).map(function (header) {
					return header + ':' + headers[header];
				}).join('\n') + '\n';
			}

			return xhr;
		};
	}
})();

var request = require('superagent');

var end = request.Request.prototype.end;

request.Request.prototype.end = function () {
  var req = end.apply(this, arguments);

  req.xhr.onreadystatechange = function () {
  	if (req.xhr.error) return req.genericError();
    if (4 != req.xhr.readyState) return;
    if (0 == req.xhr.status) {
      if (req.aborted) return req.timeoutError();
      return req.crossDomainError();
    }
    req.emit('end');
  };

  return req;
};

request.Request.prototype.genericError = function() {
	var error = this.xhr.error;

	var err = new Error(error.error || 'Unknown error');

	for (var k in error) {
		if (k === 'source') continue;
		err[k] = error[k];
	}

	this.callback(err);
};

request.Request.prototype.crossDomainError = function() {
	// Does not make sense in Titanium
};

request.Request.prototype.redirects = function (redirects) {
	if (redirects > 0 || redirects === true) {
		this.xhr.autoRedirect = true;
	}
	else if (redirects <= 0 || redirects === false) {
		this.xhr.autoRedirect = false;
	}
};

module.exports = request;
