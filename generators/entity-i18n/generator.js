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
/* eslint-disable consistent-return */
const EntityI18nGenerator = require('generator-jhipster/generators/entity-i18n');
const customizeDotnetPaths = require('../utils').customizeDotnetPaths;

module.exports = class extends EntityI18nGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        if (this.jhipsterConfig.baseName) {
            this.baseName = this.jhipsterConfig.baseName;
        }
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
            customizeDotnetPaths,
            ...super._default(),
        };
    }

    get writing() {
        return super._writing();
    }

    get postWriting() {
        return super._postWriting();
    }
};
