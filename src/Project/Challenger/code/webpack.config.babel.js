import webpack from 'webpack';
// var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
import webpackValidator from 'webpack-validator';
import path from 'path';
import globAll from 'glob-all';



//---------------Identifying the scripts in the feature
import { IncludedFeatures } from './includedFeatures.js';
let includedFeatures = new IncludedFeatures();
const featuresScriptArrays = includedFeatures.ScriptList();

// ---------------Add more scripts in from 
let allScriptArrays = featuresScriptArrays.slice();
allScriptArrays.push(path.join(__dirname, '..', '..', '..', 'Project', 'Challenger', 'code', 'scripts', '**', '*.js'));
allScriptArrays.push(path.join(__dirname, '..', '..', '..', 'Foundation', 'Theming', 'code', 'scripts', '**', '*.js'));
let ExclusionList = [];
ExclusionList.push(path.join(__dirname, '..', '..', '..', '**', '*.min.js'));
module.exports = () => {
    console.log("dir:", __dirname);
    return {
        entry: globAll.sync(allScriptArrays,{ ignore: ExclusionList }),
        output: {
            path: path.resolve(__dirname, 'scripts'),
            filename: 'challenger.min.js',
        },
        devtool: 'source-map',
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            }),
            new UglifyJSPlugin({
                sourceMap: false
            })
        ],
        resolve: {
            alias: {
                handlebars: 'handlebars/dist/handlebars.min.js',
            },

        },

        module: {
            rules: [
                {
                    test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: { presets: ['es2015'], },
                },
                {
                    test: /\.ts$/, exclude: /node_modules/, loader: "ts-loader"
                },

            ]
        }

    }
};
