var gulp = require('gulp');
var webserver = require('gulp-webserver');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var fs = require('fs');
var watch = require('gulp-watch');

gulp.task('webserver', function() {
    gulp.src('.')
    .pipe(webserver({
        livereload: true,
        host: '0.0.0.0'
    }));
});

gulp.task('build-templates', function () {
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

gulp.task('build', ['build-templates']);
gulp.task('watch', function () {
    watch('src/**/*', function () {
        gulp.run('build');
    });
});

gulp.task('default', ['build']);
