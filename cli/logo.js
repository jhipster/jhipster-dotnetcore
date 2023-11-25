import chalk from 'chalk';

const { green: g, red, white, magenta: m, yellow } = chalk;

export const getLogo = version => `
${g('        ██╗')}${red(' ██╗   ██╗ ████████╗ ███████╗   ██████╗ ████████╗ ████████╗ ███████╗')}${m('    ███╗   ██╗███████╗████████╗')}
${g('        ██║')}${red(' ██║   ██║ ╚══██╔══╝ ██╔═══██╗ ██╔════╝ ╚══██╔══╝ ██╔═════╝ ██╔═══██╗')}${m('   ████╗  ██║██╔════╝╚══██╔══╝')}
${g('        ██║')}${red(' ████████║    ██║    ███████╔╝ ╚█████╗     ██║    ██████╗   ███████╔╝')}${m('   ██╔██╗ ██║█████╗     ██║')}
${g('  ██╗   ██║')}${red(' ██╔═══██║    ██║    ██╔════╝   ╚═══██╗    ██║    ██╔═══╝   ██╔══██║')}${m('    ██║╚██╗██║██╔══╝     ██║')}
${g('  ╚██████╔╝')}${red(' ██║   ██║ ████████╗ ██║       ██████╔╝    ██║    ████████╗ ██║  ╚██╗')}${m('██╗██║ ╚████║███████╗   ██║')}
${g('   ╚═════╝ ')}${red(' ╚═╝   ╚═╝ ╚═══════╝ ╚═╝       ╚═════╝     ╚═╝    ╚═══════╝ ╚═╝   ╚═╝')}${m('╚═╝╚═╝  ╚═══╝╚══════╝   ╚═╝')}

${white.bold('                            https://www.jhipster.tech')}

${white('Welcome to JHipster.NET ') + yellow(`v${version}`)}
${white(`Application files will be generated in folder: ${yellow(process.cwd())}`)}
${g(' _______________________________________________________________________________________________________________')}

${white(`  Documentation for creating an application is at ${yellow('https://www.jhipster.tech/creating-an-app/')}`)}
${white(`  If you find JHipster useful, consider sponsoring the project at ${yellow('https://opencollective.com/generator-jhipster')}`)}
${g(' _______________________________________________________________________________________________________________')}
`;
