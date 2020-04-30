/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');
// eslint-disable-next-line import/no-extraneous-dependencies
const toPascalCase = require('to-pascal-case');
const pluralize = require('pluralize');
const _ = require('lodash');
const utilsNet = require('../utils');
const constants = require('../generator-dotnetcore-constants');
const prompts = require('./prompts');

module.exports = class extends EntityGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint dotnetcore')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupEntityOptions(this, jhContext);
    }

    get initializing() {
        const phaseFromJHipster = super._initializing();
        const jhipsterNetPhaseSteps = {
            getConfigNetBlueprint() {
                const configuration = this.getAllJhipsterConfig(this, true);
                this.context.namespace = configuration.get('namespace') || this.configOptions.namespace;
            },
        };
        return Object.assign(phaseFromJHipster, jhipsterNetPhaseSteps);
    }

    get prompting() {
        return {
            /* pre entity hook needs to be written here */
            // askForMicroserviceJson: prompts.askForMicroserviceJson,
            /* ask question to user if s/he wants to update entity */
            askForUpdate: prompts.askForUpdate,
            askForFields: prompts.askForFields,
            askForFieldsToRemove: prompts.askForFieldsToRemove,
            askForRelationships: prompts.askForRelationships,
            askForRelationsToRemove: prompts.askForRelationsToRemove,
            askForTableName: prompts.askForTableName,
            // askForService: prompts.askForService,
            // askForDTO: prompts.askForDTO,
            // askForFiltering: prompts.askForFiltering,
            askForPagination: prompts.askForPagination,
        };
    }

    get configuring() {
        const phaseFromJHipster = super._configuring();
        const jhipsterNetPhaseSteps = {
            loadInMemoryDataNetBlueprint() {
                const context = this.context;
                context.pascalizedBaseName = toPascalCase(context.baseName);
                context.mainProjectDir = context.pascalizedBaseName;
                context.testProjectDir = `${context.pascalizedBaseName}${constants.PROJECT_TEST_SUFFIX}`;
                context.pascalizedEntityClass = toPascalCase(context.entityClass);
                context.pascalizedEntityClassPlural = toPascalCase(context.entityClassPlural);
                context.snakeCasedEntityClass = _.snakeCase(context.entityClass);
                context.snakeCasedEntityClassPlural = _.snakeCase(context.entityClassPlural);
                context.camelCasedEntityClass = _.camelCase(context.entityClass);
                context.kebabCasedEntityClass = _.kebabCase(context.entityClass);
                context.kebabCasedEntityClassPlural = _.kebabCase(context.entityClassPlural);
                context.entityClassHasManyToMany = false;
                context.entities = this.getExistingEntities();
                context.mainClientAppDir = `${context.mainProjectDir}/ClientApp/src`;
                context.mainClientDir = `${context.mainProjectDir}/ClientApp`;

                // Embed functions to use in EJS templates
                context.toPascalCase = toPascalCase;
                context.pluralize = pluralize;
                context._ = _;
                context.equivalentCSharpType = utilsNet.equivalentCSharpType;

                // Load in-memory data for .Net Blueprint fields
                context.fields.forEach(field => {
                    field.fieldNamePascalized = toPascalCase(field.fieldName);
                    field.fieldNameCamelCased = _.camelCase(field.fieldName);
                });

                // Load in-memory data for .Net Blueprint relationships
                context.relationships.forEach(relationship => {
                    relationship.relationshipNamePascalized = toPascalCase(relationship.relationshipName);
                    relationship.relationshipFieldNamePascalized = toPascalCase(relationship.relationshipFieldName);
                    relationship.relationshipFieldNamePascalizedPlural = pluralize(relationship.relationshipFieldNamePascalized);
                    relationship.otherEntityNamePascalized = toPascalCase(relationship.otherEntityName);
                    relationship.otherEntityNamePascalizedPlural = toPascalCase(relationship.otherEntityNamePlural);
                    relationship.otherEntityNameCamelCased = _.camelCase(relationship.otherEntityName);

                    if (
                        relationship.relationshipType === 'one-to-many' ||
                        relationship.relationshipType === 'many-to-many' ||
                        relationship.relationshipType === 'one-to-one' ||
                        relationship.otherEntityName.toLowerCase() === 'user'
                    ) {
                        relationship.otherEntityRelationshipNamePascalized = toPascalCase(relationship.otherEntityRelationshipName);
                        relationship.otherEntityRelationshipFieldName = _.lowerFirst(relationship.otherEntityRelationshipName);
                        relationship.otherEntityRelationshipFieldNamePascalized = toPascalCase(
                            relationship.otherEntityRelationshipFieldName
                        );
                        relationship.otherEntityRelationshipFieldNamePascalizedPlural = pluralize(
                            relationship.otherEntityRelationshipFieldNamePascalized
                        );
                    }

                    if (relationship.relationshipType === 'many-to-many') {
                        if (relationship.ownerSide) {
                            relationship.joinEntityName =
                                relationship.otherEntityRelationshipName + _.upperFirst(relationship.relationshipName);
                            relationship.joinEntityNamePascalized =
                                relationship.otherEntityRelationshipNamePascalized + relationship.relationshipNamePascalized;
                        } else {
                            relationship.joinEntityName =
                                relationship.relationshipName + _.upperFirst(relationship.otherEntityRelationshipName);
                            relationship.joinEntityNamePascalized =
                                relationship.relationshipNamePascalized + relationship.otherEntityRelationshipNamePascalized;
                        }
                        relationship.joinEntityNameSnakeCased = _.snakeCase(relationship.joinEntityName);
                        relationship.joinEntityNameCamelCased = _.camelCase(relationship.joinEntityName);
                        relationship.joinEntityFieldNamePascalizedPlural = pluralize(relationship.joinEntityNamePascalized);
                        context.entityClassHasManyToMany = true;
                    }

                    relationship.joinEntityGenerated = false;
                });
            },
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
