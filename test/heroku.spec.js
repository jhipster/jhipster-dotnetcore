const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fse = require('fs-extra');
const sinon = require('sinon');
const ChildProcess = require('child_process');
const Which = require('which');

const herokuExecutable = 'heroku';
const dockerExecutable = 'docker';

const expectedFiles = {
    monolith: [],
};

describe('JHipster Heroku Sub Generator', () => {
    const herokuAppName = 'jhipster-test';
    // let stub;
    let stubExecFile;
    // let stubExecSync;
    let stubExecFileSync;
    let stubWhich;
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        stubWhich = sandbox.stub(Which, 'sync');
        stubWhich.withArgs('heroku').returns(herokuExecutable);
        stubWhich.withArgs('docker').returns(dockerExecutable);
        stubExecFile = sandbox.stub(ChildProcess, 'execFile');
        stubExecFile.withArgs(herokuExecutable, ['--version']).yields(false);

        // stubExecFile
        //     .withArgs(herokuExecutable, ['create', herokuAppName, '--region', 'eu'], { shell: false })
        //     .yields(false, '', '')
        //     .returns({
        //         stdout: {
        //             on: () => {},
        //         },
        //     });
        // stubExecFile
        //     .withArgs(herokuExecutable, ['create', herokuAppName, '--region', 'us'], { shell: false })
        //     .yields(false, '', '')
        //     .returns({
        //         stdout: {
        //             on: () => {},
        //         },
        //     });
        // stubExecFileSync = sandbox.stub(ChildProcess, 'execFileSync');
        // stubExecFileSync
        //     .withArgs(herokuExecutable, ['stack:set', 'container', '--app', herokuAppName], {
        //         shell: false,
        //     })
        //     .returns({});
        // stubExecFileSync
        //     .withArgs(this.herokuExecutablePath, ['config:set', '=', '--app', herokuAppName], {
        //         shell: false,
        //     })
        //     .returns({});
        // stubExecFileSync
        //     .withArgs(this.dockerExecutablePath, ['build', '-f', './Dockerfile-Back', '-t', `${herokuAppName}:latest`, '.'], {
        //         shell: false,
        //         stdio: 'inherit',
        //     })
        //     .returns({});
        // stubExecFileSync
        //     .withArgs(this.dockerExecutablePath, ['tag', herokuAppName, `registry.heroku.com/${herokuAppName}/web}`], {
        //         shell: false,
        //         stdio: 'inherit',
        //     })
        //     .returns({});
        // stubExecFileSync
        //     .withArgs(this.dockerExecutablePath, ['push', `registry.heroku.com/${herokuAppName}/web`], { shell: false, stdio: 'inherit' })
        //     .returns({});
        // stubExecFileSync
        //     .withArgs(this.herokuExecutablePath, ['container:release', 'web', '--app', herokuAppName], {
        //         shell: false,
        //         stdio: 'inherit',
        //     })
        //     .returns({});
    });
    afterEach(() => {
        sandbox.restore();
        // ChildProcess.execFile.restore();
    });

    describe('monolith application', () => {
        describe('with an unavailable app name', () => {
            const autogeneratedAppName = 'jhipster-new-name';
            beforeEach(done => {
                stubExecFile
                    .withArgs(herokuExecutable, ['create', herokuAppName, '--region', 'us'], { shell: false })
                    .yields(true, '', `Name ${herokuAppName} is already taken`)
                    .returns({
                        stdout: {
                            on: () => {},
                        },
                    });
                stubExecFile
                    .withArgs(herokuExecutable, ['create', '--region', 'us'], { shell: false })
                    .yields(false, `https://${autogeneratedAppName}.herokuapp.com`);
                stubExecFile
                    .withArgs(herokuExecutable, ['git:remote', '--app', autogeneratedAppName], { shell: false })
                    .yields(false, `https://${autogeneratedAppName}.herokuapp.com`);
                stubExecFile
                    .withArgs(
                        herokuExecutable,
                        ['addons:create', 'jawsdb:kitefin', '--as', 'DATABASE', '--app', autogeneratedAppName],
                        {
                            shell: false,
                        }
                    )
                    .yields(false, '', '');
                helpers
                    .run(require.resolve('../generators/heroku'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/default'), dir);
                    })
                    .withOptions({ skipBuild: true })
                    .withPrompts({
                        herokuAppName,
                        herokuRegion: 'us',
                        herokuDeployType: 'git',
                        herokuForceName: 'No',
                        useOkta: false,
                    })
                    .on('end', done);
            });
            it('creates expected monolith files', () => {
                assert.file(expectedFiles.monolith);
                assert.fileContent('.yo-rc.json', `"herokuAppName": "${autogeneratedAppName}"`);
                assert.fileContent('.yo-rc.json', '"herokuDeployType": "git"');
            });
        });

        describe('in the US', () => {
            beforeEach(done => {
                stubExecFile
                    .withArgs(
                        herokuExecutable,
                        ['addons:create', 'jawsdb:kitefin', '--as', 'DATABASE', '--app', this.herokuAppName],
                        {
                            shell: false,
                        }
                    )
                    .yields(false, '', '');
                helpers
                    .run(require.resolve('../generators/heroku'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/default/'), dir);
                    })
                    .withOptions({ skipBuild: true })
                    .withPrompts({
                        herokuAppName,
                        herokuRegion: 'us',
                        herokuDeployType: 'git',
                        useOkta: false,
                    })
                    .on('end', done);
            });
            it('creates expected monolith files', () => {
                assert.file(expectedFiles.monolith);
                assert.fileContent('.yo-rc.json', '"herokuDeployType": "git"');
            });
        });

        describe('in the EU', () => {
            beforeEach(done => {
                stubExecFile
                    .withArgs(
                        herokuExecutable,
                        ['addons:create', 'jawsdb:kitefin', '--as', 'DATABASE', '--app', this.herokuAppName],
                        {
                            shell: false,
                        }
                    )
                    .yields(false, '', '');
                helpers
                    .run(require.resolve('../generators/heroku'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/default/'), dir);
                    })
                    .withOptions({ skipBuild: true })
                    .withPrompts({
                        herokuAppName,
                        herokuRegion: 'eu',
                        herokuDeployType: 'git',
                        useOkta: false,
                    })
                    .on('end', done);
            });
            it('creates expected monolith files', () => {
                assert.file(expectedFiles.monolith);
            });
        });

        describe('with PostgreSQL', () => {
            beforeEach(done => {
                stubExecFile
                    .withArgs(
                        herokuExecutable,
                        ['addons:create', 'heroku-postgresql', '--as', 'DATABASE', '--app', this.herokuAppName],
                        {
                            shell: false,
                        }
                    )
                    .yields(false, '', '');
                helpers
                    .run(require.resolve('../generators/heroku'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/default-psql/'), dir);
                    })
                    .withOptions({ skipBuild: true })
                    .withPrompts({
                        herokuAppName,
                        herokuRegion: 'eu',
                        herokuDeployType: 'git',
                        useOkta: false,
                    })
                    .on('end', done);
            });
            it('creates expected monolith files', () => {
                assert.file(expectedFiles.monolith);
            });
        });

        describe('with Microsoft Sql Server', () => {
            beforeEach(done => {
                stubExecFile
                    .withArgs(herokuExecutable, ['addons:create', 'mssql:micro', '--as', 'DATABASE', '--app', this.herokuAppName], {
                        shell: false,
                    })
                    .yields(false, '', '');
                helpers
                    .run(require.resolve('../generators/heroku'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/default-mssql/'), dir);
                    })
                    .withOptions({ skipBuild: true })
                    .withPrompts({
                        herokuAppName,
                        herokuRegion: 'eu',
                        herokuDeployType: 'git',
                        useOkta: false,
                    })
                    .on('end', done);
            });
            it('creates expected monolith files', () => {
                assert.file(expectedFiles.monolith);
            });
        });

        describe('with existing app', () => {
            const existingHerokuAppName = 'jhipster-existing';
            beforeEach(done => {
                // stub.withArgs('heroku apps:info --json').yields(false, `{"app":{"name":"${existingHerokuAppName}"}, "dynos":[]}`);
                stubExecFile
                    .withArgs(herokuExecutable, ['apps:info', '--json', existingHerokuAppName])
                    .yields(false, `{"app":{"name":"${existingHerokuAppName}"}, "dynos":[]}`);
                stubExecFile
                    .withArgs(
                        herokuExecutable,
                        ['addons:create', 'jawsdb:kitefin', '--as', 'DATABASE', '--app', existingHerokuAppName],
                        {
                            shell: false,
                        }
                    )
                    .yields(false, '', '');
                helpers
                    .run(require.resolve('../generators/heroku'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/heroku/'), dir);
                    })
                    .withOptions({ skipBuild: true })
                    .on('end', done);
            });
            it('creates expected monolith files', () => {
                assert.file(expectedFiles.monolith);
                assert.fileContent('.yo-rc.json', `"herokuAppName": "${existingHerokuAppName}"`);
            });
        });
    });
});
