// gulpfile.js
const { watch, series, src, dest } = require("gulp");
var browserSync = require("browser-sync").create();
var postcss = require("gulp-postcss");

// Task for compiling our CSS files using PostCSS
function TWCssTask(cb) {
    return src("./src/*.css") // read .css files from ./src/ folder
        .pipe(postcss()) // compile using postcss
        .pipe(dest("./assets/css")) // paste them in ./assets/css folder
        .pipe(browserSync.stream());
    cb();
}

// Serve from browserSync server
function browsersyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: "./",
        },
    });
    cb();
}

function browsersyncReload(cb) {
    browserSync.reload();
    cb();
}

// Watch Files & Reload browser after tasks
function watchTask() {
    watch("./*.html", series(TWCssTask, browsersyncReload));
    watch(["./src/*.css"], series(TWCssTask, browsersyncReload));
}

// Default Gulp Task
exports.default = series(TWCssTask, browsersyncServe, watchTask);
exports.css = TWCssTask;