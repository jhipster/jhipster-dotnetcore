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
const constants = require('../generator-dotnetcore-constants.cjs');

/* Constants use throughout */
const CLIENT_SRC_DIR = constants.CLIENT_SRC_DIR;
const XamarinNeedle = require('../client/needle-api/needle-client-xamarin');

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const files = {
    xamarinAppModels: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Models/Model.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/Entities/${generator.asModel(generator.entityClass)}.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/ViewModels/EntityViewModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/ViewModels/Entities/${generator.entityClass}ViewModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Services/EntityService.cs',
                    renameTo: generator =>
                        `${generator.mainClientDir}/Services/Entities/${generator.entityClass}/${generator.entityClass}Service.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Services/IEntityService.cs',
                    renameTo: generator =>
                        `${generator.mainClientDir}/Services/Entities/${generator.entityClass}/I${generator.entityClass}Service.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Views/EntityView.xaml.cs',
                    renameTo: generator =>
                        `${generator.mainClientDir}/Views/Entities/${generator.entityClass}/${generator.entityClass}View.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client/Views/EntityView.xaml',
                    renameTo: generator =>
                        `${generator.mainClientDir}/Views/Entities/${generator.entityClass}/${generator.entityClass}View.xaml`,
                },
            ],
        },
    ],
};

module.exports = {
    writeFiles,
    files,
};

function writeFiles() {
    this.writeFilesToDisk(files, this, false, 'xamarin');
    const xamarinNeedle = new XamarinNeedle(this);
    xamarinNeedle.addEntityToMenu(this.entityClass);
    xamarinNeedle.addServiceInDI(this.entityClass);
    xamarinNeedle.addCommandToMenu(this.entityClass);
    xamarinNeedle.declareCommandToMenu(this.entityClass);
}
