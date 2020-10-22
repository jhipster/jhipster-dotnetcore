/* eslint-disable consistent-return */
const chalk = require('chalk');
const AppGenerator = require('generator-jhipster/generators/app');
const packagejs = require('../../package.json');
const prompts = require('./prompts');

module.exports = class extends AppGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints dotnetcore')}`);
        }

        this.configOptions = jhContext.configOptions || {};
    }

    get initializing() {
        const initPhaseFromJHipster = this._initializing();

        const dotnetInitAppPhaseSteps = {
            /* eslint-disable */
            displayLogo() {
                this.log('\n');
                this.log(
                    `${chalk.green('        ██╗')}${chalk.red(
                        ' ██╗   ██╗ ████████╗ ███████╗   ██████╗ ████████╗ ████████╗ ███████╗'
                    )}${chalk.magenta('    ███╗   ██╗███████╗████████╗')}`
                );
                this.log(
                    `${chalk.green('        ██║')}${chalk.red(
                        ' ██║   ██║ ╚══██╔══╝ ██╔═══██╗ ██╔════╝ ╚══██╔══╝ ██╔═════╝ ██╔═══██╗'
                    )}${chalk.magenta('   ████╗  ██║██╔════╝╚══██╔══╝')}`
                );
                this.log(
                    `${chalk.green('        ██║')}${chalk.red(
                        ' ████████║    ██║    ███████╔╝ ╚█████╗     ██║    ██████╗   ███████╔╝'
                    )}${chalk.magenta('   ██╔██╗ ██║█████╗     ██║')}`
                );
                this.log(
                    `${chalk.green('  ██╗   ██║')}${chalk.red(
                        ' ██╔═══██║    ██║    ██╔════╝   ╚═══██╗    ██║    ██╔═══╝   ██╔══██║'
                    )}${chalk.magenta('    ██║╚██╗██║██╔══╝     ██║')}`
                );
                this.log(
                    `${chalk.green('  ╚██████╔╝')}${chalk.red(
                        ' ██║   ██║ ████████╗ ██║       ██████╔╝    ██║    ████████╗ ██║  ╚██╗'
                    )}${chalk.magenta('██╗██║ ╚████║███████╗   ██║')}`
                );
                this.log(
                    `${chalk.green('   ╚═════╝ ')}${chalk.red(
                        ' ╚═╝   ╚═╝ ╚═══════╝ ╚═╝       ╚═════╝     ╚═╝    ╚═══════╝ ╚═╝   ╚═╝'
                    )}${chalk.magenta('╚═╝╚═╝  ╚═══╝╚══════╝   ╚═╝')}\n`
                );
                this.log(chalk.white.bold('                            https://www.jhipster.tech\n'));
                this.log(chalk.white('Welcome to JHipster.NET ') + chalk.yellow(`v${packagejs.version}`));
                this.log(chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`));
                if (process.cwd() === this.getUserHome()) {
                    this.log(chalk.red.bold('\n️⚠️  WARNING ⚠️  You are in your HOME folder!'));
                    this.log(
                        chalk.red('This can cause problems, you should always create a new directory and run the jhipster command from here.')
                    );
                    this.log(chalk.white(`See the troubleshooting section at ${chalk.yellow('https://www.jhipster.tech/installation/')}`));
                }
                this.log(
                    chalk.green(
                        ' _______________________________________________________________________________________________________________\n'
                    )
                );
                this.log(
                    chalk.white(`  Documentation for creating an application is at ${chalk.yellow('https://www.jhipster.tech/creating-an-app/')}`)
                );
                this.log(
                    chalk.white(
                        `  If you find JHipster useful, consider sponsoring the project at ${chalk.yellow(
                            'https://opencollective.com/generator-jhipster'
                        )}`
                    )
                );
                this.log(
                    chalk.green(
                        ' _______________________________________________________________________________________________________________\n'
                    )
                );
            },
            getConfig() {
                const configuration = this.getAllJhipsterConfig(this, true);
                this.namespace = configuration.get('namespace') || this.configOptions.namespace;
                this.applicationType = configuration.get('applicationType') || this.configOptions.applicationType;
                this.serviceDiscoveryType = configuration.get('serviceDiscoveryType') || this.configOptions.serviceDiscoveryType;
                const serverConfigFound = this.namespace !== undefined ;

                if (this.baseName !== undefined && serverConfigFound) {
                    this.log(
                        chalk.green(
                            'This is an existing project, using the configuration from your .yo-rc.json file \n' +
                                'to re-generate the project...\n'
                        )
                    );
                    this.existingProject = true;
                }
            }
        };
        return Object.assign(initPhaseFromJHipster, dotnetInitAppPhaseSteps);
    }

    get prompting() {
        return {
            askForModuleName: prompts.askForModuleName,
            askForApplicationType: prompts.askForApplicationType,

            setSharedConfigOptions() {                
                this.configOptions.baseName = this.baseName;
                this.configOptions.namespace = this.namespace;
                this.configOptions.applicationType = this.applicationType;
                this.configOptions.serviceDiscoveryType = this.serviceDiscoveryType;
            },
            saveConfig() {
                const config = {
                    namespace: this.namespace,
                    applicationType: this.applicationType,
                    serviceDiscoveryType: this.serviceDiscoveryType
                };
                this.config.set(config);
            },
        };
    }

    get configuring() {
        return super._configuring();
    }

    get default() {
        return super._default();
    }

    get writing() {
        return super._writing();
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
