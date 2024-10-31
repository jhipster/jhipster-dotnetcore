import { access } from 'fs/promises';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import chalk from 'chalk';
import { createNeedleCallback } from 'generator-jhipster/generators/base/support';
import { CLIENT_SRC_DIR, CLIENT_TEST_DIR } from '../generator-dotnetcore-constants.js';
import {
  defaultNilValue,
  defaultValue,
  getNonNullableType,
  getNullableResolvedType,
  getPrimaryKeyType,
  isNumericPrimaryKey,
  updatedValue,
} from '../utils.js';
import { files } from './files-blazor.js';
import { entityFiles } from './entities-blazor.js';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true, jhipster7Migration: true });
  }

  async beforeQueue() {
    await this.dependsOnJHipster('bootstrap-application');
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
              asModel: str => `${str}${application.modelSuffix}`,
              getNullableResolvedType,
              getPrimaryKeyType,
              isNumericPrimaryKey,
              defaultValue,
              defaultNilValue,
              updatedValue,
              getNonNullableType,
              enumDefaultValue: field => {
                const enums = field.fieldValues.split(',').map(fieldValue => fieldValue.trim());
                if (enums.length > 0) {
                  return `${field.fieldType}.${enums[0]}`;
                }
                return 'null';
              },
              enumUpdatedValue: field => {
                const enums = field.fieldValues.split(',').map(fieldValue => fieldValue.trim());
                if (enums.length > 1) {
                  return `${field.fieldType}.${enums[1]}`;
                }
                return 'null';
              },
              hasDateTimeTypeField: fields => {
                let dateTimeTypeField = false;
                let idx = 0;
                while (idx < fields.length && !dateTimeTypeField) {
                  if (
                    fields[idx].fieldType === 'LocalDate' ||
                    fields[idx].fieldType === 'Instant' ||
                    fields[idx].fieldType === 'ZonedDateTime' ||
                    fields[idx].fieldType === 'Duration'
                  ) {
                    dateTimeTypeField = true;
                  }
                  idx += 1;
                }
                return dateTimeTypeField;
              },
            },
          });
        }
      },
    });
  }

  get [BaseApplicationGenerator.POST_WRITING]() {
    return this.asPostWritingTaskGroup({
      async postWritingTemplateTask({ application }) {
        this.packageJson.merge({
          scripts: {
            test: `cd test/${application.clientTestProject} && dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover`,
          },
        });
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
          } catch {
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
        } catch {
          try {
            // If a tool is already installed the install sub-command will return 1
            // We'll use the update sub-command which behaves the way we'd expected.
            // See: https://github.com/dotnet/sdk/issues/9500
            await this.spawnCommand('dotnet tool update -g Microsoft.Web.LibraryManager.Cli');
          } catch {
            throw new Error('Could not install/update Microsoft.Web.LibraryManager.Cli');
          }
          this.log(chalk.green.bold('Microsoft.Web.LibraryManager.Cli successfully installed.\n'));
        }

        try {
          await this.spawnCommand('webcompiler');
        } catch {
          try {
            await this.spawnCommand('dotnet tool update Excubo.WebCompiler --global');
          } catch {
            throw new Error('Could not install/update Excubo.WebCompiler');
          }
          this.log(chalk.green.bold('Excubo.WebCompiler successfully installed.\n'));
        }
      },
    });
  }
}
