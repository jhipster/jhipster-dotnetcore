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

const serverFiles = {
    server: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project/Models/Entity.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Models/${generator.asEntity(generator.entityClass)}.cs`,
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
                    renameTo: generator => `${generator.mainProjectDir}/Models/Interfaces/IJoinedEntity.cs`,
                },
                {
                    file: 'Project/Models/RelationshipTools/JoinListFacade.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Models/RelationshipTools/JoinListFacade.cs`,
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
                    renameTo: generator => `${generator.mainProjectDir}/Data/ApplicationDatabaseContext.cs`,
                },
                {
                    file: 'Project/Data/Extensions/DbContextExtensions.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Data/Extensions/DbContextExtensions.cs`,
                },
                {
                    file: 'Project/Data/Extensions/DbSetExtensions.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Data/Extensions/DbSetExtensions.cs`,
                },
                {
                    file: 'Project/Data/Extensions/PropertyAccessorCache.cs',
                    renameTo: generator => `${generator.mainProjectDir}/Data/Extensions/PropertyAccessorCache.cs`,
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
                                            `${generator.mainProjectDir}/Models/${relationship.joinEntityNamePascalized}.cs`,
                                    },
                                ],
                            },
                        ],
                    };
                    this.currentRelation = relationship.joinEntityNamePascalized;
                    this.writeFilesToDisk(files, this, false, 'dotnetcore');
                }
            });
            this.writeFilesToDisk(serverFiles, this, false, 'dotnetcore');
        },
    };
}

module.exports = {
    serverFiles,
    writeFiles,
};
