const constants = require('../generator-dotnetcore-constants');

const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;

function removeNotImplementedFeatureInCypress() {
    this.fs.delete(`${SERVER_SRC_DIR}${this.clientTestProject}/cypress/integration/account/reset-password-page.spec.ts`);
    this.fs.delete(`${SERVER_SRC_DIR}${this.clientTestProject}/cypress/integration/administration/administration.spec.ts`);
}

function updateTsConfigCypress() {
    this.replaceContent(`${SERVER_SRC_DIR}${this.clientTestProject}/cypress/tsconfig.json`, './../../../../', './../../', true);
}

function updateCypressJson() {
    this.replaceContent(`${SERVER_SRC_DIR}${this.mainClientDir}/cypress.json`, `${SERVER_SRC_DIR}${this.mainClientDir}/`, '', true);
    this.replaceContent(
        `${SERVER_SRC_DIR}${this.mainClientDir}/cypress.json`,
        `http://localhost:${this.serverPort}`,
        `https://localhost:${this.serverPortSecured}`,
        true
    );
    this.replaceContent(`${SERVER_SRC_DIR}${this.mainClientDir}/cypress.json`, 'target', 'dist', true);
}

function writeFiles() {
    removeNotImplementedFeatureInCypress.call(this);
    updateTsConfigCypress.call(this);
    updateCypressJson.call(this);
}

module.exports = {
    writeFiles,
};
