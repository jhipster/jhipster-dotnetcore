/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable consistent-return */
const crypto = require('crypto');
const _ = require('lodash');
const chalk = require('chalk');
const toPascalCase = require('to-pascal-case');

const HerokuGenerator = require('generator-jhipster/generators/heroku');
const {
    INITIALIZING_PRIORITY,
    PROMPTING_PRIORITY,
    CONFIGURING_PRIORITY,
    LOADING_PRIORITY,
    DEFAULT_PRIORITY,
    WRITING_PRIORITY,
    END_PRIORITY,
} = require('generator-jhipster/lib/constants/priorities.cjs').compat;

const constants = require('../generator-dotnetcore-constants.cjs');
const build = require('./build');
const deploy = require('./deploy');
const provision = require('./provision');
const prompts = require('./prompts');

module.exports = class extends HerokuGenerator {
    constructor(args, options, features) {
        super(args, { fromBlueprint: true, ...options }, features);

        this.option('skip-build', {
            desc: 'Skips building the application',
            type: Boolean,
            defaults: false,
        });

        this.option('skip-deploy', {
            desc: 'Skips deployment to Heroku',
            type: Boolean,
            defaults: false,
        });

        if (this.options.help) {
            return;
        }

        this.randomPassword = crypto.randomBytes(20).toString('hex');
        this.herokuSkipBuild = this.options.skipBuild;
        this.herokuSkipDeploy = this.options.skipDeploy || this.options.skipBuild;
    }

    _initializing() {
        return {
            validateFromCli() {
                this.checkInvocationFromCLI();
            },

            loadCommonConfig() {
                this.loadAppConfig();
                this.loadServerConfig();
                this.loadPlatformConfig();
            },

            initializing() {
                this.log(chalk.bold('Heroku configuration is starting'));
                const configuration = this.config;
                this.env.options.appPath = configuration.get('appPath') || constants.CLIENT_SRC_DIR;
                this.baseName = configuration.get('baseName');
                this.databaseType = configuration.get('databaseType');
                this.frontendAppName = this.getFrontendAppName();
                this.herokuAppName = configuration.get('herokuAppName');
                this.clientFramework = configuration.get('clientFramework');
                this.dynoSize = 'Free';
                this.herokuDeployType = configuration.get('herokuDeployType');
                this.oktaAdminLogin = configuration.get('oktaAdminLogin');
                this.oktaAdminPassword = configuration.get('oktaAdminPassword');
                this.authenticationType = configuration.get('authenticationType');
                this.dasherizedBaseName = _.kebabCase(this.baseName);
                this.pascalizedBaseName = toPascalCase(this.baseName);
            },
        };
    }

    get [INITIALIZING_PRIORITY]() {
        return this._initializing();
    }

    _prompting() {
        return {
            askForApp() {
                prompts.askForDotnetApp.call(this);
            },

            askForHerokuDeployType() {
                if (this.abort) return null;
                if (this.herokuDeployType) return null;

                return prompts.askForHerokuDeployType.call(this);
            },
        };
    }

    get [PROMPTING_PRIORITY]() {
        return this._prompting();
    }

    _configuring() {
        return {
            checkHerokuInstallation() {
                if (this.abort) return;
                provision.checkHeroku.call(this);
            },

            checkDockerInstallation() {
                if (this.abort) return;
                provision.checkDocker.call(this);
            },

            checkHerokuContainerRegistryLogin() {
                if (this.abort || this.herokuDeployType === 'git') return;
                provision.checkContainerRegistry.call(this);
            },

            saveConfig() {
                this.config.set({
                    herokuAppName: this.herokuAppName,
                    herokuDeployType: this.herokuDeployType,
                    oktaAdminLogin: this.oktaAdminLogin,
                });
            },
        };
    }

    get [CONFIGURING_PRIORITY]() {
        return this._configuring();
    }

    // Public API method used by the getter and also by Blueprints
    _loading() {
        return {
            loadSharedConfig() {
                this.loadAppConfig();
                this.loadDerivedAppConfig();
                this.loadClientConfig();
                this.loadDerivedClientConfig();
                this.loadServerConfig();
                this.loadTranslationConfig();
                this.loadPlatformConfig();
            },
        };
    }

    get [LOADING_PRIORITY]() {
        return this._loading();
    }

    _default() {
        return {
            gitInit() {
                if (this.abort) return;
                provision.gitInit.call(this);
            },

            herokuCreate() {
                if (this.abort || this.herokuAppExists) return;
                // Create the dotnet backend app
                provision.createDotnetApp.call(this);
            },

            herokuAddonsCreate() {
                if (this.abort) return;
                provision.provisionAddons.call(this);
            },
        };
    }

    get [DEFAULT_PRIORITY]() {
        return this._default();
    }

    _writing() {
        return {
            copyHerokuFiles() {
                if (this.abort) return;

                this.log(chalk.bold('\nCreating Heroku deployment files'));
                this.template('heroku.yml.ejs', 'heroku.yml');
            },
        };
    }

    get [WRITING_PRIORITY]() {
        return this._writing();
    }

    _end() {
        return {
            productionBuild() {
                if (this.abort) return;

                if (this.herokuSkipBuild || this.herokuDeployType === 'git') {
                    this.log(chalk.bold('\nSkipping build'));
                    return;
                }

                this.log(chalk.bold('\nBuilding application'));

                if (this.herokuDeployType === 'containerRegistry') {
                    build.dockerBuild(this.herokuAppName, './Dockerfile-Back', this.log);
                }
            },

            async productionDeploy() {
                if (this.abort) return;

                if (this.herokuSkipDeploy) {
                    this.log(chalk.bold('\nSkipping deployment'));
                    return;
                }

                if (this.herokuDeployType === 'git') {
                    deploy.herokuGitDeploy.call(this);
                } else if (this.herokuDeployType === 'containerRegistry') {
                    deploy.herokuContainerRegistryDeploy.call(this);
                }
            },
        };
    }

    get [END_PRIORITY]() {
        return this._end();
    }
};
