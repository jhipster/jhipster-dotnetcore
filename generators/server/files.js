
const mkdirp = require('mkdirp');
const constants = require('../generator-dotnetcore-constants');

/* Constants use throughout */
const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;

const serverFiles = {

    serverCsProj: [
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Project.csproj', renameTo: generator =>`${generator.pascalizedBaseName}/${generator.pascalizedBaseName}.csproj`}]
        }
    // ],
    // serverProgram: [
    //     {
    //         path: SERVER_PROJECT_DIR,
    //         templates: 'Program.cs',
    //         renameTo: generator =>`${generator.projectDir}/Program.cs`
    //     }
    // ]
    // serverStartup: [

    // ],
    // serverConfiguration: [

    // ],
    // serverControllers: [

    // ],
    ]

}

function writeFiles() {
    return {
        writeFiles() {
            this.writeFilesToDisk(serverFiles, this, false, 'dotnetcore');
        }
    }

}

module.exports = {
    serverFiles,
    writeFiles
};
