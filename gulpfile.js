var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    importCss = require('gulp-cssimport'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    tap = require('gulp-tap'),
    zip = require('gulp-zip');

gulp.task('connect', function () {
    connect.server({
        port: 8888,
        root: 'src',
        livereload: true
    });
});

gulp.task('clean', function () {
    return del([
        'build.zip',
    ]);
});

gulp.task('sass', function () {
    gulp.src('src/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(importCss())
        .pipe(cleanCSS({
            keepSpecialComments: 0
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'last 3 iOS versions']
        }))
        .pipe(gulp.dest("src/css/"))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('src/sass/**/*', ['sass']);
});

gulp.task('deploy', ['sass'], function () {
    gulp.src([
                'src/**/*'
             ], {
            base: "src",
            nodir: true
        })
        .pipe(zip('build.zip', {
            compress: false
        }))
        .pipe(gulp.dest('.'));
});

// Default Task
gulp.task('default', ['sass', 'watch', 'connect']);