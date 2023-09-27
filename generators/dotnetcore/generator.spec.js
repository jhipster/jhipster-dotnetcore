import { beforeAll, describe, expect, it } from 'vitest';
import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';

import { SERVER_SRC_DIR } from '../generator-dotnetcore-constants.js';

const SUB_GENERATOR = 'dotnetcore';
const SUB_GENERATOR_NAMESPACE = `jhipster-dotnetcore:${SUB_GENERATOR}`;

describe('SubGenerator dotnetcore of dotnetcore JHipster blueprint', () => {
  describe('run', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig()
        .withOptions({
          ignoreNeedlesError: true,
          blueprints: 'dotnetcore',
        })
        .withJHipsterLookup()
        .withSpawnMock()
        .withParentBlueprintLookup();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });

    it('execute commands', () => {
      expect(result.getSpawnArgsUsingDefaultImplementation()).toMatchSnapshot();
    });
  });

  describe('Positive - Terraform files (monolithic app with mssql)', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig({
          baseName: 'sampleApp',
          namespace: 'sampleApp',
          database: 'mssql',
          withTerraformAzureScripts: true,
        })
        .withOptions({
          ignoreNeedlesError: true,
          blueprints: 'dotnetcore',
        })
        .withJHipsterLookup()
        .withSpawnMock()
        .withParentBlueprintLookup();
    });

    it('terraform files should be generated', () => {
      result.assertFile('terraform/main.tf');
      result.assertFile('terraform/variables.tf');
      result.assertFile('terraform/outputs.tf');
    });
  });

  describe('Negative - monolithic with non mssql database', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig({
          baseName: 'sampleApp',
          namespace: 'sampleApp',
          database: 'mysql',
          withTerraformAzureScripts: true,
        })
        .withOptions({
          ignoreNeedlesError: true,
          blueprints: 'dotnetcore',
        })
        .withJHipsterLookup()
        .withSpawnMock()
        .withParentBlueprintLookup();
    });

    it('terraform files should not be generated', () => {
      result.assertNoFile('terraform/main.tf');
      result.assertNoFile('terraform/variables.tf');
      result.assertNoFile('terraform/outputs.tf');
    });
  });

  describe('generating dto', () => {
    const personClass = `${SERVER_SRC_DIR}JhipsterBlueprint.Domain/Entities/Person.cs`;
    const personDto = `${SERVER_SRC_DIR}JhipsterBlueprint.Dto/PersonDto.cs`;
    const dtoMappingFile = `${SERVER_SRC_DIR}JhipsterBlueprint/Configuration/AutoMapper/AutoMapperProfile.cs`;

    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig(
          {
            baseName: 'jhipsterBlueprint',
          },
          [
            {
              name: 'Person',
              dto: 'mapstruct',
            },
          ],
        )
        .withOptions({
          ignoreNeedlesError: true,
          blueprints: 'dotnetcore',
        })
        .withJHipsterLookup()
        .withSpawnMock()
        .withParentBlueprintLookup();
    });

    it('check if required files for dto are copied', () => {
      result.assertFile('.jhipster/Person.json');
      result.assertFile('.yo-rc.json');
    });

    it('checks dto files', () => {
      result.assertFile(personClass);
      result.assertFile(personDto);
      result.assertFile(dtoMappingFile);
      result.assertFileContent(personDto, /public class PersonDto/);
      result.assertFileContent(dtoMappingFile, /public class AutoMapperProfile : Profile/);
    });
  });

  describe('generating enum', () => {
    const orderClass = `${SERVER_SRC_DIR}JhipsterBlueprint.Domain/Entities/Order.cs`;
    const orderStatusEnum = `${SERVER_SRC_DIR}JhipsterBlueprint.Crosscutting/Enums/OrderStatus.cs`;
    const efMappings = `${SERVER_SRC_DIR}JhipsterBlueprint.Infrastructure/Data/ApplicationDatabaseContext.cs`;

    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig(
          {
            baseName: 'jhipsterBlueprint',
          },
          [
            {
              name: 'Order',
              fields: [
                {
                  fieldName: 'status',
                  fieldType: 'OrderStatus',
                  fieldValues: 'IN_PROGRESS,FINISHED',
                },
              ],
            },
          ],
        )
        .withOptions({
          ignoreNeedlesError: true,
          blueprints: 'dotnetcore',
        })
        .withJHipsterLookup()
        .withSpawnMock()
        .withParentBlueprintLookup();
    });

    it('copies entity file', () => {
      result.assertFile('.jhipster/Order.json');
      result.assertFile('.yo-rc.json');
    });

    it('creates entity class', () => {
      result.assertFile(orderClass);
    });

    it('generates the enum', () => {
      result.assertFile(orderStatusEnum);
      result.assertFileContent(orderStatusEnum, /IN_PROGRESS,\s+FINISHED/);
    });

    it('generates the enum to string mapping at ApplicationDatabaseContext', () => {
      result.assertFileContent(efMappings, /builder\.Entity<Order>\(\)\s+\.Property\(e => e.Status\)\s+\.HasConversion<string>\(\);/);
    });
  });

  describe('generating service interface and implementation', () => {
    const personService = `${SERVER_SRC_DIR}JhipsterBlueprint.Domain.Services/PersonService.cs`;
    const personServiceInterface = `${SERVER_SRC_DIR}JhipsterBlueprint.Domain/Services/Interfaces/IPersonService.cs`;

    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig(
          {
            baseName: 'jhipsterBlueprint',
          },
          [
            {
              name: 'Person',
              dto: 'mapstruct',
              service: 'serviceImpl',
            },
          ],
        )
        .withOptions({
          ignoreNeedlesError: true,
          blueprints: 'dotnetcore',
        })
        .withJHipsterLookup()
        .withSpawnMock()
        .withParentBlueprintLookup();
    });

    it('check if required files are copied', () => {
      // result.assertFile('.jhipster/Person.json');
      result.assertFile('.yo-rc.json');
    });

    it('checks if service interface and implementation files exist', () => {
      // result.assertFile(personClass);
      result.assertFile(personService);
      result.assertFile(personServiceInterface);
    });

    it('checks service interface and implementation contents', () => {
      result.assertFileContent(personService, /public class PersonService/);
      result.assertFileContent(personServiceInterface, /public interface IPersonService/);
    });
  });
});
