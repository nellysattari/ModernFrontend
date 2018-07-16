const path = require("path");
module.exports = function gulpvariables() {
    const instanceRoot= path.join(__dirname, 'Sitecore');
    let publishDir = (process.env.publish_path) || "";

    const config = {
        websiteRoot: `${instanceRoot}\\Website`,
        sitecoreLibraries: `${instanceRoot}\\Website\\bin`,
        //licensePath: `${instanceRoot}\\Data\\license.xml`,
        //dataPath: `${instanceRoot}\\Data\\`,
        solutionName: 'Challenger.Sitecore.Full',
        customArgs: [],
        runCleanBuilds: false,
        buildConfiguration: "Debug",
        buildToolsVersion: 15.0,
        buildMaxCpuCount: 0,
        buildVerbosity: "minimal",
        buildPlatform: "Any CPU",
        publishPlatform: "AnyCpu",
        runCleanBuilds: false
    };
    return config;
};

