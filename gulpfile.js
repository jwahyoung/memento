var gulp = require('gulp'),

	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	karma = require('gulp-karma'),

	paths = {
		scripts: "src/*.js",
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