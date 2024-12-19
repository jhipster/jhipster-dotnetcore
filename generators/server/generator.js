import ServerGenerator from 'generator-jhipster/generators/server';

export default class extends ServerGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, queueCommandTasks: true, checkBlueprint: true });
  }

  get [ServerGenerator.COMPOSING]() {
    return this.asComposingTaskGroup({
      async composingTemplateTask() {
        await this.composeWithJHipster('jhipster-dotnetcore:dotnetcore');
      },
    });
  }
}
