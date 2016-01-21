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
var del = require('del');

gulp.task('connect', function () {
    connect.server({
        port: 8888,
        root: 'build',
    });
});

gulp.task('clean', function () {
	return del([
        'build',
    ]);
});

gulp.task("copy:bower", function() {
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
            .pipe(gulp.dest('build/js/libs/'));
    }
    
    gulp.src("bower_components/font-awesome/css/font-awesome.min.css").pipe(gulp.dest('build/css/'));
    gulp.src("bower_components/font-awesome/fonts/*").pipe(gulp.dest('build/fonts/'));
});

gulp.task("copy:assets", function () {
    gulp.src(['src/fonts/**/*']).pipe(gulp.dest('build/fonts/'));
    gulp.src(['src/icons/**/*']).pipe(gulp.dest('build/icons/'));
    gulp.src(['src/sounds/**/*']).pipe(gulp.dest('build/sounds/'));
    gulp.src(['src/templates/**/*']).pipe(gulp.dest('build/templates/'));
    gulp.src(['src/js/**/*']).pipe(gulp.dest('build/js/'));
    gulp.src(['src/index.html']).pipe(gulp.dest('build/'));
});

gulp.task('less', function () {
    gulp.src('src/less/app.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build/css'))
        .pipe(livereload());;
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('src/**/*', ['less', 'copy:assets']);
});

// Default Task
gulp.task('default', ['copy:bower', 'copy:assets', 'less', 'watch', 'connect']);