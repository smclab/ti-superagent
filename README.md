ti-superagent
=============

Titanium.Network.HTTPClient with less suck!

This is a [titaniumified][ti] version of [superagent][sa]. This is built using [`grunt-titaniumifier`][gti].

[ti]: https://github.com/smclab/titaniumifier
[gti]: https://github.com/smclab/grunt-titaniumifier

```js
var request = require('ti-superagent');

request.get('http://my-awesome-server.it/api.txt')
.end(function (res) {
  console.log('Textual version of APIs:');
  console.log(res.text);
});

// The server will respond with: '{ "methods": [ "read", "update" ] }'

request.get('http://my-awesome-server.it/api.json')
.end(function (res) {
  console.log('JSON version of APIs:');
  res.body.methods.forEach(function (method) {
  	console.log('I’ll be able to call ' + method);
  });
});
```

Credits
-------

Kudos to [@visionmedia][tj] for building [superagent][sa] in the first place.

[tj]: https://github.com/visionmedia
[sa]: https://http://visionmedia.github.io/superagent

Humbly made by the spry ladies and gents at SMC.


License
-------

This library, *ti-superagent*, is free software ("Licensed Software"); you can
redistribute it and/or modify it under the terms of the [GNU Lesser General
Public License](http://www.gnu.org/licenses/lgpl-2.1.html) as published by the
Free Software Foundation; either version 2.1 of the License, or (at your
option) any later version.

This library is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; including but not limited to, the implied warranty of MERCHANTABILITY,
NONINFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
Public License for more details.

You should have received a copy of the [GNU Lesser General Public
License](http://www.gnu.org/licenses/lgpl-2.1.html) along with this library; if
not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth
Floor, Boston, MA 02110-1301 USA