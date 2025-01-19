import chalk from 'chalk';
import { command as serverCommand } from 'generator-jhipster/generators/server';
import toPascalCase from 'to-pascal-case';

const { applicationType } = serverCommand.configs;

import { asCommand } from 'generator-jhipster';

export default asCommand({
  options: {},
  configs: {
    applicationType,
    namespace: {
      prompt: ({ jhipsterConfigWithDefaults: config }) => ({
        type: 'input',
        message: 'What is your default C# namespace?',
        validate: input =>
          /^([a-z_A-Z]\w+(?:\.[a-z_A-Z]\w+)*)$/.test(input) ? true : 'The namespace you have provided is not a valid C# namespace',
        default: () => toPascalCase(config.baseName),
      }),
    },
    serverPort: {
      prompt: ({ jhipsterConfigWithDefaults: config }) => ({
        validate: input => (/^([0-9]*)$/.test(input) ? true : 'This is not a valid port number.'),
        message:
          'On which port would like your server to run ? It should be unique to avoid port conflicts (choose http -> https=httpPort+1).',
        default: ({ applicationType }) => ((applicationType ?? config.applicationType) === 'microservice' ? '5004' : '5000'),
      }),
    },
    authenticationType: {
      prompt: {
        type: 'list',
        message: `Which ${chalk.yellow('*type*')} of authentication would you like to use?`,
      },
      choices: [
        { value: 'jwt', name: 'JWT authentication (stateless, with a token)' },
        { value: 'oauth2', name: 'OAuth 2.0 / OIDC Authentication (stateful, works with Keycloak and Okta)' },
      ],
    },
    databaseChoice: {
      prompt: {
        type: 'list',
        message: 'Which database do you want to use',
      },
      choices: [
        { value: 'sqllite', name: 'SQLite in-memory' },
        { value: 'mssql', name: 'Microsoft SQL Server' },
        { value: 'postgresql', name: 'PostgreSQL' },
        { value: 'mysql', name: 'MySQL' },
        { value: 'oracle', name: 'Oracle' },
        { value: 'mongodb', name: 'MongoDB' },
      ],
    },
    cqrsEnabled: {
      prompt: {
        type: 'confirm',
        message: 'Do you want to use the CQRS design pattern?',
        default: false,
      },
    },
    withTerraformAzureScripts: {
      prompt: ({ jhipsterConfigWithDefaults: config }) => ({
        type: 'confirm',
        when: ({ applicationType, databaseType }) =>
          (applicationType ?? config.applicationType) === 'monolith' && (databaseType ?? config.databaseType) === 'mssql',
      }),
    },
  },
});
