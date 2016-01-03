var expect = require('chai').expect;
var Promise = require('bluebird');

var exceptionFactory = require('../src/exceptionFactory');

describe('exception-factory', function () {

	beforeEach(function () {
		var self = this;
	});

	afterEach(function () {
		var self = this;
	});

	it('Expect exceptionFactory to not throw error when created new exception class', function () {
		var self = this;

		var fn = function () {
			var myException = new exceptionFactory('myException');
		};

		expect(fn).to.not.throw(Error);
	});

	it('Expect created exception class to create valid error object with new myException name', function () {
		var self = this;

		var myException = new exceptionFactory('myException');

		var myExceptionError;

		try {

			throw new myException('Some error');

		} catch (err) {

			expect(err.name).to.not.be.an('undefined');
			expect(err.stack).to.not.be.an('undefined');
			expect(err.message).to.not.be.an('undefined');

			expect(err.name).to.be.equal('myException');
			expect(err.message).to.be.equal('Some error');

		}
	});

	it('Expect myException created with exception-factory to be recognized by bluebird promise as a separate error type', function (done) {
		var self = this;

		var myException = new exceptionFactory('myException');

		var catchedProperly;

		return Promise
				.try(function () {
					throw new myException('Some error');
				})
				.catch(myException, function (err) {
					catchedProperly = true;
				})
				.catch(function (err) {
					catchedProperly = false;
				})
				.then(function () {
					expect(catchedProperly).to.be.equal(true);
					done();
				})
				.catch(function (err) {
					done(err);
				});

	});

	it('Expect myException to contain prefix text defined', function () {
		var self = this;

		var myException = new exceptionFactory('myException', 'Some prefix: ');

		var myExceptionError = new myException('Some error');

		Promise
				.try(function () {
					throw new myException('Some error');
				})
				.catch(myException, function (err) {
					catchedProperly = true;
				})
				.catch(function (err) {
					catchedProperly = false;
				});

		expect(myExceptionError.message).to.be.equal('Some prefix: Some error');
	});

});