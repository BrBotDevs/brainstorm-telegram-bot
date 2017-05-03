const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['clear', 'compile']);

gulp.task('clean', done => {
    del.sync('dist');
    del.sync('*.log');
    done();
});

gulp.task('eslint', () => {
    gulp.src('dist/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('compile', ['clean', 'estlin'], () => {
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});