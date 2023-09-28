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
import constants from '../generator-dotnetcore-constants.cjs';

export const files = {
  general: [
    {
      templates: [
        '.gitignore.jhi.dotnetcore-common',
        '.devcontainer/devcontainer.json',
        // TODO convert to .jhi
        // 'README.md',
      ],
    },
  ],
  docker: [
    {
      templates: ['Dockerfile-Back', 'docker-entrypoint-back.sh', '.dockerignore'],
    },
    {
      condition: generator => generator.clientFramework === constants.BLAZOR,
      templates: ['Dockerfile-Front', 'docker-entrypoint-front.sh', 'nginx.conf', 'default.conf'],
    },
  ],
};
