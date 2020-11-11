/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
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
const _ = require('lodash');
const toPascalCase = require('to-pascal-case');
const getEnumInfo = require('generator-jhipster/generators/utils').getEnumInfo;

const constants = require('./generator-dotnetcore-constants');

const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;
const BLAZOR = constants.BLAZOR;

module.exports = {
    copyI18n,
    copyEnumI18n,
    equivalentCSharpType,
    configureGlobalDotnetcore,
    getEnumInfo,
    asModel,
};

/**
 * Copy I18N
 *
 * @param language
 * @param prefix
 */
function copyI18n(language, prefix = '') {
    try {
        const fileName = this.entityTranslationKey;
        this.template(
            `${prefix ? `${prefix}/` : ''}i18n/entity_${language}.json.ejs`,
            `${SERVER_SRC_DIR}${this.mainClientAppDir}/i18n/${language}/${fileName}.json`
        );
        this.addEntityTranslationKey(this.entityTranslationKeyMenu, this.entityClass, language);
    } catch (e) {
        this.debug('Error:', e);
        // An exception is thrown if the folder doesn't exist
        // do nothing
    }
}

/**
 * Copy Enum I18N
 *
 * @param language
 * @param enumInfo
 * @param prefix
 */
function copyEnumI18n(language, enumInfo, prefix = '') {
    try {
        this.template(
            `${prefix ? `${prefix}/` : ''}i18n/enum.json.ejs`,
            `${SERVER_SRC_DIR}${this.mainClientAppDir}/i18n/${language}/${enumInfo.clientRootFolder}${enumInfo.enumInstance}.json`,
            this,
            {},
            enumInfo
        );
    } catch (e) {
        this.debug('Error:', e);
        // An exception is thrown if the folder doesn't exist
        // do nothing
    }
}

/**
 * Configure dotnet
 */
function configureGlobalDotnetcore() {
    this.camelizedBaseName = _.camelCase(this.baseName);
    this.dasherizedBaseName = _.kebabCase(this.baseName);
    this.pascalizedBaseName = toPascalCase(this.baseName);
    this.lowercaseBaseName = this.baseName.toLowerCase();
    this.humanizedBaseName = _.startCase(this.baseName);
    this.solutionName = this.pascalizedBaseName;
    this.mainProjectDir = this.pascalizedBaseName;
    this.mainClientDir = `${this.mainProjectDir}/ClientApp`;
    this.mainClientAppDir = `${this.mainProjectDir}/ClientApp/src`;
    this.relativeMainClientDir = 'ClientApp';
    this.relativeMainAppDir = `${this.relativeMainClientDir}/src`;
    this.relativeMainTestDir = `${this.relativeMainClientDir}/test`;
    this.testProjectDir = `${this.pascalizedBaseName}${constants.PROJECT_TEST_SUFFIX}`;
    this.clientTestProject = `${this.mainClientDir}/test/`;
    this.modelSuffix = 'Model';

    if (this.clientFramework === BLAZOR) {
        this.mainClientDir = `client/${this.pascalizedBaseName}.Client`;
        this.sharedClientDir = `client/${this.pascalizedBaseName}.Client.Shared`;
        this.clientTestProject = `${this.pascalizedBaseName}.Client${constants.PROJECT_TEST_SUFFIX}`;
    }

    this.options.outputPathCustomizer = [
        paths => (paths ? paths.replace(/^src\/main\/webapp(\/|$)/, `src/${this.mainClientAppDir}$1/`) : paths),
        paths => (paths ? paths.replace(/^src\/test\/javascript(\/|$)/, `src/${this.clientTestProject}$1`) : paths),
        paths => (paths ? paths.replace(/^((?!.huskyrc).[a-z]*\.?[a-z]*\.?[a-z]*$)/, `src/${this.mainClientDir}/$1`) : paths),
        paths => (paths ? paths.replace(/^(webpack\/.*)$/, `src/${this.mainClientDir}/$1`) : paths),
        paths => (paths ? paths.replace(/^(tsconfig.e2e.json)$/, `src/${this.mainClientDir}/$1`) : paths),
    ];

    // get the frontend application name.
    const frontendAppName = _.camelCase(this.baseName) + (this.baseName.endsWith('App') ? '' : 'App');
    this.frontendAppName = frontendAppName.match(/^\d/) ? 'App' : frontendAppName;
}

function asModel(name) {
    return name + this.modelSuffix;
}

function equivalentCSharpType(javaType) {
    let cSharpType;

    switch (javaType) {
        case 'String':
            cSharpType = 'string';
            break;
        case 'Integer':
            cSharpType = 'int?';
            break;
        case 'Long':
            cSharpType = 'long?';
            break;
        case 'Float':
            cSharpType = 'float?';
            break;
        case 'Double':
            cSharpType = 'double?';
            break;
        case 'BigDecimal':
            cSharpType = 'decimal?';
            break;
        case 'LocalDate':
            cSharpType = 'DateTime?';
            break;
        case 'Instant':
            cSharpType = 'DateTime';
            break;
        case 'ZonedDateTime':
            cSharpType = 'DateTime';
            break;
        case 'Duration':
            cSharpType = 'TimeSpan';
            break;
        case 'Boolean':
            cSharpType = 'bool?';
            break;
        case 'enum':
            cSharpType = 'LOOK_FOR_AN_EQUIVALENT';
            break;
        case 'byte[]':
            cSharpType = 'LOOK_FOR_AN_EQUIVALENT';
            break;
        default:
            cSharpType = 'UNKNOWN_TYPE';
    }

    return cSharpType;
}
