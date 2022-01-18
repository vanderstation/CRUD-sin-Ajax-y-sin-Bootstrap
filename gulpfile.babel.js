/*
Si quiero empesar un proyecto nuevo con otro nombre
debo de utilizar npm init para que me carge los parametros
*/
//Gulp
import gulp from 'gulp';
//Babel
import babel from 'gulp-babel';
//PUG
import pug from 'gulp-pug';
//Sass
import dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass);

//Browser sync
import { init as server, stream, reload } from 'browser-sync'


const production = false;

gulp.task('babel', () => {
    return gulp
        .src('./dev/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./public/js'))
})

gulp.task('pug', () => {
    return gulp.src('./dev/pug/*.pug')
        .pipe(pug({
            pretty: production ? false : true
        }))
        .pipe(gulp.dest('./public/'))
})

gulp.task('sass', () => {
    return gulp.src('./dev/scss/styles.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(stream())
})

gulp.task('default', () => {
    server({
        proxy: 'localhost/CRUD/public'
        //server: './public'
    })
    gulp.watch('./dev/pug/**/*.pug', gulp.series('pug')).on('change', reload)
    gulp.watch('./dev/scss/**/*.scss', gulp.series('sass')).on('change', reload)
    gulp.watch('./dev/js/*.js', gulp.series('babel')).on('change', reload)
})