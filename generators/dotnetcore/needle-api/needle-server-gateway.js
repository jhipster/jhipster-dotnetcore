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
const jhipsterUtils = require('generator-jhipster/generators/utils');
const chalk = require('chalk');

module.exports = class extends needleBase {
    constructor(generator) {
        super(generator);

        this.mainProjectDir = generator.mainProjectDir;

        if (!this.mainProjectDir) {
            generator.error('Server destination folder is missing');
        }
    }

    addRouteToGateway(entityName, microserviceName) {
        const errorMessage = `${chalk.yellow('Route to ') + entityName} ${chalk.yellow('not added to the gateway.\n')}`;
        const ocelotConfigPath = `src/${this.mainProjectDir}/ocelot.json`;
        const haveAlreadyOneRoute = jhipsterUtils.checkStringInFile(ocelotConfigPath, 'UpstreamPathTemplate', this.generator);
        const isRoutesAlreadyDeclared = jhipsterUtils.checkStringInFile(
            ocelotConfigPath,
            `${microserviceName}/api/${entityName}`,
            this.generator
        );
        if (!isRoutesAlreadyDeclared) {
            let firstRouteEntry = '';
            if (haveAlreadyOneRoute) {
                firstRouteEntry = ',';
            }
            firstRouteEntry +=
                // prettier-ignore
                this.generator.stripMargin(
                               `|{
                                |  "DownstreamPathTemplate": "/api/${entityName}",
                                |  "DownstreamScheme": "https",
                                |  "ServiceName": "${microserviceName}-service",
                                |  "LoadBalancerOptions": {
                                |    "Type": "LeastConnection"
                                |  },
                                |  "ReRoutesCaseSensitive": false,
                                |  "UpstreamPathTemplate": "/${microserviceName}/api/${entityName}",
                                |  "UpstreamHttpMethod": [ "Get", "Post", "Delete","Put" ]
                                |}, `);
            const secondRouteEntry =
                // prettier-ignore
                this.generator.stripMargin(
                                   `|{
                                    |  "DownstreamPathTemplate": "/api/${entityName}/{everything}",
                                    |  "DownstreamScheme": "https",
                                    |  "ServiceName": "${microserviceName}-service",
                                    |  "LoadBalancerOptions": {
                                    |    "Type": "LeastConnection"
                                    |  },
                                    |  "ReRoutesCaseSensitive": false,
                                    |  "UpstreamPathTemplate": "/${microserviceName}/api/${entityName}/{everything}",
                                    |  "UpstreamHttpMethod": [ "Get", "Post", "Delete","Put" ]
                                    |}`);
            const firstRewriteFileModel = this.generateFileModel(ocelotConfigPath, 'jhipster-needle-add-route-to-gateway', firstRouteEntry);
            const secondRewriteFileModel = this.generateFileModel(
                ocelotConfigPath,
                'jhipster-needle-add-route-to-gateway',
                secondRouteEntry
            );
            this.addBlockContentToFile(firstRewriteFileModel, errorMessage);
            this.addBlockContentToFile(secondRewriteFileModel, errorMessage);
        }
    }
};
