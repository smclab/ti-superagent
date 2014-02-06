
;(function () {
	if (global === this) {

		global.window = global;

		global.XMLHttpRequest = function XMLHttpRequest() {
			var xhr = Ti.Network.createHTTPClient();

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

request.Request.prototype.redirects= function (redirects) {
	if (redirects > 0 || redirects === true) {
		this.xhr.autoRedirect = true;
	}
	else if (redirects <= 0 || redirects === false) {
		this.xhr.autoRedirect = false;
	}
};

console.log(Object.keys(request));

module.exports = request;
