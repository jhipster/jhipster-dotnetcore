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

const files = {
    docker: [
        {
            templates: [{ file: 'Dockerfile-Back', renameTo: () => 'Dockerfile-Back' }],
        },
        {
            templates: [{ file: 'docker-entrypoint-back.sh', renameTo: () => 'docker-entrypoint-back.sh' }],
        },
        {
            condition: generator => generator.clientFramework === constants.BLAZOR,
            templates: [{ file: 'Dockerfile-Front', renameTo: () => 'Dockerfile-Front' }],
        },
        {
            condition: generator => generator.clientFramework === constants.BLAZOR,
            templates: [{ file: 'docker-entrypoint-front.sh', renameTo: () => 'docker-entrypoint-front.sh' }],
        },
        {
            condition: generator => generator.clientFramework === constants.BLAZOR,
            templates: [{ file: 'nginx.conf', renameTo: () => 'nginx.conf' }],
        },
        {
            condition: generator => generator.clientFramework === constants.BLAZOR,
            templates: [{ file: 'default.conf', renameTo: () => 'default.conf' }],
        },
        {
            templates: [{ file: 'dockerignore', renameTo: () => '.dockerignore', method: 'copy' }],
        },
    ],
    general: [
        {
            templates: [{ file: 'README.md' }],
        },
        {
            templates: [
                { file: 'gitignore', renameTo: () => '.gitignore', method: 'copy' },
                { file: 'editorconfig', renameTo: () => '.editorconfig', method: 'copy' },
            ],
        },
    ],
};

const jhipsterCommonFiles = {
    global: [
        {
            templates: [{ file: 'gitattributes', renameTo: () => '.gitattributes', method: 'copy' }],
        },
    ],
};

function writeFiles() {
    return {
        writeFiles() {
            this.writeFilesToDisk(files, this, false, 'dotnetcore');
        },
    };
}

module.exports = {
    writeFiles,
    files,
    jhipsterCommonFiles,
};
