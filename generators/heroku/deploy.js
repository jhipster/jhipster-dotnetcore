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
const chalk = require('chalk');
const ChildProcess = require('child_process');
const util = require('util');
const Which = require('which');
const { OAUTH2 } = require('generator-jhipster/jdl/jhipster/authentication-types');
const { BLAZOR } = require('../generator-dotnetcore-constants.cjs');

const execFileCmd = util.promisify(ChildProcess.execFile);

function setHerokuStack(appName, log) {
    const herokuStackSetCommand = `heroku stack:set container --app ${appName}`;
    log(chalk.bold('\nRunning'), chalk.cyan(herokuStackSetCommand));
    ChildProcess.execFileSync(Which.sync('heroku'), ['stack:set', 'container', '--app', appName], {
        shell: false,
    });
}

function setHerokuConfig(appName, configKey, configValue, log) {
    const herokuStackSetCommand = `heroku config:set ${configKey}=${configValue} --app ${appName}`;
    log(chalk.bold('\nRunning'), chalk.cyan(herokuStackSetCommand));
    ChildProcess.execFileSync(Which.sync('heroku'), ['config:set', `${configKey}=${configValue}`, '--app', appName], {
        shell: false,
    });
}

function dockerPush(appName, log) {
    const processType = 'web';
    const dockerPushCommand = `docker push registry.heroku.com/${appName}/${processType}`;
    log(chalk.bold('\nRunning'), chalk.cyan(dockerPushCommand));
    ChildProcess.execFileSync(Which.sync('docker'), ['push', `registry.heroku.com/${appName}/${processType}`], {
        shell: false,
        stdio: 'inherit',
    });
}

function herokuRelease(appName, log) {
    const processType = 'web';
    const herokuReleaseCommand = `heroku container:release ${processType} --app ${appName}`;
    log(chalk.bold('\nRunning'), chalk.cyan(herokuReleaseCommand));
    ChildProcess.execFileSync(Which.sync('heroku'), ['container:release', processType, '--app', appName], {
        shell: false,
        stdio: 'inherit',
    });
}

function herokuContainerRegistryDeploy() {
    try {
        this.log(chalk.bold(`\nDeploying ${this.herokuAppName} to Heroku's Container Registry`));
        const serverUrl = `https://${this.herokuAppName}.herokuapp.com`;
        setHerokuStack(this.herokuAppName, this.log);
        setHerokuConfig(this.herokuAppName, 'ServerUrl', serverUrl, this.log);
        dockerPush(this.herokuAppName, this.log);
        herokuRelease(this.herokuAppName, this.log);

        this.log(chalk.green(`\nYour app should now be live. To view it run\n\t${chalk.bold('heroku open')}`));
        this.log(chalk.green('\nOr open the following URL in your browser:'));
        this.log(chalk.green(serverUrl));
        const herokuLogCommandDotnetBack = `heroku logs --tail --app ${this.herokuAppName}`;
        this.log(chalk.yellow(`And you can view the logs with this command\n\t${chalk.bold(herokuLogCommandDotnetBack)}`));

        if (this.authenticationType === OAUTH2) {
            this.log(
                chalk.bold(
                    '\nYou are using OAuth 2.0. OAuth2/okta requires a manual setup. Please see the documentation for more information at the below url:'
                )
            );
            this.log(chalk.green('https://jhipsternet.readthedocs.io/en/latest/Features/heroku.html#oauth2'));
        }
        this.log(chalk.yellow(`\nAfter application modification, redeploy it with\n\t${chalk.bold('jhipster heroku')}\n`));
    } catch (err) {
        this.log.error(err);
    }
}

async function herokuGitDeploy() {
    try {
        this.log(chalk.bold('\nUpdating Git repository'));
        const serverUrl = `https://${this.herokuAppName}.herokuapp.com`;
        const gitAddCmd = 'git add .';
        this.log(chalk.cyan(gitAddCmd));

        const gitAdd = execFileCmd(Which.sync('git'), ['add', '.']);
        gitAdd.child.stdout.on('data', data => {
            this.log(data);
        });

        gitAdd.child.stderr.on('data', data => {
            this.log(data);
        });

        await gitAdd;

        const gitCommitCmd = 'git commit -m "Deploy to Heroku" --allow-empty';
        this.log(chalk.cyan(gitCommitCmd));

        const gitCommit = execFileCmd(Which.sync('git'), ['commit', '-m', '"Deploy to Heroku"', '--allow-empty']);
        gitCommit.child.stdout.on('data', data => {
            this.log(data);
        });

        gitCommit.child.stderr.on('data', data => {
            this.log(data);
        });
        await gitCommit;

        this.log(chalk.bold('\nConfiguring Heroku'));
        setHerokuStack(this.herokuAppName, this.log);

        if (this.clientFramework === BLAZOR) {
            setHerokuConfig(this.herokuAppName, 'ServerUrl', serverUrl, this.log);
        }

        this.log(chalk.bold('\nDeploying application'));

        const herokuPush = execFileCmd(Which.sync('git'), ['push', 'heroku', 'HEAD:main'], {
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
        this.log(chalk.green('\nOr open the following URL in your browser:'));
        this.log(chalk.green(serverUrl));
        const herokuLogsCommand = `heroku logs --tail --app ${this.herokuAppName}`;
        this.log(chalk.yellow(`And you can view the logs with this command\n\t${chalk.bold(herokuLogsCommand)}`));
        this.log(chalk.yellow(`After application modification, redeploy it with\n\t${chalk.bold('jhipster heroku')}`));
    } catch (err) {
        this.log.error(err);
    }
}

module.exports = {
    herokuContainerRegistryDeploy,
    herokuGitDeploy,
};
