/**
 * Copyright 2019-2025 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import chalk from 'chalk';
import _ from 'lodash';
import { reservedKeywords } from 'generator-jhipster/jdl';

const getFieldNameUndercored = fields =>
  ['id'].concat(
    fields.map(field => {
      return _.snakeCase(field.fieldName);
    }),
  );
export default {
  askForUpdate,
  askForFields,
  askForFieldsToRemove,
  askForRelationships,
  askForRelationsToRemove,
  askForTableName,
  askForDTO,
  askForService,
  // askForFiltering,
  askForPagination,
};

async function askForUpdate() {
  const context = this.entityData;
  // ask only if running an existing entity without arg option --force or --regenerate
  const isForce = this.options.force || context.regenerate;
  context.updateEntity = 'regenerate'; // default if skipping questions by --force
  if (isForce || !context.useConfigurationFile) {
    return;
  }
  const prompts = [
    {
      type: 'list',
      name: 'updateEntity',
      message:
        'Do you want to update the entity? This will replace the existing files for this entity, all your custom code will be overwritten',
      choices: [
        {
          value: 'regenerate',
          name: 'Yes, re generate the entity',
        },
        {
          value: 'add',
          name: 'Yes, add more fields and relationships',
        },
        {
          value: 'remove',
          name: 'Yes, remove fields and relationships',
        },
        {
          value: 'none',
          name: 'No, exit',
        },
      ],
      default: 0,
    },
  ];
  await this.prompt(prompts).then(props => {
    context.updateEntity = props.updateEntity;
    if (context.updateEntity === 'none') {
      this.env.error(chalk.green('Aborting entity update, no changes were made.'));
    }
  });
}

async function askForFields() {
  const context = this.entityData;
  // don't prompt if data is imported from a file
  if (context.useConfigurationFile && context.updateEntity !== 'add') {
    return;
  }

  if (context.updateEntity === 'add') {
    logFieldsAndRelationships.call(this);
  }

  await askForField.call(this);
}

function askForFieldsToRemove() {
  const context = this.entityData;
  // prompt only if data is imported from a file
  if (!context.useConfigurationFile || context.updateEntity !== 'remove' || this.entityConfig.fields.length === 0) {
    return undefined;
  }

  const prompts = [
    {
      type: 'checkbox',
      name: 'fieldsToRemove',
      message: 'Please choose the fields you want to remove',
      choices: () =>
        this.entityConfig.fields.map(field => {
          return { name: field.fieldName, value: field.fieldName };
        }),
    },
    {
      when: response => response.fieldsToRemove.length !== 0,
      type: 'confirm',
      name: 'confirmRemove',
      message: 'Are you sure to remove these fields?',
      default: true,
    },
  ];
  return this.prompt(prompts).then(props => {
    if (props.confirmRemove) {
      this.log(chalk.red(`\nRemoving fields: ${props.fieldsToRemove}\n`));
      const fields = this.entityConfig.fields;
      for (let i = fields.length - 1; i >= 0; i -= 1) {
        const field = this.entityConfig.fields[i];
        if (props.fieldsToRemove.filter(val => val === field.fieldName).length > 0) {
          fields.splice(i, 1);
        }
      }
      this.entityConfig.fields = fields;
    }
  });
}

async function askForRelationships() {
  const context = this.entityData;
  // don't prompt if data is imported from a file
  if (context.useConfigurationFile && context.updateEntity !== 'add') {
    return;
  }
  /* if (context.databaseType === 'cassandra') {
        return;
    } */

  await askForRelationship.call(this);
}

