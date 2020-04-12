/**
 * Modified from:
 *  https://github.com/jhipster/generator-jhipster/blob/v6.8.0/generators/app/prompts.js
 */
const chalk = require('chalk');

module.exports = {
    askForApplicationType
};

function askForApplicationType(meta) {
    if (!meta && this.existingProject) return;

    const DEFAULT_APPTYPE = 'monolith';

    const applicationTypeChoices = [
        {
            value: DEFAULT_APPTYPE,
            name: 'Monolithic application (recommended for simple projects)'
        },
        {
            value: 'microservice',
            name: 'Microservice application'
        },
        {
            value: 'gateway',
            name: 'Microservice gateway'
        },
        {
            value: 'uaa',
            name: 'JHipster UAA server'
        }
    ];

    const PROMPT = {
        type: 'list',
        name: 'applicationType',
        message: `Which ${chalk.yellow('*type*')} of application would you like to create?`,
        choices: applicationTypeChoices,
        default: DEFAULT_APPTYPE
    };

    if (meta) return PROMPT; // eslint-disable-line consistent-return

    const done = this.async();

    const promise = this.skipServer ? Promise.resolve({ applicationType: DEFAULT_APPTYPE }) : this.prompt(PROMPT);
    promise.then(prompt => {
        this.applicationType = this.configOptions.applicationType = prompt.applicationType;
        done();
    });
}
