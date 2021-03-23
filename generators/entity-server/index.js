/* eslint-disable consistent-return */
const _ = require('lodash');
const EntityServerGenerator = require('generator-jhipster/generators/entity-server');
const writeFiles = require('./files').writeFiles;
const GatewayNeedle = require('../server/needle-api/needle-server-gateway');

module.exports = class extends EntityServerGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important
    }

    get composing() {
        return super._composing();
    }

    get loading() {
        return super._loading();
    }

    get preparing() {
        return super._preparing();
    }

    get preparingFields() {
        return super._preparingFields();
    }

    get default() {
        return super._default();
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

    get postWriting() {
        return super._postWriting();
    }
};
