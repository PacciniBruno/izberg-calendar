
'use strict';

var KarmaServer = require('karma').Server;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var hbsfy = require('hbsfy');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Bundle files with browserify
gulp.task('browserify', function () {
  // set up the browserify instance on a task basis
  var bundler = browserify({
    entries: 'app/main.js',
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [babelify, hbsfy]
  });

  bundler = watchify(bundler);

  var rebundle = function() {
    return bundler.bundle()
      .on('error', $.util.log)
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .on('error', $.util.log)
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('.tmp'));
  }

  bundler.on('update', rebundle);

  return rebundle();
});

// Bundle files with browserify for production
gulp.task('browserify:dist', function () {
  // set up the browserify instance on a task basis
  var bundler = browserify({
    entries: 'app/main.js',
    // defining transforms here will avoid crashing your stream
    transform: [babelify, hbsfy]
  });

  return bundler.bundle()
    .on('error', $.util.log)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe($.uglify())
    .pipe(gulp.dest('dist/scripts'));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
  return gulp.src([
    'app/styles/main.css',
    'app/styles/normalize.css',
    'app/styles/bootstrap.css'
  ])
  .pipe($.sourcemaps.init())
  .pipe($.postcss([
    require('autoprefixer')({browsers: ['last 1 version']})
  ]))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest('.tmp/styles'))
  .pipe(reload({ stream: true }));
});

// Scan your HTML for assets & optimize them
gulp.task('html', ['styles'], function () {
  return gulp.src('app/*.html')
    .pipe($.htmlReplace())
    .pipe($.if('*.css', $.csso()))
    .pipe($.useref({
      searchPath: ['.tmp', 'app', '.']
    }))
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

// Clean output directory
gulp.task('clean', function (callback) {
  var del = require('del')
  del(['.tmp', 'dist'], function () {
    $.cache.clearAll(callback);
  });
});

// Run karma for development, will watch and reload
gulp.task('tdd', function(callback) {
  var karma = new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, callback);

  karma.start();
});

// Run tests and report for ci
gulp.task('test', function(callback) {
  var karma = new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ['PhantomJS'],
    reporters: ['dots', 'junit'],
    junitReporter: {
      outputFile: '.tmp/test-results.xml'
    }
  }, callback);

  karma.start();
});

// Run development server environmnet
gulp.task('serve', ['styles', 'browserify'], function () {
  browserSync({
    notify: false,
    port: 9000,
    ui: {
      port: 9001
    },
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/*.js',
    '.tmp/**/*.js',
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.css', ['styles']);
});

// Run web server on distribution files
gulp.task('serve:dist', function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });
});

// Build the project for distribution
gulp.task('build', ['browserify:dist', 'html'], function () {
  var size = $.size({title: 'build', gzip: true })
  return gulp.src('dist/**/*')
    .pipe(size)
    .pipe($.notify({
      onLast: true,
      title: 'Build complete',
      message: function() {
        return 'Total scripts size (gzip) ' + size.prettySize;
      }
    }));
});

// Clean all and build from scratch
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
