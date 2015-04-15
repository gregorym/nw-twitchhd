var gulp          = require('gulp');
var clean         = require('gulp-clean');
var concat        = require('gulp-concat');
var sass          = require('gulp-ruby-sass');
var react         = require('gulp-react');
var browserify    = require('browserify');
var reactify      = require('reactify');
var source        = require('vinyl-source-stream');
var NwBuilder     = require('node-webkit-builder');

gulp.task('move', function() {
  gulp.src(['app/index.html', 'package.json']).pipe(gulp.dest('build'));
  gulp.src(['app/css/vendors/*']).pipe(gulp.dest('build/css/vendors/'));
  gulp.src(['app/css/fonts/*']).pipe(gulp.dest('build/css/fonts/'));
  gulp.src(['app/js/utils/*']).pipe(gulp.dest('build/js/utils/'));
  gulp.src(['app/gems/*']).pipe(gulp.dest('build/gems/'));
});

gulp.task('js', function () {
    return browserify('./app/js/index.js')
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build/js'))
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
gulp.task('dist', function(){
  // Remove build/gems
  gulp.src('build/gems', {read: false}).pipe(clean());

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
