/**
 * Copyright 2013-2019 the original author or authors from the JHipster project.
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
// const SERVER_TEST_DIR = constants.SERVER_TEST_DIR;

const angularFiles = require('generator-jhipster/generators/client/files-angular').files;

var fileDestinationMapping = {
    common: (generator) => `${SERVER_SRC_DIR}/${generator.mainProjectDir}`,
    sass: (generator) => `${SERVER_SRC_DIR}/${generator.mainClientDir}`,
    image: (generator) => `${SERVER_SRC_DIR}/${generator.mainClientDir}`,
    swagger: (generator) => `${SERVER_SRC_DIR}/${generator.mainClientDir}`,
    commonWeb: (generator) => `${SERVER_SRC_DIR}/${generator.mainClientDir}`,
    angularApp: (generator) => `${SERVER_SRC_DIR}/${generator.mainAngularDir}`,
    angularMain: (generator) => `${SERVER_SRC_DIR}/${generator.mainAngularDir}`,
    angularAccountModule: (generator) => `${SERVER_SRC_DIR}/${generator.mainAngularDir}`,
    angularAdminModule: (generator) => `${SERVER_SRC_DIR}/${generator.mainAngularDir}`,
    angularCore: (generator) => `${SERVER_SRC_DIR}/${generator.mainAngularDir}`,
    angularShared: (generator) => `${SERVER_SRC_DIR}/${generator.mainAngularDir}`,
    angularAuthService: (generator) => `${SERVER_SRC_DIR}/${generator.mainAngularDir}`,
    clientTestFw: (generator) => `${SERVER_SRC_DIR}/${generator.mainAngularDir}`
};

var files =  {};

for (let i = 0, blocks = Object.keys(angularFiles); i < blocks.length; i++) {
    const blockKey = blocks[i];
    files[blockKey] = [];
    for (let j = 0, blockTemplates = angularFiles[blocks[i]]; j < blockTemplates.length; j++) {
        const blockTemplate = blockTemplates[j];
        var udpatedBlockTemplate = {};
        var previousPath = "";
        if (blockTemplate.path) {
            previousPath = blockTemplate.path;
            udpatedBlockTemplate.path = "";
        }
        if (blockTemplate.condition) {
            udpatedBlockTemplate.condition = blockTemplate.condition;
        }
        udpatedBlockTemplate.templates = blockTemplate.templates.map(templateObj => {
            var file = "";
            if (typeof templateObj === 'string') {
                file = templateObj;
            } else {
                if (typeof templateObj.file === 'string') {
                    file = templateObj.file;
                } else if (typeof templateObj.file === 'function') {
                    file = templateObj.file(generator);
                }
            }
            var updatedTemplateObj = {
                file: `${previousPath}/${file}`,
                renameTo: (generator) => `${fileDestinationMapping[blockKey](generator)}/${file}`
            };
            if(templateObj.method) {
                updatedTemplateObj.method = templateObj.method;
            }
            return updatedTemplateObj;
        });
        files[blockKey].push(udpatedBlockTemplate);
    }
}

function updateWebPackCommonJs() {
    this.replaceContent(
        `${SERVER_SRC_DIR}/${this.mainProjectDir}/webpack/webpack.common.js`,
        "src/main/webapp",
        this.mainClientDir,
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}/${this.mainProjectDir}/webpack/webpack.common.js`,
        "src\\/main\\/webapp\\/",
        `${this.mainClientDir}/`.replace(new RegExp("/", "g"), "\\/"),
        false
    );
}

function updateProxyConfJson() {
    this.replaceContent(
        `${SERVER_SRC_DIR}/${this.mainProjectDir}/proxy.conf.json`,
        "\"target\": \"http://localhost:8080\"",
        "\"target\": \"http://localhost:5000\"",
        false
    );
}

function updateTsConfigJson() {
    this.replaceContent(
        `${SERVER_SRC_DIR}/${this.mainProjectDir}/tsconfig.json`,
        "src/main/webapp",
        this.mainClientDir,
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}/${this.mainProjectDir}/tsconfig.json`,
        "\"outDir\": \".*\"",
        "\"outDir\": \"wwwwroot/app\"",
        true
    );
}

function updatePackageJson() {
    this.replaceContent(
        `${SERVER_SRC_DIR}/${this.mainProjectDir}/package.json`,
        "\"cleanup\": \".*\"",
        "\"cleanup\": \"rimraf bin/aot && rimraf wwwroot/*\"",
        true
    );

    this.replaceContent(
        `${SERVER_SRC_DIR}/${this.mainProjectDir}/package.json`,
        "\"clean-www\": \".*\"",
        "\"clean-www\": \"wwwroot/{src,target/}\"",
        true
    );
}
function updateHomeTitle() {
    this.replaceContent(
        `${SERVER_SRC_DIR}/${this.mainClientDir}/app/home/home.component.html`,
        "Java",
        ".Net Core",
        false
    );
}

function writeFiles() {
    this.writeFilesToDisk(files, this, false, this.fetchFromInstalledJHipster('client/templates/angular'));
    updateWebPackCommonJs.call(this);
    updateProxyConfJson.call(this);
    updateTsConfigJson.call(this);
    updatePackageJson.call(this);
    updateHomeTitle.call(this);
}

module.exports = {
    writeFiles,
    files
};
