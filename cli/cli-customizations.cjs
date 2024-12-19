// This file will not be overwritten by generate-blueprint
module.exports = {
  printLogo: async () => {
    const { getLogo } = await import('./logo.js');
    const { version } = require('../package.json');
    console.log(getLogo(version));
  },
  printBlueprintLogo: undefined,
};
