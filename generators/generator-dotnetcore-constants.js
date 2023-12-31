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
export const SERVER_SRC_DIR = 'src/';
export const CLIENT_SRC_DIR = 'src/';
export const CLIENT_TEST_DIR = 'test/';
export const SERVER_TEST_DIR = 'test/';
export const PROJECT_TEST_SUFFIX = '.Test';
export const PROJECT_DTO_SUFFIX = '.Dto';
export const PROJECT_DOMAIN_SUFFIX = '.Domain';
export const PROJECT_APPLICATION_SUFFIX = '.Application';
export const DOCKER_DIR = 'docker/';
export const PROJECT_CROSSCUTTING_SUFFIX = '.Crosscutting';
export const PROJECT_INFRASTRUCTURE_SUFFIX = '.Infrastructure';
export const PROJECT_SERVICE_SUFFIX = '.Domain.Services';
export const BLAZOR = 'Blazor';
export const XAMARIN = 'Xamarin';
export const TERRAFORM_DIR = 'terraform/';
export const GITHUB = 'Github';
export const GITLAB = 'Gitlab';

// Version of Node, NPM
export const NODE_VERSION = '16.14.0';
export const NPM_VERSION = '8.6.0';

export const renameDotNetCore =
  (prefix = SERVER_SRC_DIR) =>
  (data, filepath) =>
    prefix +
    filepath
      .replace(/^Project\./, `${data.pascalizedBaseName}.`)
      .replace(/\/Project\./, `/${data.pascalizedBaseName}.`)
      .replace(/^Project\//, `${data.pascalizedBaseName}/`)
      .replace('_withEntities_', '')
      .replace('_dotnetEntityModel_', data.dotnetEntityModel)
      .replaceAll('_persistClass_', data.persistClass)
      .replaceAll('_entityClass_', data.entityClass)
      .replace('_pascalizedEntityClassPlural_', data.pascalizedEntityClassPlural)
      .replace('_dtoClass_', data.dtoClass);
