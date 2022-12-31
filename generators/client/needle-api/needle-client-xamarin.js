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
        const errorMessage = `${chalk.yellow('Reference to ') + entityName} ${chalk.yellow('not added to menu.\n')}`;
        const entityMenuPath = `src/${this.mainClientDir}/Views/MenuPage.xaml`;
        const entityEntry =
            // prettier-ignore
            this.generator.stripMargin(
                `|<Grid HorizontalOptions="FillAndExpand" VerticalOptions="StartAndExpand" Padding="8" BackgroundColor="LightBlue" IsVisible="{Binding IsConnected}">
                |                    <Label Text="${entityName}" />
                |                    <Grid.GestureRecognizers>
                |                       <TapGestureRecognizer Tapped="ToggleClicked" Command="{Binding Show${entityName}Command}"/>
                |                    </Grid.GestureRecognizers>
                |                </Grid>
                |`);

        const rewriteFileModel = this.generateFileModel(entityMenuPath, 'jhipster-needle-add-entity-to-menu', entityEntry);

        this.addBlockContentToFile(rewriteFileModel, errorMessage);
    }

    declareCommandToMenu(entityName) {
        const errorMessage = `${chalk.yellow('Reference to ') + entityName} ${chalk.yellow('not added to menu.\n')}`;
        const entityMenuPath = `src/${this.mainClientDir}/ViewModels/MenuViewModel.cs`;
        const entityEntry =
            // prettier-ignore
            this.generator.stripMargin(
                `|public IMvxCommand Show${entityName}Command => new MvxAsyncCommand(${entityName}CommandClicked);`);

        const rewriteFileModel = this.generateFileModel(entityMenuPath, 'jhipster-needle-declare-entity-command', entityEntry);

        this.addBlockContentToFile(rewriteFileModel, errorMessage);
    }

    addCommandToMenu(entityName) {
        const errorMessage = `${chalk.yellow('Reference to ') + entityName} ${chalk.yellow('not added to menu.\n')}`;
        const entityMenuPath = `src/${this.mainClientDir}/ViewModels/MenuViewModel.cs`;
        const entityEntry =
            // prettier-ignore
            this.generator.stripMargin(
                `|private async Task ${entityName}CommandClicked()
                |        {
                |            await _navigationService.Navigate<${entityName}ViewModel>();
                |        }
                `);

        const rewriteFileModel = this.generateFileModel(entityMenuPath, 'jhipster-needle-add-entity-command', entityEntry);

        this.addBlockContentToFile(rewriteFileModel, errorMessage);
    }

    addServiceInDI(entityName) {
        const lowerEntityName = _.toLower(entityName);
        const errorMessage = `${chalk.yellow('Reference to ') + entityName} ${chalk.yellow('not added to Program.\n')}`;
        const programPath = `src/${this.mainClientDir}/App.cs`;
        const serviceEntry =
            // prettier-ignore
            this.generator.stripMargin(
                `|var ${lowerEntityName}Service = new ${entityName}Service(httpClient);                       
                 |            Mvx.IoCProvider.RegisterSingleton<I${entityName}Service>(${lowerEntityName}Service);`);

        const rewriteFileModel = this.generateFileModel(programPath, 'jhipster-needle-add-services-in-di', serviceEntry);

        this.addBlockContentToFile(rewriteFileModel, errorMessage);
    }
};