import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import chalk from 'chalk';
import { CLIENT_SRC_DIR, CLIENT_TEST_DIR } from '../generator-dotnetcore-constants.js';
import { files } from './files-blazor.js';
import { access } from 'fs/promises';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true, jhipster7Migration: true });
  }

  async beforeQueue() {
    await this.dependsOnJHipster('bootstrap-application');
    await this.dependsOnJHipster('jhipster-dotnetcore:bootstrap-dotnetcore');
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

  get [BaseApplicationGenerator.END]() {
    return this.asEndTaskGroup({
      async end({ application }) {
        this.log(chalk.green.bold(`\nCreating ${application.solutionName} .Net Core solution if it does not already exist.\n`));
        try {
          try {
            await access(`${application.solutionName}.sln`);
          } catch (error) {
            if (!this.skipChecks) {
              await this.spawnCommand(`dotnet new sln --name ${application.solutionName}`);
            }
          }
        } catch (err) {
          this.log.warn(`Failed to create ${application.solutionName} .Net Core solution: ${err}`);
        }
        const projects = [
          `${CLIENT_SRC_DIR}${application.mainClientDir}/${application.pascalizedBaseName}.Client.csproj`,
          `${CLIENT_SRC_DIR}${application.sharedClientDir}/${application.pascalizedBaseName}.Client.Shared.csproj`,
          `${CLIENT_TEST_DIR}${application.clientTestProject}/${application.pascalizedBaseName}.Client.Test.csproj`,
        ];

        if (!this.skipChecks) {
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
        }
      },
    });
  }
}
