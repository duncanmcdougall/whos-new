var gulp = require('gulp');

var less = require('gulp-less');
var path = require('path');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var manifest = require('gulp-manifest');
var zip = require('gulp-zip');
var livereload = require('gulp-livereload');

gulp.task('connect', function () {
  connect.server({
    port: 8888
  });
});


gulp.task('less', function () {
  gulp.src('less/app.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }))
    .pipe(gulp.dest('assets/css'))
    .pipe(livereload());;
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('**/*.less',['less']);
});

// Default Task
gulp.task('default', ['less', 'watch', 'connect']);