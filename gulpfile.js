var gulp = require('gulp');

var clean  = require('gulp-clean');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

var paths = {
  models:  './app/models/*.js',
  routes:  './app/routes/*.js',
  scripts: './app/assets/js/*.js'
};

gulp.task('jshint', function() {
  gulp.src(['./app.js', paths.models, paths.routes, paths.scripts])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function() {
  return gulp.src('public/assets/**', {read: false})
    .pipe(clean());
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(gulp.dest('public/assets/js'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['jshint', 'clean', 'scripts']);
