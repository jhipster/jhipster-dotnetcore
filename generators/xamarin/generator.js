import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { files } from './files-xamarin.js';

export default class extends BaseApplicationGenerator {
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

  get [BaseApplicationGenerator.INSTALL]() {
    return this.asInstallTaskGroup({
      async install() {
        this.log(chalk.green.bold(`\nCreating ${this.solutionName} .Net Core solution if it does not already exist.\n`));
        try {
          await dotnet.newSln(this.solutionName);
        } catch (err) {
          this.warning(`Failed to create ${this.solutionName} .Net Core solution: ${err}`);
        }
        await dotnet.slnAdd(`${this.solutionName}.sln`, [
          `${constants.CLIENT_SRC_DIR}${this.mainClientDir}/${this.pascalizedBaseName}.Client.Xamarin.Core.csproj`,
          `${constants.CLIENT_SRC_DIR}${this.sharedClientDir}/${this.pascalizedBaseName}.Client.Xamarin.Shared.csproj`,
        ]);
        await dotnet.newSlnAddProj(this.solutionName, [
          {
            path: `${constants.CLIENT_SRC_DIR}${this.androidClientDir}/${this.pascalizedBaseName}.Client.Xamarin.Android.csproj`,
            name: `${this.pascalizedBaseName}.Client.Xamarin.Android`,
          },
          {
            path: `${constants.CLIENT_SRC_DIR}${this.iOSClientDir}/${this.pascalizedBaseName}.Client.Xamarin.iOS.csproj`,
            name: `${this.pascalizedBaseName}.Client.Xamarin.iOS`,
          },
        ]);
        this.log(chalk.green.bold('Client application generated successfully.\n'));
      },
    });
  }
}
