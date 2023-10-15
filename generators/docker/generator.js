import DockerGenerator from 'generator-jhipster/generators/docker';
import { GENERATOR_BOOTSTRAP_APPLICATION } from 'generator-jhipster/generators';
import { dockerFiles } from './files.js';

export default class extends DockerGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  async beforeQueue() {
    await this.dependsOnJHipster(GENERATOR_BOOTSTRAP_APPLICATION);
  }

  get [DockerGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async writingTemplateTask({ application }) {
        await this.writeFiles({
          sections: dockerFiles,
          context: application,
        });
      },
    });
  }
}
