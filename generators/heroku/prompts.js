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
const Which = require('which');

function askForDotnetApp() {
    const done = this.async();

    if (this.herokuAppName) {
        ChildProcess.execFile(Which.sync('heroku'), ['apps:info', '--json', this.herokuAppName], (err, stdout) => {
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
}

function askForHerokuDeployType() {
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
                    name: 'Heroku Container Registry (build image locally and push)',
                },
                {
                    value: 'git',
                    name: 'Git (compile on Heroku)',
                },
            ],
            default: 0,
        },
    ];

    return this.prompt(prompts).then(props => {
        this.herokuDeployType = props.herokuDeployType;
    });
}

module.exports = {
    askForDotnetApp,
    askForHerokuDeployType,
};
