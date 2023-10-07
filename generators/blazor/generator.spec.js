import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';

const SUB_GENERATOR = 'blazor';
const SUB_GENERATOR_NAMESPACE = `jhipster-dotnetcore:${SUB_GENERATOR}`;

describe('SubGenerator blazor of dotnetcore JHipster blueprint', () => {
  describe('run', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig({
          clientFramework: 'Blazor',
        })
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

  describe('generating dto', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig(
          {
            clientFramework: 'Blazor',
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
        })
        .withJHipsterLookup()
        .withSpawnMock()
        .withParentBlueprintLookup();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });
  });
});
