var gulp = require('gulp');
var csslint = require('gulp-csslint');
var coveralls = require('gulp-coveralls');
var del = require('del');

gulp.task('dist-clean', ['clean'], function() {
    'use strict';

    del([
        'node_modules',
        '.idea'
    ], function(err, delfiles) {
        if (err) {
            return err;
        }
        return delfiles;
    });
});

gulp.task('clean', function() {
    'use strict';
});

gulp.task('csslint', function() {
    'use strict';

    return gulp.src('./public/stylesheets/**/*.css')
        .pipe(csslint('.csslintrc'))
        .pipe(csslint.reporter())
        .pipe(csslint.failReporter());
});

gulp.task('coveralls', function() {
    "use strict";
    gulp.src('./coverage/**/lcov.info')
        .pipe(coveralls());
});

gulp.task('default', [
    'clean'
], function() {});
