
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

function getXHR() {
  return new XMLHttpRequest();
}

request.Request.prototype.end = function (fn) {
  var self = this;
  var xhr = this.xhr = getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var redirects = this._redirects;
  var data = this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;
    if (0 == xhr.status) {
      if (self.aborted) return self.timeoutError();
      return;
    }
    self.emit('end');
  };

  xhr.onerror = function (error) {
    self.genericError(error);
  };

  // timeout
  if (timeout) {
    xhr.timeout = timeout;
  }

  if (redirects != null) {
    this.redirects(redirects);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  xhr.open(this.method, this.url, true);

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var serialize = request.serialize[this.getHeader('Content-Type')];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  // send stuff
  xhr.send(data);
  return this;
};

request.Request.prototype.genericError = function(error) {
  var err = new Error(error.error || 'Unknown error');

  for (var k in error) {
    if (k === 'source') continue;
    err[k] = error[k];
  }

  if (/timed?\s*out/i.test(err + '')) {
    err.timeout = this._timeout;
  }

  this.callback(err);
};

request.Request.prototype.timeout = function (timeout) {
  this._timeout = timeout;
  if (this.xhr) throw new Error("Cannot set the timeout once the HTTPClient has been created");
  return this;
};

request.Request.prototype.redirects = function (redirects) {
  this._redirects = redirects;
  if (redirects > 0 || redirects === true) {
    if (this.xhr) this.xhr.autoRedirect = true;
  }
  else if (redirects <= 0 || redirects === false) {
    if (this.xhr) this.xhr.autoRedirect = false;
  }
};

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

module.exports = request;
