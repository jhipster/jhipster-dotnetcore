import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';
import { DEVCONTAINER_DOTNET_IMAGE_TAG } from '../generator-dotnetcore-constants.js';

const SUB_GENERATOR = 'common';
const BLUEPRINT_NAMESPACE = `jhipster:${SUB_GENERATOR}`;

describe('SubGenerator common of dotnetcore JHipster blueprint', () => {
  describe('run', () => {
    beforeAll(async function () {
      await helpers
        .run(BLUEPRINT_NAMESPACE)
        .withJHipsterConfig()
        .withOptions({
          ignoreNeedlesError: true,
          blueprint: ['dotnetcore'],
        })
        .withJHipsterLookup()
        .withParentBlueprintLookup();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });

    it('should generate devcontainer.json with correct dotnet version', () => {
      result.assertFileContent(
        '.devcontainer/devcontainer.json',
        `mcr.microsoft.com/devcontainers/dotnet:${DEVCONTAINER_DOTNET_IMAGE_TAG}`,
      );
    });
  });
});
