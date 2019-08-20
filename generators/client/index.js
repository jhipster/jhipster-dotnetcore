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
/* eslint-disable consistent-return */
const chalk = require('chalk');
const _ = require('lodash');
const ClientGenerator = require('generator-jhipster/generators/client');
// eslint-disable-next-line import/no-extraneous-dependencies
const toPascalCase = require('to-pascal-case');
const fs = require('fs');
const constants = require('../generator-dotnetcore-constants');

const writeAngularFiles = require('./files-angular').writeFiles;

module.exports = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint dotnetcore')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupClientOptions(this, jhContext);
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
                this.testProjectDir = `${this.pascalizedBaseName}${constants.PROJECT_TEST_SUFFIX}`;
                // TODO PROMPT
                this.authenticationType = 'jwt';
            },
            saveConfigDotnetcore() {
                const config = {};
                this.config.set(config);
            },
            configuringNeedlesNetBlueprint() {
                const needleClientAngular = this.fetchFromInstalledJHipster('client/needle-api/needle-client-angular.js');
                // modify path in needle-client-angular
                fs.readFile(needleClientAngular, 'utf8', (err, data) => {
                    if (err) {
                        return console.log(err);
                    }
                    const result = data.replace(
                        /CLIENT_MAIN_SRC_DIR =(.*);/,
                        `CLIENT_MAIN_SRC_DIR = '${constants.SERVER_SRC_DIR}${this.mainProjectDir}/ClientApp/';`
                    );

                    fs.writeFile(needleClientAngular, result, 'utf8', err => {
                        if (err) return console.log(err);
                    });
                });

                const needleClientI18n = this.fetchFromInstalledJHipster('client/needle-api/needle-client-i18n.js');
                // modify path in needle-client-i18n
                fs.readFile(needleClientI18n, 'utf8', (err, data) => {
                    if (err) {
                        return console.log(err);
                    }
                    const result = data.replace(
                        /CLIENT_MAIN_SRC_DIR =(.*);/,
                        `CLIENT_MAIN_SRC_DIR = '${constants.SERVER_SRC_DIR}${this.mainProjectDir}/ClientApp/';`
                    );

                    fs.writeFile(needleClientI18n, result, 'utf8', err => {
                        if (err) return console.log(err);
                    });
                });

                const needleClient = this.fetchFromInstalledJHipster('client/needle-api/needle-client.js');
                // modify path in needle-client
                fs.readFile(needleClient, 'utf8', (err, data) => {
                    if (err) {
                        return console.log(err);
                    }
                    const result = data.replace(
                        /CLIENT_MAIN_SRC_DIR =(.*);/,
                        `CLIENT_MAIN_SRC_DIR = '${constants.SERVER_SRC_DIR}${this.mainProjectDir}/ClientApp/';`
                    );

                    fs.writeFile(needleClient, result, 'utf8', err => {
                        if (err) return console.log(err);
                    });
                });

                const needleClientWebpack = this.fetchFromInstalledJHipster('client/needle-api/needle-client-webpack.js');
                // modify path in needle-client-webpack
                fs.readFile(needleClientWebpack, 'utf8', (err, data) => {
                    if (err) {
                        return console.log(err);
                    }
                    let result = data.replace(
                        /CLIENT_MAIN_SRC_DIR =(.*);/,
                        `CLIENT_MAIN_SRC_DIR = '${constants.SERVER_SRC_DIR}${this.mainProjectDir}/ClientApp/';`
                    );
                    result = result.replace(
                        /CLIENT_WEBPACK_DIR =(.*);/,
                        `CLIENT_WEBPACK_DIR = '${constants.SERVER_SRC_DIR}${this.mainProjectDir}/webpack/';`
                    );

                    fs.writeFile(needleClientWebpack, result, 'utf8', err => {
                        if (err) return console.log(err);
                    });
                });
            }
        };
        return { ...phaseFromJHipster, ...customPhaseSteps };
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        // The writing phase is being overriden so that we can write our own templates as well.
        // If the templates doesnt need to be overrriden then just return `super._writing()` here
        const phaseFromJHipster = super._writing();
        const customPhaseSteps = {
            writeAngularFilesDotnetcore() {
                writeAngularFiles.call(this);
            }
        };
        return customPhaseSteps;
    }

    get install() {
        // Override default yeoman installDependencies
        const phaseFromJHipster = super._writing();
        const customPhaseSteps = {
            installDependencies() {
                this.log(
                    `\n\nI'm all done. Running ${chalk.green.bold(
                        `npm --prefix ${constants.SERVER_SRC_DIR}${this.mainProjectDir} install `
                    )}for you to install the required dependencies. If this fails, try running the command yourself.`
                );
                this.spawnCommandSync('npm', ['--prefix', `${constants.SERVER_SRC_DIR}${this.mainProjectDir}`, 'install']);
            }
        };
        return customPhaseSteps;
    }

    get end() {
        return {
            end() {
                if (this.skipClient) return;
                this.log(chalk.green.bold('\nClient application generated successfully.\n'));

                if (!this.options['skip-install']) {
                    this.spawnCommandSync('npm', ['--prefix', `${constants.SERVER_SRC_DIR}${this.mainProjectDir}`, 'run', 'cleanup']);
                }
            }
        };
    }
};
