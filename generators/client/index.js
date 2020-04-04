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
const path = require('path');
const chalk = require('chalk');
const _ = require('lodash');
const ClientGenerator = require('generator-jhipster/generators/client');
// eslint-disable-next-line import/no-extraneous-dependencies
const toPascalCase = require('to-pascal-case');
const fs = require('fs');
const constants = require('../generator-dotnetcore-constants');

const writeAngularFiles = require('./files-angular').writeFiles;
const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;

module.exports = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint dotnetcore')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupClientOptions(this, jhContext);

        this.options.outputPathCustomizer = paths => (paths ? paths.replace(/^src\/main\/webapp([/$])/, 'src/main/webapp2$1') : undefined);  
    }

    get initializing() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._initializing();
    }

    get prompting() {
        // The prompting phase is being overriden so that we can ask our own questions
        // return {
        //     askForClient: prompts.askForClient,
        //     askForClientSideOpts: prompts.askForClientSideOpts,

        //     setSharedConfigOptions() {
        //         this.configOptions.lastQuestion = this.currentQuestion;
        //         this.configOptions.totalQuestions = this.totalQuestions;
        //         this.configOptions.clientFramework = this.clientFramework;
        //         this.configOptions.useSass = this.useSass;
        //     }
        // };
        // If the prompts need to be overriden then use the code commented out above instead
        //        return super._prompting();
        return {};
    }

    get configuring() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        const phaseFromJHipster = super._configuring();

        const customPhaseSteps = {
            configureGlobalDotnetcore() {
                this.camelizedBaseName = _.camelCase(this.baseName);
                this.dasherizedBaseName = _.kebabCase(this.baseName);
                this.pascalizedBaseName = toPascalCase(this.baseName);
                this.lowercaseBaseName = this.baseName.toLowerCase();
                this.humanizedBaseName = _.startCase(this.baseName);
                this.solutionName = this.pascalizedBaseName;
                this.mainProjectDir = this.pascalizedBaseName;
                this.mainClientDir = `${this.mainProjectDir}/ClientApp`;
                this.mainAngularDir = `${this.mainProjectDir}/ClientApp/app`;
                this.relativeMainClientDir = 'ClientApp';
                this.relativeMainAngularDir = `${this.relativeMainClientDir}/app`;
                this.MAIN_SRC_DIR = `${this.relativeMainClientDir}/`;
                this.testProjectDir = `${this.pascalizedBaseName}${constants.PROJECT_TEST_SUFFIX}`;
            },
            saveConfigDotnetcore() {
                const config = {};
                this.config.set(config);
            },
            
        };
        //return Object.assign(phaseFromJHipster, customPhaseSteps);r
        return phaseFromJHipster; 
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        // The writing phase is being overriden so that we can write our own templates as well.
        // If the templates doesnt need to be overrriden then just return `super._writing()` here
        const customPhase = {
            writeAngularFilesDotnetcore() {
                writeAngularFiles.call(this);
            }
        };
        return jhipsterPhase;
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
                    this.spawnCommandSync('npm', ['install'], { cwd: `${constants.SERVER_SRC_DIR}${this.mainProjectDir}`});
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
                    this.spawnCommandSync('npm', ['--prefix', `${constants.SERVER_SRC_DIR}${this.mainProjectDir}`, 'run', 'cleanup']);
                }
            }
        };
        return customPhase;
    }
};
