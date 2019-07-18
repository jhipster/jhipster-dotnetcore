/**
 * Copyright 2013-2019 the original author or authors from the JHipster project.
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
const constants = require('./generator-dotnetcore-constants');

const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;

module.exports = {
    copyI18n,
    copyEnumI18n
}

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
            `${SERVER_SRC_DIR}${this.mainClientDir}/i18n/${language}/${fileName}.json`
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
            `${SERVER_SRC_DIR}${this.mainClientDir}/i18n/${language}/${enumInfo.clientRootFolder}${enumInfo.enumInstance}.json`,
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
