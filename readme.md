# Running a HTML static site Cross-Platform
## This project is designed to simulate the sitecore habitat 8+ solution but only in a static way.

### Installation
You need to have `NodeJs` installed on your system then you will be able to run npm commands.
All the required Node modules need to be installed before you can use this template. From the root folder of this project, type `npm install`. This will create a folder called `node_modules` and download the plugins listed under the `devDependencies` section in the `package.json` file. If you encounter an `ERR!` message about `EACCES`, then you�ll need to run the command as the super user: `sudo npm install`.  

## Gulp Tasks
Typing `gulp --tasks`, or simply `gulp`, will provide you with a list of tasks included in `gulpfile.js`. Tasks such as `build` and `serve` invoke other tasks and are nested in the output of `gulp --tasks`.

Each task can be run on its own. For example, if all you want to do is validate your HTML, you can type `gulp validateHTML`, and if the task runs to completion without any messages, it means your HTML is valid and W3-compliant.

Above each task in the `gulpfile.js` file is an elaborate comment discussing what each task does. 
## Gulp version 
https://markgoodyear.com/2015/06/using-es6-with-gulp/

gulp task using new ES6 features

## npm scripts
in the package.json file you can see a block for scripts whcih is so handy and it let us to run any `gulp` task, `unit tests`, `webpack` ,....

## Running the Project
For development, run wither `gulp Serve-the-site` or `npm run serve` , which runs multiple development-related tasks, then launches your default browser and listens for changes. Gulp keeps you informed via The Terminal. You can now work on your project as you normally would. Each time you save a file, your browser will refresh so you don�t have to.
 
## Run the specific task
Press CTR+SHIFT+B 
pick the task you need and pick also the task runner (gulp) and the task will be run. you are goood to go.
 
## Fonts and Icons
We use google fonts and google material icons. 
You can find them in   https://fonts.googleapis.com/ and https://material.io/tools/icons/?style=baseline
The related Sass files are located in Foundation/theminf/style/vendor folder
vendor should be rendered as priority in the default sass file in the foundation then other files can use the fonts properly. 


## Webpack: bundling Script files
Webpack is a bundler for javascript and friends. Packs many modules into a few bundled assets. Code Splitting allows to load parts for the application on demand. Through "loaders," modules can be CommonJs, AMD, ES6 modules, CSS, Images, JSON, Coffeescript, LESS, ... and your custom stuff.
### ProvidePlugin
Automatically load modules instead of having to import or require them everywhere. specially some libraries like Jquery.
https://webpack.js.org/plugins/provide-plugin/#usage-jquery

if there were any issue around resolving node-modules packages
use this commands in webpack :
```
    npm i --save-dev webpack-node-externals
    in your webpack file:
     var nodeExternals = require('webpack-node-externals');

    in the modules of webpack:
      target: 'web', // in order to ignore built-in modules like path, fs, etc. 
      externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
```

## HandleBar
We try to simulate the mvc views so it means that we would need to assign some classes and attributes . 
If it didnot work for firfox lets input the code to this website and recieve the renedered code and then test it http://tryhandlebarsjs.com/
