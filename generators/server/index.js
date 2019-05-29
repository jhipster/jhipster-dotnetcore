/* eslint-disable consistent-return */
const chalk = require('chalk');
const _ = require('lodash');
const os = require('os');
const prompts = require('./prompts')
const writeFiles = require('./files').writeFiles;
const ServerGenerator = require('generator-jhipster/generators/server');
const constants = require('../generator-dotnetcore-constants');
const toPascalCase = require('to-pascal-case');

module.exports = class extends ServerGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint dotnetcore')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupServerOptions(this, jhContext);
    }

    get initializing() {
        return {
            setupServerconsts() {
                const configuration = this.getAllJhipsterConfig(this, true);
                this.SERVER_SRC_DIR = constants.SERVER_SRC_DIR;
                this.SERVER_TEST_DIR = constants.SERVER_TEST_DIR;
                this.namespace = configuration.get('namespace') || this.configOptions.namespace;

            }
        }
    }

    get prompting() {
        return {
            askForModuleName: prompts.askForModuleName,
            askForServerSideOpts: prompts.askForServerSideOpts,

            setSharedConfigOptions() {
                this.configOptions.namespace = this.namespace;
            }
        };
    }

    get configuring() {
        return {
            configureGlobal() {
                this.camelizedBaseName = _.camelCase(this.baseName);
                this.dasherizedBaseName = _.kebabCase(this.baseName);
                this.pascalizedBaseName = toPascalCase(this.baseName);
                this.lowercaseBaseName = this.baseName.toLowerCase();
                this.humanizedBaseName = _.startCase(this.baseName);
                this.mainProjectDir = this.pascalizedBaseName;
                this.testProjectDir = `${this.pascalizedBaseName}${constants.PROJECT_TEST_SUFFIX}`;
            },
            saveConfig() {
                return {
                    saveConfig() {
                       const config = {
                           namespace: this.namespace
                       }

                       this.config.set(config);
                    }
                };
            }
        }
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        return writeFiles.call(this);
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
