const chalk = require('chalk');
const ChildProcess = require('child_process');
const Which = require('which');

function dockerBuild(appName, dockerFile, log) {
    const processType = 'web';
    log(chalk.bold(`\nBuilding ${appName}`));

    const dockerBuildCommand = `docker build -f ${dockerFile} -t ${appName}:latest .`;
    log(chalk.bold('\nRunning'), chalk.cyan(dockerBuildCommand));
    ChildProcess.execFileSync(Which.sync('docker'), ['build', '-f', dockerFile, '-t', `${appName}:latest`, '.'], {
        shell: false,
        stdio: 'inherit',
    });

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