function askForRelationsToRemove() {
  const context = this.entityData;
  // prompt only if data is imported from a file
  if (!context.useConfigurationFile || context.updateEntity !== 'remove' || this.entityConfig.relationships.length === 0) {
    return undefined;
  }

  const prompts = [
    {
      type: 'checkbox',
      name: 'relsToRemove',
      message: 'Please choose the relationships you want to remove',
      choices: () =>
        this.entityConfig.relationships.map(rel => {
          return {
            name: `${rel.relationshipName}:${rel.relationshipType}`,
            value: `${rel.relationshipName}:${rel.relationshipType}`,
          };
        }),
    },
    {
      when: response => response.relsToRemove.length !== 0,
      type: 'confirm',
      name: 'confirmRemove',
      message: 'Are you sure to remove these relationships?',
      default: true,
    },
  ];
  return this.prompt(prompts).then(props => {
    if (props.confirmRemove) {
      this.log(chalk.red(`\nRemoving relationships: ${props.relsToRemove}\n`));
      const relationships = this.entityConfig.relationships;
      for (let i = relationships.length - 1; i >= 0; i -= 1) {
        const rel = relationships[i];
        if (props.relsToRemove.filter(val => val === `${rel.relationshipName}:${rel.relationshipType}`).length > 0) {
          relationships.splice(i, 1);
        }
      }
      this.entityConfig.relationships = relationships;
    }
  });
}

async function askForTableName() {
  const context = this.entityData;
  // don't prompt if there are no relationships
  const entityTableName = context.entityTableName;
  // const prodDatabaseType = context.prodDatabaseType;
  const skipCheckLengthOfIdentifier = context.skipCheckLengthOfIdentifier;
  if (
    skipCheckLengthOfIdentifier ||
    !this.entityConfig.relationships ||
    this.entityConfig.relationships.length === 0 ||
    entityTableName.length <= 30
    /* (prodDatabaseType === 'oracle' && entityTableName.length > 14) || */
  ) {
    return;
  }
  const prompts = [
    {
      type: 'input',
      name: 'entityTableName',
      message: 'The table name for this entity is too long to form constraint names. Please use a shorter table name',
      validate: input => {
        if (!/^([a-zA-Z0-9_]*)$/.test(input)) {
          return 'The table name cannot contain special characters';
        }
        if (input === '') {
          return 'The table name cannot be empty';
        }
        /* if (prodDatabaseType === 'oracle' && input.length > 14 && !skipCheckLengthOfIdentifier) {
                    return 'The table name is too long for Oracle, try a shorter name';
                } */
        if (input.length > 30 && !skipCheckLengthOfIdentifier) {
          return 'The table name is too long, try a shorter name';
        }
        return true;
      },
      default: entityTableName,
    },
  ];
  const props = await this.prompt(prompts);
  /* overwrite the table name for the entity using name obtained from the user */
  if (props.entityTableName !== context.entityTableName) {
    context.entityTableName = _.snakeCase(props.entityTableName).toLowerCase();
  }
}

/* function askForFiltering() {
    const context = this.entityData;
    // don't prompt if server is skipped, or the backend is not sql, or no service requested
    if (context.useConfigurationFile || context.skipServer || context.databaseType !== 'sql' || this.entityConfig.service === 'no') {
        return;
    }
    const done = this.async();
    const prompts = [
        {
            type: 'list',
            name: 'filtering',
            message: 'Do you want to add filtering?',
            choices: [
                {
                    value: 'no',
                    name: 'Not needed'
                },
                {
                    name: 'Dynamic filtering for the entities with JPA Static metamodel',
                    value: 'jpaMetamodel'
                }
            ],
            default: 0
        }
    ];
    this.prompt(prompts).then(props => {
        context.jpaMetamodelFiltering = props.filtering === 'jpaMetamodel';
        done();
    });
} */

async function askForDTO() {
  const context = this.entityData;
  // don't prompt if data is imported from a file or server is skipped or if no service layer
  if (context.useConfigurationFile || context.skipServer || this.entityConfig.service === 'no') {
    context.dto = context.dto || 'no';
    return;
  }
  const prompts = [
    {
      type: 'list',
      name: 'dto',
      message: 'Do you want to use a Data Transfer Object (DTO)?',
      choices: [
        {
          value: 'no',
          name: 'No, use the entity directly',
        },
        {
          value: 'mapstruct',
          name: 'Yes, generate a DTO with AutoMapper',
        },
      ],
      default: 0,
    },
  ];
  const props = await this.prompt(prompts);
  this.entityConfig.dto = props.dto;
}

