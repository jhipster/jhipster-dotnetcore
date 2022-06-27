const _ = require('lodash');
const chalk = require('chalk');
const ChildProcess = require('child_process');
const Which = require('which');
const { BLAZOR } = require('../generator-dotnetcore-constants');

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

function askForBlazorApp() {
    const done = this.async();

    if (this.herokuBlazorAppName) {
        ChildProcess.execFile(Which.sync('heroku'), ['apps:info', '--json', this.herokuBlazorAppName], (err, stdout) => {
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

        this.prompt(prompts).then(props => {
            this.herokuBlazorAppName = _.kebabCase(props.herokuBlazorAppName);
            this.herokuRegion = props.herokuRegion;
            this.herokuBlazorAppExists = false;
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
    if (this.clientFramework === BLAZOR) {
        prompts[0].choices.pop();
    }

    return this.prompt(prompts).then(props => {
        this.herokuDeployType = props.herokuDeployType;
    });
}

module.exports = {
    askForDotnetApp,
    askForBlazorApp,
    askForHerokuDeployType,
};
