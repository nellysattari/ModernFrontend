'use strict';
const fetaures = ['promotioncomponent'];

const path = require('path');

export class IncludedFeatures {
    constructor() { }


    SassList() {
        let featureArray = [];
        if (fetaures.length > 0) {
            fetaures.forEach(feature => {
                featureArray.push(`../../../feature/${feature}/code/styles/_index.scss`);
            });
        }
        return featureArray;
    }


    ScriptList() {
        let featureArray = [];
        if (fetaures.length > 0) {
            fetaures.forEach(feature => {
                featureArray.push(path.join(__dirname, '..', '..', '..', 'Feature', feature, 'code', 'scripts', '*.js*'));
            });
        }
        return featureArray;
    }
}



// if you  decided to write ES5 format just change the things as follow 
// const SassList = function SassList() {
// }

// const ScriptList = function ScriptList() {

// }
// module.exports = { SassList, ScriptList }
