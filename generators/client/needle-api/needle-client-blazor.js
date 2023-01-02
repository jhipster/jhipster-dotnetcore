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
const needleBase = require('generator-jhipster/generators/needle-base');
const chalk = require('chalk');
const _ = require('lodash');

module.exports = class extends needleBase {
    constructor(generator) {
        super(generator);

        this.mainClientDir = generator.mainClientDir;

        if (!this.mainClientDir) {
            generator.error('Client destination folder is missing');
        }
    }

    addEntityToMenu(entityName) {
        const lowerCasedEntityName = _.toLower(entityName);
        const errorMessage = `${chalk.yellow('Reference to ') + entityName} ${chalk.yellow('not added to menu.\n')}`;
        const entityMenuPath = `src/${this.mainClientDir}/Shared/NavMenu.razor`;
        const entityEntry =
            // prettier-ignore
            this.generator.stripMargin(
                            `|<BarDropdownItem Class="dropdown-item" To="${lowerCasedEntityName}">
                             |                                    <Icon Name='"fa-asterisk"' />
                             |                                    ${entityName}
                             |                                </BarDropdownItem>`);
        const rewriteFileModel = this.generateFileModel(entityMenuPath, 'jhipster-needle-add-entity-to-menu', entityEntry);

        this.addBlockContentToFile(rewriteFileModel, errorMessage);
    }

    addServiceInDI(entityName) {
        const errorMessage = `${chalk.yellow('Reference to ') + entityName} ${chalk.yellow('not added to Program.\n')}`;
        const programPath = `src/${this.mainClientDir}/Program.cs`;
        const serviceEntry =
            // prettier-ignore
            this.generator.stripMargin(`|builder.Services.AddScoped<I${entityName}Service, ${entityName}Service>();`);
        const rewriteFileModel = this.generateFileModel(programPath, 'jhipster-needle-add-services-in-di', serviceEntry);

        this.addBlockContentToFile(rewriteFileModel, errorMessage);
    }

    addUsingForService(namespace,entityName) {
        const errorMessage = `${chalk.yellow('Reference to ') + entityName} ${chalk.yellow('not added to Program.\n')}`;
        const programPath = `src/${this.mainClientDir}/Program.cs`;
        const usingEntry =
            // prettier-ignore
            this.generator.stripMargin(`|using ${namespace}.Client.Services.EntityServices.${entityName};`);
        const rewriteFileModel = this.generateFileModel(programPath, 'jhipster-needle-add-using-for-services', usingEntry);

        this.addBlockContentToFile(rewriteFileModel, errorMessage);
    }

    addDtoMapping(entityName) {
        const errorMessage = `${chalk.yellow('Reference to ') + entityName} ${chalk.yellow('not added to AutoMapper.\n')}`;
        const autoMapperProfilePath = `src/${this.mainClientDir}/AutoMapper/AutoMapperProfile.cs`;
        const mappingEntry =
            // prettier-ignore
            this.generator.stripMargin(`|CreateMap<${entityName}Model, ${entityName}Dto>().ReverseMap();`);
        const rewriteFileModel = this.generateFileModel(autoMapperProfilePath, 'jhipster-needle-add-dto-model-mapping', mappingEntry);

        this.addBlockContentToFile(rewriteFileModel, errorMessage);
    }
};
