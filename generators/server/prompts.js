/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
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

function askForServerSideOpts() {
    if (this.existingProject) return;
    const applicationType = this.applicationType;
    const prompts = [
        {
            type: 'list',
            name: 'database',
            message: 'Wchich database do you want to use',
            choices: [
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
            ],
            default: 0,
        },
        {
            when: response => applicationType === 'monolith',
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
        this.databaseType = prompt.database;
        this.authenticationType = prompt.authenticationType;
        done();
    });
}

module.exports = {
    askForServerSideOpts,
};
