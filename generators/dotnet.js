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

async function restore() {
    await hasDotnet();
    return exec('dotnet restore');
}

module.exports = {
    hasDotnet,
    newSln,
    slnAdd,
    restore,
};
