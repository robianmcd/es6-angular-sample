var gulp = require('gulp');
var gutil = require('gulp-util');
var traceur = require('gulp-traceur');

var jsFiles = 'public/**/*.js';
var htmlFiles = 'public/**/*.html';

gulp.task('buildJs', function() {
  gulp.src(jsFiles)
    .pipe(traceur({experimental: true}))
    .on('error', gutil.log)
    .pipe(gulp.dest('build'));
});

gulp.task('buildHtml', function() {
  gulp.src(htmlFiles)
    .pipe(gulp.dest('build'));
});

gulp.task('buildAll', ['buildJs', 'buildHtml']);

gulp.task('default', ['buildAll'], function() {
  gulp.watch(jsFiles, ['buildJs']);
  gulp.watch(htmlFiles, ['buildHtml']);
});
