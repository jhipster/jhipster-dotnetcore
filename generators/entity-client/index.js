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

        if (this.jhipsterConfig.baseName) {
            this.baseName = this.jhipsterConfig.baseName;
        }
    }

    get configuring() {
        return {
            ...super._configuring(),
            dtoWorkaround() {
                // only work with relation id rather than complete json
                this.dto = 'yes';
            },
        };
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

    get default() {
        return {
            ...super._default(),
            customizeDotnetPaths,
        };
    }

    get writing() {
        const baseWriting = super._writing();
        return {
            writeFilesDotnetcore() {
                if (this.clientFramework === BLAZOR) {
                    if (this.skipClient) return;
                    return writeBlazorFiles.call(this);
                }
                if (this.clientFramework === XAMARIN) {
                    if (this.skipClient) return;
                    return writeXamarinFiles.call(this);
                }
                return baseWriting;
            },
        };
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
