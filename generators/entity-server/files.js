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
const baseConstants = require('generator-jhipster/generators/generator-constants');
const constants = require('../generator-dotnetcore-constants');
const utils = require('../utils');

/* Constants use throughout */

const INTERPOLATE_REGEX = baseConstants.INTERPOLATE_REGEX;
const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;
const SERVER_TEST_DIR = constants.SERVER_TEST_DIR;
const PROJECT_CROSSCUTTING_SUFFIX = constants.PROJECT_CROSSCUTTING_SUFFIX;
const PROJECT_SERVICE_SUFFIX = constants.PROJECT_SERVICE_SUFFIX;
const PROJECT_INFRASTRUCTURE_SUFFIX = constants.PROJECT_INFRASTRUCTURE_SUFFIX;

const serverFiles = {
    server: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Entities/Entity.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${constants.PROJECT_DOMAIN_SUFFIX}/Entities/${generator.asEntity(
                            generator.entityClass
                        )}.cs`,
                },
                {
                    file: 'Project/Controllers/EntityController.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Controllers/${generator.pascalizedEntityClassPlural}Controller.cs`,
                },
                {
                    file: 'Project.Domain/Repositories/Interfaces/IEntityRepository.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${constants.PROJECT_DOMAIN_SUFFIX}/Repositories/Interfaces/I${generator.asEntity(
                            generator.entityClass
                        )}Repository.cs`,
                },
                {
                    file: 'Project.Infrastructure/Data/Repositories/EntityRepository.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/Repositories/${generator.asEntity(
                            generator.entityClass
                        )}Repository.cs`,
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
            condition: generator => generator.dto === 'mapstruct',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Dto/Dto.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}/${generator.asDto(generator.entityClass)}.cs`,
                },
            ],
        },
        {
            condition: generator => generator.dto === 'mapstruct',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Dto/AuditedEntityBaseDto.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}/AuditedEntityBaseDto.cs`,
                },
            ],
        },
    ],
    db: [
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
    ],
    test: [
        {
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Controllers/EntityControllerIntTest.cs',
                    renameTo: generator =>
                        `${generator.testProjectDir}/Controllers/${generator.asEntity(generator.entityClass)}ControllerIntTest.cs`,
                },
            ],
        },
    ],
    service: [
        {
            condition: generator => generator.service === 'serviceImpl',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain.Services/Service.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_SERVICE_SUFFIX}/${generator.entityClass}Service.cs`,
                },
                {
                    file: 'Project.Domain/Services/Interfaces/IService.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${constants.PROJECT_DOMAIN_SUFFIX}/Services/Interfaces/I${generator.entityClass}Service.cs`,
                },
            ],
        },
    ],
};

const gatlingTestsFiles = {
    gatlingTests: [
        {
            condition: generator => generator.gatlingTests,
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'gatling/user-files/simulations/EntityGatlingTest.scala',
                    options: { interpolate: INTERPOLATE_REGEX },
                    renameTo: generator => `gatling/user-files/simulations/${generator.entityClass}GatlingTest.scala`,
                },
            ],
        },
    ],
};

function writeFiles() {
    return {
        writeServerFiles() {
            this.fields.forEach(field => {
                if (field.fieldIsEnum) {
                    if (!this.skipServer) {
                        const enumInfo = utils.getEnumInfo(field, this.clientRootFolder);
                        enumInfo.namespace = this.namespace;
                        const fieldType = field.fieldType;
                        this.template(
                            'dotnetcore/src/Project.Crosscutting/Enums/Enum.cs.ejs',
                            `src/${this.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Enums/${fieldType}.cs`,
                            this,
                            {},
                            enumInfo
                        );
                    }
                }
            });

            this.writeFilesToDisk(serverFiles, this, false, 'dotnetcore');
        },
        writeFilesGatling() {
            this.writeFilesToDisk(gatlingTestsFiles, this, false, this.fetchFromInstalledJHipster('entity-server/templates/src'));
        },
    };
}

module.exports = {
    serverFiles,
    writeFiles,
};
