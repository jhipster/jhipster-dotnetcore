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
const ServerGenerator = require('generator-jhipster/generators/server');
const constants = require('../generator-dotnetcore-constants.cjs');
const dotnet = require('../dotnet');
const customizeDotnetPaths = require('../utils').customizeDotnetPaths;
const writeFiles = require('./files').writeFiles;
const prompts = require('./prompts');
const packagejs = require('../../package.json');

module.exports = class extends ServerGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important
        dotnet.hasDotnet().catch(err => {
            this.warning(
                "The 'dotnet' command is not present in the PATH, use it at your own risk! If you encounter a bug, please install .Net Core first (https://dotnet.microsoft.com/download/dotnet-core)."
            );
        });

        if (this.configOptions.baseName) {
            this.baseName = this.configOptions.baseName;
        }
    }

    get initializing() {
        return {
            ...super._initializing(),
            setupServerConsts() {
                this.packagejs = packagejs;
                this.jhipsterNetVersion = packagejs.version;
                this.SERVER_SRC_DIR = constants.SERVER_SRC_DIR;
                this.SERVER_TEST_DIR = constants.SERVER_TEST_DIR;
                this.namespace = this.jhipsterConfig.namespace;
                this.databaseType = this.jhipsterConfig.databaseType;
                this.authenticationType = this.jhipsterConfig.authenticationType;
                this.serverPort = this.jhipsterConfig.serverPort;
                this.cqrsEnabled = this.jhipsterConfig.cqrsEnabled;
                this.serverPortSecured = parseInt(this.serverPort, 10) + 1;
                this.withTerraformAzureScripts = this.jhipsterConfig.withTerraformAzureScripts;

                const serverConfigFound =
                    this.namespace !== undefined && this.databaseType !== undefined && this.authenticationType !== undefined;

                if (this.baseName !== undefined && serverConfigFound) {
                    this.log(
                        chalk.green(
                            'This is an existing project, using the configuration from your .yo-rc.json file \n' +
                                'to re-generate the project...\n'
                        )
                    );
                    this.existingProject = true;
                }
            },
        };
    }

    get prompting() {
        return {
            askForModuleName: prompts.askForModuleName,
            askForServerSideOpts: prompts.askForServerSideOpts,
        };
    }

    get configuring() {
        return {
            customizeDotnetPaths,
        };
    }

    get default() {
        return {
            ...super._default(),
            fixConfig() {
                this.jhipsterConfig.prodDatabaseType = this.jhipsterConfig.databaseType === 'mongodb' ? 'mongodb' : 'mysql'; // set only for jdl-importer compatibility
            },
        };
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

    get writing() {
        return writeFiles.call(this);
    }

    get postWriting() {
        return {};
    }

    get end() {
        return {
            async end() {
                this.log(chalk.green.bold(`\nCreating ${this.solutionName} .Net Core solution if it does not already exist.\n`));
                const slns = [
                    `${constants.SERVER_SRC_DIR}${this.mainProjectDir}/${this.pascalizedBaseName}.csproj`,
                    `${constants.SERVER_TEST_DIR}${this.testProjectDir}/${this.pascalizedBaseName}${constants.PROJECT_TEST_SUFFIX}.csproj`,
                    `${constants.SERVER_SRC_DIR}${this.pascalizedBaseName}${constants.PROJECT_CROSSCUTTING_SUFFIX}/${this.pascalizedBaseName}${constants.PROJECT_CROSSCUTTING_SUFFIX}.csproj`,
                    `${constants.SERVER_SRC_DIR}${this.pascalizedBaseName}${constants.PROJECT_DOMAIN_SUFFIX}/${this.pascalizedBaseName}${constants.PROJECT_DOMAIN_SUFFIX}.csproj`,
                    `${constants.SERVER_SRC_DIR}${this.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}/${this.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}.csproj`,
                    `${constants.SERVER_SRC_DIR}${this.pascalizedBaseName}${constants.PROJECT_SERVICE_SUFFIX}/${this.pascalizedBaseName}${constants.PROJECT_SERVICE_SUFFIX}.csproj`,
                    `${constants.SERVER_SRC_DIR}${this.pascalizedBaseName}${constants.PROJECT_INFRASTRUCTURE_SUFFIX}/${this.pascalizedBaseName}${constants.PROJECT_INFRASTRUCTURE_SUFFIX}.csproj`,
                ];
                if (this.cqrsEnabled) {
                    slns.push(
                        `${constants.SERVER_SRC_DIR}${this.pascalizedBaseName}${constants.PROJECT_APPLICATION_SUFFIX}/${this.pascalizedBaseName}${constants.PROJECT_APPLICATION_SUFFIX}.csproj`
                    );
                }
                await dotnet
                    .newSln(this.solutionName)
                    .then(() => dotnet.slnAdd(`${this.solutionName}.sln`, slns))
                    .catch(err => {
                        this.warning(`Failed to create ${this.solutionName} .Net Core solution: ${err}`);
                    })
                    .finally(() => {
                        this.log(chalk.green.bold('\nServer application generated successfully.\n'));
                        this.log(
                            chalk.green(
                                `Run your .Net Core application:\n${chalk.yellow.bold(
                                    `dotnet run --verbosity normal --project ./${constants.SERVER_SRC_DIR}${this.mainProjectDir}/${this.pascalizedBaseName}.csproj`
                                )}`
                            )
                        );
                        this.log(chalk.green(`Test your .Net Core application:\n${chalk.yellow.bold('dotnet test --verbosity normal')}`));
                    });
            },
        };
    }
};
