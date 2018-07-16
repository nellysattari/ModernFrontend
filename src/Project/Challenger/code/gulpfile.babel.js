/*jslint node: true, for */

'use strict';

let gulp = require(`gulp`),
    sass = require(`gulp-sass`),
    inject = require(`gulp-inject`),
    autoprefixerBrowserSpecific = require('autoprefixer'),
    jsCompressor = require(`gulp-uglify`),
    postcss = require('gulp-postcss'),
    htmlImport = require('gulp-html-import'),
    gulprename = require('gulp-rename'),
    path = require('path'),
    glob = require('glob'), /**Match files using the patterns the shell uses, like stars and stuff.**/

    browserSync = require(`browser-sync`),
    reload = browserSync.reload,
    browserChoice = `default`;


import { IncludedFeatures } from './includedFeatures';
const includedFeatures = new IncludedFeatures();
const SassFilesFeatures = includedFeatures.SassList();

// const SASS_FILES_Watch = glob.sync(path.join(__dirname, '..', '..', '..', 'Feature', '**', 'code', 'styles', '*.scss*'));
 
const SASS_FILES_Watch = glob.sync(path.join(__dirname, '..', '..', '..',   '**',  '*.scss*'));
 
// const HTML_FILES_Watch = glob.sync(path.join(__dirname, '..','..', '..', '..', 'Feature', '**', 'code', 'Views', '*.html*'));

const HTML_FILES_Watch = glob.sync(path.join(__dirname, '..','..', '..',  '**',  '*.html*'));
const HTML_Feature_Folder = glob.sync(path.join(__dirname, '..', '..', '..', 'Feature', '**', 'code', 'Views', '/'));
  


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

/**
 * VALIDATE HTML
 *
 * This task sources all the HTML files in the dev/html folder, then validates them.
 *
 * On error, the validator will generate one or more messages to the console with
 * line and column co-ordinates, indicating where in your file the error was
 * generated.
 *
 * Note: Regardless of whether your HTML validates or not, no files are copied to a
 * destination folder.
 */
gulp.task(`validateHTML`, function () {
    return gulp.src([`src/Project/**/*.html`, `src/Feature/**/*.html`])
        .pipe(htmlValidator());




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
    
    
        // gulp.watch(`dev/scripts/*.js`, [`lintJS`, `transpileJSForDev`])
        //     .on(`change`, reload);
     
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
   
    const SASS_INCLUDE_PATHS = [
        path.join(__dirname)
    ];
    return gulp.src(`styles/challenger-theme/challenger-theme.scss`)

        .pipe(inject(
            gulp.src(SassFilesFeatures, { read: false }), {
                starttag: '//injectFeatures',
                endtag: '//endinject',
                relative: true,
                transform: function (filepath) {
                    return '@import "' + filepath.replace(/^\//, "") + '";';
                }
            }))

        .pipe(sass({
            outputStyle: `expanded`,
            precision: 10,
            includePaths: [
                SASS_INCLUDE_PATHS,
                '../../../',//foundation in relation with gulp. used in Project\Challenger\code\styles\challenger-theme\challenger-theme.scss
                '../../../../',//node_module in relation with gulp. used in theming default.scss

            ]
        }).on(`error`, sass.logError))

        .pipe(postcss(autoPrefixerPlugins))
        .pipe(gulp.dest(`styles`));
});


gulp.task(`compileCSSForProd`, function () {
    var autoPrefixerPlugins = [autoprefixerBrowserSpecific({ browsers: [`last 2 versions`] })]
    const SASS_INCLUDE_PATHS = [
        path.join(__dirname)
    ];
    return gulp.src(`styles/challenger-theme/challenger-theme.scss`)

        .pipe(inject(
            gulp.src(SassFilesFeatures, { read: false }), {
                starttag: '//injectFeatures',
                endtag: '//endinject',
                relative: true,
                transform: function (filepath) {
                    return '@import "' + filepath.replace(/^\//, "") + '";';
                }
            }))

        .pipe(sass({
            outputStyle: `compressed`,
            precision: 10,
            includePaths: [
                SASS_INCLUDE_PATHS,
                '../../../',//foundation in relation with gulp. used in Project\Challenger\code\styles\challenger-theme\challenger-theme.scss
                '../../../../',//node_module in relation with gulp. used in theming default.scss

            ]
        }).on(`error`, sass.logError))

        .pipe(postcss(autoPrefixerPlugins))
        .pipe(gulp.dest(`styles`));
        // .pipe(gulp.dest(`serve-output/styles`));
});
// gulp.watch('sass/**/*.scss', ['styles', reload]);
 

// gulp.task('Auto-Publish-Css', () => {
//     const root = './NRMA';
//     const roots = [`${root}/**/styles`, `!${root}/**/obj/**/styles`];
//     const files = '/**/*.css';
//     const destination = `${config.websiteRoot}\\styles`;
//     gulp.src(roots, { base: root }).pipe(
//           foreach((stream, rootFolder) => {
//             gulp.watch(rootFolder.path + files, (event) => {
//               if (event.type === 'changed') {
//                 console.log(`publish this file ${event.path}`);
//                 gulp.src(event.path, { base: rootFolder.path }).pipe(gulp.dest(destination));
//               }
//               console.log(`published ${event.path}`);
//             });
//             return stream;
//           })
//         );
//   });
  
//   gulp.task('Auto-Publish-Views', () => {
//     const root = './NRMA';
//     const roots = [`${root}/**/Views`, `!${root}/**/obj/**/Views`];
//     const files = '/**/*.cshtml';
//     const destination = `${config.websiteRoot}\\Views`;
//     gulp.src(roots, { base: root }).pipe(
//           foreach((stream, rootFolder) => {
//             gulp.watch(rootFolder.path + files, (event) => {
//               if (event.type === 'changed') {
//                 console.log(`publish this file ${event.path}`);
//                 gulp.src(event.path, { base: rootFolder.path }).pipe(gulp.dest(destination));
//               }
//               console.log(`published ${event.path}`);
//             });
//             return stream;
//           })
//         );
//   });
   
  
//   gulp.task('Auto-Publish-Scripts', () => {
//     const root = './NRMA/Project';
//     const roots = [`${root}/**/scripts`, `!${root}/**/obj/**/scripts`];
//     const files = '/**/*.min.js';
//     const destination = `${config.websiteRoot}\\scripts`;
  
//     gulp.src(roots, { base: root }).pipe(
//           foreach((stream, rootFolder) => {
//             gulp.watch(rootFolder.path + files, (event) => {
//               if (event.type === 'changed') {
//                 console.log(`publish this file ${event.path}`);
//                 gulp.src(event.path, { base: rootFolder.path }).pipe(gulp.dest(destination)).pipe(notify(`published ${event.path}`, Date()));
//               }
//               console.log(`published ${event.path}`, Date());
//             });
//             return stream;
//           })
//         );
//   });
  