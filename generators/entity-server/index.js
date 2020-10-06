/* eslint-disable consistent-return */
const chalk = require('chalk');
const _ = require('lodash');
const EntityServerGenerator = require('generator-jhipster/generators/entity-server');
const writeFiles = require('./files').writeFiles;
const GatewayNeedle = require('../server/needle-api/needle-server-gateway');

module.exports = class extends EntityServerGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint dotnetcore')}`);
        }

        this.configOptions = jhContext.configOptions || {};
    }

    get writing() {
        if (this.applicationType === 'gateway') {
            return {
                writeFilesNeedle() {
                    const gatewayNeedle = new GatewayNeedle(this);
                    gatewayNeedle.addRouteToGateway(this.entityApiUrl, _.toLower(this.microserviceName));
                },
            };
        }
        return writeFiles();
    }
};
