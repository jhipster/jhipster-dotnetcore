import { writeFileSync } from 'fs';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { createNeedleCallback } from 'generator-jhipster/generators/base/support';
import chalk from 'chalk';
import { Guid } from 'js-guid';
import { CLIENT_SRC_DIR } from '../generator-dotnetcore-constants.js';
import { files } from './files-xamarin.js';
import { entityFiles } from './entities-xamarin.js';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, jhipster7Migration: true });
  }

  async beforeQueue() {
    await this.dependsOnJHipster('bootstrap-application');
  }

  get [BaseApplicationGenerator.PREPARING]() {
    return this.asPreparingTaskGroup({
      async preparingTemplateTask({ application, source }) {
        source.addEntityToMenu = ({ entityName }) =>
          this.editFile(
            `${application.mainClientDir}/Views/MenuPage.xaml`,
            createNeedleCallback({
              needle: 'jhipster-needle-add-entity-to-menu',
              contentToAdd: `
                <Grid HorizontalOptions="FillAndExpand" VerticalOptions="StartAndExpand" Padding="8" BackgroundColor="LightBlue" IsVisible="{Binding IsConnected}">
                    <Label Text="${entityName}" />
                    <Grid.GestureRecognizers>
                        <TapGestureRecognizer Tapped="ToggleClicked" Command="{Binding Show${entityName}Command}"/>
                    </Grid.GestureRecognizers>
                </Grid>`,
              autoIndent: true,
            }),
          );

        source.declareCommandToMenu = ({ entityName }) =>
          this.editFile(
            `${application.mainClientDir}/ViewModels/MenuViewModel.cs`,
            createNeedleCallback({
              needle: 'jhipster-needle-declare-entity-command',
              contentToAdd: `public IMvxCommand Show${entityName}Command => new MvxAsyncCommand(${entityName}CommandClicked);`,
              autoIndent: true,
            }),
          );

        source.addCommandToMenu = ({ entityName }) =>
          this.editFile(
            `${application.mainClientDir}/ViewModels/MenuViewModel.cs`,
            createNeedleCallback({
              needle: 'jhipster-needle-add-entity-command',
              contentToAdd: `
                private async Task ${entityName}CommandClicked() {
                    await _navigationService.Navigate<${entityName}ViewModel>();
                }`,
              autoIndent: true,
            }),
          );

        source.addServiceInDI = ({ entityName }) =>
          this.editFile(
            `${application.mainClientDir}/App.cs`,
            createNeedleCallback({
              needle: 'jhipster-needle-add-services-in-di',
              contentToAdd: `
                var ${this._.lowerCase(entityName)}Service = new ${entityName}Service(httpClient);                       
                Mvx.IoCProvider.RegisterSingleton<I${entityName}Service>(${this._.lowerCase(entityName)}Service);`,
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
              asModel: str => `${str}${application.modelSuffix}`,
            },
          });
        }
      },
    });
  }

  get [BaseApplicationGenerator.POST_WRITING_ENTITIES]() {
    return this.asPostWritingEntitiesTaskGroup({
      async postWritingEntitiesTemplateTask({ entities, source }) {
        for (const entity of entities.filter(entity => !entity.builtIn && !entity.skipClient)) {
          source.addEntityToMenu({ entityName: entity.entityClass });
          source.addServiceInDI({ entityName: entity.entityClass });
          source.addCommandToMenu({ entityName: entity.entityClass });
          source.declareCommandToMenu({ entityName: entity.entityClass });
        }
      },
    });
  }

  get [BaseApplicationGenerator.INSTALL]() {
    return this.asInstallTaskGroup({
      async install({ application }) {
        this.log(chalk.green.bold(`\nCreating ${application.solutionName} .Net Core solution if it does not already exist.\n`));

        try {
          await this.spawnCommand(`dotnet new sln --name ${application.solutionName}`);
        } catch (err) {
          this.log.warn(`Failed to create ${application.solutionName} .Net Core solution: ${err}`);
        }

        const projects = [
          `${CLIENT_SRC_DIR}${application.mainClientDir}${application.pascalizedBaseName}.Client.Xamarin.Core.csproj`,
          `${CLIENT_SRC_DIR}${application.sharedClientDir}${application.pascalizedBaseName}.Client.Xamarin.Shared.csproj`,
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
          await this.newSlnAddProj(application.solutionName, [
            {
              path: `${CLIENT_SRC_DIR}${application.androidClientDir}/${application.pascalizedBaseName}.Client.Xamarin.Android.csproj`,
              name: `${application.pascalizedBaseName}.Client.Xamarin.Android`,
            },
            {
              path: `${CLIENT_SRC_DIR}${application.iOSClientDir}/${application.pascalizedBaseName}.Client.Xamarin.iOS.csproj`,
              name: `${application.pascalizedBaseName}.Client.Xamarin.iOS`,
            },
          ]);
          this.log(chalk.green.bold('Client application generated successfully.\n'));
        } catch {
          this.log.error('Failed to add project.');
        }
      },
    });
  }

  async newSlnAddProj(solutionName, projects) {
    const solutionFile = this.readDestination(`${solutionName}.sln`);
    const regex = new RegExp(`Project\\("{([^}"]*)}"\\) = .*Core.csproj", "{([^}"]*)}"`, 'g');
    const exc = regex.exec(solutionFile);
    const firstGuid = exc[1];
    const regexp = RegExp(`Project\\("{[^}"]*}"\\) = "client", "client", "{([^}"]*)}"`, 'g');
    const clientDir = regexp.exec(solutionFile)[1];
    const reg = new RegExp(`Project\\("{[^"]*"\\) = "([^"]*)", "[^"]*`, 'g');
    let projectText = '';
    let dirText = '';

    projectText += `\nProject("{${firstGuid}}") = "Solution Items", "Solution Items", "{${this._.toUpper(Guid.newGuid())}}"`;
    projectText += '\n\tProjectSection(SolutionItems) = preProject';
    projectText += '\n\t\t.editorconfig = .editorconfig';
    projectText += '\n\t\tDirectory.Packages.props = Directory.Packages.props';
    projectText += '\n\t\tREADME.md = README.md';
    projectText += '\n\tEndProjectSection';
    projectText += '\nEndProject';

    projects.forEach(project => {
      const existingProjects = solutionFile.matchAll(reg);
      let alreadyExist = false;
      let existingProject = existingProjects.next();
      while (!existingProject.done && !alreadyExist) {
        alreadyExist = existingProject.value[1] === project.name;
        existingProject = existingProjects.next();
      }
      if (!alreadyExist) {
        const randomGuid = this._.toUpper(Guid.newGuid());
        projectText += `\nProject("{${firstGuid}}") = "${project.name}", "${project.path}", "{${randomGuid}}"\nEndProject`;
        dirText += `\n\t\t{${randomGuid}} = {${clientDir}}`;
      }
    });

    const projectRe = new RegExp('MinimumVisualStudioVersion = .*\\D', 'g');
    const projectFound = solutionFile.match(projectRe);
    projectText = `${projectFound}${projectText}`;
    let newBody = solutionFile.replace(projectRe, projectText);

    const dirRe = new RegExp('GlobalSection\\(NestedProjects\\) = .*\\D', 'g');
    const dirFound = solutionFile.match(dirRe);
    dirText = `${dirFound}${dirText}`;
    newBody = newBody.replace(dirRe, dirText);

    if (solutionFile !== newBody) {
      writeFileSync(`${solutionName}.sln`, newBody);
    }
  }
}
