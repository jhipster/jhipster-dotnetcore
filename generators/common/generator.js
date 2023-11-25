import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { files } from './files.js';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async writingDotNetFiles({ application }) {
        this.removeFile('sonar-project.properties');
        await this.writeFiles({
          sections: files,
          context: application,
        });
      },
    });
  }
}
