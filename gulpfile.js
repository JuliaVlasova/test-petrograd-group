const { src, dest } = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const minifyCSS = require('gulp-minify-css');

function isJavaScript(file) {
    return file.extname === '.js';
}

function isCss(file) {
    return file.extname === '.css';
}

exports.default = function() {
    return src(['js/*.js', 'style/*.css'])
    .pipe(gulpif(isJavaScript, uglify()))
    .pipe(gulpif(isCss, minifyCSS()))
    .pipe(gulpif(isJavaScript, rename({ extname: '.min.js' })))
    .pipe(gulpif(isCss, rename({ extname: '.min.css' })))
    .pipe(dest('output/'));
}