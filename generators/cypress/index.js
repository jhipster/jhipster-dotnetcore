const chalk = require('chalk');
const CypressGenerator = require('generator-jhipster/generators/cypress');
const writeCypressFiles = require('./files-cypress').writeFiles;
const customizeDotnetPaths = require('../utils').customizeDotnetPaths;

module.exports = class extends CypressGenerator {
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
        return super._initializing();
    }

    get configuring() {
        return {
            customizeDotnetPaths,
            ...super._configuring(),
        };
    }

    get composing() {
        return super._composing();
    }

    get loading() {
        return {
            ...super._loading(),
            loadingDotnet() {
                this.serverPort = this.jhipsterConfig.serverPort;
                this.serverPortSecured = parseInt(this.serverPort, 10) + 1;
            },
        };
    }

    get preparing() {
        return super._preparing();
    }

    get default() {
        return super._default();
    }

    get writing() {
        return super._writing();
    }

    get postWriting() {
        return {
            ...super._postWriting(),
            postWriteFilesDotnetcore() {
                return writeCypressFiles.call(this);
            },
        };
    }
};
