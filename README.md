[![Build Status](https://travis-ci.org/NumminorihSF/response-formatter.svg?branch=master)](https://travis-ci.org/NumminorihSF/response-formatter)
[![Coverage Status](https://coveralls.io/repos/NumminorihSF/response-formatter/badge.svg?branch=master&service=github)](https://coveralls.io/github/NumminorihSF/response-formatter?branch=master)

# Response formatter

This is an express.js middleware to format your response from server to format, that client waits.

Basic, it can returns json, plain text, xml and html.

On recursive objects it will return `next(errorObject)`.
 
## Install

```sh
npm install --save response-formatter
```

## Usage

Simple example:

```js
  //app - instance on express application
  var resForm = require('response-formatter');
  
  app.use(resForm());
```

### Options

You can pass options into `resForm()` call.

Options is an Object with unnecessary fields:

* `.human` _Boolean_ - Need prettify result or not. Default: calc by `process.env.NODE_ENV==="production"`.
* `.dataSource` _String_ - Path on object, were output data exist. Default: `'res.locals'`. It means, 
that module will get `res.locals` and try to returning it as result after some work.
  * You can use `'req'` or `'request'` as request object link.
  * You can use `'res'` or `'response'` as response object link.
  * If no such route in object, module will return error to express.
* `.dataDestination` _String_ - Path on object, to put result data. Default `'res.sentData'`.
  * Linking to object is like on `.dataSource`
  * If no such route in object, module will create it.
* `.formats` _String[]_ - Available formats to returning response. Default `['application/json', 'text/xml', 'text/html', 'text/plain']`.
If is empty array, use default. First format is also used as fallback if client want unexpected format.
* `.userFormatters` _Object_ - Object with user functions to format response data. Default `{}`.
  * First argument is an data, that module got from data source.
  * Second arguments is an callback function. Callback wait error object on 1st, and result on 2nd argument.


## Test

Run tests
```sh
npm test
```

To check code coverage:
  * Install [istanbul](https://github.com/gotwarlost/istanbul) global
```sh
sudo npm install -g istanbul
```

  * Run npm script
```sh
npm run coverage
```
  
  * Look into `path/to/project/coverage/lcov-report/index.html`


## LICENSE - "MIT License"

Copyright (c) 2015 Konstantine Petryaev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.