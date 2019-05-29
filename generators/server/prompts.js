
function askForModuleName() {
    if (this.baseName) return;

    this.askModuleName(this);
}

// function askForSomething() {
//     const prompts = [{
//         type: 'input',
//         name: 'something',
//         message: 'Ask Something',
//         default: 'Why not!'
//     }];

//     const done = this.async();

//     this.prompt(prompts).then((prompt) => {
//         this.something = prompt.something;
//         done();
//     });
// }

module.exports = {
    askForModuleName,
//    askForSomething
    // askForServerSideOpts,
    // askForOptionalItems,
    // askFori18n
};
