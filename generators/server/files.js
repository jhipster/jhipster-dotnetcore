
const mkdirp = require('mkdirp');
const constants = require('../generator-dotnetcore-constants');

/* Constants use throughout */
const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;

const serverFiles = {

    serverCsProj: [
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Project.csproj', renameTo: generator =>`${generator.mainProjectDir}/${generator.pascalizedBaseName}.csproj`}]
        }
    ],
    serverWwwroot: [
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/wwwroot/.gitkeep',  method: 'copy', renameTo: generator =>`${generator.mainProjectDir}/wwwroot/.gitkeep`}]
        }
    ],
    serverProgram: [
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Program.cs', renameTo: generator =>`${generator.mainProjectDir}/Program.cs`}]
        }
    ],
    serverConfiguration: [
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Configuration/ApplicationSettings.cs', renameTo: generator =>`${generator.mainProjectDir}/Configuration/ApplicationSettings.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/appsettings.json', renameTo: generator =>`${generator.mainProjectDir}/appsettings.json`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/appsettings.Development.json', renameTo: generator =>`${generator.mainProjectDir}/appsettings.Development.json`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/appsettings.Production.json', renameTo: generator =>`${generator.mainProjectDir}/appsettings.Production.json`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Properties/launchSettings.json', renameTo: generator =>`${generator.mainProjectDir}/Properties/launchSettings.json`}]
        }

    ],
    serverStartup: [
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Startup.cs', renameTo: generator =>`${generator.mainProjectDir}/Startup.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Infrastructure/AutoMapperStartup.cs', renameTo: generator =>`${generator.mainProjectDir}/Infrastructure/AutoMapperStartup.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Infrastructure/Constants.cs', renameTo: generator =>`${generator.mainProjectDir}/Infrastructure/Constants.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Infrastructure/DatabaseStartup.cs', renameTo: generator =>`${generator.mainProjectDir}/Infrastructure/DatabaseStartup.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Infrastructure/IdentityStartup.cs', renameTo: generator =>`${generator.mainProjectDir}/Infrastructure/IdentityStartup.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Infrastructure/MvcStartup.cs', renameTo: generator =>`${generator.mainProjectDir}/Infrastructure/MvcStartup.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Infrastructure/NhipsterStartup.cs', renameTo: generator =>`${generator.mainProjectDir}/Infrastructure/NhipsterStartup.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Infrastructure/ProblemDetailsStartup.cs', renameTo: generator =>`${generator.mainProjectDir}/Infrastructure/ProblemDetailsStartup.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Infrastructure/SecurityStartup.cs', renameTo: generator =>`${generator.mainProjectDir}/Infrastructure/SecurityStartup.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Infrastructure/SwaggerStartup.cs', renameTo: generator =>`${generator.mainProjectDir}/Infrastructure/SwaggerStartup.cs`}]
        }
    ],
    serverUserManagement: [
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Models/User.cs', renameTo: generator =>`${generator.mainProjectDir}/Models/User.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Models/Role.cs', renameTo: generator =>`${generator.mainProjectDir}/Models/Role.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Models/UserRole.cs', renameTo: generator =>`${generator.mainProjectDir}/Models/UserRole.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Models/Interfaces/IAuditedEntityBase.cs', renameTo: generator =>`${generator.mainProjectDir}/Models/IAuditedEntityBase.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Models/Vm/ManagedUserVM.cs', renameTo: generator =>`${generator.mainProjectDir}/Security/Models/Vm/ManagedUserVM.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Data/ApplicationDatabaseContext.cs', renameTo: generator =>`${generator.mainProjectDir}/Data/ApplicationDatabaseContext.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Service/AuthenticationService.cs', renameTo: generator =>`${generator.mainProjectDir}/Service/AuthenticationService.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Service/MailService.cs', renameTo: generator =>`${generator.mainProjectDir}/Service/MailService.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Service/UserService.cs', renameTo: generator =>`${generator.mainProjectDir}/Service/UserService.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Service/Dto/PasswordChangeDto.cs', renameTo: generator =>`${generator.mainProjectDir}/Service/Dto/PasswordChangeDto.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Service/Dto/UserDto.cs', renameTo: generator =>`${generator.mainProjectDir}/Service/Dto/UserDto.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Service/Mapper/UserMapper.cs', renameTo: generator =>`${generator.mainProjectDir}/Service/Mapper/UserMapper.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Service/Mapper/UserProfile.cs', renameTo: generator =>`${generator.mainProjectDir}/Service/Mapper/UserProfile.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Service/Utilities/RandomUtil.cs', renameTo: generator =>`${generator.mainProjectDir}/Service/Utilities/RandomUtil.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Controllers/AccountController.cs', renameTo: generator =>`${generator.mainProjectDir}/Service/Controllers/AccountController.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Controllers/UserController.cs', renameTo: generator =>`${generator.mainProjectDir}/Service/Controllers/UserController.cs`}]
        }
    ],
    serverAuthConfig: [
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Models/Vm/KeyAndPasswordVM.cs', renameTo: generator =>`${generator.mainProjectDir}/Models/Vm/KeyAndPasswordVM.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Models/Vm/LoginVM.cs', renameTo: generator =>`${generator.mainProjectDir}/Security/Models/Vm/LoginVM.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Security/BCryptPasswordHasher.cs', renameTo: generator =>`${generator.mainProjectDir}/Security/BCryptPasswordHasher.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Security/PoliciesConstants.cs', renameTo: generator =>`${generator.mainProjectDir}/Security/PoliciesConstants.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Security/RolesConstants.cs', renameTo: generator =>`${generator.mainProjectDir}/Security/RolesConstants.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Security/UserNotActivatedException.cs', renameTo: generator =>`${generator.mainProjectDir}/Security/UserNotActivatedException.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Security/UsernameNotFoundException.cs', renameTo: generator =>`${generator.mainProjectDir}/Security/UsernameNotFoundException.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Security/Jwt/JwtConstants.cs', renameTo: generator =>`${generator.mainProjectDir}/Security/Jwt/JwtConstants.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Security/Jwt/RoleClaimsTransformation.cs', renameTo: generator =>`${generator.mainProjectDir}/Security/Jwt/RoleClaimsTransformation.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Security/Jwt/TokenProvider.cs', renameTo: generator =>`${generator.mainProjectDir}/Security/Jwt/TokenProvider.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Controllers/UserJwtController.cs', renameTo: generator =>`${generator.mainProjectDir}/Controllers/UserJwtController.cs`}]
        }
    ],
    serverToSort: [
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Extensions/ActionResultExtensions.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Extensions/ActionResultExtensions.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Extensions/ActionResultWithHeaders.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Extensions/ActionResultWithHeaders.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Extensions/HttpRequestExtensions.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Extensions/HttpRequestExtensions.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Filters/ValidateModelAttribute.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Filters/ValidateModelAttribute.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Utilities/ActionResultUtil.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Utilities/ActionResultUtil.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Utilities/HeaderUtil.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Utilities/HeaderUtil.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Utilities/PaginationUtil.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Utilities/PaginationUtil.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Utilities/PaginationUtil.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Utilities/PaginationUtil.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Utilities/PaginationUtil.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Utilities/PaginationUtil.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Utilities/PaginationUtil.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Utilities/PaginationUtil.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Utilities/PaginationUtil.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Problems/BadRequestAlertException.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Problems/BadRequestAlertException.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Problems/EmailAlreadyUsedException.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Problems/EmailAlreadyUsedException.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Problems/EmailNotFoundException.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Problems/EmailNotFoundException.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Problems/ErrorConstants.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Problems/ErrorConstants.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Problems/ExceptionTranslator.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Problems/ExceptionTranslator.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Problems/InternalServerErrorException.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Problems/InternalServerErrorException.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Problems/InvalidPasswordException.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Problems/InvalidPasswordException.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Problems/LoginAlreadyUsedException.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Problems/LoginAlreadyUsedException.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Problems/ProblemDetailsConfiguration.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Problems/ProblemDetailsConfiguration.cs`}]
        },
        {
            path: SERVER_SRC_DIR,
            templates: [{ file: 'Project/Web/Rest/Problems/ValidationFailedException.cs', renameTo: generator =>`${generator.mainProjectDir}/Web/Rest/Problems/ValidationFailedException.cs`}]
        }
    ]
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
