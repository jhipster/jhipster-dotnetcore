import { command as clientCommand } from 'generator-jhipster/generators/client';
import { BLAZOR, XAMARIN } from '../generator-dotnetcore-constants.js';

/**
 * @type {import('generator-jhipster').JHipsterCommandDefinition}
 */
const command = {
  ...clientCommand,
  configs: {
    ...clientCommand.configs,
    clientFramework: {
      ...clientCommand.configs.clientFramework,
      choices: [
        ...clientCommand.configs.clientFramework.choices.filter(({ value }) => value !== 'no'),
        { value: BLAZOR, name: '[Alpha] - Blazor (WebAssembly)' },
        { value: XAMARIN, name: '[Alpha] - Xamarin' },
        { value: 'no', name: 'No client' },
      ],
    },
  },
  override: true,
};

export default command;