async function askForService() {
  const context = this.entityData;
  // don't prompt if data is imported from a file or server is skipped
  if (context.cqrsEnabled) {
    context.service = 'serviceImpl';
    return;
  }
  if (context.useConfigurationFile || context.skipServer) {
    return;
  }

  const prompts = [
    {
      type: 'list',
      name: 'service',
      message: 'Do you want to use separate service class for your business logic?',
      choices: [
        {
          value: 'no',
          name: 'No, the REST controller should use the repository directly',
        },
        {
          value: 'serviceImpl',
          name: 'Yes, generate a separate service interface and implementation',
        },
      ],
      default: 0,
    },
  ];
  const props = await this.prompt(prompts);
  this.entityConfig.service = props.service;
}

async function askForPagination() {
  const context = this.entityData;
  // don't prompt if data are imported from a file
  if (context.useConfigurationFile) {
    return;
  }
  /* if (context.databaseType === 'cassandra') {
        return;
    } */
  const prompts = [
    {
      type: 'list',
      name: 'pagination',
      message: 'Do you want pagination on your entity?',
      choices: [
        /* {
                    value: 'no',
                    name: 'No'
                }, */
        {
          value: 'pagination',
          name: 'Yes, with pagination links',
        },
        {
          value: 'infinite-scroll',
          name: 'Yes, with infinite scroll',
        },
      ],
      default: 0,
    },
  ];
  const props = await this.prompt(prompts);
  this.entityConfig.pagination = props.pagination;
  this.log(chalk.green('\nEverything is configured, generating the entity...\n'));
}

/**
 * ask question for a field creation
 */
