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
            console.log(dir);
            fse.copySync(path.join(__dirname, '../test/templates/ngx-blueprint'), dir);
            // fse.copySync(path.join(__dirname, '../test/templates/services'), dir);
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

describe('testing service interface and implementation', () => {
    context('generating service interface and implementation', () => {
        // const personClass = `${SERVER_MAIN_SRC_DIR}JhipsterBlueprint.Domain/Person.cs`;
        const personService = `${SERVER_MAIN_SRC_DIR}JhipsterBlueprint.Domain.Services/PersonService.cs`;
        const personServiceInterface = `${SERVER_MAIN_SRC_DIR}JhipsterBlueprint.Domain/Services/Interfaces/IPersonService.cs`;

        before(done => {
            getPreCondition()
                .withArguments(['Person'])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    dto: 'mapstruct',
                    service: 'serviceImpl',
                    pagination: 'no',
                })
                .on('end', done);
        });

        it('check if required files are copied', () => {
            // assert.file('.jhipster/Person.json');
            assert.file('.yo-rc.json');
        });

        it('checks if service interface and implementation files exist', () => {
            // assert.file(personClass);
            assert.file(personService);
            assert.file(personServiceInterface);
        });

        it('checks service interface and implementation contents', () => {
            assert.fileContent(personService, /public class PersonService/);
            assert.fileContent(personServiceInterface, /public interface IPersonService/);
        });
    });
});
