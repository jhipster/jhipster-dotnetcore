const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('Subgenerator spring-service of dotnetcore JHipster blueprint', () => {
    describe('Sample test', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/spring-service')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/ngx-blueprint'), dir);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'dotnetcore',
                    skipChecks: true
                })
                .withGenerators([
                    [
                        require('../generators/spring-service/index.js'), // eslint-disable-line global-require
                        'jhipster-dotnetcore:spring-service',
                        path.join(__dirname, '../generators/spring-service/index.js')
                    ]
                ])
                .withArguments(['foo'])
                .withPrompts({
                    useInterface: false
                })
                .on('end', done);
        });

        it('it works', () => {
            // Adds your tests here
            assert.textEqual('Write your own tests!', 'Write your own tests!');
        });
    });
});
