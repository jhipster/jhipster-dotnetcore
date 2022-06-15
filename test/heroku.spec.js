const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fse = require('fs-extra');
const sinon = require('sinon');
const ChildProcess = require('child_process');
// const constants = require('generator-jhipster/generators/generator-constants');
const Which = require('which');

const expectedFiles = {
    monolith: ['heroku.yml'],
};

describe('JHipster Heroku Sub Generator', () => {
    const herokuAppName = 'jhipster-test';
    const herokuBlazorAppName = 'jhipster-blazor-test';
    const herokuExecutable = 'heroku';
    const dockerExecutable = 'docker';
    const gitExecutable = 'git';

    let stubWhich;
    let stubExecFile;

    beforeEach(() => {
        stubWhich = sinon.stub(Which, 'sync');
        stubWhich.withArgs('heroku').returns(herokuExecutable);
        stubWhich.withArgs('docker').returns(dockerExecutable);
        stubWhich.withArgs('git').returns(gitExecutable);
        stubWhich.withArgs('curl').returns('curl');
        stubWhich.withArgs('jq').returns('jq');

        // stub = sinon.stub(ChildProcess, 'exec');
        // log all calls to ChildProcess.exec
        // stub.callsFake(function (command, callback) {
        //     console.log(command);
        //     callback(null, '', '');
        // });
        // stub.withArgs('heroku --version').yields(false);
        // stub.withArgs('heroku plugins').yields(false, 'heroku-cli-deploy');
        // stub.withArgs('git init').yields([false, '', '']);

        stubExecFile = sinon.stub(ChildProcess, 'execFile');
        stubExecFile.withArgs(herokuExecutable, ['--version']).yields(false);
        stubExecFile.withArgs(dockerExecutable, ['--version']).yields(false);
        stubExecFile.withArgs(herokuExecutable, ['container:login']).yields(false);
        stubExecFile.withArgs(gitExecutable, ['init']).yields([false, '', '']);
        stubExecFile.withArgs(herokuExecutable, ['plugins']).yields(false, 'heroku-cli-deploy');
    });
    afterEach(() => {
        ChildProcess.exec.restore();
        ChildProcess.execFile.restore();
        Which.sync.restore();
    });

    describe('with container registry', () => {
        beforeEach(done => {
            // stub.withArgs(`heroku create ${herokuAppName}`).yields(false, '', '');
            stubExecFile.withArgs(herokuExecutable, ['create', herokuAppName, '--region', 'us']).yields(false, '', '');
            // stub.withArgs(`heroku addons:create jawsdb:kitefin --as DATABASE --app ${herokuAppName}`).yields(false, '', '');
            stubExecFile
                .withArgs(herokuExecutable, ['addons:create', 'jawsdb:kitefin', '--as', 'DATABASE', '--app', herokuAppName])
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
                    herokuDeployType: 'containerRegistry',
                    useOkta: false,
                })
                .on('end', done);
        });
        it('creates expected monolith files', () => {
            assert.file(expectedFiles.monolith);
            assert.fileContent('.yo-rc.json', '"herokuDeployType": "containerRegistry"');
            // assert.fileContent(`${constants.SERVER_MAIN_RES_DIR}/config/application-heroku.yml`, 'datasource:');
            // assert.noFileContent(`${constants.SERVER_MAIN_RES_DIR}/config/application-heroku.yml`, 'mongodb:');
        });
    });

    describe('with blazor', () => {
        beforeEach(done => {
            // stub.withArgs(`heroku create ${herokuAppName}`).yields(false, '', '');
            stubExecFile.withArgs(herokuExecutable, ['create', herokuAppName, '--region', 'us']).yields(false, '', '');
            stubExecFile.withArgs(herokuExecutable, ['create', herokuBlazorAppName, '--region', 'us']).yields(false, '', '');
            // stub.withArgs(`heroku addons:create jawsdb:kitefin --as DATABASE --app ${herokuAppName}`).yields(false, '', '');
            stubExecFile
                .withArgs(herokuExecutable, ['addons:create', 'jawsdb:kitefin', '--as', 'DATABASE', '--app', herokuAppName])
                .yields(false, '', '');
            helpers
                .run(require.resolve('../generators/heroku'))
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, './templates/default-blazor/'), dir);
                })
                .withOptions({ skipBuild: true })
                .withPrompts({
                    herokuAppName,
                    herokuRegion: 'us',
                    herokuDeployType: 'containerRegistry',
                    herokuBlazorAppName,
                    useOkta: false,
                })
                .on('end', done);
        });
        it('creates expected monolith files', () => {
            assert.file(expectedFiles.monolith);
            assert.fileContent('.yo-rc.json', `"herokuAppName": "${herokuAppName}"`);
            assert.fileContent('.yo-rc.json', `"herokuBlazorAppName": "${herokuBlazorAppName}"`);
            assert.fileContent('.yo-rc.json', '"clientFramework": "Blazor"');
            assert.fileContent('.yo-rc.json', '"herokuDeployType": "containerRegistry"');
            // assert.fileContent(`${constants.SERVER_MAIN_RES_DIR}/config/application-heroku.yml`, 'datasource:');
            // assert.noFileContent(`${constants.SERVER_MAIN_RES_DIR}/config/application-heroku.yml`, 'mongodb:');
        });
    });

    // describe('microservice application', () => {
    //     describe('with JAR deployment', () => {
    //         beforeEach(done => {
    //             stub.withArgs(`heroku create ${herokuAppName}`).yields(false, '', '');
    //             stub.withArgs(`heroku addons:create jawsdb:kitefin --as DATABASE --app ${herokuAppName}`).yields(false, '', '');
    //             stub
    //                 .withArgs(`heroku config:set JHIPSTER_REGISTRY_URL=https://admin:changeme@sushi.herokuapp.com --app ${herokuAppName}`)
    //                 .yields(false, '', '')
    //                 .returns({
    //                     stdout: {
    //                         on: () => { },
    //                     },
    //                 });
    //             helpers
    //                 .run(require.resolve('../generators/heroku'))
    //                 .inTmpDir(dir => {
    //                     fse.copySync(path.join(__dirname, './templates/default-microservice/'), dir);
    //                 })
    //                 .withOptions({ skipBuild: true })
    //                 .withPrompts({
    //                     herokuAppName,
    //                     herokuRegion: 'us',
    //                     herokuDeployType: 'jar',
    //                     herokuJHipsterRegistryApp: 'sushi',
    //                     herokuJHipsterRegistryUsername: 'admin',
    //                     herokuJHipsterRegistryPassword: 'changeme',
    //                     herokuJavaVersion: '11',
    //                     useOkta: false,
    //                 })
    //                 .on('end', done);
    //         });
    //         it('creates expected files', () => {
    //             assert.fileContent('.yo-rc.json', '"herokuDeployType": "jar"');
    //         });
    //     });
    // });

    describe('monolith application', () => {
        describe('with an unavailable app name', () => {
            const autogeneratedAppName = 'jhipster-new-name';
            beforeEach(done => {
                // stub
                //     .withArgs(`heroku create ${herokuAppName}`)
                //     .yields(true, '', `Name ${herokuAppName} is already taken`)
                //     .returns({
                //         stdout: {
                //             on: () => { },
                //         },
                //     });
                stubExecFile
                    .withArgs(herokuExecutable, ['create', herokuAppName, '--region', 'us'])
                    .yields(true, '', `Name ${herokuAppName} is already taken`)
                    .returns({
                        stdout: {
                            on: () => {},
                        },
                    });
                // stub.withArgs('heroku create ').yields(false, `https://${autogeneratedAppName}.herokuapp.com`);
                stubExecFile
                    .withArgs(herokuExecutable, ['create', '--region', 'us'])
                    .yields(false, `https://${autogeneratedAppName}.herokuapp.com`);
                // stub.withArgs(`heroku git:remote --app ${autogeneratedAppName}`).yields(false, `https://${autogeneratedAppName}.herokuapp.com`);
                stubExecFile
                    .withArgs(herokuExecutable, ['git:remote', '--app', autogeneratedAppName])
                    .yields(false, `https://${autogeneratedAppName}.herokuapp.com`);
                // stub.withArgs(`heroku addons:create jawsdb:kitefin --as DATABASE --app ${autogeneratedAppName}`).yields(false, '', '');
                stubExecFile
                    .withArgs(herokuExecutable, ['addons:create', 'jawsdb:kitefin', '--as', 'DATABASE', '--app', autogeneratedAppName])
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
                        herokuDeployType: 'containerRegistry',
                        herokuForceName: 'No',
                        useOkta: false,
                    })
                    .on('end', done);
            });
            it('creates expected monolith files', () => {
                assert.file(expectedFiles.monolith);
                assert.fileContent('.yo-rc.json', `"herokuAppName": "${autogeneratedAppName}"`);
            });
        });

        describe('with Git deployment', () => {
            beforeEach(done => {
                // stub.withArgs(`heroku create ${herokuAppName}`).yields(false, '', '');
                stubExecFile.withArgs(herokuExecutable, ['create', herokuAppName, '--region', 'us']).yields(false, '', '');
                // stub.withArgs(`heroku addons:create jawsdb:kitefin --as DATABASE --app ${herokuAppName}`).yields(false, '', '');
                stubExecFile
                    .withArgs(herokuExecutable, ['addons:create', 'jawsdb:kitefin', '--as', 'DATABASE', '--app', herokuAppName])
                    .yields(false, '', '');
                // stub.withArgs('git add .').yields(false, '', '');
                stubExecFile.withArgs(gitExecutable, ['add', '.']).yields(false, '', '');
                // stub.withArgs('git commit -m "Deploy to Heroku" --allow-empty').yields(false, '', '');
                stubExecFile.withArgs(gitExecutable, ['commit', '-m', '"Deploy to Heroku"', '--allow-empty']).yields(false, '', '');
                // stub.withArgs(`heroku config:set MAVEN_CUSTOM_OPTS="-Pprod,heroku -DskipTests" --app ${herokuAppName}`).yields(false, '', '');
                // stubExecFile
                //     .withArgs(herokuExecutable, ['config:set', 'MAVEN_CUSTOM_OPTS="-Pprod,heroku -DskipTests"', '--app', herokuAppName])
                //     .yields(false, '', '');
                // // stub.withArgs(`heroku buildpacks:add heroku/java --app ${herokuAppName}`).yields(false, '', '');
                // stubExecFile.withArgs(herokuExecutable, ['buildpacks:add', 'heroku/java', '--app', herokuAppName]).yields(false, '', '');
                // // stub.withArgs('git push heroku HEAD:master').yields(false, '', '');
                stubExecFile.withArgs(gitExecutable, ['push', 'heroku', 'HEAD:master']).yields(false, '', '');
                helpers
                    .run(require.resolve('../generators/heroku'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/default'), dir);
                    })
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

        describe('in the US', () => {
            beforeEach(done => {
                // stub.withArgs(`heroku create ${herokuAppName}`).yields(false, '', '');
                stubExecFile.withArgs(herokuExecutable, ['create', herokuAppName, '--region', 'us']).yields(false, '', '');
                // stub.withArgs(`heroku addons:create jawsdb:kitefin --as DATABASE --app ${herokuAppName}`).yields(false, '', '');
                stubExecFile
                    .withArgs(herokuExecutable, ['addons:create', 'jawsdb:kitefin', '--as', 'DATABASE', '--app', herokuAppName])
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
                // assert.fileContent(`${constants.SERVER_MAIN_RES_DIR}/config/application-heroku.yml`, 'datasource:');
                // assert.noFileContent(`${constants.SERVER_MAIN_RES_DIR}/config/application-heroku.yml`, 'mongodb:');
            });
        });

        describe('in the EU', () => {
            beforeEach(done => {
                // stub.withArgs(`heroku create ${herokuAppName} --region eu`).yields(false, '', '');
                stubExecFile.withArgs(herokuExecutable, ['create', herokuAppName, '--region', 'eu']).yields(false, '', '');
                // stub.withArgs(`heroku addons:create jawsdb:kitefin --as DATABASE --app ${herokuAppName}`).yields(false, '', '');
                stubExecFile
                    .withArgs(herokuExecutable, ['addons:create', 'jawsdb:kitefin', '--as', 'DATABASE', '--app', herokuAppName])
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
                // stub.withArgs(`heroku create ${herokuAppName} --region eu`).yields(false, '', '');
                stubExecFile.withArgs(herokuExecutable, ['create', herokuAppName, '--region', 'eu']).yields(false, '', '');
                // stub.withArgs(`heroku addons:create heroku-postgresql --as DATABASE --app ${herokuAppName}`).yields(false, '', '');
                stubExecFile
                    .withArgs(herokuExecutable, ['addons:create', 'heroku-postgresql', '--as', 'DATABASE', '--app', herokuAppName])
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
                // assert.fileContent(`${constants.SERVER_MAIN_RES_DIR}/config/application-heroku.yml`, 'datasource:');
                // assert.noFileContent(`${constants.SERVER_MAIN_RES_DIR}/config/application-heroku.yml`, 'mongodb:');
            });
        });

        describe('with existing app', () => {
            const existingHerokuAppName = 'jhipster-existing';
            beforeEach(done => {
                // stub
                //     .withArgs(`heroku apps:info --json ${existingHerokuAppName}`)
                //     .yields(false, `{"app":{"name":"${existingHerokuAppName}"}, "dynos":[]}`);
                stubExecFile
                    .withArgs(herokuExecutable, ['apps:info', '--json', existingHerokuAppName])
                    .yields(false, `{"app":{"name":"${existingHerokuAppName}"}, "dynos":[]}`);
                // stub.withArgs(`heroku addons:create jawsdb:kitefin --as DATABASE --app ${existingHerokuAppName}`).yields(false, '', '');
                stubExecFile
                    .withArgs(herokuExecutable, ['addons:create', 'jawsdb:kitefin', '--as', 'DATABASE', '--app', existingHerokuAppName])
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
