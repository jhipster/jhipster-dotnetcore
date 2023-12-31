/**
 * Copyright 2019-2024 the original author or authors from the JHipster project.
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

import { CLIENT_SRC_DIR, CLIENT_TEST_DIR, renameDotNetCore } from '../generator-dotnetcore-constants.js';

/* Constants use throughout */

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
export const files = {
  blazorAutoMapperProfiles: [
    {
      path: `${CLIENT_SRC_DIR}client/`,
      renameTo: renameDotNetCore(`${CLIENT_SRC_DIR}client/`),
      templates: [
        'Project.Client/AutoMapper/AutoMapperProfile.cs',
        'Project.Client/Models/BaseModel.cs',
        'Project.Client/Models/Register/RegisterModel.cs',
        'Project.Client/Models/Register/RegisterResultRequest.cs',
        'Project.Client/Models/Register/UserSaveModel.cs',
        'Project.Client/Models/ConfigurationModel.cs',
        'Project.Client/Models/JwtToken.cs',
        'Project.Client/Models/LoginModel.cs',
        'Project.Client/Models/UserModel.cs',
        'Project.Client/Pages/Account/Register.razor.cs',
        'Project.Client/Pages/Account/Register.razor',
        'Project.Client/Pages/Admin/UserManagement/UserDetail.razor',
        'Project.Client/Pages/Admin/UserManagement/UserDetail.razor.cs',
        'Project.Client/Pages/Admin/UserManagement/UserManagement.razor.cs',
        'Project.Client/Pages/Admin/UserManagement/UserManagement.razor',
        'Project.Client/Pages/Admin/UserManagement/UserUpdate.razor',
        'Project.Client/Pages/Admin/UserManagement/UserUpdate.razor.cs',
        'Project.Client/Pages/Utils/INavigationService.cs',
        'Project.Client/Pages/Utils/NavigationService.cs',
        'Project.Client/Pages/Index.razor.cs',
        'Project.Client/Pages/Index.razor',
        'Project.Client/Pages/Login.razor',
        'Project.Client/Pages/Login.razor.cs',
        'Project.Client/Properties/launchSettings.json',
        'Project.Client/Services/AccountServices/IRegisterService.cs',
        'Project.Client/Services/AccountServices/RegisterService.cs',
        'Project.Client/Services/EntityServices/User/IUserService.cs',
        'Project.Client/Services/EntityServices/User/UserService.cs',
        'Project.Client/Services/EntityServices/AbstractEntityService.cs',
        'Project.Client/Services/IAuthenticationService.cs',
        'Project.Client/Services/AuthenticationService.cs',
        'Project.Client/Shared/MainLayout.razor',
        'Project.Client/Shared/NavMenu.razor',
        'Project.Client/Shared/NavMenu.razor.cs',
        'Project.Client/Shared/DeleteModal.razor.cs',
        'Project.Client/Shared/DeleteModal.razor',
        'Project.Client/Shared/Components/AlertError.razor',
        'Project.Client/Shared/Components/AlertError.razor.cs',
        'Project.Client/Shared/Components/DynInputText.razor',
        'Project.Client/wwwroot/content/scss/global.scss',
        'Project.Client/wwwroot/robots.txt',
        'Project.Client/wwwroot/manifest.webapp',
        'Project.Client/wwwroot/appsettings.json',
        'Project.Client/wwwroot/appsettings.Development.json',
        'Project.Client/wwwroot/appsettings.Production.json',
        'Project.Client/wwwroot/content/css/loading.css',
        'Project.Client/wwwroot/content/scss/_bootstrap-variables.scss',
        'Project.Client/wwwroot/content/scss/vendor.scss',
        'Project.Client/wwwroot/index.html',
        'Project.Client.Shared/Constants/ErrorConst.cs',
        'Project.Client.Shared/Constants/TypeAlert.cs',
        'Project.Client.Shared/Models/JhiAlert.cs',
        'Project.Client.Shared/Project.Client.Shared.csproj',
        'Project.Client/_Imports.razor',
        'Project.Client/App.razor',
        'Project.Client/App.razor.cs',
        'Project.Client/libman.json',
        'Project.Client/Program.cs',
        'Project.Client/Project.Client.csproj',
      ],
    },
  ],
  blazorAppWeb: [
    {
      path: `${CLIENT_SRC_DIR}client/`,
      transform: false,
      renameTo: renameDotNetCore(`${CLIENT_SRC_DIR}client/`),
      templates: [
        'Project.Client/wwwroot/content/images/jhipster_family_member_0.svg',
        'Project.Client/wwwroot/content/images/jhipster_family_member_1.svg',
        'Project.Client/wwwroot/content/images/jhipster_family_member_2.svg',
        'Project.Client/wwwroot/content/images/jhipster_family_member_3.svg',
        'Project.Client/wwwroot/content/images/jhipster_family_member_0_head-192.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_1_head-192.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_2_head-192.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_3_head-192.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_0_head-256.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_1_head-256.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_2_head-256.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_0_head-256.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_0_head-384.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_1_head-384.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_2_head-384.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_3_head-384.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_0_head-512.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_1_head-512.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_2_head-512.png',
        'Project.Client/wwwroot/content/images/jhipster_family_member_3_head-512.png',
        'Project.Client/wwwroot/content/images/logo-jhipster.png',
        'Project.Client/wwwroot/favicon.ico',
      ],
    },
  ],
  blazorTestHelpers: [
    {
      path: CLIENT_TEST_DIR,
      renameTo: renameDotNetCore(CLIENT_TEST_DIR),
      templates: [
        'Project.Client.Test/Helpers/AuthorizationHelper.cs',
        'Project.Client.Test/Helpers/MockAuthenticationService.cs',
        'Project.Client.Test/Helpers/MockAuthorizationPolicyProvider.cs',
        'Project.Client.Test/Helpers/MockAuthorizationService.cs',
        'Project.Client.Test/Helpers/MockRegisterService.cs',
        'Project.Client.Test/Helpers/TestPolicyRequirement.cs',
        'Project.Client.Test/Pages/Admin/UserManagement/UserDetailTest.cs',
        'Project.Client.Test/Pages/TestPages/TestAlertError.razor',
        'Project.Client.Test/AlertErrorTest.cs',
        'Project.Client.Test/IndexTest.cs',
        'Project.Client.Test/LoginTest.cs',
        'Project.Client.Test/Project.Client.Test.csproj',
      ],
    },
  ],
};
