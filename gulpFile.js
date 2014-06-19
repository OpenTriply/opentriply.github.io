var paths = {
	style: [
	    'node_modules/twitter-bootstrap-3.0.0/dist/css/bootstrap.css',
		'src/**/*.css',
	]
};
var dest = "dist";
var outputName = "bundle";

var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

gulp.task('concatCss', function() {
  return gulp.src(paths.style)
  	.pipe(concat(outputName + '.css'))
    .pipe(gulp.dest(dest))
    ;
});
gulp.task('minifyCss', ['concatCss'], function() {
	gulp.src(dest + "/" + outputName + ".css")
	.pipe(concat(outputName + '.min.css'))
    .pipe(minifyCSS())
	.pipe(gulp.dest(dest));
});

gulp.task('browserify', function() {
	return browserify("./src/main.js")
	.bundle({debug: true})
    .pipe(source(outputName + '.js'))
    .pipe(gulp.dest(dest));
		
		
});
gulp.task('minifyJs', ['browserify'], function() {
	gulp.src(dest + "/" + outputName + ".js")
	.pipe(concat(outputName + '.min.js'))
    .pipe(uglify())
	.pipe(gulp.dest(dest));
});


gulp.task('default', ['minifyCss', 'minifyJs']);

