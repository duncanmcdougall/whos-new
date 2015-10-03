var gulp = require('gulp');

var less = require('gulp-less');
var path = require('path');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8888
  });
});

gulp.task('less', function () {
  return gulp
    .src('app/less/app.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }))
    .pipe(gulp.dest('app/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/less/**/*.less',['less']);
});

gulp.task('dobuild', function() {
    var path = argv.path;
    console.log(path);
    gulp.src(path+'/www/*')
      .pipe(clean({force: true}));
    
    gulp.src('./app/**')
        .pipe(gulp.dest(path+'/www'));
});

// Default Task
gulp.task('default', ['less', 'watch', 'connect']);

gulp.task('build', ['less', 'dobuild']);