const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

function getPreCondition() {
    return helpers
        .run('generator-jhipster/generators/server')
        .withOptions({
            'from-cli': true,
            skipInstall: true,
            blueprints: 'dotnetcore',
            skipChecks: true,
        })
        .withGenerators([
            [
                require('../generators/server/index.js'), // eslint-disable-line global-require
                'jhipster-dotnetcore:server',
                path.join(__dirname, '../generators/server/index.js'),
            ],
        ]);
}

describe('app generator of dotnetcore JHipster blueprint', () => {
    describe('Positive - Terraform files (monolithic app with mssql)', () => {
        before(done => {
            getPreCondition()
                .withPrompts({
                    baseName: 'sampleApp',
                    namespace: 'sampleApp',
                    applicationType: 'monolith',
                    database: 'mssql',
                    languages: ['fr'],
                    serverPort: 5000,
                    serverPortSecured: this.serverPort + 1,
                    withTerraformAzureScripts: true,
                    authenticationType: 'jwt',
                })

                .on('end', done);
        });

        it('terraform files should be generated', () => {
            assert.file('terraform/main.tf');
            assert.file('terraform/variables.tf');
            assert.file('terraform/outputs.tf');
        });
    });

    describe('Negative - monolithic with non mssql database', () => {
        before(done => {
            getPreCondition()
                .withPrompts({
                    baseName: 'sampleApp',
                    namespace: 'sampleApp',
                    applicationType: 'monolith',
                    database: 'mysql',
                    languages: ['fr'],
                    serverPort: 5000,
                    serverPortSecured: this.serverPort + 1,
                    withTerraformAzureScripts: true,
                    authenticationType: 'jwt',
                })

                .on('end', done);
        });

        it('terraform files should not be generated', () => {
            assert.noFile('terraform/main.tf');
            assert.noFile('terraform/variables.tf');
            assert.noFile('terraform/outputs.tf');
        });
    });
});
