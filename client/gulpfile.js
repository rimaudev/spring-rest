var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var clean = require('gulp-clean');

var dependencies = [
  'react',
  'react-dom',
  'react-mdl',
  'jquery'
];

// TODO: split dist directory based on dev/prod profile
//var DIST_DIR = './dist';
var DIST_DIR = '../src/main/resources/static';

gulp.task('clean', function () {
  return gulp.src(DIST_DIR, {read: false})
    .pipe(clean({force: false}));
});

gulp.task('build', function () {
  gulp.src('./node_modules/react/dist/react.min.js')
    .pipe(gulp.dest(DIST_DIR + '/react'));

  gulp.src('./node_modules/react-dom/dist/react-dom.min.js')
    .pipe(gulp.dest(DIST_DIR + '/react-dom'));

  gulp.src('./node_modules/react-mdl/extra/*')
    .pipe(gulp.dest(DIST_DIR + '/react-mdl'));

  gulp.src('./node_modules/jquery/dist/**')
    .pipe(gulp.dest(DIST_DIR + '/jquery'));

  gulp.src('./src/index.html').pipe(gulp.dest(DIST_DIR)).pipe(livereload());
  gulp.src('./src/css/*.css').pipe(gulp.dest(DIST_DIR + '/css')).pipe(livereload());

  browserify({
    entries: './src/js/app.js', debug: true,
    // don't embed dependencies, faster live reload
    //require: dependencies
  }).transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    // TODO: avoid sourcemap & uglify for dev profile
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(DIST_DIR + '/js'))
    .pipe(livereload());

});

gulp.task('watch', ['build'], function () {
  livereload.listen();
  gulp.watch('./src/js/*.js', ['build']);
});

gulp.task('default', ['build', 'watch']);