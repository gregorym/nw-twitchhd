var gulp          = require('gulp');
var clean         = require('gulp-clean');
var concat        = require('gulp-concat');
var sass          = require('gulp-ruby-sass');
var react         = require('gulp-react');
var browserify    = require('browserify');
var reactify      = require('reactify');
var source        = require('vinyl-source-stream');
var builder       = require('gulp-node-webkit-builder');
var zip           = require('gulp-zip');

gulp.task('move', function() {
  gulp.src(['app/index.html', 'package.json']).pipe(gulp.dest('build'));
  gulp.src(['app/css/vendors/*']).pipe(gulp.dest('build/css/vendors/'));
  gulp.src(['app/css/fonts/*']).pipe(gulp.dest('build/css/fonts/'));
  gulp.src(['app/js/utils/*']).pipe(gulp.dest('build/js/utils/'));
  gulp.src(['app/bin/*']).pipe(gulp.dest('build/bin/'));
});

gulp.task('js', function () {
    return browserify('./app/js/index.js')
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('css', function() {
  return sass('app/css/')
    .pipe(concat('app.css'))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('watch', function() {
    gulp.watch([
      'app/**/*'
    ], ['js', 'css']);
});

gulp.task('default', ['move', 'js', 'css', 'watch']);

// Compile project
gulp.task('nw-builder', function(){
  return gulp.src(['./build/**/*'])
      .pipe(builder({
        files: './build/**/*',
        platforms: ['osx32'],
        buildDir: './dist',
        version: '0.12.1'
      }));
});

gulp.task('zip', ['nw-builder'], function(){
  var package = require('./package.json');
  var zipName = [package.name, ".v", package.version, ".mac.zip"].join("");

  return gulp.src('./dist/TwitchHD/osx32/**/*')
          .pipe(zip(zipName))
          .pipe(gulp.dest('./dist/TwitchHD/osx32/'));
});

gulp.task('compile', ['nw-builder', 'zip']);
