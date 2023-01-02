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
const Which = require('which');

function dockerBuild(appName, dockerFile, log) {
    const processType = 'web';
    log(chalk.bold(`\nBuilding ${appName}`));

    const dockerBuildCommand = `docker build -f ${dockerFile} -t ${appName}:latest .`;
    log(chalk.bold('\nRunning'), chalk.cyan(dockerBuildCommand));
    ChildProcess.execFileSync(
        Which.sync('docker'),
        ['build', '-f', dockerFile, '--build-arg', 'INCLUDE_BLAZOR=true', '-t', `${appName}:latest`, '.'],
        {
            shell: false,
            stdio: 'inherit',
        }
    );

    const dockerTagCommand = `docker tag ${appName} registry.heroku.com/${appName}/${processType}`;
    log(chalk.bold('\nRunning'), chalk.cyan(dockerTagCommand));
    ChildProcess.execFileSync(Which.sync('docker'), ['tag', appName, `registry.heroku.com/${appName}/${processType}`], {
        shell: false,
        stdio: 'inherit',
    });
}

module.exports = {
    dockerBuild,
};
