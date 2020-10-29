const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('Subgenerator entity of dotnetcore JHipster blueprint', () => {
    describe('Sample test', () => {
        before(function () {
            this.timeout(15000);
            return helpers
                .create('jhipster:entity')
                .withLookups([{ npmPaths: path.join(__dirname, '..', 'node_modules') }, { packagePaths: path.join(__dirname, '..') }])
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/ngx-blueprint'), dir);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprints: 'dotnetcore',
                    skipChecks: true,
                })
                .withArguments(['foo'])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    dto: 'no',
                    service: 'no',
                    pagination: 'infinite-scroll',
                })
                .run();
        });

        it('it works', () => {
            // Adds your tests here
            assert.textEqual('Write your own tests!', 'Write your own tests!');
        });
    });
});
