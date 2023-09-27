import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import chalk from 'chalk';
import { CLIENT_SRC_DIR, CLIENT_TEST_DIR } from '../generator-dotnetcore-constants.js';
import { files } from './files-blazor.js';
import { access } from 'fs/promises';
import { entityFiles } from './entities-blazor.js';
import { createNeedleCallback } from 'generator-jhipster/generators/base/support';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true, jhipster7Migration: true });
  }

  async beforeQueue() {
    await this.dependsOnJHipster('bootstrap-application');
    await this.dependsOnJHipster('jhipster-dotnetcore:bootstrap-dotnetcore');
  }

  get [BaseApplicationGenerator.PREPARING]() {
    return this.asPreparingTaskGroup({
      async preparingTemplateTask({ application, source }) {
        source.addEntityToMenu = ({ entityName }) => {
          const entityMenuPath = `src/${application.mainClientDir}/Shared/NavMenu.razor`;
          const lowerCasedEntityName = this._.toLower(entityName);
          this.editFile(
            entityMenuPath,
            createNeedleCallback({
              needle: 'jhipster-needle-add-entity-to-menu',
              contentToAdd: `
                <BarDropdownItem Class="dropdown-item" To="${lowerCasedEntityName}">
                    <Icon Name='"fa-asterisk"' />
                    ${entityName}
                </BarDropdownItem>`,
              contentToCheck: `To="${lowerCasedEntityName}"`,
              autoIndent: true,
            }),
          );
        };

        source.addServiceInDI = ({ entityName }) =>
          this.editFile(
            `src/${application.mainClientDir}/Program.cs`,
            createNeedleCallback({
              needle: 'jhipster-needle-add-services-in-di',
              contentToAdd: `builder.Services.AddScoped<I${entityName}Service, ${entityName}Service>();`,
              autoIndent: true,
            }),
          );

        source.addUsingForService = ({ entityName, namespace }) =>
          this.editFile(
            `src/${application.mainClientDir}/Program.cs`,
            createNeedleCallback({
              needle: 'jhipster-needle-add-using-for-services',
              contentToAdd: `using ${namespace}.Client.Services.EntityServices.${entityName};`,
              autoIndent: true,
            }),
          );

        source.addDtoMapping = ({ entityName }) =>
          this.editFile(
            `src/${application.mainClientDir}/AutoMapper/AutoMapperProfile.cs`,
            createNeedleCallback({
              needle: 'jhipster-needle-add-dto-model-mapping',
              contentToAdd: `CreateMap<${entityName}Model, ${entityName}Dto>().ReverseMap();`,
              autoIndent: true,
            }),
          );
      },
    });
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async writingTemplateTask({ application }) {
        await this.writeFiles({
          sections: files,
          context: application,
        });
      },
    });
  }

  get [BaseApplicationGenerator.WRITING_ENTITIES]() {
    return this.asWritingEntitiesTaskGroup({
      async writingEntitiesTemplateTask({ application, entities }) {
        for (const entity of entities.filter(entity => !entity.builtIn && !entity.skipClient)) {
          await this.writeFiles({
            sections: entityFiles,
            context: {
              ...application,
              ...entity,
              asDto: str => `${str}${application.dtoSuffix}`,
            },
          });
        }
      },
    });
  }

  get [BaseApplicationGenerator.POST_WRITING_ENTITIES]() {
    return this.asPostWritingEntitiesTaskGroup({
      async postWritingEntitiesTemplateTask({ application, source, entities }) {
        for (const entity of entities.filter(entity => !entity.builtIn && !entity.skipClient)) {
          source.addEntityToMenu({ entityName: entity.entityClass });
          source.addServiceInDI({ entityName: entity.entityClass });
          source.addUsingForService({ entityName: entity.entityClass, namespace: application.namespace });
          source.addDtoMapping({ entityName: entity.entityClass });
        }
      },
    });
  }

  get [BaseApplicationGenerator.END]() {
    return this.asEndTaskGroup({
      async end({ application }) {
        this.log(chalk.green.bold(`\nCreating ${application.solutionName} .Net Core solution if it does not already exist.\n`));
        try {
          try {
            await access(`${application.solutionName}.sln`);
          } catch (error) {
            await this.spawnCommand(`dotnet new sln --name ${application.solutionName}`);
          }
        } catch (err) {
          this.log.warn(`Failed to create ${application.solutionName} .Net Core solution: ${err}`);
        }
        const projects = [
          `${CLIENT_SRC_DIR}${application.mainClientDir}${application.pascalizedBaseName}.Client.csproj`,
          `${CLIENT_SRC_DIR}${application.sharedClientDir}${application.pascalizedBaseName}.Client.Shared.csproj`,
          `${CLIENT_TEST_DIR}${application.clientTestProject}${application.pascalizedBaseName}.Client.Test.csproj`,
        ];

        await this.spawnCommand(`dotnet sln ${application.solutionName}.sln add ${projects.join(' ')}`);
        this.log(chalk.green.bold('Client application generated successfully.\n'));
        this.log(
          chalk.green(
            `Run your blazor application:\n${chalk.yellow.bold(
              `dotnet run --verbosity normal --project ./${CLIENT_SRC_DIR}${application.mainClientDir}/${application.pascalizedBaseName}.Client.csproj`,
            )}`,
          ),
        );

        try {
          await this.spawnCommand('libman');
        } catch (error) {
          try {
            await this.spawnCommand('dotnet tool install -g Microsoft.Web.LibraryManager.Cli');
          } catch (error) {
            throw new Error('Could not install Microsoft.Web.LibraryManager.Cli');
          }
          console.log(chalk.green.bold('Microsoft.Web.LibraryManager.Cli successfully installed.\n'));
        }

        try {
          await this.spawnCommand('webcompiler');
        } catch (error) {
          try {
            await this.spawnCommand('dotnet tool install Excubo.WebCompiler --global');
          } catch (error) {
            throw new Error('Could not install Excubo.WebCompiler');
          }
          console.log(chalk.green.bold('Excubo.WebCompiler successfully installed.\n'));
        }
      },
    });
  }
}