async function askForField() {
  const context = this.entityData;
  this.log(chalk.green(`\nGenerating field #${this.entityConfig.fields.length + 1}\n`));
  // const skipServer = context.skipServer;
  const prodDatabaseType = context.prodDatabaseType;
  // const databaseType = context.databaseType;
  const clientFramework = context.clientFramework;
  const skipCheckLengthOfIdentifier = context.skipCheckLengthOfIdentifier;
  const prompts = [
    {
      type: 'confirm',
      name: 'fieldAdd',
      message: 'Do you want to add a field to your entity?',
      default: true,
    },
    {
      when: response => response.fieldAdd === true,
      type: 'input',
      name: 'fieldName',
      validate: input => {
        if (!/^([a-zA-Z0-9_]*)$/.test(input)) {
          return 'Your field name cannot contain special characters';
        }
        if (input === '') {
          return 'Your field name cannot be empty';
        }
        if (input.charAt(0) === input.charAt(0).toUpperCase()) {
          return 'Your field name cannot start with an upper case letter';
        }
        if (input === 'id' || getFieldNameUndercored(this.entityConfig.fields).includes(_.snakeCase(input))) {
          return 'Your field name cannot use an already existing field name';
        }
        if ((clientFramework === undefined || clientFramework === 'angularX') && reservedKeywords.isReservedFieldName(input, 'angularX')) {
          return 'Your field name cannot contain a Java or Angular reserved keyword';
        }
        if ((clientFramework !== undefined || clientFramework === 'react') && reservedKeywords.isReservedFieldName(input, 'react')) {
          return 'Your field name cannot contain a Java or React reserved keyword';
        }
        if (prodDatabaseType === 'oracle' && input.length > 30 && !skipCheckLengthOfIdentifier) {
          return 'The field name cannot be of more than 30 characters';
        }
        if (input.toLowerCase() === context.name.toLowerCase()) {
          return 'Your field name cannot have the same name as the entity';
        }
        return true;
      },
      message: 'What is the name of your field?',
    },
    {
      when: response => response.fieldAdd === true,
      type: 'list',
      name: 'fieldType',
      message: 'What is the type of your field?',
      choices: [
        {
          value: 'String',
          name: 'string',
        },
        {
          value: 'Integer',
          name: 'int',
        },
        {
          value: 'Long',
          name: 'long',
        },
        {
          value: 'Float',
          name: 'float',
        },
        {
          value: 'Double',
          name: 'double',
        },
        {
          value: 'BigDecimal',
          name: 'decimal',
        },
        {
          value: 'LocalDate',
          name: 'DateTime',
        },
        /* {
                    value: 'Instant',
                    name: 'Instant'
                },
                {
                    value: 'ZonedDateTime',
                    name: 'ZonedDateTime'
                },
                {
                    value: 'Duration',
                    name: 'Duration'
                }, */
        {
          value: 'Boolean',
          name: 'bool',
        },
        {
          value: 'enum',
          name: 'Enumeration',
        } /* ,
                {
                    value: 'byte[]',
                    name: '[BETA] Blob'
                } */,
      ],
      default: 0,
    },
    {
      when: response => {
        if (response.fieldType === 'enum') {
          response.fieldIsEnum = true;
          return true;
        }
        response.fieldIsEnum = false;
        return false;
      },
      type: 'input',
      name: 'enumType',
      validate: input => {
        if (input === '') {
          return 'Your class name cannot be empty.';
        }
        if (reservedKeywords.isReserved(input, 'JAVA')) {
          return 'Your enum name cannot contain a Java reserved keyword';
        }
        if (!/^[A-Za-z0-9_]*$/.test(input)) {
          return 'Your enum name cannot contain special characters (allowed characters: A-Z, a-z, 0-9 and _)';
        }
        if (context.enums.includes(input)) {
          context.existingEnum = true;
        } else {
          context.enums.push(input);
        }
        return true;
      },
      message: 'What is the class name of your enumeration?',
    },
    {
      when: response => response.fieldIsEnum,
      type: 'input',
      name: 'fieldValues',
      validate: input => {
        if (input === '' && context.existingEnum) {
          context.existingEnum = false;
          return true;
        }
        if (input === '') {
          return 'You must specify values for your enumeration';
        }
        // Commas allowed so that user can input a list of values split by commas.
        if (!/^[A-Za-z0-9_,]+$/.test(input)) {
          return 'Enum values cannot contain special characters (allowed characters: A-Z, a-z, 0-9 and _)';
        }
        const enums = input.replace(/\s/g, '').split(',');
        if (_.uniq(enums).length !== enums.length) {
          return `Enum values cannot contain duplicates (typed values: ${input})`;
        }
        for (let i = 0; i < enums.length; i++) {
          if (/^[0-9].*/.test(enums[i])) {
            return `Enum value "${enums[i]}" cannot start with a number`;
          }
          if (enums[i] === '') {
            return 'Enum value cannot be empty (did you accidentally type "," twice in a row?)';
          }
        }

        return true;
      },
      message: _answers => {
        if (!context.existingEnum) {
          return 'What are the values of your enumeration (separated by comma, no spaces)?';
        }
        return 'What are the new values of your enumeration (separated by comma, no spaces)?\nThe new values will replace the old ones.\nNothing will be done if there are no new values.';
      },
    } /* ,
        {
            when: response => response.fieldAdd === true && databaseType === 'cassandra',
            type: 'list',
            name: 'fieldType',
            message: 'What is the type of your field?',
            choices: [
                {
                    value: 'UUID',
                    name: 'UUID'
                },
                {
                    value: 'String',
                    name: 'String'
                },
                {
                    value: 'Integer',
                    name: 'Integer'
                },
                {
                    value: 'Long',
                    name: 'Long'
                },
                {
                    value: 'Float',
                    name: 'Float'
                },
                {
                    value: 'Double',
                    name: 'Double'
                },
                {
                    value: 'BigDecimal',
                    name: 'BigDecimal'
                },
                {
                    value: 'LocalDate',
                    name: 'LocalDate (Warning: only compatible with Cassandra v3)'
                },
                {
                    value: 'Instant',
                    name: 'Instant'
                },
                {
                    value: 'ZonedDateTime',
                    name: 'ZonedDateTime'
                },
                {
                    value: 'Boolean',
                    name: 'Boolean'
                },
                {
                    value: 'ByteBuffer',
                    name: '[BETA] blob'
                }
            ],
            default: 0
        },
        {
            when: response => response.fieldAdd === true && response.fieldType === 'byte[]',
            type: 'list',
            name: 'fieldTypeBlobContent',
            message: 'What is the content of the Blob field?',
            choices: [
                {
                    value: 'image',
                    name: 'An image'
                },
                {
                    value: 'any',
                    name: 'A binary file'
                },
                {
                    value: 'text',
                    name: 'A CLOB (Text field)'
                }
            ],
            default: 0
        },
        {
            when: response => response.fieldAdd === true && response.fieldType === 'ByteBuffer',
            type: 'list',
            name: 'fieldTypeBlobContent',
            message: 'What is the content of the Blob field?',
            choices: [
                {
                    value: 'image',
                    name: 'An image'
                },
                {
                    value: 'any',
                    name: 'A binary file'
                }
            ],
            default: 0
        } */,
    {
      when: response => response.fieldAdd === true /* && response.fieldType !== 'ByteBuffer' */,
      type: 'confirm',
      name: 'fieldValidate',
      message: 'Do you want to add validation rules to your field?',
      default: false,
    },
    {
      when: response => response.fieldAdd === true && response.fieldValidate === true,
      type: 'checkbox',
      name: 'fieldValidateRules',
      message: 'Which validation rules do you want to add?',
      choices: _response => {
        // Default rules applicable for fieldType 'LocalDate', 'Instant',
        // 'ZonedDateTime', 'Duration', 'UUID', 'Boolean', 'ByteBuffer' and 'Enum'
        const opts = [
          {
            name: 'Required',
            value: 'required',
          } /* ,
                    {
                        name: 'Unique',
                        value: 'unique'
                    } */,
        ];
        /* if (response.fieldType === 'String' || response.fieldTypeBlobContent === 'text') {
                    opts.push(
                        {
                            name: 'Minimum length',
                            value: 'minlength'
                        },
                        {
                            name: 'Maximum length',
                            value: 'maxlength'
                        },
                        {
                            name: 'Regular expression pattern',
                            value: 'pattern'
                        }
                    );
                } else if (['Integer', 'Long', 'Float', 'Double', 'BigDecimal'].includes(response.fieldType)) {
                    opts.push(
                        {
                            name: 'Minimum',
                            value: 'min'
                        },
                        {
                            name: 'Maximum',
                            value: 'max'
                        }
                    );
                } */
        return opts;
      },
      default: 0,
    } /* ,
        {
            when: response =>
                response.fieldAdd === true && response.fieldValidate === true && response.fieldValidateRules.includes('minlength'),
            type: 'input',
            name: 'fieldValidateRulesMinlength',
            validate: input => (this.isNumber(input) ? true : 'Minimum length must be a positive number'),
            message: 'What is the minimum length of your field?',
            default: 0
        },
        {
            when: response =>
                response.fieldAdd === true && response.fieldValidate === true && response.fieldValidateRules.includes('maxlength'),
            type: 'input',
            name: 'fieldValidateRulesMaxlength',
            validate: input => (this.isNumber(input) ? true : 'Maximum length must be a positive number'),
            message: 'What is the maximum length of your field?',
            default: 20
        },
        {
            when: response => response.fieldAdd === true && response.fieldValidate === true && response.fieldValidateRules.includes('min'),
            type: 'input',
            name: 'fieldValidateRulesMin',
            message: 'What is the minimum of your field?',
            validate: (input, response) => {
                if (['Float', 'Double', 'BigDecimal'].includes(response.fieldType)) {
                    return this.isSignedDecimalNumber(input) ? true : 'Minimum must be a decimal number';
                }
                return this.isSignedNumber(input) ? true : 'Minimum must be a number';
            },
            default: 0
        },
        {
            when: response => response.fieldAdd === true && response.fieldValidate === true && response.fieldValidateRules.includes('max'),
            type: 'input',
            name: 'fieldValidateRulesMax',
            message: 'What is the maximum of your field?',
            validate: (input, response) => {
                if (['Float', 'Double', 'BigDecimal'].includes(response.fieldType)) {
                    return this.isSignedDecimalNumber(input) ? true : 'Maximum must be a decimal number';
                }
                return this.isSignedNumber(input) ? true : 'Maximum must be a number';
            },
            default: 100
        },
        {
            when: response =>
                response.fieldAdd === true &&
                response.fieldValidate === true &&
                response.fieldValidateRules.includes('minbytes') &&
                response.fieldType === 'byte[]' &&
                response.fieldTypeBlobContent !== 'text',
            type: 'input',
            name: 'fieldValidateRulesMinbytes',
            message: 'What is the minimum byte size of your field?',
            validate: input => (this.isNumber(input) ? true : 'Minimum byte size must be a positive number'),
            default: 0
        },
        {
            when: response =>
                response.fieldAdd === true &&
                response.fieldValidate === true &&
                response.fieldValidateRules.includes('maxbytes') &&
                response.fieldType === 'byte[]' &&
                response.fieldTypeBlobContent !== 'text',
            type: 'input',
            name: 'fieldValidateRulesMaxbytes',
            message: 'What is the maximum byte size of your field?',
            validate: input => (this.isNumber(input) ? true : 'Maximum byte size must be a positive number'),
            default: 5000000
        },
        {
            when: response =>
                response.fieldAdd === true && response.fieldValidate === true && response.fieldValidateRules.includes('pattern'),
            type: 'input',
            name: 'fieldValidateRulesPattern',
            message: 'What is the regular expression pattern you want to apply on your field?',
            default: '^[a-zA-Z0-9]*$'
        } */,
  ];
  const props = await this.prompt(prompts);
  if (props.fieldAdd) {
    if (props.fieldIsEnum) {
      props.fieldType = _.upperFirst(props.fieldType);
      props.fieldValues = props.fieldValues.toUpperCase();
    }

    const field = {
      fieldName: props.fieldName,
      fieldType: props.enumType || props.fieldType,
      /* fieldTypeBlobContent: props.fieldTypeBlobContent, */
      fieldValues: props.fieldValues,
      fieldValidateRules: props.fieldValidateRules /* ,
                fieldValidateRulesMinlength: props.fieldValidateRulesMinlength,
                fieldValidateRulesMaxlength: props.fieldValidateRulesMaxlength,
                fieldValidateRulesPattern: props.fieldValidateRulesPattern,
                fieldValidateRulesMin: props.fieldValidateRulesMin,
                fieldValidateRulesMax: props.fieldValidateRulesMax,
                fieldValidateRulesMinbytes: props.fieldValidateRulesMinbytes,
                fieldValidateRulesMaxbytes: props.fieldValidateRulesMaxbytes */,
    };

    this.entityConfig.fields = this.entityConfig.fields.concat(field);
  }
  logFieldsAndRelationships.call(this);
  if (props.fieldAdd) {
    await askForField.call(this);
  }
}

