/**
 * Copyright 2019-2023 the original author or authors from the JHipster project.
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
const constants = require('../generator-dotnetcore-constants.cjs');

/* Constants use throughout */
const CLIENT_SRC_DIR = constants.CLIENT_SRC_DIR;
const CLIENT_TEST_DIR = constants.CLIENT_TEST_DIR;

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const files = {
    blazorAutoMapperProfiles: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/AutoMapper/AutoMapperProfile.cs',
                    renameTo: generator => `${generator.mainClientDir}/AutoMapper/AutoMapperProfile.cs`,
                },
            ],
        },
    ],
    blazorAppModels: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Models/BaseModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/BaseModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Models/Register/RegisterModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/Register/RegisterModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Models/Register/RegisterResultRequest.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/Register/RegisterResultRequest.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Models/Register/UserSaveModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/Register/UserSaveModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Models/ConfigurationModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/ConfigurationModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Models/JwtToken.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/JwtToken.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Models/LoginModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/LoginModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Models/UserModel.cs',
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
                    file: 'Project.Client/Pages/Account/Register.razor.cs',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Account/Register.razor.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Pages/Account/Register.razor',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Account/Register.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Pages/Admin/UserManagement/UserDetail.razor',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Admin/UserManagement/UserDetail.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Pages/Admin/UserManagement/UserDetail.razor.cs',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Admin/UserManagement/UserDetail.razor.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Pages/Admin/UserManagement/UserManagement.razor.cs',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Admin/UserManagement/UserManagement.razor.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Pages/Admin/UserManagement/UserManagement.razor',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Admin/UserManagement/UserManagement.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Pages/Admin/UserManagement/UserUpdate.razor',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Admin/UserManagement/UserUpdate.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Pages/Admin/UserManagement/UserUpdate.razor.cs',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Admin/UserManagement/UserUpdate.razor.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Pages/Utils/INavigationService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Utils/INavigationService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Pages/Utils/NavigationService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Utils/NavigationService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Pages/Index.razor.cs',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Index.razor.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Pages/Index.razor',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Index.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Pages/Login.razor',
                    renameTo: generator => `${generator.mainClientDir}/Pages/Login.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Pages/Login.razor.cs',
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
                    file: 'Project.Client/Properties/launchSettings.json',
                    renameTo: generator => `${generator.mainClientDir}/Properties/launchSettings.json`,
                },
            ],
        },
    ],
    blazorAppServices: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Services/AccountServices/IRegisterService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/AccountServices/IRegisterService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Services/AccountServices/RegisterService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/AccountServices/RegisterService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Services/EntityServices/User/IUserService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/EntityServices/User/IUserService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Services/EntityServices/User/UserService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/EntityServices/User/UserService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Services/EntityServices/AbstractEntityService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/EntityServices/AbstractEntityService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Services/IAuthenticationService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/IAuthenticationService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Services/AuthenticationService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/AuthenticationService.cs`,
                },
            ],
        },
    ],
    blazorAppShared: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Shared/MainLayout.razor',
                    renameTo: generator => `${generator.mainClientDir}/Shared/MainLayout.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Shared/NavMenu.razor',
                    renameTo: generator => `${generator.mainClientDir}/Shared/NavMenu.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Shared/NavMenu.razor.cs',
                    renameTo: generator => `${generator.mainClientDir}/Shared/NavMenu.razor.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Shared/DeleteModal.razor.cs',
                    renameTo: generator => `${generator.mainClientDir}/Shared/DeleteModal.razor.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Shared/DeleteModal.razor',
                    renameTo: generator => `${generator.mainClientDir}/Shared/DeleteModal.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Shared/Components/AlertError.razor',
                    renameTo: generator => `${generator.mainClientDir}/Shared/Components/AlertError.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Shared/Components/AlertError.razor.cs',
                    renameTo: generator => `${generator.mainClientDir}/Shared/Components/AlertError.razor.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Shared/Components/DynInputText.razor',
                    renameTo: generator => `${generator.mainClientDir}/Shared/Components/DynInputText.razor`,
                },
            ],
        },
    ],
    blazorAppWeb: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_0.svg',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_0.svg`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_1.svg',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_1.svg`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_2.svg',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_2.svg`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_3.svg',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_3.svg`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_0_head-192.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_0_head-192.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_1_head-192.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_1_head-192.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_2_head-192.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_2_head-192.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_3_head-192.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_3_head-192.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_0_head-256.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_0_head-256.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_1_head-256.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_1_head-256.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_2_head-256.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_2_head-256.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_0_head-256.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_0_head-256.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_0_head-384.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_0_head-384.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_1_head-384.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_1_head-384.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_2_head-384.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_2_head-384.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_3_head-384.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_3_head-384.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_0_head-512.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_0_head-512.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_1_head-512.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_1_head-512.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_2_head-512.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_2_head-512.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/jhipster_family_member_3_head-512.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/jhipster_family_member_3_head-512.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/images/logo-jhipster.png',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/images/logo-jhipster.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/css/loading.css',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/css/loading.css`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/scss/_bootstrap-variables.scss',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/scss/_bootstrap-variables.scss`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/scss/global.scss',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/scss/global.scss`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/content/scss/vendor.scss',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/content/scss/vendor.scss`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/favicon.ico',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/favicon.ico`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/index.html',
                    method: 'copy',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/index.html`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/robots.txt',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/robots.txt`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/manifest.webapp',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/manifest.webapp`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/appsettings.json',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/appsettings.json`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/appsettings.Development.json',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/appsettings.Development.json`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/wwwroot/appsettings.Production.json',
                    renameTo: generator => `${generator.mainClientDir}/wwwroot/appsettings.Production.json`,
                },
            ],
        },
    ],
    blazorAppRoot: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/_Imports.razor',
                    renameTo: generator => `${generator.mainClientDir}/_Imports.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/App.razor',
                    renameTo: generator => `${generator.mainClientDir}/App.razor`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/App.razor.cs',
                    renameTo: generator => `${generator.mainClientDir}/App.razor.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/libman.json',
                    renameTo: generator => `${generator.mainClientDir}/libman.json`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Program.cs',
                    renameTo: generator => `${generator.mainClientDir}/Program.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Project.Client.csproj',
                    renameTo: generator => `${generator.mainClientDir}/${generator.pascalizedBaseName}.Client.csproj`,
                },
            ],
        },
    ],
    blazorTestHelpers: [
        {
            path: CLIENT_TEST_DIR,
            templates: [
                {
                    file: 'Project.Client.Test/Helpers/AuthorizationHelper.cs',
                    renameTo: generator => `${generator.clientTestProject}/Helpers/AuthorizationHelper.cs`,
                },
            ],
        },
        {
            path: CLIENT_TEST_DIR,
            templates: [
                {
                    file: 'Project.Client.Test/Helpers/MockAuthenticationService.cs',
                    renameTo: generator => `${generator.clientTestProject}/Helpers/MockAuthenticationService.cs`,
                },
            ],
        },
        {
            path: CLIENT_TEST_DIR,
            templates: [
                {
                    file: 'Project.Client.Test/Helpers/MockAuthorizationPolicyProvider.cs',
                    renameTo: generator => `${generator.clientTestProject}/Helpers/MockAuthorizationPolicyProvider.cs`,
                },
            ],
        },
        {
            path: CLIENT_TEST_DIR,
            templates: [
                {
                    file: 'Project.Client.Test/Helpers/MockAuthorizationService.cs',
                    renameTo: generator => `${generator.clientTestProject}/Helpers/MockAuthorizationService.cs`,
                },
            ],
        },
        {
            path: CLIENT_TEST_DIR,
            templates: [
                {
                    file: 'Project.Client.Test/Helpers/MockRegisterService.cs',
                    renameTo: generator => `${generator.clientTestProject}/Helpers/MockRegisterService.cs`,
                },
            ],
        },
        {
            path: CLIENT_TEST_DIR,
            templates: [
                {
                    file: 'Project.Client.Test/Helpers/TestPolicyRequirement.cs',
                    renameTo: generator => `${generator.clientTestProject}/Helpers/TestPolicyRequirement.cs`,
                },
            ],
        }
    ],
    blazorTestPages: [
        {
            path: CLIENT_TEST_DIR,
            templates: [
                {
                    file: 'Project.Client.Test/Pages/Admin/UserManagement/UserDetailTest.cs',
                    renameTo: generator => `${generator.clientTestProject}/Pages/Admin/UserManagement/UserDetailTest.cs`,
                },
            ],
        },
        {
            path: CLIENT_TEST_DIR,
            templates: [
                {
                    file: 'Project.Client.Test/Pages/TestPages/TestAlertError.razor',
                    renameTo: generator => `${generator.clientTestProject}/Pages/TestPages/TestAlertError.razor`,
                },
            ],
        },
    ],
    blazorTestRoot: [
        {
            path: CLIENT_TEST_DIR,
            templates: [
                {
                    file: 'Project.Client.Test/AlertErrorTest.cs',
                    renameTo: generator => `${generator.clientTestProject}/AlertErrorTest.cs`,
                },
            ],
        },
        {
            path: CLIENT_TEST_DIR,
            templates: [
                {
                    file: 'Project.Client.Test/IndexTest.cs',
                    renameTo: generator => `${generator.clientTestProject}/IndexTest.cs`,
                },
            ],
        },
        {
            path: CLIENT_TEST_DIR,
            templates: [
                {
                    file: 'Project.Client.Test/LoginTest.cs',
                    renameTo: generator => `${generator.clientTestProject}/LoginTest.cs`,
                },
            ],
        },
        {
            path: CLIENT_TEST_DIR,
            templates: [
                {
                    file: 'Project.Client.Test/Project.Client.Test.csproj',
                    renameTo: generator => `${generator.clientTestProject}/${generator.pascalizedBaseName}.Client.Test.csproj`,
                },
            ],
        },
    ],
    blazorShared: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Shared/Constants/ErrorConst.cs',
                    renameTo: generator => `${generator.sharedClientDir}/Constants/ErrorConst.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Shared/Constants/TypeAlert.cs',
                    renameTo: generator => `${generator.sharedClientDir}/Constants/TypeAlert.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Shared/Models/JhiAlert.cs',
                    renameTo: generator => `${generator.sharedClientDir}/Models/JhiAlert.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Shared/Project.Client.Shared.csproj',
                    renameTo: generator => `${generator.sharedClientDir}/${generator.pascalizedBaseName}.Client.Shared.csproj`,
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

