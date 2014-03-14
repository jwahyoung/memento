var gulp = require('gulp')
  , uglify = require('gulp-uglify')
  , jshint = require('gulp-jshint');

var paths = {
	src: "src/*.js"
	, dist: "dist"
};

gulp.task('jshint', function () {
	return gulp.src(paths.src)
		.pipe(jshint());
});

gulp.task('uglify', function () {
	return gulp.src(paths.src)
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['jshint', 'uglify']);