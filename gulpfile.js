var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var options = {
    todo: {
        absolute: true
    }
};

gulp.task('default', function() {
    console.log("GULP");
});

gulp.task('todo', function() {
    gulp.src('js/**/*.js')
        .pipe($.todo(options.todo))
        .pipe(gulp.dest('./'));
});