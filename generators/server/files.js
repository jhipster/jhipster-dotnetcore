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
const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;
const SERVER_TEST_DIR = constants.SERVER_TEST_DIR;
const DOCKER_DIR = constants.DOCKER_DIR;
const PROJECT_CROSSCUTTING_SUFFIX = constants.CROSSCUTTING_SUFFIX;

const serverFiles = {
    serverCsProj: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Project.csproj',
                    renameTo: generator => `${generator.mainProjectDir}/${generator.pascalizedBaseName}.csproj`,
                },
            ],
        },
        {
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Project.Test.csproj',
                    renameTo: generator =>
                        `${generator.testProjectDir}/${generator.pascalizedBaseName}${constants.PROJECT_TEST_SUFFIX}.csproj`,
                },
            ],
        },
        {
            path: SERVER_TEST_DIR,
            templates: [{ file: 'Project.Test/xunit.runner.json', renameTo: generator => `${generator.testProjectDir}/xunit.runner.json` }],
        },
    ],
    crosscuttingCsproj: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Crosscutting/Project.csproj',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}.csproj`,
                },
            ],
        },
    ],
    serverProperties: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Properties/launchSettings.json',
                    renameTo: generator => `${generator.mainProjectDir}/Properties/launchSettings.json`,
                },
            ],
        },
        {
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Properties/launchSettings.json',
                    renameTo: generator => `${generator.testProjectDir}/Properties/launchSettings.json`,
                },
            ],
        },
    ],
    serverProgram: [
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Program.cs', renameTo: generator => `${generator.mainProjectDir}/Program.cs` }],
        },
    ],
    serverConfiguration: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Configuration/ApplicationSettings.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/ApplicationSettings.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/appsettings.json', renameTo: generator => `${generator.mainProjectDir}/appsettings.json` }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/appsettings.Development.json',
                    renameTo: generator => `${generator.mainProjectDir}/appsettings.Development.json`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/appsettings.Production.json',
                    renameTo: generator => `${generator.mainProjectDir}/appsettings.Production.json`,
                },
            ],
        },
    ],
    serverStartup: [
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Startup.cs', renameTo: generator => `${generator.mainProjectDir}/Startup.cs` }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Infrastructure/AutoMapperStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Infrastructure/AutoMapperStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Crosscutting/Constants/Constants.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Constants/Constants.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Infrastructure/DatabaseStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Infrastructure/DatabaseStartup.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Infrastructure/IdentityStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Infrastructure/IdentityStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Infrastructure/MvcStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Infrastructure/MvcStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Infrastructure/NhipsterStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Infrastructure/NhipsterStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Infrastructure/ProblemDetailsStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Infrastructure/ProblemDetailsStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Infrastructure/SecurityStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Infrastructure/SecurityStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Infrastructure/SwaggerStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Infrastructure/SwaggerStartup.cs`,
                },
            ],
        },
    ],
    serverUserManagement: [
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/User.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Models/User.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/Role.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Models/Role.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/UserRole.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Models/UserRole.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/Interfaces/IAuditedEntityBase.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Models/Interfaces/IAuditedEntityBase.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/Vm/ManagedUserVM.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Security/Models/Vm/ManagedUserVM.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Data/ApplicationDatabaseContext.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Data/ApplicationDatabaseContext.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Service/AuthenticationService.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Service/AuthenticationService.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Service/MailService.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Service/MailService.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Service/UserService.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Service/UserService.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Service/Dto/PasswordChangeDto.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Service/Dto/PasswordChangeDto.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                { file: 'Project/Service/Dto/UserDto.cs', renameTo: generator => `${generator.mainProjectDir}/Service/Dto/UserDto.cs` },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Service/Mapper/UserMapper.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Service/Mapper/UserMapper.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Service/Mapper/UserProfile.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Service/Mapper/UserProfile.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Service/Utilities/RandomUtil.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Service/Utilities/RandomUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Controllers/AccountController.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Controllers/AccountController.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Controllers/Dto/ProfileInfoDTO.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Controllers/Dto/ProfileInfoDTO.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Controllers/ProfileInfoController.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Controllers/ProfileInfoController.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'oauth2',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Controllers/AuthController.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Controllers/AuthController.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Controllers/UserController.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Controllers/UserController.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Controllers/AccountResourceIntTest.cs',
                    renameTo: generator => `${generator.testProjectDir}/Controllers/AccountResourceIntTest.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Controllers/UserJwtControllerIntTest.cs',
                    renameTo: generator => `${generator.testProjectDir}/Controllers/UserJwtControllerIntTest.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Controllers/UserResourceIntTest.cs',
                    renameTo: generator => `${generator.testProjectDir}/Controllers/UserResourceIntTest.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'oauth2',
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Controllers/AccountControllerTest.cs',
                    renameTo: generator => `${generator.testProjectDir}/Controllers/AccountControllerTest.cs`,
                },
            ],
        },
        {
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Controllers/ProfileInfoControllerIntTest.cs',
                    renameTo: generator => `${generator.testProjectDir}/Controllers/ProfileInfoControllerIntTest.cs`,
                },
            ],
        },
    ],
    serverAuthConfig: [
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/Vm/KeyAndPasswordVM.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Models/Vm/KeyAndPasswordVM.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/Vm/LoginVM.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Security/Models/Vm/LoginVM.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Security/BCryptPasswordHasher.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Security/BCryptPasswordHasher.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Security/PoliciesConstants.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Security/PoliciesConstants.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Crosscutting/Constants/RolesConstants.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Constants/RolesConstants.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Security/UserNotActivatedException.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Security/UserNotActivatedException.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Security/UsernameNotFoundException.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Security/UsernameNotFoundException.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Crosscutting/Constants/JwtConstants.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Constants/JwtConstants.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Security/Jwt/RoleClaimsTransformation.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Security/Jwt/RoleClaimsTransformation.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Security/Jwt/TokenProvider.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Security/Jwt/TokenProvider.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Controllers/UserJwtController.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Controllers/UserJwtController.cs`,
                },
            ],
        },
    ],
    serverToSort: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Extensions/ActionResultExtensions.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Extensions/ActionResultExtensions.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Extensions/ActionResultWithHeaders.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Extensions/ActionResultWithHeaders.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Extensions/HttpRequestExtensions.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Extensions/HttpRequestExtensions.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Filters/ValidateModelAttribute.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Filters/ValidateModelAttribute.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Utilities/ActionResultUtil.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Utilities/ActionResultUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Utilities/HeaderUtil.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Utilities/HeaderUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Utilities/PaginationUtil.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Utilities/PaginationUtil.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Utilities/PaginationUtil.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Utilities/PaginationUtil.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Utilities/PaginationUtil.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Utilities/PaginationUtil.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Utilities/PaginationUtil.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Utilities/PaginationUtil.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Problems/BadRequestAlertException.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Problems/BadRequestAlertException.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Problems/EmailAlreadyUsedException.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Problems/EmailAlreadyUsedException.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Problems/EmailNotFoundException.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Problems/EmailNotFoundException.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Crosscutting/Constants/ErrorConstants.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Constants/ErrorConstants.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Problems/ExceptionTranslator.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Problems/ExceptionTranslator.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Problems/InternalServerErrorException.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Problems/InternalServerErrorException.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Problems/InvalidPasswordException.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Problems/InvalidPasswordException.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Problems/LoginAlreadyUsedException.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Problems/LoginAlreadyUsedException.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Problems/ProblemDetailsConfiguration.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Problems/ProblemDetailsConfiguration.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Problems/ValidationFailedException.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Web/Rest/Problems/ValidationFailedException.cs`,
                },
            ],
        },
    ],
    serverTestStartup: [
        {
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Infrastructure/TestMvcStartup.cs',
                    renameTo: generator => `${generator.testProjectDir}/Infrastructure/TestMvcStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Setup/MockClaimsPrincipalProvider.cs',
                    renameTo: generator => `${generator.testProjectDir}/Infrastructure/MockClaimsPrincipalProvider.cs`,
                },
            ],
        },
        {
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Setup/MockHttpContextFactory.cs',
                    renameTo: generator => `${generator.testProjectDir}/Setup/MockHttpContextFactory.cs`,
                },
            ],
        },
        {
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Setup/NhipsterWebApplicationFactory.cs',
                    renameTo: generator => `${generator.testProjectDir}/Setup/NhipsterWebApplicationFactory.cs`,
                },
            ],
        },
        {
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Setup/TestStartup.cs',
                    renameTo: generator => `${generator.testProjectDir}/Setup/TestStartup.cs`,
                },
            ],
        },
    ],
    serverMisc: [
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_TEST_DIR,
            templates: [{ file: 'Project.Test/Fixme.cs', renameTo: generator => `${generator.testProjectDir}/Fixme.cs` }],
        },
        {
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Controllers/TestUtil.cs',
                    renameTo: generator => `${generator.testProjectDir}/Controllers/TestUtil.cs`,
                },
            ],
        },
    ],
    serverJhipsterNet: [
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Boot/Ansi/AnsiColor.cs', renameTo: () => 'JHipsterNet/Boot/Ansi/AnsiColor.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Boot/BannerPrinter.cs', renameTo: () => 'JHipsterNet/Boot/BannerPrinter.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Pagination/Sort.cs', renameTo: () => 'JHipsterNet/Pagination/Sort.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Pagination/SortExpression.cs', renameTo: () => 'JHipsterNet/Pagination/SortExpression.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Pagination/SortExpressions.cs', renameTo: () => 'JHipsterNet/Pagination/SortExpressions.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Pagination/Order.cs', renameTo: () => 'JHipsterNet/Pagination/Order.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Pagination/Page.cs', renameTo: () => 'JHipsterNet/Pagination/Page.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Pagination/PageResponse.cs', renameTo: () => 'JHipsterNet/Pagination/PageResponse.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Pagination/Chunk.cs', renameTo: () => 'JHipsterNet/Pagination/Chunk.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'JHipsterNet/Pagination/Extensions/IQueryableExtensions.cs',
                    renameTo: () => 'JHipsterNet/Pagination/Extensions/IQueryableExtensions.cs',
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'JHipsterNet/Pagination/Extensions/QueryStringExtensions.cs',
                    renameTo: () => 'JHipsterNet/Pagination/Extensions/QueryStringExtensions.cs',
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Pagination/IPage.cs', renameTo: () => 'JHipsterNet/Pagination/IPage.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Pagination/IPageable.cs', renameTo: () => 'JHipsterNet/Pagination/IPageable.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Pagination/ISlice.cs', renameTo: () => 'JHipsterNet/Pagination/ISlice.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'JHipsterNet/Pagination/Binders/PageableBinderConfig.cs',
                    renameTo: () => 'JHipsterNet/Pagination/Binders/PageableBinderConfig.cs',
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'JHipsterNet/Pagination/Binders/PageableBinder.cs',
                    renameTo: () => 'JHipsterNet/Pagination/Binders/PageableBinder.cs',
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'JHipsterNet/Pagination/Binders/PageableBinderProvider.cs',
                    renameTo: () => 'JHipsterNet/Pagination/Binders/PageableBinderProvider.cs',
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Pagination/Pageable.cs', renameTo: () => 'JHipsterNet/Pagination/Pageable.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Config/JHipsterSettings.cs', renameTo: () => 'JHipsterNet/Config/JHipsterSettings.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/Logging/LoggerNameEnricher.cs', renameTo: () => 'JHipsterNet/Logging/LoggerNameEnricher.cs' }],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'JHipsterNet/JHipsterNet.csproj', renameTo: () => 'JHipsterNet/JHipsterNet.csproj' }],
        },
    ],
    docker: [
        {
            path: DOCKER_DIR,
            templates: ['app.yml', 'sonar.yml', 'monitoring.yml'],
        },
        {
            path: DOCKER_DIR,
            templates: [{ file: 'telegraf/telegraf.conf', renameTo: () => 'telegraf/telegraf.conf' }],
        },
        {
            path: DOCKER_DIR,
            templates: [{ file: 'kapacitor/config/kapacitor.conf', renameTo: () => 'kapacitor/config/kapacitor.conf' }],
        },
        {
            path: DOCKER_DIR,
            templates: [{ file: 'influxdb/config/influxdb.conf', renameTo: () => 'influxdb/config/influxdb.conf' }],
        },
        {
            path: DOCKER_DIR,
            templates: [
                { file: 'grafana/data/dashboard/default-dashboard.yaml', renameTo: () => 'grafana/data/dashboard/default-dashboard.yaml' },
            ],
        },
        {
            path: DOCKER_DIR,
            templates: [
                { file: 'grafana/data/dashboard/Docker Monitoring.json', renameTo: () => 'grafana/data/dashboard/Docker Monitoring.json' },
            ],
        },
        {
            path: DOCKER_DIR,
            templates: [{ file: 'grafana/data/provisioning/influxdb.yml', renameTo: () => 'grafana/data/provisioning/influxdb.yml' }],
        },
        {
            path: '',
            templates: [{ file: 'SonarAnalysis.ps1', renameTo: () => 'SonarAnalysis.ps1' }],
        },
        {
            path: '',
            templates: [{ file: 'SonarQube.Analysis.xml', renameTo: () => 'SonarQube.Analysis.xml' }],
        },
        {
            condition: generator => generator.authenticationType === 'oauth2',
            path: DOCKER_DIR,
            templates: [
                'keycloak.yml',
                {
                    file: 'keycloak/config/realm-config/jhipster-realm.json',
                    renameTo: () => 'keycloak/config/realm-config/jhipster-realm.json',
                },
                {
                    file: 'keycloak/config/realm-config/jhipster-users-0.json',
                    method: 'copy',
                    renameTo: () => 'keycloak/config/realm-config/jhipster-users-0.json',
                },
            ],
        },
    ],
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
};

function writeFiles() {
    return {
        writeFiles() {
            this.writeFilesToDisk(serverFiles, this, false, 'dotnetcore');
        },
    };
}

module.exports = {
    serverFiles,
    writeFiles,
};
