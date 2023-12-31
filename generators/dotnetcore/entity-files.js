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
/* Constants use throughout */

import { SERVER_SRC_DIR, SERVER_TEST_DIR, renameDotNetCore } from '../generator-dotnetcore-constants.js';

export const entityFiles = {
  server: [
    {
      path: SERVER_SRC_DIR,
      renameTo: renameDotNetCore(),
      templates: [
        'Project.Domain/Entities/_persistClass_.cs',
        'Project/Controllers/_pascalizedEntityClassPlural_Controller.cs',
        'Project.Domain/Repositories/Interfaces/I_persistClass_Repository.cs',
        'Project.Domain/Repositories/Interfaces/IReadOnly_persistClass_Repository.cs',
        'Project.Infrastructure/Data/Repositories/_persistClass_Repository.cs',
        'Project.Infrastructure/Data/Repositories/ReadOnly_persistClass_Repository.cs',
      ],
    },
    {
      condition: generator => generator.cqrsEnabled === true,
      path: SERVER_SRC_DIR,
      renameTo: renameDotNetCore(),
      templates: [
        'Project.Application/Queries/_persistClass_/_persistClass_GetQuery.cs',
        'Project.Application/Queries/_persistClass_/_persistClass_GetQueryHandler.cs',
        'Project.Application/Queries/_persistClass_/_persistClass_GetAllQuery.cs',
        'Project.Application/Queries/_persistClass_/_persistClass_GetAllQueryHandler.cs',
        'Project.Application/Commands/_persistClass_/_persistClass_DeleteCommand.cs',
        'Project.Application/Commands/_persistClass_/_persistClass_DeleteCommandHandler.cs',
        'Project.Application/Commands/_persistClass_/_persistClass_CreateCommand.cs',
        'Project.Application/Commands/_persistClass_/_persistClass_CreateCommandHandler.cs',
        'Project.Application/Commands/_persistClass_/_persistClass_UpdateCommand.cs',
        'Project.Application/Commands/_persistClass_/_persistClass_UpdateCommandHandler.cs',
      ],
    },
    {
      condition: generator => generator.dto === 'mapstruct',
      path: SERVER_SRC_DIR,
      renameTo: renameDotNetCore(),
      templates: ['Project.Dto/_dtoClass_.cs'],
    },
    {
      condition: generator => generator.dto === 'mapstruct',
      path: SERVER_SRC_DIR,
      renameTo: renameDotNetCore(),
      templates: ['Project.Dto/AuditedEntityBaseDto.cs'],
    },
  ],
  test: [
    {
      path: SERVER_TEST_DIR,
      renameTo: renameDotNetCore(SERVER_TEST_DIR),
      templates: ['Project.Test/Controllers/_persistClass_ControllerIntTest.cs'],
    },
  ],
  service: [
    {
      condition: generator => generator.service === 'serviceImpl' && generator.cqrsEnabled !== true,
      path: SERVER_SRC_DIR,
      renameTo: renameDotNetCore(),
      templates: ['Project.Domain.Services/_entityClass_Service.cs', 'Project.Domain/Services/Interfaces/I_entityClass_Service.cs'],
    },
  ],
};

export const entityCommonFiles = {
  server: [
    {
      path: SERVER_SRC_DIR,
      renameTo: renameDotNetCore(),
      templates: ['Project/Configuration/AutoMapper/AutoMapperProfile_withEntities_.cs'],
    },
  ],
  db: [
    {
      condition: generator => generator.databaseType !== 'mongodb',
      path: SERVER_SRC_DIR,
      renameTo: renameDotNetCore(),
      templates: ['Project.Infrastructure/Data/ApplicationDatabaseContext_withEntities_.cs'],
    },
  ],
};

export const gatlingTestsFiles = {
  gatlingTests: [
    {
      condition: generator => generator.gatlingTests,
      path: SERVER_TEST_DIR,
      templates: [
        {
          file: 'gatling/user-files/simulations/EntityGatlingTest.scala',
          renameTo: generator => `gatling/user-files/simulations/${generator.entityClass}GatlingTest.scala`,
        },
      ],
    },
  ],
};
