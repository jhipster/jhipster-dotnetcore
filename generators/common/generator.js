import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { files } from './files.js';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  async beforeQueue() {
    await this.dependsOnJHipster('jhipster-dotnetcore:bootstrap-dotnetcore');
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async writingDotNetFiles({ application }) {
        await this.writeFiles({
          sections: files,
          context: application,
        });
      },
    });
  }
}
