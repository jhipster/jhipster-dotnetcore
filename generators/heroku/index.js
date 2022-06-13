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
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable consistent-return */
const _ = require('lodash');
const fs = require('fs');
const ChildProcess = require('child_process');
const util = require('util');
const chalk = require('chalk');

const BaseBlueprintGenerator = require('generator-jhipster/generators/generator-base-blueprint');
const statistics = require('generator-jhipster/generators/statistics');
const Which = require('which');
const toPascalCase = require('to-pascal-case');
const constants = require('../generator-dotnetcore-constants');

const execCmd = util.promisify(ChildProcess.exec);
const BLAZOR = constants.BLAZOR;

module.exports = class extends BaseBlueprintGenerator {
    constructor(args, opts) {
        super(args, opts);
        this.configOptions = this.options.configOptions || {};
        // This adds support for a `--from-cli` flag
        this.option('from-cli', {
            desc: 'Indicates the command is run from JHipster CLI',
            type: Boolean,
            defaults: false,
        });

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
        this.herokuSkipBuild = this.options.skipBuild;
        this.herokuSkipDeploy = this.options.skipDeploy || this.options.skipBuild;
    }

    _initializing() {
        return {
            validateFromCli() {
                this.checkInvocationFromCLI();
            },

            initializing() {
                this.log(chalk.bold('Heroku configuration is starting'));
                const configuration = this.config;
                this.env.options.appPath = configuration.get('appPath') || constants.CLIENT_MAIN_SRC_DIR;
                this.baseName = configuration.get('baseName');
                this.databaseType = configuration.get('databaseType');
                this.frontendAppName = this.getFrontendAppName();
                this.applicationType = configuration.get('applicationType');
                this.reactive = configuration.get('reactive') || false;
                this.authenticationType = configuration.get('authenticationType');
                this.herokuAppName = configuration.get('herokuAppName');
                this.herokuBlazorAppName = configuration.get('herokuBlazorAppName');
                this.clientFramework = configuration.get('clientFramework');
                this.dynoSize = 'Free';
                this.herokuDeployType = configuration.get('herokuDeployType');
                this.useOkta = configuration.get('useOkta');
                this.oktaAdminLogin = configuration.get('oktaAdminLogin');
                this.oktaAdminPassword = configuration.get('oktaAdminPassword');
                this.dasherizedBaseName = _.kebabCase(this.baseName);
                this.pascalizedBaseName = toPascalCase(this.baseName);
                this.herokuExecutablePath = Which.sync('heroku');
                this.dockerExecutablePath = Which.sync('docker');
                this.log(chalk.yellow.bold(`\nHeroku executable path: ${this.herokuExecutablePath}`));
                this.log(chalk.yellow.bold(`\nDocker executable path: ${this.dockerExecutablePath}`));
            },
        };
    }

    get initializing() {
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
                            this.config.set({
                                herokuAppName: null,
                                herokuDeployType: this.herokuDeployType,
                            });
                            this.abort = true;
                            this.log.error(`Could not find application: ${chalk.cyan(this.herokuAppName)}`);
                            this.log.error('Run the generator again to create a new application.');
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

            askForBlazor() {
                const done = this.async();

                if (this.clientFramework === BLAZOR) {
                    if (this.herokuBlazorAppName) {
                        // ChildProcess.exec(`heroku apps:info --json ${this.herokuBlazorAppName}`, (err, stdout) => {
                        ChildProcess.execFile(
                            this.herokuExecutablePath,
                            ['apps:info', '--json', this.herokuBlazorAppName],
                            (err, stdout) => {
                                if (err) {
                                    this.config.set({
                                        herokuBlazorAppName: null,
                                        herokuDeployType: this.herokuDeployType,
                                    });
                                    this.abort = true;
                                    this.log.error(`Could not find application: ${chalk.cyan(this.herokuBlazorAppName)}`);
                                    this.log.error('Run the generator again to create a new application.');
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
                            }
                        );
                    } else {
                        const prompts = [
                            {
                                type: 'input',
                                name: 'herokuBlazorAppName',
                                message: 'Name to deploy the Blazor client as:',
                                default: `${this.baseName}BlazorClient`,
                            },
                            {
                                type: 'list',
                                name: 'herokuRegion',
                                message: 'On which region do you want to deploy?',
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
                            // if region was not provided before use the one provided by the user
                            if (!this.herokuRegion) {
                                this.herokuRegion = props.herokuRegion;
                            }
                            this.herokuBlazorAppExists = false;
                            done();
                        });
                    }
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
                                name: 'Heroku Container Registry',
                            },
                        ],
                        default: 0,
                    },
                ];

                return this.prompt(prompts).then(props => {
                    this.herokuDeployType = props.herokuDeployType;
                });
            },

            askForOkta() {
                if (this.abort) return null;
                if (this.authenticationType !== 'oauth2') return null;
                if (this.useOkta) return null;
                const prompts = [
                    {
                        type: 'list',
                        name: 'useOkta',
                        message:
                            'You are using OAuth 2.0. Do you want to use Okta as your identity provider it yourself? When you choose Okta, the automated configuration of users and groups requires cURL and jq.',
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
                    {
                        type: 'password',
                        name: 'oktaAdminPassword',
                        message:
                            'Initial password for the JHipster Admin user. Password requirements: at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username.',
                        mask: true,
                        validate: input => {
                            if (!input) {
                                return 'You must enter an initial password for the JHipster admin';
                            }
                            // try to mimic the password requirements by the okta addon
                            const passwordRegex = new RegExp('^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}$');

                            if (passwordRegex.test(input)) {
                                return true;
                            }

                            return 'Your password must be at least 8 characters long and contain a lowercase letter, an uppercase letter, a number, and no parts of your username!';
                        },
                    },
                ];

                return this.prompt(prompts).then(props => {
                    this.useOkta = props.useOkta;
                    this.oktaAdminLogin = props.oktaAdminLogin;
                    this.oktaAdminPassword = props.oktaAdminPassword;
                });
            },
        };
    }

    get prompting() {
        return this._prompting();
    }

    _configuring() {
        return {
            checkInstallation() {
                if (this.abort) return;
                const done = this.async();

                // ChildProcess.exec('heroku --version', err => {
                ChildProcess.execFile(this.herokuExecutablePath, ['--version'], err => {
                    if (err) {
                        this.log.error("You don't have the Heroku CLI installed. Download it from https://cli.heroku.com/");
                        this.abort = true;
                    }

                    done();
                });
            },

            checkDocker() {
                if (this.abort) return;
                const done = this.async();

                // ChildProcess.exec('heroku --version', err => {
                ChildProcess.execFile(this.dockerExecutablePath, ['--version'], err => {
                    if (err) {
                        this.log.error("You don't have the Docker CLI installed.");
                        this.abort = true;
                    }

                    done();
                });
            },

            herokuContainerRegistryLogin() {
                if (this.abort) return;
                const done = this.async();

                const herokuContainerLoginCommand = 'heroku container:login';
                this.log(chalk.bold('\nRunning'), chalk.cyan(herokuContainerLoginCommand));
                ChildProcess.execFile(this.herokuExecutablePath, ['container:login'], (err, stdout, stderr) => {
                    if (err) {
                        this.log.error(err);
                        this.log.error("There was a problem while running the command 'heroku container:login'");
                        this.abort = true;
                    } else {
                        this.log(stdout);
                    }

                    done();
                });
            },

            saveConfig() {
                this.config.set({
                    herokuAppName: this.herokuAppName,
                    herokuBlazorAppName: this.herokuBlazorAppName,
                    herokuDeployType: this.herokuDeployType,
                    useOkta: this.useOkta,
                    oktaAdminLogin: this.oktaAdminLogin,
                    oktaAdminPassword: this.oktaAdminPassword,
                });
            },
        };
    }

    get configuring() {
        return this._configuring();
    }

    _default() {
        return {
            insight() {
                statistics.sendSubGenEvent('generator', 'heroku');
            },

            herokuCreate() {
                if (this.abort || this.herokuAppExists) return;
                const done = this.async();

                this.log(chalk.bold('\nCreating Heroku application and setting up node environment'));
                const child = ChildProcess.execFile(
                    this.herokuExecutablePath,
                    ['create', this.herokuAppName, '--region', this.herokuRegion],
                    { shell: false },
                    (error, stdoutput, stderror) => {
                        if (error) {
                            if (stderror.includes('is already taken')) {
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
                                        // ChildProcess.execFile(
                                        //     this.herokuExecutablePath,
                                        //     ['git:remote', '--app', this.herokuAppName],
                                        //     { shell: false },
                                        //     (err, stdout, stderr) => {
                                        //         if (err) {
                                        //             this.abort = true;
                                        //             this.log.error(err);
                                        //         } else {
                                        //             this.log(stdout.trim());
                                                    this.config.set({
                                                        herokuAppName: this.herokuAppName,
                                                        herokuDeployType: this.herokuDeployType,
                                                    });
                                                // }
                                                done();
                                            // }
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
                                                    this.herokuAppName = stdout.substring(
                                                        stdout.indexOf('https://') + 8,
                                                        stdout.indexOf('.herokuapp')
                                                    );
                                                    this.log(stdout.trim());

                                                    this.config.set({
                                                        herokuAppName: this.herokuAppName,
                                                        herokuDeployType: this.herokuDeployType,
                                                    });
                                                    done();
                                                }
                                            }
                                        );
                                    }
                                });
                            } else {
                                this.abort = true;
                                this.log.error(error);
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
                const done = this.async();

                this.log(chalk.bold(`\nClient framework: ${this.clientFramework}`));
                if (this.clientFramework === BLAZOR) {
                    // this.herokuBlazorAppName = `${this.herokuAppName}Blazor`;

                    this.log(chalk.bold('\nCreating Heroku BLAZOR application and setting up node environment'));
                    const child = ChildProcess.execFile(
                        this.herokuExecutablePath,
                        ['create', this.herokuBlazorAppName, '--region', this.herokuRegion],
                        { shell: false },
                        (error, stdoutput, stderror) => {
                            if (error) {
                                if (stderror.includes('is already taken')) {
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
                                            //     ['git:remote', '--app', this.herokuAppName],
                                            //     { shell: false },
                                            //     (err, stdout, stderr) => {
                                            //         if (err) {
                                            //             this.abort = true;
                                            //             this.log.error(err);
                                            //         } else {
                                            //             this.log(stdout.trim());
                                                        this.config.set({
                                                            herokuBlazorAppName: this.herokuBlazorAppName,
                                                            // herokuDeployType: this.herokuDeployType,
                                                        });
                                            //         }
                                                    done();
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
                                                        //     ['git:remote', '--app', this.herokuAppName],
                                                        //     { shell: false },
                                                        //     (e, stout, sterr) => {
                                                        //         if (e) {
                                                        //             this.abort = true;
                                                        //             this.log.error(e);
                                                        //         } else {
                                                        //             this.config.set({
                                                        //                 herokuAppName: this.herokuAppName,
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
                                    this.log.error(error);
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
                }
            },

            herokuConfigureApps() {
                if (this.abort) return;

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

                if (this.herokuDeployType === 'containerRegistry') {
                    if (!this.herokuAppExists) {
                        setHerokuStack(this.herokuAppName);
                    }

                    if (this.clientFramework === BLAZOR) {
                        if (!this.herokuBlazorAppExists) {
                            setHerokuStack(this.herokuBlazorAppName);
                            const serverUrl = `https://${this.herokuAppName}.herokuapp.com`;
                            setHerokuConfig(this.herokuBlazorAppName, 'ServerUrl', serverUrl);
                        }
                    }
                }
            },

            herokuAddonsCreate() {
                if (this.abort) return;

                this.log(chalk.bold('\nProvisioning addons'));
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

                if (this.useOkta) {
                    ChildProcess.execFile(
                        this.herokuExecutablePath,
                        ['addons:create', 'okta', '--app', this.herokuAppName],
                        { shell: false },
                        (err, stdout, stderr) => {
                            addonCreateCallback('Okta', err, stdout, stderr);
                        }
                    );
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
                    ChildProcess.execFile(
                        this.herokuExecutablePath,
                        ['addons:create', dbAddOn, '--as', 'DATABASE', '--app', this.herokuAppName],
                        { shell: false },
                        (err, stdout, stderr) => {
                            addonCreateCallback('Database', err, stdout, stderr);
                        }
                    );
                } else {
                    this.log(chalk.bold(`\nNo suitable database addon for database ${this.databaseType} available.`));
                }

                done();
            },

            copyHerokuFiles() {
                if (this.abort) return;

                const done = this.async();
                this.log(chalk.bold('\nCreating Heroku deployment files'));

                // try {
                //     fs.lstatSync('heroku.yml');
                //     this.log(chalk.bold('\nheroku.yml already exists.'));
                // } catch (e) {
                //     // An exception is thrown if the folder doesn't exist
                //     this.log(chalk.bold('\nCreating heroku.yml file.'));
                //     // TODO add heroku.yml file
                // }

                if (this.useOkta) {
                    this.template(
                        '../../node_modules/generator-jhipster/generators/heroku/templates/provision-okta-addon.sh.ejs',
                        'provision-okta-addon.sh'
                    );
                    fs.appendFile('.gitignore', 'provision-okta-addon.sh', 'utf8', (err, data) => {
                        this.log(`${chalk.yellow.bold('WARNING!')}Failed to add 'provision-okta-addon.sh' to .gitignore.'`);
                    });
                    done();
                } else {
                    done();
                }
            },
        };
    }

    get default() {
        return this._default();
    }

    _end() {
        return {
            makeScriptExecutable() {
                if (this.useOkta) {
                    try {
                        fs.chmodSync('provision-okta-addon.sh', '755');
                    } catch (err) {
                        this.log(
                            `${chalk.yellow.bold(
                                'WARNING!'
                            )}Failed to make 'provision-okta-addon.sh' executable, you may need to run 'chmod +x provison-okta-addon.sh'`
                        );
                    }
                }
            },

            async productionBuild() {
                this.log(chalk.yellow.bold('\n Production Build...'));

                if (this.abort) return;

                if (this.herokuSkipBuild) {
                    this.log(chalk.bold('\nSkipping build'));
                    return;
                }

                // const done = this.async();
                this.log(chalk.bold('\nBuilding application'));

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

                    if (this.clientFramework === BLAZOR) {
                        dockerBuild(this.herokuBlazorAppName, './Dockerfile-Front');
                    }
                }
            },

            async productionDockerDeployBackend() {
                if (this.abort) return;

                if (this.herokuSkipDeploy) {
                    this.log(chalk.bold('\nSkipping deployment'));
                    return;
                }

                if (this.herokuDeployType === 'containerRegistry') {
                    const processType = 'web';
                    this.log(chalk.bold(`\nDeploying ${this.herokuAppName} to Heroku's Container Registry`));

                    const dockerPushCommand = `docker push registry.heroku.com/${this.herokuAppName}/${processType}`;
                    this.log(chalk.bold('\nRunning'), chalk.cyan(dockerPushCommand));
                    ChildProcess.execFileSync(
                        this.dockerExecutablePath,
                        ['push', `registry.heroku.com/${this.herokuAppName}/${processType}`],
                        { shell: false, stdio: 'inherit' }
                    );

                    const herokuReleaseCommand = `heroku container:release ${processType} --app ${this.herokuAppName}`;
                    this.log(chalk.bold('\nRunning'), chalk.cyan(herokuReleaseCommand));
                    ChildProcess.execFileSync(this.herokuExecutablePath, ['container:release', processType, '--app', this.herokuAppName], {
                        shell: false,
                        stdio: 'inherit',
                    });

                    // this.log(chalk.green(`\nYour app should now be live. To view it run\n\t${chalk.bold('heroku open')}`));
                    // this.log(chalk.yellow(`And you can view the logs with this command\n\t${chalk.bold('heroku logs --tail')}`));
                    // this.log(chalk.yellow(`After application modification, redeploy it with\n\t${chalk.bold('jhipster heroku')}`));
                }
            },
            async productionDockerDeployFrontend() {
                if (this.abort) return;

                if (this.herokuSkipDeploy) {
                    this.log(chalk.bold('\nSkipping deployment'));
                    return;
                }

                if (this.herokuDeployType === 'containerRegistry' && this.clientFramework === BLAZOR) {
                    const processType = 'web';
                    this.log(chalk.bold(`\nDeploying ${this.herokuBlazorAppName} to Heroku's Container Registry`));

                    const dockerPushCommand = `docker push registry.heroku.com/${this.herokuBlazorAppName}/${processType}`;
                    this.log(chalk.bold('\nRunning'), chalk.cyan(dockerPushCommand));
                    ChildProcess.execFileSync(
                        this.dockerExecutablePath,
                        ['push', `registry.heroku.com/${this.herokuBlazorAppName}/${processType}`],
                        { shell: false, stdio: 'inherit' }
                    );

                    const herokuReleaseCommand = `heroku container:release ${processType} --app ${this.herokuBlazorAppName}`;
                    this.log(chalk.bold('\nRunning'), chalk.cyan(herokuReleaseCommand));
                    ChildProcess.execFileSync(
                        this.herokuExecutablePath,
                        ['container:release', processType, '--app', this.herokuBlazorAppName],
                        { shell: false, stdio: 'inherit' }
                    );

                    // this.log(chalk.green(`\nYour app should now be live. To view it run\n\t${chalk.bold('heroku open')}`));
                    // this.log(chalk.yellow(`And you can view the logs with this command\n\t${chalk.bold('heroku logs --tail')}`));
                    // this.log(chalk.yellow(`After application modification, redeploy it with\n\t${chalk.bold('jhipster heroku')}`));
                }
            },

            async productionDeployOkta() {
                if (this.abort) return;

                if (this.herokuSkipDeploy) {
                    this.log(chalk.bold('\nSkipping deployment'));
                    return;
                }

                if (this.useOkta) {
                    let curlAvailable = false;
                    let jqAvailable = false;
                    try {
                        await execCmd('curl --help');
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
                        await execCmd('jq --help');
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
                            chalk.green('Running ./provision-okta-addon.sh to create all required roles and users to use with jhipster.')
                        );
                        try {
                            await execCmd('./provision-okta-addon.sh');
                        } catch (err) {
                            this.log(
                                chalk.red(
                                    'Failed to execute ./provision-okta-addon.sh. Make sure to setup okta according to https://www.jhipster.tech/heroku/.'
                                )
                            );
                        }
                    }
                }
            },
        };
    }

    get end() {
        return this._end();
    }
};
