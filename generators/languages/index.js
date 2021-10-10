/* eslint-disable consistent-return */
const chalk = require('chalk');
const LanguageGenerator = require('generator-jhipster/generators/languages');

// eslint-disable-next-line import/no-extraneous-dependencies
const constants = require('../generator-dotnetcore-constants');
const customizeDotnetPaths = require('../utils').customizeDotnetPaths;
const baseConstants = require('generator-jhipster/generators/generator-constants');

const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;

const { ANGULAR } = baseConstants.SUPPORTED_CLIENT_FRAMEWORKS;
const BLAZOR = constants.BLAZOR;

module.exports = class extends LanguageGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint dotnetcore')}`);
        }

        if (this.configOptions.baseName) {
            this.baseName = this.configOptions.baseName;
        }
    }

    get initializing() {
        return {
            ...super._initializing(),
            customizeDotnetPaths,
        };
    }

    get prompting() {
        return super._prompting();
    }

    get configuring() {
        return super._configuring();
    }

    get default() {
        return super._default();
    }

    get composing() {
        return super._composing();
    }

    get loading() {
        return super._loading();
    }

    get preparing() {
        return {
            ...super._preparing(),
            preparingDotnet() {
                this.skipServer = true; // Skip server transalation for the dotnet
                if (this.clientFramework === BLAZOR) {
                    this.skipClient = true; // Skip client translation for the blazor framework
                }
            },
        };
    }

    get writing() {
        return super._writing();
    }

    get postWriting() {
        return {
            ...super._postWriting(),
            postWritingAngular() {
                if (this.clientFramework === ANGULAR) {
                    this.replaceContent(
                        `${SERVER_SRC_DIR}${this.mainClientDir}/webpack/webpack.custom.js`,
                        `${SERVER_SRC_DIR}${this.mainClientDir}/`,
                        '',
                        true
                    );
                }
            },
        };
    }
};
