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
const PROJECT_DOMAIN_SUFFIX = constants.PROJECT_DOMAIN_SUFFIX;
const PROJECT_DTO_SUFFIX = constants.PROJECT_DTO_SUFFIX;
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
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Project.csproj',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}.csproj`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Dto/Project.csproj',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_DTO_SUFFIX}/${generator.pascalizedBaseName}${PROJECT_DTO_SUFFIX}.csproj`,
                },
            ],
        },
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
    domainFiles: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/Interfaces/IAuditedEntityBase.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Interfaces/IAuditedEntityBase.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/User.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/User.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/Role.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Role.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/UserRole.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/UserRole.cs`,
                },
            ],
        },
    ],
    crosscuttingFiles: [
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
                    file: 'Project.Crosscutting/Constants/ErrorConstants.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Constants/ErrorConstants.cs`,
                },
            ],
        },
    ],
    dtoFiles: [
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Dto/ManagedUserDto.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}/ManagedUserDto.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Dto/PasswordChangeDto.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}/Authentication/PasswordChangeDto.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Dto/UserDto.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}/UserDto.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Dto/ProfileInfoDto.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}/ProfileInfo/ProfileInfoDto.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Dto/KeyAndPasswordDto.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}/Authentication/KeyAndPasswordDto.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Dto/LoginDto.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}/Authentication/LoginDto.cs`,
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
                    file: 'Project/Configuration/JHipsterSettings.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/JHipsterSettings.cs`,
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
                    file: 'Project/Configuration/AutoMapperStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/AutoMapperStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Configuration/DatabaseStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/DatabaseStartup.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Configuration/IdentityStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/IdentityStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Configuration/MvcStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/MvcStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Configuration/NhipsterStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/NhipsterStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Configuration/ProblemDetailsStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/ProblemDetailsStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Configuration/SecurityStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/SecurityStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Configuration/SwaggerStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/SwaggerStartup.cs`,
                },
            ],
        },
    ],
    serverUserManagement: [
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
                    file: 'Project/Service/Utilities/RandomUtil.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Service/Utilities/RandomUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Service/Mapper/AutoMapperProfile.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Service/Mapper/AutoMapperProfile.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Service/Mapper/AutoMapperProfile.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Service/Mapper/AutoMapperProfile.cs`,
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
                    file: 'Project.Test/Configuration/TestMvcStartup.cs',
                    renameTo: generator => `${generator.testProjectDir}/Configuration/TestMvcStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Setup/MockClaimsPrincipalProvider.cs',
                    renameTo: generator => `${generator.testProjectDir}/Configuration/MockClaimsPrincipalProvider.cs`,
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
