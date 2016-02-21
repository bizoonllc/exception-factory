var exceptionFactory = {};
exceptionFactory.build = function (name) {
	/*
	 * PREFIX MESSAGE
	 */
	var prefixMessage = arguments[1] || '';
	/*
	 * CONSTRUCTOR OF NEW EXCEPTION
	 */
	var newException = function() {
		/*
		 * SET ARGS
		 */
		var $args = Array.prototype.slice.call(arguments);
		/*
		 * SET ERROR ARGS
		 */
		var $errorArgs = $args.slice(2);
		$errorArgs.unshift($args[0]);
		/*
		 * CREATE ERROR OBJECT
		 */
		var $error = Error.apply(this, $errorArgs);
 		this.name = $error.name = name;
		this.code = $args[1] !== undefined ? $args[1] : 0;
		this.stack = $error.stack;
		this.message = prefixMessage + $error.message;
	};
	/*
	 * NAME OF NEW EXCEPTION
	 */
	newException.name = newException.$name = name;
	/*
	 * PROTOTYPE OF NEW EXCEPTION
	 */
	newException.prototype = Object.create(Error.prototype, {
		constructor: {
			value: newException,
			writable: true,
			configurable: true
		}
	});
	/*
	 * SET CONST OF NEW EXCEPTION
	 */
	var $const = {};
	newException.const = function(key, value) {
		if (arguments.length === 0)
			return $const;
		else {
			if ($const[key] !== undefined)
				throw new Error(key + ' const is already defined for ' + name + ' exception');
			if (newException[key] !== undefined)
				throw new Error(key + ' value is reserved on ' + name + ' exception');
			Object.defineProperty(newException, key, {
				__proto__: null,
				enumerable: true,
				value: value,
			});
		}
	};
	return newException;
}

module.exports = exceptionFactory;