/**
 * Copyright 2013-2022 the original author or authors from the JHipster project.
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
const fs = require('fs');
const ChildProcess = require('child_process');
const util = require('util');
const chalk = require('chalk');
const glob = require('glob');
const Which = require('which');
const toPascalCase = require('to-pascal-case');

// const BaseBlueprintGenerator = require('generator-jhipster/generators/generator-base-blueprint');
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

const statistics = require('generator-jhipster/generators/statistics');
// const constants = require('generator-jhipster/generators/generator-constants');
const constants = require('../generator-dotnetcore-constants');
const { MARIADB, MYSQL, POSTGRESQL } = require('generator-jhipster/jdl/jhipster/database-types');
const cacheProviderOptions = require('generator-jhipster/jdl/jhipster/cache-types');
const { MEMCACHED, REDIS } = require('generator-jhipster/jdl/jhipster/cache-types');
const { OAUTH2 } = require('generator-jhipster/jdl/jhipster/authentication-types');
const { GRADLE, MAVEN } = require('generator-jhipster/jdl/jhipster/build-tool-types');
const { ELASTICSEARCH } = require('generator-jhipster/jdl/jhipster/search-engine-types');
const { GENERATOR_HEROKU } = require('generator-jhipster/generators/generator-list');
const { EUREKA } = require('generator-jhipster/jdl/jhipster/service-discovery-types');

const NO_CACHE_PROVIDER = cacheProviderOptions.NO;
const execCmd = util.promisify(ChildProcess.exec);
const execFileCmd = util.promisify(ChildProcess.execFile);

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

    // async _postConstruct() {
    //     if (!this.fromBlueprint) {
    //         await this.composeWithBlueprints(GENERATOR_HEROKU);
    //     }
    // }

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
                // this.cacheProvider = this.cacheProvider || NO_CACHE_PROVIDER;
                // this.enableHibernateCache = this.enableHibernateCache && ![NO_CACHE_PROVIDER, MEMCACHED].includes(this.cacheProvider);
                this.frontendAppName = this.getFrontendAppName();
                this.herokuAppName = configuration.get('herokuAppName');
                this.herokuBlazorAppName = configuration.get('herokuBlazorAppName');
                this.clientFramework = configuration.get('clientFramework');
                this.dynoSize = 'Free';
                this.herokuDeployType = configuration.get('herokuDeployType');
                // this.herokuJavaVersion = configuration.get('herokuJavaVersion');
                this.useOkta = configuration.get('useOkta');
                this.oktaAdminLogin = configuration.get('oktaAdminLogin');
                this.oktaAdminPassword = configuration.get('oktaAdminPassword');
                this.authenticationType = configuration.get('authenticationType');
                this.dasherizedBaseName = _.kebabCase(this.baseName);
                this.pascalizedBaseName = toPascalCase(this.baseName);
                this.herokuExecutablePath = Which.sync('heroku');
                this.dockerExecutablePath = Which.sync('docker');
                this.gitExecutablePath = Which.sync('git');
                this.log(chalk.yellow.bold(`\nHeroku executable path: ${this.herokuExecutablePath}`));
                this.log(chalk.yellow.bold(`\nDocker executable path: ${this.dockerExecutablePath}`));
                this.log(chalk.yellow.bold(`\nGit executable path: ${this.gitExecutablePath}`));
            },
        };
    }

    get [INITIALIZING_PRIORITY]() {
        return this._initializing();
    }

    _prompting() {
        return {
            askForApp() {
                const done = this.async();

                if (this.herokuAppName) {
                    // ChildProcess.exec(`heroku apps:info --json ${this.herokuAppName}`, (err, stdout) => {
                    ChildProcess.execFile(this.herokuExecutablePath, ['apps:info', '--json', this.herokuAppName], (err, stdout) => {
                        if (err) {
                            this.abort = true;
                            this.log.error(`Could not find application: ${chalk.cyan(this.herokuAppName)}`);
                            this.log.error('Run the generator again to create a new application.');
                            this.herokuAppName = null;
                        } else {
                            const json = JSON.parse(stdout);
                            this.herokuAppName = json.app.name;
                            if (json.dynos.length > 0) {
                                this.dynoSize = json.dynos[0].size;
                            }
                            this.log(`Deploying as existing application: ${chalk.bold(this.herokuAppName)}`);
                            this.herokuAppExists = true;
                            this.config.set({
                                herokuAppName: this.herokuAppName,
                                herokuDeployType: this.herokuDeployType,
                            });
                        }
                        done();
                    });
                } else {
                    const prompts = [
                        {
                            type: 'input',
                            name: 'herokuAppName',
                            message: 'Name to deploy as:',
                            default: this.baseName,
                        },
                        {
                            type: 'list',
                            name: 'herokuRegion',
                            message: 'On which region do you want to deploy ?',
                            choices: ['us', 'eu'],
                            default: 0,
                        },
                    ];

                    this.prompt(prompts).then(props => {
                        this.herokuAppName = _.kebabCase(props.herokuAppName);
                        this.herokuRegion = props.herokuRegion;
                        this.herokuAppExists = false;
                        done();
                    });
                }
            },

            askForBlazorApp() {
                if (this.clientFramework !== constants.BLAZOR) return;
                const done = this.async();

                if (this.herokuBlazorAppName) {
                    // ChildProcess.exec(`heroku apps:info --json ${this.herokuBlazorAppName}`, (err, stdout) => {
                    ChildProcess.execFile(this.herokuExecutablePath, ['apps:info', '--json', this.herokuBlazorAppName], (err, stdout) => {
                        if (err) {
                            this.abort = true;
                            this.log.error(`Could not find application: ${chalk.cyan(this.herokuBlazorAppName)}`);
                            this.log.error('Run the generator again to create a new application.');
                            this.herokuBlazorAppName = null;
                        } else {
                            const json = JSON.parse(stdout);
                            this.herokuBlazorAppName = json.app.name;
                            if (json.dynos.length > 0) {
                                this.dynoSize = json.dynos[0].size;
                            }
                            this.log(`Deploying as existing application: ${chalk.bold(this.herokuBlazorAppName)}`);
                            this.herokuBlazorAppExists = true;
                            this.config.set({
                                herokuBlazorAppName: this.herokuBlazorAppName,
                                herokuDeployType: this.herokuDeployType,
                            });
                        }
                        done();
                    });
                } else {
                    const prompts = [
                        {
                            type: 'input',
                            name: 'herokuBlazorAppName',
                            message: 'Name to deploy as:',
                            default: `${this.baseName}BlazorFrontend`,
                        },
                        {
                            type: 'list',
                            name: 'herokuRegion',
                            message: 'On which region do you want to deploy ?',
                            choices: ['us', 'eu'],
                            default: 0,
                        },
                    ];

                    // if region was provided before don't ask again
                    if (this.herokuRegion) {
                        // remove region prompt
                        prompts.pop();
                    }

                    this.prompt(prompts).then(props => {
                        this.herokuBlazorAppName = _.kebabCase(props.herokuBlazorAppName);
                        if (!this.herokuRegion) {
                            this.herokuRegion = props.herokuRegion;
                        }
                        this.herokuBlazorAppExists = false;
                        done();
                    });
                }

            },

            askForHerokuDeployType() {
                if (this.abort) return null;
                if (this.herokuDeployType) return null;
                const prompts = [
                    {
                        type: 'list',
                        name: 'herokuDeployType',
                        message: 'Which type of deployment do you want ?',
                        choices: [
                            {
                                value: 'containerRegistry',
                                name: 'Heroku Container Registry (build locally and push image)',
                            },
                            {
                                value: 'git',
                                name: 'Git (compile on Heroku)',
                            },
                        ],
                        default: 0,
                    },
                ];

                // remove git deploy if blazor (use only docker deploy)
                if (this.clientFramework === constants.BLAZOR) {
                    prompts[0].choices.pop();
                }

                return this.prompt(prompts).then(props => {
                    this.herokuDeployType = props.herokuDeployType;
                });
            },

            askForOkta() {
                if (this.abort) return null;
                if (this.authenticationType !== OAUTH2) return null;
                if (this.useOkta) return null;
                const prompts = [
                    {
                        type: 'list',
                        name: 'useOkta',
                        message:
                            'You are using OAuth 2.0. Do you want to use Okta? When you choose Okta, the automated configuration of users and groups requires cURL and jq.',
                        choices: [
                            {
                                value: true,
                                name: 'Yes, provision the Okta add-on',
                            },
                            {
                                value: false,
                                name: 'No, I want to configure my identity provider manually',
                            },
                        ],
                        default: 1,
                    },
                    {
                        when: answers => answers.useOkta,
                        type: 'input',
                        name: 'oktaAdminLogin',
                        message: 'Login (valid email) for the JHipster Admin user:',
                        validate: input => {
                            if (!input) {
                                return 'You must enter a login for the JHipster admin';
                            }
                            return true;
                        },
                    },
                ];

                return this.prompt(prompts).then(props => {
                    this.useOkta = props.useOkta;
                    if (this.useOkta) {
                        this.oktaAdminLogin = props.oktaAdminLogin;
                        this.oktaAdminPassword = this.randomPassword;
                    }
                });
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
                const done = this.async();

                ChildProcess.execFile(this.herokuExecutablePath, ['--version'], err => {
                    if (err) {
                        this.log.error("You don't have the Heroku CLI installed. Download it from https://cli.heroku.com/");
                        this.abort = true;
                    }
                    done();
                });
            },

            checkDockerInstallation() {
                if (this.abort) return;
                const done = this.async();

                if (this.herokuDeployType === 'containerRegistry' || this.clientFramework === constants.BLAZOR) {
                    ChildProcess.execFile(this.dockerExecutablePath, ['--version'], err => {
                        if (err) {
                            this.log.error("You don't have the Docker CLI installed.");
                            this.abort = true;
                        }

                        done();
                    });
                } else {
                    done();
                }
            },

            checkHerokuContainerRegistryLogin() {
                if (this.abort) return;
                const done = this.async();

                if (this.herokuDeployType === 'containerRegistry' || this.clientFramework === constants.BLAZOR) {
                    const herokuContainerLoginCommand = 'heroku container:login';
                    this.log(chalk.bold('\nRunning'), chalk.cyan(herokuContainerLoginCommand));
                    ChildProcess.execFile(this.herokuExecutablePath, ['container:login'], (err, stdout, stderr) => {
                        if (err) {
                            this.log.error(err);
                            this.log.error(
                                "There was a problem while running 'heroku container:login' to login to Heroku Container Registry. Make sure that you have docker and heroku CLI installed. Also verify if you have the right Heroku account configured."
                            );
                            this.abort = true;
                        } else {
                            this.log(stdout);
                        }

                        done();
                    });
                } else {
                    done();
                }
            },

            saveConfig() {
                this.config.set({
                    herokuAppName: this.herokuAppName,
                    herokuBlazorAppName: this.herokuBlazorAppName,
                    herokuDeployType: this.herokuDeployType,
                    useOkta: this.useOkta,
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
            // insight() {
            //     statistics.sendSubGenEvent('generator', GENERATOR_HEROKU);
            // },

            gitInit() {
                if (this.abort) return;
                const done = this.async();

                try {
                    fs.lstatSync('.git');
                    this.log(chalk.bold('\nUsing existing Git repository'));
                    done();
                } catch (e) {
                    // An exception is thrown if the folder doesn't exist
                    this.log(chalk.bold('\nInitializing Git repository'));
                    // const child = ChildProcess.exec('git init', (err, stdout, stderr) => {
                    const child = ChildProcess.execFile(Which.sync('git'), ['init'], (err, stdout, stderr) => {
                        done();
                    });
                    child.stdout.on('data', data => {
                        this.log(data.toString());
                    });
                }
            },

            herokuCreate() {
                if (this.abort || this.herokuAppExists) return;
                const done = this.async();

                // const regionParams = this.herokuRegion !== 'us' ? ` --region ${this.herokuRegion}` : '';

                this.log(chalk.bold('\nCreating Heroku application and setting up node environment'));
                // const child = ChildProcess.exec(
                //     `heroku create ${this.herokuAppName}${regionParams}`,
                //     { timeout: 6000 },
                //     (err, stdout, stderr) => {
                const child = ChildProcess.execFile(
                    this.herokuExecutablePath,
                    ['create', this.herokuAppName, '--region', this.herokuRegion],
                    { shell: false },
                    (err, stdout, stderr) => {
                        if (err) {
                            if (stderr.includes('is already taken')) {
                                const prompts = [
                                    {
                                        type: 'list',
                                        name: 'herokuForceName',
                                        message: `The Heroku application "${chalk.cyan(
                                            this.herokuAppName
                                        )}" already exists! Use it anyways?`,
                                        choices: [
                                            {
                                                value: 'Yes',
                                                name: 'Yes, I have access to it',
                                            },
                                            {
                                                value: 'No',
                                                name: 'No, generate a random name',
                                            },
                                        ],
                                        default: 0,
                                    },
                                ];

                                this.log('');
                                this.prompt(prompts).then(props => {
                                    if (props.herokuForceName === 'Yes') {
                                        // ChildProcess.exec(`heroku git:remote --app ${this.herokuAppName}`, (err, stdout, stderr) => {
                                        ChildProcess.execFile(
                                            this.herokuExecutablePath,
                                            ['git:remote', '--app', this.herokuAppName],
                                            (err, stdout, stderr) => {
                                                if (err) {
                                                    this.abort = true;
                                                    this.log.error(err);
                                                } else {
                                                    this.log(stdout.trim());
                                                    this.config.set({
                                                        herokuAppName: this.herokuAppName,
                                                        herokuDeployType: this.herokuDeployType,
                                                    });
                                                }
                                                done();
                                            }
                                        );
                                    } else {
                                        // ChildProcess.exec(`heroku create ${regionParams}`, (err, stdout, stderr) => {
                                        ChildProcess.execFile(
                                            this.herokuExecutablePath,
                                            ['create', '--region', this.herokuRegion],
                                            { shell: false },
                                            (err, stdout, stderr) => {
                                                if (err) {
                                                    this.abort = true;
                                                    this.log.error(err);
                                                } else {
                                                    // Extract from "Created random-app-name-1234... done"
                                                    this.herokuAppName = stdout.substring(
                                                        stdout.indexOf('https://') + 8,
                                                        stdout.indexOf('.herokuapp')
                                                    );
                                                    this.log(stdout.trim());

                                                    // ensure that the git remote is the same as the appName
                                                    // ChildProcess.exec(
                                                    //     `heroku git:remote --app ${this.herokuAppName}`,
                                                    //     (err, stdout, stderr) => {
                                                    ChildProcess.execFile(
                                                        this.herokuExecutablePath,
                                                        ['git:remote', '--app', this.herokuAppName],
                                                        (err, stdout, stderr) => {
                                                            if (err) {
                                                                this.abort = true;
                                                                this.log.error(err);
                                                            } else {
                                                                this.config.set({
                                                                    herokuAppName: this.herokuAppName,
                                                                    herokuDeployType: this.herokuDeployType,
                                                                });
                                                            }
                                                            done();
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                });
                            } else {
                                this.abort = true;
                                if (stderr.includes('Invalid credentials')) {
                                    this.log.error(
                                        "Error: Not authenticated. Run 'heroku login' to login to your heroku account and try again."
                                    );
                                } else {
                                    this.log.error(err);
                                }
                                done();
                            }
                        } else {
                            done();
                        }
                    }
                );

                child.stdout.on('data', data => {
                    const output = data.toString();
                    if (data.search('Heroku credentials') >= 0) {
                        this.abort = true;
                        this.log.error("Error: Not authenticated. Run 'heroku login' to login to your heroku account and try again.");
                        done();
                    } else {
                        this.log(output.trim());
                    }
                });
            },

            herokuCreateBlazorApp() {
                if (this.abort || this.herokuBlazorAppExists) return;
                if (this.clientFramework !== constants.BLAZOR) return;
                const done = this.async();

                // const regionParams = this.herokuRegion !== 'us' ? ` --region ${this.herokuRegion}` : '';

                this.log(chalk.bold('\nCreating Heroku BLAZOR application and setting up node environment'));
                // const child = ChildProcess.exec(
                //     `heroku create ${this.herokuBlazorAppName}${regionParams}`,
                //     { timeout: 6000 },
                //     (err, stdout, stderr) => {
                const child = ChildProcess.execFile(
                    this.herokuExecutablePath,
                    ['create', this.herokuBlazorAppName, '--region', this.herokuRegion],
                    { shell: false },
                    (err, stdout, stderr) => {
                        if (err) {
                            if (stderr.includes('is already taken')) {
                                const prompts = [
                                    {
                                        type: 'list',
                                        name: 'herokuForceName',
                                        message: `The Heroku application "${chalk.cyan(
                                            this.herokuBlazorAppName
                                        )}" already exists! Use it anyways?`,
                                        choices: [
                                            {
                                                value: 'Yes',
                                                name: 'Yes, I have access to it',
                                            },
                                            {
                                                value: 'No',
                                                name: 'No, generate a random name',
                                            },
                                        ],
                                        default: 0,
                                    },
                                ];

                                this.log('');
                                this.prompt(prompts).then(props => {
                                    if (props.herokuForceName === 'Yes') {
                                        this.config.set({
                                            herokuBlazorAppName: this.herokuBlazorAppName,
                                        });
                                        done();
                                        // ChildProcess.execFile(
                                        //     this.herokuExecutablePath,
                                        //     ['git:remote', '--app', this.herokuBlazorAppName],
                                        //     (err, stdout, stderr) => {
                                        //         if (err) {
                                        //             this.abort = true;
                                        //             this.log.error(err);
                                        //         } else {
                                        //             this.log(stdout.trim());
                                        //             this.config.set({
                                        //                 herokuBlazorAppName: this.herokuBlazorAppName,
                                        //                 herokuDeployType: this.herokuDeployType,
                                        //             });
                                        //         }
                                        //         done();
                                        //     }
                                        // );
                                    } else {
                                        ChildProcess.execFile(
                                            this.herokuExecutablePath,
                                            ['create', '--region', this.herokuRegion],
                                            { shell: false },
                                            (err, stdout, stderr) => {
                                                if (err) {
                                                    this.abort = true;
                                                    this.log.error(err);
                                                } else {
                                                    // Extract from "Created random-app-name-1234... done"
                                                    this.herokuBlazorAppName = stdout.substring(
                                                        stdout.indexOf('https://') + 8,
                                                        stdout.indexOf('.herokuapp')
                                                    );
                                                    this.log(stdout.trim());
                                                    this.config.set({
                                                        herokuBlazorAppName: this.herokuBlazorAppName,
                                                    });
                                                    done();

                                                    // ensure that the git remote is the same as the appName
                                                    // ChildProcess.execFile(
                                                    //     this.herokuExecutablePath,
                                                    //     ['git:remote', '--app', this.herokuBlazorAppName],
                                                    //     (err, stdout, stderr) => {
                                                    //         if (err) {
                                                    //             this.abort = true;
                                                    //             this.log.error(err);
                                                    //         } else {
                                                    //             this.config.set({
                                                    //                 herokuBlazorAppName: this.herokuBlazorAppName,
                                                    //                 herokuDeployType: this.herokuDeployType,
                                                    //             });
                                                    //         }
                                                    //         done();
                                                    //     }
                                                    // );
                                                }
                                            }
                                        );
                                    }
                                });
                            } else {
                                this.abort = true;
                                if (stderr.includes('Invalid credentials')) {
                                    this.log.error(
                                        "Error: Not authenticated. Run 'heroku login' to login to your heroku account and try again."
                                    );
                                } else {
                                    this.log.error(err);
                                }
                                done();
                            }
                        } else {
                            done();
                        }
                    }
                );

                child.stdout.on('data', data => {
                    const output = data.toString();
                    if (data.search('Heroku credentials') >= 0) {
                        this.abort = true;
                        this.log.error("Error: Not authenticated. Run 'heroku login' to login to your heroku account and try again.");
                        done();
                    } else {
                        this.log(output.trim());
                    }
                });
            },

            herokuAddonsCreate() {
                if (this.abort) return;
                const done = this.async();

                const addonCreateCallback = (addon, err, stdout, stderr) => {
                    if (err) {
                        const verifyAccountUrl = 'https://heroku.com/verify';
                        if (_.includes(err, verifyAccountUrl)) {
                            this.abort = true;
                            this.log.error(`Account must be verified to use addons. Please go to: ${verifyAccountUrl}`);
                            this.log.error(err);
                        } else {
                            this.log(`No new ${addon} addon created`);
                        }
                    } else {
                        this.log(`Created ${addon} addon`);
                    }
                };

                this.log(chalk.bold('\nProvisioning addons'));
                // if (this.searchEngine === ELASTICSEARCH) {
                //     ChildProcess.exec(
                //         `heroku addons:create bonsai:sandbox --as BONSAI --app ${this.herokuAppName}`,
                //         addonCreateCallback.bind(this, 'Elasticsearch')
                //     );
                // }

                if (this.useOkta) {
                    // ChildProcess.exec(`heroku addons:create okta --app ${this.herokuAppName}`, (err, stdout, stderr) => {
                    ChildProcess.execFile(
                        this.herokuExecutablePath,
                        ['addons:create', 'okta', '--app', this.herokuAppName],
                        (err, stdout, stderr) => {
                            addonCreateCallback('Okta', err, stdout, stderr);
                    });
                }

                let dbAddOn;
                if (this.databaseType === 'postgresql') {
                    dbAddOn = 'heroku-postgresql';
                } else if (this.databaseType === 'mysql') {
                    dbAddOn = 'jawsdb:kitefin';
                }

                if (this.databaseType === 'mssql') {
                    this.log(chalk.yellow("Heroku's MS SQL Server addon is not free."));
                    this.log(chalk.yellow('So we recommend to add it manually to avoid charges on your credit card.'));
                    this.log(chalk.yellow('You can manually add it to your app visiting https://elements.heroku.com/addons/mssql'));
                } else if (dbAddOn) {
                    this.log(chalk.bold(`\nProvisioning database addon ${dbAddOn}`));
                    // ChildProcess.exec(`heroku addons:create ${dbAddOn} --app ${this.herokuAppName}`, (err, stdout, stderr) => {
                    ChildProcess.execFile(
                        this.herokuExecutablePath,
                        ['addons:create', dbAddOn, '--as', 'DATABASE', '--app', this.herokuAppName],
                        { shell: false },
                        (err, stdout, stderr) => {
                            addonCreateCallback('Database', err, stdout, stderr);
                        }
                    );
                } else {
                    this.log(chalk.bold(`\nNo suitable database addon for database ${this.prodDatabaseType} available.`));
                }

                // let cacheAddOn;
                // if (this.cacheProvider === MEMCACHED) {
                //     cacheAddOn = 'memcachier:dev --as MEMCACHIER';
                // } else if (this.cacheProvider === REDIS) {
                //     cacheAddOn = 'heroku-redis:hobby-dev --as REDIS';
                // }

                // if (cacheAddOn) {
                //     this.log(chalk.bold(`\nProvisioning cache addon ${cacheAddOn}`));
                //     ChildProcess.exec(`heroku addons:create ${cacheAddOn} --app ${this.herokuAppName}`, (err, stdout, stderr) => {
                //         addonCreateCallback('Cache', err, stdout, stderr);
                //     });
                // } else {
                //     this.log(chalk.bold(`\nNo suitable cache addon for cacheprovider ${this.cacheProvider} available.`));
                // }

                done();
            },

            // configureJHipsterRegistry() {
            //     if (this.abort || this.herokuAppExists) return undefined;

            //     if (this.serviceDiscoveryType === EUREKA) {
            //         const prompts = [
            //             {
            //                 type: 'input',
            //                 name: 'herokuJHipsterRegistryApp',
            //                 message: 'What is the name of your JHipster Registry Heroku application?',
            //                 default: 'jhipster-registry',
            //             },
            //             {
            //                 type: 'input',
            //                 name: 'herokuJHipsterRegistryUsername',
            //                 message: 'What is your JHipster Registry username?',
            //                 default: 'admin',
            //             },
            //             {
            //                 type: 'input',
            //                 name: 'herokuJHipsterRegistryPassword',
            //                 message: 'What is your JHipster Registry password?',
            //                 default: 'password',
            //             },
            //         ];

            //         this.log('');
            //         return this.prompt(prompts).then(props => {
            //             // Encode username/password to avoid errors caused by spaces
            //             props.herokuJHipsterRegistryUsername = encodeURIComponent(props.herokuJHipsterRegistryUsername);
            //             props.herokuJHipsterRegistryPassword = encodeURIComponent(props.herokuJHipsterRegistryPassword);
            //             const herokuJHipsterRegistry = `https://${props.herokuJHipsterRegistryUsername}:${props.herokuJHipsterRegistryPassword}@${props.herokuJHipsterRegistryApp}.herokuapp.com`;
            //             // const configSetCmd = `heroku config:set JHIPSTER_REGISTRY_URL=${herokuJHipsterRegistry} --app ${this.herokuAppName}`;
            //             // const child = ChildProcess.exec(configSetCmd, (err, stdout, stderr) => {
            //             const child = ChildProcess.execFile(
            //                 this.herokuExecutablePath,
            //                 ['config:set', `JHIPSTER_REGISTRY_URL=${herokuJHipsterRegistry}`, '--app', this.herokuAppName],
            //                 (err, stdout, stderr) => {
            //                     if (err) {
            //                         this.abort = true;
            //                         this.log.error(err);
            //                     }
            //                 }
            //             );

            //             child.stdout.on('data', data => {
            //                 this.log(data.toString());
            //             });
            //         });
            //     }
            //     return undefined;
            // },
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
                // this.template('application-heroku.yml.ejs', `${constants.SERVER_MAIN_RES_DIR}/config/application-heroku.yml`);
                // this.template('Procfile.ejs', 'Procfile');
                // this.template('system.properties.ejs', 'system.properties');
                // if (this.buildTool === GRADLE) {
                //     this.template('heroku.gradle.ejs', 'gradle/heroku.gradle');
                // }
                if (this.useOkta) {
                    this.template(
                        '../../node_modules/generator-jhipster/generators/heroku/templates/provision-okta-addon.sh.ejs',
                        'provision-okta-addon.sh'
                    );
                    fs.appendFile('.gitignore', 'provision-okta-addon.sh', 'utf8', (err, data) => {
                        if (err) {
                            this.log(`${chalk.yellow.bold('WARNING!')} Failed to add 'provision-okta-addon.sh' to .gitignore.'`);
                        }
                    });
                }
            },

            // addHerokuBuildPlugin() {
            //     if (this.abort) return;
            //     if (this.buildTool !== GRADLE) return;
            //     this.addGradlePlugin('gradle.plugin.com.heroku.sdk', 'heroku-gradle', '1.0.4');
            //     this.applyFromGradleScript('gradle/heroku');
            // },

            // addHerokuMavenProfile() {
            //     if (this.abort) return;
            //     if (this.buildTool === MAVEN) {
            //         this.render('pom-profile.xml.ejs', profile => {
            //             this.addMavenProfile('heroku', `            ${profile.toString().trim()}`);
            //         });
            //     }
            // },
        };
    }

    get [WRITING_PRIORITY]() {
        return this._writing();
    }

    _end() {
        return {
            makeScriptExecutable() {
                if (this.abort) return;
                if (this.useOkta) {
                    try {
                        fs.chmodSync('provision-okta-addon.sh', '750');
                    } catch (err) {
                        this.log(
                            `${chalk.yellow.bold(
                                'WARNING!'
                            )}Failed to make 'provision-okta-addon.sh' executable, you may need to run 'chmod +x provison-okta-addon.sh'`
                        );
                    }
                }
            },
            productionBuild() {
                if (this.abort) return;

                if (this.herokuSkipBuild) {
                    this.log(chalk.bold('\nSkipping build'));
                    return;
                }

                const done = this.async();
                this.log(chalk.bold('\nBuilding application'));

                // const child = this.buildApplication(this.buildTool, 'prod', false, err => {
                //     if (err) {
                //         this.abort = true;
                //         this.log.error(err);
                //     }
                //     done();
                // });

                // this.buildCmd = child.buildCmd;

                // child.stdout.on('data', data => {
                //     process.stdout.write(data.toString());
                // });

                const dockerBuild = (appName, dockerFile) => {
                    const processType = 'web';
                    this.log(chalk.bold(`\nBuilding ${appName}`));

                    const dockerBuildCommand = `docker build -f ${dockerFile} -t ${appName}:latest .`;
                    this.log(chalk.bold('\nRunning'), chalk.cyan(dockerBuildCommand));
                    ChildProcess.execFileSync(this.dockerExecutablePath, ['build', '-f', dockerFile, '-t', `${appName}:latest`, '.'], {
                        shell: false,
                        stdio: 'inherit',
                    });

                    const dockerTagCommand = `docker tag ${appName} registry.heroku.com/${appName}/${processType}`;
                    this.log(chalk.bold('\nRunning'), chalk.cyan(dockerTagCommand));
                    ChildProcess.execFileSync(
                        this.dockerExecutablePath,
                        ['tag', appName, `registry.heroku.com/${appName}/${processType}`],
                        {
                            shell: false,
                            stdio: 'inherit',
                        }
                    );
                };

                if (this.herokuDeployType === 'containerRegistry') {
                    dockerBuild(this.herokuAppName, './Dockerfile-Back');
                }

                if (this.clientFramework === constants.BLAZOR) {
                    dockerBuild(this.herokuBlazorAppName, './Dockerfile-Front');
                }

                done();
            },

            async productionDeploy() {
                if (this.abort) return;

                if (this.herokuSkipDeploy) {
                    this.log(chalk.bold('\nSkipping deployment'));
                    return;
                }

                const serverUrl = `https://${this.herokuAppName}.herokuapp.com`;

                const setHerokuStack = appName => {
                    const herokuStackSetCommand = `heroku stack:set container --app ${appName}`;
                    this.log(chalk.bold('\nRunning'), chalk.cyan(herokuStackSetCommand));
                    ChildProcess.execFileSync(this.herokuExecutablePath, ['stack:set', 'container', '--app', appName], {
                        shell: false,
                    });
                };

                const setHerokuConfig = (appName, configKey, configValue) => {
                    const herokuStackSetCommand = `heroku config:set ${configKey}=${configValue} --app ${appName}`;
                    this.log(chalk.bold('\nRunning'), chalk.cyan(herokuStackSetCommand));
                    ChildProcess.execFileSync(this.herokuExecutablePath, ['config:set', `${configKey}=${configValue}`, '--app', appName], {
                        shell: false,
                    });
                };

                const dockerPush = appName => {
                    const processType = 'web';
                    const dockerPushCommand = `docker push registry.heroku.com/${appName}/${processType}`;
                    this.log(chalk.bold('\nRunning'), chalk.cyan(dockerPushCommand));
                    ChildProcess.execFileSync(this.dockerExecutablePath, ['push', `registry.heroku.com/${appName}/${processType}`], {
                        shell: false,
                        stdio: 'inherit',
                    });
                };

                const herokuRelease = appName => {
                    const processType = 'web';
                    const herokuReleaseCommand = `heroku container:release ${processType} --app ${appName}`;
                    this.log(chalk.bold('\nRunning'), chalk.cyan(herokuReleaseCommand));
                    ChildProcess.execFileSync(this.herokuExecutablePath, ['container:release', processType, '--app', appName], {
                        shell: false,
                        stdio: 'inherit',
                    });
                };

                if (this.herokuDeployType === 'git') {
                    try {
                        this.log(chalk.bold('\nUpdating Git repository'));
                        const gitAddCmd = 'git add .';
                        this.log(chalk.cyan(gitAddCmd));

                        // const gitAdd = execCmd(gitAddCmd);
                        const gitAdd = execFileCmd(this.gitExecutablePath, ['add', '.']);
                        gitAdd.child.stdout.on('data', data => {
                            this.log(data);
                        });

                        gitAdd.child.stderr.on('data', data => {
                            this.log(data);
                        });
                        await gitAdd;

                        const gitCommitCmd = 'git commit -m "Deploy to Heroku" --allow-empty';
                        this.log(chalk.cyan(gitCommitCmd));

                        const gitCommit = execFileCmd(this.gitExecutablePath, ['commit', '-m', '"Deploy to Heroku"', '--allow-empty']);
                        gitCommit.child.stdout.on('data', data => {
                            this.log(data);
                        });

                        gitCommit.child.stderr.on('data', data => {
                            this.log(data);
                        });
                        await gitCommit;

                        // let buildpack = 'heroku/java';
                        // let configVars = 'MAVEN_CUSTOM_OPTS="-Pprod,heroku -DskipTests" ';
                        // if (this.buildTool === GRADLE) {
                        //     buildpack = 'heroku/gradle';
                        //     configVars = 'GRADLE_TASK="stage -Pprod -PnodeInstall" ';
                        // }

                        this.log(chalk.bold('\nConfiguring Heroku'));
                        setHerokuStack(this.herokuAppName);

                        // await execCmd(`heroku config:set ${configVars}--app ${this.herokuAppName}`);
                        // await execFileCmd(this.herokuExecutablePath, ['config:set', configVars, '--app', this.herokuAppName]);
                        // // await execCmd(`heroku buildpacks:add ${buildpack} --app ${this.herokuAppName}`);
                        // await execFileCmd(this.herokuExecutablePath, ['buildpacks:add', buildpack, '--app', this.herokuAppName]);

                        this.log(chalk.bold('\nDeploying application'));

                        // const herokuPush = execCmd('git push heroku HEAD:main', { maxBuffer: 1024 * 10000 });
                        const herokuPush = execFileCmd(this.gitExecutablePath, ['push', 'heroku', 'HEAD:main'], {
                            maxBuffer: 1024 * 10000,
                        });

                        herokuPush.child.stdout.on('data', data => {
                            this.log(data);
                        });

                        herokuPush.child.stderr.on('data', data => {
                            this.log(data);
                        });

                        await herokuPush;

                        this.log(chalk.green(`\nYour app should now be live. To view it run\n\t${chalk.bold('heroku open')}`));
                        this.log(chalk.yellow(`And you can view the logs with this command\n\t${chalk.bold('heroku logs --tail')}`));
                        this.log(chalk.yellow(`After application modification, redeploy it with\n\t${chalk.bold('jhipster heroku')}`));

                        if (this.useOkta) {
                            let curlAvailable = false;
                            let jqAvailable = false;
                            try {
                                // await execCmd('curl --help');
                                await execFileCmd(Which.sync('curl'), ['--help']);
                                curlAvailable = true;
                            } catch (err) {
                                this.log(
                                    chalk.red(
                                        'cURL is not available but required. See https://curl.haxx.se/download.html for installation guidance.'
                                    )
                                );
                                this.log(chalk.yellow('After you have installed curl execute ./provision-okta-addon.sh manually.'));
                            }
                            try {
                                // await execCmd('jq --help');
                                await execFileCmd(Which.sync('jq'), ['--help']);
                                jqAvailable = true;
                            } catch (err) {
                                this.log(
                                    chalk.red(
                                        'jq is not available but required. See https://stedolan.github.io/jq/download/ for installation guidance.'
                                    )
                                );
                                this.log(chalk.yellow('After you have installed jq execute ./provision-okta-addon.sh manually.'));
                            }
                            if (curlAvailable && jqAvailable) {
                                this.log(
                                    chalk.green('Running ./provision-okta-addon.sh to create all required roles and users for JHipster.')
                                );
                                try {
                                    // await execCmd('./provision-okta-addon.sh');
                                    await execFileCmd('./provision-okta-addon.sh');
                                    this.log(chalk.bold('\nOkta configured successfully!'));
                                    this.log(
                                        chalk.green(`\nUse ${chalk.bold(`${this.oktaAdminLogin}/${this.oktaAdminPassword}`)} to login.\n`)
                                    );
                                } catch (err) {
                                    this.log(
                                        chalk.red(
                                            'Failed to execute ./provision-okta-addon.sh. Make sure to setup okta according to https://www.jhipster.tech/heroku/.'
                                        )
                                    );
                                }
                            }
                        }
                    } catch (err) {
                        this.log.error(err);
                    }
                }

                try {
                    if (this.herokuDeployType === 'containerRegistry') {
                        this.log(chalk.bold(`\nDeploying ${this.herokuAppName} to Heroku's Container Registry`));

                        if (!this.herokuAppExists) {
                            setHerokuStack(this.herokuAppName);
                        }

                        dockerPush(this.herokuAppName);
                        herokuRelease(this.herokuAppName);

                        // const dockerPushCommand = `docker push registry.heroku.com/${this.herokuAppName}/${processType}`;
                        // this.log(chalk.bold('\nRunning'), chalk.cyan(dockerPushCommand));
                        // ChildProcess.execFileSync(
                        //     this.dockerExecutablePath,
                        //     ['push', `registry.heroku.com/${this.herokuAppName}/${processType}`],
                        //     { shell: false, stdio: 'inherit' }
                        // );

                        // const herokuReleaseCommand = `heroku container:release ${processType} --app ${this.herokuAppName}`;
                        // this.log(chalk.bold('\nRunning'), chalk.cyan(herokuReleaseCommand));
                        // ChildProcess.execFileSync(
                        //     this.herokuExecutablePath,
                        //     ['container:release', processType, '--app', this.herokuAppName],
                        //     {
                        //         shell: false,
                        //         stdio: 'inherit',
                        //     }
                        // );

                        if (this.clientFramework === constants.BLAZOR) {
                            this.log(chalk.bold(`\nDeploying ${this.herokuBlazorAppName} to Heroku's Container Registry`));

                            if (!this.herokuBlazorAppExists) {
                                setHerokuStack(this.herokuBlazorAppName);
                                setHerokuConfig(this.herokuBlazorAppName, 'ServerUrl', serverUrl);
                            }

                            dockerPush(this.herokuBlazorAppName);
                            herokuRelease(this.herokuBlazorAppName);
                            // const dockerPushCommand = `docker push registry.heroku.com/${this.herokuBlazorAppName}/${processType}`;
                            // this.log(chalk.bold('\nRunning'), chalk.cyan(dockerPushCommand));
                            // ChildProcess.execFileSync(
                            //     this.dockerExecutablePath,
                            //     ['push', `registry.heroku.com/${this.herokuBlazorAppName}/${processType}`],
                            //     { shell: false, stdio: 'inherit' }
                            // );

                            // const herokuReleaseCommand = `heroku container:release ${processType} --app ${this.herokuBlazorAppName}`;
                            // this.log(chalk.bold('\nRunning'), chalk.cyan(herokuReleaseCommand));
                            // ChildProcess.execFileSync(
                            //     this.herokuExecutablePath,
                            //     ['container:release', processType, '--app', this.herokuBlazorAppName],
                            //     { shell: false, stdio: 'inherit' }
                            // );
                        }

                        this.log(chalk.green('\nYour app should now be live. To view it open the following URL in your browser:'));
                        this.log(chalk.green(serverUrl));
                        this.log(chalk.yellow(`And you can view the logs with this command\n\t${chalk.bold('heroku logs --tail')}`));
                        if (this.clientFramework === constants.BLAZOR) {
                            this.log(
                                chalk.green(
                                    '\nYour blazor frontend app should now be live. To view it open the following URL in your browser:'
                                )
                            );
                            this.log(chalk.green(`https://${this.herokuBlazorAppName}.herokuapp.com`));
                            this.log(
                                chalk.yellow(
                                    `And you can view the logs with this command\n\t${chalk.bold(
                                        `heroku logs --tail --app ${this.herokuBlazorAppName}`
                                    )}`
                                )
                            );
                        }
                        this.log(chalk.yellow(`\nAfter application modification, redeploy it with\n\t${chalk.bold('jhipster heroku')}`));
                    }
                } catch (err) {
                    this.log.error(err);
                }
            },
        };
    }

    get [END_PRIORITY]() {
        return this._end();
    }
};
