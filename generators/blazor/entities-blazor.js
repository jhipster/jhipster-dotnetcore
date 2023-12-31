/**
 * Copyright 2019-2024 the original author or authors from the JHipster project.
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
import { CLIENT_SRC_DIR, CLIENT_TEST_DIR, renameDotNetCore } from '../generator-dotnetcore-constants.js';

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
export const entityFiles = {
  blazorAppModels: [
    {
      path: `${CLIENT_SRC_DIR}client/`,
      renameTo: renameDotNetCore(`${CLIENT_SRC_DIR}client/`),
      templates: [
        'Project.Client/Models/_dotnetEntityModel_.cs',
        'Project.Client/Services/EntityServices/_entityClass_/_entityClass_Service.cs',
        'Project.Client/Services/EntityServices/_entityClass_/I_entityClass_Service.cs',
        'Project.Client/Pages/Entities/_entityClass_/_entityClass_.razor.cs',
        'Project.Client/Pages/Entities/_entityClass_/_entityClass_.razor',
        'Project.Client/Pages/Entities/_entityClass_/_entityClass_Detail.razor.cs',
        'Project.Client/Pages/Entities/_entityClass_/_entityClass_Detail.razor',
        'Project.Client/Pages/Entities/_entityClass_/_entityClass_Update.razor.cs',
        'Project.Client/Pages/Entities/_entityClass_/_entityClass_Update.razor',
      ],
    },
    {
      path: CLIENT_TEST_DIR,
      renameTo: renameDotNetCore(CLIENT_TEST_DIR),
      templates: [
        'Project.Client.Test/Pages/Entities/_entityClass_/_entityClass_Test.cs',
        'Project.Client.Test/Pages/Entities/_entityClass_/_entityClass_UpdateTest.cs',
        'Project.Client.Test/Pages/Entities/_entityClass_/_entityClass_DetailTest.cs',
      ],
    },
  ],
};
