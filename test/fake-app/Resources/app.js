
var request = require('ti-request');

request
.get('http://10.1.23.23:8080')
.set({
	"X-Prova": "Prooooova"
})
.timeout(100)
.end(function (res) {
	console.log(JSON.stringify(res.headers, null, 2));
});
