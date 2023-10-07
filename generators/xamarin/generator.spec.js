import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';

const SUB_GENERATOR = 'xamarin';
const SUB_GENERATOR_NAMESPACE = `jhipster-dotnetcore:${SUB_GENERATOR}`;

describe('SubGenerator xamarin of dotnetcore JHipster blueprint', () => {
  describe('run', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig({ clientFramework: 'Xamarin' }, [{ name: 'Person', dto: 'mapstruct' }])
        .withOptions({
          ignoreNeedlesError: true,
        })
        .withSpawnMock()
        .withJHipsterLookup()
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
