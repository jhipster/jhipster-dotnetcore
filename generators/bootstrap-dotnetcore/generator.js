import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { addOtherRelationship } from 'generator-jhipster/generators/base-application/support';
import toPascalCase from 'to-pascal-case';
import pluralize from 'pluralize';
import utilsNet from '../utils.cjs';
import { BLAZOR, PROJECT_TEST_SUFFIX, SERVER_SRC_DIR, SERVER_TEST_DIR, XAMARIN } from '../generator-dotnetcore-constants.js';

export default class extends BaseApplicationGenerator {
  async beforeQueue() {
    await this.dependsOnJHipster('bootstrap-application');
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      async checks() {
        if (!this.skipChecks) {
          try {
            await this.spawnCommand('dotnet');
          } catch (error) {
            throw new Error(`dotnet was not found. Check the installation. ${error}`);
          }
        }
      },
    });
  }

  get [BaseApplicationGenerator.CONFIGURING]() {
    return this.asConfiguringTaskGroup({
      async configuring() {
        if (!this.jhipsterConfig.namespace) {
          this.jhipsterConfig.namespace = toPascalCase(this.jhipsterConfig.baseName);
        }
      },
    });
  }

  get [BaseApplicationGenerator.LOADING]() {
    return this.asLoadingTaskGroup({
      async loadingTemplateTask({ application }) {
        application.cqrsEnabled = this.jhipsterConfig.cqrsEnabled;
        application.databaseType = this.jhipsterConfig.databaseType ?? 'sqllite';
        application.namespace = this.jhipsterConfig.namespace;
        application.withTerraformAzureScripts = this.jhipsterConfig.withTerraformAzureScripts;
        if (['postgresql', 'mysql', 'mariadb', 'mssql'].includes(application.databaseType)) {
          application.prodDatabaseType = application.databaseType;
        }

        application.SERVER_SRC_DIR = SERVER_SRC_DIR;
        application.SERVER_TEST_DIR = SERVER_TEST_DIR;

        if (this.jhipsterConfig.dtoSuffix === undefined || application.dtoSuffix === 'DTO') {
          application.dtoSuffix = 'Dto';
        }
        application.pascalizedBaseName = toPascalCase(application.baseName);
        application.solutionName = application.pascalizedBaseName;
        application.mainProjectDir = `${application.pascalizedBaseName}/`;

        application.temporaryDir = 'temp/';
        application.clientRootDir = `src/${application.mainProjectDir}ClientApp/`;
        application.clientAppRootDir = `src/${application.mainProjectDir}ClientApp/`;
        application.clientSrcDir = `src/${application.mainProjectDir}ClientApp/src/`;
        application.clientTestDir = `src/${application.mainProjectDir}ClientApp/test/`;
        application.clientDistDir = `src/${application.mainProjectDir}ClientApp/dist/`;
        application.backendType = '.Net';

        application.jhipsterDotnetVersion = undefined;
      },
    });
  }

  get [BaseApplicationGenerator.PREPARING]() {
    return this.asPreparingTaskGroup({
      async preparingTemplateTask({ application }) {
        application.withAdminUi = false;
        application.serverPortSecured = parseInt(application.serverPort, 10) + 1;
        application.dockerServicesDir = 'docker/';

        application.camelizedBaseName = this._.camelCase(application.baseName);
        application.dasherizedBaseName = this._.kebabCase(application.baseName);
        application.lowercaseBaseName = application.baseName.toLowerCase();
        application.humanizedBaseName = this._.startCase(application.baseName);
        application.mainClientDir = `${application.mainProjectDir}ClientApp/`;
        application.mainClientAppDir = `${application.mainProjectDir}ClientApp/src/`;
        application.relativeMainClientDir = 'ClientApp/';
        application.relativeMainAppDir = `${application.relativeMainClientDir}src/`;
        application.relativeMainTestDir = `${application.relativeMainClientDir}test/`;
        application.testProjectDir = `${application.pascalizedBaseName}${PROJECT_TEST_SUFFIX}/`;
        application.clientTestProject = `${application.mainClientDir}test/`;
        application.kebabCasedBaseName = this._.kebabCase(application.baseName);
        // application.jhipsterDotnetVersion = packagejs.version;
        application.modelSuffix = 'Model';
        application.backendName = '.Net';

        application.primaryKeyType = application.databaseType === 'mongodb' ? 'string' : 'long';

        if (application.clientFramework === BLAZOR) {
          application.mainClientDir = `client/${application.pascalizedBaseName}.Client/`;
          application.sharedClientDir = `client/${application.pascalizedBaseName}.Client.Shared/`;
          application.clientTestProject = `${application.pascalizedBaseName}.Client${PROJECT_TEST_SUFFIX}/`;
        }
        if (application.clientFramework === XAMARIN) {
          application.mainClientDir = `client/${application.pascalizedBaseName}.Client.Xamarin.Core/`;
          application.sharedClientDir = `client/${application.pascalizedBaseName}.Client.Xamarin.Shared/`;
          application.androidClientDir = `client/${application.pascalizedBaseName}.Client.Xamarin.Android/`;
          application.iOSClientDir = `client/${application.pascalizedBaseName}.Client.Xamarin.iOS/`;
          application.clientTestProject = `${application.pascalizedBaseName}.Client.Xamarin${PROJECT_TEST_SUFFIX}/`;
        }
      },
    });
  }

  get [BaseApplicationGenerator.PREPARING_EACH_ENTITY]() {
    return this.asPreparingEachEntityTaskGroup({
      async preparingTemplateTask({ application, entity }) {
        entity.primaryKeyType = entity.databaseType === 'mongodb' ? 'string' : 'long';

        entity.dotnetEntityModel = `${entity.entityClass}${application.modelSuffix}`;
        entity.pascalizedEntityClass = toPascalCase(entity.entityClass);
        entity.pascalizedEntityClassPlural = toPascalCase(entity.entityClassPlural);
        entity.snakeCasedEntityClass = this._.snakeCase(entity.entityClass);
        entity.snakeCasedEntityClassPlural = this._.snakeCase(entity.entityClassPlural);
        entity.camelCasedEntityClass = this._.camelCase(entity.entityClass);
        entity.camelCasedEntityClassPlural = this._.camelCase(entity.entityClassPlural);
        entity.kebabCasedEntityClass = this._.kebabCase(entity.entityClass);
        entity.kebabCasedEntityClassPlural = this._.kebabCase(entity.entityClassPlural);
        entity.lowerCasedEntityClass = this._.toLower(entity.entityClass);
        entity.lowerCasedEntityClassPlural = this._.toLower(entity.entityClassPlural);
        entity.entityClassHasManyToMany = false;
        entity.entities = this.getExistingEntities();

        // Embed functions to use in EJS templates
        entity.toPascalCase = toPascalCase;
        entity.pluralize = pluralize;
        entity._ = this._;
        entity.equivalentCSharpType = utilsNet.equivalentCSharpType;
        entity.asModel = utilsNet.asModel;

        for (const relationship of entity.relationships ?? []) {
          if (
            !relationship.otherRelationship &&
            entity.databaseType !== 'mongodb' &&
            (relationship.relationshipType === 'many-to-many' ||
              relationship.relationshipType === 'one-to-many' ||
              relationship.relationshipType === 'one-to-one')
          ) {
            // TODO remove this condition
            if (relationship.relationshipType !== 'one-to-one') {
              relationship.otherRelationship = addOtherRelationship(entity, relationship.otherEntity, relationship);
            }
          }
        }
      },
    });
  }

  get [BaseApplicationGenerator.PREPARING_EACH_ENTITY_FIELD]() {
    return this.asPreparingEachEntityFieldTaskGroup({
      async preparingTemplateTask({ field }) {
        field.fieldNamePascalized = toPascalCase(field.fieldName);
        field.fieldNameCamelCased = this._.camelCase(field.fieldName);

        const fieldType = field.fieldType;

        field.fieldIsEnum = ![
          'String',
          'Integer',
          'Long',
          'Float',
          'Double',
          'BigDecimal',
          'LocalDate',
          'Instant',
          'ZonedDateTime',
          'Duration',
          'UUID',
          'Boolean',
          'byte[]',
          'ByteBuffer',
        ].includes(fieldType);

        /*
        if (field.fieldIsEnum === true) {
          entity.i18nToLoad.push(field.enumInstance);
        }
        */
      },
    });
  }

  get [BaseApplicationGenerator.PREPARING_EACH_ENTITY_RELATIONSHIP]() {
    return this.asPreparingEachEntityRelationshipTaskGroup({
      async preparingTemplateTask({ entity, relationship }) {
        relationship.relationshipNamePascalized = toPascalCase(relationship.relationshipName);
        relationship.relationshipNamePascalizedPlural = pluralize(relationship.relationshipNamePascalized);
        relationship.relationshipFieldNamePascalized = toPascalCase(relationship.relationshipFieldName);
        relationship.relationshipFieldNameLowerCased = this._.toLower(relationship.relationshipFieldName);
        relationship.relationshipFieldNamePascalizedPlural = pluralize(relationship.relationshipFieldNamePascalized);
        relationship.otherEntityNamePascalized = toPascalCase(relationship.otherEntityName);
        relationship.otherEntityNamePascalizedPlural = toPascalCase(relationship.otherEntityNamePlural);
        relationship.otherEntityNameCamelCased = this._.camelCase(relationship.otherEntityName);
        relationship.otherEntityNameLowerCased = this._.toLower(relationship.otherEntityName);
        relationship.otherEntityNameLowerCasedPlural = this._.toLower(relationship.otherEntityNamePlural);

        if (
          relationship.relationshipType === 'one-to-many' ||
          relationship.relationshipType === 'many-to-many' ||
          relationship.relationshipType === 'one-to-one' ||
          relationship.otherEntityName.toLowerCase() === 'user'
        ) {
          relationship.otherEntityRelationshipName = relationship.otherEntityRelationshipName ?? entity.entityInstance;
          relationship.otherEntityRelationshipNamePascalized = toPascalCase(relationship.otherEntityRelationshipName);
          relationship.otherEntityRelationshipFieldName = this._.lowerFirst(relationship.otherEntityRelationshipName);
          relationship.otherEntityRelationshipFieldNamePascalized = toPascalCase(relationship.otherEntityRelationshipFieldName);
          relationship.otherEntityRelationshipFieldNamePascalizedPlural = pluralize(
            relationship.otherEntityRelationshipFieldNamePascalized,
          );
        }

        if (relationship.relationshipType === 'many-to-many') {
          if (relationship.ownerSide) {
            relationship.otherEntityRelationshipNamePascalizedPlural = pluralize(relationship.otherEntityRelationshipNamePascalized);
            relationship.joinEntityName = relationship.otherEntityRelationshipName + this._.upperFirst(relationship.relationshipName);
            relationship.joinEntityNamePascalized =
              relationship.otherEntityRelationshipNamePascalized + relationship.relationshipNamePascalized;
          } else {
            relationship.joinEntityName = relationship.relationshipName + this._.upperFirst(relationship.otherEntityRelationshipName);
            relationship.joinEntityNamePascalized =
              relationship.relationshipNamePascalized + relationship.otherEntityRelationshipNamePascalized;
          }
          relationship.joinEntityNameSnakeCased = this._.snakeCase(relationship.joinEntityName);
          relationship.joinEntityNameCamelCased = this._.camelCase(relationship.joinEntityName);
          relationship.joinEntityFieldNamePascalizedPlural = pluralize(relationship.joinEntityNamePascalized);
          entity.entityClassHasManyToMany = true;
        }

        relationship.joinEntityGenerated = false;
      },
    });
  }
}
