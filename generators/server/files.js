/**
 * Copyright 2019-2021 the original author or authors from the JHipster project.
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
const mkdirp = require('mkdirp');
const constants = require('../generator-dotnetcore-constants');

/* Constants use throughout */
const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;
const SERVER_TEST_DIR = constants.SERVER_TEST_DIR;
const DOCKER_DIR = constants.DOCKER_DIR;
const PROJECT_DOMAIN_SUFFIX = constants.PROJECT_DOMAIN_SUFFIX;
const PROJECT_DTO_SUFFIX = constants.PROJECT_DTO_SUFFIX;
const PROJECT_CROSSCUTTING_SUFFIX = constants.PROJECT_CROSSCUTTING_SUFFIX;
const PROJECT_INFRASTRUCTURE_SUFFIX = constants.PROJECT_INFRASTRUCTURE_SUFFIX;
const PROJECT_SERVICE_SUFFIX = constants.PROJECT_SERVICE_SUFFIX;
const TERRAFORM_DIR = constants.TERRAFORM_DIR;

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
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain.Services/Project.csproj',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_SERVICE_SUFFIX}/${generator.pascalizedBaseName}${PROJECT_SERVICE_SUFFIX}.csproj`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Infrastructure/Project.csproj',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}.csproj`,
                },
            ],
        },
    ],
    domainFiles: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Entities/Interfaces/IAuditedEntityBase.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Entities/Interfaces/IAuditedEntityBase.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Entities/AuditedEntityBase.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Entities/AuditedEntityBase.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Entities/User.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Entities/User.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Entities/Role.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Entities/Role.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Entities/UserRole.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Entities/UserRole.cs`,
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
        {
            condition: generator => generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Security/UsernameNotFoundException.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Exceptions/UsernameNotFoundException.cs`,
                },
            ],
        },
        {
            condition: generator => generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Security/UserNotActivatedException.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Exceptions/UserNotActivatedException.cs`,
                },
            ],
        },
    ],
    dtoFiles: [
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Dto/ManagedUserDto.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}/ManagedUserDto.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
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
            condition: generator => generator.applicationType !== 'microservice',
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
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
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
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Dto/LoginDto.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}/Authentication/LoginDto.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Dto/SwaggerResourceDto.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}/SwaggerResourceDto.cs`,
                },
            ],
        },
    ],
    services: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Services/Interfaces/ServicesInterfacesAssemblyHelper.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Services/Interfaces/ServicesInterfacesAssemblyHelper.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain.Services/ServicesClassesAssemblyHelper.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_SERVICE_SUFFIX}/ServicesClassesAssemblyHelper.cs`,
                },
            ],
        },
    ],
    repository: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Repositories/Interfaces/IFluentRepository.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Repositories/Interfaces/IFluentRepository.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Repositories/Interfaces/IGenericRepository.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Repositories/Interfaces/IGenericRepository.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Repositories/Interfaces/IUnitOfWork.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Repositories/Interfaces/IUnitOfWork.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Infrastructure/Data/Repositories/FluentRepository.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/Repositories/FluentRepository.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Infrastructure/Data/Repositories/GenericRepository.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/Repositories/GenericRepository.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Infrastructure/Data/Repositories/UnitOfWork.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/Repositories/UnitOfWork.cs`,
                },
            ],
        },
    ],
    dataExtensions: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Infrastructure/Data/Extensions/DbSetExtensions.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/Extensions/DbSetExtensions.cs`,
                },
                {
                    file: 'Project.Infrastructure/Data/Extensions/PropertyAccessorCache.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/Extensions/PropertyAccessorCache.cs`,
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
                    file: 'Project.Infrastructure/Configuration/SecuritySettings.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${constants.PROJECT_INFRASTRUCTURE_SUFFIX}/Configuration/SecuritySettings.cs`,
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
                    file: 'Project/Configuration/ConfigurationHelper.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/ConfigurationHelper.cs`,
                },
            ],
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
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
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
                    file: 'Project/Configuration/AppSettingsStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/AppSettingsStartup.cs`,
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
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Configuration/ServiceStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/ServiceStartup.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Configuration/RepositoryStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/RepositoryStartup.cs`,
                },
            ],
        },
    ],
    serverUserManagement: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Infrastructure/Data/ApplicationDatabaseContext.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/ApplicationDatabaseContext.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Services/Interfaces/IAuthenticationService.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Services/Interfaces/IAuthenticationService.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain.Services/AuthenticationService.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_SERVICE_SUFFIX}/AuthenticationService.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Services/Interfaces/IMailService.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Services/Interfaces/IMailService.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain.Services/MailService.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_SERVICE_SUFFIX}/MailService.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Services/Interfaces/IUserService.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/Services/Interfaces/IUserService.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain.Services/UserService.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_SERVICE_SUFFIX}/UserService.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Crosscutting/Utilities/RandomUtil.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Utilities/RandomUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Configuration/AutoMapper/AutoMapperProfile.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/AutoMapper/AutoMapperProfile.cs`,
                },
            ],
        },
        {
            condition: generator => generator.applicationType !== 'microservice',
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
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Controllers/UsersController.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Controllers/UsersController.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Controllers/AccountResourceIntTest.cs',
                    renameTo: generator => `${generator.testProjectDir}/Controllers/AccountResourceIntTest.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Controllers/UserJwtControllerIntTest.cs',
                    renameTo: generator => `${generator.testProjectDir}/Controllers/UserJwtControllerIntTest.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Controllers/UsersResourceIntTest.cs',
                    renameTo: generator => `${generator.testProjectDir}/Controllers/UsersResourceIntTest.cs`,
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
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
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
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
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
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/Web/Rest/Utilities/HeaderUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Web/Rest/Utilities/PaginationUtil.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/Web/Rest/Utilities/PaginationUtil.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Crosscutting/Exceptions/BaseException.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Exceptions/BaseException.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Crosscutting/Exceptions/BadRequestAlertException.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Exceptions/BadRequestAlertException.cs`,
                },
            ],
        },
        {
            condition: generator => generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Crosscutting/Exceptions/EmailAlreadyUsedException.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Exceptions/EmailAlreadyUsedException.cs`,
                },
            ],
        },
        {
            condition: generator => generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Crosscutting/Exceptions/EmailNotFoundException.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Exceptions/EmailNotFoundException.cs`,
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
                    file: 'Project.Crosscutting/Exceptions/InternalServerErrorException.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Exceptions/InternalServerErrorException.cs`,
                },
            ],
        },
        {
            condition: generator => generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Crosscutting/Exceptions/InvalidPasswordException.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Exceptions/InvalidPasswordException.cs`,
                },
            ],
        },
        {
            condition: generator => generator.applicationType !== 'microservice',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Crosscutting/Exceptions/LoginAlreadyUsedException.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Exceptions/LoginAlreadyUsedException.cs`,
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
                    file: 'Project.Test/Setup/AppWebApplicationFactory.cs',
                    renameTo: generator => `${generator.testProjectDir}/Setup/AppWebApplicationFactory.cs`,
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
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Controllers/SwaggerController.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Controllers/SwaggerController.cs`,
                },
            ],
        },
        {
            condition: generator => generator.authenticationType === 'jwt' && generator.applicationType !== 'microservice',
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
    serverServiceDiscovery: [
        {
            condition: generator =>
                generator.serviceDiscoveryType && generator.serviceDiscoveryType === 'consul' && generator.applicationType !== 'gateway',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Configuration/Consul/ConsulOptions.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/Consul/ConsulOptions.cs`,
                },
                {
                    file: 'Project/Configuration/Consul/ConsulStartup.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Configuration/Consul/ConsulStartup.cs`,
                },
            ],
        },
        {
            condition: generator => generator.serviceDiscoveryType && generator.serviceDiscoveryType === 'consul',
            path: DOCKER_DIR,
            templates: [
                'consul.yml',
                {
                    file: 'central-server-config/application.json',
                    method: 'copy',
                    renameTo: () => 'central-server-config/application.json',
                },
                {
                    file: 'central-server-config/README.md',
                    method: 'copy',
                    renameTo: () => 'central-server-config/README.md',
                },
            ],
        },
    ],
    serverGateway: [
        {
            condition: generator => generator.applicationType === 'gateway',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/ocelot.json',
                    renameTo: generator => `${generator.mainProjectDir}/ocelot.json`,
                },
            ],
        },
    ],
    terraform: [
        {
            condition: generator => generator.withTerraformAzureScripts,
            path: TERRAFORM_DIR,
            templates: ['main.tf', 'variables.tf', 'outputs.tf'],
        },
    ],
};

