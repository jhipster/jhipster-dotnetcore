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
const angularFiles = require('generator-jhipster/generators/entity-client/files').angularFiles;
const constants = require('../generator-dotnetcore-constants');

/* Constants use throughout */
const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;

const fileDestinationMapping = {
    client: generator => `${SERVER_SRC_DIR}/${generator.mainAngularDir}`,
    test: generator => `${SERVER_SRC_DIR}/${generator.mainAngularDir}`
};

const files = {};

for (let i = 0, blocks = Object.keys(angularFiles); i < blocks.length; i++) {
    const blockKey = blocks[i];
    files[blockKey] = [];
    for (let j = 0, blockTemplates = angularFiles[blocks[i]]; j < blockTemplates.length; j++) {
        const blockTemplate = blockTemplates[j];
        const udpatedBlockTemplate = {};
        let previousPath = '';
        if (blockTemplate.path) {
            previousPath = blockTemplate.path;
            udpatedBlockTemplate.path = '';
        }
        if (blockTemplate.condition) {
            udpatedBlockTemplate.condition = blockTemplate.condition;
        }
        udpatedBlockTemplate.templates = blockTemplate.templates.map(templateObj => {
            let file = '';
            if (typeof templateObj === 'string') {
                file = templateObj;
            } else if (typeof templateObj.file === 'string') {
                file = templateObj.file;
            } else if (typeof templateObj.file === 'function') {
                file = templateObj.file(this);
            }
            let updatedTemplateObj;
            if (typeof templateObj.renameTo === 'function') {
                updatedTemplateObj = {
                    file: `${previousPath}/${file}`,
                    renameTo: generator => `${fileDestinationMapping[blockKey](generator)}/${templateObj.renameTo(generator)}`
                };
            } else {
                updatedTemplateObj = {
                    file: `${previousPath}/${file}`,
                    renameTo: generator => `${fileDestinationMapping[blockKey](generator)}/${file}`
                };
            }
            if (templateObj.method) {
                updatedTemplateObj.method = templateObj.method;
            }
            return updatedTemplateObj;
        });
        files[blockKey].push(udpatedBlockTemplate);
    }
}

function writeFiles() {
    return {
        writeClientFiles() {
            if (this.skipClient) return;

            // write client side files for angular 2.x +
            this.writeFilesToDisk(files, this, false, this.fetchFromInstalledJHipster('entity-client/templates/angular'));
            this.addEntityToModule(
                this.entityInstance,
                this.entityClass,
                this.entityAngularName,
                this.entityFolderName,
                this.entityFileName,
                this.entityUrl,
                this.clientFramework,
                this.microserviceName
            );
            this.addEntityToMenu(this.entityStateName, this.enableTranslation, this.clientFramework, this.entityTranslationKeyMenu);
        }
    };
}

module.exports = {
    writeFiles,
    files
};
