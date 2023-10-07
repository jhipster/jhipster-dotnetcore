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
        this.deleteDestination(`${application.cypressDir}e2e/account/reset-password-page.cy.ts`);
        this.deleteDestination(`${application.cypressDir}e2e/administration/administration.cy.ts`);

        this.editFile(`${application.cypressDir}e2e/account/settings-page.cy.ts`, content =>
          content
            .replace(
              `it("should not be able to change 'user' email to same value"`,
              `it.skip("should not be able to change 'user' email to same value"`,
            )
            .replace(
              `it("should be able to change 'user' lastname settings"`,
              `it.skip("should be able to change 'user' lastname settings"`,
            )
            .replace(`it("should be able to change 'user' email settings"`, `it.skip("should be able to change 'user' email settings"`),
        );
      },
    });
  }
}
