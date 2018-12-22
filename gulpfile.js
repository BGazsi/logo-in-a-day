const gulp = require('gulp')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const cleanCss = require('gulp-clean-css')

function styles () {
  return gulp.src('./public/src/scss/**/init.scss')
    .pipe(sass()).on('error', sass.logError)
    .pipe(rename({
      basename: 'style'
    }))
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/dist/css/'))
}

function watch () {
  gulp.watch('./public/src/scss/**/*.scss', styles)
  gulp.watch('./public/src/img/**/*', img)
}

function img () {
  const images = './public/src/img/**/*'

  return gulp.src([images])
    .pipe(gulp.dest('./public/dist/img/'))
}

exports.watch = watch
exports.styles = styles
exports.img = img

const build = gulp.series(gulp.parallel(styles, img))
gulp.task('default', build)