/**
 * ask question for a relationship creation
 */
async function askForRelationship() {
  const context = this.entityData;
  const name = context.name;
  this.log(chalk.green('\nGenerating relationships to other entities\n'));
  const prompts = [
    {
      type: 'confirm',
      name: 'relationshipAdd',
      message: 'Do you want to add a relationship to another entity?',
      default: true,
    },
    {
      when: response => response.relationshipAdd === true,
      type: 'input',
      name: 'otherEntityName',
      validate: input => {
        if (!/^([a-zA-Z0-9_]*)$/.test(input)) {
          return 'Your other entity name cannot contain special characters';
        }
        if (input === '') {
          return 'Your other entity name cannot be empty';
        }
        if (reservedKeywords.isReserved(input, 'JAVA')) {
          return 'Your other entity name cannot contain a Java reserved keyword';
        }
        /* if (input.toLowerCase() === 'user' && context.applicationType === 'microservice') {
                    return "Your entity cannot have a relationship with User because it's a gateway entity";
                } */
        return true;
      },
      message: 'What is the name of the other entity?',
    },
    {
      when: response => response.relationshipAdd === true,
      type: 'input',
      name: 'relationshipName',
      validate: input => {
        if (!/^([a-zA-Z0-9_]*)$/.test(input)) {
          return 'Your relationship cannot contain special characters';
        }
        if (input === '') {
          return 'Your relationship cannot be empty';
        }
        if (input.charAt(0) === input.charAt(0).toUpperCase()) {
          return 'Your relationship cannot start with an upper case letter';
        }
        if (input === 'id' || getFieldNameUndercored(this.entityConfig.fields).includes(_.snakeCase(input))) {
          return 'Your relationship cannot use an already existing field name';
        }
        if (reservedKeywords.isReserved(input, 'JAVA')) {
          return 'Your relationship cannot contain a Java reserved keyword';
        }
        return true;
      },
      message: 'What is the name of the relationship?',
      default: response => _.lowerFirst(response.otherEntityName),
    },
    {
      when: response => response.relationshipAdd === true,
      type: 'list',
      name: 'relationshipType',
      message: 'What is the type of the relationship?',
      choices: response => {
        const opts = [
          {
            value: 'many-to-one',
            name: 'many-to-one',
          },
          {
            value: 'many-to-many',
            name: 'many-to-many',
          },
          {
            value: 'one-to-one',
            name: 'one-to-one',
          },
        ];
        if (response.otherEntityName.toLowerCase() !== 'user') {
          opts.unshift({
            value: 'one-to-many',
            name: 'one-to-many',
          });
        }
        return opts;
      },
      default: 0,
    },
    {
      when: response =>
        response.relationshipAdd === true &&
        response.otherEntityName.toLowerCase() !== 'user' &&
        (response.relationshipType === 'many-to-many' || response.relationshipType === 'one-to-one'),
      type: 'confirm',
      name: 'ownerSide',
      message: 'Is this entity the owner of the relationship?',
      default: false,
    } /* ,
        {
            when: response =>
                context.databaseType === 'sql' &&
                response.relationshipAdd === true &&
                response.relationshipType === 'one-to-one' &&
                (response.ownerSide === true || response.otherEntityName.toLowerCase() === 'user'),
            type: 'confirm',
            name: 'useJPADerivedIdentifier',
            message: 'Do you want to use JPA Derived Identifier - @MapsId?',
            default: false
        } */,
    {
      when: response =>
        response.relationshipAdd === true &&
        (response.relationshipType === 'one-to-many' ||
          ((response.relationshipType === 'many-to-many' || response.relationshipType === 'one-to-one') &&
            response.otherEntityName.toLowerCase() !== 'user')),
      type: 'input',
      name: 'otherEntityRelationshipName',
      message: 'What is the name of this relationship in the other entity?',
      default: _response => _.lowerFirst(name),
    },
    {
      when: response =>
        response.relationshipAdd === true &&
        (response.relationshipType === 'many-to-one' ||
          (response.relationshipType === 'many-to-many' && response.ownerSide === true) ||
          (response.relationshipType === 'one-to-one' && response.ownerSide === true)),
      type: 'input',
      name: 'otherEntityField',
      message: response =>
        `When you display this relationship on client-side, which field from '${response.otherEntityName}' do you want to use? This field will be displayed as a String, so it cannot be a Blob`,
      default: 'id',
    } /* ,
        {
            when: response =>
                response.relationshipAdd === true &&
                response.otherEntityName.toLowerCase() !== context.name.toLowerCase() &&
                (response.relationshipType === 'many-to-one' ||
                    (response.relationshipType === 'many-to-many' &&
                        (response.ownerSide === true || response.otherEntityName.toLowerCase() === 'user')) ||
                    (response.relationshipType === 'one-to-one' &&
                        (response.ownerSide === true || response.otherEntityName.toLowerCase() === 'user'))),
            type: 'confirm',
            name: 'relationshipValidate',
            message: 'Do you want to add any validation rules to this relationship?',
            default: false
        },
        {
            when: response => response.relationshipValidate === true,
            type: 'checkbox',
            name: 'relationshipValidateRules',
            message: 'Which validation rules do you want to add?',
            choices: [
                {
                    name: 'Required',
                    value: 'required'
                }
            ],
            default: 0
        } */,
  ];
  const props = await this.prompt(prompts);
  if (props.relationshipAdd) {
    const relationship = {
      relationshipName: props.relationshipName,
      otherEntityName: _.lowerFirst(props.otherEntityName),
      relationshipType: props.relationshipType,
      // relationshipValidateRules: props.relationshipValidateRules,
      otherEntityField: props.otherEntityField,
      ownerSide: props.ownerSide,
      // useJPADerivedIdentifier: props.useJPADerivedIdentifier,
      otherEntityRelationshipName: props.otherEntityRelationshipName,
    };

    if (props.otherEntityName.toLowerCase() === 'user') {
      relationship.ownerSide = true;
      relationship.otherEntityField = 'login';
      relationship.otherEntityRelationshipName = _.lowerFirst(name);
    }
    this.entityConfig.relationships = this.entityConfig.relationships.concat(relationship);
  }
  logFieldsAndRelationships.call(this);
  if (props.relationshipAdd) {
    await askForRelationship.call(this);
  } else {
    this.log('\n');
  }
}

