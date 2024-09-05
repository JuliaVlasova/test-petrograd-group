const { src, dest } = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const minifyCSS = require('gulp-minify-css');
const sass = require('gulp-sass')(require('sass'));

function isJavaScript(file) {
    return file.extname === '.js';
}

function isScss(file) {
    return file.extname === '.scss';
}

function isCss(file) {
    return file.extname === '.css';
}

exports.default = function() {
    return src(['src/js/*.js', 'src/style/*.scss'])
    .pipe(gulpif(isJavaScript, uglify()))
    .pipe(gulpif(isScss, sass()))
    .pipe(gulpif(isCss, minifyCSS()))
    .pipe(gulpif(isJavaScript, rename({ extname: '.min.js' })))
    .pipe(gulpif(isCss, rename({ extname: '.min.css' })))
    .pipe(gulpif(isCss, dest('output/css/')))
    .pipe(gulpif(isJavaScript, dest('output/js/')));
}

