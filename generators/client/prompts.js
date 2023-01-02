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
const baseConstants = require('generator-jhipster/generators/generator-constants');
const constants = require('../generator-dotnetcore-constants.cjs');

const { ANGULAR, REACT, VUE } = baseConstants.SUPPORTED_CLIENT_FRAMEWORKS;
const BLAZOR = constants.BLAZOR;
const XAMARIN = constants.XAMARIN;

module.exports = {
    askForClient,
};

function askForClient() {
    if (this.existingProject) return;

    const choices = [
        {
            value: ANGULAR,
            name: 'Angular',
        },
        {
            value: REACT,
            name: 'React',
        },
        {
            value: VUE,
            name: 'Vue',
        },
        {
            value: BLAZOR,
            name: '[Alpha] - Blazor (WebAssembly)',
        },
        {
            value: 'no',
            name: 'No client',
        },
    ];

    if (this.configOptions.isDebugEnabled) {
        choices.push(
            {
                value: XAMARIN,
                name: '[Alpha] - Xamarin',
            },
        )
    }

    const PROMPT = {
        type: 'list',
        name: 'clientFramework',
        message: `Which ${chalk.yellow('*Framework*')} would you like to use for the client?`,
        choices,
        default: ANGULAR,
    };
    const done = this.async();

    this.prompt(PROMPT).then(prompt => {
        this.clientFramework = this.jhipsterConfig.clientFramework = prompt.clientFramework;
        if (this.clientFramework === 'no') {
            this.skipClient = true;
        }
        done();
    });
}
