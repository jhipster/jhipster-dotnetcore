import { access } from 'fs/promises';
import chalk from 'chalk';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { createBase64Secret } from 'generator-jhipster/generators/base/support';
import { getEnumInfo } from 'generator-jhipster/generators/base-application/support';

import command from './command.js';
import { serverFiles } from './files.js';
import {
  PROJECT_APPLICATION_SUFFIX,
  PROJECT_CROSSCUTTING_SUFFIX,
  PROJECT_DOMAIN_SUFFIX,
  PROJECT_DTO_SUFFIX,
  PROJECT_INFRASTRUCTURE_SUFFIX,
  PROJECT_SERVICE_SUFFIX,
  PROJECT_TEST_SUFFIX,
  SERVER_SRC_DIR,
  SERVER_TEST_DIR,
} from '../generator-dotnetcore-constants.js';
import { entityCommonFiles, entityFiles } from './entity-files.js';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, jhipster7Migration: true });
  }

  async beforeQueue() {
    await this.dependsOnJHipster('bootstrap-application');
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      async initializingTemplateTask() {
        this.parseJHipsterCommand(command);
      },
    });
  }

  get [BaseApplicationGenerator.PROMPTING]() {
    return this.asPromptingTaskGroup({
      async promptingTemplateTask({ control }) {
        if (control.existingProject && this.options.askAnswered !== true) return;
        await this.prompt(this.prepareQuestions(command.configs));
      },
    });
  }

  get [BaseApplicationGenerator.CONFIGURING]() {
    return this.asConfiguringTaskGroup({
      async configuringTemplateTask() {
        // Force consul for gateways and microservices
        if ((this.jhipsterConfig.applicationType ?? 'monolith') !== 'monolith') {
          this.jhipsterConfig.serviceDiscoveryType = 'consul';
        }
        if (this.jhipsterConfig.databaseType === 'postgres') {
          this.jhipsterConfig.databaseType = 'postgresql';
        }
        // Terraform is supported my mssql
        if (this.jhipsterConfig.withTerraformAzureScripts && this.jhipsterConfig.database !== 'mssql') {
          this.jhipsterConfig.withTerraformAzureScripts = false;
        }
        if (this.jhipsterConfig.jwtSecretKey === undefined) {
          this.jhipsterConfig.jwtSecretKey = createBase64Secret(this.options.reproducibleTests);
        }
      },
    });
  }

  get [BaseApplicationGenerator.COMPOSING]() {
    return this.asComposingTaskGroup({
      async composingTemplateTask() {
        await this.composeWithJHipster('docker');
      },
    });
  }

  get [BaseApplicationGenerator.PREPARING]() {
    return this.asPreparingTaskGroup({
      async preparingTemplateTask({ source, application }) {
        if (application.applicationTypeGateway) {
          source.addRouteToGateway = ({ serviceEndpoint, serviceName }) => {
            const ocelotConfigPath = `src/${application.mainProjectDir}/ocelot.json`;
            const ocelotStorage = this.createStorage(ocelotConfigPath);
            const endpoint = `/${serviceName}/api/${serviceEndpoint}`;
            ocelotStorage.merge({
              Routes: [
                {
                  DownstreamPathTemplate: `/api/${serviceEndpoint}`,
                  DownstreamScheme: 'https',
                  ServiceName: `${serviceName}-service`,
                  LoadBalancerOptions: {
                    Type: 'LeastConnection',
                  },
                  ReRoutesCaseSensitive: false,
                  UpstreamPathTemplate: endpoint,
                  UpstreamHttpMethod: ['Get', 'Post', 'Delete', 'Put'],
                },
                {
                  DownstreamPathTemplate: `/api/${serviceEndpoint}/{everything}`,
                  DownstreamScheme: 'https',
                  ServiceName: `${serviceName}-service`,
                  LoadBalancerOptions: {
                    Type: 'LeastConnection',
                  },
                  ReRoutesCaseSensitive: false,
                  UpstreamPathTemplate: `${endpoint}/{everything}`,
                  UpstreamHttpMethod: ['Get', 'Post', 'Delete', 'Put'],
                },
              ],
            });
          };
        }
      },
    });
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async writeFiles({ application }) {
        await this.writeFiles({
          sections: serverFiles,
          context: application,
          rootTemplatesPath: 'dotnetcore',
        });
      },
      async writeDirectoryTargetsFile({ application }) {
        this.fs.copyTpl(
          this.templatePath(`dotnetcore/${SERVER_SRC_DIR}/Directory.Packages.props`),
          this.destinationPath('Directory.Packages.props'),
          application,
        );
      },
    });
  }

  get [BaseApplicationGenerator.WRITING_ENTITIES]() {
    return this.asWritingEntitiesTaskGroup({
      async writeServerFiles({ application, entities }) {
        for (const entity of entities.filter(entity => !entity.builtIn && !entity.skipServer)) {
          entity.fields.forEach(field => {
            if (field.fieldIsEnum) {
              if (!entity.skipServer) {
                const enumInfo = getEnumInfo(field, entity.clientRootFolder);
                enumInfo.namespace = application.namespace;
                const { fieldType } = field;
                this.writeFile(
                  'dotnetcore/src/Project.Crosscutting/Enums/Enum.cs.ejs',
                  `src/${application.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/Enums/${fieldType}.cs`,
                  enumInfo,
                );
              }
            }
          });

          await this.writeFiles({
            sections: entityFiles,
            context: {
              ...application,
              ...entity,
              asDto: str => `${str}${application.dtoSuffix}`,
              getNullableResolvedType: (cSharpType, required) => entity.databaseType === 'mongodb' ? 'string' : (required ? cSharpType.replace('?', '') : cSharpType),
              isNumericPrimaryKey: primaryKeyType => ['long', 'long?', 'int', 'int?'].includes(primaryKeyType),
              getPrimaryKeyType: (entity) => entity.primaryKeyType,
            },
            rootTemplatesPath: ['dotnetcore'],
          });
          await this.writeFiles({
            sections: entityCommonFiles,
            context: {
              ...application,
              ...entity,
              entities: this.getExistingEntities(),
              asDto: str => `${str}${application.dtoSuffix}`,
            },
            rootTemplatesPath: ['dotnetcore'],
          });
        }
      },
    });
  }

  get [BaseApplicationGenerator.POST_WRITING]() {
    return this.asPostWritingTaskGroup({
      async postWritingTemplateTask({ application }) {
        this.packageJson.merge({
          devDependencies: {
            concurrently: application.nodeDependencies.concurrently,
          },
          scripts: {
            'ci:e2e:server:start': 'docker compose -f docker/app.yml up --wait',
            'ci:e2e:run': 'concurrently -k -s first "npm run ci:e2e:server:start" "npm run e2e:headless"',
          },
        });
      },
    });
  }

  get [BaseApplicationGenerator.POST_WRITING_ENTITIES]() {
    return this.asPostWritingEntitiesTaskGroup({
      async postWritingEntitiesTemplateTask({ application, entities, source }) {
        if (application.applicationTypeGateway) {
          for (const entity of entities.filter(entity => !entity.builtIn && entity.microserviceName)) {
            source.addRouteToGateway({
              serviceEndpoint: entity.entityApiUrl,
              serviceName: this._.toLower(entity.microserviceName),
            });
          }
        }
      },
    });
  }

  get [BaseApplicationGenerator.INSTALL]() {
    return this.asInstallTaskGroup({
      async installTemplateTask({ application }) {
        this.log(chalk.green.bold(`\nCreating ${application.solutionName} .Net Core solution if it does not already exist.\n`));
        const slns = [
          `${SERVER_SRC_DIR}${application.mainProjectDir}${application.pascalizedBaseName}.csproj`,
          `${SERVER_TEST_DIR}${application.testProjectDir}${application.pascalizedBaseName}${PROJECT_TEST_SUFFIX}.csproj`,
          `${SERVER_SRC_DIR}${application.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}/${application.pascalizedBaseName}${PROJECT_CROSSCUTTING_SUFFIX}.csproj`,
          `${SERVER_SRC_DIR}${application.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}/${application.pascalizedBaseName}${PROJECT_DOMAIN_SUFFIX}.csproj`,
          `${SERVER_SRC_DIR}${application.pascalizedBaseName}${PROJECT_DTO_SUFFIX}/${application.pascalizedBaseName}${PROJECT_DTO_SUFFIX}.csproj`,
          `${SERVER_SRC_DIR}${application.pascalizedBaseName}${PROJECT_SERVICE_SUFFIX}/${application.pascalizedBaseName}${PROJECT_SERVICE_SUFFIX}.csproj`,
          `${SERVER_SRC_DIR}${application.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}/${application.pascalizedBaseName}${PROJECT_INFRASTRUCTURE_SUFFIX}.csproj`,
        ];
        if (application.cqrsEnabled) {
          slns.push(
            `${SERVER_SRC_DIR}${application.pascalizedBaseName}${PROJECT_APPLICATION_SUFFIX}/${application.pascalizedBaseName}${PROJECT_APPLICATION_SUFFIX}.csproj`,
          );
        }
        try {
          await this.newSln(application.solutionName);
          await this.slnAdd(`${application.solutionName}.sln`, slns);
        } catch (error) {
          this.log.warn(`Failed to create ${application.solutionName} .Net Core solution: ${error}`);
        }
      },
    });
  }

  get [BaseApplicationGenerator.END]() {
    return this.asEndTaskGroup({
      async end({ application }) {
        this.log.ok('.Net Core application generated successfully.');
        this.log(
          chalk.green(
            `Run your .Net Core application:\n${chalk.yellow.bold(
              `dotnet run --verbosity normal --project ./${SERVER_SRC_DIR}${application.mainProjectDir}/${application.pascalizedBaseName}.csproj`,
            )}`,
          ),
        );
        this.log(chalk.green(`Test your .Net Core application:\n${chalk.yellow.bold('dotnet test --verbosity normal')}`));
      },
    });
  }

  async newSln(solutionName) {
    try {
      await access(`${solutionName}.sln`);
      return true;
    } catch (error) {
      return this.spawnCommand(`dotnet new sln --name ${solutionName}`);
    }
  }

  async slnAdd(solutionFile, projects) {
    return this.spawnCommand(`dotnet sln ${solutionFile} add ${projects.join(' ')}`);
  }
}
