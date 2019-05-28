

const serverFiles = {

    serverCsProj: [
        {
            path: SERVER_SRC_DIR,
            templates: 'Project.csproj',
            renameTo: generator =>`${generator.projectDir}/${generator.camelizedBaseName}.csproj`
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

module.exports = {
    serverFiles
};
