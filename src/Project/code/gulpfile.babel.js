/*jslint node: true, for */

'use strict';

let gulp = require(`gulp`),
    sass = require(`gulp-sass`),
    autoprefixerBrowserSpecific = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    htmlImport = require('gulp-html-import'),
    gulprename = require('gulp-rename'),
    path = require('path'),
    glob = require('glob'), /**Match files using the patterns the shell uses, like stars and stuff.**/

    browserSync = require(`browser-sync`),
    reload = browserSync.reload,
    browserChoice = `default`;


const SASS_FILES_Watch = glob.sync(path.join(__dirname, '..', '..',   '**',  '*.scss*'));
const HTML_FILES_Watch = glob.sync(path.join(__dirname, '..', '..',  '**',  '*.html*'));
const HTML_Feature_Folder = glob.sync(path.join(__dirname,  '..', '..', 'Feature', '**', 'code', 'Views', '/'));
  


gulp.task(`safari`, function () {
    browserChoice = `safari`;
});

gulp.task(`firefox`, function () {
    browserChoice = `firefox`;
});

gulp.task(`chrome`, function () {
    browserChoice = `google chrome`;
});

gulp.task(`opera`, function () {
    browserChoice = `opera`;
});

gulp.task(`edge`, function () {
    browserChoice = `microsoft-edge`;
});

gulp.task(`allBrowsers`, function () {
    browserChoice = [`safari`, `firefox`, `google chrome`, `opera`, `microsoft-edge`];
});


gulp.task('importHtml', function () {
    console.log("__dirname",__dirname);
    gulp.src('Views/Layouts/Default_import.html')
        .pipe(htmlImport(HTML_Feature_Folder))
        .pipe(gulprename("Default.html"))
        .pipe(gulp.dest('Views/Layouts'));
})

//server: Use the built-in static server for basic HTML/JS/CSS websites. Basedir is just for // Multiple base directories server: ["app", "dist"]
// baseDir for serving static files is it is based on https://github.com/expressjs/serve-static. The file to serve will be determined by combining req.url with the provided root directory

gulp.task(`serve`, [`compileCSSForDev`,  'importHtml'], function () {
        browserSync({
            notify: true,
            port: 9000,
            reloadDelay: 100,
            browser: browserChoice,
            server: {
                baseDir: [
                    `Views/Layouts/`,
                    `images`,
                    `Scripts`,
                    `Styles`
                ],
                index: "Default.html"
            }
        });
    
    
        gulp.watch([`Views/**/*.html`], [`importHtml`])
            .on(`change`, reload);
    
        gulp.watch(`scripts/**/*.js`, [`serve`])
            .on(`change`, reload);
    
    
        gulp.watch(HTML_FILES_Watch, [`importHtml`])
            .on(`change`, reload);
    
        gulp.watch(SASS_FILES_Watch, [`compileCSSForDev`])
            .on(`change`, reload);
    
    });
    
gulp.task(`compileCSSForDev`, function () {
    var autoPrefixerPlugins = [autoprefixerBrowserSpecific({ browsers: [`last 2 versions`] })]
   
    return gulp.src(`styles/default/default.scss`)
        .pipe(sass({
            outputStyle: `expanded`,
            precision: 10,
        }).on(`error`, sass.logError))
        .pipe(gulprename('main.css'))
        .pipe(postcss(autoPrefixerPlugins))
        .pipe(gulp.dest(`styles`));
});

 