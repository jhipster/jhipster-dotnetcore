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
            fse.copySync(path.join(__dirname, '../test/templates/dto'), dir);
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

describe('testing dto', () => {
    context('generating dto', () => {
        const personClass = `${SERVER_MAIN_SRC_DIR}JhipsterBlueprint.Domain/Entities/Person.cs`;
        const personDto = `${SERVER_MAIN_SRC_DIR}JhipsterBlueprint.Dto/PersonDto.cs`;
        const dtoMappingFile = `${SERVER_MAIN_SRC_DIR}JhipsterBlueprint/Configuration/AutoMapper/AutoMapperProfile.cs`;

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

        it('check if required files for dto are copied', () => {
            assert.file('.jhipster/Person.json');
            assert.file('.yo-rc.json');
        });

        it('checks dto files', () => {
            assert.file(personClass);
            assert.file(personDto);
            assert.file(dtoMappingFile);
            assert.fileContent(personDto, /public class PersonDto/);
            assert.fileContent(dtoMappingFile, /public class AutoMapperProfile : Profile/);
        });
    });
});
