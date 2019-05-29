
function askForModuleName() {
    if (this.baseName) return;

    this.askModuleName(this);
}

function askForServerSideOpts() {
    const prompts = [{
        type: 'input',
        name: 'namespace',
        validate: input =>
                /^([a-z_A-Z]\w+(?:\.[a-z_A-Z]\w+)*)$/.test(input)
                    ? true
                    : 'The namespace you have provided is not a valid C# namespace',
        message: 'What is your default C# namespace?',
        default: 'MyCompany'
    }];

    const done = this.async();

    this.prompt(prompts).then((prompt) => {
        this.namespace = prompt.namespace;
        done();
    });
}

module.exports = {
    askForModuleName,
    askForServerSideOpts
//    askForSomething
    // askForServerSideOpts,
    // askForOptionalItems,
    // askFori18n
};
