// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
//var sass = require('gulp-sass');
var recess = require('gulp-recess');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var exclude = require('gulp-ignore');
var minify_css = require('gulp-minify-css');

// Globals
var static_dir = 'whimsy/static/';
var destination_dir = 'build';
var css_file = 'all.css';
var css_file_min = 'all.min.css';
var js_file = 'all.js';
var js_file_min = 'all.min.js';
var print_file = 'standard.print.css';
var print_file_min = 'standard.print.min.css';

// Lint Task
gulp.task('lint-js', function() {
    return gulp.src([
            static_dir + 'js/*.js',
            '!' + static_dir + 'js/underscore-min.js',
            '!' + static_dir + 'js/jquery.jqtimeline.js',
            '!' + static_dir + 'js/jqcloud-1.0.4.min.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Lint Our CSS
gulp.task('lint-css', function () {
    return gulp.src([
            static_dir + 'css/*.css',
            '!' + static_dir + 'css/jqcloud.css'
        ])
        .pipe(recess({
            noIDs: false,
            noUniversalSelectors: false,
            noOverqualifying: false
        }))
        .pipe(gulp.dest(static_dir + 'css'));
});

// Soon to come :)
//// Compile Our Sass
//gulp.task('sass', function() {
//    return gulp.src('scss/*.scss')
//        .pipe(sass())
//        .pipe(gulp.dest('css'));
//});

// Concatenate & Minify CSS 
gulp.task('styles', function() {
    return gulp.src([
            static_dir + 'css/*.css',
            '!' + static_dir + 'css/' + print_file
        ])
        .pipe(concat(css_file))
        .pipe(gulp.dest(static_dir + 'css/' + destination_dir))
        .pipe(rename(css_file_min))
        .pipe(minify_css({keepBreaks:true}))
        .pipe(gulp.dest(static_dir + 'css/' + destination_dir));
});

// Minify Print CSS 
gulp.task('print-styles', function() {
    return gulp.src(static_dir + 'css/' + print_file)
        .pipe(rename(print_file_min))
        .pipe(minify_css({keepBreaks:true}))
        .pipe(gulp.dest(static_dir + 'css/' + destination_dir));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(static_dir + 'js/*.js')
        .pipe(concat(js_file))
        .pipe(gulp.dest(static_dir + 'js/' + destination_dir))
        .pipe(rename(js_file_min))
        .pipe(uglify())
        .pipe(gulp.dest(static_dir + 'js/' + destination_dir));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(static_dir + 'js/*.js', ['lint-js', 'scripts']);
    gulp.watch(static_dir + 'css/*.css', ['lint-css']);
    //gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint-js', 'lint-css', 'styles', 'print-styles', 'scripts']);
