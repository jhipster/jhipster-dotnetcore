import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import command from './command.js';
import { BLAZOR, XAMARIN } from '../generator-dotnetcore-constants.js';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });

    this.jhipsterContext.command = command;
  }

  get [BaseApplicationGenerator.COMPOSING]() {
    return this.asComposingTaskGroup({
      async composingTemplateTask() {
        if (this.jhipsterConfig.clientFramework === BLAZOR) {
          await this.composeWithJHipster('jhipster-dotnetcore:blazor');
        }
        if (this.jhipsterConfig.clientFramework === XAMARIN) {
          await this.composeWithJHipster('jhipster-dotnetcore:xamarin');
        }
      },
    });
  }
}
