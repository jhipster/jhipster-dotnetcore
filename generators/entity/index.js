/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');
const toPascalCase = require('to-pascal-case');
const pluralize = require('pluralize');
const _ = require('lodash');

module.exports = class extends EntityGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint dotnetcore')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupEntityOptions(this, jhContext);
    }

    get initializing() {
        /**
         * Any method beginning with _ can be reused from the superclass `EntityGenerator`
         *
         * There are multiple ways to customize a phase from JHipster.
         *
         * 1. Let JHipster handle a phase, blueprint doesnt override anything.
         * ```
         *      return super._initializing();
         * ```
         *
         * 2. Override the entire phase, this is when the blueprint takes control of a phase
         * ```
         *      return {
         *          myCustomInitPhaseStep() {
         *              // Do all your stuff here
         *          },
         *          myAnotherCustomInitPhaseStep(){
         *              // Do all your stuff here
         *          }
         *      };
         * ```
         *
         * 3. Partially override a phase, this is when the blueprint gets the phase from JHipster and customizes it.
         * ```
         *      const phaseFromJHipster = super._initializing();
         *      const myCustomPhaseSteps = {
         *          displayLogo() {
         *              // override the displayLogo method from the _initializing phase of JHipster
         *          },
         *          myCustomInitPhaseStep() {
         *              // Do all your stuff here
         *          },
         *      }
         *      return Object.assign(phaseFromJHipster, myCustomPhaseSteps);
         * ```
         */
        const phaseFromJHipster = super._initializing();
        const jhipsterNetPhaseSteps = {
            getConfigNetBlueprint() {
                const configuration = this.getAllJhipsterConfig(this, true);
                this.context.namespace = configuration.get('namespace') || this.configOptions.namespace;
            }
        };
        return Object.assign(phaseFromJHipster, jhipsterNetPhaseSteps);
    }

    get prompting() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._prompting();
    }

    get configuring() {
        const phaseFromJHipster = super._configuring();
        const jhipsterNetPhaseSteps = {
            loadInMemoryDataNetBlueprint() {
                const context = this.context;
                context.pascalizedBaseName = toPascalCase(context.baseName);
                context.mainProjectDir = context.pascalizedBaseName;
                context.pascalizedEntityClass = toPascalCase(context.entityClass);
                context.snakeCasedEntityClass = _.snakeCase(context.entityClass);
                context.camelCasedEntityClass = _.camelCase(context.entityClass);

                // Load in-memory data for fields
                context.fields.forEach(field => {
                    field.fieldNamePascalized = toPascalCase(field.fieldName);
                });

                // Load in-memory data for .Net Blueprint relationships
                context.relationships.forEach(relationship => {
                    relationship.relationshipFieldNamePascalized = toPascalCase(relationship.relationshipFieldName);
                    relationship.relationshipFieldNamePascalizedPlural = pluralize(relationship.relationshipFieldNamePascalized);
                    relationship.otherEntityNamePascalized = toPascalCase(relationship.otherEntityName);
                    if (relationship.ownerSide) {
                        relationship.joinedEntitiesName = context.pascalizedEntityClass + relationship.otherEntityNamePascalized;
                    } else {
                        relationship.joinedEntitiesName = relationship.otherEntityNamePascalized + context.pascalizedEntityClass;
                    }
                    relationship.joinedEntitiesFieldNamePlural = pluralize(relationship.joinedEntitiesName);
                });
            }
        };
        return Object.assign(phaseFromJHipster, jhipsterNetPhaseSteps);
    }

    get writing() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._writing();
    }

    get install() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._install();
    }
};
