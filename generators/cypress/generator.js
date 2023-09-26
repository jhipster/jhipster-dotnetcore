import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { SERVER_SRC_DIR } from '../generator-dotnetcore-constants.js';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  async beforeQueue() {
    await this.dependsOnJHipster('jhipster-dotnetcore:bootstrap-dotnetcore');
  }

  get [BaseApplicationGenerator.PREPARING]() {
    return this.asPreparingTaskGroup({
      preparing({ application }) {
        // application.cypressDir = `${SERVER_SRC_DIR}${application.clientTestProject}/cypress/`;
      },
    });
  }

  get [BaseApplicationGenerator.POST_WRITING]() {
    return this.asPostWritingTaskGroup({
      removeNotImplementedFeatureInCypress({ application }) {
        this.deleteDestination(`${application.cypressDir}integration/account/reset-password-page.spec.ts`);
        this.deleteDestination(`${application.cypressDir}integration/administration/administration.spec.ts`);
      },
      updateCypressJson({ application }) {
        this.editFile(`${application.clientAppRootDir}cypress.config.ts`, content =>
          content.replace(`http://localhost:${application.serverPort}`, `https://localhost:${application.serverPortSecured}`),
        );
      },
    });
  }
}
