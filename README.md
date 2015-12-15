
# exceptionFactory
[![License MIT][license]](https://opensource.org/licenses/MIT)
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Dependencies](https://david-dm.org/bizoonllc/exceptionFactory.svg)](https://david-dm.org/bizoonllc/exceptionFactory)

Simple exception factory to create custom error objects.

## I. Installation

`npm install exceptionFactory --save`

Use it like this:

```
var hooks = require('exceptionFactory');

var myException = new exceptionFactory('myException);

throw new myException('Oh no!');
```

## License

MIT



[npm-url]: https://npmjs.org/package/exceptionFactory
[npm-image]: https://img.shields.io/npm/v/exceptionFactory.svg
[license]: https://img.shields.io/npm/l/exceptionFactory.svg
[downloads-image]: https://img.shields.io/npm/dm/exceptionFactory.svg

