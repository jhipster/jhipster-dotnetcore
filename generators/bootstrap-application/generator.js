import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { addOtherRelationship } from 'generator-jhipster/generators/base-application/support';
import { getDatabaseData } from 'generator-jhipster/generators/spring-data-relational/support';
import toPascalCase from 'to-pascal-case';
import pluralize from 'pluralize';
import { BLAZOR, PROJECT_TEST_SUFFIX, SERVER_SRC_DIR, SERVER_TEST_DIR, XAMARIN } from '../generator-dotnetcore-constants.js';
import { equivalentCSharpType } from './support/utils.js';

const packagejs = JSON.parse((await readFile(join(dirname(fileURLToPath(import.meta.url)), '../../package.json'))).toString()).version;
export default class extends BaseApplicationGenerator {
  constructor(args, options, features) {
    super(args, options, { ...features, sbsBlueprint: true });
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      async checks() {
        if (!this.skipChecks) {
          try {
            await this.spawnCommand('dotnet --info');
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
        this.jhipsterConfig.withAdminUi = false;
        // Paths needs adjusts for husky and lint-staged:
        // - prettier should be installed at root package.json.
        // - lint-staged paths needs adjusts.
        this.jhipsterConfig.skipCommitHook = true;
        this.jhipsterConfig.databaseType ??= 'sqllite';

        if (this.jhipsterConfig.dtoSuffix === undefined || this.jhipsterConfig.dtoSuffix === 'DTO') {
          this.jhipsterConfig.dtoSuffix = 'Dto';
        }
      },
    });
  }

  get [BaseApplicationGenerator.LOADING]() {
    return this.asLoadingTaskGroup({
      async loadingTemplateTask({ application, applicationDefaults }) {
        application.cqrsEnabled = this.jhipsterConfig.cqrsEnabled;
        application.namespace = this.jhipsterConfig.namespace;
        application.withTerraformAzureScripts = this.jhipsterConfig.withTerraformAzureScripts;
        if (['postgresql', 'mysql', 'mariadb', 'mssql', 'oracle'].includes(application.databaseType)) {
          application.prodDatabaseType = application.databaseType;
        }

        applicationDefaults({
          __override__: true,
          SERVER_SRC_DIR,
          SERVER_TEST_DIR,
          pascalizedBaseName: ({ baseName }) => toPascalCase(baseName),
          solutionName: ({ pascalizedBaseName }) => pascalizedBaseName,
          mainProjectDir: ({ pascalizedBaseName }) => `${pascalizedBaseName}/`,
          clientRootDir: ({ mainProjectDir }) => `src/${mainProjectDir}ClientApp/`,
          clientSrcDir: ({ mainProjectDir }) => `src/${mainProjectDir}ClientApp/src/`,
          clientTestDir: ({ mainProjectDir }) => `src/${mainProjectDir}ClientApp/test/`,
          backendType: () => '.Net',
          jhipsterDotnetVersion: this.useVersionPlaceholders ? 'JHIPSTER_DOTNET_VERSION' : packagejs.version,
        });
      },
    });
  }

  get [BaseApplicationGenerator.PREPARING]() {
    return this.asPreparingTaskGroup({
      async preparingTemplateTask({ application, applicationDefaults }) {
        applicationDefaults({
          __override__: true,
          clientDistDir: ({ mainProjectDir }) => `src/${mainProjectDir}ClientApp/dist/`,
          temporaryDir: 'tmp/',
          serverPortSecured: ({ serverPort }) => parseInt(serverPort, 10) + 1,
          dockerServicesDir: 'docker/',
          mainClientDir: ({ mainProjectDir }) => `${mainProjectDir}ClientApp/`,
          mainClientAppDir: ({ mainProjectDir }) => `${mainProjectDir}ClientApp/src/`,
          relativeMainClientDir: 'ClientApp/',
          relativeMainAppDir: ({ relativeMainClientDir }) => `${relativeMainClientDir}src/`,
          relativeMainTestDir: ({ relativeMainClientDir }) => `${relativeMainClientDir}test/`,
          testProjectDir: ({ pascalizedBaseName }) => `${pascalizedBaseName}${PROJECT_TEST_SUFFIX}/`,
          clientTestProject: ({ mainClientDir }) => `${mainClientDir}test/`,
          kebabCasedBaseName: ({ baseName }) => this._.kebabCase(baseName),
          modelSuffix: 'Model',
          backendName: '.Net',
          // What is this used for?
          primaryKeyType: ({ databaseType }) => (databaseType === 'mongodb' ? 'string' : 'long'),
        });

        application[`databaseType${this._.upperFirst(application.databaseType)}`] = true;
        if (['postgresql', 'mysql', 'mariadb', 'mssql', 'oracle'].includes(application.databaseType)) {
          application.databaseTypeSql = true;
          application[`prodDatabaseType${this._.upperFirst(application.databaseType)}`] = true;
          application.databaseData = getDatabaseData(application.databaseType);
        }

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
        // This assumes we aren't using value objects and every entity has a primary key
        const idField = entity.fields.filter(f => f.id)[0];

        entity.primaryKeyType = entity.databaseType === 'mongodb' ? 'string' : equivalentCSharpType(idField.fieldType);

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
        field.cSharpType = equivalentCSharpType(field.fieldType);
        field.fieldNamePascalized = toPascalCase(field.fieldName);
        field.fieldNameCamelCased = this._.camelCase(field.fieldName);

        const { fieldType } = field;

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
