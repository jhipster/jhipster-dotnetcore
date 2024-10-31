import CiCdGenerator from 'generator-jhipster/generators/ci-cd';
import command from './command.mjs';

const GITHUB = 'github';
const GITLAB = 'gitlab';

export default class extends CiCdGenerator {
  constructor(args, opts, features) {
    super(args, opts, {
      ...features,
      checkBlueprint: true,
      // Dropped it once migration is done.
      jhipster7Migration: true,
    });
  }

  get [CiCdGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      async initializingTemplateTask() {
        this.parseJHipsterArguments(command.arguments);
        this.parseJHipsterOptions(command.options);
      },
      async initializingCiConfig() {
        this.ciType = this.blueprintConfig.ciType;
      },
    });
  }

  get [CiCdGenerator.PROMPTING]() {
    return this.asPromptingTaskGroup({
      async promptingCiChoices() {
        if (this.existingProject) return;
        if (this.ciType) return;

        const ciTypeChoices = [
          { value: GITHUB, name: 'Github Action' },
          { value: GITLAB, name: 'Gitlab CI' },
          { value: 'noci', name: 'No CI' },
        ];

        const answers = await this.prompt([
          {
            type: 'list',
            name: 'ciType',
            message: `What CI/CD pipeline do you want to generate ?`,
            choices: ciTypeChoices,
            default: GITHUB,
          },
        ]);
        this.ciType = this.blueprintConfig.ciType = answers.ciType;
      },
    });
  }

  get [CiCdGenerator.CONFIGURING]() {
    return this.asConfiguringTaskGroup({
      async configuringTemplateTask() {},
    });
  }

  get [CiCdGenerator.COMPOSING]() {
    return this.asComposingTaskGroup({
      async composingTemplateTask() {},
    });
  }

  get [CiCdGenerator.LOADING]() {
    return this.asLoadingTaskGroup({
      async loadingTemplateTask() {},
    });
  }

  get [CiCdGenerator.PREPARING]() {
    return this.asPreparingTaskGroup({
      async preparingTemplateTask() {},
    });
  }

  get [CiCdGenerator.DEFAULT]() {
    return this.asDefaultTaskGroup({
      async defaultTemplateTask() {},
    });
  }

  get [CiCdGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async writingCiFiles() {
        await this.writeFiles({
          sections: {
            files: [
              {
                condition: ctx => ctx.ciType === GITHUB,
                templates: ['.github/workflows/dotnet.yml'],
              },
              {
                condition: ctx => ctx.ciType === GITLAB,
                templates: ['.gitlab-ci.yml'],
              },
            ],
          },
          context: this,
        });
      },
    });
  }
}
