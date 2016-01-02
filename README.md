
# exception-factory
[![License MIT][license]](https://opensource.org/licenses/MIT)
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Dependencies](https://david-dm.org/bizoonllc/exception-factory.svg)](https://david-dm.org/bizoonllc/exception-factory)

Simple exception factory to create custom error objects.

## I. Installation

`npm install exception-factory --save`

Use it like this:

```
var exceptionFactory = require('exception-factory');

var myException = new exceptionFactory('myException');

throw new myException('Oh no!');
```

or with Promise:

```
var validationException = new exceptionFactory('validationException');

Promise.resolve(function(){
   throw new validationException('Password is too short');
})
.catch(validationException, function(err){
   console.log(err);
   throw err;
})
.catch(function(err){
   throw err;
});
```

## License

MIT



[npm-url]: https://npmjs.org/package/exception-factory
[npm-image]: https://img.shields.io/npm/v/exception-factory.svg
[license]: https://img.shields.io/npm/l/exception-factory.svg
[downloads-image]: https://img.shields.io/npm/dm/exception-factory.svg

