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
const utils = require('../utils');

/* Constants use throughout */
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
                    file: 'Project/Models/Entity.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${constants.PROJECT_DOMAIN_SUFFIX}/Entities/${generator.asEntity(
                            generator.entityClass
                        )}.cs`,
                },
                {
                    file: 'Project/Controllers/EntityController.cs',
                    renameTo: generator =>
                        `${generator.mainProjectDir}/Controllers/${generator.asEntity(generator.entityClass)}Controller.cs`,
                },
            ],
        },
        {
            condition: generator => generator.entityClassHasManyToMany,
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/Interfaces/IJoinedEntity.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${constants.PROJECT_DOMAIN_SUFFIX}/Entities/Interfaces/IJoinedEntity.cs`,
                },
                {
                    file: 'Project/Models/RelationshipTools/JoinListFacade.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${constants.PROJECT_DOMAIN_SUFFIX}/Entities/RelationshipTools/JoinListFacade.cs`,
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
    ],
    db: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Data/ApplicationDatabaseContext.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/ApplicationDatabaseContext.cs`,
                },
                {
                    file: 'Project/Data/Extensions/DbContextExtensions.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/Extensions/DbContextExtensions.cs`,
                },
                {
                    file: 'Project/Data/Extensions/DbSetExtensions.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/Extensions/DbSetExtensions.cs`,
                },
                {
                    file: 'Project/Data/Extensions/PropertyAccessorCache.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/Extensions/PropertyAccessorCache.cs`,
                },
            ],
        },
    ],
    test: [
        {
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Controllers/EntityResourceIntTest.cs',
                    renameTo: generator =>
                        `${generator.testProjectDir}/Controllers/${generator.asEntity(generator.entityClass)}ResourceIntTest.cs`,
                },
            ],
        },
    ],
    service: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Service/Service.cs',
                    renameTo: generator => `${generator.pascalizedBaseName}${PROJECT_SERVICE_SUFFIX}/${generator.entityClass}Service.cs`,
                },
                {
                    file: 'Project/Service/IService.cs',
                    renameTo: generator =>
                        `${generator.pascalizedBaseName}${constants.PROJECT_DOMAIN_SUFFIX}/Services/Interfaces/I${generator.entityClass}Service.cs`,
                },
            ],
        },
    ],
};

function writeFiles() {
    return {
        writeServerFiles() {
            this.relationships.forEach(relationship => {
                // const relationship = relationship;
                if (relationship.relationshipType === 'many-to-many') {
                    const files = {
                        server: [
                            {
                                condition: generator => generator.entityClassHasManyToMany,
                                path: SERVER_SRC_DIR,
                                templates: [
                                    {
                                        file: 'Project/Models/JoinEntity.cs',
                                        renameTo: generator =>
                                            `${generator.pascalizedBaseName}${constants.PROJECT_DOMAIN_SUFFIX}/Entities/${relationship.joinEntityNamePascalized}.cs`,
                                    },
                                ],
                            },
                        ],
                    };
                    this.currentRelation = relationship.joinEntityNamePascalized;
                    this.writeFilesToDisk(files, this, false, 'dotnetcore');
                }
            });

            this.fields.forEach(field => {
                if (field.fieldIsEnum) {
                    if (!this.skipServer) {
                        const enumInfo = utils.getEnumInfo(field, this.clientRootFolder);
                        enumInfo.namespace = this.namespace;
                        const fieldType = field.fieldType;
                        this.template(
                            'dotnetcore/src/Project/Models/Enum.cs.ejs',
                            `src/${this.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Enums/${fieldType}.cs`,
                            this,
                            {},
                            enumInfo
                        );
                    }
                }
            });

            if (!this.skipServer) {
                const services = this.entities
                    .filter(entity => entity.definition.service === 'serviceImpl')
                    .map(entity => {
                        return {
                            entityName: entity.name,
                            serviceInterface: `I${entity.name}Service`,
                            serviceClass: `${entity.name}Service`,
                        };
                    });

                // add current entity being created if it has service option selected
                if (this.service === 'serviceImpl' && !services.some(e => e.entityName === this.entityClass)) {
                    services.push({
                        entityName: this.entityClass,
                        serviceInterface: `I${this.entityClass}Service`,
                        serviceClass: `${this.entityClass}Service`,
                    });
                }

                const files = {
                    server: [
                        {
                            path: SERVER_SRC_DIR,
                            templates: [
                                {
                                    file: 'Project/Service/Extensions/ServiceStartup.cs',
                                    renameTo: generator => `${generator.mainProjectDir}/Infrastructure/ServiceStartup.cs`,
                                },
                            ],
                        },
                    ],
                };

                this.services = services;
                this.writeFilesToDisk(files, this, false, 'dotnetcore');
            }

            this.writeFilesToDisk(serverFiles, this, false, 'dotnetcore');
        },
    };
}

module.exports = {
    serverFiles,
    writeFiles,
};
