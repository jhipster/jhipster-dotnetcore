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
});