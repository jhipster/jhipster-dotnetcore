/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityClientGenerator = require('generator-jhipster/generators/entity-client');
const toPascalCase = require('to-pascal-case');
const constants = require('../generator-dotnetcore-constants');

const writeFiles = require('./files').writeFiles;

module.exports = class extends EntityClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint dotnetcore')}`);
        }

        this.configOptions = jhContext.configOptions || {};
    }

    get configuring() {
        return {
            configureGlobal() {
                this.pascalizedBaseName = toPascalCase(this.baseName);
            }
        };
    }

    get writing() {
        return writeFiles();
    }

    rebuildClient() {
        const done = this.async();
        this.log(`\n${chalk.bold.green('Running `webpack:build` to update client app\n')}`);
        this.spawnCommand('npm', ['--prefix', `${constants.SERVER_SRC_DIR}${this.pascalizedBaseName}`, 'run', 'webpack:build']).on(
            'close',
            () => {
                done();
            }
        );
    }

    get end() {
        const jhipsterPhase = super._end();
        const customPhase = {
            end() {
                if (!this.options['skip-install'] && !this.skipClient) {
                    this.rebuildClient();
                }
                this.log(chalk.bold.green(`Entity ${this.entityNameCapitalized} generated successfully.`));
            }
        };
        return Object.assign(jhipsterPhase, customPhase);
    }
};
