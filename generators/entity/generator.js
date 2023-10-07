/* eslint-disable consistent-return */
const EntityGenerator = require('generator-jhipster/generators/entity');
// eslint-disable-next-line import/no-extraneous-dependencies
const prompts = require('./prompts');

module.exports = class extends EntityGenerator {
  constructor(args, opts) {
    super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important
  }

  get initializing() {
    const phaseFromJHipster = super._initializing();
    const jhipsterNetPhaseSteps = {
      getConfigNetBlueprint() {
        this.context.namespace = this.jhipsterConfig.namespace;
        this.context.cqrsEnabled = this.jhipsterConfig.cqrsEnabled;
        this.context.dtoSuffix = 'Dto';
      },
      fixConfig() {
        this.context.prodDatabaseType = this.context.databaseType === 'mongodb' ? 'mongodb' : 'mysql'; // set only for jdl-importer compatibility
      },
    };
    return Object.assign(phaseFromJHipster, jhipsterNetPhaseSteps);
  }

  get prompting() {
    return {
      /* pre entity hook needs to be written here */
      askForMicroserviceJson: prompts.askForMicroserviceJson,
      /* ask question to user if s/he wants to update entity */
      askForUpdate: prompts.askForUpdate,
      askForFields: prompts.askForFields,
      askForFieldsToRemove: prompts.askForFieldsToRemove,
      askForRelationships: prompts.askForRelationships,
      askForRelationsToRemove: prompts.askForRelationsToRemove,
      askForTableName: prompts.askForTableName,
      askForService: prompts.askForService,
      askForDTO: prompts.askForDTO,
      // askForFiltering: prompts.askForFiltering,
      askForPagination: prompts.askForPagination,
    };
  }

  get configuring() {
    return super._configuring();
  }
};