/**
 * Show the entity and it's fields and relationships in console
 */
function logFieldsAndRelationships() {
  const context = this.entityData;
  if (this.entityConfig.fields.length > 0 || this.entityConfig.relationships.length > 0) {
    this.log(chalk.red(chalk.white('\n================= ') + context.name + chalk.white(' =================')));
  }
  if (this.entityConfig.fields.length > 0) {
    this.log(chalk.white('Fields'));
    this.entityConfig.fields.forEach(field => {
      const validationDetails = [];
      const fieldValidate = _.isArray(field.fieldValidateRules) && field.fieldValidateRules.length >= 1;
      if (fieldValidate === true) {
        if (field.fieldValidateRules.includes('required')) {
          validationDetails.push('required');
        }
        /* if (field.fieldValidateRules.includes('unique')) {
                    validationDetails.push('unique');
                }
                if (field.fieldValidateRules.includes('minlength')) {
                    validationDetails.push(`minlength='${field.fieldValidateRulesMinlength}'`);
                }
                if (field.fieldValidateRules.includes('maxlength')) {
                    validationDetails.push(`maxlength='${field.fieldValidateRulesMaxlength}'`);
                }
                if (field.fieldValidateRules.includes('pattern')) {
                    validationDetails.push(`pattern='${field.fieldValidateRulesPattern}'`);
                }
                if (field.fieldValidateRules.includes('min')) {
                    validationDetails.push(`min='${field.fieldValidateRulesMin}'`);
                }
                if (field.fieldValidateRules.includes('max')) {
                    validationDetails.push(`max='${field.fieldValidateRulesMax}'`);
                }
                if (field.fieldValidateRules.includes('minbytes')) {
                    validationDetails.push(`minbytes='${field.fieldValidateRulesMinbytes}'`);
                }
                if (field.fieldValidateRules.includes('maxbytes')) {
                    validationDetails.push(`maxbytes='${field.fieldValidateRulesMaxbytes}'`);
                } */
      }
      this.log(
        chalk.red(field.fieldName) +
          chalk.white(` (${field.fieldType}${field.fieldTypeBlobContent ? ` ${field.fieldTypeBlobContent}` : ''}) `) +
          chalk.cyan(validationDetails.join(' ')),
      );
    });
    this.log();
  }
  if (this.entityConfig.relationships.length > 0) {
    this.log(chalk.white('Relationships'));
    this.entityConfig.relationships.forEach(relationship => {
      // const validationDetails = [];
      /* if (relationship.relationshipValidateRules && relationship.relationshipValidateRules.includes('required')) {
                validationDetails.push('required');
            } */
      this.log(
        `${chalk.red(relationship.relationshipName)} ${chalk.white(`(${_.upperFirst(relationship.otherEntityName)})`)} ${chalk.cyan(
          relationship.relationshipType,
        )}`, // ${chalk.cyan(validationDetails.join(' '))}`
      );
    });
    this.log();
  }
}
