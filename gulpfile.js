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

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8889
  });
});

gulp.task('manifest', function(){
  gulp.src(['build/**/*'], { base: './build/' })
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['*'],
      filename: 'app.manifest',
      exclude: 'app.manifest'
     }))
    .pipe(gulp.dest('build'));
});

gulp.task('less', function () {
  gulp.src('app/less/app.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }))
    .pipe(gulp.dest('app/assets/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/**/*.less',['less']);
});

gulp.task('clean', function() {
    gulp.src('build/**')
      .pipe(clean({force: false}));
});

gulp.task('copy-files', function() {
    gulp.src('./app/assets/**/*')
        .pipe(gulp.dest('build/assets/'));
    gulp.src('./app/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('build', ['less', 'copy-files', 'manifest', 'connect'], function() {
    gulp.src('build/**/*')
        .pipe(zip('build.zip'))
        .pipe(gulp.dest('./'));
});

// Default Task
gulp.task('default', ['less', 'watch', 'connect']);