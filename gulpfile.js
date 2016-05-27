var gulp = require('gulp');
var path = require('path');
var del = require('del');
var $ = require('gulp-load-plugins')({
  pattern: '*',
});

var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js')[environment];
var webpackSWConfig = require('./webpack.config.js').serviceWorker;

var port = $.util.env.port || 3000;
var src = 'src/';
var dist = 'dist/';

var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];


gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpackStream(webpackConfig))
    .on('error', function(error) {
      $.util.log($.util.colors.red(error.message));
      $.connect.reload();
      this.emit('end');
    })
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

gulp.task('service-worker', function() {
  return gulp.src(webpackSWConfig.entry)
    .pipe($.webpackStream(webpackSWConfig))
    .on('error', function(error) {
      $.util.log($.util.colors.red(error.message));
      $.connect.reload();
      this.emit('end');
    })
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

gulp.task('html', function() {
  return gulp.src(src + 'index.html')
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

gulp.task('styles',function(cb) {
  return gulp.src(src + 'styles/main.scss')
    .pipe($.sass({
      outputSyle: (isProduction ? 'compressed' : 'nested')
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title : 'css' }))
    .pipe($.connect.reload());

});

gulp.task('serve', function() {
  $.connect.server({
    root: dist,
    port: port,
    middleware: function (connect, opt) {
        opt.route = '/proxy';
        var proxy = new $.connectProxy(opt);
        return [proxy];
    },
    livereload: {
      port: 35728
    }
  });
});

gulp.task('static', function(cb) {
  return gulp.src(src + 'static/**/*')
    .pipe($.size({ title : 'static' }))
    .pipe(gulp.dest(dist + 'static/'));
});

gulp.task('watch', function() {
  gulp.watch(src + 'styles/**/*.scss', ['styles']);
  gulp.watch(src + 'static/**/*', ['static']);
  gulp.watch(src + 'index.html', ['html']);
  gulp.watch([src + 'app/**/*.js', src + 'app/**/*.hbs'], ['scripts']);
  gulp.watch(src + 'sw.js', ['service-worker']);
});

gulp.task('clean', function(cb) {
  del([dist], cb);
});


// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'serve', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function(){
  gulp.start(['static','html','scripts','service-worker','styles']);
});
