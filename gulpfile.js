var gulp = require('gulp');
var $ = rquire('gulp-load-plugins')();

gulp.task('default', function(){
	console.log("GULP");
});

gulp.task('todo', function() {
    gulp.src('js/**/*.js')
        .pipe($.todo())
        .pipe(gulp.dest('./'));
});