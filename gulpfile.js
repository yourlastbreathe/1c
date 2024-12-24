import gulp from 'gulp';
import plumber from 'gulp-plumber';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import { deleteAsync as del } from 'del';

const sass = gulpSass(dartSass);
// Styles

export const styles = () => {
  return gulp.src('source/styles/styles.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/styles', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML
export const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}

// Scripts
export const scripts = () => {
  return gulp.src('source/scripts/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/scripts'))
}

// Images
const optimizeImages = () => {
  return gulp.src('source/images/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/images'))
}

export const copyImages = () => {
  return gulp.src('source/images/*.{jpg,png}')
  .pipe(gulp.dest('build/images'))
}

// WebP

export const createWebp = () => {
  return gulp.src('source/images/*.{jpg,png}')
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest('build/images'));
}

// SVG

export const sprite = () => {
  return gulp.src('source/icons/*.svg')
  .pipe(svgo())
  .pipe(svgstore({
    inLineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/icons'));
}

const svg = () => {
  return gulp.src(['source/icons/**/*.svg', '!source/icons/sprite.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/icons'));
}

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

//Del
const clean = () => {
  return del('build');
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/styles/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}


// Build

export const build = gulp.series(
  clean,
  copy,
  //optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
