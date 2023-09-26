import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  async beforeQueue() {
    await this.dependsOnJHipster('jhipster-dotnetcore:bootstrap-dotnetcore');
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
