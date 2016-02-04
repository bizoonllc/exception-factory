var gulp = require('gulp');
var Server = require('karma').Server;

gulp.task('test', function (done) {
	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, function (exitCode) {
		console.log('Karma has exited with ' + exitCode)
		process.exit(exitCode)
	}).start();
});

gulp.task('tdd', function (done) {
	new Server({
		configFile: __dirname + '/karma.conf.js'
	}, function (exitCode) {
		console.log('Karma has exited with ' + exitCode)
		process.exit(exitCode)
	}).start();
});