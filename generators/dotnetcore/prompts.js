/**
 * Copyright 2019-2023 the original author or authors from the JHipster project.
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

const chalk = require('chalk');

function askForModuleName() {
    if (this.jhipsterConfig.baseName) return;

    this.askModuleName(this);
}

function askForServerSideOpts() {
    if (this.existingProject) return;
    const applicationType = this.jhipsterConfig.applicationType;
    const availableDb = [
        {
            value: 'sqllite',
            name: 'SQLite in-memory',
        },
        {
            value: 'mssql',
            name: 'Microsoft SQL Server',
        },
        {
            value: 'postgres',
            name: 'PostgreSQL',
        },
        {
            value: 'mysql',
            name: 'MySQL',
        },
        {
            value: 'oracle',
            name: 'Oracle',
        },
        {
            value: 'mongodb',
            name: 'MongoDB',
        },
    ];
    const defaultPort = applicationType === 'gateway' || applicationType === 'monolith' ? '5000' : '5004';
    const prompts = [
        {
            type: 'input',
            name: 'serverPort',
            validate: input => (/^([0-9]*)$/.test(input) ? true : 'This is not a valid port number.'),
            message:
                'On which port would like your server to run ? It should be unique to avoid port conflicts (choose http -> https=httpPort+1).',
            default: defaultPort,
        },
        {
            type: 'confirm',
            name: 'cqrsEnabled',
            message: 'Do you want to use the CQRS design pattern?',
            default: false,
        },
        /*
        Questions for separate DB
        {
            when: response => response.cqrsEnabled === true,
            type: 'confirm',
            name: 'separateDataBase',
            message: 'Do you want to use two separate databases for reading and writing?',
            default: false,
        },
        {
            when: response => response.cqrsEnabled === true && response.separateDataBase === true,
            type: 'list',
            name: 'database',
            message: 'Which database do you want to use for reading',
            choices: availableDb,
            default: 0,
        },
        {
            when: response => response.cqrsEnabled === true && response.separateDataBase === true,
            type: 'list',
            name: 'databaseTwo',
            message: 'Which database do you want to use for writing',
            choices: availableDb,
            default: 0,
        },
        */
        {
            // when: response => response.separateDataBase === false,
            type: 'list',
            name: 'database',
            message: 'Which database do you want to use',
            choices: availableDb,
            default: 0,
        },
        {
            when: response => applicationType === 'monolith' && response.database === 'mssql',
            type: 'confirm',
            name: 'withTerraformAzureScripts',
            message: `Would you like to generate ${chalk.yellow('*Terraform*')} script to deploy the application on Azure?`,
            default: false,
        },
        {
            when: response => applicationType === 'monolith' || ['gateway', 'microservice'].includes(applicationType),
            type: 'list',
            name: 'authenticationType',
            message: `Which ${chalk.yellow('*type*')} of authentication would you like to use?`,
            choices: response => {
                const opts = [
                    {
                        value: 'jwt',
                        name: 'JWT authentication (stateless, with a token)',
                    },
                    {
                        value: 'oauth2',
                        name: 'OAuth 2.0 / OIDC Authentication (stateful, works with Keycloak and Okta)',
                    },
                ];
                return opts;
            },
            default: 0,
        },
    ];

    const done = this.async();

    this.prompt(prompts).then(prompt => {
        this.separateDataBase = this.jhipsterConfig.separateDataBase = prompt.separateDataBase;
        this.databaseWriteType = this.jhipsterConfig.databaseWriteType = prompt.databaseTwo;
        this.cqrsEnabled = this.jhipsterConfig.cqrsEnabled = prompt.cqrsEnabled;
        this.databaseType = this.jhipsterConfig.databaseType = prompt.database;
        this.authenticationType = this.jhipsterConfig.authenticationType = prompt.authenticationType;
        this.serverPort = this.jhipsterConfig.serverPort = prompt.serverPort;
        this.serverPortSecured = parseInt(this.serverPort, 10) + 1;
        this.withTerraformAzureScripts = this.jhipsterConfig.withTerraformAzureScripts = prompt.withTerraformAzureScripts;
        done();
    });
}

module.exports = {
    askForModuleName,
    askForServerSideOpts,
};
