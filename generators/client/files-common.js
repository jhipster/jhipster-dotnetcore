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

function updateWebpackCommonJs() {
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/webpack/webpack.common.js`,
        `${SERVER_SRC_DIR}${this.mainProjectDir}/`,
        "",
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/webpack/webpack.common.js`,
        `src\\/${this.mainProjectDir}\\/`,
        "",
        false
    );
}

function updateWebpackDevJs() {
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/webpack/webpack.dev.js`,
        `${SERVER_SRC_DIR}${this.mainProjectDir}/`,
        "",
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/webpack/webpack.dev.js`,
        'path: utils.root(.*),',
        "path: utils.root('wwwroot'),",
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/webpack/webpack.dev.js`,
        "contentBase: '.*'",
        "contentBase: './wwwroot'",
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/webpack/webpack.dev.js`,
        'cacheDirectory: path.resolve(.*)',
        "cacheDirectory: path.resolve('bin/cache-loader')",
        true
    );
}

function updateWebpackProdJs() {
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/webpack/webpack.prod.js`,
        `${SERVER_SRC_DIR}${this.mainProjectDir}/`,
        "",
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/webpack/webpack.prod.js`,
        'path: utils.root(.*),',
        "path: utils.root('wwwroot'),",
        true
    );
}

function updateProxyConfJson() {
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/proxy.conf.json`,
        '"target": "http://localhost:8080"',
        '"target": "http://localhost:5000"',
        false
    );
}

function updateTsConfigJson() {
    this.replaceContent(`${SERVER_SRC_DIR}${this.mainProjectDir}/tsconfig.json`, `${SERVER_SRC_DIR}${this.mainProjectDir}/`,"", true);
    this.replaceContent(`${SERVER_SRC_DIR}${this.mainProjectDir}/tsconfig.app.json`, `${SERVER_SRC_DIR}${this.mainProjectDir}/`,"", true);
    this.replaceContent(`${SERVER_SRC_DIR}${this.mainProjectDir}/tsconfig.json`, '"outDir": ".*"', '"outDir": "wwwwroot/app"', true);
}

function updatePackageJson() {
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/package.json`,
        '"cleanup": ".*"',
        '"cleanup": "rimraf bin/aot && rimraf wwwroot/*"',
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/package.json`,
        '"clean-www": ".*"',
        '"clean-www": "rimraf wwwroot/{src,target/}"',
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/package.json`,
        'src/test/javascript',
        `${this.relativeMainTestDir}`,
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/package.json`,
        `${SERVER_SRC_DIR}${this.mainProjectDir}/${this.relativeMainTestDir}`,
        `${this.relativeMainTestDir}`,
        false
    );
}

function updateJestConf(){
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainClientDir}/test/jest.conf.js`,
        '/src/test/javascript',
        `/${this.relativeMainTestDir}`,
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainClientDir}/test/jest.conf.js`,
        '\\.\\./\\.\\./\\.\\.',
        '../..',
        true
    );
}

function updateEsLinIgnore(){
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/.eslintignore`,
        'src/test/javascript',
        `${this.relativeMainTestDir}`,
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainProjectDir}/tsconfig.e2e.json`,
        `/${SERVER_SRC_DIR}${this.mainProjectDir}`,
        "",
        true
    );
}

function updateTestFramework(){
    if(this.protractorTests){    
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/test/protractor.conf.js`,
            'http://localhost:8080',
            'http://localhost:5000',
            false
        );
    }
}

function writeFiles() {
    updateWebpackCommonJs.call(this);
    updateWebpackDevJs.call(this);
    updateWebpackProdJs.call(this);
    updateProxyConfJson.call(this);
    updateTsConfigJson.call(this);
    updatePackageJson.call(this);    
    updateJestConf.call(this);
    updateEsLinIgnore.call(this);
    updateTestFramework.call(this);
}

module.exports = {
    writeFiles,
};
