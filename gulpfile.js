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

gulp.task("copy", function () {
    var bower = {
        randomColor: "randomcolor/randomColor.js",
        angular: "angular/angular.min.js",
        angularTouch: "angular-touch/angular-touch.min.js",
        angularUiRouter: "angular-ui-router/release/angular-ui-router.min.js",
        angularLocalStorage: "angular-local-storage/dist/angular-local-storage.min.js",
        underscore: "underscore/underscore-min.js",
        angularAudio: "angular-audio/app/angular.audio.js"
    };
 
    for (var resource in bower) {
        gulp.src("bower_components/" + bower[resource])
          .pipe(gulp.dest('assets/js/libs/'));
    }
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
gulp.task('default', ['copy', 'less', 'watch', 'connect']);