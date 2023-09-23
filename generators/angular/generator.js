import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  get [BaseApplicationGenerator.POST_WRITING]() {
    return this.asPostWritingTaskGroup({
      async postWritingTemplateTask() {
        /*

  this.replaceContent(`${SERVER_SRC_DIR}${this.mainClientDir}/angular.json`, `${SERVER_SRC_DIR}${this.mainClientDir}/`, '', true);
  this.replaceContent(`${SERVER_SRC_DIR}${this.mainClientDir}/angular.json`, `target/classes/static/`, 'dist/', true);

  this.replaceContent(`${SERVER_SRC_DIR}${this.mainClientAppDir}/app/home/home.component.html`, 'Java', '.Net Core', false);

  this.replaceContent(
    `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.custom.js`,
    `${SERVER_SRC_DIR}${this.mainClientDir}/`,
    '',
    true,
  );
        */
      },
    });
  }
}
