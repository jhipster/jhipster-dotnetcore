import { command as serverCommand } from 'generator-jhipster/generators/server';
import toPascalCase from 'to-pascal-case';

const { applicationType } = serverCommand.configs;

/**
 * @type {import('generator-jhipster').JHipsterCommandDefinition}
 */
const command = {
  options: {},
  configs: {
    applicationType,
    namespace: {
      prompt: gen => ({
        type: 'input',
        message: 'What is your default C# namespace?',
        validate: input =>
          /^([a-z_A-Z]\w+(?:\.[a-z_A-Z]\w+)*)$/.test(input) ? true : 'The namespace you have provided is not a valid C# namespace',
        default: () => toPascalCase(gen.jhipsterConfig.baseName),
      }),
    }
  },
};

export default command;
