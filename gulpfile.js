var gulp = require('gulp');
var webserver = require('gulp-webserver');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var fs = require('fs');
var watch = require('gulp-watch');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');

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
    var templateData = {
        en: JSON.parse(fs.readFileSync('./src/lang/en.json')),
        ru: JSON.parse(fs.readFileSync('./src/lang/ru.json')),
        uk: JSON.parse(fs.readFileSync('./src/lang/uk.json'))
    };

    var en = gulp.src('src/templates/index.hbs')
        .pipe(handlebars(templateData.en))
        .pipe(rename('en.html'))
        .pipe(gulp.dest('static'));

    var ru = gulp.src('src/templates/index.hbs')
        .pipe(handlebars(templateData.ru))
        .pipe(rename('ru.html'))
        .pipe(gulp.dest('static'));

    var uk = gulp.src('src/templates/index.hbs')
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
