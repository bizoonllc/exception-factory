var expect = require('chai').expect;
var Promise = require('bluebird');

var exceptionFactory = require('../src/exceptionFactory');

describe('exception-factory', function () {

	beforeEach(function () {
	});

	afterEach(function () {
	});

	it('expect custom exception to be thrown as valid error object with custom name set and extra code property attached', function () {

		var myException = require('../src/exceptionFactory').build('myException');

		try {

			throw new myException('Some error');

		} catch (err) {

			expect(err.name).to.not.be.an('undefined');
			expect(err.code).to.not.be.an('undefined');
			expect(err.stack).to.not.be.an('undefined');
			expect(err.message).to.not.be.an('undefined');

			expect(err.name).to.be.equal('myException');
			expect(err.code).to.be.equal(0);
			expect(err.message).to.be.equal('Some error');

		}
	});

	it('expect exception to be recognized by bluebird promise as a separate error type', function (done) {

		var myException = exceptionFactory.build('myException');

		var isCatchedProperly;

		return Promise
				.try(function () {
					throw new myException('Some error');
				})
				.catch(myException, function (err) {
					isCatchedProperly = true;
				})
				.catch(function (err) {
					isCatchedProperly = false;
				})
				.then(function () {
					expect(isCatchedProperly).to.be.equal(true);
					done();
				})
				.catch(function (err) {
					done(err);
				});

	});

	it('expect exception to contain prefix text defined', function () {

		var myException = exceptionFactory.build('myException', 'Some prefix: ');

		var newMyException = new myException('Some error');

		expect(newMyException.message).to.be.equal('Some prefix: Some error');

	});

	it('expect to set valid error constants on exception', function () {

		var myException = exceptionFactory.build('myException');

		myException.const('NOT_FOUND', '001');
		myException.const('FATAL_ERROR', '002');

		expect(myException.NOT_FOUND).to.be.equal('001');
		expect(myException.FATAL_ERROR).to.be.equal('002');

	});

	it('expect thrown exception to contain error code provided', function () {

		var myException = exceptionFactory.build('myException');

		myException.const('NOT_FOUND', '001');
		myException.const('FATAL_ERROR', '002');

		try {
			throw new myException('Test1', myException.NOT_FOUND);
		} catch (err) {
			expect(err.code).to.be.equal(myException.NOT_FOUND)
		}

		try {
			throw new myException('Test2', myException.FATAL_ERROR);
		} catch (err) {
			expect(err.code).to.be.equal(myException.FATAL_ERROR)
		}

	});

	it('expect to throw error when trying to set the same const on exception more than once', function () {

		var myException = exceptionFactory.build('myException');

		myException.const('NOT_FOUND', '001');

		expect(function () {
			myException.const('NOT_FOUND', '001');
		}).to.throw(Error);

	});

});