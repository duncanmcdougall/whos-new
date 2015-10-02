var gulp = require('gulp');

var less = require('gulp-less');
var path = require('path');
var watch = require('gulp-watch');

gulp.task('less', function () {
  return gulp
    .src('less/**/app.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('less/**/*.less',['less']);
});

// Default Task
gulp.task('default', ['less', 'watch']);