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
const baseConstants = require('generator-jhipster/generators/generator-constants');
const { ANGULAR, REACT, VUE } = baseConstants.SUPPORTED_CLIENT_FRAMEWORKS;

/* Constants use throughout */
const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;

function updateWebpackCommonJs() {
    if (this.clientFramework === VUE || this.clientFramework === REACT) {
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.common.js`,
            `${SERVER_SRC_DIR}${this.mainClientDir}/`,
            "",
            true
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.common.js`,
            `src\\/`,
            "",
            false
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.common.js`,
            "utils.root('src/main/webapp/index.html')",
            "utils.root('src/index.html')",
            false
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.common.js`,
            `main/webapp/`,
            "",
            true
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.common.js`,
            "target/classes/static/",
            "dist",
            true
        );
    }
}

function updateWebpackDevJs() {
    if (this.clientFramework === VUE || this.clientFramework === REACT) {
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.dev.js`,
            `${SERVER_SRC_DIR}${this.mainClientDir}/`,
            "",
            true
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.dev.js`,
            'path: utils.root(.*),',
            "path: utils.root('dist'),",
            true
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.dev.js`,
            "target/classes/static/",
            "dist",
            true
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.dev.js`,
            "contentBase: '.*'",
            "contentBase: './dist'",
            true
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.dev.js`,
            'cacheDirectory: path.resolve(.*)',
            "cacheDirectory: path.resolve('bin/cache-loader')",
            true
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.dev.js`,
            "target: `http${options.tls ? 's' : ''}://localhost:8080`",
            `target: \`http\${options.tls ? 's' : ''}://localhost:${this.serverPort}\``,
            false
        );
    }
}

function updateWebpackProdJs() {
    if (this.clientFramework === VUE || this.clientFramework === REACT) {
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.prod.js`,
            `${SERVER_SRC_DIR}${this.mainClientDir}/`,
            "",
            true
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.prod.js`,
            'path: utils.root(.*),',
            "path: utils.root('dist'),",
            true
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.dev.js`,
            "target/classes/static/",
            "dist",
            true
        );
    }
}

function updateTsConfigJson() {
    this.replaceContent(`${SERVER_SRC_DIR}${this.mainClientDir}/tsconfig.json`, '"outDir": ".*"', '"outDir": "dist/src/app"', true);
    this.replaceContent(`${SERVER_SRC_DIR}${this.mainClientDir}/tsconfig.json`, `${SERVER_SRC_DIR}${this.mainClientDir}/`, "", true);
    if (this.clientFramework === ANGULAR) {
        this.replaceContent(`${SERVER_SRC_DIR}${this.mainClientDir}/tsconfig.app.json`, `${SERVER_SRC_DIR}${this.mainClientDir}/`, "", true);
    }
}

function updateTsConfigSpecJson() {
    if (this.clientFramework === ANGULAR || this.clientFramework === VUE) {
        this.replaceContent(`${SERVER_SRC_DIR}${this.mainClientDir}/tsconfig.spec.json`, `${SERVER_SRC_DIR}${this.mainClientDir}/`, "", true);
    }
}

function updatePackageJson() {
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainClientDir}/package.json`,
        '"cleanup": ".*"',
        '"cleanup": "rimraf bin/aot && rimraf dist/*"',
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainClientDir}/package.json`,
        '"clean-www": ".*"',
        '"clean-www": "rimraf dist/{src,target/}"',
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainClientDir}/package.json`,
        'src/test/javascript',
        'test',
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainClientDir}/package.json`,
        `${SERVER_SRC_DIR}${this.mainClientDir}/`,
        '',
        true
    );
}

function updateJestConf() {
    if (this.clientFramework === ANGULAR || this.clientFramework === REACT) {
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/jest.conf.js`,
            '/src/test/javascript',
            `/test`,
            true
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/jest.conf.js`,
            `/${SERVER_SRC_DIR}${this.mainClientDir}`,
            "",
            true
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/jest.conf.js`,
            '\\.\\./\\.\\./\\.\\.',
            '..',
            true
        );
    } else if (this.clientFramework === VUE) {
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/test/jest.conf.js`,
            '/src/test/javascript',
            `/test`,
            true
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/test/jest.conf.js`,
            `/${SERVER_SRC_DIR}${this.mainClientDir}`,
            "",
            true
        );
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/test/jest.conf.js`,
            '\\.\\./\\.\\./\\.\\.',
            '..',
            true
        );
    }
}

function updateEsLinIgnore() {
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainClientDir}/.eslintignore`,
        'src/test/javascript',
        `/test`,
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainClientDir}/.eslintignore`,
        'target/',
        `dist/`,
        true
    );
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainClientDir}/.eslintignore`,
        `${SERVER_SRC_DIR}${this.mainClientDir}`,
        "",
        true
    );
    this.rewriteFile(
        `${SERVER_SRC_DIR}${this.mainClientDir}/.eslintignore`,
        'dist/',
        'test/cypress/'
    );
    if (this.protractorTests) {
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/tsconfig.e2e.json`,
            `/${SERVER_SRC_DIR}${this.mainClientDir}`,
            "",
            true
        );
    }
}

function updateEsLintrcJs() {
    if (this.clientFramework === VUE) {
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/.eslintrc.js`,
            'target/',
            `dist/`,
            true
        );
    }
}

function updateTestFramework() {
    if (this.protractorTests) {
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientDir}/test/protractor.conf.js`,
            'http://localhost:8080',
            `http://localhost:${this.serverPort}`,
            false
        );
    }
}

function updateVendor() {
    if (this.clientFramework === ANGULAR || this.clientFramework === VUE) {
        this.replaceContent(
            `${SERVER_SRC_DIR}${this.mainClientAppDir}/content/scss/vendor.scss`,
            `${SERVER_SRC_DIR}${this.mainClientDir}/src/content`,
            "..",
            true
        );
    }
}

function writeFiles() {
    updateWebpackCommonJs.call(this);
    updateWebpackDevJs.call(this);
    updateWebpackProdJs.call(this);
    updateTsConfigJson.call(this);
    updateTsConfigSpecJson.call(this);
    updatePackageJson.call(this);
    updateJestConf.call(this);
    updateEsLinIgnore.call(this);
    updateEsLintrcJs.call(this);
    updateTestFramework.call(this);
    updateVendor.call(this);
}

module.exports = {
    writeFiles,
};
