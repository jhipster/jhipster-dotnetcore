import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';

const SUB_GENERATOR = 'bootstrap-application';

describe('SubGenerator bootstrap-application of dotnetcore JHipster blueprint', () => {
  describe('run', () => {
    beforeAll(async function () {
      await helpers
        .runJHipster(SUB_GENERATOR)
        .withJHipsterConfig()
        .withOptions({
          ignoreNeedlesError: true,
          blueprint: ['dotnetcore'],
        })
        .withParentBlueprintLookup();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });
    it('application should match snapshot', () => {
      expect(result.generator.sharedData.getApplication()).toMatchSnapshot({
        authority: expect.any(Object),
        userManagement: expect.any(Object),
        user: expect.any(Object),
        jhipsterPackageJson: expect.any(Object),
      });
    });
  });

  describe('with sqlite database', () => {
    beforeAll(async function () {
      await helpers
        .runJHipster(SUB_GENERATOR)
        .withJHipsterConfig({
          databaseType: 'sqlite',
        })
        .withOptions({
          ignoreNeedlesError: true,
          blueprint: ['dotnetcore'],
        })
        .withParentBlueprintLookup();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });

    it('should set prodDatabaseType to postgresql internally', () => {
      expect(result.generator.sharedData.getApplication().prodDatabaseType).toBe('postgresql');
    });
  });

  describe('with postgresql database', () => {
    beforeAll(async function () {
      await helpers
        .runJHipster(SUB_GENERATOR)
        .withJHipsterConfig({
          databaseType: 'postgresql',
          prodDatabaseType: 'postgresql',
        })
        .withOptions({
          ignoreNeedlesError: true,
          blueprint: ['dotnetcore'],
        })
        .withParentBlueprintLookup();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });

    it('should set prodDatabaseType to postgresql', () => {
      expect(result.generator.sharedData.getApplication().prodDatabaseType).toBe('postgresql');
    });

    it('should set databaseTypeSql to true', () => {
      expect(result.generator.sharedData.getApplication().databaseTypeSql).toBe(true);
    });
  });
});
