function exceptionFactory (name) {
	var prefixMessage = arguments[1] || '';
	var newException = function() {
		var temp = Error.apply(this, arguments);
		temp.name = this.name = name;
		this.stack = temp.stack;
		this.message = prefixMessage + temp.message;
	};
	newException.name = name;
	newException.prototype = Object.create(Error.prototype, {
		constructor: {
			value: newException,
			writable: true,
			configurable: true
		}
	});
	return newException;
}

module.exports = new exceptionFactory('hooksException', 'hooks exception: ');