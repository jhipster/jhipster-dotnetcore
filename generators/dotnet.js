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
const shelljs = require('shelljs');
const fs = require('fs');
const { Guid } = require('js-guid');
const _ = require('lodash');

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
        if (!shelljs.which('dotnet')) {
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
    const solutionFile = fs.readFileSync(solutionName + ".sln", 'utf8');
    var regex = new RegExp(`Project\\("{([^}"]*)}"\\) = .*Core.csproj", "{([^}"]*)}"`, 'g');
    var exc = regex.exec(solutionFile);
    var first_guid = exc[1];
    var core_guid = exc[2];
    var regexp = RegExp(`Project\\("{[^}"]*}"\\) = "client", "client", "{([^}"]*)}"`,  'g');
    var client_dir = regexp.exec(solutionFile)[1];
    var reg = new RegExp(`Project\\("{[^"]*"\\) = "([^"]*)", "[^"]*`, 'g');
    var existing_projects = solutionFile.matchAll(reg);
    var already_exist = false;
    var project_text = "";
    var dir_text = "";

    projects.forEach(project => {
        for (existing_project of existing_projects) {           
            if (existing_project[1] == project['name']) {
                already_exist = true;
                break;
            };
        };
        if (!already_exist) {
            let random_guid = _.toUpper(Guid.newGuid());
            project_text += `\nProject("{${first_guid}}") = "${project['name']}", "${project['path']}", "{${random_guid}}"\nEndProject`;
            dir_text += `\n\t\t{${random_guid}} = {${client_dir}}`;
        }
    });

    const project_re = new RegExp("MinimumVisualStudioVersion = .*\\D", 'g');
    const project_found = solutionFile.match(project_re);  
    project_text = `${project_found}${project_text}`;
    var newBody = solutionFile.replace(project_re, project_text);   

    const dir_re = new RegExp("GlobalSection\\(NestedProjects\\) = .*\\D", 'g');
    const dir_found = solutionFile.match(dir_re);  
    dir_text = `${dir_found}${dir_text}`;
    newBody = newBody.replace(dir_re, dir_text);

    if (solutionFile != newBody) {
        fs.writeFileSync(solutionName + ".sln", newBody);
    }
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
};
