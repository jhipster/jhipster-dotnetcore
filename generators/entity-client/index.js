/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityClientGenerator = require('generator-jhipster/generators/entity-client');
const constants = require('../generator-dotnetcore-constants');
const customizeDotnetPaths = require('../utils').customizeDotnetPaths;
const writeBlazorFiles = require('./files-blazor').writeFiles;
const writeXamarinFiles = require('./files-xamarin').writeFiles;

const BLAZOR = constants.BLAZOR;
const XAMARIN = constants.XAMARIN;

module.exports = class extends EntityClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint dotnetcore')}`);
        }
    }

    get configuring() {
        const phaseFromJHipster = super._configuring();

        const customPhaseSteps = {
            customizeDotnetPaths,
            dtoWorkaround() {
                // only work with relation id rather than complete json
                this.dto = 'yes';
            },
        };

        return Object.assign(customPhaseSteps, phaseFromJHipster);
    }

    get composing() {
        return super._composing();
    }

    get loading() {
        return super._loading();
    }

    get preparing() {
        return super._preparing();
    }

    get writing() {
        if (this.clientFramework === BLAZOR) {
            return {
                writeFilesDotnetcore() {
                    if (this.skipClient) return;
                    return writeBlazorFiles.call(this);
                },
            };
        }
        if (this.clientFramework === XAMARIN) {
            return {
                writeFilesDotnetcore() {
                    if (this.skipClient) return;
                    return writeXamarinFiles.call(this);
                },
            };
        }
        return super._writing();
    }

    get postWriting() {
        return super._postWriting();
    }

    rebuildClient() {
        if (!this.options.skipInstall && !this.skipClient && this.clientFramework !== BLAZOR && this.clientFramework !== XAMARIN) {
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
