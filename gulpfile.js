const gulp = require('gulp');
const webserver = require('gulp-webserver');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const merge = require('merge-stream');
const fs = require('fs');
const watch = require('gulp-watch');
const minify = require('gulp-minify');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');

gulp.task('webserver', function() {
    gulp.src('.')
    .pipe(webserver({
        livereload: true,
        host: '0.0.0.0'
    }));
});

gulp.task('build:css', function () {
    gulp.src('assets/css/*.css')
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('static/css'));
});

gulp.task('build:js', function () {
    gulp.src('assets/js/*.js')
        .pipe(minify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('static/js'));
});

gulp.task('build:templates', function () {
    let templateData = {
        en: JSON.parse(fs.readFileSync('./src/lang/en.json')),
        ru: JSON.parse(fs.readFileSync('./src/lang/ru.json')),
        uk: JSON.parse(fs.readFileSync('./src/lang/uk.json'))
    };

    let en = gulp.src('./src/templates/index.hbs')
        .pipe(handlebars(templateData.en))
        .pipe(rename('en.html'))
        .pipe(gulp.dest('static'));

    let ru = gulp.src('src/templates/index.hbs')
        .pipe(handlebars(templateData.ru))
        .pipe(rename('ru.html'))
        .pipe(gulp.dest('static'));

    let uk = gulp.src('src/templates/index.hbs')
        .pipe(handlebars(templateData.uk))
        .pipe(rename('uk.html'))
        .pipe(gulp.dest('static'));

    return merge(en, ru, uk);
});

gulp.task('build', ['build:templates', 'build:js', 'build:css']);
gulp.task('watch', function () {
    watch(['src/**/*', 'assets/js/*', 'assets/css/*'], function () {
        gulp.run('build');
    });
});

gulp.task('default', ['build']);
