/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const EntitiesClientGenerator = require('generator-jhipster/generators/entities-client');
const chalk = require('chalk');
const customizeDotnetPaths = require('../utils').customizeDotnetPaths;
const constants = require('../generator-dotnetcore-constants.cjs');

const BLAZOR = constants.BLAZOR;
const XAMARIN = constants.XAMARIN;

module.exports = class extends EntitiesClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        if (this.jhipsterConfig.baseName) {
            this.baseName = this.jhipsterConfig.baseName;
            this.clientFramework = this.jhipsterConfig.clientFramework;
        }
    }

    get initializing() {
        return super._initializing();
    }

    get loading() {
        return super._loading();
    }

    get default() {
        return {
            ...super._default(),
            customizeDotnetPaths,
        };
    }

    get end() {
        return {
            rebuildClient() {
                if (!this.options.skipInstall && !this.skipClient && this.clientFramework !== BLAZOR && this.clientFramework !== XAMARIN) {
                    const done = this.async();
                    this.log(`\n${chalk.bold.green('Running `webapp:build` to update client app\n')}`);
                    this.spawnCommand('npm', ['--prefix', `${constants.SERVER_SRC_DIR}${this.mainClientDir}`, 'run', 'webapp:build']).on(
                        'close',
                        () => {
                            done();
                        }
                    );
                }
            },
        };
    }
};
