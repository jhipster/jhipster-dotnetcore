import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import toPascalCase from 'to-pascal-case';
import { BLAZOR, PROJECT_TEST_SUFFIX, XAMARIN } from '../generator-dotnetcore-constants.js';

export default class extends BaseApplicationGenerator {
  async beforeQueue() {
    await this.dependsOnJHipster('bootstrap-application');
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      async checks() {
        if (!this.skipChecks) {
          try {
            await this.spawnCommand('dotnet');
          } catch (error) {
            throw new Error(`dotnet was not found. Check the installation. ${error}`);
          }
        }
      },
    });
  }

  get [BaseApplicationGenerator.LOADING]() {
    return this.asLoadingTaskGroup({
      async loadingTemplateTask({ application }) {
        application.namespace = this.jhipsterConfig.namespace;
      },
    });
  }

  get [BaseApplicationGenerator.PREPARING]() {
    return this.asPreparingTaskGroup({
      async preparingTemplateTask({ application }) {
        application.temporaryDir = 'dist/';
        application.withAdminUi = false;
        application.serverPortSecured = parseInt(application.serverPort, 10) + 1;

        application.camelizedBaseName = this._.camelCase(application.baseName);
        application.dasherizedBaseName = this._.kebabCase(application.baseName);
        application.pascalizedBaseName = toPascalCase(application.baseName);
        application.lowercaseBaseName = application.baseName.toLowerCase();
        application.humanizedBaseName = this._.startCase(application.baseName);
        application.solutionName = application.pascalizedBaseName;
        application.mainProjectDir = application.pascalizedBaseName;
        application.mainClientDir = `${application.mainProjectDir}/ClientApp`;
        application.mainClientAppDir = `${application.mainProjectDir}/ClientApp/src`;
        application.relativeMainClientDir = 'ClientApp';
        application.relativeMainAppDir = `${application.relativeMainClientDir}/src`;
        application.relativeMainTestDir = `${application.relativeMainClientDir}/test`;
        application.testProjectDir = `${application.pascalizedBaseName}${PROJECT_TEST_SUFFIX}`;
        application.clientTestProject = `${application.mainClientDir}/test/`;
        application.kebabCasedBaseName = this._.kebabCase(application.baseName);
        // application.jhipsterDotnetVersion = packagejs.version;
        application.modelSuffix = 'Model';
        application.backendName = '.Net';

        application.primaryKeyType = application.databaseType === 'mongodb' ? 'string' : 'long';

        if (application.clientFramework === BLAZOR) {
          application.mainClientDir = `client/${application.pascalizedBaseName}.Client`;
          application.sharedClientDir = `client/${application.pascalizedBaseName}.Client.Shared`;
          application.clientTestProject = `${application.pascalizedBaseName}.Client${PROJECT_TEST_SUFFIX}`;
        }
        if (application.clientFramework === XAMARIN) {
          application.mainClientDir = `client/${application.pascalizedBaseName}.Client.Xamarin.Core`;
          application.sharedClientDir = `client/${application.pascalizedBaseName}.Client.Xamarin.Shared`;
          application.androidClientDir = `client/${application.pascalizedBaseName}.Client.Xamarin.Android`;
          application.iOSClientDir = `client/${application.pascalizedBaseName}.Client.Xamarin.iOS`;
          application.clientTestProject = `${application.pascalizedBaseName}.Client.Xamarin${PROJECT_TEST_SUFFIX}`;
        }
      },
    });
  }
}
