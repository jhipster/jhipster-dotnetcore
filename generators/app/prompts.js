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
const toPascalCase = require('to-pascal-case');
const chalk = require('chalk');

function askForModuleName() {
    if (this.existingProject) return;
    const done = this.async();
    const defaultAppBaseName = toPascalCase(this.getDefaultAppName());
    const prompts = [
        {
            type: 'input',
            name: 'baseName',
            validate: input => {
                if (!/^([a-zA-Z0-9_]*)$/.test(input)) {
                    return 'Your base name cannot contain special characters or a blank space';
                }
                return true;
            },
            message: 'What is the base name of your application?',
            default: defaultAppBaseName,
        },
        {
            type: 'input',
            name: 'namespace',
            validate: input =>
                /^([a-z_A-Z]\w+(?:\.[a-z_A-Z]\w+)*)$/.test(input) ? true : 'The namespace you have provided is not a valid C# namespace',
            message: 'What is your default C# namespace?',
            default: defaultAppBaseName,
        },
    ];
    this.prompt(prompts).then(prompt => {
        this.baseName = this.jhipsterConfig.baseName = prompt.baseName;
        this.namespace = this.jhipsterConfig.namespace = prompt.namespace;
        done();
    });
}

async function askForApplicationType() {
    if (this.existingProject) return;

    const applicationTypeChoices = [
        {
            value: 'monolith',
            name: 'Monolithic application (recommended for simple projects)',
        },
        {
            value: 'microservice',
            name: 'Microservice application',
        },
        {
            value: 'gateway',
            name: 'Microservice gateway',
        },
    ];

    const answers = await this.prompt([
        {
            type: 'list',
            name: 'applicationType',
            message: `Which ${chalk.yellow('*type*')} of application would you like to create?`,
            choices: applicationTypeChoices,
            default: 'monolith',
        },
    ]);
    this.applicationType = this.jhipsterConfig.applicationType = answers.applicationType;

    if (this.applicationType !== 'monolith') {
        this.serviceDiscoveryType = this.jhipsterConfig.serviceDiscoveryType = 'consul';
    }
}

module.exports = {
    askForModuleName,
    askForApplicationType,
};
