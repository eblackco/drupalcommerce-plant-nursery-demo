const { series, parallel, watch } = require('gulp');
const gulp = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));

function clean_frontend_css() {
    return gulp.src('./../docroot/modules/custom/custom_css_and_js/css/*.css', {read: false, allowEmpty: true})
        .pipe(clean({force: true}));
}

function clean_admin_css() {
    return gulp.src('./../docroot/sites/default/files/gin-custom.css', {read: false, allowEmpty: true})
        .pipe(clean({force: true}));
}

function build_frontend_css() {
    return gulp.src('styles/frontend/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./../docroot/modules/custom/custom_css_and_js/css'));
}

function build_admin_css() {
    return gulp.src('styles/admin/gin-custom.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./../docroot/sites/default/files'));
}

exports.watch = function() {
    watch('styles/frontend/**/*.scss', series(clean_frontend_css, build_frontend_css));
    watch('styles/admin/**/*.scss', series(clean_admin_css, build_admin_css));
    
}

exports.default = series(
    parallel(
        clean_frontend_css,
        clean_admin_css
    ), 
    parallel(
        build_frontend_css,
        build_admin_css
    )
);