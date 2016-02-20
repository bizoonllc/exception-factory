
# exception-factory
[![License MIT][license]](https://opensource.org/licenses/MIT)
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Dependencies](https://david-dm.org/bizoonllc/exception-factory.svg)](https://david-dm.org/bizoonllc/exception-factory)

Simple powerful exception factory to create custom error objects, with error code (!), error constants and optional prefixes.

## I. Installation

`npm install exception-factory --save`

Use it like this:

```
var customException = require('exception-factory').build('customException');

customException.const('NOT_FOUND', '001');
customException.const('FATAL_ERROR', '002');

try {
   throw new customException('Oh no!', customException.FATAL_ERROR);
} catch (err) {
   console.log(err.name); // 'customException'
   console.log(err.code); // '002'
   console.log(err.message); // 'Oh no!'
}
```

or with Promise:

```
var validationException = require('exception-factory').build('validationException');
var typeException = require('exception-factory').build('typeException');

Promise.resolve(function(){
   throw new validationException('Password is too short');
})
.catch(validationException, function(err){
   // catched here!
   console.log(err);
   throw err;
})
.catch(typeException, function(err){
   // not this time!
   console.log(err);
   throw err;
})
.catch(function(err){
   // just for unexpected very vanilla errors!
   throw err;
});
```

You can also define universal prefix of exception:

```
var validationException = require('exception-factory').build('validationException', 'Validation exception: ');

try {
   throw new validationException('Password is too short');
} catch (err) {
   console.log(err); // Validation exception: Password is too short
}
```

## License

MIT



[npm-url]: https://npmjs.org/package/exception-factory
[npm-image]: https://img.shields.io/npm/v/exception-factory.svg
[license]: https://img.shields.io/npm/l/exception-factory.svg
[downloads-image]: https://img.shields.io/npm/dm/exception-factory.svg

