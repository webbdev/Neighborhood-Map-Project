// include gulp
var gulp = require('gulp');

// plugins
var stripDebug = require('gulp-strip-debug');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var order = require("gulp-order");
var rename = require('gulp-rename');
var opn = require('opn');
var watch = require('gulp-watch');
var notify = require('gulp-notify');


// JS hint task
gulp.task('jshint', function() {
  gulp.src('./jc/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// JS concat, minify, rename
gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// CSS auto-prefix, minify
gulp.task('styles', function() {
	gulp.src('./css/*.css')
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./build/css/'))
    .pipe(notify({ message: 'styles task complete' }));
});

// html minify
gulp.task('min-html', function() {
    var opts = {
	   comments:true,
	};
   gulp.src('./index-prod.html')
    .pipe(minifyHTML(opts))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'))
    .pipe(notify({ message: 'min-html task complete' }));;
});

// Watch
gulp.task('watch', function() {
	// Watch .js files
	gulp.watch('./js/*.js', ['jshint']);
	gulp.watch('./js/*.js', ['scripts']);
  	// Watch .css files
  	gulp.watch('./css/*.css', ['styles']);
  	// Watch .html files
  	gulp.watch('./*.html', ['min-html']);
});


// The default task (called when you run 'gulp' from cli)
gulp.task('default', ['jshint', 'scripts', 'styles', 'min-html', 'watch']);