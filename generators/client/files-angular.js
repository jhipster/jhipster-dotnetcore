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

/* Constants use throughout */
const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;

function angularJson() {
    this.replaceContent(`${SERVER_SRC_DIR}${this.mainClientDir}/angular.json`, `${SERVER_SRC_DIR}${this.mainClientDir}/`, "", true);
    this.replaceContent(`${SERVER_SRC_DIR}${this.mainClientDir}/angular.json`, `target/classes/static/`, "dist/", true);
}

function updateHomeTitle() {
    this.replaceContent(`${SERVER_SRC_DIR}${this.mainClientAppDir}/app/home/home.component.html`, 'Java', '.Net Core', false);
}

function updateWebpackCustomJs() {
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.custom.js`,
        `${SERVER_SRC_DIR}${this.mainClientDir}/`,
        "",
        true
    );
}

function writeFiles() {
    angularJson.call(this);
    updateHomeTitle.call(this);
    updateWebpackCustomJs.call(this);
}

module.exports = {
    writeFiles,
};
