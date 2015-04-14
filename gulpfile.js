var gulp          = require('gulp');
var concat        = require('gulp-concat');
var sass          = require('gulp-ruby-sass');
var react         = require('gulp-react');
var browserify    = require('browserify');
var reactify      = require('reactify');
var source        = require('vinyl-source-stream');
var NwBuilder     = require('node-webkit-builder');

gulp.task('move', function() {
    gulp
    .src(['src/index.html', 'src/airplay.js', 'src/oauth.html', 'src/oauth.js', 'package.json', 'src/css/bootstrap.css', 'src/fonts', 'src/airplay-cli*'])
    .pipe(gulp.dest('build'));

    gulp
    .src(['src/fonts/*'])
    .pipe(gulp.dest('build/fonts'))
});

gulp.task('browserify', function () {
    return browserify('./src/index.js')
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build'))
});

gulp.task('watch', function() {
    gulp.watch([
      'src/**/*.js', 
      'src/**/*.sass', 
      'src/*index.html', 
    ], ['browserify', 'sass']);
});

gulp.task('sass', function() {
  return sass('./src/css/app.sass', { sourcemap: false })
  .pipe(gulp.dest('build'));
});

gulp.task('default', ['move',  'browserify', 'sass', 'watch']);




// Compile project
gulp.task('dist', function(){
  var nw = new NwBuilder({
      files: './build/**/*',
      platforms: ['osx32'],
      buildDir: './dist'
  });

  nw.on('log',  console.log);

  // Build returns a promise
  nw.build().then(function () {
     console.log('all done!');
  }).catch(function (error) {
      console.error(error);
  });

});
