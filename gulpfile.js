var gulp    = require('gulp'),
    stylus  = require('gulp-stylus'),
    nib     = require('nib'),
    jade    = require('gulp-jade')

var paths = {
  styles: './skin/*.styl',
  jade: './index.jade'
}

gulp.task( 'static', function () {
  return gulp.src( paths.static )
    .pipe( gulp.dest( './dist/js/' ) )
} )

gulp.task( 'styles', function () {
  return gulp.src( paths.styles )
    .pipe( stylus( { use: [ nib() ] } ) )
    .pipe( gulp.dest( './skin/' ) )
} )

gulp.task( 'jade', function () {
  gulp.src( paths.jade )
    .pipe( jade( { pretty: true } ) )
    .pipe( gulp.dest( './' ) )
} )

gulp.task( 'watch', function() {
  gulp.watch( paths.styles, ['styles'] )
  gulp.watch( paths.jade, ['jade'] )
} )

gulp.task( 'default', ['styles', 'jade', 'watch'] )