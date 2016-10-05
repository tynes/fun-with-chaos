const gulp = require('gulp');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');

gulp.task('default', () => {
  return gulp.src('src/index.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {  
  return gulp.src('dist', { read: false })
    .pipe(clean());
});


gulp.task('develop:js', cb => {
  pump([
      gulp.src('src/**/*.js'),
      sourcemaps.init(),
      concat('bundle.js'),
      sourcemaps.write(),
      gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('develop:css', cb => {
  pump([
      gulp.src('src/styles/*.scss'),
      sourcemaps.init(),
      sass(),
      concat('styles.css'),
      sourcemaps.write(),
      gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('watch', ['develop:js', 'develop:css'], () => {
  gulp.watch('src/**/*.js', ['develop:js', 'develop:css']);
});

gulp.task('deploy', cb => {
  pump([
        gulp.src('src/*.js'),
        concat('bundle.js'),
        babel({
          presets: [ 'es2015' ]
        }),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});