/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const constants = require('../generator-dotnetcore-constants');

/* Constants use throughout */
const CLIENT_SRC_DIR = constants.CLIENT_SRC_DIR;

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const files = {
    blazorAppModels: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/JwtToken.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/JwtToken.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/LoginModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/LoginModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/UserModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/UserModel.cs`,
                },
            ],
        },
    ],
    blazorAppPages: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Pages/Utils/INavigationService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Utils/INavigationService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Pages/Utils/NavigationService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Utils/NavigationService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Pages/Index.razor.cs',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Index.razor.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Pages/Index.razor',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Index.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Pages/Login.razor',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Login.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Pages/Login.razor.cs',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Login.razor.cs`,
                },
            ],
        }
    ],
    blazorAppProperties: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Properties/launchSettings.json',
                    renameTo: generator => `${generator.mainClientDir}/Properties/launchSettings.cs`,
                },
            ],
        },
    ],
    blazorAppProperties: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Services/EntityServices/AbstractEntityService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/EntityServices/AbstractEntityService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Services/IAuthenticationService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/IAuthenticationService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Services/AuthenticationService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/AuthenticationService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Services/Configuration.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/Configuration.cs`,
                },
            ],
        },
    ],
    blazorAppShared: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Shared/MainLayout.razor',
                    renameTo: generator => `${generator.mainClientDir}/Shared/MainLayout.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Shared/NavMenu.razor',
                    renameTo: generator => `${generator.mainClientDir}/Shared/NavMenu.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Shared/NavMenu.razor.cs',
                    renameTo: generator => `${generator.mainClientDir}/Shared/NavMenu.cs.razor`,
                },
            ],
        },
    ],
    blazorAppWeb: [
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_0.svg',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_0.svg`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_1.svg',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_1.svg`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_2.svg',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_2.svg`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_3.svg',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_3.svg`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_0_head-192.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_0_head-192.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_1_head-192.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_1_head-192.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_2_head-192.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_2_head-192.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_3_head-192.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_3_head-192.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_0_head-256.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_0_head-256.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_1_head-256.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_1_head-256.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_2_head-256.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_2_head-256.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_0_head-256.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_0_head-256.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_0_head-384.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_0_head-384.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_1_head-384.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_1_head-384.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_2_head-384.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_2_head-384.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_3_head-384.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_3_head-384.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_0_head-512.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_0_head-512.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_1_head-512.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_1_head-512.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_2_head-512.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_2_head-512.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/jhipster_family_member_3_head-512.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_3_head-512.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/images/logo-jhipster.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/logo-jhipster.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/scss/_bootstrap-variables.scss',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/scss/_bootstrap-variables.scss`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/scss/global.scss',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/scss/global.scss`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/content/scss/vendor.scss',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/scss/vendor.scss`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/favicon.ico',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/favicon.ico`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [                
                {
                    file: 'Project/wwwroot/index.html',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/index.html`,
                },
            ],
        },
    ],
    blazorAppRoot: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/_Imports.razor',
                    renameTo: generator => `${generator.mainClientDir}/_Imports.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/App.razor',
                    renameTo: generator => `${generator.mainClientDir}/App.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/App.razor.cs',
                    renameTo: generator => `${generator.mainClientDir}/App.razor.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/compilerconfig.json.defaults',
                    renameTo: generator => `${generator.mainClientDir}/compilerconfig.json.defaults`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/compilerconfig.json',
                    renameTo: generator => `${generator.mainClientDir}/compilerconfig.json`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/libman.json',
                    renameTo: generator => `${generator.mainClientDir}/libman.json`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Program.cs',
                    renameTo: generator => `${generator.mainClientDir}/Program.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project/Project.Client.csproj',
                    renameTo: generator => `${generator.mainClientDir}/${generator.pascalizedBaseName}.Client.csproj`,
                },
            ],
        },
    ],
};

module.exports = {
    writeFiles,
    files,
};

function writeFiles() {
    this.writeFilesToDisk(files, this, false, 'blazor');
}

