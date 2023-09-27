import { readdir, stat } from 'node:fs/promises';
import BaseGenerator from 'generator-jhipster/generators/base';
import command from './command.mjs';
import { statSync } from 'node:fs';

export default class extends BaseGenerator {
  sampleName;
  jdlSample;
  withEntities;
  configOnly;

  get [BaseGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      async initializeOptions() {
        this.parseJHipsterCommand(command);
      },
    });
  }

  get [BaseGenerator.PROMPTING]() {
    return this.asPromptingTaskGroup({
      async askForSample() {
        if (!this.sampleName) {
          const answers = await this.prompt({
            type: 'list',
            name: 'sampleName',
            message: 'which sample do you want to generate?',
            choices: async () => readdir(this.templatePath('samples')),
          });
          this.sampleName = answers.sampleName;
        }
      },
    });
  }

  get [BaseGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async copySample() {
        let isDir = false;
        let jdlFile = false;
        try {
          const pathStat = await stat(this.templatePath(`samples/${this.sampleName}`));
          isDir = pathStat.isDirectory();
          jdlFile = pathStat.isFile();
        } catch (error) {
          try {
            this.sampleName += '.jdl';
            jdlFile = (await stat(this.templatePath(`samples/${this.sampleName}`))).isFile();
          } catch {
            throw error;
          }
        }

        if (jdlFile) {
          this.jdlSample = this.sampleName;
          this.copyTemplate(`samples/${this.sampleName}`, this.sampleName, { noGlob: true });
        } else if (isDir) {
          this.copyTemplate(`samples/${this.sampleName}/.yo-rc.json`, '.yo-rc.json', { noGlob: true });
        } else {
          throw new Error(`Sample ${this.sampleName} was not identified`);
        }
      },
      async jdlEntities() {
        if (this.withEntities) {
          this.jdlSample = this.sampleName.includes('-mongo-') ? 'app_mongo.jdl' : 'app.jdl';
          this.copyTemplate(`samples/jdl-default/${this.jdlSample}`, this.jdlSample, { noGlob: true });
        }
      },
    });
  }

  get [BaseGenerator.END]() {
    return this.asEndTaskGroup({
      async generateSample() {
        if (this.jdlSample && !this.configOnly) {
          await this.composeWithJHipster('jdl', {
            generatorArgs: [this.jdlSample],
            generatorOptions: {
              jsonOnly: true,
            },
          });
        }
      },
      async generateApp() {
        if (this.configOnly) {
          return;
        }

        await this.composeWithJHipster('app', {
          generatorOptions: {
            skipJhipsterDependencies: true,
            insight: false,
            skipChecks: true,
            skipInstall: true,
          },
        });
      },
      async jhipsterInfo() {
        await this.composeWithJHipster('info');
      },
    });
  }
}
