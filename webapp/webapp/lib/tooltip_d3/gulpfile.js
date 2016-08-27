var gulp = require('gulp'),
	connect = require('gulp-connect'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	uglify = require('gulp-uglify')
	gp_rename = require('gulp-rename');

var root = "./";

// test JS code
gulp.task('test_js', function(){
    return gulp.src(['js/tooltip.d3.js'], { cwd: root })
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('build', ['test_js'], function () {
    var all = gulp.src(['js/tooltip.d3.js'] , { cwd: root })
        .pipe(uglify({beautify: true}))
        .pipe(gp_rename('tooltip.d3.min.js'))
        .pipe(gulp.dest('js/'));

});

gulp.task('html', function () {
  gulp.src('**/*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['**/*.html', '**/*.css', '**/*.js'], ['test_js', 'html']);
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true,
    port:8080
  });
});

gulp.task('server', ['watch', 'connect']);

// default task
gulp.task('default', ['server']);