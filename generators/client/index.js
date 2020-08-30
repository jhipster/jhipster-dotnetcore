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
/* eslint-disable consistent-return */
const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');
// eslint-disable-next-line import/no-extraneous-dependencies
const constants = require('../generator-dotnetcore-constants');
const baseConstants = require('generator-jhipster/generators/generator-constants');
const configureGlobalDotnetcore = require('../utils').configureGlobalDotnetcore; 

const writeAngularFiles = require('./files-angular').writeFiles;
const writeReactFiles = require('./files-react').writeFiles;
const writeVueFiles = require('./files-vue').writeFiles;
const writeCommonFiles = require('./files-common').writeFiles;

const { ANGULAR, REACT, VUE } = baseConstants.SUPPORTED_CLIENT_FRAMEWORKS;

module.exports = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints dotnetcore')}`);
        }
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        return super._prompting();
    }

    get configuring() {
        const phaseFromJHipster = super._configuring();

        const customPhaseSteps = {
            loadSharedConfig() {
                this.loadAppConfig();
                this.loadClientConfig();
                this.loadServerConfig();
                this.loadTranslationConfig();
            },
            configureGlobalDotnetcore
        };
        
        return Object.assign(customPhaseSteps,phaseFromJHipster);
    }

    get default() {
        return super._default();
    }

    get writing() {
        // The writing phase is being overriden so that we can write our own templates as well.
        // If the templates doesnt need to be overrriden then just return `super._writing()` here        
        const phaseFromJHipster = super._writing();
        const customPhase = {
            writeAngularFilesDotnetcore() {
                if (this.skipClient) return;
                writeCommonFiles.call(this);
                switch (this.clientFramework) {
                    case REACT:
                        return writeReactFiles.call(this);
                    case ANGULAR:
                        return writeAngularFiles.call(this);
                    case VUE:
                        return writeVueFiles.call(this);
                    default:
                    // do nothing by default
                }
            }
        };
        return Object.assign(phaseFromJHipster, customPhase);
    }

    get install() {
        // Override default yeoman installDependencies
        const customPhase = {
            installDependencies() {
                if (!this.options['skip-install']) {
                    this.log(
                        `\n\nI'm all done. Running ${chalk.green.bold(
                            `npm install `
                        )}for you to install the required dependencies. If this fails, try running the command yourself.`
                    );
                    this.spawnCommandSync('npm', ['install'], { cwd: `${constants.SERVER_SRC_DIR}${this.mainClientDir}`});
                }
            }
        };
        return customPhase;
    }

    get end() {
        const customPhase = {
            end() {
                if (this.skipClient) return;
                this.log(chalk.green.bold('\nClient application generated successfully.\n'));

                if (!this.options['skip-install']) {
                    this.spawnCommandSync('npm', ['--prefix', `${constants.SERVER_SRC_DIR}${this.mainClientDir}`, 'run', 'cleanup']);
                }
            }
        };
        return customPhase;
    }
};
