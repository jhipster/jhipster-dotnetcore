/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityClientGenerator = require('generator-jhipster/generators/entity-client');
const constants = require('../generator-dotnetcore-constants');
const configureGlobalDotnetcore = require('../utils').configureGlobalDotnetcore;

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
        const phaseFromJHipster = super._configuring();

        const customPhaseSteps = {
            configureGlobalDotnetcore,
            dtoWorkaround() {
                this.dto = 'no';
            },
        };

        return Object.assign(customPhaseSteps, phaseFromJHipster);
    }

    get writing() {
        return super._writing();
    }

    rebuildClient() {
        if (!this.options['skip-install'] && !this.skipClient) {
            const done = this.async();
            this.log(`\n${chalk.bold.green('Running `webpack:build` to update client app\n')}`);
            this.spawnCommand('npm', ['--prefix', `${constants.SERVER_SRC_DIR}${this.mainClientDir}`, 'run', 'webpack:build']).on(
                'close',
                () => {
                    done();
                }
            );
        }
    }

    get end() {
        return super._end();
    }
};
