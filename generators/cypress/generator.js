import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { writeFiles } from './files-cypress.js';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  get [BaseApplicationGenerator.PREPARING]() {
    return this.asPreparingTaskGroup({
      preparing({ application }) {
        application.cypressDir = `${SERVER_SRC_DIR}${application.clientTestProject}/cypress/`;
        application.serverPortSecured = parseInt(application.serverPort, 10) + 1;
      },
    });
  }

  get [BaseApplicationGenerator.POST_WRITING]() {
    return this.asPostWritingTaskGroup({
      removeNotImplementedFeatureInCypress({ application }) {
        this.deleteDestination(`${application.cypressDir}integration/account/reset-password-page.spec.ts`);
        this.deleteDestination(`${application.cypressDir}integration/administration/administration.spec.ts`);
      },

      updateTsConfigCypress() {
        this.editFile(`${application.cypressDir}/tsconfig.json`, content => content.replace('./../../../../', './../../'));
      },

      updateCypressJson() {
        this.editFile(`${SERVER_SRC_DIR}${application.mainClientDir}/cypress.json`, content =>
          content.replace(`${SERVER_SRC_DIR}${application.mainClientDir}/`, ''),
        );
        this.editFile(`${SERVER_SRC_DIR}${application.mainClientDir}/cypress.json`, content =>
          content.replace(`http://localhost:${application.serverPort}`, `https://localhost:${application.serverPortSecured}`),
        );
        this.editFile(`${SERVER_SRC_DIR}${application.mainClientDir}/cypress.json`, content => content.replace('target', 'dist'));
      },
    });
  }
}