const gatlingTestsFiles = {
    gatlingTests: [
        {
            condition: generator => {
                if (generator.gatlingTests) {
                    mkdirp(`${SERVER_TEST_DIR}gatling/user-files/data`);
                    mkdirp(`${SERVER_TEST_DIR}gatling/user-files/bodies`);
                    mkdirp(`${SERVER_TEST_DIR}gatling/user-files/simulations`);
                    return true;
                }
                return false;
            },
            path: SERVER_TEST_DIR,
            templates: [
                // Create Gatling test files
                'gatling/conf/gatling.conf',
                'gatling/conf/logback.xml',
            ],
        },
    ],
};

const baseServiceDiscoveryFiles = {
    baseServiceDiscovery: [
        {
            condition: generator => generator.serviceDiscoveryType && generator.serviceDiscoveryType === 'consul',
            path: DOCKER_DIR,
            templates: [{ file: 'config/git2consul.json', method: 'copy' }],
        },
    ],
};

function writeFiles() {
    return {
        writeFiles() {
            this.writeFilesToDisk(serverFiles, this, false, 'dotnetcore');
        },
        writeFilesGatling() {
            this.writeFilesToDisk(gatlingTestsFiles, this, false, this.fetchFromInstalledJHipster('server/templates/src'));
        },
        writeFilesBaseServiceDiscovery() {
            this.writeFilesToDisk(baseServiceDiscoveryFiles, this, false, this.fetchFromInstalledJHipster('server/templates/src/main'));
        },
        writeDirectoryTargetsFile() {
            this.fs.copyTpl(
                this.templatePath(`dotnetcore/${constants.SERVER_SRC_DIR}/Directory.Build.targets`),
                this.destinationPath('Directory.Build.targets'),
                this
            );
        },
    };
}

module.exports = {
    serverFiles,
    writeFiles,
};
