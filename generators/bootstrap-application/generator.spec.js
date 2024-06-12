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
          blueprints: 'dotnetcore',
        })
        .withJHipsterLookup()
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
      });
    });
  });
});
