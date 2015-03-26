var gulp = require('gulp');
var babel = require('gulp-babel');

var sources = [
  'option/*.js',
  'promise/*.js',
  'rxjs/*.js',
  'simple_examples/*.js',
  'either/*.js'
];

gulp.task('default', function () {
    return gulp.watch(sources, ['build']);
});

gulp.task('build', function () {
  gulp.src(sources)
    .pipe(babel())
    .pipe(gulp.dest(function (file) {
      console.log(file.path);
      return file.path.replace(/\/[^\/]*.js$/, '/build');
    }));
});
