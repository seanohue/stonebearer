var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var options = {
    todo: {
        absolute: true
    },
    jshint: {
        reporter: 'default'
    }
};

var paths = {
    src: './',
    js: './*.js'
}

gulp.task('default', ['todo', 'jshint'], defaultTask);
gulp.task('jshint', jsHintTask);
gulp.task('todo', toDoTask);


function defaultTask() {
    console.log("GULP");
}

function jsHintTask() {
    gulp.src(paths.js)
        .pipe($.jshint())
        .pipe($.jshint.reporter(
            options.jshint.reporter
        ));
}

function toDoTask() {
    gulp.src(paths.js)
        .pipe($.todo(options.todo))
        .pipe(gulp.dest(paths.src));
}