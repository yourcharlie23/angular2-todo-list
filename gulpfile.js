var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject("tsconfig.json");

gulp.task('clean', function(){
  return gulp.src(['app/*'], {read:false})
  .pipe(clean());
});

// gulp.task("compile", ["clean"], () => {
//     let tsResult = gulp.src("src/**/*.ts")
//         // .pipe(sourcemaps.init())
//         .pipe(ts(tsProject()));
//     return tsResult.js
//         // .pipe(sourcemaps.write(".", {sourceRoot: 'src'}))
//         .pipe(gulp.dest("app"));
// });

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(["src/**/*.*", "!**/*.ts"])
        .pipe(gulp.dest("app"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    // gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
    //     console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    // });
    gulp.watch(["!src/**/*.ts"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

/**
 * Build the project.
 */
gulp.task("default", ['resources'], () => {
    console.log("Building the project ...");
});