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
/* eslint-disable consistent-return */
const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');
// eslint-disable-next-line import/no-extraneous-dependencies
const constants = require('../generator-dotnetcore-constants.cjs');
const baseConstants = require('generator-jhipster/generators/generator-constants');
const basePrompts = require('generator-jhipster/generators/client/prompts');
const baseWriteAngularFiles = require('generator-jhipster/generators/client/files-angular').writeFiles;
const baseWriteReactFiles = require('generator-jhipster/generators/client/files-react').writeFiles;
const baseWriteVueFiles = require('generator-jhipster/generators/client/files-vue').writeFiles;
const baseWriteCommonFiles = require('generator-jhipster/generators/client/files-common').writeFiles;
const customizeDotnetPaths = require('../utils').customizeDotnetPaths;
const dotnet = require('../dotnet');
const prompts = require('./prompts');

const writeAngularFiles = require('./files-angular').writeFiles;
const writeReactFiles = require('./files-react').writeFiles;
const writeVueFiles = require('./files-vue').writeFiles;
const writeCommonFiles = require('./files-common').writeFiles;
const writeBlazorFiles = require('./files-blazor').writeFiles;
const writeXamarinFiles = require('./files-xamarin').writeFiles;

const { ANGULAR, REACT, VUE } = baseConstants.SUPPORTED_CLIENT_FRAMEWORKS;
const BLAZOR = constants.BLAZOR;
const XAMARIN = constants.XAMARIN;

module.exports = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        if (this.configOptions.baseName) {
            this.baseName = this.configOptions.baseName;
        }
    }

    get initializing() {
        return {
            customizeDotnetPaths,
            ...super._initializing(),
            initializingDotnet () {
                this.namespace = this.jhipsterConfig.namespace;
                this.clientFramework = this.jhipsterConfig.clientFramework;
            }
        }
    }

    get prompting() {
        return {
            askForModuleName: basePrompts.askForModuleName,
            askForClient: prompts.askForClient,
            askFori18n: basePrompts.askForI18n,
            askForClientTheme: basePrompts.askForClientTheme,
            askForClientThemeVariant: basePrompts.askForClientThemeVariant
        };
    }

    get configuring() {
        return {
            customizeDotnetPaths,
            ...super._configuring()
        };
    }

    get default() {
        return super._default();
    }

    get composing() {
        return super._composing();
    }

    get loading() {
        return {
            ...super._loading(),
            loadingDotnet () {
                this.serverPort = this.jhipsterConfig.serverPort;
                this.serverPortSecured = parseInt(this.serverPort, 10) + 1;
                this.withAdminUi = false;
            }
        }
    }

    get preparing() {
        return super._preparing();
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
                    case XAMARIN:
                        return writeXamarinFiles.call(this);
                    case REACT:
                        baseWriteReactFiles.call(this);
                        return baseWriteCommonFiles.call(this);
                    case ANGULAR:
                        baseWriteAngularFiles.call(this);
                        return baseWriteCommonFiles.call(this);
                    case VUE:
                        baseWriteVueFiles.call(this);
                        return baseWriteCommonFiles.call(this);
                    default:
                    // do nothing by default
                }
            }
        };
    }

    get postWriting() {
        return {
            postWritingDotnet(){
                if (this.clientFramework === BLAZOR) {
                   this.skipClient = true;
                }
            },
            ... super._postWriting(),
            postWriteFilesDotnetcore() {
                if (this.skipClient) return;
                switch (this.clientFramework) {
                    case REACT:
                        writeCommonFiles.call(this);
                        return writeReactFiles.call(this);
                    case ANGULAR:
                        writeCommonFiles.call(this);
                        return writeAngularFiles.call(this);
                    case VUE:
                        writeCommonFiles.call(this);
                        return writeVueFiles.call(this);
                    default:
                    // do nothing by default
                }
            }
        }
    }

    get install() {
        // Override default yeoman installDependencies
        const customPhase = {
            installDependencies() {
                if (this.clientFramework !== BLAZOR && !this.options.skipInstall) {
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
                if (this.clientFramework === BLAZOR) {
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
                    this.log(
                        chalk.green(
                            `Run your blazor application:\n${chalk.yellow.bold(
                                `dotnet run --verbosity normal --project ./${constants.CLIENT_SRC_DIR}${this.mainClientDir}/${this.pascalizedBaseName}.Client.csproj`
                            )}`
                        )
                    );
                    dotnet.installBlazorDependencies();
                } else if (this.clientFramework === XAMARIN) {
                    this.log(chalk.green.bold(`\nCreating ${this.solutionName} .Net Core solution if it does not already exist.\n`));
                    try {
                        await dotnet.newSln(this.solutionName);
                    } catch (err) {
                        this.warning(`Failed to create ${this.solutionName} .Net Core solution: ${err}`);
                    }
                    await dotnet.slnAdd(`${this.solutionName}.sln`, [
                        `${constants.CLIENT_SRC_DIR}${this.mainClientDir}/${this.pascalizedBaseName}.Client.Xamarin.Core.csproj`,
                        `${constants.CLIENT_SRC_DIR}${this.sharedClientDir}/${this.pascalizedBaseName}.Client.Xamarin.Shared.csproj`,
                    ]);
                    await dotnet.newSlnAddProj(this.solutionName, [
                        {
                            'path': `${constants.CLIENT_SRC_DIR}${this.androidClientDir}/${this.pascalizedBaseName}.Client.Xamarin.Android.csproj`,
                            'name' : `${this.pascalizedBaseName}.Client.Xamarin.Android`
                        },
                        {
                            'path': `${constants.CLIENT_SRC_DIR}${this.iOSClientDir}/${this.pascalizedBaseName}.Client.Xamarin.iOS.csproj`,
                            'name' : `${this.pascalizedBaseName}.Client.Xamarin.iOS`
                        }
                    ]);
                    this.log(chalk.green.bold('\Client application generated successfully.\n'));

                } else {
                    if (this.skipClient) return;
                    this.log(chalk.green.bold('\nClient application generated successfully.\n'));

                    if (!this.options.skipInstall) {
                        this.spawnCommandSync('npm', ['--prefix', `${constants.SERVER_SRC_DIR}${this.mainClientDir}`, 'run', 'cleanup']);
                    }
                }
            },
        }
    }
};
