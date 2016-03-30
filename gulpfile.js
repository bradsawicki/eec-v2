
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;
    stream = browserSync.stream;


gulp.task('browser-sync', function() {
  browserSync({
    proxy: 'eec-v2.localhost',
    browser: 'google chrome'
  });
});


gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer('last 2 version'))
      .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({stream:true}));
});


gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});


gulp.task('bs-reload', function() {
  browserSync.reload();
});


gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('*.php', ['bs-reload']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['scripts', 'bs-reload']);
});

