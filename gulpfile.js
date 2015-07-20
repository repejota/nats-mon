var gulp = require('gulp');

gulp.task('clean', function() {
    'use strict';
});

gulp.task('csslint', function() {
    'use strict';

    return gulp.src('./public/css/**/*.css')
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter())
    .pipe(csslint.failReporter());
});

gulp.task('default', [
    'clean'
], function() {});
