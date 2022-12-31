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
const chalk = require('chalk');
const _ = require('lodash');
const toPascalCase = require('to-pascal-case');
const CommonGenerator = require('generator-jhipster/generators/common');
const packagejs = require('../../package.json');
// eslint-disable-next-line import/no-extraneous-dependencies,import/order
const writeFiles = require('./files').writeFiles;
const jhipsterCommonFiles = require('./files').jhipsterCommonFiles;

module.exports = class extends CommonGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint dotnetcore')}`);
        }

        if (this.configOptions.baseName) {
            this.baseName = this.configOptions.baseName;
        }
    }

    get initializing() {
        return {
            ...super._initializing(),
            configureGlobal() {
                this.kebabCasedBaseName = _.kebabCase(this.baseName);
                this.pascalizedBaseName = toPascalCase(this.baseName);
                this.mainProjectDir = this.pascalizedBaseName;
                this.mainClientDir = `${this.mainProjectDir}/ClientApp`;
                this.jhipsterDotnetVersion = packagejs.version;
                this.options.outputPathCustomizer = [
                    paths => (paths ? paths.replace(/^(\.prettierignore)$/, `src/${this.mainClientDir}/$1`) : paths),
                    paths => (paths ? paths.replace(/^(\.prettierrc)$/, `src/${this.mainClientDir}/$1`) : paths),
                    paths => (paths ? paths.replace(/^(package.json)$/, `src/${this.mainClientDir}/$1`) : paths),
                ];
            },
        };
    }

    get configuring() {
        return super._configuring();
    }

    get composing() {
        return super._composing();
    }

    get loading() {
        return super._loading();
    }

    get preparing() {
        return super._preparing();
    }

    get default() {
        return {};
    }

    get writing() {
        return {
            writeJhipsterCommonFile() {
                // Prettier configuration needs to be the first written files - all subgenerators considered - for prettier transform to work
                return this.writeFilesToDisk(jhipsterCommonFiles);
            },
            ...writeFiles(),
        };
    }
};
