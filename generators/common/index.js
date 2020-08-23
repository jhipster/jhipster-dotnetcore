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
const chalk = require('chalk');
const CommonGenerator = require('generator-jhipster/generators/common');
// eslint-disable-next-line import/no-extraneous-dependencies,import/order
const toPascalCase = require('to-pascal-case');
const _ = require('lodash');
const writeFiles = require('./files').writeFiles;
const configureGlobalDotnetcore = require('../utils').configureGlobalDotnetcore; 
const packagejs = require('../../package.json');

module.exports = class extends CommonGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint dotnetcore')}`);
        }
    }

    get initializing() {
        return super._initializing();
    }

    get configuring() {
        return super._configuring();
    }

    get default() {
        const phaseFromJHipster = super._default();

        const customPhaseSteps = {
            configureGlobalDotnetcore
        };

        return Object.assign(phaseFromJHipster,customPhaseSteps);
    }

    get writing() {
        const commonFiles = {
            global: [
                {
                    templates: [
                        {
                            file: 'gitattributes',
                            renameTo: () => '.gitattributes',
                            method: 'copy',
                        },
                        {
                            file: 'editorconfig',
                            renameTo: () => '.editorconfig',
                            method: 'copy',
                        },
                    ],
                },
            ],
        };

        function writeCommonFiles() {
            return {
                writeFiles() {
                    this.writeFilesToDisk(commonFiles, this, false, this.fetchFromInstalledJHipster('common/templates'));
                },
            };
        }

        const phaseFromJHipster = writeCommonFiles();
        const jhipsterNetPhaseSteps = writeFiles();
        return Object.assign(phaseFromJHipster, jhipsterNetPhaseSteps);
    }
};
