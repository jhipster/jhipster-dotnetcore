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
const _ = require('lodash');
const chalk = require('chalk');
const ChildProcess = require('child_process');
const fs = require('fs');
const Which = require('which');

const { OAUTH2 } = require('generator-jhipster/jdl/jhipster/authentication-types');

function gitInit() {
    const done = this.async();

    try {
        fs.lstatSync('.git');
        this.log(chalk.bold('\nUsing existing Git repository'));
        done();
    } catch (e) {
        // An exception is thrown if the folder doesn't exist
        this.log(chalk.bold('\nInitializing Git repository'));
        const child = ChildProcess.execFile(Which.sync('git'), ['init'], () => {
            done();
        });
        child.stdout.on('data', data => {
            this.log(data.toString());
        });
    }
}

function checkHeroku() {
    const done = this.async();

    ChildProcess.execFile(Which.sync('heroku'), ['--version'], err => {
        if (err) {
            this.log.error("You don't have the Heroku CLI installed. Download it from https://cli.heroku.com/");
            this.abort = true;
        }
        done();
    });
}

function checkDocker() {
    const done = this.async();

    if (this.herokuDeployType === 'containerRegistry') {
        ChildProcess.execFile(Which.sync('docker'), ['--version'], err => {
            if (err) {
                this.log.error("You don't have the Docker CLI installed.");
                this.abort = true;
            }

            done();
        });
    } else {
        done();
    }
}

function checkContainerRegistry() {
    const done = this.async();

    if (this.herokuDeployType === 'containerRegistry') {
        const herokuContainerLoginCommand = 'heroku container:login';
        this.log(chalk.bold('\nRunning'), chalk.cyan(herokuContainerLoginCommand));
        ChildProcess.execFile(Which.sync('heroku'), ['container:login'], (err, stdout) => {
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
}

function verifyCredentialsCallback(data, done) {
    const output = data.toString();
    if (data.search('Heroku credentials') >= 0) {
        this.abort = true;
        this.log.error("Error: Not authenticated. Run 'heroku login' to login to your heroku account and try again.");
        done();
    } else {
        this.log(output.trim());
    }
}

function gitRemote(done) {
    // ensure that the git remote is the same as the appName
    ChildProcess.execFile(Which.sync('heroku'), ['git:remote', '--app', this.herokuAppName], errr => {
        if (errr) {
            this.abort = true;
            this.log.error(errr);
        } else {
            this.config.set({
                herokuAppName: this.herokuAppName,
                herokuDeployType: this.herokuDeployType,
            });
        }
        done();
    });
}

function createDotnetAppWithRandomName(done) {
    ChildProcess.execFile(Which.sync('heroku'), ['create', '--region', this.herokuRegion], { shell: false }, (error, stdoutput) => {
        if (error) {
            this.abort = true;
            this.log.error(error);
        } else {
            // Extract from "Created random-app-name-1234... done"
            this.herokuAppName = stdoutput.substring(stdoutput.indexOf('https://') + 8, stdoutput.indexOf('.herokuapp'));
            this.log(stdoutput.trim());

            // ensure that the git remote is the same as the appName
            gitRemote.call(this, done);
        }
    });
}

function createDotnetApp() {
    this.log(chalk.bold('\nCreating Heroku application and setting up node environment'));
    const done = this.async();
    const child = ChildProcess.execFile(
        Which.sync('heroku'),
        ['create', this.herokuAppName, '--region', this.herokuRegion],
        { shell: false },
        (err, _stdout, stderr) => {
            if (err) {
                if (stderr.includes('is already taken')) {
                    const prompts = [
                        {
                            type: 'list',
                            name: 'herokuForceName',
                            message: `The Heroku application "${chalk.cyan(this.herokuAppName)}" already exists! Use it anyways?`,
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
                            gitRemote.call(this, done);
                        } else {
                            createDotnetAppWithRandomName.call(this, done);
                        }
                    });
                } else {
                    this.abort = true;
                    if (stderr.includes('Invalid credentials')) {
                        this.log.error("Error: Not authenticated. Run 'heroku login' to login to your heroku account and try again.");
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
        verifyCredentialsCallback.call(this, data, done);
    });
}

function provisionAddons() {
    const done = this.async();
    const addonCreateCallback = (addon, err) => {
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

    if (this.authenticationType === OAUTH2) {
        ChildProcess.execFile(Which.sync('heroku'), ['addons:create', 'okta', '--app', this.herokuAppName], err => {
            addonCreateCallback('Okta', err);
        });
    }

    let dbAddOn;
    if (this.databaseType === 'postgres') {
        dbAddOn = 'heroku-postgresql';
    } else if (this.databaseType === 'mysql') {
        dbAddOn = 'jawsdb:kitefin';
    }

    if (this.databaseType === 'mssql') {
        this.log(chalk.yellow("Heroku's MS SQL Server addon is not free of cost and will NOT be provisioned."));
        this.log(chalk.yellow('Please see the documentation link below for more information:'));
        this.log(chalk.yellow('https://jhipsternet.readthedocs.io/en/latest/Features/heroku.html#databases'));
    } else if (dbAddOn) {
        this.log(chalk.bold(`\nProvisioning database addon ${dbAddOn}`));
        ChildProcess.execFile(
            Which.sync('heroku'),
            ['addons:create', dbAddOn, '--as', 'DATABASE', '--app', this.herokuAppName],
            { shell: false },
            err => {
                addonCreateCallback('Database', err);
            }
        );
    } else {
        this.log(chalk.bold(`\nNo suitable database addon for database ${this.prodDatabaseType} available.`));
    }

    done();
}

module.exports = {
    gitInit,
    checkHeroku,
    checkDocker,
    checkContainerRegistry,
    createDotnetApp,
    provisionAddons,
};
