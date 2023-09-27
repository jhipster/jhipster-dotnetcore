import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';

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
});
