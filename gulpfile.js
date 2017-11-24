// Required Packages
var gulp          = require('gulp'),
    uglify        = require('gulp-uglify'),
    rename        = require('gulp-rename'),
    watch         = require('gulp-watch'),
    eslint        = require('gulp-eslint'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    cssnano       = require('gulp-cssnano'),
    prettyError   = require('gulp-prettyerror'),
    browserSync   = require('browser-sync').create();

// Compiling SCSS files
gulp.task('sass', function() {
    gulp.src('./sass/style.scss')
        .pipe(prettyError())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(cssnano())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build/css'));
});
// Minifying javascript files
gulp.task('scripts',['lint'], function(){
    gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./build/js'))
});
// Lint task for checking 
gulp.task('lint', function(){
    return gulp.src(['./js/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
// Initializing server for browser and reloading browser after every change in *.min.js files
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(['build/js/*.js','build/css/*.css']).on('change',browserSync.reload);
});
// Watch task
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('sass/*.scss', ['sass']);
});

gulp.task('default',['watch','browser-sync']);