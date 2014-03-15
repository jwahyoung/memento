var gulp = require('gulp'),

	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	jasmine = require('gulp-jasmine'), 
	karma = require('gulp-karma'),

	paths = {
		scripts: "scripts/*.js",
		spec: "spec/*.js",
		dist: "dist"
	};

gulp.task('prepare', function () {
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist))
});

gulp.task('test', function () {
	gulp.src('./dummy')
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}));
});

gulp.task('default', ['prepare', 'test']);