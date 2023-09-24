/* eslint-disable consistent-return */
const chalk = require('chalk');
const AppGenerator = require('generator-jhipster/generators/app');
const packagejs = require('../../package.json');
const prompts = require('./prompts');

module.exports = class extends AppGenerator {
  constructor(args, opts) {
    super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important
  }

  get initializing() {
    const initPhaseFromJHipster = this._initializing();

    const dotnetInitAppPhaseSteps = {
      /* eslint-disable */

      getConfig() {
        this.baseName = this.jhipsterConfig.baseName;
        this.namespace = this.jhipsterConfig.namespace;
        this.applicationType = this.jhipsterConfig.applicationType;
        this.serviceDiscoveryType = this.jhipsterConfig.serviceDiscoveryType;
        const serverConfigFound = this.namespace !== undefined;

        if (this.baseName !== undefined && serverConfigFound) {
          this.log(
            chalk.green(
              'This is an existing project, using the configuration from your .yo-rc.json file \n' + 'to re-generate the project...\n',
            ),
          );
          this.existingProject = true;
        }
      },
    };
    return Object.assign(initPhaseFromJHipster, dotnetInitAppPhaseSteps);
  }

  get prompting() {
    return {
      askForModuleName: prompts.askForModuleName,
      askForApplicationType: prompts.askForApplicationType,

      setSharedConfigOptions() {
        this.configOptions.baseName = this.baseName;
        this.configOptions.namespace = this.namespace;
        this.configOptions.applicationType = this.applicationType;
        this.configOptions.serviceDiscoveryType = this.serviceDiscoveryType;
      },
    };
  }

  get configuring() {
    return super._configuring();
  }

  get composing() {
    return super._composing();
  }

  get loading() {
    return super._loading();
  }

  get preparing() {
    return super._preparing();
  }

  get default() {
    return super._default();
  }

  get writing() {
    return super._writing();
  }

  get postWriting() {
    return super._postWriting();
  }

  get install() {
    return super._install();
  }

  get end() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._end();
  }
};
