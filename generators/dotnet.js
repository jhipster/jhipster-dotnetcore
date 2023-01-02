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
const shelljs = require('shelljs');
const fs = require('fs');
const { Guid } = require('js-guid');
const _ = require('lodash');
const chalk = require('chalk');

function exec(cmd, opts = {}) {
    return new Promise((resolve, reject) => {
        shelljs.exec(cmd, opts, (code, stdout, stderr) => {
            if (code !== 0) {
                return reject(Error(stderr));
            }
            return resolve(stdout);
        });
    });
}

function hasDotnet() {
    return new Promise((resolve, reject) => {
        if (!shelljs.exec('dotnet', { silent: true })) {
            return reject(Error("'dotnet' not found in the PATH."));
        }
        return resolve();
    });
}

async function newSln(solutionName) {
    await hasDotnet();
    try {
        await fs.promises.access(`${solutionName}.sln`);
        return Promise.resolve(true);
    } catch (error) {
        return exec(`dotnet new sln --name ${solutionName}`);
    }
}

async function slnAdd(solutionFile, projects) {
    await hasDotnet();
    return exec(`dotnet sln ${solutionFile} add ${projects.join(' ')}`);
}

async function newSlnAddProj(solutionName, projects) {
    const solutionFile = fs.readFileSync(`${solutionName}.sln`, 'utf8');
    const regex = new RegExp(`Project\\("{([^}"]*)}"\\) = .*Core.csproj", "{([^}"]*)}"`, 'g'); // eslint-disable-line quotes
    const exc = regex.exec(solutionFile);
    const firstGuid = exc[1];
    const regexp = RegExp(`Project\\("{[^}"]*}"\\) = "client", "client", "{([^}"]*)}"`, 'g'); // eslint-disable-line quotes
    const clientDir = regexp.exec(solutionFile)[1];
    const reg = new RegExp(`Project\\("{[^"]*"\\) = "([^"]*)", "[^"]*`, 'g'); // eslint-disable-line quotes
    let projectText = '';
    let dirText = '';

    projectText += `\nProject("{${firstGuid}}") = "Solution Items", "Solution Items", "{${_.toUpper(Guid.newGuid())}}"`;
    projectText += '\n\tProjectSection(SolutionItems) = preProject';
    projectText += '\n\t\t.editorconfig = .editorconfig';
    projectText += '\n\t\tDirectory.Packages.props = Directory.Packages.props';
    projectText += '\n\t\tREADME.md = README.md';
    projectText += '\n\tEndProjectSection';
    projectText += '\nEndProject';

    projects.forEach(project => {
        const existingProjects = solutionFile.matchAll(reg);
        let alreadyExist = false;
        let existingProject = existingProjects.next();
        while (!existingProject.done && !alreadyExist) {
            alreadyExist = existingProject.value[1] === project.name;
            existingProject = existingProjects.next();
        }
        if (!alreadyExist) {
            const randomGuid = _.toUpper(Guid.newGuid());
            projectText += `\nProject("{${firstGuid}}") = "${project.name}", "${project.path}", "{${randomGuid}}"\nEndProject`;
            dirText += `\n\t\t{${randomGuid}} = {${clientDir}}`;
        }
    });

    const projectRe = new RegExp('MinimumVisualStudioVersion = .*\\D', 'g');
    const projectFound = solutionFile.match(projectRe);
    projectText = `${projectFound}${projectText}`;
    let newBody = solutionFile.replace(projectRe, projectText);

    const dirRe = new RegExp('GlobalSection\\(NestedProjects\\) = .*\\D', 'g');
    const dirFound = solutionFile.match(dirRe);
    dirText = `${dirFound}${dirText}`;
    newBody = newBody.replace(dirRe, dirText);

    if (solutionFile !== newBody) {
        fs.writeFileSync(`${solutionName}.sln`, newBody);
    }
}

function installBlazorDependencies() {
    if (!libmanIsInstalled()) {
        if (shelljs.exec('dotnet tool install -g Microsoft.Web.LibraryManager.Cli').code !== 0) {
            throw new Error('Could not install Microsoft.Web.LibraryManager.Cli');
        }
        console.log(chalk.green.bold('Microsoft.Web.LibraryManager.Cli successfully installed.\n'));
    }
    if (!webcompilerIsInstalled()) {
        if (shelljs.exec('dotnet tool install Excubo.WebCompiler --global').code !== 0) {
            throw new Error('Could not install Excubo.WebCompiler');
        }
        console.log(chalk.green.bold('Excubo.WebCompiler successfully installed.\n'));
    }
}

function libmanIsInstalled() {
    if (shelljs.exec('libman', { silent: true }).code !== 0) {
        return false;
    }
    return true;
}

function webcompilerIsInstalled() {
    if (shelljs.exec('webcompiler', { silent: true }).code !== 0) {
        return false;
    }
    return true;
}

async function restore() {
    await hasDotnet();
    return exec('dotnet restore');
}

module.exports = {
    hasDotnet,
    newSlnAddProj,
    newSln,
    slnAdd,
    restore,
    installBlazorDependencies,
};
