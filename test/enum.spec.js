const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('../generators/generator-dotnetcore-constants');

const SERVER_MAIN_SRC_DIR = `${constants.SERVER_SRC_DIR}`;

// initial precondition for all tests
function getPreCondition() {
    return helpers
        .run('generator-jhipster/generators/entity')
        .inTmpDir(dir => {
            console.log(`Test temp dir: ${dir}`);
            fse.copySync(path.join(__dirname, '../test/templates/ngx-blueprint'), dir);
            fse.copySync(path.join(__dirname, '../test/templates/enums'), dir);
        })
        .withOptions({
            'from-cli': true,
            skipInstall: true,
            blueprints: 'dotnetcore',
            skipChecks: true,
            regenerate: true,
            force: true,
        })
        .withGenerators([
            [
                require('../generators/entity/index.js'), // eslint-disable-line global-require
                'jhipster-dotnetcore:entity',
                path.join(__dirname, '../generators/entity/index.js'),
            ],
            [
                require('../generators/entity-server/index.js'), // eslint-disable-line global-require
                'jhipster-dotnetcore:entity-server',
                path.join(__dirname, '../generators/entity-server/index.js'),
            ],
        ]);
}

describe('Subgenerator entity of dotnetcore JHipster blueprint - testing enum generation', () => {
    context('generating enum', () => {
        const orderClass = `${SERVER_MAIN_SRC_DIR}JhipsterBlueprint.Domain/Entities/Order.cs`;
        const orderStatusEnum = `${SERVER_MAIN_SRC_DIR}JhipsterBlueprint.Crosscutting/Enums/OrderStatus.cs`;
        const efMappings = `${SERVER_MAIN_SRC_DIR}JhipsterBlueprint.Infrastructure/Data/ApplicationDatabaseContext.cs`;

        before(done => {
            getPreCondition()
                .withArguments(['Order'])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    dto: 'no',
                    service: 'no',
                    pagination: 'infinite-scroll',
                })
                .on('end', done);
        });

        it('copies entity file', () => {
            assert.file('.jhipster/Order.json');
            assert.file('.yo-rc.json');
        });

        it('creates entity class', () => {
            assert.file(orderClass);
        });

        it('generates the enum', () => {
            assert.file(orderStatusEnum);
            assert.fileContent(orderStatusEnum, /IN_PROGRESS,\s+FINISHED/);
        });

        it('generates the enum to string mapping at ApplicationDatabaseContext', () => {
            assert.fileContent(efMappings, /builder\.Entity<Order>\(\)\s+\.Property\(e => e.Status\)\s+\.HasConversion<string>\(\);/);
        });
    });
});
