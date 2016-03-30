var gulp       = require('gulp'),
  browserify = require('browserify'),
  uglify = require('gulp-uglify'),
  notify = require('gulp-notify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer');

function browserifyTask(){
  var start = new Date();
  browserify({
    entries: ['components/EmailList.jsx'],
    debug: true
  }).transform('babelify', {presets: ["es2015", "react"]})
      .bundle()
      .pipe(source('EmailList.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./public/javascripts/'))
      .pipe(notify('Built in ' + Number(Date.now() - start) + ' ms'));

}
gulp.task('scripts', function () {
  browserifyTask();
});

gulp.task('default', ['scripts']);

gulp.task('watch', function(){
  gulp.watch(['components/EmailList.jsx'],browserifyTask);
});
