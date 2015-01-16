ti-superagent
=============

[![Dependencies](https://david-dm.org/smclab/ti-superagent/status.svg?style=flat-square)](https://david-dm.org/smclab/ti-superagent#info=dependencies)
[![Dev Dependencies](https://david-dm.org/smclab/ti-superagent/dev-status.svg?style=flat-square)](https://david-dm.org/smclab/ti-superagent#info=devDependencies)
[![Build Status](https://img.shields.io/travis/smclab/ti-superagent.svg?style=flat-square)](https://travis-ci.org/smclab/ti-superagent)
[![Available on NPM](https://img.shields.io/npm/v/ti-superagent.svg?style=flat-square)](https://www.npmjs.org/package/ti-superagent)
[![Available on gitTio](https://img.shields.io/badge/available_on-gitTio-00B4CC.svg?style=flat-square)](http://gitt.io/component/superagent)

Titanium.Network.HTTPClient with less suck!

This is a [titaniumified][ti] version of [superagent][sa], built using [`grunt-titaniumifier`][gti].

[ti]: https://github.com/smclab/titaniumifier
[gti]: https://github.com/smclab/grunt-titaniumifier


### Installation

With **gitTio** for  **Titanium SDK** you can easily install it with

    $ gittio install superagent

To download the module for [manual install][mi] (e.g. through *Appcelerator Studio*) then head over the [releases page][rp] to download the latest packaged module.

If you are instead
- porting with [*titaniumifier*][ti] a Node.js module to Titanium, and it uses *superagent*;
- or building CommonJS module using *titaniumifier* and you want to have a reliable, stable, tested HTTPClient;

then you can install this module with

    $ npm install --save superagent ti-superagent

In your `package.json` add

```js
{
  "name": "...",
  "version": "...",
  // ...
  "titanium": {
    "superagent": "ti-superagent"
  }
}
```

This will tell *titaniumifier* that when your code requires `superagent`, `ti-superagent` is served instead.

You can use [this *package.json* from one of our modules][lrc-pkg] as a reference.

[mi]: http://docs.appcelerator.com/titanium/latest/#!/guide/Using_a_Module
[rp]: https://github.com/smclab/ti-superagent/releases
[lrc-pkg]: https://github.com/smclab/liferay-connector/tree/master/package.json


Usage overview
--------------

For the full documentation head over the [original repository][sa].

```js
var request = require('superagent');

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
[sa]: https://visionmedia.github.io/superagent

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
