import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { DEVCONTAINER_DOTNET_IMAGE_TAG } from '../generator-dotnetcore-constants.js';
import { files } from './files.js';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, queueCommandTasks: true, sbsBlueprint: true });
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async writingDotNetFiles({ application }) {
        application.devcontainerDotnetImageTag = DEVCONTAINER_DOTNET_IMAGE_TAG;
        this.removeFile('sonar-project.properties');
        await this.writeFiles({
          sections: files,
          context: application,
        });
      },
    });
  }
}
