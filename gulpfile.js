/*jslint node: true, for */

'use strict';

let gulp = require(`gulp`);
let exec = require('child_process').exec;
const runSequence = require('run-sequence').use(gulp);
const fs = require('fs');
const foreach = require("gulp-foreach");
const notify = require('gulp-notify');
const nugetRestore = require('gulp-nuget-restore');
const msbuild = require('gulp-msbuild');
const xunit = require('gulp-xunit-runner');
var config;
if (fs.existsSync('./gulp-config.js.user')) {
    config = require("./gulp-config.js.user")();
}
else {
    config = require("./gulp-config.js")()
}

module.exports.config = config;

gulp.task('Serve-the-site', (callback) => {
    exec('npm run serve', (err, stdout, stderr) => {
        console.log(stdout);
        if (stderr) {
            console.log(stderr);
        }
        callback(err);
    });
});

gulp.task('Compile-Sass-Challenger', (callback) => {
    exec('npm run sassChallenger', (err, stdout, stderr) => {
        console.log(stdout);
        if (stderr) {
            console.log(stderr);
        }
        callback(err);
    });
 });


gulp.task('Compile-Js-Challenger', (callback) => {
    exec('npm run jsChallenger', (err, stdout, stderr) => {
        console.log(stdout);
        if (stderr) {
            console.log(stderr);
        }
        callback(err);
    });
});



gulp.task('Compile-Sass-legacy', (callback) => {
    exec('npm run sassLegacy', (err, stdout, stderr) => {
        console.log(stdout);
        if (stderr) {
            console.log(stderr);
        }
        callback(err);
    });
});
 
gulp.task('sync-razor-legacy', (callback) => {
    exec('gulp --gulpfile Legacy/gulpfile.babel.js  copy-razor', (err, stdout, stderr) => {
        console.log(stdout);
        if (stderr) {
            console.log(stderr);
        }
        callback(err);
    });
});
 

gulp.task('sync-appconfig-legacy', (callback) => {
    exec('gulp--gulpfile Legacy/gulpfile.babel.js  copy-appconfig', (err, stdout, stderr) => {
        console.log(stdout);
        if (stderr) {
            console.log(stderr);
        }
        callback(err);
    });
});
  //exec('gulp --gulpfile src/Project/Challenger/code/gulpfile.babel.js copy-razor', (err, stdout, stderr) => {
     


/**
 Watchers
**/
gulp.task('Auto-Publish-Css', () => {
    const root = './src';
    const roots = [`${root}/**/styles`, `!${root}/**/obj/**/styles` ];
    const files = '/**/*.css';
    const destination = `${config.websiteRoot}\\styles`;
    gulp.src(roots, { base: root }).pipe(
        foreach((stream, rootFolder) => {
            gulp.watch(rootFolder.path + files, (event) => {
                if (event.type === 'changed') {
                    console.log(`publish this file ${event.path}`);
                    gulp.src(event.path, { base: rootFolder.path }).pipe(gulp.dest(destination));
                }
                console.log(`published to ${destination}`);
            });
            return stream;
        })
    );
});

gulp.task('Auto-Publish-Views', () => {
    const root = './src';
    const roots = [`${root}/**/Views`, `!${root}/**/obj/**/Views`];
    const files = '/**/*.cshtml';
    const destination = `${config.websiteRoot}\\Views`;
    gulp.src(roots, { base: root }).pipe(
        foreach((stream, rootFolder) => {
            gulp.watch(rootFolder.path + files, (event) => {
                if (event.type === 'changed') {
                    console.log(`publish this file ${event.path}`);
                    gulp.src(event.path, { base: rootFolder.path }).pipe(gulp.dest(destination));
                }
                console.log(`published to ${destination}`);
            });
            return stream;
        })
    );
});

gulp.task('Auto-Publish-Assemblies', () => {
    const root = './src';
    const roots = [`${root}/**/code/**/bin`];
    const files = '/**/src.{Feature,Foundation,Website}.*.{dll,pdb}';
    const destination = `${config.websiteRoot}/bin/`;
    gulp.src(roots, { base: root }).pipe(
        foreach((stream, rootFolder) => {
            gulp.watch(rootFolder.path + files, (event) => {
                if (event.type === 'changed') {
                    console.log(`publish this file ${event.path}`);
                    gulp.src(event.path, { base: rootFolder.path }).pipe(gulp.dest(destination));
                }
                console.log(`published to ${destination}`);
            });
            return stream;
        })
    );
});

gulp.task('Auto-Publish-Scripts', () => {
    const root = './src/Project';
    const roots = [`${root}/**/scripts`, `!${root}/**/obj/**/scripts`];
     const files = '/**/*.min.js';
    const destination = `${config.websiteRoot}\\scripts`;

    gulp.src(roots, { base: root }).pipe(
        foreach((stream, rootFolder) => {
            gulp.watch(rootFolder.path + files, (event) => {
                if (event.type === 'changed') {
                    console.log(`publish this file ${event.path}`);
                    gulp.src(event.path, { base: rootFolder.path })
                    .pipe(gulp.dest(destination))
                    .pipe(notify(`published ${event.path}`, Date()));
                }
                console.log(`published ${destination}`, Date());
            });
            return stream;
        })
    );
});


gulp.task('Nuget-Restore', () =>
    gulp.src(`./${config.solutionName}.sln`)
        .pipe(nugetRestore()));


        
gulp.task('Unit-Test', () =>
gulp.src(['**/bin/**/*.Test.dll', '**/bin/**/*.Tests.dll'], { read: true })
  .pipe(xunit({
    // executable: 'packages/xunit.runner.console.2.1.0/tools/xunit.console.x86.exe',    When we install the xunit in the backend we will grab its path and put it here
    options: {
      nunit: 'report.xml',
    },
  })
  )
);


gulp.task('Build-Solution', () => {
    let targets = ['Build'];
    const logVerbosity = 'minimal'; // Possible Values: quiet, minimal, normal, detailed, diagnostic

    if (config.runCleanBuilds) {
        targets = ['Clean', 'Build'];
    }
    return gulp.src(`./${config.solutionName}.sln`)
        .pipe(msbuild({
            targets,
            configuration: config.buildConfiguration,
            logCommand: false,
            nodeReuse: false,
            verbosity: logVerbosity,
            stdout: true,
            errorOnFail: true,
            maxcpucount: 0,
            toolsVersion: 14.0,
        }));
});



//****************
gulp.task('default', (callback) => {
    return runSequence(
        'Nuget-Restore',
        'Unit-Test',
        'Build-Solution',
        'Compile-Sass-Challenger',
        'Compile-Js-Challenger',
        'Compile-Sass-legacy',
        'Auto-Publish-Scripts',
        'Auto-Publish-Css',
        'Auto-Publish-Views',
        'Auto-Publish-Assemblies',
        'sync-razor-legacy',
        'sync-appconfig-legacy',
        'sync-css-legacy',
        callback);
});

