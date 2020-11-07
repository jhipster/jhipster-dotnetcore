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
const basePrompts = require('generator-jhipster/generators/client/prompts');
const baseWriteAngularFiles = require('generator-jhipster/generators/client/files-angular').writeFiles;
const baseWriteReactFiles = require('generator-jhipster/generators/client/files-angular').writeFiles;
const prompts = require('./prompts');
const configureGlobalDotnetcore = require('../utils').configureGlobalDotnetcore;
const dotnet = require('../dotnet');

const writeAngularFiles = require('./files-angular').writeFiles;
const writeReactFiles = require('./files-react').writeFiles;
const writeBlazorFiles = require('./files-blazor').writeFiles;
const writeCommonFiles = require('./files-common').writeFiles;

const REACT = baseConstants.SUPPORTED_CLIENT_FRAMEWORKS.REACT;
const BLAZOR = constants.BLAZOR;

module.exports = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints dotnetcore')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupClientOptions(this, jhContext);

    }

    get initializing() {
        const phaseFromJHipster = super._initializing();
        const jhipsterNetPhaseSteps = {
            setupClientConsts() {
                const configuration = this.getAllJhipsterConfig(this, true);
                this.namespace = configuration.get('namespace') || this.configOptions.namespace;
                this.serverPort = configuration.get('serverPort') || this.configOptions.serverPort;
                this.serverPortSecured = parseInt(this.serverPort, 10) + 1;
            },
        };
        return Object.assign(phaseFromJHipster, jhipsterNetPhaseSteps);
    }

    get prompting() {
        return {
            askForModuleName: basePrompts.askForModuleName,
            askForClient: prompts.askForClient,
            askFori18n: basePrompts.askForI18n,
            askForClientTheme: basePrompts.askForClientTheme,
            askForClientThemeVariant: basePrompts.askForClientThemeVariant,

            setSharedConfigOptions() {
                this.configOptions.skipClient = this.skipClient;
                this.configOptions.clientFramework = this.clientFramework;
                this.configOptions.clientTheme = this.clientTheme;
                this.configOptions.clientThemeVariant = this.clientThemeVariant;
            },
        };
    }

    get configuring() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        const phaseFromJHipster = super._configuring();
        const customPhaseSteps = {
            configureGlobalDotnetcore
        };
        return Object.assign(customPhaseSteps, phaseFromJHipster);
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        // The writing phase is being overriden so that we can write our own templates as well.
        // If the templates doesnt need to be overrriden then just return `super._writing()` here
        return {
            writeFilesDotnetcore() {
                if (this.skipClient) return;
                switch (this.clientFramework) {
                    case BLAZOR:
                        return writeBlazorFiles.call(this);
                    case REACT:
                        baseWriteReactFiles.call(this);
                        writeCommonFiles.call(this);
                        return writeReactFiles.call(this);
                    default:
                        baseWriteAngularFiles.call(this);
                        writeCommonFiles.call(this);
                        return writeAngularFiles.call(this);
                }
            }
        };
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
                    this.spawnCommandSync('npm', ['install'], { cwd: `${constants.SERVER_SRC_DIR}${this.mainClientDir}` });
                }
            }
        };
        return customPhase;
    }

    get end() {
        return {
            async end() {
                if (this.clientFramework == BLAZOR) {
                    this.log(chalk.green.bold(`\nCreating ${this.solutionName} .Net Core solution if it does not already exist.\n`));
                    try {
                        await dotnet.newSln(this.solutionName);
                    } catch (err) {
                        this.warning(`Failed to create ${this.solutionName} .Net Core solution: ${err}`);
                    }
                    await dotnet.slnAdd(`${this.solutionName}.sln`, [
                        `${constants.CLIENT_SRC_DIR}${this.mainClientDir}/${this.pascalizedBaseName}.Client.csproj`,
                        `${constants.CLIENT_SRC_DIR}${this.sharedClientDir}/${this.pascalizedBaseName}.Client.Shared.csproj`,
                        `${constants.CLIENT_TEST_DIR}${this.clientTestProject}/${this.pascalizedBaseName}.Client.Test.csproj`,
                    ]);
                    this.log(chalk.green.bold('\Client application generated successfully.\n'));
                } else {
                    if (this.skipClient) return;
                    this.log(chalk.green.bold('\nClient application generated successfully.\n'));

                    if (!this.options['skip-install']) {
                        this.spawnCommandSync('npm', ['--prefix', `${constants.SERVER_SRC_DIR}${this.mainClientDir}`, 'run', 'cleanup']);
                    }
                }
            },
        }
    }
};
