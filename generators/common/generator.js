import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { jhipsterCommonFiles, files } from './files.js';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  async beforeQueue() {
    await this.dependsOnJHipster('jhipster-dotnetcore:bootstrap-dotnetcore');
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      /*
      configureGlobal() {
        this.kebabCasedBaseName = _.kebabCase(this.baseName);
        this.pascalizedBaseName = toPascalCase(this.baseName);
        this.mainProjectDir = this.pascalizedBaseName;
        this.mainClientDir = `${this.mainProjectDir}/ClientApp`;
        this.jhipsterDotnetVersion = packagejs.version;
        this.options.outputPathCustomizer = [
          paths => (paths ? paths.replace(/^(\.prettierignore)$/, `src/${this.mainClientDir}/$1`) : paths),
          paths => (paths ? paths.replace(/^(\.prettierrc)$/, `src/${this.mainClientDir}/$1`) : paths),
          paths => (paths ? paths.replace(/^(package.json)$/, `src/${this.mainClientDir}/$1`) : paths),
        ];
      },
      */
     /*
      async writingCommonFiles({ application }) {
        await this.writeFiles({
          sections: jhipsterCommonFiles,
          context: application,
        });
      },
      async writingDotNetFiles({ application }) {
        await this.writeFiles({
          sections: files,
          context: application,
        });
      },
      */
    });
  }
}
