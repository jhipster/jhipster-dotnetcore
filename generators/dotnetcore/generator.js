import { access } from 'fs/promises';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import chalk from 'chalk';
import command from './command.js';
import { baseServiceDiscoveryFiles, serverFiles } from './files.js';
import { SERVER_SRC_DIR } from '../generator-dotnetcore-constants.js';
import constants from '../generator-dotnetcore-constants.cjs';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, jhipster7Migration: true });
  }

  async beforeQueue() {
    await this.dependsOnJHipster('jhipster-dotnetcore:bootstrap-dotnetcore');
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      async initializingTemplateTask() {
        this.parseJHipsterArguments(command.arguments);
        this.parseJHipsterOptions(command.options);
      },
    });
  }

  get [BaseApplicationGenerator.PROMPTING]() {
    return this.asPromptingTaskGroup({
      async promptingTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.CONFIGURING]() {
    return this.asConfiguringTaskGroup({
      async configuringTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.COMPOSING]() {
    return this.asComposingTaskGroup({
      async composingTemplateTask() {
        await this.composeWithJHipster('gatling');
      },
    });
  }

  get [BaseApplicationGenerator.PREPARING]() {
    return this.asPreparingTaskGroup({
      async preparingTemplateTask() {},
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
      async writeFilesBaseServiceDiscovery({ application }) {
        await this.writeFiles({
          sections: baseServiceDiscoveryFiles,
          context: application,
        });
      },
      async writeDirectoryTargetsFile({ application }) {
        await this.writeFiles({
          blocks: [
            {
              templates: [
                {
                  transform: false,
                  sourceFile: `dotnetcore/${SERVER_SRC_DIR}/Directory.Packages.props`,
                  destinationFile: 'Directory.Packages.props',
                },
              ],
            },
          ],
          context: application,
        });
      },
    });
  }

  get [BaseApplicationGenerator.DEFAULT]() {
    return this.asDefaultTaskGroup({
      async defaultTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.INSTALL]() {
    return this.asInstallTaskGroup({
      async installTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.END]() {
    return this.asEndTaskGroup({
      async end({ application }) {
        this.log(chalk.green.bold(`\nCreating ${application.solutionName} .Net Core solution if it does not already exist.\n`));
        const slns = [
          `${constants.SERVER_SRC_DIR}${application.mainProjectDir}/${application.pascalizedBaseName}.csproj`,
          `${constants.SERVER_TEST_DIR}${application.testProjectDir}/${application.pascalizedBaseName}${constants.PROJECT_TEST_SUFFIX}.csproj`,
          `${constants.SERVER_SRC_DIR}${application.pascalizedBaseName}${constants.PROJECT_CROSSCUTTING_SUFFIX}/${application.pascalizedBaseName}${constants.PROJECT_CROSSCUTTING_SUFFIX}.csproj`,
          `${constants.SERVER_SRC_DIR}${application.pascalizedBaseName}${constants.PROJECT_DOMAIN_SUFFIX}/${application.pascalizedBaseName}${constants.PROJECT_DOMAIN_SUFFIX}.csproj`,
          `${constants.SERVER_SRC_DIR}${application.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}/${application.pascalizedBaseName}${constants.PROJECT_DTO_SUFFIX}.csproj`,
          `${constants.SERVER_SRC_DIR}${application.pascalizedBaseName}${constants.PROJECT_SERVICE_SUFFIX}/${application.pascalizedBaseName}${constants.PROJECT_SERVICE_SUFFIX}.csproj`,
          `${constants.SERVER_SRC_DIR}${application.pascalizedBaseName}${constants.PROJECT_INFRASTRUCTURE_SUFFIX}/${application.pascalizedBaseName}${constants.PROJECT_INFRASTRUCTURE_SUFFIX}.csproj`,
        ];
        if (application.cqrsEnabled) {
          slns.push(
            `${constants.SERVER_SRC_DIR}${application.pascalizedBaseName}${constants.PROJECT_APPLICATION_SUFFIX}/${application.pascalizedBaseName}${constants.PROJECT_APPLICATION_SUFFIX}.csproj`,
          );
        }
        if (!this.skipChecks) {
          try {
            await this.newSln(application.solutionName);
            await this.slnAdd(`${application.solutionName}.sln`, slns);
          } catch (error) {
            this.log.warn(`Failed to create ${application.solutionName} .Net Core solution: ${err}`);
          } finally {
            this.log(chalk.green.bold('\nServer application generated successfully.\n'));
            this.log(
              chalk.green(
                `Run your .Net Core application:\n${chalk.yellow.bold(
                  `dotnet run --verbosity normal --project ./${constants.SERVER_SRC_DIR}${application.mainProjectDir}/${application.pascalizedBaseName}.csproj`,
                )}`,
              ),
            );
            this.log(chalk.green(`Test your .Net Core application:\n${chalk.yellow.bold('dotnet test --verbosity normal')}`));
          }
        }
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
