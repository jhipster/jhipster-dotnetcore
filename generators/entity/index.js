/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');
// eslint-disable-next-line import/no-extraneous-dependencies
const toPascalCase = require('to-pascal-case');
const pluralize = require('pluralize');
const _ = require('lodash');
const constants = require('../generator-dotnetcore-constants');

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
                context.toPascalCase = toPascalCase;
                context.pluralize = pluralize;
                context._ = _;
                context.mainAngularDir = `${context.mainProjectDir}/ClientApp/app`;

                // Load in-memory data for .Net Blueprint fields
                context.fields.forEach(field => {
                    field.fieldNamePascalized = toPascalCase(field.fieldName);
                    field.fieldNameCamelCased = _.camelCase(field.fieldName);
                });

                // Load in-memory data for .Net Blueprint relationships
                context.relationships.forEach(relationship => {
                    relationship.relationshipFieldNamePascalized = toPascalCase(relationship.relationshipFieldName);
                    relationship.relationshipFieldNamePascalizedPlural = pluralize(relationship.relationshipFieldNamePascalized);
                    relationship.otherEntityNamePascalized = toPascalCase(relationship.otherEntityName);
                    relationship.otherEntityNamePascalizedPlural = toPascalCase(relationship.otherEntityNamePlural);
                    relationship.otherEntityNameCamelCased = _.camelCase(relationship.otherEntityName);
                    relationship.otherEntityRelationshipFieldName = _.lowerFirst(relationship.otherEntityRelationshipName);
                    relationship.otherEntityRelationshipFieldNamePascalized = toPascalCase(relationship.otherEntityRelationshipFieldName);
                    relationship.otherEntityRelationshipFieldNamePascalizedPlural = pluralize(
                        relationship.otherEntityRelationshipFieldNamePascalized
                    );
                    if (relationship.ownerSide) {
                        relationship.joinEntityName = context.entityClass + _.upperFirst(relationship.otherEntityName);
                        relationship.joinEntityNamePascalized = context.pascalizedEntityClass + relationship.otherEntityNamePascalized;
                    } else {
                        relationship.joinEntityName = relationship.otherEntityName + _.upperFirst(context.entityClass);
                        relationship.joinEntityNamePascalized = relationship.otherEntityNamePascalized + context.pascalizedEntityClass;
                    }
                    relationship.joinEntityNameSnakeCased = _.snakeCase(relationship.joinEntityName);
                    relationship.joinEntityNameCamelCased = _.camelCase(relationship.joinEntityName);
                    relationship.joinEntityFieldNamePascalizedPlural = pluralize(relationship.joinEntityNamePascalized);
                    if (relationship.relationshipType === 'many-to-many') {
                        context.entityClassHasManyToMany = true;
                    }
                    relationship.joinEntityGenerated = false;
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
