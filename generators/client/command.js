import { command as clientCommand } from 'generator-jhipster/generators/client';
import { asCommand } from 'generator-jhipster';
import { BLAZOR, XAMARIN } from '../generator-dotnetcore-constants.js';

export default asCommand({
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
});
